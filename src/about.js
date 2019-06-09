import MyButton from './components/MyButton';
import MyImg from './components/MyImage';
import _ from 'lodash';

const btn = new MyButton();
const img = new MyImg();
btn.render(_.toUpper('New Button'));
img.render();