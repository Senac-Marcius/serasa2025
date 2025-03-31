
import React from 'react';
import {Text, View, ViewStyle} from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';

interface MySearchProps {
    style: ViewStyle;
   onKeyPress(): void; 
}

const MySearch: React.FC<MySearchProps> = ({onKeyPress, style}) => {
    return (
        <View style={[{padding: 10, flexDirection: 'row', alignItems: 'center' }, style]}>
            <Text> </Text>
            <IconButton 
                icon="magnify" // Ícone de pesquisa do react-native-paper
                size={20}
                onPress={onKeyPress}
                style={{ position: 'absolute', left: 10 }} // Colocando o ícone à esquerda da TextInput
            />           
            <TextInput 
                 style={{
                    flex: 1,
                    paddingLeft: 30, // Espaço para o ícone dentro da barra de pesquisa
                    paddingRight: 10,
                    borderWidth: 1,
                    borderRadius: 25,
                    borderColor: '#ccc',
                    height: 40,
                    fontSize: 19,
                }}
                placeholder="Pesquisar..."
                onKeyPress={(e) => onKeyPress()}
            />
        </View>
    );
};

export default MySearch



