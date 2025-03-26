
import React, { ReactNode } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

interface MyModalprops {
    children: ReactNode;
    style?: ViewStyle;
    visible: boolean;
    setVisible(visible: boolean): void

}
const MyModal: React.FC<MyModalprops> = ({ children, style, visible, setVisible, }) => { //
    function onClose() {
        setVisible(false)
    };

    return (
        <View >
            <Button onPress={() => { setVisible(true) }}>
                sndkksnd
            </Button>
            {visible && (<Modal transparent={true} visible={visible} animationType="fade"   >
                <View style={styles.test} >
                    <View style={styles.modalContent}  >
                        {children}
                        <Button onPress={onClose}>
                            Close
                        </Button>
                    </View>                
                </View>
            </Modal>)}
        </View>
    );

}
const styles = StyleSheet.create({
    modalContent: {
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
    test: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',

    }
});



export default MyModal