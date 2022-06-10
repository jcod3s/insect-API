const newInsect = document.querySelector('#newInsectNav');

newInsect.addEventListener('click', function(){
    const url = `https://insect-api.herokuapp.com/api/addInsect`

    fetch(url)
})