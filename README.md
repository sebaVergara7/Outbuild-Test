# Outbuild Backend Assessment

## 🚀 Description

This project is a backend API for managing **schedules** and **activities** in construction projects. It implements secure authentication, efficient handling of large data volumes, and optimized queries.

## 🛠️ Technologies Used

- **Node.js** + **Express**
- **TypeScript**
- **PostgreSQL** (using Prisma as ORM)
- **JWT** for authentication
- **Winston** for logging
- **Jest + Supertest** for testing
- **Docker + Docker Compose**

## 📺 Installation

### **1. Clone the Repository**

```sh
git clone https://github.com/your_user/outbuild-backend.git
cd outbuild-backend
```

### **2. Set Up Environment Variables**

Create a `.env` file with the following values:

```env
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/mydatabase
JWT_SECRET=mysecretkey
PORT=3000
```

### **3. Install Dependencies**

```sh
npm install
```

### **4. Apply Database Migrations (Requires PostgreSQL to be Installed)**

a. **Ensure PostgreSQL is installed and running**:

- If PostgreSQL is not installed, you can download and install it from [here](https://www.postgresql.org/download/).
- Make sure the PostgreSQL service is running.

b. **Configure the database connection**:

- Ensure the `.env` file is correctly set up with the PostgreSQL connection URL.

```env
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/mydatabase
```

c. **Apply the migrations**:

```sh
npx prisma migrate dev --name init
```

### **5. Start the Server**

```sh
npm run dev
```

The API will be available at `http://localhost:3000`.

## 🛢️ Using Docker

If you prefer to use Docker, run:

```sh
docker-compose up --build
```

This will automatically start the database and the API.

## 📌 Main Endpoints

### **Authentication**

- **POST** `/api/auth/register` → User registration
- **POST** `/api/auth/login` → User login

### **Schedules**

- **POST** `/api/schedules` → Create a schedule (Requires Token)
- **GET** `/api/schedules` → Get all schedules by user (Requires Token)
- **GET** `/api/schedules/:id` → Get a schedule by id (Requires Token)

### **Activities**

- **POST** `/api/activities` → Add an activity (Requires Token)
- **GET** `/api/activities/:id` → Get all activities by schedule (Requires Token)
- **POST** `/api/activities/bulk` → Add multiple activities (Requires Token)

## 🧪 Testing

To run tests, use:

```sh
npm test
```

This will validate authentication and CRUD operations of the API.

## 📚 Documentation

You can explore the API using **Postman** or **Swagger** if documentation is added in the future.

If you want to view the API documentation, visit: [http://localhost:3000/api/docs/](http://localhost:3000/api/docs/).

## 🗂️ Project Structure

```
OUTBUILD-TEST/
│── logs/                            # Folder for storing logs
│── node_modules/                    # Project dependencies
│── prisma/                          # Prisma ORM configuration
│   │── migrations/                  # Database migrations
│   │── schema.prisma                # Prisma schema
│── src/                             # Main source code
│   │── config/                      # General configuration
│   │   ├── swagger.ts               # Swagger configuration
│   │── constants/                   # Constants used in the project
│   │   ├── httpStatusCodes.ts       # HTTP status codes
│   │── controllers/                 # API controllers
│   │── docs/                        # API documentation
│   │── dto/                         # Data Transfer Objects (DTOs)
│   │── middleware/                  # Express middlewares
│   │   ├── authMiddleware.ts        # Authentication middleware
│   │   ├── validationMiddleware.ts  # Validation middleware (DTOs)
│   │── routes/                      # Route definitions
│   │── services/                    # Business logic
│   │── types/                       # TypeScript type definitions
│   │── utils/                       # Utility functions
│   │── validators/                  # Data validation (DTOs)
│   │── app.ts                       # Main app configuration
│   │── server.ts                    # Server entry point
│── tests/                           # Automated tests
│── .dockerignore                    # Files ignored by Docker
│── .env                             # Environment variables
│── .gitignore                       # Files ignored by Git
│── docker-compose.yml               # Docker Compose configuration
│── Dockerfile                       # Docker configuration file
│── jest.config.js                   # Jest configuration for testing
│── package-lock.json                # Dependency lock file
│── package.json                     # Node.js project configuration
│── README.md                        # Project documentation
│── tsconfig.json                    # TypeScript configuration
```

## 📊 Data Model

### Relational Diagram

```mermaid
%%{init: {'er': {'layoutDirection': 'LR'}}}%%
erDiagram
    USER ||--o{ SCHEDULE : "has"
    SCHEDULE ||--o{ ACTIVITY : "contains"

    USER {
        string id PK
        string email
        string password
    }

    SCHEDULE {
        string id PK
        string name
        string imageUrl
        string userId FK
    }

    ACTIVITY {
        string id PK
        string name
        datetime startDate
        datetime endDate
        string scheduleId FK
    }
```

This section shows the data structure of the application, representing the relationships between User, Schedule, and Activity models.

## 🔥 Final Considerations

✅ Secure API with JWT and protected endpoints.
✅ Optimization with PostgreSQL indexes and pagination.
✅ Logging with Winston for error monitoring.
✅ Unit and integration tests with Jest + Supertest.
✅ Easy deployment with Docker.

🚀 **Ready for production!**

## 🐞 Known Issues

### Deprecated Dependencies

Currently, the project has some deprecated dependencies that cannot be updated directly because they are sub-dependencies of other libraries. Here is a list of the known deprecated dependencies:

- `lodash.get@4.4.2`: This package is deprecated. It is recommended to use the optional chaining (`?.`) operator instead.
- `lodash.isequal@4.5.0`: This package is deprecated. It is recommended to use `require('node:util').isDeepStrictEqual` instead.
- `are-we-there-yet@2.0.0`: This package is no longer supported.
- `inflight@1.0.6`: This module is not supported and leaks memory. It is recommended to use `lru-cache` for a more comprehensive and powerful way to coalesce async requests by a key value.
- `glob@7.2.3`: Glob versions prior to v9 are no longer supported.
- `npmlog@5.0.1`: This package is no longer supported.
- `gauge@3.0.2`: This package is no longer supported.
- `rimraf@3.0.2`: Rimraf versions prior to v4 are no longer supported.
- `rimraf@2.7.1`: Rimraf versions prior to v4 are no longer supported.
- `glob@7.1.6`: Glob versions prior to v9 are no longer supported.

We are working to resolve these warnings in future updates of the project. In the meantime, these warnings should not affect the functionality of the project.

## ⚠️ Possible Errors

### PostgreSQL Collation Version Mismatch

If you encounter the following warning when trying to run the project:

```
WARNING: database "template1" has a collation version mismatch
DETAIL: The database was created using collation version 2.40, but the operating system provides version 2.41.
HINT: Rebuild all objects in this database that use the default collation and run ALTER DATABASE template1 REFRESH COLLATION VERSION, or build PostgreSQL with the right library version.
psql (17.2, server 16.2)
Type "help" for help.

template1=# ALTER DATABASE template1 REFRESH COLLATION VERSION;
NOTICE: changing version from 2.40 to 2.41
ALTER DATABASE
template1=#
```

You can resolve this issue by running the following command in your PostgreSQL console:

```
ALTER DATABASE template1 REFRESH COLLATION VERSION;
```

This command updates the collation version of the database to match the operating system's version.
