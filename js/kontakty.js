'use strict';

/* Contacts Tabs */

window.addEventListener('DOMContentLoaded', e => {
	const contactsTabs = document.querySelectorAll('.contacts__tab');
	const contactsTabsBtn = document.querySelectorAll('.contacts__btns-btn');
	let prevTab = 0;

	if (contactsTabs.length === contactsTabsBtn.length) {
		for (let i = 0; i < contactsTabs.length; i++) {
			contactsTabsBtn[prevTab].classList.add('active');
			contactsTabs[prevTab].classList.add('active');
			contactsTabsBtn[i].addEventListener('click', e => {
				contactsTabsBtn[prevTab].classList.remove('active');
				contactsTabs[prevTab].classList.remove('active');
				contactsTabs[i].classList.add('active');
				contactsTabsBtn[i].classList.add('active');
				prevTab = i;
			});
		}
	}
});