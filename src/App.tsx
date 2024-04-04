import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  Pressable,
  Vibration,
  Animated,
} from 'react-native';

import DiceOne from '../assets/One.png';
import DiceTwo from '../assets/Two.png';
import DiceThree from '../assets/Three.png';
import DiceFour from '../assets/Four.png';
import DiceFive from '../assets/Five.png';
import DiceSix from '../assets/Six.png';

type DiceProps = {
  imageUrl: ImageSourcePropType;
};

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Dice = ({imageUrl}: DiceProps) => {
  return (
    <View>
      <Image style={styles.diceImage} source={imageUrl} />
    </View>
  );
};

const App = () => {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne);
  const [rolling, setRolling] = useState<boolean>(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const translateXValue = useRef(new Animated.Value(0)).current;

  const rollDiceOnTap = () => {
    if (rolling) return;

    setRolling(true);
    Vibration.vibrate(200);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(translateXValue, {
          toValue: 50,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(translateXValue, {
          toValue: -50,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(translateXValue, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      switch (randomNumber) {
        case 1:
          setDiceImage(DiceOne);
          break;
        case 2:
          setDiceImage(DiceTwo);
          break;
        case 3:
          setDiceImage(DiceThree);
          break;
        case 4:
          setDiceImage(DiceFour);
          break;
        case 5:
          setDiceImage(DiceFive);
          break;
        case 6:
          setDiceImage(DiceSix);
          break;
        default:
          setDiceImage(DiceOne);
          break;
      }
      setRolling(false);
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.diceContainer,
          {transform: [{rotate: spin}, {translateX: translateXValue}]},
        ]}>
        <Dice imageUrl={diceImage} />
      </Animated.View>
      <Pressable onPress={rollDiceOnTap} disabled={rolling}>
        <Text style={[styles.rollDiceBtnText, rolling && styles.disabled]}>
          Roll the dice
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF2F2',
  },
  diceContainer: {
    margin: 12,
  },
  diceImage: {
    width: 200,
    height: 200,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E5E0FF',
    fontSize: 16,
    color: '#8EA7E9',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default App;
