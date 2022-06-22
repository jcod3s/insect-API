//pull data from obect
const getData = document.querySelector('#getData');

getData.addEventListener('click', function() {

  const insect = document.querySelector('#insect').value
  const url = `https://insect-api.herokuapp.com/api/${insect}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // const insectData = data
        // document.querySelector('#sciName').textContent = 'Scientific Name: '+ insectData.scientificName
        // document.querySelector('#order').textContent = 'Order: '+ insectData.order
        // document.querySelector('#lifeSpan').textContent = 'Average Life Span: ' + insectData.lifeSpan
        // document.querySelector('#climates').textContent = 'Typical Climates: ' + insectData.climates
        // document.querySelector('#descHeader').textContent = 'Description'
        // document.querySelector('#description').textContent = insectData.description
        console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
})