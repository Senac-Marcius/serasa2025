
import React, { ReactNode, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ViewStyle,TextStyle } from 'react-native';
import MyButton from './MyButtons';

interface MyModalprops {
    children: ReactNode;
    style?: TextStyle | TextStyle[];
    visible: boolean;
    setVisible(visible: boolean): void
    title:string;
    closeButtonTitle?: string;

}


//Para utilizar qualquer modal deve ser declarado em seu script:


//  const [visible, setVisible] = useState(false); ------

//Neste exemplo foi utilizado o MyModal_mobile1: 

/* <MyModal_mobile1 
   visible={visible} 
   setVisible={setVisible}
   title="Abrir Modal"
   closeButtonTitle="Fechar">

   </MyModal_mobile1> */




const MyModal: React.FC<MyModalprops> = ({ children, style, visible, setVisible,title, closeButtonTitle }) => { //
    function onClose() {
        setVisible(false)
    };
    return (
        <View >
            <MyButton
                onPress={() => { setVisible(true) }}
                title= {title}
                 />

            {visible && (<Modal transparent={true} visible={visible} animationType="fade"   >
                <View style={styles.background} >
                    <View style={[styles.MyModal, style]}  >
                        {children}
                        <MyButton onPress={onClose}
                             title ={closeButtonTitle || "voltar"}
                            style={styles.button_round}
                        />

                    </View>
                </View>
            </Modal>)}
        </View>
    );

}


const styles = StyleSheet.create({
    button_capsule: {
        borderRadius: 50,
        backgroundColor: "#813AB1",
        alignItems: "center",
        justifyContent: "center",
      },
      button_round: {
        backgroundColor: "#813AB1",
        width: 100,
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    MyModal: {
        display: 'flex',
        width: 327,
        height: 327,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'purple',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    
    background: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',

    }
});



export {MyModal}
