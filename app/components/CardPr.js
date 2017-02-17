/**
 * Created by dionid on 17.02.17.
 */

import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

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

        if(this.props.currentOffset > this.props.initialOffset){
            return this.props.currentOffset - this.props.initialOffset;
        }

        return 0;
    }

    render(){
        let cardStyles = this.props.active ? [styles.card,{backgroundColor:'#CCC'}] : styles.card;

        const coef =  this.props.currentOffset / this.props.initialOffset,
                opacity = this.calculateOpacity(),
                translateY = this.calculateTranslateY();
                // rotateX = this.calculateRotateX()

        cardStyles = [
            cardStyles,
            {
                opacity,
                transform:[
                    {
                        translateY
                    }
                ]
            }
        ];
        
        return(
            <View style={cardStyles}>

            </View>
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