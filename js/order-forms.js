const formSelectList = document.querySelectorAll('.form-select')
const checkoutList = document.querySelectorAll('.checkout-list')

const orderSummaryAmountList = document.querySelectorAll(
  '.order-summary .amount'
)

const ORDER_FORM_COUNT = 3

function showOrderSummaryAmount() {
  const checkoutAmountList = document.querySelectorAll(
    '.checkout-output .amount'
  )
  if (checkoutAmountList.length === 0) {
    orderSummaryAmountList.forEach((item) => {
      item.innerHTML = 0
    })
  } else {
    const amountList = []
    checkoutAmountList.forEach((item) => {
      item = Number(item.textContent.replaceAll(',', ''))
      amountList.push(item)
    })
    const newOrderSummaryAmount = amountList.reduce((acc, cur) => acc + cur)
    orderSummaryAmountList.forEach((item) => {
      item.innerHTML = (
        newOrderSummaryAmount / ORDER_FORM_COUNT
      ).toLocaleString()
    })
  }
}

function addCheckoutItem() {
  const selectOption = this.options[this.selectedIndex].text
  const [item, amount] = selectOption.split('(', 2)
  const itemAmount = amount.slice(0, -2)

  let checkoutItem = undefined
  checkoutList.forEach((list) => {
    checkoutItem = document.createElement('li')
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
    list.prepend(checkoutItem)
    showOrderSummaryAmount()

    // const checkoutDeleteButton = checkoutItem.querySelectorAll('.delete-button')
    // checkoutDeleteButton.forEach((button) => {
    //   button.addEventListener('click', deleteCheckoutItem)
    // })
  })
}

formSelectList.forEach((select) => {
  select.addEventListener('change', addCheckoutItem)
})

function deleteCheckoutItem(e) {
  const deleteItem = e.target.parentNode.parentNode.parentNode.parentNode

  checkoutList.forEach((list) => {
    list.removeChild(deleteItem)
  })
  showOrderSummaryAmount()
}
