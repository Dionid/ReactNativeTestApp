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
import HistoryTransaction from "./HistoryTransaction";


export default function HistoryDay ({name,totalSum,transactions}){
        const {
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

      return(
          <View>
              <View style={historyRow__Day}>
                  <View style={historyRow__Inner}>
                      <Text style={history__dayName}>
                          {name}
                      </Text>
                      <Text style={history__daySum}>
                          {totalSum} Р
                      </Text>
                  </View>
              </View>
              { transactions.map(transaction=>{
                  return (
                      <HistoryTransaction key={transaction.id} {...transaction} />
                  )
              }) }
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