# Product listing website
Created a product listing website with features that are mentioned in the question description. Listing the all products in home page that get from api. User can filter the products based on the category. User can add new products in this list and also they can delete products in list. User can add and remove products into watch list(favorite product list). When clicking a specific product page will navigate to product details page and it shows full details of product. 

## Features
- Header/nav bar:
    - Product logo: it will navigate to home page
    - Home link: it will navigate to home page
    - Watch list link: it will navigate to watch list page
    - Category link: it will open the category list
    - Create button: it will navigate to create product page

- Product card:
    - product image
    - product name
    - product price
    - delete button: for delete a product
    - add to favorite button: for adding to favorite

- Home page:
    - listing products by using product card

- Category page:
    - listing specific category products by using product card

- watch list page:
    - listing the favorite products by using product card

- Product details page:
    - showing the details of a product

- Create product page:
    - it has a form for creating new product
    - used react-hook-form for handling form
    - used yup library form validation

## Technologies used

- React with typescript
- Tailwind css
- redux
- redux-toolkit
- redux-persist

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

