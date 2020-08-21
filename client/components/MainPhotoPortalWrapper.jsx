import React from 'react';
import ReactDOM from 'react-dom';

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
    return ReactDOM.createPortal(this.props.children, this.element);
  }

}

export default MainPhotoPortalWrapper;