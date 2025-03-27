import React from 'react';
import { FlatList, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface MyListProps {
    data: any[];
    style?: ViewStyle;
    renderItem: (args: { [key: string]: any }) => JSX.Element; 
    keyItem: (item: any, index: number) => string;
}

const MyList: React.FC<MyListProps> = ({ data, style, renderItem, keyItem }) => {
    return (
        <ScrollView>
        <FlatList 
            data={data} 
            renderItem={renderItem}
            keyExtractor={keyItem}
            style={style} 
        />
        </ScrollView>
    );
};

export default MyList;
