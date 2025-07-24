// import { supabase } from "@/lib/supabase";
// import username from "@/screens/auth/username";
// import { Session } from "@supabase/supabase-js";
// import { router } from "expo-router";
// import React from "react";

// export const AuthContext = React.createContext({
//     user: {},
//     setUser: ({ }) => { },
//     logOut: () => { },
//     createUser: (username: string) => { },
// });

// export const useAuth = () => React.useContext(AuthContext);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = React.useState({});
//     const [session, setSession] = React.useState<Session | null>(null);

//     const createUser = async (username: string) => {
//         const { data, error } = await supabase.from('User').insert({
//             id: session?.user.id,  // Use session to get user ID
//             username,
//         }).select();

//         if (error) return console.error(error);

//         const user = data[0];
//         setUser(user);
//         // console.log(data, error);

//     }


//     const getUser = async (session: Session | null) => {
//         if (session) {
//             const { data, error } = await supabase
//                 .from('User')
//                 .select()
//                 .eq('id', session.user.id)

//             if (!error) {
//                 setUser(data[0])
//                 router.push('/(tabs)');
//             };

//         }
//     }

//     const logOut = async () => {
//         await supabase.auth.signOut();
//         router.push('/(auth)');
//     }

//     React.useEffect(() => {
//         supabase.auth.getSession().then(({ data: { session } }) => {
//             // console.log("getSession");
//             // console.log(session);
//             // setSession(session)
//             getUser(session);
//         })

//         supabase.auth.onAuthStateChange((_event, session) => {
//             //     console.log("onAuthStateChange");
//             // console.log(session);
//             // setSession(session);
//             getUser(session);
//         })

//     }, []);

//     return (
//         <AuthContext.Provider value={{ user, setUser, logOut, createUser }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }


////////////////////////////////////
//TESTER//
////////////////////////////////////

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
     const [loading, setLoading] = React.useState(true); 

const createUser = async (username: string) => {
    if (!session?.user?.id) {
        console.error('No session found when creating user');
        return;
    }

    const { data, error } = await supabase.from('User').insert({
        id: session.user.id,
        username,
    }).select();

    if (error) {
        console.error('Error creating user:', error);
        return;
    }

    const user = data[0];
    setUser(user);
    router.push('/(tabs)');
}


const getUser = async (session: Session | null) => {
    setLoading(true);
    
    if (session) {
        setSession(session); // Important: Set session first
        
        const { data, error } = await supabase
            .from('User')
            .select()
            .eq('id', session.user.id)

        if (!error && data && data.length > 0) {
            // User profile exists
            setUser(data[0]);
            router.push('/(tabs)');
        } else {
            // No user profile - redirect to username creation
            console.log('No user profile found, redirecting to username creation');
            setUser({}); // Clear user but keep session
            router.push('/(auth)/username'); // Adjust path as needed
        }
    } else {
        // No session - redirect to auth
        setUser({});
        setSession(null);
        router.push('/(auth)');
    }
    
    setLoading(false);
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





















function setLoading(arg0: boolean) {
    throw new Error("Function not implemented.");
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// CLAUDE'S ATTEMPT 
//
// //////////////////////////////////////////////////// ////////////////////////////////////////////////////////////////////////////////////////////////

// import { supabase } from "@/lib/supabase";
// import { Session } from "@supabase/supabase-js";
// import { router } from "expo-router";
// import React from "react";

// export const AuthContext = React.createContext({
//     user: null,
//     setUser: (user: any) => { },
//     logOut: () => { },
//     createUser: (username: string) => { },
//     session: null,
// });

// export const useAuth = () => React.useContext(AuthContext);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = React.useState(null); // Changed from {} to null
//     const [session, setSession] = React.useState<Session | null>(null);

//     const createUser = async (username: string) => {
//         if (!session?.user?.id) {
//             console.error('No session or user ID available');
//             return;
//         }

//         const { data, error } = await supabase.from('User').insert({
//             id: session.user.id,
//             username,
//         }).select();

//         if (error) {
//             console.error('Error creating user:', error);
//             return;
//         }

//         const newUser = data[0];
//         setUser(newUser);
//         console.log('User created successfully:', newUser);
//     }

//     const getUser = async (currentSession: Session | null) => {
//         console.log('getUser called with session:', currentSession?.user?.id);
        
//         if (currentSession?.user?.id) {
//             setSession(currentSession); // Set the session state
            
//             const { data, error } = await supabase
//                 .from('User')
//                 .select()
//                 .eq('id', currentSession.user.id)

//             if (error) {
//                 console.error('Error fetching user:', error);
//                 setUser(null);
//                 return;
//             }

//             if (data && data.length > 0) {
//                 const userData = data[0];
//                 setUser(userData);
//                 console.log('User data loaded:', userData);
//                 router.push('/(tabs)');
//             } else {
//                 console.log('No user data found, user might need to complete profile');
//                 setUser(null);
//             }
//         } else {
//             // No session, clear user data
//             console.log('No session, clearing user data');
//             setSession(null);
//             setUser(null);
//         }
//     }

//     const logOut = async () => {
//         console.log('Logging out...');
//         await supabase.auth.signOut();
//         setUser(null); // Clear user state
//         setSession(null); // Clear session state
//         router.push('/(auth)');
//     }

//     React.useEffect(() => {
//         console.log('AuthProvider: Setting up auth listeners');
        
//         // Get initial session
//         supabase.auth.getSession().then(({ data: { session } }) => {
//             console.log('Initial session:', session?.user?.id);
//             getUser(session);
//         });

//         // Listen for auth state changes
//         const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//             console.log('Auth state changed:', _event, session?.user?.id);
//             getUser(session);
//         });

//         return () => {
//             console.log('AuthProvider: Cleaning up auth listeners');
//             subscription.unsubscribe();
//         };
//     }, []);

//     // Debug logging
//     React.useEffect(() => {
//         console.log('=== AUTH STATE DEBUG ===');
//         console.log('User:', user);
//         console.log('Session:', session?.user?.id);
//         console.log('========================');
//     }, [user, session]);

//     return (
//         <AuthContext.Provider value={{ user, setUser, logOut, createUser, session }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }