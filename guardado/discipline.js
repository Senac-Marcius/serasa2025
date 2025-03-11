var disciplines = [];

        function setDiscipline(req) {
            const datePattern = /^\d{4}-\d{2}-\d{2}$/
            const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/

            if (!datePattern.test(req.createdAt)) return alert("Campo Data deve conter o formato YYYY-MM-DD")
            if (!urlPattern.test(req.url)) return alert("Campo URL deve ser válido, iniciando com http:// ou https://")

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
        }

        function handleSet() {
            let editIndex = document.getElementById("editIndex").value
            if (editIndex) {
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
            disciplineArray.forEach((d, index) => {
                let item = document.createElement("p")
                item.textContent = `${d.name} - ${d.teacher} - ${d.workload}h`

                let editButton = document.createElement("button")
                editButton.textContent = "Editar"
                editButton.onclick = () => editDiscipline(index)

                let deleteButton = document.createElement("button")
                deleteButton.textContent = "Deletar"
                deleteButton.onclick = () => deleteDiscipline(index)

                item.appendChild(editButton)
                item.appendChild(deleteButton)
                list.appendChild(item)
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

            // Alterar botão "Cadastrar" para "Atualizar"
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
                document.getElementById("disciplineForm").reset() /** ele busca o codigo com o id "disciplineForm" e o reseta o formulário */
                document.getElementById("editIndex").value = ""  /** está atribuindo um valor vazio à propriedade value do elemento. Ou seja, está limpando o conteúdo do campo de entrada (input) identificado por "editIndex". */

                // Voltar botão "Cadastrar"
                document.querySelector("button[onclick='handleSet()']").style.display = "inline-block"
                document.querySelector("button[onclick='updateDiscipline()']").style.display = "none"
            }
        }