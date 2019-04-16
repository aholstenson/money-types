const currencyData = require('cldr-core/supplemental/currencyData.json').supplemental.currencyData;
const currencies = Object.keys(
	require('cldr-numbers-modern/main/en-US-POSIX/currencies.json').main['en-US-POSIX'].numbers.currencies
);

for(const key of currencies) {
	let currency = currencyData.fractions[key] || currencyData.fractions.DEFAULT;
	outputCurrencyUnit(key, currency);
}

function outputCurrencyUnit(code, currency) {
	let digits = currency._digits;
	let rounding = currency._rounding;

	let cashDigits = typeof currency._cashDigits !== 'undefined'
		? currency._cashDigits
		: digits;

	let cashRounding = typeof currency._cashRounding !== 'undefined'
		? currency._cashRounding
		: rounding;

	const c = `export const ` + code + ': CurrencyUnit = { '
		+ 'code: \'' + code + '\', '
		+ 'decimalDigits: ' + String(digits) + ', '
		+ 'decimalRounding: ' + String(rounding) + ', '
		+ 'cash: { '
		+ 'decimalDigits: ' + String(cashDigits) + ', '
		+ 'decimalRounding: ' + String(cashRounding)
		+ ' } };'

	console.log(c);
}
