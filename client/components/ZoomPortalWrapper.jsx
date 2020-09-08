import React from 'react';
import ReactDOM from 'react-dom';

const zoomPortalRoot = document.getElementById('zoom-portal-root');

class ZoomPortalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.element = document.createElement('div');
  }

  componentDidMount() {
    zoomPortalRoot.appendChild(this.element);
  }

  componentWillUnmount() {
    zoomPortalRoot.removeChild(this.element);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.element)
  }

}

export default ZoomPortalWrapper;