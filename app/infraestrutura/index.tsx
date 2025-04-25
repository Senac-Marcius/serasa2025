
import React from 'react';
import { View } from 'react-native';
import { useState } from 'react';
import  MyView from '../../src/components/MyView'
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import  MyList  from '../../src/components/MyList';
import {delItem, editItem}  from '../../src/controllers/items';
import { MyItem } from '../../src/components/MyItem';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <MyView router={router} style={{ flex: 1 }}>
            

            {<MyList
            data={itens}
            keyItem={(i) => i.id.toString()}
            renderItem={({item})=>(
                <MyItem 
                    onDel={()=>{delItem(item.id)}}
                    onEdit={()=>{editItem(item.id)}}
                >
                    <text >{item.name}</text>
                    <text >{item.mark}</text>
                    <text>{item.assetNumber}</text>
                    <text>{item.amount}</text>
                    <View style={styles.buttonsContainer}></View>

                </MyItem>

            )}
            
            />}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            

                
            </View>
        </MyView>
    );  
} const styles = StyleSheet.create ({

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        fontSize: 15,
        padding: 40,
        
    },
})