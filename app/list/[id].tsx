import { Platform } from "react-native";
import IdMobile from "@/components/mobile/id/id";
import IdWeb from "@/components/web/id/id";

let Id;

if (Platform.OS === "web") {
    Id = IdWeb;
} else {
    Id = IdMobile;
}

export default Id;
