class usuario {
    constructor(name,id,birthday,street,numberHouse,cep,current,transactions,date) {
      this.name = name;
      this.id = id;
      this.birthday = birthday;
      this.address = {
              street: street,
              numberHouse: numberHouse,
              zipCode: cep
              };
      this.registratioNumber = this.uuidv4(1);
      this.balanceCurrent = current;
      this.transactions = {
               type: transactions,
               dateLastTransactions: date
               };
  }

    uuidv4() {

    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
        );
    }

    pegarNome(){
        return `${this.name}`
    }

    infoUsuario(){
        return `<br><strong>Nome: </strong>${this.name}<br><strong>Data de Nascimento:</strong> ${this.birthday}<br><strong>Endereço:</strong> ${this.address.street},${this.address.numberHouse}<br> <strong>Saldo:</strong>${parseInt(this.balanceCurrent).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} `
    }

    dataHoje(){
        var data = new Date();
        
        let mes = null;
  switch (data.getMonth()) {
    case 0:
      mes = "Janeiro";
      break;
    case 1:
      mes = "Fevereiro";
      break;
    case 2:
      mes = "Março";
      break;
    case 3:
      mes = "Abril";
      break;
    case 4:
      mes = "Maio";
      break;
    case 5:
      mes = "Junho";
      break;
    case 6:
      month = "Julio";
      break;
    case 7:
      month = "Agosto";
      break;
    case 8:
      mes = "Setembro";
      break;
    case 9:
      mes = "Outubro";
      break;
    case 10:
      mes = "Novembro";
      break;
    case 11:
      mes = "Dezembro";
      break;
    default:
      break;
    }
        return `${data.getDate()} de ${mes} de ${data.getFullYear()}`
    }

    hotaAtual(){
        var hora = new Date()
        var minutos = hora.getMinutes();
        if(minutos < 10 ){
            minutos = `0${hora.getMinutes()}`
        }
        return `${hora.getHours()}:${minutos}`
    }

    Extrato(){
        return `<strong>Nome:</strong> ${this.name}<br><strong>Data hoje:</strong> ${this.dataHoje()}<br><strong>Saldo:</strong> ${parseInt(this.balanceCurrent).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}<br><strong>Ultima transação:</strong>`
    }

    


}

const user1 = new usuario("Daniel Patino",80218269919,"2003-09-29","Mandaguaçu-PR, Rua Amasonas","22","87000-000",1000,"");
const user2 = new usuario("Fidel Patino",000000,"1990-08-27","Mandaguaçu-PR, Rua Amasonas","22","87160-000",1500,"");
const user3 = new usuario("Daniele Gobetti",1111111,"1986-26-08","Mandaguaçu-PR, Rua Amasonas","22","87160-000",2000,"");

let users = [user1,user2,user3]
const nomes = [];

users.forEach((n)=>{
    nomes.push(n.pegarNome())
})

// Telas de Interação
const telaPrincipal = document.getElementById("telaPrincipal")
const acessoGerente = document.getElementById("acessoGerente")
const telaGerente = document.getElementById("telaGerente")
const telaLista = document.getElementById("listaUsuarios");
const telaDeletar = document.getElementById("telaDeletar")
const telaCadastro = document.getElementById("telaCadastro")
const telaOperações = document.getElementById("telaOpções")

const acessoUsuario = document.getElementById("acessoUsuario")
const telaSaque = document.getElementById("telaSaque")
const telaExtrato = document.getElementById("telaExtrato")
const telaDeposito = document.getElementById("telaDeposito")

// Abri a tela para acesso ao gerente
const btnGerente = document.getElementById("btnGerente").addEventListener("click",()=>{
    acessoGerente.style.display = "block";
    telaPrincipal.style.display = "none";
})

// Este botão volta para a tela principal
const voltAcessGerente = document.getElementById("voltGer").addEventListener("click",()=>{
    acessoGerente.style.display = "none";
    telaPrincipal.style.display = "block";
})

// Abri a tela de opções ao gerente
let senhaGerente = document.getElementById("acesso");
const btnEntrarGerente = document.getElementById("entrar").addEventListener("click",()=>{
    if(senhaGerente.value == ""){
        alert("Digite a chave de acesso primeiro")
    } else if(senhaGerente.value == "1234"){
        telaGerente.style.display = "block";
        acessoGerente.style.display = "none";
    } else {
        senhaGerente.value = "";
        alert("Senha incorreta")
    }
})

// Volta para a tela de acesso do gerente
const voltTelaGerente = document.getElementById("voltGerente").addEventListener("click",() => {
        senhaGerente.value = "";
        telaGerente.style.display = "none";
        acessoGerente.style.display = "block";
})

