const getData = document.querySelector('#getData');
const insectName = document.querySelector('#insect')
const newInsect = document.querySelector('#newInsectNav');

newInsect.addEventListener('click', function(){
    const url = `https://insect-api.herokuapp.com/api/addInsect`

    fetch(url)
})

getData.addEventListener('click', function() {
    console.log('fetching data')

  const insect = document.querySelector('#insect').value
  const url = `https://insect-api.herokuapp.com/api/${insect}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        const insectData = data
        document.querySelector('#sciName').textContent = 'Scientific Name: '+ insectData.scientificName
        document.querySelector('#order').textContent = 'Order: '+ insectData.order
        document.querySelector('#lifeSpan').textContent = 'Average Life Span: ' + insectData.lifeSpan
        document.querySelector('#climates').textContent = 'Typical Climates: ' + insectData.climates
        document.querySelector('#descHeader').textContent = 'Description'
        document.querySelector('#description').textContent = insectData.description
      })
      .then()
      .catch(err => {
          console.log(`error ${err}`)
      });
})