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

function editNotification(id:number, req){
    
    // função edit
    const channels = supabase.channel('custom-update-channel')
    .on(
    'postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'notifications' },
    (payload) => {
        console.log('Change received!', payload)
    }
    )
    .subscribe()
}
function deleteNotification(id:number){
    // função delete
    const channels = supabase.channel('custom-delete-channel')
    .on(
    'postgres_changes',
    { event: 'DELETE', schema: 'public', table: 'notifications' },
    (payload) => {
        console.log('Change received!', payload)
    }
    )
    .subscribe()
}

export {setNotification, iNotification, editNotification, deleteNotification}