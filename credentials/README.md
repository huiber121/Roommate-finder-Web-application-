# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP: http://18.220.139.247
2. SSH username: ubuntu@ec2-18-220-139-247.us-east-2.compute.amazonaws.com
3. SSH password or key (this is the group_4.pem file in the credentials folder)
    <br> If a ssh key is used please upload the key to the credentials folder.
4. Database URL or IP and port used: group4-db.czpwr5igmvey.us-west-1.rds.amazonaws.com
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
5. Database username: admin
6. Database password: admin1234
7. Database name (basically the name that contains all your tables): group-4-db
8. Instructions on how to use the above information.

SSH'ing into the server:
* use the ssh command in a 'nix environment (to do)

# using PuTTY:
1. use PuTTY Key Generator to create a private key. Save this to a file.
2. launch PuTTY. Go to Connection->SSH->Auth, and click "browse" for the private key. Use your private key.
3. Go to Session (at the top). put the SSH hostname into the Host Name box. Port is 22. Click open to SSH into our EC2 instance.


# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
