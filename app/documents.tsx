import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import {insertDocument, iDoc} from '../src/controllers/documents'
import { supabase } from '../src/utils/supabase';
import MyButton from '../src/components/MyButtons';
import MyView from '../src/components/MyView';
import  Mytext  from '../src/components/MyText';
import { Myinput } from '../src/components/MyInputs';
import MyList from '../src/components/MyList';
import { MyItem } from '../src/components/MyItem';
//import MyUpload from '../src/components/MyUpload';


export default function RecordScreen() {

  // Estados individuais para os s
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('');
  const [user_id, setUserId] = useState(''); //fk    
  const[editingID, setEditingId] = useState<number | -1>(-1);
  //documents, setdocuments
  const [document, setDocuments] = useState<iDoc[]>([]);
  const router = useRouter();

  //buscar documentos no banco e atualizar de acordo com a ação
  useEffect(() =>{
    async function getAll() {
      const{ data:all, error } = await supabase.from('documents').select()
      if(all){
        setDocuments(all)
      }
      if (error){
        console.error('Erro ao buscar documentos: ', error.message);
      }   
    }
  getAll()
  },[]);


  // Função para adicionar um novo registro
  async function handleRegister() {
    if (!name.trim() || !url.trim() || !type.trim()) {
        alert('Preencha todos os campos!');
        return;
    }

    //se for um item editado, ele deve chamar o registro existente
    if (editingID !== -1) {
      setDocuments(document.map(doc =>
            doc.id === editingID ? {...doc, name, url, type} : doc
        ));
        setEditingId(-1);//reset
    } else{ //senão, ele deve criar um novo registro
        const newDoc:iDoc = {
            id: document.length ? document[document.length - 1].id + 1 : 1,
            name,
            url,
            user_id,
            type,
            created_at: new Date().toString(),
        };

        const result = await insertDocument(newDoc);//add no supabase

        if (typeof result === 'string') {//garante q o valor é uma string antes de inseriri no bd
          console.log('Erro ao inserir documento', result);          
        }else{
          setDocuments([...document,newDoc])
          console.log('Documento inserido com sucesso: ', result);
        }
      
    }  

    // Resetando os campos após editar, cadastrar, etc..
    setName('');
    setUrl('');
    setType('');
  };


  // Função para excluir um registro
  const deleteRecord = (id: number) => {
      setDocuments(document.filter((doc) => doc.id !== id));
  };

  const editRecord = (id: number) => {
      const doc = (document.find((doc => doc.id === id)));
      if (doc){//vai colocar as informações salvas no vetor de volta no  para editar
          setName(doc.name);
          setUrl(doc.url);
          setType(doc.type);
          setEditingId(id);// qual id eu quero editar
      }
  };
  
  
return (
    
  <MyView router={router}>
    
    <View>
      <Mytext >Solicitação de Documentos</Mytext>
      
      <Myinput
          iconName="person" 
          label='Nome'
          value={name} 
          onChangeText={setName}
      />

      <Myinput 
          iconName="link" 
          label='Url'
          value={url} 
          onChangeText={setUrl}
      />

      <Myinput 
          iconName="description" 
          label='Tipo do Documento'
          value={type} 
          onChangeText={setType}
      />
      
      <MyButton title={editingID !== -1 ? "Atualizar":"Cadastrar"} color={'#813AB1'} onPress={handleRegister} button_type="rect" />
    </View>
    
          

    <View>
      <Mytext >Registros Cadastrados</Mytext>
      <MyList
        data={document}
        keyItem={(item) => item.id.toString()}//tratamento
        renderItem={({ item }) => (
          <View >                                 
               
              <View>
                <MyButton title='EDITAR' onPress={()=> editRecord(item.id)}/>
                <MyButton title='DELETAR' onPress={()=> deleteRecord(item.id)}/>
              </View>
              
            <Mytext>Nome: {item.name}</Mytext>
            <Mytext >Url: {item.url}</Mytext>
            <Mytext >Tipo Documento: {item.type}</Mytext>     

          </View>
        )}
      />
    </View>
    
  </MyView>
);
}




/*import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import {insertDocument, iDoc} from '../src/controllers/documents'
import { supabase } from '../src/utils/supabase';
import MyButton from '../src/components/MyButtons';
import MyView from '../src/components/MyView';
import MyUpload from '../src/components/MyUpload';

const FileUploadComponent = () => {

const [req, setReq] = useState({
id: -1,
created_at : new Date(). toISOString(),
user_id: 8,
url: '',
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


//console.log('Fazendo Upload...');

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

setReq({
  id: -1,
  created_at : new Date(). toISOString(),
  user_id: 8,
  url: '',
})

}


const handleCancel = () => {

console.log('Upload cancelado');
};

const[urlDocument, setDocument]= useState('')


return (
<MyView router={router}>

  <MyButton title='Escolher Arquivo' onPress={() => alert('Escolhido um arquivo')}></MyButton>

  <View >
    <MyButton title='Cancelar' onPress={handleCancel}></MyButton>

    <MyUpload setUrl={setDocument} url={urlDocument}/>
    </View>
  
</MyView>

);
};

export default FileUploadComponent;*/

// botao de cadastrar par achamar a handleCancel
//ter uma view que mostre os docs cadastrados
//inserir chaves estrangeiras para todos que precisam upar documentos
//pega a url da nuvem e c