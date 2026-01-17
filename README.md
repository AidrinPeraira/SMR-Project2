# SMR-Project2

# About "Share my ride"

    This is a practice project done to understand the concepts of clean architecture and microservices in building a realworld production grade application. Below is basic information about the project and the stack used in it. This is just my attempt to understand the workflow and the various tech involved.

    This project is bult entirely using typescript for frontend and backend. NodeJS server for each backend service and NextJS for the frontend, using custom styled ShadCN library for UI components.

## What is the app for?

    "ShareMyRide" is a platform that connects people travelling solo over long distances. Helps them share thir car with other who are travelling along the same route. Share the Car. Share the Journey. Share the Expenses. Users can become passengers or drivers and switch between roles to hitch a ride and also to offer one.

# Features and Tech implemented in this project:

    Clean Architecture
    PNPM Package Manager
    Docker
    Next JS
    ShadCN UI Components
    Express Backend Server
    Google Authentication
    



##-----------------------------------------------------------------##

CLEAN ARCHITECTURE LAYERS

    DOMAIN (Core Business Rules)

    APPLICATION (Use Cases / Business Logic)

    INFRASTRUCTURE (Technical Implementation)

    PRESENTATION (User / System Interaction)

##-----------------------------------------------------------------##

# Services

    Frontend
        - Handles all pages for user (passenge / rider) and admins.
        - Uses static pages and server side rendering for pages
        - Only interactive componets are used client side
        - Communication from frontend to api - gateway is done through secure server actions
        - Google auth for sign up and sign in

        - Reusable Components made:

    API Gateway
        - receives all request from client
        - calls corresponding service using "http-proxy-middleware"


    User Service
        - register user.
        - login user.
        - Send Email using Nodemailer for OTP verification of email.
        - Handles google authenticated user entry into DB.