import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import MyTheme from '../src/components/MyTheme';
import MyView from '../src/components/MyView';
import MyButton from '../src/components/MyButtons';
import MyCard from '../src/components/MyCard';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <MyView router={router} style={{ flex: 1, backgroundColor: 'white' }}>
            <MyTheme chendTheme={() => { }} fontSize={() => { }} />
            <Text style={{ fontWeight: 'bold', fontSize: 35, color: '#9a9a9a', textAlign: 'center' }}>Seja bem-vindo ao <span style={{ color: '#813AB1', fontSize: 40 }}>Virtudemy</span></Text>

            <View style={styles.containerIcons}>
                <View style={styles.card}>
                    <Image source={require('../assets/iconCreateStudent.svg')} style={styles.imageIcon} />
                    <MyButton
                        title='Sou estudante'
                        onPress={() => {
                            router.push('students')
                        }}
                    />
                </View>

                <View style={styles.card}>
                    <Image source={require('../assets/iconCreateEmployee.svg')} style={styles.imageIcon} />
                    <MyButton
                        title='Sou funcionário'
                        onPress={() => {
                            router.push('employees')
                        }}
                    />
                </View>
            </View>

            <View style={styles.containerGrades}>
                <MyCard
                    icon="school"
                    title="Biblioteca"
                    description="Acesse livros, artigos e materiais didáticos de forma rápida e intuitiva."
                    color="#8b5cf6"
                />
                <MyCard
                    icon="book-open-page-variant"
                    title="Matérias"
                    description="Visualize os conteúdos das disciplinas de forma organizada"
                    color="#10b981"
                />
                <MyCard
                    icon="heart"
                    title="Apoio"
                    description="Conte com recursos de suporte pedagógico e emocional para garantir seu bem-estar."
                    color="#8b5cf6"
                />

                <MyCard
                    icon="presentation"
                    title="Infra"
                    description="Registre os equipamentos relacionados ao ambiente escolar."
                    color="#f97316"
                />
            </View>
        </MyView>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#813AB1',
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center'
    },

    containerIcons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        marginTop: 20
    },

    card: {
        padding: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        width:350,
        borderRadius: 8,
        gap: 16,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

        borderWidth: 1,
        borderColor: '#9C44E2',
    },

    imageIcon: {
        resizeMode: 'contain',
        width: 200,
        height: 200
    },

    containerGrades: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
});