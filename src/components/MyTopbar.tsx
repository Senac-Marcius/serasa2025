import { View, StyleSheet } from 'react-native';
import { Appbar, Drawer } from 'react-native-paper';
import { Router } from 'expo-router';
import { useState } from 'react';
import MyNotify from './MyNotify';

interface MyTopbarProps {
    title?: string;
    router: Router;
}

const MyTopbar: React.FC<MyTopbarProps> = ({ title, router }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.Action icon="menu" style={styles.hamburguer} onPress={() => setDrawerOpen(!drawerOpen)} />
                {
                    title && (
                    <Appbar.Content title={title} titleStyle={styles.title} />
                    )
                }


                <MyNotify>
                    <></>
                </MyNotify>

                {/**chamar o do miza aqui */}
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
                        label="budgets"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/budgets');
                        }}
                    />
                    <Drawer.Item
                        label="calendar"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/calendar');
                        }}
                    />
                    <Drawer.Item
                        label="categories"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/categories');
                        }}
                    />
                    <Drawer.Item
                        label="classes"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/classes');
                        }}
                    />
                    <Drawer.Item
                        label="collections"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/collections');
                        }}
                    />
                    <Drawer.Item
                        label="courses"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/courses');
                        }}
                    />
                    <Drawer.Item
                        label="disciplines"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/disciplines');
                        }}
                    />
                    <Drawer.Item
                        label="documents"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/documents');
                        }}
                    />
                    <Drawer.Item
                        label="employees"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/employees');
                        }}
                    />
                    <Drawer.Item
                        label="expenses"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/expenses');
                        }}
                    />
                    <Drawer.Item
                        label="investments"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/investments');
                        }}
                    />
                    <Drawer.Item
                        label="itens"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/itens');
                        }}
                    />
                    <Drawer.Item
                        label="launchs"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/launchs');
                        }}
                    />
                    <Drawer.Item
                        label="levels"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/levels');
                        }}
                    />
                    <Drawer.Item
                        label="librarie"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/librarie');
                        }}
                    />
                    <Drawer.Item
                        label="loans"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/loans');
                        }}
                    />
                    <Drawer.Item
                        label="locals"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/locals');
                        }}
                    />
                    <Drawer.Item
                        label="notifications"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/notifications');
                        }}
                    />
                    <Drawer.Item
                        label="parents"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/parents');
                        }}
                    />
                    <Drawer.Item
                        label="perfil"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/perfil');
                        }}
                    />
                    <Drawer.Item
                        label="positions"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/positions');
                        }}
                    />
                    <Drawer.Item
                        label="posts"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/posts');
                        }}
                    />
                    <Drawer.Item
                        label="products"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/products');
                        }}
                    />
                    <Drawer.Item
                        label="projects"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/projects');
                        }}
                    />
                    <Drawer.Item
                        label="records"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/records');
                        }}
                    />
                    <Drawer.Item
                        label="revenues"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/revenues');
                        }}
                    />
                    <Drawer.Item
                        label="scales"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/scales');
                        }}
                    />
                    <Drawer.Item
                        label="schedules"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/schedules');
                        }}
                    />
                    <Drawer.Item
                        label="students"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/students');
                        }}
                    />
                    <Drawer.Item
                        label="users"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/users');
                        }}
                    />
                    <Drawer.Item
                        label="more"
                        icon="file-document"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/more');
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
        color: '#FFF',
        borderRadius: 10,
    },
    hamburguer: {
        backgroundColor: '#FFF'

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