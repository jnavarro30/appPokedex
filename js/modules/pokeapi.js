const PokeApi = (_ => {
    const state = {
        pokeId: 1,
        pokeName: 'bulbasaur',
        spriteIndex: 0,
        spriteArr: ['front_default', 'back_default'],
        showAbilities: false
    };

    let { pokeId, pokeName, spriteIndex, spriteArr, showAbilities } = state;

    const init = _ => {
        renderHTML();
        listeners();
        pokeApi(1);
    };

    const renderHTML = _ => {
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

    const listeners = _ => {
        const upBtnEl = document.querySelector('.up'),
              downBtnEl = document.querySelector('.down'),
              leftBtnEl = document.querySelector('.left'),
              rightBtnEl = document.querySelector('.right'),
              redBtnEl = document.querySelector('.red'),
              blueBtnEl = document.querySelector('.blue'),
              greenBtnEl = document.querySelector('.green'),
              orangeBtnEl = document.querySelector('.orange'),
              yellowInputEl = document.querySelector('.yellow');

        blueBtnEl.addEventListener('click', _ => {
            let num = Number(yellowInputEl.value),
                str = yellowInputEl.value.toLowerCase();

            if (Number.isInteger(num)) {
                pokeId = num;
                spriteIndex = 0;
                pokeApi(pokeId);
            } 
            else {
                pokeName = str;
                spriteIndex = 0;
                pokeApi(pokeName);
            }
        });

        redBtnEl.addEventListener('click', _ => {
            pokeId = 1; 
            spriteIndex = 0;
            yellowInputEl.value = '';
            pokeApi(pokeId);
        });

        greenBtnEl.addEventListener('click', _ => {
            showAbilities = true;
            pokeApi(pokeId);
        });
    
        orangeBtnEl.addEventListener('click', _ => {
            showAbilities = false;
            pokeApi(pokeId);
        });

        upBtnEl.addEventListener('click', _ => {
            showAbilities = false;
            spriteIndex = 0;
            pokeId++;
            pokeApi(pokeId);
        });

        downBtnEl.addEventListener('click', _ => {
            showAbilities = false;
            spriteIndex = 0;
            pokeId--;
            if(!pokeId) pokeId = 1;
            pokeApi(pokeId);
        });

        leftBtnEl.addEventListener('click', _ => {
            spriteIndex--;
            if (spriteIndex < 0) spriteIndex = 1; 
            pokeApi(pokeId);
        });

        rightBtnEl.addEventListener('click', _ => {
            spriteIndex++;
            if (spriteIndex > 1) spriteIndex = 0; 
            pokeApi(pokeId);
        });
    };

    const pokeApi = async idOrName => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${idOrName}`,
              request = await fetch(URL),
              data = await request.json();

        pokeId = data.id;

        const displayAbilities = boolean => {
            if (boolean) {
                const pokedexScreen = document.querySelector('.poke__info');
                pokedexScreen.innerHTML = `
                    <div class="abilities">
                        <p>ABILITIES: ${data.abilities[0].ability.name.toUpperCase()}</p>
                        <p>${data.abilities[1].ability.name.toUpperCase()}</p>
                    </div>
                `;
            } else renderHTML();
        };

        displayAbilities(showAbilities);

        const pokemonEl = document.querySelector('.img__pokemon'),
              pokemonId = document.querySelector('.poke__id'),
              pokemonName = document.querySelector('.poke__name'),
              pokemonType = document.querySelector('.poke__type'),
              pokemonHeight = document.querySelector('.poke__height'),
              pokemonWeight = document.querySelector('.poke__weight');

        pokemonEl.src = data.sprites[spriteArr[spriteIndex]];
        pokemonId.textContent = `# ${data.id}`;
        pokemonName.textContent = data.name.toUpperCase();
        pokemonType.textContent = data.types[0].type.name.toUpperCase();
        pokemonHeight.textContent = `HT ${data.height}`;
        pokemonWeight.textContent = `WT ${data.weight}`; 
    };

    return {
        init
    };
})();

export default PokeApi;



