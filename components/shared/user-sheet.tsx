import React from "react";
import { Actionsheet, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetBackdrop } from "@/components/ui/actionsheet";
import { LogOut} from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { useUser } from "@/hooks/use-user";
import { useFollowing } from "@/hooks/use-following";
import { useAuth } from "@/providers/AuthProvider";


interface BottomSheetProps {
    showActionSheet: boolean;
    setShowActionSheet: (show: boolean) => void;
}
    
export default ({ showActionSheet, setShowActionSheet }: BottomSheetProps) => {
    const { user } = useAuth();
        const { data, refetch } = useFollowing(user?.id || '');
          return (
              <Actionsheet isOpen={showActionSheet} onClose= {() => setShowActionSheet(false)}>
                <ActionsheetBackdrop onPress= {() => setShowActionSheet(false)}/>
                <ActionsheetContent className="border-none bg-gray-100">
                  <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator />
                  </ActionsheetDragIndicatorWrapper>
                    <VStack space="sm" className="w-full bg-white rounded-lg my-5">
                  <ActionsheetItem
                    className="flex-row items-center justify-between"
                    onPress={() => {
                    setShowActionSheet(false);

                    }}
                  >
                    <ActionsheetItemText bold className="text-red-500">Signout</ActionsheetItemText>
                  <LogOut size={16} color='red' />
                  </ActionsheetItem>
                  </VStack>
                </ActionsheetContent>
              </Actionsheet>
          );
        }