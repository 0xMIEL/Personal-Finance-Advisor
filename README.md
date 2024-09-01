# Personal-Finance-Advisor documentation

1. **Description**

   - Language: JavaScript (node.js v20.16.0)
   - Database: MySQL
   - Docker

2. **Launch**

   - Installation from GitHub
   - Running on docker

3. **API documentation**
   - Base URL
     - http://localhost:5500
   - Endpoints
     - api/v1/offers
       - api/v1/users
       - api/v1/currencies

---

## 1. Description

The application involves calculating creditworthiness and a loan repayment program.
The application has the main following functionalities: register, login and make a loan offer.

Technologies:

- Language: JavaScript (node.js v20.16.0)
- Database: MySQL
- Docker

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
npx tsc && docker compose up -d
```

---

Stop application using docker

```
docker compose down
```

---

Test code

```
npm run test
```

## 3. API Documentation

Base URL
`http://localhost:5500`

---

### User registration

- Endpoint: `/api/v1/users/register`
- Method: `POST`

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
	"message": "string",
	"user": {
		"user_id": "integer",
		"username": "string",
		"hash": "string",
		"created_at": "datetime"
	},
	"token": "string"
}
```

| Status code | Message                                       |
| ----------- | --------------------------------------------- |
| 409         | An account with the given data already exists |
| 400         | Invalid data                                  |
| 200         | OK                                            |

---

### User login

- Endpoint: `/api/v1/users/login`
- Method: `POST`

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
	"message": "string",
	"token": "string"
}
```

| Status code | Message      |
| ----------- | ------------ |
| 400         | Invalid data |
| 200         | OK           |

---

### Delete user account

- Endpoint: `/api/v1/users/deleteAccount`
- Method: `DELETE`

Request header:

```
Authorization: Bearer <token>
```

Request body:

```json
{
	"username": "string"
}
```

Response body:

```json
{
	"message": "string"
}
```

| Status code | Message      |
| ----------- | ------------ |
| 400         | Invalid data |
| 200         | OK           |

---

### Create an offer

- Endpoint: `/api/offers`
- Method: `POST`

Request header:

```
Authorization: Bearer <token>
```

Request body:

```
"salary": "number",
"currency_symbol": "string",
"loan_term": "number"

```

Response body:

```json
{
	"message": "string",
	"offer": {
		"offer_id": "number",
		"currency_symbol": "string",
		"loan_term": "number",
		"salary": "number",
		"loan_amount": "number",
		"total_loan_cost": "number",
		"total_interest": "number",
		"payment_amount": "number",
		"created_at": "string",
		"user_id": "number"
	}
}
```

---

### Update a offer

- Endpoint: `/api/offers/:offerId`
- Method: `PUT`

Request header:

```
Authorization: Bearer <token>
```

Request body:

```
"salary": "number",
"currency_symbol": "string",
"loan_term": "number"

```

Response body:

```json
{
	"message": "string",
	"offer": {
		"offer_id": "number",
		"currency_symbol": "string",
		"loan_term": "number",
		"salary": "number",
		"loan_amount": "number",
		"total_loan_cost": "number",
		"total_interest": "number",
		"payment_amount": "number",
		"created_at": "string",
		"user_id": "number"
	}
}
```

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| `offerId` | number | yes      | update by offer id |

---

### Get all offers

- Endpoint: `/api/v1/offers`
- Method: `GET`

Request header:

```
Authorization: Bearer <token>
```

Response body:

```
"message": "string"
"offer": [{
		"offer_id": "number",
		"currency_symbol": "string",
		"loan_term": "number",
		"salary": "number",
		"loan_amount": "number",
		"total_loan_cost": "number",
		"total_interest": "number",
		"payment_amount": "number",
		"created_at": "string",
		"user_id": "number"
	}, ...]
```

---

### Get an offer

- Endpoint: `/api/v1/offers/:offerId`
- Method: `GET`

Request header:

```
Authorization: Bearer <token>
```

Response body:

```
{
	"message": "string",
	"offer": {
		"offer_id": "number",
		"currency_symbol": "string",
		"loan_term": "number",
		"salary": "number",
		"loan_amount": "number",
		"total_loan_cost": "number",
		"total_interest": "number",
		"payment_amount": "number",
		"created_at": "string",
		"user_id": "number"
	}

}
```

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| `offerId` | number | yes      | get by offer id |

---

### Delete an offer

- Endpoint: `/api/v1/offer/:offerId`
- Method: `DELETE`

Request header:

```
Authorization: Bearer <token>
```

Response body:

```json
{
	"message": "string"
}
```

| Parameter | Type   | Required | Description        |
| --------- | ------ | -------- | ------------------ |
| `offerId` | number | yes      | delete by offer id |

---

### Get all currencies

- Endpoint: `/api/v1/currencies`
- Method: `GET`

Request header:

```
Authorization: Bearer <token>
```

Response body:

```
"message": "string"
"currencies": {
	"usd": "10.99",
	...
} 
```