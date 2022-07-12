const formSelectList = orderModal.querySelectorAll('.form-select')
const checkoutList = orderModal.querySelector('.checkout-list')

function addCheckoutItem(e) {
  const selectOption = this.options[this.selectedIndex].text
  const [item, price] = selectOption.split('(', 2)
  const itemPrice = price.slice(0, -2)

  const checkoutItem = document.createElement('li')
  checkoutItem.setAttribute('class', 'checkout-item')
  checkoutItem.innerHTML = `
                              <div class="checkout-card">
                              <header class="checkout-header">
                                <h4 class="checkout-title">${item}</h4>
                                <button
                                  class="delete-button"
                                  type="button"
                                  aria-label="해당 상품을 삭제하기"
                                >
                                  <i class="ic-close" aria-hidden></i>
                                </button>
                              </header>

                              <footer class="checkout-footer">
                                <div class="checkout-select">
                                  <select id="order-form-modal-checkout-item-1">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                  <i class="ic-caret" aria-hidden></i>
                                </div>

                                <output
                                  class="checkout-output"
                                  for="order-form-modal-checkout-item-1">
                                  <div class="price-16">
                                    <strong class="amount">${itemPrice}</strong>
                                    <span class="currency">원</span>
                                  </div>
                                </output>
                              </footer>
                            </div>
                          `
  checkoutList.prepend(checkoutItem)
  e.target.value = ''

  const checkoutDeleteButton = checkoutItem.querySelector('.delete-button')
  checkoutDeleteButton.addEventListener('click', deleteCheckoutItem)

  const checkoutSelect = checkoutItem.querySelector(
    '#order-form-modal-checkout-item-1'
  )

  function calculateItemPrice() {
    const checkoutSelectOption =
      checkoutSelect.options[checkoutSelect.selectedIndex].value
    const checkoutAmount = checkoutItem.querySelector('.amount')
    const newPrice = (
      itemPrice.replaceAll(',', '') * checkoutSelectOption
    ).toLocaleString()
    checkoutAmount.innerHTML = newPrice
  }
  checkoutSelect.addEventListener('change', calculateItemPrice)
}

formSelectList.forEach((select) => {
  select.addEventListener('change', addCheckoutItem)
})

function deleteCheckoutItem(e) {
  const deleteItem = e.target.parentNode.parentNode.parentNode.parentNode
  checkoutList.removeChild(deleteItem)
}
