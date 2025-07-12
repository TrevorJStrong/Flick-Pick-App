import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

const dummyResults = [
  {
    id: '1',
    date: '2025-07-05',
    movies: [
      { title: 'Inception', action: 'stream' },
      { title: 'The Matrix', action: 'own' },
      { title: 'Interstellar', action: 'skip' },
    ],
  },
  {
    id: '2',
    date: '2025-07-01',
    movies: [
      { title: 'The Godfather', action: 'stream' },
      { title: 'Pulp Fiction', action: 'own' },
      { title: 'Goodfellas', action: 'skip' },
    ],
  },
];

export default function ProfileScreen() {
  const [results, setResults] = useState(dummyResults);

  useEffect(() => {
    // fetch('/api/user/results').then(...)
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.subheader}>Recent Polling Results</ThemedText>
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.resultCard}>
            <ThemedText style={styles.date}>{item.date}</ThemedText>
            {item.movies.map((movie, idx) => (
              <View key={idx} style={styles.movieRow}>
                <ThemedText style={styles.movieTitle}>{movie.title}</ThemedText>
                <ThemedText style={[styles.action, styles[movie.action.toLowerCase()]]}>{movie.action}</ThemedText>
              </View>
            ))}
          </ThemedView>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  subheader: {
    fontSize: 18,
    color: Colors.blue,
    marginBottom: 18,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  date: {
    fontSize: 15,
    color: '#888',
    marginBottom: 8,
    fontWeight: '500',
  },
  movieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  movieTitle: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  action: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  stream: {
    color: Colors.green,
  },
  own: {
    color: Colors.blue,
  },
  skip: {
    color: Colors.red,
  },
});
