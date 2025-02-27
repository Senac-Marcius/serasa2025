var posts = []

function setPost(req){
    const idPattern = /^\d+$/;
    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if(!idPattern.test(req.id)) return "Campo ID deve conter apenas números"
    if(!idPattern.test(req.userId)) return "Campo userId deve conter apenas números"
    if(!urlPattern.test(req.url)) return "Campo url deve conter o seguinte formato https://dominio."
    if(!datePattern.test(req.createAt)) return "Campo createAt deve conter o seguinte formato YYYY-MM-DD"
    if(req.description.length > 244) return "Campo description deve conter até 244 caracters"

    let p = {
        id: req.id,
        description: req.description,
        url:req.url, // http://qualquercoisa. ou https://qualquercoisa.
        createAt: req.createAt, // YYYY-MM-DD
        userId: req.userId
    }

    posts.push(p)
}

function getPosts(req){
    

    if(req == null || req == {} ) return posts

    if(req.clasule == "and") {
        return posts.filter(p => 
            req.search != undefined && p.description.includes(req.search) &&
            req.like != undefined && p.like > req.like
        )
    }else{
        return posts.filter(p => p.description.includes(req.search) || p.like > req.like)
    }
}

function showPost(id){
    return posts.find(p => p.id == id)
}

function putPost(req, id){
    let idx = posts.findIndex(p => p.id == id)

    if(idx == -1) return "Não encontrado"

    if(req.description != undefined) posts[idx].description = req.description
    if(req.url != undefined) posts[idx].url = req.url
    if(req.createAt != undefined) posts[idx].createAt = req.createAt
    if(req.userId != undefined) posts[idx].userId = req.userId

    return posts[idx]
}

function delPost(id){
    let idx = posts.findIndex(p => p.id == id)

    if(idx == -1) return "Não encontrado"

    posts.splice(idx, 1)

    return "Postagem excluida"
}

/** daqui pra baixo virá o código da tela a partir do dia 25/02/25 */

console.log(
    setPost({id: 0, description: "primeiro", url: "http://caminhodomeuarquivo.com", createAt: "2000-12-31", userId: 0, like: 2 })
)

console.log(
    setPost({id: 1, description: "primeiro", url: "http://caminhodomeuarquivo.com", createAt: "2001-12-31", userId: 0, like: 5 })
)

console.log(
    setPost({id: 2, description: "terceiro", url: "http://caminhodomeuarquivo.com", createAt: "2002-12-31", userId: 0, like: 6 })
)

let result = getPosts({
    search: "primeiro",
    like: 4,
    clasule: "or"
})

let show = showPost(1)

let postAlterado = putPost({
    description: "segundo post alterado"
} , 1)


console.log(postAlterado)

