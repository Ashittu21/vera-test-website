# Vera.org

## Local Installation

1. `git clone [this repo]`
2. Install nitro:
`brew install craftcms/nitro/nitro` or [manually](https://craftcms.com/docs/nitro/2.x/installation.html)
3. [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

4. `nitro init`
If you are prompted to install mysql/postgres/redis, say no to all

5. Add an instance of mariadb to Docker desktop.
`nitro db new`
- Which database engine should we use? <span style="color:green;">mariadb</span>
- Which version should we use? <span style="color:green;">10.5</span>
- Which port should we use for mariadb? <span style="color:green;">[3306]</span>

5. Add an instance of mysql to docker desktop
`nitro db new`
- Which database engine should we use? <span style="color:green;">mysql</span>
- Which version should we use? <span style="color:green;">8</span>
- Which port should we use for mysql? <span style="color:green;">[3307]</span>

6. `nitro start`
7. `mkdir storage`
8. `mkdir vendor`
9. `sudo chmod -R 777 .env composer.* config storage vendor web/cpresources`
10. `nitro add`
- Enter the hostname [vera-website.nitro]:
- Enter the web root for the site [public]: <span style="color:green;">web</span>
- Choose a PHP version: <span style="color:green;">7.4</span>
- Add a database for the site? [Y/n] <span style="color:green;">Y</span>
- Select the database engine: <span style="color:green;">mariadb-10.5-3306.database.nitro</span>
- Enter the new database name: <span style="color:green;">vera</span>
- Should we update the env file? [y/N] <span style="color:green;">Y</span>
- Apply changes now? [Y/n] <span style="color:green;">Y</span>

11. Update env file [get credentials from KB/JH]

12. `nitro db import [filename.sql]`
- Select a database engine: <span style="color:green;">mariadb-10.5-3306.database.nitro</span>
- Enter the database name: <span style="color:green;">vera</span>

13. `nitro ssh`
14. `composer update`
15. `exit`
16. You should be up and running now at https://vera-website.nitro
