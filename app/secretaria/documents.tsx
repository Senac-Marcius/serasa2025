import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {insertDocument, iDoc, updateDocument, deleteDocument, getListDocuments} from '../../src/controllers/documents'
import MyView from '../../src/components/MyView';
import MyDocument from '../../src/components/MyDocument';
//import MyUpload from '../src/components/MyUpload';


export default function DocumentsScreen() {

  // Estados individuais para os s
   const [req,setReq] = useState({
      name: '',
      url: '',
      type: '',
      user_id: 1,
      id: -1,
      created_at: new Date().toISOString(),
  
  });

  //documents, setdocuments
  const [documents, setDocuments] = useState<iDoc[]>([]);

  // Função para adicionar um novo registro
  async function handleRegister() {
  
    //se for um item editado, ele deve chamar o registro existente
    if (req.id == -1) {
      const newid = documents.length? documents[documents.length - 1].id + 1 : 0;
      const newDoc = {...req, id: newid}

      setDocuments([...documents, newDoc]);
      await insertDocument(newDoc)

    } else{ //senão, ele deve criar um novo registro
      await updateDocument(req)//aqui vc vai chamada sua função de editar do controlador
      setDocuments(documents.map((d) => (d.id == req.id)? req: d));

    }  

    // Resetando os campos após editar, cadastrar, etc..
    setReq({
      name: '',
      url: '',
      type: '',
      user_id: 1,
      id: -1,
      created_at: new Date().toISOString(),
    })
  };
  
  
  
  return (
      
    <MyView>

      <MyDocument type='Documentos' user_id={5}></MyDocument>
      
    </MyView>
  );
}


