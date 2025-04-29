import React, { ReactNode } from 'react';
import { Text, TextStyle,StyleSheet } from 'react-native';

type TextType =
| "text"
| "login"
| "title"
| "buttonMenores"
| "buttonMaiores"
| "label"
| "help"
| "textBody"
| "titleTopbar";

interface MytextProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[]; 
  type?: TextType;
}

function getType(type: string): any{
  switch(type){
    case 'login':
      return textStyles.login;
    case 'text':
      return textStyles.text;
    case 'title':
      return textStyles.title;
    case 'buttonMenores':
      return textStyles.buttonMenores;
    case 'buttonMaiores':
      return textStyles.buttonMaiores;
    case 'label':
      return textStyles.label;
    case 'help':
      return textStyles.help;
    case 'textBody':
      return textStyles.textBody;
    case 'titleTopbar':
      return textStyles.titleTopbar;

//
  }
}

const Mytext: React.FC<MytextProps> = ({ children, style, type }) => {
  return <Text style={[
    type? 
      getType(type)
    : textStyles.text, 
    style]}>{children}</Text>;
};

export const textStyles = StyleSheet.create({
  text: {
    fontSize: 36,
    fontFamily: 'Poppins_400Regular',
  },
  login: {
    fontSize: 36,
    fontFamily: 'Poppins_400Regular',
    
  },
  title: {
    fontSize: 36,
    fontFamily: 'Poppins_400Regular',
    
  },
  buttonMenores: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    
  },
  buttonMaiores: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',

  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    
  },
  help: {
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
    
  },
  textBody: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    
  }, 
  titleTopbar: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    
  },
});

export default Mytext;
