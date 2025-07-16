import React from "react";
import { useState } from "react";
import { Post } from "@/lib/types";
import * as Crypto from "expo-crypto";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";


export const PostContext = React.createContext({
posts: [] as Post [],    
uploadPosts: () => { },
addThread: () => { },
updatePost: (id: string, key: string, value: string | null ) => { },
clearPosts: () => {},
uploadFile: (id: string , uri: string, type: string, name: string) => { },
setPhoto: (uri: string) => { },
photo:'',
placeName: '',
setPlaceName: (name: string) => { },
});

export const usePost = () => React.useContext(PostContext);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
    const {user} = useAuth();

      const DefaultPost: Post = {
        id: Crypto.randomUUID(),
        user_id: user.id, 
        //  user_id: null,
        // user_id: null, use this if bottom doesn't work
        parent_id: null,
        // parent_id: threadId as string ?? null,
        text: '',
        file: null,
        place_id: null,
      }
    
    //   const [thread, setThread] =React.useState();
      // const [text, setText] = React.useState();
      const [posts, setPosts] = React.useState<Post[]>([DefaultPost]);
      const [photo, setPhoto] = React.useState('');
      // const [mainText, setMainText] = useState('');
      const [threadText, setThreadText] = useState('');
    //   const [showThreadInput, setShowThreadInput] = useState(false);
    
    // React.useEffect(() => {
    //   setPosts([DefaultPost]);
    // }, [])

     React.useEffect(() => {
      if (user) updatePost(posts[0].id, 'user_id', user.id);
    }, [user]);

        const uploadFile = async (id: string , uri: string, type: string, name: string) => {
            let newFormData = new FormData();
            newFormData.append('file', {
                uri,
                name,
                type,
            });
            // console.log(uri)
            //    console.log(newFormData);
    
            const { data, error } = await supabase
                .storage
                .from(`files/${user?.id}`)
                .upload(name, newFormData);
            // console.log(data, error);
        //         console.log('Upload response data:', data);
        // console.log('Upload response error:', error);
        // console.log('data.path would be:', data?.path);
            if (data) updatePost(id, 'file', data.path);
        //       if (data) updatePost(post.id, 'file', data.fullPath);
        }
    
    
    const addThread = () => {
         setPosts([...posts,{...DefaultPost, parent_id: posts[0].id }]);
    }

      const uploadPosts = async () => {
        const {data, error} = await supabase
        .from('Post')
        .insert(posts);
             if(!error) {
                clearPosts();
                router.back();
             }
             if (error) console.error(error);
      }
      
    
    //   const handleThreadAdd = () => {
    //     setShowThreadInput(true);
    //   }
    
      //    const updatePost = (id: string, key: string, value: string ) => {
      //   setPosts(posts.map((p: Post) => p.id === id ? { ...p, [key]: value } : p));
      //  }

        const updatePost = (id: string, key: string, value: string ) => {
        setPosts(posts.map((p: Post) =>{
          if (p.id === id) return { ...p, [key]: value, user_id: user?.id } ;
          return {...p, user_id: user?.id };
        }));
       }
    
       const clearPosts = () => {
        setPhoto('');
        setPlaceName('');
        setPosts([DefaultPost]);
       }

    return (
        <PostContext.Provider value={{
            posts, 
            uploadPosts, 
            addThread, 
            updatePost, 
            clearPosts, 
            uploadFile,
             setPhoto, 
             photo,
            // placeName,

        }}>
            {children}
        </PostContext.Provider>
    )
}
function setPlaceName(arg0: string) {
  throw new Error("Function not implemented.");
}

