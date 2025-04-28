import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MyList from '../src/components/MyList';
import MyView from '../src/components/MyView';
import { deleteUserById, getUsers, iUser } from '../src/controllers/users';

export default function UserScreen() {
    const router = useRouter();
    const [users, setUsers] = useState<iUser[]>([])

    useEffect(() => {
        async function getTodos() {
            const retorno = await getUsers({})
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setUsers(retorno.data);
            }
        }
        getTodos()
    }, [])



    function editUser(id: number) {
        router.push(`/registerUser?id=${id}`);
    }

    async function deleteUser(id: number) {
        const sucesso = await deleteUserById(id)
        if (sucesso) {
            const updatedList = users.filter(u => u.id !== id)
            setUsers(updatedList)
        } else {
            alert("Erro ao deletar usuário.")
        }
    }

    return (
        <MyView style={{ backgroundColor: '#7B28BB' }} >
            <ScrollView>
                <Text style={styles.TextIntroducao}>Usuários Cadastrados</Text>
                <View style={styles.form}>
                    <MyList
                        data={users}
                        keyItem={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemText}>Nome: {item.name}</Text>
                                <Text style={styles.itemText}>CPF: {item.cpf}</Text>
                                <Text style={styles.itemText}>Email: {item.email}</Text>
                                <Text style={styles.itemText}>Idade: {item.age}</Text>
                                <Text style={styles.itemText}>Endereço: {item.address}</Text>
                                <Text style={styles.itemText}>Contato: {item.contact}</Text>
                                <Text style={styles.itemText}>Criação: {item.createAt}</Text>

                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteUser(item.id)}>
                                        <Text style={styles.buttonText}>X</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.editButton} onPress={() => editUser(item.id)}>
                                        <Text style={styles.buttonText}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </MyView>
    );
}



const styles = StyleSheet.create({
    form: {
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        width: '100%',
        maxWidth: 500,
        alignSelf: 'center',
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

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
});