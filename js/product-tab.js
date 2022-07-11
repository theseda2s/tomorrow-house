const productTab = document.querySelector('.product-tab')
const productTabButtonList = productTab.querySelectorAll('button')

const TOP_HEADER_DESKTOP = 80 + 50 + 54 + 80
const TOP_HEADER_MOBILE = 50 + 40 + 40 + 8

let currentActiveTab = productTab.querySelector('.is-active')

function toggleActiveTab() {
  const tabItem = this.parentNode

  if (currentActiveTab !== tabItem) {
    tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = tabItem
  }
}

function scrollToTabPanel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')
  const tabPanel = document.querySelector(`#${tabPanelId}`)
  const scrollAmount =
    tabPanel.getBoundingClientRect().top -
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE)
  window.scrollBy({
    top: scrollAmount,
    behavior: 'smooth',
  })
}

productTabButtonList.forEach((button) => {
  button.addEventListener('click', toggleActiveTab)
  button.addEventListener('click', scrollToTabPanel)
})

const productTabPanelIdList = [
  'product-spec',
  'product-review',
  'product-inquiry',
  'product-shipment',
  'product-recommendation',
]
const productTabPanelList = productTabPanelIdList.map((panelId) => {
  const tabPanel = document.querySelector(`#${panelId}`)
  return tabPanel
})
const productTabPanelPositionMap = {}

function detectTabPanelPosition() {
  productTabPanelList.forEach((panel) => {
    const id = panel.getAttribute('id')
    const position = window.scrollY + panel.getBoundingClientRect().top
    productTabPanelPositionMap[id] = position
  })
}

function updateActiveTabOnScroll() {
  const scrolledAmount =
    window.scrollY +
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE)

  let newAcitveTab
  if (scrolledAmount >= productTabPanelPositionMap['product-recommendation']) {
    newAcitveTab = productTabButtonList[4]
  } else if (scrolledAmount >= productTabPanelPositionMap['product-shipment']) {
    newAcitveTab = productTabButtonList[3]
  } else if (scrolledAmount >= productTabPanelPositionMap['product-inquiry']) {
    newAcitveTab = productTabButtonList[2]
  } else if (scrolledAmount >= productTabPanelPositionMap['product-review']) {
    newAcitveTab = productTabButtonList[1]
  } else {
    newAcitveTab = productTabButtonList[0]
  }

  if (newAcitveTab) {
    newAcitveTab = newAcitveTab.parentNode

    if (newAcitveTab !== currentActiveTab) {
      newAcitveTab.classList.add('is-active')
      currentActiveTab.classList.remove('is-active')
      currentActiveTab = newAcitveTab
    }
  }
}

window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', detectTabPanelPosition)
window.addEventListener('scroll', updateActiveTabOnScroll)
