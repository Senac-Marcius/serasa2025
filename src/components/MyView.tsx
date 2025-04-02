import React,{ReactNode} from 'react';
import { View, StyleSheet, Dimensions, TextStyle  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MyTopbar from './MyTopbar';
import MySupport from './MySupport';

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
    <ScrollView style={[styles.container, style]}>
      <View style={styles.tView}>
        <MyTopbar  title = {title ? title: ""} />
        {children}
        {/* Conteúdo da tela (pode ser adicionado aqui) */}
        {/* Botão de suporte */}
        <MySupport style={styles.suporteButton}/>
      </View>
    </ScrollView>
  );
};

export default myView;