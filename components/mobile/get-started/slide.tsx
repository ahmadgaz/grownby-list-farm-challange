import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";

const screenDimensions = Dimensions.get("screen");

export default function Slide({
    item,
}: {
    item: { id: number; text: string; image: number };
}) {
    return (
        <View style={styles.slideContainer}>
            <Image source={item.image} style={styles.slideImage} />
            <Text style={styles.slideText}>{item.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    slideContainer: {
        width: screenDimensions.width,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    slideImage: {
        width: "100%",
        height: 300,
        maxHeight: screenDimensions.height - 430,
        marginHorizontal: 33,
        marginBottom: 36,
        objectFit: "contain",
    },
    slideText: {
        width: "100%",
        height: 155,
        paddingHorizontal: 36,
        fontFamily: "AveriaBold",
        fontSize: 48,
        color: "#F7F5F0",
        lineHeight: 50.5,
        letterSpacing: -2.3,
        marginBottom: 22,
    },
});
