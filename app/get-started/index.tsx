import { Platform } from "react-native";
import GetStartedMobile from "@/components/mobile/get-started/getStarted";
import GetStartedWeb from "@/components/web/get-started/getStarted";

let GetStarted;

if (Platform.OS === "web") {
    GetStarted = GetStartedWeb;
} else {
    GetStarted = GetStartedMobile;
}

export default GetStarted;
