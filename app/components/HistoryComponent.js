/**
 * Created by dionid on 17.02.17.
 */

import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    Dimensions,
    View,
    Image
} from 'react-native';

export default function HistoryComponent(){
    const {
        historyContainer,
        historyRow,
        historyRow__Inner,
        history__dayName,
        history__daySum,
        history__image,
        history__title_container,
        history__title,
        history__sum
    } = styles;

    const historyRow__Day = [historyRow,styles.historyRow__Day];


    return (
        <View style={historyContainer}>
            <View style={historyRow__Day}>
                <View style={historyRow__Inner}>
                    <Text style={history__dayName}>
                        Сегодня
                    </Text>
                    <Text style={history__daySum}>
                        -5800 Р
                    </Text>
                </View>
            </View>
            <View style={historyRow}>
                <View style={historyRow__Inner}>
                    <Image
                        style={history__image}
                        source={{uri:'https://www.billa.at/WNBinaryWeb/120/4514406.png'}}
                    />
                    <View
                        style={history__title_container}
                    >
                        <Text style={history__title}>
                            Billadas
                        </Text>
                    </View>
                    <Text
                        style={history__sum}
                    >
                        -1 200 Р
                    </Text>
                </View>
            </View>
            <View style={historyRow}>
                <View style={historyRow__Inner}>
                    <Image
                        style={history__image}
                        source={{uri:'https://www.billa.at/WNBinaryWeb/120/4514406.png'}}
                    />
                    <View
                        style={history__title_container}
                    >
                        <Text style={history__title}>
                            Billadas
                        </Text>
                    </View>
                    <Text
                        style={history__sum}
                    >
                        -1 200 Р
                    </Text>
                </View>
            </View>
            <View style={historyRow}>
                <View style={historyRow__Inner}>
                    <Image
                        style={history__image}
                        source={{uri:'https://www.billa.at/WNBinaryWeb/120/4514406.png'}}
                    />
                    <View
                        style={history__title_container}
                    >
                        <Text style={history__title}>
                            Billadas
                        </Text>
                    </View>
                    <Text
                        style={history__sum}
                    >
                        -1 200 Р
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    historyContainer: {
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
    }
});