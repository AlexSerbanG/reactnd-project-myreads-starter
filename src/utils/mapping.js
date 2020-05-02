export const bookFromDb = (book) => ({
    id: book.id,
    shelf: book.shelf || "none",
    title: book.title,
    authors: book.authors || ["Unmentioned"],
    backgroundUrl: book.imageLinks.smallThumbnail,
  });
