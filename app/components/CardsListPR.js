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
import HistoryComponent from "./HistoryComponent";

const screenWidth = Dimensions.get('window').width,
    screenHeight = Dimensions.get('window').height - 60;

export const cardWrHeight = Math.floor((screenWidth-60)*0.62);

export default class CardsListPR extends Component {

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

    state = {
        height: [0,5,15,30,45,cardWrHeight],
        opacity: [0,0.3,0.3,0.7,.9,1],
        rotateX: [0,0,0,0,0,-15],
        position: [0,0,5,20,50,95]
    };

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
                height: this.state.height[index],
                opacity: this.state.opacity[index]
            }
        ]
    };

    getCardStyle = (index)=>{
        return [
            styles.card,
            {
                transform: [
                    { perspective: 1000 },
                    { translateY: -20 },
                    {
                        rotateX: this.state.rotateX[index] + 'deg'
                    }
                ]
            }
        ]
    };

    currentOffset = 0;

    lastYPos = 0;
    initialHeight = [0,5,15,35,45,cardWrHeight-20];
    MAXIMAL_ROTATEX_VALUE = -70;
    sensitive = 40;

    _onStartShouldSetResponder = (e)=> {
        this.dragging = true;
        //Setup initial drag coordinates
        this.drag = {
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY
        };

        this.lastYPos = e.nativeEvent.pageY;

        return true;
    };

    _onMoveShouldSetResponder = (e)=> {
        return true;
    };

    getElPosition = (index)=>{
        return this.state.height.slice(1,index).reduce((sum,cur)=>{
            return sum + cur
        },this.state.height[0])
    };

    handleScroll = (e)=>{
        const curYPos = e.nativeEvent.pageY,
            step = (this.lastYPos - curYPos)*-1,
            directionUp = step < 0;

        const resObj = {
            height: [],
            rotateX: [],
            opacity: []
        };

        // console.log(step)

        this.state.height.forEach((num,i)=>{
            const pos = this.getElPosition(i);

            const heightValue = num + step*(this.sensitive/100) + (pos > screenHeight ? 0 : directionUp ? pos/-50 : pos/5);

            console.log(directionUp);

            resObj.height.push(heightValue >= cardWrHeight-20 ? cardWrHeight-20 : this.initialHeight[i] > heightValue ? this.initialHeight[i] : heightValue);

            resObj.rotateX.push(pos/screenHeight/1.4*this.MAXIMAL_ROTATEX_VALUE);

            // if(i===0) console.log(pos);

            resObj.opacity.push(pos/(screenHeight/1.7)*6.5);
        });


        this.setState({
            ...resObj
        });

        this.lastYPos = curYPos;

    };

    handleRelease = (e)=>{
        this.dragging = false;
    };

    render() {
        return (
            <View style={this.getStyle()}>
                <Animated.View
                    onResponderMove={this.handleScroll}
                    onResponderRelease={this.handleRelease}
                    onStartShouldSetResponder={this._onStartShouldSetResponder}
                    onMoveShouldSetResponder={this._onMoveShouldSetResponder}
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
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardsContainer: {
        paddingTop: 20
    },
    cardWr:{
        height: cardWrHeight,
        alignSelf: 'stretch',
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
        borderRadius: 10,
        // borderColor: 'white',
        // borderWidth: 1,

    }
});