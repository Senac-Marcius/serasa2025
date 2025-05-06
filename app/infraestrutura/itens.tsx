import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import MyList from "../../src/components/MyList";
import { Myinput } from "../../src/components/MyInputs";
import MyButton from "../../src/components/MyButtons";
import MyView from "../../src/components/MyView";
import { useRouter } from "expo-router";
import {
  setIten,
  dell,
  edit,
  iIten,
  getItens,
} from "../../src/controllers/items";
import { MyModal } from "../../src/components/MyModal";
import Mytext from "../../src/components/MyText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import MySelect from "../../src/components/MySelect";

export default function itemScreen(product_id: Number) {
  const [req, setReq] = useState({
    id: -1,
    mark: "",
    asset_number: "",
    amount: 0,
    local_id: -1,
    category_id: -1,
    product_id: -1,
    description: "",
    created_at: new Date().toISOString(),
  });
  const [itens, setItens] = useState<iIten[]>([]);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [unity, setUnit] = useState("Categorias");

  useEffect(() => {
    async function getTodos() {
      const retorno = await getItens({});
      if (retorno.status && retorno.data && retorno.data.length > 0) {
        setItens(retorno.data);
      }
    }
    getTodos();
  }, []);

  async function handleRegister() {
    if (req.id == -1) {
      const newid = itens.length ? itens[itens.length - 1].id + 1 : 0;
      const newItem = { ...req, id: newid };
      setItens([...itens, newItem]);
      await setIten(newItem);
    } else {
      setItens(itens.map((i) => (i.id == req.id ? req : i)));
      await edit(req);
    }

    setReq({
      id: -1,
      mark: "",
      asset_number: "",
      amount: 0,
      local_id: -1,
      category_id: -1,
      product_id: -1,
      description: "",
      created_at: new Date().toISOString(),
    });

    setVisible(false);
  }

  function editItem(id: number) {
    const item = itens.find((i) => i.id === id);
    if (item) {
      setReq(item);
      setVisible(true);
    }
  }

  async function delItem(id: number) {
    await dell(id);
    const list = itens.filter((i) => i.id != id);
    if (list) setItens(list);
  }

  return (
    <MyView>
      <View style={styles.headerContainer}>
        <Mytext style={styles.screenTitle}>Cadastro de Itens</Mytext>
      </View>

      <MyModal
      
        style={styles.modal}
        title="Cadastrar"
        visible={visible}
        setVisible={setVisible}
        buttonStyle={{
            alignSelf: "flex-start", // Alinha o botão à esquerda
            marginTop: 20,
            marginBottom: 20,
          }}
        
      >
        <View>
          <MaterialIcons
            name="description"
            size={18}
            color="#6A1B9A"
            style={{ marginLeft: 0.1, marginRight: 5 }}
          />
          <Myinput
            placeholder="Descrição"
            value={req.description}
            onChangeText={(text) => setReq({ ...req, description: text })}
            label="Descrição do item"
            iconName=""
          />

          <MySelect
            caption="Selecione uma categoria"
            label={unity}
            setLabel={setUnit}
            list={[
              { key: 0, option: "Refeitório" },
              { key: 1, option: "Energia e iluminação" },
              { key: 2, option: "Água e saneamento" },
              { key: 3, option: "Administração" },
              { key: 4, option: "Estoques e materiais" },
            ]}
          />

          <MaterialIcons
            name="mouse"
            size={18}
            color="#6A1B9A"
            style={{ marginLeft: 0.1, marginRight: 5 }}
          />
          <Myinput
            placeholder="Digite o nome do item"
            value={req.mark}
            onChangeText={(text) => setReq({ ...req, mark: text })}
            label="Item"
            iconName=""
          />

          <MaterialIcons
            name="123"
            size={23}
            color="#6A1B9A"
            style={{ marginLeft: 0.1, marginRight: 5 }}
          />
          <Myinput
            placeholder="Digite o número"
            value={req.asset_number}
            onChangeText={(text) => setReq({ ...req, asset_number: text })}
            label="Nº de patrimônio"
            iconName=""
          />

          <Octicons name="number" size={18} color="#6A1B9A" />
          <Myinput
            placeholder="N°"
            value={String(req.amount)}
            onChangeText={(text) => setReq({ ...req, amount: Number(text) })}
            label="Quantidade de itens"
            iconName=""
          />
          <MyButton
            style={styles.buttoncad}
            title="Cadastrar"
            onPress={handleRegister}
          />
        </View>
      </MyModal>

      <MyList
        data={itens}
        keyItem={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.td}>{item.description}</Text>
            <Text style={styles.td}>{item.mark}</Text>
            <Text style={styles.td}>{item.asset_number}</Text>
            <Text style={styles.td}>{item.amount}</Text>
            <Text style={styles.td}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
            <View style={styles.actionContainer}>
              <MyButton
                title="Editar"
                onPress={() => editItem(item.id)}
                style={styles.editButton}
              />
              <MyButton
                title="Excluir"
                onPress={() => delItem(item.id)}
                style={styles.deleteButton}
                color="#FF5252" // Define a cor correta
              />
            </View>
          </View>
        )}
        header={
          <View style={styles.tabela}>
            <Mytext style={styles.th}>Descrição</Mytext>
            <Mytext style={styles.th}>Item</Mytext>
            <Mytext style={styles.th}>Nº de Patrimônio</Mytext>
            <Mytext style={styles.th}>Quantidade</Mytext>
            <Mytext style={styles.th}>Data</Mytext>
            <Mytext style={styles.th}>Ações</Mytext>
          </View>
        }
      />
    </MyView>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3A3A3A",
    textAlign: "left",
    marginVertical: 20,
    fontFamily: "Arial",
    textTransform: "uppercase",
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  buttoncad: {
    marginBottom: 10,
    margin: "auto",
  },
  modal: {
    display: "flex",
    width: "auto",
    height: "auto",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "purple",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  td: {
    flex: 1,
    fontSize: 16,
    color: "#444",
    textAlign: "center",
  },
  tabela: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  th: {
    flex: 1,
    fontWeight: "600",
    fontSize: 20,
    color: "#333",
    textAlign: "center",
  },
  actionContainer: {
    
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  editButton: {
    backgroundColor: "#FFDB58",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#FF5252",
    padding: 8,
    borderRadius: 5,
  },
});
