import {StyleSheet} from 'react-native';
//import {textStyles} from '../styles/textStyles';

export const tabsBarStyles = StyleSheet.create({
    tabsContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: 'pink',
        marginRight: 50,
        marginLeft: 50,
        marginVertical: 0,
        marginHorizontal: 20,
        borderRadius: 10,
        minHeight: 90,
      },
      tabItem: { // Estilo para cada aba
          paddingHorizontal: 10,
          paddingVertical: 20,
          marginRight: 15,
          marginHorizontal: 40,
          height: 50,
          width: 250,
          borderRadius: 50,
          backgroundColor: '#F2F2F2',
          borderWidth: 2,
          borderColor: '#0F2259',
          justifyContent: 'center',
          alignItems: 'center',
      },
      activeTabItem: { // Estilo quando a aba está ativa
          backgroundColor: '#AD6CD9',
          borderBottomWidth: 5,
          borderBottomColor: '#0F2259',
      },
      tabText: { // Estilo do texto normal
          color: 'black',
          fontSize: 16,
          fontFamily: 'Poppins_400Regular',
          justifyContent: 'center',
      },
      activeTabText: { // Estilo do texto quando a aba está ativa
          fontWeight: 'bold',
          color: 'white',
      },
});