// Abri a lista de Usuario
const btnListaUsuario = document.getElementById("btnListaUsuario");
btnListaUsuario.addEventListener("click", () => {
    const resLista = document.getElementById("telaLista")
    telaLista.style.display = "block"
    telaGerente.style.display = "none";
    resLista.innerHTML = "";
    users.map((e,i) => {
        const div = document.createElement("div");
            div.setAttribute("class", "usuarios")
                 div.innerHTML = `Usuario ${i+1}${e.infoUsuario()}<br><strong>Chave de acesso:</strong> ${i}`
                    resLista.appendChild(div)
    })
})

const voltListaUsuario = document.getElementById("voltLista").addEventListener("click", () =>{
    telaLista.style.display = "none"
    telaGerente.style.display = "block";
    
})

// Abrir tela de cadastro de usuario

const btnTelaCadastro = document.getElementById("btnTelaCadastro")
btnTelaCadastro.addEventListener("click",() => {
    telaGerente.style.display = "none";
    telaCadastro.style.display = "block";
})



const btnCadastrar = document.getElementById("botCriar")
btnCadastrar.addEventListener("click",() => {
    let nameN = document.getElementById("nameN");
        let idN = document.getElementById("idN");
            let birthdayN = document.getElementById("birthdayN");
                let streetN = document.getElementById("streetN");
                    let numberHouseN = document.getElementById("numberHouseN");
                        let zipN = document.getElementById("zipN");

  if(!nameN.value.length || !idN.value.length || !birthdayN.value.length || !streetN.value.length || !numberHouseN.value.length || !zipN.value.length){
      alert("Preencha todos os dados")
  } else {
      var nuser = new usuario(nameN.value, idN.value, birthdayN.value, streetN.value, numberHouseN.value, zipN.value, 0)
      users.push(nuser)
        nomes.push(nuser.name)
        alert("Usuario criado com sucesso")
        nameN .value = "";
            idN.value = "";
                birthdayN.value = "";
                    streetN.value = "";
                        numberHouseN.value = "";
                            zipN.value = "";
                console.log(users)
    }
})

const voltTelaCadastro = document.getElementById("voltCriar").addEventListener("click",() => {
    telaCadastro.style.display = "none";
        telaGerente.style.display = "block";
        nameN .value = "";
        id.value = "";
          birthdayN.value = "";
            streetN.value = "";
              numberHouseN.value = "";
                zipN.value = "";
})


// Abrir tela de deletar Usuario
    const btnTelaDeletar = document.getElementById("btnTelaDeletar").addEventListener("click",() => {
    telaGerente.style.display = "none";
        telaDeletar.style.display = "block";
            const resDelet = document.getElementById("resDelet")
                resDelet.innerHTML = "";
        users.map((el,i) => {

            const del = document.createElement("div");
            del.setAttribute("class", "usuarios2")
            del.innerHTML = `${el.pegarNome()}`            

            const btnDel = document.createElement("img")
            btnDel.setAttribute("src","./img/lixo.png")
            btnDel.setAttribute("class","btnLixo")   

            del.appendChild(btnDel)
            resDelet.appendChild(del)

            btnDel.addEventListener("click", (evt) =>{
                if(confirm("Deseja eliminar o usuário "+ el.pegarNome()+ " ?")){
                    resDelet.removeChild(evt.target.parentNode)
                        users.splice(i,1)
                            console.log(users)
                }

            })
    }) 
 })

const voltTelaDelet = document.getElementById("voltTelaDelet").addEventListener("click", () => {
    telaGerente.style.display = "block";
    telaDeletar.style.display = "none";
})

// Abri a tela de login Usuario
const btnUsuario = document.getElementById("btnUsuario").addEventListener("click",() => {
    acessoUsuario.style.display = "block";
    telaPrincipal.style.display = "none";
})

// Variaveis necesarias
let nomeUsuario = document.getElementById("nameClient")
let senhaUsuario = document.getElementById("passwordClient");
var resUsuario = document.getElementById("resClient")


// Verifica o acesso
const acessar = document.getElementById("botAcessar")
acessar.addEventListener("click",() => {
    if(!nomeUsuario.value.length || !senhaUsuario.value.length){
        alert("Preencha todos os dados")
    }else if(nomeUsuario.value == users[senhaUsuario.value].pegarNome()){
        telaOperações.style.display = "block";
        acessoUsuario.style.display = "none";
    }else {

        nomeUsuario.value = "";
        senhaUsuario.value = "";
        resUsuario.style.color = "red"
        resUsuario.innerHTML = "Usuario ou senha incorreta"
    }
}) 

// Volta para a tela anterior
const btnVoltarUsuario = document.getElementById("voltCadastro").addEventListener("click",() => {
    nomeUsuario.value = "";
    senhaUsuario.value = "";
    resUsuario.innerHTML = "";
    acessoUsuario.style.display = "none";
    telaPrincipal.style.display = "block";
})

