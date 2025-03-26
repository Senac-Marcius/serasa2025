import React, { ReactNode } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface AccessButtonProps {
  label: string;
  size?: number;
  color?: string;
  textColor?: string;
  onPress: () => void;
}

const AccessButton: React.FC<AccessButtonProps> = ({
  onPress,
  label,
  size = 60,
  color = '#6200ee',
  textColor = 'white',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { width: size, height: size, backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

interface MyAccessProps {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const MyAccess: React.FC<MyAccessProps> = ({ children, style }) => {
  const handleSuporte = () => {
    console.log('Botão de suporte clicado!');
  };

  return (
    <View style={[styles.container, style]}>
      {children}
      <TouchableOpacity
        style={styles.suporteButton}
        onPress={handleSuporte}
        accessible={true}
        accessibilityLabel="Botão de Suporte"
        accessibilityRole="button"
      >
        <Text style={styles.suporteText}>Accessibility</Text>
      </TouchableOpacity>
    </View>
  );
};

<FontAwesome name="universal-access" size={24} color="black" />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  suporteButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#9747FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#9747FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  suporteText: {
    color: 'white',
    fontSize: 12,
  },
});


export { MyAccess, AccessButton };
