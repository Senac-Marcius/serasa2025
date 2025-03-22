import React, {ReactNode} from "react";
import {Text, View, ViewStyle } from "react-native";

    interface MyvoltarProps {
        style:ViewStyle;
        children: ReactNode;
    }

    const Myvoltar: React.FC<MyvoltarProps> =  ({children, style}) => {
        return (
            TouchableOpacity
        );
    }

    export default Myvoltar
      



   