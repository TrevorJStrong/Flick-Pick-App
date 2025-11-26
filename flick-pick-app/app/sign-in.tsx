import { ThemedText } from '@/components/ThemedText';
import { router} from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import {
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import useUserStore from '@/hooks/useStore';
import { IconSymbol } from '@/components/ui/IconSymbol';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
	iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
	scopes: ['profile', 'email'],
});

const { setUser, setToken } = useUserStore.getState();

const GoogleLogin = async () => {
	await GoogleSignin.hasPlayServices();
	const userInfo = await GoogleSignin.signIn();
	return userInfo;
};

const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await fetch('http://10.0.2.2:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Network response was not ok');
    }

    const result: any = await response.json();

    const result_data = {
      user: {
        userId: result.user.userId,
        email: result.user.email,
        name: result.user.name,
      },
      token: result.token,
    };
  
    handlePostSignIn(result_data);
  } catch (error) {
    Alert.alert('Login Failed', error instanceof Error ? error.message : 'An unknown error occurred');
  }
};

const signInWithGoogle = async () => {
  try {
    const googleResponse = await GoogleLogin();
    const idToken = googleResponse?.data?.idToken;
    verifyGoogleToken(idToken ?? undefined);
  } catch (err) {
    Alert.alert('Google Sign-In Failed', 'An error occurred during Google sign-in.');
  }
};

const verifyGoogleToken = async (idToken: string | undefined) => {
  if (!idToken) {
    Alert.alert('Google Sign-In Failed', 'No ID token provided.');
    return;
  }

  try {
    const response = await fetch('http://10.0.2.2:3000/auth/google/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      Alert.alert('Google Sign-In Failed', errorText || 'Unable to verify Google token.');
      return;
    }

    const data = await response.json();
    handlePostSignIn(data);
  } catch (error) {
    console.error('Network or server error during Google token verification:', error);
    Alert.alert('Google Sign-In Failed', 'A network or server error occurred.');
  }
};

const handlePostSignIn = async (data: { token: string; user: { userId: string; email: string; name: string } }) => {
  const user = {
    id: data.user.userId,
    email: data.user.email,
    name: data.user.name,
  };
  
  setToken(data.token);
  setUser(user);
  router.push('/');
}

const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    await useUserStore.getState().clearToken();
    useUserStore.getState().setUser(null);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

const SignInScreen = () => {
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
      <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', marginLeft: 20, marginBottom: 20, position: 'absolute', top: 40 }}>
        <IconSymbol name="chevron.left" size={30} color={Colors.black} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => signOut()} style={{ alignSelf: 'center', marginBottom: 40, position: 'absolute', top: 40 }}>
        <ThemedText type="defaultSemiBold" style={{ color: Colors.red }}>Sign Out</ThemedText>
      </TouchableOpacity>
      <ThemedText type="title" style={styles.title}>Join the Game</ThemedText>
      <ThemedText type="defaultSemiBold" style={styles.subtitle}>Create an account or sign in to keep track of your selections and share them with others.</ThemedText>
      {errors.email && <ThemedText color={Colors.red}>Email is required.</ThemedText>}
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
      {errors.password && <ThemedText color={Colors.red}>Password is required.</ThemedText>}
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
      <ThemedView style={{ width: '100%', alignItems: 'center' }}>
        <TouchableOpacity onPress={handleSubmit(loginUser)} style={styles.button}>
          <ThemedText type="subtitle" style={styles.buttonText}>Sign In</ThemedText>
        </TouchableOpacity>
        <ThemedText type="default" style={{ marginTop: 20, textAlign: 'center' }}>or sign in with</ThemedText>
        <GoogleSigninButton
          onPress={signInWithGoogle}
          style={{ width: '90%', marginTop: 20 }}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Light}
        />
      </ThemedView>
      {/* <TouchableOpacity onPress={signOut} style={styles.button}>
        <ThemedText type="subtitle" style={styles.buttonText}>Sign Out</ThemedText>
      </TouchableOpacity> */}
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