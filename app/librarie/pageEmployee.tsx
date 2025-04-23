import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../src/utils/supabase';
import { getUsers } from '../../src/controllers/users';
import MyView from '../../src/components/MyView';
import MyButton from '../../src/components/MyButtons';
import { useRouter, Link } from 'expo-router';


export default function pageEmployee() {
  const router = useRouter();



  return (
    <MyView>
    <View>
      <MyButton
        onPress={() => router.push('../../app/users')}
        title="Login"
      />


    </View>
  </MyView>
  )
}
const styles = StyleSheet.create({

})
