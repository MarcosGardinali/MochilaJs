const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];


//forEach que percorre os itens do array que está na localStorage e os passa para a função cria elemento, que os cria na página
itens.forEach( (elemento) =>{
	criaElemento(elemento);
} )



form.addEventListener("submit", (evento) => {
	evento.preventDefault();
	const nome = evento.target.elements["nome"];
	const quantidade = evento.target.elements["quantidade"];

	const existe = itens.find(elemento => elemento.nome === nome.value);

	//Objeto que recebe os itens que vão para a localStorage
	const itemAtual = {
		"nome": nome.value,
		"quantidade": quantidade.value,
	}

	if(existe){
		itemAtual.id = existe.id;
		atualizaElemento(itemAtual);

		itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
	}else{
		itemAtual.id =  itens[itens.length - 1] ? (itens[itens.length -1]).id + 1: 0;
		criaElemento(itemAtual);	

		//Passando o objeto para a lista
		itens.push(itemAtual);
	}
	

	//Armazenando a lista na localStorage 	//O metodo stringfy serve para converter os valores para string(A local storage só armazena string)
	localStorage.setItem("itens",  JSON.stringify(itens));
	
	nome.value = "";
	quantidade.value = "";	
});



function criaElemento(item){	
	//Criando uma LI
	const novoItem = document.createElement("li");
	novoItem.classList.add("item");

	//Criando o strong que vai na LI
	const numItem = document.createElement("strong");
	numItem.innerHTML = item.quantidade;
	numItem.dataset.id = item.id;

	//Passando para a Li o número que vai na strong e o nome
	novoItem.appendChild(numItem);
	novoItem.innerHTML += item.nome;

	//Colocando o Li na lista
	lista.appendChild(novoItem);

	novoItem.appendChild(botaoDeleta(item.id));

	
}

function atualizaElemento(item){
	document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
	const elementoBotao = document.createElement("button");
	elementoBotao.innerText = "X";

	elementoBotao.addEventListener("click", function(){
		deletaElemento(this.parentNode, id);
	});

	return elementoBotao;
}

function deletaElemento(tag, id){
	tag.remove();

	itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

	localStorage.setItem("itens",  JSON.stringify(itens));
}