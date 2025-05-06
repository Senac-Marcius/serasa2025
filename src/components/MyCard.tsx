import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface MyCardProps {
    icon: string;
    title: string;
    description: string;
    color: string;
    style?: ViewStyle | ViewStyle[];
}

const MyCard: React.FC<MyCardProps> = ({ icon, title, description, color, style }) => {
    return (
        <View style={[styles.card, { borderLeftColor: color }, style]}>
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
                <Icon name={icon} size={28} color="#fff" />
            </View>
            <Text style={[styles.title, { color }]}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

export default MyCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        width: 250,
        borderLeftWidth: 4,
        margin: 8,
        maxWidth:240,
        maxHeight:170,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: '#666',
    },
});
