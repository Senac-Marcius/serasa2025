import React, { ReactNode, useState } from 'react';
import { Text, TouchableOpacity, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {tabsBarStyles} from '../styles/tabsBarStyles';

interface MyTabsbarProps {  
  items: string[]; // Lista de nomes das abas (ex: ["Identificação", "Publicação"]
  style: ViewStyle; // Estilo personalizado para o container principal
  itemStyle: ViewStyle;   // Estilo para cada item/aba normal
  activeItemStyle: ViewStyle; // Estilo para o item/aba selecionado
  textStyle: TextStyle;  // Estilo para cada texto/aba normal
  activeTextStyle: TextStyle; // Estilo para o texto/aba selecionado
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
        style={tabsBarStyles.tabsContainer}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity 
            style={[tabsBarStyles.tabItem, itemStyle,
            activeIndex == index && [tabsBarStyles.activeTabItem, activeItemStyle] // Estilos diferentes se for a aba ativa
            ]}
            onPress={() => handlePress(item, index)} // Chamando a função
            >
            <Text
            style={[
              tabsBarStyles.tabText, textStyle,
              activeIndex == index && [tabsBarStyles.activeTabText, activeTextStyle] // Estilos diferentes se for a aba ativa
            ]}
          >
            {item}
          </Text>
          </TouchableOpacity>
      )}
    />
  ); 
};

export default MyTabsbar  