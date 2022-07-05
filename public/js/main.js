//pull data from obect
const getData = document.querySelector('#getData');

//insect search bar
const insectName = document.querySelector('#insect')

//submit new insect data
// const submitInsectData = document.querySelector('#submitInsectData')

// getData.addEventListener('click', function() {
//     console.log('fetching data')

const insect = document.querySelector('#insect').value
//   const url = `https://insect-api.herokuapp.com/api/${insect}`

//   fetch(url)
//       // .then(res => res.json()) // parse response as JSON
//       // .then(data => {
//       //   const insectData = data
//       //   document.querySelector('#sciName').textContent = 'Scientific Name: '+ insectData.scientificName
//       //   document.querySelector('#order').textContent = 'Order: '+ insectData.order
//       //   document.querySelector('#lifeSpan').textContent = 'Average Life Span: ' + insectData.lifeSpan
//       //   document.querySelector('#climates').textContent = 'Typical Climates: ' + insectData.climates
//       //   document.querySelector('#descHeader').textContent = 'Description'
//       //   document.querySelector('#description').textContent = insectData.description
//       // })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// })
