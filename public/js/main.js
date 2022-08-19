let deleteButton = document.querySelectorAll('.fa-trash-can');

Array.from(deleteButton).forEach(element => {
    element.addEventListener('click', deleteItem)
})

async function deleteItem(){
    const insectId = this.parentNode.dataset.id
    console.log(insectId)
    try{
        const response = await fetch('/api/deleteItem', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              'idFromJSFile': insectId
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}



