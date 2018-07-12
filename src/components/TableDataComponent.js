import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Easing,
  LayoutAnimation
} from 'react-native';

class Table extends Component {
  render() {
    return (
      <View style={[{
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd'
      }, this.props.style]}>
        {
          React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child)
          })
        }
      </View>
    );
  }
}

class Wrapper extends Component {
  render() {
    return (
      <View style={{
        flexDirection: 'row'
      }}>
        {
          React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child)
          })
        }
      </View>
    );
  }
}

const Row=({ data, width=null, height=null }) => (
  <View style={{
    flexDirection: 'row',
    overflow: 'hidden'
  }}>
    {
      data.map((item, i) => {
        return <Cell key={i} data={item} width={width[i]} height={height[i]} />
      })
    }
  </View>
);

const Rows=({ data, width=null, height=null }) => (
  <View>
    {
      data.map((item, i) => {
        return <Row key={i} data={item} width={width} height={height} />
      })
    }
  </View>
);

class Cell extends Component {
  constructor(props) {
    super(props);

    this.state={
      animateOpacityCell: new Animated.Value(0),
      animateCellColor: new Animated.Value(0)
    }
  }

  render() {
    const { data, width=null, height=null }=this.props;
    let splitTextData;
    let cellopacity;
    let cellColor;

    if (/[,]/g.test(data)) {
      splitTextData=data.split(', ');

      this.state.animateOpacityCell.setValue(0);
      this.state.animateCellColor.setValue(0);

      Animated.stagger(200, [
        Animated.timing(this.state.animateOpacityCell, {
          toValue: 1,
          duration: 200
        }),

        Animated.timing(this.state.animateCellColor, {
          toValue: 1,
          duration: 200
        })
      ]).start();

      cellColor=this.state.animateCellColor.interpolate({
         inputRange: [0, 0.4, 0.8, 1],
         outputRange: ['white', 'black', 'gray', 'white']
       });

      cellopacity=this.state.animateOpacityCell.interpolate({
        inputRange: [0.2, 0.5, 1],
        outputRange: [1, 0.5, 1]
      });
    }

    return (
      <Animated.View style={[
        {
          flex: 1,
          justifyContent: 'center',
          padding: 4,
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderColor: '#ddd'
        },
        splitTextData && {
          opacity: cellopacity,
          backgroundColor: cellColor
        },
        width && {
          width: width
        },
        height && {
          height: height
        }
      ]}>
        <Text style={{ textAlign: 'center' }}>{splitTextData ? splitTextData[0] : data}</Text>
      </Animated.View>
    );
  }
};

const Col=({ data, style }) => (
  <View style={[{
    flex: 1
  }, style]}>
    {
      data.map((item, i) => {
        return <Cell key={i} data={item} />
      })
    }
  </View>
);

export {
  Table,
  Wrapper,
  Rows,
  Row,
  Cell,
  Col
};
