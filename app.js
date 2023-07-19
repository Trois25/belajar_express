//note : pada express urutan route untuk use berpengaruh sehingga apabila use / diberikan diatas maka route lain tak akan dijalankan
const express = require('express');

const expressLayout = require('express-ejs-layouts');
const app = express();
const port = 3000

//memanggil view engine ejs
app.set('view engine', 'ejs');
app.use(expressLayout);

//get mengirim file index html
app.get('/', (req, res) => {
    const mahasiswa = [
        {
        nama : 'Juan Azhar',
        kelas : 'IF - H'
    },
    {
        nama : 'Klepon',
        kelas : 'IF - D'
    },
    {
        nama : 'Pipin',
        kelas : 'IF - A'
    },];
    //memanggil index didalam folder views
    res.render('index',{ 
        nama : 'Juan Azhar', 
        title : 'Home Page',
        mahasiswa,
        layout : 'layout/main_layout'
    });
})

//get mengirimkan text
app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Page',
        layout : 'layout/main_layout'});
})

app.get('/contact', (req, res) => {
    //get mengirimkan json
    // res.json({
    //     nama : 'Juan Azhar',
    //     email : 'juanajh428@gmail.com',
    //     noHP : '0895637496991'
    // });
    res.render('contact', {
        title : 'Contact Page',
        layout : 'layout/main_layout'});
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