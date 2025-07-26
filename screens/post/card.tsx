import React, { useState } from 'react';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Images, Camera, ImagePlay, Mic, Hash, MapPin, AtSign } from 'lucide-react-native';
import { useAuth } from '@/providers/AuthProvider';
import { Divider } from '@/components/ui/divider';
import { Post } from '@/lib/types';
import { Pressable, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';
import { router, useLocalSearchParams } from 'expo-router';
import { usePost } from '@/providers/PostProvider';
// import thread from '@/app/thread';
import Audio from './audio'
import Input from './input';
import UserModal from '@/components/shared/user-modal';

interface PostCardProps {
    post: Post;
}

export default ({ post }: PostCardProps) => {
    const { threadId } = useLocalSearchParams();
    const { user } = useAuth();
    //const { user: authUser } = useAuth();
    // const [photo, setPhoto] = React.useState('');
    const { uploadFile, updatePost, photo, setPhoto, placeName } = usePost();
    const [ showAudio, setShowAudio ] = React.useState(false);
    const regex = /([#@]\w+)|([^#@]+)/g;
    const textArray = post?.text?.match(regex) || [];
    // const [ contentHeight, setContentHeight ] = React.useState(0);


        //     React.useEffect(() => {
            
        //     let index = textArray?.findIndex(text => text.startsWith('#'));
        //     if (index !== -1 && index !== textArray?.length - 1) {
        //         createTag(textArray[index]);
        //         // setTag(textArray[index]); 
        //     }
        //     //let index = textArray?.findIndex((text) => text.startsWith('#') || text.startsWith('@'));
        // }, [textArray]);
         React.useEffect(() => {
            const timeout = setTimeout(() => {
            const hashtags = textArray?.filter(text => text.startsWith('#')) || [];
            hashtags.forEach(createTag);
            }, 3000); // debounce for 300ms

            return () => clearTimeout(timeout);
        }, [textArray]);


        
        const createTag = async (text: string) => {
            const { data, error } = await supabase.from('Tag').upsert({
                name: text,
                updated_at: new Date(),
            }).select();
           if (!error) updatePost(post.id, 'tag_name', data?.[0]?.name);
            // console.log(data, error);
            // if (error) return console.error(error);
            // return data[0];
        }

    //   const [thread, setThread] =React.useState();
    //   const [text, setText] = React.useState();
    // const [mainText, setMainText] = useState('');
    const [threadText, setThreadText] = useState('');
    const [showThreadInput, setShowThreadInput] = useState(false);

    const handleThreadAdd = () => {
        setShowThreadInput(true);
    }

    // Moved to the PostProvider can delete 6/19/25
    // const uploadFile = async (uri: string, type: string, name: string) => {
    //     let newFormData = new FormData();
    //     newFormData.append('file', {
    //         uri,
    //         name,
    //         type,
    //     });
    //     //    console.log(newFormData);

    //     const { data, error } = await supabase
    //         .storage
    //         .from(`files/${user?.id}`)
    //         .upload(name, newFormData);
    //     console.log(data, error);
    // //         console.log('Upload response data:', data);
    // // console.log('Upload response error:', error);
    // // console.log('data.path would be:', data?.path);
    //     if (data) updatePost(post.id, 'file', data.path);
    // //       if (data) updatePost(post.id, 'file', data.fullPath);
    // }

        // React.useEffect(() => {
            
        //     let index = textArray?.findIndex(text => text.startsWith('#'));
        //     if (index !== -1 && index !== textArray?.length - 1) {
        //         createTag(textArray[index]);
        //         // setTag(textArray[index]);
        //     }
        //     //let index = textArray?.findIndex((text) => text.startsWith('#') || text.startsWith('@'));
        // }, [textArray]);



        // remove these 2 its above 
//         React.useEffect(() => {
//     // Only process tags when the user stops typing (debounce)
//     const timeoutId = setTimeout(() => {
//         let index = textArray?.findIndex(text => text.startsWith('#'));
//         if (index !== -1 && index !== textArray?.length - 1) {
//             createTag(textArray[index]);
//         }
//     }, 500); // Wait 500ms after user stops typing

//     return () => clearTimeout(timeoutId);
// }, [textArray]);

        // const createTag = async (text: string) => {
        //     const { data, error } = await supabase.from('Tag').upsert({
        //         name: text,
        //         updated_at: new Date(),
        //     }).select();
        //    if (!error) updatePost(post.id, 'tag_name', data?.[0]?.name);
        //     // console.log(data, error);
        //     // if (error) return console.error(error);
        //     // return data[0];
        // }

    
        React.useEffect(() => {
            if (!threadId) return;
            updatePost(post.id, 'parent_id', threadId as string);
        }, [threadId]);
    


    const addPhoto = async () => {
        setPhoto('');
        let result = await ImagePicker.launchImageLibraryAsync({
            // mediaTypes: ImagePicker.MediaTypeOptions.Images,
            //   mediaTypes: ImagePicker.MediaType.Images,
            //  mediaTypes: ['images', 'videos'],
             mediaTypes: ['images'],
            allowsEditing: true,
            // aspect: [4, 3],
            // quality: 0.1,
            // aspect: [16, 9],
            quality: 1,
        });
        if(!result.assets?.[0]?.uri) return;

        let uri = result.assets?.[0]?.uri;
        let type = result.assets?.[0]?.mimeType;
        let name = uri?.split('/').pop();
        setPhoto(uri);
        uploadFile(post.id, uri, type, name);
    };

    return (
        <HStack className="items-start px-5">
            <VStack space='sm' className='items-center'>
                <Avatar size="md" className='mt-6'>
                    <AvatarFallbackText>{user?.username}</AvatarFallbackText>
                    <AvatarImage
                        source={{ uri: user?.avatar }}
                        className="w-12 h-12 rounded-full"
                    />
                </Avatar>
                {/* Connecting line */}
                <Divider orientation='vertical' className={`${showThreadInput ? 'h-20' : 'h-8'} w-0.5 bg-gray-300`} />
            </VStack>

            <VStack space="md" className="flex-1">
                <Card size="md" className="mx-3 bg-transparent">
                    <VStack className='p-3' space='lg'>
                        <VStack>
                            <Heading size="md" className="mb-1 text-black">
                                {user?.username || "No username"}
                            </Heading>
                            {placeName && <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{placeName} </Text>}
                            {/* moved to Post input
                            <Input size="md" className='border-0'>
                                <InputField
                                    placeholder="What's New?"
                                    className='px-0'
                                    value={post.text}
                                    onChangeText={(text) => updatePost(post.id, 'text', text)}
                                    multiline
                                />
                            </Input> */}
                            {/* <Input post={post} updatePost={updatePost} textArray={textArray} setContentHeight={setContentHeight} /> */}
                            <Input post={post} updatePost={updatePost} textArray={textArray} />
                            {photo && <Image source={{ uri: photo }} style={{ width: 100, height: 100, borderRadius: 10 }} />}
                            {showAudio && <Audio id={post.id}/> }
                        </VStack>
                        <HStack className="items-center" space="3xl">
                            <Pressable onPress={addPhoto}>
                                <Images size={24} color="gray" strokeWidth={1.5} />
                            </Pressable>
                            {/* <Pressable onPress={() => router.push('/camera')}> */}
                             <Pressable onPress={() => {
                                setPhoto('');
                                router.push({
                                pathname:'/camera',
                                params: { threadId: post.id },
                                })
                            }}>
                            <Camera size={24} color="gray" strokeWidth={1.5} /> 
                            </Pressable>
                             <Pressable onPress={() => router.push({ pathname: '/gif', params: { threadId: post.id }})}>
                            <ImagePlay size={24} color="gray" strokeWidth={1.5} />
                             </Pressable>
                             <Pressable onPress={() => setShowAudio(!showAudio)} >
                            <Mic size={24} color="gray" strokeWidth={1.5} />
                            </Pressable>
                            <UserModal post={post} updatePost={updatePost}/>
                            {/* <Pressable onPress={() => setShowActionsheet(true)}>
                            <AtSign size={24} color="gray" strokeWidth={1.5} />
                            </Pressable> */}
                             <Pressable onPress={() => router.push({ pathname: '/places', params: { threadId: post.id }})}>
                            <MapPin size={24} color="gray" strokeWidth={1.5} />
                             </Pressable>
                        </HStack>
                    </VStack>
                </Card>
            </VStack>
        </HStack>

    );
}
