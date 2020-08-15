import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// const configure  = require('enzyme').configure;
// const Adapter = require('enzyme-adapter-react-16').Adapter;

configure({ adapter: new Adapter() });
