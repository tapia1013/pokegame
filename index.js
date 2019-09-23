// state of the game
var gameState = {
  userPokemon: '',
  rivalPokemon: '',
  // DATABASE
  pokemonDB: [
    {
      name: 'charmander',
      type: 'fire',
      hp: 39,
      attack: 52,
      defense: 43,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
    },
    {
      name: 'bulbasaur',
      type: 'fire',
      hp: 45,
      attack: 49,
      defense: 49,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'
    },
    {
      name: 'squirtle',
      type: 'water',
      hp: 44,
      attack: 48,
      defense: 65,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'
    }
  ],
  elements: {
    // elements
    pokemonsEl: document.querySelector('.select-screen').querySelectorAll('.character'),
    battleScreenEl: document.getElementById('battle-screen'),
    attackBtnsEl: document.getElementById('battle-screen').querySelectorAll('.attack')
  },
  init: function () {
    // this is the inital while loop to add elements 
    var i = 0;
    while (i < gameState.elements.pokemonsEl.length) {
      // add function to all characters on screen select
      gameState.elements.pokemonsEl[i].onclick = function () {
        // getting dataset from html and storing in pokemonName
        var pokemonName = this.dataset.pokemon
        //change img to chosen pokemon
        var player1Img = document.querySelector('.player1').getElementsByTagName('img')
        //change img to chosen cpu pokemon
        var player2Img = document.querySelector('.player2').getElementsByTagName('img')
        // saving pokemon info below
        gameState.userPokemon = pokemonName;
        gameState.cpuPick()
        gameState.elements.battleScreenEl.classList.toggle('active')
        gameState.currentPokemon = gameState.pokemonDB.filter(function (pokemon) {
          // return one of the 3 pokemons that match from DB in line 1
          return pokemon.name == gameState.userPokemon
        })
        // change user source and get pokemon from DB
        player1Img[0].src = gameState.currentPokemon[0].img
        gameState.currentRivalPokemon = gameState.pokemonDB.filter(function (pokemon) {
          // return one of the 3 pokemons that match from DB in line 1
          return pokemon.name == gameState.rivalPokemon
        })
        // change cpu source and get pokemon from DB
        player2Img[0].src = gameState.currentRivalPokemon[0].img

        // current user and cpu pokemon initial health
        gameState.currentPokemon[0].health = gameState.calculateInitialHealth(gameState.currentPokemon)
        gameState.currentPokemon[0].originalHealth = gameState.calculateInitialHealth(gameState.currentPokemon)

        gameState.currentRivalPokemon[0].health = gameState.calculateInitialHealth(gameState.currentRivalPokemon)
        gameState.currentRivalPokemon[0].originalHealth = gameState.calculateInitialHealth(gameState.currentRivalPokemon)

        console.log(gameState);
      }
      i++;
    }

    for (var a = 0; a < gameState.elements.attackBtnsEl.length; a++) {
      gameState.elements.attackBtnsEl[a].onclick = function () {
        // decalre variable with the dataset attack
        var attackName = this.dataset.attack
        // move to gamestate
        gameState.currentUserAttack = attackName

        // run play function
        gameState.play(attackName, gameState.cpuAttack())
      }
    }
  },
  cpuAttack: function () {
    var attacks = ['rock', 'paper', 'scissors'];

    return attacks[gameState.randomNumber(0, 3)]
  },
  calculateInitialHealth: function (user) {
    return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp
  },
  attackMove: function (attack, level, stack, critical, enemy, attacker) {
    console.log(enemy.name + ' before: ' + enemy.health);
    var attackAmount = ((attack * level) * (stack + critical))
    enemy.health = enemy.health - attackAmount

    // getting health bar from html
    var userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside')

    var cpuHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside')

    // bring down enemy attack
    if (enemy.owner == 'user') {
      // bring down visual health
      var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
      userHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%'
    } else {
      var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
      cpuHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%'
    }
    gameState.checkWinner(enemy, attacker)
    console.log(enemy.name + ' after: ' + enemy.health);
  },
  // check winner
  checkWinner: function (enemy, attacker) {
    if (enemy.health <= 0) {
      console.log('HEY WINNER ' + attacker.name)
    }
  },
  //random number generator
  randomNumber: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  },
  // when we choose a pokemon we want a function to run
  cpuPick: function () {
    // do not choose my pokemon with do...while loop
    do {
      gameState.rivalPokemon = gameState.elements.pokemonsEl[gameState.randomNumber(0, 3)].dataset.pokemon
      console.log('looping ' + gameState.rivalPokemon);
    } // keep looping if same pokemon as mine
    while (gameState.userPokemon == gameState.rivalPokemon)
  },
  play: function (userAttack, cpuAttack) {
    var currentPokemon = gameState.currentPokemon[0];
    var currentRivalPokemon = gameState.currentRivalPokemon[0];
    currentPokemon.owner = 'user'
    currentRivalPokemon.owner = 'cpu'
    // if user attack equals to
    switch (userAttack) {
      // rock
      case 'rock':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)

            // cpu
            if (currentRivalPokemon.health >= 1) {
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
            }
          }
        }

        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)

            if (currentRivalPokemon.health >= 1) {
              // cpu
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
            }
          }
        }

        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .1, currentRivalPokemon, currentPokemon)

            if (currentRivalPokemon.health >= 1) {
              // cpu
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
            }
          }
        }

        break;

      // paper
      case 'paper':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)

            if (currentRivalPokemon.health >= 1) {
              // cpu
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
            }
          }
        }

        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            // user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)

            if (currentRivalPokemon.health >= 1) {
              // cpu
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
            }
          }
        }

        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {

            // user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)

            if (currentRivalPokemon.health >= 1) {
              // cpu
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
            }
          }
        }

        break;

      // scissors
      case 'scissors':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {

            // user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)

            if (currentRivalPokemon.health >= 1) {
              // cpu
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
            }
          }
        }

        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {

            // user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)

            if (currentRivalPokemon.health >= 1) {
              // cpu
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
            }
          }
        }

        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {

            // user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)

            if (currentRivalPokemon.health >= 1) {
              // cpu
              attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
            }
          }
        }

        break;
    }
  }
}

gameState.init()