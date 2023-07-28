const fs = require('fs');

//membuat folder data saat belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
};

//membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf8');
};

//ambil semua data didalam contacts.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json' , 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
};

//cari kontak berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContact(nama);
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

module.exports = {loadContact, findContact};