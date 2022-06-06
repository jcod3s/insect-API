const getData = document.querySelector('#getData');
const insectName = document.querySelector('#insect')

getData.addEventListener('click', function() {
    console.log('fetching data')

  const insect = document.querySelector('#insect').value
  const url = `https://murmuring-forest-20754.herokuapp.com/api/${insect}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        const insectData = data
        document.querySelector('#sciName').textContent += insectData.scientificName
      })
      .then()
      .catch(err => {
          console.log(`error ${err}`)
      });
})