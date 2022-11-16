export const helperMethods = {
  setCurrencyValues: (props) => {
    const { currency, prices } = props;
    const selectedCurrencyValues = prices.find(
      (item) => item.currency.symbol === currency
    );

    const symbol =
      selectedCurrencyValues === undefined
        ? "$"
        : selectedCurrencyValues.currency.symbol;
    const amount =
      selectedCurrencyValues === undefined ? 0 : selectedCurrencyValues.amount;
    return { symbol, amount };
  },

  toPlainText: (tag) => {
    if (tag === null || tag === " ") {
      return false;
    } else {
      tag.toString();
    }
    return tag.replace(/(<([^>]+)>)/gi, " ");
  },

  handleAttribute: (attributes) => {
    let attributeItemsByName = new Map();
    attributes.forEach((att) => {
      for (let key in att) {
        attributeItemsByName.set(att["name"], att.items);
      }
    });
    return attributeItemsByName;
  },
  countAmount: (cartItems, currency) => {
    let sumToShow = 0;
    let symbolToShow = "$";

    cartItems.forEach((item) => {
      const { symbol, amount } = helperMethods.setCurrencyValues({
        currency,
        prices: item.prices,
      });

      sumToShow = amount * item.quantity;
      symbolToShow = symbol;
    });

    return { sumToShow, symbolToShow };
  },
};
