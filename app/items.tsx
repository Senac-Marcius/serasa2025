import React, { useState } from 'react'; //função useState só retorna para uma variavel const
import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import { text } from 'stream/consumers';
//import { useRouter } from 'expo-router';

export default function ItemScreen(){ // aqui é TS
 
    const [req, setReq] = useState({
        id: 0,
        createAt: new Date().toISOString(),
        title: '', 
        subtitle: '',
        uniformTitle: '', 
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
        narrator: '',
        duration: '', 
    });

    const [items, setItems] = useState<{
        createAt: string,
        title: string,
        subtitle: string,
        uniformTitle: string,
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
        narrator: string,
        duration: string,
        id: Number,}[]>([]);

    function handleRegister(){
        setItems ([...items ,req])
        setReq({
            id: req.id + 1,
            createAt: new Date().toISOString(),
            title: '', 
            subtitle: '',
            uniformTitle: '', 
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
            narrator: '',
            duration: '', 

        });
    }
    
    return ( //encapsulamento
      <View> {/* aqui é typescript dentro do front*/}  
        <Text>Minha tela de cadastro</Text>
        <View style={ styles.row }>
            <View style={styles.form}>

                    <TextInput 
                        placeholder="Título" 
                        value={req.title} 
                        onChangeText={(text)=>setReq({...req ,title: text})} 
                    />
                    {req.title}
                    <TextInput 
                        placeholder="Subtítulo" 
                        value={req.subtitle} 
                        onChangeText={(text)=>setReq({...req ,subtitle: text})} 
                    />
                    {req.subtitle}
                    <TextInput 
                        placeholder="Título Uniforme" 
                        value={req.uniformTitle} 
                        onChangeText={(text)=>setReq({...req ,uniformTitle: text})} 
                    />
                    {req.uniformTitle}
                    <TextInput 
                        placeholder="Responsáveis" 
                        value={req.responsible} 
                        onChangeText={(text)=>setReq({...req ,responsible: text})} 
                    />
                    {req.responsible}
                    <TextInput 
                        placeholder="Tradução" 
                        value={req.translation} 
                        onChangeText={(text)=>setReq({...req ,translation: text})} 
                    />
                    {req.translation}
                    <TextInput 
                        placeholder="Ano" 
                        value={req.year} 
                        onChangeText={(text)=>setReq({...req ,year: text})} 
                    />
                    {req.year}
                    <TextInput 
                        placeholder="Edição" 
                        value={req.edition} 
                        onChangeText={(text)=>setReq({...req ,edition: text})} 
                    />
                    {req.edition}
                    <TextInput 
                        placeholder="Editora" 
                        value={req.publisher} 
                        onChangeText={(text)=>setReq({...req ,publisher: text})} 
                    />
                    {req.publisher}
                    <TextInput 
                        placeholder="Local" 
                        value={req.location} 
                        onChangeText={(text)=>setReq({...req ,location: text})} 
                    />
                    {req.location}
                    <TextInput 
                        placeholder="Número de Páginas" 
                        value={req.numberPages} 
                        onChangeText={(text)=>setReq({...req ,numberPages: text})} 
                    />
                    {req.numberPages}
                    <TextInput 
                        placeholder="Dimensões" 
                        value={req.dimensions} 
                        onChangeText={(text)=>setReq({...req ,dimensions: text})} 
                    />
                    {req.dimensions}
                    <TextInput 
                        placeholder="Série" 
                        value={req.serie} 
                        onChangeText={(text)=>setReq({...req ,serie: text})} 
                    />
                    {req.serie}
                    <TextInput 
                        placeholder="Volume" 
                        value={req.volume} 
                        onChangeText={(text)=>setReq({...req ,volume: text})} 
                    />
                    {req.volume}
                    <TextInput 
                        placeholder="ISBN" 
                        value={req.isbn} 
                        onChangeText={(text)=>setReq({...req ,isbn: text})} 
                    />
                    {req.isbn}
                    <TextInput 
                        placeholder="ISSN" 
                        value={req.issn} 
                        onChangeText={(text)=>setReq({...req ,issn: text})} 
                    />
                    {req.issn}
                    <TextInput 
                        placeholder="CDD" 
                        value={req.cdd} 
                        onChangeText={(text)=>setReq({...req ,cdd: text})} 
                    />
                    {req.cdd}
                    <TextInput 
                        placeholder="Número de Chamada" 
                        value={req.callNumber} 
                        onChangeText={(text)=>setReq({...req ,callNumber: text})} 
                    />
                    {req.callNumber}
                    <TextInput 
                        placeholder="Assunto" 
                        value={req.subject} 
                        onChangeText={(text)=>setReq({...req ,subject: text})} 
                    />
                    {req.subject}
                    <TextInput 
                        placeholder="Palavras-chave" 
                        value={req.keywords} 
                        onChangeText={(text)=>setReq({...req ,keywords: text})} 
                    />
                    {req.keywords}
                    <TextInput 
                        placeholder="Resumo" 
                        value={req.summary} 
                        onChangeText={(text)=>setReq({...req ,summary: text})} 
                    />
                    {req.summary}
                    <TextInput 
                        placeholder="Notas" 
                        value={req.notes} 
                        onChangeText={(text)=>setReq({...req ,notes: text})} 
                    />
                    {req.notes}
                    <TextInput 
                        placeholder="Narrador" 
                        value={req.narrator} 
                        onChangeText={(text)=>setReq({...req ,narrator: text})} 
                    />
                    {req.narrator}
                    <TextInput 
                        placeholder="Duração" 
                        value={req.duration} 
                        onChangeText={(text)=>setReq({...req ,duration: text})} 
                    />
                    {req.duration}

                    <Button title= 'Cadastrar' onPress={ handleRegister } color="purple" />

            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString() }
                renderItem={({ item }) =>(
                    <View>{item.title}</View>
                )}
            />
        </View>
      </View>  
    );
}

const styles = StyleSheet.create({

    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
    }, 
    form: {
        flex: 1,
        marginRight: 10,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    
})