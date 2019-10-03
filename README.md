# Money types for JavaScript and TypeScript

[![npm version](https://badge.fury.io/js/money-types.svg)](https://badge.fury.io/js/money-types)
[![Build Status](https://travis-ci.org/aholstenson/money-types.svg?branch=master)](https://travis-ci.org/aholstenson/money-types)
[![Coverage Status](https://coveralls.io/repos/aholstenson/money-types/badge.svg)](https://coveralls.io/github/aholstenson/money-types)
[![Dependencies](https://david-dm.org/aholstenson/money-types.svg)](https://david-dm.org/aholstenson/money-types)

This library contains implementations of useful types related to money, to work
with currencies and amounts.

```
npm install money-types
```

## Features and status

This is currently an early release that simply supports accurate representation
of an amount of money.

* Currency representation

  * `CurrencyUnit` with information about decimal places and rounding.
  * Currencies generated from Unicode CLDR

* Money representation
  
  * 
    `Money` for representing amounts with up to 15 digits of precision, for 
    currencies with 2 decimal places that allows for values of up to 10
    trillion (10 000 000 000 000).
  *
    `BigMoney` for representing amounts that need more than 15 digits of
    precision.

## Currencies

Currencies are represented by their ISO-4217 three letter code. All currencies
include information about their number of decimal digits and rounding, for both
a default case and for the case when used in a cash scenario.

A currency unit contains the following data:

* `currencyUnit.code: string`, the three letter ISO-4217 code
*  
  `currencyUnit.decimalDigits: number`, the number of digits this currency has
  in the decimal part of the amount. A value of `2` means that an amount of value
  is internally represented as `1.00`.
*  
  `currencyUnit.decimalRounding: number`, rounding to apply to the decimal part.
  If specified this defines that the decimal part needs to be divisible by this
  number. So if a currency rounds to the nearest `.50` this would be `50`.
*  
  `currencyUnit.cash: DecimalPrecision`, contains `decimalDigits` and
  `decimalRounding` but as applied in a cash scenario.

Currencies are available as separate imports:

```javascript
import { EUR, USD } from 'money-types/currency';
```

## Money

* `static MoneyType.fromNumber(amount: number, currency: CurrencyUnit, options?: MoneyOptions): Money`

  Create a money instance from the given number, rounding it according to
  the options, or to the number of digits of the currency.

* `static MoneyType.fromDecimal(amount: Decimal, currency: CurrencyUnit, options?: MoneyOptions): Money`

  Create a money instance from the given decimal, rounding it according to
  the options, or to the number of digits of the currency.

* `static MoneyType.parse(value: string, currencies: Currencies): Money`

  Parse a string representation of money, resolving the currency via the
  specified `currencies` object. Currencies currently need to support a single
  function: `get(currency: string): CurrencyUnit | undefined`.

```javascript
import { Money } from 'money-types/money';
import { EUR, USD } from 'money-types/currency';

// Create directly
const m1 = Money.fromNumber(12.2, EUR);

// Specify a custom number of decimal digits
const m2 = Money.fromNumber(0.00012, USD, { decimalDigits: 5 });

// Parse the toString format, providing available currencies
const currencies = new Map();
currencies.set('EUR', EUR);
currencies.set('USD', USD);

const m2 = Money.parse('EUR 20', currencies);
```
