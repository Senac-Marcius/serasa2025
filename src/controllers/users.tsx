import { supabase } from '../utils/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface iUser {
    name: string,
    password: string,
    cpf: string,
    age: string,
    contact: string,
    email: string,
    address: string,
    createAt: string,
    id: number,
}

async function getUserByEmail(email: string) {
    const { data: users, error } = await supabase.from("users").select().eq('email', email);
    if (error) {
        return { status: false, error: error };
    }
    if (users && users.length > 0) {
        const user = users[0];
        const userData: iUser = {
            name: user.name,
            password: user.password,
            cpf: user.cpf,
            age: user.age,
            contact: user.contact,
            email: user.email,
            address: user.address,
            createAt: user.createAt,
            id: user.id
        };
        return { status: true, data: userData };
    } else {
        return { status: false, error: "Usuário não encontrado" };
    }
}

async function getUserById(id: number) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        return { status: true, data };
    } catch (error) {
        alert('Erro ao buscar usuário por ID.');
        return { status: false, data: null };
    }
}


function toListUser(data: iUser[]) {
    const resp: { key: number, option: string }[] = [];
    data.map((u) => {
        resp.push({ key: u.id, option: u.name })
    })
    return resp;
}

//const [users, setUsers] = useState<iUser[]>([])

async function setUser(user: iUser) {
    const { data, error } = await supabase.from('users').insert([user]).select()
    if (error) {
        //aqui vem os tratamentos da varíavel error
        console.log('erro', error)
    }

    return data
}

async function deleteUserById(id: number) {
    const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
    if (error) {
        console.error("Erro ao deletar usuário:")
        return false
    }

    return true
}

async function updateUserById(id: number, updatedUser: Partial<iUser>) {
    const { error } = await supabase
        .from('users')
        .update(updatedUser)
        .eq('id', id);

    if (error) {
        console.error("Erro ao atualizar usuário:", error.message);
        return false;
    }
    return true;
}

async function getUsers(params: any) {
    const { data: todos, error } = await supabase.from("users").select();
    if (error)
        return { status: false, error: error }

    return { status: true, data: todos }
}

async function isStudent() {
    const userId = await getLoggedUserId();
    if(userId != null){
        try {
            const { data: todos, error } = await supabase
              .from("students")
              .select("*")
              .eq("user_id", userId);
      
            if (error) {
              console.error("Erro ao consultar a tabela students:", error);
              return false;
            }
      
            if (todos && todos.length > 0) {
              return true;
            } else {
              return false;
            }
          } catch (erro) {
            console.error("Erro ao fazer a consulta:", erro);
            return false;
          }
    }else{
        alert("Nenhum usuário logado!");
    }
}

async function isEmployee() {
    const userId = await getLoggedUserId();
    if(userId != null){
        try {
            const { data: todos, error } = await supabase
              .from("employees")
              .select("*")
              .eq("user_id", userId);
      
            if (error) {
              console.error("Erro ao consultar a tabela employees:", error);
              return false;
            }
      
            if (todos && todos.length > 0) {
              return true;
            } else {
              return false;
            }
          } catch (erro) {
            console.error("Erro ao fazer a consulta:", erro);
            return false;
          }
    }else{
        alert("Nenhum usuário logado!");
    }
}

async function getLoggedUserId() {
    try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId !== null) {
            return userId;
        } else {
            return null;
        }
    } catch (error) {
        alert('Erro ao recuperar o userId');
        return null;
    }
}

export { setUser, iUser, deleteUserById, updateUserById, getUsers, getUserByEmail, isStudent, isEmployee, getUserById }