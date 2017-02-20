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
        cardsNumber: React.PropTypes.number.isRequired,
        cards: React.PropTypes.array.isRequired
    };
    
    currentOffset = 0;
    MAXIMAL_ROTATE_X_VALUE = -60;
    cardWrHeight = cardWrHeight-20;
    screenHeight = screenHeight;
    screenSeparatorPosY = screenHeight/1.7;

    static defaultProps = {
        cardsNumber: 7,
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
        height: [],
        opacity: [],
        rotateX: [],
        translateY: [],
        marginTop: 0
    };


    constructor(props){
        super(props);
        this.calculateInitialValues();
    }

    calculateInitialValues = ()=>{
        this.maxCardsContainerHeight = this.props.cardsNumber*this.cardWrHeight;
        this.state.height = this.initialHeight = this.calculateInitialHeight(this.props.cards,this.cardWrHeight);
        this.minCardsContainerHeight = this.initialHeight.reduce((sum,num)=> sum+num);
    };

    calculateInitialHeight = (cardArray,cardWrHeight)=>{
        const cardLength = cardArray.length;
        return cardArray.map((num,ind)=>{
            if(ind === cardLength-1) return cardWrHeight;
            if(ind <= cardLength-6) return 0;
            return -10*(cardLength - 6 - ind);
        });
    };

    componentDidMount(){
        this.handleScroll(0)
    }

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
                height: this.state.height[index] || 0,
            }
        ]
    };

    getCardStyle = (index)=>{
        return [
            styles.card,
            {
                opacity: this.state.opacity[index] || 1,
                transform: [
                    { perspective: 1000 },
                    {
                        translateY: this.state.translateY[index] || 0
                    },
                    {
                        rotateX: (this.state.rotateX[index] ? this.state.rotateX[index] : 0) + 'deg'
                    }
                ]
            }
        ]
    };

    getCardImageStyle = ()=>{
        return styles.cardImage;
    };

    getElPosition = (heightArr,index)=>{
        return heightArr.slice(1,index).reduce((sum,cur)=>{
            return sum + cur
        },heightArr[0])
    };

    /*

     Вычитаем предыдущую позицию пальца (lastYPos) из текущей (curYPos) и получае расстояние,
     на которое сдвинулся палец (step).
     Умножаем на чувствительность (sensitive), деленную на 1000 (для удобства дальнейших расчетов),
     чтобы уменьшить скорость анимации.
     Умножаем на -1 (для удобства дальнейших расчетов).

    */

    sensitive = 57;

    getStep(curYPos,lastYPos,sensitive){
        return (lastYPos - curYPos)*(sensitive/1000)*-1
    }

    getCardHeightValue(curHeight,initialHeight,screenSeparatorPos,pos,step,cardWrHeight){
        let heightValue = curHeight;
        if(pos < screenSeparatorPos && pos > 15){
            heightValue += step*15;
        } else {
            heightValue += step*2;
        }
        return heightValue >= cardWrHeight ? cardWrHeight :initialHeight > heightValue ? initialHeight : heightValue;
    }

    getCardRotateXValue(curPos,screenSeparatorPos,maximalRotateXValue,cardIndex,initialRotationValue){
        if(curPos < screenSeparatorPos){
            return curPos/screenSeparatorPos*maximalRotateXValue + (cardIndex < 2 ? initialRotationValue*cardIndex : initialRotationValue);
        } else if (curPos > screenSeparatorPos){
            return maximalRotateXValue + initialRotationValue
        }
    }

    getCardOpacity(curPos,screenSeparatorPosY){
        return curPos/(screenSeparatorPosY*0.2)+0.05
    }

    handleScroll = (event)=>{
        // Проверяем текущее значение позиции ScrollView,
        // если позиция экрана не в самом начале (более 10 по Y), запрещаем переджвижение карточек
        if(this.scrollPos > 10){
            return;
        }
        // ToDo: Можно убрать проверку и прокручивать скролл на самый верх, когда начинают двигаться карточки,
        // нужно тестить на юзерах


        // @const curYPos:number - берем текущую позицию пальца ИЛИ число, которое приходит вместо event (нужно для первоначально инициализации)
        // @const step:number - получаем шаг для анимации
        // @const directionUp:boolean - движется ли палец вверх

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
            const pos = this.getElPosition(this.state.height,i);

            let heightValue = this.getCardHeightValue(num,this.initialHeight[i],this.screenSeparatorPosY,pos,step,cardWrHeight);

            resObj.height.push(heightValue);

            totalScrolled += heightValue;

            resObj.translateY.push(pos/this.screenHeight*(-10*i));

            resObj.rotateX.push(this.getCardRotateXValue(pos*0.5,this.screenSeparatorPosY,this.MAXIMAL_ROTATE_X_VALUE,i,-10));

            resObj.opacity.push(this.getCardOpacity(pos,this.screenSeparatorPosY));

        });

        this.setState({
            ...resObj
        });

        this.toggleScrollOnTotalScrolled(totalScrolled,resObj.height);

        this.lastYPos = curYPos;

    };

    getNewStateObjectAndTotalScrolled = (heightArr)=>{

    };

    scrollOn = false;

    toggleScrollOnTotalScrolled = (totalScrolled,arrOfCardHeights)=>{
        if (totalScrolled <= this.minCardsContainerHeight){
            this.scrollOn = true
        } else if(totalScrolled >= this.maxCardsContainerHeight){
            // this.scrollOn = true
        } else {
            this.scrollOn = false
        }
    };

    scrollPos = 1;

    onScroll = (event)=>{
        this.scrollPos = event.nativeEvent.contentOffset.y === undefined ? this.scrollPos : event.nativeEvent.contentOffset.y;
        this.scrollPos <= 0 && (this.scrollOn = false);
    };

    tapDate = 0;
    dragStartPos = {
        x: 0,
        y: 0
    };
    dragging = false;
    lastYPos = 0;

    _onStartShouldSetResponder = (e)=> {
        this.dragging = true;

        this.dragStartPos = {
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY
        };

        this.lastYPos = e.nativeEvent.pageY;

        return true;
    };

    _onMoveShouldSetResponder = (e)=> {
        return true;
    };

    tapedCardId = 0;

    onCardPressStart = (cardId,event)=>{
        this.tapDate = new Date();
        this.tapedCardId = cardId;
    };

    tapTiming = 120;

    handleRelease = (e)=>{
        this.dragging = false;
        if((new Date()) - this.tapDate < this.tapTiming){
            this.handleCardTap(e,this.tapedCardId);
        }
    };

    handleCardTap = (e,cardId)=>{
        console.log(e,cardId);
    };

    render() {
        return (
            <ScrollView
                scrollEnabled={this.scrollOn}
                bounces={false}
                onScroll={this.onScroll}
                scrollEventThrottle={16}
                contentContainerStyle={this.getWrapperStyle()}
            >
                <View
                    onStartShouldSetResponder={this._onStartShouldSetResponder}
                    onMoveShouldSetResponder={this._onMoveShouldSetResponder}
                    onResponderMove={this.handleScroll}
                    onResponderRelease={this.handleRelease}
                >
                    {
                        this.props.cards.map((card,i)=>{
                            return (
                                <View key={card.id}
                                      pointerEvents="auto"
                                      accessible={true}
                                      onStartShouldSetResponder={this.onCardPressStart.bind(this,card.id)}
                                      style={this.getCardWrStyle(i)}
                                    >
                                        <View style={this.getCardStyle(i)}>
                                            <View style={styles.side} />
                                            <Image source={require('../bg.png')} style={this.getCardImageStyle()} />
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
        paddingTop: 10
    },
    cardWr:{
        alignSelf: 'stretch',
        marginHorizontal: 30,
    },
    side:{
        width: 318,
        position:'absolute',
        height: cardWrHeight,
        left:1,
        borderRadius: 10,
        backgroundColor: '#333',
        transform: [
            {translateY:-3},
            { perspective: 100 },
        ],
        zIndex: -1
    },
    card: {
        height: cardWrHeight,
        width: 320,
        borderRadius: 10,
        // shadowOpacity: 0.8,
        // shadowRadius: 5,
        // shadowOffset: {
        //     height: 10,
        //     width: 0
        // },
        // shadowColor: 'rgba(0,0,0,0.3)'
    },
    cardImage: {
        width:320,
        height: cardWrHeight
    }
});