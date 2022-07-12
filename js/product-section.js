const productSpec = document.querySelector('.product-spec')
const productSpecOpenButton = productSpec.querySelector('button')
const sectionHeaderIconButtonList = document.querySelectorAll(
  '.product-section-header button.icon-button'
)
console.log(sectionHeaderIconButtonList)

function showFullProductSpec() {
  productSpec.classList.add('is-open')
}
productSpecOpenButton.addEventListener('click', showFullProductSpec)

function showFullSection() {
  const section = this.parentNode.parentNode
  section.classList.add('is-open')
}
sectionHeaderIconButtonList.forEach((button) => {
  button.addEventListener('click', showFullSection)
})
