import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from '../Redux/taskSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KanbanColumn = ({ columnId, title }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Hook for navigation
  const tasks = useSelector((state) => state.tasks.columns.find(column => column.id === columnId)?.tasks || []);

  const toggleCollapse = () => setCollapsed(!collapsed);


  const addNewTask = () => {
    if (newTaskName.trim()) {
      const newTask = {
        id: Date.now(),
        name: newTaskName,
        desc: '',
        comments: [],
        attachments: [],
      };
      dispatch(addTask({ columnId, task: newTask }));
      setNewTaskName('');
   
    }
  };
  
  const deleteTaskByIndex = (index) => {
    dispatch(deleteTask({ columnId, taskIndex: index }));
  };

  const clearStorage = async () => {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared');
  };
  
  clearStorage();

  const navigateToTaskDetail = (item, index) => {
    navigation.navigate('Tasks Detail', { columnId, task: item, taskIndex: index });
  };

  return (
    <View style={{ margin: 10, padding: 10, backgroundColor: '#fff' }}>
      <TouchableOpacity onPress={toggleCollapse}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => navigateToTaskDetail(item, index)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTaskByIndex(index)}>
                <Text style={{ color: 'red' }}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TextInput
          placeholder="Task Name"
          value={newTaskName}
          onChangeText={setNewTaskName}
          style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        />
        <Button title="Add Task" onPress={addNewTask} />
      </Collapsible>
    </View>
  );
};

export default KanbanColumn;
