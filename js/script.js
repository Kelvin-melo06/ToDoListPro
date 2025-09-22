const tarefas = document.getElementById('addTarefa');
const btnAddTarefas = document.getElementById('btnAddTarefa');
const containerTarefas = document.getElementById('tarefasContainer');

let tarefasArray = JSON.parse(localStorage.getItem("tarefas")) || [];

// Mostrar tarefas já salvas quando carregar a página
tarefasArray.forEach(t => {
    criarTarefaDom(t.texto, t.id, t.feita);
});

btnAddTarefas.addEventListener('click', () =>{
    const texto = tarefas.value.trim();
    if(texto === "") return;

    const id = Date.now();
    const novaTarefa = {id, texto, feita:false};

    tarefasArray.push(novaTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefasArray));

    criarTarefaDom(texto, id, false);
    tarefas.value = "";
});

function criarTarefaDom(texto, id, feita){
    const tarefaDiv = document.createElement("div");
    tarefaDiv.classList.add("tarefa");
    tarefaDiv.dataset.id = id;

    const span = document.createElement("span");
    span.textContent = texto;

    if(feita){
        span.style.textDecoration = "line-through";
    }

    const btnFeita = document.createElement("button");
    btnFeita.textContent = "✔";

    const botoesDiv = document.createElement("div");
    botoesDiv.classList.add("botoes");

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "✏️";

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "❌";


    tarefaDiv.appendChild(btnFeita);
    tarefaDiv.appendChild(btnEditar);
    tarefaDiv.appendChild(btnRemover);
    containerTarefas.appendChild(tarefaDiv);

    botoesDiv.appendChild(btnFeita);
    botoesDiv.appendChild(btnEditar);
    botoesDiv.appendChild(btnRemover);
    tarefaDiv.appendChild(span);
    tarefaDiv.appendChild(botoesDiv);
    

    // Marcar como feita
    btnFeita.addEventListener("click", () =>{
        span.style.textDecoration = span.style.textDecoration === "line-through" ? "none" : "line-through";
        const tarefa = tarefasArray.find(t => t.id === id);
        tarefa.feita = !tarefa.feita;
        localStorage.setItem("tarefas", JSON.stringify(tarefasArray));
    });

    // Remover
    btnRemover.addEventListener("click", () =>{
        tarefaDiv.remove();
        tarefasArray = tarefasArray.filter(t => t.id !== id);
        localStorage.setItem("tarefas", JSON.stringify(tarefasArray));
    });

    // Editar
    btnEditar.addEventListener("click", () =>{
        window.location.href = `editar.html?id=${id}`;
    });
}

const filtro = document.getElementById('filtroTarefa');

filtro.addEventListener('change', () =>{
    const valorFiltro = filtro.value;

    document.querySelectorAll('.tarefa').forEach(tarefaDiv => {
        const id = Number(tarefaDiv.dataset.id);
        const tarefa = tarefasArray.find(t => t.id === id);

        if(valorFiltro === "todas"){
            tarefaDiv.style.display = "flex";
        } else if(valorFiltro === "feitas"){
            tarefaDiv.style.display = tarefa.feita ? "flex" : "none";
        } else if(valorFiltro === "pendentes"){
            tarefaDiv.style.display = !tarefa.feita ? "flex" : "none";
        }
    })
})

const inputPesquisa = document.getElementById('pesquisarTarefa');
const btnCancelarPesquisa = document.getElementById('btnCancelarPesquisa');

inputPesquisa.addEventListener('input', () =>{
    const textoPesquisa = inputPesquisa.value.toLocaleLowerCase();

    document.querySelectorAll('.tarefa').forEach(tarefaDiv => {
        const span = tarefaDiv.querySelector('span');
        const textoTarefa = span.textContent.toLowerCase();
        if(textoTarefa.includes(textoPesquisa)){
            tarefaDiv.style.display = "flex";
        } else{
            tarefaDiv.style.display = "none";
        }
    })
})

btnCancelarPesquisa.addEventListener('click', () =>{
    inputPesquisa.value = "";
    document.querySelectorAll('.tarefa').forEach(tarefaDiv => {
        tarefaDiv.style.display = "flex";
    })
})
