import React, {ReactNode, useState} from "react";
import { Text,  TouchableOpacity, View, ViewStyle, StyleSheet, ScrollView, TextStyle, Image } from "react-native";
import MyView from "../src/components/MyView";
import MyButton from "../src/components/Mybuttons";
import Mytext from "../src/components/Mytext";
import { Myinput } from "../src/components/Myinputs";
import MyUpload from "../src/components/Myupload";

interface iUser {
  photo: string,
  name: string,
  email: string,
  contact: string,
  birth: string,
}


interface MyPerfilProps {
    user: iUser,
    setUser(user: iUser):void,
    saveUser(id:number, user: iUser):void,
    id:number,
    
};
    
    const Perfil: React.FC<MyPerfilProps> = ({user, setUser, id, saveUser, }) => { 
      const [ editing, setEditing] = useState(false)
      const[urlDocument, setDocument] = useState('')
      return (
        <MyView>
          <View>
            <Mytext style={styles.h1}>Perfil</Mytext>
          </View>
          <View>
            <View>
            {!editing && (<Image src={user.photo? user.photo:''}/>)}
            {editing && (<MyUpload setUrl={setDocument} url={urlDocument}/>
)}
            </View>
            {!editing && (<Mytext style={styles.title}>{user.name? user.name:''}</Mytext>)}
            {editing && (<Myinput value={user.name} onChangeText={(text)=>{setUser({...user, name: text})}} label="Nome"/>)}
            <View>
              <Mytext style={styles.title}>Dados Pessoais</Mytext>

              <Mytext style={styles.title}>E-mail: {user.email? user.email:''}</Mytext>
              {!editing && (<Mytext style={styles.title}>{user.email? user.email:''}</Mytext>)}
              {editing && (<Myinput value={user.email} onChangeText={(text)=>{setUser({...user, email: text})}} label="E-mail"/>)}

              <Mytext style={styles.title}>Telefone: {user.contact? user.contact:''}</Mytext>
              {!editing && (<Mytext style={styles.title}>{user.contact? user.contact:''}</Mytext>)}
              {editing && (<Myinput value={user.contact} onChangeText={(text)=>{setUser({...user, contact: text})}} label="Número"/>)}
                
              <Mytext style={styles.title}>Data de Nascimento:{user.birth? user.birth:''}</Mytext>
              {!editing && (<Mytext style={styles.title}>{user.birth? user.birth:''}</Mytext>)}
              {editing && (<Myinput value={user.birth} onChangeText={(text)=>{setUser({...user, birth: text})}} label="Data de Nascimento"/>)}

              {!editing && (<MyButton title="Editar Perfil" onPress ={() => {setEditing(true)}} />)}
              {editing && (<MyButton title="Salvar Perfil" onPress ={() => {setEditing(false); saveUser(id, user) }} />)}
            </View>
          </View>
        </MyView>
      );
    };
    
    const styles = StyleSheet.create({
      title: {
        justifyContent: 'center',
        marginBlock: 'auto',
        display: 'flex',
        marginBottom: 20,
      },
      h1:{
        justifyContent: 'center',
        marginBlock: 'auto',
        display: 'flex',
        marginBottom: 20,
      },
      
    });
    
    export default Perfil