const {
  addBook,
  getAllBooks,
  getBookById,
  editBook,
  deleteBookById,
} = require('./handler');

const routes = [
  // menambahkan buku
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  // menampilkan seluruh buku
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  // menampilkan seluruh buku berdasarkan nama yang diberikan melalui query
  {
    method: 'GET',
    path: '/books/$name',
    handler: getAllBooks,
  },
  // menampilkan seluruh buku berdasarkan status finish yang diberikan melalui query
  {
    method: 'GET',
    path: '/books/$finished',
    handler: getAllBooks,
  },
  // menampilkan seluruh buku berdasarkan status sedang dibaca yang diberikan melalui query
  {
    method: 'GET',
    path: '/books/$reading',
    handler: getAllBooks,
  },
  // menampilkan detail buku
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  },
  // mengubah data buku
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBook,
  },
  // menghapus buku
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookById,
  },
];

module.exports = routes;
