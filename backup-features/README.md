# Shopping Cart & Search Bar Components

This folder contains the essential e-commerce components that were implemented:

## Shopping Cart Components

### `CartContext.tsx`
- React context for managing cart state across the application
- Provides functions: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`
- Uses localStorage for persistence

### `CartIcon.tsx`
- Cart icon component that shows item count
- Opens cart modal when clicked
- Displays in the header

### `CartModal.tsx`
- Modal that displays all cart items
- Allows quantity updates and item removal
- Shows total price and checkout button

### `AddToCartButton.tsx`
- Button component for adding products to cart
- Includes quantity selector
- Shows success feedback

### `cart.ts`
- Utility functions for cart operations
- localStorage management
- Cart calculations

## Search Bar Components

### `SearchBar.tsx`
- Search input with autocomplete functionality
- Shows product suggestions as you type
- Clickable search results with product images and details

## Integration Notes

To integrate these components:

1. **CartProvider** should wrap your app in `layout.tsx`
2. **SearchBar** can be added to the Header component
3. **CartIcon** should be placed in the Header navigation
4. **AddToCartButton** can be used on product cards and detail pages

## Dependencies

- React hooks (useState, useEffect, useContext)
- Next.js Image component
- Tailwind CSS for styling
- localStorage for data persistence
