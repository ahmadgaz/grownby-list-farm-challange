import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

const screenDimensions = Dimensions.get("screen");

export default function LoadingList() {
    const items = Array.apply(
        null,
        Array(Math.floor((screenDimensions.height - 375) / 100))
    ).map((item, idx) => <Item key={idx} idx={idx} />);

    return <View style={styles.container}>{items}</View>;
}

function Item({ idx }: { idx: number }) {
    const opacity = useSharedValue(1);

    useEffect(() => {
        opacity.value = withDelay(
            300 * idx,
            withRepeat(withTiming(0.5, { duration: 1000 }), -1, true)
        );
    }, []);

    const opacityAnimation = useAnimatedStyle(() => {
        return { opacity: opacity.value };
    });

    return <Animated.View key={idx} style={[styles.item, opacityAnimation]} />;
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        paddingTop: 22,
    },
    item: {
        width: "100%",
        height: 100,
        backgroundColor: "#DFDFDF",
        borderRadius: 15,
        marginBottom: 11,
    },
});
