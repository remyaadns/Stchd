// import React from 'react';
// import { HStack } from '@/components/ui/hstack';
// import { Card } from '@/components/ui/card';
// import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge } from '@/components/ui/avatar';
// import { Text } from '@/components/ui/text';
// import { VStack } from '@/components/ui/vstack';
// import { Divider } from '@/components/ui/divider';
// import { Plus, Heart, MessageCircle, Repeat, Send } from 'lucide-react-native';
// import { formatDistanceToNow } from 'date-fns';
// import { Post } from '@/lib/types';
// import { Pressable, Image, SafeAreaView, ScrollView, View } from 'react-native';
// import { router } from 'expo-router';
// import Audio from '@/screens/post/audio';
// import { renderText } from '@/screens/post/input';
// import { supabase } from '@/lib/supabase';
// import { useAuth } from '@/providers/AuthProvider';
// import * as Crypto from "expo-crypto";




// export default ({ item, refetch }: { item: Post, refetch: () => void }) => {
//     const { user } = useAuth();
//     const imageUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item?.user_id}/${item?.file}`
//     // const imageUrl = `https://bktikzewfnedxdcyhslv.supabase.co/storage/v1/object/public/files/${item.user_id}/${item.file}`
//     // console.log('Hardcoded Image URL:', imageUrl);
//     // console.log('item.file:', item.file);
//     // console.log('item.user_id:', item.user_id);
//     // console.log('Full Image URL:', imageUrl);


//     //   console.log('item.text:', item.text);
//     // console.log('Full item:', item);

//     const fileType = item.file?.split('.').pop();
//     const regex = /([#@]\w+)|([^#@]+)/g;
//     const textArray = item?.text?.match(regex) || [];
//     const isLiked = item?.Like?.some((like: { user_id: string }) => like.user_id === user?.id);

//     const addLike = async () => {
//         const { error } = await supabase.from('Like').insert({
//             user_id: user?.id,
//             post_id: item.id
//         });
//         // console.log(data, error);
//         if (!error) refetch();
//     }

//     const removeLike = async () => {
//         const { error } = await supabase.from('Like').delete().eq('user_id', user?.id).eq('post_id', item.id);
//         if (!error) refetch();
//     }

//     const addRepost = async () => {
//         const newPost = {
//             id: Crypto.randomUUID(),
//             user_id: user?.id,
//             parent_id: item.id,
//             text: item.text,
//             file: item.file,
//             place_id: item.place_id,
//             tag_name: item.tag_name,
//             repost_user_id: user?.id
//         }
//         console.log(newPost);
//         //     const { data, error } = await supabase.from('Post').insert(newPost);
//         // });
//         //     if (!error) refetch();
//     }

//     return (
//         <SafeAreaView className='bg-white'>
//             <ScrollView>
//                 <Pressable onPress={() => router.push({
//                     pathname: `/thread`,
//                     //  pathname: `/`,
//                     params: { id: item.id }
//                 })}>

//                     <Card>
//                         {/* <HStack className='items-center p-5' space='md'> */}
//                         <HStack className="items-start px-5" space='sm' >
//                             <Avatar size="sm" className='mt-6'  >
//                                 <AvatarBadge>
//                                     <Plus size={3} color='white' />
//                                 </AvatarBadge>
//                                 <AvatarFallbackText>{item?.User?.username}</AvatarFallbackText>
//                                 <AvatarImage
//                                     source={{
//                                         uri: item?.User?.avatar,
//                                     }}
//                                     className="w-12 h-12 rounded-full"
//                                 />
//                             </Avatar>
//                             {item?.parent_id && <Divider orientation='vertical' className='absolute' style={{ height: 85, bottom: -50 }} />}
//                             <VStack className='flex-1' space='sm'>
//                                 {/* Header with username and timestamp */}
//                                 <VStack >
//                                     {item?.repost_user_id && <HStack className='items-center' space='md'>
//                                         <Repeat size={14} color='black' strokeWidth={2} />
//                                          <Text size="sm" className='mx-2'>Reposted By</Text>
//                                         <Pressable onPress={() => router.push({
//                                             pathname: `/profile`,
//                                             params: { id: item?.repost_user_id }
//                                         })}>
//                                             <Text size="sm" bold>{item?.repost_user?.username}</Text>
//                                         </Pressable>
//                                     </HStack>}
//                                     <HStack className='items-center' space='md'>
//                                         {/* <Text size='md'  className='text-gray-500 text-xs mx-5'>{formatDistance(new Date(item.created_at), new Date().getTimezoneOffset(), {addSuffix: true})}</Text> */}
//                                         <Text size='lg' bold>{item?.User?.username}</Text>
//                                         <Text size='xs' className='text-gray-500 '>
//                                             {item?.created_at && formatDistanceToNow((new Date(item?.created_at).getTime() - new Date().getTimezoneOffset() * 60000),
//                                                 { addSuffix: true }
//                                             )}
//                                         </Text>
//                                     </HStack>
//                                     {/* </HStack> */}
//                                     <VStack >
//                                         {item?.Place?.name && <Text size="xs" bold >{item?.Place?.name}</Text>}
//                                     </VStack>
//                                 </VStack>
//                                 {/* Post content */}
//                                 <Text size='md' className='leading-6' >
//                                     {/* {item.text} */}
//                                     {renderText(textArray)}
//                                 </Text>
//                                 <View>
//                                     <View>
//                                         {/* </View> */}
//                                         {/* {fileType === 'm4a' ? 
//                         <Audio id={item.id} /> 
//                         : <Image source={{ uri: `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item.user_id}/${item.file}` }}
//                           style={{ width: 100, height: 100, borderRadius: 10 }} /> } */}

