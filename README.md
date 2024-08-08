# Personal-Finance-Advisor documentation

1. **Description**

    - Language: JavaScript (node.js v20.15.1)
    - Database: MySQL
    - Docker

2. **Launch**

    - Installation from GitHub
    - Running on docker

3. **API documentation**
    - Base URL
        - http://localhost:3000
    - Endpoints
        - api/v1/register
        - api/v1/login
        - api/v1/profile
        - api/v1/loans
        - api/v1/currencies

---

## 1. Description

The application involves calculating creditworthiness and a loan repayment program.
The application has the main following functionalities: register, login and make a loan offer.

Technologies:

-   Language: JavaScript (node.js v20.14.0)
-   Database: MySQL
-   Docker

---

## 2. Launch

Install application from GitHub

```
git clone https://github.com/CMielczarek/Personal-Finance-Advisor.git
```

---

Go to the application folder

```
cd Personal-Finance-Advisor
```

---

Run application using docker

```
docker compose up
```

---

Stop application using docker

```
docker compose down
```

## 3. API Documentation

Base URL
`http://localhost:5500`

---

### User registration

-   Endpoint: `/api/register`
-   Method: `POST`

Request body:

```json
{
	"username": "string",
	"email": "string",
	"password": "string"
}
```

Response body:

```json
{
	"message": "User registered successfully",
	"user": {
		"user_id": "integer",
		"username": "string",
		"email": "string",
		"created_at": "datetime"
	}
}
```

| Status code | Message                                       |
| ----------- | --------------------------------------------- |
| 409         | An account with the given data already exists |
| 400         | Invalid data                                  |
| 200         | OK                                            |

---

### User login

-   Endpoint: `/api/login`
-   Method: `POST`

Request body:

```json
{
	"username": "string",
	"password": "string"
}
```

Response body:

```json
{
	"token": "string"
}
```

| Status code | Message      |
| ----------- | ------------ |
| 400         | Invalid data |
| 200         | OK           |

---

### Get user profile

-   Endpoint: `/api/profile`
-   Method: `GET`

Request header:

```
Authorization: Bearer <token>
```

Response body:

```json
{
	"user_id": "integer",
	"username": "string",
	"email": "string"
}
```

---

### Update user profile

-   Endpoint: `/api/profile`
-   Method: `PATCH`

Request header:

```
Authorization: Bearer <token>
```

Request body:

```json
{
	"email": "string"
}
```

Response body:

```json
{
	"message": "Profile updated successfully",
	"user": {
		"user_id": "integer",
		"username": "string",
		"email": "string"
	}
}
```

| Status code | Message      |
| ----------- | ------------ |
| 400         | Invalid data |
| 200         | OK           |

---

### Create a loan offer

-   Endpoint: `/api/loans`
-   Method: `POST`

Request header:

```
Authorization: Bearer <token>
```

Request body:

```json
{
	"salary": "float",
	"currency": "string",
	"loan_term": "integer (months)",
	"APR": "float"
}
```

Response body:

```json
{
	"offer_id": "integer",
	"salary": "float",
	"currency": "string",
	"term": "integer (months)",
	"APR": "float",
	"max_value": "float",
	"installment": "float",
	"total_interest": "float",
	"user_id": "integer"
}
```

| Status code | Message      |
| ----------- | ------------ |
| 400         | Invalid data |
| 200         | OK           |

---

### Get a user loan offers

-   Endpoints:

    -   `/api/loans`

        | Query      | Type   | Required | Description             |
        | ---------- | ------ | -------- | ----------------------- |
        | `currency` | string | yes      | search by currency code |
        | `APR`      | float  | yes      | search by APR           |

    -   `/api/loans/{id}`

        | Parameter | Type   | Required | Description        |
        | --------- | ------ | -------- | ------------------ |
        | `id`      | string | yes      | search by offer id |

-   Method: `GET`

Request header:

```
Authorization: Bearer <token>
```

Response body:

```json
{
  "loan_offers": [{"offer_id": "integer",
  "salary":  "float",
  "currency": "string",
  "loan_term": "integer (months)",
  "APR": "float",
  "max_value": "float",
  "installment_amount": "float",
  "total_interest": "float",
  "user_id": "integer"}, ...]
}
```

---

### Delete user loan offer

-   Endpoint:

    -   `/api/loans/{id}`

        | Parameter | Type   | Required | Description        |
        | --------- | ------ | -------- | ------------------ |
        | `id`      | string | yes      | delete by offer id |

-   Method: `DELETE`

Request header:

```
Authorization: Bearer <token>
```

Response body:

```json
{
	"offer_id": "integer",
	"salary": "float",
	"currency": "string",
	"loan_term": "integer (months)",
	"APR": "float",
	"max_value": "float",
	"installment_amount": "float",
	"total_interest": "float",
	"user_id": "integer"
}
```
