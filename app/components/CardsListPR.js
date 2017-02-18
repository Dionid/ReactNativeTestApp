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

    // calculateOpacity = (index)=>{
    //     if(index === 0){
    //         return {
    //             opacity: this.yOffset.interpolate({
    //                 inputRange:[0,cardWrHeight*1.5],
    //                 outputRange:[1,0]
    //             })
    //         }
    //     }
    //
    //     const cardOffset = cardWrHeight*index;
    //
    //     return {
    //         opacity: this.yOffset.interpolate({
    //             inputRange:[cardOffset+cardWrHeight,cardOffset*(6/index)],
    //             outputRange:[1,0]
    //         })
    //     }
    //
    // };

    // calculateTranslateY = (index)=>{
    //
    //     const cardOffset = cardWrHeight*index || 0;
    //
    //     const initialNum = index === 0 ? 20 : -60*index + 60;
    //
    //     return {
    //         transform:[
    //             { perspective: 1000 },
    //             {
    //                 translateY: this.yOffset
    //             },
    //             // {
    //             //     rotateX: this.yOffset.interpolate({
    //             //         inputRange: [-cardWrHeight, cardOffset, cardOffset*2],
    //             //         outputRange: ['-60deg','-10deg', '0deg'],
    //             //     })
    //             // }
    //         ]
    //     }
    // };

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
    initialHeight = [0,5,15,30,45,cardWrHeight-30];
    initialPosition = [0,0,5,20,50,95];
    MAXIMAL_ROTATEX_VALUE = -70;

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

    // componentDidMount(){
    //
    // }

    sensetive = 40;

    handleScroll = (e)=>{
        const curPos = e.nativeEvent.pageY;
        const step = (this.lastYPos - curPos)*-1;
        // const position = [...this.state.position];
        // const directionUp = step < 0;

        const height = this.state.height.map((num,i)=>{
            const val = num + step*(num+1/10)/100;
            const res = val >= cardWrHeight-30 ? cardWrHeight-30 : this.initialHeight[i] > val ? this.initialHeight[i] : val;
            return res;
        });

        // const opacity = height.map((num,i)=>{
        //
        //     console.log(num);
        //
        //     return num / (cardWrHeight-30);
        // });

        // const opacity = this.state.opacity.map((num,i)=>{
        //     const val = num + step*(num+1/10)/100;
        //     return val;
        // });


        // const rotateX = this.state.rotateX.map((num,i)=>{
        //
        //     const pos = this.getElPosition(i);
        //
        //     const res = pos/screenHeight*this.MAXIMAL_ROTATEX_VALUE;
        //
        //     return res > 0 ? 0 : res;
        // });


        const resObj = {
            height: [],
            rotateX: [],
            opacity: []
        };

        // console.log(step)

        this.state.height.forEach((num,i)=>{
            const pos = this.getElPosition(i);

            const heightValue = num + step*(this.sensetive/100);

            resObj.height.push(heightValue >= cardWrHeight-30 ? cardWrHeight-30 : this.initialHeight[i] > heightValue ? this.initialHeight[i] : heightValue);

            resObj.rotateX.push(pos/screenHeight*this.MAXIMAL_ROTATEX_VALUE);

            if(i===0) console.log(pos);

            resObj.opacity.push(pos/screenHeight*7);
        });


        this.setState({
            height,
            ...resObj
        });

        this.lastYPos = e.nativeEvent.pageY;

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
        borderColor: 'white',
        borderWidth: 1,

    }
});