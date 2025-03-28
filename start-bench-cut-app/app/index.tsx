import React, { useState } from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Player } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import StartBenchCutButtons from '@/components/StartBenchCutButtons';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';

const PlayerProfile = ({player}: {player: Player}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ThemedView style={styles.playerContainer}>
      <Image source={{ uri: player?.image_url }} style={styles.image} />
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.nameContainer}>
        <ThemedText type="default" style={styles.name}>{player?.name} - {player?.team}</ThemedText>
        {expanded ?
          <IconSymbol
            size={30}
            color="#808080"
            name="chevron.right"
          />
        :
          <IconSymbol
            size={30}
            color="#808080"
            name="chevron.right"
          />
        }
      </TouchableOpacity>
      {expanded && (
        <ThemedView style={styles.detailsContainer}>
          <ThemedText type="default">{player?.position}</ThemedText>
        </ThemedView>
      )}
      <StartBenchCutButtons />
    </ThemedView>
  );
};

export default function HomeScreen() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation();

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/generate/nfl-players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPEN_AI_KEY}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setPlayers(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  React.useEffect(() => {
    fetchPlayers();
  }, []);

  if(isError) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('sign-in')}>
        <ThemedText>Oops something went wrong</ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ThemedText>Loading...</ThemedText>
      ) : (
        <FlatList
          data={players ?? []}
          keyExtractor={(player: Player) => player.name}
          renderItem={({item: player}: {item: Player}) => {
            return <PlayerProfile player={player} />;
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  playerContainer: {
    // alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9'
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 10,
    alignSelf: 'center'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 5
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailsContainer: {
    marginTop: 10
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
