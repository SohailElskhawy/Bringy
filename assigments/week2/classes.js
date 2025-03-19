class User {
    constructor(name, id, email, password, role, isVerified) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isVerified = isVerified;
    }
    login() {
        // Implement login logic
    }
    logout() {
        // Implement logout logic
    }
}

class Admin extends User {
    constructor(name, id, email, password) {
        super(name, id, email, password, 'admin', true);
    }
    getProducts() {}
    addNewProduct(product) {}
    deleteProduct(productId) {}
    updateProduct(product) {}
    addNewCategory(category) {}
    updateOrder(orderId, status) {}
    sendEmailVerification(orderId) {}
}

class Customer extends User {
    constructor(name, id, email, password) {
        super(name, id, email, password, 'customer', false);
    }
    addToBasket(product) {}
    checkout(basket, address, paymentMethod) {}
    getCustomersOrders(customerId) {}
    filterProductsByCategory(category) {}
    searchProductsByName(text) {}
    sortProducts(mode) {}
}

class Delivery extends User {
    constructor(name, id, email, password) {
        super(name, id, email, password, 'delivery', true);
        this.orderList = [];
    }
    viewAllUndeliveredOrders() {}
    updateOrder(orderId, status) {}
    sendEmailOrderStatus(orderId) {}
}

class Basket {
    constructor(id, customerId) {
        this.id = id;
        this.customerId = customerId;
        this.products = []; // Array of {product, quantity}
    }
    removeProduct(productId) {}
    increaseQuantity(productId) {}
    decreaseQuantity(productId) {}
}

class Order {
    constructor(id, customerId, paymentMethod) {
        this.id = id;
        this.customerId = customerId;
        this.isDelivered = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.paymentMethod = paymentMethod;
    }
    printOrder() {}
}

class OrderItems {
    constructor(orderId) {
        this.orderId = orderId;
        this.products = []; // Array of {product, quantity}
    }
}

class Product {
    constructor(id, name, price, image, category, supplier) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.category = category;
        this.supplier = supplier;
        this.isDeleted = false;
    }
}

class Category {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
    static getAllCategories() {}
    getAllProducts() {}
    getProductByCategory(category) {}
}

class Supplier {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class ChatBot {
    suggestProducts() {}
    analyzeRequest(userInput) {}
    confirmBasket(products) {}
}

module.exports = {
    User,
    Admin,
    Customer,
    Delivery,
    Basket,
    Order,
    OrderItems,
    Product,
    Category,
    Supplier,
    ChatBot
};
