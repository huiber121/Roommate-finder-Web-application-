"""Importing necessary modules."""
import os
import sys
from dotenv import load_dotenv

dot_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
load_dotenv(os.path.join(dot_dir, ".env"))
sys.dont_write_bytecode = True


class config:
    """configure necessary keys from .env"""

    host = os.environ.get("MYSQL_HOST")
    user = os.environ.get("MYSQL_USER")
    password = os.environ.get("MYSQL_PASSWORD")
    aws_bucket_name = os.environ.get("AWS_BUCKET_NAME")
    aws_bucket_head = os.environ.get("AWS_BUCKET_HEAD")
    aws_access_keyid = os.environ.get("AWS_ACCESS_KEYID")
    aws_seceret_key = os.environ.get("AWS_SECERET_KEY")
