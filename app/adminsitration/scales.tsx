import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MyFilter from '../../src/components/MyFilter';
import MySelect from '../../src/components/MySelect';
import MyTimerPicker from '../../src/components/MyTimerPiker';
import MyButton from '../../src/components/MyButtons';
import { MyItem } from '../../src/components/MyItem';
import MyView from '../../src/components/MyView';
import { useRouter } from 'expo-router';
import { iScale, setScale, updateScale, deleteScale, getScale } from '../../src/controllers/scales';
import Mytext from '../../src/components/MyText';

export default function ScaleScreen() {
  const [scales, setScales] = useState<iScale[]>([]);
  const [req, setReq] = useState({
    id: -1,
    day: '',
    start_time: '',
    end_time: '',
    created_at: new Date().toISOString(),
    employ_id: 1,
  });
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [currentView, setCurrentView] = useState<'form' | 'table' | null>(null);

  const daysOfWeek = [
    { key: '1', option: 'Segunda-feira' },
    { key: '2', option: 'Terça-feira' },
    { key: '3', option: 'Quarta-feira' },
    { key: '4', option: 'Quinta-feira' },
    { key: '5', option: 'Sexta-feira' },
    { key: '6', option: 'Sábado' },
    { key: '7', option: 'Domingo' },
  ];

  const handleSetLabel = (label: string) => {
    setSelectedDay(label);
    setReq(prevReq => ({ ...prevReq, day: label }));
  };

  useEffect(() => {
    async function getTodos() {
      const retorno = await getScale({});
      if (retorno.status && retorno.data && retorno.data.length > 0) {
        setScales(retorno.data);
      }
    }
    getTodos();
  }, []);

  async function handleRegister() {
    if (req.id === -1) {
      const newid = scales.length ? Math.max(...scales.map(s => s.id)) + 1 : 0;
      const newScale = { ...req, id: newid };
      const saved = await setScale(newScale);
      if (saved) setScales([...scales, saved[0]]);
    } else {
      const updated = await updateScale(req.id, req);
      if (updated) {
        setScales(scales.map(s => (s.id === req.id ? updated[0] : s)));
      }
    }

    setReq({
      id: -1,
      day: '',
      start_time: '',
      end_time: '',
      created_at: new Date().toISOString(),
      employ_id: 1,
    });
    setSelectedDay('');
  }

  async function handleDeleteScale(id: number) {
    const success = await deleteScale(id);
    if (success) {
      setScales(scales.filter(s => s.id !== id));
    }
  }

  function editScale(id: number) {
    const scale = scales.find(s => s.id === id);
    if (scale) {
      setReq(scale);
      setSelectedDay(scale.day);
      setCurrentView('form');
    }
  }

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <MyView>
        <View style={styles.buttonGroup}>
          <MyButton
            style={styles.Button}
            title='CRIAR ESCALA'
            onPress={() => setCurrentView('form')}
          />
          <MyButton
            style={styles.Button}
            title='MINHA ESCALA'
            onPress={() => setCurrentView('table')}
          />
        </View>

        {currentView === 'form' && (
          <View style={styles.form}>
            <Mytext style={styles.Mytext}>Dia Selecionado:📅 {selectedDay || 'Nenhum dia selecionado'}</Mytext>
            <MySelect
              label={selectedDay || 'Selecione um dia da semana'}
              list={daysOfWeek}
              setLabel={handleSetLabel}
            />


            <Mytext style={styles.Mytext}>Horário de início:</Mytext>
            <MyTimerPicker
              initialTime={req.start_time}
              onTimeSelected={(time) => setReq({ ...req, start_time: time })}
            />

            <Mytext style={styles.Mytext}>Horário de término:</Mytext>
            <MyTimerPicker
              initialTime={req.end_time}
              onTimeSelected={(time) => setReq({ ...req, end_time: time })}
            />
            
            <MyButton title={req.id === -1 ? 'CADASTRAR' : 'ATUALIZAR CADASTRO'}  onPress={handleRegister} />
          </View>
        )}

        {currentView === 'table' && (
          <View style={styles.listContainer}>
            
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Dia</Text>
              <Text style={styles.tableHeaderText}>Início</Text>
              <Text style={styles.tableHeaderText}>Término</Text>
              <Text style={styles.tableHeaderText}>Ações</Text>
            </View>

            {scales.map((item) => (
              <View key={item.id.toString()} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.day}</Text>
                <Text style={styles.tableCell}>{item.start_time}</Text>
                <Text style={styles.tableCell}>{item.end_time}</Text>
                <View style={[styles.tableCell]}>
                  <MyItem style={styles.tableButton}
                  onEdit={() => editScale(item.id)} 
                  onDel={() => handleDeleteScale(item.id)} />
                </View>
              </View>
            ))}
          </View>
        )}
      </MyView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 15,
  },
  Button: {
    backgroundColor: '#813AB1',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    fontSize: 14,
    marginVertical: 5,
    minWidth: 240,
    alignSelf: 'center',
  },
  Mytext: {
    color: '#813AB1',
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
    letterSpacing: 1,
    paddingHorizontal: 10,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    padding: 4,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    minHeight: '40%',
  },
  form: {
    flex: 1,
    marginRight: 10,
    padding: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 6,
    marginBottom: 5,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#813AB1',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tableCell: {
    flex: 1,
    fontSize: 20,
    color: '#813AB1',
    textAlign: 'center',
  },
  tableButton: {
    margin: 'auto'
  },
});



