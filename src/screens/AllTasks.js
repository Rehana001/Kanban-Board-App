// src/screens/AllTasks.js
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import KanbanColumn from '../components/Kanbancolumn'; // Adjust the path if necessary
import { useDispatch, useSelector } from 'react-redux';
import { setColumns, addTask } from '../Redux/taskSlice'; // Ensure this path is correct
import { moderateScale } from 'react-native-size-matters';

const AllTasks = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.tasks.columns); // Accessing columns from Redux state

  useEffect(() => {
    // Initialize columns is handled in the Redux slice
  }, [dispatch]);

  // Function to add a task in a specific column
  const handleAddTask = (columnId) => {
    const newTask = {
      name: 'New Task',
      desc: 'Task description',
      comments: [],
      attachments: [],
    };
    dispatch(addTask({ columnId, task: newTask }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.KanbanBoardTitle}>Kanban Board</Text>
      {columns.map((column) => (
        <View key={column.id}>
          <KanbanColumn columnId={column.id} title={column.title} />
        </View>
      ))}
    </View>
  );
};

export default AllTasks;


const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:moderateScale(10,0.1)
  },
  KanbanBoardTitle:{
    fontSize:moderateScale(24,0.1),
    color:'black',
    fontWeight:'bold'
  }
})
