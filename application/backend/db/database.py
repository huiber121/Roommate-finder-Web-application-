"""Importing necessary modules"""
import logging
import sys
import os
from mysql.connector import Error
from mysql.connector import pooling

db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(db_dir)
sys.dont_write_bytecode = True
from config.config import config

LOGGER = logging.getLogger(__name__)


class Database:
    """This class is used to connect to DB from connections in the pool & get the data."""

    connection_pool = pooling.MySQLConnectionPool(
        pool_name="db_pool",
        pool_size=10,
        pool_reset_session=True,
        host=config.host,
        database="Test1",
        user=config.user,
        password=config.password,
    )

    def get_data(self, sql):
        """Gets data from DB using connection object from connection pool."""
        # LOGGER.info(' Inside get data of database.py class')
        try:
            # Get connection object from a pool
            connection_object = self.connection_pool.get_connection()
            if connection_object.is_connected():
                cursor = connection_object.cursor()
                cursor.execute(sql)
                record = cursor.fetchall()
                if len(record) == 0:
                    # LOGGER.info('Data from DB: ' + str(len(record)))
                    return 0
                else:
                    return record
        except Error as error:
            LOGGER.error(error)
            return []
        finally:
            connection_object.close()

    def add_data(self, sql):
        """Add data to DB using connection object from connection pool."""
        connection_object = self.connection_pool.get_connection()
        try:
            if connection_object.is_connected():
                cursor = connection_object.cursor()
                cursor.execute(sql)
                connection_object.commit()
                record = cursor.rowcount
                LOGGER.info(" Data to DB: " + str(record) + " row")
                return "Successfully added "
        except Error as error:
            LOGGER.error(error)
            return "Error in adding"

    def delete_data(self, sql):
        """Delete data to DB using connection object from connection pool."""
        connection_object = self.connection_pool.get_connection()
        try:
            if connection_object.is_connected():
                cursor = connection_object.cursor()
                cursor.execute(sql)
                connection_object.commit()
                record = cursor.rowcount
                LOGGER.info(" Data to DB: " + str(record) + " row")
                return "Successfully deleted "
        except Error as error:
            LOGGER.error(error)
            return "Error in deleting"
