import React,{ReactNode} from 'react';
import { View, StyleSheet, Dimensions, TextStyle, ScrollView} from 'react-native';
import MyTopbar from './MyTopbar';
import MySupport from './MySupport';
import { Router } from 'expo-router';


interface MySearchProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[]; 
  title?: string;
  router: Router;  

}

const myView: React.FC< MySearchProps > = ({children, style, title, router}) => { 
 
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
    <ScrollView style={[styles.container, style]}>
      <View style={styles.tView}>
        <MyTopbar router={router} title = {title ? title: ""} />
        {children}
        {/* Conteúdo da tela (pode ser adicionado aqui) */}
        {/* Botão de suporte */}
        <MySupport style={styles.suporteButton}/>
      </View>
    </ScrollView>
  );
};

export default myView;