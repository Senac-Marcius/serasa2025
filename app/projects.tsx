import React, { useState } from 'react'; // Esta importando da biblioteca do react para atualizar automaticamente 
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity,  } from 'react-native'; 
import MySearch from '../src/components/Mysearch'


export default function ProjectScreen(){
// Aqui é typescript
    const [req, setReq] = useState ({
        name: '',
        namep: '',
        id: -1,
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

    const [ projects, setProjects ] = useState<{
        
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
    } []>( [] );

    function handleRegister(){

        if(req.id == -1){ //aqui é quando esta cadastrando
            const newid = projects.length ? projects[projects.length -1].id + 1 : 0;
            const newProjects = { ...req, id: newid };

            setProjects([... projects, newProjects])
        }else{ //aqui é quando esta editando id esta maior do que -1
            setProjects(projects.map(jTNL => (jTNL.id == req.id)? req : jTNL )); 
        }
        
        setReq({
            name: '',
            namep: '',
            id: -1,
            url: '',
            createAt: new Date().toISOString(),
            userId: 0,
            recurces: 0,
            description: '',
            activity: '',
            timeline: '',
            objective: '',
            methodology: '',
        })

    }

    function editProject(id: number){
        const project = projects.find(item => item.id == id)
        if(project)
            setReq(project)
    }

    function dellProject(id:number){
        const list = projects.filter((item => item.id !== id));<Text> ⚠ </Text>
        setProjects(list)
    }
    
    // Criando o textinput para receber e exibir o texto "placeholder" para o usuario digitar
    return ( // Esta sendo feito um emcapsulamento com a abertura da () / {req.description}= usado para mostar o codigo em baixo
        <View>
            <MySearch />
            
            {/* Aqui é typescript dentro do front */}
            <Text> PROJETOS </Text>
            <View style={styles.row}>
                <View style={styles.form}> 
                    
                    <Text> Criador do projeto:</Text>
                    <TextInput 
                        placeholder=""
                        value={req.name}
                        onChangeText={(text) => setReq({...req ,name: text})}
                    />

                    <Text> Nome do projeto:
                    <TextInput 
                        placeholder="" 
                        value={req.namep}
                        onChangeText={(text) => setReq({...req ,namep: text})}
                    /> 
                     Site:
                    <TextInput
                        placeholder=""
                        value={req.url}
                        onChangeText={(text) => setReq({...req, url: text})}
                    />
                    </Text>
                    
                    <Text> Previsão de Inicio:
                    <TextInput
                        placeholder=""
                        value={req.createAt}
                        onChangeText={(text) => setReq({...req ,createAt: text})}
                    />
                    </Text>

                    <Text> Periodo Esperado:
                    <TextInput 
                        placeholder="" 
                        value={req.timeline}
                        onChangeText={(text) => setReq({...req ,timeline: text})}
                    />
                    </Text>

                    <Text> Descrição :
                    <TextInput
                        placeholder="" 
                        value={req.description}
                        onChangeText={(text) => setReq({...req ,description: text})}
                    />
                    </Text>
                    
                    <Text> Objetivo:
                    <TextInput 
                        placeholder="" 
                        value={req.objective}
                        onChangeText={(text) => setReq({...req ,objective: text})}
                    />
                    </Text>

                    <Text> Qual Atividade proposta:
                    <TextInput
                        placeholder=""
                        value={req.activity}
                        onChangeText={(text) => setReq({...req ,activity: text})}
                    />
                    </Text>

                    <Text> Quais as Metodologias abordadas:
                    <TextInput
                        placeholder=""
                        value={req.methodology}
                        onChangeText={(text) => setReq({...req ,methodology: text })}
                    />
                    </Text>

                    <Button title="Cadastrar" onPress={ handleRegister }/>  
                </View> 

                
                
                <FlatList
                    data={projects}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.projectContainer}> 
                            <Text style={styles.projectText}> Criador: {item.name} </Text>
                            <Text style={styles.projectText}> Nome do Projeto: {item.namep} </Text> 
                            <Text style={styles.projectText}> Url: {item.url} </Text>
                            <Text style={styles.projectText}> Numero do Usuario: {item.userId} </Text>
                            <Text style={styles.projectText}> Recursos: {item.recurces} </Text>
                            <Text style={styles.projectText}> Descrição: {item.description} </Text>
                            <Text style={styles.projectText}> Atividade: {item.activity} </Text>
                            <Text style={styles.projectText}> Tempo Esperado: {item.timeline} </Text>
                            <Text style={styles.projectText}> Objetivo: {item.objective} </Text>
                            <Text style={styles.projectText}> Metodologia: {item.methodology} </Text>

                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.buttonEdit} onPress={ () =>  editProject(item.id) }> EDIT </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonDelete} onPress={ () =>  dellProject( item.id)}> DELETE </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    ); 
}

/** <Button title='EDIT' />
    <Button title='DELETE' /> - Esse botão não permite modificar a forma de vizualizar o botão*/ 

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

    projectContainer: {
        marginBottom: 15,        // Espaço entre os projetos
        padding: 10,             // Espaçamento interno
        backgroundColor: '#FFF', // Fundo branco para cada projeto
        borderRadius: 8,         // Bordas arredondadas
        borderWidth: 1,          // Borda ao redor de cada projeto
        borderColor: '#ddd',     // Cor da borda
        width: '100%',           // Garante que ocupe toda a largura
        flexDirection: 'column', // Coloca os itens de um projeto em uma coluna
    },

    projectText: {
        fontSize: 14,
        color: '#333',           // Cor do texto
        marginBottom: 5,         // Espaço entre os textos
        flexWrap: 'wrap',        // Permite quebra de linha se necessário
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 10,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
     
    },

    buttonEdit: {
        backgroundColor: '#ffff00', 
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 2,
        color: '#ffffff',
    },
    buttonDelete: {
        backgroundColor: '#F44336', 
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 2,
        color: '#ffffff',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

});