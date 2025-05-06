import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, Image, StyleSheet, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import MyNotify from '../../src/components/MyNotify';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BarChart, PieChart } from 'react-native-chart-kit';


export default function librarieEmployeeScreen () {
    
    const router = useRouter();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const screenWidth = Dimensions.get('window').width;
    const logo = require('../librarie/assets/logo.jpeg');
    
    const dados = {
        totalRecursos: 8948,
        totalEmprestimos: 1050,
        pendentes: 230,
        totalUsuarios: 870,
    };

    const tipologiaResumo: Record<string, number> = {
        Livros: 6400,
        Artigos: 300,
        Revistas: 100,
        Ebooks: 950,
        Audiolivros: 430,
        Mangás: 120,
        Mapas: 50,
        Relatórios: 38,
        Outros: 560,
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

    const maisEmprestados = [
        { titulo: 'Senhor dos Anéis: A Sociedade do Anel', total: 120 },
        { titulo: 'O Pequeno Princípe', total: 98 },
        { titulo: 'Jojos', total: 76 },
        { titulo: 'Cem Anos de Solidão', total: 65 },
        { titulo: 'O Iluminado', total: 54 },
    ];

    const menuItems = [
        { label: 'Catálogo Online', icon: <Ionicons name="book-outline" size={20} color="#4A148C" />, route: 'librarie/collectionsPreview' },
        { label: 'Acervo Geral', icon: <Ionicons name="library-outline" size={20} color="#4A148C" />, route: 'librarie/librariePreview' },
        { label: 'Empréstimos', icon: <Ionicons name="document-text-outline" size={20} color="#4A148C" />, route: 'librarie/loansTableEmployees' },
        { label: 'Usuários', icon: <Ionicons name="people-outline" size={20} color="#4A148C"/>, route: 'librarie/loansTableUsers' },
    ];
    
    const cards = [
        {
          title: 'Recursos Cadastrados',
          icon: "book-outline",
          route: 'librarie/librariePreview',
          backgroundColor: '#d3cbd8',
          value: dados.totalRecursos,
        },
        {
          title: 'Recursos Emprestados',
          icon: 'arrow-up-circle-outline',
          route: 'librarie/loansTableEmployees',
          backgroundColor: '#e9e0ef',
          value: dados.totalEmprestimos,
        },
        {
          title: 'Recursos Pendentes',
          icon: 'time-outline',
          route: '',
          backgroundColor: '#d3cbd8',
          value: dados.pendentes,
        },
        {
          title: 'Total de Usuários',
          icon: 'people-outline',
          route: '',
          backgroundColor: '#e9e0ef',
          value: dados.totalUsuarios,
        },
    ];

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
                <Image source={logo} style={styles.logoImage}/>
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
                        <View style={styles.icon}>{item.icon}</View>
                        <Text style={[styles.menuText, isHovered && styles.activeText]}>
                            {item.label}
                        </Text>
                        </Pressable>
                    );
                })}
            </View>
            {/* Conteúdo */}
            <ScrollView > 
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
                    <View>
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
                                        style={[styles.card, { backgroundColor: item.backgroundColor }]} 
                                        onPress={() => item.route && router.push(item.route)}
                                    >
                                        <Ionicons name={item.icon as any} size={24} color="#4A148C" />
                                        <Text style={styles.cardTitle}>{item.title}</Text>
                                        <Text style={styles.cardValue}>{item.value.toLocaleString()}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                            <Text style={styles.sectionTitle}>Distribuição por Tipologia</Text>
                                <PieChart
                                data={dataTipologiaPie}
                                width={screenWidth - 32}
                                height={220}
                                chartConfig={{
                                    backgroundColor: '#fff',
                                    backgroundGradientFrom: '#fff',
                                    backgroundGradientTo: '#fff',
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                }}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"15"}
                                absolute
                                style={{ alignSelf: 'center' }}
                            />

                            <View style={styles.chartSection}>   
                                <Text style={styles.sectionTitle}>Top 5 Recursos Mais Emprestados</Text>
                                    {maisEmprestados.map((item, index) => (
                                        <View key={index} style={styles.tipologiaItem}>
                                            <Text style={styles.tipologiaText}>{item.titulo}</Text>
                                            <Text style={styles.tipologiaValue}>{item.total}x</Text>
                                        </View>
                                    ))}
                            </View>

                            <View style={styles.chartSection}> 

                                <Text style={styles.sectionTitle}>Empréstimos Mensais</Text>
                        
                                <BarChart
                                    data={{
                                        labels: historicoMensal.map(item => item.mes),
                                        datasets: [
                                        {
                                            data: historicoMensal.map(item => item.emprestimos),
                                            color: () => '#4A148C',
                                        },
                                        ],
                                    }}
                                    width={Dimensions.get('window').width - 250}
                                    height={220}
                                    yAxisLabel=""
                                    yAxisSuffix=""
                                    chartConfig={{
                                        backgroundGradientFrom: '#fff',
                                        backgroundGradientTo: '#fff',
                                        decimalPlaces: 0,
                                        color: (opacity = 1) => `rgba(74, 20, 140, ${opacity})`, // define a cor da barra
                                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        barPercentage: 0.5,
                                    }}
                                    verticalLabelRotation={0}
                                />
                            </View>
                        
                    </View>       
                </View>
            </ScrollView>         
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
        minWidth: '32%',
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
        fontSize: 16,
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
    logoImage: {
        width: 90,
        height: 90,
    },
    chartsContainer: {
        marginTop: 20,
    },
    chartSection: {
        marginBottom: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        elevation: 2,
    },
});