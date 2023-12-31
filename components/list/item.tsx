import { View, Text, StyleSheet, ViewToken, Image } from "react-native";
import React, { memo, useCallback } from "react";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { FarmDataType } from "./types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import { useFarms } from "@/context/list";

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

        const farmsContext = useFarms();
        const handleDelete = useCallback(() => {
            farmsContext?.setFarms((prev: FarmDataType[] | null) => {
                return prev?.filter((farm) => farm.id !== data.id) || null;
            });
        }, []);

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
                        <View style={styles.CTAButtonsContainer}>
                            <View style={styles.CTAButtonContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.CTAButton,
                                        { backgroundColor: "#3A5C42" },
                                    ]}
                                    onPress={() => {
                                        router.push(`/list/${data.id}`);
                                    }}
                                >
                                    <Text style={styles.CTAButtonText}>
                                        View
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.CTAButtonContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.CTAButton,
                                        { backgroundColor: "#a41313" },
                                    ]}
                                    onPress={handleDelete}
                                >
                                    <Text style={styles.CTAButtonText}>
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        paddingRight: 10,
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
    CTAButtonsContainer: {
        display: "flex",
        flexDirection: "row",
    },
    CTAButtonContainer: {
        flex: 1,
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        borderRadius: 7.5,
        marginRight: 5,
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
