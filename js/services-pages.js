'use strict';

/* Additional Tabs */

const additionalTabs = document.querySelectorAll('.additional__tab');
const additionalTabsNavs = document.querySelectorAll('.additional__tab-nav');
const additionalTabsContent = document.querySelectorAll('.additional__tab-content');
const additionalTabsWrap = document.querySelectorAll('.additional__tab-wrap');

if (additionalTabs.length === additionalTabsNavs.length && additionalTabs.length === additionalTabsContent.length && additionalTabs.length === additionalTabsWrap.length) {
	for (let i = 0; i < additionalTabs.length; i++) {
		let open = false;
		additionalTabsNavs[i].addEventListener('click', e => {
			if (!open) {
				additionalTabsContent[i].style.height = additionalTabsWrap[i].offsetHeight + 'px';
				additionalTabs[i].classList.add('active');
				open = true;
				return;
			}
			additionalTabsContent[i].style.height = '0px';
			additionalTabs[i].classList.remove('active');
			open = false;
		});
	}
} else {
	for (let i = 0; i < additionalTabs.length; i++) {
		additionalTabsContent[i].style.height = 'unset';
	}
}

/* Price Tabs */

window.addEventListener('DOMContentLoaded', e => {
	const priceTabs = document.querySelectorAll('.price__tab');
	const priceTabsWrap = document.querySelectorAll('.price__tab-wrap');
	const priceTabsBtns = document.querySelector('.price__btns-wrap');
	const priceTabsBtn = document.querySelectorAll('.price__btns-btn');
	const priceTabsCurrent = document.querySelector('.price__btns-current');

	priceTabsBtn[0].classList.add('active');
	priceTabs[0].classList.add('active');
	for (let i = 0; i < priceTabs.length; i++) {
		const moving = priceTabsBtns.offsetWidth / priceTabs.length + 6;
		let prevTab = 0;

		priceTabsBtns.addEventListener('click', e => {
			if (prevTab === priceTabsBtn.length - 1) {
				priceTabsBtn[prevTab].classList.remove('active');
				priceTabs[prevTab].classList.remove('active');
				priceTabs[0].classList.add('active');
				priceTabsBtn[0].classList.add('active');
				prevTab = 0;
				priceTabsCurrent.style.left = '3px';
				return;
			}
			priceTabsCurrent.style.left = moving + 'px';
			priceTabsBtn[prevTab].classList.remove('active');
			priceTabs[prevTab].classList.remove('active');
			priceTabs[prevTab + 1].classList.add('active');
			priceTabsBtn[prevTab + 1].classList.add('active');
			prevTab += 1;
		});
	}
});