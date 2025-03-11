var disciplines = []

function setDiscipline(req) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/

    if (!datePattern.test(req.createdAt)) {
        alert("Campo Data deve conter o formato YYYY-MM-DD")
        return
    }
    if (!urlPattern.test(req.url)) {
        alert("Campo URL deve ser válido, iniciando com http:// ou https://")
        return
    }

    let d = {
        id: disciplines.length, 
        name: req.name,
        url: req.url,
        workload: req.workload,
        createdAt: req.createdAt,
        teacher: req.teacher
    };

    disciplines.push(d)
    updateDisciplineList()
    document.getElementById("disciplineForm").reset()
    document.getElementById("editIndex").value = "" 
}

function handleSet() {
    let editIndex = document.getElementById("editIndex").value
    if (editIndex !== "") {
        updateDiscipline()
    } else {
        setDiscipline({
            name: document.getElementById("name").value,
            url: document.getElementById("url").value,
            workload: document.getElementById("workload").value,
            createdAt: document.getElementById("created_at").value,
            teacher: document.getElementById("teacher").value
        });
    }
}

function updateDisciplineList(disciplineArray = disciplines) {
    let list = document.getElementById("disciplineList")
    list.innerHTML = ""

    if (disciplineArray.length === 0) {
        list.innerHTML = "<tr><td colspan='4' style='text-align:center;'>Nenhuma disciplina cadastrada</td></tr>"
        return;
    }

    disciplineArray.forEach((d, index) => {
        let row = `<tr>
            <td>${d.name}</td>
            <td>${d.teacher}</td>
            <td>${d.workload}h</td>
            <td>
                <button onclick="editDiscipline(${index})">Editar</button>
                <button onclick="deleteDiscipline(${index})">Deletar</button>
            </td>
        </tr>`
        list.innerHTML += row
    })
}

function searchDisciplines() {
    let query = document.getElementById("searchQuery").value.toLowerCase()
    let filtered = disciplines.filter(d => d.name.toLowerCase().includes(query))
    updateDisciplineList(filtered)
}

function deleteDiscipline(index) {
    disciplines.splice(index, 1)
    updateDisciplineList()
}

function editDiscipline(index) {
    let d = disciplines[index]

    document.getElementById("name").value = d.name
    document.getElementById("url").value = d.url
    document.getElementById("workload").value = d.workload
    document.getElementById("created_at").value = d.createdAt
    document.getElementById("teacher").value = d.teacher
    document.getElementById("editIndex").value = index

    document.querySelector("button[onclick='handleSet()']").style.display = "none"
    document.querySelector("button[onclick='updateDiscipline()']").style.display = "inline-block"
}

function updateDiscipline() {
    let index = document.getElementById("editIndex").value

    if (index !== "") {
        disciplines[index] = {
            id: index,
            name: document.getElementById("name").value,
            url: document.getElementById("url").value,
            workload: document.getElementById("workload").value,
            createdAt: document.getElementById("created_at").value,
            teacher: document.getElementById("teacher").value
        }

        updateDisciplineList()
        document.getElementById("disciplineForm").reset()
        document.getElementById("editIndex").value = ""

        document.querySelector("button[onclick='handleSet()']").style.display = "inline-block"
        document.querySelector("button[onclick='updateDiscipline()']").style.display = "none"
    }
}
