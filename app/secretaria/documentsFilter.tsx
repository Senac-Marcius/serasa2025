import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {iDoc, deleteDocument, getListDocuments} from '../../src/controllers/documents'
import { supabase } from '../../src/utils/supabase';
import MyView from '../../src/components/MyView';
import  Mytext  from '../../src/components/MyText';
import { StyleSheet } from 'react-native';
import { MyItem } from '../../src/components/MyItem';
import MySelect from '../../src/components/MySelect';


export default function documentRegister( ){

      

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


            <View style={styles.listWrapper}>
              <View style={styles.cardGrid}>
                {documents.map((item) => (
                  <MyItem key={item.id} onDel={() => deleteRecord(item.id)}>
                    <View style={styles.itemContent}>
                      <Mytext style={styles.textoCorpo}>Nome:</Mytext> <Mytext style={styles.textoCorpoFilho}> {item.name}</Mytext>
                      <Mytext style={styles.textoCorpo}>Url:</Mytext> <Mytext style={styles.textoCorpoFilho}> {item.url}</Mytext>
                      <Mytext style={styles.textoCorpo}>Tipo Documento:</Mytext> <Mytext style={styles.textoCorpoFilho}>{item.type}</Mytext>
                    </View>
                  </MyItem>
                ))}
              </View>
            </View>


            {/*<MyList
              data={documents}
              keyItem={(item) => item.id.toString()}//tratamento
              renderItem={({ item }) => (
                <MyItem onDel={()=> deleteRecord(item.id)} onEdit={()=> editRecord(item.id)} >                                 
    
    
                  <Mytext style={styles.textoCorpo}>Nome: {item.name}</Mytext>
                  <Mytext style={styles.textoCorpo}>Url: {item.url}</Mytext>
                  <Mytext style={styles.textoCorpo}>Tipo Documento: {item.type}</Mytext>  

    
                </MyItem>
              )}
            />*/}

            
        
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
    fontWeight: 'bold',
    padding: 20,
  },
  textoCorpoFilho: {
    fontSize: 18,
    padding: 20,
  },

  listWrapper: {
    flex: 1,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 10,
    marginLeft: 6,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 6,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: 280,
    marginBottom: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  cardInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  itemContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

});


