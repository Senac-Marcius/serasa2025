import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { customTheme } from './styles/theme';
import { Slot } from 'expo-router';

export default function App() {
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={{ ...customTheme }}>
                <Slot />
            </ApplicationProvider>
        </>
    );
}
