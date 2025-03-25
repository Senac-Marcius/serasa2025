import { View } from 'native-base';
import { Text, ViewStyle, ScrollView } from 'react-native';
import React, {ReactNode, useState }  from "react";
import { DatePickerModal } from 'react-native-paper-dates';
import { useRouter } from 'expo-router';

export default function LoanScreen() {
    const router = useRouter();

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [open, setOpen] = useState(false);
}

/*interface MyCalendarProp { //teste aula
    style: ViewStyle;
    children: ReactNode;
} */
interface CalendarDate {
    year: number;
    month: number;
    day: number;
  }
  const [calendarDate, setCalendarDate] = useState<CalendarDate | null>(null); //tipo modificado para aceitar valores nulos

// Tipagem para o modal de data
interface MyCalendarProps {
    date?: string;
    setDate(date:String | undefined): void;
}

const MyCalendar : React.FC<MyCalendarProps> = ({ date, setDate }) => {
    const [open, setOpen] = useState(false);

return (
    <ScrollView>
    <View>

        <DatePickerModal
            locale="pt"
            mode="single"
            visible={open}
            onDismiss={() => setOpen(false)}
            date={date? new Date(date): new Date()}
            onConfirm={(params) => {
                setDate(params.date?.toString());
                setOpen(false);
            }}
        />

        {date && (
            <Text>{`Data Selecionada: ${date}`}</Text> //está exibindo um texto em um componente React Native usando a tag <Text>
        )}
    </View>
    </ScrollView>
)};


/*const MyCalendar: React.FC <MyCalendarProp> = ({children, style}) => { //teste aula
    return (
        <View style={style}>
        <Text>ola componente</Text>
        {children}
        </View>
    );
}
const MyCalendar2 = () => { //teste aula
    return (
        <Text>ola componente2</Text>
        
    );
}*/

export {MyCalendar}