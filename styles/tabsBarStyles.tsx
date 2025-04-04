import {StyleSheet} from 'react-native';
import {textStyles} from '../styles/textStyles';

export const tabsBarStyles = StyleSheet.create({
    tabsContainer: {
        flex: 1,
        padding: 15,
        backgroundColor: '#F2F2F2',
        height: 400,
        marginRight: 20,
        marginVertical: 30,
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 10,
      },
      tabItem: { // Estilo para cada aba
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginRight: 20,
          marginHorizontal: 100,
          height: 50,
          width: 300,
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
          fontSize: 14,
          fontFamily: 'Poppins_400Regular',
      },
      activeTabText: { // Estilo do texto quando a aba está ativa
          fontWeight: 'bold',
          color: 'white',
      },
});