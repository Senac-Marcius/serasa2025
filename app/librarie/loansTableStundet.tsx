import React from 'react';

type Emprestimo = {
  id: number;
  livro: string;
  dataEmprestimo: string;
  dataDevolucao: string;

};

type Props = {
  emprestimos: Emprestimo[];
};


const TabelaAluno: React.FC<Props> = ({ emprestimos }) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-2">Meus Empréstimos</h2>
      <table className="min-w-full border border-gray-300 rounded-md shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border-b">Livro</th>
            <th className="p-2 border-b">Data de Empréstimo</th>
            <th className="p-2 border-b">Data de Devolução</th>
            <th className="p-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((e) => (
            <tr key={e.id} className="hover:bg-gray-50">
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

export default TabelaAluno;
