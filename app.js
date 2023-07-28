//note : pada express urutan route untuk use berpengaruh sehingga apabila use / diberikan diatas maka route lain tak akan dijalankan
const express = require('express');
const expressLayout = require('express-ejs-layouts');

//menangani apapun yang terkait dengan contact
const {loadContact, findContact, addContact, cekDuplicate} = require('./utils/contacts')

//menangani validasi
const {body,validationResult, check} = require('express-validator')

//menangani session
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000

//memanggil view engine ejs
app.set('view engine', 'ejs');
app.use(expressLayout);

//middleware built-in
app.use(express.static('public'))
app.use(express.urlencoded({extended:true})) //untuk mengambil data dari from sehingga data dapat diterima

//konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
    cookie : {maxAge:6000},
    secret: 'secret',
    resave : true,
    saveUninitialize : true,
}));
app.use(flash());

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
        contacts,
        msg : req.flash('msg')
    });
})

//menambahkan data dari form contact
app.get('/contact/add', (req,res)=> {
    res.render('add-contact',{
        title : 'Form Tambah data',
        layout : 'layout/main_layout'
    })
})

//proses data contact
app.post('/contact', [
    body('nama').custom((value)=>{
        const duplicate = cekDuplicate(value);
        if(duplicate){
            throw new Error('Nama contact sudah digunakan')
        }
        return true;
    }),
    check('nohp','No HP tidak valid').isMobilePhone('id-ID'),
    check('email','Email tidak valid').isEmail()
],(req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render('add-contact',{
            title : "Form tambah data contact",
            layout : 'layout/main_layout',
            errors : errors.array(),
        })
    }else{
        addContact(req.body);

        //mengirimkan flash message sebelum redirect
        req.flash('msg', 'Data contact berhasil ditambahkan')

        res.redirect('/contact'); //response untuk kembali ke get contact
    }
})

//halaman detile contact
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