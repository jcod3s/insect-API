const getData = document.querySelector('#getData');
const insectName = document.querySelector('#insect')

getData.addEventListener('click', async function() {
    console.log('fetching data')
    const getData = await fetch(`https://murmuring-forest-20754.herokuapp.com/api/${insect}`)
    const insects = await res.json()
    console.log(insects[insectName])
})