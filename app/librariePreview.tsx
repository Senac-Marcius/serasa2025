import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet, TextInput, ScrollView, ViewStyle, FlatList, } from 'react-native';
import MyText from '../src/components/MyText';
import MyList from '../src/components/MyList';
import MyItem from '../src/components/MyItem';
import MyButton from '../src/components/MyButtons';
import {iItem, setItem} from '../src/controllers/librarie';

export default function PreviewScreen() {

    const [req, setReq] = useState({
        id: -1,
        created_at: new Date().toISOString(),
        typology: '',
        title: '',
        subtitle: '',
        responsible: '',
        translation: '',
        language: '',
        image: '',
        year: 0,
        edition: '',
        publisher: '',
        location: '',
        number_pages: 0,
        serie: '',
        volume: 0,
        format: '',
        isbn: '',
        issn: '',
        cdd: '',
        call_number: '',
        subject: '',
        keywords: '',
        summary: '',
        notes: '',
        number_copies: 0,
        status: '',
        url: '',
        file: '',
        type_loan: '',
    });
    
    const[items, setItems] = useState<iItem[]>([]);

    function editItem(id: number) {
        let item = items.find(i => i.id == id)
        if (item)
            setReq(item)
    };

    function deleteItem(id: number) {
        const list = items.filter(i => i.id != id)
        if (list)
            setItems(list)
    };
  
        const router = useRouter();

    return (
        <View >
            <MyList
                data={items}
                keyItem={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MyItem
                        onDel={()=>{deleteItem(item.id)}}
                        onEdit={()=>{editItem(item.id)}}
                    >
                        <View style={styles.card}>
                            <image />
                            <MyText style={styles.cardText}>Tipologia: {item.typology}</MyText>
                            <MyText style={styles.cardText}>Título: {item.title}</MyText>
                            <MyText style={styles.cardText}>Subtítulo: {item.subtitle}</MyText>
                            <MyText style={styles.cardText}>Responsáveis: {item.responsible}</MyText>
                            <MyText style={styles.cardText}>Tradução: {item.translation}</MyText>
                            <MyText style={styles.cardText}>Idioma: {item.language}</MyText>
                            <MyText style={styles.cardText}>Ano: {item.year}</MyText>
                            <MyText style={styles.cardText}>Edição: {item.edition}</MyText>
                            <MyText style={styles.cardText}>Editora: {item.publisher}</MyText>
                            <MyText style={styles.cardText}>Local: {item.location}</MyText>
                            <MyText style={styles.cardText}>Número de Páginas: {item.number_pages}</MyText>
                            <MyText style={styles.cardText}>Série: {item.serie}</MyText>
                            <MyText style={styles.cardText}>Volume: {item.volume}</MyText>
                            <MyText style={styles.cardText}>Formato: {item.format}</MyText>
                            <MyText style={styles.cardText}>ISBN: {item.isbn}</MyText>
                            <MyText style={styles.cardText}>ISSN: {item.issn}</MyText>
                            <MyText style={styles.cardText}>CDD: {item.cdd}</MyText>
                            <MyText style={styles.cardText}>Número de Chamada: {item.call_number}</MyText>
                            <MyText style={styles.cardText}>Assunto: {item.subject}</MyText>
                            <MyText style={styles.cardText}>Palavras-chave: {item.keywords}</MyText>
                            <MyText style={styles.cardText}>Resumo: {item.summary}</MyText>
                            <MyText style={styles.cardText}>Notas: {item.notes}</MyText>
                            <MyText style={styles.cardText}>Número de Exemplares: {item.number_copies}</MyText>
                            <MyText style={styles.cardText}>Status: {item.status}</MyText>
                            <MyText style={styles.cardText}>URL: {item.url}</MyText>
                            <MyText style={styles.cardText}>Arquivo: {item.file}</MyText>
                            <MyText style={styles.cardText}>Tipo de Empréstimo: {item.type_loan}</MyText>
                        </View>
                    </MyItem>   
                )}      
            />
            <MyButton 
                title="VOLTAR"
                onPress={() => router.back()}
                button_type="capsule"
                icon=""
            /> 
        </View>   
            
    );
    
    const styles = StyleSheet.create({

        card: {
            backgroundColor: '#F2F2F2',
            padding: 20,
            marginVertical: 10,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 5,
        },
        cardText: {
            fontSize: 15,
        },
        buttonBack: {
            backgroundColor: '#2A17A6',
            padding: 20,
        },
        image: {
            width: '100%', // Ajusta a largura para 100% do contêiner
            height: 300, // Ajusta a altura conforme necessário
            resizeMode: 'contain', // Ajusta a imagem para caber no espaço
            marginBottom: 20, // Adiciona um espaço entre a imagem e o formulário
        },

    });




}