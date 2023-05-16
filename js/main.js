const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach( (e) => {
    criaElemento(e)
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault()


    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    nome.addEventListener('keypress', function(evento) {
        if (evento.key === 'Enter') {
          quantidade.focus();
          evento.preventDefault();
        }
      });

    const nomeFinal = nome.value.toUpperCase()

    const quantidadeFinal = parseInt(quantidade.value);

    if (quantidadeFinal <= 0 || isNaN(quantidadeFinal)) {
        console.log('A quantidade não pode ser negativa ou vazia');
        return;
    }
    
    const existe = itens.find(e => e.nome === nomeFinal)

    const itemAtual = {
        nome: nomeFinal,
        quantidade: quantidade.value
    };

    if(existe){
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)

        itens[itens.findIndex(e => e.id === existe.id)] = itemAtual

    }   else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0
        
        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";

    nome.focus();
});

function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");
    const novaDivInfo = document.createElement('div');
    const novaDivBotao = document.createElement('div');
    novaDivInfo.classList.add('info')
    novaDivBotao.classList.add('botao')


    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id


    novaDivInfo.appendChild(numeroItem)


    novaDivInfo.innerHTML += item.nome;
    novaDivBotao.appendChild(botaoDeleta(item.id))
    novaDivBotao.appendChild(botaoConfirma(item.id))
    novoItem.appendChild(novaDivInfo)
    novoItem.appendChild(novaDivBotao)



    lista.appendChild(novoItem);


}

function atualizaElemento (item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoConfirma(id) {
    const elementoBotaoConfirma = document.createElement("button")
    elementoBotaoConfirma.innerText = "✔"
    elementoBotaoConfirma.classList = 'confirma'
    
    elementoBotaoConfirma.addEventListener('click', function(){
        confirmaElemento(this.parentNode.parentNode)
     })
 

    return elementoBotaoConfirma
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText="X"
    elementoBotao.classList = 'deleta'

    elementoBotao.addEventListener('click', function(){
       deletaElemento(this.parentNode.parentNode, id)
    })

    return elementoBotao
}

function confirmaElemento(tag) {
    tag.classList.add('confirmado')
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(e => e.id === id) , 1)

    localStorage.setItem("itens", JSON.stringify(itens));
    
}
