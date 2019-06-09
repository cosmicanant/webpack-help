const express = require('express');
const path = require('path');

app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.listen(9999, ()=>{
    console.log('server up on port : 9999')
})

