const orderCta = document.querySelector('.order-cta')
const [orderCtaBookmarkButton, orderCtaBuyButton] = orderCta.children

const orderModal = document.querySelector('.order-form-modal')
const orderOverlay = document.querySelector('.overlay')

const bookmarkToast = document.querySelector('.bookmark-toast')
const bookmarkToastCloseButton = bookmarkToast.querySelector('.close-button')

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
  const [toastTitle, closeToastButton, toastButtonGroup] =
    bookmarkToast.children

  let newCount = count
  if (this.classList.contains('is-active')) {
    icon.classList.add('ic-bookmark')
    icon.classList.remove('ic-bookmark-filled')
    newCount = newCount - 1

    toastTitle.innerHTML = '스크랩북에서 삭제했습니다'
    bookmarkToast.removeChild(toastButtonGroup)
  } else {
    icon.classList.add('ic-bookmark-filled')
    icon.classList.remove('ic-bookmark')
    newCount = newCount + 1
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
