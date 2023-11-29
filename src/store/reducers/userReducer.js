// userReducer.js
const initialState = {
    userId: 1, // Set your default user ID here
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_ID':
        return { ...state, userId: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  