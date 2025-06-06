import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import React from "react";

export const AuthContext = React.createContext({
    user: {},
    setUser: ({}) => {},
    logOut: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children } :{ children: React.ReactNode }) => {
    const [user, setUser] = React.useState({});
    const [session, setSession] = React.useState<Session | null> (null);

    const getUser = async (session: Session| null) => {
        if (session) {
            // get user from the database
            // setUser()
            // const { data: { user } } = await supabase.auth.getUser();
            // setUser(user);
            router.push('/(tabs)');
        }
    }

    const logOut = async () => {
        await supabase.auth.signOut();
        router.push('/(auth)');
    }

    React.useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            // console.log("getSession");
            // console.log(session);
            setSession(session)
            getUser(session);
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            //     console.log("onAuthStateChange");
            // console.log(session);
        setSession(session);
         getUser(session);
    })
    
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}