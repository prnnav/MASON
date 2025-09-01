import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function PremiumScreen({ route, navigation }) {
  const { credits, setCredits } = route.params;

  const unlockFeature = () => {
    if(credits >= 50){
      setCredits(prev => prev - 50);
      alert('✅ Premium Feature Unlocked!');
    } else {
      alert('Not enough credits! Complete habits/interactions to earn more.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premium Feature Demo</Text>
      <Text>Credits Available: {credits}</Text>
      <Text>Unlock Premium for 50 credits (extra call minutes/custom voice)</Text>
      <Button title="Unlock Premium" onPress={unlockFeature} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20, textAlign:'center' }
});
