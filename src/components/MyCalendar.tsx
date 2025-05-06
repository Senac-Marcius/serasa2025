import React, { useState }  from "react";
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import { Myinput } from "./MyInputs";

const [date, setDate] = useState(new Date().toISOString().split('T')[0]);


interface MyCalendarProps {
    value:string;
    date?: string;
    setDate(date:string): void;
    iconName?: React.ReactNode;
    label: string;
    placeholder: string;
  
}

const MyCalendar : React.FC<MyCalendarProps> = ({ date, setDate, iconName, label, placeholder }) => {
    const [open, setOpen] = useState(false);

    function setAuxDate(date:Date | undefined){
        if(date)
            setDate(date.toISOString().split('T')[0])
    }
    

return (
    <View>
        <DatePickerModal
            locale="pt"
            mode="single"
            visible={open}
            onDismiss={() => setOpen(false)}
            date={date? new Date(date): new Date()}
            onConfirm={(params) => {
                setAuxDate(params.date);
                setOpen(false);
            }}
        />
        {date && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=> {setOpen(true)}}>
            
             <Myinput
                value={`${placeholder} ${date}`}
                onChangeText={(newDate) => setDate(newDate)}
                label={label}
                iconName= "book"
                placeholder={placeholder}
              />
        
            </TouchableOpacity>
            </View>
        )}
    </View>
)};


export default MyCalendar
//CORRETO