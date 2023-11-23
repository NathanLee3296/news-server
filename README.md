# News Server 
Link to hosted version - https://news-server-gasb.onrender.com/api/

## Summary-

This project is the backend of a **social news website and forum**  where users can post articles, make comments, and vote on posts. You can use /api to view all endpoints


## **How to run locally -**

 1.You will need to clone the repo: https://github.com/NathanLee3296/news-server
- `git clone https://github.com/NathanLee3296/news-server` 
2. Install NPM dependencies from the package.json file
- `npm install` 
3.  Setup and seed the databases
- `npm run setup-dbs`
- `npm run seed` 
4.  You will need to create two files in the **root** folder of the repository
- ".env.test" which will contain the code  -`PGDATABASE=nc_news_test`
- ".env.development" which will contain - `PGDATABASE=nc_news`
5.  You should then be able to run the test suite to ensure everything is working correctly!
- `npm run tests` 

## Minimum version requirements-

 - Node.js (v21.1.0)
 - Postgres (^3.4.3)

