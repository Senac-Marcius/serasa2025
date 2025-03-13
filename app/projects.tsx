import React, { useState } from 'react'; // Esta importando da biblioteca do react para atualizar automaticamente 
import { StyleSheet, View, Text, TextInput, Button} from 'react-native'; 


export default function ProjectScreen(){
// Aqui é typescript
    const [req, setReq] = useState ({
        name: '',
        namep: '',
        id: 0,
        url: '',
        createAt: new Date().toISOString(),
        userId: 0,
        recurces: 0,
        description: '',
        activity: '',
        timeline: '',
        objective: '',
        methodology: '',
    });

    const [ projects, setProjects ] = useState<(
        
        name: string,
        namep: string,
        id: number,
        url: string,
        createAt: string,
        userId: number,
        recurces: number,
        description: string,
        activity: string,
        timeline: string,
        objective: string,
        methodology: string,
    ) []>( [] );

    function handleRegister(){
        setProjects([...projects, req])
    }
    
    // Criando o textinput para receber e exibir o texto "placeholder" para o usuario digitar
    return ( // Esta sendo feito um emcapsulamento com a abertura da ()
        <View>
            {/* Aqui é typescript dentro do front */}
            <Text> Minha tela dos Projetos </Text>
            <View style={styles.row}>
                <View style={styles.form}> 
                    
                    <Text> Criador do projeto:</Text>
                    <TextInput 
                        placeholder=""
                        value={req.name}
                        onChangeText={(text) => setReq({...req ,name: text})}
                    />
                    {req.name}

                    <Text> Nome do projeto:
                    <TextInput 
                        placeholder="" 
                        value={req.namep}
                        onChangeText={(text) => setReq({...req ,namep: text})}
                    /> 
                    <TextInput
                        placeholder="Digite a URL"
                        value={req.url}
                        onChangeText={(text) => setReq({...req, url: text})}
                    />
                    </Text>
                    {req.namep}
                    {req.url}
                    
                    <Text> Previsão de Inicio:
                    <TextInput
                        placeholder=""
                        value={req.createAt}
                        onChangeText={(text) => setReq({...req ,createAt: text})}
                    />
                    </Text>
                    {req.createAt}

                    <Text> Periodo Esperado:
                    <TextInput 
                        placeholder="" 
                        value={req.timeline}
                        onChangeText={(text) => setReq({...req ,timeline: text})}
                    />
                    </Text>
                    {req.timeline}

                    <Text> Descrição :
                    <TextInput
                        placeholder="" 
                        value={req.description}
                        onChangeText={(text) => setReq({...req ,description: text})}
                    />
                    </Text>
                    {req.description}
                    
                    <Text> Objetivo:
                    <TextInput 
                        placeholder="" 
                        value={req.objective}
                        onChangeText={(text) => setReq({...req ,objective: text})}
                    />
                    </Text>
                    {req.objective}
                    
                    <Text> Recursos:
                    <TextInput
                        placeholder="Recursos" 
                        value={req.recurces}
                        onChangeText={(text) => setReq({...req ,recurces: text})}
                    />
                    </Text>
                    {req.recurces}

                    <Text> Qual Atividade proposta:
                    <TextInput
                        placeholder=""
                        value={req.activity}
                        onChangeText={(text) => setReq({...req ,activity: text})}
                    />
                    </Text>
                    {req.activity}

                    <Text> Quais as Metodologias abordadas:
                    <TextInput
                        placeholder="Quais suas metodologias"
                        value={req.methodology}
                        onChangeText={(text) => setReq({...req ,methodology: text})}
                    />
                    </Text>

                    <Button title="Cadastrar" onPress={ handleRegister }/>  
                </View> 
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
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

})