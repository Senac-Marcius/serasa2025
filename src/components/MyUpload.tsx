import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { supabase } from "../../src/utils/supabase"; // Certifique-se de que o caminho está correto

interface MyUploadProps {
  setUrl: (url: string) => void;
  setName: (name: string) => void;
}

const MyUpload: React.FC<MyUploadProps> = ({ setUrl, setName }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");

  const uploadFile = async () => {
    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.canceled) {
        setLoading(false);
        return;
      }

      const file = result.assets[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const fileUri = file.uri;

      // Verifique se o mimeType é definido e, se necessário, defina um valor padrão
      const fileMimeType = file.mimeType ?? "application/octet-stream"; // valor padrão caso mimeType seja undefined

      // Fetch o arquivo da URI para obter um Blob
      const response = await fetch(fileUri);
      const fileBlob = await response.blob(); // Converte o arquivo URI para um Blob

      // Fazendo upload para o Supabase
      const { data, error } = await supabase.storage
        .from("myuploads")
        .upload(fileName, fileBlob, {
          contentType: fileMimeType,
        });

      if (error) {
        setAlert(`Erro no upload: ${error.message}`);
        setLoading(false);
        return;
      }

      // Verificar a resposta para obter a URL pública
      const { data: urlData } = supabase
        .storage
        .from("myuploads")
        .getPublicUrl(fileName);

      // Verificar se a URL foi retornada corretamente
      if (urlData && urlData.publicUrl) {
        setAlert(`Upload concluído! URL: ${urlData.publicUrl}`);
        setUrl(urlData.publicUrl); // <-- envia a URL para o componente pai
        setName(file.name);        // <-- envia o nome do arquivo original para o pai
      } else {
        setAlert("Erro ao obter a URL.");
      }
    } catch (error) {
      setAlert("Erro ao fazer o upload.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={uploadFile} disabled={loading} style={styles.button}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.text} >Upload File</Text>
        )}
      </TouchableOpacity>
      {alert && <Text>{alert}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#813AB1",
    padding: 10,
    borderRadius: 15,
  },
  text :{color: "white"}
});

export default MyUpload;
