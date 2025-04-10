import React from 'react';
import { FlatList, ViewStyle } from 'react-native';

interface MyListProps {
    data: any[];
    style?: ViewStyle;
    renderItem: (args: { [key: string]: any }) => JSX.Element; 
    keyItem: (item: any, index: number) => string;
    numColumns? : number ;

}

const MyList: React.FC<MyListProps> = ({ data,numColumns=1, style, renderItem, keyItem }) => {
    return (
        <FlatList 
            data={data} 
            renderItem={renderItem}
            keyExtractor={keyItem}
            style={style} 
            numColumns = {numColumns}
        />
    );
};

export default MyList;
