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
import TabComponent from "./components/TabComponent";
import CardModal from "./components/CardModal";
import CardsListPR from "./components/CardsListPR";

export default class RocketTestApp extends Component {

    state = {
        modalActivated: false
    };

    handleCardTap = (e,card)=>{
        this.setState({
            modalActivated: true,
            activeCard:card
        });
    };
    
    handleCardClose = ()=>{
        this.setState({
            modalActivated: false,
            activeCard:0
        });  
    };

    render() {
        return (
            <View style={styles.container}>
                <CardModal handleCardClose={this.handleCardClose} active={this.state.modalActivated} card={this.state.activeCard} />
                <TabComponent/>
                <CardsListPR handleCardTap={this.handleCardTap}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    }
});