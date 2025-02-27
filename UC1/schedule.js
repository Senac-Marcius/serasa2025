var schedule = []



function setSchedule(req) {
    const urlRegex = /^(https?:\/\/)?([a-z0-9]+(\.[a-z0-9]+)+)(\/[a-z0-9#?&%=]*)?$/i;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/


    if (!urlRegex.test(req.url)) {
        return "Campo url deve conter o formato https:siteorganizador";
    }

    if (!dateRegex.test(req.date)) {
        return "Campo deve conter o formato yyyy-mm-dd";
    }

    if (!timeRegex.test(req.beginning)) {
        return "Campo deve conter o formato 13:00";
    }



    let s = {
        id: req.id,
        url: req.url,
        createAt: req.createAt,
        userId: req.userId,
        date: req.date,
        discipline: req.discipline,
        classid: req.classid,
        location: req.location,
        beginning: req.beginning,
        finish: req.finish


    }
    schedule.push(s)
}

function getSchedules(req) {

    if (schedule.length == 1) return schedule[2]
         return "não há agendamentos"

    if (req == null || req == {}) return schedule

    if (req.clasule == "and") {
        return schedule.filter(s =>
            req.location != undefined && s.discipline.includes(req.location) &&
            req.location != undefined && s.location > req.location

        )
    }
    else {
        return schedule.filter(s => s.discipline.includes(req.location) || s.classid == req.locationS)
    }
}

function showSchedules(id) {
    return schedule.find(s => s.id == id)
}

function putSchedule(req, id) {
    let idx = schedule.findIndex(s => s.id == id)
    if (req.discipline != undefined) schedule[idx].discipline = req.discipline
    if (req.classid != undefined) schedule[idx].classid = req.classid
    if (req.location != undefined) schedule[idx].location = req.location
    if (req.beginning != undefined) schedule[idx].beginning = req.beginning
    if (req.finish != undefined) schedule[idx].finish = req.finish
    return schedule[idx]


}

function delSchedule(id) {
    let idx = schedule.findIndex(s => s.id == id)

    if (idx == -1) return "id não encontrado"
    schedule.slice(idx, 1)
    return "deletado com sucesso"

}

// daqui pra baixo vira o codigo da tela dia 25/02


setSchedule({
    id: 0,
    url: "https://siteorganizador.com",
    createAt: "2000-12-31",
    userId: "professor",
    date: "2000-12-31",
    discipline: "educação fisica",
    classid: 2,
    location: "sala b",
    beginning: "13:00",
    finish: "fim 15horas"

})


setSchedule({
    id: 1,
    url: "https://siteorganizador.com",
    createAt: "1",
    userId: "professor",
    date: "2000-11-31",
    discipline: "português",
    classid: 1,
    location: "sala b",
    beginning: "13:00",
    finish: "fim 15horas"

})


setSchedule({
    id: 2,
    url: "https://siteorganizador.com",
    createAt: "2001-01-01",
    userId: "professor",
    date: "2001-01-01",
    discipline: "matemática",
    classid: 0,
    location: "sala c",
    beginning: "10:00",
    finish: "fim 12horas"
})

let result = getSchedules({
    search: "fisica",
    classid: 2,
    clasule: "and"

})

let show = showSchedules(1)

// let scheduleAlterado = putSchedule({
//     discipline: "português"
// }, 1)

console.log(schedule)


console.log(result)