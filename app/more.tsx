import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';
import { Icon } from 'react-native-paper';

export default function MoreScreen() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<'menu' | 'elogio' | 'reclamacao' | 'config' | 'admin'>('menu');
  const [elogio, setElogio] = useState('');
  const [reclamacao, setReclamacao] = useState('');
  const [feedbacks, setFeedbacks] = useState<{ tipo: string; mensagem: string }[]>([]);

  function enviarElogio() {
    if (!elogio.trim()) {
      Alert.alert('Atenção', 'Por favor, escreva seu elogio.');
      return;
    }
    setFeedbacks(prev => [...prev, { tipo: 'Elogio', mensagem: elogio }]);
    Alert.alert('Elogio Enviado', 'Obrigado pelo seu elogio!');
    setElogio('');
    setActiveSection('menu');
  }

  function enviarReclamacao() {
    if (!reclamacao.trim()) {
      Alert.alert('Atenção', 'Por favor, descreva sua reclamação.');
      return;
    }
    setFeedbacks(prev => [...prev, { tipo: 'Reclamação', mensagem: reclamacao }]);
    Alert.alert('Reclamação Enviada', 'Obrigado pelo seu feedback!');
    setReclamacao('');
    setActiveSection('menu');
  }

  const Card = ({ children, color = '#fff' }: { children: React.ReactNode; color?: string }) => (
    <View style={[styles.cardWrapper, { backgroundColor: color }]}>{children}</View>
  );

  return (
    <MyView router={router}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>✨ Mais Opções ✨</Text>
        <Text style={styles.subtitle}>Central de Suporte e Personalização</Text>
        <Text style={styles.description}>
          Aqui você pode enviar elogios, sugestões, relatar problemas e configurar sua conta.
          Nossa equipe está sempre pronta para ouvir você! 💬
        </Text>

        {activeSection === 'menu' && (
          <>
            <Card color="#fef7ff">
              <TouchableOpacity style={styles.option} onPress={() => setActiveSection('elogio')}>
                <Icon source="emoticon-happy-outline" size={26} color="purple" />
                <View style={styles.optionTextWrapper}>
                  <Text style={styles.optionTitle}>Enviar Elogio</Text>
                  <Text style={styles.optionDescription}>Tem algo bom para dizer? Envie aqui.</Text>
                </View>
              </TouchableOpacity>
            </Card>

            <Card color="#fff6f6">
              <TouchableOpacity style={styles.option} onPress={() => setActiveSection('reclamacao')}>
                <Icon source="emoticon-sad-outline" size={26} color="crimson" />
                <View style={styles.optionTextWrapper}>
                  <Text style={styles.optionTitle}>Enviar Reclamação</Text>
                  <Text style={styles.optionDescription}>Teve algum problema? Conte para nós.</Text>
                </View>
              </TouchableOpacity>
            </Card>

            <Card color="#f5faff">
              <TouchableOpacity style={styles.option} onPress={() => setActiveSection('config')}>
                <Icon source="cog-outline" size={26} color="#555" />
                <View style={styles.optionTextWrapper}>
                  <Text style={styles.optionTitle}>Configurações</Text>
                  <Text style={styles.optionDescription}>Personalize sua experiência.</Text>
                </View>
              </TouchableOpacity>
            </Card>

            <Card color="#f3f9f2">
              <TouchableOpacity style={styles.option} onPress={() => setActiveSection('admin')}>
                <Icon source="shield-account" size={26} color="green" />
                <View style={styles.optionTextWrapper}>
                  <Text style={styles.optionTitle}>Ver Feedbacks</Text>
                  <Text style={styles.optionDescription}>Acesso exclusivo para administradores.</Text>
                </View>
              </TouchableOpacity>
            </Card>

            <View style={styles.sectionInfo}>
              <Text style={styles.infoTitle}>📌 Dicas:</Text>
              <Text style={styles.infoItem}>• Elogios fortalecem o nosso time!</Text>
              <Text style={styles.infoItem}>• Reclamações detalhadas ajudam a melhorar.</Text>
              <Text style={styles.infoItem}>• Suas configurações te acompanham em qualquer dispositivo.</Text>
            </View>
          </>
        )}

        {activeSection === 'elogio' && (
          <View style={styles.feedbackSection}>
            <Text style={styles.sectionTitle}>💜 Enviar Elogio</Text>
            <TextInput
              multiline
              value={elogio}
              onChangeText={setElogio}
              placeholder="Digite seu elogio aqui..."
              style={styles.textArea}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setActiveSection('menu')}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendButton} onPress={enviarElogio}>
                <Text style={styles.sendText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeSection === 'reclamacao' && (
          <View style={styles.feedbackSection}>
            <Text style={styles.sectionTitle}>📝 Enviar Reclamação</Text>
            <TextInput
              multiline
              value={reclamacao}
              onChangeText={setReclamacao}
              placeholder="Descreva sua reclamação aqui..."
              style={styles.textArea}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setActiveSection('menu')}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendButton} onPress={enviarReclamacao}>
                <Text style={styles.sendText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeSection === 'config' && (
          <View style={styles.feedbackSection}>
            <Text style={styles.sectionTitle}>⚙️ Configurações</Text>
            <Text style={{ color: '#777', marginBottom: 16 }}>
              Em breve você poderá ajustar notificações, preferências, aparência e muito mais.
            </Text>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setActiveSection('menu')}>
              <Text style={styles.cancelText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeSection === 'admin' && (
          <View style={styles.feedbackSection}>
            <Text style={styles.sectionTitle}>🔐 Feedbacks Recebidos</Text>
            {feedbacks.length === 0 ? (
              <Text style={styles.infoItem}>Nenhum feedback recebido ainda.</Text>
            ) : (
              feedbacks.map((fb, index) => (
                <View key={index} style={{ marginBottom: 12 }}>
                  <Text style={{ fontWeight: '700', color: fb.tipo === 'Elogio' ? 'green' : 'red' }}>{fb.tipo}</Text>
                  <Text style={styles.infoItem}>{fb.mensagem}</Text>
                </View>
              ))
            )}
            <TouchableOpacity style={styles.cancelButton} onPress={() => setActiveSection('menu')}>
              <Text style={styles.cancelText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fc',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 6,
  },
  description: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  cardWrapper: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
  },
  optionTextWrapper: {
    marginLeft: 12,
    flex: 1,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
  },
  optionDescription: {
    fontSize: 13,
    color: '#666',
  },
  feedbackSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: 'purple',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelText: {
    color: '#333',
    fontWeight: '500',
  },
  sendButton: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  sendText: {
    color: 'white',
    fontWeight: '600',
  },
  sectionInfo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
  },
  infoTitle: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#555',
  },
  infoItem: {
    fontSize: 13,
    color: '#444',
    marginBottom: 4,
  },
});
