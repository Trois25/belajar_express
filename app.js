//note : pada express urutan route untuk use berpengaruh sehingga apabila use / diberikan diatas maka route lain tak akan dijalankan

const express = require('express');
const app = express();
const port = 3000

//get mengirim file index html
app.get('/', (req, res) => {
    res.sendFile('./index.html',{root : __dirname});
})

//get mengirimkan text
app.get('/about', (req, res) => {
    res.send('Ini halaman about');
})

//get mengirimkan json
app.get('/contact', (req, res) => {
    res.json({
        nama : 'Juan Azhar',
        email : 'juanajh428@gmail.com',
        noHP : '0895637496991'
    });
})

//get menggunakan params
app.get('/product/:id', (req, res) => {
    res.send(`Ini merupakan product dengan id : ${req.params.id} <br> Nama item : ${req.query.name}`);
    //query diambil dari url user ct : http://localhost:3000/product/1?name=buah
})

//route apabila tidak ada yang ssesuai dengan yang diatas
app.use('/', (req, res) => {
    res.status(404);
    res.send('route yang anda buka salah');
})

//digunakan untuk menjalankan server
app.listen(port,() => {
    console.log('listening app at http://localhost:'+port);
});