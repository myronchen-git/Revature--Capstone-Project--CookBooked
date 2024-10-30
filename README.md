# CookBooked

Welcome to CookBooked! This project aims to create a platform where users can explore, post a review, and comment on recipes. Whether you're a cooking enthusiast or simply looking for culinary inspiration, this application has something for everyone.


### Features

  - User Authentication: Users can register and log in to their accounts, distinguishing between User and Admin roles. Guests can browse the platform without logging in.
  - Recipe Browsing: Explore a wide range of recipes fetched from "TheMealDB" API. Sort recipes by category or ratings to find popular dishes.
  - Recipe Details: View detailed recipe descriptions including ingredients, instructions, and average ratings.
  - Review and Rating: Logged-in users can leave reviews and ratings for recipes. Admins can manage and delete reviews if warranted.
  - Commenting: Users can leave comments under recipes and posts. Admin can manage and delete reviews if warranted.
  - Profile Pages: View user profiles with basic information like username, profile picture, and 'about me' section. Users can edit their own profiles and view their own review posts.
  - Security: Passwords are securely hashed using BCrypt. Authentication is handled via JWTs.
  - Guests: Guests to this platform have view-only privileges to Recipes, Reviews, Comments and Profiles


### Technologies Used

#### Backend
  - Postman
  - DynamoDB
  - Node.js
  - Express.js
  - JSON Web Token
  - Jest

#### Frontend
  - React
  - TypeScript
  - Jest

#### DevOps
  - AWS EC2
  - Docker
  - CodePipeline
  - AWS S3
