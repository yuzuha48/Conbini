# Conbini 🍙 

While it might seem strange, what I appreciate most about Japan is their convenience stores, known as "conbini." These establishments are not only widespread but consistently maintain a standard of cleanliness and offer a variety of affordable and delicious food options. Inspired by this, I developed an e-commerce platform that enables individuals outside of Japan to enjoy the conbini experience online. 

Customers can:
- 🔍 search for a product or filter by category 
- 🛒 add products to their cart and update or remove an item 
- 💵 enter their shipping, billing, and payment information at checkout and see a summary of their order upon purchase 

Staff can:
- 📝 search orders by ID, customer name, order date, shipping address, or status
- 🚚 view orders and update the status of an order
- 🍵 search products by ID, product name, or category 
- ➕ add a new product and determine a main image 
- 👀 view all products including their inventory count and quantity sold
- ✏️ edit or delete a product

In this project I:
- Developed a robust e-commerce platform using Django, Python, and JavaScript, including client-side and staff-side interfaces 
- Implemented AJAX for seamless and dynamic content updates, improving site responsiveness and reducing page load times 
- Created and maintained database schemas for CRUD of products and orders, ensuring efficient data storage and retrieval
- Utilized session to store products in a virtual cart

## Prerequisites

Ensure you have the following software installed on your machine:
- Python (version 3.6 or higher)
- pip (Python package installer)
- pipenv (Python package manager)

## Getting Started 

To get started with WanderGuide, follow these steps: 
1. Clone this repository to your local machine:
   - git clone https://github.com/yuzuha48/Conbini
2. Navigate to the project directory:
   ```
   cd Conbini
   ```
3. Install the required dependencies using pipenv:
   ```
   pipenv install
   ```
4. Activate the virtual environment:
   ```
   pipenv shell
   ```
5. Start Conbini by running the following command:
     ```
     python3 manage.py runserver
     ```
6. Open a web browser and visit `http://localhost:8000` to view the running app. 

