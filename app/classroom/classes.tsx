import React, { useEffect, useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import MyView from '../../src/components/MyView';
import MyText from '../../src/components/MyText';
import MyList from '../../src/components/MyList';
import MyButton from '../../src/components/MyButtons';
import { MyTb } from '../../src/components/MyItem';

import {
  Turma,
  buscarTurmas,
  salvarTurma,
  deletarTurma,
} from '../../src/controllers/classes';

const camposForm = [
  'id', 'curso', 'nome_turma', 'turno', 'modalidade', 'horario',
  'cargaHoraria', 'vagas', 'inicio', 'termino', 'valor',
  'docente', 'status',
];

export default function TurmasComCadastro() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [modoCadastro, setModoCadastro] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState<Turma>({
    id: 0,
    curso: '',
    nome_turma: '',
    turno: '',
    modalidade: '',
    horario: '',
    cargaHoraria: '',
    vagas: '',
    inicio: '',
    termino: '',
    valor: '',
    docente: '',
    status: '',
  });

  const carregarTurmas = async () => {
    try {
      const lista = await buscarTurmas();
      setTurmas(lista);
    } catch (err: any) {
      console.error('Erro ao carregar turmas:', err.message);
    }
  };

  const salvar = async () => {
    for (const campo of camposForm) {
      if (!form[campo as keyof Turma]) {
        setErrorMessage(`Campo obrigatório: ${campo}`);
        return;
      }
    }
    setErrorMessage(null);

    try {
      await salvarTurma(form);
      carregarTurmas();
      setForm({
        id: 0,
        curso: '',
        nome_turma: '',
        turno: '',
        modalidade: '',
        horario: '',
        cargaHoraria: '',
        vagas: '',
        inicio: '',
        termino: '',
        valor: '',
        docente: '',
        status: '',
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
      console.error('Erro ao excluir turma:', err.message);
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
         {!modoCadastro && (
        <MyButton title="Cadastrar nova turma" onPress={() => setModoCadastro(true)} />
      )}

      {/* TABELA */}
      <MyList
        style={styles.table}
        data={turmas}
        keyItem={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MyTb onEdit={() => editar(item)} onDel={() => excluir(item.id)}>
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
        header={(
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
        )}
      />

      
     
      {/* FORMULÁRIO */}
      {modoCadastro && (
        <>
          <MyText style={styles.header}>Cadastro de Turma</MyText>
          {errorMessage && <MyText style={styles.errorText}>{errorMessage}</MyText>}
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
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  table: {
    backgroundColor: '#fdfdfd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  tableRowHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 8,
    justifyContent:'space-between',
    gap:15
  },
  th: { flex: 1, fontWeight: 'bold', fontSize: 20 },
  td: { flex: 1, fontSize: 12 },
});
