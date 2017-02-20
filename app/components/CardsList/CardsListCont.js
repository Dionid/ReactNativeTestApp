/**
 * Created by dionid on 20.02.17.
 */

import React, {Component} from "react";
import {connect} from "react-redux";
import CardsListPR from "./CardsListPR";
import {getAllCardsAsArray} from "../../reducers/index";

class CardsListCont extends Component{

    static propTypes = {
        cards: React.PropTypes.array.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.cards === this.props.cards;
    }

    render(){
        return (
            <CardsListPR {...this.props} />
        )
    }
}

const mapStateToProps = (state,ownProps)=>{
    return {
        cards: getAllCardsAsArray(state)
    }
};

export default connect(mapStateToProps)(CardsListCont);