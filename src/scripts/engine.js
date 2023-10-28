const states = {
   view: {
      time: document.getElementById('time'),
      score: document.getElementById('score'),
      life: document.getElementById('life'),
      square: document.querySelectorAll('.square'),
      enemy: document.querySelector('.enemy'),
      button: document.getElementById('btn-continuar')
   },
   values: {
      timeTotal: 30,
      scoreTotal: 0,
      lifeTotal: 3,
      position: 0,
   },
   action: {
      contador: setInterval(mudarTempo, 1000),
      enemy: setInterval(randomEnemy, 1000),
   }
};

function reiniciarJogo() {
   // Configura o novo valor de tempo total
   states.values.timeTotal = 30;
   states.action.contador = setInterval(mudarTempo, 1000)
   states.action.enemy = setInterval(randomEnemy, 1000)
   mudarVida()
}
function tocarSom(nomeAudio) {
   let som = new Audio(`./src/audios/${nomeAudio}.m4a`);
   som.volume = 0.2
   som.play()
}

function mudarVida() {
   states.view.life.innerText = states.values.lifeTotal--
   let vida = states.view.life.innerText
   let pontos = states.view.score.innerText
   let contador = states.view.time.innerText
   let btn = states.view.button

   if (vida <= 0 && contador <= 0) {
      alert(`Você marcou ${pontos} pontos no total.\n Reinicie a página para tentar novamente`)

      btn.classList.remove('ativo')

      states.view.life.innerText = 0;

      clearInterval(states.action.contador)
      clearInterval(states.action.enemy)
   }
}

function mudarTempo() {
   states.view.time.innerText = states.values.timeTotal--
   let contador = states.view.time.innerText
   let btn = states.view.button
   btn.classList.remove('ativo')


   if (contador <= 0) {

      btn.classList.add('ativo')

      clearInterval(states.action.contador)
      clearInterval(states.action.enemy)
   }
}

function randomEnemy() {
   states.view.square.forEach((values) => {
      values.classList.remove('enemy')
   })

   let x = Math.floor((Math.random() * 9))
   let enemy = states.view.square[x]
   enemy.classList.add('enemy')

   states.values.position = enemy.id
}

function addListenerHitBox() {

   states.view.square.forEach((square) => {
      square.addEventListener('mousedown', () => {
         if (square.id == states.values.position) {

            states.values.scoreTotal++

            states.view.score.textContent = states.values.scoreTotal

            states.values.position = null;

            tocarSom('hit')
         }
      })
   })

}

function main() {
   alert('ACERTE O ALVO PARA MARCAR PONTOS')
   addListenerHitBox()
   mudarVida()
}

main()
