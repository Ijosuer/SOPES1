from flask import Flask
import mysql.connector

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecretkey'

# Conexión a MySQL usando mysql-connector-python
app.config['MYSQL_HOST'] = 'db'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'users'

mysql = mysql.connector.connect(
    host=app.config['MYSQL_HOST'],
    user=app.config['MYSQL_USER'],
    password=app.config['MYSQL_PASSWORD'],
    database=app.config['MYSQL_DB']
)

# Asegúrate de realizar el resto de la configuración según tus necesidades

from app import app
