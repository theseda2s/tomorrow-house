const cartModal = document.querySelector('.cart-modal')
const cartCloseButton = cartModal.querySelector('.btn-secondary')
const cartOverlay = document.querySelector('.overlay')
const orderFormCartButtonList = document.querySelectorAll(
  '.order-form .button-group .btn-outlined'
)
const mobileCartButton = document.querySelector('.order-form .btn-secondary')

function openCartModal() {
  cartModal.classList.add('is-active')
  cartOverlay.classList.add('is-active')
}
orderFormCartButtonList.forEach((button) => {
  button.addEventListener('click', openCartModal)
})

function openMobileCartModal() {
  cartModal.classList.add('is-active')
  cartOverlay.classList.add('is-active')
  const mobileOrderForm = this.parentNode.parentNode.parentNode
  mobileOrderForm.classList.remove('is-open')
}
mobileCartButton.addEventListener('click', openMobileCartModal)

function closeCartModal() {
  cartModal.classList.remove('is-active')
  cartOverlay.classList.remove('is-active')
}
cartOverlay.addEventListener('click', closeCartModal)
cartCloseButton.addEventListener('click', closeCartModal)
