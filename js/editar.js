// ------------------------------ LOCAL-STORAGE -----------------------------

/*
Função encarregada de pegar os nossos obj de tarefa do localStorage ou se não tiver nada retornar uma array vazia
*/
function carregarTarefas(){
    return JSON.parse(localStorage.getItem("tarefas")) || [];
}


/*
Função encarregada de salvar a nova array com o obj em questão atualizado. tranformando o obj JSON para string afins de padrão do localStorage
*/
function salvarTarefas(tarefasArray){
    localStorage.setItem("tarefas", JSON.stringify(tarefasArray));
}


// -------------------- BUSCAR TAREFA NO ARRAY ------------------------------

/*
Função encarregada de ir no array e buscar a tarefa em especifico para nós fazermos a edição.
*/
function buscarTarefaPorId(tarefasArray, id){
    return tarefasArray.find(t => t.id === Number(id));
}

// ------------------- PREENCHER A INPUT DE EDITAR --------------------------

/*
Função encarregado de ir no valor da input de editar e colocar de inicio o texto do obj original que estamos editando
*/
function preecherInput(inputEditar,tarefa){
    inputEditar.value = tarefa ? tarefa.texto : "";
}


// --------------------- ATUALIZAR A TAREFA, QUESTÃO DADOS ------------------

/*
Função encarregada de colocar o novo texto dentro do obj original e atualizar ele, ou ver se o usuario simplesmente quer salvar o obj sem nenhum texto
*/
function atualizarTarefa(tarefa,novoTexto){
    if(!novoTexto.trim()){
        alert('O texto da tarefa não pode ser vazio!');
        return false;
    }

    tarefa.texto = novoTexto.trim();
    return true;
}


// ---------------------------------- INICIALIZAÇÃO -------------------------

/*
Nesta inicialização nós pegamos o que foi digitado na input de Editar, e os dois botões, o de salvar, e o de cancelar. Nós enviamos o Id da tarefa em especifico pela URL, ent nós usamos a classe URLSEARCHPARMS com window.location.search isso aqui retorna com obj com todos os parametros que contém após o "?" da URL, Nós vamos ent nesse obj usamos o metodo "get" e pegamos o id, tendo o ID, a gente consegue agora ir na array e localizar o obj em questão, depois a gente tem que preencher o input de edição com o texto da tarefa original de inicio, depois Vamos no Botão de salvar, onde vamos ver se a função de atualizarTarefa tiver o retorno false significa que o usuario não digitou nada na input e ainda sim quer salvar, se retornar true, ent atualizamos nossa array com esse obj atualizado e voltamos para a pagina index.html.

Já o botão de cancelar nós apenas voltamos para a pagina original.
*/
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


/*
Evento add no proprio corpo html, para quando entrar no html em questão, na questão de carregamento já chamar a função "inicializaçãoEdicao"
*/
document.addEventListener('DOMContentLoaded', inicializaçãoEdicao);
