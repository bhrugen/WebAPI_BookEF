using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI_BookEF.Models;

namespace WebAPI_BookEF.Controllers
{
    public class BookController : ApiController
    {
        private ApplicationDbContext db;

        public BookController()
        {
            db = new ApplicationDbContext();
        }

        //GET : api/Book
        public IHttpActionResult GetBooks()
        {
            return Ok(db.Books.ToList());
        }

        //GET : api/Book/5
        public IHttpActionResult GetBook(int id)
        {
            Book book = db.Books.Find(id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        //PUT : api/Book/5
        public IHttpActionResult PutItem(int id, Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Book bookFromDb = db.Books.Find(id);

            if (bookFromDb == null)
            {
                return NotFound();
            }

            bookFromDb.Name = book.Name;

            db.SaveChanges();

            return Ok(db.Books.ToList());
        }


        // POST : api/Book
        public IHttpActionResult PostBook(Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            db.Books.Add(book);
            db.SaveChanges();

            return Ok(db.Books.ToList());
        }


        //DELETE : api/Book/5
        public IHttpActionResult DeleteBook(int id)
        {
            Book book = db.Books.Find(id);

            if (book == null)
            {
                return NotFound();
            }

            db.Books.Remove(book);
            db.SaveChanges();

            return Ok(db.Books.ToList());

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
        }

    }
}
