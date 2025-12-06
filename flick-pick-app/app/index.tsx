import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Button, Alert } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Movie, MovieAction } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import MovieItem from '@/components/ui/MovieItem';
import Header from '@/components/ui/Header';
import { useMovies, useSubmitMovies } from '@/hooks/useMovies';
import useUserStore from '@/hooks/useStore';

export default function HomeScreen() {
  const [submittedMovies, setSubmittedMovies] = useState<{ title: string; action: MovieAction }[]>([]);
  const navigation = useNavigation();

  const { data: movies, isLoading, isError } = useMovies();
  // const { mutate: submitMoviesMutation } = useSubmitMovies();

  const user = useUserStore(state => state.user);

  useEffect(() => {
    console.log('show submittedMovies:', submittedMovies);
  }, [submittedMovies]);

  const submitMovies = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'User not found. Please sign in.');
      return;
    }

    try {
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/api/submit/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          movies: submittedMovies,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Submission failed');
      }

      const data = await response.json();
      Alert.alert('Success', 'Movies submitted successfully!');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const isSubmitEnabled = submittedMovies.length === 3 &&
    new Set(submittedMovies.map(p => p.action)).size === 3;

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
                ListHeaderComponent={
                  <Button
                    title="Submit your picks"
                    onPress={submitMovies}
                    disabled={!isSubmitEnabled}
                  />
                }
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
