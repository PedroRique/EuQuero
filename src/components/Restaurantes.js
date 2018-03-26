import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import { listaPromoFetch, modificaCoords } from '../actions/AppActions';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import geolib from 'geolib';
import _ from 'lodash';

class Restaurantes extends Component {
    
    constructor(props){
        super(props);
        this.state = this.getInitialState();
    }

    componentWillMount(){
        this.props.listaPromoFetch();
    }

    getDistance(){
        const app = this;

        navigator.geolocation.getCurrentPosition(
            function(position) {
                app.props.modificaCoords(position.coords);
            },
            function() {
            },
            {
                enableHighAccuracy: false
            }
        );
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

    componentDidMount(){
        this.getDistance();
    }
      
    render(){
        return(
            <View style ={styles.container}>
                <MapView
                    style={styles.map}
                    region={this.state.region}
                >
                </MapView>

                <Button onPress={() => this.getDistance()} title='Teste' color='red'/>
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


const mapStateToProps = state => {

    const promos = _.map(state.AppReducer.promos, (val, uid) => {

        if(state.AppReducer.userCoords.latitude && val.coords){ //confere se existe latitude ou se eh apenas um objeto vazio e se as promos ja foram carregadas
            
            let isInside = geolib.isPointInCircle(
                val.coords,
                state.AppReducer.userCoords,
                10000
            );

            if(isInside)
                return {...val, uid}
        }else{
            return {...val, uid}
        }
       
    });

    return ({
        promos: state.AppReducer.promos,
        userCoords: state.AppReducer.userCoords
    });

}

export default connect(
    mapStateToProps, 
    { 
        listaPromoFetch,
        modificaCoords
    }
)(Restaurantes);