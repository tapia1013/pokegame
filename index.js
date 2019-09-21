// DATABASE
var pokemonDB = [
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
]



// state of the game
var gameState = {
  userPokemon: '',
  rivalPokemon: ''
}

console.log(gameState);


// elements
var pokemonsEl = document.querySelector('.select-screen').querySelectorAll('.character');
console.log(pokemonsEl);
var battleScreenEl = document.getElementById('battle-screen')
var attackBtnsEl = document.getElementById('battle-screen').querySelectorAll('.attack');
console.log(attackBtnsEl);

// this is the inital while loop to add elements 
var i = 0;
while (i < pokemonsEl.length) {
  // add function to all characters on screen select
  pokemonsEl[i].onclick = function () {
    // getting dataset from html and storing in pokemonName
    var pokemonName = this.dataset.pokemon

    //change img to chosen pokemon
    var player1Img = document.querySelector('.player1').getElementsByTagName('img')
    //change img to chosen cpu pokemon
    var player2Img = document.querySelector('.player2').getElementsByTagName('img')

    // saving pokemon info below
    gameState.userPokemon = pokemonName;

    cpuPick()
    battleScreenEl.classList.toggle('active')

    gameState.currentPokemon = pokemonDB.filter(function (pokemon) {
      // return one of the 3 pokemons that match from DB in line 1
      return pokemon.name == gameState.userPokemon
    })
    // change user source and get pokemon from DB
    player1Img[0].src = gameState.currentPokemon[0].img

    gameState.currentRivalPokemon = pokemonDB.filter(function (pokemon) {
      // return one of the 3 pokemons that match from DB in line 1
      return pokemon.name == gameState.rivalPokemon
    })
    // change cpu source and get pokemon from DB
    player2Img[0].src = gameState.currentRivalPokemon[0].img

    calculateInitialHealth(gameState.currentPokemon)

    console.log(calculateInitialHealth(gameState.currentPokemon));

    // user choose attack


    // cpu health goes down 


    // cpu attack



    // user health goes down



    // rock > scissors

    // paper > rock

    // scissors > paper


    // depending on pokemon types and defense is how hard the attack is going to be and how much health is taken out


    // then whoever gets to health <= 0 loses

  }

  i++;
}

for (var a = 0; a < attackBtnsEl.length; a++) {
  attackBtnsEl[a].onclick = function () {
    // decalre variable with the dataset attack
    var attackName = this.dataset.attack
    // move to gamestate
    gameState.currentUserAttack = attackName

    // run play function
    play(attackName, cpuAttack())
  }
}

var cpuAttack = function () {
  var attacks = ['rock', 'paper', 'scissors'];

  return attacks[randomNumber(0, 3)]
}

var calculateInitialHealth = function (user) {
  return ((0.20 * Math.sqrt(user.level)) * user.defense) * user.hp
}

var play = function (userAttack, cpuAttack) {
  // if user attack equals to
  switch (userAttack) {
    // rock
    case 'rock':
      if (cpuAttack == 'paper') {
        console.log('paper wins rock');
      }
      if (cpuAttack == 'scissors') {
        console.log('rock wins paper');
      }
      if (cpuAttack == 'rock') {
        console.log('its a draw');
      }

      console.log(userAttack);
      break;

    // paper
    case 'paper':
      console.log(userAttack);
      break;

    // scissors
    case 'scissors':
      console.log(userAttack);
      break;
  }
}

//random number generator
var randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// when we choose a pokemon we want a function to run
var cpuPick = function () {
  gameState.rivalPokemon = pokemonsEl[randomNumber(0, 3)].dataset.pokemon
}






















// // pokemon
// // create data for 3 different pokemons, with their names, type, weaknesses, health, and attack moves(name, attack stat, maximum)


// var attack = 20;
// var level = 10;
// var stack = 1.3;
// var defense = 39;

// // create a formula for attacks
// console.log((attack * level) * stack / 7)



// // create a formula for health
// //HP = 0.20 x Sqrt(Pokemon_level) x (HP_base_stat)
// console.log(((0.20 * Math.sqrt(level)) * defense) * 15)




// // let user choose 1 and then assign a random pokemon to battle thats not the users pokemon
// // p1 vs p2




// // when one user loses all his health declare a winner

