const inputTarefa = document.getElementById('addTarefa');
const btnAddTarefa = document.getElementById('btnAddTarefa');
const inputPesquisa = document.getElementById('pesquisarTarefa');
const btnCancelarPesquisa = document.getElementById('btnCancelarPesquisa');
const filtro = document.getElementById('filtroTarefas');
const containerTarefas = document.getElementById('tarefasContainer');

function carregarTarefas(){
    return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function salvarTarefas(tarefasArray){
    localStorage.setItem("tarefas", JSON.stringify(tarefasArray))
}

function criarTarefaObj(texto){
    return {
        id: Date.now(),
        texto : texto,
        feita: false
    };
}

function alternarFeita(tarefasArray, id){
    const tarefa = tarefasArray.find(t => t.id === id);
    if(tarefa) tarefa.feita = !tarefa.feita;
}

function removerTarefa(tarefasArray, id){
    return tarefasArray.filter(t => t.id !== id);
}


function criarTarefaDom(tarefa, tarefasArray){
    const tarefaDiv = document.createElement('div');
    tarefaDiv.classList.add('tarefa');
    tarefaDiv.dataset.id = tarefa.id;

    const span = document.createElement('span');
    span.textContent = tarefa.texto;
    if(tarefa.feita) span.style.textDecoration = "line-through";

    const botoesDiv = document.createElement('div');
    botoesDiv.classList.add('botoes');

    const btnfeita = document.createElement('button');
    btnfeita.textContent = "✔";
    btnfeita.addEventListener('click', () => {
        alternarFeita(tarefasArray, tarefa.id);
        salvarTarefas(tarefasArray);
        span.style.textDecoration = tarefa.feita ? "line-through" : "none";
    })

    const btnEditar = document.createElement('button');
    btnEditar.textContent = "✎";
    btnEditar.addEventListener('click', () => {
        window.location.href = `editar.html?id=${tarefa.id}`;
    })

    const btnRemover = document.createElement('button');
    btnRemover.textContent = "🗑";
    btnRemover.addEventListener('click', () => {
        removerTarefa(tarefasArray, tarefa.id);
        tarefaDiv.remove();
    })

    botoesDiv.append(btnfeita, btnEditar, btnRemover);
    tarefaDiv.append(span, botoesDiv);
    containerTarefas.appendChild(tarefaDiv);
}

function aplicarFiltro(){
    const valorFiltro = filtro.value;

    document.querySelectorAll('.tarefa').forEach(tarefaDiv => {
        const id = Number(tarefaDiv.dataset.id);
        const tarefa = tarefasArray.find(t => t.id === id);

        if(valorFiltro === 'todas'){
            tarefaDiv.style.display = "flex";
        } else if(valorFiltro === 'feitas'){
            tarefaDiv.style.display = tarefa.feita ? "flex" : "none";
        } else if(valorFiltro === 'pendentes'){
            tarefaDiv.style.display = !tarefa.feita ? "flex" : "none";
        }
    })
}

function aplicarPesquisa(){
    const inputValor = inputPesquisa.value.toLowerCase();

    document.querySelectorAll('.tarefa').forEach(tarefaDiv => {
        const span = tarefaDiv.querySelector('span');
        const texto = span.textContent.toLowerCase();

        if(texto.includes(inputValor)){
            tarefaDiv.style.display = "flex";
        } else {
            tarefaDiv.style.display = "none";
        }
    })
}

function renderizarTarefas(tarefasArray){
    tarefasArray.forEach(tarefa => {
        criarTarefaDom(tarefa,tarefasArray);
    });
}

function iniciarToDoList(){
    let tarefasArray = carregarTarefas();

    renderizarTarefas(tarefasArray);

    btnAddTarefa.addEventListener('click', () => {
        const texto = inputTarefa.value.trim();
        if(!texto) return;

        const novaTarefa = criarTarefaObj(texto);
        tarefasArray.push(novaTarefa);
        salvarTarefas(tarefasArray);

        criarTarefaDom(novaTarefa, tarefasArray);
        inputTarefa.value = "";

        filtro.addEventListener('change', aplicarFiltro);
        inputPesquisa.addEventListener('input', aplicarPesquisa);

        btnCancelarPesquisa.addEventListener('click', () => {
            inputPesquisa.value = "";
            aplicarPesquisa();
        })
    })
}

document.addEventListener('DOMContentLoaded', iniciarToDoList);