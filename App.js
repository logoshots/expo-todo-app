import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View, Platform } from 'react-native';
import { CheckBox, Input, Button } from '@rneui/themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

export default function App() {
  const [tasks, setTasks] = useState([
    { key: "1", description: "Task1", completed: false },
    { key: "2", description: "Task2", completed: true },
  ]);
  const [newTask, setNewTask] = useState("");

  const toggleTask = (key) => {
    const updatedTasks = tasks.map(task =>
      task.key === key ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { key: Date.now().toString(), description: newTask, completed: false }]);
    setNewTask("");
  };

  const renderItem = ({ item }) => (
    <CheckBox
      title={item.description}
      checked={item.completed}
      onPress={() => toggleTask(item.key)}
      textStyle={item.completed ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : {}}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Input
          placeholder="New task"
          value={newTask}
          onChangeText={setNewTask}
          containerStyle={{ flex: 1 }}
          onSubmitEditing={addTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
}