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

window.addEventListener('DOMContentLoaded', e => {
	const headerImages = document.querySelectorAll('#header .header__images-image');
	let i = 0;

	headerImages[i].classList.add('active');
	i += 1;

	setInterval(() => {
		if (i === headerImages.length) {
			i = 1;
			headerImages[headerImages.length - 1].classList.remove('active');
			headerImages[0].classList.add('active');
			return;
		}

		if (i) headerImages[i - 1].classList.remove('active');
		headerImages[i].classList.add('active');
		i += 1;
	}, 5000);
});

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

/* Growing Numbers */

const animNumbers = () => {
	const offset = elem => {
		let rect = elem.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
	}

	const featuresNumbersElems = document.querySelectorAll('.features__cart-wrap h2');
	const featuresNumbers = [];
	for (let i = 0, length = featuresNumbersElems.length; i < length; i++) {
		const animStart = 4;
		let animItemPoint = window.innerHeight - featuresNumbersElems[i].offsetHeight / animStart;
		if (featuresNumbersElems[i].offsetHeight > window.innerHeight) animItemPoint = window.innerHeight - window.innerHeight / animStart;
		if ((pageYOffset > offset(featuresNumbersElems[i]).top - animItemPoint) && pageYOffset < (offset(featuresNumbersElems[i]).top + featuresNumbersElems[i].offsetHeight)) {
			for (let y = 0; y < featuresNumbersElems.length; y++) {
				featuresNumbers.push(featuresNumbersElems[y].innerHTML);
			}

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
		if ((pageYOffset > offset(featuresNumbersElems[i]).top - animItemPoint) && pageYOffset < (offset(featuresNumbersElems[i]).top + featuresNumbersElems[i].offsetHeight) && featuresNumbersElems.length - 1 === i) {
			window.removeEventListener('scroll', animNumbers);
		}
	}
}

window.addEventListener('scroll', animNumbers);
animNumbers();