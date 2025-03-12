import React, {useState} from 'react'; // atualiza o objeto sozinho
import { View, Text, StyleSheet, TextInput, Button, } from 'react-native';


export default function DisciplineScreen(){ // func que será exportada
//Aqui é typeScript


return (   
       
        <View>

         {/*Aqui é o typeScript dentro do front*/}
         <Text>Minha tela das postagens</Text>
         <View style = {styles.row}>


         <View style = {styles.form}>
            <TextInput placeholder='Nome'/>
            <TextInput placeholder='url'/>
            <TextInput placeholder='Carga Horaria'/>
            <TextInput placeholder='Data Criacao'/>
            <TextInput placeholder='Professor'/>
            <Button style = {styles.button} title='Cadastrar'/>

          </View>
          
         </View>
     </View>
       
  );
}

const styles = StyleSheet.create({ // minha const e meu parametro 
  row: {
    flexDirection : 'row',
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

button:{
  
}

});