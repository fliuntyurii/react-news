import { LOGIN_SUCCESS } from "../constants/actions";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false
};

export function authReducer(state = initialState, action: any): AuthState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true };
    default:
      return state;
  }
}

export function login(username: string, password: string): Promise<boolean> {
  const expectedUsername = process.env.REACT_APP_USERNAME;
  const expectedPassword = process.env.REACT_APP_PASSWORD;

  if (username === expectedUsername && password === expectedPassword) {
    localStorage.setItem("auth", "true");
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
}
