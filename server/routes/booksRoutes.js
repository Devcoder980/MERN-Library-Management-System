const express = require('express');
const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const router = express.Router();
const path = require('path');
const multer = require('multer'); // For handling file uploads

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder for uploads
    },
    filename: (req, file, cb) => {
        const fileName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName); // Set the file name for the uploaded image
    },
});

// Set up multer for handling image uploads
const upload = multer({ storage: storage });

// Endpoint for uploading images for a particular book
router.put('/books/:isbn/images', upload.array('images', 5), async (req, res) => {
    try {
        const { isbn } = req.params;
        const book = await Book.findOne({ isbn });

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const uploadedImages = req.files.map(file => file.filename); // Define uploadedImages here
        book.images.push(...uploadedImages); // Add the uploaded image URLs to the book's images array
        await book.save();

        res.status(201).json({ message: 'Images added to the book successfully', images: uploadedImages }); // Use uploadedImages here

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for uploading images for a particular book
router.put('/books/:isbn/images/front', upload('front'), async (req, res) => {
    try {
        const { isbn } = req.params;
        const book = await Book.findOne({ isbn });

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const uploadedImages = req.files.map(file => file.filename); // Get the filenames of uploaded images
        book.frontImg = uploadedImages[0]; // Assuming only one image is uploaded for the front page
        await book.save();

        res.status(201).json({ message: 'Image added to the book successfully', image: uploadedImages[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.post('/books', asyncHandler(async (req, res) => {
    try {
        const { title, description, price_mrp, units, discount_percentage, language, pages, binding, publisher, genre, isbn, edition, contributors } = req.body;

        // Check if ISBN is present
        if (!isbn) {
            return res.status(400).json({ error: 'ISBN is required' });
        }

        // Check if ISBN already exists
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({ error: 'Book with the same ISBN already exists' });
        }


        const book = new Book({
            title, description, price_mrp, units, discount_percentage, language, pages, binding, publisher, genre, isbn, edition, contributors
        });

        await book.save();


        res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));


router.get('/books/search', asyncHandler(async (req, res) => {
    try {
        const { title, genre, minPrice, maxPrice, sort, page = 1 } = req.query;


        const limit = 20; // Number of records per page
        if (page < 1) return res.status(400).json({ message: 'Invalid page number' });
        let query = {
            units: { $gt: 0 } // Ensure that units are greater than 0
        };


        if (title) {
            query.title = new RegExp(title, 'i'); // Case-insensitive search
        }

        if (genre && genre == '') {
            query.genre = genre; // Add genre filter if needed
        }

        if (minPrice && !isNaN(minPrice)) { // Validate numeric value
            query.price_mrp = { $gte: minPrice }; // Greater than or equal to minPrice
        } else if (minPrice) {
            return res.status(400).json({ message: 'Invalid minimum price' });
        }

        if (maxPrice && !isNaN(maxPrice)) { // Validate numeric value
            query.price_mrp = { ...query.price_mrp, $lte: maxPrice }; // Less than or equal to maxPrice
        } else if (maxPrice) {
            return res.status(400).json({ message: 'Invalid maximum price' });
        }

        let sortOptions = {};
        if (sort) {
            const [sortField, sortOrder] = sort.split('-');
            sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
            // Validate allowed sort fields (optional)
        }

        const count = await Book.countDocuments(query); // Get total count first
        const books = await Book.find(query)
            .sort(sortOptions)
            .skip((page - 1) * limit) // Skip records for previous pages
            .limit(limit);

        res.status(200).json({
            data: books,
            total: count,
            currentPage: page,
            hasNextPage: count > page * limit
        });
    } catch (error) {
        console.error(error);
        let errorMessage = 'Error fetching books';
        if (error.name === 'CastError') {
            errorMessage = 'Invalid query parameter format';
        }
        res.status(500).json({ message: errorMessage });
    }
}));


router.get('/books/genres', asyncHandler(async (req, res) => {
    try {
        const genres = await Book.distinct('genre');
        res.status(200).json({ genres });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));

router.get('/books/:isbn', asyncHandler(async (req, res) => {
    try {
        const { isbn } = req.params;
        const
            book = await Book.findOne({
                isbn
            });
        if (!book) {
            return res.status(404).json({
                error: 'Book not found'
            });
        }
        res.status(200).json({
            data: book
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}));


router.delete('/books/:isbn', asyncHandler(async (req, res) => {
    try {
        const { isbn } = req.params;
        // Find the book by ISBN
        const book = await Book.findOne({ isbn });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        // Delete the book
        await Book.deleteOne({ isbn });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));

// GET file download
router.get('/download/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads', filename);

    res.download(filePath, (err) => {
        if (err) {
            res.status(500).json({ message: 'File download failed' });
        }
    });
});



module.exports = router;