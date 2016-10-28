DEBUG=True
BCRYPT_LEVEL=12

# Move to dev.py
pg_db_username = 'postgres'
pg_db_password = 'postgres'
pd_db_name  = 'guttersnipe'

# PostgreSQL
# Comment the below string if you are using MySQL or MariaDB
SQLALCHEMY_DATABASE_URI = "postgresql://{DB_USER}:{DB_PASS}@{DB_ADDR}/{DB_NAME}".format(
    DB_USER=pg_db_username, DB_PASS=pg_db_password, DB_ADDR=pg_db_hostname)