//                                         {/* Test */}
//                                         {item?.file && (
//                                             <Image
//                                                 source={{ uri: `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item.user_id}/${item.file}` }}
//                                                 // style={{ width: 100, height: 100, borderRadius: 10 }}
//                                                 //  className="w-2/3 h-40 rounded-lg mt-2"
//                                                 className="w-full aspect-square rounded-lg"
//                                                 style={{ width: 350, height: 350 }}
//                                             />
//                                         )}
//                                         {/* <Text size='md'  >{item.text}</Text>
//                         {item?.file && <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, borderRadius: 10 }} />} */}

//                                         {/* {item?.file && fileType === 'm4a' && <Audio id={item.id} />}
//                                 {item?.file && fileType !== 'm4a' && <Image source={{uri: imageUrl}} style={{ width: 100, height: 100, borderRadius: 10 }} />} */}
//                                         {/* {item?.file && fileType === 'm4a' && <Audio id={item.id} />}
//                                 {item?.file && fileType && fileType !== 'm4a' && <Image source={{uri: imageUrl}} style={{ width: 100, height: 100, borderRadius: 10 }} />} */}

//                                         {/* 
//                                                                  {item?.file && fileType === 'm4a' && <Audio id={item.id} uri={item?.file} />}
//                                 {item?.file && fileType !== 'm4a' && <Image source={{uri: imageUrl}} style={{ width: 100, height: 100, borderRadius: 10 }} />} */}
//                                     </View>
//                                     <HStack className='items-center mt-2' space='lg'>
//                                         <Pressable onPress={isLiked ? removeLike : addLike}>
//                                             <Heart size={20} color={isLiked ? 'red' : 'gray'} strokeWidth={1.5} fill={isLiked ? 'red' : 'transparent'} />
//                                         </Pressable>
//                                         <Pressable onPress={() => router.push({
//                                             pathname: '/thread',
//                                             params: { id: item.id }
//                                         })}>
//                                             <MessageCircle size={20} color='gray' strokeWidth={1.5} />
//                                         </Pressable>
//                                         <Pressable onPress={addRepost}>
//                                             <Repeat size={20} color='gray' strokeWidth={1.5} />
//                                         </Pressable>
//                                         <Pressable onPress={() => { }}>
//                                             <Send size={20} color='gray' strokeWidth={1.5} />
//                                         </Pressable>
//                                     </HStack>
//                                 </View>
//                             </VStack>
//                         </HStack>
//                         {/* <Divider className='w-full' style={{ marginTop: 20 }} /> */}
//                         <Divider className='w-full mt-5' />
//                     </Card>
//                 </Pressable>
//             </ScrollView>
//         </SafeAreaView>
//     )
// } 



//////////////////////////////////////////////
///with assistant from claude

