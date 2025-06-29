# Bringy Delivery App

## Project Description:

“Bringy” is a web-based application of an idea that look like Getir the delivery app
 There will be a login page for the customer after the customer logs in and the customer will see the products. The customer will be able to filter them, sort them, add to basket and edit the basket, and after the customer confirms his purchases, the customer will be able to checkout and see his order in the purchases page. Our Team is not copying Getir. We have an idea of integrating the app with AI where the customer will be able to talk to a chatbot that will help him add the items he needs with a click of a button

From the admin side there will also be a login page for the admins and there will be only 2 pages one page to create, read, update, and delete the products, and suppliers.
The second page is to track the orders and change the order status to delivered and print a receipt of the order only admins will be able to see the products and order pages and the rest of staff (the delivery guy for example) will only see the undelivered orders  

Team's Name: 
- PRO-CODE
Team Members:
- 1306230116    	 Sohail Mohamed     	Elskhawy      s.elskhawy@ogr.iuc.edu.tr   
- 1306220129   	     Ebrahim     			Alkridi       ebrahim.alkridi@ogr.iuc.edu.tr    
- 1306210119         Sidra                  Bkdash        sdra.alkudsi@ogr.iuc.edu.tr  


## How To Run The Project 

### ✅ Prerequisites
Make sure you have the following installed:
- Node.js (v14+)
- npm or yarn
- Git

### 1. Clone the repository
```bash
git clone https://github.com/SohailElskhawy/Bringy.git
cd bringy
```

### 2. Switch To The Development Branch
```bash
git checkout dev
```
### 3. Make Sure The Secret Keys .env File Is Inside The Backend Folder
```bash
\Bringy\backend\.env
```


### 4. Open Two Terminals For Running

### frontend terminal
```bash
 cd frontend
 npm install
 npm run dev
```

### backend  terminal
```bash
 cd backend
 npm install
 npm start
 ```




## Project's Structure 

bringy/ <br>
├── backend/ <br>
│   ├── controllers/ <br>
│   ├── models/ <br>
│   ├── routes/ <br>
│   ├── services/ <br>
│   ├── tests/ <br>
│   ├── .env <br>
│   └── server.js <br>
├── frontend/ <br>
│   └── src/ <br>
└── README.md <br>


