import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MyButton from '../src/components/MyButtons';
import { Myinput } from '../src/components/MyInputs';
import MyView from '../src/components/MyView';
import { getUserById, getUsers, iUser, setUser, updateUserById } from '../src/controllers/users';

export default function UserScreen() {
    const { id } = useLocalSearchParams();
    const [users, setUsers] = useState<iUser[]>([])
    const router = useRouter();

    const [req, setReq] = useState({
        name: '',
        password: '',
        cpf: '',
        age: '',
        contact: '',
        email: '',
        address: '',
        createAt: new Date().toISOString(),
        id: -1,
    });
    //visualizo se o id existe no campo da url, caso exista eu edito.

    useEffect(() => {
        async function getTodos() {
            const retorno = await getUsers({})
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setUsers(retorno.data);
            }
        }
        getTodos()
    }, [])

    useEffect(() => {
        async function fetchUser() {
            //se não existe o id, eu retorno
            if (!id) return;

            const retorno = await getUserById(Number(id));
            if (retorno?.status && retorno.data) {
                setReq(retorno.data);
            } else {
                alert("Usuário não encontrado.");
            }
        }
        fetchUser();
    }, [id]);

  

    async function handleRegister() {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

        // if (!req.name || !req.address || !req.password || !req.email || !req.age || req.contact) {
        //     alert("Preencha todos os campos obrigatórios.");
        //     return;
        // }

        // if (!cpfRegex.test(req.cpf)) {
        //     alert("CPF inválido. Use formato XXX.XXX.XXX-XX ou apenas 11 dígitos.");
        //     return;
        // }

        // if (!emailRegex.test(req.email)) {
        //     alert("E-mail inválido. Use username@domain.com");
        //     return;
        // }

        // if (!phoneRegex.test(req.contact)) {
        //     alert("Contato inválido. Ex: (XX) XXXXX-XXXX");
        //     return;
        // }

        // if (isNaN(Number(req.age)) || Number(req.age) < 0) {
        //     alert("Idade inválida.");
        //     return;
        // }
        if (req.id == -1) {
            const newId = users.length ? users[users.length - 1].id + 1 : 0
            const newUser = { ...req, id: newId }
            setUsers([...users, newUser])
            const result = await setUser(newUser)
            console.log(users)
            router.push("/")

        } else {
            setUsers(users.map(u => (u.id == req.id ? req : u)))

            const sucesso = await updateUserById(req.id, req)
            if (!sucesso) {
                alert("Erro ao atualizar usuário.")
                return
            }

        }


        setReq({
            name: '',
            password: '',
            cpf: '',
            age: '',
            contact: '',
            email: '',
            address: '',
            createAt: new Date().toISOString(),
            id: -1,
        })
    }
    
    return (
        <MyView style={{ backgroundColor: '#7B28BB' }} >
            <ScrollView>
                <View style={styles.form}>
                    <Text style={styles.TextIntroducao}>Cadastro de usuário</Text>
                    <View style={styles.container}>
                        <View style={styles.formContainer}>
                            <Myinput value={req.name} onChangeText={(text) => setReq({ ...req, name: text })} placeholder="Digite seu nome..." label="Login" iconName='person' />
                            <Myinput value={req.password} onChangeText={(text) => setReq({ ...req, password: text })} placeholder="Digite a sua senha..." label="Password" iconName='password' />
                            <Myinput value={req.cpf} onChangeText={(text) => setReq({ ...req, cpf: text })} placeholder="Digite o seu CPF" label="CPF:" iconName='article' />
                            <Myinput value={req.age} onChangeText={(text) => setReq({ ...req, age: text })} placeholder="Digite a sua idade" label="Idade:" iconName='celebration' />
                            <Myinput value={req.contact} onChangeText={(text) => setReq({ ...req, contact: text })} placeholder="(XX) XXXXX-XXXX" label="Contato:" iconName='phone' />
                            <Myinput value={req.email} onChangeText={(text) => setReq({ ...req, email: text })} placeholder="domain@domain.com" label="Email:" iconName='mail' />
                            <Myinput value={req.address} onChangeText={(text) => setReq({ ...req, address: text })} placeholder="Digite o seu endereço" label="Endereço" iconName='house' />

                            <View style={{ display: 'flex', alignItems: 'center' }}>
                                <MyButton
                                    title="CADASTRAR"
                                    onPress={handleRegister}
                                    button_type="round"
                                    style={styles.button_round}


                                />

                            </View>
                        </View>
                        <Image source={require('../assets/imageUserLogin.svg')} style={styles.image} />
                    </View>
                </View>
            </ScrollView>
        </MyView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    formContainer: {
        backgroundColor: '#ffffff',
        width: 400,
        shadowColor: 'purple',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        /* justifyContent: 'center',
        alignItems: 'center', */
        padding: 30,
        marginRight: 250,
        borderRadius: 20
    },

    form: {
        //engloba a imagem e o forms
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        width: '100%', // Para evitar que fique muito estreito
        maxWidth: 500, // Define um limite máximo
        alignSelf: 'center', // Garante que fique centralizado
    },

    itemContainer: {
        padding: 20,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        borderColor: 'purple',
        borderWidth: 0.1,
        shadowColor: 'purple',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        width: 400,
    },

    startButton: {
        backgroundColor: '#813AB1',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },

    startRegistros: {
        backgroundColor: '#BFBFBF',
        padding: 10,
        color: '',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 2,
    },

    closeButton: {
        backgroundColor: '#d9534f',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    button_round: {
        backgroundColor: "#813AB1",
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    TextIntroducao: {
        color: '#6A1B9A',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 0.5,
        shadowColor: 'purple',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        marginBottom: 30
    },

    itemText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },

    buttonsContainer: {
        flexDirection: 'row',
        gap: 20,
    },

    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignItems: 'center',
    },

    editButton: {
        backgroundColor: '#281259',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignItems: 'center',
    },

    image: {
        width: '100%', // A largura vai ser 100% do contêiner
        height: 600, // Aumente a altura para o tamanho desejado
        resizeMode: 'contain', // Garante que a imagem se ajuste bem ao espaço
        marginBottom: 20, // Mantém o espaçamento entre a imagem e o restante do conteúdo
    }
});