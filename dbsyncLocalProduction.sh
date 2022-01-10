#!/bin/bash

#Local MySql
mysql="mysql"

#Remote DB
destinationuser="root"
destinationhost="167.71.189.247"
destinationdbuser="b403dc5ee7fb"
destinationdbpassword="2f7ebf98312d4034"
destinationdb="vera"
filename=$destinationdb-$(date +%Y-%m-%d-%H.%M.%S).sql

mysqldump -h localhost --port=3306 -u root --password="root" verac3 | ssh -l $destinationuser $destinationhost "mysql --password="$destinationdbpassword" --user $destinationdbuser $destinationdb" 
