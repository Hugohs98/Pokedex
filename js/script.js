const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn_prev')
const buttonNext = document.querySelector('.btn_next')

let searchPokemon = 1;

/**
 * "This function takes a pokemon name as an argument, fetches the pokemon's data from the PokeAPI, and
 * returns the data if the request was successful."
 * 
 * Now let's use the function to fetch some data.
 * @param pokemon - The name of the pokemon you want to fetch.
 * @returns The data object.
 */
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

/**
 * The function is called renderPokemon, it takes in a parameter called pokemon, and it does a bunch of
 * stuff with that parameter.
 * @param pokemon - the name of the pokemon you want to search for
 */
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    

    const data = await fetchPokemon(pokemon);

    /* Checking if the data is true. If it is, it will display the pokemon's name, number, and image.
    If it is not, it will display a message saying that the pokemon was not found. */
    if(data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default'];
        input.value ='';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :c';
        pokemonNumber.innerHTML = '';
    }
}

/* Preventing the default action of the form, which is to reload the page. It is also calling the
renderPokemon function with the value of the input field. */
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

/* Adding an event listener to the buttonPrev element. When the button is clicked, it will check if the
searchPokemon variable is greater than 1. If it is, it will subtract 1 from the searchPokemon
variable and call the renderPokemon function with the new value of searchPokemon. */
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

/* Adding an event listener to the buttonNext element. When the button is clicked, it will add 1 to the
searchPokemon variable and call the renderPokemon function with the new value of searchPokemon. */
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon('1');