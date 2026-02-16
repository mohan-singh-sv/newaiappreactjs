import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const DEFAULT_PROFILE = {
  name: 'Eve Holt',
  photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
  email: 'eve.holt@reqres.in',
  mobile: '+1 98765 43210',
  gender: 'Female',
};

export default function ProfileScreen({ onLogout, navigation, route }) {
  const profile = useMemo(
    () => route.params?.updatedProfile || DEFAULT_PROFILE,
    [route.params?.updatedProfile]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Profile</Text>
        <Pressable
          style={styles.editIconButton}
          onPress={() => navigation.navigate('EditProfile', { profile })}
        >
          <Ionicons name="create-outline" size={22} color="#2563eb" />
        </Pressable>
      </View>

      <Image source={{ uri: profile.photo }} style={styles.avatar} />

      <View style={styles.infoCard}>
        <Text style={styles.text}>Name: {profile.name}</Text>
        <Text style={styles.text}>Email: {profile.email}</Text>
        <Text style={styles.text}>Mobile: {profile.mobile}</Text>
        <Text style={styles.text}>Gender: {profile.gender}</Text>
      </View>

      <Pressable style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    padding: 20,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0f172a',
  },
  editIconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e8f0',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 18,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  text: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#dc2626',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
