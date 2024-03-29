import React from 'react';
import PropTypes from 'prop-types';
import { Router as ReactRouter } from 'react-router';
import Component from '../Component';
import History from './History';
import Runtime from './Runtime';

class Router extends React.Component {

  static stateToProps = ({ ownProps }) => {
    const Store = Runtime('store');
    const state = Store.getInternalState();
    return {
      events: state.router,
    };
  };

  static actionCreators = ({ nextProps }) => {
    const { historyHook } = nextProps;
    return {
      historyHook: historyHook || false,
    };
  };

  static dispatchToProps = ({ dispatch, actionCreators }) => {
    const { historyHook } = actionCreators;
    return {
      historyHook: historyHook || ((payload) => dispatch({
        type: '@@NAVIGATE',
        payload: payload,
      })),
    };
  };

  static propTypes = {
    history: PropTypes.object,
    historyHook: PropTypes.func.isRequired,
  };

  static defaultProps = {
    history: History,
  };

  static propsToContext = ({ ownProps }) => ({
    location: ownProps.history.location,
    history: ownProps.history,
  });

  constructor(props, state) {
    super(props, state);
    const { history, historyHook } = this.props;
    this.toggleHistory = history.listen((location, action) => {
      historyHook({ location, action });
    });
  }

  componentWillUnmount() {
    this.toggleHistory();
  }

  render() {
    ReactRouter.displayName = 'ReactRouter';
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <ReactRouter {...this.props} />;
  }

}

export default Component(Router);
