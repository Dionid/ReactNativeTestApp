/**
 * Created by dionid on 20.02.17.
 */

import React, {Component} from "react";
import {connect} from "react-redux";
import CardsListPR from "./CardsListPR";
import {getAllCardsAsArray} from "../../reducers/index";
import {requestCards} from "../../actions/index";
import {getCardsNumber,isCardsOrHistoryInLoading} from "../../reducers/index";
import {requestCardsAC} from "../../actions/index";

class CardsListCont extends Component{

    static propTypes = {
        cards: React.PropTypes.array.isRequired,
        cardsNumber: React.PropTypes.number.isRequired,
        loading: React.PropTypes.bool.isRequired,
        requestCards: React.PropTypes.func.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.cards !== this.props.cards;
    }

    componentWillMount(){
        this.props.requestCards();
    }

    render(){
        return (
            <CardsListPR {...this.props} />
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        cards: getAllCardsAsArray(state),
        cardsNumber: getCardsNumber(state),
        loading: isCardsOrHistoryInLoading(state)
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        requestCards: ()=> dispatch(requestCardsAC())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(CardsListCont);