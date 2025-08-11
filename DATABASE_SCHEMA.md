# Database Schema

## Tables

### products
Stores all product information for the Handcrafted Haven marketplace.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| slug | VARCHAR | URL-friendly product identifier |
| image | VARCHAR | Product image URL |
| name | VARCHAR | Product name/title |
| description | TEXT | Product description |
| price | DECIMAL | Product price |
| artist_name | VARCHAR | Name of the artisan/creator |

### reviews
Stores customer reviews for products.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| product_id | INTEGER | Foreign key to products.id |
| user | VARCHAR | Reviewer name |
| comment | TEXT | Review text |
| rating | INTEGER | Rating (1-5 stars) |
| date | TIMESTAMP | Review date |

## Sample Data

### Products
```sql
INSERT INTO products (slug, image, name, description, price, artist_name) VALUES
('handmade-ceramic-mug', '/products/mug.jpg', 'Handmade Ceramic Mug', 'A beautiful, hand-thrown ceramic mug glazed in earthy tones.', 28.00, 'Egor Sotnikov'),
('knitted-wool-scarf', '/products/scarf.jpg', 'Knitted Wool Scarf', 'Cozy and warm, this scarf is made from 100% natural wool.', 35.00, 'Natanael da Matta'),
('wooden-jewelry-box', '/products/box.jpg', 'Wooden Jewelry Box', 'A finely crafted jewelry box made from reclaimed wood.', 45.00, 'Okai Anderson');
```

### Reviews
```sql
INSERT INTO reviews (product_id, user, comment, rating, date) VALUES
(1, 'Sarah M.', 'Beautiful craftsmanship! The mug feels great in hand.', 5, NOW()),
(1, 'Mike R.', 'Love the earthy colors. Perfect for my morning coffee.', 4, NOW()),
(2, 'Emma L.', 'So soft and warm! Perfect for winter.', 5, NOW()),
(3, 'David K.', 'Excellent quality woodwork. Very satisfied.', 5, NOW());
```

## Queries

The application uses the following main queries:

- `getAllProducts()` - Get all products ordered by newest first
- `getProductBySlug(slug)` - Get a specific product by its slug
- `searchProducts(query)` - Search products by name, description, or artist
- `getProductsByArtist(artistName)` - Get all products by a specific artist
- `getProductsByPriceRange(min, max)` - Get products within a price range
- `getRecentProducts(limit)` - Get the most recent products
- `getReviewsByProductId(productId)` - Get reviews for a specific product
- `addReview(productId, user, comment, rating)` - Add a new review
- `getProductStats()` - Get overall product statistics

## Environment Variables

Make sure to set the following environment variable:
```
POSTGRES_URL=your_postgres_connection_string
``` 