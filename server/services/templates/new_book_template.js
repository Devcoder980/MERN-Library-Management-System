const newBook = (name, book, frontImageBuffer, backImageBuffer) => {
    // Convert the buffer to base64 string
    const frontImageData = frontImageBuffer.toString('base64');
    const backImageData = backImageBuffer.toString('base64');

    const a = `<div id="img">
<img src="data:image/jpeg;base64,${frontImageData}" alt="Book Cover" class="card-img-top front">
<img src="data:image/jpeg;base64,${backImageData}" alt="Book Cover" class="card-img-top back">
</div>`;


    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Book Arrival - BookSaga</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap">
    <style>
        body {
            font-family: 'Montserrat', sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
            padding: 20px;
        }
        .highlight {
            color: #4a86e8;
        }

        .card {
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 20px;
            overflow: hidden;
            padding-top: 2rem;
        }

        .card-img-top {
            width: 100%;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }

        .card-body {
            padding: 20px;
        }

        .btn {
            display: inline-block;
            background-color: #4a86e8;
            color: #fff;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
            transition: background-color 0.3s;
        }

        .btn:hover {
            background-color: #3068b6;
        }

        .footer {
            margin-top: 20px;
            font-size: 14px;
        }


     
        .imga{
            display: flex;
            width: 24rem;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        .imga>img {
            width: 8rem;
        }

        .front {
            z-index: 1;
        }

        .back {
            transform: rotate(20deg);
            position: absolute;
            top: 1rem;
            left: 50%;
            transform-origin: top center;
            z-index: 0;
        }

        /* Media queries for adjusting image size */
        @media only screen and (min-width: 768px) {
            .imga>img {
                width: 12rem;
            }
        }
         /* Style for the heading */
         h1 {
            font-size: 28px;
            font-weight: bold;
            color: #4a86e8;
            margin-bottom: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div>
            <img src="./logo.png" width="80" height="80" alt="BookSaga Logo">
        </div>
        <h1>New Book Arrival!</h1>
        <p>
            Dear <span class="highlight">${name}</span>,
        </p>
        <p>
            We're excited to announce the arrival of a new book at
            <span class="highlight">BookSaga!</span>
        </p>

        <div class="card">
 
        <div id="img" class="imga">      
            <img src="https://rukminim2.flixcart.com/image/832/832/l3vxbbk0/book/w/r/e/do-epic-shit-original-imagewkzqvsxfyg4.jpeg?q=70&crop=false" alt="Book Cover" class="card-img-top front">
       </div>
             
           
     
            <div class="card-body">
                <h5 class="card-title">Book Title: <span class="highlight">${book.title}</span></h5>
                <p class="card-text">Author: <span class="highlight">${book.contributors[0].author}</span></p>
                <p class="card-text">Description: <span class="highlight">${book.description}</span></p>
            </div>
        </div>
        <p>
            Get your copy now and start reading!
        </p>
        <a href="#" class="btn">Buy Now</a>
        <p class="footer">
            Best regards,<br>
            The <span class="highlight">BookSaga</span> Team
        </p>
    </div>
</body>

</html>
`;
}

module.exports = newBook;
