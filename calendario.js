var calendarios  = []
 
function setCalendarios(req){
    let c = {
        id:req.id,
        description: req.description,
        url: req.url,
        createAt: req.createAt,
        userId: req.userId,
        reunioes: req.reunioes,
   
    }
   
 
    calendarios.push(c)
}
 
function showCalendarios(req){
    return calendarios.find (c=> (c.id ==req.id ))
 
}
 
function getCalendarios(req){
    if (req.clausule == "and"){
        return calendarios.filter(c => req.search != undefined && c.description.includes(req.search) && req.reunioes !=undefined && putCalendario.reunioes > req.reunioes

            (c.description == req.search && c.reunioes > req.reunioes && c.description.includes(req.search) ) )
    }else if(req.clausule == "or"){
        return calendarios.filter(c => (c.description == req.search || c.reunioes > req.reunioes || c.description.includes(req.search) ) )
 
    }
}
 
function putCalendario(req,id){ 
   
    let idx = calendarios.findIndex(c => c.id == id)    
    
    if (idx == -1) return "Não encontrado"

    if(req.description != undefined) calendarios[idx].description = req.description
    if( req.url != undefined) calendarios[idx].url = req.url
    if( req.createAt != undefined) calendarios[idx]. createAt = req.createAt
    if( req.userId != undefined) calendarios[idx].userId = req.userId

    return calendarios [idx]

}

setCalendarios({
    id: 0,
    description: "primeiro",
    url: "https://calendariodereunioes.com",
    createAt: "2000-01-31",
    userId: 0,
    reunioes: "2025-02-20"
 
 
})
 
setCalendarios({
    id: 1,
    description: "esse",
    url: "https://calendariodereunioes.com",
    createAt: "2000-01-31",
    userId: 0,
    reunioes: "2025-02-25"
 })
 
let result = getCalendarios({
    search:"primeiro",
    reunioes:"2025-02-20",
    clausule: "or"
 
})
 


let show = showCalendarios (1)
let calendarioAlterado = putCalendario({
} , 1)

//console.log (result)
//console.log showCalendarios(0)
console.log (calendarioAlterado)


