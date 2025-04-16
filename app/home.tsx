import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function HomeScreen() {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [showAgendamentoModal, setShowAgendamentoModal] = useState(false);
  const [agendamentoTexto, setAgendamentoTexto] = useState('');
  const [agendamentoDescricao, setAgendamentoDescricao] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [eventos, setEventos] = useState([
    { title: 'Reunião Pedagógica', date: '2025-04-08', description: '' },
    { title: 'Entrega de Notas', date: '2025-04-11', description: '' },
    { title: 'Conselho de Classe', date: '2025-04-15', description: '' },
  ]);
  const [totais, setTotais] = useState({
    disciplinas: 4,
    cursos: 2,
    professores: 4,
    alunos: 125,
    comentarios: 12,
    suspensoes: 3,
    anotacoes: 7,
    matriculas: 32,
  });

  const handleNavigation = (route: string) => {
    setDrawerVisible(false);
    router.push(`/${route}`);
  };

  const menuItems = [
    {
      group: 'Gerenciar',
      items: [
        {
          icon: 'account-outline',
          label: 'Professores',
          route: 'professores',
          description: 'Acompanhe os professores ativos',
        },
        {
          icon: 'file-document-outline',
          label: 'Documentos',
          route: 'documents',
          description: 'Gerencie e organize arquivos',
        },
        {
          icon: 'library-shelves',
          label: 'Cursos',
          route: 'courses',
          description: 'Veja os cursos disponíveis',
        },
      ],
    },
    {
      group: 'Agenda',
      items: [
        {
          icon: 'calendar-month-outline',
          label: 'Calendário',
          route: 'calendar',
          description: 'Visualize datas e eventos',
        },
      ],
    },
  ];

  const handleAgendar = () => {
    if (!agendamentoTexto.trim() || !selectedDate) return;

    const novoEvento = {
      title: agendamentoTexto,
      date: selectedDate,
      description: agendamentoDescricao,
    };

    if (editIndex !== null) {
      const novosEventos = [...eventos];
      novosEventos[editIndex] = novoEvento;
      setEventos(novosEventos);
    } else {
      setEventos([...eventos, novoEvento]);
    }

    setAgendamentoTexto('');
    setAgendamentoDescricao('');
    setSelectedDate('');
    setEditIndex(null);
    setShowAgendamentoModal(false);
  };

  const handleEditarEvento = (index: number) => {
    const evento = eventos[index];
    setAgendamentoTexto(evento.title);
    setAgendamentoDescricao(evento.description);
    setSelectedDate(evento.date);
    setEditIndex(index);
    setShowAgendamentoModal(true);
  };

  const handleRemoverEvento = (index: number) => {
    Alert.alert('Remover Evento', 'Tem certeza que deseja remover este evento?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover', style: 'destructive',
        onPress: () => {
          const novosEventos = [...eventos];
          novosEventos.splice(index, 1);
          setEventos(novosEventos);
        },
      },
    ]);
  };

  const renderStatCard = (icon: string, label: string, value: number, route?: string) => (
    <TouchableOpacity
      onPress={route ? () => handleNavigation(route) : undefined}
      style={styles.statCard}
    >
      <Icon name={icon} size={28} color="#6A1B9A" />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {!isMobile && (
        <View style={styles.sidebarImproved}>
          <View style={styles.userSection}>
            <Icon name="account-circle" size={48} color="#FFF" />
            <Text style={styles.userName}>Sung Jin-Woo</Text>
            <Text style={styles.userRole}>Administrador</Text>
          </View>

          {/* Grupo: Gerenciar */}
          <Text style={styles.menuGroupTitle}>Gerenciar</Text>
          {menuItems[0].items.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.sidebarButtonImproved,
                  index === 0 && { marginTop: 10 }, // adiciona espaçamento acima de "Professores"
                ]}
                onPress={() => handleNavigation(item.route)}
              >

              <Icon name={item.icon} size={24} color="#FFF" style={{ marginRight: 14 }} />
              <View>
                <Text style={styles.sidebarItem}>{item.label}</Text>
                <Text style={styles.sidebarDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Linha branca de separação */}
          <View style={styles.separator} />

          {/* Grupo: Agenda */}
          <View style={styles.agendaSection}>
            <Text style={styles.menuGroupTitle}>Agenda</Text>
            {menuItems[1].items.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.sidebarButtonImproved}
                onPress={() => handleNavigation(item.route)}
              >
                <Icon name={item.icon} size={24} color="#FFF" style={{ marginRight: 14 }} />
                <View>
                  <Text style={styles.sidebarItem}>{item.label}</Text>
                  <Text style={styles.sidebarDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 4 }}>Bem-vindo à Secretaria</Text>
        <Text style={{ fontSize: 15, color: '#777', marginBottom: 20 }}>Resumo geral do sistema</Text>

        <View style={styles.alertBox}>
          <Icon name="alert-circle-outline" size={24} color="#FFC107" />
          <Text style={styles.alertText}>Faltam 3 dias para encerrar o período de matrículas.</Text>
        </View>

        <View style={styles.cardGrid}>
          {renderStatCard('book-outline', 'Disciplinas', totais.disciplinas, 'disciplines')}
          {renderStatCard('library-shelves', 'Cursos', totais.cursos, 'courses')}
          {renderStatCard('account-outline', 'Professores', totais.professores, 'professores')}
          {renderStatCard('account-group-outline', 'Alunos', totais.alunos)}
          {renderStatCard('file-document-edit-outline', 'Matrículas', totais.matriculas)}
          {renderStatCard('message-outline', 'Comentários', totais.comentarios)}
          {renderStatCard('alert-octagon-outline', 'Suspensões', totais.suspensoes)}
          {renderStatCard('note-text-outline', 'Anotações', totais.anotacoes)}
        </View>

        <Text style={styles.sectionTitle}>Próximos Eventos</Text>
        {eventos.map((evento, idx) => (
          <View key={idx} style={styles.eventCard}>
            <Icon name="calendar-outline" size={20} color="#6A1B9A" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.eventTitle}>{evento.title}</Text>
              <Text style={styles.eventDate}>{new Date(evento.date).toLocaleDateString('pt-BR')}</Text>
              {evento.description && <Text style={styles.eventDate}>{evento.description}</Text>}
            </View>
            <TouchableOpacity onPress={() => handleEditarEvento(idx)}>
              <Icon name="pencil-outline" size={20} color="#007BFF" style={{ marginRight: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoverEvento(idx)}>
              <Icon name="close-circle-outline" size={20} color="#E53935" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.agendamentoButton}
          onPress={() => setShowAgendamentoModal(true)}
        >
          <Icon name="calendar-plus" size={24} color="#6A1B9A" />
          <Text style={styles.agendamentoText}>Agendamento</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showAgendamentoModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{editIndex !== null ? 'Editar Agendamento' : 'Novo Agendamento'}</Text>
            <TextInput
              placeholder="Digite o nome do evento..."
              value={agendamentoTexto}
              onChangeText={setAgendamentoTexto}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Descrição (opcional)"
              value={agendamentoDescricao}
              onChangeText={setAgendamentoDescricao}
              style={styles.modalInput}
            />
            <Calendar
              onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: '#6A1B9A',
                },
              }}
              theme={{
                selectedDayBackgroundColor: '#6A1B9A',
                selectedDayTextColor: '#fff',
                todayTextColor: '#6A1B9A',
                arrowColor: '#6A1B9A',
              }}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleAgendar}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>{editIndex !== null ? 'Atualizar' : 'Cadastrar'}</Text>
            </TouchableOpacity>
            <Pressable style={styles.modalClose} onPress={() => setShowAgendamentoModal(false)}>
              <Text style={{ color: '#6A1B9A' }}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flex: 1, backgroundColor: '#F4F4F4' },
  sidebarImproved: {
    width: 270,
    backgroundColor: '#6A1B9A',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  userSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  userName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  userRole: {
    color: '#D1C4E9',
    fontSize: 13,
  },
  menuGroupTitle: {
    color: '#D1C4E9',
    fontSize: 13,
    marginBottom: 10,
    marginTop: 20,
    paddingLeft: 6,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  sidebarButtonImproved: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  sidebarItem: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  sidebarDescription: {
    color: '#E0E0E0',
    fontSize: 12,
    marginTop: 2,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF33',
    marginVertical: 20,
  },
  agendaSection: {
    marginTop: 40,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: width > 768 ? 200 : '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  statLabel: { fontSize: 14, color: '#777', marginTop: 8 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#6A1B9A' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#6A1B9A', marginTop: 10, marginBottom: 10 },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  eventTitle: { fontWeight: 'bold', color: '#333' },
  eventDate: { fontSize: 12, color: '#777' },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    borderLeftWidth: 5,
    borderLeftColor: '#FFC107',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  alertText: {
    marginLeft: 10,
    color: '#856404',
    fontSize: 14,
    fontWeight: '500',
  },
  agendamentoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 16,
    gap: 10,
  },
  agendamentoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6A1B9A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 10,
  },
  modalInput: {
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 12,
  },
  modalButton: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  modalClose: {
    alignItems: 'center',
  },
});
