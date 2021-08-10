const { SET_MESSAGE, CLEAR_MESSAGE } = require("./types.action");

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE
})