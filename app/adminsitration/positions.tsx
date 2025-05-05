import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import MyView from "../../src/components/MyView";
import { Myinput } from "../../src/components/MyInputs";
import MyButton from "../../src/components/MyButtons";
import { useRouter } from 'expo-router';
import MyTimePicker from "../../src/components/MyTimerPiker";
import { setPosition, deletePosition, updatePosition, iPosition, getCargo } from "../../src/controllers/positions";
import Mytext from "../../src/components/MyText";
import { MyTb } from "../../src/components/MyItem";
import MyList from "../../src/components/MyList";

export default function PositionScreen() {
  const [positions, setPositions] = useState<iPosition[]>([]);
  const [showList, setShowList] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [req, setReq] = useState({
    id: -1,
    name: "",
    description: "",
    salary: 0,
    work_hours: "",
    departament: "",
    supervisor: "",
    creat_at: new Date().toISOString(),
  });

  useEffect(() => {
    (async function getTodos() {
      const retorno = await getCargo({});
      if (retorno.status && retorno.data && retorno.data.length > 0) {
        setPositions(retorno.data);
      }
    })();
  }, []);

  async function handleRegister() {
    if (req.id === -1) {
      const newId = positions.length ? positions[positions.length - 1].id + 1 : 0;
      const newPosition = { ...req, id: newId };
      const result = await setPosition(newPosition);
      if (result) setPositions([...positions, newPosition]);
    } else {
      const updated = await updatePosition(req);
      if (updated) {
        setPositions(positions.map(p => (p.id === req.id ? req : p)));
      }
    }

    setReq({
      id: -1,
      name: "",
      description: "",
      salary: 0,
      work_hours: "",
      departament: "",
      supervisor: "",
      creat_at: new Date().toISOString(),
    });
  }

  async function editPosition(id: number) {
    const position = positions.find(p => p.id === id);
    if (position) {
      setReq(position);
    }
  }

  async function delPosition(id: number) {
    const success = await deletePosition(id);
    if (success) {
      const list = positions.filter(p => p.id !== id);
      setPositions(list);
    }
  }

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const router = useRouter();

  return (
    <MyView style={{ flex: 1 }} title="Cargos">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Myinput
            label="Cargo"
            placeholder="Insira um Cargo"
            iconName="briefcase"
            value={req.name}
            onChangeText={(text) => setReq({ ...req, name: text })}
          />
          <Myinput
            label="Descrição"
            placeholder="Insira uma descrição"
            iconName="briefcase"
            value={req.description}
            onChangeText={(text) => setReq({ ...req, description: text })}
          />
          <Myinput
            label="Salário"
            placeholder="Insira o salário"
            iconName="briefcase"
            value={req.salary.toString()}
            onChangeText={(text) => setReq({ ...req, salary: Number(text) })}
          />
          <MyTimePicker
            onTimeSelected={(time) => setReq({ ...req, work_hours: time })}
            initialTime={req.work_hours}
          />
          <Myinput
            label="Departamento"
            placeholder="Insira um departamento"
            iconName="briefcase"
            value={req.departament}
            onChangeText={(text) => setReq({ ...req, departament: text })}
          />
          <Myinput
            label="Supervisor"
            placeholder="Insira um supervisor"
            iconName="briefcase"
            value={req.supervisor}
            onChangeText={(text) => setReq({ ...req, supervisor: text })}
          />
          <MyButton title="Cadastrar" onPress={handleRegister} />
        </View>

        <TouchableOpacity style={styles.mainButton} onPress={() => setShowList(!showList)}>
          <Text style={styles.mainButtonText}>
            {showList ? "Ocultar Cargos" : "Cargos Cadastrados"}
          </Text>
        </TouchableOpacity>

        {showList && (
          <View style={styles.listContainer}>
            <MyList
              data={positions}
              keyItem={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                  <MyTb
                    onEdit={() => editPosition(item.id)}
                    onDel={() => delPosition(item.id)}
                  >
                    <View style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 12 }}>
                      <Mytext style={styles.titleText}>{item.name}</Mytext>
                      <Mytext style={styles.cardText}>
                        <Text style={styles.bold}>Descrição: </Text>{item.description}
                      </Mytext>
                      <Mytext style={styles.cardText}>
                        <Text style={styles.bold}>Salário: </Text>R$ {item.salary}
                      </Mytext>
                      {expandedId === item.id ? (
                        <>
                          <Mytext style={styles.cardText}>
                            <Text style={styles.bold}>Carga horária: </Text>{item.work_hours}
                          </Mytext>
                          <Mytext style={styles.cardText}>
                            <Text style={styles.bold}>Departamento: </Text>{item.departament}
                          </Mytext>
                          <Mytext style={styles.cardText}>
                            <Text style={styles.bold}>Supervisor: </Text>{item.supervisor}
                          </Mytext>
                          <Mytext style={styles.cardText}>
                            <Text style={styles.bold}>Criado em: </Text>{item.creat_at}
                          </Mytext>
                        </>
                      ) : (
                        <Text style={{ fontSize: 12, color: '#0009', marginTop: 6 }}>
                          Clique para exibir mais detalhes
                        </Text>
                      )}
                    </View>
                  </MyTb>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </ScrollView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 1700,
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    gap: 12,
    marginBottom: 20,
  },
  mainButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#A020F0',
    borderRadius: 12,
    alignItems: 'center',
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  listContainer: {
    width: '100%',
    maxWidth: 1300,
    marginTop: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
});
