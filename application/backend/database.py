"""Mysql module"""
from mysql.connector import Error
from mysql.connector import pooling
import logging

LOGGER = logging.getLogger(__name__)

class Database:

    '''This class is used to connect to DB from connections in the pool & get the data'''
    

    connection_pool = pooling.MySQLConnectionPool(
        pool_name='db_pool',
        pool_size=10,
        pool_reset_session=True,
        host='group4-db.czpwr5igmvey.us-west-1.rds.amazonaws.com',
        database='Test1',
        user='admin',
        password='admin1234',
        )

    # Get connection object from a pool

    connection_object = connection_pool.get_connection()

    def get_data(self, sql):
        """Gets data from DB using connection object from connection pool."""
        LOGGER.info(' Inside get data of database.py class')
        try:
            if self.connection_object.is_connected():
                cursor = self.connection_object.cursor()
                cursor.execute(sql)
                record = cursor.fetchall()
                return record
        except Error as error:
            LOGGER.error (' Error while connecting to MySQL using Connection pool '
                   , error)
            return None
