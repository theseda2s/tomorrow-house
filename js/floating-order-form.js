const floatingOrderFormButtonGroup = document.querySelector(
  '.floating-order-form .button-group'
)
const [floatingBookmarkButton, , floatingBuyButton] =
  floatingOrderFormButtonGroup.children

function toggleFloatingOrderFormBookmark() {
  const icon = floatingBookmarkButton.querySelector('i')

  const closeToastButton = bookmarkToast.querySelector('.close-button')
  const [toastTitle, , toastButtonGroup] = bookmarkToast.children

  if (this.classList.contains('is-active')) {
    icon.classList.add('ic-bookmark')
    icon.classList.remove('ic-bookmark-filled')

    toastTitle.innerHTML = '스크랩북에서 삭제했습니다'
    toastButtonGroup.style.display = 'none'
  } else {
    icon.classList.add('ic-bookmark-filled')
    icon.classList.remove('ic-bookmark')

    toastTitle.innerHTML = '스크랩북했습니다'
    toastButtonGroup.style.display = 'flex'
  }
  this.classList.toggle('is-active')

  bookmarkToast.classList.add('is-active')
  closeToastButton.addEventListener('click', closeBookmarkToast)
}
floatingBookmarkButton.addEventListener(
  'click',
  toggleFloatingOrderFormBookmark
)

function closeBookmarkToast() {
  bookmarkToast.classList.remove('is-active')
}
