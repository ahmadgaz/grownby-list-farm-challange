import { Platform } from "react-native";
import AuthMobile from "@/components/mobile/auth/auth";
import AuthWeb from "@/components/web/auth/auth";

let Auth;

if (Platform.OS === "web") {
    Auth = AuthWeb;
} else {
    Auth = AuthMobile;
}

export default Auth;
