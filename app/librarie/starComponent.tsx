import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface StarComponentProps {
  rating: number;  // Define que a propriedade rating deve ser um número
}

const StarComponent: React.FC<StarComponentProps> = ({ rating }) => {
    const renderStars = (rating: number) => {
        let stars = [];
        
        for (let i = 1; i <= 5; i++) {
          if (i <= Math.floor(rating)) {
            stars.push(<Ionicons key={i} name="star" style={styles.filledStar} />); 
          } else if (i === Math.floor(rating) + 1 && rating % 1 !== 0) {
            stars.push(<Ionicons key={i} name="star-half" style={styles.filledStar} />); 
          } else {
            stars.push(<Ionicons key={i} name="star-outline" style={styles.emptyStar} />); 
          }
        }
      
        return stars;
      };
  return (
    <View>
      <Text style={styles.text} >Avaliação:</Text>
      <View style={{ flexDirection: 'row' }}>
        {renderStars(rating)}
      </View>
    </View>
  );
};

const styles=StyleSheet.create({
    text:{
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
    },
    
    filledStar: {
        color: '#FFD700',
        fontSize: 35,
        marginHorizontal: 5,
    },
    emptyStar: {
        color: 'grey',
        fontSize: 35,
        marginHorizontal: 5,
    }
})

export default StarComponent;