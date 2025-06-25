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

export const usePosts = (id: string) => {
    const {data, isLoading, error, refetch} = useQuery ({
        queryKey: ["thread"],
        queryFn: () => getThread(id),
    })

    return {data, isLoading, error, refetch};
}