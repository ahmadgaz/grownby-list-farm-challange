import { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View, Text, Image } from "react-native";
import { Link } from "expo-router";
import LoadingScreen from "@/components/mobile/get-started/loadingScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import Carousel from "./carousel";
import { StatusBar } from "expo-status-bar";

const screenDimensions = Dimensions.get("screen");

export default function GetStarted() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 1000);
    }, []);

    return (
        <>
            <StatusBar style="light" translucent />

            {/* Loading Screen */}
            <LoadingScreen isPageLoaded={isLoaded} />

            {/* Get Started Screen */}
            <SafeAreaView style={styles.container}>
                {/* Logo */}
                <Image
                    source={require("../../../assets/images/logo-dark.png")}
                    style={{ width: 87, height: 60 }}
                />

                {/* Image and text carousel with pagination*/}
                <Carousel />

                {/* CTA and break*/}
                <View style={styles.CTAContainer}>
                    {/* Break */}
                    <Svg
                        style={styles.CTABreak}
                        height="2"
                        viewBox="0 0 320 2"
                        fill="none"
                        preserveAspectRatio="none"
                    >
                        <Path
                            d="M1 1H319"
                            stroke="#F7F5F0"
                            strokeLinecap="round"
                            strokeDasharray="10 10"
                        />
                    </Svg>

                    {/* Button */}
                    <Link href="/get-started/auth" asChild>
                        <TouchableOpacity style={styles.CTAButton}>
                            <Text style={styles.CTAButtonText}>
                                Get Started
                            </Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 25,
        width: screenDimensions.width,
        display: "flex",
    },
    CTAContainer: { width: "100%", paddingHorizontal: 36 },
    CTABreak: {
        width: "100%",
        marginBottom: 33,
    },
    CTAButton: {
        backgroundColor: "#F7F5F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 15,
        shadowColor: "rgba(0, 0, 0, 0.20)",
        shadowOffset: { height: 10, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 15,
    },
    CTAButtonText: {
        fontSize: 18,
        color: "#6DBE4B",
        fontFamily: "LatoRegular",
    },
});