// volta tela de operações para o usuario
const voltOperaçoes = document.getElementById("voltOpçoes")
voltOperaçoes.addEventListener("click",() => {
    acessoUsuario.style.display = "block";
    telaOperações.style.display = "none";
    nomeUsuario.value = "";
    senhaUsuario.value = "";
    resUsuario.innerHTML = "";
})

// Abrir tela de Saque
const botaoSaque = document.getElementById("botaoSaque");
botaoSaque.addEventListener("click",()=>{
    resSaque.innerHTML = "";
    telaOperações.style.display = "none";
    telaSaque.style.display = "block";
})

let resSaque = document.getElementById("resSaque")
const botaoSacar = document.getElementById("botaoSacar")
botaoSacar.addEventListener("click",() => {
    
    let valorSaque = document.getElementById("valorSaque");
    let saldoAtual = users[senhaUsuario.value].balanceCurrent;
    if(!valorSaque.value.length){
        resSaque.innerHTML = "Dígite o valor de saque"
    } else if(valorSaque.value > saldoAtual){
        resSaque.innerHTML = "Saldo insuficiente";
        valorSaque.value = "";
        valorSaque.focus();
    } else {
        var saldo = Number(saldoAtual) - Number(valorSaque.value)
        users[senhaUsuario.value].balanceCurrent = saldo;

        resSaque.innerHTML = `Saque de <strong>${Number(valorSaque.value).toLocaleString('pt-br',{style: 'currency',     currency: 'BRL'})}</strong> efetuado com sucesso.<br>Obrigado por utilizar o Banco Patda!`

        UltimasTrans = `Saque de ${Number(valorSaque.value).toLocaleString('pt-br',{style: 'currency',     currency: 'BRL'})}<br><strong>Data:</strong> ${users[senhaUsuario.value].dataHoje()}<br><strong>Hora:</strong> ${users[senhaUsuario.value].hotaAtual()}`;

        valorSaque.value = "";
        valorSaque.focus();
    }
})

const voltSacar = document.getElementById("voltSacar").addEventListener("click",() => {
    telaOperações.style.display = "block";
    telaSaque.style.display = "none";
})

// Abrir tela Deposito
const botaoDeposito = document.getElementById("botaoDeposito");
botaoDeposito.addEventListener("click",()=>{
    resDeposito.innerHTML = "";
    telaOperações.style.display = "none";
    telaDeposito.style.display = "block";
})

let resDeposito = document.getElementById("resDeposito")
const botaoDepositar = document.getElementById("botaoDepositar")
botaoDepositar.addEventListener("click",() => {
    
    let valorDeposito = document.getElementById("valorDeposito");
    let saldoAtual = users[senhaUsuario.value].balanceCurrent;
    if(!valorDeposito.value.length){
        resDeposito.innerHTML = "Dígite o valor de depósito"
    } else {
        var saldo = Number(saldoAtual) + Number(valorDeposito.value)
        users[senhaUsuario.value].balanceCurrent = saldo;

        resDeposito.innerHTML = `Depósito de <strong>${Number(valorDeposito.value).toLocaleString('pt-br',{style: 'currency',     currency: 'BRL'})}</strong> efetuado com sucesso.<br>Obrigado por utilizar o Banco Patda!`

        UltimasTrans = `Depósito de ${Number(valorDeposito.value).toLocaleString('pt-br',{style: 'currency',     currency: 'BRL'})}<br><strong>Data:</strong> ${users[senhaUsuario.value].dataHoje()}<br><strong>Hora:</strong> ${users[senhaUsuario.value].hotaAtual()}`;

        valorDeposito.value = "";
        valorDeposito.focus();
    }
})

// Voltar a tela Operações
const voltDeposito = document.getElementById("voltDeposito").addEventListener("click",() => {
    telaOperações.style.display = "block";
    telaDeposito.style.display = "none";
})

// Abri tela de Extrato
let UltimasTrans = "sem registro de transções";

let telaExtrato2 = document.getElementById("telaExtrato2")
const botaoExtrato = document.getElementById("botaoExtrato")
botaoExtrato.addEventListener("click",()=>{
    telaExtrato.style.display = "block";
    telaOperações.style.display = "none"
    
    telaExtrato2.innerHTML = users[senhaUsuario.value].Extrato();
    telaExtrato2.innerHTML += `${UltimasTrans}`
})

const voltExtrato = document.getElementById("voltExtrato")
voltExtrato.addEventListener("click",() => {
    telaOperações.style.display = "block"
    telaExtrato.style.display = "none";
})



// function kk(){
//     telaExtrato2.style.display = "block";
//     telaExtrato2.innerHTML += user1.Extrato() 
// }
