import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Drawer } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useState } from 'react';


interface MyTopbarProps {
    title: string;
}

const MyTopbar: React.FC<MyTopbarProps> = ({ title }) => {
    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.Action icon="menu" onPress={() => setDrawerOpen(!drawerOpen)} />
                <Appbar.Content title={title} titleStyle={styles.title} />
            </Appbar.Header>
            
            {drawerOpen && (
                <Drawer.Section style={styles.drawerSection}>
                    <Drawer.Item
                        label="Início"
                        icon="home"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/');
                        }}
                    />
                    <Drawer.Item
                        label="Postagens"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/posts');
                        }}
                    />
                    <Drawer.Item
                        label="Calendário"
                        icon="calendar"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/calendar');
                        }}
                    />
                    <Drawer.Item
                        label="Cursos"
                        icon="school"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/courses');
                        }}
                    />
                    <Drawer.Item
                        label="Configurações"
                        icon="cog"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/settings');
                        }}
                    />
                </Drawer.Section>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6A1B9A',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    appbar: {
        backgroundColor: '#4A148C',
        borderRadius: 10,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    drawerSection: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default MyTopbar;