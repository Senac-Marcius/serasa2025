import { supabase } from '../utils/supabase'


interface iNotification{
        name: string,
        url: string,
        description: string,
        id: number,
        created_at: string,
        user_id: number,
    };

async function setNotification(notification:iNotification){
    //aqui vem os tratamentos de regex ou do modelo de negócio antes de inserir

    //const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/
    //const datePattern = /^\d{4}-\d{2}-\d{2}$/

    
   /* if (!urlPattern.test(notification.url)){
        return "campo url deve conter o seguinte formato https://dominio."
    }*/

   /* if(!datePattern.test(notification.created_at)){
        return "campo createAT deve conter o seguinte formato YYYY-MM-DD"
    }*/

   /* if(notification.description.length > 244){
        return "campo description deve conter ate 244 caracters"
    }*/
 
    const { data, error } = await supabase.from('notifications')
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

 async function getNotifications(params:any) {
    const { data:todos, error } = await supabase.from('notifications').select();
 
    if (error) 
        return {status: false, erro: error}
 
    return {status:true, data: todos}
}

async function updateNotification(notification: iNotification) {
    const { error } = await supabase
        .from('notifications')
        .update({
            name: notification.name,
            description: notification.description,
            user_id: notification.user_id,
            created_at: notification.created_at,
            url: notification.url,

        })
        .eq('id', notification.id);
 
    return error;
}

async function deleteNotification(id: number) {
    const { error } = await supabase.from('notifications').delete().eq('id', id);
    return error;
}

export {setNotification, iNotification, deleteNotification, updateNotification, getNotifications}