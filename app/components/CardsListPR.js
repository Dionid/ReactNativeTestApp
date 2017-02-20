/**
 * Created by dionid on 17.02.17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
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
    
    static propTypes = {
        cardsNumber: React.PropTypes.number,
        cards: React.PropTypes.array
    };
    
    currentOffset = 0;
    lastYPos = 0;
    MAXIMAL_ROTATE_X_VALUE = -60;
    sensitive = 57;
    screenHeight = screenHeight;
    screenSeparatorPosY = screenHeight/1.7;

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
        height: [0,0,10,20,30,40,cardWrHeight-20],
        opacity: [0,0,0.3,0.3,0.7,.9,1],
        rotateX: [0,0,0,0,-5,-10,-15],
        position: [0,0,0,5,20,50,95],
        translateY: [0,0,0,0,0,0,0],
        marginTop: 0
    };

    initialHeight = [0,0,10,20,30,40,cardWrHeight-20];

    getWrapperStyle = ()=>{
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
                        rotateX: this.state.rotateX[index] + 'deg'
                    }
                ]
            }
        ]
    };

    _onStartShouldSetResponder = (e)=> {
        this.dragging = true;
        
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

    componentDidMount(){
        this.handleScroll(0)
    }

    /*

     Вычитаем предыдущую позицию пальца (lastYPos) из текущей (curYPos) и получае расстояние,
     на которое сдвинулся палец (step).
     Умножаем на чувствительность (sensitive), деленную на 1000 (для удобства дальнейших расчетов),
     чтобы уменьшить скорость анимации.
     Умножаем на -1 (для удобства дальнейших расчетов).

    */

    getStep(curYPos,lastYPos,sensitive){
        return (lastYPos - curYPos)*(sensitive/1000)*-1
    }

    getCardHeightValue(curHeight,initialHeight,screenSeparatorPos,pos,step,cardWrHeight){
        let heightValue = curHeight;
        if(pos < screenSeparatorPos && pos > 15){
            heightValue += step*15;
        } else {
            heightValue += step;
        }
        return heightValue >= cardWrHeight-20 ? cardWrHeight-20 :initialHeight > heightValue ? initialHeight : heightValue;
    }

    getCardRotateXValue(curPos,screenSeparatorPos,maximalRotateXValue,cardIndex,initialRotationValue){
        if(curPos < screenSeparatorPos){
            return curPos/screenSeparatorPos*maximalRotateXValue + (cardIndex < 2 ? initialRotationValue*cardIndex : initialRotationValue);
        } else if (curPos > screenSeparatorPos){
            return maximalRotateXValue + initialRotationValue
        }

    }

    handleScroll = (event)=>{
        // Проверяем текущее значение позиции ScrollView,
        // если позиция экрана не в самом начале (более 10 по Y), запрещаем переджвижение карточек
        if(this.scrollPos > 10){
            return;
        }
        // ToDo: Можно убрать проверку и прокручивать скролл на самый верх, когда начинают двигаться карточки,
        // нужно тестить на юзерах

        /*
            curYPos:number - берем текущую позицию пальца
            ИЛИ число, которое приходит вместо event (нужно для первоначально инициализации)
         */
        /*
            step:number - получаем шаг для анимации
         */
        /*
            directionUp:boolean - движется ли палец вверх
         */
        const curYPos = event.nativeEvent && event.nativeEvent.pageY || event,
            step = this.getStep(curYPos,this.lastYPos,this.sensitive),
            directionUp = step < 0;

        const resObj = {
            height: [],
            translateY: [],
            rotateX: [],
            opacity: []
        };

        let totalScrolled = 0;

        this.state.height.forEach((num,i)=>{
            const pos = this.getElPosition(i);

            let heightValue = this.getCardHeightValue(num,this.initialHeight[i],this.screenSeparatorPosY,pos,step,cardWrHeight);

            resObj.height.push(heightValue);

            totalScrolled += heightValue;

            resObj.translateY.push(pos/this.screenHeight*(-10*i));

            resObj.rotateX.push(this.getCardRotateXValue(pos*0.5,this.screenSeparatorPosY,this.MAXIMAL_ROTATE_X_VALUE,i,-10));

            resObj.opacity.push(pos/this.screenSeparatorPosY*6.5);

        });

        this.setState({
            ...resObj
        });

        if(totalScrolled >= resObj.height.length*(cardWrHeight-20)){
            // this.scrollOn = true
        } else if (resObj.height.every((num,i) => num === this.initialHeight[i])){
            this.scrollOn = true
        } else {
            this.scrollOn = false
        }

        this.lastYPos = curYPos;

    };

    scrollOn = false;
    scrolling = false;
    releaseInt = 0;

    tapTiming = 120;
    tapedCardId = 0;

    handleRelease = (e)=>{
        this.dragging = false;

        if((new Date()) - this.tapDate < this.tapTiming){
            console.log(this.tapedCardId)
        }

    };

    scrollPos = 1;

    onScroll = (event)=>{
        this.scrollPos = event.nativeEvent.contentOffset.y === undefined ? this.scrollPos : event.nativeEvent.contentOffset.y;
        this.scrollPos <= 0 && (this.scrollOn = false);
    };

    tapDate = 0;

    onPress = (cardId,event)=>{

        this.tapDate = new Date();
        this.tapedCardId = cardId;
    };

    render() {
        return (
            <ScrollView
                scrollEnabled={this.scrollOn}
                onScroll={this.onScroll}
                scrollEventThrottle={16}
                style={this.getWrapperStyle()}
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
                                <View key={card.id}
                                      pointerEvents="auto"
                                      accessible={true}
                                      onStartShouldSetResponder={this.onPress.bind(this,card.id)}
                                      style={this.getCardWrStyle(i)}
                                    >
                                        <View style={this.getCardStyle(i)}>
                                            <View style={styles.side} />
                                            <Image source={require('../bg.png')} style={{width:320,height: cardWrHeight}} />
                                        </View>
                                </View>
                            )
                        })
                    }
                </View>
                <HistoryComponent/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardsContainer: {
        paddingTop: 0
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
        zIndex: -1
    },
    card: {
        height: cardWrHeight,
        // position: 'absolute',
        width: 320,
        borderRadius: 10,
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowColor: 'rgba(0,0,0,0.3)'
    },
    // underCard: {
    //     shadowOpacity: 0.8,
    //     shadowRadius: 5,
    //     shadowOffset: {
    //         height: 10,
    //         width: 0
    //     },
    //     shadowColor: 'rgba(0,0,0,0.3)',
    //     marginHorizontal: 2,
    //     height: cardWrHeight,
    //     borderRadius: 10,
    //     width: 316,
    //     position: 'absolute',
    //     backgroundColor: 'white'
    // }
});