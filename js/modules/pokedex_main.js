import {
    soundEffects,
    trackURLArray,
    trackNameArray
} from "./sounds.js";

const PokedexMain = (_ => {

    let pokemonId = 1,
        pokemonName = 'bulbasur',
        currentlyPlayingIndex = 0,
        currentlyPlayingTrack = new Audio(trackURLArray[currentlyPlayingIndex]),
        themeMusicScreen = false,
        classicSpriteStyle = false;

    const init = _ => {
        renderPokemonScreen();
        enableGamePadButtons();
    };

    // render
    const pokemonStatsHTML = _ => {
        let html = `
            <p class="poke__height"></p>
            <p class="poke__weight"></p>
            <p class="poke__name"></p>
            <p class="poke__type"></p>
            <p class="poke__id"></p>
            <img src='' class='img__pokemon'>
        `;
        pokeApi(pokemonId);
        return html;
    };

    const pokemonPlaylistHTML = _ => {
        let html = '';

        trackURLArray.forEach((track, index) => {
            html += `<li class="theme t${index}">${trackNameArray[index]}</li>`
        });
        html = `<ul class="pokemon__playlist">${html}</ul>`;
        return html;
    };

    const renderPokemonScreen = _ => {
        const pokedexScreenEl = document.querySelector('.poke__info');
        pokedexScreenEl.innerHTML = themeMusicScreen ? pokemonPlaylistHTML() : pokemonStatsHTML();
        let currentTrack = document.querySelector(`.t${currentlyPlayingIndex}`);

        //pokedex toggle darkmode for track
        if (currentTrack) {
            if (pokedexScreenEl.classList.contains('dark__mode')) {
                currentTrack.classList.remove('selected');
                currentTrack.classList.add('dark');
            } else {
                currentTrack.classList.add('selected');
                currentTrack.classList.remove('dark');
            }
        }
    }

    const enableGamePadButtons = _ => {
         const  upArrowButton = document.querySelector('.up'),
                downArrowButton = document.querySelector('.down'),
                leftArrowButton = document.querySelector('.left'),
                rightArrowButton = document.querySelector('.right'),
                redResetButton = document.querySelector('.red'),
                blueEnterInputButton = document.querySelector('.blue'),
                greenToggleClassicButton = document.querySelector('.green'),
                orangeToggleMusicScreenButton = document.querySelector('.orange'),
                yellowInputPad  = document.querySelector('.yellow'),
                speakerPlayPauseMusicButton = document.querySelector('.speaker'),
                pokedexScreen = document.querySelector('.poke__info');

        const aactivateYellowPadInput = _ => {
            let btnSoundEffect = new Audio(soundEffects.blueButton).play(),
                num = Number(yellowInputPad .value),
                str = yellowInputPad .value.toLowerCase();

            if (!str) return;

            if (Number.isInteger(num)) {
                pokemonId = num;
                pokeApi(pokemonId);
            } else {
                pokemonName = str;
                pokeApi(pokemonName);
            }
        };

        //listeners
        speakerPlayPauseMusicButton.addEventListener('click', _ => {
            let screenSoundEffect = new Audio(soundEffects.speakerButton).play(),
                currentTrackSrc = currentlyPlayingTrack.src,
                selectedTrackSrc = trackURLArray[currentlyPlayingIndex];
            
            if (currentTrackSrc == selectedTrackSrc) {
                currentlyPlayingTrack.paused ? currentlyPlayingTrack.play() : currentlyPlayingTrack.pause();
            } else {
                currentlyPlayingTrack.src = trackURLArray[currentlyPlayingIndex];
                currentlyPlayingTrack.play();
            }
        });

        pokedexScreen.addEventListener('click', _ => {
            let screenSoundEffect = new Audio(soundEffects.greenOrangeButtons).play();
            pokedexScreen.classList.toggle('dark__mode');
            let currentTrack = document.querySelector(`.t${currentlyPlayingIndex}`);
            if (currentTrack) {
                currentTrack.classList.toggle('selected');
                currentTrack.classList.toggle('dark');
            }
        });

        yellowInputPad .addEventListener('click', _ => {
            let btnSoundEffect = new Audio(soundEffects.yellowPad).play();
        });

        yellowInputPad .addEventListener('keypress', event => {
            let btnSoundEffect = new Audio(soundEffects.yellowPad).play();
            if (event.keyCode == 13) aactivateYellowPadInput();
        });

        blueEnterInputButton.addEventListener('click', _ => {
            aactivateYellowPadInput();
        });

        redResetButton.addEventListener('click', _ => {
            let btnSoundEffect = new Audio(soundEffects.redButton).play();
            pokemonId = 1;
            currentlyPlayingIndex = 0;
            currentlyPlayingTrack.src = trackURLArray[currentlyPlayingIndex];
            yellowInputPad .value = '';
            classicSpriteStyle = false;
            themeMusicScreen = false;
            renderPokemonScreen();
        });

        greenToggleClassicButton.addEventListener('click', _ => {
            let btnSoundEffect = new Audio(soundEffects.greenOrangeButtons).play();
            classicSpriteStyle = !classicSpriteStyle;
            pokeApi(pokemonId);
        });

        orangeToggleMusicScreenButton.addEventListener('click', _ => {
            let btnSoundEffect = new Audio(soundEffects.greenOrangeButtons).play();
            themeMusicScreen = !themeMusicScreen;
            arrowButtonsForMusicScreen(themeMusicScreen);
            arrowButtonsForMainScreen(themeMusicScreen);
            renderPokemonScreen();
        });

        // arrow button functions
        const upRightArrowButtons = _ => {
            let btnSoundEffect = new Audio(soundEffects.arrowButtons).play();
                pokemonId++;
                pokeApi(pokemonId);
        };

        const downLeftArrowButtons = _ => {
            let btnSoundEffect = new Audio(soundEffects.arrowButtons).play();
            pokemonId--;
            if (!pokemonId) pokemonId = 1;
            pokeApi(pokemonId);
        };

        const upButtonFunc = _ => {
            if (!currentlyPlayingIndex) return;
            currentlyPlayingIndex -= 2;
            if(currentlyPlayingIndex < 0) currentlyPlayingIndex = 1;
            renderPokemonScreen();
        };

        const downButtonFunc = _ => {
            if (currentlyPlayingIndex == 9) return;
            currentlyPlayingIndex += 2;
            if(currentlyPlayingIndex > 9) currentlyPlayingIndex = 8;
            renderPokemonScreen();
        };

        const leftButtonFunc = _ => {
            if (currentlyPlayingIndex % 2 == 0) return;
            currentlyPlayingIndex--;
            renderPokemonScreen();
        };

        const rightButtonFunc = _ => {
            if (currentlyPlayingIndex % 2) return;
            currentlyPlayingIndex++;
            renderPokemonScreen();
        };

        // toggle arrow button listeners
        const arrowButtonsForMainScreen = screen => {
            const addListeners = _ => {
                [upArrowButton, rightArrowButton].forEach(button => {
                    button.addEventListener('click', upRightArrowButtons);
                });
                [downArrowButton, leftArrowButton].forEach(button => {
                    button.addEventListener('click', downLeftArrowButtons);
                });
            };

            const removeListeners = _ => {
                [upArrowButton, rightArrowButton].forEach(button => {
                    button.removeEventListener('click', upRightArrowButtons);
                });
                [downArrowButton, leftArrowButton].forEach(button => {
                    button.removeEventListener('click', downLeftArrowButtons);
                });
            };

            screen? removeListeners() : addListeners();

        };

        const arrowButtonsForMusicScreen = screen => {
            const addListeners = _ => {
                upArrowButton.addEventListener('click', upButtonFunc);
                downArrowButton.addEventListener('click', downButtonFunc);
                leftArrowButton.addEventListener('click', leftButtonFunc);
                rightArrowButton.addEventListener('click', rightButtonFunc);
            };

            const removeListeners = _ => {
                upArrowButton.removeEventListener('click', upButtonFunc);
                downArrowButton.removeEventListener('click', downButtonFunc);
                leftArrowButton.removeEventListener('click', leftButtonFunc);
                rightArrowButton.removeEventListener('click', rightButtonFunc);
            };

            screen? addListeners() : removeListeners();
        };

        arrowButtonsForMainScreen(themeMusicScreen);
    };

    // Pokemon Api
    const pokeApi = async nameOrId => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${nameOrId}`,
            request = await fetch(URL),
            data = await request.json();
        pokemonId = data.id;

        const updatePokemonStats = _ => {
            const pokemonEl = document.querySelector('.img__pokemon'),
                  pokemonIdEl = document.querySelector('.poke__id'),
                  pokemonNameEl = document.querySelector('.poke__name'),
                  pokemonTypeEl = document.querySelector('.poke__type'),
                  pokemonHeightEl = document.querySelector('.poke__height'),
                  pokemonWeightEl = document.querySelector('.poke__weight');

            let pokemonImage = classicSpriteStyle ?
                data.sprites.front_default :
                data.sprites.other.dream_world.front_default;

            pokemonEl.src = pokemonImage;
            pokemonIdEl.textContent = `# ${data.id}`;
            pokemonNameEl.textContent = data.name.toUpperCase();
            pokemonTypeEl.textContent = data.types[0].type.name.toUpperCase();
            pokemonHeightEl.textContent = `HT ${data.height}`;
            pokemonWeightEl.textContent = `WT ${data.weight}`;
        };

        updatePokemonStats();
    };

    return {
        init
    };
})();

export default PokedexMain;

