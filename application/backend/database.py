"""Mysql module"""
from mysql.connector import Error
from mysql.connector import pooling


class Database:
    '''This is a docstring. I have created a new class'''
    def get_data(self, sql):
        """Gets data from DB using connection object from connection pool."""
        print ('Inside cursor', sql)
        try:
            connection_pool = pooling.MySQLConnectionPool(
                pool_name='db_pool',
                pool_size=10,
                pool_reset_session=True,
                host='group4-db.czpwr5igmvey.us-west-1.rds.amazonaws.com'
                    ,
                database='Test1',
                user='admin',
                password='admin1234',
                )

            print ('Printing connection pool properties ')
            print ('Connection Pool Name - ', connection_pool.pool_name)
            print ('Connection Pool Size - ', connection_pool.pool_size)

        # Get connection object from a pool
            connection_object = connection_pool.get_connection()

            if connection_object.is_connected():
                db_info = connection_object.get_server_info()
                print ('Connected to MySQL using connection pool ', db_info)
                cursor = connection_object.cursor()
                cursor.execute(sql)
                record = cursor.fetchall()
                print ('Data from db ', record)
                return record
        except Error as error:
            print ('Error while connecting to MySQL using Connection pool '
                   , error)
        finally:

        # closing database connection.
            if connection_object.is_connected():
                cursor.close()
                connection_object.close()
                print ('MySQL connection is closed')
        return None
        