/**
 * Created by dionid on 17.02.17.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    Dimensions,
    View,
    Image
} from 'react-native';

export default class HistoryComponent extends Component{

    static propTypes = {
        historyList: React.PropTypes.array.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.historyList !== this.props.historyList;
    }

    render(){
        const {
            historyContainer,
            historyRow,
            historyRow__Inner,
            history__dayName,
            history__daySum,
            history__image,
            history__title_container,
            history__title,
            history__subTitle,
            history__sum
        } = styles;
        
        const historyRow__Day = [historyRow,styles.historyRow__Day];


        return (
            <View style={historyContainer}>
                {
                    this.props.historyList.map((day)=>{
                        return (
                            <View key={day.id}>
                                <View style={historyRow__Day}>
                                    <View style={historyRow__Inner}>
                                        <Text style={history__dayName}>
                                            {day.name}
                                        </Text>
                                        <Text style={history__daySum}>
                                            {day.totalSum} Р
                                        </Text>
                                    </View>
                                </View>
                                { day.transactions.map(transaction=>{
                                    return (
                                        <View key={transaction.id} style={historyRow}>
                                            <View style={historyRow__Inner}>
                                                <Image
                                                    style={history__image}
                                                    source={{uri:transaction.bgImageUri}}
                                                />
                                                <View
                                                    style={history__title_container}
                                                >
                                                    <Text style={history__title}>
                                                        {transaction.name}
                                                    </Text>
                                                    <Text style={history__subTitle}>
                                                        {transaction.additional}
                                                    </Text>
                                                </View>
                                                <Text
                                                    style={history__sum}
                                                >
                                                    -{transaction.sum} Р
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }) }
                            </View>
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
    },
    historyRow:{
        height: 50,
        marginBottom: 20
    },
    historyRow__Inner:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    historyRow__Day:{
        height: 20,
    },
    history__dayName:{
        color: '#9EA1A4'
    },
    history__daySum:{
        color: '#D2D4D6'
    },
    history__image: {
        height:50,
        width:50,
        borderRadius: 25,
    },
    history__title_container:{
        flex:1,
        paddingLeft: 15,
        paddingRight: 15
    },
    history__title:{
        fontSize: 16
    },
    history__sum:{
        fontSize: 16
    },
    history__subTitle:{
        opacity: 0.7
    }
});