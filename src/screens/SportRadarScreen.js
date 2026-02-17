import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const FAST_BALL_THRESHOLD_KMH = 120;
const SPEED_LIMIT_KMH = 160;

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return '0.00';
  }

  return value.toFixed(2);
}

export default function SportRadarScreen() {
  const [distanceMeters, setDistanceMeters] = useState('20');
  const [timeSeconds, setTimeSeconds] = useState('0.65');
  const [records, setRecords] = useState([]);

  const speedData = useMemo(() => {
    const distance = Number(distanceMeters);
    const time = Number(timeSeconds);

    if (!distance || !time || distance <= 0 || time <= 0) {
      return { kmh: 0, mph: 0, status: 'Enter valid distance and time values.' };
    }

    const metersPerSecond = distance / time;
    const kmh = metersPerSecond * 3.6;
    const mph = metersPerSecond * 2.23694;

    let status = 'Normal throw speed';
    if (kmh >= SPEED_LIMIT_KMH) {
      status = 'Speeding alert: above configured radar limit';
    } else if (kmh >= FAST_BALL_THRESHOLD_KMH) {
      status = 'Fast ball detected';
    }

    return { kmh, mph, status };
  }, [distanceMeters, timeSeconds]);

  const saveRecord = () => {
    if (speedData.kmh <= 0) {
      return;
    }

    setRecords((prev) => [
      {
        id: String(Date.now()),
        kmh: speedData.kmh,
        mph: speedData.mph,
        status: speedData.status,
      },
      ...prev,
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sport Radar Speed Check</Text>
      <Text style={styles.subtitle}>Detect ball speed from distance and travel time.</Text>

      <View style={styles.panel}>
        <Text style={styles.label}>Distance traveled (meters)</Text>
        <TextInput
          value={distanceMeters}
          onChangeText={setDistanceMeters}
          keyboardType="decimal-pad"
          style={styles.input}
          placeholder="Example: 20"
          placeholderTextColor="#94a3b8"
        />

        <Text style={styles.label}>Time (seconds)</Text>
        <TextInput
          value={timeSeconds}
          onChangeText={setTimeSeconds}
          keyboardType="decimal-pad"
          style={styles.input}
          placeholder="Example: 0.65"
          placeholderTextColor="#94a3b8"
        />

        <View style={styles.readingCard}>
          <Text style={styles.speedReading}>{formatNumber(speedData.kmh)} km/h</Text>
          <Text style={styles.secondaryReading}>{formatNumber(speedData.mph)} mph</Text>
          <Text style={styles.status}>{speedData.status}</Text>
        </View>

        <Pressable style={styles.button} onPress={saveRecord}>
          <Text style={styles.buttonText}>Save Radar Reading</Text>
        </Pressable>
      </View>

      <Text style={styles.historyTitle}>Recent Readings</Text>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No speed records saved yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text style={styles.recordSpeed}>{formatNumber(item.kmh)} km/h</Text>
            <Text style={styles.recordMeta}>
              {formatNumber(item.mph)} mph • {item.status}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    marginTop: 4,
    color: '#475569',
    fontSize: 14,
    marginBottom: 12,
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    padding: 12,
  },
  label: {
    color: '#334155',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    color: '#0f172a',
    backgroundColor: '#fff',
  },
  readingCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    marginTop: 6,
  },
  speedReading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1d4ed8',
  },
  secondaryReading: {
    marginTop: 2,
    color: '#334155',
    fontSize: 15,
  },
  status: {
    marginTop: 6,
    color: '#0f172a',
    fontWeight: '600',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  historyTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  emptyText: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: 14,
  },
  recordItem: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  recordSpeed: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 16,
  },
  recordMeta: {
    marginTop: 2,
    color: '#475569',
  },
});
