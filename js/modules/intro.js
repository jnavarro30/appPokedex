import PokeApi from './pokeapi.js';
const Intro = (_ => {
    const init = _ => {
        renderIntro();
        listeners();
    };

    const listeners = _ => {
        const blueBtn = document.querySelector('.blue');
        blueBtn.addEventListener('click', _ => {
            PokeApi.init();
            document.querySelector('.yellow').disabled = false;
        }, {
            once: true
        });
    };

    const renderIntro = _ => {
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

export default Intro;