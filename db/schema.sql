-- Creating a new user and granting privileges
CREATE USER 'user'@'%' IDENTIFIED WITH caching_sha2_password BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON personal_finance_advisor.* TO 'user'@'%';
FLUSH PRIVILEGES;

-- Creating the `users` table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    hash VARCHAR(60) NOT NULL
);

-- Creating the `currencies` table
CREATE TABLE IF NOT EXISTS currencies (
    currency_symbol VARCHAR(3) PRIMARY KEY,
    apr DECIMAL(4, 2) NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

-- Creating the `offers` table
CREATE TABLE IF NOT EXISTS offers (
    offer_id INT AUTO_INCREMENT PRIMARY KEY,
    currency_symbol VARCHAR(3) NOT NULL,
    loan_term INT NOT NULL,
    max_value DECIMAL(10, 2) NOT NULL,
    equity_part DECIMAL(10, 2) NOT NULL,
    interest_part DECIMAL(10, 2) NOT NULL,
    installment_amount DECIMAL(10, 2) NOT NULL,
    total_interest DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (currency_symbol) REFERENCES currencies (currency_symbol),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);