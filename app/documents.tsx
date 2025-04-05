import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import {insertDocument, iDoc} from '../src/controllers/documents'
import { supabase } from '../src/utils/supabase';
import MyButton from '../src/components/MyButtons';
import MyView from '../src/components/MyView';

const FileUploadComponent = () => {

   const [req, setReq] = useState({
    id: -1,
    created_at : new Date(). toISOString(),
    user_id: 0,
  });

  //documents, setdocuments
  const [documents, setDocuments] = useState<iDoc[]>([]);
  const router = useRouter();

  //buscar documentos no banco e atualizar de acordo com a ação
  useEffect(() =>{
    async function getAll() {
      const{ data:all, error } = await supabase.from('documents').select()
      if(all && all.length > 1){
        setDocuments(all)
      }
      if (error){
        console.error('Erro ao buscar documentos: ', error.message);
      }   
  }
  getAll()
},[]);

  async function handleUpload() {
    console.log('Fazendo Upload...');
    
    if(req.id === -1){
      const newId = documents.length ? documents[documents.length-1].id + 1 : 0;
      const newDocument = {...req, id:newId};

      //add no supabase
      const result = await insertDocument(newDocument);

      if (result){
        setDocuments([...documents,newDocument])
        console.log('Documento inserido com sucesso: ', result);
      }else{
        console.log('Erro ao inserir documento');
      }
      
    }else{
      const novoDocumento = (documents.map(i =>(i.id === req.id)? req: i));
      setDocuments(novoDocumento);
    }   
    
  }
   

  const handleCancel = () => {
    
    console.log('Upload cancelado');
  };



  return (
    <MyView router={router}>

      <MyButton title='Escolher Arquivo' onPress={() => alert('Escolhido um arquivo')}></MyButton>

      <View >
        <MyButton title='Cancelar' onPress={handleCancel}></MyButton>

        <MyButton title='Upload' onPress={handleUpload}></MyButton>

      </View>

    </MyView>
  );
};



export default FileUploadComponent;
