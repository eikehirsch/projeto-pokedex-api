const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonTipo = document.querySelector('.pokemon__tipo__Variavel');

const PokemonsEscolhidos = document.querySelector('.pokeball__counter');
const audioPokemonEscolhido = document.querySelector('.pokemonEscolhido');

const primeiroPokemonEscolhido = document.querySelector('.primeiro__pokemon__escolhido')
const segundoPokemonEscolhido = document.querySelector('.segundo__pokemon__escolhido');
const terceiroPokemonEscolhido = document.querySelector('.terceiro__pokemon__escolhido');
const quartoPokemonEscolhido = document.querySelector('.quarto__pokemon__escolhido');
const quintoPokemonEscolhido = document.querySelector('.quinto__pokemon__escolhido');
const sextoPokemonEscolhido = document.querySelector('.sexto__pokemon__escolhido');

const erroTimeCompleto = document.querySelector('.erro__timeCompleto');

const form = document.querySelector('.form');
const inputUsuario = document.querySelector('.input__search');

const botaoAnterior = document.querySelector('.btn-prev')
const botaoProximo = document.querySelector('.btn-next');
const botaoAdicionar = document.querySelector('.botao__escolher__pokemon');

const botaoPiscar = document.querySelector('.circulo__pequeno');



let searchPokemon = 1;
let pokemonCounter = 0;
let nomePokemonEscolhido = "";




const fetchPokemon = async (pokemon) => {
     const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
     if(APIResponse.status == 200){
          const data = await APIResponse.json();
          return data;
     }
}

const renderPokemon = async (pokemon) => {
     pokemonNumber.innerHTML = ''
     pokemonName.innerHTML = "Procurando...";

     const data = await fetchPokemon(pokemon);
     if(data){
          pokemonImage.style.display = 'block';

          pokemonName.innerHTML = data.name;
          nomePokemonEscolhido = data.name[0].toUpperCase() + data.name.substring(1);

          pokemonNumber.innerHTML = data.id;
          searchPokemon = data.id;

          pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
          
          pokemonTipo.innerHTML = '';
          data['types'].forEach(data => {
               pokemonTipo.innerHTML += data['type']['name'].toUpperCase() + ', ';
          });
          pokemonTipo.innerHTML = pokemonTipo.innerHTML.substring(0, pokemonTipo.innerHTML.length - 2);
        
          inputUsuario.value = '';
     }
     else{
          pokemonImage.style.display = 'none';
          pokemonNumber.innerHTML = 'Erro!'
          pokemonName.innerHTML = 'Não encontrado :(';
     }
}






botaoAnterior.addEventListener('click', () => {
     if(searchPokemon > 1){
          searchPokemon -= 1
          renderPokemon(searchPokemon)
     }
    
     botaoPiscar.style.background = "orange";
     setTimeout(() => botaoPiscar.style.background = "red", 100);
   
})

botaoProximo.addEventListener('click', () => {
     renderPokemon(++searchPokemon)

     botaoPiscar.style.background = "orange";
     setTimeout(() => botaoPiscar.style.background = "red", 100);
})


botaoAdicionar.addEventListener('click', () => {
     
     if(pokemonCounter == 6){
          erroTimeCompleto.style.display = "inline";
     }
     else{
          botaoPiscar.style.background = "#5CF2AF";
          setTimeout(() => botaoPiscar.style.background = "red", 200);
          pokemonCounter += 1;
          audioPokemonEscolhido.play();

          switch(pokemonCounter){
               case 1:
                    primeiroPokemonEscolhido.innerHTML = nomePokemonEscolhido;
                    break;
               case 2:  
                    segundoPokemonEscolhido.innerHTML = nomePokemonEscolhido;
                    break;
               case 3:  
                    terceiroPokemonEscolhido.innerHTML = nomePokemonEscolhido;
                    break;
               case 4:
                    quartoPokemonEscolhido.innerHTML = nomePokemonEscolhido;
                    break;
               case 5:
                    quintoPokemonEscolhido.innerHTML = nomePokemonEscolhido;
                    break;
               case 6:
                    sextoPokemonEscolhido.innerHTML = nomePokemonEscolhido;
                    break;
               
          }
          PokemonsEscolhidos.innerHTML = pokemonCounter;
     }
})

form.addEventListener('submit', (event) => {
     event.preventDefault();
     renderPokemon(inputUsuario.value.toLowerCase());
})





renderPokemon(searchPokemon);
