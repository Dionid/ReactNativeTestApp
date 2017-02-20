/**
 * Created by dionid on 20.02.17.
 */

import React, {Component} from "react";
import {connect} from "react-redux";
import HistoryListPr from "./HistoryListPr";
import {getHistoryListAsArray} from "../../reducers/index";

class HistoryListCont extends Component{

    static propTypes = {
        historyList: React.PropTypes.array.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.cards === this.props.cards;
    }

    render(){
        return (
            <HistoryListPr {...this.props} />
        )
    }
}

const mapStateToProps = (state,ownProps)=>{
    return {
        historyList: getHistoryListAsArray(state)
    }
};

export default connect(mapStateToProps)(HistoryListCont);