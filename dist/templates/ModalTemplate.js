
// Creates and displays modal
function createModal(data) {
    const modalContainer = document.createElement('figure');
    modalContainer.classList.add('modal')
    let modalText = document.createElement('figcaption');
    modalText.innerText = data
    modalContainer.appendChild(modalText)
    dashboardComponent.appendChild(modalContainer)
}

// Deletes Modal from HTMl
function deleteModal() {
    const modal = document.querySelectorAll('.modal')
    setTimeout(function() {
        modal.forEach(e => e.remove())
    }, 3000)

}