import { useState } from 'react';
import React from 'react';
import { Text, View, ViewStyle, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { FaWhatsapp } from 'react-icons/fa'; // Para web
import MyButton from './MyButtons';

interface MySupportProps {
  label?: string;
  style?: ViewStyle;
}

const MySupport: React.FC<MySupportProps> = ({ label, style }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={style}>
      {!visible && (
        <TouchableOpacity onPress={() => setVisible(true)} style={styles.supportButton}>
          <View style={styles.iconRow}>
            <FaWhatsapp style={styles.whatsappButton} size={30} color="#25D366" />
            <Text style={styles.labelText}>{label ? label : 'Suporte'}</Text>
          </View>
        </TouchableOpacity>
      )}

      {visible && (
        <View style={styles.form}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setVisible(false)}
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Nome"
            placeholderTextColor="#666"
            style={styles.input}
          />
          <TextInput
            placeholder="Telefone"
            placeholderTextColor="#666"
            style={styles.input}
          />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#666"
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              console.log('Iniciar');
              setVisible(false);
            }}
          >
            <Text style={styles.submitText}>Iniciar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  supportButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 15,
    marginLeft: 8,
    color: '#333',
    fontWeight: '600',
  },
  whatsappButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 5,
  },
  form: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: 320,
    zIndex: 100,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 15,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#333',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 'bold',
  },
});

export default MySupport;
