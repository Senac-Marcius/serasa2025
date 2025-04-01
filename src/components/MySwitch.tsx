import React, { useState } from 'react';
import { Switch, View, StyleSheet, Text } from 'react-native';

interface MySwitchProps{//refere-se as propriedades que meu elemento vai ter
    isEnabled: boolean;//estado inicial do botão
    onToggle: (value: boolean) => void;//o valor será verdadeiro ou falso 
}


const MySwitch: React.FC< MySwitchProps >= ({isEnabled, onToggle}) => {//cria os parametros da tag e faz a tipagem FC=Factory
    return (
        <View style={styles.container}>
            <Text>{isEnabled ? 'Ligado' : 'Desligado'}</Text>
            <Switch //soft purple -- hard purple
                trackColor={{ false: '#D5BAE7', true: '#813AB1'}} // Cores da trilha
                thumbColor= {'#000000'} // Cor da bolinha deslizante
                onValueChange={onToggle} // Chama a função ao alternar
                value={isEnabled} // Estado do switch
                style={styles.switch} // Aplica estilos extras
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
    switch: {
        borderRadius: 20, // Força bordas arredondadas
        overflow: 'hidden', // Impede que o navegador sobrescreva estilos
    },
});

export default MySwitch //exporta o componente