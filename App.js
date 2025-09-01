import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 Shipathon App</Text>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Loneliness")}
      >
        <Text style={styles.cardText}>👋 Fight Loneliness</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Habits")}
      >
        <Text style={styles.cardText}>📅 Build Habits</Text>
      </TouchableOpacity>
    </View>
  );
}

function LonelinessScreen() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi! I’m your AI buddy 👋" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { id: Date.now().toString(), text: input }]);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 Chat with AI Buddy</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.chatMessage}>👉 {item.text}</Text>}
        style={{ width: "100%", padding: 10 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

function HabitsScreen() {
  const [habits, setHabits] = useState([
    { id: "1", text: "Drink water 💧" },
    { id: "2", text: "Exercise 🏋️‍♂️" },
  ]);
  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {
    if (newHabit.trim() === "") return;
    setHabits([...habits, { id: Date.now().toString(), text: newHabit }]);
    setNewHabit("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Habit Tracker</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.habitItem}>✅ {item.text}</Text>}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new habit..."
          value={newHabit}
          onChangeText={setNewHabit}
        />
        <Button title="Add" onPress={addHabit} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Loneliness" component={LonelinessScreen} />
        <Stack.Screen name="Habits" component={HabitsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  cardText: { color: "white", fontSize: 18, fontWeight: "bold" },
  chatMessage: { fontSize: 16, marginVertical: 5 },
  habitItem: { fontSize: 16, marginVertical: 5 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});
