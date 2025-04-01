import React, {useState} from 'react'; //Importa o react e atualiza a lista Automaticamente.
import {View, Text, StyleSheet, FlatList} from 'react-native';//Une  os objetos e o react-native faz a função de trasformar o codigo em multiplas plataformas.
import { useRouter } from 'expo-router';
import MyFilter from '../src/components/Myfilter';
import MySelect from '../src/components/Myselect';
import MyTimePicker from '../src/components/MyTimePicker';
import MyButton from '../src/components/Mybuttons';
import Myiten from '../src/components/myItenlist';
import MyView from '../src/components/MyView';

export default function ScaleScreen(){
    const router = useRouter();

    const [req, setReq] = useState({
        id:0,
        day:'',
        starttime:'', 
        endtime:'',
        creatAt: new Date().toISOString(),
        userId: 0,
    });


    const [scales, setScales] = useState<{
        id:number,
        day: string,
        starttime:string,
        endtime:string,
        creatAt: string,
        userId: number,
    }[]>([]);

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

    function handleRegister(){
        if(req.id <= 0){
            const newId = scales.length ? scales[scales.length - 1].id + 1 : 1;
            const newScale = {...req, id: newId };
            
            setScales([...scales, newScale]);
        }else{
            setScales(scales.map(s => (s.id == req.id)? req: s ) );
        }

        setReq({
            id: 0,
            day:'',
            starttime:'',
            endtime:'',
            creatAt:new Date().toISOString(),
            userId: 0,
        }) 
        setSelectedDay('');  
    }

    function editScale(id: number){
        const scale = scales.find(s => s.id === id);
        if (scale) {
            setReq(scale);
        }
    }


    function deleteScale(id: number){
        const list = scales.filter(s => s.id !== id);
        setScales(list);

    }

    return (
        <MyView> {/* Aqui é typecript dentro do html*/}
            <MyFilter
                style={styles.container}
                itens={['day', 'starttime']}
                onSend={(filter) => console.log('Filtro aplicado:', filter)}
                onPress={(item) => console.log('Filtro pressionado:', item)}
                />
            {/*Aqui é HTML*/}
            <Text>Minha tela das escalas</Text>
            <MyView>
                <View style={styles.form}>
                    <MySelect
                        label={selectedDay || 'Selecione um dia da semana'}
                        list={daysOfWeek}
                        setLabel={handleSetLabel}
                    />
                    <Text>Dia Selecionado: {selectedDay || 'Nenhum dia selecionado'}</Text>

                    <MyTimePicker
                         initialTime={req.starttime}
                        onTimeSelected={(time) => setReq({ ...req, starttime: time })}
                    />
                    <MyTimePicker
                        initialTime={req.endtime}
                        onTimeSelected={(time) => setReq({ ...req, endtime: time })}
                     />
                    <MyButton
                        title='Cadastrar' onPress={handleRegister}
                    />
                </View >
                <MyView>
                <FlatList
                    data={scales}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Myiten
                            style={styles.response}
                            onEdit={() => editScale(item.id)}
                            onDel={() => deleteScale(item.id)}
                        >
                            <Text>Dia da semana: {item.day}</Text>
                            <Text>Horário de início: {item.starttime}</Text>
                            <Text>Horário de término: {item.endtime}</Text>
                            <Text>Id do Usuário: {item.userId}</Text>
                            <Text>Data da criação: {item.creatAt}</Text>
                        </Myiten>
                    )}
                />
                </MyView> 
            </MyView>       
        </MyView> 
    );
};

    

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        gap: 10,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    listContainer: {
        flex: 1,
        padding: 20,
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
        marginBottom: 400,
    }, 
    form: {
        flex: 1,
        marginRight: 10,
        padding: 20,
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
