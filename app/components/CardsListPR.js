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

export const cardWrHeight = Math.floor((screenWidth-60)*0.62);

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
        cardsNumber: 6,
        initialOffset: cardWrHeight*5,
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
            },{
                id: 5
            }
        ]
    };

    cardHeight = cardWrHeight;
    halfCardH = cardWrHeight/2;

    // state = {
    //     currentOffset: cardWrHeight*5
    // };

    getStyle = ()=>{
        return [
            styles.cardsContainer,
            {}
        ]
    };

    getCardWrStyle = (index)=>{
        return [
            styles.cardWr,
            {
                height: index * 10
            }
        ]
    };

    calculateOpacity = (index)=>{

        if(index === 0){
            return {
                opacity: this.yOffset.interpolate({
                    inputRange:[0,cardWrHeight*1.5],
                    outputRange:[1,0]
                })
            }
        }

        const cardOffset = cardWrHeight*index;

        return {
            opacity: this.yOffset.interpolate({
                inputRange:[cardOffset+cardWrHeight,cardOffset*(6/index)],
                outputRange:[1,0]
            })
        }

    };

    calculateTranslateY = (index)=>{

        const cardOffset = cardWrHeight*index || 0;

        const initialNum = index === 0 ? 20 : -60*index + 60;

        // setTimeout(()=>{this.yOffset.setValue(0);},1000);

        return {
            transform:[
                { perspective: 1000 },
                {
                    translateY: this.yOffset
                },
                // {
                //     rotateX: this.yOffset.interpolate({
                //         inputRange: [-cardWrHeight, cardOffset, cardOffset*2],
                //         outputRange: ['-60deg','-10deg', '0deg'],
                //     })
                // }
            ]
        }
    };



    getCardStyle = (index)=>{
        return [
            styles.card
        ]
    };

    yOffset = new Animated.Value(0);
    currentOffset = 0;

    onScroll = (event)=>{

        this.currentOffset = event.nativeEvent.contentOffset.y;

        if(this.currentOffset > this.props.initialOffset){
            return;
        }



        // return Animated.event([{ nativeEvent: { contentOffset: { y: this.yOffset } } }])(event)
    };

    render() {
        return (
            <View style={this.getStyle()}>
                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={this.onScroll}
                    // contentOffset={{
                    //     x: 0, y: this.props.initialOffset - this.cardHeight*1.5
                    // }}
                >
                    {
                        this.props.cards.map((card,i)=>{
                            return (
                                <View key={card.id} style={this.getCardWrStyle(i)}>
                                    <Animated.Image source={require('../bg.png')} style={this.getCardStyle(i)}>

                                    </Animated.Image>
                                </View>
                            )
                        })
                    }
                    <HistoryComponent/>
                </Animated.ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardsContainer: {
        // height: screenHeight,
        // marginTop: 15
    },
    cardWr:{
        height: cardWrHeight,
        alignSelf: 'stretch',
        borderTopColor: 'green',
        borderTopWidth: 1,
        // marginBottom: 15,
    },
    text:{
        color: '#fff',
        textAlign: 'center'
    },
    card: {
        height: cardWrHeight,
        position: 'absolute',
        width: 320,
        marginHorizontal: 30,
        // top: 0,
        // left: 0,
        // backgroundColor: '#000',
        borderRadius: 10,
        // overflow: 'hidden',
        // transform: [
            // { perspective: 1000 },
            // { translateY: Dimensions.get('window').width * 0.24 },
            // { rotateX: '-60deg'},
        // ],
        borderColor: 'white',
        borderWidth: 1,
        // backgroundImage: require('../bg.png'),
    }
});