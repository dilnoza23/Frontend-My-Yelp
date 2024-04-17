# AWS Yelp Clone

## Task

The task of this project is to create a simplified version of Yelp using AWS services.

## Description

AWS Yelp Clone is a web application that allows users to search for restaurants, view details such as ratings and reviews, and add their own reviews. It utilizes various AWS services for backend infrastructure, including AWS Amplify, AWS AppSync, and Amazon DynamoDB.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/aws-yelp-clone.git
   ```

2. Navigate to the project directory:
   ```
   cd aws-yelp-clone
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up your Amplify project:
   ```
   amplify init
   ```

5. Run the application:
   ```
   npm start
   ```

## Usage

1. Sign up or log in to the application.
2. Use the search functionality to find restaurants by name or location.
3. View details of each restaurant, including ratings and reviews.
4. Add your own review for a restaurant.

## Note about AWS files

For security reasons, certain AWS files are not uploaded to the repository. These include:

- `amplify/\#current-cloud-backend`
- `amplify/.config/local-*`
- `amplify/logs`
- `amplify/mock-data`
- `amplify/mock-api-resources`
- `amplify/backend/amplify-meta.json`
- `amplify/backend/.temp`

These files may contain sensitive data or configurations specific to your local environment and should not be shared publicly.