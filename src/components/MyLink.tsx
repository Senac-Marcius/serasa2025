import React,{ReactNode} from "react";
import{Text, ViewStyle, View, TouchableOpacity,Linking } from "react-native";

interface MyLinkProps{
    style?: ViewStyle;
    url: string;
    label:string;
}
function openLink(url:string){
    Linking.openURL(url).catch((err) => console.error("Não foi possível abrir a URL", err));
}

const MyLink: React.FC<MyLinkProps> =({style, label, url}) =>{
    return(
        <TouchableOpacity style={style} onPress={() => openLink(url)}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
            {label}
            </Text>
        </TouchableOpacity>
    );
};
export default MyLink
