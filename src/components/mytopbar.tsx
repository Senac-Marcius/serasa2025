import { ReactNode } from 'react';
import { View} from 'react-native';

interface MyTopbarProps {
    children: ReactNode

}

const MyTopbar: React.FC<MyTopbarProps > = ({children}) => {
    return (<View>{children}</View>); 

}

export default MyTopbar 