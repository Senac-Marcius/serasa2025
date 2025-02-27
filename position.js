var positions = []

function setPositions(req){

    const idpattern = /^\d+$/;
    const datepattern = /^\d{4}-\d{2}-\d{2}$/;
    const urlpattern = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if(!idpattern.test(req.id)){
        return "O campo ID deve conter apenas números"
    }

    if(!datepattern.test(req.creatAt)){
        return "O campo data deve conter o seguinte formato YYYY-MM-DD"
    }

    if(!urlpattern.test(req.url)){
        return "O campo url deve conter o seguinte formato: https://dominio."
    }

    if(req.description.length > 900){
        return "O campo description deve conter até 900 caracters."

    }

    let p = {
        id: req.id, 
        name: req.name,
        description: req.description,
        salary: req.salary,
        workHours: req.workHours,
        department: req.department,
        supervisor: req.supervisor,
        creatAt: req.creatAt,
        url: req.url

    }

   

    positions.push(p)
    return "Cadastrado com sucesso!"
}


function getPositions(req){
    if(positions.length == 0) return "Lista vazia"

    if(req == null || req == {} ) return positions

    if(req.clasule == "and"){
        return positions.filter(p => 
        req.search != undefined && p.description.includes(req.search) &&
        req.name != undefined && p.name == req.name && 
        req.department != undefined && p.department == req.department 
    )
    }else{
        return positions.filter(p => req.search != undefined && (p.description.includes(req.search) || p.name == req.name))
    }
}

function showPosition(id){
    if(positions.length == 0) return "Insira um cargo existente"

    return positions.find(p => p.id == id)
} 

function putPosition(req, id){
    let idx = positions.findIndex(p => p.id == id)

    if(idx == -1) return "Não encontrado"

    if(req.description != undefined) positions[idx].description = req.description
    if(req.name != undefined) positions[idx].name = req.name
    if(req.salary != undefined) positions[idx].salary = req.salary
    if(req.workHours != undefined) positions[idx].workHours = req.workHours
    if(req.department != undefined) positions[idx].department = req.department
    if(req.supervisor != undefined) positions[idx].supervisor = req.supervisor
    if(req.creatAt != undefined) positions[idx].creatAt = req.creatAt
    if(req.url != undefined) positions[idx].url = req.url

    return positions[idx]
    
}

function delpositions(id){
    let idx = positions.findIndex(p => p.id == id)

    if(idx == -1) return "Não encontrado"

    positions.splice(idx, 1)
    return "Excluido com sucesso!"
}

setPositions({
    id: 0,
    name: "Diretor",
    description: "Responsável pela gestão geral da escola, administração, planejamento estratégico e supervisão de todas as atividades escolares.",
    salary: "R$ 12.000,00",
    workHours: "8 Horas",
    department: "Diretoria",
    supervisor: "Matriz",
    creatAt: "2023-01-24",
    url: "https://escola.com"
})


setPositions({
    id: 1,
    name: "Coordenador",
    description: "Atua na supervisão e orientação dos professores, na organização do currículo e no desenvolvimento de projetos pedagógicos. E responsável por coordenar professores de uma área específica, como matemática, ciências ou línguas.",
    salary: "R$ 7.000,00",
    workHours: "8 Horas",
    department: "Coordenação",
    supervisor: "Diretoria",
    creatAt: "2023-01-15",
    url: "https://escola.com"
})


setPositions({
    id: 2,
    name: "Professor",
    description: "Ministrar aulas e passar o conhecimento da matéria. Avaliar os alunos por meio das correções de provas ou exercícios. Criar novos conteúdos. Preparar aulas e planejar o curso de acordo com as diretrizes educacionais. Manter o registro das atividades de classe e delas prestar contas quando solicitado. Avaliar sistematicamente o seu trabalho e o aproveitamento dos alunos. Exercer a coordenação de matérias. Integra-se aos órgãos complementares da escola. Participar da elaboração, implementação e avaliação do projeto político-pedagógico da unidade educacional.",
    salary: "R$ 6.000,00",
    workHours: "8 Horas",
    department: "Informática",
    supervisor: "Diretoria",
    creatAt: "2025-01-08",
    url: "https://escola.com"
})


setPositions({
    id: 3,
    name: "Secretária",
    description: "Organiza a parte administrativa da escola, como matrícula, registros de notas, documentos dos alunos e comunicação com pais e responsáveis. E Auxilia em diversas funções administrativas, como controle de documentos e atendimento a pais e alunos.",
    salary: "R$ 3.000,00",
    workHours: "8 Horas",
    department: "Secretaria",
    supervisor: "Diretoria",
    creatAt: "2025-01-05",
    url: "https://escola.com"
})

setPositions({
    id: 4,
    name: "Serviços gerais",
    description: "Responsável pela limpeza e conservação da escola. E  Cuida da manutenção física do ambiente escolar, garantindo que as instalações estejam adequadas.",
    salary: "R$ 2.200,00",
    workHours: "8 Horas",
    department: "Secretaria",
    supervisor: "Diretoria",
    creatAt: "2025-01-01",
    url: "https://escola.com"
})

let result = getPositions({
    name: "Diretor", department: "Diretoria",
    clasule: "and"
})

let positionAlterado = putPosition({
    workHours: "9 Horas"
},1)


let resultId = showPosition(0)
console.log(delpositions(4))
