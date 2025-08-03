import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Movie, MovieAction } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import MovieItem from '@/components/ui/MovieItem';
import Header from '@/components/ui/Header';

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [submittedMovies, setSubmittedMovies] = useState<{ title: string; action: MovieAction }[]>([]);
  const [onSubmit, setOnSubmit] = useState<() => void>(() => () => {});

  const navigation = useNavigation();

  const submitMovies = () => {
    // Handle movie submission logic here via fetch
    fetch('http://localhost:3000/api/submit/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movies: submittedMovies.map(m => ({
          title: m.title,
          action: m.action,
        })),
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Submission successful:', data);
    })
    .catch(error => {
      console.error('Error submitting movies:', error);
    });
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/generate/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPEN_AI_KEY}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setMovies(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  React.useEffect(() => {
    fetchMovies();
  }, []);

  const isSubmitEnabled = submittedMovies.length === 3 &&
    new Set(submittedMovies.map(p => p.action)).size === 3;

  const handleSubmit = () => {
    console.log('Submitted:', submittedMovies);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {isLoading ? (
        <ThemedView style={styles.errorContainer}>
          <ThemedText>Loading Movies...</ThemedText>
        </ThemedView>
      ) : (
        <>
          {isError ? (
            <ThemedView style={styles.errorContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('sign-in')}>
                <ThemedText>Oops something went wrong</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          ) : (
            <ThemedView>
              <FlatList
                data={movies ?? []}
                keyExtractor={(movie: Movie) => movie.title}
                renderItem={({item: movie}: {item: Movie}) => {
                  return (
                    <MovieItem
                      movie={movie}
                      submittedMovies={submittedMovies}
                      setSubmittedMovies={setSubmittedMovies}
                    />
                  );
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
              />
              <Button
                title="Submit your picks"
                onPress={submitMovies}
                disabled={!isSubmitEnabled}
              />
            </ThemedView>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
