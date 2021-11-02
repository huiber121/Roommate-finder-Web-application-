"""Importing necessary modules."""
import sys
import os
import logging
from uuid import uuid4
from werkzeug.utils import secure_filename
import boto3
sys.dont_write_bytecode = True
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(db_dir)
LOGGER = logging.getLogger(__name__)
AWS_BUCKET_NAME = "group-4-bucket"
class S3Controller:
    """This class is used to connect to AWS s3."""
    s3=boto3.client('s3',
                    aws_access_key_id= 'AKIATTCNXF3NR3SWSJDC',
                    aws_secret_access_key='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')
    #upload file to S3
    def upload_file_to_s3(self,file,acl="public-read"):
        """This method is used to upload the files ."""
        filename =secure_filename(file.filename)
        unique_str_id =uuid4().__str__()[:8]
        file.filename = unique_str_id +filename # setup file name is unique
        name = file.filename
        path_to_file_name=f"public/title_images/{name}"
        LOGGER.info(f"Uploded file to s3: {path_to_file_name}")
        try:
            self.s3.upload_fileobj(
                    file, # file in bytes
                    AWS_BUCKET_NAME,
                    path_to_file_name, # Bucket path/../filename
                    ExtraArgs={   # ExtraArgs pass to client
                        "ACL":acl,
                        "ContentType":file.content_type})
        except Exception as error:
            LOGGER.error(error)
            return error
        return path_to_file_name
    # Delete the file in S3
    def delete_file_from_s3(self,filename):
        """This method is used to delete the files in s3 ."""
        LOGGER.info(f"Uploded file to s3: {filename}")
        try:
            self.s3.delete_object(Bucket=AWS_BUCKET_NAME, Key=filename)
            LOGGER.info(f"Delete {filename} in s3")
        except Exception as error:
            LOGGER.error(error)
            return error
        return "Delete files in s3"
    