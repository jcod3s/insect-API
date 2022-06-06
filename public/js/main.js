const getData = document.querySelector('#getData');
const insect = document.querySelector('#insect')

getData.addEventListener('click', function() {
    fetch(`https://murmuring-forest-20754.herokuapp.com/api?=${insect}`)
})