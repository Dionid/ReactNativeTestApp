/**
 * Created by dionid on 17.02.17.
 */

import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

export default function TabComponent(){
    const activeMenuStyles = [styles.menuItem,styles.menuItem__Active];

    return (
        <View style={styles.menu}>
            <View style={styles.menu_inner}>
                <TouchableHighlight>
                    <View style={styles.menuItem}></View>
                </TouchableHighlight>
                <TouchableHighlight>
                    <View style={activeMenuStyles}></View>
                </TouchableHighlight>
                <TouchableHighlight>
                    <View style={styles.menuItem}></View>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    menu:{
        height: 10,
        paddingHorizontal: 30,
        marginTop: 30,
        marginBottom: 15
    },
    menu_inner:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuItem: {
        backgroundColor: '#000000',
        width: 10,
        height: 10,
        borderRadius: 5,
        opacity: 0.3
    },
    menuItem__Active: {
        opacity: 1
    }
});