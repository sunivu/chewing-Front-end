import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Switch, Animated, Keyboard, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import Chevron from '../../assets/chevron-double-right.svg';
import ClockIcon from '../../assets/clock.svg';
import Alarm from '../../assets/alarm.svg';
import Marker from '../../assets/marker.svg';
import Memo from '../../assets/memo.svg';
import { FAB } from 'react-native-paper';

const Plan = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState({});
  const [selectedTask, setSelectedTask] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    name: '',
    start: new Date(),
    end: new Date(),
    memo: '',
    location: ''
  });
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isAlarmModalVisible, setAlarmModalVisible] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState('30분 전');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const FlatListRef = useRef(null);
  const scrollViewRef = useRef(null);
  const daysInWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const today = new Date().toLocaleDateString('ko-KR');

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const previousMonth = new Date(year, month - 1, 1);
    const nextMonth = new Date(year, month + 1, 1);

    const days = [];
    const previousMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth.getDay() - 1; i >= 0; i--) {
      days.push({
        date: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), previousMonthLastDay - i),
        currentMonth: false,
      });
    }
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      days.push({ date: new Date(year, month, day), currentMonth: true });
    }
    const remainingDays = 7 - (days.length % 7);
    for (let i = 1; i <= (remainingDays === 7 ? 0 : remainingDays); i++) {
      days.push({ date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i), currentMonth: false });
    }
    return days;
  };

  const [days, setDays] = useState(getDaysInMonth(currentDate));
  const getDayOfWeek = (date) => daysInWeek[date.getDay()];

  useEffect(() => {
    setDays(getDaysInMonth(currentDate));
  }, [currentDate]);

  // 모달을 닫을 때 값을 초기화하는 함수
  const resetModalState = () => {
    setTaskDetails({
      name: '',
      start: new Date(),
      end: new Date(),
      memo: '',
      location: '',
    });
    setIsAllDay(false);
    setSelectedTask(false);
    setEditMode(false);
  };

  //일정 추가인지 수정인지에 따라 버튼 작동을 결정하는 함수
  const handleFabClick = () => {
    const updatedDateKey = taskDetails.start.toLocaleDateString('ko-KR');
    const originalDateKey = selectedDate?.toLocaleDateString('ko-KR') || today;

    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      if (isEditMode) {
        if (updatedTasks[originalDateKey]) {
          updatedTasks[originalDateKey] = updatedTasks[originalDateKey].filter(
            (task) => task !== selectedTask
          );
          if (updatedTasks[originalDateKey].length === 0) {
            delete updatedTasks[originalDateKey];
          }
        }
      }
      if (!updatedTasks[updatedDateKey]) {
        updatedTasks[updatedDateKey] = [];
      }
      updatedTasks[updatedDateKey].push({ ...taskDetails });

      return updatedTasks;
    });

    resetModalState();
    setModalVisible(false);
    setEditMode(false);
  };


  // 설정된 날짜와 시간의 유효성을 검사하는 함수
  const isFabDisabled = () => {
    if (!taskDetails.name) return true;
    if (taskDetails.start > taskDetails.end) return true;
    if (
      taskDetails.start.toDateString() === taskDetails.end.toDateString() &&
      taskDetails.start.getTime() >= taskDetails.end.getTime()
    ) {
      return true;
    }
    return false;
  };

  /*
   * 모달이 열릴 때마다 taskDetails를 초기값을 설정하는 함수
   * 일정을 수정하는 경우에는 일정의 정보를 불러와서 설정
   * 일정을 추가하는 경우에는 선택된 날짜가 없을 경우 오늘 날짜로 설정함.
   * 이때 종료시간은 시작시간의 + 1시간을 기본값으로 시작함.
   */
  useEffect(() => {
    if (isModalVisible) {
      if (isEditMode) {
        setTaskDetails(selectedTask);
      } else {
        const start = selectedDate || new Date();
        const end = new Date(start);
        end.setHours(start.getHours() + 1);
        setTaskDetails({
          start,
          end,
          memo: '',
          location: '',
        });
      }
    }
  }, [isModalVisible, isEditMode, selectedDate, selectedTask]);

  useEffect(() => {
    console.log("Updated TaskDetails:", taskDetails);
  }, [taskDetails]);



  // 수정하려는 값에 따라 그에 맞는 Picker를 띄우는 함수
  const handlePickerConfirm = (value) => {
    setTaskDetails((prev) => {
      console.log("Previous taskDetails:", prev);
      console.log("Picker Value:", value);

      if (pickerMode === 'startDate') {
        const newStart = new Date(value);
        newStart.setHours(prev.start.getHours(), prev.start.getMinutes());
        console.log("Updated Start:", newStart);
        return { ...prev, start: newStart };
      } else if (pickerMode === 'endDate') {
        const newEnd = new Date(value);
        newEnd.setHours(prev.end.getHours(), prev.end.getMinutes());
        console.log("Updated End:", newEnd);
        return { ...prev, end: newEnd };
      } else if (pickerMode === 'startTime') {
        const updatedStart = new Date(prev.start);
        updatedStart.setHours(value.getHours(), value.getMinutes());
        console.log("Updated Start Time:", updatedStart);
        return { ...prev, start: updatedStart };
      } else if (pickerMode === 'endTime') {
        const updatedEnd = new Date(prev.end);
        updatedEnd.setHours(value.getHours(), value.getMinutes());
        console.log("Updated End Time:", updatedEnd);
        return { ...prev, end: updatedEnd };
      }
      return prev;
    });

    setPickerVisible(false);
  };


  const handleDeleteTask = () => {
    const dateKey = selectedDate.toLocaleDateString('ko-KR');
    const updatedTasks = { ...tasks };
    delete updatedTasks[dateKey];
    setTasks(updatedTasks);
    setDropdownVisible(false);
    setModalVisible(false);
  };



  const toggleSwitch = () => {
    setIsAllDay(previousState => !previousState);

    //스우치가 On이 되면 시작 시간은 00:00, 종료 시간은 23:59로 설정
    if (!isAllDay) {
      setTaskDetails((prev) => ({
        ...prev,
        start: new Date(
          prev.start.getFullYear(),
          prev.start.getMonth(),
          prev.start.getDate(),
          0,
          0
        ),
        end: new Date(
          prev.end.getFullYear(),
          prev.end.getMonth(),
          prev.end.getDate(),
          23,
          59
        ),
      }));

      Animated.timing(animatedValue, {
        toValue: isAllDay ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start();

    }
  };

  // FAB 버튼이 키보드가 활성화 되었을 때 항상 키보드 위에 위치하도록 하는 함수
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={() => {}} style={{ paddingRight: 16 }}>
                <MaterialIcons name="more-horiz" size={24} color="#000" />
            </TouchableOpacity>
        ),
    });
}, [navigation, isMenuVisible]);

  /*
   * 달력을 렌더링하는 함수 
   * 우선은 최대 3개의 일정을 보여주고
   * 그 이외의 일정은 +n으로 표시
   * 생성한 일정에 컬러를 지정하고 달력에 표시하는 건 시간이 좀 걸릴 것 같음...
   */
  const renderDay = ({ item }) => {
    const dateKey = item.date.toLocaleDateString('ko-KR');
    const isSelected = dateKey === (selectedDate && selectedDate.toLocaleDateString('ko-KR'));
    const isToday = dateKey === today;
    const hasTask = tasks[dateKey] && tasks[dateKey].length > 0;

    return (
      <TouchableOpacity
        style={[
          styles.dayContainer,
          isToday && styles.todayBorder,
          isSelected && styles.selectedDay,
        ]}
        onPress={() => {
          console.log("Selected Date:", item.date);
          setSelectedDate(item.date);
          if (FlatListRef.current) {
            FlatListRef.current.scrollToIndex({
              index: Math.floor(days.indexOf(item) / 7),
            });
          }
        }}
        disabled={!item.currentMonth}
      >
        <Text
          style={[
            styles.dayText,
            !item.currentMonth && styles.nonCurrentMonthText,
            item.date.getDay() === 0 && { color: 'red' },
            item.date.getDay() === 6 && { color: 'blue' },
          ]}
        >
          {item.date.getDate()}
        </Text>
        {hasTask && item.currentMonth && (
          <View style={styles.taskIndicatorContainer}>
            {tasks[dateKey]
              .slice(0, 3) // 최대 3개의 일정만 표시 나머지는 +n으로 표시
              .map((task, index) => (
                <Text key={index} style={styles.taskIndicatorText} numberOfLines={1} ellipsizeMode="tail">
                  {task.name}
                </Text>
              ))}
            {tasks[dateKey].length > 3 && (
              <Text style={styles.moreTasksIndicator}>+{tasks[dateKey].length - 3}</Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </Text>
      </View>

      <View style={styles.weekHeader}>
        {daysInWeek.map((day, index) => (
          <Text
            key={index}
            style={[
              styles.weekDay,
              index === 0 && { color: 'red' },
              index === 6 && { color: 'blue' },
            ]}
          >
            {day}
          </Text>
        ))}
      </View>
      <FlatList
        ref={FlatListRef}
        data={days}
        renderItem={renderDay}
        keyExtractor={(item, index) => index.toString()}
        numColumns={7}
      />
      {selectedDate && tasks[selectedDate.toLocaleDateString('ko-KR')] && (
        <View style={styles.taskListContainer}>
          <ScrollView style={styles.taskScrollView}>
            {tasks[selectedDate.toLocaleDateString('ko-KR')].map((task, index) => (
              <TouchableOpacity
                key={index}
                style={styles.taskItem}
                onPress={() => {
                  setEditMode(true);
                  setSelectedTask(task);
                  setTaskDetails({
                    name: task.name || '',
                    start: new Date(task.start),
                    end: new Date(task.end),
                    memo: task.memo || '',
                    location: task.location || '',
                  });
                  setModalVisible(true);
                }}
              >
                <Text
                  style={styles.taskName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {task.name}
                </Text>
                <Text style={styles.taskTime}>
                  {`${task.start.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })} ~ ${task.end.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}`}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            if (!selectedDate) {
              setSelectedDate(new Date()); // 선택된 날짜가 없을 경우 오늘 날짜로 설정
            }
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>일정 추가</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onSwipeComplete={() => {
            resetModalState();
            setModalVisible(false);
          }}
          swipeDirection={"down"}
          style={{ margin: 0, justifyContent: 'flex-end' }}
        >
          <View style={styles.modalContent}>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={{ paddingBottom: 500, paddingTop: 20 }}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.modalContent}>
                <View style={styles.slideHandle} />
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => {
                    resetModalState();
                    setModalVisible(false);
                  }}
                  >
                    <Icon name="close" size={24} color="9F9F9F" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setDropdownVisible(!isDropdownVisible)}>
                    <MaterialIcons name="more-horiz" size={24} color="9F9F9F" />
                  </TouchableOpacity>
                </View>
                {isDropdownVisible && (
                  <View style={styles.dropdown}>
                    <TouchableOpacity
                      style={styles.dropdownButton}
                      onPress={() => setDeleteModalVisible(!isDeleteModalVisible)}
                    >
                      <Text style={{ ...styles.dropdownText, color: "#F51E52" }}>일정 삭제</Text>
                    </TouchableOpacity>
                    <View style={styles.dropdownDivider} />
                    <TouchableOpacity
                      style={styles.dropdownButton}
                      onPress={() => alert('일정 공유')}
                    >
                      <Text style={{ ...styles.dropdownText, color: "#222" }}>일정 공유</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TextInput
                  style={styles.inputTitle}
                  placeholder="일정 제목"
                  value={taskDetails.name}
                  onChangeText={(text) =>
                    setTaskDetails((prev) => ({ ...prev, name: text }))
                  }
                />
                <View style={styles.timeContainer}>
                  {/* 시작 날짜 */}
                  <View style={styles.dateTimeRow}>
                    <ClockIcon size={20} color="#222" />
                    <TouchableOpacity
                      onPress={() => {
                        setPickerVisible(true);
                        setPickerMode('startDate');
                      }}
                      style={styles.dateButton}
                      disabled={isAllDay}
                    >
                      <Text style={styles.dateText}>
                        {`${taskDetails.start.getFullYear()}.${String(taskDetails.start.getMonth() + 1).padStart(2, '0')}.${String(taskDetails.start.getDate()).padStart(2, '0')} (${getDayOfWeek(taskDetails.start)})`}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      setPickerVisible(true);
                      setPickerMode('startTime');
                    }}
                      style={styles.timeButton}
                      disabled={isAllDay}
                    >
                      <Text style={styles.timeText}>{taskDetails.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: 'false' })}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.dateTimeRow}>
                    <Chevron size={20} color="#222" />
                    <TouchableOpacity onPress={() => {
                      setPickerVisible(true);
                      setPickerMode('endDate');
                    }}
                      style={styles.dateButton}
                      disabled={isAllDay}
                    >
                      <Text style={styles.dateText}>
                        {`${taskDetails.end.getFullYear()}.${String(taskDetails.end.getMonth() + 1).padStart(2, '0')}.${String(taskDetails.end.getDate()).padStart(2, '0')} (${getDayOfWeek(taskDetails.end)})`}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      setPickerVisible(true);
                      setPickerMode('endTime');
                    }}
                      style={styles.timeButton}
                      disabled={isAllDay}
                    >
                      <Text style={styles.timeText}>{taskDetails.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: 'false' })}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <DateTimePickerModal
                  isVisible={isPickerVisible}
                  mode={pickerMode.includes('Date') ? 'date' : 'time'}
                  onConfirm={handlePickerConfirm}
                  onCancel={() => setPickerVisible(false)}
                />
                <View style={styles.isAllDayrow}>
                  <Text style={styles.allDayText}>하루 종일</Text>
                  <Switch
                    trackColor={{ false: "#F1F1F1", true: "#222" }}
                    thumbColor="#FFF"
                    onValueChange={toggleSwitch}
                    value={isAllDay}
                  />
                </View>
                <View style={styles.alarmRow}>
                  <Alarm size={20} color="#222" />
                  <TouchableOpacity onPress={() => setAlarmModalVisible(true)}>
                    <Text style={styles.alarmText}>{selectedAlarm}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.separator} />
                <View style={styles.locationRow}>
                  <Marker size={20} color="#222" />
                  <TextInput
                    style={styles.input}
                    placeholder="위치"
                    placeholderTextColor={'#222'}
                    value={taskDetails.location}
                    onFocus={() => {
                      setTimeout(() => scrollViewRef.current?.scrollTo({ y: 300, animated: true }), 100);
                    }}
                    onBlur={() => {
                      setTimeout(() => scrollViewRef.current?.scrollTo({ y: 0, animated: true }), 100);
                    }}
                    onChangeText={(text) => setTaskDetails((prev) => ({ ...prev, location: text }))}
                  />
                </View>
                <View style={styles.memoRow}>
                  <Memo size={20} color="#222" />
                  <TextInput
                    style={styles.memoInput}
                    placeholder="메모"
                    placeholderTextColor={'#222'}
                    value={taskDetails.memo}
                    onChangeText={(text) => setTaskDetails((prev) => ({ ...prev, memo: text }))}
                    onFocus={() => {
                      setTimeout(() => scrollViewRef.current?.scrollTo({ y: 300, animated: true }), 100);
                    }}
                    onBlur={() => {
                      setTimeout(() => scrollViewRef.current?.scrollTo({ y: 0, animated: true }), 100);
                    }}
                    multiline={true}
                  />
                </View>
                <FAB
                  style={[
                    styles.fabButton,
                    { bottom: isKeyboardVisible ? keyboardHeight - 180 : -150 },
                    isFabDisabled() ? { backgroundColor: '#ccc' } : {}
                  ]}
                  icon="check"
                  color="#FFF"
                  disabled={isFabDisabled()}
                  onPress={handleFabClick}
                />

              </View>
            </ScrollView>
          </View>
        </Modal>
      </KeyboardAvoidingView>
      <Modal visible={isAlarmModalVisible} transparent={true}>
        <TouchableOpacity
          style={styles.alarmModalContainer}
          onPress={() => setAlarmModalVisible(false)}
        >
          <View style={styles.alarmModalContent}>
            <Text style={styles.alarmModalTitle}>알림</Text>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.alarmModalButton}
              onPress={() => {
                setSelectedAlarm("없음");
                setAlarmModalVisible(false);
              }}
            >
              <Text style={styles.alarmModalText}>없음</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.alarmModalButton}
              onPress={() => {
                setSelectedAlarm("30분 전");
                setAlarmModalVisible(false);
              }}
            >
              <Text style={styles.alarmModalText}>30분 전</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.alarmModalButton}
              onPress={() => {
                setSelectedAlarm("1일 전");
                setAlarmModalVisible(false);
              }}
            >
              <Text style={styles.alarmModalText}>1일 전</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.alarmModalButton}
              onPress={() => {
                setSelectedAlarm("1주일 전");
                setAlarmModalVisible(false);
              }}
            >
              <Text style={styles.alarmModalText}>1주일 전</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal visible={isDeleteModalVisible} transparent={true}>
        <View style={styles.deleteContainer}>
          <View style={styles.deleteContent}>
            <Text style={styles.deleteText}>일정을 삭제하시겠습니까?</Text>
            <View style={styles.separator} />
            <View style={styles.deleteButtonContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  setDeleteModalVisible(false);
                  setModalVisible(false);
                  handleDeleteTask();
                }}
              >
                <Text style={styles.deleteButtonText}>삭제</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'left',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#555',
  },
  dayContainer: {
    width: '14.28%',
    height: 80,
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderColor: '#E4E4E4',
  },
  nonCurrentMonthText: {
    opacity: 0.3,
  },
  todayBorder: {
    borderWidth: 2,
    borderColor: '#0F84F4',
    borderRadius: 6,
  },
  selectedDay: {
    backgroundColor: '#0F84F4',
    borderRadius: 6,
  },
  dayText: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    textAlign: 'center',
  },
  taskIndicator: {
    marginTop: 5,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  taskIndicatorText: {
    fontSize: 9,
    fontWeight: 'regular',
    color: '#222',
    marginLeft: 4,
  },
  moreTasksIndicator: {
    fontSize: 9,
    color: '222',
    textAlign: 'center',
    marginTop: 2,
  },
  taskListContainer: {
    marginHorizontal: 20,
  },
  taskScrollView: {
    maxHeight: 200,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#F1F1F1',
    borderRadius: 15,
  },
  taskName: {
    fontSize: 20,
    fontWeight: 'medium',
    color: '#222',
    maxWidth: '50%',
    overflow: 'hidden',
    marginLeft: 10,
  },
  taskTime: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#222',
    marginRight: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalContent: {
    flex: 0.995,
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputTitle: {
    fontSize: 24,
    fontWeight: 'semibold',
    fontColor: '#B3B3B3',
    padding: 10,
    marginBottom: 10,
  },
  input: {
    fontSize: 20,
    fontWeight: 'semibold',
    fontColor: '#222',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButtonContainer: {
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomModal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
    marginTop: 5,
  },
  slideHandle: {
    height: 3,
    width: 50,
    backgroundColor: '#9F9F9F',
    borderRadius: 10,
    alignSelf: 'center',
  },
  dropdown: {
    width: 144,
    height: 59,
    backgroundColor: '#fff',
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    position: 'absolute',
    right: 10,
    top: 50,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButton: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  dropdownText: {
    fontSize: 14,
    textAlign: 'center',
  },
  dropdownDivider: {
    width: '100%',
    backgroundColor: '#D9D9D9',
    height: 1,
    paddingHorizontal: 70,
  },
  deleteContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: -20,
  },
  deleteContent: {
    backgroundColor: '#fff',
    marginHorizontal: 25,
    height: '25%',
    borderRadius: 15,
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20
  },
  deleteButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%',
  },
  deleteButton: {
    width: '100%',
    marginBottom: 20,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: '#F51E52',
  },
  cancelButton: {
    width: '100%',
    marginTop: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: '#222',
  },
  timeContainer: {
    marginVertical: 10,
    marginBottom: 20,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  dateText: {
    fontWeight: 'Medium',
    fontSize: 20,
    color: '#222',
  },
  timeButton: {
    marginHorizontal: 10,
  },
  timeText: {
    fontWeight: 'Medium',
    fontSize: 20,
    color: '#222',
  },
  isAllDayrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  allDayText: {
    fontWeight: 'Medium',
    fontSize: 20,
    color: '#222',
    marginHorizontal: 35,
  },
  alarmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  alarmText: {
    fontWeight: 'Medium',
    fontSize: 20,
    color: '#222',
    marginHorizontal: 10,
  },
  fabButton: {
    position: 'absolute',
    borderRadius: 50,
    right: 20,
    bottom: -150,
    backgroundColor: '#0F84F4',
  },
  alarmModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: -20,
  },
  alarmModalTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#CCC',
  },
  alarmModalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  alarmModalButton: {
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  alarmModalText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222'
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  memoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  memoInput: {
    flex: 1,
    marginLeft: 10,
    marginVertical: -3,
    fontWeight: 'Medium',
    fontSize: 20,
    color: '#222',
    lineHeight: 24,
  },

});


export default Plan;
