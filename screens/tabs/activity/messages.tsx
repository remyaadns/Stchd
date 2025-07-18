import { FlatList, Text } from "react-native";
// import { useAuth } from "@/providers/AuthProvider";
import { Divider } from "@/components/ui/divider";


export default () => {
    // const { user } = useAuth();

    return (
        <FlatList
        data={[]}
        contentContainerClassName="gap-2 p-2"
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => <Text className="text-lg self-center"> No Messages</Text>}
        renderItem={({ item }) => {
            return null
        }}
        />
    )
}