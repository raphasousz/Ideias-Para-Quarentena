 //obs: se entre os () tivesse um espaço no querrySelector seria selecionado a classe fat que está no botton

 //Podemos pasar varios eventos no mesmo metodo quando se separa por virgula.

// O metodo classlist faz que acessamos as classes do elemento

// Toggle serva para add ou retirar.


function onOff(){
    document    
        .querySelector("#modal")
        .classList
        .toggle("hide")
    
    document
        .querrySelector("body")
        .classList
        .toggle("hideScroll")
    
    document
    .querySelector("#modal")
    .classList
    .toggle("addScroll")
     }

     
     function checkFields (event){
         const valuesToCheck = [
             "title",
             "image",
             "category",
             "description",
             "url"
         ]

         // target[value].value se refere valor do campo. 
         //Sendo o target o que se refere ao form, o [value] o campo e o value ao vaor do campo
         // Função find() usada retorna true ou false, caso ele encontra oq buscamos
         // tyoepf verifica o tipo da variavel
         // o trim tira os espaços da string, a esclamação verifica so espaços
         const isEmpty = valuesToCheck.find(function(value){
             const checkIfIsString = typeof event.target[value].value === "string"
             const checkIfIsEmpty = !event.target[value].value.trim()

             if(checkIfIsString && checkIfIsEmpty){
                 return true
             }
         })
        // event.preventDefault() não deixa a aplicação seguir pra frente
         if(isEmpty){
             event.preventDefault()
             alert("Por favor, Preencha todos os campos")
         }
     }