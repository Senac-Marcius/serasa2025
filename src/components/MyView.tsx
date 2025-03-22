import React,{ReactNode} from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

interface MySearchProps {
  children: ReactNode;
}

const MyView: React.FC< MySearchProps > = ({children}) => { 
 
  const handleSuporte = () => {
    console.log('Botão de suporte clicado!');
    
  };


  const { width, height } = Dimensions.get('window');

  
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
  });

  return (
    <View style={styles.container}>
      <Text>Olá componente</Text>
      {children}
      <Text>Tchau componente</Text>
      {/* Conteúdo da tela (pode ser adicionado aqui) */}
      {/* Botão de suporte */}
      <TouchableOpacity style={styles.suporteButton} onPress={handleSuporte}>
      </TouchableOpacity>
    </View>
  );
};

export default MyView;