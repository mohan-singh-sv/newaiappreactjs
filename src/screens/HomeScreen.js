import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const stats = [
  { id: '1', label: 'Total Users', value: '1,220' },
  { id: '2', label: 'Upcoming Events', value: '13' },
  { id: '3', label: 'Active Offers', value: '7' },
  { id: '4', label: 'Revenue', value: '$18,450' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>A quick look at your app metrics</Text>

      <FlatList
        data={stats}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>{item.label}</Text>
            <Text style={styles.cardValue}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#334155',
  },
  content: {
    marginTop: 18,
    gap: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: '48.5%',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardLabel: {
    color: '#64748b',
    fontSize: 13,
  },
  cardValue: {
    color: '#0f172a',
    fontSize: 20,
    marginTop: 8,
    fontWeight: '700',
  },
});
