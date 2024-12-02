import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Birth = ({ navigation }) => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');

    const [yearOpen, setYearOpen] = useState(false);
    const [monthOpen, setMonthOpen] = useState(false);
    const [dayOpen, setDayOpen] = useState(false);

    const [isEdited, setIsEdited] = useState(false);

    const years = Array.from({ length: 100 }, (_, i) => ({
        label: `${2024 - i}`,
        value: `${2024 - i}`
    }));

    const months = Array.from({ length: 12 }, (_, i) => ({
        label: `${(i + 1).toString().padStart(2, '0')}`,
        value: `${(i + 1).toString().padStart(2, '0')}`
    }));

    const [days, setDays] = useState([]);

    // 윤년 여부 확인
    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    // month와 year에 따라 days 배열 업데이트
    useEffect(() => {
        if (month && year) {
            let dayCount;
            if (['01', '03', '05', '07', '08', '10', '12'].includes(month)) {
                dayCount = 31;
            } else if (['04', '06', '09', '11'].includes(month)) {
                dayCount = 30;
            } else if (month === '02') {
                dayCount = isLeapYear(parseInt(year)) ? 29 : 28;
            }
            setDays(Array.from({ length: dayCount }, (_, i) => ({
                label: `${(i + 1).toString().padStart(2, '0')}`,
                value: `${(i + 1).toString().padStart(2, '0')}`,
            })));
        } else {
            setDays([]);
        }
    }, [month, year]);

    // 생년월일을 XXXX.XX.XX 형식으로 변환
    const formatDisplayBirth = () => {
        return `${year}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
    };

    // UserProfile에 전달할 생년월일 데이터
    const handleSave = () => {
        const formattedBirth = formatDisplayBirth();
        navigation.navigate('UserProfile', {
            updatedBirthDate: formattedBirth,
        });

        setIsEdited(false);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                isEdited ? (
                    <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
                        <Text style={styles.headerButtonText}>확인</Text>
                    </TouchableOpacity>
                ) : null
            ),
        });
    }, [navigation, year, month, day]);

    const closeDropdowns = () => {
        setYearOpen(false);
        setMonthOpen(false);
        setDayOpen(false);
    };

    return (
        <TouchableWithoutFeedback onPress={closeDropdowns}>
            <View style={styles.container}>
                <DropDownPicker
                    open={yearOpen}
                    value={year}
                    items={years}
                    setOpen={setYearOpen}
                    setValue={(value) => {
                        if (value !== year) {
                            setYear(value);
                            setYearOpen(false);
                            setIsEdited(true);
                        }
                    }}
                    onOpen={() => {
                        setMonthOpen(false);
                        setDayOpen(false);
                    }}
                    placeholder="년도"
                    style={styles.dropdown}
                    containerStyle={styles.dropdownContainer}
                    dropDownContainerStyle={styles.dropdownItemContainer}
                    dropDownDirection="BOTTOM"
                />
                <DropDownPicker
                    open={monthOpen}
                    value={month}
                    items={months}
                    setOpen={setMonthOpen}
                    setValue={(value) => {
                        if (value !== month) {
                            setMonth(value);
                            setMonthOpen(false);
                            setIsEdited(true);
                        }
                    }}
                    placeholder="월"
                    style={styles.dropdown}
                    containerStyle={styles.dropdownContainer}
                    dropDownContainerStyle={styles.dropdownItemContainer}
                    dropDownDirection="BOTTOM"
                />
                <DropDownPicker
                    disabled={!month || !year}
                    open={dayOpen}
                    value={day}
                    items={days}
                    setOpen={setDayOpen}
                    setValue={(value) => {
                        if (value !== day) {
                            setDay(value);
                            setDayOpen(false);
                            setIsEdited(true);
                        }
                    }}
                    placeholder="일"
                    style={styles.dropdown}
                    containerStyle={styles.dropdownContainer}
                    dropDownContainerStyle={styles.dropdownItemContainer}
                    dropDownDirection="BOTTOM"
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20,
        backgroundColor: "#FFF",
    },
    dropdownContainer: {
        width: "30%",
        backgroundColor: "F5F9FD",
    },
    dropdownItemContainer: {
        backgroundColor: "#F5F9FD",
        borderWidth: 0,
    },
    dropdown: {
        backgroundColor: "#FFF",
        borderColor: "#E5E5E5",
    },
    headerButton: {
        marginRight: 20,
    },
    headerButtonText: {
        fontSize: 16,
        color: "#007AFF",
    },
});

export default Birth;