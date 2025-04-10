import React, {useState, useEffect} from 'react'; //Importa o react e atualiza a lista Automaticamente.
import {View, Text, StyleSheet, FlatList} from 'react-native';//Une  os objetos e o react-native faz a função de trasformar o codigo em multiplas plataformas.
import MyFilter from '../src/components/MyFilter';
import MySelect from '../src/components/MySelect';
import MyTimerPicker from '../src/components/MyTimerPiker';
import MyButton from '../src/components/MyButtons';
import {MyItem} from '../src/components/MyItem';
import MyView from '../src/components/MyView';
import {useRouter} from 'expo-router';
import {iScale, setScale, updateScale, deleteScale} from '../src/controllers/scales';
import { supabase } from '../src/utils/supabase'
import Mytext from '../src/components/MyText';
import MyList from '../src/components/MyList';
import { jsiConfigureProps } from 'react-native-reanimated/lib/typescript/core';

//Esse é o codigo correto.

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

    // Definir os dias da semana como lista de opções
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
    

    useEffect(() => {
        async function getTodos() {
          const { data: todos } = await supabase.from('scales').select()
    
          if (todos && todos.length > 0) {
            setScales(todos)
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
        <MyView router={router} > {/* Aqui é typecript dentro do html*/}
            <Mytext>CRIE SUA ESCALA</Mytext>
            <MyFilter
                style={styles.container}
                itens={['day', 'starttime']}
                onSend={(filter) => console.log('Filtro aplicado:', filter)}
                onPress={(item) => console.log('Filtro pressionado:', item)}
                />

            <View>
                <View style={styles.form}>
                    <MySelect
                        label={selectedDay || 'Selecione um dia da semana'}
                        list={daysOfWeek}
                        setLabel={handleSetLabel}
                    />
                    <Mytext>Dia Selecionado:📅 {selectedDay || 'Nenhum dia selecionado'}</Mytext>

                    <Mytext>Horario de início:▶</Mytext>
                    <MyTimerPicker
                         initialTime={req.start_time}
                        onTimeSelected={(time) => setReq({ ...req, start_time: time })}
                    />
                    <Mytext>Horario de término:⏹</Mytext>
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
    );
};

    

const styles = StyleSheet.create({
    
    container: {
        alignItems: 'flex-end',
        marginBottom: 20,
        paddingHorizontal: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',  
        rowGap: 10,
        columnGap: 10, 
        width: 'auto',
    },
    Mytext:{
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    listContainer: {
        flex: 1,
        padding: 10,
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
    }, 
    form: {
        flex: 1,
        marginRight: 5,
        padding: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },  
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
