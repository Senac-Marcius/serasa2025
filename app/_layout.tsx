import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { View, Text } from 'react-native';
import '../global.css';

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="classroom/index" options={{ headerShown: false }} />
        <Stack.Screen name="classroom/students" options={{ headerShown: false }} />
        <Stack.Screen name="classroom/timelines" options={{ headerShown: false }} />
        <Stack.Screen name="classroom/classes" options={{ headerShown: false }} />
      </Stack>

      <Toast
        position="top"
        topOffset={60}
        visibilityTime={3000}
        config={{
          success: ({ text1, text2 }) => (
            <View style={{
              backgroundColor: '#dcfce7',
              borderLeftWidth: 5,
              borderLeftColor: '#22c55e',
              padding: 16,
              borderRadius: 12,
              marginHorizontal: 16,
              minHeight: 80,
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#15803d',
                marginBottom: 4,
              }}>{text1}</Text>
              <Text style={{
                fontSize: 14,
                color: '#166534',
                flexWrap: 'wrap',
              }}>{text2}</Text>
            </View>
          ),
          error: ({ text1, text2 }) => (
            <View style={{
              backgroundColor: '#fee2e2',
              borderLeftWidth: 5,
              borderLeftColor: '#ef4444',
              padding: 16,
              borderRadius: 12,
              marginHorizontal: 16,
              minHeight: 80,
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#991b1b',
                marginBottom: 4,
              }}>{text1}</Text>
              <Text style={{
                fontSize: 14,
                color: '#7f1d1d',
                flexWrap: 'wrap',
              }}>{text2}</Text>
            </View>
          ),
        }}
      />
    </>
  );
}
