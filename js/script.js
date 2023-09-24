let numAssentos = 0;
let assistencia = 0;
let modalContent = document.querySelector('#content')

function gerarAssentos(){
    let congregacao = document.querySelector("#congregacao").value;

    let divExibir = document.querySelector('#mostrar_assentos');
    divExibir.innerHTML = ``;


    // Condicionais que vão definir a organização dos assentos
    if(congregacao === 'Parque-Brasil'){
        numAssentos = 138;

        // Organizando os assentos
        // Gerando as checkbox que representam os assentos
        for(let contador = 1; contador <= numAssentos; contador ++){
            divExibir.innerHTML += `<input type="checkbox" name="assento${contador}" id="assento${contador}" value="${contador}" class="assento">`;

            // Quando der o 12º assento, e seus multiplos, a linha será quebrada
            if(contador % 12 == 0){
                divExibir.innerHTML += `<br>`;
            }

            // Quando for o 3º assento e seus múltiplos, exceto o 12º e seus múltiplos, será inserido um espaçamento entre os assentos
            if((contador % 3 == 0) && (contador % 6 != 0) && (contador != 135)){
                document.getElementById(`assento${contador}`).style.marginRight = "2rem";
            }
        }

        
        // Escondendo modal
        document.querySelector("#fundo").style.display = 'none';
        
        // Mostrando o cabeçalho, os assentos e o botão de continuar
        document.querySelector("#cabecalho").style.display = 'block';
        document.querySelector("#setor_assento").style.display = 'flex';
        document.querySelector("#btn_info").style.display = 'block';

    }else if(congregacao === 'Parque-Brasil(Celebracao)'){
        numAssentos = 138;

        // Organizando os assentos
        // Gerando as checkbox que representam os assentos
        for(let contador = 1; contador <= numAssentos; contador ++){
            divExibir.innerHTML += `<input type="checkbox" name="assento${contador}" id="assento${contador}" value="${contador}" class="assento">`;

            // Quando der o 12º assento, e seus multiplos, a linha será quebrada
            if(contador % 12 == 0){
                divExibir.innerHTML += `<br>`;
            }

            // Quando for o 3º assento e seus múltiplos, exceto o 12º e seus múltiplos, será inserido um espaçamento entre os assentos
            if((contador % 6 == 0) && (contador % 12 != 0)){
                document.getElementById(`assento${contador}`).style.marginRight = "2rem";
            }

        }
        
        document.getElementById("assento133").style.marginLeft = '4px';

        // Escondendo modal
        document.querySelector("#fundo").style.display = 'none';
        
        // Mostrando o cabeçalho, os assentos e o botão de continuar
        document.querySelector("#cabecalho").style.display = 'block';
        document.querySelector("#setor_assento").style.display = 'flex';
        document.querySelector("#btn_info").style.display = 'block';
    }else{
        alert('Escolha uma das congregações alistadas abaixo!');
    }
}

function addInfo(){
    // Mudando o conteúdo do modal;
    modalContent.innerHTML = 
    `
    <label for="adicional">Assistência adicional <button onclick="seeInstruction()" id="question">?</button></label><br>
    <input type="number" class="lastCount" id="adicional" name="adicional"><br>
    
    <label>Assistência na videoconferência</label><br>
    <input type="number" class="lastCount" id="zoom" name="zoom"><br>
    
    <button id="cancel" onclick="closeModal()">Cancelar</button>
    <button class="confirm" id="confirmCount" onclick="fazerContagem()">Contar</button>
    `;

    // Exibindo modal
    document.querySelector("#fundo").style.display = 'flex';
}

function fazerContagem(){
    // Selecionando assistência no video-conferência e adicional (Crianças de colo, assentos sobressalentes, pessoas em pé, etc...)
    let addAssist = Number(document.querySelector('#adicional').value);
    let conferAssist = Number(document.querySelector('#zoom').value);
    assistencia = 0;

    // Verificando quantos assentos estão ocupados
    for(let contador = 1; contador <= numAssentos; contador ++){
        let assentoTal = document.querySelector(`#assento${contador}`)
        if(assentoTal.checked){
            assistencia ++;
        }
    }

    assistencia += (addAssist + conferAssist);

    // Mostrando a assistência
    modalContent.innerHTML = 
    `
    <h1 class="qtd_assist_text" id="modal_title">assistência</h1>
    <p class="qtd_assist_text" id="qtd_assist">${assistencia}</p> 
    <button style="display: block; margin: 0 auto;" id="cancel" onclick="closeModal()">Fechar</button>   
    `;
}

// Função que vai exibir o modal com a opção de selecionar a congregação
function seeModal(){
    modalContent.innerHTML = 
    `
    <h1 id="modal_title">contagem da assistência</h1>
    <label id="congrLabel" for="qtd_assento">Informe a congregação</label><br>

    <select name="congregacao" id="congregacao">
        <option value="" selected hidden disabled>Selecione a congregação</option>
        <option value="Parque-Brasil">Parque Brasil</option>
        <option value="Parque-Brasil(Celebracao)">Parque Brasil (Celebração)</option>
    </select><br>

    <button id="cancel" onclick="closeModal()">Cancelar</button>
    <button class="confirm" id="confirmCongr" onclick="gerarAssentos()">Confirmar</button>
    `;

    document.querySelector("#fundo").style.display = 'flex';
}

function closeModal(){
    document.querySelector("#fundo").style.display = 'none';
}

// Função que vai mostrar a definiçõa do campo de inserir assistência adicional
function seeInstruction(){
    alert(`Dentro da assitência adicional se encaixam pessoas que não estão ocupando um assento dentro da configuração padrão do Salão do Reino, como crianças de colo, pessoas em pé ou pessoas ocupando assentos que foram acrescentados devido a lotação ou algum outro motivo.`);
}

function selectAll(){
    let todasSelecionadas = document.getElementById("selectAll").checked;

    if(todasSelecionadas){
        document.getElementById("selectAllLabel").innerText = "Desmarcar tudo";
    }else{
        document.getElementById("selectAllLabel").innerText = "Selecionar tudo";
    }

    for (let contador = 1; contador <= numAssentos; contador++) {
        let checkboxes = document.getElementById(`assento${contador}`);

        if (checkboxes) {
            checkboxes.checked = todasSelecionadas;
        }
    }
}
