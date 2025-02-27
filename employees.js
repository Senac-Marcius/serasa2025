console.clear
var employees = []
 
function setEmployee(req){

        const urlsPattern = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+[/#?]?.*$/ // URLs válidas
        const tellPattern = /^\(\d{2}\)\s\d{4,5}-\d{4}$/ // Formato de telefone (XX)XXXXX-XXXX
        const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/ // E-mail válido
        const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ // CPF no formato 000.000.000-00
        const datePattern = /^\d{4}\/\d{2}\/\d{2}$/;
        
        if(!urlsPattern.test(req.urls))return "Campo URls deve conter apenas URLs válidas "
        if(!datePattern.test(req.age))return "Campo Age deve conter apenas números e ter a idade mínima de 18"
        if(!tellPattern.test(req.tell))return "Campo Tell deve seguir o formato de telefone (XX)XXXXX-XXXX"
        if(!emailPattern.test(req.email))return "Campo email deve ter um e-mail válido "
        if(!cpfPattern.test(req.cpf))return "Campo CPF deve estar no formato 000.000.000-00 "
        if(!datePattern.test(req.createAt))return "Campo deve estar no formato YYYY-MM-DD"

    let e =  {
        id: req.id,
        urls: req.urls,
        name: req.name,
        age: req.age,
        tell: req.tell,
        email: req.email,
        address: req.address,
        nationality: req.nationality,
        discPersonality: req.discPersonality,
        cpf: req.cpf,
        sex: req.sex,
        maritalStatus: req.maritalStatus,
        position: req.position,
        ethnicity: req.ethnicity,
        deficiency: req.deficiency,
        createAt : req.createAt,
        isActive: req.isActive
    }
    console.log("Usuario Adicionado")
    employees.push(e)
}
function getEmployyes(req){
     if(employees.length == 0)return "Não ha usuarios para mostrar"
    if(req == null || req == {})return employees

    if(req.clasule == "and")return employees.filter(e =>
        req.name != undefined && e.name.includes(req.name) && 
        req.isActive != undefined && e.isActive == req.isActive && 
        req.cpf != undefined && e.cpf == req.cpf && 
        req.tell != undefined && e.tell == req.tell
    )
    else return employees.filter(e => 
        e.name.includes(req.name) || 
        e.isActive == req.isActive || 
        e.cpf == req.cpf || 
        e.tell == req.tell
    )   
}
function showEmployye(id){
     if(employees.length == 0)return "Não ha usuarios para mostrar"
    return employees.find(e => e.id == id)
}
function putEmployye(req, id){

    if(employees.length == 0)return "Não ha usuarios para alterar"
    let idx = employees.findIndex(e => e.id == id)

    //operador ternario
    //employees[idx].age = (req.age != undefined)? req.age : employees[idx].age;

    req.name != undefined && (employees[idx].name = req.name)
    req.age != undefined && (employees[idx].age = req.age)
    req.tell != undefined && (employees[idx].tell = req.tell)
    req.email != undefined && (employees[idx].email = req.email)
    req.address != undefined && (employees[idx].address = req.address)
    req.position != undefined && (employees[idx].position = req.position)
    req.isActive != undefined && (employees[idx].isActive = req.isActive)
   
    return employees[idx]
}
function deleteEmployee(id){
    if(employees.length == 0)return "Não ha usuarios para deletar"
    let idx = employees.findIndex(e => e.id == id)
    employees.splice(idx,1)
    return "Usuario deletado"
}

//daqui pra baixo virar codigo pra tela 

setEmployee({
    id: 1,
    urls: "http://caminho.com.br",
    name: "Bruno",
    age: 22,
    tell: "(16) 99721-5878",
    email: "brunoAtaide2002@gmail.com",
    address: "rua Afonso Botelho de abreu",
    nationality: "Brasileiro",
    discPersonality: "Dominante",
    cpf: "565.000.756-58",
    sex: "masculino",
    maritalStatus: "solteiro",
    position: "indefirido",
    ethnicity: "pardo",
    deficiency: false,
    createAt : "1990-08-12",
    isActive: true
})
/*setEmployee({
    id: 1,
    urls: "http://caminho",
    name: "Bruna",
    age: 33,
    tell: 16997215978,
    email: "bruna2002@gmail.com",
    address: "rua Afonso B",
    nationality: "Chinesa",
    discPersonality: "Influenciadora",
    cpf: "45890065075",
    sex: "feminino",
    maritalStatus: "solteiro",
    position: "indefirido",
    ethnicity: "branca",
    deficiency: true,
    createAt : "2002-08-12",
    isActive: false
})
setEmployee({
    id: 2,
    urls: "http://caminho",
    name: "Marcio",
    age: 22,
    tell: 16997214578,
    email: "marcio2002@gmail.com",
    address: "rua Afonso Botelho de abreu",
    nationality: "Afegão",
    discPersonality: "Conciliador",
    cpf: "89678902224",
    sex: "masculino",
    maritalStatus: "casado",
    position: "indefirido",
    ethnicity: "negro",
    deficiency: false,
    createAt : "2022-08-12",
    isActive: true
})
setEmployee({
    id: 0,
    urls: "http://caminho",
    name: "Brune",
    age: 22,
    tell: 16997215878,
    email: "brunoAtaide2002@gmail.com",
    address: "rua Afonso Botelho de abreu",
    nationality: "Brasileiro",
    discPersonality: "Dominante",
    cpf: "56500075658",
    sex: "masculino",
    maritalStatus: "solteiro",
    position: "indefirido",
    ethnicity: "pardo",
    deficiency: false,
    createAt : "1990-08-12",
    isActive: false
}) 
console.log(setEmployee({
    id: 8,
    urls: "https://caminho.com.br",
    name: "Bruno",
    age: 25,
    tell:"15999987587",
    email: "brunoAtaide2002@gmail.com",
    address: "rua Afonso Botelho de abreu",
    nationality: "Brasileiro",
    discPersonality: "Dominante",
    cpf: "565.000.756",
    sex: "masculino",
    maritalStatus: "solteiro",
    position: "indefirido",
    ethnicity: "pardo",
    deficiency: false,
    createAt : "1990-08-12",
    isActive: false
}))

/*let result = getEmployyes({
    name:"Bruno",
    clasule:"or"
})*/
console.log(deleteEmployee(1))



/*let employeesAlte = putEmployye({
        name: "Brunete",
        age: 45 ,
        tell: 16997858,
        email: "sabrunokiller@gmail.com" 
},0)*/
