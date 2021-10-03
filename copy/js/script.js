'use strict';
let activeFixedMenu = false;
let fixedPadding = document.querySelectorAll('.fixed-padding');
const body = document.querySelector('body');
const nav = document.querySelector('#nav');
const header = document.querySelector('#header');
const isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};

/* IB */

function ib() {
	let ib = document.querySelectorAll(".ib");
	for (let i = 0; i < ib.length; i++) {
		if (ib[i].querySelector('.ib_use')) {
			ib[i].style.backgroundImage = 'url(' + ib[i].querySelector('.ib_use').getAttribute('src') + ')';
		}
	}
}

ib();

/* Navigation */

const topNavHeight = document.querySelector('#top-nav').offsetHeight;
const headerBody = document.querySelector('#header .nav-margin');

const controlNavAddFix = () => {
	nav.classList.add('fixed');
	if (headerBody) headerBody.style.paddingTop = `${nav.offsetHeight}px`;
};

const controlNavRemoveFix = () => {
	nav.classList.remove('fixed');
	if (headerBody) headerBody.style.paddingTop = '0px';
};

const controlNav = e => {
	if (body.offsetWidth > 767) {
		if (topNavHeight <= pageYOffset) {
			controlNavAddFix();
			return;
		}
		controlNavRemoveFix();
	} else {
		if (pageYOffset > 0) {
			controlNavAddFix();
			return;
		}
		controlNavRemoveFix();
	}
}
controlNav();
window.addEventListener('scroll', controlNav);

/* Nav Search */

const searchModal = document.querySelector('.search-modal');
const navSearch = document.querySelector('.nav__search');
const navSearchClose = document.querySelector('.search-modal__close');

navSearch.addEventListener('click', e => {
	body.classList.add('lock');
	searchModal.classList.add('active');
});

navSearchClose.addEventListener('click', e => {
	body.classList.remove('lock');
	searchModal.classList.remove('active');
});

document.addEventListener('keydown', e => {
	if (e.which === 27) {
		body.classList.remove('lock');
		searchModal.classList.remove('active');
	}
});

/* Aminate Page */

let animItems = document.querySelectorAll('.anim-item');

if (animItems.length > 0) {
	const animItemsFunc = () => {
		for (let i = 0, length = animItems.length; i < length; i++) {
			const animStart = 4;
			let animItemPoint = window.innerHeight - animItems[i].offsetHeight / animStart;
			if (animItems[i].offsetHeight > window.innerHeight) animItemPoint = window.innerHeight - window.innerHeight / animStart;
			if ((pageYOffset > offset(animItems[i]).top - animItemPoint) && pageYOffset < (offset(animItems[i]).top + animItems[i].offsetHeight)) animItems[i].classList.add('active');
		}
	}
	const offset = elem => {
		let rect = elem.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
	}

	window.addEventListener('scroll', animItemsFunc);
	animItemsFunc();
}

/* Burger */

addBurger(document.querySelector('#nav-burger'));

