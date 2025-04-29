import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MyItem } from '../../src/components/MyItem';
import MyList from '../../src/components/MyList';
import { Myinput } from '../../src/components/MyInputs';
import MyButton from '../../src/components/MyButtons';
import MyView from '../../src/components/MyView';
import { useRouter } from 'expo-router';
import { setIten, dell, edit, iIten, getItens } from '../../src/controllers/items';
import { MyModal} from '../../src/components/MyModal';
import Mytext from '../../src/components/MyText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MySelect from '../../src/components/MySelect';





export default function itemScreen(product_id: Number) {
    const [req, setReq] = useState({
        id: -1,
        mark: '',
        asset_number: '',
        amount: 0,
        local_id: 1,
        category_id: 1,
        product_id: 1,
        description: '',
        created_at: new Date().toISOString()
    });
    const [itens, setItens] = useState<iIten[]>([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        async function getTodos() {
            const retorno = await getItens({})
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setItens(retorno.data);
            }
        }
        getTodos();
    }, [])

    async function handleRegister() {
        if (req.id == -1) {
            const newid = itens.length ? itens[itens.length - 1].id + 1 : 0;
            const newItem = { ...req, id: newid };
            setItens([...itens, newItem])
            await setIten(newItem)
        } else {
            setItens(itens.map(i => (i.id == req.id ? req : i)));
            await edit(req)
        }

        setReq({
            id: -1,
            mark: '',
            asset_number: '',
            amount: 0,
            local_id: 1,
            category_id: 1,
            product_id: 1,
            description: '',
            created_at: new Date().toISOString()
        })

        setVisible(false);
    }

    function editItem(id: number) {
        let item = itens.find(i => i.id == id)
        if (item)
            setReq(item)
    }

    async function delItem(id: number) {
        await dell(id)
        const list = itens.filter(i => i.id != id)
        if (list)
            setItens(list)
    }
     const [unity, setUnit] = useState("Categorias")  
    const router = useRouter();

    return (
        <MyView>
            
            <View>
                <Mytext style={styles.h1}>Cadastro de Itens</Mytext>
            </View>
            
            <MyModal title='Cadastrar' visible={visible} setVisible={setVisible}> 

            
                <View style={styles.form}>

                    <MaterialIcons      //Essa estrutura pertence ao input da descrição
                        name="description" //adicionei os icones de acordo com o MySelect e estão estruturados de acordo com cada input. Essa estrutura pertence ao input da descrição
                        size={18} 
                        color="#6A1B9A" 
                        style={{  marginLeft: 0.1,  // Indentação adicional da borda esquerda
                        marginRight: 5}}/>

                    <Myinput
                        placeholder="Descrição"
                        value={req.description}
                        onChangeText={(text) => setReq({ ...req, description: text })}
                        label="Descrição do item"
                        iconName=''
                    />


                    
                    <MySelect 
                    caption="Selecione uma categoria"
                        label={unity} setLabel={setUnit} 
                        list={            
                            [
                                {key:0, option: 'Refeitório'},             /* exemplo do código de SELECT para copiar */
                                {key:1, option: 'Energia e iluminação'},
                                {key:2, option: 'Água e saneamento'},
                                {key:3, option: 'Administração'},
                                {key:4, option: 'Estoques e materiais'},
                                

                            ]
                        } />
                    <MaterialIcons //Essa estrutura pertence ao input da item
                        name="mouse" 
                        size={18} 
                        color="#6A1B9A" 
                        style={{  marginLeft: 0.1,  // Indentação adicional da borda esquerda
                        marginRight: 5}}/>
                    
                    <Myinput
                        placeholder="Digite o nome do item"
                        value={req.mark}
                        onChangeText={(text) => setReq({ ...req, mark: text })}
                        label="Item"
                        iconName=''
                    />
                    
                    <MaterialIcons //Essa estrutura pertence ao input da quantidade
                    name="123" 
                    size={18} 
                    color="#6A1B9A" 
                    style={{  marginLeft: 0.1,  // Indentação adicional da borda esquerda
                    marginRight: 5}}/>
                    
                    <Myinput
                        placeholder="Digite o número"
                        value={req.mark}
                        onChangeText={(text) => setReq({ ...req, mark: text })}
                        label="Nº de patrimônio"
                        iconName=''
                    />
                    <Myinput 
                        placeholder="N°"
                        value={String(req.amount)}
                        onChangeText={(text) => setReq({ ...req, amount: Number(text) })}
                        label="Quantidade de itens"
                        iconName=''
                    />
                    <MyButton title='Cadastrar' onPress={handleRegister} />
                    
                </View>
            </MyModal>

            <MyList
                data={itens}
                keyItem={(i) => i.id.toString()}
                renderItem={({ item }) => (
                    <MyItem
                        onDel={() => { delItem(item.id) }}
                        onEdit={() => { editItem(item.id) }}
                    >
                        <text>{item.name}</text>
                        <text>{item.mark}</text>
                        <text>{item.assetNumber}</text>
                        <text>{item.amount}</text>
                        <View style={styles.buttonsContainer}></View>
                    </MyItem>
                )}
            />
        </MyView>
    );
}

const styles = StyleSheet.create({
    
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "black",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
    },
    edit: {
        fontSize: 15,
        padding: 10,
        backgroundColor: '#FFDB58',
        borderRadius: 100,
        fontFamily: 'arial'
    },
    delete: {
        fontSize: 15,
        padding: 10,
        backgroundColor: '#BC544B',
        borderRadius: 100,
        fontFamily: 'arial',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        fontSize: 15,
        padding: 40,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    formContainer: {
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
    listContainer: {
        flex: 1,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    form: {
        flex: 1
    },
});