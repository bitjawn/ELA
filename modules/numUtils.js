function formatNumber(num) {
	let number = new String(num).trim();
	switch (number.length) {
		case 1:
			return '0'+ number;

		default:
			return number;
	}
}

function numberSuffix(num) {
	let number = new String(num).trim();
	const lastChar = number.substring((number.length - 1));
	switch(lastChar) {
		case '1':
			return num + 'st';

		case '2':
			return num + 'nd';

		case '3':
			return num + 'rd';

		default:
			return num + 'th';
	}
}

module.exports = {
	formatMinute: (function(){
		return function(n) {
			return formatNumber(n);
		}
	})(),
	formatSecond: (function(){
		return function(n) {
			return formatNumber(n);
		}
	})()
};
