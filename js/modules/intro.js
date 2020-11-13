import PokedexMain from './pokedex_main.js';
import {soundEffects} from "./sounds.js";

const Intro = (_ => {
    const init = _ => {
        renderGamePad();
        enableGamePadStartButton();
    };

    const enableGamePadStartButton = _ => {
        const blueStartButton = document.querySelector('.blue');
        let time = 0;
        let timer = setInterval(_ => {
            time++;
            console.log(time);
            blueStartButton.style.transform = `rotate(${time}deg)`;
        }, 10);
        blueStartButton.addEventListener('click', _ => {
            PokedexMain.init();
            clearInterval(timer);
            const yellowInputPad = document.querySelector('.yellow');
            yellowInputPad.disabled = false;
            yellowInputPad.placeholder = 'Name or ID';
            let btnSoundEffect = new Audio(soundEffects.blueButton).play();

            // remove instruction
            document.querySelectorAll('button').forEach(btn => btn.classList.remove('instructions'));
            document.querySelectorAll('.btn').forEach(btn => btn.classList.add('opacity'));
            document.querySelectorAll('.btn').forEach(btn => btn.classList.add('no-after'));
            document.querySelector('.poke__info').classList.add('no-after');
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
            <input type="text" class="yellow" placeholder="Lookup">
            <div class="poke__info">
                <img class='img__intro' src='media/images/intro.png'>
            </div>
        </figure>
        `;
        document.querySelector('.yellow').disabled = true;
        document.querySelectorAll('button').forEach(btn => btn.classList.add('instructions'));
    };

    return {
        init
    };
})();

export default Intro.init();