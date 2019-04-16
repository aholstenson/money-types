import { Money } from '../../src/money/money';
import { EUR, SEK, CurrencyUnit } from '../../src/currency';

import { Decimal, scale } from 'numeric-types/decimal';
import { RoundingMode } from 'numeric-types';

const defaultContext = { scale: 2, roundingMode: RoundingMode.HalfEven };

describe('Money', function() {
	describe('Normal', function() {
		it('fromNumber', function() {
			const m = Money.fromNumber(12, EUR);
			expect(m.amount).toEqual(scale(Decimal.fromNumber(12.00), defaultContext));
			expect(m.currencyUnit).toEqual(EUR);
		});

		it('fromNumber', function() {
			const m = Money.fromDecimal(Decimal.fromNumber(12), EUR);
			expect(m.amount).toEqual(scale(Decimal.fromNumber(12.00), defaultContext));
			expect(m.currencyUnit).toEqual(EUR);
		});

		it('parse', function() {
			const currencies = new Map<string, CurrencyUnit>();
			currencies.set('EUR', EUR);
			currencies.set('SEK', SEK);

			const m1 = Money.parse('SEK 200.21', currencies);
			expect(m1.amount).toEqual(Decimal.fromNumber(200.21));
			expect(m1.currencyUnit).toEqual(SEK);

			const m2 = Money.parse('EUR 200', currencies);
			expect(m2.amount).toEqual(scale(Decimal.fromNumber(200), defaultContext));
			expect(m2.currencyUnit).toEqual(EUR);

			const m3 = Money.parse('SEK 200.212', currencies);
			expect(m3.amount).toEqual(Decimal.fromNumber(200.21));
			expect(m3.currencyUnit).toEqual(SEK);
		});
	});
});
