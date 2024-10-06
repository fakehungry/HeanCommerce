import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Pressable, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { toggleTheme } from "@/features/theme/theme.slice";

export default function Index() {
  const theme = useAppSelector((state) => state.theme) as "light" | "dark";
  const dispatch = useAppDispatch();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors[theme].primary,
      }}
    >
      <Pressable onPress={() => dispatch(toggleTheme())}>
        <Text
          style={{
            color: Colors[theme].opposite_primary,
          }}
        >
          Toggle Theme
        </Text>
      </Pressable>
    </View>
  );
}
