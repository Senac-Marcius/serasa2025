import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MyModal_mobile1 } from '../src/components/MyModal';
import MyButton from '../src/components/MyButtons';
import MyView from '../src/components/MyView';
import { Myinput } from '../src/components/MyInputs'
import MyList from '../src/components/MyList'
import { useRouter } from 'expo-router';
import {setCollection, iCollection,deleteCollectionById,updateCollectionById} from '../src/controllers/collections';
import { supabase } from '../src/utils/supabase'





console.log ("Olá")





