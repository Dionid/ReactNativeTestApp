/**
 * Created by dionid on 20.02.17.
 */


import React from "react";
import {
    StyleSheet,
    View,
} from 'react-native';
import TabComponent from "../components/TabComponent";
import CardModal from "../components/CardModal";
import CardsListCont from "../components/CardsList/CardsListCont";

class MainLayout extends React.Component {
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
            activeCard:{}
        });
    };

    /*
    * Пришлось вытащить CardModal, потому что по какой-то причине он не хочет вставать на верх экрана внутри других компонентов
    * */

    render() {
        return (
            <View style={styles.container}>
                <CardModal handleCardClose={this.handleCardClose} active={this.state.modalActivated} card={this.state.activeCard} />
                <TabComponent/>
                <CardsListCont handleCardTap={this.handleCardTap}/>
            </View>
        );
    }
}

export default MainLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    }
});