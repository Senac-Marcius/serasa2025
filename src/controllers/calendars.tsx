import React, { useState } from 'react';
import { supabase } from '../utils/supabase';

//iCalendar
interface iCalendar {
    studentname: string;
    course: string;
    registrationdate: string;
    period: string;
    id: number;
    created_at: string;
}

const [calendars, setCalendars] = useState<iCalendar[]>([]);

// adiciona um calendário e trata os erros
async function setCalendarsData(calendar: iCalendar) {
    const { data, error } = await supabase.from('calendars')
        .insert([calendar])
        .select();

    // Tratamento de erros
    if (error) {
        alert('Preencha todos os dados!');
        return null; // Retorna null em caso de erro
    }

    // Atualiza o estado com os novos dados do calendário
    setCalendars((prevCalendars) => [...prevCalendars, ...data]);

    return data;
}

export { setCalendars };


