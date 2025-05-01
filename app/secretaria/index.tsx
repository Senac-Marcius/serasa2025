import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert, Modal, TextInput, Pressable, Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MyView from '../../src/components/MyView';
import { DatePickerModal } from 'react-native-paper-dates';
//2

interface Evento {
  id: number;
  nome: string;
  data: string;
}

const menuItems = [
  { label: 'Cursos', icon: <Ionicons name="school-outline" size={20} color="#555" />, route: 'secretaria/courses' },
  { label: 'Disciplinas', icon: <Ionicons name="book-outline" size={20} color="#555" />, route: 'secretaria/disciplines' },
  { label: 'Biblioteca', icon: <Ionicons name="library-outline" size={20} color="#555" />, route: 'secretaria/library' },
  { label: 'Calendário', icon: <Ionicons name="calendar-outline" size={20} color="#555" />, route: 'secretaria/calendar' },
  { label: 'Documentos', icon: <Ionicons name="document-text-outline" size={20} color="#555" />, route: 'secretaria/documents' },
  { label: 'Matrícula', icon: <MaterialCommunityIcons name="clipboard-text-outline" size={20} color="#555" />, route: 'secretaria/registration' },
  { label: 'Configurações', icon: <Feather name="settings" size={20} color="#555" />, route: 'secretaria/settings' },
];

const cards = [
  {
    title: 'Disciplinas',
    icon: <Ionicons name="book" size={30} color="#6C63FF" />,
    route: 'secretaria/disciplines',
    bgColor: '#F3F1FE',
    value: 12,
  },
  {
    title: 'Cursos',
    icon: <Ionicons name="school" size={30} color="#FFB703" />,
    route: 'secretaria/courses',
    bgColor: '#FFF6E5',
    value: 5,
  },
  {
    title: 'Calendário',
    icon: <Ionicons name="calendar" size={30} color="#2EC4B6" />,
    route: 'secretaria/calendar',
    bgColor: '#E5FBF8',
    value: 7,
  },
  {
    title: 'Documentos',
    icon: <Ionicons name="document-text" size={30} color="#FF5C8A" />,
    route: 'secretaria/documents',
    bgColor: '#FFEAF0',
    value: 21,
  },
];

