import React ,{ useState }from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button} from 'react-native';

export default  function itemScreen(){
     const[req,setReq] = useState({ 
        id: 0,
        name:'',
        mark:'',
        assetNumber:0,
        amount: 0,
     });
     const [itens,setItens]= useState<{
        id: number,
        name: string,
        mark: string,
        assetNumber: number,
        amount: number, 
     }[]>([])

     function handleRegister(){
        setItens([...itens,req])
        setReq({id: 0,
            name:'',
            mark:'',
            assetNumber:0,
            amount: 0,  
        })
     }

    return (
        <View>
        {}
        <Text>Minha tela de itens</Text>
        
        <View style={styles.row}>
            <View style={styles.form}>
                <TextInput placeholder="Marka"
                value={req.mark}
                onChangeText={(text)=>setReq({...req,mark:text})}
                />
                {req.mark}


                <TextInput placeholder= "Digite o nome"
                   value={req.name}
                   onChangeText={(text)=>setReq({...req,name:text})}
                   />

                   {req.name}
                <Button title='Cadastrar' onPress={ handleRegister}/>
            
            </View>
        </View>
    </View>

    );
}

const styles= StyleSheet.create({
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
})


