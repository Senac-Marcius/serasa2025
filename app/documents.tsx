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
  
    //se for um item editado, ele deve chamar o registro existente
    if (req.id == -1) {
      const newid = documents.length? documents[documents.length - 1].id + 1 : 0;
      const newDoc = {...req, id: newid}

      setDocuments([...documents, newDoc]);
      await insertDocument(newDoc)
    } else{ //senão, ele deve criar um novo registro
      //aqui vc vai chamada sua função de editar do controlador
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


  // Função para excluir um registro
  const deleteRecord = (id: number) => {
      //aqui voce vai chamda sua função de deletar do controlador

      setDocuments(documents.filter((d) => d.id != id));
  };

  const editRecord = (id: number) => {
      const doc = documents.find( (d) => d.id == id);
      if (doc){//vai colocar as informações salvas no vetor de volta no  para editar
          setReq(doc)
      }
  };
  
  
  return (
      
    <MyView router={router}>
      
      <View>
        <Mytext >Solicitação de Documentos</Mytext>
        
        <Myinput
            iconName="person" 
            label='Nome'
            value={req.name} 
            onChangeText={(text) => {setReq({...req, name: text})}}
        />

        <Myinput 
            iconName="link" 
            label='Url'
            value={req.url} 
            onChangeText={(text) => {setReq({...req, url: text})}}
        />

        <Myinput 
            iconName="description" 
            label='Tipo do Documento'
            value={req.type} 
            onChangeText={(text) => {setReq({...req, type: text})}}
        />
        
        <MyButton title={req.id != -1 ? "Atualizar":"Cadastrar"} color={'#813AB1'} onPress={handleRegister} button_type="rect" />
      </View>
      
            

      <View>
        <Mytext >Registros Cadastrados</Mytext>
        <MyList
          data={documents}
          keyItem={(item) => item.id.toString()}//tratamento
          renderItem={({ item }) => (
            <MyItem
              onDel={()=> deleteRecord(item.id)}
              onEdit={()=> editRecord(item.id)}
            >                                 


              <Mytext>Nome: {item.name}</Mytext>
              <Mytext >Url: {item.url}</Mytext>
              <Mytext >Tipo Documento: {item.type}</Mytext>     

            </MyItem>
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