import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../src/utils/supabase';
import {getUsers} from '../../src/controllers/users';

export default function pageEmployee() {

    const checkIfUserIsLoggedIn = async () => {
        const { data, error } = await supabase.auth.getUsers();
    
        if (error) {
          console.error('Erro ao obter sessão:', error);
          return;
        }
    
        const session = data.session;
        if (session) {
          console.log('Usuário logado:', session.user);
        } else {
          console.log('Usuário não está logado');
        }
      };
    
      useEffect(() => {
        checkIfUserIsLoggedIn();
      }, []);
    

return(
    <View>
    <Text>
      caralho
    </Text>
</View>
);
}
