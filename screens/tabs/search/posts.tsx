import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
// import { Text } from '@/components/ui/text';
// import { VStack } from '@/components/ui/vstack';
import { usePosts } from '@/hooks/use-posts';
import { useLocalSearchParams } from 'expo-router';
import { Divider } from '@/components/ui/divider';
import PostView from '@/components/shared/post-view';


export default () => {
    const { tag, placeId } = useLocalSearchParams();
    const { data, isLoading, refetch } = usePosts ({ filters: [{ key: tag ? 'tag_name': 'place_id', value: tag || placeId as string, type: 'eq' }] });
  return (
    <SafeAreaView>
    {/* <VStack space='md'> */}
        {/* <Text size='lg' bold className='text-black p-2'>Posts</Text> */}
        <FlatList
          data={data}
          refreshing={isLoading}
          onRefresh={refetch}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150}}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <PostView 
              item={item} 
              refetch={refetch}
              showDivider={false} // Since you're using ItemSeparatorComponent
            />
          )}
        //   keyExtractor={(item) => item.id}
          // showsVerticalScrollIndicator={false}
        />
      {/* </VStack> */}
      </SafeAreaView>
  );
}