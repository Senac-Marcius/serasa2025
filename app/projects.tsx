import React, { Children, useState } from 'react'; // Esta importando da biblioteca do react para atualizar automaticamente 
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, } from 'react-native'; 
import MySearch from '../src/components/Mysearch'
import { ScrollView } from 'react-native-gesture-handler';
import { Input, TextArea } from 'native-base';
import {MyTextArea} from '../src/components/Myinputs'
/*import { textStyles } from '../styles/textStyles';*/

interface Project {
    name: string;
    namep: string;
    id: number;
    url: string;
    createAt: string;
    userId: number;
    recurces: number;
    description: string;
    activity: string;
    timeline: string;
    objective: string;
    methodology: string;
}


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

    const [ projects, setProjects ] = useState<Project[]>([]);

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
        const list = projects.filter((item) => item.id !== id);
        setProjects(list);

    }

    function adicionarProtocolo(url) {
        if (!/^https?:\/\//i.test(url)) {
            return 'https://' + url;  // Adiciona 'https://' se não estiver presente
        }
        return url;
    }

    // Criando o textinput para receber e exibir o texto "placeholder" para o usuario digitar
    return ( // Esta sendo feito um emcapsulamento com a abertura da () / {req.description}= usado para mostar o codigo em baixo
        <ScrollView>
            <MySearch style={{padding: 20, }}>
                <Text> Responda de Maneira Objetiva </Text>
            </MySearch>
            
            <View style={styles.contentContainer}>
                <Text style={styles.title}>PROJETOS</Text>
            
                {/* Aqui é typescript dentro do front */}
                <Text>  Responda de Maneira Objetiva  </Text>
                <View style={styles.row}> 
                        
                    <View style={styles.form}>
                        <Text style={styles.label}>Criador do projeto:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            value={req.name}
                            onChangeText={(text) => setReq({ ...req, name: text })}
                        />

                        <Text style={styles.label}> Nome do projeto: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            value={req.namep}
                            onChangeText={(text) => setReq({ ...req, namep: text })}
                        />
                        Site:
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            value={req.url}
                            onChangeText={(text) => setReq({ ...req, url: adicionarProtocolo(text) })}
                        />
                        
                        <Text  style={styles.label}> Previsão de Inicio: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            value={req.createAt}
                            onChangeText={(text) => setReq({ ...req, createAt: text })}
                        />
                        
                        <Text style={styles.label}> Periodo Esperado: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            value={req.timeline}
                            onChangeText={(text) => setReq({ ...req, timeline: text })}
                        />
                        
                        <Text style={styles.label}> Descrição: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            value={req.description}
                            onChangeText={(TextArea) => setReq({ ...req, description: TextArea })}
                        />
                        
                        <Text style={styles.label}> Objetivo: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            value={req.objective}
                            onChangeText={(text) => setReq({ ...req, objective: text })}
                        />
                        
                        <Text style={styles.label}> Qual Atividade proposta: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            value={req.activity}
                            onChangeText={(text) => setReq({ ...req, activity: text })}
                        />
                        
                        <Text style={styles.label}> Quais as Metodologias abordadas: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            value={req.methodology}
                            onChangeText={(text) => setReq({ ...req, methodology: text })}
                        />

                        <MyTextArea
                        iconName='message'
                        label="Descrição"
                        value={req.methodology} // Passa o estado como valor
                        onChangeText={(text) => setReq({ ...req, methodology: text })} // Atualiza o estado ao digitar
                        placeholder="Digite sua mensagem aqui..."
                        style={{ height: 150 }}
                        />

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
                                    <TouchableOpacity style={styles.buttonEdit} onPress={ () =>  editProject(item.id) }>  
                                        <Text style={styles.buttonText}>EDIT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonDelete} onPress={ () =>  dellProject( item.id)}>  
                                        <Text style={styles.buttonText}>DELETE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </ScrollView>
    ); 
}

/** <Button title='EDIT' />
    <Button title='DELETE' /> - Esse botão não permite modificar a forma de vizualizar o botão*/ 

const styles = StyleSheet.create({
    contentContainer: {
        padding: 20,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 15,
    },

    headerText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
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
        paddingHorizontal: 20,
        borderRadius: 10,
        color: '#ffffff',
    },
    buttonDelete: {
        backgroundColor: '#F44336', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        color: '#ffffff',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

});