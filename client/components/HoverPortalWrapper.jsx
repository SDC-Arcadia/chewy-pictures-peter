import React from 'react';
import ReactDOM from 'react-dom';

const hoverPortalRoot = document.getElementById('main-photo');

class HoverPortalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.element = document.createElement('div');
  }

  componentDidMount() {
   // hoverPortalRoot.appendChild(this.element);
    console.log('hoverportalroot', hoverPortalRoot);
    console.log(document.getElementById('Photos'))
    console.log(document.getElementById('portal-root'))
    console.log(document.getElementById('zoom-portal-root'))
  }

  componentWillUnmount() {
   // hoverPortalRoot.removeChild(this.element);
  }

  render() {
    return null
    // ReactDOM.createPortal(this.props.children, this.element);
  }
}

export default HoverPortalWrapper;

