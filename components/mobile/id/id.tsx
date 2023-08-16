import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useFarms } from "@/context/list";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const screenDimensions = Dimensions.get("screen");

export default function Id() {
    const farmsContext = useFarms();

    if (!farmsContext) {
        return null;
    }

    const { farms } = farmsContext;

    const { id } = useLocalSearchParams();

    const farm = farms?.find((farm) => farm.id === id);

    return (
        <>
            {/* Background */}
            <View style={styles.backgroundContainer}>
                <SafeAreaView style={styles.backgroundPlaceholderIcon}>
                    <FontAwesome name="photo" size={100} color="#808080" />
                </SafeAreaView>
                <Image
                    source={{ uri: farm?.image }}
                    style={styles.backgroundImage}
                />
                <LinearGradient
                    colors={["#F7F5F000", "#F7F5F000", "#F7F5F0", "#F7F5F0"]}
                    locations={[0, 0.5, 0.6, 1]}
                    style={styles.backgroundGradient}
                />
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                overScrollMode="never"
            >
                <View style={styles.container}>
                    <LinearGradient
                        colors={[
                            "#F7F5F000",
                            "#F7F5F0",
                            "#F7F5F0",
                            "#F7F5F000",
                        ]}
                        locations={[0.05, 0.25, 0.8, 1]}
                        style={styles.backgroundGradient}
                    />

                    <View style={styles.contentContainer}>
                        <Text style={styles.displaynameText}>
                            {farm?.displayname}
                        </Text>
                        <Text style={styles.nameText}>@{farm?.name}</Text>

                        {!farm?.phone && !farm?.hours && (
                            <Text style={styles.noContentText}>
                                No further information.
                            </Text>
                        )}

                        {farm?.phone && (
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemLabel}>Phone</Text>
                                <Text style={styles.itemContent}>
                                    {farm.phone}
                                </Text>
                            </View>
                        )}

                        {farm?.hours && (
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemLabel}>Hours</Text>
                                <Text style={styles.itemContent}>
                                    {farm.hours}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Back arrow */}
            <SafeAreaView style={styles.topBarContainer}>
                <View style={styles.topBar}>
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                    >
                        <FontAwesome
                            name="arrow-left"
                            size={25}
                            color="#000000"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        width: screenDimensions.width,
        height: screenDimensions.height,
        position: "absolute",
        backgroundColor: "#DFDFDF",
        display: "flex",
        alignItems: "center",
    },
    topBarContainer: {
        position: "absolute",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 36,
        marginVertical: 15,
        width: screenDimensions.width,
        display: "flex",
    },
    topBar: {
        width: "100%",
        height: 80,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    backgroundPlaceholderIcon: {
        marginTop: 100,
    },

    backgroundImage: {
        width: "100%",
        height: "60%",
        position: "absolute",
        objectFit: "cover",
    },
    backgroundGradient: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    scrollView: {
        width: screenDimensions.width,
        height: "100%",
    },
    container: {
        width: "100%",
        height: "200%",
        display: "flex",
        justifyContent: "flex-end",
    },
    contentContainer: {
        width: "100%",
        height: "74%",
        paddingHorizontal: 36,
    },
    displaynameText: {
        fontFamily: "AveriaRegular",
        fontSize: 36,
        letterSpacing: -1.8,
    },
    nameText: {
        marginTop: 3,
        marginBottom: 10,
        fontFamily: "LatoItalic",
        fontSize: 14,
        color: "#808080",
    },
    noContentText: {
        marginTop: 40,
        color: "#808080",
        fontFamily: "LatoLightItalic",
        fontSize: 16,
        textAlign: "center",
    },
    itemContainer: {
        width: "100%",
        minHeight: 75,
        backgroundColor: "#ffffff",
        borderRadius: 15,
        marginTop: 11,
        padding: 17,
    },
    itemLabel: {
        fontFamily: "LatoRegular",
        fontSize: 12,
        color: "#808080",
    },
    itemContent: {
        marginTop: 8,
        fontFamily: "LatoItalic",
        fontSize: 14,
        color: "#000",
    },
});
