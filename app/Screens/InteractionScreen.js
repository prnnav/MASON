import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function InteractionScreen({ route }) {
  const { addCredits } = route.params;
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [match, setMatch] = useState(null);

  const profiles = [{name:'Alex', interest:'Reading'}, {name:'Sam', interest:'Fitness'}];

  const sendMessage = () => {
    if(userMessage.trim() === '') return;
    const response = `AI Companion: I hear you! You said "${userMessage}"`;
    setAiResponse(response);
    Speech.speak(response);
    setUserMessage('');
    addCredits(20); // Add 20 credits per interaction
  };

  const simulateMatch = () => {
    const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
    setMatch(randomProfile);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Interaction + Matchmaking Demo</Text>
      <TextInput
        placeholder="Type your message"
        value={userMessage}
        onChangeText={setUserMessage}
        style={styles.input}
      />
      <Button title="Send Message" onPress={sendMessage} />
      {aiResponse ? <Text style={styles.response}>{aiResponse}</Text> : null}
      <View style={{ marginTop:30 }}>
        <Button title="Simulate Match" onPress={simulateMatch} />
        {match && <Text style={styles.match}>Matched with {match.name}, Interest: {match.interest}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:22, fontWeight:'bold', marginBottom:20 },
  input: { borderWidth:1, padding:10, marginBottom:10, borderRadius:5 },
  response: { marginTop:20, fontSize:18, color:'blue' },
  match: { marginTop:10, fontSize:18, color:'purple', fontWeight:'bold' }
});
