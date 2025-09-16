const params = new URLSearchParams(window.location.search);
const tarefaId = params.get("id");

let tarefasArray = JSON.parse(localStorage.getItem("tarefas")) || [];

// Corrigindo comparação: transforma id em número
const tarefa = tarefasArray.find(t => t.id === Number(tarefaId));

const inputEditar = document.getElementById('inputEditarTarefa');
inputEditar.value = tarefa ? tarefa.texto : "";

const btnSalvar = document.getElementById('btnSalvarEdicao');
const btnCancelar = document.getElementById('btnCancelarEdicao');

// Salvar edição
btnSalvar.addEventListener('click', () =>{
    if(!inputEditar.value.trim()) return alert("Digite algo!");

    tarefa.texto = inputEditar.value.trim();

    localStorage.setItem("tarefas", JSON.stringify(tarefasArray));

    window.location.href = "index.html";
});

// Cancelar edição
btnCancelar.addEventListener('click', () =>{
    window.location.href = "index.html";
});
