# 🛡️ NestJS To-do App with JWT Authentication

A secure RESTful API built with **NestJS**, **MongoDB (Cloud Cluster)**, and **JWT** that supports **user registration**, **login**, **access/refresh token-based authentication**, and **session management**.

---

## 🚀 Features

- User registration with `name`, `email`, and `password`
- Login with email and password
- Secure password hashing with bcrypt
- JWT-based authentication (Access & Refresh tokens)
- Token refresh endpoint
- MongoDB Cloud integration with Mongoose
- RESTful API with DTO validation

---

## 📁 Technologies

- **NestJS**
- **Mongoose** (MongoDB ODM)
- **JWT** (`@nestjs/jwt`)
- **bcryptjs**
- **class-validator / class-transformer**

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/rafi-ruetcse17/backend.git


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Endpoints 

Base URL: http://localhost:4000

---

POST /auth/signup
------------------
Description: Register a new user.

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}

Success Response (201)

---

POST /auth/login
-----------------
Description: Login user and return tokens.

Request Body:
{
  "email": "john@example.com",
  "password": "yourpassword"
}

Success Response (200):
{
  "accessToken": "<JWT_ACCESS_TOKEN>",
  "refreshToken": "<JWT_REFRESH_TOKEN>"
}

---

POST /auth/refresh
-------------------
Description: Generate a new access token using a refresh token.

Request Body:
{
  "refreshToken": "<JWT_REFRESH_TOKEN>"
}

Success Response (200):
{
  "accessToken": "<NEW_JWT_ACCESS_TOKEN>"
}

---

Token Notes:
-------------
- Access Token: Short-lived (e.g., 15 minutes)
- Refresh Token: Long-lived (e.g., 7 days)
- Use access token for all protected routes
- When access token expires, use refresh token to get a new one

---

Status Codes:
--------------
200 – Success  
400 – Bad Request  
401 – Unauthorized  
403 – Forbidden  
500 – Server Error



## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
