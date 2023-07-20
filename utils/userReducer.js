// userReducer.js

const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const setUser = (userData) => ({
  type: 'SET_USER',
  payload: userData,
});

export const logoutUser = () => ({
  type: 'LOGOUT',
});

export default userReducer;
