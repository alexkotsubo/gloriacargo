'use strict';

/* Growing Numbers */

const animNumbers = () => {
	const offset = elem => {
		let rect = elem.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
	}

	const featuresNumbersElems = document.querySelectorAll('.about__feature-title span');
	const featuresNumbers = [];
	const featuresNumbersNotChanged = [];
	for (let i = 0, length = featuresNumbersElems.length; i < length; i++) {
		const animStart = 4;
		let animItemPoint = window.innerHeight - featuresNumbersElems[i].offsetHeight / animStart;
		if (featuresNumbersElems[i].offsetHeight > window.innerHeight) animItemPoint = window.innerHeight - window.innerHeight / animStart;
		if ((pageYOffset > offset(featuresNumbersElems[i]).top - animItemPoint) && pageYOffset < (offset(featuresNumbersElems[i]).top + featuresNumbersElems[i].offsetHeight)) {
			for (let y = 0; y < featuresNumbersElems.length; y++) {
				let value = featuresNumbersElems[y].innerHTML;
				featuresNumbersNotChanged.push(value);
				featuresNumbers.push(value.replace(/[\s.,\+]/g, ''));
			}

			const smooth = 70;
			const seconds = 1000;
			if (smooth >= 50 && smooth <= seconds) {
				let value = 0;
				const num = featuresNumbers[i];
				const period = seconds / smooth;
				const addNum = featuresNumbers[i] / period;
				const increment = setInterval(() => {
					if (value <= featuresNumbers[i]) {
						const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						featuresNumbersElems[i].innerHTML = numberWithCommas(Math.trunc(value)) + '+';
						Math.trunc(value);
					} else {
						featuresNumbersElems[i].innerHTML = featuresNumbersNotChanged[i];
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

/* Open Carts */

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
	openCartsFunc([servicesCarts]);
}