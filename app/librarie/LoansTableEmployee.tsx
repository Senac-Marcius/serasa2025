import React from 'react';
import { supabase } from '../../src/utils/supabase';

type Emprestimo = {
  id: number;
  aluno: string;
  livro: string;
  dataEmprestimo: string;
  dataDevolucao: string;
  
};

type Props = {
  emprestimos: Emprestimo[];
};

const TabelaFuncionarios: React.FC<Props> = ({ emprestimos }) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-2">Controle de Empréstimos (Funcionários)</h2>
      <table className="min-w-full border border-gray-300 rounded-md shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border-b">Aluno</th>
            <th className="p-2 border-b">Livro</th>
            <th className="p-2 border-b">Data de Empréstimo</th>
            <th className="p-2 border-b">Data de Devolução</th>
            <th className="p-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((e) => (
            <tr key={e.id} className="hover:bg-gray-50">
              <td className="p-2 border-b">{e.aluno}</td>
              <td className="p-2 border-b">{e.livro}</td>
              <td className="p-2 border-b">{e.dataEmprestimo}</td>
              <td className="p-2 border-b">{e.dataDevolucao}</td>
              <td>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function isAtrasado(dataDevolucao: string): boolean {
    const hoje = new Date();
    const data = new Date(dataDevolucao);
    return data < hoje;
  }
  
  export async function getEmprestimosPorAluno(usuarioId: string) {
    const { data, error } = await supabase
      .from('emprestimos')
      .select(`
        id,
        data_emprestimo,
        data_devolucao,
        status,
        livros ( titulo )
      `)
      .eq('usuario_id', usuarioId);
  
    if (error) throw error;
  
    return data.map((e: any) => {
      const estaAtrasado = isAtrasado(e.data_devolucao) && e.status === 'Em dia';
  
      return {
        id: e.id,
        livro: e.livros.titulo,
        dataEmprestimo: e.data_emprestimo,
        dataDevolucao: e.data_devolucao,
        status: estaAtrasado ? 'Atrasado' : e.status,
      };
    });
  }
  
export default TabelaFuncionarios;
