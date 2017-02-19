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
    screenHeight = Dimensions.get('window').height - 160;

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
            },{
                id: 6
            }
        ]
    };

    state = {
        height: [
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(10),
            new Animated.Value(20),
            new Animated.Value(30),
            new Animated.Value(40),
            new Animated.Value(cardWrHeight-20)
        ],
        opacity: [
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0.3),
            new Animated.Value(0.3),
            new Animated.Value(0.7),
            new Animated.Value(0.9),
            new Animated.Value(1)
        ],
        rotateX: [
            new Animated.Value('0deg'),
            new Animated.Value('0deg'),
            new Animated.Value('0deg'),
            new Animated.Value('0deg'),
            new Animated.Value('-5deg'),
            new Animated.Value('-10deg'),
            new Animated.Value('-15deg')
        ],
        position: [
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(5),
            new Animated.Value(20),
            new Animated.Value(50),
            new Animated.Value(95)
        ],
        translateY: [
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0)
        ],
        marginTop: 0
    };

    getStyle = ()=>{
        return [
            styles.cardsContainer,
            {
                marginTop: this.state.marginTop
            }
        ]
    };

    getCardWrStyle = (index)=>{
        return [
            styles.cardWr,
            {
                height: this.state.height[index],
            }
        ]
    };

    getCardStyle = (index)=>{
        return [
            styles.card,
            {
                opacity: this.state.opacity[index],
                transform: [
                    { perspective: 1000 },
                    {
                        translateY: this.state.translateY[index]
                    },
                    {
                        rotateX: this.state.rotateX[index]
                    }
                ]
            }
        ]
    };

    currentOffset = 0;

    lastYPos = 0;
    initialHeight = [0,0,10,20,30,40,cardWrHeight-20];
    MAXIMAL_ROTATEX_VALUE = -60;
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
            return sum + cur._value
        },this.state.height[0]._value)
    };

    componentDidMount(){
        this.handleScroll(0)
    }

    handleScroll = (event)=>{

        // if(this.scrollPos > 10 || this.scrollPos < 0){
        //     return;
        // }

        const curYPos = event.nativeEvent && event.nativeEvent.pageY || event,
            step = (this.lastYPos - curYPos)*-1*(this.sensitive/700),
            directionUp = step < 0;

        // const resObj = {
        //     height: [],
        //     rotateX: [],
        //     opacity: [],
        //     translateY: [],
        // };

        let totalScrolled = 0;

        // console.log(this.state.height);

        this.state.height.forEach((num,i)=>{
            const pos = this.getElPosition(i);

            // console.log(num._value)

            let heightValue = num._value,
                rotateXValue = 0;

            if(pos < screenHeight/1.7 && pos > 15){
                heightValue += step*15;
            } else {
                heightValue += step;
            }

            heightValue = heightValue >= cardWrHeight-20 ? cardWrHeight-20 : this.initialHeight[i] > heightValue ? this.initialHeight[i] : heightValue;

            if((pos*0.5) < (screenHeight/1.7)){
                rotateXValue = (pos*0.5)/(screenHeight/1.7)*this.MAXIMAL_ROTATEX_VALUE - (i < 2 ? 10*i : 10);
            } else if ((pos*0.5) > (screenHeight/1.7)){
                rotateXValue = this.MAXIMAL_ROTATEX_VALUE - 10
            }

            let translateY = pos/screenHeight*(-10*i);

            this.state.translateY[i].setValue(translateY);

            this.state.rotateX[i].setValue(rotateXValue+'deg');

            this.state.height[i].setValue(heightValue);

            this.state.opacity[i].setValue(pos/(screenHeight/1.7)*6.5);

            totalScrolled += heightValue;

        });

        // this.setState({
        //     ...resObj
        // });

        // console.log(cardWrHeight)

        // if(totalScrolled >= resObj.height.length*(cardWrHeight-20)){
        //     // this.scrollOn = true
        // } else if (resObj.height.every((num,i) => num === this.initialHeight[i])){
        //     this.scrollOn = true
        // } else {
        //     this.scrollOn = false
        // }

        // console.log();

        this.lastYPos = curYPos;

    };

    scrollOn = false;
    scrolling = false;
    releaseInt = 0;

    handleRelease = (e)=>{
        this.dragging = false;
    };

    scrollPos = 1;

    onScroll = (event)=>{
        this.scrollPos = event.nativeEvent.contentOffset.y === undefined ? this.scrollPos : event.nativeEvent.contentOffset.y;
        // console.log(this.scrollPos);
        this.scrollPos <= 0 && (this.scrollOn = false);
    };

    render() {

        console.log('render')

        return (
            <View
                scrollEnabled={this.scrollOn}
                onScroll={this.onScroll}
                scrollEventThrottle={16}
                style={this.getStyle()}
            >
                <View
                    onResponderMove={this.handleScroll}
                    onResponderRelease={this.handleRelease}
                    onStartShouldSetResponder={this._onStartShouldSetResponder}
                    onMoveShouldSetResponder={this._onMoveShouldSetResponder}
                >
                    {
                        this.props.cards.map((card,i)=>{
                            return (
                                <Animated.View key={card.id} style={this.getCardWrStyle(i)}>
                                    <Animated.View style={this.getCardStyle(i)}>
                                        <View style={styles.side} />
                                        <Image source={require('../bg.png')} style={{width:320,height: cardWrHeight}} />
                                    </Animated.View>
                                </Animated.View>
                            )
                        })
                    }
                </View>
                <HistoryComponent/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardsContainer: {
        paddingTop: 20
    },
    cardWr:{
        // height: cardWrHeight,
        alignSelf: 'stretch',
        marginHorizontal: 30,
    },
    side:{
        width: 318,
        position:'absolute',
        height: cardWrHeight,
        // top:-3,
        left:1,
        borderRadius: 10,
        backgroundColor: '#333',
        transform: [
            {translateY:-3},
            // {rotateX:'89deg'},
            { perspective: 100 },
        ],
        zIndex: -1,
        // borderTopLeftRadius:4,
        // borderTopRightRadius:4,
    },
    // text:{
    //     color: '#fff',
        // textAlign: 'center'
    // },
    card: {
        height: cardWrHeight,
        // position: 'absolute',
        width: 320,
        borderRadius: 10,
        backgroundColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowColor: 'rgba(0,0,0,0.3)'
        // borderColor: 'white',
        // borderWidth: 1,
    },
    underCard: {
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowColor: 'rgba(0,0,0,0.3)',
        marginHorizontal: 2,
        height: cardWrHeight,
        borderRadius: 10,
        width: 316,
        position: 'absolute',
        backgroundColor: 'white'
    }
});