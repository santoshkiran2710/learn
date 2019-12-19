from configparser import ConfigParser
import psycopg2
import logging
from psycopg2 import pool

logging.basicConfig(filename="api.log",
                    format='%(asctime)s %(message)s',
                    filemode='w')

log = logging.getLogger()
log.setLevel(logging.DEBUG)

db = {}


def readconfig(filename='database.ini', section='py'):
    """Reads the config file for DB """
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql

    # Checks to see if section (postgresql) parser exists
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]

    # Returns an error if a parameter is called that is not listed in the initialization file
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))


def get_log():
    """Gets the basic logger for the application"""
    return log


class DB:
    conn = None
    cur = None
    postgresql_pool = None

    # def __init__(self):
    # self.connect()
    # self.connect_pool()

    # def connect(self):
    #    """Creates connection object and returns it """
    #    if self.conn is None:
    #        self.conn = psycopg2.connect(host=db['host'], port=db['port'], database=db['database'], user=db['user'],
    #                                     password=db['password'])
    #       log.debug('**** DB Connection successful for user:{} database:{} ****'.format(db['user'], db['database']))
    #        self.conn.autocommit = True

    def connect_pool(self):

        if self.postgresql_pool is None:
            self.postgresql_pool = psycopg2.pool.SimpleConnectionPool(1, 20, user=db['user'],
                                                                      password=db['password'],
                                                                      host=db['host'],
                                                                      port=db['port'],
                                                                      database=db['database'])
            if self.conn is None:
                self.conn = self.postgresql_pool.getconn()
                log.debug(
                    '**** DB Connection pool created for user:{} database:{} ****'.format(db['user'], db['database']))
                self.conn.autocommit = True

            print("Connection pool created successfully")

    def execute(self, _query_):
        """Execute a query based on DB connection. Returns query_results"""
        # self.connect()
        # self.connect_pool()
        self.connect_pool()

        try:
            self.cur = self.conn.cursor()
            log.debug(_query_)
            self.cur.execute(_query_)

            query_results = self.cur.fetchall()
            # self.conn.commit()
            # self.close()
            log.debug('**** DB Connection committed ****')
            return query_results
        except psycopg2.ProgrammingError:
            log.debug("**** No results to fetch **** ")
            self.cur.close()
            if self.postgresql_pool:
                self.postgresql_pool.putconn(self.conn)
                log.debug("Put away a PostgreSQL connection")
        except Exception as e:
            # self.conn.rollback()
            self.cur.close()
            # self.close()
            # self.conn = None
            if self.postgresql_pool:
                self.postgresql_pool.putconn(self.conn)
                log.debug("Put away a PostgreSQL connection")
            log.debug("**** Exception occurred and connection rolled back **** ", e.__doc__)
        finally:
            self.cur.close()
            # self.close()
            # self.conn = None
            # if self.postgresql_pool:
            #    log.debug("PostgreSQL connection pool is closed,")
            #    print("PostgreSQL connection pool is closed")
            #    self.postgresql_pool.closeall()

    # def close(self):
    #    """Closes the DB connection"""
    #    if self.conn is not None:
    #        log.debug("**** DB Connection closing ****")
    #        self.conn.close()

    def cleanup(self):
        if self.postgresql_pool:
            log.debug("PostgreSQL connection pool is closed,")
            print("PostgreSQL connection pool is closed")
            self.postgresql_pool.closeall()




