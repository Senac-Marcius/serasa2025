import { View, Text, StyleSheet } from 'react-native';

export default function registerListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro realizado com sucesso!</Text>
      <Text style={styles.subtitle}>Você será redirecionado em breve, ou pode voltar ao início.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});
