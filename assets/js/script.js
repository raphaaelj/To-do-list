let addBtn = document.getElementById('addBtn')
let addInput = document.getElementById('addInput')
let containerTarefas = document.getElementById('container-tarefas')

const validarInput = () => { //Se input > que 0 = TRUE;
    return addInput.value.trim().length > 0;
}

const controleAddTarefas = () => { //Valida a informação do INPUT
    const inputValido = validarInput();

    if (!inputValido) {
        return addInput.classList.add("error");
    }

    const itemTarefa = document.createElement("div")
    itemTarefa.classList.add("item-tarefa");

    const textoItemTarefa = document.createElement("p")
    textoItemTarefa.innerText = addInput.value;

    textoItemTarefa.addEventListener("click", () => tratarClick(textoItemTarefa))

    const removeTarefa = document.createElement("i")
    removeTarefa.classList.add("fa-solid", "fa-trash")

    removeTarefa.addEventListener("click", () => tratarRemoveClick(itemTarefa))

    itemTarefa.appendChild(textoItemTarefa);
    itemTarefa.appendChild(removeTarefa);
    containerTarefas.appendChild(itemTarefa);
    addInput.value = ''
    atualizarLocalStorage();
}

const tratarClick = (textoItemTarefa) => {
    let tarefas = containerTarefas.childNodes;

    for (const tarefa of tarefas) {
        if (tarefa.firstChild.isSameNode(textoItemTarefa)) {
            tarefa.firstChild.classList.toggle("feito")
        }
    }
    atualizarLocalStorage();
};
const tratarRemoveClick = (itemTarefa) => {
    let tarefas = containerTarefas.childNodes;

    for (const tarefa of tarefas) {
        if (tarefa.isSameNode(itemTarefa)) {
            tarefa.remove(itemTarefa);
        }
    }
    atualizarLocalStorage();
}

const controleInputAlterado = () => { //Ao preencher o INPUT
    const inputValido = validarInput();

    if (inputValido) {
        return addInput.classList.remove("error");
    }
}

const atualizarLocalStorage = () => {
    const tarefas = containerTarefas.childNodes;

    const tarefasLocalStorage = [...tarefas].map((tarefa) => {
        const conteudo = tarefa.firstChild; //paragrafo
        const estaFeita = conteudo.classList.contains('feito'); //se a tarefa está feita

        return { description: conteudo.innerText, estaFeita };
    })
    localStorage.setItem("tarefas", JSON.stringify(tarefasLocalStorage))
}

const carregarLocalStorage = () => {
    const tarefasLocalStorage = JSON.parse(localStorage.getItem("tarefas"));

    if (tarefasLocalStorage == null) return;

    for (const tarefa of tarefasLocalStorage) {
        const itemTarefa = document.createElement("div")
        itemTarefa.classList.add("item-tarefa");

        const textoItemTarefa = document.createElement("p")
        textoItemTarefa.innerText = tarefa.description;
        if (tarefa.estaFeita) {
            textoItemTarefa.classList.add("feito");
        }
        textoItemTarefa.addEventListener("click", () => tratarClick(textoItemTarefa))

        const removeTarefa = document.createElement("i")
        removeTarefa.classList.add("fa-solid", "fa-trash")
        removeTarefa.addEventListener("click", () => tratarRemoveClick(itemTarefa))

        itemTarefa.appendChild(textoItemTarefa);
        itemTarefa.appendChild(removeTarefa);
        containerTarefas.appendChild(itemTarefa);
    }
}