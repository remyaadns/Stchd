import { supabase } from "@/lib/supabase";
import username from "@/screens/auth/username";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import React from "react";

export const AuthContext = React.createContext({
    user: {},
    setUser: ({ }) => { },
    logOut: () => { },
    createUser: (username: string) => { },
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState({});
    const [session, setSession] = React.useState<Session | null>(null);

    const createUser = async (username: string) => {
        const { data, error } = await supabase.from('User').insert({
            id: session?.user.id,  // Use session to get user ID
            username,
        }).select();

        if (error) return console.error(error);

        const user = data[0];
        setUser(user);
        // console.log(data, error);

    }


    const getUser = async (session: Session | null) => {
        if (session) {
            const { data, error } = await supabase
                .from('User')
                .select()
                .eq('id', session.user.id)

            if (!error) {
                setUser(data[0])
                router.push('/(tabs)');
            };

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
            // setSession(session)
            getUser(session);
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            //     console.log("onAuthStateChange");
            // console.log(session);
            // setSession(session);
            getUser(session);
        })

    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, logOut, createUser }}>
            {children}
        </AuthContext.Provider>
    )
}


