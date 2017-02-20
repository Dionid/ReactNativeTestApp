/**
 * Created by dionid on 20.02.17.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    View,
    Text,
    Animated,
    Easing,
    ScrollView,
    Image
} from 'react-native';

const screenWidth = Dimensions.get('window').width,
    screenHeight = Dimensions.get('window').height;

export class CardModal extends Component{

    static propTypes = {
        active: React.PropTypes.bool.isRequired,
        card: React.PropTypes.object
    };

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.active !== this.props.active) return true;
        return false;
    }

    render(){

        if(!this.props.active) return <View></View>;

        return(
            <View style={styles.modalContainer} blurRadius={100}>
                <Text style={{color:'#fff'}}>{this.props.card.sum}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex:1,
        position: 'absolute',
        height: screenHeight,
        width: screenWidth,
        opacity: 0.4,
        top:0,
        left: 0,
        backgroundColor: '#000000',
        zIndex: 100
    }
});

export default CardModal;