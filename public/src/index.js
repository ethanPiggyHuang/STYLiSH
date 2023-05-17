let fetchType = 'category';
let fetchReady = false;
const baseUrl = 'https://api.appworks-school.tw/api/1.0';
let urlCategory = 'all';
let urlKeyword = '';
const defaultPage = 0;
let urlPage = defaultPage;
let emptyPage = false;
const homepage = './products.html';
const mobileBreakpoint = 1280;
let urlQueryString = window.location.search;
let urlParams = new URLSearchParams(urlQueryString);
const productArray = document.querySelector('.product-array');
const logo = document.querySelector('.logo-container');
const buttonCategory = document.querySelectorAll('.menu-item');
const inputArea = document.querySelector('.search-input');

function getUrlParameter() {
  const urlSliceStart = 0;
  const strangeSymbolCheck = () => {
    let urlValue = '';
    if (fetchType === 'category') {
      urlValue = urlCategory;
    } else if (fetchType === 'keyword') {
      urlValue = urlKeyword;
    }
    if (urlValue.includes('?') || urlValue.includes('/')) {
      urlValue = urlValue.includes('?')
        ? urlValue.slice(urlSliceStart, urlValue.indexOf('?'))
        : urlValue.slice(urlSliceStart, urlValue.indexOf('/'));
      window.location.replace(`./?${fetchType}=${urlValue}`);
    }
  };

  const pageCheck = () => {
    if (urlParams.has('page')) {
      urlPage = Number(urlParams.get('page'));
      if (isNaN(urlPage) || !Number.isInteger(urlPage)) {
        let firstPageUrl = homepage;
        if (fetchType === 'category') {
          firstPageUrl = `./?category=${urlCategory}`;
        } else if (fetchType === 'keyword') {
          firstPageUrl = `./?keyword=${urlKeyword}`;
        }
        window.location.replace(firstPageUrl);
      }
    } else {
      urlPage = defaultPage;
    }
  };

  if (urlParams.has('category')) {
    urlCategory = urlParams.get('category');
    strangeSymbolCheck('category');
    pageCheck('category');
  } else if (urlParams.has('keyword')) {
    urlKeyword = urlParams.get('keyword');
    strangeSymbolCheck('keyword');
    pageCheck('keyword');
  } else {
    urlCategory = 'all';
    if (urlQueryString !== '') {
      window.location.replace(homepage);
    }
  }
}

function listenPopstate() {
  window.addEventListener('popstate', () => {
    urlQueryString = window.location.search;
    urlParams = new URLSearchParams(urlQueryString);
    if (urlParams.has('keyword')) {
      clearProducts();
      inputArea.value = urlParams.get('keyword');
      getData('all', defaultPage, urlParams.get('keyword'));
    }
    if (urlParams.has('category')) {
      setLogoAndCategoryButtons();
    }
  });
}

function clearProducts() {
  productArray.innerHTML = '';
}

function render(data) {
  let productHTML = '';
  for (let i = 0; i < data.data.length; i++) {
    const product = data.data[i];
    productHTML += `
        <div class="product">
          <a href="./product?id=${product.id}">
            <img src="${product.main_image}" alt="${product.title}" class="product-img">
          </a>
          <ul class="product-color-array">
        `;
    for (let j = 0; j < product.colors.length; j++) {
      productHTML += `<li class="product-color" style="background-color:#${product.colors[j].code}"></li>`;
    }
    productHTML += `
          </ul>
          <p class="product-name">${product.title}</p>
          <p class="product-price">TWD.${product.price}</p>
        </div>
        `;
  }

  productArray.insertAdjacentHTML('beforeend', productHTML);
  fetchReady = true;
  window.addEventListener('scroll', handleScroll);
}

function getData(category = 'all', page = defaultPage, keyword = '') {
  let endPointUrl;
  let redirectUrl;
  switch (fetchType) {
    case 'keyword':
      endPointUrl = `/products/search?keyword=${keyword}&paging=${page}`;
      redirectUrl = `./?keyword=${urlKeyword}`;
      break;
    default:
      endPointUrl = `/products/${category}?paging=${page}`;
      redirectUrl = `./?category=${urlCategory}`;
      break;
  }
  const url = baseUrl + endPointUrl;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const zeroDataLength = 0;
      const redirectDelay = 3000;
      if (data.error === 'Wrong Request') {
        showErrMessage();
        setTimeout(() => {
          window.location.replace(homepage);
        }, redirectDelay);
      } else if (data.data.length === zeroDataLength && !urlKeyword) {
        emptyPage = true;
        showErrMessage();
        setTimeout(() => {
          window.location.replace(redirectUrl);
        }, redirectDelay);
      } else if (data.data.length === zeroDataLength && urlKeyword) {
        showErrMessage();
        setTimeout(() => {
          window.location.replace(homepage);
        }, redirectDelay);
      } else {
        urlPage = data.next_paging;
        render(data);
      }
    })
    .catch(() => {
      urlCategory = '';
      showErrMessage();
    });
}

