import test from '../../assets/img/test.jpg';
import './index.scss';

class MyImage {
    width = 400;
    render(){
        const img = document.createElement('img');
        img.src = test;
        img.width = this.width;
        img.alt = 'img';
        img.classList.add('imgtest');
        document.querySelector('body').appendChild(img);
    }
}

export default MyImage;