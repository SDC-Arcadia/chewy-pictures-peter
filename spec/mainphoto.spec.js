import React from 'react';
import renderer from 'react-test-renderer';
import MainPhoto from '../client/components/MainPhoto';

// eslint-disable-next-line no-undef
describe('MainPhoto Component', () => {
  // eslint-disable-next-line no-undef
  it('should render correctly', () => {
    const photo = 'https://rpt22-fec-kwame.s3.us-west-1.amazonaws.com/images/product/img001.jpeg';
    const tree = renderer
    // eslint-disable-next-line react/jsx-filename-extension
      .create(<MainPhoto photo={photo} />)
      .toJSON();
    // eslint-disable-next-line no-undef
    expect(tree).toMatchSnapshot();
  });
});
