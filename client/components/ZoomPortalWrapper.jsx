/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const zoomPortalRoot = document.getElementById('zoom-portal-root');

class ZoomPortalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.element = document.createElement('div');
  }

  componentDidMount() {
    // zoomPortalRoot.appendChild(this.element);
    this.element.style.position = 'absolute';
    this.element.style.zIndex = '999';
    zoomPortalRoot.prepend(this.element);
  }

  componentWillUnmount() {
    zoomPortalRoot.removeChild(this.element);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.element);
  }
}

export default ZoomPortalWrapper;

ZoomPortalWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
