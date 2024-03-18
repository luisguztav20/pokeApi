function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//generando un numero rando y pasandolo como parametro a la funcion fetch para que 
// me traiga el objeto de ese poquemon 
document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151);
    console.log(random);
    fetchData(random);
});

// pasamos id como parametro para que encuentre el pokemon en esa poscion
const fetchData = async (id) => {
    try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    const pokemon = {
        img: data.sprites.other.dream_world.front_default,
        name: data.name,
        id: data.id,
        expe: data.base_experience,
        hp: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        def: data.stats[2].base_stat,
        especial: data.stats[3].base_stat

    }
    pintarCard(pokemon)
    } catch (error) {
        console.log(error)
    }
}

function recarga(){
    location.reload();
}

// pintando datos en el template

const pintarCard = (pokemon) => {
    console.log(pokemon);
    const flex = document.querySelector('.flex')
    const template = document.querySelector('#template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector('.card-body-img')
    .setAttribute('src', pokemon.img)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name} <span> ${pokemon.id} hp: ${pokemon.hp}</span>`;
    clone.querySelector('.card-body-text').textContent = pokemon.expe + ' Exp'
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + 'K';
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial + 'K';
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.def + 'K';
    clone.querySelector('.btn').addEventListener('click', () => {
        location.reload();
    })
    
    

    fragment.appendChild(clone);
    flex.appendChild(fragment)


}

//subir netlyfi


