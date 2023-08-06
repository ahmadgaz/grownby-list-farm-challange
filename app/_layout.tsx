import { FIREBASE_AUTH } from "@/firebase.config";
import { AuthProvider, useAuth } from "@/context/auth";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { FarmsProvider } from "@/context/list";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(home)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        AveriaBold: require("../assets/fonts/AveriaSerifLibre-Bold.ttf"),
        AveriaBoldItalic: require("../assets/fonts/AveriaSerifLibre-BoldItalic.ttf"),
        AveriaItalic: require("../assets/fonts/AveriaSerifLibre-Italic.ttf"),
        AveriaLight: require("../assets/fonts/AveriaSerifLibre-Light.ttf"),
        AveriaLightItalic: require("../assets/fonts/AveriaSerifLibre-LightItalic.ttf"),
        AveriaRegular: require("../assets/fonts/AveriaSerifLibre-Regular.ttf"),
        LatoBlack: require("../assets/fonts/Lato-Black.ttf"),
        LatoBlackItalic: require("../assets/fonts/Lato-BlackItalic.ttf"),
        LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
        LatoBoldItalic: require("../assets/fonts/Lato-BoldItalic.ttf"),
        LatoItalic: require("../assets/fonts/Lato-Italic.ttf"),
        LatoLight: require("../assets/fonts/Lato-Light.ttf"),
        LatoLightItalic: require("../assets/fonts/Lato-LightItalic.ttf"),
        LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
        LatoThin: require("../assets/fonts/Lato-Thin.ttf"),
        LatoThinItalic: require("../assets/fonts/Lato-ThinItalic.ttf"),
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return <Slot />;
    }

    return (
        <AuthProvider>
            <FarmsProvider>
                <RootLayoutNav />
            </FarmsProvider>
        </AuthProvider>
    );
}

function RootLayoutNav() {
    const userContext = useAuth();

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (userContext !== null) {
                userContext.setUser(user);
            }
        });
    }, []);

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
                name="get-started"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="list"
                options={{
                    headerShown: false,

                    contentStyle: {
                        backgroundColor: "#F7F5F0",
                    },
                    gestureEnabled: false,
                }}
            />
        </Stack>
    );
}
