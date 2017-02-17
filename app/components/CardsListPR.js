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
import CardPr from "./CardPr";
import HistoryComponent from "./HistoryComponent";

const screenWidth = Dimensions.get('window').width,
    screenHeight = Dimensions.get('window').height - 60,
    initialHeight = 200;

export default class CardsListPR extends Component {

    containerHeight = new Animated.Value(initialHeight);
    SPRING_CONFIG = {tension: 2, friction: 3};
    lastOffset = 0;
    innerHeight = 0;

    // state={
    //     containerHeight: new Animated.Value(initialHeight)
    // };

    lastAdded = 0;


    // handleScroll = (event)=>{
    //
    //     const curOffset = event.nativeEvent.contentOffset.y,
    //         directionUp = curOffset > this.lastOffset ? 0 : 1;
    //
    //     let value = 0;
    //
    //     if(directionUp){
    //         value = initialHeight + curOffset
    //     } else {
    //         value = initialHeight - (curOffset - this.lastAdded)
    //     }
    //
    //     // value *= 1.1;
    //
    //     // value = value * 1.2;
    //
    //     // console.log(value, value * 0.9);
    //
    //     this.lastAdded = curOffset;
    //     this.lastOffset = curOffset;
    //
    //
    //     if(curOffset > (this.innerHeight-initialHeight-50) || value < initialHeight || value >= screenHeight || curOffset < 1){
    //         return;
    //     }
    //
    //     Animated
    //         .spring(
    //             this.containerHeight,
    //             {
    //             ...this.SPRING_CONFIG,
    //             toValue: value
    //             }
    //         )
    //         .start();
    // };

    getStyle = ()=>{
        return [
            styles.cardsContainer
        ]
    };

    render() {
        return (
            <Animated.View style={this.getStyle()}>
                <ScrollView
                    ref="scroll"
                    scrollEventThrottle={16}
                    onScroll={this.handleScroll}
                    onContentSizeChange={(width,height) => {
                        this.refs.scroll.scrollToEnd({animated: false});
                        this.innerHeight = height;
                    }}
                >
                    <CardPr active={true} />
                    <CardPr/>
                    <CardPr/>
                    <CardPr/>
                    <CardPr/>
                    <HistoryComponent/>
                </ScrollView>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    cardsContainer: {
        height: screenHeight,
        marginBottom: 15,
        overflow: 'hidden'
    }
});