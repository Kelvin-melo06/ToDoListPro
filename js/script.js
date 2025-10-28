// ----------------------------------------- SELECIONANDO ELEMENTOS HTML QUE SERÃO MANIPULADOS -------------------------------------

/*
inputTarefa: input onde o usuário ira digitar a tarefa que ele deseja add
btnAddTarefa: botão que o usuário ira apertar para add a tarefa

inputPesquisa: input onde o usuário ira digitar um texto para procurar uma determinada tarefa
btnCancelarPesquisa: btn que o usuário vai apertar para cancelar a pesquisa

filtro: Aqui se trata do select do HTML que contém as opções, cujo o usuário ira escolher
containerTarefas: Aqui é o elemento no HTML onde ira ser colocado todas as tarefas
*/
const inputTarefa = document.getElementById('addTarefa');
const btnAddTarefa = document.getElementById('btnAddTarefa');
const inputPesquisa = document.getElementById('pesquisarTarefa');
const btnCancelarPesquisa = document.getElementById('btnCancelarPesquisa');
const filtro = document.getElementById('filtroTarefas');
const containerTarefas = document.getElementById('tarefasContainer');


// ---------------------------------------------- LOCAL-STORAGE ------------------------------------------------

/*
Função encarregada de ou criar o local dentro do storage onde serão colocados os obj de tarefa, ou retornar uma array vazia, caso for a primeira iteração do usuario essa função retornara uma array vazia já que não temos nada no localStorage, porém caso tenha algo no storage a gente pega e transforma para OBJ JSON, o nome dado ao nosso armário é "tarefas" 
*/
function carregarTarefas(){
    return JSON.parse(localStorage.getItem("tarefas") || []);
}


/*
Função que salva Determinada tarefa dentro do localStorage, o nome que demos dentro do local onde vai ficar as tarefas é "tarefas" e ent pegamos a array de obj e mudamos para string, esse função recebe a array de obj, para ent atualizar seu status dentro do localStorage 
*/
function salvarTarefas(tarefasArray){
    localStorage.setItem("tarefas", JSON.stringify(tarefasArray))
}

// ----------------------------------------- CRIAÇÃO DE OBJ DE TAREFA ----------------------------------------------

/*
Função que recebe o texto digitado pelo usuário no campo de input, e ent cria o obj de tarefa com um id, o texto que foi recebido da input, e um booleano com status de false de inicio
*/
function criarTarefaObj(texto){
    return {
        id: Date.now(),
        texto : texto,
        feita: false
    };
}

// ----------------------------------------------- FUNÇÕES DE MANIPULAÇÃO DE TAREFAS ----------------------------------------------------------

/* 
Função recebe a array de obj para a gente ir nela e recebe tbm o id daquela tarefa em especifico, para ent a gente ir na array e retornarmos na variavel tarefa a tarefa em questão para alternar seu estados de feita, fazemos um if e se retornar true o status de tarefa é alternado
*/
function alternarFeita(tarefasArray, id){
    const tarefa = tarefasArray.find(t => t.id === id);
    if(tarefa) tarefa.feita = !tarefa.feita;
}


/*
Essa função retorna uma array onde o id de obj que foi passado não passe na condição de elementos do filter, ent assim temos uma nova array sem a tarefa que foi pedida para remover, só precisamos da array de obj para irmos nela e procurarmos o id em especifico
*/
function removerTarefa(tarefasArray, id){
    return tarefasArray.filter(t => t.id !== id);
}

// ---------------------------------------- CRIAÇÃO DO DOM(VISUAL) ATRAVES DA PARTE DOS DADOS DO STORAGE -----------------------------------------------

