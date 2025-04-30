import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import {insertDocument, iDoc, updateDocument, deleteDocument, getListDocuments} from '../../src/controllers/documents'
import { supabase } from '../../src/utils/supabase';
import MyButton from '../../src/components/MyButtons';
import MyView from '../../src/components/MyView';
import  Mytext  from '../../src/components/MyText';
import { StyleSheet } from 'react-native';
import MyList from '../../src/components/MyList';
import { MyItem } from '../../src/components/MyItem';
import MySelect from '../../src/components/MySelect';
//import MyUpload from '../src/components/MyUpload';


export default function documentRegister( ){

    // Estados individuais para os s
       const [req,setReq] = useState({
          name: '',
          url: '',
          type: '',
          user_id: 1,
          id: -1,
          created_at: new Date().toISOString(),
      
      });

    const [documents, setDocuments] = useState<iDoc[]>([]);
    const [allDocuments, setAllDocuments] = useState<iDoc[]>([]);//const q mostra todos os tipos independente do que estiver selecionado

    const [selectedLabel, setSelectedLabel] = useState('Todos os Documentos');
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);//formata os tipos mostrados no myselect para o padrõa Camelcase
    const uniqueTypes = [...new Set(allDocuments.map((doc) => doc.type).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));//vai puxar as rotas e passar elas como typos dos documentos cadastrados em cada página e organizar em ordem alfabética
    


    // Função para excluir um registro
    async function deleteRecord (id: number){
        const del = await deleteDocument(id)//aqui voce vai chamda sua função de deletar do controlador

        if(del){
        setDocuments(documents.filter((d) => d.id != id));
        }      
    };

    const editRecord = (id: number) => {
        const doc = documents.find( (d) => d.id == id);
        if (doc){//vai colocar as informações salvas no vetor de volta no  para editar
            setReq(doc)
        }
    };

    //buscar documentos no banco e atualizar de acordo com a ação
    useEffect(() =>{
        async function getAll() {
          const{ data:all, error } = await supabase.from('documents').select();
          if(all){
            setDocuments(all);
            setAllDocuments(all);//vai mostrar no myselect todos os types independente do que estiver selecionado
          }
          if (error){
            console.error('Erro ao buscar documentos: ', error.message);
          }   
        }   
    
        getAll()
    
    },[]);


    async function fetchDocumentsByType(type: string) {
        if (type === 'Todos' || type === 'Todos os Documentos') {
          const { data: all, error } = await supabase.from('documents').select();
          if (all) setDocuments(all);
          if (error) console.error('Erro ao buscar todos os documentos:', error.message);
        } else {
          const filteredDocs = await getListDocuments({ type: type.toLowerCase() }); // Certifique-se que o valor é compatível com o banco
          setDocuments(filteredDocs);
        }
    }
      





    return(
        <MyView>
            <Mytext style={styles.titulo}>Registros Cadastrados</Mytext>
            
            <MySelect
                label={selectedLabel}
                setLabel={(item) => {
                    setSelectedLabel(item);
                    fetchDocumentsByType(item);
                }}
                list={[
                  { key: 'todos', option: 'Todos os Documentos' },
                  ...uniqueTypes.map((type) => ({
                    key: type.toLowerCase(),
                    option: capitalize(type),
                  })),
                ]} 
            />


            <MyList
              data={documents}
              keyItem={(item) => item.id.toString()}//tratamento
              renderItem={({ item }) => (
                <MyItem onDel={()=> deleteRecord(item.id)} onEdit={()=> editRecord(item.id)} >                                 
    
    
                  <Mytext style={styles.textoCorpo}>Nome: {item.name}</Mytext>
                  <Mytext style={styles.textoCorpo}>Url: {item.url}</Mytext>
                  <Mytext style={styles.textoCorpo}>Tipo Documento: {item.type}</Mytext>  

    
                </MyItem>
              )}
            />
          </MyView>
    )

}

const styles = StyleSheet.create({
  viewStyle: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  viewCabeçalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // distribui título e botão nos extremos
  },
  botaoListar: {
    marginLeft: 'auto', // empurra o botão para a direita
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#813AB1',
    padding: 20,
  },
  textoCorpo: {
    fontSize: 18,
    //fontWeight: 'bold',
    padding: 20,
  },

});


