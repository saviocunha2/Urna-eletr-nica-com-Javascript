
//variaveis de controle de interface
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

//variaveis de ambiente 

let etapaAtual = 0;
let numero = '';
let votoBranco = false;

function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0; i<etapa.numeros; i++){
        if(i===0){
        numeroHtml += '<div class="numero pisca"></div>';
    }else{
        numeroHtml += '<div class="numero"></div>';
    }
}

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display ='none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

//funções
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display ='nome';
        descricao.innerHTML = `nome ${candidato.nome}<br/>Partido:${candidato.partido}`;

        let fotosHtml ='';
        for(let i in candidato.foto){
            fotosHtml += `<div class="d-1-image"><img src="./images/${candidato.foto[i].url}" alt="" /> ${candidato.foto[i].legenda}</div>`;
        }

        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display ='block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO!!</div>';
    }
  
}

function clicou(n){
    let elementoNumero = document.querySelector('.numero.pisca');
    if( elementoNumero !== null){
        elementoNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elementoNumero.classList.remove('pisca');
        if( elementoNumero.nextElementSibling != null){
            elementoNumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();
        }
       
    }else{
        atualizaInterface();
    }
}

function branco(){
        numero = '';
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO!</div>';
    
}

function corrige(){
    comecarEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco === true){
        votoConfirmado = true;
        console.log("Confirmando como BRANCO...");
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        console.log("Confirmando como "+numero);
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM!</div>';
        }
    }
}

comecarEtapa();