/*
A função criarTarefaDom recebe o obj de tarefa(tarefa) e a array de obj(tarefasArray), ent criamos o container que vai ter as tarefas com seus botões de feita, editar e remover, o container que vai ser uma div vai ter no seu datasetId ou seja na sua indentificação o mesmo id do obj de tarefa, criamos ent um span com o texto do obj de tarefa, e ent mexemos na questão do booleano feita, que por padrão começa com false, ent verificamos se esse booleano está com seus status true aí ent riscamos o texto para fins esteticos de feito, e false aí em questão não fazemos nada.

Criamos então um container para os botoes e damos uma class para esse container, criamos os 3 botões, de feita,editar e remover, e nesse caso não usamos event Delegacion, logo temos que colocar um evento em cada um dos 3 botoes e isso é feito na sua criação, no caso do btnFeita, quando ele for ouvido ele chama a função alternarFeita que recebe de parametro a array de obj, e o id daquela tarefa em especifico, ela serve para ent alternarmos o status do booleando, para ent esse obj de tarefa cair no "span.style.textDecoration = tarefa.feita ? "line-through" : "none";" que verifica o status de feita e ent adiciona a linha cortada ou não.

No Botão de editar, quando ele for ouvido pelo evento, nós então vamos redicionar o usuário para outra pagina, passando pela url o id daquela tarefa. Já no botão de remover a tarefa, nós chamamos a função removerTarefa que recebe a array de obj e id da tarefa em especifico para procurar essa tarefa dentro da array e retornar ent uma nova array sem esse obj em especifico.

Aí add os 3 botões dentro do container botoesDiv, add botoesDiv dentro de tarefaDiv, e add tarefaDiv dentro de containerTarefas
*/
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
        span.style.textDecoration = tarefa.feita ? "line-through" :"none";
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
// -------------------------------- FUNÇÕES DE FILTRO ---------------------------------------------------------

/*
A função aplicarFiltro pega ent a opção que foi escolhida, com base nisso percorre todos os container de tarefas, pega o id daquele container, retorna a tarefa em especifico, aí fazemos um if e else para ver o valor que está em valorFiltro e tomar uma decisão, se for igual a todas, a gente vai no estilo da tarefa e coloca flex ou seja mostra as tarefas, se for feita, ele faz um ternario de ele vai mostrar a tarefa se o booleano feita estiver true, e se for pendentes e a logica ao contraria, do de feitas
*/
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


/*
Na função aplicarPesquisa nós pegamos o texto que está sendo digitado na input de pesquisa, percorremos todas as divs container de tarefas para pegarmos o span delas e ver se p texto que foi digitado na input contém o span da div
*/
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

// ------------------------------- FUNÇÃO PARA RENDERIZAR AS TAREFAS EXISTENTES -------------------------------------------------------------

/*
renderizarTarefas recebe a array de obj, vai em cada obj, e aplica a função criarTarefaDom passando, o obj de tarefa e a array de tarefas(objs)
*/
function renderizarTarefas(tarefasArray){
    tarefasArray.forEach(tarefa => {
        criarTarefaDom(tarefa,tarefasArray);
    });
}


/*
Função de inicialização, onde primeiro vamos chamar a função carregarTarefas() que vai retornar uma array vazia caso seja a primeira iteração do usuário, se não for a primeira iteração ele retorna o que tem lá dentro do localStorage, que seria uma array de obj que é onde contém os dados das tarefas que foram adicionadas.

Caso seja a primeira iteração a função renderizarTarefas não ira renderizar nada pois o retorno de tarefasArray é uma array vazia. Depois temos a função principal, que é o evento de clique no btnAddTarefa, primeiro ele pega o que foi digitado no inputTarefa, ve se algo foi digitado, depois ele cria o obj de tarefa com a função criarTarefaObj, add esse obj dentro da array tarefasArray, salva no localStorage essa array.

Em seguida agora com a array de obj na mão, e o obj em questão que precisamos criar o DOM, nós passamos ambos como argumento para função criarTarefaDom que vai cuidar de pegar os DADOS questão logica e aplicar o visual HTML DOM para o usuário.

Em seguido no filtro aplicamos um evento no select que tem 3 opções por isso o evento de change, onde ele vai percorrer todos os containers e verificar o status booleano deles.

Em seguida na input de Pesquisa, aplicamos um evento de input e acionamos uma função para aplicar a pesquisa correspondente
*/
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

// ---------------------------------------------------------------- INICIALIZAÇÃO -----------------------------------------------------

/*
Evento aplicado ao proprio corpo html para inicialização, onde é chamada a função iniciarToDoList
*/
document.addEventListener('DOMContentLoaded', iniciarToDoList);