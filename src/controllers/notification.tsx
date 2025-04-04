import React, { useState } from 'react';
import { supabase } from '../utils/supabase'

interface iNotification{
        name: string,
        url: string,
        description: string,
        classification: string,
        id: number,
        creatAt: string,
        userId: number,
    }

const[notifications, setNotifications] = useState<iNotification[]>([]);

async function setNotification(notification:iNotification){
    //aqui vem os tratamentos de regex ou do modelo de negócio antes de inserir

    const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/
    const datePattern = /^\d{4}-\d{2}-\d{2}$/

    
    if (!urlPattern.test(notification.url)){
        return "campo url deve conter o seguinte formato https://dominio."
    }

    if(!datePattern.test(notification.creatAt)){
        return "campo createAT deve conter o seguinte formato YYYY-MM-DD"
    }
    if(notification.description.length > 244){
        return "campo description deve conter ate 244 caracters"
    }
    
 
    const { data, error } = await supabase.from('notification')
    .insert([
        notification
    ])
    .select()
    
    if(error){
        //aqui vem os tratamentos da variável error


        return []
    }

    return data
}

export {setNotification, notifications, setNotifications} 