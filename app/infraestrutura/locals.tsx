import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import MySelect from "../../src/components/MySelect";
import MyView from "../../src/components/MyView";
import MyList from "../../src/components/MyList";
import { Myinput } from "../../src/components/MyInputs";
import MyButton from "../../src/components/MyButtons";
import { MyModal } from "../../src/components/MyModal"; // Certifique-se de que o componente MyModal está disponível
import Mytext from "../../src/components/MyText";
import {
  setLocal,
  iLocal,
  deleteLocal,
  updateLocal,
  getLocals,
} from "../../src/controllers/locals";

export default function LocalScreen() {
  const [req, setReq] = useState({
    id: -1,
    name: "",
    dimension: "",
    description: "",
    adress: "",
    created_at: new Date().toISOString(),
  });

  const [locals, setLocals] = useState<iLocal[]>([]);
  const [visible, setVisible] = useState(false); // Controle de visibilidade do modal
  const [message, setMessage] = useState("");
  const [unity, setUnit] = useState("Select");

  useEffect(() => {
    async function getTodos() {
      const retorno = await getLocals({});
      if (retorno.status && retorno.data && retorno.data.length > 0) {
        setLocals(retorno.data);
      }
    }
    getTodos();
  }, []);

  async function handleRegister() {
    if (req.id == -1) {
      const newId = locals.length ? locals[locals.length - 1].id + 1 : 0;
      const newLocal = { ...req, id: newId };
      setLocals([...locals, newLocal]);
      await setLocal(newLocal);
    } else {
      setLocals(locals.map((l) => (l.id == req.id ? req : l)));
      const result = await updateLocal(req);
      if (result && result.length > 0) {
        setLocals(locals.map((l) => (l.id == req.id ? result[0] : l)));
      }
    }

    setReq({
      id: -1,
      name: "",
      dimension: "",
      description: "",
      adress: "",
      created_at: new Date().toISOString(),
    });

    setVisible(false); // Fecha o modal após o registro
  }

  function editLocal(id: number) {
    const local = locals.find((l) => l.id == id);
    if (local) {
      setReq(local);
      setVisible(true); // Abre o modal para edição
    }
  }

  async function DelLocal(id: number) {
    const resp = await deleteLocal(id);
    if (resp.status) {
      const list = locals.filter((l) => l.id != id);
      setLocals(list);
    } else {
      setMessage(
        "Existem itens selecionados nessa área. Ele não pode ser deletado"
      );
    }
  }

  return (
    <MyView>
      <View style={styles.headerContainer}>
        <Mytext style={styles.screenTitle}>Cadastro de Locais</Mytext>
        {message.length > 1 && <Text style={styles.message}>{message}</Text>}
      </View>

      <MyModal
        style={styles.modal}
        visible={visible}
        setVisible={setVisible}
        title={req.id === -1 ? "Cadastrar Local" : "Editar Local"}
        closeButtonTitle="Fechar"
        handleClosedButton={() => setVisible(false)}
        buttonStyle={{
          alignSelf: "flex-start", // Alinha o botão à esquerda
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <MySelect
          caption="Selecione uma unidade"
          label={unity} // Mostra o valor selecionado
          list={[
            { key: "1", option: "Unidade 1" },
            { key: "2", option: "Unidade 2" },
            { key: "3", option: "Unidade 3" },
          ]}
          setLabel={(option) => setUnit(option)} // Atualiza o valor selecionado
          setKey={(key) => console.log("Chave selecionada:", key)} // Opcional: registra a chave
        />
        <Myinput
          iconName="search"
          placeholder="Digite o nome do local"
          value={req.name}
          label="Nome:"
          onChangeText={(t) => setReq({ ...req, name: t })}
        />
        <Myinput
          iconName="language"
          placeholder="Digite a dimensão"
          value={req.dimension}
          label="Dimensão:"
          onChangeText={(t) => setReq({ ...req, dimension: t })}
        />
        <Myinput
          iconName="description"
          placeholder="Digite a descrição"
          value={req.description}
          label="Descrição:"
          onChangeText={(t) => setReq({ ...req, description: t })}
        />
        <Myinput
          iconName="home"
          placeholder="Digite o endereço"
          value={req.adress}
          label="Endereço:"
          onChangeText={(t) => setReq({ ...req, adress: t })}
        />
        <MyButton
          title="Salvar"
          onPress={handleRegister}
          style={styles.saveButton}
        />
      </MyModal>

      <MyList
        style={styles.table}
        data={locals}
        keyItem={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.td}>{item.name}</Text>
            <Text style={styles.td}>{item.adress}</Text>
            <Text style={styles.td}>{item.dimension}</Text>
            <Text style={styles.td}>{item.description}</Text>
            <View style={styles.actionContainer}>
              <MyButton
                title="Editar"
                onPress={() => editLocal(item.id)}
                style={styles.editButton}
              />
              <MyButton
                title="Excluir"
                onPress={() => DelLocal(item.id)}
                style={styles.deleteButton}
                color="#FF5252" // Define a cor correta
              />
            </View>
          </View>
        )}
        header={
          <View style={styles.tabela}>
            <Mytext style={styles.th}>Nome</Mytext>
            <Mytext style={styles.th}>Endereço</Mytext>
            <Mytext style={styles.th}>Dimensão</Mytext>
            <Mytext style={styles.th}>Descrição</Mytext>
            <Mytext style={styles.th}>Ações</Mytext>
          </View>
        }
      />
    </MyView>
  );
}

const styles = StyleSheet.create({
    actionContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, 
    },
    tableRow:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    td:{
        flex: 1,
        fontSize: 20,
        color: '#444',
        textAlign: 'center'  
    },
  table: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 8,
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
  tableRowHeader: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: "flex-start", // Alinha o botão à esquerda
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3A3A3A",
    textAlign: "left",
    marginBottom: 10,
    fontFamily: "Arial",
    textTransform: "uppercase",
  },
  message: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  label: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    flex: 1, // Permite que o texto ocupe o espaço disponível
  },
  actionButtons: {
    flexDirection: "row", // Coloca os botões lado a lado
    justifyContent: "flex-end", // Alinha os botões à direita
    gap: 10, // Espaçamento entre os botões
  },
  editButton: {
    backgroundColor: "#FFDB58",
    padding: 8,
    borderRadius: 5,
    marginRight: 10, // Espaçamento entre os botões
  },
  deleteButton: {
    backgroundColor: "#FF5252", // Define a cor correta
    padding: 8,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#3AC7A8",
    marginTop: 10,
    margin: "auto",
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
  },
  modal: {
    margin: "auto",
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
});
