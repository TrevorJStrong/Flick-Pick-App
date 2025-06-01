import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Player as PlayerBase } from "@/types";

type Player = PlayerBase & { action?: string };

type StartBenchCutButtonsProps = {
  submittedPlayers: Player[],
  setSubmittedPlayers: (players: Player[]) => void,
  player: Player;
  onSubmit?: () => void;
};

const buttons = [
  {
    id: 1,
    param: 'start',
    text: 'Start',
  },
  {
    id: 2,
    param: 'bench',
    text: 'Bench',
  },
  {
    id: 3,
    param: 'cut',
    text: 'Cut'
  }
];

const handlePress = (
  button: { id: number; param: string; text: string },
  player: Player,
  setSubmittedPlayers: (players: Player[]) => void,
  submittedPlayers: Player[]
) => {
  const filtered = submittedPlayers.filter(
    (p) => p.name !== player.name && p.action !== button.param
  );
  const playerObj = { name: player.name, action: button.param };
  setSubmittedPlayers([...filtered, playerObj]);
};

const StartBenchCutButtons = ({
  submittedPlayers,
  setSubmittedPlayers,
  player,
}: StartBenchCutButtonsProps) => (
  <ThemedView style={styles.container}>
    {buttons.map((button) => (
      <TouchableOpacity
        style={[styles.button,
          submittedPlayers.find(p => p.name === player.name && p.action === button.param) && styles.selected
        ]}
        key={button.id}
        onPress={() => handlePress(button, player, setSubmittedPlayers, submittedPlayers)}
      >
        <ThemedText>{button.text}</ThemedText>
      </TouchableOpacity>
    ))}
  </ThemedView>
);

export default StartBenchCutButtons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    gap: 10
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  submitButton: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    minWidth: 80,
    alignItems: 'center'
  },
  selected: {
    backgroundColor: '#007bff',
  }
});