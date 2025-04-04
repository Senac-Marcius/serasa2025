import React, {useState} from 'react'; //Importa o react e atualiza a lista Automaticamente.
import {View, Text, StyleSheet, FlatList} from 'react-native';//Une  os objetos e o react-native faz a função de trasformar o codigo em multiplas plataformas.
import MyFilter from '../src/components/MyFilter';
import MySelect from '../src/components/MySelect';
import MyTimerPicker from '../src/components/MyTimerPiker';
import MyButton from '../src/components/MyButtons';
import {MyItem} from '../src/components/MyItem';
import MyView from '../src/components/MyView';
import {useRouter} from 'expo-router';
import {scales, setScale, setScales} from '../src/controllers/scales';


export default function ScaleScreen(){

    const [req, setReq] = useState({
        id:0,
        day:'',
        starttime:'', 
        endtime:'',
        creatAt: new Date().toISOString(),
        userId: 0,
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

    function handleRegister(){
        if(req.id <= 0){
            const newId = scales.length ? scales[scales.length - 1].id + 1 : 1;
            const newScale = {...req, id: newId };
            
            setScales([...scales, newScale]);
            setScale(newScale)
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

    const router = useRouter();

    return (
        <MyView router={router} > {/* Aqui é typecript dentro do html*/}
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
                    <Text>Dia Selecionado: {selectedDay || 'Nenhum dia selecionado'}</Text>

                    <MyTimerPicker
                         initialTime={req.starttime}
                        onTimeSelected={(time) => setReq({ ...req, starttime: time })}
                    />
                    <MyTimerPicker
                        initialTime={req.endtime}
                        onTimeSelected={(time) => setReq({ ...req, endtime: time })}
                     />
                    <MyButton
                        title='Cadastrar' onPress={handleRegister}
                    />
                </View >
                <View>
                <FlatList
                    data={scales}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <MyItem
                            style={styles.response}
                            onEdit={() => editScale(item.id)}
                            onDel={() => deleteScale(item.id)}
                        >
                            <Text>Dia da semana: {item.day}</Text>
                            <Text>Horário de início: {item.starttime}</Text>
                            <Text>Horário de término: {item.endtime}</Text>
                            <Text>Id do Usuário: {item.userId}</Text>
                            <Text>Data da criação: {item.creatAt}</Text>
                        </MyItem>
                    )}
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
