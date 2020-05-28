// Arquivo utilizado para fazer a configuração do banco de dados.
//Para iniciar o banco de dados primeiro baixamos no terminal com  a linha de comando: npm i sqlite3
//Solicitar o pacote baixado para a aplicação:
const sqlite3 = require("sqlite3").verbose()

//Crinado o banco de dados:
const db = new sqlite3.Database('./ws.db')

//Criando comando para a tabela:
db.serialize(function(){

// RODAMOS OS COMNDOS DA TABELA COM O COMANDO: node db.js
    
    // Criar a tabela
    // Damos o comando de criar a tabela e dentro das () criamos as colunas da tabela.
    // Passamos a coluna que cada idea terá e o seu tipo
    // O id além de passar o tipo passamos atributo para que ela seja uma chave única e criada automatica.
    db.run(`
        CREATE TABLE IF NOT EXISTS idea(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
    );
    `)

    //Inserir na tabela
    // Usamos a função db.run() com os sequintes parametros:
    // Primeiro serão os campos que os dados serão inseridos e depois a varíavel que irá inserir os valores.
    // Depois passamos na variavel values que é os valores que irão para os campos na tabela do campo de dados
    // Além de acrescentar uma funçao ue caso acontece o erro a função err é disparada , se não referenciamos com this.
           /* const query = `
            INSERT INTO idea (
                image,
                title,
                category,
                description,
                link
            ) VALUES (?,?,?,?,?);
            `
            const values = [
                "https://image.flaticon.com/icons/svg/2728/2728995.svg",
                "Curso de programação",
                "Estudo",
                "Aproveite para se profissionalizar.",
                "http://rocketseat.com.br"
            ]
            db.run(query, values, function(err){
                if(err) {
                   return console.log(err)
               }
                console.log(this)
           })

    //Consultar na tabela
    // Fazemos a consuta passando a função all com a chamada de erro ou que imprimi as linhas da tabela.
            db.all(`SELECT * FROM idea`, function(err, rows){
                if(err) return console.log(err)

                console.log(rows)
            })

*/
})

    //Deletar na tabela

    // Passamos o db.run com a segunite função de parametro e a chamda de erro ou de apresentação
    //db.run(`DELETE FROM idea WHERE id = ?`, [1], function(err){
        //if (err) return console.log(err)

        //console.log("DELETEI", this)
   // })

   // Como exportar as funcionalidades do banco de dados para a aplicação ?
module.exports = db