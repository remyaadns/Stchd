import React, { useState } from 'react';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Images, Camera, ImagePlay, Mic, Hash, MapPin } from 'lucide-react-native';
import { useAuth } from '@/providers/AuthProvider';
import { Input, InputField } from '@/components/ui/input';
import { Divider } from '@/components/ui/divider';
import { Post } from '@/lib/types';
import { Pressable, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { usePost } from '@/providers/PostProvider';

interface PostCardProps {
    post: Post;
}

export default ({ post }: PostCardProps) => {
    const { user } = useAuth();
    // const [photo, setPhoto] = React.useState('');
    const { uploadFile, updatePost, photo, setPhoto } = usePost();
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


    const addPhoto = async () => {
        setPhoto('');
        let result = await ImagePicker.launchImageLibraryAsync({
            // mediaTypes: ImagePicker.MediaTypeOptions.Images,
            //   mediaTypes: ImagePicker.MediaType.Images,
            //  mediaTypes: ['images', 'videos'],
             mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
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
                            <Input size="md" className='border-0'>
                                <InputField
                                    placeholder="What's New?"
                                    className='px-0'
                                    value={post.text}
                                    onChangeText={(text) => updatePost(post.id, 'text', text)}
                                // multiline
                                />
                            </Input>
                            {photo && <Image source={{ uri: photo }} style={{ width: 100, height: 100, borderRadius: 10 }} />}
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
                            <Mic size={24} color="gray" strokeWidth={1.5} />
                            <Hash size={24} color="gray" strokeWidth={1.5} />
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
