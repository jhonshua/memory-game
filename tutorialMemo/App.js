import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import Card from './Card'

const cards = [
  // ""👻"",
  // "🗣️",
  // "🦷",
  // "🍑",
  // "🌪️",
  // "🌎",
  "🐷",
  "🍑",
  "⚛️",
  "🔑",
  "🥕",
  "🥑",
  // "👻",
  // "🥶",
  // "🥵",
];

export default function App() {

const [board, setBoard] = React.useState(() => shuffle([...cards, ...cards]));
const [selectedCards, setSelectedCards] = React.useState ([]);
const [matchedCards, setMatchedCards] = React.useState ([]);
const [score, setScore] = React.useState(0);

React.useEffect(()=>{
  if(selectedCards.length < 2) return;
  if(board[selectedCards [0]] === board[selectedCards[1]]){
    setMatchedCards([...matchedCards, ...selectedCards]);
    setSelectedCards([]);
  }else{
    const timeoutId = setTimeout(() => setSelectedCards([]),1000);
    return () => clearTimeout(timeoutId);
  }
},[selectedCards])

const handleTapCard = index => {
  if(selectedCards.length >= 2 || selectedCards.includes(index)) return;
  setSelectedCards([...selectedCards, index]);
  setScore(score+1);

}

const didPlayerWin = () => matchedCards.length === board.length;

const resetGame =() =>{
  setMatchedCards([]);
  setScore(0);
  setSelectedCards([]);

}

  return (
    <View style={styles.container}>
      <Text style={styles.titel}>   {didPlayerWin() ? "Congratulations 🎉" : "Memory"}</Text>
      <Text style={styles.titel}> {score}</Text>
      <View style={styles.board}>
        {board.map((card, index) => {
          const isTurnedOver = selectedCards.includes(index)||matchedCards.includes(index);
        
          return (
          <Card key={index}
          isTurnedOver = {isTurnedOver}
          onPress={() => handleTapCard(index)}
          >{card}</Card> 
        )   
      })} 
      </View>
      {didPlayerWin() && <Button 
      onPress={() =>{
        resetGame()
      }}
      title="reset"
      />}      
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titel:{
    fontSize:25,
    color:'white',
    fontWeight:'900',
  },
  board:{
    flexDirection:"row",
    flexWrap:'wrap',
    justifyContent:'center',

  },
});



/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}