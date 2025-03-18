public class Admin {

    public boolean addNewProduct(Product product) {
        // if the product is already has been added return false 
        return true; 
    }
    
    public boolean deleteProduct(Product product) {
        // if the product already not exist it returns false 
        return true; 
    }

    public boolean updateProduct(Product product) {
        /*
         updates the product's name, id, or category 
         return false if updating failed
         */
        return true; 
    }

    public boolean addNewCategory(Category category) {
        // return false if the category already exist 
        return true; 
    }

    public void updateOrder(int orderId, String status) {

    }

    public void sendMailVertification(int orderId) {
        /*
         sends vertification code to the customer or deliveryman
         */
    }
}
