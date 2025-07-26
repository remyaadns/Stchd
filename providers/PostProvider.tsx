import React from "react";
import { useState } from "react";
import { Post } from "@/lib/types";
import * as Crypto from "expo-crypto";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import post from "@/screens/post";


export const PostContext = React.createContext({
posts: [] as Post [],    
uploadPosts: () => { },
addThread: () => { },
// updatePost: (id: string, key: string, value: string | null ) => { },
updatePost: (id: string, updates: { key: string, value: string | null }[]) => { },
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
        mention_user_id: null,
      }
    
    //   const [thread, setThread] =React.useState();
      // const [text, setText] = React.useState();
      const [posts, setPosts] = React.useState<Post[]>([DefaultPost]);
      const [photo, setPhoto] = React.useState('');
      const [placeName, setPlaceName] = React.useState('');
      // const [mainText, setMainText] = useState('');
      const [threadText, setThreadText] = useState('');
    //   const [showThreadInput, setShowThreadInput] = useState(false);
    
    // React.useEffect(() => {
    //   setPosts([DefaultPost]);
    // }, [])
    // old code with older props
    //  React.useEffect(() => {
    //   if (user) updatePost(posts[0].id, 'user_id', user.id);
    // }, [user]);

  React.useEffect(() => {
    if (user) updatePost(posts[0].id, [{ key: 'user_id', value: user.id }]);
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
                .upload(name, newFormData, {
                  upsert: true,
                });
            // console.log(data, error);
        //         console.log('Upload response data:', data);
        // console.log('Upload response error:', error);
        // console.log('data.path would be:', data?.path);
            // if (data) updatePost(id, 'file', data.path); bring this back if you want to use path
            return data?.path;
        //       if (data) updatePost(post.id, 'file', data.fullPath);
        }
    
    
    const addThread = () => {
         setPosts([...posts,{...DefaultPost, parent_id: posts[0].id }]);
    }

    const checkForTags = (text: string) => {
        const regex = /#\w+(?=\s|$)/g;
        const tags = text.match(regex) || [];
        return tags.map(tag => tag.slice(1));
    }
    const createTag =async (postId: string, text: string) => {
      const { error } = await supabase.from('Tag').upsert({
        name: text,
        updated_at: new Date(),
      }).select()
      if (!error) {
        await supabase.from('Post').update({
          tag_name: text,
        }).eq('id', postId);
      }
    }

      const uploadPosts = async () => {
        posts.map(p => {
          checkForTags(p.text).forEach(tag => createTag(p.id, `#${tag.toUpperCase()}`));
        });
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

        // const updatePost = (id: string, key: string, value: string ) => {
      //    const updatePost = (id: string, updates: { key: string, value: string }[]) => {
      //   setPosts(posts.map((p: Post) => {
      //     if (p.id === id) {
      //      const updatedPost = { ...p, user_id: user?.id || ''};
      //      updates.forEach (({ key, value }) => {
      //       updatedPost[key] = value;
      //   });
      //       return updatedPost;
      //       }
      //     return p;
      //   }));
      //  };

      // this works with the new format apparently appose to the top one
const updatePost = (id: string, keyOrUpdates: string | { key: string, value: string | null }[], value?: string | null) => {
    setPosts(posts.map((p: Post) => {
        if (p.id === id) {
            const updatedPost = { ...p, user_id: user?.id || '' };

            // Check if second parameter is an array (new format) or string (old format)
            if (Array.isArray(keyOrUpdates)) {
                // Handle array of updates - new format
                keyOrUpdates.forEach(({ key, value }) => {
                    updatedPost[key] = value;
                });
            } else {
                // Handle single key-value update - old format
                updatedPost[keyOrUpdates] = value;
            }
            
            return updatedPost;
        }
        return p;
    }));
};
    
       const clearPosts = () => {
        setPhoto('');
        setPlaceName('');
        // setPosts([DefaultPost]);
        setPosts([{...DefaultPost, user_id: user?.id || ''}]);
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
            placeName,

        }}>
            {children}
        </PostContext.Provider>
    )
}


