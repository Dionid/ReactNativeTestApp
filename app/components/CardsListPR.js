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

    // handleScroll = (event)=>{
    //
    //     const currentOffset = event.nativeEvent.contentOffset.y;
    //
    //     if(currentOffset > this.props.initialOffset){
    //         return;
    //     }
    //
    //     this.setState({
    //         currentOffset
    //     })
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
            styles.cardsContainer,
            {}
        ]
    };

    getCardWrStyle = ()=>{
        return [
            styles.cardWr,
            {}
        ]
    };

    calculateOpacity = (index)=>{
        // if(this.props.currentOffset <= this.props.initialOffset){
        //     return 1;
        // } else {
        //     return (this.props.initialOffset === 0 ? 90 : this.props.initialOffset) / this.props.currentOffset;
        // }

        if(index === 0){
            return {
                opacity: this.yOffset.interpolate({
                    inputRange:[0,cardWrHeight-50],
                    outputRange:[1,0]
                })
            }
        }

        return {
            opacity: this.yOffset.interpolate({
                inputRange:[cardWrHeight*index-50,cardWrHeight*1.5*index-50],
                outputRange:[1,0]
            })
        }

    };

    getCardStyle = (index)=>{
        return [
            styles.card,
            this.calculateOpacity(index)
        ]
    };

    yOffset = new Animated.Value(0);

    onScroll = (event)=>{

        const currentOffset = event.nativeEvent.contentOffset.y;

        if(currentOffset + 50 > this.props.initialOffset){
            return;
        }

        return Animated.event([{ nativeEvent: { contentOffset: { y: this.yOffset } } }])(event)
    };

    render() {
        return (
            <View style={this.getStyle()}>
                <ScrollView
                    ref="scroll"
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={this.onScroll}
                    contentOffset={{
                        x: 0, y: this.props.initialOffset - 50
                    }}
                >
                    {
                        this.props.cards.map((card,i)=>{
                            return (
                                <View key={card.id} style={this.getCardWrStyle()}>
                                    <Animated.View style={this.getCardStyle(i)}>
                                        <Text style={styles.text}>
                                            {i+1}
                                        </Text>
                                    </Animated.View>
                                </View>
                            )
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
    },
    cardWr:{
        height: 100,
        alignSelf: 'stretch',
        borderColor: 'green',
        borderWidth: 1,
        // marginBottom: 15,
    },
    text:{
        color: '#fff',
        textAlign: 'center'
    },
    card: {
        height: 180,
        position: 'absolute',
        width: 320,
        marginHorizontal: 30,
        top: 0,
        left: 0,
        backgroundColor: '#000',
        borderRadius: 10,
        overflow: 'hidden',
        transform: [
            { perspective: 1000 },
            // { translateY: Dimensions.get('window').width * 0.24 },
            // { rotateX: '-60deg'},
        ],
        borderColor: 'red',
        borderWidth: 1,
    }
});