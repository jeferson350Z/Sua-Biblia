const url = "https://www.abibliadigital.com.br/api/books";
let livrosBilia = [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []; // Recuperação de favoritos  

// aqui exbi os livros 
function exibirLivros(livros) {
    const div = document.getElementById("container");
    div.innerHTML = "";  

    livros.map(bilia => {
        const titulo = document.createElement("h2");
        const capitulo = document.createElement("p");
        const testamento = document.createElement("p");
        const autor = document.createElement("p");
        const detalhes = document.createElement("p");

        const divindiv = document.createElement('div');
        divindiv.classList.add('divdiv')
        

        titulo.innerText = bilia.name;
        capitulo.innerText = "Capítulos: " + bilia.chapters;
        testamento.innerText = "Testamento: " + bilia.testament;
        autor.innerText = "Autor: " + bilia.author;
        detalhes.innerText = ""; 

        
        if (favoritos.includes(bilia.name)) {
            titulo.classList.add("favorito");
        }

      
        titulo.addEventListener("click", () => {
            if (detalhes.innerText === "") {
                detalhes.innerText = "Detalhes adicionais: Este é o livro de "+ bilia.name;
                
                
            } else {
                detalhes.innerText = "";
            }
        });

       
        titulo.addEventListener("contextmenu", (event) => {
           
            event.preventDefault();
            marcarFavorito(bilia.name);
           
            exibirLivros(livros); 
        });

        divindiv.appendChild(titulo);
        divindiv.appendChild(capitulo);
        divindiv.appendChild(testamento);
        divindiv.appendChild(autor);
        divindiv.appendChild(detalhes);
        div.appendChild(divindiv)
    });
}


function marcarFavorito(nomeLivro) {
    if (favoritos.includes(nomeLivro)) {
     
        favoritos = favoritos.filter(favorito => favorito !== nomeLivro);
    } else {
        
        favoritos.push(nomeLivro);
    }
    
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}


function filtrarLivros(criterio) {
    const livrosFiltrados = criterio === "todos" ? livrosBilia : livrosBilia.filter(livro => livro.testament === criterio);
    exibirLivros(livrosFiltrados);
}

// Aqui eu faço uma requisição para buscar os livros da API
fetch(url)
    .then(resposta => resposta.json())
    .then((data) => {
        livrosBilia = data; // Salva os dados da API no array livrosBilia
        exibirLivros(livrosBilia); // Exibe todos os livros inicialmente
    })
    .catch(error => console.error("Erro no servidor", error));

// Evento que escuta mudanças no seletor de filtragem
document.getElementById("filter").addEventListener("change", (event) => {
    const criterio = event.target.value;
    filtrarLivros(criterio);
});