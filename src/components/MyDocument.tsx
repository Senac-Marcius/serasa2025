import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import MyButton from './MyButtons';
import { insertDocument, updateDocument, iDoc } from '../../src/controllers/documents';
import MyUpload from './MyUpload';

interface MyDocumentProps {
  type: string;
  user_id: number;
  req: iDoc;
  setReq: React.Dispatch<React.SetStateAction<iDoc>>;
  documents: iDoc[];
  setDocuments: React.Dispatch<React.SetStateAction<iDoc[]>>;
  handleRegister: () => void;
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

    console.log("URL no handleRegister:", req.url); // Verifique se a URL está correta

    if (req.url === '') {
      alert("Por favor, faça o upload de um documento.");
      return;
    }    

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
      
      <MyUpload 
        setUrl={(url) => setReq({ ...req, url })} 
        setName={(name) => setReq({ ...req, name })}
        style={styles.button}
      />

      <MyButton
        title={"Salvar Documento"}
        onPress={handleRegister}
        color="#813AB1"
        button_type="rect"
        style={styles.button}
      />

      <MyButton
        title="Visualizar Todos os Documentos"
        onPress={() => router.push('/secretaria/documentsFilter')}
        color="#aaa"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 15,
  },
  button: {
    backgroundColor: "#813AB1",
    padding: 10,
    borderRadius: 15,
    width: '80%', // Limita a largura a 80% da tela, pode ajustar
    maxWidth: 250, // Largura máxima para garantir que não fique grande demais
    alignSelf: 'center', // Centraliza o botão
    marginVertical: 10,
  },
});

export default MyDocument;
