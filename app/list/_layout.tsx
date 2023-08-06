import { Stack } from "expo-router";

export default function ListLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: "#F7F5F0",
                    },
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: "#F7F5F0",
                    },
                }}
            />
        </Stack>
    );
}
