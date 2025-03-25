import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
  input: {
    height: 50, 
    margin: 10,
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

  icon: {
    color:'purple',
    fontSize: 18   
  },
  container:{
  display: 'flex',
  justifyContent:'center',

  },
  
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom:20
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    
  },
  checkboxChecked: {
    backgroundColor: 'purple',
    borderColor: 'purple',
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },

  textArea: {
    height: 150,  
    margin: 10,
    width: 300,
    borderRadius: 10,    
    paddingHorizontal: 15,
    paddingVertical: 10,  
    fontSize: 16,
    backgroundColor: 'white',
    color: '#666',
    borderWidth: 2,
    borderColor: 'purple',
    shadowColor: 'purple',
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
 label:{
  fontSize: 16,  // Aumentei para garantir alinhamento com o ícone
  color: "#666",
  marginLeft: 5
 },

 labelContainer: {
  flexDirection: 'row', 
  alignItems: 'center', 
  marginLeft: 20, 
  marginBottom: 0, 
}

});
