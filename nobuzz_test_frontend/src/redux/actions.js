export const signup = (userData) => {
    return {
      type: 'signup',
      payload: userData || null,
    };
};
  
export const login = (userData) => {
    return {
      type: 'login',
      payload: userData || null,
    };
};
  

export const logout = () => {
    return {
      type: 'logout',
      payload: null,
    };
};
  


export const getUserData = () => {
  console.log('getUserData - action');
    return {
      type: 'getUserData',
      payload: null,
    };
};
  

