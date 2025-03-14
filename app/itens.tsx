import React ,{ useState }from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button} from 'react-native';

export default  function itemScreen(){
     const[req,setReq] = useState({ 
        id: 0,
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
        setItens([...itens, req])
        setReq({id: 0,
            name:'',
            mark:'',
            assetNumber:0,
            amount: 0,  
            createAt: new Date().toISOString(),
        })
     }

    return (
        <View>
        {}
        <Text>Minha tela de itens</Text>
        
        <View style={styles.row}>
            <View style={styles.form}>
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

            <FlatList
            data={itens}
            keyExtractor={(i) => i.id.toString()}
            renderItem={({item})=>(
                <Viewstyle={styles.itensItem}>
                    <text style={styles.item.name}>{item.name}</text>
                    <text style={styles.item.mark>{item.mark}</text>
                    <textstyle={styles.item.assetNumber>{item.assetNumber}</text>
                    <text>{item.amount}</text>
                
                
                </View>

            )}
            
            />
        </View>
    </View>

    );
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    formContainer: {
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
            listContainer: {
                flex: 1, 
                padding: 10,
            },
            title: {
                fontSize: 22,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
            },
            subtitle: {
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10,
            },
            input: {
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
            },
            item.name: {
                padding: 10,
                marginVertical: 5,
                backgroundColor: '#f8f8f8',
                borderRadius: 5,
            },
            AmonText: {
                fontSize: 16,
                fontWeight: 'bold',
            },
            postUrl: {
                fontSize: 14,
                color: '#007BFF',
                marginBottom: 5,
    },
})


