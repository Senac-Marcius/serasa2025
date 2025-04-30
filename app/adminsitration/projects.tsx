import React, { useEffect, useState } from 'react'; // Esta importando da biblioteca do react para atualizar automaticamente 
import { StyleSheet, View, TouchableOpacity, } from 'react-native'; 
import MySearch from '../../src/components/MySearch';
import MyButton from '../../src/components/MyButtons';
import Mytext from '../../src/components/MyText';
import MyView from '../../src/components/MyView';
import MyList from '../../src/components/MyList';
import { Myinput, MyTextArea  } from '../../src/components/MyInputs';
import { useRouter } from 'expo-router';
import MyCalendar from '../../src/components/MyCalendar';
import { iProject , setProject, updateProject, deleteProject, getProjects } from '../../src/controllers/projects';
import { supabase } from '../../src/utils/supabase';
import { MyItem } from '../../src/components/MyItem';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { MyModal } from '../../src/components/MyModal';
import { getUsers, toListUser } from '../../src/controllers/users';
import MySelect from '../../src/components/MySelect';


// Esse é o Projeto Correto 


export default function ProjectScreen(){ 
    const[projects, setProjects] = useState<iProject[]>([]);

    // Estado para a moeda escolhida e valor bruto digitado pelo usuário
const [currency, setCurrency] = useState('BRL'); // Moeda selecionada (BRL, USD, EUR)
const [rawRecurces, setRawRecurces] = useState(''); // Valor como string para exibir formatado


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

    const [idUs, setidUs] = useState<{key:number, option:string} []>([])

    const [integrantes, setIntegrantes] = useState<{key:number, option:string} []>([{key:-1, option:''}])

    function adicionarIntegrante() {
        setIntegrantes([...integrantes, {key: -1, option:''}]);
    }

    function atulizarIntegranteKey(pindex:number, pkey: number){
        const name = idUs.find(u => u.key == pkey)?.option || ''
        const i = { key: pkey, option: name}
        setIntegrantes( integrantes.map((jTNL, index) => (index == pindex ? i : jTNL)) );
        //console.log(integrantes)
    }


    useEffect(() => {
        (async () => {
            const retorno = await getProjects({})
            if (retorno.status && retorno.data && retorno.data.length > 0){
                setProjects(retorno.data);
            }
        })();
        /* Chamar o get do users para mostrar na caixa de seleção pelo nome do usuario  */
        (async () => {
            const retorno = await getUsers({})
            if (retorno.status && retorno.data && retorno.data.length > 0){
                setidUs( toListUser(retorno.data) )
            }
        })();
      }, [])


    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRevenues, setFilteredRevenues] = useState<iProject[]>([]);
    const router = useRouter();
    const navigation = useNavigation();
      
    interface CalendarDate {
        year: number;
        month: number;
        day: number;
    }

    async function handleRegister(){
        const recurcesValue = parseCurrencyInput(rawRecurces);
        
        if(req.id === -1){ //aqui é quando esta cadastrando
            const newid = projects.length ? projects[projects.length -1].id + 1 : 0;
            const newProjects = { ...req, id: newid };

            //console.log("Cadastrando no Supabase:", newProjects);

            setProjects([... projects, newProjects])
            await setProject(newProjects, integrantes)
        
        }else{ //aqui é quando esta editando id esta maior do que -1
            const updatedProject = { ...req, recurces: recurcesValue, integrantes };
            setProjects(projects.map(jTNL => (jTNL.id === req.id ? updatedProject : jTNL)));
            await updateProject(updatedProject); 
        }
        
        setReq({
            name: '',
            namep: '',
            id: -1,
            url: '',
            created_at: new Date().toISOString(),
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

        setRawRecurces('');
        setVisible(false)
    }

    const getFilteredProjects = () => {
        if (!searchTerm) return projects;
      
        const term = searchTerm.toLowerCase();
      
        return projects.filter(item => {
          return (
            item.name?.toLowerCase().includes(term) ||
            item.url?.toLowerCase().includes(term) ||
            item.objective?.toLowerCase().includes(term) ||
            item.time_line?.toLowerCase().includes(term) ||
            item.methodology?.toLowerCase().includes(term)
          );
        });
      };

    function editProject(id: number){
        const project = projects.find(item => item.id == id)
        if(project){
            setReq(project)
            setVisible(true)
        }

        //console.log("Dados enviados para o Supabase:", projects);
    }

    async function dellProject(id: number){
        const list = projects.filter((item) => item.id !== id);
        setProjects(list);
        await deleteProject(id);

        
    }

    // Função para formatar como moeda brasileira
    const formatCurrency = (value: string) => {
        const numeric = value.replace(/\D/g, ''); // remove tudo que não é número
        const number = parseFloat(numeric) / 100; // divide por 100 para considerar centavos
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    function adicionarProtocolo(url: string){
        if (!/^https?:\/\//i.test(url)) {
            return 'https://' + url;  // Adiciona 'https://' se não estiver presente
        }
        return url;
    }

    /*function buscar() {
        const resultado = projects.filter((p) => 
            p.name.toLowerCase().includes(busca.toLowerCase()) ||
            p.namep.toLowerCase().includes(busca.toLowerCase())
        );
        console.log("Resultados da busca:", resultado);
    }*/



    const [visible, setVisible] = useState(false)

      
    
    // Criando o textinput para receber e exibir o texto "placeholder" para o usuario digitar
    return ( // Esta sendo feito um emcapsulamento com a abertura da () / {req.description}= usado para mostar o codigo em baixo
       <ScrollView>
       <MyView router={router} >
            <MySearch 
                placeholder=''
                style={{ padding: 20 }} 
                onChangeText={setSearchTerm}
                onPress={() => setFilteredRevenues(getFilteredProjects())}
                busca={searchTerm}
            />

            {/** Fazer um campo de imput para integrantes do projeto com campo de adicionar integrante com a quantidade necessaria, para listar na tabela employess_projects */}    
            
            <View style={styles.contentContainer}>
                <Mytext style={styles.title}>PROJETOS</Mytext>

                <MyModal visible={visible} setVisible={() => setVisible(true)} title=''>
                    <ScrollView>
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

                            <Mytext style={styles.label}>Integrantes do Projeto:</Mytext>
                            {integrantes.map((uOption, index) => (
                            <View
                                key={index}
                                style={{ 
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    marginBottom: 12,
                                    gap: 8,
                                }}
                            >
                                <MySelect 
                                    label={uOption.option || "Selecione um usuario"}
                                    setLabel={() => {}}
                                    list={idUs}
                                    setKey={(key) => atulizarIntegranteKey(index, key)}
                                    caption={`Integrante ${index + 1}`}
                                >

                                </MySelect>

                                
                                <TouchableOpacity
                                    onPress={() => {
                                        const novos = [...integrantes];
                                        novos.splice(index, 1);
                                        setIntegrantes(novos);
                                    }}
                                    style={{
                                        backgroundColor: '#ff4d4f',
                                        borderRadius: 100,
                                        width: 36,
                                        height: 36,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                <Mytext style={{ color: '#fff', fontSize: 18 }}>–</Mytext>
                                </TouchableOpacity>
                                
                                
                                {index === integrantes.length - 1 && (
                                <TouchableOpacity
                                    onPress={adicionarIntegrante}
                                    style={{
                                        backgroundColor: '#28a745',
                                        borderRadius: 100,
                                        width: 36,
                                        height: 36,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Mytext style={{ color: '#fff', fontSize: 20 }}>+</Mytext>
                                </TouchableOpacity>
                                )}
                            </View>
                            ))}


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
                            
                            <Mytext style={styles.label}>Recursos:</Mytext>
                            <Myinput
                            iconName=""
                            label=""
                            placeholder="Digite o valor..."
                            
                            value={rawRecurces}
                            onChangeText={(text) => {
                                const formatted = formatCurrency(text);
                                setRawRecurces(formatted);
                                const numericValue = Number(formatted.replace(/\D/g, '')) / 100;
                                setReq(prev => ({ ...prev, recurces: numericValue }));
                            }}
                            />

                            <Mytext style={styles.label}>Previsão de Início:</Mytext>
                            <MyCalendar
                                date={date} setDate={setDate} 
                                label='' placeholder='' value='' 
                            />

                            <Mytext style={styles.label}> Periodo Esperado: </Mytext>
                            <View style={styles.row}>
                                <View style={{ flex: 1, marginRight: 5 }}>
                                    <Mytext style={[styles.label, { fontSize: 18, fontWeight: '600' }]}>Início</Mytext>
                                    <MyCalendar
                                    date={date} // usa o mesmo estado
                                    setDate={setDate} // mesma função
                                    label='' placeholder='' value=''
                                    />
                                </View>

                                <View style={{ flex: 1, marginLeft: 5 }}>
                                    <Mytext style={[styles.label, { fontSize: 18, fontWeight: '600' }]}>Término</Mytext>
                                    <MyCalendar
                                    date={date} // mesmo estado novamente
                                    setDate={setDate} // mesma função
                                    label='' placeholder='' value=''
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
                                placeholder="Liste em topicos..."
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
                                        style={{ height: 80 }}
                                    />
                                    <MyTextArea
                                        iconName='message'
                                        label="Processos"
                                        value={req.process} // Passa o estado como valor
                                        onChangeText={(text) => setReq({ ...req, process: text })} // Atualiza o estado ao digitar
                                        placeholder="Digite aqui..."
                                        style={{ height: 80 }}
                                    />
                                </View>

                                <View style={styles.row}>
                                    <MyTextArea
                                        iconName='message'
                                        label="Estratégias"
                                        value={req.strategies} // Passa o estado como valor
                                        onChangeText={(text) => setReq({ ...req, strategies: text })} // Atualiza o estado ao digitar
                                        placeholder="Digite aqui..."
                                        style={{ height: 80 }}
                                    />
                                    <MyTextArea
                                        iconName='message'
                                        label="Planejamento"
                                        value={req.planning} // Passa o estado como valor
                                        onChangeText={(text) => setReq({ ...req, planning: text })} // Atualiza o estado ao digitar
                                        placeholder="Digite aqui..."
                                        style={{ height: 80 }}
                                    />

                                    {/* <>Fazer um botão que ao clicar ele abre a caixa de seleção do usuario e quando clico no usuario ele adioca ao meu users </>*/}

                                </View>

                            <View style={styles.buttonContainer}> 
                                <MyButton title={req.id == -1? "Cadastrar" : "Atualizar"} onPress={handleRegister} />
                            </View>
                        </View> 

                    </View>   
                    </ScrollView>
                </MyModal>

                <View style={styles.listContainer}> 
                    <MyList 
                        data={projects}
                        keyItem={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                        // Container estilizado para cada item da lista
                            <MyItem style={styles.projectContainer}
                                onDel={() => dellProject(item.id)}
                                onEdit={() => editProject(item.id)}
                            >
                                {/* Agrupamento e identificação de cada campo com rótulo claro */}
                                <View style={styles.projectGroup}>
                                <Mytext style={styles.projectLabel}> Criador:</Mytext>
                                <Mytext style={styles.projectText2}>{item.name}</Mytext>

                                </View>

                                <View style={styles.projectGroup}>
                                <Mytext style={styles.projectLabel}> Nome do Projeto:</Mytext>
                                <Mytext style={styles.projectText2}>{item.namep}</Mytext>
                                </View>

                                <View style={styles.projectGroup}>
                                <Mytext style={styles.projectLabel}> URL:</Mytext>
                                <Mytext style={styles.projectText2}>{item.url}</Mytext>
                                </View>

                                <View style={styles.projectGroup}>
                                <Mytext style={styles.projectLabel}> Usuário:</Mytext>
                                <Mytext style={styles.projectText2}>#{item.user_id}</Mytext>
                                </View>

                                <View style={styles.projectGroup}>
                                <Mytext style={styles.projectLabel}> Recursos:</Mytext>
                                <Mytext style={styles.projectText2}>{item.recurces}</Mytext>
                                </View>

                                <View style={styles.projectGroup}>
                                <Mytext style={styles.projectLabel}> Descrição:</Mytext>
                                <Mytext style={styles.projectText2}>{item.description}</Mytext>
                                </View>

                                <View style={styles.projectGroup}>
                                <Mytext style={styles.projectLabel}> Objetivo:</Mytext>
                                <Mytext style={styles.projectText2}>{item.objective}</Mytext>
                                </View>

                                {/* Grupo visual para campos relacionados à metodologia */}
                                <View style={styles.projectGroup}>
                                <Mytext style={styles.projectLabel}> Metodologia:</Mytext>
                                <Mytext style={styles.projectText2}> Técnicas: {item.techniques}</Mytext>
                                <Mytext style={styles.projectText2}>Processos: {item.process}</Mytext>
                                <Mytext style={styles.projectText2}>Estratégias: {item.strategies}</Mytext>
                                <Mytext style={styles.projectText2}>Planejamento: {item.planning}</Mytext>
                                </View>
                            </MyItem>
                        )}
                    />
                </View>
            </View>
        </MyView>
        </ScrollView>
    ); 
}

/** <Button title='EDIT' />
    <Button title='DELETE' /> - Esse botão não permite modificar a forma de vizualizar o botão*/ 

const styles = StyleSheet.create({
    
    projectLabel: {
        fontSize: 14,
        fontWeight: '600',      // Deixa o rótulo com destaque
        color: '#555',          // Cor neutra para contraste
    },
    
    projectGroup: {
        marginBottom: 10,       // Espaço entre grupos de informações
    },
    
    projectText: {
        fontSize: 14,
        color: '#333',
    },
      
    contentContainer: {
        padding: 20,
        alignItems: 'flex-start',
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
        width: '100%',
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        alignSelf: 'center',
    },

    projectContainer: {
        marginBottom: 40,        // Espaço entre os projetos
        padding: 10,             // Espaçamento interno
        backgroundColor: '#FFF', // Fundo branco para cada projeto
        borderRadius: 8,         // Bordas arredondadas
        borderWidth: 1,          // Borda ao redor de cada projeto
        borderColor: '#ddd',     // Cor da borda
        width: '100%',           // Garante que ocupe toda a largura
        flexDirection: 'column', // Coloca os itens de um projeto em uma coluna
    },

    projectText2: {
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

    listContainer: {
        flex: 1, // Faz a lista ocupar todo o espaço restante abaixo do formulário
        width: '100%',
      },
});