# 📚 Readify – Full-Stack Bookstore Web Application

**Readify** is a feature-rich, full-stack online bookstore developed using **Node.js**, **Express**, **MongoDB**, and **EJS**, structured using the **MVC architecture**. It includes both user and admin interfaces with complete e-commerce functionalities such as cart, wishlist, coupon, wallet, Razorpay integration, referral offers, and sales reports.

> ✅ Hosted securely with HTTPS on aws

---

## 🚀 Features

### 👤 User Side

#### 🧾 Authentication & Profile
- Signup with OTP verification and timer
- Google & Facebook login (SSO)
- Forgot password and reset via OTP
- View/edit profile details (email verification required on update)
- Change password securely

#### 📘 Product Browsing
- Browse books by category, brand, and filters
- Powerful search + sort (price, name, rating, etc.)
- Pagination with backend support
- Product detail page with:
  - Image zoom
  - Breadcrumbs
  - Ratings, discounts, stock info, and specs
  - Related product recommendations
  - Proper error handling for unavailable/out-of-stock/blocked items

#### ❤️ Wishlist
- Add/remove from wishlist
- Add to cart removes from wishlist automatically
- Available on both listing and product detail pages

#### 🛒 Cart Management
- Add to cart with quantity control
- Handle stock limits and max quantity
- Blocked or unlisted products are not allowed
- Out-of-stock items shown as disabled

#### 📦 Checkout & Orders
- Add/edit/delete delivery addresses
- Select default address
- Apply/remove coupon codes
- Checkout with:
  - Razorpay
  - Cash on Delivery (COD only for orders below ₹1000)
- Order success/failure pages with proper redirection
- Order listing with unique Order ID, date, status
- Order details page with PDF invoice download
- Cancel/return specific items or entire order with reason

#### 👛 Wallet
- Wallet for refunds (from returns or canceled orders)
- Admin confirms return before wallet credit

#### 🎁 Coupon & Referral
- Apply and remove coupons on checkout
- Referral system:
  - Via referral link or referral code
  - On successful signup, existing user receives a unique coupon

---

### 🛠️ Admin Side

#### 🔐 Admin Authentication
- Admin login/logout with session management

#### 👥 User Management
- View, search, block/unblock, delete users
- Pagination and sorted by latest

#### 🗂 Category & Brand Management
- Add/Edit/Delete (soft delete supported)
- Search, filter, pagination, and sorted views

#### 📚 Product Management
- Add/Edit/Delete books
- Upload multiple images (minimum 3) using a single input
- Crop and resize images with Cloudinary integration
- Search, filter, and manage stock
- Block/unlist products

#### 📦 Order Management
- View and update order status (Pending → Delivered)
- View return requests and confirm refund to wallet
- Cancel items and restore stock
- Pagination, filter, and search

#### 🏷️ Offer & Coupon Management
- Add offers on products or categories
- Apply higher offer when both exist
- Create/delete coupon codes with validations

#### 📈 Sales Reporting
- Generate reports by:
  - Day
  - Week
  - Month
  - Custom date range
- Show discount/coupon deductions
- Total order count, total sales amount
- Download reports as PDF or Excel

#### 📊 Admin Dashboard
- Graphs for:
  - Revenue
  - Orders
  - Book sales
- Top 10 selling:
  - Products
  - Categories
  - Brands
- Filter data by yearly, monthly, weekly

---

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, Bootstrap, EJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Sessions, Google OAuth
- **Payment Integration**: Razorpay
- **Image Handling**: Cloudinary
- **PDF/Excel Generation**: jsPDF, ExcelJS
- **Security**: OTP verification, HTTPS

---
## 🔧 Setup Instructions

Follow the steps below to set up and run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/imsanupm/readify-bookstore.git
cd readify-bookstore
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Configure Environment Variables
Create a .env file in the root directory and add the following variables:

env
Copy
Edit
PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
4️⃣ Start the Server
bash
Copy
Edit
npm start
5️⃣ Access the Application
Open your browser and navigate to:

arduino
Copy
Edit
http://localhost:3000
