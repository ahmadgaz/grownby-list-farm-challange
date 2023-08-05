import { View, StyleSheet, Image, Dimensions } from "react-native";
import Slide from "./slide";
import Pagination from "./pagination";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";
import { carouselItem } from "./types";

const screenDimensions = Dimensions.get("screen");

export default function Carousel() {
    // Shared value of the scroll x value for the pagination dots animation
    const scrollX = useSharedValue(0);

    // This changes scrollX as you scroll the carousel
    const handleScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    return (
        <View style={styles.carouselContainer}>
            {/* Contains the frame and the pagination dots absolutely positioned */}
            <View style={styles.carouselFrameImageContainer}>
                <Image
                    source={require("../../../assets/images/image-frame.png")}
                    style={styles.carouselFrameImage}
                />
                <Pagination
                    data={[
                        {
                            id: 0,
                            text: "Discover & Connect with Local Farmers",
                            image: require("../../../assets/images/image-slide-1.png"),
                        },
                        {
                            id: 1,
                            text: "Support Your Local Community",
                            image: require("../../../assets/images/image-slide-2.png"),
                        },
                        {
                            id: 2,
                            text: "Keeping Small Farms in Business",
                            image: require("../../../assets/images/image-slide-3.png"),
                        },
                    ]}
                    scrollX={scrollX}
                />
            </View>

            {/* Contains the graphics and text  */}
            <Animated.FlatList
                data={[
                    {
                        id: 0,
                        text: "Discover & Connect with Local Farmers",
                        image: require("../../../assets/images/image-slide-1.png"),
                    },
                    {
                        id: 1,
                        text: "Support Your Local Community",
                        image: require("../../../assets/images/image-slide-2.png"),
                    },
                    {
                        id: 2,
                        text: "Keeping Small Farms in Business",
                        image: require("../../../assets/images/image-slide-3.png"),
                    },
                ]}
                renderItem={({ item }: { item: carouselItem }) => (
                    <Slide item={item} />
                )}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                overScrollMode="never"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    carouselFrameImageContainer: {
        // backgroundColor: "black",
        width: "100%",
        height: 600,
        position: "absolute",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    carouselFrameImage: {
        // backgroundColor: "red",
        width: "100%",
        height: 300,
        maxHeight: screenDimensions.height - 500,
        marginTop: 20,
        objectFit: "contain",
    },
    carouselContainer: {
        width: "100%",
        flex: 1,
    },
});
