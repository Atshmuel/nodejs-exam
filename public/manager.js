const modalClose = document.querySelector('.close-modal')
const modal = document.querySelector('.modal-container')

const newPointBtn = document.getElementById('new-point')
const allPointsBtn = document.getElementById('all-point')


newPointBtn.addEventListener('click', () => {
    modal.style.display = 'flex'
})

modalClose.addEventListener('click', () => {
    modal.style.display = 'none'
})