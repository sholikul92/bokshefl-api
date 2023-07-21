/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable arrow-parens */
// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const books = require('./books');

// membuat fungsi handler untuk menambahkan buku
// eslint-disable-next-line consistent-return
const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  // jika nama buku tidak di isi maka akan error
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // jika nilai properti readPage lebih besar dari pageCount maka akan error
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBook = {
    // eslint-disable-next-line max-len
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSucces = books.filter((book) => book.id === id).length > 0;

  if (isSucces) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
};

// membuat fungsi handler untuk menampilkan seluruh buku
const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  // menampilkan buku yang berisikan nama berdasarkan query yang diberikan
  if (name) {
    const bookName = books.filter(book => book.name?.toLowerCase().includes(name.toLowerCase()));
    const response = h.response({
      status: 'success',
      data: {
        books: bookName.map(book => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  // menampilkan buku berdasarkan status sedang dibaca atau tidak
  if (reading) {
    const bookReading = books.filter(book => book.reading === Boolean(Number(reading)));
    const response = h.response({
      status: 'success',
      data: {
        books: bookReading.map(book => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  // menampilkan buku berdasarkan status sudah selesai membaca atau belum
  if (finished !== undefined) {
    const bookFinish = books.filter(book => book.finished === Boolean(Number(finished)));
    const response = h.response({
      status: 'success',
      data: {
        books: bookFinish.map(book => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  const getBook = books.filter(book => book.name);
  const response = h.response({
    status: 'success',
    data: {
      books: getBook.map(book => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// membuat fungsi handler untukk menampilkan detail buku
const getBookById = (request, h) => {
  const { bookId } = request.params;

  // eslint-disable-next-line no-shadow
  const book = books.filter(book => book.id === bookId)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// membuat fungsi handler untuk mengubah data buku
const editBook = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  // eslint-disable-next-line no-shadow
  const index = books.findIndex(book => book.id === bookId);

  // server merespon gagal bila client tidak melampirkan nama body
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // server merespon gagal bila readPage lebih besar dari pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// membuat fungsi handler untuk menghapus buku
const deleteBookById = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex(book => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  editBook,
  deleteBookById,
};
