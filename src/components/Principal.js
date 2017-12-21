import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
import TabBarMenu from './TabBarMenu';
import SideMenu from 'react-native-side-menu';

import Promocoes from './Promocoes';
import Restaurantes from './Restaurantes';
import Menu from './Menu';
import { connect } from 'react-redux';
import { toggleMenu, atualizaIsOpen } from '../actions/AppActions';


 class TabView extends Component {
   
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Promoções' },
      { key: '2', title: 'Restaurantes' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBarMenu {...props} funcao={this.props.funcao} />;

  _renderScene = SceneMap({
    '1': Promocoes,
    '2': Restaurantes,
  });

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
};

class MenuLateral extends Component {

  constructor(props){
    super(props);

  }

  render() {
    const menu = <Menu funcao={ this.props }/>;

    return (
      <SideMenu menu={ menu } isOpen={ this.props.menuIsOpen } onChange={(isOpen) => {this.props.atualizaIsOpen(isOpen)}}>
        <TabView funcao={ this.props }/>
      </SideMenu>
    );
  }
}

const mapStateToProps = state => ({menuIsOpen: state.AppReducer.menuIsOpen});

export default connect(mapStateToProps, {toggleMenu, atualizaIsOpen})(MenuLateral);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});