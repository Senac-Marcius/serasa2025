var products = [];

function setProduct(req) {
    const idPattern = /^\d+$/; // Aceita apenas números
    const namePattern = /^.+$/; // Aceita qualquer caractere, incluindo espaços
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; // Formato de data YYYY-MM-DD
    const descriptionPattern = /^.+$/; // Aceita qualquer caractere, incluindo espaços
 
    if (!idPattern.test(req.id)) {
        return"Formato de ID inválido. O ID deve ser um número inteiro positivo."
    }
    if (!namePattern.test(req.name)) {
        return"Formato de nome inválido. O nome deve conter apenas letras, números, espaços e alguns caracteres especiais."
    }
    if (!datePattern.test(req.createAt)) {
        return"Formato de data inválido. A data deve estar no formato YYYY-MM-DD."
    }
    if (!descriptionPattern.test(req.description)) {
        return"Formato de descrição inválido. A descrição deve conter apenas letras, números, espaços e alguns caracteres especiais."
    }
    if(req.description.length > 244){
        return"Formato de descrição inválido. A descrição deve conter apenas letras, números, espaços e alguns caracteres especiais."

    }
    let p = {
        id: req.id,
        name: req.name,
        createAt: req.createAt,
        description: req.description
    };
    products.push(p)
    return "Products register"
}


function getProducts(req){
    if(products.length == 0)
        return "Nothing Register"
    
    if (req == null || req == {} ) return products
 
   
    if(req.clasule == "and"){
        return products.filter(p =>
            req.search != undefined && p.name.includes(req.search) &&
           req.description != undefined && p.description == req.description)
    }else{
        return products.filter(p => p.name.includes(req.search) || p.description == req.description)
    }
 
}//find trás somente o primeiro que encontrar. regex
 
function showProduct(id){
    return products.find(p => p.id == id)
}
 
function putProduct(req, id){
    
    let idx = products.findIndex(p => p.id == id)

    if(idx == -1) return "Nothing Register"

    products.splice(idx, 1)
 
    

    if(idx == -1) return "Não encontrado"
    if(req.description != undefined) products[idx].description = req.description
    if(req.creatAt != undefined) products[idx].creatAt = req.creatAt
    if(req.name != undefined) products[idx].name = req.name
 
    return products[idx]
 
}

function delProduct(id){
    let idx = products.findIndex(p => p.id == id)

    if(idx == -1) return "Nothing Register"

    products.splice(idx, 1) 
    return "Produto exlcuido com sucesso"
}
console.log(
    setProduct({ id: 0, name: "Porta-papel", createAt: "2000-12-31", description: "primeiro"})
)
console.log(
    setProduct({ id: 1, name: "Lixeira", createAt: "2051-12-31", description: "primeiro"})
)
console.log(
    setProduct({ id: 2, name: "porta-sabão", createAt: "2002-12-31", description: "terceiro" })
)


//let show = showProduct(0)
let productsNew = putProduct({
    description:"new position"
} , 0)
 
console.log(productsNew)
let del = delProduct(2)

console.log(del)
console.log(getProducts())  
//Faça uma função com showObjeto (nosso objeto) ela vai pesquisar no vetor pelo ID um unico objeto
//Faça um tratamento na função de put ou get