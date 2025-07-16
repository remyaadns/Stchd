// import React from 'react';
// import { Pressable, SafeAreaView } from 'react-native';
// import { Text } from '@/components/ui/text';
// import { Button, ButtonText } from '@/components/ui/button';
// import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge, } from '@/components/ui/avatar';
// import { Plus } from 'lucide-react-native';
// import { useAuth } from '@/providers/AuthProvider';
// import { User } from '@/lib/types';
// import { HStack } from '@/components/ui/hstack';
// import * as ImagePicker from 'expo-image-picker';
// import { usePost } from '@/providers/PostProvider';

// enum Tab {
//   THREADS = 'Threads',
//   REPLIES = 'Replies',
//   REPOSTS = 'Reposts',
//   // MEDIA = 'Media',
//   // LIKES = 'Likes',

// }

// export default ({ user }: { user: User }) => {
//   const { logOut } = useAuth();
//   const [tab, setTab] = React.useState<Tab>(Tab.THREADS);
//   // const [ photo, setPhoto ] = React.useState<string>('');
//   const imageUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${user.id}/avatar.jpeg}`;
//   const { uploadFile } = usePost();


//       const addPhoto = async () => {
//           // setPhoto('');
//           let result = await ImagePicker.launchImageLibraryAsync({
//                mediaTypes: ['images'],
//               allowsEditing: true,
//               aspect: [4, 3],
//               // quality: 0.1,
//               // aspect: [16, 9],
//               quality: 0.1,
//           });
//           if(!result.assets?.[0]?.uri) return;
  
//           let uri = result.assets?.[0]?.uri;
//           let type = result.assets?.[0]?.mimeType;
//           let name = `avatar.jpeg`;
//           // setPhoto(uri);
//           const path = await uploadFile( '', uri, type, name);
//           console.log(path);
//       };

//   return (
//     // <SafeAreaView className="flex-1 justify-start items-start pt-10">
//     <SafeAreaView className="flex-1 pt-10 px-5">
//       <HStack className='items-center justify-between p-3'>
//         <Text size='3xl' bold className='text-black'>{user?.username}</Text>
//         <Pressable onPress={addPhoto} className='p-2 rounded-full bg-gray-200'>
//         <Avatar size="md" className='mt-6'  >
//           <AvatarBadge size='lg' style={{ backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
//             <Plus size={3} color='white' />
//           </AvatarBadge>
//           {/* Fixed: Changed from item?.User to item?.user */}
//           <AvatarFallbackText>{user?.username}</AvatarFallbackText>
//           <AvatarImage
//             source={{
//               uri: imageUrl,
//             }}
//             className="w-12 h-12 rounded-full"
//           />
//         </Avatar>
//          </Pressable>
//       </HStack>
//       <HStack space='md' className='items-center justify-between p-3'>
  
//       <Button onPress={() => {}} variant='outline' className="flex-1 border-gray-400 p-5 rounded-lg">
//         <ButtonText>Edit profile</ButtonText>
//       </Button>
//          <Button onPress={() => {}} variant='outline' className="flex-1 border-gray-400 p-5 rounded-lg">
//         <ButtonText>Share profile</ButtonText>
//               {/* to logout */}
//               {/* </Button>
//          <Button onPress={logOut} variant='outline' className="flex-1 border-gray-400 p-5 rounded-lg">
//         <ButtonText>Log Out</ButtonText> */}
//       </Button>
//       </HStack>
//       <HStack className='items-center justify-between p-3'>
//         { Object.values(Tab).map((t) => (
//            <Button onPress={() => setTab(tab)} variant='link' className= {`flex-1 border-b ${t === tab} ?  'border-black' : 'border-gray-400'}`}>
//             <ButtonText className= {` ${t === tab ? 'text-black' : 'text-gray-500'} `}>{t}</ButtonText>
//           </Button>
//         ))}
//       </HStack>
//       </SafeAreaView>
//   );
// }



import React from 'react';
import { Pressable, SafeAreaView, Share } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge, } from '@/components/ui/avatar';
import { Plus } from 'lucide-react-native';
import { useAuth } from '@/providers/AuthProvider';
import { User } from '@/lib/types';
import { HStack } from '@/components/ui/hstack';
import * as ImagePicker from 'expo-image-picker';
import { usePost } from '@/providers/PostProvider';
import { usePosts } from '@/hooks/use-posts';
import { VStack } from '@/components/ui/vstack';
import { FlatList } from 'react-native';
import { Divider } from '@/components/ui/divider';
import PostView from '@/components/shared/post-view';
import BottomSheet from '@/components/shared/bottom-sheet'




