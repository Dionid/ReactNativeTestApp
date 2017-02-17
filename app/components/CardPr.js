/**
 * Created by dionid on 17.02.17.
 */

import React, { Component } from 'react';
import {
    View,
    Animated,
    StyleSheet
} from 'react-native';


export default class CardPr extends Component{

    shouldComponentUpdate(nextProps, nextState) {
        // return this.props.currentOffset !== nextProps.currentOffset;
        return false;
    }

    calculateRotateX(){

    }

    calculateOpacity(currentOffset){
        if(currentOffset <= this.props.initialOffset){
            return 1;
        } else {
            return (this.props.initialOffset === 0 ? 90 : this.props.initialOffset) / currentOffset;
        }
    }

    calculateTranslateY(currentOffset){
        let value = 0;

        if(currentOffset >= this.props.initialOffset){
            value = currentOffset - this.props.initialOffset;
            console.log(value)
        }

        return value;
    }

    opacityValue = new Animated.Value(0);
    translateYValue = new Animated.Value(0);
    SPRING_CONFIG = {tension: 0, friction: 5};

    animate(currentOffset){
        Animated.parallel([
            Animated.timing(
                this.opacityValue,
                {
                    duration:180,
                    toValue: this.calculateOpacity(currentOffset)
                }
            ),
            Animated.timing(
                this.translateYValue,
                {
                    duration:180,
                    toValue: this.calculateTranslateY(currentOffset)
                }
            )
        ]).start();
    }

    componentWillReceiveProps(nextProps){
        const currentOffset = nextProps.currentOffset;
        
        if(currentOffset !== this.props.currentOffset){
            this.animate(currentOffset);
        }
    }

    componentDidMount(){
        this.animate(this.props.currentOffset);
    }

    getStyles(){
        // let cardStyles = this.props.active ? [styles.card,{backgroundColor:'#CCC'}] : styles.card;

        return [
            styles.card,
            {
                opacity: this.opacityValue,
                transform:[
                    {
                        translateY: this.translateYValue
                    }
                ]
            }
        ]
    }

    render(){
        // let cardStyles = this.props.active ? [styles.card,{backgroundColor:'#CCC'}] : styles.card;
        //
        // const coef =  this.props.currentOffset / this.props.initialOffset,
        //         opacity = this.calculateOpacity(),
        //         translateY = this.calculateTranslateY();
        //         // rotateX = this.calculateRotateX()
        //
        // cardStyles = [
        //     cardStyles,
        //     {
        //         opacity,
        //         transform:[
        //             {
        //                 translateY
        //             }
        //         ]
        //     }
        // ];

        return(
            <Animated.View style={this.getStyles()}>

            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
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