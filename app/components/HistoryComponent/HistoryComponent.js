/**
 * Created by dionid on 17.02.17.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import HistoryDay from "./HistoryDay";


export default class HistoryComponent extends Component{

    static propTypes = {
        historyList: React.PropTypes.array.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.historyList !== this.props.historyList;
    }

    render(){
        const {
            historyContainer
        } = styles;

        return (
            <View style={historyContainer}>
                {
                    this.props.historyList.map((day)=>{
                        return (
                            <HistoryDay key={day.id} 
                                        {...day} />
                        )
                    })
                }


            </View>
        );
    }
}

const styles = StyleSheet.create({
    historyContainer: {
        marginTop: 30,
        paddingHorizontal: 30,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    }
});