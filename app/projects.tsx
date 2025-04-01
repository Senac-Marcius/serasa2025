import React, { Children, useState } from 'react'; // Esta importando da biblioteca do react para atualizar automaticamente 
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, } from 'react-native'; 
import MySearch from '../src/components/Mysearch'
import { ScrollView } from 'react-native-gesture-handler';
import {MyTextArea } from '../src/components/Myinputs'
import MyButton from '../src/components/Mybuttons';
import Mytext from '../src/components/Mytext';
import MyView from '../src/components/MyView';
import { Myinput } from '../src/components/Myinputs';
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
    techniques: string;
    strategies: string;
    planning: string;
    process: string;
}

const [visible, setVisible] = useState(false)


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
        techniques: '', 
        strategies: '', 
        planning: '',
        process:'',
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
            techniques: '', // Tecnicas 
            strategies: '', // Estratégias
            planning: '', // Planejamento 
            process: '', // processos
            /** Criar Processos, tecnicas, Estratégias e Planejamento aqui e puxar la embaixo para poder funcionar  */
        })

    }

    function editProject(id: number){
        const project = projects.find(item => item.id == id)
        if(project)
            setReq(project)
    }

    function dellProject(id: number){
        const list = projects.filter((item) => item.id !== id);
        setProjects(list);

    }

    function adicionarProtocolo(url: string){
        if (!/^https?:\/\//i.test(url)) {
            return 'https://' + url;  // Adiciona 'https://' se não estiver presente
        }
        return url;
    }

    function buscar(){

    }

    const [busca, setBusca] = useState('')
    // Criando o textinput para receber e exibir o texto "placeholder" para o usuario digitar
    return ( // Esta sendo feito um emcapsulamento com a abertura da () / {req.description}= usado para mostar o codigo em baixo
        <MyView>
            <MySearch 
                style={{ padding: 20 }} 
                onChangeText={setBusca}
                onPress={buscar}
                busca={busca}
            />
                
            
            <View style={styles.contentContainer}>
                <Mytext style={styles.title}>PROJETOS</Mytext>
            
                {/* Aqui é typescript dentro do front */}
                <Mytext>  Responda de Maneira Objetiva  </Mytext>
                <View style={styles.row}> 
                        
                    <View style={styles.form}>
                        <Mytext style={styles.label}>Criador do projeto:</Mytext>
                        <Myinput
                            iconName=''
                            label =''
                            placeholder="Nome Completo"
                            value={req.name}
                            onChangeText={(text) => setReq({ ...req, name: text })}
                        />

                        <Mytext style={styles.label}> Nome do projeto: </Mytext>
                        <Myinput
                            iconName=''
                            label =''
                            placeholder="Digite aqui..."
                            value={req.namep}
                            onChangeText={(text) => setReq({ ...req, namep: text })}
                        />
                        <Mytext style={styles.label}> Site: </Mytext>
                        <Myinput
                            iconName=''
                            label =''
                            placeholder="Digite aqui..."
                            value={req.url}
                            onChangeText={(text) => setReq({ ...req, url: adicionarProtocolo(text) })}
                        />
                        
                        <Mytext  style={styles.label}> Previsão de Inicio: </Mytext>
                        <Myinput
                            iconName=''
                            label =''
                            placeholder=""
                            value={req.createAt}
                            onChangeText={(text) => setReq({ ...req, createAt: text })}
                        />
                        
                        <Mytext style={styles.label}> Periodo Esperado: </Mytext>
                        <Myinput
                            iconName=''
                            label =''
                            placeholder=""
                            value={req.timeline}
                            onChangeText={(text) => setReq({ ...req, timeline: text })}
                        />
                        
                        <Mytext style={styles.label}> Descrição: </Mytext>
                        <Myinput
                            iconName=''
                            label =''
                            placeholder="Digite aqui..."
                            value={req.description}
                            onChangeText={(TextArea) => setReq({ ...req, description: TextArea })}
                        />
                        
                        <Mytext style={styles.label}> Objetivo: </Mytext>
                        <Myinput
                            iconName=''
                            label =''
                            placeholder="Digite aqui..."
                            value={req.objective}
                            onChangeText={(text) => setReq({ ...req, objective: text })}
                        />
                        
                        <Mytext style={styles.label}> Qual Atividade proposta: </Mytext>
                        <Myinput
                            iconName=''
                            placeholder="Digite aqui..."
                            value={req.activity}
                            onChangeText={(text) => setReq({ ...req, activity: text })}
                            label=''
                            
                        />
                        
                        <Mytext style={styles.label}> Quais as Metodologias abordadas: </Mytext>
                            <View style={styles.row}>
                                <MyTextArea
                                    iconName='message'
                                    label="Técnicas"
                                    value={req.techniques} // Passa o estado como valor
                                    onChangeText={(text) => setReq({ ...req, techniques: text })} // Atualiza o estado ao digitar
                                    placeholder="Digite aqui..."
                                    style={{ height: 50 }}
                                />
                                <MyTextArea
                                    iconName='message'
                                    label="Processos"
                                    value={req.process} // Passa o estado como valor
                                    onChangeText={(text) => setReq({ ...req, process: text })} // Atualiza o estado ao digitar
                                    placeholder="Digite aqui..."
                                    style={{ height: 50 }}
                                />
                            </View>

                            <View style={styles.row}>
                                <MyTextArea
                                    iconName='message'
                                    label="Estratégias"
                                    value={req.strategies} // Passa o estado como valor
                                    onChangeText={(text) => setReq({ ...req, strategies: text })} // Atualiza o estado ao digitar
                                    placeholder="Digite aqui..."
                                    style={{ height: 50 }}
                                />
                                <MyTextArea
                                    iconName='message'
                                    label="Planejamento"
                                    value={req.planning} // Passa o estado como valor
                                    onChangeText={(text) => setReq({ ...req, planning: text })} // Atualiza o estado ao digitar
                                    placeholder="Digite aqui..."
                                    style={{ height: 50 }}
                                />

                            </View>

                        <View style={styles.buttonContainer}> 
                            <MyButton title="Cadastrar" onPress={handleRegister} />
                        </View>
                    </View> 

                    
                    
                    <FlatList
                        data={projects}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.projectContainer}> 
                                <Mytext style={styles.projectText}> Criador: {item.name} </Mytext>
                                <Mytext style={styles.projectText}> Nome do Projeto: {item.namep} </Mytext> 
                                <Mytext style={styles.projectText}> Url: {item.url} </Mytext>
                                <Mytext style={styles.projectText}> Numero do Usuario: {item.userId} </Mytext>
                                <Mytext style={styles.projectText}> Recursos: {item.recurces} </Mytext>
                                <Mytext style={styles.projectText}> Descrição: {item.description} </Mytext>
                                <Mytext style={styles.projectText}> Atividade: {item.activity} </Mytext>
                                <Mytext style={styles.projectText}> Tempo Esperado: {item.timeline} </Mytext>
                                <Mytext style={styles.projectText}> Objetivo: {item.objective} </Mytext>
                                <Mytext style={styles.projectText}> Metodologia: {item.methodology} </Mytext>

                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity style={styles.buttonEdit} onPress={ () =>  editProject(item.id) }>  
                                        <Mytext style={styles.buttonText}>EDIT</Mytext>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonDelete} onPress={ () =>  dellProject( item.id)}>  
                                        <Mytext style={styles.buttonText}>DELETE</Mytext>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </MyView>
    ); 
}

/** <Button title='EDIT' />
    <Button title='DELETE' /> - Esse botão não permite modificar a forma de vizualizar o botão*/ 

const styles = StyleSheet.create({
    contentContainer: {
        padding: 20,
    },

    buttonContainer: {
            alignItems: 'center', // Alinha o botão horizontalmente no centro
            marginTop: 20,        // Dá um espaço acima do botão
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
        fontFamily: 'Poppins_400Regular',
        
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