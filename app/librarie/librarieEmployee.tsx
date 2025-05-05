import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import { getItems, iItem, setItem, deleteItemById, updateItemById, } from '../../src/controllers/librarie';
import { iUser } from '../../src/controllers/users';
import { iLoans } from '../../src/controllers/loans';
import MyNotify from '../../src/components/MyNotify';
import { MyModal } from '../../src/components/MyModal';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/utils/supabase';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';



export default function librarieEmployeeScreen () {
    
    const router = useRouter();
    const [recursos, setRecursos] = useState<iItem[]>([]);
    const [usuarios, setUsuarios] = useState<iUser[]>([]);
    const [emprestimos, setEmprestimos] = useState<iLoans[]>([]);
    const [loading, setLoading] = useState(true);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const dados = {
        totalRecursos: 12350,
        totalEmprestimos: 1050,
        pendentes: 230,
        totalUsuarios: 5870,
    };
    
    const historicoMensal = [
        { mes: 'Jan', emprestimos: 820, devolucoes: 790 },
        { mes: 'Fev', emprestimos: 870, devolucoes: 850 },
        { mes: 'Mar', emprestimos: 950, devolucoes: 920 },
        { mes: 'Abr', emprestimos: 1100, devolucoes: 1080 },
        { mes: 'Mai', emprestimos: 980, devolucoes: 950 },
        { mes: 'Jun', emprestimos: 1250, devolucoes: 1210 },
        { mes: 'Jul', emprestimos: 1150, devolucoes: 1120 },
        { mes: 'Ago', emprestimos: 890, devolucoes: 880 },
    ];

    const menuItems = [
        { label: 'Catálogo Online', iconName: 'book-outline', route: '' },
        { label: 'Acervo Geral', iconName: 'library-outline', route: '' },
        { label: 'Empréstimos', iconName: '', route: '' },
        { label: 'Usuários', iconName: 'people-outline', route: '' },
    ];

    useEffect(() => {
        const fetchDados = async () => {
          try {
            const { data: recursosData } = await supabase.from('librarie_items').select('*');
            const { data: usuariosData } = await supabase.from('users').select('*');
            const { data: emprestimosData } = await supabase.from('loans').select('*');
            
            setRecursos(recursosData || []);
            setUsuarios(usuariosData || []);
            setEmprestimos(emprestimosData || []);
          } catch (error) {
            console.error('Erro ao buscar dados:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchDados();
    }, []);

    if (loading) {
    return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#4A148C" />
        </View>
    );
    }

    const totalRecursos = recursos.length;
    const totalUsuarios = usuarios.length;
    const emprestados = emprestimos.filter(e => e.statusLoan === 'emprestado').length;
    const pendentes = emprestimos.filter(e => e.statusLoan === 'pendente').length;
    
    const cards = [
        {
          title: 'Recursos Cadastrados',
          icon: "book",
          route: 'librarie/librariePreview',
          bgColor: '#d3cbd8',
          value: totalRecursos,
        },
        {
          title: 'Recursos Emprestados',
          icon: 'arrow-up-circle',
          route: 'librarie/loans',
          bgColor: '#e9e0ef',
          value: emprestados,
        },
        {
          title: 'Recursos Pendentes',
          icon: 'time',
          route: '',
          bgColor: '#d3cbd8',
          value: pendentes,
        },
        {
          title: 'Total de Usuários',
          icon: 'people',
          route: '',
          bgColor: '#e9e0ef',
          value: totalUsuarios,
        },
    ];
    
    const tipologiaResumo = recursos.reduce((acc: Record<string, number>, curr) => {
        acc[curr.typology] = (acc[curr.typology] || 0) + 1;
        return acc;
    }, {});

    const screenWidth = Dimensions.get('window').width;

    const dataEmprestimos = {
    labels: historicoMensal.map(item => item.mes),
    datasets: [
        {
        data: historicoMensal.map(item => item.emprestimos),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // cor da barra
        }
    ]
    };

    const cores = [
        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
      ];
      
    const dataTipologiaPie = Object.entries(tipologiaResumo).map(([tipo, quantidade], index) => ({
    name: tipo,
    population: quantidade,
    color: cores[index % cores.length],
    legendFontColor: "#333",
    legendFontSize: 12,
    }));

    return (
        <View style={styles.page}>
            {/* Sidebar */}
            <View style={styles.sidebar}>
                <View style={styles.logoContainer}>
                <Image source={{ uri: './assets/favicon.png' }}/>
                <Text style={styles.logoTitle}>Virtudemy</Text>
                <Text style={styles.logoSubtitle}>Biblioteca</Text>
                </View>

                {menuItems.map((item, index) => {
                const isHovered = hoveredItem === item.route;
                    return (
                        <Pressable
                        key={index}
                        onHoverIn={() => setHoveredItem(item.route)}
                        onHoverOut={() => setHoveredItem(null)}
                        onPress={() => router.push(item.route)}
                        style={[styles.menuItem, isHovered && styles.activeItem]}
                        >
                        <View style={styles.icon}>{item.iconName}</View>
                        <Text style={[styles.menuText, isHovered && styles.activeText]}>
                            {item.label}
                        </Text>
                        </Pressable>
                    );
                })}
            </View>
            {/* Conteúdo */}  
            <View style={styles.mainContent}  >      
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                            <Ionicons name="arrow-back" size={20} color="#4A148C" />
                        </TouchableOpacity>
                    </View>
        
                    <Text style={styles.headerTitle}>VISÃO GERAL</Text>
        
                    <View style={styles.headerRight}>  
                        <MyNotify style={styles.iconButton} />
                        <TouchableOpacity onPress={() => router.push('/perfil')} style={styles.avatarButton}>
                            <Image source={{ uri: 'https://i.pravatar.cc/150?img=1' }} style={styles.avatar} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.content}>
                    {/* Cards */}
                    <View style={styles.gridContainer}>
                        <FlatList
                            data={cards}
                            keyExtractor={(item) => item.title}
                            contentContainerStyle={styles.grid}
                            numColumns={4}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={[styles.card, { backgroundColor: item.bgColor }]} 
                                    onPress={() => item.route && router.push(item.route)}
                                >
                                    <Ionicons name={item.icon as any} size={24} color="#4A148C" />
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                    <Text style={styles.cardValue}>{item.value.toLocaleString()}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    {/* Seção de Tipologia */}
                    <View style={styles.section}>

                        <Text style={styles.sectionTitle}>Gráfico por Tipologia</Text>
                        <PieChart
                        data={dataTipologiaPie}
                        width={screenWidth - 32}
                        height={220}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        chartConfig={{
                            backgroundColor: "#fff",
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        absolute
                        style={{
                            marginVertical: 8,
                            alignSelf: 'center',
                        }}
                        />


                        <Text style={styles.sectionTitle}>Empréstimos Mensais</Text>
                        <BarChart
                            data={dataEmprestimos}
                            width={screenWidth - 32}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={{
                                backgroundGradientFrom: "#fff",
                                backgroundGradientTo: "#fff",
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                borderRadius: 16,
                                },
                            }}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                                alignSelf: 'center',
                            }}
                        />


                    </View> 
                </ScrollView>       
            </View>    
        </View>       
    );       
}           
   
