import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Dimensions, StyleSheet, Text, Pressable, ImageBackground, FlatList } from 'react-native';
import MyView from '../../src/components/MyView';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const menuItems = [
  { label: 'Prontuário', route: 'apoio/records' },
  { label: 'Responsável', route: 'apoio/parents' },
  { label: 'Notificações', route: 'apoio/notifications' },
  { label: 'Níveis', route: 'apoio/levels' },
];


//inicio do código do menu
function MenuItem({ label, onPress }: { label: string; onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;
  const bgColor = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1.1, useNativeDriver: true }),
      Animated.timing(bgColor, {
        toValue: 1,
        duration: 1,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.timing(bgColor, {
        toValue: 0,
        duration: 1,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const backgroundColor = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#7020E5'],
  });

  const textColor = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#111', '#fff'],
  });

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={[styles.menuItem, { transform: [{ scale }], backgroundColor }]}>
        <Animated.Text style={[styles.menuText, { color: textColor }]}>{label}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

function HorizontalMenu() {
  const navigation = useNavigation();
  const handlePress = (item: { label: string; route: string }) => {
    console.log('Clicou em:', item);
    navigation.navigate(item.route as never);  // reajuste necessário para o TypeScript evitando falha de tipagem no item e route
  };

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <MenuItem key={index} label={item.label} onPress={() => handlePress(item)} />
      ))}
    </View>
  );
}
  const generateParticles = (count = 15) => {
    return Array.from({ length: count }).map((_, i) => ({
      key: `particle-${i}`,
      left: Math.random() * width,
      size: 6 + Math.random() * 10,
      duration: 3000 + Math.random() * 4000,
      delay: Math.random() * 4000,
    }))
  }
  
  const schoolMessages = [
    { id: '1', institution: 'SENAC', message: 'Inscrições abertas para cursos técnicos 2025!' },
    { id: '2', institution: 'SENAC', message: 'Aulas presenciais retornam dia 5 de maio.' },
    { id: '3', institution: 'Serasa Experian', message: 'Campanha de capacitação profissional iniciada.' },
    { id: '4', institution: 'Serasa Experian', message: 'Workshop gratuito sobre educação financeira - inscrições abertas.' },
  ];
  

export default function HomeScreen() {
  const router = useRouter();
  const particles = useRef(generateParticles()).current
  const animations = useRef(particles.map(() => new Animated.Value(0))).current

  const [messages, setMessages] = useState(schoolMessages);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    animations.forEach((anim, i) => {
      const loop = () => {
        anim.setValue(0);
        Animated.timing(anim, {
          toValue: 1,
          duration: particles[i].duration,
          delay: particles[i].delay,
          useNativeDriver: true,
        }).start(loop)
      }
      loop()

      
    })
  },[]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <MyView router={router} style={{ flex: 1 }}>
      <ImageBackground
        source={require('../app/apoio/imagens/download.png')} // <-- sua imagem aqui!
        style={styles.backgroundImage}
        resizeMode='center'
      >
        <View style={StyleSheet.absoluteFill}>
          {particles.map((p, i) => (
            <Animated.View
              key={p.key}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                borderRadius: p.size / 2,
                backgroundColor: 'rgba(34, 152, 191, 0.9)',
                left: p.left,
                bottom: animations[i].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, height + 40],
                }),
                opacity: 0.6,
              }}
            />
          ))}
        </View>
          <HorizontalMenu />
        
        <ImageBackground>
          {/*Recados escolares aqui */}
          <View style={styles.messageContainer}>
            <Text style={styles.messageTitle}>Recados Escolares</Text>
            <Text style={styles.messageText}>
              [{messages[currentIndex].institution}] {messages[currentIndex].message}
            </Text>
          </View>
          {/* Conteúdo adicional */}
          <View style={styles.content}>
            <Animated.Text style={styles.title}>Teste de conteúdos adicionais</Animated.Text>
          </View>
        </ImageBackground>
      </ImageBackground>
    </MyView>
  );
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 26,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    
  },
  backgroundImage: {
    width: width,
    height: height,
    position:'static', // Para que a imagem ocupe toda a tela
  },
    messageContainer: {
    flex:1,
    padding: 16,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(34, 152, 191, 0.9)',
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
