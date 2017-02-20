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
import { BlurView, VibrancyView } from "react-native-blur";
import {cardWrHeight} from "./CardsListPR";

const screenWidth = Dimensions.get('window').width,
    screenHeight = Dimensions.get('window').height;

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export class CardModal extends Component{

    static propTypes = {
        active: React.PropTypes.bool.isRequired,
        card: React.PropTypes.object
    };

    opacityValue = new Animated.Value(0);
    translateYValue = new Animated.Value(screenHeight);

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.active !== this.props.active) {
            Animated.sequence([
                Animated.timing(
                    this.opacityValue,
                    {
                        toValue: 1,
                        duration:250
                    }
                ),

                Animated.timing(
                    this.translateYValue,
                    {
                        toValue: 0,
                        duration:1000,
                        easing: Easing.easeInEaseOut
                    }
                )
            ]).start();
            return true;
        }
        return false;
    }

    getBgStyle = ()=>{
        return [
            styles.modalContainer,
            {
                opacity: this.opacityValue
            }
        ]
    };

    getCardImageStyle = ()=>{
        return styles.cardImage;
    };

    getModalBodyStyle = ()=>{
        return [
            styles.modalBody,
            {
                transform:[
                    {
                        translateY: this.translateYValue
                    }
                ]
            }
        ]
    };

    handleCardClose = ()=>{
        Animated.sequence([
            Animated.timing(
                this.translateYValue,
                {
                    toValue: screenHeight,
                    duration:1000,
                    easing: Easing.easeInEaseOut
                }
            ),
            Animated.timing(
                this.opacityValue,
                {
                    toValue: 0,
                    duration:250
                }
            )
        ]).start(()=>{
            this.props.handleCardClose();
        });
    };

    render(){

        if(!this.props.active) return <View></View>;

        return(
            <AnimatedBlurView blurType="dark" blurAmount={1} style={this.getBgStyle()}>
                <TouchableOpacity onPress={this.handleCardClose} style={styles.modalTop}>
                    <Text style={{color:'#fff'}}>Close</Text>
                </TouchableOpacity>
                <Animated.View style={this.getModalBodyStyle()}>
                    <Image source={require('../bg.png')} style={this.getCardImageStyle()} />
                    <View style={styles.modalBodyContent}>
                        <ScrollView style={styles.modalBodyContentList}>
                            <TouchableOpacity style={styles.modalBtn}>
                                <Text style={styles.modalBtnIcon}>+</Text>
                                <Text style={styles.modalBtnText}>Пополнить карту</Text>
                                <Text style={styles.modalBtnText__Additional}>Additional</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtn}>
                                <Text style={styles.modalBtnIcon}>+</Text>
                                <Text style={styles.modalBtnText}>Пополнить карту</Text>
                                <Text style={styles.modalBtnText__Additional}>Additional</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtn}>
                                <Text style={styles.modalBtnIcon}>+</Text>
                                <Text style={styles.modalBtnText}>Пополнить карту</Text>
                                <Text style={styles.modalBtnText__Additional}>Additional</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtn}>
                                <Text style={styles.modalBtnIcon}>+</Text>
                                <Text style={styles.modalBtnText}>Пополнить карту</Text>
                                <Text style={styles.modalBtnText__Additional}>Additional</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtn}>
                                <Text style={styles.modalBtnIcon}>+</Text>
                                <Text style={styles.modalBtnText}>Пополнить карту</Text>
                                <Text style={styles.modalBtnText__Additional}>Additional</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtn}>
                                <Text style={styles.modalBtnIcon}>+</Text>
                                <Text style={styles.modalBtnText}>Пополнить карту</Text>
                                <Text style={styles.modalBtnText__Additional}>Additional</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtn}>
                                <Text style={styles.modalBtnIcon}>+</Text>
                                <Text style={styles.modalBtnText}>Пополнить карту</Text>
                                <Text style={styles.modalBtnText__Additional}>Additional</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtn}>
                                <Text style={styles.modalBtnIcon}>+</Text>
                                <Text style={styles.modalBtnText}>Пополнить карту</Text>
                                <Text style={styles.modalBtnText__Additional}>Additional</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtn}>
                                <Text style={styles.modalBtnIcon}>+</Text>
                                <Text style={styles.modalBtnText}>Пополнить карту</Text>
                                <Text style={styles.modalBtnText__Additional}>Additional</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </Animated.View>
            </AnimatedBlurView>
        );
    }
}

const cardHeight = Math.floor((screenWidth)*0.62);

const styles = StyleSheet.create({
    modalContainer: {
        flex:1,
        position: 'absolute',
        height: screenHeight,
        width: screenWidth,
        // opacity: 0.4,
        top:0,
        left: 0,
        // backgroundColor: '#000000',
        zIndex: 100
    },
    modalTop: {
        width: screenWidth,
        alignItems: 'center',
        paddingVertical: 30,
        // borderBottomColor: '#fff',
        // borderBottomWidth: 1
    },
    modalBody:{
        width: screenWidth,
        height: screenHeight - cardHeight*0.6,
        flex:1,
        // backgroundColor: '#fff',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20
    },
    cardImage: {
        position: 'absolute',
        width: screenWidth,
        height: cardHeight
    },
    modalBodyContent: {
        marginTop: cardHeight*0.6,
        width: screenWidth,
        flex:1,
        backgroundColor: '#1C1D21',
        shadowColor: 'white',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 2,
        shadowOpacity: 1.0,
    },
    modalBodyContentList:{
        paddingHorizontal: 30,
        flex: 1,
        paddingVertical: 30,
        marginBottom: 30
    },
    modalBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomColor: 'rgba(255,255,255,0.5)',
        borderBottomWidth: 1
    },
    modalBtnIcon:{
        color: '#fff',
        fontSize: 20,

    },
    modalBtnText: {
        color: '#fff',
        paddingLeft: 10,
        flex: 1,
        marginTop: 3
    },
    modalBtnText__Additional:{
        color: '#fff',
        opacity: 0.6,
        marginTop: 3
    }
});

export default CardModal;