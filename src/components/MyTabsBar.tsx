import React, { ReactNode, useState } from 'react';
import { Text, TouchableOpacity, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';



interface MyTabsbarProps {
  items: string[]; // Lista de nomes das abas (ex: ["Identificação", "Publicação"]
  style: ViewStyle // Estilo personalizado para o container principal
  itemStyle: ViewStyle;    // Estilo para cada item/aba normal
  activeItemStyle: ViewStyle; // Estilo para o item/aba selecionado
  textStyle?: TextStyle;  // Estilo para cada texto/aba normal
  activeTextStyle?: TextStyle; // Estilo para o texto/aba selecionado
  onPress: (item:string, index: number) => void; // Função quando clica numa aba
  initialActiveIndex: number; // Qual aba começa selecionada (padrão: 0 = primeira)
}

const MyTabsbar: React.FC<MyTabsbarProps> = ({ items, style, itemStyle, activeItemStyle, textStyle, activeTextStyle, onPress, initialActiveIndex = 0 }) => {

  const [activeIndex, setActiveIndex] = useState(initialActiveIndex); //(começa com a primeira ou outra que a pessoa definir)
  
  const handlePress = (item: string, index: number) => {
    setActiveIndex(index); // Atualiza a aba ativa
    onPress(item, index);   // Chama a função onPress passada (avisa que shouve clique)
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
            styles.item,
            itemStyle,
            activeIndex == index && [styles.activeItem, activeItemStyle] // Estilos diferentes se for a aba ativa
            ]}
            onPress={() => handlePress(item, index)} // Chamando a função
            >
            <Text
            style={[
              styles.text,
              textStyle,
              activeIndex == index && [styles.activeText, activeTextStyle] // Estilos diferentes se for a aba ativa
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
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#FFF',
    },
    item: { // Estilo para cada aba
      padding: 10,
      marginRight: 10,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeItem: { // Estilo quando a aba está ativa
      backgroundColor: '#55219A',
    },
    text: { // Estilo do texto normal
      fontSize: 12,
      color: 'black',
    },
    activeText: { // Estilo do texto quando a aba está ativa
      fontWeight: 'bold',
      color: '#813AB1',
    },
  });

export default MyTabsbar  