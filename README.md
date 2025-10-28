## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Work+Sans&size=25&pause=1000&color=44E3D3&width=435&lines=%F0%9F%96%A5+To+Do+List" alt="Typing SVG" /></a>

O ToDoList Avançado é um aplicativo simples e funcional de gerenciamento de tarefas, desenvolvido com HTML, CSS e JavaScript puro, que permite ao usuário adicionar, editar, remover, marcar como feita, pesquisar e filtrar tarefas diretamente no navegador — tudo sem precisar de banco de dados externo.

As tarefas são salvas automaticamente no LocalStorage, garantindo que nada se perca mesmo ao fechar a página.

---

## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Work+Sans&size=25&pause=1000&color=44E3D3&width=435&lines=%F0%9F%AA%B4+Funcionalidades" alt="Typing SVG" /></a>

- 🆕 Adicionar tarefas: Digite a tarefa no campo de input e clique no botão de adicionar para inseri-la na lista.

- ✔ Marcar como feita: Clique no botão ✔ para alternar o status da tarefa; tarefas feitas ficam riscadas.

- ✏ Editar tarefas: Redirecione para a página de edição e altere o texto da tarefa desejada.

- 🗑 Remover tarefas: Exclua uma tarefa específica com um clique no botão de lixeira.

- 🔍 Pesquisar tarefas: Filtre tarefas em tempo real digitando palavras-chave no campo de pesquisa.

- 📊 Filtrar tarefas: Use o seletor para mostrar todas, apenas feitas ou apenas pendentes.

- 💾 Persistência de dados: Todas as tarefas são salvas no LocalStorage, garantindo que o conteúdo permaneça mesmo após fechar o navegador.

---

## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Work+Sans&size=25&pause=1000&color=44E3D3&width=435&lines=%E2%99%A3%EF%B8%8F+Estrutura+Do+Projeto" alt="Typing SVG" /></a>

O código do projeto está organizado para facilitar manutenção e entendimento:

| Seção | Descrição |
|--------|------------|
| *Seleção de elementos* | Captura dos inputs, botões e container das tarefas no DOM. |
| *LocalStorage* | Funções para carregar e salvar o array de tarefas. |
| *Criação de objetos* | Criação de cada tarefa como objeto JS com id, texto e status booleano. |
| *Manipulação de tarefas* | Funções para alternar status de feita, remover e editar tarefas. |
| *Renderização do DOM* | Criação dinâmica de elementos HTML de cada tarefa com botões de ação. |
| *Filtros e pesquisa* | Funções que permitem filtrar tarefas por status e buscar pelo texto digitado. |
| *Eventos* | Escutam interações do usuário (cliques nos botões, alterações no input e select). |
| *Inicialização* | Carrega as tarefas do LocalStorage e renderiza a lista ao abrir a aplicação. |


---

## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Work+Sans&size=25&pause=1000&color=44E3D3&width=435&lines=%E2%9A%A0%EF%B8%8F+Tecnologias+Utilizadas" alt="Typing SVG" /></a>

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo"  />
  <img width="19" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo"  />
  <img width="19" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="19" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="40" alt="git logo"  />
  <img width="19" />
</div>  

---

## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Work+Sans&size=25&pause=1000&color=44E3D3&width=435&lines=%F0%9F%94%8D+Logica+de+funcionamento" alt="Typing SVG" /></a>

1 - O usuário digita uma tarefa e clica em “Adicionar”.

2 - Essa tarefa é transformada em um objeto JavaScript com id, texto e feita: false.

3 - O array de tarefas é salvo no LocalStorage (convertido em JSON).

4 - A função criarTarefaDom() lê o objeto e cria dinamicamente os elementos HTML com os botões de ação.

5 - Alterações (marcar como feita, remover, editar) atualizam o objeto correspondente e refletem visualmente no DOM.

6 - O filtro e a pesquisa percorrem os elementos do DOM e exibem apenas os itens que atendem aos critérios do usuário.

---

## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Work+Sans&size=25&pause=1000&color=44E3D3&width=435&lines=%E2%8C%A8++Conceitos+Aplicados" alt="Typing SVG" /></a>

- Manipulação do DOM com document.createElement, appendChild e dataset.

- Armazenamento persistente de dados usando LocalStorage.

- Uso de funções de array: .forEach(), .filter(), .find().

- Eventos com addEventListener aplicados diretamente nos botões criados dinamicamente.

- Organização do código em funções claras, com comentários explicativos, separando lógica de dados e visualização.

---

## <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Work+Sans&size=25&pause=1000&color=44E3D3&width=435&lines=%F0%9F%96%B1++Aprendizado" alt="Typing SVG" /></a>

> “Esse projeto me ensinou a importância de manter o vínculo entre dados e DOM, garantindo que cada interação do usuário reflita corretamente na interface e no armazenamento. Também aprendi a manipular arrays de objetos, eventos e filtros de forma prática, criando uma experiência dinâmica para o usuário.”

---
