import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './app/index';
import NotificationScreen from './app/notifications';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
