import { View, Dimensions, StyleSheet } from "react-native";
import React from "react";
import Animated, {
    Extrapolate,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";
import { carouselItem } from "./types";

const screen = Dimensions.get("screen");

export default function Pagination({
    data,
    scrollX,
}: {
    data: carouselItem[];
    scrollX: SharedValue<number>;
}) {
    return (
        <View style={styles.carouselPaginationContainer}>
            {data.map((item, idx) => {
                /*******************************************************************************
                 *
                 * Interpolates dot properties based on the scrollX value
                 *
                 * EXAMPLE:
                 *
                 * Slide 1:
                 * [ -400, 0, 400 ]   // at scrollX value 0, dotWidth is 24
                 * [    8,24,   8 ]
                 *
                 * Slide 2:
                 * [ 0, 400, 800 ]   // at scrollX value 400, dotWidth is 24
                 * [ 8,  24,   8 ]
                 *
                 * Slide 3:
                 * [ 400, 800, 1200 ]   // at scrollX value 800, dotWidth is 24
                 * [   8,  24,    8 ]
                 *
                 *******************************************************************************/

                const inputRange = [
                    (idx - 1) * screen.width,
                    idx * screen.width,
                    (idx + 1) * screen.width,
                ];

                const width = useAnimatedStyle(() => {
                    const dotWidth = interpolate(
                        scrollX.value,
                        inputRange,
                        [8, 24, 8],
                        Extrapolate.CLAMP
                    );

                    return {
                        width: dotWidth,
                    };
                });

                const opacity = useAnimatedStyle(() => {
                    const dotOpacity = interpolate(
                        scrollX.value,
                        inputRange,
                        [0.5, 1, 0.5],
                        Extrapolate.CLAMP
                    );

                    return {
                        opacity: dotOpacity,
                    };
                });

                return (
                    <Animated.View
                        key={idx}
                        style={[
                            idx === 0
                                ? styles.carouselPaginationDotWide
                                : styles.carouselPaginationDotRegular,
                            width,
                            opacity,
                        ]}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    carouselPaginationContainer: {
        marginTop: 85,
        marginBottom: 185,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    carouselPaginationDotWide: {
        width: 24,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 2,
        backgroundColor: "#F7F5F0",
    },
    carouselPaginationDotRegular: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 2,
        backgroundColor: "#F7F5F0",
    },
});
