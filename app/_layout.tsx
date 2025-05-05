import { Stack } from 'expo-router';
import '../global.css';

export default function Layout() {
    return <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="classroom/index" options={{ headerShown: false }}/>
   
    </Stack>;
}
