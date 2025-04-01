<<<<<<< HEAD
=======

>>>>>>> 01ef3c07dcbee70a68ef6ad37ec6da9bd2be0cdf
import React,{ReactNode} from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, TextStyle,  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
<<<<<<< HEAD
=======
import MyTopbar from './mytopbar';  // Corrigido, apenas uma importação
>>>>>>> 01ef3c07dcbee70a68ef6ad37ec6da9bd2be0cdf

interface MySearchProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[]; 
<<<<<<< HEAD

  
}

const myView: React.FC< MySearchProps > = ({children}) => { 
 
  const handleSuporte = () => {
    console.log('Botão de suporte clicado!');
    
  };


  const { width, height } = Dimensions.get('window');

  
=======
}

const myView: React.FC<MySearchProps> = ({ children }) => { 
 
  const handleSuporte = () => {
    console.log('Botão de suporte clicado!');
  };

  const { width, height } = Dimensions.get('window');

>>>>>>> 01ef3c07dcbee70a68ef6ad37ec6da9bd2be0cdf
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff', 
      position: 'relative', 
    },
    suporteButton: {
      position: 'absolute', 
      bottom: 20, 
      right: 20, 
      backgroundColor: '#9747FF',
      width: width > 600 ? 60 : 50,
      height: width > 600 ? 60 : 50,
      borderRadius: width > 600 ? 30 : 25,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#9747FF',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
<<<<<<< HEAD

    tView:{
=======
    tView: {
>>>>>>> 01ef3c07dcbee70a68ef6ad37ec6da9bd2be0cdf
      width: width,
      height: height,
    }
  });

  return (
    <ScrollView style={styles.container}>
<<<<<<< HEAD
      <View style = {styles.tView}>
=======

      <View>
        <MyTopbar  title='Cargos' />


>>>>>>> 01ef3c07dcbee70a68ef6ad37ec6da9bd2be0cdf
      {children}
      {/* Conteúdo da tela (pode ser adicionado aqui) */}
      {/* Botão de suporte */}
      <TouchableOpacity style={styles.suporteButton} onPress={handleSuporte}>      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

<<<<<<< HEAD
export default myView;
=======
export default myView;
>>>>>>> 01ef3c07dcbee70a68ef6ad37ec6da9bd2be0cdf
