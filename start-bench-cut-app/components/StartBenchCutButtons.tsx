import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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

const handlePress = (button) => {
  console.log(button, 'item')
}

const StartBenchCutButtons = () => (
  <ThemedView style={styles.container}>
    {buttons.map((button) => (
      <TouchableOpacity
        style={styles.button}
        key={button.id}
        onPress={() => handlePress(button)}
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
    marginTop: 10
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#007bff',
  }
});