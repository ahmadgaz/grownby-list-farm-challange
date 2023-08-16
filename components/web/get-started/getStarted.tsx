import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { ScrollView } from "react-native-gesture-handler";

export default function GetStarted() {
    return (
        <ScrollView>
            <View style={styles.outerContainer}>
                <View style={styles.container}>
                    {/* Logo */}
                    <Image
                        source={require("../../../assets/images/logo-dark.png")}
                        style={{ width: 87, height: 60 }}
                    />

                    <View style={styles.heroContainer}>
                        {/* Text, CTA and break*/}
                        <View style={styles.CTAContainer}>
                            <Text style={styles.CTAText}>
                                Keeping Small Farms in Business
                            </Text>
                            <Text style={styles.CTASubtitle}>
                                Sell straight to consumers, choose your own
                                timings, and boost your sales. We stand as the
                                world's sole cooperatively-owned app dedicated
                                to farm sales.
                            </Text>

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
                                <Pressable style={styles.CTAButton}>
                                    {({ hovered, pressed }) => (
                                        <Text
                                            style={[
                                                styles.CTAButtonText,
                                                !hovered
                                                    ? {
                                                          shadowColor:
                                                              "rgba(0, 0, 0, 0.20)",
                                                          shadowOffset: {
                                                              height: 10,
                                                              width: 0,
                                                          },
                                                          shadowOpacity: 1,
                                                          shadowRadius: 15,
                                                      }
                                                    : null,
                                                pressed
                                                    ? { opacity: 0.5 }
                                                    : null,
                                            ]}
                                        >
                                            Get Started
                                        </Text>
                                    )}
                                </Pressable>
                            </Link>
                        </View>

                        {/* Hero Image */}
                        <View style={styles.heroImageContainer}>
                            <Image
                                source={require("../../../assets/images/image-frame.png")}
                                style={styles.heroFrameImage}
                            />
                            <Image
                                source={require("../../../assets/images/image-slide-3.png")}
                                style={styles.heroImage}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: "center",
        display: "flex",
        width: "100%",
    },
    container: {
        flex: 1,
        alignItems: "center",

        marginVertical: 25,
        width: 1200,
        maxWidth: "100%",
    },
    heroContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    heroImageContainer: {
        flex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    heroFrameImage: {
        width: 300,
        height: 412,
        marginTop: 20,
        objectFit: "contain",
    },
    heroImage: {
        width: 421,
        height: 436,
        marginTop: 30,
        objectFit: "contain",
        position: "absolute",
    },
    CTASubtitle: {
        width: "100%",
        fontFamily: "AveriaRegular",
        fontSize: 20,
        color: "#F7F5F0",
        lineHeight: 30,
        letterSpacing: 0,
        marginBottom: 22,
    },
    CTAText: {
        width: "100%",
        fontFamily: "AveriaBold",
        fontSize: 40,
        color: "#F7F5F0",
        lineHeight: 50,
        letterSpacing: -2.3,
        marginTop: 100,
        marginBottom: 22,
    },
    CTAContainer: {
        width: "100%",
        paddingHorizontal: 36,
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    CTABreak: {
        width: "100%",
        marginBottom: 33,
    },
    CTAButton: { width: "100%" },
    CTAButtonText: {
        fontSize: 18,
        color: "#6DBE4B",
        fontFamily: "LatoRegular",
        backgroundColor: "#F7F5F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 15,
    },
});
