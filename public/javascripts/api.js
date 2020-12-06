// Pokémons container
const poke_container = document.querySelector('.poke_container');
const nextButton = document.querySelector('.next-pokemons-list');
const img_container = Array.from(document.querySelectorAll('.img-container'));
// Pokémons number that will be fetched
var pokemons_number = 196;
// Pokémons colors
const colors = {
	fire: 'rgb(234, 32, 39)',
	grass: 'rgb(68, 189, 50)',
	electric: 'rgb(255, 221, 89)',
	water: 'rgb(15, 188, 249)',
	ground: 'rgb(192, 57, 43)',
	rock: 'rgb(83, 92, 104);',
	fairy: 'rgb(179, 85, 160)',
	poison: 'rgb(19, 15, 64)',
	bug: 'rgb(196, 229, 56)',
	dragon: 'rgb(60, 64, 198)',
	psychic: 'rgb(239, 87, 119)',
	flying: 'rgb(52, 231, 228)',
	fighting: 'rgb(72, 84, 96)',
	normal: 'rgb(11, 232, 129)'
};

// Get colors keys
const main_types = Object.keys(colors);
// console.log(main_types);

// Fetching pokémons depend on the pokemon number variable
const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

// Get pokémons
const getPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const PokemonRespons = await fetch(url);
    const pokemon = await PokemonRespons.json();
    // console.log(pokemon);
	BuildPokemonCardComponent(pokemon);
};
// Build pokémon card component
const BuildPokemonCardComponent = (pokemon) => {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
    // Info
    const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const pokemon_height = pokemon.height;
    const pokemon_weight = pokemon.weight;
    // console.log(pokemon.weight);
    const base_experience = pokemon.base_experience;
    // Each type of pokémon has a color
	const color = colors[type];
    
    // Each pokémon card will get a color
    // pokemonEl.style.backgroundColor = color;

    // Returning Pokémon card content
	const pokeInnerHTML = `
        <div class="img-container">
            <center>
                <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" />
            </center>
        </div>
        <div class="info">
            <h3 class="name">${name}</h3>
            <span class="number">${pokemon.id.toString()}</span>
            <small class="type" style="background-color: ${color};">
            <span>${type.charAt(0).toUpperCase() + type.slice(1)}</span></small>
        </div>
        <ul>
            <div class="all-abilities">
                <div class="ability">
                    <label>Height</label>
                    <li>${pokemon_height}</li>
                </div>
                <div class="ability">
                    <label>Weight</label>
                    <li>${pokemon_weight}</li>
                </div>
                <div class="ability">
                    <label>Base experience</label> 
                    <li>${base_experience}</li>
                </div>
            </div>
            <button class="more"><a href="">...</a></button>
        </ul>
    `;
    // Pokémon card content
	pokemonEl.innerHTML = pokeInnerHTML;
    // Append pokémon card into poke_container
	poke_container.appendChild(pokemonEl);
}

fetchPokemons();

