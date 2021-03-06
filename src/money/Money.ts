import { Decimal } from 'numeric-types/decimal';
import { AbstractMoney } from './AbstractMoney';
import { CurrencyUnit, Currencies } from '../currency';
import { MoneyOptions } from './MoneyOptions';

const PATTERN = /^([A-Z]{3}) ((?:[-\+]?\d+)(?:\.(\d*))?(?:e(?:[-\+]?\d+))?)$/;

/**
 * An amount of money, with a precision limited to 15 digits.
 */
export class Money extends AbstractMoney<Decimal> {

	constructor(amount: Decimal, currencyUnit: CurrencyUnit, options?: MoneyOptions) {
		super(amount, currencyUnit, options);
	}

	/**
	 * Create a new instance from a number and a currency.
	 *
	 * @param amount
	 * @param currencyUnit
	 * @param options
	 */
	public static fromNumber(amount: number, currencyUnit: CurrencyUnit, options?: MoneyOptions): Money {
		return new Money(Decimal.fromNumber(amount), currencyUnit, options);
	}

	/**
	 * Create a new instance from a decimal and a currency.
	 *
	 * @param amount
	 * @param currencyUnit
	 * @param options
	 */
	public static fromDecimal(amount: Decimal, currencyUnit: CurrencyUnit, options?: MoneyOptions): Money {
		return new Money(amount, currencyUnit, options);
	}

	/**
	 * Parse a string representation of a money amount. These are strings in
	 * which the three-letter currency code is followed by the amount.
	 *
	 * Examples: `EUR 20`, `USD 5.50`
	 *
	 * @param value
	 * @param currencies
	 * @param options
	 */
	public static parse(value: string, currencies: Currencies, options?: MoneyOptions): Money {
		const matched = PATTERN.exec(value.trim());
		if(! matched) {
			throw new Error('Invalid string representation of money');
		}

		const currencyUnit = currencies.get(matched[1]);
		if(! currencyUnit) {
			throw new Error('Currency unit ' + matched[1] + ' not found');
		}

		const decimal = Decimal.parse(matched[2]);

		return new Money(decimal, currencyUnit, options);
	}
}
