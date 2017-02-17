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
        return this.props === nextProps;
    }

    render(){
        
        console.log('card');

        const cardStyles = this.props.active ? [styles.card,{backgroundColor:'#CCC'}] : styles.card;
        
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
        backgroundColor: '#EEE',
        borderRadius: 5,
        marginBottom: 15
        // transform: [
        //     { perspective: 1000 },
        //     { translateY: Dimensions.get('window').width * 0.24 },
        //     { rotateX: '-60deg'},
        // ]
    }
});