function addBurger(elem) {
	const button = document.querySelector('#' + elem.id + ' .burger__btn');
	const links = document.querySelectorAll('#' + elem.id + ' .burger__link');
	const bgElem = document.querySelector('#' + elem.id + ' .burger__bg');
	const burgerArrowMenu = document.querySelectorAll('#' + elem.id + ' .burger__list-arrow');
	let burgerClose;

	if (button && links && bgElem && elem) {
		if (burgerArrowMenu) {
			for (let i = 0; i < burgerArrowMenu.length; i++) {
				const submenu = document.querySelector('.burger__list-submenu');
				const submenuInner = document.querySelector('.burger__list-submenu ul');
				let open = false;

				submenu.style.height = 0;

				burgerArrowMenu[i].addEventListener('click', e => {
					if (!open) {
						submenu.style.height = `${submenuInner.offsetHeight}px`;
						open = true;
					} else {
						submenu.style.height = '0px';
						open = false;
					}
				});
			}
		}
		burgerClose = document.querySelector('#' + elem.id + ' .burger__close-btn');
		burgerClose.addEventListener('click', function(e) {
			elem.classList.remove('active');
			burgBodyUnLock();
		});

		elem.classList.remove('active');
		burgBodyUnLock();

		button.addEventListener('click', function(e) {
			let popupActive = document.querySelector('.popup.open');

			if (popupActive) {
				closePopup(popupActive, false);
			}

			if (elem.classList.contains('active') && variation === 2) {
				elem.classList.remove('active');
				burgBodyUnLock();
			} else {
				elem.classList.add('active');
				burgBodyLock();
			}
		});

		for(let i = 0, length = links.length; i < length; i++) {
			links[i].addEventListener('click', function(e) {
				elem.classList.remove('active');
				burgBodyUnLock();
			});
		}

		document.documentElement.addEventListener('click', function(e) {
			if ((!e.target.closest('.burger') && elem.classList.contains('active')) || (e.target.closest('.' + bgElem.classList) && elem.classList.contains('active'))) {
				elem.classList.remove('active');
				burgBodyUnLock();
			}
		});
	}
}

function burgBodyLock() {
	let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (fixedPadding.length > 0) {
		for(let i = 0, length = fixedPadding.length; i < length; i++) {
			fixedPadding[i].style.paddingRight = paddingValue;
		}
	}

	body.style.paddingRight = paddingValue;
	body.classList.add('lock');
}

function burgBodyUnLock() {
	setTimeout(helpFunction, 300);
	function helpFunction() {
		if (fixedPadding.length > 0) {
			for(let i = 0, length = fixedPadding.length; i < length; i++) {
				fixedPadding[i].style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}
}

/* Popup */

let popupBtn = document.querySelectorAll('.popup-btn');
let closePopupBtn = document.querySelectorAll('.popup__close');
let timeout = 500;

if (popupBtn.length > 0) {
	for(let i = 0, length = popupBtn.length; i < length; i++) {
		popupBtn[i].addEventListener('click', function(e) {
			openPopup(document.getElementById(popupBtn[i].getAttribute('data-to-popup')));
		});
	}
}

if (closePopupBtn.length > 0) {
	for(let i = 0, length = closePopupBtn.length; i < length; i++) {
		closePopupBtn[i].addEventListener('click', function(e) {
			closePopup(closePopupBtn[i].closest('.popup'));
		});
	}
}

function openPopup(elem) {
	if (elem) {
		let popupActive = document.querySelector('.popup.open');

		if (popupActive) {
			closePopup(popupActive, false);
		} else {
			body.classList.add('lock');
		}

		elem.classList.add('open');
		elem.addEventListener('click', function(e) {
			if (!e.target.closest('.popup__body')) {
				closePopup(e.target.closest('.popup'));
			}
		});
	}
}

function closePopup(elem) {
	elem.classList.remove('open');
	body.classList.remove('lock');
}

document.addEventListener('keydown', function(e) {
	if (e.which === 27) {
		closePopup(document.querySelector('.popup.open'));
	}
});

/* Open Menu Mobile */

// const navNenuSub = document.querySelectorAll('.nav__menu_sub');

// if (isMobile.any()) {
//     console.log(navNenuSub)
// 	for (let i = 0; i < navNenuSub.length; i++) {
// 		const navNenuArrow = document.querySelector('.nav__sub-menu > .nav__menu-arrow');
// 		const navNenuSubMenu = document.querySelector('.nav__menu > .nav__sub-menu');
// 		let open = false;

// 		navMenuArrow[i].addEventListener('click', e => {
// 			if (!open) {
// 				navNenuSubMenu[i].classList.add('active');
// 				open = true;
// 			} else {
// 				navNenuSubMenu[i].classList.remove('active');
// 				open = false;
// 			}
// 		});
// 	}
// }