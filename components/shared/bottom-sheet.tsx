import React from "react";
import { Actionsheet, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetBackdrop } from "@/components/ui/actionsheet";
import { LogOut, Settings } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";

interface BottomSheetProps {
    showActionSheet: boolean;
    setShowActionSheet: (show: boolean) => void;
}
	
export default ({ showActionSheet, setShowActionSheet }: BottomSheetProps) => {
        const { logOut } = useAuth();
        const router = useRouter();
        
        const handleSettingsPress = () => {
            setShowActionSheet(false);
            router.push('/settings');
        };
        
          return (
              <Actionsheet isOpen={showActionSheet} onClose= {() => setShowActionSheet(false)}>
                <ActionsheetBackdrop onPress= {() => setShowActionSheet(false)}/>
                <ActionsheetContent className="border-none bg-gray-100 dark:bg-gray-800">
                  <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator />
                  </ActionsheetDragIndicatorWrapper>
                    <VStack space="sm" className="w-full bg-white dark:bg-gray-800 rounded-lg my-5">
                  
                  <ActionsheetItem
                    className="flex-row items-center justify-between"
                    onPress={handleSettingsPress}
                  >
                    <ActionsheetItemText bold className="text-black dark:text-white">Settings</ActionsheetItemText>
                    <Settings size={16} color="#666666" />
                  </ActionsheetItem>
                  
                  <ActionsheetItem
                    className="flex-row items-center justify-between"
                    onPress={() => {
                    setShowActionSheet(false);
                     logOut();
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