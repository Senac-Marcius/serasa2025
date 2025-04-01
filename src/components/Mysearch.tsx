
import React from 'react';
import {Text, TextInputKeyPressEventData, View, ViewStyle} from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';

interface MySearchProps {
    style: ViewStyle;
    onChangeText(busca: string): void; 
    onPress(): void;
    busca: string;
}

const MySearch: React.FC<MySearchProps> = ({onChangeText, style, onPress, busca}) => {

    function keyPress(event: any){
        if(event.nativeEvent.key == 'Enter'){
            onPress()
        }
    }

    return (
        <View style={[{padding: 10, flexDirection: 'row', alignItems: 'center' }, style]}>
            <Text> </Text>
            <IconButton 
                icon="magnify" // Ícone de pesquisa do react-native-paper
                size={20}
                onPress={onPress}
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
                value={busca}
                placeholder="Pesquisar..."
                onChangeText={(text) => onChangeText(text)}
                onKeyPress= {keyPress}
                />
        </View>
    );
};


export default MySearch

/** necessario adicionar essa function e cosnt para funcionar
 * 
 *  function buscar(){
 
     }
 
     const [busca, setBusca] = useState('')
 */


