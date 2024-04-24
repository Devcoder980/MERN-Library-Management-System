const newBook = (name, book, frontImageBuffer, backImageBuffer) => {
    // Convert the buffer to base64 string
    const frontImageData = frontImageBuffer.toString('base64');
    const backImageData = backImageBuffer.toString('base64');

    const a = `<div id="img">
<img src="data:image/jpeg;base64,${frontImageData}" alt="Book Cover" class="card-img-top front">
<img src="data:image/jpeg;base64,${backImageData}" alt="Book Cover" class="card-img-top back">
</div>`;

    console.log(a);
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

        #img {
            display: flex;
            justify-content: center;
            position: relative;
            /* add this */
        }

        #img>img {
            width: 8rem;
        }

        .front {
            z-index: 1;
            /* add this */
        }

        .back {
            transform: rotate(20deg);
            /* add this */
            position: absolute;
            /* add this */
            top: 1rem;
            /* adjust the top position to your liking */
            left: 50%;
            /* center the image horizontally */
            transform-origin: top center;
            /* rotate from the top center */
            z-index: 0;
            /* add this */
        }

        /* Media queries for adjusting image size */
        @media only screen and (min-width: 768px) {
            #img>img {
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
        ${a}
        <h1>HEllo</h1>
        <div id="hello">
        <img src="data:image/jpeg;base64,${frontImageData}" alt="Book Cover" class="card-img-top front">
        <img src="http://localhost:5000/api/v1/download/images_1713941556656.png" alt="Book Cover" class="card-img-top back">
               
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