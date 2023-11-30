// userReducer.js
const usernameDictionary = {
    "1": "Alex",
    "2": "Laila",
    "3": "Chen",
    "4": "Ade",
    "5": "Mia",
    "6": "Javier",
    "7": "Ananya",
    "8": "Sofia",
    "9": "Ravi",
    "10": "Zara"
    
  };
  
  const initialState = {
    userId: "1",
    username: usernameDictionary["1"], // Set initial username based on the default user ID
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_ID':
        const newUserId = action.payload;
        return {
          ...state,
          userId: newUserId,
          username: usernameDictionary[newUserId] || state.username, // Set the username based on the new user ID
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  