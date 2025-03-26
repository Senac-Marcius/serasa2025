import React, { useState } from 'react'; //função useState só retorna para uma variavel const
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
//import { text } from 'stream/consumers';
import { useRouter } from 'expo-router';

export default function ItemScreen(){ // aqui é TS
    const router = useRouter();
 
    const [req, setReq] = useState({
        id: 0,
        createAt: new Date().toISOString(),
        title: '', 
        subtitle: '', 
        responsible: '', 
        translation: '',
        year: '',
        edition: '',
        publisher: '', 
        location: '',
        numberPages: '',
        dimensions: '', 
        serie: '',
        volume: '',      
        isbn: '',
        issn: '',
        cdd: '',
        callNumber: '',
        subject: '',
        keywords: '',
        summary: '',
        notes: '', 
    });

    const [items, setItems] = useState<{ // Para armazenar os Itens
        title: string,
        subtitle: string,
        responsible: string,
        translation: string,
        year: string,
        edition: string,
        publisher: string,
        location: string,
        numberPages: string,
        dimensions: string,
        serie: string,
        volume: string,     
        isbn: string,
        issn: string,
        cdd: string,
        callNumber: string,
        subject: string,
        keywords: string,
        summary: string,
        notes: string,
        createAt: string,
        id: number, }[]>([]);

    function handleRegister(){

        if(req.id == -1){
            const newId = items.length ? items[items.length - 1].id + 1: 0;
            const newItem = {...req, id: newId};

            setItems ([...items ,newItem]);
        }else{
            setItems(items.map(i => (i.id == req.id ? req : i)));
        }
        setReq({
            id: -1,
            createAt: new Date().toISOString(),
            title: '', 
            subtitle: '',
            responsible: '', 
            translation: '',
            year: '',
            edition: '',
            publisher: '', 
            location: '',
            numberPages: '',
            dimensions: '', 
            serie: '',
            volume: '',      
            isbn: '',
            issn: '',
            cdd: '',
            callNumber: '',
            subject: '',
            keywords: '',
            summary: '',
            notes: '',
        });
    }

    function editItem(id:number){
        const item = items.find(i => i.id == id)
        if(item)
        setReq(item)
    }

    function dellItem(id:number){
        const list = items.filter(i => i.id != id)
        setItems(list)
    }
    
    return( //encapsulamento
        <ScrollView style={styles.container}>    
            <View> {/* aqui é typescript dentro do front*/} 
                {/*<Button title="Voltar" onPress={() => router.back()} color='#2A17A6' />*/} 
                <Text style={styles.h1}>Cadastro de Itens no Acervo</Text>
                <View style={ styles.row }>
                    <View style={styles.form}>

                        

                        <TextInput style={styles.input}
                            placeholder="Título" 
                            value={req.title} 
                            onChangeText={(text)=>setReq({...req ,title: text})} 
                        />
                        {req.title}
                        <TextInput style={styles.input}
                            placeholder="Subtítulo" 
                            value={req.subtitle} 
                            onChangeText={(text)=>setReq({...req ,subtitle: text})} 
                        />
                        {req.subtitle}
                        <TextInput style={styles.input}
                            placeholder="Responsáveis" 
                            value={req.responsible} 
                            onChangeText={(text)=>setReq({...req ,responsible: text})} 
                        />
                        {req.responsible}
                        <TextInput style={styles.input}
                            placeholder="Tradução" 
                            value={req.translation} 
                            onChangeText={(text)=>setReq({...req ,translation: text})} 
                        />
                        {req.translation}
                        <TextInput style={styles.input}
                            placeholder="Ano" 
                            value={req.year}
                            onChangeText={(text) => setReq({ ...req, year: text})} 
                        />
                        {req.year}
                        <TextInput style={styles.input}
                            placeholder="Edição" 
                            value={req.edition} 
                            onChangeText={(text)=>setReq({...req ,edition: text})} 
                        />
                        {req.edition}
                        <TextInput style={styles.input}
                            placeholder="Editora" 
                            value={req.publisher} 
                            onChangeText={(text)=>setReq({...req ,publisher: text})} 
                        />
                        {req.publisher}
                        <TextInput style={styles.input}
                            placeholder="Local" 
                            value={req.location} 
                            onChangeText={(text)=>setReq({...req ,location: text})} 
                        />
                        {req.location}
                        <TextInput style={styles.input}
                            placeholder="Número de Páginas" 
                            value={req.numberPages} 
                            onChangeText={(text)=>setReq({...req ,numberPages: text})} 
                        />
                        {req.numberPages}
                        <TextInput style={styles.input}
                            placeholder="Dimensões" 
                            value={req.dimensions} 
                            onChangeText={(text)=>setReq({...req ,dimensions: text})} 
                        />
                        {req.dimensions}
                        <TextInput style={styles.input}
                            placeholder="Série" 
                            value={req.serie} 
                            onChangeText={(text)=>setReq({...req ,serie: text})} 
                        />
                        {req.serie}
                        <TextInput style={styles.input}
                            placeholder="Volume" 
                            value={req.volume} 
                            onChangeText={(text)=>setReq({...req ,volume: text})} 
                        />
                        {req.volume}
                        <TextInput style={styles.input}
                            placeholder="ISBN" 
                            value={req.isbn} 
                            onChangeText={(text)=>setReq({...req ,isbn: text})} 
                        />
                        {req.isbn}
                        <TextInput style={styles.input}
                            placeholder="ISSN" 
                            value={req.issn} 
                            onChangeText={(text)=>setReq({...req ,issn: text})} 
                        />
                        {req.issn}
                        <TextInput style={styles.input}
                            placeholder="CDD" 
                            value={req.cdd} 
                            onChangeText={(text)=>setReq({...req ,cdd: text})} 
                        />
                        {req.cdd}
                        <TextInput style={styles.input}
                            placeholder="Número de Chamada" 
                            value={req.callNumber} 
                            onChangeText={(text)=>setReq({...req ,callNumber: text})} 
                        />
                        {req.callNumber}
                        <TextInput style={styles.input}
                            placeholder="Assunto" 
                            value={req.subject} 
                            onChangeText={(text)=>setReq({...req ,subject: text})} 
                        />
                        {req.subject}
                        <TextInput style={styles.input}
                            placeholder="Palavras-chave" 
                            value={req.keywords} 
                            onChangeText={(text)=>setReq({...req ,keywords: text})} 
                        />
                        {req.keywords}
                        <TextInput style={styles.input}
                            placeholder="Resumo" 
                            value={req.summary} 
                            onChangeText={(text)=>setReq({...req ,summary: text})} 
                        />
                        {req.summary}
                        <TextInput style={styles.input}
                            placeholder="Notas" 
                            value={req.notes} 
                            onChangeText={(text)=>setReq({...req ,notes: text})} 
                        />
                        {req.notes}

                        <TouchableOpacity style={styles.button} onPress={handleRegister}>CADASTRAR</TouchableOpacity>
                    </View>

                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.id.toString() }
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.cardText}>Título: {item.title}</Text>
                                <Text style={styles.cardText}>Subtítulo: {item.subtitle}</Text>
                                <Text style={styles.cardText}>Responsáveis: {item.responsible}</Text>
                                <Text style={styles.cardText}>Tradução: {item.translation}</Text>
                                <Text style={styles.cardText}>Ano: {item.year}</Text>
                                <Text style={styles.cardText}>Edição: {item.edition}</Text>
                                <Text style={styles.cardText}>Editora: {item.publisher}</Text>
                                <Text style={styles.cardText}>Local: {item.location}</Text>
                                <Text style={styles.cardText}>Número de Páginas: {item.numberPages}</Text>
                                <Text style={styles.cardText}>Dimensões: {item.dimensions}</Text>
                                <Text style={styles.cardText}>Série: {item.serie}</Text>
                                <Text style={styles.cardText}>Volume: {item.volume}</Text>
                                <Text style={styles.cardText}>ISBN: {item.isbn}</Text>
                                <Text style={styles.cardText}>ISSN: {item.issn}</Text>
                                <Text style={styles.cardText}>CDD: {item.cdd}</Text>
                                <Text style={styles.cardText}>Número de Chamada: {item.callNumber}</Text>
                                <Text style={styles.cardText}>Assunto: {item.subject}</Text>
                                <Text style={styles.cardText}>Palavras-chave: {item.keywords}</Text>
                                <Text style={styles.cardText}>Resumo: {item.summary}</Text>
                                <Text style={styles.cardText}>Notas: {item.notes}</Text>

                                <View style={styles.buttonContanier}>
                                    <TouchableOpacity style={styles.edit} onPress={ () => {editItem(item.id)} }>EDITAR</TouchableOpacity>
                                    <TouchableOpacity style={styles.dell} onPress={ () => {dellItem(item.id)} }>DELETAR</TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

    const styles = StyleSheet.create({

        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#FFF',
        },
        row: {
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
        }, 
        h1: {
            textAlign: 'center',
            fontFamily: 'sans-serif',
            fontSize: 30,
            fontWeight: 'bold',
            color: '#0F2259',
            backgroundColor: '#F2F2F2',
            margin: 0,
            padding: 20,
            borderRadius: 10,
        },
        form: {
            flex: 1,
            marginRight: 10,
            marginVertical: 10,
            padding: 20,
            backgroundColor: '#AD6CD9',
            borderRadius: 10,
            shadowColor: '#0C1DA0',
            shadowOpacity: 0.2,
            shadowOffset: {width: 0, height: 4},
            shadowRadius: 5,
        },
        input: {
            height: 35,
            backgroundColor: '#FFF',
            borderColor: '#0C1DA0',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 10,
        },
        button: {
            backgroundColor:'#2A17A6',
            color: '#FFF',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            fontSize: 15,
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            cursor: 'pointer'
        },
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
        buttonContanier: {
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            gap: 10,
            color: '#FFF',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            fontSize: 14,
            margin: 20,
        },
        edit: {
            backgroundColor:'#2A17A6',
            padding: 8,
            borderRadius: 15,
        },
        dell: {
            backgroundColor:'#e30707',
            padding: 8,
            borderRadius: 15,
            
        },  
    });