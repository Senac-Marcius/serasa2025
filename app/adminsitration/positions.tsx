import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";
import MyView from "../../src/components/MyView";
import { Myinput } from "../../src/components/MyInputs";
import MyButton from "../../src/components/MyButtons";
import { useRouter } from 'expo-router';
import MyTimePicker from "../../src/components/MyTimerPiker";
import { setPosition, deletePosition, updatePosition, iPosition, getCargo } from "../../src/controllers/positions";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { supabase } from "../../src/utils/supabase";
import { iEmployees } from "../../src/controllers/employees";
import MySelect from "../../src/components/MySelect";
import { getUserById, iUser } from "../../src/controllers/users";

interface iEmployeeWithDetails extends iEmployees {
  user_details?: iUser; // Dados do usuário que serão carregados separadamente
  position?: {
    name: string;
    departament: string;
  };
}

export default function PositionScreen() {
  const router = useRouter();
  const [positions, setPositions] = useState<iPosition[]>([]);
  const [filteredPositions, setFilteredPositions] = useState<iPosition[]>([]);
  const [showList, setShowList] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [potentialSupervisors, setPotentialSupervisors] = useState<iEmployeeWithDetails[]>([]);
  
  const schoolDepartments = [
    {key: "Diretoria", option: "Diretoria"},
    {key: "Coordenação Pedagógica", option: "Coordenação Pedagógica"},
    {key: "Pedagógico", option: "Pedagógico"},
    {key: "Secretaria", option: "Secretaria"},
    {key: "Administração", option: "Administração"},
    {key: "Financeiro", option: "Financeiro"},
    {key: "Limpeza", option: "Limpeza"},
    {key: "Cozinha", option: "Cozinha"},
    {key: "Biblioteca", option: "Biblioteca"},
    {key: "TI", option: "TI (Tecnologia da Informação)"},
    {key: "RH", option: "Recursos Humanos"},
    {key: "Serviços Gerais", option: "Serviços Gerais"},
    {key: "Supervisão Escolar", option: "Supervisão Escolar"}
  ];

  const supervisorOptions = potentialSupervisors.map(emp => ({
    key: emp.id,
    option: `${emp.user_details?.name || 'Nome não encontrado'} (${emp.position?.name || 'Cargo não encontrado'})`
  }));

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
    fetchPositions();
    fetchPotentialSupervisors();
  }, []);

  useEffect(() => {
    filterPositions();
  }, [searchTerm, positions]);

  const fetchPositions = async () => {
    const retorno = await getCargo({});
    if (retorno.status && retorno.data && retorno.data.length > 0) {
      setPositions(retorno.data);
    }
  };

  const fetchPotentialSupervisors = async () => {
    try {
      // Busca os cargos de supervisão
      const { data: positions } = await supabase
        .from('positions')
        .select('*')
        .or('departament.eq.Diretoria,departament.eq.Coordenação Pedagógica,departament.eq.Supervisão Escolar');
      
      if (positions && positions.length > 0) {
        const positionIds = positions.map(p => p.id);
        
        // Busca os funcionários
        const { data: employees, error } = await supabase
          .from('employees')
          .select('*, position:positions(name, departament)')
          .in('positions_id', positionIds);
        
        if (error) throw error;
        
        if (employees) {
          // Carrega os dados de cada usuário
          const employeesWithDetails = await Promise.all(
            employees.map(async (emp) => {
              const userResponse = await getUserById(emp.user_id);
              return {
                ...emp,
                user_details: userResponse.status ? userResponse.data : null
              };
            })
          );
          
          setPotentialSupervisors(employeesWithDetails as iEmployeeWithDetails[]);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar supervisores:", error);
    }
  };
  

  const filterPositions = () => {
    if (searchTerm === "") {
      setFilteredPositions(positions);
    } else {
      const filtered = positions.filter(position =>
        position.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.departament.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPositions(filtered);
    }
  };

  const handleRegister = async () => {
    if (req.id === -1) {
      const newId = positions.length ? positions[positions.length - 1].id + 1 : 0;
      const newPosition = { ...req, id: newId };
      const result = await setPosition(newPosition);
      if (result) {
        setPositions([...positions, newPosition]);
        setShowModal(false);
      }
    } else {
      const updated = await updatePosition(req);
      if (updated) {
        setPositions(positions.map(p => (p.id === req.id ? req : p)));
        setShowModal(false);
      }
    }
    resetForm();
  };

  const editPosition = (id: number) => {
    const position = positions.find(p => p.id === id);
    if (position) {
      setReq(position);
      setShowModal(true);
    }
  };

  const delPosition = async (id: number) => {
    const success = await deletePosition(id);
    if (success) {
      setPositions(positions.filter(p => p.id !== id));
    }
  };

  const resetForm = () => {
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
  };

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const openNewPositionModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <MyView style={{ flex: 1 }} title="Gerenciamento de Cargos">
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('adminsitration/')}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cargos</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={openNewPositionModal}
            activeOpacity={0.7}
          >
            <Icon name="add" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Novo Cargo</Text>
          </TouchableOpacity>
        </View>

        {showList && (
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar por cargo ou departamento..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
        )}

        <TouchableOpacity 
          style={styles.toggleListButton} 
          onPress={() => setShowList(!showList)}
          activeOpacity={0.7}
        >
          <Text style={styles.toggleListButtonText}>
            {showList ? "Ocultar Cargos" : "Mostrar Cargos Cadastrados"}
          </Text>
          <Icon 
            name={showList ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
            size={20} 
            color="#fff" 
          />
        </TouchableOpacity>

        {showList && (
          <View style={styles.listContainer}>
            {filteredPositions.length > 0 ? (
              filteredPositions.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.listItem}
                  onPress={() => toggleExpand(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemHeader}>
                    <Text style={styles.titleText}>{item.name}</Text>
                    <Text style={styles.salaryText}>R$ {item.salary.toFixed(2)}</Text>
                  </View>
                  <Text style={styles.departmentText}>{item.departament}</Text>
                  <Text style={styles.hoverHint}>
                    <Icon name="info-outline" size={14} color="#555" /> 
                    Clique para {expandedId === item.id ? "recolher" : "expandir"}
                  </Text>
                  
                  {expandedId === item.id && (
                    <View style={styles.expandedContent}>
                      <Text style={styles.cardText}>
                        <Text style={styles.bold}>Descrição: </Text>
                        {item.description}
                      </Text>
                      <Text style={styles.cardText}>
                        <Text style={styles.bold}>Carga horária: </Text>
                        {item.work_hours}
                      </Text>
                      <Text style={styles.cardText}>
                        <Text style={styles.bold}>Supervisor: </Text>
                        {item.supervisor}
                      </Text>
                      <Text style={styles.cardText}>
                        <Text style={styles.bold}>Criado em: </Text>
                        {new Date(item.creat_at).toLocaleDateString()}
                      </Text>
                      <View style={styles.actionButtons}>
                        <TouchableOpacity 
                          style={styles.editButton}
                          onPress={() => editPosition(item.id)}
                          activeOpacity={0.7}
                        >
                          <Icon name="edit" size={18} color="#2a9d8f" />
                          <Text style={styles.editButtonText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.deleteButton}
                          onPress={() => delPosition(item.id)}
                          activeOpacity={0.7}
                        >
                          <Icon name="delete" size={18} color="#e63946" />
                          <Text style={styles.deleteButtonText}>Excluir</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noResultsText}>Nenhum cargo encontrado</Text>
            )}
          </View>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {req.id === -1 ? "Cadastrar Novo Cargo" : "Editar Cargo"}
                </Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setShowModal(false)}
                  activeOpacity={0.7}
                >
                  <Icon name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent}>
                <Myinput
                  label="Cargo"
                  placeholder="Nome do cargo"
                  iconName="work-outline"
                  value={req.name}
                  onChangeText={(text) => setReq({ ...req, name: text })}
                />
                
                <Myinput
                  label="Descrição"
                  placeholder="Descrição das responsabilidades"
                  iconName="description"
                  value={req.description}
                  onChangeText={(text) => setReq({ ...req, description: text })}
                />
                
                <Myinput
                  label="Salário"
                  placeholder="Valor do salário"
                  iconName="attach-money"
                  value={req.salary.toString()}
                  onChangeText={(text) => setReq({ ...req, salary: Number(text) || 0 })}
                />
                
                <MyTimePicker
                  labelText="Carga Horária"
                  onTimeSelected={(time) => setReq({ ...req, work_hours: time })}
                  initialTime={req.work_hours}
                />
                
                <MySelect
                  caption="Departamento"
                  label={req.departament}
                  list={schoolDepartments}
                  setLabel={(item) => setReq({ ...req, departament: item })}
                />
                
                <MySelect
                  caption="Supervisor"
                  label={req.supervisor}
                  list={supervisorOptions}
                  setLabel={(item) => {
                    const selected = potentialSupervisors.find(
                      emp => emp.id === supervisorOptions.find(opt => opt.option === item)?.key
                    );
                    setReq({ 
                      ...req, 
                      supervisor: item,
                    });
                  }}
                />
              </ScrollView>

              <View style={styles.modalFooter}>
                <MyButton 
                  title={req.id === -1 ? "Cadastrar" : "Atualizar"} 
                  onPress={handleRegister} 
                  style={styles.saveButton}
                />
                <MyButton 
                  title="Cancelar" 
                  onPress={() => setShowModal(false)} 
                  style={styles.cancelButton}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  toggleListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A020F0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
  },
  toggleListButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
  listContainer: {
    width: '100%',
    marginTop: 10,
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  salaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
  },
  departmentText: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  hoverHint: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 8,
  },
  expandedContent: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cardText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 6,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    gap: 15,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2a9d8f',
  },
  editButtonText: {
    color: '#2a9d8f',
    marginLeft: 6,
    fontWeight: '600',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e63946',
  },
  deleteButtonText: {
    color: '#e63946',
    marginLeft: 6,
    fontWeight: '600',
  },
  noResultsText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 16,
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 500,
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f8f9fa',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 16,
    maxHeight: '70%',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
    minWidth: 120,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6c757d',
    minWidth: 120,
  }
});