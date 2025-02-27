var classes = []

function setClass(req){
   const nameRegex = /^[A-Za-z\s]+$/; 
   const idRegex =  /^[0-9]\d *$/;
   const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
   

    if(!nameRegex.test(req.name)) return "Nome inválido, deve conter apenas letras e espaços"
    if(!idRegex.test(req.id)) return "Id inválido, deve conter apenas números"
    if(!idRegex.test(req.userId)) return "Id do usuário inválido, deve conter apenas números"
    if(!idRegex.test(req.quant)) return "Quantidade de alunos inválida, deve conter apenas números"
    if(!dateRegex.test(req.createAt)) return "Data de criação inválida, deve estar no formato yyyy-mm-dd"   
    if(!dateRegex.test(req.startDate)) return "Data de início inválida, deve estar no formato yyyy-mm-dd"
    if(!dateRegex.test(req.endDate)) return "Data de término inválida, deve estar no formato yyyy-mm-dd"
   
   
    let c = {
        name: req.name, 
        id: req.id,
        userId: req.userId,
        quant: req.quant,
        createAt: req.createAt,
        startDate:req.startDate,
        endDate: req.endDate
        
    }
    
    classes.push(c)

}

function getClasses(req){
   if(classes.length == 0) return " Lista vazia"
   
    if( req == null || req == {})return classes
    
    if(req.clasule == "and"){
        return classes.filter(c => req.name != undefined && c.names.includes(req.name) && req.userId != undefined && c.userId == req.userId)
    }else{
        return classes.filter(c => c.name.includes(req.name) || c.userId == req.userId)
    }
}
function showClasses(id){
    return classes.find(c => c.id == id)

}
function putClass(req, id){
    let idx = classes.findIndex(c => c.id == id)
    if(idx == -1) return "Não encontrado"    
    
        if (req.name != undefined) classes[idx].name = req.name
        if (req.id != undefined) classes[idx].id = req.id
        if (req.userId != undefined) classes[idx].userId = req.userId   
        if (req.quant != undefined) classes[idx].quant = req.quant
        if (req.createAt != undefined) classes[idx].createAt = req.createAt
        if (req.startDate != undefined) classes[idx].startdate = req.startDate
        if (req.endDate != undefined) classes[idx].end_date = req.endDate
        
        return classes[idx]
    
    
}

function delClass(id){

    let idx = classes.findIndex(c => c.id == id)
    if(idx == -1) return "Não encontrado"
    classes.splice(idx, 1)
    return "Deletado com sucesso"
}

console.log(
setClass({
        name: "2°ano B", 
        id: 0,
        userId: 0,
        quant:"40",
        createAt:"2024-01-05" ,
        startDate:"2024-01-20",
        endDate:"2024-12-15"
        

}))

console.log(
setClass({
    name: "3°ano A", 
    id: 1,
    userId:1,
    quant:"45",
    createAt:"2023-01-05" ,
    startDate:"2024-01-30",
    endDate:"2024-12-12" 
}))

let result = getClasses({
    name: "A",
    id: 0,
    clasule: "or"
})

let show = showClasses(1)

let classalterado = putClass({
    name: "1°ano D",
}, 0)

  let del = delClass(1)

console.log(classes)
console.log(result)
console.log(del)

   
