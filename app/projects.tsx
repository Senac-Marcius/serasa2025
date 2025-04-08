import React, { useEffect, useState } from 'react'; // Esta importando da biblioteca do react para atualizar automaticamente 
import { StyleSheet, View, FlatList, TouchableOpacity, } from 'react-native'; 
import MySearch from '../src/components/MySearch';
import MyButton from '../src/components/MyButtons';
import Mytext from '../src/components/MyText';
import MyView from '../src/components/MyView';
import MyList from '../src/components/MyList';
import { Myinput, MyTextArea } from '../src/components/MyInputs';
import { useRouter } from 'expo-router';
import MyCalendar from '../src/components/MyCalendar';
import { iProject , setProject, updateProject, deleteProject } from '../src/controlador/projects';
import { supabase } from '../src/utils/supabase';
import { MyItem } from '../src/components/MyItem';
import { Picker } from '@react-native-picker/picker';

// Esse é o Projeto Correto 


export default function ProjectScreen(){ 
    const[projects, setProjects] = useState<iProject[]>([]);

    // Estado para a moeda escolhida e valor bruto digitado pelo usuário
const [currency, setCurrency] = useState('BRL'); // Moeda selecionada (BRL, USD, EUR)
const [rawRecurces, setRawRecurces] = useState(''); // Valor como string para exibir formatado

// Função para formatar o número como moeda
const formatCurrency = (value: number, currency: string = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(value);
};

// Função para converter texto do input em número (ex: 1.000,50 => 1000.5)
const parseCurrencyInput = (text: string): number => {
  const cleanText = text.replace(/[^\d,]/g, '').replace(',', '.'); // remove tudo exceto dígitos e vírgula
  return parseFloat(cleanText) || 0;
};

// Aqui é typescript
    const [req, setReq] = useState ({
        name: '',
        namep: '',
        id: -1,
        url: '',
        created_at: new Date().toISOString(),
        user_id: 1,
        recurces: 0,
        description: '',
        activity: '',
        time_line: '',
        objective: '',
        methodology: '',
        techniques: '', 
        strategies: '', 
        planning: '',
        process:'',
    });

    useEffect(() => {
        async function getTodos() {
          const { data: todos } = await supabase.from('projects').select()
    
          if ( todos && todos.length > 0) {
            setProjects(todos)
          }
        }
    
        getTodos()
      }, [])


    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [busca, setBusca] = useState('');
    const router = useRouter();

    interface CalendarDate {
        year: number;
        month: number;
        day: number;
    }

    async function handleRegister(){
        if(req.id == -1){ //aqui é quando esta cadastrando
            const newid = projects.length ? projects[projects.length -1].id + 1 : 0;
            const newProjects = { ...req, id: newid };

            console.log("Cadastrando no Supabase:", newProjects);

            setProjects([... projects, newProjects])
            await setProject(newProjects)
        
        }else{ //aqui é quando esta editando id esta maior do que -1
            setProjects(projects.map(jTNL => (jTNL.id == req.id)? req : jTNL ));
            await updateProject(req); 
        }
        
        setReq({
            name: '',
            namep: '',
            id: -1,
            url: '',
            created_at: new Date().toISOString(),
            user_id: 1,
            recurces: 0,
            description: '',
            activity: '',
            time_line: '',
            objective: '',
            methodology: '',
            techniques: '', 
            strategies: '', 
            planning: '',
            process:'',
        })

    }

    function editProject(id: number){
        const project = projects.find(item => item.id == id)
        if(project)
            setReq(project)

        console.log("Dados enviados para o Supabase:", projects);
    }

    async function dellProject(id: number){
        const list = projects.filter((item) => item.id !== id);
        setProjects(list);
        await deleteProject(id);

        
    }

    function adicionarProtocolo(url: string){
        if (!/^https?:\/\//i.test(url)) {
            return 'https://' + url;  // Adiciona 'https://' se não estiver presente
        }
        return url;
    }

    function buscar() {
        const resultado = projects.filter((p) => 
            p.name.toLowerCase().includes(busca.toLowerCase()) ||
            p.namep.toLowerCase().includes(busca.toLowerCase())
        );
        console.log("Resultados da busca:", resultado);
    }
    
    // Criando o textinput para receber e exibir o texto "placeholder" para o usuario digitar
    return ( // Esta sendo feito um emcapsulamento com a abertura da () / {req.description}= usado para mostar o codigo em baixo
        <MyView router={router} >
            <MySearch 
                style={{ padding: 20 }} 
                onChangeText={setBusca}
                onPress={buscar}
                busca={busca}
            />
                
            
            <View style={styles.contentContainer}>
                <Mytext style={styles.title}>PROJETOS</Mytext>
            
                {/* Aqui é typescript dentro do front */}
                <Mytext> ✨ Vamos Inovar ✨ </Mytext>
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
                        
                        <Mytext style={styles.label}> Recursos: </Mytext>
                        <Myinput
                        iconName=""
                        label=""
                        placeholder="Digite o valor..."
                        value={rawRecurces} // Mostra valor formatado
                        onChangeText={(text) => {
                            setRawRecurces(text); // Salva o valor como string
                            const parsed = parseCurrencyInput(text);
                            setReq({ ...req, recurces: parseCurrencyInput(text) }); // Atualiza como número para salvar no Supabase
                        }}
                        />

                        <Mytext style={[styles.label, { marginTop: 10 }]}> Moeda: </Mytext>

                        <Picker
                            selectedValue={currency}
                            style={{ marginBottom: 15 }}
                            onValueChange={(itemValue) => setCurrency(itemValue)}
                            >
                            <Picker.Item label="R$ - Real" value="BRL" />
                            <Picker.Item label="$ - Dólar" value="USD" />
                            <Picker.Item label="€ - Euro" value="EUR" />
                        </Picker>


                        <Mytext style={styles.label}>Previsão de Início:</Mytext>
                        <MyCalendar
                            date={date} setDate={setDate} icon="FaCalendarDays" 
                        />

                        <Mytext style={styles.label}> Periodo Esperado: </Mytext>
                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 5 }}>
                                <Mytext style={[styles.label, { fontSize: 18, fontWeight: '600' }]}>Início</Mytext>
                                <MyCalendar
                                date={date} // usa o mesmo estado
                                setDate={setDate} // mesma função
                                icon="FaCalendarDays"
                                />
                            </View>

                            <View style={{ flex: 1, marginLeft: 5 }}>
                                <Mytext style={[styles.label, { fontSize: 18, fontWeight: '600' }]}>Término</Mytext>
                                <MyCalendar
                                date={date} // mesmo estado novamente
                                setDate={setDate} // mesma função
                                icon="FaCalendarDays"
                                />
                            </View>
                        </View>
                        
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

                    
                    
                    <MyList
                        data={projects}
                        keyItem={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            
                            <MyItem style={styles.projectContainer}
                                onDel={ () =>  dellProject( item.id)}
                                onEdit={ () =>  editProject(item.id)}
                            > 
                                <Mytext style={styles.projectText}> Criador: {item.name} </Mytext>
                                <Mytext style={styles.projectText}> Nome do Projeto: {item.namep} </Mytext> 
                                <Mytext style={styles.projectText}> Url: {item.url} </Mytext>
                                <Mytext style={styles.projectText}> Numero do Usuario: {item.user_id} </Mytext>
                                <Mytext style={styles.projectText}> Recursos: {item.recurces} </Mytext>
                                <Mytext style={styles.projectText}> Descrição: {item.description} </Mytext>
                                <Mytext style={styles.projectText}> Atividade: {item.activity} </Mytext>
                                <Mytext style={styles.projectText}> Tempo Esperado: {item.timeline} </Mytext>
                                <Mytext style={styles.projectText}> Objetivo: {item.objective} </Mytext>
                                <Mytext style={styles.projectText}> Metodologia: {item.techniques} </Mytext>
                                <Mytext style={styles.projectText}> Metodologia: {item.process} </Mytext>
                                <Mytext style={styles.projectText}> Metodologia: {item.strategies} </Mytext>
                                <Mytext style={styles.projectText}> Metodologia: {item.planning} </Mytext>
                            </MyItem>
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
        alignItems: 'center',
    },

    buttonContainer: {
        alignItems: 'center', // Alinha o botão horizontalmente no centro
        marginTop: 20,        // Dá um espaço acima do botão
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    title: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        alignItems: 'center',
    },

    label: {
        fontSize: 18,
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
        width: '80%',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
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