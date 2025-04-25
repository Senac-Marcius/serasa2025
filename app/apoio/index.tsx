import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import MyView from '../../src/components/MyView';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const menuItems = [
    { label: 'Prontuario', route: 'apoio/records' },
    { label: 'Responsaveis', route: 'apoio/parents' },
    { label: 'Notificações', route: 'apoio/notifications' },
    { label: 'Criticidade', route: 'apoio/levels' },

];

function HorizontalMenu() {
    const navigation = useNavigation();
    const handlePress = (item: {label:string, route: string}) => {
        console.log('Clicou em:', item);
        //navigation.navigate(item.route);  Navega para a rota definida no item
    }
  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(item)}>
        <MenuItem label={item.label}/>
        <MenuItens label={item.label}/>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const MenuItens = ({ label }: { label: string }) => (
    <View style={styles.menuItem}>
      <Text>{label}</Text>
    </View>
  );

function MenuItem({ label }: { label: string }) {
    <Text>{label}</Text>
  const scale = useRef(new Animated.Value(1)).current;
  const bgColor = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1.1, useNativeDriver: true }),
      Animated.timing(bgColor, {
        toValue: 1,
        duration: 50,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.timing(bgColor, {
        toValue: 0,
        duration: 200,
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
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.menuItem, { transform: [{ scale }], backgroundColor }]}>
        <Animated.Text style={[styles.menuText, { color: textColor }]}>{label}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

// Função para gerar partículas animadas
const generateParticles = (count = 15) => {
  return Array.from({ length: count }).map((_, i) => ({
    key: `particle-${i}`,
    left: Math.random() * width,
    size: 6 + Math.random() * 10,
    duration: 3000 + Math.random() * 4000,
    delay: Math.random() * 4000,
  }));
};

export default function HomeScreen() {
  const router = useRouter();
  const particles = useRef(generateParticles()).current;
  const animations = useRef(particles.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    animations.forEach((anim, i) => {
      const loop = () => {
        anim.setValue(0);
        Animated.timing(anim, {
          toValue: 1,
          duration: particles[i].duration,
          delay: particles[i].delay,
          useNativeDriver: true,
        }).start(loop);
      };
      loop();
    });
  }, []);

  return (
    <MyView router={router} style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={StyleSheet.absoluteFill}>
        {particles.map((p, i) => (
          <Animated.View
            key={p.key}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: p.size / 2,
              backgroundColor: 'rgba(164, 36, 255, 0.3)',
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

      <View style={styles.content}>
        <Animated.Text style={styles.title}>Bem-vindo à Nova Experiência</Animated.Text>
      </View>
    </MyView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
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
    gap: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
