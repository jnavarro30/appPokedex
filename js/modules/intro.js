import PokedexMain from './pokedex_main.js';
import {soundEffects} from "./sounds.js";

const Intro = (_ => {
    const init = _ => {
        renderGamePad();
        enableGamePadStartButton();
    };

    const enableGamePadStartButton = _ => {
        const gamePadBlueButton = document.querySelector('.blue');
        gamePadBlueButton.addEventListener('click', _ => {
            PokedexMain.init();
            const gamePadYellowPad = document.querySelector('.yellow');
            gamePadYellowPad.disabled = false;
            gamePadYellowPad.placeholder = 'Name or ID';
            let btnSoundEffect = new Audio(soundEffects.blueButton).play();
        }, {
            once: true
        });
    };

    const renderGamePad = _ => {
        // render without functionallity
        const containerEl = document.querySelector('.container');
        containerEl.innerHTML = `
        <figure>
            <img class='img__pokedex' src='media/images/pokedex.png'>
            <button class="btn red"></button>
            <button class="btn blue"></button>
            <button class="btn green"></button>
            <button class="btn orange"></button>
            <button class="btn up"></button>
            <button class="btn down"></button>
            <button class="btn left"></button>
            <button class="btn right"></button>
            <button class="btn speaker"></button>
            <input type="text" class="yellow">
            <div class="poke__info">
                <img class='img__intro' src='media/images/intro.png'>
            </div>
        </figure>
        `;
        document.querySelector('.yellow').disabled = true;
    };

    return {
        init
    };
})();

export default Intro.init();