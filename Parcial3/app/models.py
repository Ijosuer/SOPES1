from app import mysql

cursor = mysql.connection.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(256) NOT NULL
    )
""")
cursor.close()
