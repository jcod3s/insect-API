let deleteButton = document.querySelectorAll('.fa-trash-can');

Array.from(deleteButton).forEach(element => {
    element.addEventListener('click', deleteItem)
})

async function deleteItem(){
    const insectName = this.parentNode.childNodes[4].innerText.split(' ')[1]
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': insectName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}



