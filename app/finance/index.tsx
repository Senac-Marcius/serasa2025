import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; 
import MyView from '../../src/components/MyView';
import MyText from '../../src/components/MyText';
import MyButton from '../../src/components/MyButtons';
import { getExpense } from '../../src/controllers/expenses';
import {getInvestment} from '../../src/controllers/investments'
import { getBudgets } from '../../src/controllers/budgets';
import { getRevenues } from '../../src/controllers/revenues';

export default function IndexScreen() {
  const router = useRouter();

  const [total, setTotal] = useState({
    expenses: 0,
    investments: 0,
    budgets: 0,
    revenues: 0,
  });

  useEffect(() => {
    async function loadData() {
      const [resExp, resBud, resRev, resInv] = await Promise.all([
        getExpense({}),
        getBudgets({}),
        getRevenues({}),
        getInvestment({}),
      ]);

      const sum = (arr: any[], key: string) =>
        arr.reduce((acc, item) => acc + item[key], 0);

      setTotal({
        expenses: resExp.status ? sum(resExp.data || [], 'costs') : 0,
        investments: resInv.status ? sum(resInv.data || [], 'value') : 0,
        budgets: resBud.status ? sum(resBud.data || [], 'value') : 0,
        revenues: resRev.status ? sum(resRev.data || [],  'value') : 0,
      });
    }

    loadData();
  }, []);



  return (
    <MyView style={styles.container}>
      <MyText style={styles.title}>Resumo Financeiro</MyText>

      <View style={styles.section1}>
        <MyText style={styles.label}>Receitas: R$ {total.revenues.toFixed(2)}</MyText>
        <MyButton title="Ver receitas" onPress={() => router.push('finance/revenues')} />
      </View>

      <View style={styles.section2}>
        <MyText style={styles.label}>Despesas: R$ {total.expenses.toFixed(2)}</MyText>
        <MyButton title="Ver despesas" onPress={() => router.push('finance/expenses')} />
      </View>

      <View style={styles.section3}>
        <MyText style={styles.label}>Investimentos: R$ {total.investments.toFixed(2)}</MyText>
        <MyButton title="Ver investimentos" onPress={() => router.push('finance/investments')} />
      </View>

      <View style={styles.section4}>
        <MyText style={styles.label}>Orçamentos: R$ {total.budgets.toFixed(2)}</MyText>
        <MyButton title="Ver orçamentos" onPress={() => router.push('finance/budgets')} />
      </View>

     
    </MyView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  
  
  section1: {
    backgroundColor: '#c3f091', // Verde claro de fundo
    borderLeftWidth: 4,
    borderLeftColor: '#2ecc71', // Borda lateral verde
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  
  section2: {
    backgroundColor: '#FEA1B6', // vermelho claro de fundo
    borderLeftWidth: 4,
    borderLeftColor: '#FF0000', // Borda lateral vermelho
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  section3: {
    backgroundColor: '#add8e6', // Azul claro de fundo
    borderLeftWidth: 4,
    borderLeftColor: '#0000ff', // Borda lateral Azul
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  section4: {
    backgroundColor: '#ffff9e', // Amarelo claro de fundo
    borderLeftWidth: 4,
    borderLeftColor: '#FFc222', // Borda lateral Amarelo
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
    backgroundColor: '#6c47ff',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  
  label: {
    fontSize: 18,
    color: '#333',
  },
});
