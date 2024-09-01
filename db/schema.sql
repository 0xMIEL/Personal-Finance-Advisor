-- Create a new user and grant specific privileges
CREATE USER 'user'@'%' IDENTIFIED WITH caching_sha2_password BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON personal_finance_advisor.* TO 'user'@'%';
FLUSH PRIVILEGES;

-- Create the `users` table to store user information
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    hash VARCHAR(60) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create the `currencies` table to store currency symbols and their corresponding APRs
CREATE TABLE IF NOT EXISTS currencies (
    currency_symbol VARCHAR(3) PRIMARY KEY,
    apr DECIMAL(4, 2) NOT NULL
);

-- Create the `offers` table to store loan offers made to users
CREATE TABLE IF NOT EXISTS offers (
    offer_id INT AUTO_INCREMENT PRIMARY KEY,
    currency_symbol VARCHAR(3) NOT NULL,
    loan_term INT NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    loan_amount DECIMAL(10, 2) NOT NULL,
    total_loan_cost DECIMAL(10, 2) NOT NULL,
    total_interest DECIMAL(10, 2) NOT NULL,
    payment_amount DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (currency_symbol) REFERENCES currencies (currency_symbol),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- Populate the `currencies` table with initial data
INSERT INTO currencies (currency_symbol, apr) VALUES
('USD', 3.50),
('EUR', 2.75),
('GBP', 4.00),
('JPY', 1.25),
('CAD', 3.00),
('AUD', 2.50),
('CHF', 2.00),
('CNY', 2.80),
('INR', 5.00),
('BRL', 6.00),
('ZAR', 7.00),
('MXN', 4.50),
('KRW', 2.90),
('SGD', 2.25),
('HKD', 3.00);