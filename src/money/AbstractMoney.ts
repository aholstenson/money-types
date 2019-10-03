import { CurrencyUnit } from '../currency';
import { MoneyOptions } from './MoneyOptions';

import { RoundingMode } from 'numeric-types';
import { AbstractDecimal, scale } from 'numeric-types/decimal';

/**
 * An amount of money in a specific currency.
 */
export abstract class AbstractMoney<V extends AbstractDecimal<any>> {
	/**
	 * Amount that this money instance represents.
	 */
	public readonly amount: V;

	/**
	 * The currency the amount is in.
	 */
	public readonly currencyUnit: CurrencyUnit;

	constructor(amount: V, currencyUnit: CurrencyUnit, options?: MoneyOptions) {
		const decimalDigits = (options && options.decimalDigits) || currencyUnit.decimalDigits;
		this.amount = scale(amount, { scale: decimalDigits, roundingMode: RoundingMode.HalfEven });
		this.currencyUnit = currencyUnit;
	}

	/**
	 * Convert this amount of money into a string that can later be parsed.
	 */
	public toString(): string {
		return this.currencyUnit.code + ' ' + this.amount.toString();
	}
}

