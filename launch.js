var launchs = []

function setLaunch(req){
    const userIdRegex = /^\d+$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const observationRegex = /^[a-zA-Z0-9\s]*$/; 

    if (!userIdRegex.test(req.userId)) {
       return "Campo userId deve conter apenas números"
    }

    if (!dateRegex.test(req.createAt)) {
       return "Campo createAt deve conter o seguinte formato YYYY-MM-DD"
    }
    
    if (!observationRegex.test(req.observation)) {
        return "Campo observation deve conter apenas letras, números e espaços"
    }
        


    
    let l = {
        id: req.id,
        createAt: req.createAt,
        userId: req.userId,
        note: req.note,
        observation: req.observation,
        presence: req.presence,
        indicator: req.indicator
    }

    launchs.push(l)
}
 
function getLaunchs(req) {
    if(req.specific){
        return launch.filter(
            (launch) =>
            req.userId != undefined && launch.userId == req.userId &&
            req.note!= undefined && launch.note == req.note &&
            req.observation != undefined && launch.observation == req.observation &&
            req.presence != undefined && launch.presence == req.presence &&
            req.indicator != undefined && launch.indicator == req.indicator
            
        ); 
    }
   
    return launchs.filter(
        (launch) =>
        launch.userId == req.userId ||
        launch.note == req.note ||
        launch.observation == req.observation ||
        launch.presence == req.presence ||
        launch.indicator == req.indicator
    )
}

function showLaunch(id) {
    return launchs.find((launch) => launch.id == id);
}  
 // para baixo ela esta declarada
function putLaunch(req, id){
    let idx = launchs.findIndex(p => p.id == id)

    if(idx == -1) return "Não encontrado"

    if (req.userId != undefined) launchs[idx].userId = req.userId 
    if (req.observation != undefined) launchs[idx].observation = req.observation 
    if (req.presence != undefined) launchs[idx].presence = req.presence 
    if (req.indicator != undefined) launchs[idx].indicator = req.indicator 
  
    return launchs[idx]
}

function delLaunch(id){
    let idx = launchs.findIndex(p => p.id == id)

    if(idx == -1) return "Não encontrado"

    Launch.splice(idx, 1)
    return "Deletado"



}


// daqui para baixo virá o código da tela a partir do dia 25/02/2025.

console.log(
    setLaunch ({id: "addd"})
)



setLaunch({
    id: 0,
    createAt: "2000-12-31",
    userId: 0,
    note: "A",
    observation: "chegou atrasado 10 minutos",
    presence: true,
    indicator:"A"
})

setLaunch({
    id: 1,
    createAt: "2001-01-01",
    userId: 1,
    note: "B",
    observation: "chegou no horário",
    presence: true,
    indicator: "P"
})

let show = showLaunch(1)

 let segundo = putLaunch({
     observation: "segundo horario",
     note: "C",
 } , 1)



console.log(launchs)


console.log(launchs)

