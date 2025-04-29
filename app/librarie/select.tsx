import React, { Children, ReactNode, useState } from 'react'
import { Text, TextStyle, TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Button, List } from 'react-native-paper';
import { inputStyles } from '../../styles/inputStyles';
import AntDesign from '@expo/vector-icons/AntDesign';


interface MySelectProps {

    caption?: string;
    label?: string;
    list: { key: any, option: string }[]
    setLabel(item: string): void;
    setKey?(key: any): void;
    style?: TextStyle | TextStyle[];
}


const Select: React.FC<MySelectProps> = ({ caption, label, list, setLabel, setKey,style }) => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.View}>
            <View style={styles.ViewSelect}>

                <AntDesign
                    name="select1"  //importação de ícones: para ter acesso à eles, IMPORTE: " import AntDesign from '@expo/vector-icons/AntDesign'; " e busque no site:  @expo/vector-icons/AntDesign
                    size={18}
                    color="#6A1B9A"
                    style={styles.AntDesing}
                />

                <Text

                    style={styles.Text}>
                    {caption ? caption : 'Selecione abaixo:'}
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.Opacity, style]}
                onPress={() => setVisible(!visible)}
            >
                <Text style={styles.Text2}>
                {label || 'Selecione...'}
            </Text>
            <AntDesign
                name="down"
                size={18}
                color="purple"
            />
        </TouchableOpacity>

          {
        visible && (
            <View style={styles.viewFlatList}>
            <FlatList
                style={ styles.flatList}
                data={list}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            paddingVertical: 12,
                            paddingHorizontal: 15,
                        }}
                        onPress={() => {
                            setLabel(item.option);
                            if (setKey) setKey(item.key);
                            setVisible(false);
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 15 }}>
                            {item.option}
                        </Text>
                    </TouchableOpacity>
                )}
            />
                 </View >
 
        )
    }
      </View >
  );
};

const styles = StyleSheet.create({
    View: { marginVertical: 10 },

    ViewSelect: {
        flexDirection: 'row',
        display:"flex",
        alignItems: 'center',
        marginBottom: 5,

    },

    AntDesing: {
        marginLeft: 0.1,
        marginRight: 5
    },
    Text: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },

    Opacity: {
        height: 44,  //tudo ok
        marginHorizontal: 1, //
        width: 200, //
        borderRadius: 9,
        paddingHorizontal: 15, //
        backgroundColor: 'white',
        borderWidth: 0.1, //
        borderColor: '#D9D9D9', //
        shadowOffset: { width: 0, height: 0 }, ///
        shadowOpacity: 0.6,
        shadowRadius: 0, //
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center",
    
        
    },
    Text2: {
        color: '#666',
        fontSize: 15,
        fontWeight: '400',
        flex: 1,

    },
    flatList:{  
        width: 200,
        maxHeight:150,
        marginHorizontal: 1,
        marginTop: 5,
        backgroundColor: '#813AB1',
        borderRadius: 10,
        elevation: 4,
        position:"absolute",
        alignSelf: 'flex-start'
        
    },
    viewFlatList:{
        display:"flex",
        alignSelf: 'flex-start'
        
    }

})

export default Select;
