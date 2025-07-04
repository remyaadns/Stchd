import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const getThread = async (id: string) => {
    const {data, error} = await supabase
    .from('Post')
    .select('*, User(*), Place(name), Post(*, User(*)')
    .eq('id', id)
    .order('created_at', {ascending: false});
    if(!error) return data;
}

// original file, trying to use the query key to get the thread by id under this code
// export const useThread = (id: string) => {
//     const {data, isLoading, error, refetch} = useQuery ({
//         queryKey: ["thread"],
//         queryFn: () => getThread(id),
//     })

//     return {data, isLoading, error, refetch};
// }

export const useThread = (id: string) => {
    const {data, isLoading, error, refetch} = useQuery ({
        queryKey: ["thread", id], // Include id in query key
        queryFn: () => getThread(id),
        enabled: !!id, // Only run query if id exists
    })

    return {data: data || [], isLoading, error, refetch}; // Default to empty array
}