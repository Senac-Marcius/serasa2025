import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import MyView from '../../src/components/MyView';
import MyText from '../../src/components/MyText';
import MyButton from '../../src/components/MyButtons';

import { getExpense } from '../../src/controllers/expenses';

import { getBudgets } from '../../src/controllers/budgets';
import { getRevenues } from '../../src/controllers/revenues';

export default function FinanceIndex() {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [totalBudgets, setTotalBudgets] = useState(0);
  const [totalRevues, setTotalRevues] = useState(0);



  useEffect(() => {
    async function fetchAll() {
      const [e, i, b] = await Promise.all([
        getExpense({}),
      
        getBudgets({}),
        getRevenues({})
      ]);

      const sumField = (data: any[], field: 'costs' | 'value') =>
        data.reduce((acc, curr) => {
          const raw = curr[field] || '0';
          const value = parseFloat(raw.toString().replace(',', '.'));
          return acc + (isNaN(value) ? 0 : value);
        }, 0);

      if (e.status && e.data) setTotalExpenses(sumField(e.data, 'costs'));
      if (i.status && i.data) setTotalInvestments(sumField(i.data, 'value'));
      if (b.status && b.data) setTotalBudgets(sumField(b.data, 'value'));
    }

    fetchAll();
  }, []);

  const totalGeral = totalInvestments + totalBudgets + totalRevues - totalExpenses;

  return (
    <MyView>
      <ScrollView contentContainerStyle={styles.container}>
        <MyText style={styles.title}>Resumo Financeiro</MyText>

        <MyText style={styles.item}>Despesas: R$ {totalExpenses.toFixed(2)}</MyText>
        <MyText style={styles.item}>Investimentos: R$ {totalInvestments.toFixed(2)}</MyText>
        <MyText style={styles.item}>Orçamentos: R$ {totalBudgets.toFixed(2)}</MyText>
        <MyText style={styles.item}>Receitas: R$ {totalRevues.toFixed(2)}</MyText>

        <MyText style={styles.total}>Total Geral: R$ {totalGeral.toFixed(2)}</MyText>

        <MyButton title="Ir para Despesas" onPress={() =>('/expenses')} />
        <MyButton title="Ir para Investimentos" onPress={() => ('/investments')} />
        <MyButton title="Ir para Orçamentos" onPress={() => ('/budgets')} />
        <MyButton title="Ir para Receitas" onPress={() =>('/revues')} />
      </ScrollView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#4caf50',
    textAlign: 'center',
  },
});