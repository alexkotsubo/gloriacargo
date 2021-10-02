'use strict';

/* Mission Slider */

const missionSlider = new Swiper('.mission__customers-reviews .swiper', {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 50,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		1200: {
			slidesPerView: 2,
		},
	}
});

/* Header Slider */

const headerImage = document.querySelector('#header .header__image');
const headerImages = document.querySelectorAll('#header .header__images img');
const headerImagesSrc = [];
let headerImagesIndex = 0;

for (let i = 0; i < headerImages.length; i++) {
	headerImagesSrc.push(headerImages[i].src);
}

headerImage.style.backgroundImage = `url(${headerImagesSrc[headerImagesIndex]})`;
headerImagesIndex += 1;

setInterval(() => {
	if (headerImagesIndex === headerImages.length) {
		headerImagesIndex = 0;
	}
	headerImage.style.backgroundImage = `url(${headerImagesSrc[headerImagesIndex]})`;
	headerImagesIndex += 1;
}, 5000);

/* Header Text Change */

window.addEventListener('DOMContentLoaded', e => {
	const headerTitles = document.querySelectorAll('.header__title > .header__title-titles > span');
	const headerVariant = document.querySelector('.header__title .header__title-variant');
	const headerVariantText = document.querySelector('.header__title .header__title-variant span');
	const headerTitlesWords = [];
	let headerTitlesIndex = 0;

	for (let i = 0; i < headerTitles.length; i++) {
		headerTitlesWords.push(headerTitles[i].innerHTML);
	}

	headerVariantText.innerHTML = headerTitlesWords[headerTitlesIndex];
	headerVariant.style.width = headerVariant.offsetWidth + 'px';
	headerTitlesIndex += 1;

	setTimeout(() => {
		headerVariant.style.width = 0;
	}, 2700);

	setInterval(() => {
		if (headerTitlesIndex === headerTitles.length) {
			headerTitlesIndex = 0;
		}
		headerVariantText.innerHTML = headerTitlesWords[headerTitlesIndex];
		headerTitlesIndex += 1;
		headerVariant.style.width = `${headerVariantText.offsetWidth}px`;
		setTimeout(() => {
			headerVariant.style.width = 0;
		}, 2700);
	}, 3000);
});

/* International Text */

const internationalContent = document.querySelector('.international__content');
const internationalContentWrap = document.querySelector('.international__content-wrap');
const internationalBtnShow = document.querySelector('.international__btn-show');
const internationalBtnHide = document.querySelector('.international__btn-hide');

internationalBtnShow.addEventListener('click', e => {
	internationalContent.style.height = internationalContentWrap.offsetHeight + 'px';
	internationalBtnShow.classList.remove('active');
	internationalBtnHide.classList.add('active');
});

internationalBtnHide.addEventListener('click', e => {
	internationalContent.style.height = '52px';
	internationalBtnShow.classList.add('active');
	internationalBtnHide.classList.remove('active');
});

/* Growing Numbers */

const featuresNumbersElems = document.querySelectorAll('.features__cart-wrap h2');
const featuresNumbers = [];

for (let i = 0; i < featuresNumbersElems.length; i++) {
	featuresNumbers.push(featuresNumbersElems[i].innerHTML);
}

for (let i = 0; i < featuresNumbersElems.length; i++) {
	const smooth = 50;
	const seconds = 1000;
	if (smooth >= 50 && smooth <= seconds) {
		let value = 0;
		const num = featuresNumbers[i];
		const period = seconds / smooth;
		const addNum = featuresNumbers[i] / period;
		const increment = setInterval(() => {
			if (value <= featuresNumbers[i]) {
				featuresNumbersElems[i].innerHTML = Math.trunc(value);
			} else {
				featuresNumbersElems[i].innerHTML = num;
				clearInterval(increment);
			}
			value += addNum;
		}, smooth);
	}
}

/* Open Carts */

const headerCarts = document.querySelectorAll('.header__cart');
const servicesCarts = document.querySelectorAll('.services__cart');

if (isMobile.any()) {
	const openCartsFunc = carts => {
		for (let i = 0; i < carts.length; i++) {
			let lastOpen = null;
			const currentCarts = carts[i];
			for (let i = 0; i < currentCarts.length; i++) {
				currentCarts[i].addEventListener('click', e => {
					if (lastOpen !== null) {
						currentCarts[lastOpen].classList.remove('active');
					}
					if (lastOpen !== i) {
						currentCarts[i].classList.add('active');
						lastOpen = i;
					} else {
						currentCarts[i].classList.remove('active');
						lastOpen = null;
					}
				});
			}
		}
	};
	openCartsFunc([headerCarts, servicesCarts]);
}