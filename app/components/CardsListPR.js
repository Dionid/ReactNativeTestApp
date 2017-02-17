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

const {width: screenWidth,height: screenHeight} = Dimensions.get('window');

var AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default class CardsListPR extends Component {

    static defaultProps = {
        cardsNumber: 5,
        initialOffset: 180*4,
        initialOffsetArr: [0,180,360,540,720],
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

    cardHeight = 180;

    state = {
        currentOffset: 180*4
    };


    handleScroll = (event)=>{

        const currentOffset = event.nativeEvent.contentOffset.y;

        if(currentOffset >= this.props.initialOffset){
            return;
        }

        this.props.initialOffsetArr.forEach((offset,i)=>{
            this.animate(currentOffset,offset,i);
        });
    };

    calculateOpacity(currentOffset,offset){
        if(currentOffset <= offset){
            return 1;
        } else {
            return (offset === 0 ? 90 : offset) / currentOffset;
        }
    }

    calculateTranslateY(currentOffset,offset){
        let value = 0;

        if(currentOffset >= offset){
            value = currentOffset - offset;
        }

        return value;
    }

    animate(currentOffset,offset,i){
        console.log('asd')
        Animated.parallel([
            Animated.timing(
                this.opacityValue[i],
                {
                    duration:100,
                    easing:  Easing.cubic,
                    toValue: this.calculateOpacity(currentOffset,offset)
                }
            ),
            Animated.timing(
                this.translateYValue[i],
                {
                    duration:100,
                    easing:  Easing.cubic,
                    toValue: this.calculateTranslateY(currentOffset,offset)
                }
            )
        ]).start();
    }

    opacityValue = this.props.cards.map(card=>{
        return new Animated.Value(0);
    });

    translateYValue = this.props.cards.map(card=>{
        return new Animated.Value(0);
    });

    getCardStyle(i){
        return [
            styles.card,
            {
                opacity: this.opacityValue[i],
                transform:[
                    {
                        translateY: this.translateYValue[i]
                    }
                ]
            }
        ]
    }

    render() {
        return (
            <View style={styles.cardsContainer}>
                <ScrollView
                    ref="scroll"
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={this.handleScroll}
                    onContentSizeChange={(width,height) => {
                        this.refs.scroll.scrollTo({x: 0, y: this.props.initialOffset, animated: false});
                    }}
                >
                    {
                        this.props.cards.map((card,i)=>{
                            return (
                                <Animated.View key={card.id} style={this.getCardStyle(i)}>

                                </Animated.View>
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
        marginBottom: 60
    },
    card: {
        height: 180,
        alignSelf: 'stretch',
        marginHorizontal: 30,
        backgroundColor: '#000',
        borderRadius: 10,
        marginBottom: 15,
        transform: [
            { perspective: 1000 }
            // { translateY: Dimensions.get('window').width * 0.24 },
            // { rotateX: '-60deg'},
        ]
    }
});