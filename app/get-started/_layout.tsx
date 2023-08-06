import { Stack } from "expo-router";

export default function GetStartedLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: "#3A5C42",
                    },
                }}
            />
            <Stack.Screen
                name="auth"
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
