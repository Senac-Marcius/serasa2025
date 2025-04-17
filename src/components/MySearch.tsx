import React, { useState } from 'react';
import { Text, TextInputKeyPressEventData, View, ViewStyle, TouchableOpacity } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';

interface MySearchProps {
    style: ViewStyle;
    onChangeText(busca: string): void; 
    onPress(): void;
    busca: string;
    placeholder: string;
}

const MySearch: React.FC<MySearchProps> = ({ onChangeText, style, onPress, busca, placeholder }) => {

    function keyPress(event: any) {
        if (event.nativeEvent.key == 'Enter') {
            onPress();
        }
    }

    return (
        <View 
            style={[
                { 
                    padding: 10, 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    justifyContent: 'center', // Isso centraliza o componente na tela
                }, 
                style
            ]}
        >
            {/* Ícone de pesquisa */}
            <IconButton 
                icon="magnify" 
                size={20}
                onPress={onPress}
                style={{
                    position: 'absolute', 
                    left: 10, 
                    zIndex: 1, // Garante que o ícone fique sobre o campo de input
                }} 
            />
            
            {/* Barra de pesquisa com efeito ripple e personalização */}
            <TouchableOpacity 
                activeOpacity={0.7} // Simula um efeito ripple ao pressionar
                onPress={onPress}
                style={{
                    width: '100%',
                    borderRadius: 25,
                    overflow: 'hidden', // Para garantir que o ripple não ultrapasse os cantos arredondados
                }}
            >
                <TextInput 
                    style={{
                        flex: 1,
                        paddingLeft: 40, // Ajustando o padding para o ícone não cobrir o texto
                        paddingRight: 10,
                        borderWidth: 1,
                        borderRadius: 25,
                        borderColor: '#ccc',
                        height: 40,
                        fontSize: 19,
                        backgroundColor: 'white',
                    }}
                    value={busca}
                    placeholder={placeholder? placeholder : "Pesquisar..."}
                    onChangeText={(text) => onChangeText(text)}
                    onKeyPress={keyPress}
                />
            </TouchableOpacity>
        </View>
    );
};

export default MySearch;
