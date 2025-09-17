const tarefas = document.getElementById('addTarefa');
const btnAddTarefas = document.getElementById('btnAddTarefa');
const containerTarefas = document.getElementById('tarefasContainer');

let tarefasArray = JSON.parse(localStorage.setItem("tarefas")) || [];

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

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "✏️";

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "❌";

    tarefaDiv.appendChild(span);
    tarefaDiv.appendChild(btnFeita);
    tarefaDiv.appendChild(btnEditar);
    tarefaDiv.appendChild(btnRemover);
    containerTarefas.appendChild(tarefaDiv);

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