const styles = StyleSheet.create({

    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    page: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F2F2F2'
    },
    sidebar: {
        width: 180,
        backgroundColor: '#fff',
        paddingTop: 12,
        paddingHorizontal: 12,
        borderRightWidth: 1,
        borderRightColor: '#eee',
    },
    logoContainer: { 
        alignItems: 'center',
        marginBottom: 24 
    },
    logoTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#4A148C', 
        marginTop: 6 
    },
    logoSubtitle: { 
        fontSize: 11, 
        color: '#4A148C' 
    },
    menuItem: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: 8,
        paddingVertical: 6, 
        paddingHorizontal: 8, 
        borderRadius: 8,
    },
    mainContent: { 
        flex: 1 
    },
    menuText: { 
        fontSize: 13, 
        color: '#555' 
    },
    activeItem: { 
        backgroundColor: '#E6F9F5', 
        borderLeftWidth: 4, 
        borderLeftColor: '#b34db2' 
    },
    activeText: { 
        color: '#b34db2', 
        fontWeight: '600' 
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50, 
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        //height: 50, 
    },
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        //height: 50, 
    },
    icon: { marginRight: 10 },
    headerTitle: {
        color: '#4A148C',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    iconButton: {
        backgroundColor: '#ecdef0',
        padding: 8,
        borderRadius: 20,
        marginHorizontal: 4,
    },
    avatarButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        overflow: 'hidden',
        marginLeft: 8,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    content: { flexGrow: 1, padding: 24, backgroundColor: '#F2F3F5' },
    gridContainer: {
        flexGrow: 1, 
        backgroundColor: '#F2F3F5',
        padding: 24,
    },
    grid: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: 20, 
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    card: {
        flex: 1,
        minWidth: '40%',
        margin: 4,
        padding: 24,
        borderRadius: 12,
        alignItems: 'flex-start', 
        elevation: 2, 
        shadowColor: '#000', 
        shadowOpacity: 0.05, 
        shadowRadius: 10,
        justifyContent: 'center', 
        gap: 8,
    },
    cardTitle: {
        fontSize: 14,
        marginTop: 8,
        color: '#555',
    },
    cardValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 4,
        color: '#4A148C',
    },
    section: {
        padding: 16,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#4A148C',
    },
    tipologiaItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tipologiaText: {
        fontSize: 16,
        color: '#555',
    },
    tipologiaValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4A148C',
    },
});