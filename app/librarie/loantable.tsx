import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Usuario } from './type';


  

interface Props{
    usuarios:[
    id: string,
    nome: string,
    email: string
];
}

const TabelaUsuarios: React.FC<Props> = ({ usuarios }) => {
    return (
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Nome</th>
            <th style={thStyle}>Email</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuarios) => (
            <tr key={usuarios.id}>
              <td style={tdStyle}>{usuarios.id}</td>
              <td style={tdStyle}>{usuarios.nome}</td>
              <td style={tdStyle}>{usuarios.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const thStyle = { border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' };
const tdStyle = { border: '1px solid #ddd', padding: '8px' };

export default TabelaUsuarios;
