const formSelectList = orderModal.querySelectorAll('.form-select')
const checkoutList = orderModal.querySelector('.checkout-list')

const orderSummaryAmount = orderModal.querySelector('.order-summary .amount')

function showOrderSummaryAmount() {
  const checkoutAmountList = checkoutList.querySelectorAll(
    '.checkout-output .amount'
  )
  if (checkoutAmountList.length === 0) {
    orderSummaryAmount.innerHTML = 0
  } else {
    const amountList = []
    checkoutAmountList.forEach((item) => {
      item = Number(item.textContent.replaceAll(',', ''))
      amountList.push(item)
    })
    const newOrderSummaryAmount = amountList.reduce((acc, cur) => acc + cur)
    orderSummaryAmount.innerHTML = newOrderSummaryAmount.toLocaleString()
  }
}

function calculateItemAmount(checkoutSelect, checkoutItem, itemAmount) {
  const checkoutSelectOption =
    checkoutSelect.options[checkoutSelect.selectedIndex].value
  const checkoutAmount = checkoutItem.querySelector('.amount')
  const newPrice = itemAmount.replaceAll(',', '') * checkoutSelectOption
  checkoutAmount.innerHTML = newPrice.toLocaleString()
  showOrderSummaryAmount()
}

function addCheckoutItem(e) {
  const selectOption = this.options[this.selectedIndex].text
  const [item, amount] = selectOption.split('(', 2)
  const itemAmount = amount.slice(0, -2)

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
                                    <strong class="amount">${itemAmount}</strong>
                                    <span class="currency">원</span>
                                  </div>
                                </output>
                              </footer>
                            </div>
                          `
  checkoutList.prepend(checkoutItem)
  e.target.value = ''

  showOrderSummaryAmount()

  const checkoutSelect = checkoutItem.querySelector(
    '#order-form-modal-checkout-item-1'
  )
  checkoutSelect.addEventListener('change', () =>
    calculateItemAmount(checkoutSelect, checkoutItem, itemAmount)
  )

  const checkoutDeleteButton = checkoutItem.querySelector('.delete-button')
  checkoutDeleteButton.addEventListener('click', deleteCheckoutItem)
}

formSelectList.forEach((select) => {
  select.addEventListener('change', addCheckoutItem)
})

function deleteCheckoutItem(e) {
  const deleteItem = e.target.parentNode.parentNode.parentNode.parentNode
  checkoutList.removeChild(deleteItem)
  showOrderSummaryAmount()
}
