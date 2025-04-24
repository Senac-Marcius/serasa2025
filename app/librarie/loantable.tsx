import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Usuario } from './type';
import { iLoans } from '../../src/controllers/loans';

  

type Props = {
  data: iLoans[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};


const TabelaUsuarios: React.FC<Props> = ({ data, onEdit, onDelete }) => {
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
        {data.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{loan.bookId}</td>
                  <td>{loan.loanDate}</td>
                  <td>{loan.expectedLoanDate}</td>
                  <td>{loan.effectiveLoanDate}</td>
                  <td>{loan.renewal}</td>
                  <td>{loan.statusLoan}</td>
                  <td>{loan.observation}</td>
                  <td>
                    <button onClick={() => onEdit(loan.id)}>Editar</button>
                    <button onClick={() => onDelete(loan.id)}>Deletar</button>
                </td>
              </tr>
))}
        </tbody>
      </table>
    );
  };

  const thStyle = { border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' };
const tdStyle = { border: '1px solid #ddd', padding: '8px' };

export default TabelaUsuarios;
