import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

interface StockButtonProps {
  name: string;
  code: string;
  onPress: (name: string, code: string) => void;
}

class StockButton extends Component<StockButtonProps> {
  onPress = () => {
    const {name, code, onPress} = this.props;
    onPress(name, code);
  };

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.onPress}>
        <Text style={styles.buttonText}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
  },
  button: {
    margin: 10,
    borderWidth: 1,
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
});

export default StockButton;
