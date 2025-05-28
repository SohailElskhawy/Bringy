# Bringy API Documentation

## Product Endpoints

### POST /api/products
- **Description**: Add a new product
- **Body**:
  - name: string
  - price: number
  - image_url: string
  - category_id: string
  - supplier_id: string

### GET /api/products
- **Description**: Get all products

### GET /api/products/category/:category_id
- **Description**: Get products by category

### GET /api/products/sort/:order
- **Description**: Sort products by price (asc or desc)

### GET /api/products/search/:searchTerm
- **Description**: Search products by name

### PUT /api/products/:id
- **Description**: Update product

### DELETE /api/products/:id
- **Description**: Soft-delete product

### PATCH /api/products/restore/:id
- **Description**: Restore deleted product

---

## Category Endpoints

### POST /api/categories
- **Description**: Add new category
- **Body**: { name: string }

### GET /api/categories
- **Description**: Get all categories

### GET /api/categories/:id
- **Description**: Get category by ID

### PUT /api/categories/:id
- **Description**: Update category

### DELETE /api/categories/:id
- **Description**: Delete category

---

## Supplier Endpoints

### POST /api/suppliers
- **Description**: Add new supplier
- **Body**: { name: string }

### GET /api/suppliers
- **Description**: Get all suppliers

---

## Basket Endpoints

### POST /api/basket/add
- **Description**: Add product to basket
- **Body**: basketId, productId, quantity

### POST /api/basket/increase
- **Description**: Increase product quantity in basket

### POST /api/basket/decrease
- **Description**: Decrease product quantity in basket

### POST /api/basket/remove
- **Description**: Remove product from basket

### POST /api/basket/clear
- **Description**: Clear all products from basket

---

## Order Endpoints

### POST /api/orders
- **Description**: Add new order
- **Body**: customerId, is_delivered, paymentMethod, totalPrice, address

### GET /api/orders
- **Description**: Get all orders

### GET /api/orders/:id
- **Description**: Get order by ID

### PUT /api/orders/:id
- **Description**: Update order delivery status

### DELETE /api/orders/:id
- **Description**: Delete order

### GET /api/orders/customer/:customerId
- **Description**: Get orders by customer ID

---

## Order Items Endpoints

### POST /api/order-items
- **Description**: Add order items
- **Body**: orderId, products [{ productId, quantity, price }]

### GET /api/order-items/:orderId
- **Description**: Get order items by order ID

---

## User Endpoints

### POST /api/auth/register
- **Description**: Register new user
- **Body**: name, email, password

### POST /api/auth/login
- **Description**: Login user

### POST /api/auth/admin-login
- **Description**: Login as admin or delivery

### GET /api/auth/verify-email?token=...
- **Description**: Verify email using token
