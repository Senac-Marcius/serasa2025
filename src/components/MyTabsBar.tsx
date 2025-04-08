import React, { ReactNode, useState } from 'react';
import { Text, TouchableOpacity, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';



interface MyTabsbarProps {  
  items: string[]; // Lista de nomes das abas (ex: ["Identificação", "Publicação"]
  style: ViewStyle; // Estilo personalizado para o container principal
  itemStyle: ViewStyle;   // Estilo para cada item/aba normal
  activeItemStyle: ViewStyle; // Estilo para o item/aba selecionado
  textStyle?: TextStyle;  // Estilo para cada texto/aba normal
  activeTextStyle?: TextStyle; // Estilo para o texto/aba selecionado
  onPress: (item:string, index: number) => void; // Função quando clica numa aba
  initialActiveIndex: number; // Qual aba começa selecionada (padrão: 0 = primeira)
}

const MyTabsbar: React.FC<MyTabsbarProps> = ({ items, style, itemStyle, activeItemStyle, textStyle, activeTextStyle, onPress, initialActiveIndex = 0 }) => {

  const [activeIndex, setActiveIndex] = useState(initialActiveIndex); //(começa com a primeira ou outra que a pessoa definir) 
  
  // copia isso aqui tbm
  const handlePress = (item: string, index: number) => {
    setActiveIndex(index); // Atualiza a aba ativa
    onPress(item, index);   // Chama a função onPress passada (avisa que houve clique)
  };
  
  return (
      <FlatList horizontal // rolar para os lados
        showsHorizontalScrollIndicator ={false} // para não mostrar um indicador de rolagem
        style={style}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity 
            style={[
            styles.tabItem,
            itemStyle,
            activeIndex == index && [styles.activeTabItem, activeItemStyle] // Estilos diferentes se for a aba ativa
            ]}
            onPress={() => handlePress(item, index)} // Chamando a função
            >
            <Text
            style={[
              styles.tabText,
              textStyle,
              activeIndex == index && [styles.activeTabText, activeTextStyle] // Estilos diferentes se for a aba ativa
            ]}
          >
            {item}
          </Text>
          </TouchableOpacity>
      )}
    />
  ); 
}

const styles = StyleSheet.create({
  tabsContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F2F2F2',
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  tabItem: { // Estilo para cada aba
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginRight: 20,
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
      fontSize: 18,
      color: 'black',
  },
  activeTabText: { // Estilo do texto quando a aba está ativa
      fontWeight: 'bold',
      color: 'white',
  },
});

export default MyTabsbar  