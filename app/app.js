/**
 * Created by dionid on 17.02.17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    Dimensions,
    View,
    Animated,
    Easing,
    ScrollView,
    Image
} from 'react-native';
import TabComponent from "./components/TabComponent";
import HistoryComponent from "./components/HistoryComponent";

const screenWidth = Dimensions.get('window').width,
    screenHeight = Dimensions.get('window').height - 60;

export default class RocketTestApp extends Component {

    heightValue = new Animated.Value(200);
    expanded = false;
    _scrollView;


    handleScroll = (event)=>{
        // if(!this.expanded){
        //     this.expanded = true;
        //     Animated.timing(
        //         this.heightValue,
        //         {
        //             toValue: screenHeight,
        //             duration: 1000,
        //             easing: Easing.elastic(1)
        //         }
        //     ).start()
        // }

        let value = event.nativeEvent.contentOffset.y + this.heightValue._value;
        //
        Animated.timing(
            this.heightValue,
            {
                toValue: value,
                duration: 1000/16,
                easing: Easing.elastic(1)
            }
        ).start();

        // console.dir(this.heightValue._value);

    };

    render() {

        // const he = this.heightValue.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [200, screenHeight]
        // });

        return (
            <View style={styles.container}>
                <TabComponent/>

                <Animated.View style={[styles.cardsContainer,{height:this.heightValue}]}>
                    <ScrollView
                        onScroll={this.handleScroll}
                        scrollEventThrottle={16}
                        ref={component => this._scrollView = component}
                    >

                            <View style={styles.card}>

                            </View>
                            <View style={styles.card}>

                            </View>
                            <View style={styles.card}>

                            </View>
                            <View style={styles.card}>

                            </View>
                            <View style={styles.card}>

                            </View>
                    </ScrollView>
                </Animated.View>

                <HistoryComponent/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    cardsContainer: {
        height: screenHeight
    },
    card: {
        height: 180,
        alignSelf: 'stretch',
        marginHorizontal: 30,
        backgroundColor: '#EEE',
        borderRadius: 5,
        marginBottom: 15
        // transform: [
        //     { perspective: 1000 },
        //     { translateY: Dimensions.get('window').width * 0.24 },
        //     { rotateX: '-60deg'},
        // ]
    }
});