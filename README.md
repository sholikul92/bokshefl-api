# bokshefl-api

### # About
bookshelf-api adalah sebuah project REST-api yang dibuat untuk memenuhi syarat kelulusan di kelas  `Belajar Membuat Aplikasi Back-End Untuk Pemula` Dicoding. bookshelf-api ini dibuat menggunakan NodeJS dengan framework Hapi

### # Run
By default, this API runs on endpoint '/books' and on port '9000'<br>
You can access it with 'http://{url}:9000/books'

---
### # Add Book
* `'POST'`
* `'http:{url}:9000/books'`
* `body`
  <pre>
    {
      "name" : "Buku A",
      "year": 2023,
      "author": "Joh Doe",
      "summary": "Lorem ipsum dolor sit amet",
      "publisher": "Dicoding Indonesia",
      "pageCount": 100,
      "readPage": 25,
      "reading": false
    }
  </pre>
