import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import MyButton from './MyButtons';

interface UploadProps {
  url: string;
  setUrl: (url: string) => void;
  setName: (name: string) => void;
}

const MyUploadTeste: React.FC<UploadProps> = ({ url, setUrl, setName }) => {
  const [alert, setAlert] = useState('');

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });

      if (result.canceled) {
        setAlert('Envio cancelado pelo usuário.');
        return;
      }

      const file = result.assets[0];
      setUrl(file.uri);         // Em produção, essa URL deve vir do Supabase Storage após upload real
      setName(file.name);
      setAlert(`Arquivo selecionado: ${file.name}`);
    } catch (error) {
      console.error('Erro ao selecionar o arquivo:', error);
      setAlert('Erro ao selecionar o arquivo.');
    }
  };

  // 👉 Função de simulação de upload
  const simulateUpload = () => {
    const fakeUrl = 'https://example.com/fake-document.pdf';
    const fakeName = 'fake-document.pdf';
    setUrl(fakeUrl);
    setName(fakeName);
    setAlert(`Simulação concluída: ${fakeName}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.alert}>{alert}</Text>

      <MyButton
        title="Selecionar Arquivo"
        onPress={handleFilePick}
        button_type="rect"
        color="#813AB1"
      />

      <MyButton
        title="Simular Upload"
        onPress={simulateUpload}
        button_type="round"
        color="#aaa"
        style={styles.button_round}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 10,
  },
  alert: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  button_round: {
    marginTop: 10,
  },
});

export default MyUploadTeste;
