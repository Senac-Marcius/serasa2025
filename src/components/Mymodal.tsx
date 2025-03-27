
import React, { ReactNode, useState  } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

interface MyModalprops {
    children: ReactNode;
    style?: ViewStyle;
    visible: boolean;
    setVisible(visible: boolean): void

}


//Para utilizar qualquer modal deve ser declarado em seu script:


//  const [visible, setVisible] = useState(false); ------

//Neste exemplo foi utilizado o MyModal_mobile1: 

/* <MyModal_mobile1 visible={visible} setVisible={setVisible}>

   </MyModal_mobile1> */


//    ***Modelos dos modais:***

//    ***MyModal_mobile1:***
    //    width: 327,
    //    height: 327,
    //    backgroundColor: 'white',
    //    borderColor: 'purple'

//    ***MyModal_mobile2:***
    // width: 330,
    // height: 220,
    // backgroundColor: 'white',
    // borderColor: 'purple'

//    ***MyModal_mobile3:***
    // width: 375,
    // height: 400,
    // backgroundColor: 'white',
    // borderColor: 'purple'

//    ***MyModal_mobilefullscreen:***
    // width: 375,
    // height: '100%',
    // backgroundColor: 'white',
    // borderColor: 'purple',

//    ***MyModal1_desktop:***
    // width: 900,
    // height: 500,
    // backgroundColor: 'white',
    // borderColor: 'purple',


const MyModal_mobile1: React.FC<MyModalprops> = ({ children, style, visible, setVisible, }) => { //
    function onClose() {
        setVisible(false)
    };

    return (
        <View >
            <Button onPress={() => { setVisible(true) }}>
                sndkksnd
            </Button>
            {visible && (<Modal transparent={true} visible={visible} animationType="fade"   >
                <View style={styles.background} >
                    <View style={styles.modalContent1}  >
                        {children}
                        <Button onPress={onClose}>
                            X
                        </Button>
                    </View>                
                </View>
            </Modal>)}
        </View>
    );

}
const MyModal_mobile2: React.FC<MyModalprops> = ({ children, style, visible, setVisible, }) => { //
    function onClose() {
        setVisible(false)
    };

    return (
        <View >
            <Button onPress={() => { setVisible(true) }}>
                sndkksnd
            </Button>
            {visible && (<Modal transparent={true} visible={visible} animationType="fade"   >
                <View style={styles.background} >
                    <View style={styles.modalContent2}  >
                        {children}
                        <Button style ={styles.button}onPress={onClose}>
                            Close
                        </Button>
                    </View>                
                </View>
            </Modal>)}
        </View>
    );

}
const MyModal_mobile3: React.FC<MyModalprops> = ({ children, style, visible, setVisible, }) => { //
    function onClose() {
        setVisible(false)
    };

    return (
        <View >
            <Button onPress={() => { setVisible(true) }}>
                sndkksnd
            </Button>
            {visible && (<Modal transparent={true} visible={visible} animationType="fade"   >
                <View style={styles.background} >
                    <View style={styles.modalContent3}  >
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
const MyModal_mobilefullscreen: React.FC<MyModalprops> = ({ children, style, visible, setVisible, }) => { //
    function onClose() {
        setVisible(false)
    };

    return (
        <View >
            <Button onPress={() => { setVisible(true) }}>
                sndkksnd
            </Button>
            {visible && (<Modal transparent={true} visible={visible} animationType="fade"   >
                <View style={styles.background} >
                    <View style={styles.modalContent4}  >
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
    const MyModal1_desktop: React.FC<MyModalprops> = ({ children, style, visible, setVisible, }) => { //
        function onClose() {
            setVisible(false)
        };
    
        return (
            <View >
                <Button onPress={() => { setVisible(true) }}>
                    sndkksnd
                </Button>
                {visible && (<Modal transparent={true} visible={visible} animationType="fade"   >
                    <View style={styles.background} >
                        <View style={styles.modalContent5}  >
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
    modalContent1: {
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
    button:{
    },
    modalContent2: {
        display: 'flex',
        width: 330,
        height: 220,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'purple',
        alignItems: 'center',
        justifyContent: 'flex-end',


    },
    modalContent3:{
        display: 'flex',
        width: 375,
        height: 400,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'purple',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    modalContent4:{
        display: 'flex',
        width: 375,
        height: '100%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'purple',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    modalContent5:{
        display: 'flex',
        width: 900,
        height: 500,
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



export {MyModal_mobile1, MyModal_mobile2, MyModal_mobile3, MyModal_mobilefullscreen,MyModal1_desktop}