# nexus-task

A Full stack Task management app build

- **Backend**

  - [Node.js](https://nodejs.org/en) + [TypeScript](https://www.typescriptlang.org/)
  - API and web server -> [Express.js](https://expressjs.com/)
  - Database -> [MongoDB](https://www.mongodb.com/)
  - Schema validation -> [Zod](https://zod.dev/)
  - Middlewares for handling authentication, and schema validation

- **Frontend**
  - [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) + [TailwindCss](https://tailwindcss.com/)
  - Routing - [React router v6](https://reactrouter.com/en/main)
  - Testing - [Vitest](https://vitest.dev/)

### Main Features

- User authentication, registration
- User can create, list, update or delete the tasks
- Main pages, Login, Register and Home
  - Home page is only accessible if user is logged in (cookie based authentication)

### How to start:

```bash
$ git clone https://github.com/Abhishek765/nexus-task.git
```

### Server setup:

```bash
$ cd server
$ yarn # or npm i
```

- check `.env.sample` to setup the environments
- Setup MongoDB and get the database url

### Start server
```bash
$ yarn dev # npm run dev
```

### Frontend setup
```bash
$ cd client
$ yarn 
$ yarn dev
```
- Make sure to create .env in your FE root and add `VITE_SERVER_URL` (your backend server url)

### Screen shots: 
* **Registration page**
![image](https://raw.githubusercontent.com/Abhishek765/nexus-task/master/screenshots/register.png)

* **Login page**
![image](https://raw.githubusercontent.com/Abhishek765/nexus-task/master/screenshots/login.png)

* **Main home page**
![image](https://raw.githubusercontent.com/Abhishek765/nexus-task/master/screenshots/home.png)

### Final Deployed App:

- https://nexus-task-tau.vercel.app/

### Video Demo

- https://www.loom.com/share/1979b729c62447768252b578e17bcb4d?sid=ebd7d69e-c340-45f7-82f6-2b28d24249bf
