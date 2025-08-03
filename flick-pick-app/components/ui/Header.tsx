import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';

const Header = () => {
  const navigation = useNavigation();
  return (
    <ThemedView style={styles.header}>
      <ThemedText style={styles.headerTitle} type="title">Flick Pick</ThemedText>
      <ThemedView style={styles.headerIcons}>
        <TouchableOpacity style={styles.quizIconContainer} onPress={() => navigation.navigate('quiz')}>
          <IconSymbol name="questionmark.circle" size={30} color="#f0ad4e" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileIconContainer} onPress={() => navigation.navigate('sign-in')}>
        <IconSymbol name="person.circle" size={32} color="#4a90e2" />
      </TouchableOpacity>
    </ThemedView>
  </ThemedView>
)};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: 'transparent',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizIconContainer: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#fffbe6',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 0.5,
  },
  profileIconContainer: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#f2f6fa',
  },
});