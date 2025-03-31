import React, { useState } from 'react';
import { Switch, View, StyleSheet, Text } from 'react-native';

interface MySwitchProps{//refere-se as propriedades que meu elemento vai ter
    isEnabled: boolean;//estado inicial do botão
    onToggle: (value: boolean) => void;//o valor será verdadeiro ou falso 
}

const[isEnabled, setIsEnabled] = useState(false)

const MySwitch: React.FC< MySwitchProps >= ({isEnabled, onToggle}) => {//cria os parametros da tag e faz a tipagem FC=Factory
    return (
        <View style={styles.container}>
            <Text>{isEnabled ? 'Ligado' : 'Desligado'}</Text>
            <Switch //hard purple -- soft purple
                trackColor={{ false: '#55219A', true: '#AD6CD9' }} // Cores da trilha
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'} // Cor do botão deslizante
                onValueChange={onToggle} // Chama a função ao alternar
                value={isEnabled} // Estado do switch
            />
        </View>//encapsula o switch dentro de uma view para que ele seja usado
    );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
});

export default MySwitch //exporta o componente