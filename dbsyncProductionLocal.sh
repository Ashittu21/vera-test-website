#Local DB
localuser="root"
localpass="maktub04"
localhost="127.0.0.1"
localdb="vera"
#Local MySql
mysql="mysql"
#Remote DB
remoteuser="root"
remotehost="167.71.189.247"
remotedb="vera"
filename=$remoteserver$(date +%Y-%m-%d-%H.%M.%S).sql
echo "--Starting $remotehost to $localhost sync--" &&
echo "Downloading remote DB" &&
ssh -l $remoteuser $remotehost "mysqldump --max_allowed_packet=1G --single-transaction --quick --lock-tables=false $remotedb" | $mysql --host=$localhost --user=$localuser --password=${localpass} $localdb &&
echo "--Finished--"
