import {useQuery} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface Filter {
    key: string;
    value: string | null;
    type: 'eq' | 'neq' | 'is';
}

interface PostsProps {
    filters: Filter[];
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

// testing for display of reposted posts, likes, useername etc, THIS WORKS REPLACEMENT FOR ABOVE
// export const getPosts = async ({ key, value, type }: PostsProps) => {
//     const {data, error} = await supabase
//     .from('Post')
//     // .select('*, Place!place_id(name), Like!post_id(user_id), repost_user:User!repost_user_id(*), User!user_id(*)')
//      .select(`*, 
//          User!user_id(*),
//         Place!place_id(name), 
//         Like!post_id(user_id),
//         repost_user:User!repost_user_id(*), 
//         Post(*, User:User!user_id(*)),
//         Parent!parent_id(*, User!user_id(*))
//         `)l
//     // .is('parent_id', null)
//     .filter(key, type, value)
//     .order('created_at', {ascending: false})
    
//     if (error) {
//         console.error('Supabase error:', error);
//         throw error; // This will help you see what's wrong
//     }
    
//     return data;
// }

export const getPosts = async ({ filters }: PostsProps) => {
    let query = supabase
    .from('Post')
    // .select('*, Place!place_id(name), Like!post_id(user_id), repost_user:User!repost_user_id(*), User!user_id(*)')
    //  .select(`*, 
    //     User!user_id(*),
    //     Place!place_id(name), 
    //     Like!post_id(user_id),
    //     repost_user:User!repost_user_id(*), 
    //     Post(*, User:User!user_id(*)),
    //     Parent!parent_id(*, User!user_id(*))
    //     `);
    //this one works
    // .select(`
    //     *, 
    //     User: user_id(*),
    //     Place: Place(name), 
    //     likes: Like(user_id),
    //     repost_user: repost_user_id(*), 
    //     posts: Post(*, user: user_id(*)),
    //     parent: parent_id(*, User: user_id(*))
    //     `);
        .select(`
        *, 
        user: user_id(*),
        place: Place(name), 
        likes: Like(user_id),
        repost_user: repost_user_id(*), 
        posts: Post(*, user: user_id(*)),
        parent: parent_id(*, user: user_id(*))

        `);
                // parent: parent_id(*, user: User!user_id(*))
    // .is('parent_id', null)
    filters.forEach((filter) => {
        query = query.filter(filter.key, filter.type, filter.value);
         });

    const {data, error } = await query.order('created_at', {ascending: false});
    
    if (!error) return data;;
        throw error;
    
};

// export const usePosts = ({ key, value, type }: PostsProps) => {
//     const {data, isLoading, error, refetch} = useQuery ({
//         queryKey: ["posts", key, value, type],
//         queryFn: () => getPosts({ key, value, type }),
//     })

//     return {data, isLoading, error, refetch};
// }

export const usePosts = ({ filters }: PostsProps) => {
    const {data, isLoading, error, refetch} = useQuery ({
        queryKey: ["posts", JSON.stringify(filters)],
        queryFn: () => getPosts({ filters }),
    })

    return {data, isLoading, error, refetch};
}