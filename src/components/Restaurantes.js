import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import { listaPromocoes } from '../actions/AppActions';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

class Restaurantes extends Component {
    
    constructor(props){
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
          region: {
            latitude: -22.78825,
            longitude: -43.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        };
    }
      
    render(){
        return(
            <View style ={styles.container}>
                <MapView
                    style={styles.map}
                    region={this.state.region}
                >
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });


export default Restaurantes;