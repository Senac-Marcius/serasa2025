import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyView from '../src/components/MyView';
import MyButton from '../src/components/MyButtons';
import { Myinput } from '../src/components/MyInputs';
import MyList from '../src/components/MyList';
import { useRouter } from 'expo-router';
import { supabase } from '../src/utils/supabase';

interface iLevel {
  id: number;
  name: string;
  description: string;
  color: 'Verde' | 'Amarelo' | 'Vermelho';
}

export default function LevelsScreen() {
  const router = useRouter();
  const [levels, setLevels] = useState<iLevel[]>([]);

  const [form, setForm] = useState<iLevel>({
    id: -1,
    name: '',
    description: '',
    color: 'Verde',
  });

  useEffect(() => {
    async function fetchLevels() {
      const { data } = await supabase.from('levels').select();
      if (data) setLevels(data as iLevel[]);
    }
    fetchLevels();
  }, []);

  async function handleSave() {
    if (form.id === -1) {
      const newLevel = { ...form, id: Date.now() }; // id temporário
      setLevels([...levels, newLevel]);
      await supabase.from('levels').insert([newLevel]);
    } else {
      const updated = levels.map(item => (item.id === form.id ? form : item));
      setLevels(updated);
      await supabase.from('levels').update(form).eq('id', form.id);
    }

    setForm({ id: -1, name: '', description: '', color: 'Verde' });
  }

  async function handleDelete(id: number) {
    await supabase.from('levels').delete().eq('id', id);
    setLevels(levels.filter(item => item.id !== id));
  }

  function handleEdit(level: iLevel) {
    setForm(level);
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

        <View style={styles.colorRow}>
          {['Verde', 'Amarelo', 'Vermelho'].map(cor => (
            <MyButton
              key={cor}
              title={cor}
              button_type={form.color === cor ? 'capsule' : 'rect'}
              onPress={() => setForm({ ...form, color: cor as iLevel['color'] })}
              style={styles.colorButton}
            />
          ))}
        </View>

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
                />
                <MyButton
                  title="EXCLUIR"
                  onPress={() => handleDelete(item.id)}
                  button_type="rect"
                  style={styles.button}
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
    padding: 20,
  },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
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
    marginTop: 10,
  },
  button: {
    marginTop: 10,
  },
});
