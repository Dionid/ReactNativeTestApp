/**
 * Created by dionid on 20.02.17.
 */

import React, {Component} from "react";
import {connect} from "react-redux";
import HistoryListPr from "./HistoryListPr";
import {getHistoryListAsArray} from "../../reducers/index";
import {requestHistoryList} from "../../actions/index";
import {requestHistoryListAC} from "../../actions/index";

class HistoryListCont extends Component{

    static propTypes = {
        historyList: React.PropTypes.array.isRequired,
        requestHistoryList: React.PropTypes.func.isRequired
    };

    componentDidMount(){
        this.props.requestHistoryList();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.historyList !== this.props.historyList;
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
        requestHistoryList: ()=> dispatch(requestHistoryListAC())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(HistoryListCont);