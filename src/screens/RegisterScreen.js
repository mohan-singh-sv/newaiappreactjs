import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { registerWithUsernamePassword } from '../services/authService';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('pistol');
  const [confirmPassword, setConfirmPassword] = useState('pistol');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password and confirm password must match.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await registerWithUsernamePassword(username.trim(), password);
      navigation.replace('Login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Set up your account to continue</Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#64748b"
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#64748b"
        />

        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#64748b"
        />

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Pressable
          onPress={handleRegister}
          disabled={isLoading}
          style={({ pressed }) => [
            styles.button,
            pressed && !isLoading ? styles.buttonPressed : null,
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </Pressable>

        <Pressable onPress={() => navigation.replace('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: '#0f172a',
    marginBottom: 10,
  },
  error: {
    color: '#dc2626',
    marginBottom: 8,
  },
  button: {
    marginTop: 6,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    marginTop: 14,
    color: '#2563eb',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
});
