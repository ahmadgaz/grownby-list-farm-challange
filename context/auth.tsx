import { router, useSegments } from "expo-router";
import { User } from "firebase/auth";
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext<{
    setUser: (user: User | null) => void;
    user: User | null;
} | null>(null);

// This hook can be used to access the user info.
export function useAuth() {
    return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: User | null) {
    const segments = useSegments();

    useEffect(() => {
        const inAuthGroup = segments[0] === "(home)";

        if (
            // If the user is not signed in and the initial segment is not anything in the auth group.
            !user &&
            !inAuthGroup
        ) {
            // Redirect to the sign-in page.
            router.push("/");
        } else if (user && inAuthGroup) {
            // Redirect away from the sign-in page.
            router.push("/list");
        }
    }, [user, segments]);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setAuth] = useState<User | null>(null);

    useProtectedRoute(user);

    return (
        <AuthContext.Provider
            value={{
                setUser: (user: User | null) => setAuth(user),
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
