
from os import path
import sys
from uuid import uuid4
import os.path
sys.dont_write_bytecode = True
db_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(db_dir)
from werkzeug.utils import secure_filename
import logging
LOGGER = logging.getLogger(__name__)
import boto3

AWS_BUCKET_NAME = "group-4-bucket"
# TODO hiding the password
class s3controller:
    s3=boto3.client('s3',
                    aws_access_key_id= 'AKIATTCNXF3NR3SWSJDC',
                    aws_secret_access_key='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')
    
    
    
    #upload file to S3
    def upload_file_to_s3(self,file,acl="public-read"):
        filename =secure_filename(file.filename)
        ident =uuid4().__str__()[:8]
        file.filename = ident+filename # setup file name is unique
        name = file.filename
        pathTofilename=f"public/title_images/{name}"
        LOGGER.info(f"Uploded file to s3: {pathTofilename}")
        try:
            self.s3.upload_fileobj(
                    file, # file in bytes
                    AWS_BUCKET_NAME,
                    pathTofilename, # Bucket path/../filename
                    ExtraArgs={   # ExtraArgs pass to client
                        "ACL":acl,
                        "ContentType":file.content_type 
                    }
                )
        except Exception as e:
            LOGGER.error(e)
            return e
        return pathTofilename
    # Delete the file in S3
    def delete_file_from_s3(self,filename):
        LOGGER.info(f"Uploded file to s3: {filename}")
        try:
            self.s3.delete_object(Bucket=AWS_BUCKET_NAME, Key=filename)
            LOGGER.info(f"Delete {filename} in s3")
        except Exception as e:
            LOGGER.error(e)
            return e
        return f"Delete files in s3"
    