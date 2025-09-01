import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const mockHabits = [
  { id: "1", title: "Drink 2L Water", completed: false },
  { id: "2", title: "Read 10 pages", completed: true },
  { id: "3", title: "Walk 5000 steps", completed: false },
];

export default function HabitScreen() {
  const [habits, setHabits] = useState(mockHabits);

  const toggleHabit = (id) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Habits</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleHabit(item.id)}>
            <Text style={[styles.habit, item.completed && styles.completed]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  habit: { fontSize: 18, padding: 10 },
  completed: { textDecorationLine: "line-through", color: "gray" },
});
