function carregarTarefas(){
    return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function buscarTarefaPorId(tarefasArray, id){
    return tarefasArray.find(t => t.id === Number(id));
}

function salvarTarefas(tarefasArray){
    localStorage.setItem("tarefas", JSON.stringify(tarefasArray));
}

function preecherInput(inputEditar,tarefa){
    inputEditar.value = tarefa ? tarefa.texto : "";
}

function atualizarTarefa(tarefa,novoTexto){
    if(!novoTexto.trim()){
        alert('O texto da tarefa não pode ser vazio!');
        return false;
    }

    tarefa.texto = novoTexto.trim();
    return true;
}

function inicializaçãoEdicao(){
    const inputEditar = document.getElementById('inputEditarTarefa');
    const botaoSalvar = document.getElementById('btnSalvarEdicao');
    const botaoCancelar = document.getElementById('btnCancelarEdicao');

    const params = new URLSearchParams(window.location.search);
    const tarefaId= params.get("id");

    const tarefasArray = carregarTarefas();

    const tarefa = buscarTarefaPorId(tarefasArray, tarefaId);

    preecherInput(inputEditar, tarefa);

    botaoSalvar.addEventListener('click', () => {
        if(!atualizarTarefa(tarefa, inputEditar.value)) return;
        salvarTarefas(tarefasArray);
        window.location.href = "index.html";
    })

    botaoCancelar.addEventListener('click', () => {
        window.location.href = "index.html";
    })
}

document.addEventListener('DOMContentLoaded', inicializaçãoEdicao);
