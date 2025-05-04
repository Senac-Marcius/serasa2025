import React, { useState, useEffect } from 'react';
import { View,Text, StyleSheet,FlatList, Button,TextInput, Touchable, TouchableOpacity} from 'react-native';
import {Myinput} from '../../src/components/MyInputs';
import MyView from '../../src/components/MyView';
import Mytext from '../../src/components/MyText';
import MyButton from '../../src/components/MyButtons';
import MyList from '../../src/components/MyList';
import {MyItem} from '../../src/components/MyItem';
import { useRouter } from 'expo-router';
import {deleteLevel, updateLevels, getLevels, setLevel, iLevels } from '../../src/controllers/levels';

export default function LevelsScreen() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(true);

  const [levels, setLevels] = useState<iLevels[]>([]);

  const [req, setReq] = useState({
    id: -1,
    name: '',
    description: '',
    color: '',
    created_at: new Date().toISOString(),

  });

  useEffect(() => {
    //aqui estamos carregando os lançamentos 
      async function fetchLevels() {
        const retorno = await getLevels({})
        if (retorno.status && retorno.data && retorno.data.length > 0 ) {
            setLevels(retorno.data); 

        }

      }
  
      fetchLevels();
  }, []);

  async function handleRegister() {
    if (req.id === -1) {
      const newId = levels.length > 0? levels[levels.length - 1].id + 1: 0;
      const newLevel = { ...req, id: newId};
      setLevels([...levels, newLevel]);
      await setLevel(newLevel)
    } else {
      const updated = levels.map(item => (item.id === req.id ? req : item));
      setLevels(updated);
      await updateLevels(req)
    }

      setReq({
        id: -1,
        name: '',
        description: '',
        color: '',
        created_at:  new Date().toISOString(),
     });

  }

async function deleteLevels(id: number) {
    setLevels(levels.filter(item => item.id !== id));
    await deleteLevel(id)

  }

function editLevels(levels: iLevels) {
    setReq(levels);

  }

    return (
        <MyView>
            
        {/* aqui é typerscrypt dentro do front */}

            <View style={styles.row}>
                <View style={styles.form}>
                        
                        <Myinput 
                            style={styles.input}
                            placeholder="Digite seu nome" 
                            value={req.name}
                            onChangeText={(text) => setReq({...req ,name: text})}
                            label="Nome"
                            iconName=''

                        /> 
                    
                        <Myinput 
                            style={styles.input}  
                            placeholder="Digite sua descrição" 
                            value={req.description}
                            onChangeText={(text) => setReq({...req ,description: text})}
                            label="Descrição"
                            iconName=''
                        />

                        <Myinput 
                            style={styles.input}
                            placeholder="Digite uma cor" 
                            value={req.color}
                            onChangeText={(text) => setReq({...req ,color: text})}
                            label="Cor"
                            iconName=''

                        /> 
                        
                    <MyButton title='Cadastrar' onPress= {handleRegister}/>
                                    
                </View>

                <MyList
                    data={levels}
                    style={styles.listContainer}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({item}) =>(
                       <MyItem
                            onEdit={() => {editLevels(item.id)}}
                            onDel={() => {deleteLevels(item.id)}}
                        >

                           <Text > Nome: {item.name}</Text> {/* alex */}
                           <Text > Descrição: {item.description}</Text>
                           <Text > Cor: {item.color}</Text>
                           <Text > UserId: {item.userId}</Text>
                           
    {/*
    <View style={styles.buttonsContainer}>
    <TouchableOpacity 
    style={styles.editButton}
    onPress={() => {editLevels(item.id)}}>
    <Text style={styles.buttonText}>EDIT</Text>
    </TouchableOpacity>
    <TouchableOpacity 
    style={styles.delButton}
    onPress={() => {deleteLevels(item.id)}}>
    <Text style={styles.buttonText}>DELETE</Text>
    </TouchableOpacity>             
    </View>
    */}
                        </MyItem>

                    )}
                />
               
            </View>
        </MyView>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF'
        
},
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',

},

    form: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5EFFB',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        marginRight: 10,
        minWidth: '45%',

},
//muda as cores de fundo no backgroundColor e shadowColor
    listContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#D8CEF6',
        borderRadius: 10,
        shadowColor: '#F5EFFB',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        minWidth: '45%',

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
        borderColor: '#E2A9F3',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,

},

    postItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#E2A9F3',
        borderRadius: 5,

},

    postText: {
        fontSize: 12,
        fontWeight: 'bold',

},

    postUrl: {
        fontSize: 14,
        color: '#E2A9F3',
        marginBottom: 5,

},

    buttonText:{
        color:'#E2A9F3',
        fontWeight: 'bold'

},

    buttonsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        alignContent:'space-around',

},

    editButton:{ backgroundColor:'#E2A9F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent:'center',

},

    delButton:{ backgroundColor:'#E2A9F3',
        padding: 10,
        borderRadius: 5,
        alignItems:'center',
        justifyContent:'center',

},

    card: {
        backgroundColor: '#E2A9F3',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#E2A9F3',
        shadowColor: '#E2A9F3',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,

},

      fundo: {
        height: 40,
        borderColor: '#E2A9F3',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#E2A9F3',

},


});