import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import { Plus, Heart, MessageCircle, Repeat, Send } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '@/lib/types';
import { Pressable, Image, SafeAreaView, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import Audio from '@/screens/post/audio';
import { renderText } from '@/screens/post/input';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import * as Crypto from "expo-crypto";

export default ({ item, refetch }: { item: Post, refetch: () => void }) => {
    const { user } = useAuth();
    const imageUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item?.user_id}/${item?.file}`
    const avatarUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item.user_id}/avatar.jpeg`;

    const fileType = item.file?.split('.').pop();
    const regex = /([#@]\w+)|([^#@]+)/g;
    const textArray = item?.text?.match(regex) || [];
     const isLiked = item?.Like?.some((like: { user_id: string }) => like.user_id === user?.id);
    // console.log(item);

    const addLike = async () => {
        const { error } = await supabase.from('Like').insert({
            user_id: user?.id,
            post_id: item.id
        });
        if (!error) refetch();
    }

    const removeLike = async () => {
        const { error } = await supabase.from('Like').delete().eq('user_id', user?.id).eq('post_id', item.id);
        if (!error) refetch();
    }

    const addRepost = async () => {
        const newPost = {
            id: Crypto.randomUUID(),
            // user_id: user?.id,
             user_id: item?.user_id,
            text: item.text,
            file: item.file,
            place_id: item.place_id,
            tag_name: item.tag_name,
            repost_user_id: user?.id
        }
        console.log(newPost);
        // Fixed: Uncommented the database insertion
        const { data, error } = await supabase.from('Post').insert(newPost);
        if (!error) refetch();
    }

    return (
        <SafeAreaView className='bg-white'>
            <ScrollView>
                {/* <Pressable onPress={() => router.push({
                    pathname: `/thread`,
                    params: { id: item.id }
                })}> */}
                    <Card>
                        <HStack className="items-start px-5" space='sm' >
                            <Avatar size="sm" className='mt-6'  >
                                <AvatarBadge>
                                    <Plus size={3} color='white' />
                                </AvatarBadge>
                                {/* Fixed: Changed from item?.User to item?.user */}
                                <AvatarFallbackText>{item?.user?.username}</AvatarFallbackText>
                                <AvatarImage
                                    source={{
                                        uri: avatarUrl,
                                    }}
                                    className="w-12 h-12 rounded-full"
                                />
                            </Avatar>
                            {item?.parent_id && <Divider orientation='vertical' className='absolute' style={{ height: 85, bottom: -50 }} />}
                            <VStack className='flex-1' space='sm'>
                                <VStack >
                                    {/* Fixed: Changed condition from item?.repost_user_id to item?.repost_user */}
                                    {item?.repost_user && <HStack className='items-center'>
                                        <Repeat size={14} color='black' strokeWidth={2} />
                                          <Text size="sm" className='mx-2'>Reposted By</Text>
                                        <Pressable onPress={() => router.push({
                                            pathname: `/user`,
                                            params: {  userId: item?.repost_user_id }
                                        })}>
                                            <Text size="sm" bold>{item?.repost_user?.username}</Text>
                                        </Pressable>
                                    </HStack>}
                                <Pressable onPress={() => router.push({
                                    pathname: `/user`,
                                    params: { userId: item?.user_id }
                                })}> 
                                    <HStack className='items-center' space='md'>
                                        {/* Fixed: Changed from item?.User to item?.user, something is wrong it should be User not user */}
                                        <Text size='lg' bold>{item?.User?.username}</Text> 
                                        <Text size='xs' className='text-gray-500 '>
                                            {item?.created_at && formatDistanceToNow((new Date(item?.created_at).getTime() - new Date().getTimezoneOffset() * 60000),
                                                { addSuffix: true }
                                            )}
                                        </Text>
                                    </HStack>
                                    </Pressable>
                                    <VStack >
                                        {/* Fixed: Changed from item?.Place to item?.place */}
                                        {item?.Place?.name && <Text size="xs" bold >{item?.Place?.name}</Text>}
                                    </VStack>
                                </VStack>
                                
                                <Text size='md' className='leading-6' >
                                    {renderText(textArray)}
                                </Text>
                                
                                <View>
                                    <View>
                                        {item?.file && (
                                            <Image
                                                source={{ uri: `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item.user_id}/${item.file}` }}
                                                className="w-full aspect-square rounded-lg"
                                                style={{ width: 350, height: 350 }}
                                            />
                                        )}
                                    </View>
                                    <HStack className='items-center mt-2' space='lg'>
                                        <Pressable onPress={isLiked ? removeLike : addLike}>
                                            <Heart size={20} color={isLiked ? 'red' : 'gray'} strokeWidth={1.5} fill={isLiked ? 'red' : 'transparent'} />
                                        </Pressable>
                                        <Pressable onPress={() => router.push({
                                            pathname: '/thread',
                                            params: { id: item.id }
                                        })}>
                                            <MessageCircle size={20} color='gray' strokeWidth={1.5} />
                                        </Pressable>
                                        <Pressable onPress={addRepost}>
                                            <Repeat size={20} color='gray' strokeWidth={1.5} />
                                        </Pressable>
                                        <Pressable onPress={() => { }}>
                                            <Send size={20} color='gray' strokeWidth={1.5} />
                                        </Pressable>
                                    </HStack>
                                </View>
                            </VStack>
                        </HStack>
                        <Divider className='w-full mt-5' />
                    </Card>
                {/* </Pressable> */}
            </ScrollView>
        </SafeAreaView>
    )
}