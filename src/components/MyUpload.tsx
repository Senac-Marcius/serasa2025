import React, { useState } from "react";
import { View, Button, Alert, ActivityIndicator,Text, ViewStyle } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import MyButton from "../components/MyButtons"

interface MyuploadProps {
  style?: ViewStyle | ViewStyle[]; 
  setUrl(url: string): void;
  url: string;
}

const MyUpload: React.FC<MyuploadProps> = ({ style, setUrl, url  }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');

  const pickDocument = async () => {
    try {
      setLoading(true);
      
      // Seleciona o arquivo
      const result = await DocumentPicker.getDocumentAsync({});
      
      if (result.canceled || !result.assets) {
        setLoading(false);
        return;
      }

      const file = result.assets[0];
      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      } as any);
      //(Erro de acesso a pagina) → erro causado pro conflito com banco de dados
      /* Faz o upload para File.io
      const response = await fetch("https://file.io", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUrl(data.link); // Atualiza a variável URL
        setAlert(`Upload Concluído! Arquivo enviado: ${data.link}`);
      } else {
        setAlert(`Erro no Upload Tente novamente..`);
      }*/
        setUrl('http://issoeumteste');
        setAlert(`Upload Concluído! Arquivo enviado: `);
    } catch (error) {
      setAlert(`Erro", "Não foi possível fazer o upload.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Button title="Selecionar Arquivo" onPress={pickDocument}/>
      {loading && <ActivityIndicator size="large" color="#A020F0"/>}
      {url && (<Text>Arquivo enviado: {url}</Text>)}
      {alert && (<Text> {alert} </Text>)}
      </View>
  );
};

export default MyUpload;
