import React, { useState }  from 'react';  //importando objeto react e useState da biblioteca do react
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';


export default function productScreen(){
//aqui é typescript

    const [req, setReq] = useState({
        description:'',
        name:'',
        id: 0,
        createAt:  new Date().toISOString(),
        userId: 0,
    });

    const [products, setProducts] = useState<{ 
        description: string,
        name: string,
        id: number,
        userId: number,
        createAt: string
        }[]>([]);

        function handleRegister(){  
            setProducts([...products, req]) 
            setReq({
                description:'',
                name:'',
                id: 0,
                createAt:  new Date().toISOString(),
                userId: 0,})  
        }

    return (
        <View>
                {/*aqui é typescript dentro do front */ }
                <Text>
                    Minha tela dos Produtos</Text>
                    <View style={styles.row}>
                        <View style={styles.form}>
                            
                            <TextInput
                            placeholder="Digite o nome"
                            value={req.name}
                            onChangeText={(text)=> setReq({...req, name: text})}
                            />
                            {req.name}
                            <TextInput
                            placeholder="Digite a descrição" 
                            value={req.description}
                            onChangeText={(text)=> setReq({...req, description: text})}
                            />
                            {req.description}

                            <Button color="purple" title="Cadastrar" onPress={handleRegister} />

                        </View>
                        
                    </View> 
            </View>
    );
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    form: {
        flex: 1,
        marginRight: 10,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    Button: {
        backgroundColor:'#fff',
        padding: 20,
        borderRadius: 8,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }
    
})
    












