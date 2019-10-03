import { BigMoney } from '../../src/money/BigMoney';
import { EUR, SEK, CurrencyUnit } from '../../src/currency';

import { BigDecimal, scale } from 'numeric-types/decimal';
import { RoundingMode } from 'numeric-types';

const defaultContext = { scale: 2, roundingMode: RoundingMode.HalfEven };

describe('Money', function() {
	describe('Big', function() {
		it('fromNumber', function() {
			const m = BigMoney.fromNumber(12, EUR);
			expect(m.amount).toEqual(scale(BigDecimal.fromNumber(12.00), defaultContext));
			expect(m.currencyUnit).toEqual(EUR);
		});

		it('fromNumber', function() {
			const m = BigMoney.fromDecimal(BigDecimal.fromNumber(12), EUR);
			expect(m.amount).toEqual(scale(BigDecimal.fromNumber(12.00), defaultContext));
			expect(m.currencyUnit).toEqual(EUR);
		});

		it('parse', function() {
			const currencies = new Map<string, CurrencyUnit>();
			currencies.set('EUR', EUR);
			currencies.set('SEK', SEK);

			const m1 = BigMoney.parse('SEK 200.21', currencies);
			expect(m1.amount).toEqual(BigDecimal.fromNumber(200.21));
			expect(m1.currencyUnit).toEqual(SEK);

			const m2 = BigMoney.parse('EUR 200', currencies);
			expect(m2.amount).toEqual(scale(BigDecimal.fromNumber(200), defaultContext));
			expect(m2.currencyUnit).toEqual(EUR);

			const m3 = BigMoney.parse('SEK 200.212', currencies);
			expect(m3.amount).toEqual(BigDecimal.fromNumber(200.21));
			expect(m3.currencyUnit).toEqual(SEK);
		});
	});
});
