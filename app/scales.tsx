import React, {useState, useEffect} from 'react'; //Importa o react e atualiza a lista Automaticamente.
import {View, Text, StyleSheet} from 'react-native';//Une  os objetos e o react-native faz a função de trasformar o codigo em multiplas plataformas.
import MyFilter from '../src/components/MyFilter';
import MySelect from '../src/components/MySelect';
import MyTimerPicker from '../src/components/MyTimerPiker';
import MyButton from '../src/components/MyButtons';
import {MyItem} from '../src/components/MyItem';
import MyView from '../src/components/MyView';
import {useRouter} from 'expo-router';
import {iScale, setScale, updateScale, deleteScale, getScale} from '../src/controllers/scales';
import Mytext from '../src/components/MyText';
import MyList from '../src/components/MyList';
import { jsiConfigureProps } from 'react-native-reanimated/lib/typescript/core';
import { ScrollView } from 'react-native-gesture-handler';



export default function ScaleScreen(){
    const [scales, setScales] = useState<iScale[]>([]);

    const [req, setReq] = useState({
        id:-1,
        day:'',
        start_time:'', 
        end_time:'',
        created_at: new Date().toISOString(),
        employ_id: 1,
    });


    

    const [selectedDay, setSelectedDay] = useState<string>('');

    
    const daysOfWeek = [
        { key: '1', option: 'Segunda-feira' },
        { key: '2', option: 'Terça-feira' },
        { key: '3', option: 'Quarta-feira' },
        { key: '4', option: 'Quinta-feira' },
        { key: '5', option: 'Sexta-feira' },
        { key: '6', option: 'Sábado' },
        { key: '7', option: 'Domingo' },
    ];

    // Função para atualizar o estado com o dia selecionado
    const handleSetLabel = (label: string) => {
        setSelectedDay(label);
        setReq(prevReq => ({
          ...prevReq,
          day: label, // Atualiza o campo 'day' em req
        }));
      };
    
        //Mudar para o cntrolador
    useEffect(() => {
        async function getTodos() {
          const retorno = await getScale({})
    
          if (retorno.status && retorno.data && retorno.data.length> 0) {
            setScales(retorno.data);
          }
        }
    
        getTodos()
      }, [])
    
      async function handleRegister() {
        
        
        if (req.id == -1) {
            const newid = scales.length? scales[scales.length - 1].id + 1 : 0;


          const newScale = {...req,  id: newid};
      
          const saved = await setScale(newScale);
          if (saved) setScales([...scales, saved[0]]);
        } else {
          const updated = await updateScale(req.id, req);
      
          if (updated) {
            setScales(scales.map((s) => (s.id === req.id ? updated[0] : s)));
          }
        }
      
        // Reset do formulário
        setReq({
            id:-1,
            day:'',
            start_time:'', 
            end_time:'',
            created_at: new Date().toISOString(),
            employ_id: 1,
        });
        setSelectedDay('');
      }
    
      async function handleDeleteScale(id: number) {
        const success = await deleteScale(id);
        if (success) {
          setScales(scales.filter(s => s.id !== id));
        }
      }
    
      function editScale(id: number) {
        const scale = scales.find(s => s.id === id);
        if (scale) {
          setReq(scale);
          setSelectedDay(scale.day);
        }
      } 
    
      const router = useRouter();

    return (
        <ScrollView>
        <MyView> {/* Aqui é typecript dentro do html*/}
            <Mytext style={styles.Mytext}>CRIE SUA ESCALA </Mytext>
            <MyFilter
                style={styles.container}
                itens={['day', 'starttime']}
                onSend={(filter) => console.log('Filtro aplicado:', filter)}
                onPress={(item) => console.log('Filtro pressionado:', item)}
                />

            <View>
                <View style={styles.form}>
                    <Mytext style={styles.Mytext}>Dia Selecionado:📅 {selectedDay || 'Nenhum dia selecionado'}</Mytext>
                    <MySelect
                        label={selectedDay || 'Selecione um dia da semana'}
                        list={daysOfWeek}
                        setLabel={handleSetLabel}
                    />

                    <Mytext style={styles.Mytext}>Horario de início:▶</Mytext>
                    <MyTimerPicker
                         initialTime={req.start_time}
                        onTimeSelected={(time) => setReq({ ...req, start_time: time })}
                    />
                    <Mytext style={styles.Mytext}>Horario de término:⏹</Mytext>
                    <MyTimerPicker
                        initialTime={req.end_time}
                        onTimeSelected={(time) => setReq({ ...req, end_time: time })}
                     />
                    <MyButton
                        title='Cadastrar' onPress={handleRegister}
                    />
                </View >
                <View>
                <MyList
                    data={scales}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <MyItem
                        style={styles.response}
                        onEdit={() => editScale(item.id)}
                        onDel={() => handleDeleteScale(item.id)}
                        >
                        <Text>Dia da semana: {item.day}</Text>
                        <Text>Horário de início: {item.start_time}</Text>
                        <Text>Horário de término: {item.end_time}</Text>
                        <Text>Id do Usuário: {item.employ_id}</Text>
                        <Text>Data da criação: {item.created_at}</Text>
                        </MyItem>
                    )}
                    style={styles.listContainer}
                />
                </View> 
            </View>       
        </MyView> 
        </ScrollView>
    );
};

    

const styles = StyleSheet.create({
    
    container: {
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',  
        rowGap: 10,
        columnGap: 10, 
        width: 'auto',
    },
    Mytext:{
        color: '#813AB1',
        textAlign: 'center',
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        minHeight: '45%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 200,
        gap: 10,
    }, 
    form: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      paddingHorizontal: 20, // controla o "comprimento" do botão
      paddingVertical: 10,   // adiciona altura
      backgroundColor: '#FFFFFF',
      borderRadius: 8,       // opcional: bordas arredondadas
      width: 'auto',         // importante para manter o botão ajustado ao conteúdo
      alignSelf: 'center',   // centraliza horizontalmente dentro do container
    },
    input: {
        height: 40,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#CCC',
    },
    response: {
        flex: 2,
        marginRight: 10,
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        shadowColor: '#FFF',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
});
