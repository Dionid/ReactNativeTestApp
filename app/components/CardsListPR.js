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

export const cardWrHeight = 100;

export default class CardsListPR extends Component {

    // state={
    //     containerHeight: new Animated.Value(initialHeight)
    // };

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

    static defaultProps = {
        cardsNumber: 5,
        initialOffset: cardWrHeight*4,
        cards: [
            {
                id: 0
            },{
                id: 1
            },{
                id: 2
            },{
                id: 3
            },{
                id: 4
            }
        ]
    };

    cardHeight = cardWrHeight;

    state = {
        currentOffset: cardWrHeight*4
    };

    getStyle = ()=>{
        return [
            styles.cardsContainer
        ]
    };

    handleScroll = (event)=>{

        const currentOffset = event.nativeEvent.contentOffset.y;

        // console.dir(this.refs.scroll);

        if(currentOffset > this.props.initialOffset){
            return;
        }

        this.setState({
            currentOffset
        })
    };

    render() {
        return (
            <View style={this.getStyle()}>
                <ScrollView
                    ref="scroll"
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={1}
                    onScroll={this.handleScroll}
                    contentOffset={{
                        x: 0, y: this.props.initialOffset - (cardWrHeight*0)
                    }}
                    // onContentSizeChange={(width,height) => {
                    //     this.refs.scroll.scrollTo({x: 0, y: this.props.initialOffset - (cardWrHeight*0.3), animated: false});
                    // }}
                >
                    {
                        this.props.cards.map((card,i)=>{
                            return <CardPr 
                                active={i === 0} 
                                currentOffset={this.state.currentOffset} 
                                initialOffset={this.cardHeight*i}
                                position={i+1}
                                key={card.id}/>
                        })
                    }
                    <HistoryComponent/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardsContainer: {
        height: screenHeight,
        overflow: 'hidden'
    }
});