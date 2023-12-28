import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const FAKE_USER = {
  name: "your name",
  email: "user@gmail.com",
  password: "1234",
};

const initialState = {
  user: null,
  isAuthentication: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthentication: true,
      };
    case "logout":
      return {
        user: null,
        isAuthentication: false,
      };
    default:
      throw new Error("unknown action!");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthentication }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(email, password) {
    // in real projects it must be async func
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
    if (email !== FAKE_USER.email || password !== FAKE_USER.password)
      toast.error("Email or Password is not correct!");
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthentication, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}
