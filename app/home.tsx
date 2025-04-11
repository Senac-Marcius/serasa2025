import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,ScrollView,Dimensions,TouchableOpacity,Modal,Pressable,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { supabase } from '../src/utils/supabase';
import MyCalendar from '../src/components/MyCalendar';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function HomeScreen() {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [totais, setTotais] = useState({
    disciplinas: 0,
    professores: 0,
    alunos: 0,
    comentarios: 12,
    suspensoes: 3,
    anotacoes: 7,
  });

  useEffect(() => {
    (async () => {
      const { data: disciplinas } = await supabase.from('disciplines').select();
      const professoresUnicos = [...new Set(disciplinas?.map((d) => d.teacher?.trim()))];
      setTotais((prev) => ({
        ...prev,
        disciplinas: disciplinas?.length || 0,
        professores: professoresUnicos.length,
        alunos: 125,
      }));
    })();
  }, []);

  const handleNavigation = (route: string) => {
    setDrawerVisible(false);
    router.push(`/${route}`);
  };

  const menuItems = [
    { icon: 'account-outline', label: 'Professores', route: 'professores' },
    { icon: 'file-document-outline', label: 'Documentos', route: 'documents' },
    { icon: 'library-shelves', label: 'Cursos', route: 'courses' },
    { icon: 'calendar-month-outline', label: 'Calendário', route: 'calendar' },
  ];

  const eventos = [
    { title: 'Reunião Pedagógica', date: '2025-04-08' },
    { title: 'Entrega de Notas', date: '2025-04-11' },
    { title: 'Conselho de Classe', date: '2025-04-15' },
  ];

  return (
    <View style={styles.container}>
      {!isMobile && (
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Secretaria</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.sidebarButton}
              onPress={() => handleNavigation(item.route)}
            >
              <Icon name={item.icon} size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.sidebarItem}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {isMobile && (
        <>
          <TouchableOpacity style={styles.menuButton} onPress={() => setDrawerVisible(true)}>
            <Icon name="menu" size={28} color="#6A1B9A" />
          </TouchableOpacity>
          <Modal visible={drawerVisible} transparent animationType="slide">
            <View style={styles.drawerContainer}>
              <View style={styles.drawer}>
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.label}
                    style={styles.sidebarButton}
                    onPress={() => handleNavigation(item.route)}
                  >
                    <Icon name={item.icon} size={20} color="#fff" style={{ marginRight: 10 }} />
                    <Text style={styles.sidebarItem}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Pressable style={styles.drawerOverlay} onPress={() => setDrawerVisible(false)} />
            </View>
          </Modal>
        </>
      )}

      <ScrollView style={styles.main}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#6A1B9A" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.pageTitle}>Bem-vindo à Secretaria</Text>
        <Text style={styles.pageSubtitle}>Resumo geral do sistema</Text>

        <View style={styles.cardGrid}>
          <StatCard icon="book-outline" label="Disciplinas" value={totais.disciplinas} onPress={() => handleNavigation('disciplines')} />
          <StatCard icon="account-outline" label="Professores" value={totais.professores} onPress={() => handleNavigation('')} />
          <StatCard icon="account-group-outline" label="Alunos" value={totais.alunos} />
          <StatCard icon="message-outline" label="Comentários" value={totais.comentarios} />
          <StatCard icon="alert-octagon-outline" label="Suspensões" value={totais.suspensoes} />
          <StatCard icon="note-text-outline" label="Anotações" value={totais.anotacoes} />
        </View>

        <Text style={styles.sectionTitle}>Próximos Eventos</Text>
        {eventos.map((evento, idx) => (
          <View key={idx} style={styles.eventCard}>
            <Icon name="calendar-outline" size={20} color="#6A1B9A" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.eventTitle}>{evento.title}</Text>
              <Text style={styles.eventDate}>
                {new Date(evento.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>.............................................</Text>
        <View style={styles.calendarContainer}>
          <MyCalendar
            date={selectedDate}
            setDate={setSelectedDate}
            icon={<Icon name="calendar-month" size={30} color="#6A1B9A" />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({ icon, label, value, onPress }: { icon: string; label: string; value: number; onPress?: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.statCard}>
      <Icon name={icon} size={28} color="#6A1B9A" />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flex: 1, backgroundColor: '#F4F4F4' },
  sidebar: { width: 240, backgroundColor: '#6A1B9A', padding: 20 },
  sidebarTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
  sidebarButton: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  sidebarItem: { color: '#FFF', fontSize: 16 },
  main: { flex: 1, padding: 20 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 6 },
  backText: { fontSize: 16, color: '#6A1B9A', fontWeight: '600' },
  pageTitle: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  pageSubtitle: { fontSize: 15, color: '#777', marginBottom: 20 },
  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 24 },
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
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  menuButton: { position: 'absolute', top: 40, left: 20, zIndex: 10 },
  drawerContainer: { flex: 1, flexDirection: 'row' },
  drawer: { width: 240, backgroundColor: '#6A1B9A', padding: 20 },
  drawerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
});