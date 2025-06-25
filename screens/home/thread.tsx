import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Button } from "@/components/ui/button";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, SafeAreaView, View } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { ChevronLeft } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
// import { PostView } from "@/components/ui/post"; 
import { usePosts } from '@/hooks/use-thread';


export default function ThreadScreen() {
    const { user } = useAuth();
    const { id } = useLocalSearchParams();
    const { data, isLoading, error, refetch } = useThread(id as string);

    if (!data) return null;
    return (
        <SafeAreaView className="bg-white flex-1">
            <HStack className="w-full justify-between items-center p-3">
                <Button variant="lnk" onPress={() => router.back()}>
                    <ChevronLeft size={20} color="black" />
                    <Text className="w-12 text-black">Back</Text>
                </Button>
                <Text className="text-lg font-bold text-black">Thread</Text>
                <View className="w-20"/>
            </HStack>
            <VStack space="md">
                <PostView item={data[0]}/>
                <Divider/>
                 <Text size="lg" bold className=" text-black px-3">Replies</Text>
                 <Divider/>
                 <FlatList
                 data={data?.[0]?.Post}
                 ListFooterComponent={() =>
                    <Pressable onPress={() => router.push ({
                        pathname: '/post',
                        params: {
                            threadId: data[0]?.id
                        }
                    })}>
                <HStack className="items-center" space="md" style={{ paddingHorizontal: 22}}>
                    <Avatar size="sm">
                    <AvatarFallbackText>{user?.username}</AvatarFallbackText>
                    <AvatarImage
                    source={{
                        uri: user?.avatar,
                    }}
                    />
                    </Avatar>
                    <Text>Reply</Text>
                </HStack>
                </Pressable>
                 }
                 renderItem={({ item }) => <PostView item={item} />}
                 />
            </VStack>
        </SafeAreaView>
    );
}
