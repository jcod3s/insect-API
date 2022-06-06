const getData = document.querySelector('#getData');
const insect = document.querySelector('#insect')

getData.addEventListener('click', function() {
    fetch(`localhost:8000/api?=${insect}`)
})