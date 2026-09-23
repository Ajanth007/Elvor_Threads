import {
  createContext,
  useReducer,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };

    case "LOGOUT":
      return {
        user: null,
      };

    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode JWT payload
        const payload = JSON.parse(atob(token.split(".")[1]));

        dispatch({
          type: "LOGIN",
          payload: {
            token: token,
            username: payload.username,
            id: payload.id,
          },
        });
      } catch (error) {
        console.error("Invalid token");

        localStorage.removeItem("token");

        dispatch({
          type: "LOGOUT",
        });
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;