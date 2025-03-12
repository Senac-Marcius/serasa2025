import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View>
            <Text>Bem-vindo ao App!</Text>
            <Button title="Ir para Locais" onPress={() => router.push('/locals')} />
        </View>
    );
}
