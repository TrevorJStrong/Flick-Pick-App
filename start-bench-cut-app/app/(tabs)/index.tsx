import React, { useState } from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Player  } from '@/types';
import players from '../../players.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';

const PlayerProfile = ({player}: {player: Player}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ThemedView style={styles.playerContainer}>
      <Image source={{ uri: player.image }} style={styles.image} />
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.nameContainer}>
        <ThemedText type="default" style={styles.name}>{player.name}</ThemedText>
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
          <ThemedText type="default">{player.position}</ThemedText>
          <ThemedText type="default" align="center">{player.description}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={players ?? []}
        keyExtractor={(player: Player) => player.name}
        renderItem={({item: player}: {item: Player}) => {
          return <PlayerProfile player={player} />;
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  playerContainer: {
    alignItems: 'center',
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
    marginBottom: 10
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
});
