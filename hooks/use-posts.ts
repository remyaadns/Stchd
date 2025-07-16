import {useQuery} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// this works
// export const getPosts = async () => {
//     const {data, error} = await supabase
//     .from('Post')
//     .select('*, Place(name), Like(user_id), repost_user:User!repost_user_id(*), user:User!user_id(*)')
//     .is('parent_id', null)
//     .order('created_at', {ascending: false})
//     if(!error) return data;
// }

// testing for display of reposted posts, likes, useername etc
export const getPosts = async () => {
    const {data, error} = await supabase
    .from('Post')
    .select('*, Place!place_id(name), Like!post_id(user_id), repost_user:User!repost_user_id(*), User!user_id(*)')
    .is('parent_id', null)
    .order('created_at', {ascending: false})
    
    if (error) {
        console.error('Supabase error:', error);
        throw error; // This will help you see what's wrong
    }
    
    return data;
}

export const usePosts = () => {
    const {data, isLoading, error, refetch} = useQuery ({
        queryKey: ["posts"],
        queryFn: () => getPosts(),
    })

    return {data, isLoading, error, refetch};
}