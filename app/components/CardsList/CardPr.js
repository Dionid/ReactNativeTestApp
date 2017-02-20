/**
 * Created by dionid on 17.02.17.
 */

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

import {cardWrHeight} from "./CardsListPR";

export default class CardPr extends Component{

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.currentOffset !== nextProps.currentOffset;
    }

    calculateOpacity(){
        if(this.props.currentOffset <= this.props.initialOffset){
            return 1;
        } else {
            return (this.props.initialOffset === 0 ? 90 : this.props.initialOffset) / this.props.currentOffset;
        }
    }

    calculateRotateX(){

    }

    calculateTranslateY(){
        // return 500;

        const initialOffset = this.props.initialOffset,
              currentOffset = this.props.currentOffset;


        if(currentOffset >= initialOffset){
            return Math.floor(currentOffset - initialOffset + 0.5);
        }


        // let coef = (initialOffset - (initialOffset/currentOffset));
        //
        // // if(coef <= (initialOffset - 100)*(initialOffset/currentOffset)){
        // //     return 0;
        // // }
        //
        // if(currentOffset >= coef){
        //     return Math.floor(currentOffset - initialOffset + 0.5 + (initialOffset/currentOffset));
        // } else {
        //
        // }
        //
        // console.log(this.props.position, initialOffset, coef)

        return 0;
    }

    calculateMarginBottom(){

        const initialOffset = this.props.initialOffset,
                currentOffset = this.props.currentOffset;

        if(currentOffset > initialOffset*1.4){
            return 0;
        } else if(currentOffset > initialOffset){
            return 15;
        } else if (currentOffset < initialOffset){
            return 30;
        }

        return 0;
    }

    render(){
        let cardStyles = this.props.active ? [styles.card,{backgroundColor:'#000'}] : styles.card;

        const coef =  this.props.currentOffset / this.props.initialOffset,
                // opacity = this.calculateOpacity(),
                opacity = 1,
                // marginBottom = this.calculateMarginBottom(),
                translateY = this.calculateTranslateY();
                // rotateX = this.calculateRotateX()

        cardStyles = [
            cardStyles,
            {
                opacity,
                transform:[
                    { translateY: translateY }
                ]
            }
        ];

        const cardWrStyles = [
            styles.cardWr,
            {
            }
        ];
        
        return(
            <View style={cardWrStyles}>
                <View style={cardStyles}>
                    <Text style={styles.text}>
                        {this.props.position}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
            { rotateX: '-60deg'},
        ],
        borderColor: 'red',
        borderWidth: 1,
    }
});