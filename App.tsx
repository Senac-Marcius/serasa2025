import { NativeBaseProvider, extendTheme } from 'native-base';
import { Slot } from 'expo-router';
import { theme } from './styles/theme';

const customTheme = extendTheme(theme);

export default function App() {
    return (
        <NativeBaseProvider theme={customTheme}>
            <Slot />
        </NativeBaseProvider>
    );
}
