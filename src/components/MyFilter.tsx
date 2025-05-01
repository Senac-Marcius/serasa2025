/*Como Usar:
    <MyFilter
        style={styles.container}
        itens={['filtro1', 'filtro2']}
        onSend={(filter) => console.log('Filtro aplicado:', filter)}
        onPress={(item) => console.log('Filtro pressionado:', item)}
        />
*/

import React, { useState } from "react";
import { Text, View, ViewStyle, TouchableOpacity, StyleSheet, FlatList } from "react-native";

interface MyFilterProps {
  style: ViewStyle;
  onSend: (filter: string) => void;
  itens: string[];
  onPress: (item: string) => void;
}

const MyFilter: React.FC<MyFilterProps> = ({ style, itens, onSend, onPress }) => {
  const [visible, setVisible] = useState(false);
  const [filteredItems, setFilteredItems] = useState<string[]>(itens);

  const handleFilterSelection = (filter: string): void => {
    onSend(filter);
    setVisible(false);
    onPress(filter);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => {
          setVisible(!visible);
          setFilteredItems(itens); // Sempre reseta os itens quando abrir
        }}
      >
        <Text style={styles.filterButton}>FILTROS</Text>
      </TouchableOpacity>

      {visible && (
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleFilterSelection(item)}>
              <Text style={styles.option}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.filterOptions}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',  
  },
  filterButton: {
    backgroundColor: '#813AB1',
    padding: 10,
    borderRadius: 30,
    color: '#ffffff',
    textAlign: 'center',
    width: 120,
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-end', 
  },
  filterOptions: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    maxHeight: 100,
    overflow: 'hidden',
  },
  option: {
    padding: 12,
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
  },
});

export default MyFilter;
