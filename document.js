//Atributos = campos de um formulário
/*documentos - prontuário/dadosalunos, informações de ocorrencias, histórico, 
declaração de matricula, boletim, diploma, atestado, RELATÓRIO - */

var documents = []

function setDocuments(req){

    // Expressões Regulares que formatam a entrada do usuário
    const idRegex = /^[0-9]+$/ // Esse input aceita apenas números positivos
    const descriptionRegex = /^.{3,}$/ // Esse input pede pelo menos 3 caracteres
    const urlRegex = /^(https?:\/\/[^\s]+)$/ // Começa com http:// ou https:// e não contém espaços
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/ // Formato YYYY-MM-DD
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


    // Validações das expressões regulares
    if (!idRegex.test(req.id)) {
        console.error("Erro: ID inválido. Deve conter apenas números positivos.")
        return
    }
    if (req.description.length > 10) {        
        return "Descrição excedeu mais de 10 caracteres!"
    }
    if (!urlRegex.test(req.url)) {
        console.error("Erro: URL inválida. Deve começar com http:// ou https://")
        return
    }
    if (!dateRegex.test(req.createAt)) {
        console.error("Erro: Data inválida. Deve estar no formato YYYY-MM-DD e ser uma data válida.")
        return
    }
    if (!emailRegex.test(req.email)){
        console.error("Erro: Email inválido. Deve estar no formato fulano@fulano.com \n Pode conter números.")
        return

    }

    let d = {//lista, registro, objAnonimo
        id: req.id,
        description: req.description,
        url: req.url,                       //http:qualquercoisa. ou https-- caso o usuário tenha q enviar algum arquivo/midia, pegar caminho de um arquivo
        createAt: req.createAt,            //data que foi criado - YYYY-MM-DD
        email: req.email,                  //
        type: req.type,                     //tipo de documento boletim, diploma, atestado, etc.
    }

    documents.push(d)                       //empurra o obj d na lista documents
    console.log("Documento adicionado!", d) //Verifica o push
}

function getDocuments(req){
    if(req == null || req == {}) return documents
    if(req.clausule == "and"){
        return documents.filter(d =>
            req.search != undefined && d.description.includes(req.search) &&  req.createAt != undefined && d.createAt > req.createAt
        )
    }else {req.clausule == "or"
        return documents.filter( d => (d.description.includes(req.search) || d.createAt > req.createAt ))
    }
    //return documents.filter( d => (d.description == req.search && d.createAt > req.createAt))
    //return documents.filter( d => (d.description.includes(req.search)||d.createAt > req.createAt ))
}

/*function showDocuments(req){ //função que se chama showDocuments ela vai pesquisar dentro do vetor o ID (ou uma coisa só usando o .find)
    return documents.find( d => (d.id == req.id))//vai retornar o id solicitado no console log caso ele exista
}*/

function showDocuments(id){ //função que se chama showDocuments ela vai pesquisar dentro do vetor o ID (ou uma coisa só usando o .find)
    return documents.find( d => (d.id == id))//vai retornar o id solicitado no console log caso ele exista
}

function putDocuments(req,id){
    let index = documents.findIndex(d => d.id == id)

    if(index == -1) return "Não encontrado"
    if(req.description != undefined) documents[index].description = req.description
    if(req.url != undefined) documents[index].url = req.url
    if(req.createAt != undefined) documents[index].createAt = req.createAt

    return documents[index]
    
}

//Campos de simulação de input
setDocuments({
    id: 0,
    description: "primeiro ano de maracá",
    url: "https://caminhodomeuarquivo.com",    //caso o usuário tenha q enviar algum arquivo/midia, pegar caminho de um arquivo
    createAt: "2000-01-31",                  //data que foi criado
    email: "luiza@gmail.com",
    //type: req.type                         //tipo de documento boletim, diploma, atestado, etc.
})

setDocuments({
    id: 1,
    description: "primeiro caristia",
    url: "http://caminhodomeuarquivo.com",    //caso o usuário tenha q enviar algum arquivo/midia, pegar caminho de um arquivo
    createAt: "2001-02-31",                  //data que foi criado
    email: "luizinha08@gmail.com",
    //type: req.type                         //tipo de documento boletim, diploma, atestado, etc.
})

setDocuments({
    id: 2,
    description: "terceiro",
    url: "http://caminhodomeuarquivo.com",    //caso o usuário tenha q enviar algum arquivo/midia, pegar caminho de um arquivo
    createAt: "2002-03-30",                  //data que foi criado
    email: "01481518 @gmail12",
    //type: req.type,                         //tipo de documento boletim, diploma, atestado, etc.
})

// Outros 
let result = getDocuments({
    search: "primeiro",
    description: "terceiro",
    createAt: "2000-01-31",
    clausule: "or",
    
})

let documentAtual = putDocuments({
    description: "terceiro lua",
    
},1)

//let show = showPost(1)
//console.log(showDocuments({id:1}))
//console.log(result)
//console.log(show)
//console.log(documentAtual)
console.log("\n\nDocumentos salvos", documents) // console log dos tratamentos de regex

