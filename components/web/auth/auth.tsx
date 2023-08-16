import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Register from "@/components/auth/register";
import Animated, {
    useAnimatedKeyboard,
    useAnimatedStyle,
} from "react-native-reanimated";
import Login from "@/components/auth/login";

export default function AuthScreen() {
    const [hasAnAccount, setHasAnAccount] = useState<boolean>(false);

    // Moves the view up when the keyboard comes up
    const keyboard = useAnimatedKeyboard();
    const translateStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: -keyboard.height.value / 1.8 }],
        };
    });

    return (
        <Animated.View style={[styles.parentContainer, translateStyle]}>
            <StatusBar style="dark" translucent={false} />

            {/* Background */}
            <View style={styles.backgroundContainer}>
                <Image
                    source={require("../../../assets/images/farmer.jpg")}
                    style={styles.backgroundImage}
                />
                <LinearGradient
                    colors={["#F7F5F000", "#F7F5F0"]}
                    locations={[0, 0.5]}
                    style={styles.backgroundGradient}
                />
            </View>

            {/* Authentication Screen */}
            <ScrollView contentContainerStyle={styles.container}>
                {/* Logo */}
                <Image
                    source={require("../../../assets/images/logo-light.png")}
                    style={{ width: 87, height: 60 }}
                />

                {/* Form and CTA*/}
                <View style={styles.CTAContainer}>
                    {/* Form */}
                    {hasAnAccount ? <Login /> : <Register />}

                    {/* Break */}
                    <View style={styles.CTABreakContainer}>
                        <Svg
                            style={styles.CTABreak}
                            height="2"
                            viewBox="0 0 320 2"
                            fill="none"
                            preserveAspectRatio="none"
                        >
                            <Path
                                d="M1 1H319"
                                stroke="#3A5C42"
                                strokeLinecap="round"
                                strokeDasharray="10 0"
                            />
                        </Svg>
                        <Text style={styles.CTABreakText}>or</Text>
                        <Svg
                            style={styles.CTABreak}
                            height="2"
                            viewBox="0 0 320 2"
                            fill="none"
                            preserveAspectRatio="none"
                        >
                            <Path
                                d="M1 1H319"
                                stroke="#3A5C42"
                                strokeLinecap="round"
                                strokeDasharray="10 0"
                            />
                        </Svg>
                    </View>

                    {/* Switch between Log in/ Register */}
                    {hasAnAccount ? (
                        <>
                            <Text style={styles.CTASwitchModeText}>
                                Don't have an account?{" "}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setHasAnAccount(false);
                                }}
                            >
                                <Text style={styles.CTASwitchModeTextButton}>
                                    Sign up.
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={styles.CTASwitchModeText}>
                                Already have an account?{" "}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setHasAnAccount(true);
                                }}
                            >
                                <Text style={styles.CTASwitchModeTextButton}>
                                    Log in.
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    parentContainer: {
        width: "100%",
        height: 800,
        maxHeight: "100%",
        display: "flex",
        alignItems: "center",
    },
    backgroundContainer: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    backgroundImage: {
        width: "100%",
        height: "80%",
        position: "absolute",
        objectFit: "cover",
    },
    backgroundGradient: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 25,
        width: "100%",
        height: "100%",
        maxWidth: 1200,
        display: "flex",
    },

    CTAContainer: { width: "100%", paddingHorizontal: 36 },
    CTABreakContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    CTABreakText: {
        color: "#3A5C42",
        fontFamily: "LatoRegular",
        marginBottom: 25,
    },
    CTABreak: {
        width: "45%",
        marginBottom: 22,
    },
    CTASwitchModeText: {
        textAlign: "center",
        marginBottom: 5,
        fontSize: 16,
        fontFamily: "LatoRegular",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    CTASwitchModeTextButton: {
        textAlign: "center",
        marginBottom: 5,
        fontSize: 16,
        fontFamily: "LatoBold",
    },
});
