import React, { useState }  from "react";
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import { FaCalendarDays } from "react-icons/fa6";
import { Myinput } from "./MyInputs";

const [date, setDate] = useState(new Date().toISOString().split('T')[0]);


interface MyCalendarProps {
    date?: string;
    setDate(date:string): void;
    icon: React.ReactNode;
  
}

const MyCalendar : React.FC<MyCalendarProps> = ({ date, setDate, icon }) => {
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
                value={`Data: ${date}`}
                onChangeText={(newDate) => setDate(newDate)}
                label= {"Digite a Data:"}
                iconName= "square"
              />
              <FaCalendarDays style={{ marginRight: "8px" }} />
            </TouchableOpacity>
            </View>
        )}
    </View>
)};


export default MyCalendar