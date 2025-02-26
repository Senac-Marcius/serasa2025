var disciplines = []

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD
const URL_REGEX = /^(https?:\/\/)[\w.-]+(\.[a-zA-Z]{2,})+.*$/; // Validação de URL

function formatDate(inputDate) {
    const match = inputDate.match(/^(\d{2})\/(\d{2})\/(\d{2,4})$/)
    if (match) {
        let year = match[3].length === 2 ? `20${match[3]}` : match[3]
        return `${year}-${match[2]}-${match[1]}`
    }
    return inputDate;
}

function setDiscipline(req) {
    req.createAt = formatDate(req.createAt); // Converte data para YYYY-MM-DD

    if (!DATE_REGEX.test(req.createAt)) {
        console.log("Data inválida! Use o formato YYYY-MM-DD.")
        return;
    }
    
    if (!URL_REGEX.test(req.url)) {
        console.log("URL inválida! Use um formato válido (http:// ou https://)")
        return;
    }

    let d = {
        id: req.id,
        name: req.name,
        url: req.url,
        workload: req.workload,
        createAt: req.createAt,
        teacher: req.teacher
    };

    disciplines.push(d);
}

function putDiscipline(req, id) {
    let idx = disciplines.findIndex(d => d.id == id);

    if (idx === -1) {
        return "Não encontrado";
    }

    if (req.createAt !== undefined) {
        req.createAt = formatDate(req.createAt);
        if (!DATE_REGEX.test(req.createAt)) {
            console.log("Data inválida! Use o formato YYYY-MM-DD.");
            return;
        }
    }

    if (req.url !== undefined && !URL_REGEX.test(req.url)) {
        console.log("URL inválida! Use um formato válido (http:// ou https://)");
        return;
    }

    Object.keys(req).forEach(key => {
        if (req[key] !== undefined) disciplines[idx][key] = req[key];
    });

    return disciplines[idx];
}

function showDiscipline(req) {
    return disciplines.find(d => d.id == req.id)
}

function getDisciplines(req) {

  if( disciplines.length = 0) return "não encontrado"
  
    if (!req || Object.keys(req).length === 0) return disciplines

    if (req.clasule == "and") {
        return disciplines.filter(d => req.search !== undefined && d.name == req.search && d.name.includes(req.search) && req.search !== undefined && d.workload > 50)
    } else {
        return disciplines.filter(d => req.search !== undefined && d.name == req.search || d.name.includes(req.search) || req.search !== undefined && d.workload > 50)
    }

    

}

function putDisciplinesFlexible(req) {
    let fields = req.fields || ["name"]

    return disciplines.filter(d => {
        if (req.clasule === "and") {
            return fields.every(field => d[field] && d[field].toString().includes(req.search))
        } else if (req.clasule === "or") {
            return fields.some(field => d[field] && d[field].toString().includes(req.search))
        }
    });
}

function delDiscipline(id){

  let idx = disciplines.findIndex(d => d.id == id)
  if( idx == -1) return "Não encontrado"
  disciplines.splice(idx, 1)
    return "Diciplina excluida!"

  
}

// Adicionando disciplinas com validação
setDiscipline({
    id: 0,
    name: "miszael",
    url: "https://www.discipline.com",
    workload: 250,
    createAt: "20/01/2003",
    teacher: "professor"
});

setDiscipline({
    id: 1,
    name: "marco",
    url: "https://www.discipline.com",
    workload: 550,
    createAt: "20/01/2004",
    teacher: "professor"
});

let result = getDisciplines({
    search: "miszael",
    clasule: "and"
});

let resultFlexible = putDisciplinesFlexible({
    search: "550",
    clasule: "or",
    fields: ["workload", "name"]
});

let disciplinesAtual = putDiscipline({
    workload: 750
}, 1);

console.log("Resultado da busca padrão:", result)
console.log("Resultado da busca flexível:", resultFlexible)
console.log("Exibindo disciplina com ID 1:", showDiscipline({ id: 1 }))
console.log("Altera a disciplina com ID 1:", disciplinesAtual)
console.log("del", delDiscipline(1))