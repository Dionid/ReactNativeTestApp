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

    static defaultProps = {
        cardsNumber: 7,
        cards: [
            {
                id: 0,
                sum: 1000
            },{
                id: 1,
                sum: 2000
            },{
                id: 2,
                sum: 3000
            },{
                id: 3,
                sum: 4000
            },{
                id: 4,
                sum: 5000
            },{
                id: 5,
                sum: 6000
            },{
                id: 6,
                sum: 7000
            }
        ],
        historyList: [
            {
                id:0,
                name: 'Сегодня',
                totalSum: 5000,
                transactions: [
                    {
                        id:0,
                        bgImageUri: 'https://www.billa.at/WNBinaryWeb/120/4514406.png',
                        name: 'Billa',
                        sum: 1200,
                        additional: '#Text'
                    }
                ]
            }
        ]
    };
    
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.cards !== this.props.cards || nextState.height !== this.state.height) return true;
        return false;
    }

    currentOffset = 0;
    MAXIMAL_ROTATE_X_VALUE = -60;
    cardWrHeight = cardWrHeight-20;
    screenHeight = screenHeight;
    screenSeparatorPosY = screenHeight/1.7;

    state = {
        height: [],
        opacity: [],
        rotateX: [],
        translateY: [],
        marginTop: 0,
        modalActivated: false,
    };

    constructor(props){
        super(props);
        this.calculateInitialValues();
    }

    /*
    * Подсчитываю начальные значения высоты, минимальный и максимальный размеры контейнера с кароточками
    * (для выключения и велючеия ScrollView)
    * */
    calculateInitialValues = ()=>{
        this.maxCardsContainerHeight = this.props.cardsNumber*this.cardWrHeight;
        this.state.height = this.initialHeight = this.calculateInitialHeight(this.props.cards,this.cardWrHeight);
        this.minCardsContainerHeight = this.initialHeight.reduce((sum,num)=> sum+num);
    };

    /*
    * Выставляю начальный массив с высотой каждой карточки в начальной позиции.
    * Последние 5 карточек имеют высоту в 10, 20, 30, 40, cardHeight соответственно.
    *
    * @param cardArray:array - массив с информацией по карточкам, нужен только для определения количества
    * @param cardWrHeight?:number - высота одной карточки
    * */
    calculateInitialHeight = (cardArray,cardWrHeight)=>{
        const cardLength = cardArray.length;
        return cardArray.map((num,ind)=>{
            if(ind === cardLength-1) return cardWrHeight || this.cardWrHeight;
            if(ind <= cardLength-6) return 0;
            return -10*(cardLength - 6 - ind);
        });
    };

    /*
    * Просчитываем начальное состояние карточек
    * */
    componentDidMount(){
        this.handleScroll(0)
    }

    getMainContainerStyle = ()=>{
        return [
            styles.cardsContainer,
            {
                marginTop: this.state.marginTop
            }
        ]
    };

    /*
    * Выставляем высоту обертки карточки, в зависимости от ее index
    * */
    getCardWrStyle = (index)=>{
        return [
            styles.cardWr,
            {
                height: this.state.height[index] || 0
            }
        ]
    };

    /*
     * Выставляем opacity, translateY и rotateX карточки, в зависимости от ее index
     * */
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


    /*
    * Вычисляем позицию карточки от верха экрана на основании сложения высот всех ранееидущих карточек
    * */
    getElPosition = (heightArr,index)=>{
        return heightArr.slice(1,index).reduce((sum,cur)=>{
            return sum + cur
        },heightArr[0])
    };

    sensitive = 57;

     /*
     * Вычисляем шаг для анимации. Процесс:

     * Вычитаем предыдущую позицию пальца (prevYPos) из текущей (curYPos) и получае расстояние,
     * на которое сдвинулся палец (step).

     * Умножаем на чувствительность (sensitive), деленную на 1000 (для удобства дальнейших расчетов),
     * чтобы уменьшить скорость анимации.

     * Умножаем на -1 (для удобства дальнейших расчетов).
     *
     * @param curYPos:number - текущая позиция пальца
     * @param prevYPos:number - предыдущая позиция пальца
     * @param sensitive:number - чувствительность анимации (чем выше, тем медленнее протекает анимация)
     * */
    getStep(curYPos,prevYPos,sensitive){
        return (prevYPos - curYPos)*(sensitive/1000)*-1
    }

    /*
    * Вычисляем высоту карточки, на основании позиции по отношению к экрану, шага
    * и проверяем не выходят ли значения за рамки. Процесс:
    *
    * Проверяем, если карточка находится в "зоне ускорения", где высота должна увеличиваться быстрее (pos < screenSeparatorPos && pos > 15)
    * то сильно увеличиваем шаг.
    * Если она находится выше начальной или конечной отметки "зоны ускорения", то шаг увеличивается несильно.
    *
    * Проверяем больше ли высота карточки, чем максимальная:
        * Если да, возвращаем максимальную высоту карточки.
        * Если нет, проверяем не меньше ли она своей начальной высоты:
            * Если да, возвращаем начальную высоту
            * Если нет, возвращаем модифицированную высоту
    *
    * @param curHeight:number - высота карточки на данный момент
    * @param initialHeight:number - начальная высота карточки
    * @param screenSeparatorPos:number - позиция, до которой распологается "зона ускорения"
    * @param pos:number - позиция карточки на данный момент
    * @param step:number - щаг анимации
    * @param cardWrHeight:number - максимальная высота карточки
    * */
    getCardHeightValue(curHeight,initialHeight,screenSeparatorPos,pos,step,cardWrHeight){
        let heightValue = curHeight;
        if(pos < screenSeparatorPos && pos > 15){
            heightValue += step*15;
        } else {
            heightValue += step*2;
        }
        return heightValue >= cardWrHeight ? cardWrHeight : heightValue < initialHeight ? initialHeight : heightValue;
    }

    /*
    * Вычисляем поворот карточки по оси X на основании позиции по отношению к экрану, шага
    * и проверяем не выходят ли значения за рамки. Процесс:
    *
    * Проверяем, если карточка находится в "зоне ускорения":
    * Если да, то карточка поворачивается в заивисимости от положения и ее index в массиве (первая карточка поворачивается медленнее)
    * Если нет, то вовзращаем сумму максимального и начального поворота
    *
    * @param curPos:number - текущее положение карточки
    * @param screenSeparatorPos:number - позиция конца "зоны ускорения"
    * @param maximalRotateXValue:number - максимальный поворот карточки
    * @param cardIndex:number - индекс карточки
    * @param initialRotationValue:number - начальное значение поворота карточки
    * */
    getCardRotateXValue(curPos,screenSeparatorPos,maximalRotateXValue,cardIndex,initialRotationValue){
        if(curPos < screenSeparatorPos){
            return curPos/screenSeparatorPos*maximalRotateXValue + (cardIndex < 1 ? 0 : initialRotationValue);
        } else if (curPos > screenSeparatorPos){
            return maximalRotateXValue + initialRotationValue
        }
    }

    /*
    * Вычисляем прозрачность карточки, на основании ее положения по отношению к "зоне ускорения"
    * @param curPos:number -  текущее положение карточки
    * @param screenSeparatorPos:number - позиция конца "зоны ускорения"
    * */
    getCardOpacity(curPos,screenSeparatorPos){
        return curPos/(screenSeparatorPos*0.2)+0.05
    }

    handleScroll = (event)=>{
        /*
        * Проверяем текущее значение позиции ScrollView,
        * если позиция экрана не в самом начале (более 10 по Y), запрещаем переджвижение карточек
        * */
        if(this.scrollPos > 10){
            return;
        }

            // @const curYPos:number - берем текущую позицию пальца ИЛИ число, которое приходит вместо event (нужно для первоначально инициализации)
        const curYPos = event.nativeEvent && event.nativeEvent.pageY || event,

            // @const step:number - получаем шаг для анимации
            step = this.getStep(curYPos,this.prevYPos,this.sensitive),

            // @const directionUp:boolean - движется ли палец вверх
            directionUp = step < 0;

        const resObj = {
            height: [],
            translateY: [],
            rotateX: [],
            opacity: []
        };

        let cardsContainerHeight = 0;

        this.state.height.forEach((num,i)=>{
            const pos = this.getElPosition(this.state.height,i);

            let heightValue = this.getCardHeightValue(num,this.initialHeight[i],this.screenSeparatorPosY,pos,step,cardWrHeight);

            resObj.height.push(heightValue);

            cardsContainerHeight += heightValue;

            resObj.translateY.push(pos/this.screenHeight*(-10*i));

            resObj.rotateX.push(this.getCardRotateXValue(pos*0.5,this.screenSeparatorPosY,this.MAXIMAL_ROTATE_X_VALUE,i,-10));

            resObj.opacity.push(this.getCardOpacity(pos,this.screenSeparatorPosY));

        });

        this.setState({
            ...resObj
        });

        this.toggleScrollOnTotalScrolled(cardsContainerHeight);

        this.prevYPos = curYPos;

    };

    getNewStateObjectAndTotalScrolled = (heightArr)=>{

    };

    scrollOn = false;

    /*
    * Переключаем scrollEnabled в зависимости от высоты контейнера карточек.
    *
    * @param cardsContainerHeight:number - высота контейнера с карточками
    * */
    toggleScrollOnTotalScrolled = (cardsContainerHeight)=>{
        if (cardsContainerHeight <= this.minCardsContainerHeight){
            this.scrollOn = true
        } else if(cardsContainerHeight >= this.maxCardsContainerHeight){
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
    prevYPos = 0;

    /*
    * Разрешаем начало нажатия на контейнере карточек
    *
    * @param e:Event - событие скролла
    * */
    _onStartShouldSetResponder = (e)=> {
        this.dragging = true;

        /*
        * Сохраняем позицию первого прикосновения
        * */
        this.dragStartPos = {
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY
        };

        /*
        * Перезыписываем значение предыдущего прикосновения
        * */
        this.prevYPos = e.nativeEvent.pageY;

        return true;
    };

    _onMoveShouldSetResponder = (e)=> {
        return true;
    };

    tapedCardId = 0;


    /*
    * Начало прикосновения к определенной карточке.
    * Сохраняем дату начала прикосновения и id карточки, к которой прикоснулись.
    *
    * @param cardId:number - id нажатой карточки
    * @param e:Event - событие скролла
    * */
    onCardPressStart = (cardId,e)=>{
        this.tapDate = new Date();
        this.tapedCardId = cardId;
    };

    tapTiming = 120;

    /*
    * Конец прикосновения к контейнеру.
    *
    * @param e:Event - событие скролла
    * */
    handleRelease = (e)=>{
        this.dragging = false;
        // Если прикосновение длилось меньше заданного времени, то вызываем обработчик нажатия на карточку
        if((new Date()) - this.tapDate < this.tapTiming){
            this.handleCardTap(e,this.tapedCardId);
        }
    };

    handleCardTap = (e,cardId)=>{
        // console.log(e,cardId);
        this.props.handleCardTap(e,this.props.cards[cardId]);
    };

    render() {
        return (
            <ScrollView
                scrollEnabled={this.scrollOn}
                bounces={false}
                onScroll={this.onScroll}
                scrollEventThrottle={16}
                contentContainerStyle={this.getMainContainerStyle()}
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
                <HistoryComponent historyList={this.props.historyList} />
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