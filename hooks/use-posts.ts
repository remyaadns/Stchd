import {useQuery} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface PostsProps {
    key: string;
    value: string | null;
    type: 'eq' | 'is';
}

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
export const getPosts = async ({ key, value, type }: PostsProps) => {
    const {data, error} = await supabase
    .from('Post')
    // .select('*, Place!place_id(name), Like!post_id(user_id), repost_user:User!repost_user_id(*), User!user_id(*)')
     .select(`*, 
         User!user_id(*),
        Place!place_id(name), 
        Like!post_id(user_id),
        repost_user:User!repost_user_id(*), 
        Post(*, User:User!user_id(*))`)
    // .is('parent_id', null)
    .filter(key, type, value)
    .order('created_at', {ascending: false})
    
    if (error) {
        console.error('Supabase error:', error);
        throw error; // This will help you see what's wrong
    }
    
    return data;
}

export const usePosts = ({ key, value, type }: PostsProps) => {
    const {data, isLoading, error, refetch} = useQuery ({
        queryKey: ["posts", key, value, type],
        queryFn: () => getPosts({ key, value, type }),
    })

    return {data, isLoading, error, refetch};
}