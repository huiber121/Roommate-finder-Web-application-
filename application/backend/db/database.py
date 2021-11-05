"""Importing necessary modules"""
import logging
import sys
from mysql.connector import Error
from mysql.connector import pooling
sys.dont_write_bytecode = True
LOGGER = logging.getLogger(__name__)
class Database:
    '''This class is used to connect to DB from connections in the pool & get the data.'''
    connection_pool = pooling.MySQLConnectionPool(
        pool_name='db_pool',
        pool_size=10,
        pool_reset_session=True,
        host='group4-db.czpwr5igmvey.us-west-1.rds.amazonaws.com',
        database='Test1',
        user='admin',
        password='admin1234',
        )
    def get_data(self, sql):
        """Gets data from DB using connection object from connection pool."""
        
        try:
            # Get connection object from a pool
            connection_object = self.connection_pool.get_connection()
            if connection_object.is_connected():
                cursor = connection_object.cursor()
                cursor.execute(sql)
                record = cursor.fetchall()
                if len(record) == 0:
                    return 0
                else:
                    return record    
        except Error as error:
            LOGGER.error(error)
            return []
        finally:
            connection_object.close()
    def add_data(self,sql):
        """Add data to DB using connection object from connection pool."""
        connection_object = self.connection_pool.get_connection()
        try:
            if connection_object.is_connected():
                cursor = connection_object.cursor()
                cursor.execute(sql)
                connection_object.commit()
                record = cursor.rowcount
                LOGGER.info(' Data to DB: ' + str(record)+ " row")
                return "Successfully added "
        except Error as error:
            LOGGER.error(error)
            return "Error in adding"
    def delete_data(self,sql):
        """Delete data to DB using connection object from connection pool."""
        connection_object = self.connection_pool.get_connection()
        try:
            if connection_object.is_connected():
                cursor = connection_object.cursor()
                cursor.execute(sql)
                connection_object.commit()
                record = cursor.rowcount
                LOGGER.info(' Data to DB: ' + str(record)+ " row")
                return "Successfully deleted "
        except Error as error:
            LOGGER.error(error)  
            connection_object.rollback() 
            return "Error in deleting"  
    
    def update_data(self, sql):
        """Updates data from DB using connection object from connection pool."""
        try:
            # Get connection object from a pool
            connection_object = self.connection_pool.get_connection()
            if connection_object.is_connected():
                cursor = connection_object.cursor()
                cursor.execute(sql)
                connection_object.commit()
                return "Successfully updated"
        except Error as error:
            LOGGER.error(error)
            return []
        finally:
            connection_object.close()