import {useQuery} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const getUser = async (userId: string) => {
    if (!userId) return null;
    const {data, error} = await supabase
    .from('User')
    .select()
    .eq('id', userId)

    
    if (error) {
        console.error('Supabase error:', error);
        throw error; 
    }
    
    return data[0];
}

export const useUser = (userId: string) => {
    const {data, isLoading, error, refetch} = useQuery ({
        queryKey: ["user", userId],
        queryFn: () => getUser(userId),
    })

    return {data, isLoading, error, refetch};
}