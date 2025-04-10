import React,{ReactNode} from 'react';
import { View, StyleSheet, Dimensions, TextStyle, ScrollView} from 'react-native';
import MyTopbar from './MyTopbar';
import MySupport from './MySupport';
import { Router } from 'expo-router';
import MyAccessibility from './MyAccessibility';
import { TouchableOpacityComponent } from 'react-native';


interface MySearchProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[]; 
  title?: string;
  router: Router;  

}

const MyView: React.FC< MySearchProps > = ({children, style}) => { 
 
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
    },

    buttonAcess: {
 
      position: 'absolute',
      bottom: 20,
      left: 20,
      justifyContent: 'center',
      alignItems: 'center',
      width: width > 600 ? 60 : 50,
      height: width > 600 ? 60 : 50,
    },
  });

  return (
    <ScrollView style={[styles.container, style]}>
      <View style={styles.tView}>
        <MyTopbar  />
        {children}
        {/* Conteúdo da tela (pode ser adicionado aqui) */}
        {/* Botão de suporte */}
        <MySupport style={styles.suporteButton}/>
        <MyAccessibility>
          <button style={styles.buttonAcess} /> 
        </MyAccessibility>
      </View>
    </ScrollView>
  );
};

export default MyView;