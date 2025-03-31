import { ReactNode } from 'react';
import { View,  StyleSheet } from 'react-native';
import { Appbar, Drawer } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useState } from 'react';



interface MyTopbarProps {
    children: ReactNode;
}

const MyTopbar: React.FC<MyTopbarProps> = ({ title }) => {
      const router = useRouter();
        const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => setDrawerOpen (!drawerOpen)} />
                <Appbar.Content title={title}/>
                {/* Anelisa */}
            </Appbar.Header>
            {/* importar do misael */}
             {drawerOpen && (
                <Drawer.Section style={{ backgroundColor: 'white', padding: 10 }}>
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
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/posts');
                        }}
                    />
                    <Drawer.Item
                        label="Calendario"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/calendar');
                        }}
                    />
                    
                    <Drawer.Item
                        label="Cursos"
                        icon="post"
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
                            console.log("Configurações");
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