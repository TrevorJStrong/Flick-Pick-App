import React from "react";

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from "@/context/auth";
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";

const loginUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  console.log(email, password);
  // const response = await axios.post(`${apiUrl}/login`, { email, password });
  // return response.data;
  return {};
};
const SignInScreen = () => {
  // const { signIn } = useSession();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Join the Game</ThemedText>
      <ThemedText type="defaultSemiBold" style={styles.subtitle}>Create an account or sign in to keep track of your selections and share them with others.</ThemedText>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedView style={styles.inputContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholder='Email'
              placeholderTextColor="#A0A0A0"
            />
          </ThemedView>
        )}
        name="email"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedView style={styles.inputContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholder='Password'
              placeholderTextColor="#A0A0A0"
              secureTextEntry
            />
          </ThemedView>
        )}
        name="password"
        rules={{ required: true }}
      />
      <TouchableOpacity onPress={handleSubmit(loginUser)} style={styles.button}>
        <ThemedText type="subtitle" style={styles.buttonText}>Sign In</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 15
  },
  subtitle: {
    marginBottom: 35,
    textAlign: 'center'
  },
  inputContainer: {
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // For Android shadow
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  inputFocused: {
    borderColor: "#2563EB",
    backgroundColor: "#FFFFFF",
    shadowOpacity: 0.2,
    elevation: 6,
  },
  button: {
    width: "90%",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Android shadow
    marginTop: 30,
  },
  buttonText: {
    color: Colors.white,
  },
});