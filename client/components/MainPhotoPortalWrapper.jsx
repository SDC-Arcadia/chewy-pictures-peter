/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const portalRoot = document.getElementById('portal-root');

class MainPhotoPortalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.element = document.createElement('div');
  }

  componentDidMount() {
    portalRoot.appendChild(this.element);
  }

  componentWillUnmount() {
    portalRoot.removeChild(this.element);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.element);
  }
}

export default MainPhotoPortalWrapper;

MainPhotoPortalWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
