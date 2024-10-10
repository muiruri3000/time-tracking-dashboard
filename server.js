const express = require('express');
const path = require('path');
const app = express(); 
const cors = require('cors');
app.use(cors())
const PORT = 3000; 

app.use(express.static(__dirname)); 
app.get('/data.json', (req, res)=>{
    res.sendFile(path.join(__dirname,'data.json'));
}); 
    app.listen(PORT, ()=>{
        console.log(`server running on http://localhost:${PORT}`)
   
})