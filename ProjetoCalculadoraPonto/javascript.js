var now = new Date(); 
monthName = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");
dayName = new Array("Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado");
document.getElementById("data").innerHTML = "Hoje é " + (dayName[now.getDay()]) + ", " 
+ (now.getDate()) + " de " + (monthName[now.getMonth()]) + " de " + ([now.getFullYear()]);//ENVIA A DATA ATUAL 

function recebeHorarios() { //RECEBE HORÁRIOS DE ENTRADA E DE SAIDA
  let valorEntrada = document.getElementById("horarioEntrada").value;
  let valorSaida = document.getElementById("horarioSaida").value;
  let horaEntrada = pegaHora(valorEntrada);
  let minutoEntrada = pegaMinuto(valorEntrada);
  let horaSaida = pegaHora(valorSaida);
  let minutoSaida = pegaMinuto(valorSaida);
  let horasCalculadas = timeConvert(
    minutoEntrada,
    minutoSaida,
    horaEntrada,
    horaSaida
  );
  const resultados = document.getElementById("horasTrabalhadas");
  resultados.innerHTML = `${horasCalculadas}`;
  console.log(horasCalculadas);

  if((!valorEntrada) || (!valorSaida)){//VERIFICA SE O USUÁRIO TENTOU CALCULAR HORAS VAZIAS
    resultados.innerHTML = '<p id="mensagemErro">Digite hora de entrada e hora de saída</p>';
  }
} 

function pegaHora(horaEntrada) {//SEPARA HORA DO MINUTO E ARMAZENA A HORA NA FUNÇÃO
  let hora = horaEntrada.split(":")[0];
  return parseInt(hora);
}

function pegaMinuto(horaEntrada) {//SEPARA HORA DO MINUTO E ARMAZENA O MINUTO NA FUNÇÃO
  let minuto = horaEntrada.split(":")[1];
  return parseInt(minuto);
}
function transformaHoraEmMinuto(hora, minuto) {//TRANSFORMA A HORA EM MINUTOS E FAZ A SOMA DE TODOS OS MINUTOS
  return hora * 60 + minuto;
}

function conversaoValores(minEntrada, minSaida, hora) {//CHECA HORARIO DE MADRUGADA E CORRIGE CASO FIQUE COM HORA A MAIS
  var horaConvertida = hora;
  if (minEntrada != 0) {
    if (minEntrada != minSaida) {
      horaConvertida -= 1;
    }
  }
  return horaConvertida;
}

function timeConvert(minEntrada, minSaida, horaEntrada, horaSaida) {//CONVERTE OS MINUTOS PARA HORA
  var diferencaHora = 0;
  if (horaEntrada > horaSaida) {
    diferencaHora =
      transformaHoraEmMinuto(horaEntrada, minEntrada) -
      transformaHoraEmMinuto(horaSaida, minSaida);
    var hours = diferencaHora / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    rhours = 24 - (horaEntrada - horaSaida);
    rhours = conversaoValores(minEntrada, minSaida, rhours);
    if (rminutes != 0) {
      rminutes = Math.abs((rminutes -= 60));
    }
  } else {
    diferencaHora =
      transformaHoraEmMinuto(horaSaida, minSaida) -
      transformaHoraEmMinuto(horaEntrada, minEntrada);
    hours = diferencaHora / 60;
    rhours = Math.floor(hours);
    minutes = (hours - rhours) * 60;
    rminutes = Math.round(minutes);
  }
  if(rminutes<10){//INSERE CARACTER 0 FALTANTE 
    rminutes="0"+rminutes;
  }
  if(document.getElementById('btn1h').checked == true)//DIMINUI 1H CASO TENHA CLICADO NO BOTAO
  {
     rhours-=1;
  }
  if(document.getElementById('btn2h').checked == true)//DIMINUI 2H CASO TENHA CLICADO NO BOTAO
  {
    rhours-=2;
  }

  document.getElementById('btn1h').checked = false;//RESETA O INPUT RADIO
  document.getElementById('btn2h').checked = false;//RESETA O INPUT RADIO

  return rhours + ":" + rminutes + "hrs";
}



