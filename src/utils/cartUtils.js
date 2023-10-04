export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculating total items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculating shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 500 ? 0 : 50);

  // Calculating tax price
  state.taxPrice = addDecimals(Number((0.01 * state.itemsPrice).toFixed(2)));

  // Calculating total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
