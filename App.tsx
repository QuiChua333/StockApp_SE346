import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import StockButton from './src/components/StockButton';
import API from './src/config';

interface AppState {
  stockName: string;
  stockIndex: string;
  stockChangeRaw: string;
  stockChangePercent: string;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stockName: '-',
      stockIndex: '0.00',
      stockChangeRaw: '0.00',
      stockChangePercent: '0.00',
    };

    this.changeIndex = this.changeIndex.bind(this);
    this.changeIndex('NASDAQ', 'IXIC');
  }

  async changeIndex(name: string, code: string) {
    console.log(code);
    let res = await API(code);
    this.setState({
      stockName: name,
      stockIndex: res.stockIndex.toFixed(2),
      stockChangeRaw:
        res.stockChangeRaw > 0
          ? '+' + res.stockChangeRaw.toFixed(2)
          : res.stockChangeRaw.toFixed(2),
      stockChangePercent:
        res.stockChangePercent > 0
          ? '+' + res.stockChangePercent.toFixed(2)
          : res.stockChangePercent.toFixed(2),
    });
  }

  render() {
    const colorStyle =
      this.state.stockChangeRaw[0] === '+' ? {color: 'green'} : {color: 'red'};

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.stockName}>{'21521252_StockApp'}</Text>
          <Text style={styles.stockName}>{this.state.stockName}</Text>
          <Text style={styles.stockNumber}>{this.state.stockIndex}</Text>
          <Text style={[styles.stockChange, colorStyle]}>
            {this.state.stockChangeRaw} ({this.state.stockChangePercent}%)
          </Text>
        </View>
        <View style={styles.footer}>
          <StockButton
            name="S&P"
            code="SPX"
            onPress={this.changeIndex}></StockButton>
          <StockButton
            name="NASDAQ"
            code="IXIC"
            onPress={this.changeIndex}></StockButton>
          <StockButton
            name="Dow Jones"
            code="DJI"
            onPress={this.changeIndex}></StockButton>
          <StockButton
            name="Amazon"
            code="AMZN"
            onPress={this.changeIndex}></StockButton>
          <StockButton
            name="Apple"
            code="AAPL"
            onPress={this.changeIndex}></StockButton>
          <StockButton
            name="Google"
            code="GOOG"
            onPress={this.changeIndex}></StockButton>
          <StockButton
            name="Microsoft"
            code="MSFT"
            onPress={this.changeIndex}></StockButton>
          <StockButton
            name="Facebook"
            code="FB"
            onPress={this.changeIndex}></StockButton>
          <StockButton
            name="Alibaba"
            code="BABA"
            onPress={this.changeIndex}></StockButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stockName: {
    fontSize: 38,
  },
  stockNumber: {
    fontSize: 80,
  },
  stockChange: {
    fontSize: 40,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
