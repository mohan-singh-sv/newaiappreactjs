import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const FIELDS = [
  { key: 'name', label: 'Name' },
  { key: 'photo', label: 'Photo URL' },
  { key: 'email', label: 'Email', keyboardType: 'email-address' },
  { key: 'mobile', label: 'Mobile', keyboardType: 'phone-pad' },
  { key: 'gender', label: 'Gender' },
];

export default function EditProfileScreen({ route, navigation }) {
  const [form, setForm] = useState(
    route.params?.profile || {
      name: '',
      photo: '',
      email: '',
      mobile: '',
      gender: '',
    }
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Details</Text>

      <Image
        source={{
          uri:
            form.photo ||
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
        }}
        style={styles.avatar}
      />

      {FIELDS.map((field) => (
        <View key={field.key} style={styles.inputGroup}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            value={form[field.key]}
            onChangeText={(text) =>
              setForm((prev) => ({
                ...prev,
                [field.key]: text,
              }))
            }
            keyboardType={field.keyboardType || 'default'}
            autoCapitalize="none"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            style={styles.input}
          />
        </View>
      ))}

      <Pressable
        style={styles.saveButton}
        onPress={() => navigation.navigate('ProfileMain', { updatedProfile: form })}
      >
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 18,
    color: '#0f172a',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#334155',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#0f172a',
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
