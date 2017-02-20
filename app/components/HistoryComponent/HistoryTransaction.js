/**
 * Created by dionid on 20.02.17.
 */

import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';


export default function HistoryTransation ({id,bgImageUri,name,additional,sum}){
    const {
        historyRow,
        historyRow__Inner,
        history__image,
        history__title_container,
        history__title,
        history__subTitle,
        history__sum
    } = styles;
    
    return (
        <View key={id} style={historyRow}>
            <View style={historyRow__Inner}>
                <Image
                    style={history__image}
                    source={{uri:bgImageUri}}
                />
                <View
                    style={history__title_container}
                >
                    <Text style={history__title}>
                        {name}
                    </Text>
                    <Text style={history__subTitle}>
                        {additional}
                    </Text>
                </View>
                <Text
                    style={history__sum}
                >
                    -{sum} Р
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
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