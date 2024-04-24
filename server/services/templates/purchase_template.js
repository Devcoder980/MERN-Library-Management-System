
const HTML_TEMPLATE = (text) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Book Purchase Successful - BookSaga</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  </head>
  <body>
      <div class="container">
          <div class="row">
              <div class="col-md-8 offset-md-2">
                  <h1 class="text-center">Book Purchase Successful!</h1>
                  <p class="text-center">Dear [User Name],</p>
                  <p>Thank you for purchasing [Book Title] from BookSaga!</p>
                  <div class="card mb-3">
                      <img src="book-cover.jpg" alt="Book Cover" class="card-img-top">
                      <div class="card-body">
                          <h5 class="card-title">Book Title: [Book Title]</h5>
                          <p class="card-text">Author: [Author Name]</p>
                          <p class="card-text">Description: [Book Description]</p>
                      </div>
                  </div>
                  <p>Your book will be shipped to you within 3-5 business days.</p>
                  <p>Order Details:</p>
                  <ul>
                      <li>Order ID: [Order ID]</li>
                      <li>Book Title: [Book Title]</li>
                      <li>Quantity: [Quantity]</li>
                      <li>Total: [Total]</li>
                  </ul>
                  <p class="text-center">Thank you for shopping at BookSaga!</p>
                  <p class="text-center">Best regards,</p>
                  <p class="text-center">The BookSaga Team</p>
              </div>
          </div>
      </div>
  </body>
  </html>
    
    `;
}

module.exports = HTML_TEMPLATE;