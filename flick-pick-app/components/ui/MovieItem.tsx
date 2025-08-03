import React from 'react';
import { StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Movie } from '@/types';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { CARD_HEIGHT, CARD_WIDTH, Colors } from '@/constants/Colors';

type MovieAction = 'own' | 'stream' | 'skip';

const MovieItem = ({
  movie,
  submittedMovies,
  setSubmittedMovies
}: {
  movie: Movie,
  submittedMovies: { title: string; action: MovieAction }[],
  setSubmittedMovies: (movies: { title: string; action: MovieAction }[]) => void
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const assignedAction = submittedMovies.find((m) => m.title === movie.title)?.action;

  const isActionAssigned = (action: MovieAction) =>
    submittedMovies.some((m) => m.action === action && m.title !== movie.title);

  const handleSelect = (action: MovieAction) => {
    if (assignedAction === action) {
      setSubmittedMovies(submittedMovies.filter((m) => m.title !== movie.title));
    } else if (!isActionAssigned(action)) {
      const filtered = submittedMovies.filter((m) => m.title !== movie.title);
      setSubmittedMovies([...filtered, { title: movie.title, action }]);
    }
  };

  return (
    <ThemedView style={[styles.playerContainer, { height: CARD_HEIGHT, width: CARD_WIDTH }]}> 
      <ThemedView style={styles.row}>
        <Animated.Image
          source={{ uri: movie?.poster }}
          style={[styles.poster, { opacity: fadeAnim, height: CARD_HEIGHT - 36 }]}
        />
        <ThemedView style={styles.buttonContainer}>
          <ThemedView style={styles.infoContainer}>
            <ThemedText type="default" style={styles.name}>{movie?.title}</ThemedText>
            <ThemedText type="default" style={styles.year}>{movie?.year}</ThemedText>
            <ThemedText type="default" style={styles.genre}>{movie?.genre || ''}</ThemedText>
          </ThemedView>
          <ThemedView>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.ownButton,
                assignedAction === 'own' && styles.ownButtonActive,
                isActionAssigned('own') && assignedAction !== 'own' && { opacity: 0.5 }
              ]}
              onPress={() => handleSelect('own')}
              disabled={isActionAssigned('own') && assignedAction !== 'own'}
            >
              <IconSymbol name="checkmark.circle" size={22} color={assignedAction === 'own' ? '#fff' : isActionAssigned('own') ? '#ccc' : '#28a745'} />
              <ThemedText style={[styles.buttonText, assignedAction === 'own' && { color: '#fff' }]}>Own it</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.streamButton,
                assignedAction === 'stream' && styles.streamButtonActive,
                isActionAssigned('stream') && assignedAction !== 'stream' && { opacity: 0.5 }
              ]}
              onPress={() => handleSelect('stream')}
              disabled={isActionAssigned('stream') && assignedAction !== 'stream'}
            >
              <IconSymbol name="play.circle" size={22} color={assignedAction === 'stream' ? '#fff' : isActionAssigned('stream') ? '#ccc' : '#4a90e2'} />
              <ThemedText style={[styles.buttonText, assignedAction === 'stream' && { color: '#fff' }]}>Stream it</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.skipButton,
                assignedAction === 'skip' && styles.skipButtonActive,
                isActionAssigned('skip') && assignedAction !== 'skip' && { opacity: 0.5 }
              ]}
              onPress={() => handleSelect('skip')}
              disabled={isActionAssigned('skip') && assignedAction !== 'skip'}
            >
              <IconSymbol name="delete.forward" size={22} color={assignedAction === 'skip' ? '#fff' : isActionAssigned('skip') ? '#ccc' : '#e74c3c'} />
              <ThemedText style={[styles.buttonText, assignedAction === 'skip' && { color: '#fff' }]}>Skip it</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  playerContainer: {
    padding: 18,
    marginVertical: 8,
    borderWidth: 0,
    borderRadius: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  poster: {
    width: 120,
    resizeMode: 'cover',
    borderRadius: 12,
    marginRight: 18,
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 8,
    color: '#222',
    letterSpacing: 0.2,
  },
  year: {
    fontSize: 16,
    color: '#888',
    textAlign: 'left',
    marginBottom: 6,
    fontWeight: '500',
  },
  genre: {
    fontSize: 14,
    color: '#4a90e2',
    textAlign: 'left',
    fontStyle: 'italic',
    marginTop: 2,
  },
  buttonContainer: {},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f7fafd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    width: 130
  },
  ownButton: {
    borderColor: Colors.green,
    borderWidth: 1
  },
  ownButtonActive: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },
  streamButton: {
    borderColor: Colors.blue,
    borderWidth: 1
  },
  streamButtonActive: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
  },
  skipButton: {
    borderColor: Colors.red,
    borderWidth: 1
  },
  skipButtonActive: {
    backgroundColor: Colors.red,
    borderColor: Colors.red,
  },
  buttonText: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: '600',
    color: '#222'
  },
});