const floatingOrderFormButtonGroup = document.querySelector(
  '.floating-order-form .button-group'
)
const [floatingBookmarkButton, floatingBasketButton, floatingBuyButton] =
  floatingOrderFormButtonGroup.children

function toggleFloatingOrderFormBookmark() {
  const icon = floatingBookmarkButton.querySelector('i')
  if (this.classList.contains('is-active')) {
    icon.classList.add('ic-bookmark')
    icon.classList.remove('ic-bookmark-filled')
  } else {
    icon.classList.add('ic-bookmark-filled')
    icon.classList.remove('ic-bookmark')
  }
  this.classList.toggle('is-active')
}
floatingBookmarkButton.addEventListener(
  'click',
  toggleFloatingOrderFormBookmark
)
