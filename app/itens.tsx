import React ,{ useState }from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button, TouchableOpacity} from 'react-native';
import MyLink from '../src/components/MyLink';
import MyItem from '../src/components/MyItem';
import MyList from '../src/components/MyList';
import { Myinput } from '../src/components/MyInputs';
import MyButton from '../src/components/MyButtons';
import MyView from '../src/components/MyView';


export default  function itemScreen(){
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
        <MyView>
       
        <Text>Minha tela de itens</Text>
        
        <View style={styles.row}>
            <View style={styles.form}>
                <Myinput 
                placeholder="Marca"
                value={req.mark}
                onChangeText={(text) => setReq({ ...req, mark:text })}
                label="Item"
                 iconName='list' 
            
                />
                


                <Myinput 
                   placeholder= "Digite o nome"
                   value={req.name}
                   onChangeText={(text)=>setReq({...req,name:text})}
                   label="I
                   
                   tem" 
                   iconName='user' 
                   />

                <MyLink style={{ padding : 20}} url="http://gyuguyg" label="Esqueci minha senha"/>

                <MyButton title='Cadastrar' onPress={ handleRegister}/>
            
            </View>

            <MyList
            data={itens}
            keyItem={(i) => i.id.toString()}
            renderItem={({item})=>(
                <MyItem >
                    <text >{item.name}</text>
                    <text >{item.mark}</text>
                    <text>{item.assetNumber}</text>
                    <text>{item.amount}</text>

                    <View>
                        <TouchableOpacity onPress={ () => { editItem(item.id)} }></TouchableOpacity>
                        <TouchableOpacity onPress={ () => { delItem(item.id)} }></TouchableOpacity>
                    </View>
                </MyItem>

            )}
            
            />
        </View>
    </MyView>

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
    form: { 
        flex:1

    }
})



