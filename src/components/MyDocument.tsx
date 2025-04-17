import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Myinput } from './MyInputs';
import MyButton from './MyButtons';
import { insertDocument, updateDocument, iDoc } from '../../src/controllers/documents';

interface MyDocumentProps {
  type: string;
  user_id: number;
}

const MyDocument: React.FC<MyDocumentProps> = ({ type, user_id }) => {
  const router = useRouter();

  const [req, setReq] = useState<iDoc>({
    name: '',
    url: '',
    type,
    user_id,
    id: -1,
    created_at: new Date().toISOString(),
  });

  const [documents, setDocuments] = useState<iDoc[]>([]);

  async function handleRegister() {
    if (req.id === -1) {
      const newid = documents.length ? documents[documents.length - 1].id + 1 : 0;
      const newDoc = { ...req, id: newid };

      setDocuments([...documents, newDoc]);
      await insertDocument(newDoc);
    } else {
      await updateDocument(req);
      setDocuments(documents.map((d) => (d.id === req.id ? req : d)));
    }

    setReq({
      name: '',
      url: '',
      type,
      user_id,
      id: -1,
      created_at: new Date().toISOString(),
    });
  }

  return (
    <View style={styles.container}>
      <Myinput
        iconName="document"
        label="Nome do Documento"
        value={req.name}
        onChangeText={(text) => setReq({ ...req, name: text })}
      />

      <MyButton
        title="Simular Upload de Arquivo"
        onPress={() => setReq({ ...req, url: 'https://meuarquivo.com/arquivo.pdf' })}
        color="#555"
        button_type="rect"
      />

      <MyButton
        title={req.id !== -1 ? "Atualizar Documento" : "Salvar Documento"}
        onPress={handleRegister}
        color="#813AB1"
        button_type="rect"
      />

      <MyButton
        title="Visualizar Todos os Documentos"
        onPress={() => router.push('/secretaria/documentsFilter')}

        color="#aaa"
        //button_type="ghost"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 15,
  },
});

export default MyDocument;
