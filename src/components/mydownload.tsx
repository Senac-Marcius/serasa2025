import react, {ReactNode} from 'react';
import { View, ViewStyle } from "react-native";

interface MydownloadProps {
    children: ReactNode;
    style: ViewStyle;
}


const Mydownload: React.FC< MydownloadProps> = ({children, style}) => {
    return (
        <View style= {style}>{children}</View>

    );
}

export default Mydownload