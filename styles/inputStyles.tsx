import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
  input: {
    height: 50, 
    margin: 12,
    width: 300,  
    borderRadius: 25, 
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: 'white', 
    color: '#666', 
    borderWidth: 2,
    borderColor: 'purple', 
    shadowColor: 'purple', 
    shadowOffset: { width: 2, height: 1 }, 
    shadowOpacity: 0.6, 
    shadowRadius: 4, 
    elevation: 4,
    
  },

  label: {
    fontSize: 18,
    marginLeft:25,
    color:"#666",
    marginBottom: -10,
    
    

  },
  icon: {
    color:'purple',
    
  },
  container:{
  display: 'flex',
  justifyContent:'center',

  }


});