export default function IndexScreen() {
  const router = useRouter();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [novoEvento, setNovoEvento] = useState({ nome: '', data: '' });
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>();
  const [abrirCalendario, setAbrirCalendario] = useState(false);

  useEffect(() => {
    setEventos([
      { id: 1, nome: 'Reunião Pedagógica', data: '2025-04-07' },
      { id: 2, nome: 'Entrega de Notas', data: '2025-04-10' },
      { id: 3, nome: 'Conselho de Classe', data: '2025-04-14' },
    ]);
  }, []);

  const abrirModal = (evento?: Evento) => {
    if (evento) {
      setEditandoId(evento.id);
      setNovoEvento({ nome: evento.nome, data: evento.data });
      setDataSelecionada(new Date(evento.data));
    } else {
      setEditandoId(null);
      setNovoEvento({ nome: '', data: '' });
      setDataSelecionada(undefined);
    }
    setModalVisible(true);
  };

  const salvarEvento = () => {
    if (!novoEvento.nome.trim() || !novoEvento.data.trim()) return;

    const regexData = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexData.test(novoEvento.data)) {
      Alert.alert('Data inválida', 'A data deve estar no formato YYYY-MM-DD');
      return;
    }

    if (editandoId) {
      setEventos(prev => prev.map(ev => ev.id === editandoId ? { ...ev, ...novoEvento } : ev));
    } else {
      setEventos(prev => [...prev, { ...novoEvento, id: Date.now() }]);
    }

    setModalVisible(false);
    setNovoEvento({ nome: '', data: '' });
    setEditandoId(null);
    setDataSelecionada(undefined);
  };

  const excluirEvento = (id: number) => {
    Alert.alert('Confirmar Exclusão', 'Deseja realmente excluir este evento?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setEventos(prev => prev.filter(ev => ev.id !== id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.logoContainer}>
          <FontAwesome5 name="chalkboard-teacher" size={28} color="#b34db2" />
          <Text style={styles.logoTitle}>Virtudemy</Text>
          <Text style={styles.logoSubtitle}>Learn From Home</Text>
        </View>

        {menuItems.map((item, index) => {
          const isHovered = hoveredItem === item.route;
          return (
            <Pressable
              key={index}
              onHoverIn={() => setHoveredItem(item.route)}
              onHoverOut={() => setHoveredItem(null)}
              onPress={() => router.push(item.route)}
              style={[styles.menuItem, isHovered && styles.activeItem]}
            >
              <View style={styles.icon}>{item.icon}</View>
              <Text style={[styles.menuText, isHovered && styles.activeText]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Conteúdo principal */}
      <MyView style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.mainTitle}>Painel da Secretaria</Text>

          <View style={styles.cardArea}>
            {cards.map((card, index) => (
              <Pressable
                key={index}
                style={[styles.card, { backgroundColor: card.bgColor }]}
                onPress={() => router.push(card.route)}
              >
                {card.icon}
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardNumber}>{card.value}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.eventsTitle}>Próximos Eventos</Text>
          {eventos.map(evento => (
            <View key={evento.id} style={styles.eventItem}>
              <Ionicons name="calendar-outline" size={20} color="#6A1B9A" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.eventName}>{evento.nome}</Text>
                <Text style={styles.eventDate}>{evento.data}</Text>
              </View>
              <TouchableOpacity onPress={() => abrirModal(evento)} style={{ marginRight: 10 }}>
                <Ionicons name="pencil-outline" size={18} color="#6A1B9A" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirEvento(evento.id)}>
                <Ionicons name="close-circle-outline" size={20} color="#B00020" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={() => abrirModal()} style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="add-circle-outline" size={18} color="#6A1B9A" />
            <Text style={{ color: '#6A1B9A', marginLeft: 6 }}>Agendamento</Text>
          </TouchableOpacity>
        </ScrollView>
      </MyView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Nome do evento"
              value={novoEvento.nome}
              onChangeText={text => setNovoEvento({ ...novoEvento, nome: text })}
              style={styles.input}
            />

            <TouchableOpacity onPress={() => setAbrirCalendario(true)} style={[styles.input, { justifyContent: 'center' }]}>
              <Text style={{ fontSize: 16, color: novoEvento.data ? '#000' : '#888' }}>
                {novoEvento.data || 'Selecionar data'}
              </Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={salvarEvento} style={styles.saveButton}>
                <Text style={styles.saveText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <DatePickerModal
          locale="pt"
          mode="single"
          visible={abrirCalendario}
          onDismiss={() => setAbrirCalendario(false)}
          date={dataSelecionada}
          onConfirm={({ date }) => {
            if (date) {
              setDataSelecionada(date);
              setNovoEvento({ ...novoEvento, data: date.toISOString().split('T')[0] });
            }
            setAbrirCalendario(false);
          }}
        />
      </Modal>
    </View>
  );
}

const isLarge = Dimensions.get('window').width > 600;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#F2F3F5' },
  sidebar: {
    width: 180,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  mainContent: { flex: 1 },

  logoContainer: { alignItems: 'center', marginBottom: 24 },

  logoTitle: { fontSize: 18, fontWeight: 'bold', color: '#b34db2', marginTop: 6 },

  logoSubtitle: { fontSize: 11, color: '#b34db2' },

  menuItem: {
    flexDirection: 'row', alignItems: 'center', marginVertical: 8,
    paddingVertical: 6, paddingHorizontal: 8, borderRadius: 8,
  },
  icon: { marginRight: 10 },

  menuText: { fontSize: 13, color: '#555' },

  activeItem: { backgroundColor: '#E6F9F5', borderLeftWidth: 4, borderLeftColor: '#b34db2' },

  activeText: { color: '#b34db2', fontWeight: '600' },

  content: { flexGrow: 1, padding: 24, backgroundColor: '#F2F3F5' },

  mainTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  cardArea: {

    flexDirection: 'row', gap: 20, flexWrap: 'wrap',
    justifyContent: 'flex-start', marginBottom: 20,
  },
  card: {
    padding: 24, borderRadius: 12, elevation: 2, width: isLarge ? 250 : '100%',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10,
    alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  cardNumber: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  eventsTitle: { fontSize: 17, fontWeight: 'bold', color: '#3AC7A8', marginBottom: 12 },
  eventItem: {
    backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center', elevation: 1,
  },
  eventName: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  eventDate: { fontSize: 12, color: '#666' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff', borderRadius: 10, padding: 20,
    width: '80%', elevation: 5,
  },
  input: {
    borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 16,
    paddingVertical: 6, fontSize: 16,
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  cancelButton: { paddingVertical: 8, paddingHorizontal: 16 },
  saveButton: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#6A1B9A', borderRadius: 6 },
  cancelText: { color: '#777' },
  saveText: { color: '#fff', fontWeight: 'bold' },
});
