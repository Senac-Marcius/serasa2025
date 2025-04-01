
import React,{ReactNode} from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, TextStyle,  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import MyTopbar from './mytopbar';
import MySupport from './Mysupport';

interface MySearchProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[]; 
  title?: string;

  
}

const myView: React.FC< MySearchProps > = ({children, style, title}) => { 
 
  const { width, height } = Dimensions.get('window');

  
  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      position: 'relative', 
    },
    suporteButton: {
      position: 'absolute', 
      bottom: 20, 
      right: 20,
      width: width > 600 ? 60 : 50,
      height: width > 600 ? 60 : 50,
      justifyContent: 'center',
      alignItems: 'center',
    },

    tView:{
      width: width,
      height: height,
    }
  });

  return (
    <ScrollView style={styles.container}>
      <View>
        <MyTopbar  title='' />
      {children}
      {/* Conteúdo da tela (pode ser adicionado aqui) */}
      {/* Botão de suporte */}
      <TouchableOpacity style={styles.suporteButton} onPress={handleSuporte}>      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default myView;
