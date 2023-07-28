//note : pada express urutan route untuk use berpengaruh sehingga apabila use / diberikan diatas maka route lain tak akan dijalankan
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const {loadContact, findContact} = require('./utils/contacts')

const app = express();
const port = 3000

//memanggil view engine ejs
app.set('view engine', 'ejs');
app.use(expressLayout);

//middleware built-in
app.use(express.static('public'))

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

    const contacts = loadContact();

    res.render('contact', {
        title : 'Contact Page',
        layout : 'layout/main_layout',
        contacts
    });
})

app.get('/contact/:nama', (req, res) => {

    const contact = findContact(req.params.nama);

    res.render('detail', {
        title : 'Halaman Detail Contact',
        layout : 'layout/main_layout',
        contact
    });
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