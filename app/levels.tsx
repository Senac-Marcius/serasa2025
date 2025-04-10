import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyView from '../src/components/MyView';
import MyButton from '../src/components/MyButtons';
import { Myinput } from '../src/components/MyInputs';
import MyList from '../src/components/MyList';
import { useRouter } from 'expo-router';
import { supabase } from '../src/utils/supabase';
import MySelect from '../src/components/MySelect';
import {iLevels, setLevels, getLevels, updateLevels, deleteLevels} from '../src/controllers/levels'; 


export default function LevelsScreen() {
  const router = useRouter();
  const [levels, setLevels] = useState<iLevels[]>([]);

  const [form, setForm] = useState({
    id: -1,
    name: '',
    description: '',
    color: 'Selecione uma cor',
    created_at:  new Date().toISOString(),
  });

useEffect(() => {
    async function fetchLevels() {
      const { data } = await supabase.from('levels').select();
      if (data) setLevels(data as iLevels[]);
    }
    fetchLevels();
  }, []);

async function handleSave() {
    if (form.id === -1) {
      const newLevels = { ...form, id: Date.now() }; // id temporário
      setLevels([...levels, newLevels]);
      await supabase.from('levels').insert([newLevels]);
    } else {
      const updated = levels.map(item => (item.id === form.id ? form : item));
      setLevels(updated);
      await supabase.from('levels').update(form).eq('id', form.id);
    }

      setForm({
      id: -1,
      name: '',
      description: '',
      color: 'Selecione uma cor',
      created_at:  new Date().toISOString(),
      
     });
  }

async function handleDelete(id: number) {
    await supabase.from('levels').delete().eq('id', id);
    setLevels(levels.filter(item => item.id !== id));
  }

function handleEdit(levels: iLevels) {
    setForm(levels);

  }

  return (
    <MyView router={router}>
      <View style={styles.container}>
        <Myinput
          label="Nome:"
          placeholder="Digite o nome"
          value={form.name}
          onChangeText={(text: string) => setForm({ ...form, name: text })}
          iconName="person"
        />
        <Myinput
          label="Descrição:"
          placeholder="Digite a descrição"
          value={form.description}
          onChangeText={(text: string) => setForm({ ...form, description: text })}
          iconName="description"
        />

        <MySelect 
          label={form.color}
          list={[
            {key:0, option: 'Verde'},
            {key:1, option: 'Amarelo'},
            {key:2, option: 'Vermelho'},
            ]}
          setLabel={(item) => setForm({...form, color: item})}
        
        />

        <MyButton
          title={form.id === -1 ? 'CADASTRAR' : 'ATUALIZAR'}
          onPress={handleSave}
          button_type="round"
          style={styles.button}
        
        />

        <MyList
          data={levels}
          keyItem={(item) => item.id.toString()}
          renderItem={({ item })=> (
            <View style={styles.item}>
              <Text style={styles.itemText}>Nome: {item.name}</Text>
              <Text style={styles.itemText}>Descrição: {item.description}</Text>
              <Text style={[styles.itemText, { color: item.color.toLowerCase() }]}>{item.color}</Text>
              <View style={styles.actionRow}>
                <MyButton
                  title="EDITAR"
                  onPress={() => handleEdit(item)}
                  button_type="rect"
                  style={styles.button}
                  color='#68228B'
                />
                <MyButton
                  title="EXCLUIR"
                  onPress={() => handleDelete(item.id)}
                  button_type="rect"
                  style={styles.button}
                  color='#8B008B'
                />
              </View>
            </View>
          )}
        />
      </View>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
  padding: 12,
  },

  item: {
  padding: 10,
  marginBottom: 10,
  backgroundColor: '#FFE1FF',
  borderRadius: 8,
  },

  itemText: {
  fontSize: 14,
  marginBottom: 1,
  },

  colorRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginVertical: 10,
  },

  colorButton: {
  paddingHorizontal: 10,
  },
  
  actionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: -10,
  },

  button: {
  marginTop: 7,
  },
});
