import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { me, signOut } from "@/data";
import { AuthContext } from ".";
import { useLocation } from "react-router-dom";

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkSession, setCheckSession] = useState(true);
  const [user, setUser] = useState(null);
  const pathsToIgnore = ["/login", "/signup"];
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await me();
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
      } finally {
        setCheckSession(false);
      }
    };
    const shouldCheck =
      checkSession && !pathsToIgnore.includes(location.pathname);
    if (shouldCheck) getUser();
  }, [checkSession, location.pathname]);
  
	const logOut = async () => {
		try {
			await signOut();
			toast.success("You have been logged out");
			setIsAuthenticated(false);
			setUser(null);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				logOut,
				user,
				setIsAuthenticated,
				setCheckSession,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
