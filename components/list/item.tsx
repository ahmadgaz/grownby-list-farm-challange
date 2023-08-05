import { View, Text, StyleSheet, ViewToken, Image } from "react-native";
import React, { memo } from "react";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { FarmDataType } from "./types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Item = memo(
    ({
        data,
        viewableItems,
    }: {
        data: FarmDataType;
        viewableItems: Animated.SharedValue<ViewToken[]>;
    }) => {
        const styleAnimation = useAnimatedStyle(() => {
            const isVisible = viewableItems.value
                .filter((item) => item.isViewable)
                .find((viewableItems) => viewableItems.item.id === data.id);

            return {
                opacity: withTiming(isVisible ? 1 : 0),
                transform: [{ scale: withTiming(isVisible ? 1 : 0.6) }],
            };
        });

        return (
            <Animated.View style={[styles.item, styleAnimation]}>
                <View style={styles.container}>
                    {/* Image */}
                    <View style={styles.imageContainer}>
                        {data.image ? (
                            <Image
                                source={{ uri: data.image }}
                                style={styles.image}
                            />
                        ) : (
                            <FontAwesome
                                name="building"
                                size={35}
                                color="#808080"
                            />
                        )}
                    </View>

                    {/* Text + View item */}
                    <View style={styles.CTAContainer}>
                        <View>
                            <Text style={styles.displayname}>
                                {data.displayname}
                            </Text>
                            <Text style={styles.name}>@{data.name}</Text>
                        </View>
                        <TouchableOpacity style={styles.CTAButton}>
                            <Text style={styles.CTAButtonText}>View</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        );
    }
);

const styles = StyleSheet.create({
    item: {
        width: "100%",
        height: 100,
        backgroundColor: "#ffffff",
        borderRadius: 15,
        marginBottom: 11,
        shadowColor: "#000000",
        shadowOffset: { height: 10, width: 0 },
        shadowOpacity: 0.03,
        shadowRadius: 15,
        padding: 15,
    },
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        backgroundColor: "#cdcdcd",
        aspectRatio: 1,
        height: "100%",
        overflow: "hidden",
        borderRadius: 7.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    CTAContainer: {
        flex: 1,
        height: "100%",
        width: "100%",
        marginLeft: 10,
        display: "flex",
        justifyContent: "space-between",
    },
    CTAButton: {
        backgroundColor: "#3A5C42",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        borderRadius: 7.5,
    },
    CTAButtonText: {
        fontSize: 12,
        color: "#F7F5F0",
        fontFamily: "LatoRegular",
    },
    displayname: {
        fontFamily: "AveriaRegular",
        fontSize: 16,
    },
    name: {
        fontFamily: "LatoItalic",
        fontSize: 12,
        color: "#808080",
    },
});
