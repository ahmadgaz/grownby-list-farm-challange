import { Platform } from "react-native";
import ListMobile from "@/components/mobile/list/list";
import ListWeb from "@/components/web/list/list";

let List;

if (Platform.OS === "web") {
    List = ListWeb;
} else {
    List = ListMobile;
}

export default List;
