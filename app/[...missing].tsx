import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: "#F7F5F0",
                    },
                }}
            />
            <View style={styles.container}>
                <FontAwesome
                    name="exclamation-triangle"
                    size={50}
                    color="#000000"
                />
                <Text style={styles.title}>This screen doesn't exist.</Text>

                <Link href="/" style={styles.link}>
                    <Text style={styles.linkText}>Go back!</Text>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
    },
    title: {
        marginTop: 20,
        fontSize: 36,
        fontFamily: "AveriaBold",
        textAlign: "center",
    },
    link: {
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 16,
        fontFamily: "LatoItalic",
        color: "#808080",
        textAlign: "center",
    },
});