function handleScroll() {
  if (urlPage) {
    if (fetchReady) {
      const footerHeight = 115;
      const productHeightDesktop = 666;
      const productHeightMobile = 570;
      const productsRowHeight =
        window.innerWidth >= mobileBreakpoint
          ? productHeightDesktop
          : productHeightMobile;
      if (
        window.scrollY + window.innerHeight >=
        document.body.offsetHeight - (footerHeight + productsRowHeight)
      ) {
        fetchReady = false;
        if (fetchType === 'category') {
          getData(urlCategory, urlPage);
        } else if (fetchType === 'keyword') {
          getData('all', urlPage, urlKeyword);
        }
      }
    }
  } else {
    productArray.insertAdjacentHTML(
      'beforeend',
      `
      <div class="product product-end">
        <p class="product-endMessage">還沒看到喜歡的嗎？</p>
        <p class="product-endMessage">試著用關鍵字搜尋吧</p>
      </div>
    `
    );
    window.removeEventListener('scroll', handleScroll);
  }
}

function showErrMessage() {
  let errMessage = '';

  if (urlKeyword) {
    errMessage = `您輸入的關鍵字是：<span style="color:red;">${urlKeyword}</span><br>
                  找不到類似的商品<br>
                  可以試試看「洋裝、西裝、精緻、經典」等關鍵字`;
  } else if (urlCategory && emptyPage) {
    errMessage = `您輸入的類別沒有這麼多頁<br>將幫您跳回第一頁`;
    emptyPage = false;
  } else if (urlCategory) {
    errMessage = `您輸入的類別是：<span style="color:red;">${urlCategory}</span><br>
                  沒有這種商品類別<br>
                  請確認輸入是否正確`;
  } else {
    errMessage = `伺服器維修中，或是請確認網路連線狀況。`;
  }

  productArray.insertAdjacentHTML(
    'beforeend',
    `<div class="requestErr">
      <p class="requestErrMessage">
        ${errMessage}
      </p>
    </div>`
  );
}

function setLogoAndCategoryButtons() {
  logo.addEventListener('click', () => (window.location.href = homepage));

  for (let i = 0; i < buttonCategory.length; i++) {
    const firstClassNameIndex = 0;
    const categoryName =
      buttonCategory[i].className.split(' ')[firstClassNameIndex];
    if (urlCategory === categoryName) {
      buttonCategory[i].classList.add('menu-chosen');
    } else if (buttonCategory[i].classList.contains('menu-chosen')) {
      buttonCategory[i].classList.toggle('menu-chosen');
    }

    buttonCategory[i].addEventListener('click', () => {
      fetchType = 'category';
      urlCategory = categoryName;
      window.location.href = `./products.html?category=${urlCategory}`;
    });
  }
}

function setSearchIcon() {
  const searchIcon = document.querySelector('.search-icon');
  const searchBar = document.querySelector('.search-bar');

  let searchIconMode = 'search';

  if (window.innerWidth < mobileBreakpoint) {
    searchIconMode = 'display';

    searchIcon.addEventListener('click', () => {
      if (searchIconMode === 'display') {
        searchBar.style.display = 'flex';
        logo.style.display = 'none';
        searchIconMode = 'search';
      } else if (searchIconMode === 'search') {
        handleSearch();
      }
    });

    document.addEventListener('click', (event) => {
      if (
        !(searchIcon.contains(event.target) || searchBar.contains(event.target))
      ) {
        searchBar.style.display = 'none';
        logo.style.display = 'block';
        searchIconMode = 'display';
      }
    });
  } else {
    searchIcon.addEventListener('click', handleSearch);
  }

  inputArea.addEventListener('keyup', (event) => {
    if (event.isComposing || event.keyCode === 229) {
      //improve cross-browser compatibility, Firefox 65
      return;
    }
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
}

function handleSearch() {
  fetchType = 'keyword';
  urlKeyword = inputArea.value.trim();
  if (urlKeyword !== '' && fetchReady) {
    fetchReady = false;
    clearProducts();
    urlCategory = 'all';
    setLogoAndCategoryButtons();
    getData(urlCategory, defaultPage, urlKeyword);
    window.document.body.scrollTop = 0;
    window.document.documentElement.scrollTop = 0;

    const searchURL = `./products.html?keyword=${urlKeyword}&paging=0`;
    const nextState = { additionalInformation: `Search for ${urlKeyword}` };
    window.history.pushState(nextState, null, searchURL);
  }
}

function main() {
  if (urlKeyword) {
    clearProducts();
    fetchType = 'keyword';
    getData('all', defaultPage, urlKeyword);
  } else {
    getData(urlCategory, urlPage);
  }
}

function showCartNumber() {
  const cartNumHTML = document.querySelector('.get-cart-count');

  const number =
    localStorage.getItem('EthanSTYLiSHCart') === null
      ? 0
      : JSON.parse(localStorage.getItem('EthanSTYLiSHCart')).reduce(
          (total, order) => (total += order.qty),
          0
        );

  cartNumHTML.innerHTML =
    number > 0
      ? `<div class="cart-count">
          <p class="cart-count-num">${number}
          </p>
        </div>`
      : '';
}

getUrlParameter();
main();
setLogoAndCategoryButtons();
setSearchIcon();
listenPopstate();
showCartNumber();
