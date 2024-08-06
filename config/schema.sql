CREATE USER 'user'@'%'  IDENTIFIED WITH caching_sha2_password BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON personal_finance_advisor.* TO 'user'@'%';
FLUSH PRIVILEGES;

CREATE TABLE
    IF NOT EXISTS users (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        salt INT,
        hash BIGINT
    );

CREATE TABLE
    IF NOT EXISTS currencies (
        currency_symbol VARCHAR(3) PRIMARY KEY,
        apr DECIMAL(2, 2),
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS offers (
        offer_id INT PRIMARY KEY AUTO_INCREMENT,
        currency_symbol VARCHAR(3),
        loan_term INT,
        max_value DECIMAL(8, 2),
        equity_part DECIMAL(8, 2),
        interest_part DECIMAL(8, 2),
        installment_amount DECIMAL(8, 2),
        total_interest DECIMAL(8, 2),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        user_id INT,
        FOREIGN KEY (currency_symbol) REFERENCES currencies (currency_symbol),
        FOREIGN KEY (user_id) REFERENCES users (user_id)
    );