const calcCart = document.querySelectorAll('.calc__cart');
const calcLine = document.querySelector('.calc__line-percent');
const calcVariantsList = document.querySelectorAll('.calc__variants-list');
const calcContactDiscount = document.querySelector('.calc__contact-discount span');
let activeVariant = null;

if (calcCart[0].classList.contains('calc__variants')) {
	let totalPrice = null;
	const calcVariantsBtn = document.querySelector('.calc__variants .calc__variants-btn .btn');
	const calcVariantsWrap = document.querySelectorAll('.calc__variants-wrap');
	for (let y = 0; y < calcVariantsWrap.length; y++) {
		calcVariantsWrap[y].addEventListener('click', e => {
			if (activeVariant !== null) calcVariantsWrap[activeVariant].classList.remove('active');
			calcVariantsWrap[y].classList.add('active');
			activeVariant = y;
		});
	}
	calcVariantsBtn.addEventListener('click', e => {
		if (activeVariant !== null) {
			calcLine.style.width = '66.666%';
			calcCart[0].classList.remove('active');
			if (activeVariant === 0) {
				calcCart[1].classList.add('active');
				const calcCalcBtns = document.querySelectorAll('.calc__calc_1 .calc__cart-btn .btn');
				const calcCalcCheckboxes = document.querySelectorAll('.calc__calc_1 .calc__calc-checkboxes label input');
				const calcCalcInput = document.querySelector('.calc__calc_1 .calc__calc-inputs label input');
				let checkedValue = null;
				calcCalcBtns[0].addEventListener('click', e => {
					calcLine.style.width = '33.333%';
					calcCart[1].classList.remove('active');
					calcCart[0].classList.add('active');
				});
				calcCalcBtns[1].addEventListener('click', e => {
					for (let i = 0; i < calcCalcCheckboxes.length; i++) {
						if (calcCalcCheckboxes[i].checked) checkedValue = calcCalcCheckboxes[i].value;
					}
					if (checkedValue !== null) {
						if (parseInt(calcCalcInput.value) >= 0) {
							calcLine.style.width = '100%';
							calcCart[1].classList.remove('active');
							calcCart[3].classList.add('active');
							totalPrice = checkedValue * calcCalcInput.value;
							calcContactDiscount.innerHTML = '$' + totalPrice;
							const calcContactBtn = document.querySelector('.calc__contact-btn .btn');
							calcContactBtn.addEventListener('click', e => {
								calcLine.style.width = '33.333%';
								calcCart[3].classList.remove('active');
								calcCart[0].classList.add('active');
							});
						} else {
							calcCalcInput.classList.add('error');
						}
					}
				});
				return;
			}
			calcCart[0 + 2].classList.add('active');
			const calcCalcBtns = document.querySelectorAll('.calc__calc_2 .calc__cart-btn .btn');
			const calcCalcCheckboxes = document.querySelectorAll('.calc__calc_2 .calc__calc-checkboxes label input');
			const calcCalcInput = document.querySelectorAll('.calc__calc_2 .calc__calc-inputs label input');
			let checkedValue = null;
			let height = null;
			let width = null;
			let depth = null;
			calcCalcBtns[0].addEventListener('click', e => {
				calcLine.style.width = '33.333%';
				calcCart[2].classList.remove('active');
				calcCart[0].classList.add('active');
			});
			calcCalcBtns[1].addEventListener('click', e => {
				for (let i = 0; i < calcCalcCheckboxes.length; i++) {
					if (calcCalcCheckboxes[i].checked) checkedValue = calcCalcCheckboxes[i].value;
				}
				for (let i = 0; i < calcCalcInput.length; i++) {
					calcCalcInput[i].classList.remove('error');
					if (parseInt(calcCalcInput[i].value) >= 0) {
						if (calcCalcInput[i].name === 'height') height = calcCalcInput[i].value;
						if (calcCalcInput[i].name === 'width') width = calcCalcInput[i].value;
						if (calcCalcInput[i].name === 'depth') depth = calcCalcInput[i].value;
					} else {
						calcCalcInput[i].classList.add('error');
					}
				}
				if (checkedValue !== null) {
					calcLine.style.width = '100%';
					calcCart[2].classList.remove('active');
					calcCart[3].classList.add('active');
					totalPrice = checkedValue * (height * width * depth);
					calcContactDiscount.innerHTML = '$' + totalPrice;
					const calcContactBtn = document.querySelector('.calc__contact-btn .btn');
					calcContactBtn.addEventListener('click', e => {
						calcLine.style.width = '33.333%';
						calcCart[3].classList.remove('active');
						calcCart[0].classList.add('active');
					});
				}
			});
		}
	});
}