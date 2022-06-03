# Vera.org

## Local Installation with Docker and Craft Nitro

1. `git clone [this repo]`
2. Install nitro:
`brew install craftcms/nitro/nitro` or [manually](https://craftcms.com/docs/nitro/2.x/installation.html)
3. [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

4. `nitro init`
If you are prompted to install mysql/postgres/redis, say no to all

5. Add an instance of mariadb to Docker desktop.
`nitro db new`
- Which database engine should we use? **mariadb**
- Which version should we use? **10.5**
- Which port should we use for mariadb? **[3306]**

5. Add an instance of mysql to docker desktop
`nitro db new`
- Which database engine should we use? **mysql**
- Which version should we use? **8**
- Which port should we use for mysql? **[3307]**

6. `nitro start`
7. `mkdir storage`
8. `mkdir vendor`
9. `sudo chmod -R 777 .env composer.* config storage vendor web/cpresources`
10. `nitro add`
- Enter the hostname [vera-website.nitro]:
- Enter the web root for the site [public]: **web**
- Choose a PHP version: **7.4**
- Add a database for the site? [Y/n] **Y**
- Select the database engine: **mariadb-10.5-3306.database.nitro**
- Enter the new database name: **vera**
- Should we update the env file? [y/N] **Y**
- Apply changes now? [Y/n] **Y**

11. Update env file [get credentials from KB/JH]

12. `nitro db import [filename.sql]`
- Select a database engine: **mariadb-10.5-3306.database.nitro**
- Enter the database name: **vera**

13. `nitro ssh`
14. `composer update`
15. `exit`
16. You should be up and running now at https://vera-website.nitro
