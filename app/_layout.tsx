import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import '../global.css';

export default function Layout() {

  return( <Stack>
        <Toast />
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="classroom/index" options={{ headerShown: false }}/>
        <Stack.Screen name="classroom/students" options={{ headerShown: false }}/>
        <Stack.Screen name="classroom/timelines" options={{ headerShown: false }}/>
        <Stack.Screen name="classroom/classes" options={{ headerShown: false }}/>
    </Stack>);
}
