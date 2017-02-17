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
import HistoryComponent from "./components/HistoryComponent";
import CardsListPR from "./components/CardsListPR";

export default class RocketTestApp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TabComponent/>

                <CardsListPR/>

                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30,
        backgroundColor: '#FFFFFF'
    }
});