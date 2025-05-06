import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList,TouchableOpacity,Image} from 'react-native';
import MyView from '../../src/components/MyView';
import { useRouter } from 'expo-router';
import { setParent,iParent,delParent,editParent,getTimeParents,toListparent} from '../../src/controllers/parents';
import MyButton from '../../src/components/MyButtons';
import MyList from '../../src/components/MyList';
import { Myinput, MyCheck, MyTextArea} from '../../src/components/MyInputs';
import { MyItem } from '../../src/components/MyItem';
import { supabase } from '../../src/utils/supabase';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import itemScreen from '../itens';
import { ListItem } from 'native-base';
import MyUpload from '../../src/components/MyUpload';
import { Ionicons } from '@expo/vector-icons';
import { IoIosLeaf, IoIosListBox } from "react-icons/io";


//import dateTimepicker
//npm run web → chamar pagina web pelo terminal
//batatinha
export default function ParentScreen (){
    const [parents,setParents] = useState<iParent[]>([])

    const [req, setReq] = useState({
        id:-1,
        name: '',
        rg: '',
        cpf:'',
        age:'',
        phone:'',
        email:'',
        kinship:'',
        createat: new Date().toISOString(),
        userid: 0,

    });
   
    useEffect(() => {
        async function getTodos(){
            const retorno = await getTimeParents ({})
        
            if(retorno.status && retorno.data && retorno.data.length > 0){
                setParents(retorno.data)
            }

        }

        getTodos();

    })
    //HandleRegister pode falhar se a idade conter mais de dois digitos, SupaBase age esta com o tipo INT2
    async function handleRegister() {

        if (req.id === -1) {
            const newId = parents.length ? parents[parents.length - 1].id + 1 : 0;
            const newParent = { ...req, id: newId };
            setParents([...parents, newParent]);
            const resp = await setParent(newParent);
            console.log (resp)
        } else {
            const { error } = await supabase.from('parents')
                .update(req)
                .eq('id', req.id);
    
            if (!error) {
                setParents(parents.map(p => (p.id === req.id ? req : p)));
            } else {
                console.error("Erro ao atualizar:", error);
            }
        }

        //setParents([...parents, req])
        setReq({
            id:-1,
            name: '',
            rg:'',
            cpf:'',
            age:'',
            phone:'',
            email:'',
            kinship:'',
            createat: new Date().toISOString(),
            userid: 0,
        })
    }

    async function delParentL(id: number) {
        const { error } = await supabase.from('parents').delete().eq('id', id);
               if (!error) {
                   const list = parents.filter(p => p.id != id)
                   setParents(list)
               } else {
                   console.error('Erro ao deletar:', error);
               }
    }
    
    function editParentL(id: number) {
        const parent = parents.find(p => p.id === id);
        if (parent) {
            setReq(parent);
        }
    }
        
    
    const router = useRouter();
    const[urlDocument, setDocument]= useState('')

    

    return (
        <MyView>
  <View style={styles.container}>
    
    {/* Formulário de Cadastro */}
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Cadastro do Responsável</Text>

      <View style={styles.inputGroup}>
        
        <Myinput label="Nome" placeholder="Nome:" value={req.name} onChangeText={(Text) => setReq({ ...req, name: Text })} iconName="person"/>
        <Myinput label="RG" placeholder="RG:" value={req.rg} onChangeText={(Text) => setReq({ ...req, rg: Text })} iconName="fingerprint" />
        <Myinput label="CPF" placeholder="CPF:" value={req.cpf} onChangeText={(Text) => setReq({ ...req, cpf: Text })} iconName="assignment" />
        <Myinput label="Idade" placeholder="Idade:" value={req.age} onChangeText={(Text) => setReq({ ...req, age: Text })} iconName="event" />
        <Myinput label="Telefone" placeholder="Telefone:" value={req.phone} onChangeText={(Text) => setReq({ ...req, phone: Text })} iconName="phone" />
        <Myinput label="Email" placeholder="Email:" value={req.email} onChangeText={(Text) => setReq({ ...req, email: Text })} iconName="email" />
        <Myinput label="Parentesco" placeholder="Parentesco:" value={req.kinship} onChangeText={(Text) => setReq({ ...req, kinship: Text })} iconName="groups" />
      
      </View>

      <View style={styles.actions}>
        <MyButton title='Cadastrar' onPress={handleRegister} button_type='round' style={styles.button_round} />
        {/*<MyUpload /*/}
      </View>
    </View>

    {/* Lista de Responsáveis */}
    <View style={styles.listSection}>
      <Text style={styles.sectionTitle}>Lista de Responsáveis</Text>

      <MyList
        
        data={parents}
        keyItem={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MyItem
            style={styles.parentsItem}
            onDel={() => delParentL(item.id)}
            onEdit={() => editParentL(item.id)}
          >
            <View style={styles.listitens}>
            <Text>Id: {item.id}</Text>
            <Text>Nome: {item.name}</Text>
            <Text>RG: {item.rg}</Text>
            <Text >CPF:{item.cpf}</Text>
            <Text >Idade: {item.age}</Text>
            <Text >Telefone: {item.phone}</Text>
            <Text >Email: {item.email}</Text>
            <Text >Parentesco: {item.kinship}</Text>
            <Text >Data: {item.createat}</Text>
            <Text >UserId: {item.userid}</Text>
            </View>
          </MyItem>
        )}
      />
    </View>
  </View>
</MyView>

    );
}

// smepre que for criado um objeto deve-se adicionar o mesmo no Import
const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: '#fff',
      flex: 1,
      gap: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 16,
      color: '#111',
    },
    formSection: {
      backgroundColor: '#F2F3F5',
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 8,
    },
    inputGroup: {
      gap: 12,
    },
    actions: {
      flexDirection: 'row',
      marginTop: 20,
      gap: 12,
      alignItems: 'center',
    },
    listSection: {
      flex: 1,
      padding: 13,
      backgroundColor: '#F2F3F5',
      borderRadius: 16,
    },
    parentsItem: {
  
      padding:16,
      paddingHorizontal:2,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    button_round: {
        display:"flex",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    listitens: { flex: 1, fontWeight: '600', fontSize: 13, color: '#333' 
    },
    td: { flex: 1, fontSize: 13, color: '#444' 
    },
    tdStatus: { flex: 1 
    },
  
  });
  

