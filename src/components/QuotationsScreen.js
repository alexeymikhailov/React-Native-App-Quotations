import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import {
  Table,
  Wrapper,
  Rows,
  Row,
  Cell,
  Col
} from './TableDataComponent';
import {
  fetchPoloniexData
} from '../actions';

class QuotationsScreen extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeScreen === 'QuotationsScreen' && this.props.activeScreen !== prevProps.activeScreen) {
      this.interval=setInterval(() => {
        this.props.dispatch(fetchPoloniexData())
      }, 5000);
    } else if (this.props.activeScreen !== 'QuotationsScreen') {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { poloniexData, loadingData, tableHeader, tableName, tableData, firstRender, errorPoloniexData }=this.props;

    return (
      <View style={styles.container}>
        <View style={{
          marginTop: 60,
          marginHorizontal: 24
        }}>
          <View style={{
            backgroundColor: '#fff',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginBottom: 20
          }}>
            <Text style={{
              color: '#393939',
              fontSize: 34,
              fontWeight: 'bold'
            }}>Котировки</Text>
          </View>
          {
            firstRender ? (
              <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: 20
              }}>
                <ActivityIndicator color="#393939" animating={true} size="large"/>
              </View>
            ) : (
              <ScrollView contentContainerStyle={styles.contentContainer}
                scrollEventThrottle={0.5}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                <View>
                  {
                    errorPoloniexData.length ? (
                      <Table style={{
                        marginBottom: -1
                      }}>
                        <Row data={errorPoloniexData} width={[120]} height={[40]} />
                      </Table>
                    ) : null
                  }
                  <Table>
                    <Row data={tableHeader} width={[120, 120, 120, 120]} height={[40, 40, 40, 40]} />
                  </Table>
                  <ScrollView scrollEventThrottle={0.5}
                    showsVerticalScrollIndicator={false}
                    style={{
                      marginTop: -1,
                      marginBottom: 70
                    }}>
                    <Table>
                      <Wrapper>
                        <Col data={tableName} style={{
                          width: 120
                        }} />
                        <Rows data={tableData} width={[120, 120, 120]} height={[30, 30, 30]} />
                      </Wrapper>
                    </Table>
                  </ScrollView>
                </View>
              </ScrollView>
            )
          }
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    alignItems: 'center'
  }
});

const mapStateToProps=(state) => {
  const { poloniexData, loadingData, tableHeader, tableName, tableData, firstRender, errorPoloniexData, activeScreen }=state.QuotationsReducer;

  return {
    poloniexData,
    loadingData,
    tableHeader,
    tableName,
    tableData,
    firstRender,
    errorPoloniexData,
    activeScreen
  };
};

const Quotations=connect(mapStateToProps)(QuotationsScreen);

export default Quotations;
