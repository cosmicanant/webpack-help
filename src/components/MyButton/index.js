import './MyButton.css';

class MyButton {
    render(btnText = 'ClickMe ++'){
        const btn = document.createElement('button');
        btn.classList.add('my-button');
        btn.innerHTML = btnText;
        document.body.appendChild(btn);
    }
}

export default MyButton;