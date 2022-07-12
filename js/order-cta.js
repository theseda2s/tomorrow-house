const orderCta = document.querySelector('.order-cta')
const [orderCtaBookmarkButton, orderCtaBuyButton] = orderCta.children

const orderModal = document.querySelector('.order-form-modal')
const orderOverlay = document.querySelector('.overlay')

const formSelectList = orderModal.querySelectorAll('.form-select')
const checkoutList = orderModal.querySelector('.checkout-list')

const bookmarkToast = document.querySelector('.bookmark-toast')

function openOrderModal() {
  orderModal.classList.add('is-open')
  orderOverlay.classList.add('is-active')
}

orderCtaBuyButton.addEventListener('click', openOrderModal)

function closeOrderModal() {
  orderModal.classList.remove('is-open')
  orderOverlay.classList.remove('is-active')
}

orderOverlay.addEventListener('click', closeOrderModal)

function toggleOrderCtaBookmark() {
  const [icon, countSpan] = this.children
  const count = Number(countSpan.innerHTML.replaceAll(',', ''))

  let newCount = count

  const closeToastButton = bookmarkToast.querySelector('.close-button')
  const [toastTitle, , toastButtonGroup] = bookmarkToast.children
  if (this.classList.contains('is-active')) {
    icon.classList.add('ic-bookmark')
    icon.classList.remove('ic-bookmark-filled')
    newCount = newCount - 1

    toastTitle.innerHTML = '스크랩북에서 삭제했습니다'
    toastButtonGroup.style.display = 'none'
  } else {
    icon.classList.add('ic-bookmark-filled')
    icon.classList.remove('ic-bookmark')
    newCount = newCount + 1

    toastTitle.innerHTML = '스크랩북했습니다'
    toastButtonGroup.style.display = 'flex'
  }
  countSpan.innerHTML = newCount.toLocaleString()
  countSpan.setAttribute('aria-label', `북마크 ${newCount.toLocaleString()}회`)
  this.classList.toggle('is-active')

  bookmarkToast.classList.add('is-active')
  closeToastButton.addEventListener('click', closeBookmarkToast)
}
orderCtaBookmarkButton.addEventListener('click', toggleOrderCtaBookmark)

function closeBookmarkToast() {
  bookmarkToast.classList.remove('is-active')
}

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
                                  for="order-form-modal-checkout-item-1"
                                >
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
}

formSelectList.forEach((select) => {
  select.addEventListener('change', addCheckoutItem)
})

function deleteCheckoutItem(e) {
  const deleteItem = e.target.parentNode.parentNode.parentNode.parentNode
  checkoutList.removeChild(deleteItem)
}