enum Tab {
  THREADS = 'Threads',
  REPLIES = 'Replies',
  REPOSTS = 'Reposts',
  // MEDIA = 'Media',
  // LIKES = 'Likes',
}

const Tabs = [
  {
    name: Tab.THREADS,
    key: 'user_id',
  },
  {
    name: Tab.REPLIES,
    key: 'user_id',
  },
  {
    name: Tab.REPOSTS,
    key: 'repost_user_id',

  },
]


export default ({ user }: { user: User }) => {
  const { logOut } = useAuth();
  const { user: authUser } = useAuth();
  const [tab, setTab] = React.useState< typeof Tabs [number]>(Tabs[0]);
  // const [ photo, setPhoto ] = React.useState<string>(''); remove this using below
  const avatarUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${user?.id}/avatar.jpeg`;
  const { data, isLoading, refetch } = usePosts({ key: tab.key, value: user?.id, type: 'eq' });
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  // const { uploadFile } = usePost();

  // older one
  // const addPhoto = async () => {
  //   // setPhoto('');
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ['images'],
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     // quality: 0.1,
  //     // aspect: [16, 9],
  //     quality: 0.1,
  //   });
  //   if(!result.assets?.[0]?.uri) return;

  //   let uri = result.assets?.[0]?.uri;
  //   let type = result.assets?.[0]?.mimeType;
  //   let name = `avatar.jpeg`;
  //   // setPhoto(uri);
  //   const path = await uploadFile( '', uri, type, name);
  //   console.log(path);
  // };

  // newer one
  const addPhoto = async () => {
    const result = await pickImage();
    if (!result) return;
    const { uri, type } = result;
    await uploadFile({
      userId: authUser?.id ||'',
      uri,
      type,
      name:'avatar.jpeg'
    }); 
  }

  const shareProfile = async () => {
    await Share.share ({
      message: `Check out ${user?.username}'s profile on Post!`
    })
  }

  return (
    <SafeAreaView className="flex-1 pt-10 px-5">
      <HStack className='items-center justify-between p-3'>
        <Text size='3xl' bold className='text-black'>{user?.username}</Text>
        <Pressable onPress={addPhoto} className='p-2 rounded-full bg-gray-200'>
          <Avatar size="md" className='mt-6'>
            <AvatarBadge size='lg' style={{ backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={3} color='white' />
            </AvatarBadge>
            {/* Fixed: Changed from item?.User to item?.user */}
            <AvatarFallbackText>{user?.username}</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: avatarUrl,
              }}
              className="w-12 h-12 rounded-full"
            />
          </Avatar>
        </Pressable>
      </HStack>
      
      <HStack space='md' className='items-center justify-between p-3'>
        <Button onPress={() => setShowActionsheet(true)} variant='outline' className="flex-1 border-gray-400 p-5 rounded-lg">
          <ButtonText>Edit profile</ButtonText>
        </Button>
        <Button onPress={shareProfile} variant='outline' className="flex-1 border-gray-400 p-5 rounded-lg">
          <ButtonText>Share profile</ButtonText>
          {/* to logout */}
          {/* </Button>
         <Button onPress={logOut} variant='outline' className="flex-1 border-gray-400 p-5 rounded-lg">
        <ButtonText>Log Out</ButtonText> */}
        </Button>
      </HStack>
      
      <HStack className='items-center justify-between p-3'>
        { Tabs.map((t) => (
          <Button 
            key={t.name}
            onPress={() => setTab(t)} 
            variant='link' 
            className={`flex-1 border-b ${t.name === tab.name ? 'border-black' : 'border-gray-400'}`}
          >
            <ButtonText className={`${t.name === tab.name ? 'text-black' : 'text-gray-500'}`}>{t.name}</ButtonText>
          </Button>
        ))}
      </HStack>
      <VStack space='lg'>
         <FlatList
          data={data}
          refreshing={isLoading}
          onRefresh={refetch}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => <PostView item={item} refetch={refetch} />}
        />
      </VStack>
      <BottomSheet showActionSheet={showActionsheet} setShowActionSheet={setShowActionsheet}/>
    </SafeAreaView>
  );
}