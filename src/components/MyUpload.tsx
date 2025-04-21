import React, { useState } from "react";

import { View, Button, Alert, ActivityIndicator,Text, ViewStyle, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import MyButton from "../components/MyButtons";
import { link } from "fs";

interface MyuploadProps {
  style?: ViewStyle | ViewStyle[]; 
  setUrl(url: string): void;
  setName?(name: string): void;//para atualizar de acordo com o nome do arquivo
  url: string;
}

const MyUpload: React.FC<MyuploadProps> = ({ style, setUrl, setName, url  }) => {
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
       //Faz o upload para File.io
      const response = await fetch("https://file.io", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUrl(data.link); // Atualiza a variável URL
        setName? setName(file.name): ''; //atualiza o nome com o nome do arquivo escolhido
        setAlert(`Upload Concluído! Arquivo enviado: ${data.link}`);
      } else {
        setAlert(`Erro no Upload Tente novamente..`);
      }
        setAlert(`Upload Concluído! Arquivo enviado: `);
    } catch (error) {
      setAlert(`Erro", "Não foi possível fazer o upload.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <MyButton title="Upload" onPress={pickDocument} button_type="round" style={styles.button_round} />
      {loading && <ActivityIndicator size="large" color="#A020F0"/>}
      {url && (<Text>Arquivo enviado: {url}</Text>)}
      {alert && (<Text> {alert} </Text>)}
    </View>
  );
};

const styles = StyleSheet.create ({
    button_round: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
}

})

export default MyUpload;
//versão atualiizada
