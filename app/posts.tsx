import React, { useState } from 'react';
import { Button, ScrollView, View, Text,TouchableOpacity } from 'react-native';
import { TextInput, RadioButton, Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { DatePickerModal,TimePickerModal } from 'react-native-paper-dates';
//import MyTest from '../src/components/Mytest'
import MyList from '../src/components/mylist'

export default function PostScreen() {
    const router = useRouter();

    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState("0");

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [open, setOpen] = useState(false);

    const[req,setReq] = useState({ 
        id: -1,
        name:'',
        mark:'',
        assetNumber:0,
        amount: 0,
        createAt: new Date().toISOString ()
        
    });
    const [itens,setItens]= useState<{
        id: number,
        name: string,
        mark: string,
        assetNumber: number,
        amount: number, 
        createAt:string,

    }[]>([])

    function handleRegister(){
        if(req.id == -1){
            const newid= itens.length ? itens[itens.length-1].id=1:0;
            const newItem = {... itens,req};
            setItens([...itens, req])

        }else{
         setItens(itens.map(i =>(i.id == req.id)? req: i )  );

        }

        setReq({id: -1,
            name:'',
            mark:'',
            assetNumber:0,
            amount: 0,  
            createAt: new Date().toISOString(),
        })
    }

    function editItem(id:number){
        let item= itens.find(i => i.id== id)
        if(item)
            setReq(item)
    }
    function delItem(id:number){
        const list= itens.filter(i => i.id != id)
        if(list)
            setItens(list)
    }
    
    
    return (
        <ScrollView>
         
            <View style={{ padding: 20 }}>
                

                <TextInput
                    label="Descrição"
                    value={description}
                    onChangeText={setDescription}
                    mode="outlined"
                />

                <TextInput
                    label="URL"
                    value={url}
                    onChangeText={setUrl}
                    mode="outlined"
                />

                {/* Checkbox */}
                <Checkbox.Item
                    label="Destaque"
                    status={isChecked ? 'checked' : 'unchecked'}
                    onPress={() => setIsChecked(!isChecked)}
                />

                {/* Radio */}
                <RadioButton.Group onValueChange={setSelectedRadio} value={selectedRadio}>
                    <View>
                        <RadioButton.Item label="Opção 1" value="0" />
                        <RadioButton.Item label="Opção 2" value="1" />
                    </View>
                </RadioButton.Group>

              
                {/* Modal do Calendário */}
                <DatePickerModal
                    locale="pt"
                    mode="single"
                    visible={open}
                    onDismiss={() => setOpen(false)}
                    date={date}
                    onConfirm={(params) => {
                        setOpen(false);
                        setDate(params.date);
                    }}
                />

                <TimePickerModal 
                    locale="pt"
                    visible={false}
                    onDismiss={() => setOpen(false)}
                    hours={date?.getHours()}
                    minutes={date?.getMinutes()}
                    onConfirm={(params) => {
                    }}
                />

                {/* Mostrando a data selecionada */}
                {date && (
                    <TextInput
                        label="Data Selecionada"
                        value={date.toLocaleDateString()}
                        mode="outlined"
                        editable={false}
                    />
                )}


                <View >
                    <TextInput placeholder="Marca"
                    value={req.mark}
                    onChangeText={(text)=>setReq({...req,mark:text})}
                    />
                    
    
    
                    <TextInput placeholder= "Digite o nome"
                        value={req.name}
                        onChangeText={(text)=>setReq({...req,name:text})}
                        />
    
                        
                    <Button title='Cadastrar' onPress={ handleRegister}/>
                
                </View>
            </View>

            <MyList
                data={itens}
                keyItem={(item) => item.id.toString()}
                renderItem={({item})=>(
                    <View >
                        <text >{item.name}</text>
                        <text >{item.mark}</text>
                        <text>{item.assetNumber}</text>
                        <text>{item.amount}</text>
    
                        <View>
                            <TouchableOpacity onPress={ () => { editItem(item.id)} }>Editar</TouchableOpacity>
                            <TouchableOpacity onPress={ () => { delItem(item.id)} }>Excluir</TouchableOpacity>
                        </View>
                    </View>
    
                )}
                        
            />

        </ScrollView>
    );
}