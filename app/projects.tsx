import React, { useState } from 'react'; // Esta importando da biblioteca do react para atualizar automaticamente 
import { StyleSheet, View, Text, TextInput, Button, FlatList, } from 'react-native'; 


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
        setProjects([... projects, req])
        setReq({
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
        })
    }
    /* Usar quando for possivel colocar numeros 
    function 
            formatCPF(campo) {
                let cpf = campo.value.replace(/\D/g, ''); // Remove tudo o que não for número
                if (cpf.length <= 3) {
                    campo.value = cpf;
                } else if (cpf.length <= 6) {
                    campo.value = cpf.replace(/(\d{3})(\d{1,})/, '$1.$2');
                } else if (cpf.length <= 9) {
                    campo.value = cpf.replace(/(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3');
                } else if (cpf.length <= 11) {
                    campo.value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3-$4');
                }
            }
    */
    // Criando o textinput para receber e exibir o texto "placeholder" para o usuario digitar
    return ( // Esta sendo feito um emcapsulamento com a abertura da () / {req.description}= usado para mostar o codigo em baixo
        <View>
            {/* Aqui é typescript dentro do front */}
            <Text> PROJETOS </Text>
            <View style={styles.row}>
                <View style={styles.form}> 
                    
                    <Text> Criador do projeto:
                    <TextInput 
                        placeholder=""
                        value={req.name}
                        onChangeText={(text) => setReq({...req ,name: text})}
                    />
                    CPF:
                    <TextInput
                        placeholder=""
                        
                    />
                    </Text>

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
                            <Text style={projectText}> Criador: {item.name} </Text>
                            <Text style={projectText}> Nome do Projeto: {item.namep} </Text> 
                            <Text style={projectText}> Url: {item.url} </Text>
                            <Text style={projectText}> Numero do Usuario: {item.userId} </Text>
                            <Text style={projectText}> Recursos: {item.recurces} </Text>
                            <Text style={projectText}> Descrição: {item.description} </Text>
                            <Text style={projectText}> Atividade: {item.activity} </Text>
                            <Text style={projectText}> Tempo Esperado: {item.timeline} </Text>
                            <Text style={projectText}> Objetivo: {item.objective} </Text>
                            <Text style={projectText}> Metodologia: {item.methodology} </Text>
                        </View>
                    )}
                />
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

});