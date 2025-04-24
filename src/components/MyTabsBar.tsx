import React, { ReactNode, useState } from 'react';
import { Text, TouchableOpacity, TextStyle, ViewStyle, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface MyTabsbarProps {
  items: string[];
  style?: ViewStyle;
  itemStyle?: ViewStyle;
  activeItemStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeTextStyle?: TextStyle;
  onPress: (item: string, index: number) => void;
  initialActiveIndex: number;
}

const MyTabsbar: React.FC<MyTabsbarProps> = ({
  items,
  style,
  itemStyle,
  activeItemStyle,
  textStyle,
  activeTextStyle,
  onPress,
  initialActiveIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const handlePress = (item: string, index: number) => {
    setActiveIndex(index);
    onPress(item, index);
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.tabsContainer, style]}
      data={items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        const isActive = activeIndex === index;

        return (
          <TouchableOpacity
            style={[styles.tabItem, itemStyle, isActive && [styles.activeTabItem, activeItemStyle]]}
            onPress={() => handlePress(item, index)}
          >
            <Text style={[styles.tabText, textStyle, isActive && [styles.activeTabText, activeTextStyle]]}>
              {item}
            </Text>
            {isActive && <View style={styles.underline} />}
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    paddingHorizontal: 16,
  },
  tabItem: {
    paddingVertical: 10,
    marginRight: 20,
    alignItems: 'center',
  },
  activeTabItem: {
    // sem background, só o underline vai aparecer
  },
  tabText: {
    fontSize: 14,
    color: '#0C1D40',
    fontFamily: 'Poppins_400Regular',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#5A2D82',
  },
  underline: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#5A2D82',
  },
});

export default MyTabsbar;
