import soundEffects from "./sounds.js";

const PokeApi = (_ => {
    const state = {
        pokemonId: 1,
        pokemonName: 'bulbasaur',
        pokemonSpriteIndex: 0,
        pokemonSpriteArray: ['front_default', 'back_default'],
        showPokemonAbilities: false
    };

    let { pokemonId, pokemonName, pokemonSpriteIndex, pokemonSpriteArray, showPokemonAbilities } = state;

    const init = _ => {
        renderPokemonStats();
        enableGamePadButtons();
        pokeApi(1);
    };

    const renderPokemonStats = _ => {
        const pokedexScreen = document.querySelector('.poke__info');
        pokedexScreen.innerHTML = `
            <p class="poke__height"></p>
            <p class="poke__weight"></p>
            <p class="poke__name"></p>
            <p class="poke__type"></p>
            <p class="poke__id"></p>
            <img src='' class='img__pokemon'>
        `;
    };    

    const enableGamePadButtons = _ => {
        const gamePadUpButton = document.querySelector('.up'),
              gamePadDownButton = document.querySelector('.down'),
              gamePadLeftButton = document.querySelector('.left'),
              gamePadRightButton = document.querySelector('.right'),
              gamePadRedButton = document.querySelector('.red'),
              gamePadBlueButton = document.querySelector('.blue'),
              gamePadGreenButton = document.querySelector('.green'),
              gamePadOrangeButton = document.querySelector('.orange'),
              gamePadYellowPad = document.querySelector('.yellow');

        gamePadYellowPad.addEventListener('click', _ => {
            let btnSoundEffect = new Audio(soundEffects.yellowInputUrl).play();
        });

        gamePadYellowPad.addEventListener('keypress', _ => {
            let btnSoundEffect = new Audio(soundEffects.yellowInputUrl).play();
        });

        gamePadBlueButton.addEventListener('click', _ => {
            let num = Number(gamePadYellowPad.value),
                str = gamePadYellowPad.value.toLowerCase();

            if (Number.isInteger(num)) {
                pokemonId = num;
                pokemonSpriteIndex = 0;
                pokeApi(pokemonId);
            } 
            else {
                pokemonName = str;
                pokemonSpriteIndex = 0;
                pokeApi(pokemonName);
            }
            let btnSoundEffect = new Audio(soundEffects.blueBtnUrl).play();
        });

        gamePadRedButton.addEventListener('click', _ => {
            pokemonId = 1; 
            pokemonSpriteIndex = 0;
            gamePadYellowPad.value = '';
            showPokemonAbilities = false;
            pokeApi(pokemonId);
            let btnSoundEffect = new Audio(soundEffects.redBtnUrl).play();
        });

        gamePadGreenButton.addEventListener('click', _ => {
            showPokemonAbilities = true;
            pokeApi(pokemonId);
            let btnSoundEffect = new Audio(soundEffects.greenOrangeBtnsUrl).play();
        });
    
        gamePadOrangeButton.addEventListener('click', _ => {
            showPokemonAbilities = false;
            pokeApi(pokemonId);
            let btnSoundEffect = new Audio(soundEffects.greenOrangeBtnsUrl).play();
        });

        gamePadUpButton.addEventListener('click', _ => {
            showPokemonAbilities = false;
            pokemonSpriteIndex = 0;
            pokemonId++;
            pokeApi(pokemonId);
            let btnSoundEffect = new Audio(soundEffects.arrowBtnsUrl).play();
        });

        gamePadDownButton.addEventListener('click', _ => {
            showPokemonAbilities = false;
            pokemonSpriteIndex = 0;
            pokemonId--;
            if(!pokemonId) pokemonId = 1;
            pokeApi(pokemonId);
            let btnSoundEffect = new Audio(soundEffects.arrowBtnsUrl).play();
        });

        gamePadLeftButton.addEventListener('click', _ => {
            pokemonSpriteIndex--;
            if (pokemonSpriteIndex < 0) pokemonSpriteIndex = 1; 
            pokeApi(pokemonId);
            let btnSoundEffect = new Audio(soundEffects.arrowBtnsUrl).play();
        });

        gamePadRightButton.addEventListener('click', _ => {
            pokemonSpriteIndex++;
            if (pokemonSpriteIndex > 1) pokemonSpriteIndex = 0; 
            pokeApi(pokemonId);
            let btnSoundEffect = new Audio(soundEffects.arrowBtnsUrl).play();
        });
    };

    const pokeApi = async nameOrId => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${nameOrId}`,
              request = await fetch(URL),
              data = await request.json();

        pokemonId = data.id;

        const displayPokemonAbilities = boolean => {
            if (boolean) {
                const pokedexScreen = document.querySelector('.poke__info');
                pokedexScreen.innerHTML = `
                    <div class="abilities">
                        <p>ABILITIES: ${data.abilities[0].ability.name.toUpperCase()}</p>
                        <p>${data.abilities[1].ability.name.toUpperCase()}</p>
                    </div>
                `;
            } else renderPokemonStats();
        };

        displayPokemonAbilities(showPokemonAbilities);

        const pokemonEl = document.querySelector('.img__pokemon'),
              pokemonIdEl = document.querySelector('.poke__id'),
              pokemonNameEl = document.querySelector('.poke__name'),
              pokemonTypeEl = document.querySelector('.poke__type'),
              pokemonHeightEl = document.querySelector('.poke__height'),
              pokemonWeightEl = document.querySelector('.poke__weight');

        pokemonEl.src = data.sprites[pokemonSpriteArray[pokemonSpriteIndex]];
        pokemonIdEl.textContent = `# ${data.id}`;
        pokemonNameEl.textContent = data.name.toUpperCase();
        pokemonTypeEl.textContent = data.types[0].type.name.toUpperCase();
        pokemonHeightEl.textContent = `HT ${data.height}`;
        pokemonWeightEl.textContent = `WT ${data.weight}`; 
    };

    return {
        init
    };
})();

export default PokeApi;



