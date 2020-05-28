// Após baiaxar o gerenciador de pacote npm com o comando: npm init -y
// e iniciar o servidor com npm start.
// Baixamos o pacote express com  comando: npm i express.
// Depois o pedimos na nossa aplicação.
// Tambem devemos baixar o nodemon, fazemos isso com o comando: npm i nodemon.
// e no package.jon no atributo start trocamos node por nodemon
const express = require("express");
const server = express();

// Recebendo a exportação do banco de dados
const db = require("./db.js")

// Liguei o servidor na porta 300
server.listen(3000);


/*
// Criando um vetor de objetos para armazenar os dados da ideias da aplicação.
const ideas = [
    {
        img:"https://image.flaticon.com/icons/svg/2728/2728995.svg",
        title:"Curso de programação",
        category:"Estudo",
        description:"Aproveite para se profissionalizar.",
        url:"http://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2761/2761891.svg",
        title:"Exercício",
        category:"Saúde",
        description:"Cuidar da saúde é otimo para prevenr de doenças.",
        url:"http://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2755/2755395.svg",
        title:"Meditação",
        category:"Mentalidade",
        description:"Manter a mentalidade é fundamental em tempos como esse.",
        url:"http://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/1244/1244363.svg",
        title:"Lazer",
        category:"Momentos para se divertir em família",
        description:"Cantar em casa",
        url:"http://rocketseat.com.br"
    },
]
*/
// Comunicar o back-end com o front-end.
//Usamos o metodo get do servifor sever.
// Podemos usar essa comunicação para enviar arquivos html e css.
// Para isso fazemos a estrategia de configurar com o express os arquivos estaticos:
server.use(express.static("public"));

// Habilitar o req.body
server.use(express.urlencoded({extended: true}))

// Para criar uma resposta HTML e CSS e além de enviar varíaveis para o html, baixamos  o pacote: npm i nunjucks
// Configurar o nunjucks:
// Pedimos usas funcionalidades com o require
// Depois utilizamos o metodo para o configurar por parametros.
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server, // Quem vai se servidor
    noCache: true, // Faz o nunjucks não salvar as alterações
})


// Com o nunjucks podemos enviar variaveis nas rotas pleo metodo get.
// Utilizando a varíavel do express usamos o get e dentro de () passamos dois parametros.
// O endereço para o navegador e a função envivar a resposta que poderá ser um arquivo ou varíavel
// Essa função tem os parametros req e res, sendo o res a resposta da rota:
// No caso queremos as últimas ideias.
// criamos uma varável para armazenar as ideias
// O for que joga os objetos que criamos na ordem reversa graças ao reverse() para o objeto que o for vai percorrer
// Depois limitamos a puxar as duas últimas ideias
// passamos no res.render o endereço do arquivo e HTML e CSS e também uma nova varíavel que recebe a do back.
/* 
server.get(/, function(req , res){
    PODEMOS TRATAR O OBJ AKI ANTES DE ENVIAR
    const reverseIdeas = [...ideas].reserve()
    let lastIdeas
    for(let idea of  reverseIdea){
        if(idea.lenght < 2){
            lastIdeas.push(idea)
        }
    }
    return res.render("index.html", ideasToFront: lastIdeas )
})
*/

// Na consulta do banco de dados são selecionadas as linhas, logo essas rows que substituirão o objeto ideas.
server.get("/", function(req, res){

    //Consultar na tabela
    // Fazemos a consuta passando a função all com a chamada de erro ou que imprimi as linhas da tabela.
    // Agora jogaremos os dados da tabela para nossa aplicação usando o metodo de consulta e o enviando para a pag
    // A rota de envar o obj ideias é o mesmo so que invés do obj são as linhas da função de consulta
    // Já que essa função apresenta as linhas da tabela.
    db.all(`SELECT * FROM idea`, function(err, rows){
        if(err) return console.log(err)

        const reverseIdea = [... rows].reverse()
        let lastIdeas = []
        for (let idea of reverseIdea){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
        
            }
        }
            
            return res.render("index.html",{ideas: lastIdeas});
        })
    })



 // Podemos enviar mensagens de erro para o usuario
 // No if abrimos {} e dentro dela usamos o console.log(err) e depois
 // com res.send enviamos nossa mensagem.

 //Também podemos pegar os dados do usuario passado no forms da aplicação com o parametro req.
server.get("/ideias", function(req, res){



    db.all(`SELECT * FROM idea`, function(err, rows){
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados !!!!")
        }
        const reverseIdea = [... rows].reverse()
        return res.render("ideias.html", {ideas: reverseIdea});
   
    })

})

// Criando uma rota post
// Para pegar os dados do gerados pelo usuario do form e inserir no banco de dados
// Usamos a função de inserir os dados no banco de dados do SQLite3, passando ele dentro da rota, PORÉM
// Com alteração:
// Na const values passamos os camos do form para que se esses sejam os vaores assados para as colunas da tabela do banco de dados
// Depois apenas com o res utilizamos o redirect para redirecionar para outra pag.
server.post("/", function(req,res){
    const query = `
        INSERT INTO idea (
            image,
            title,
            category,
            description,
            link
            ) VALUES (?,?,?,?,?);
            `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
            ]

    db.run(query, values, function(err){
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados !!!!")
        }
        return res.redirect("/ideias")
    })

})