/**
 * Created by dionid on 20.02.17.
 */

import React, {Component} from "react";
import {connect} from "react-redux";
import HistoryListPr from "./HistoryListPr";
import {getHistoryListAsArray} from "../../reducers/index";
import {requestHistoryList} from "../../actions/index";

class HistoryListCont extends Component{

    static propTypes = {
        historyList: React.PropTypes.array.isRequired,
        requestHistoryList: React.PropTypes.func.isRequired
    };

    componentDidMount(){
        this.props.requestHistoryList();
    }

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

const mapDispatchToProps = (dispatch)=>{
    return {
        requestHistoryList: ()=> dispatch(requestHistoryList())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(HistoryListCont);