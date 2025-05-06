import React, { useState } from 'react';
import { supabase } from '../utils/supabase'


interface iRevenue{
    id: number;
    created_at: string;
    name: string;
    description: string;
    url: string;
    value: number;
    scholarship_status: string;
    discount_percentage: number;
    user_id: number;
    tipo_mensalidade: string;
    select_course: string;

}





function toListRevenues(data:iRevenue[]) {
   const resp : {key:Number,option:string}[]=[]

   data.map((r)=>{
    resp.push({key: r.id,option: r.name})
   })
   return resp
}





async function getRevenues(params:any) {
    const {data: todos, error} = await supabase.from('revenues').select();
    
    if (error)
        return {status: false, error: error}
    
    return {status:true, data: todos}
    
}

// aqui estamos carregando os alunos




async function  setRevenue(revenue:iRevenue ){
    // aqui vem os tratamnetos de regex ou do modelo de negocio antes de inserir
   
      //* Regex definitions
      const validations = {
        // ID - Números inteiros positivos (melhorado para evitar zeros à esquerda)
        id: /^[1-9]\d*$/,
        
        // Descrição - Permite mais símbolos e quebras de linha
        description: /^[\s\S]{1,500}$/,
        
        // Nome - Melhor suporte para caracteres internacionais e apóstrofos
        name: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,100}$/,
        
        // URL - Versão mais flexível que aceita mais casos reais
        url: /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
        
        // Data - Aceita frações de segundo e fusos horários
        created_at: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/,
        
        // Valor Monetário - Aceita formatos com pontos de milhar
        value: /^R?\$?\s?\d{1,3}(\.\d{3})*(,\d{2})?$/,
        
        // Status da Bolsa - Compatível com seu formato "02-Inativo"
        scholarship_status: /^(0[1-9]|1[0-2])-?\s?(Ativo|Inativo|Pendente)$/i,
        
        // Porcentagem - Melhor tratamento do símbolo %
        discount_percentage: /^(100|\d{1,2})(,\d+)?%?$/
      };
      
      // Função de validação atualizada
      function validateRevenue(revenue: iRevenue): string | null {
        if (!validations.id.test(String(revenue.id))) {
          return "ID deve ser um número inteiro positivo (ex: 1, 2, 3...)";
        }
      
        if (!validations.name.test(revenue.name)) {
          return "Nome deve conter 2-100 caracteres (letras, espaços, hífens ou apóstrofos)";
        }
      
        if (!validations.description.test(revenue.description)) {
          return "Descrição deve ter entre 1-500 caracteres (aceita pontuação e quebras de linha)";
        }
      
        if (!validations.url.test(revenue.url)) {
          return "URL inválida (formatos aceitos: http://exemplo.com ou https://exemplo.com/path)";
        }
      
        if (!validations.created_at.test(revenue.created_at)) {
          return "Data deve estar no formato ISO 8601 (ex: 2023-12-31T23:59:59)";
        }
      
       
      
        if (!validations.scholarship_status.test(revenue.scholarship_status)) {
          return "Status inválido (formatos aceitos: 'Ativo', '01-Inativo' ou '12 - Pendente')";
        }
      
        
      
        return null; // Retorna null se todas as validações passarem
      }
    

 //*

    const { data, error } = await supabase
    .from('revenues')
    .insert([revenue])
    .select()

   
   
    if (error){
 // aqui vem os tratamentos da variavel error


        return error
    }

    return data
}

async function deleteRevenue(id: number) {
    try {
        // Validação do ID
        const idRegex = /^\d+$/;
        if (!idRegex.test(String(id))) {
            return { error: { message: "ID inválido" } };
        }

        const { error } = await supabase
            .from('revenues')
            .delete()
            .eq('id', id);

        if (error) {
            return { error };
        }

        return { success: true };
        
    } catch (error) {
        return { 
            error: { 
                message: error instanceof Error ? error.message : 'Erro desconhecido' 
            } 
        };
    }
}


async function updateRevenue(revenue: iRevenue) {
    try {
        // Validações (reutilize as mesmas validações da função setRevenue)
        const idRegex = /^\d+$/;
        if (!idRegex.test(String(revenue.id))) {
            return { error: { message: "ID inválido" } };
        }

        // Adicione aqui as outras validações conforme necessário...

        const { data, error } = await supabase
            .from('revenues')
            .update( revenue
                
                // Não atualize created_at e user_id normalmente
            )
            .eq('id', revenue.id)  // Atualiza onde o ID corresponde
            .select();  // Retorna o registro atualizado

        if (error) {
            return { error };
        }

        return { data: data[0] };  // Retorna o primeiro item do array
        
    } catch (error) {
        return { 
            error: { 
                message: error instanceof Error ? error.message : 'Erro desconhecido ao atualizar' 
            } 
        };
    }
}





export {setRevenue, iRevenue, deleteRevenue, updateRevenue, getRevenues, toListRevenues,  }