import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import { Plus, Heart, MessageCircle, Repeat, Send, MoreHorizontal } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';
// import { format } from 'date-fns';
// import { format, differenceInHours, differenceInDays, differenceInMinutes } from 'date-fns';
// import {
//   format,
//   differenceInMinutes,
//   differenceInHours,
//   differenceInDays,
//   differenceInSeconds,
// } from 'date-fns';
import { Post } from '@/lib/types';
import { Pressable, Image, View, Dimensions } from 'react-native';
import { router } from 'expo-router';
import Audio from '@/screens/post/audio';
import { renderText } from '@/screens/post/input';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import * as Crypto from "expo-crypto";
import { useFollowing } from '@/hooks/use-following';

interface PostViewProps {
    item: Post | null;
    refetch: () => void;
    showDivider?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

export default ({ item, refetch, showDivider = false }: PostViewProps ) => {
    if (!item) return null; 

    const { user } = useAuth();
    const imageUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item?.user_id}/${item?.file}`
    const avatarUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item.user_id}/avatar.jpeg`;

    const fileType = item.file?.split('.').pop();
    const regex = /([#@]\w+)|([^#@]+)/g;
    const textArray = item?.text?.match(regex) || [];
    
    // Updated to handle the new data structure from your query
    const isLiked = item?.likes?.some((like: { user_id: string }) => like.user_id === user?.id);
    const { data: following, refetch: refetchFollowing } = useFollowing(user?.id || '');

//     const createdAt = new Date(item?.created_at);
//     const now = new Date();
//     const daysDiff = differenceInDays(now, createdAt);

    // let displayTime = '';

// if (daysDiff > 7) {
//   displayTime = format(createdAt, 'dd/MM/yyyy');
// } else if (daysDiff >= 1) {
//   displayTime = `${daysDiff}d`;
// } else {
//   const hoursDiff = differenceInHours(now, createdAt);
//   if (hoursDiff >= 1) {
//     displayTime = `${hoursDiff}h`;
//   } else {
//     const minutesDiff = differenceInMinutes(now, createdAt);
//     if (minutesDiff >= 1) {
//       displayTime = `${minutesDiff}m`;
//     } else {
//       displayTime = 'now'; // 🔥 For posts just created
//     }
//   }
// }

// this these too, it  4 hours off in supabase though which is weird I'm using the basic version 
// const adjustedTimestamp = new Date(item?.created_at).getTime() - new Date().getTimezoneOffset() * 60000;
// const now = new Date().getTime(); // Use current time as timestamp too
// let displayTime = '';

// const createdAt = new Date(item?.created_at.replace(' ', 'T') + 'Z');
// const now = new Date();
// const timeDiff = now.getTime() - createdAt.getTime();

// const secondsDiff = Math.floor(timeDiff / 1000);
// const minutesDiff = Math.floor(timeDiff / 60_000);
// const hoursDiff = Math.floor(timeDiff / 3_600_000);
// const daysDiff = Math.floor(timeDiff / 86_400_000);

// let displayTime = '';

// if (daysDiff > 7) {
//   displayTime = format(createdAt, 'dd/MM/yyyy');
// } else if (daysDiff >= 1) {
//   displayTime = `${daysDiff}d`;
// } else if (hoursDiff >= 1) {
//   displayTime = `${hoursDiff}h`;
// } else if (minutesDiff >= 1) {
//   displayTime = `${minutesDiff}m`;
// } else if (secondsDiff >= 1) {
//   displayTime = `${secondsDiff}s`;
// } else {
//   displayTime = 'now';
// }


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

    const followUser = async () => {
        const { error } = await supabase.from('Followers').insert({
            user_id: user?.id,
            following_user_id: item?.user_id
        });
        if (!error) refetchFollowing();
    }

    const addRepost = async () => {
        const newPost = {
            id: Crypto.randomUUID(),
            user_id: item?.user_id,
            text: item.text,
            file: item.file,
            place_id: item.place_id,
            tag_name: item.tag_name,
            repost_user_id: user?.id
        }
        
        const { data, error } = await supabase.from('Post').insert(newPost);
        if (!error) refetch();
    }


    // this works regular theme- white
//     return (
//         // <View className='bg-white'>
//         <View >
//             <View className='px-4 py-3'>
//                 {/* Repost indicator - Updated to use new data structure */}
//                 {item?.repost_user && (
//                     <View className='flex-row items-center mb-2' style={{ marginLeft: 60 }}>
//                         <Repeat size={16} color='#666' strokeWidth={1.5} />
//                         <Text size="sm" className='ml-2 text-gray-600'>
//                             Reposted by
//                             <Pressable onPress={() => router.push({
//                                 pathname: `/user`,
//                                 params: { userId: item?.repost_user_id }
//                             })}>
//                                 <Text size="sm" bold className='text-gray-800'>
//                                     {item?.repost_user?.username}
//                                 </Text>
//                             </Pressable>
//                         </Text>
//                     </View>
//                 )}

//                 <HStack className="items-start" space='sm'>
//                     {/* Avatar with follow badge */}
//                     <View className='relative'>
//                         <Pressable onPress={() => router.push({
//                             pathname: `/user`,
//                             params: { userId: item?.user_id }
//                         })}>
//                             <Avatar size="md" className='border border-gray-100'>
//                                 {/* Updated to handle both User and user based on your query structure */}
//                                 <AvatarFallbackText>{item?.User?.username || item?.user?.username}</AvatarFallbackText>
//                                 <AvatarImage
//                                     source={{ uri: avatarUrl }}
//                                     className="w-12 h-12 rounded-full"
//                                 />
//                             </Avatar>
//                         </Pressable>
                        
//                         {/* Follow button  need this below to wrok new post*/}
//                         {!following?.includes(item?.user_id) && user?.id !== item?.user_id && (
//                             <View 
//                                 className='absolute -bottom-1 -right-1 items-center justify-center'
//                                 style={{
//                                     backgroundColor: '#000',
//                                     borderRadius: 12,
//                                     width: 24,
//                                     height: 24,
//                                     elevation: 2, // Android shadow
//                                     shadowColor: '#000', // iOS shadow
//                                     shadowOffset: { width: 0, height: 1 },
//                                     shadowOpacity: 0.2,
//                                     shadowRadius: 2,
//                                 }}
//                             >
//                                 <Pressable 
//                                     onPress={followUser}
//                                     style={{
//                                         width: 24,
//                                         height: 24,
//                                         alignItems: 'center',
//                                         justifyContent: 'center'
//                                     }}
//                                 >
//                                     <Plus size={14} color='white' strokeWidth={2} />
//                                 </Pressable>
//                             </View>
//                         )}
                        
//                         {/* Thread line */}
//                         {item?.parent_id && (
//                             <View 
//                                 className='absolute left-6 top-14' 
//                                 style={{ 
//                                     width: 2, 
//                                     height: 40, 
//                                     backgroundColor: '#e5e7eb' 
//                                 }} 
//                             />
//                         )}
//                     </View>

//                     {/* Main content */}
//                     <VStack className='flex-1' space='xs'>
//                         {/* Header */}
//                         <HStack className='items-center justify-between'>
//                             <HStack className='items-center flex-1' space='sm'>
//                                 <Pressable onPress={() => router.push({
//                                     pathname: `/user`,
//                                     params: { userId: item?.user_id }
//                                 })}>
//                                     <Text size='md' bold className='text-black'>
//                                         {item?.User?.username || item?.user?.username}
//                                     </Text>
//                                 </Pressable>
                                
//                                 <Text size='sm' className='text-gray-500'>
//                                      {item?.created_at && formatDistanceToNow(
//                                         (new Date(item?.created_at).getTime() - new Date().getTimezoneOffset() * 60000),
//                                         { addSuffix: true }    
//                                      )}
//                                 </Text>
//                                 {/* <Text size="sm" className="text-gray-500">
//                                     {displayTime}
  
//                                 </Text> */}
//                             </HStack>
                            
//                             <Pressable className='p-2 -mr-2'>
//                                 <MoreHorizontal size={20} color='#666' />
//                             </Pressable>
//                         </HStack>

//                         {/* Location - Updated to use new data structure */}
//                         {item?.place && 
//                             <Pressable onPress= { () => router.push( { pathname: '/posts', params: {placeId: item.place_id } })}>
//                             <Text size="sm" className='text-gray-600 -mt-1'>
//                                 📍 {item?.place?.name}
//                             </Text>
//                             </Pressable>
//                         }

//                         {/* Post content */}
//                         <VStack space='md'>
//                             {/* Text content */}
//                             <Text size='md' className='leading-5 text-black'>
//                                 {renderText({ textArray, post: item})}
//                             </Text>

//                             {/* Image */}
//                             {item?.file && (
//                                 <View 
//                                     className='overflow-hidden' 
//                                     style={{ 
//                                         borderRadius: 12, 
//                                         borderWidth: 1, 
//                                         borderColor: '#f3f4f6',
//                                         overflow: 'hidden',
//                                     }}
//                                 >
//                                     <Image
//                                         source={{ uri: imageUrl }}
//                                         style={{ 
//                                             width: screenWidth - 80, 
//                                             height: screenWidth - 80,
//                                             maxHeight: 400 ,
//                                             borderRadius: 12,
                                            
//                                         }}
//                                         resizeMode="cover"
//                                     />
//                                 </View>
//                             )}

//                             {/* Actions */}
//                             <HStack className='items-center justify-between' style={{ paddingTop: 10 }}>
//                                 <HStack className='items-center' space='lg'>
//                                     {/* Like - Updated to use new data structure */}
//                                     <Pressable 
//                                         onPress={isLiked ? removeLike : addLike}
//                                         className='flex-row items-center'
//                                     >
//                                         <Heart 
//                                             size={22} 
//                                             color={isLiked ? '#ff3040' : '#666'} 
//                                             strokeWidth={1.5} 
//                                             fill={isLiked ? '#ff3040' : 'transparent'} 
//                                         />
//                                         {item?.likes?.length > 0 && (
//                                             <Text size='sm' className='ml-1 text-gray-600'>
//                                                 {item?.likes?.length}
//                                             </Text>
//                                         )}
//                                     </Pressable>

//                                     {/* Comment - Updated to use new data structure */}
//                                     <Pressable 
//                                         onPress={() => router.push({
//                                             pathname: '/thread',
//                                             params: { id: item.id }
//                                         })}
//                                         className='flex-row items-center'
//                                     >
//                                         <MessageCircle size={22} color='#666' strokeWidth={1.5} />
//                                         {item?.posts?.length > 0 && (
//                                             <Text size='sm' className='ml-1 text-gray-600'>
//                                                 {item?.posts?.length}
//                                             </Text>
//                                         )}
//                                     </Pressable>

//                                     {/* Repost */}
//                                     <Pressable onPress={addRepost}>
//                                         <Repeat size={22} color='#666' strokeWidth={1.5} />
//                                     </Pressable>

//                                     {/* Share */}
//                                     <Pressable onPress={() => {}}>
//                                         <Send size={22} color='#666' strokeWidth={1.5} />
//                                     </Pressable>
//                                 </HStack>
//                             </HStack>
//                         </VStack>
//                     </VStack>
//                 </HStack>
//             </View>
            
//             {/* Bottom divider */}
//             <View 
//                 className='ml-16' 
//                 style={{ 
//                     height: 1, 
//                     // backgroundColor: '#f3f4f6',
//                    backgroundColor: '#C2C3C4',
//                     marginTop: 12 
//                 }} 
//             />
//         </View>
//     );
// }

return (
    <View className="bg-white dark:bg-black">
        <View className='px-4 py-3'>
            {/* Repost indicator - Updated to use new data structure */}
            {item?.repost_user && (
                <View className='flex-row items-center mb-2' style={{ marginLeft: 60 }}>
                    <Repeat size={16} color='#666' strokeWidth={1.5} />
                    <Text size="sm" className='ml-2 text-gray-600 dark:text-gray-400'>
                        Reposted by
                        <Pressable onPress={() => router.push({
                            pathname: `/user`,
                            params: { userId: item?.repost_user_id }
                        })}>
                            <Text size="sm" bold className='text-gray-800 dark:text-gray-200'>
                                {item?.repost_user?.username}
                            </Text>
                        </Pressable>
                    </Text>
                </View>
            )}

            <HStack className="items-start" space='sm'>
                {/* Avatar with follow badge */}
                <View className='relative'>
                    <Pressable onPress={() => router.push({
                        pathname: `/user`,
                        params: { userId: item?.user_id }
                    })}>
                        <Avatar size="md" className='border border-gray-100 dark:border-gray-800'>
                            {/* Updated to handle both User and user based on your query structure */}
                            <AvatarFallbackText>{item?.User?.username || item?.user?.username}</AvatarFallbackText>
                            <AvatarImage
                                source={{ uri: avatarUrl }}
                                className="w-12 h-12 rounded-full"
                            />
                        </Avatar>
                    </Pressable>
                    
                    {/* Follow button  need this below to wrok new post*/}
                    {!following?.includes(item?.user_id) && user?.id !== item?.user_id && (
                        <View 
                            className='absolute -bottom-1 -right-1 items-center justify-center'
                            style={{
                                backgroundColor: '#000',
                                borderRadius: 12,
                                width: 24,
                                height: 24,
                                elevation: 2, // Android shadow
                                shadowColor: '#000', // iOS shadow
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.2,
                                shadowRadius: 2,
                            }}
                        >
                            <Pressable 
                                onPress={followUser}
                                style={{
                                    width: 24,
                                    height: 24,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Plus size={14} color='white' strokeWidth={2} />
                            </Pressable>
                        </View>
                    )}
                    
                    {/* Thread line */}
                    {item?.parent_id && (
                        <View 
                            className='absolute left-6 top-14' 
                            style={{ 
                                width: 2, 
                                height: 40, 
                                backgroundColor: '#e5e7eb' // Could make this theme-aware too
                            }} 
                        />
                    )}
                </View>

                {/* Main content */}
                <VStack className='flex-1' space='xs'>
                    {/* Header */}
                    <HStack className='items-center justify-between'>
                        <HStack className='items-center flex-1' space='sm'>
                            <Pressable onPress={() => router.push({
                                pathname: `/user`,
                                params: { userId: item?.user_id }
                            })}>
                                <Text size='md' bold className='text-black dark:text-white'>
                                    {item?.User?.username || item?.user?.username}
                                </Text>
                            </Pressable>
                            
                            <Text size='sm' className='text-gray-500 dark:text-gray-400'>
                                 {item?.created_at && formatDistanceToNow(
                                    (new Date(item?.created_at).getTime() - new Date().getTimezoneOffset() * 60000),
                                    { addSuffix: true }    
                                 )}
                            </Text>
                        </HStack>
                        
                        <Pressable className='p-2 -mr-2'>
                            <MoreHorizontal size={20} color='#666' />
                        </Pressable>
                    </HStack>

                    {/* Location - Updated to use new data structure */}
                    {item?.place && 
                        <Pressable onPress= { () => router.push( { pathname: '/posts', params: {placeId: item.place_id } })}>
                        <Text size="sm" className='text-gray-600 dark:text-gray-400 -mt-1'>
                            📍 {item?.place?.name}
                        </Text>
                        </Pressable>
                    }

                    {/* Post content */}
                    <VStack space='md'>
                        {/* Text content */}
                        <Text size='md' className='leading-5 text-black dark:text-white'>
                            {renderText({ textArray, post: item})}
                        </Text>

                        {/* Image */}
                        {item?.file && (
                            <View 
                                className='overflow-hidden' 
                                style={{ 
                                    borderRadius: 12, 
                                    borderWidth: 1, 
                                    borderColor: '#f3f4f6', // Could make this theme-aware
                                    overflow: 'hidden',
                                }}
                            >
                                <Image
                                    source={{ uri: imageUrl }}
                                    style={{ 
                                        width: screenWidth - 80, 
                                        height: screenWidth - 80,
                                        maxHeight: 400 ,
                                        borderRadius: 12,
                                        
                                    }}
                                    resizeMode="cover"
                                />
                            </View>
                        )}

                        {/* Actions */}
                        <HStack className='items-center justify-between' style={{ paddingTop: 10 }}>
                            <HStack className='items-center' space='lg'>
                                {/* Like - Updated to use new data structure */}
                                <Pressable 
                                    onPress={isLiked ? removeLike : addLike}
                                    className='flex-row items-center'
                                >
                                    <Heart 
                                        size={22} 
                                        color={isLiked ? '#ff3040' : '#666'} 
                                        strokeWidth={1.5} 
                                        fill={isLiked ? '#ff3040' : 'transparent'} 
                                    />
                                    {item?.likes?.length > 0 && (
                                        <Text size='sm' className='ml-1 text-gray-600 dark:text-gray-400'>
                                            {item?.likes?.length}
                                        </Text>
                                    )}
                                </Pressable>

                                {/* Comment - Updated to use new data structure */}
                                <Pressable 
                                    onPress={() => router.push({
                                        pathname: '/thread',
                                        params: { id: item.id }
                                    })}
                                    className='flex-row items-center'
                                >
                                    <MessageCircle size={22} color='#666' strokeWidth={1.5} />
                                    {item?.posts?.length > 0 && (
                                        <Text size='sm' className='ml-1 text-gray-600 dark:text-gray-400'>
                                            {item?.posts?.length}
                                        </Text>
                                    )}
                                </Pressable>

                                {/* Repost */}
                                <Pressable onPress={addRepost}>
                                    <Repeat size={22} color='#666' strokeWidth={1.5} />
                                </Pressable>

                                {/* Share */}
                                <Pressable onPress={() => {}}>
                                    <Send size={22} color='#666' strokeWidth={1.5} />
                                </Pressable>
                            </HStack>
                        </HStack>
                    </VStack>
                </VStack>
            </HStack>
        </View>
        
        {/* Bottom divider */}
        <View 
            className='ml-16' 
            style={{ 
                height: 1, 
                backgroundColor: '#C2C3C4', // Could make this theme-aware too
                marginTop: 12 
            }} 
        />
    </View>
    );
}