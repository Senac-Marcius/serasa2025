import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import MyView from "../../src/components/MyView";
import MyText from "../../src/components/MyText";
import MyList from "../../src/components/MyList";
import MyButton from "../../src/components/MyButtons";
import { MyTb } from "../../src/components/MyItem";
import { usePathname } from "expo-router";
import SideMenu from "./components/SideMenu";
import { useUserData } from "@/hooks/useUserData";

import {
  Turma,
  buscarTurmas,
  salvarTurma,
  atualizarTurma,
  deletarTurma,
} from "../../src/controllers/classes";

const camposForm = [
  "curso",
  "nome_turma",
  "turno",
  "modalidade",
  "horario",
  "cargaHoraria",
  "vagas",
  "inicio",
  "termino",
  "valor",
  "docente",
  "status",
];

export default function TurmasComCadastro() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [modoCadastro, setModoCadastro] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState<Turma>({
    id: 0,
    curso: "",
    nome_turma: "",
    turno: "",
    modalidade: "",
    horario: "",
    cargaHoraria: "",
    vagas: "",
    inicio: "",
    termino: "",
    valor: "",
    docente: "",
    status: "",
  });

  const pathname = usePathname();
  const userId = 3;

  const { user, role, classroomData, loading } = useUserData(Number(userId));

  const carregarTurmas = async () => {
    try {
      const lista = await buscarTurmas();
      setTurmas(lista);
    } catch (err: any) {
      console.error("Erro ao carregar turmas:", err.message);
    }
  };

  const salvar = async () => {
    for (const campo of camposForm) {
      if (!form[campo as keyof typeof form]) {
        setErrorMessage(`Campo obrigatório: ${campo}`);
        return;
      }
    }

    setErrorMessage(null);

    try {
      let turmaSalva: Turma;
      if (form.id === 0) {
        const { id, ...dadosSemId } = form;
        turmaSalva = await salvarTurma(dadosSemId);
        setTurmas((prev) => [...prev, turmaSalva]);
      } else {
        turmaSalva = await atualizarTurma(form);
        setTurmas((prev) =>
          prev.map((t) => (t.id === turmaSalva.id ? turmaSalva : t))
        );
      }

      setForm({
        id: 0,
        curso: "",
        nome_turma: "",
        turno: "",
        modalidade: "",
        horario: "",
        cargaHoraria: "",
        vagas: "",
        inicio: "",
        termino: "",
        valor: "",
        docente: "",
        status: "",
      });
      setModoCadastro(false);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const excluir = async (id: number) => {
    try {
      await deletarTurma(id);
      carregarTurmas();
    } catch (err: any) {
      console.error("Erro ao excluir turma:", err.message);
    }
  };

  const editar = (turma: Turma) => {
    setForm(turma);
    setModoCadastro(true);
  };

  useEffect(() => {
    carregarTurmas();
  }, []);

  return (
    <MyView style={styles.container}>

      <View className="flex-1 flex-row justify-between ">

        

        
      {role && <SideMenu role={role} activeRoute={pathname.replace("/", "")} />}
      <View className="flex-1 mt-[50] p-[50]">
      {!modoCadastro && (
        <MyButton
          title="Nova turma"
          onPress={() => setModoCadastro(true)}
          icon="plus"
          className="mb-4"
          style={{width: 200,justifyContent:'center',alignSelf:'flex-end'}}
        />
      )}


      {/* TABELA */}
      <MyList
        style={styles.table}
        data={turmas}
        keyItem={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MyTb onEdit={() => editar(item)} onDel={() => excluir(item.id)} style={{flexDirection: 'row', alignItems: 'center'}}>
            <MyText style={styles.td}>{item.id}</MyText>
            <MyText style={styles.td}>{item.curso}</MyText>
            <MyText style={styles.td}>{item.nome_turma}</MyText>
            <MyText style={styles.td}>{item.turno}</MyText>
            <MyText style={styles.td}>{item.modalidade}</MyText>
            <MyText style={styles.td}>{item.horario}</MyText>
            <MyText style={styles.td}>{item.cargaHoraria}</MyText>
            <MyText style={styles.td}>{item.vagas}</MyText>
            <MyText style={styles.td}>{item.inicio}</MyText>
            <MyText style={styles.td}>{item.termino}</MyText>
            <MyText style={styles.td}>{item.valor}</MyText>
            <MyText style={styles.td}>{item.docente}</MyText>
            <MyText style={styles.td}>{item.status}</MyText>
          </MyTb>
        )}
        header={
          <View style={styles.tableRowHeader}>
            <MyText style={styles.th}>Codigo</MyText>
            <MyText style={styles.th}>Curso</MyText>
            <MyText style={styles.th}>Turma</MyText>
            <MyText style={styles.th}>Turno</MyText>
            <MyText style={styles.th}>Modalidade</MyText>
            <MyText style={styles.th}>Horario</MyText>
            <MyText style={styles.th}>Carga Horaria</MyText>
            <MyText style={styles.th}>Vagas</MyText>
            <MyText style={styles.th}>Data Inicio</MyText>
            <MyText style={styles.th}>Data Termino</MyText>
            <MyText style={styles.th}>Valor</MyText>
            <MyText style={styles.th}>Docente</MyText>
            <MyText style={styles.th}>Status</MyText>
          </View>
        }
      />

      {/* FORMULÁRIO */}
      {modoCadastro && (
        <>
          <MyText style={styles.header}>Cadastro de Turma</MyText>
          {errorMessage && (
            <MyText style={styles.errorText}>{errorMessage}</MyText>
          )}
          {camposForm.map((campo) => (
            <TextInput
              key={campo}
              style={styles.input}
              placeholder={campo}
              value={(form as any)[campo]}
              onChangeText={(text) => setForm({ ...form, [campo]: text })}
            />
          ))}
          <MyButton title="Salvar" onPress={salvar} />
          <MyButton title="Cancelar" onPress={() => setModoCadastro(false)} />
        </>
      )}
</View>
      </View>
      
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    textAlign: "center",
  },
  table: {
    backgroundColor: "#fdfdfd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  tableRowHeader: {
    flexDirection: "row",    
    paddingBottom: 8,
    justifyContent: "space-evenly",
    alignItems: "center",
  
  },
  th: { flex: 1, fontWeight: "bold", fontSize: 16 },
  td: { flex: 1, fontSize: 14 },
});
