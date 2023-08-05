import React, { useEffect } from "react";
import { StyleSheet, View, ColorValue } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

interface Props {
    color: ColorValue;
}

export const LoadingSpinner = ({ color }: Props): JSX.Element => {
    const rotationDegree = useSharedValue(0);

    useEffect(() => {
        rotationDegree.value = withRepeat(
            withTiming(360 * 2, { duration: 1000 }),
            -1
        );
    }, []);

    const transformAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateZ: rotationDegree.value + "deg",
                },
            ],
        };
    });

    return (
        <View style={styles.container} accessibilityRole="progressbar">
            <View style={[styles.background, { borderColor: color }]} />
            <Animated.View
                style={[
                    styles.progress,
                    { borderTopColor: color },
                    transformAnimation,
                ]}
            />
        </View>
    );
};

const height = 22;

const styles = StyleSheet.create({
    container: {
        width: height,
        height: height,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        width: "100%",
        height: "100%",
        borderRadius: height / 2,
        borderWidth: 4,
        opacity: 0.25,
    },
    progress: {
        width: "100%",
        height: "100%",
        borderRadius: height / 2,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
        borderWidth: 4,
        position: "absolute",
    },
});
