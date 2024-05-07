// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    console.log("auth.js client getProfile starting"); 
    const mytoken = this.getToken();
    console.log("auth.js client getProfile this.getToken: ", mytoken ); 
    // Seems like this next line is WRONG.  Check if myToken is null. If so return null.  
    // Almost sure decode(null) caused bad bad error about not token type. 
    const result = decode(this.getToken()); 
    console.log("auth.js client getProfile decode(token): ", result ); 
    return result; 
    // return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage. Returns null if not exist. Not the most secure. 
    console.log("auth.js client getToken starting"); 
    const localToken = localStorage.getItem('id_token');
    console.log("auth.js client getToken localStorage.getItem(token): ", localToken);    
    return localToken;
  }

  login(idToken) {
    // Saves user token to localStorage
    console.log("auth.js client login(idToken) starting ... "); 
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');  
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
