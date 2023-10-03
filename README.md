# Hotel Booking Application

This is a sample project with three directories: `admin`, `client`, and `api`. Each directory contains its own codebase.

## Directory Structure

- **admin**: Contains code for the admin panel.
- **client**: Contains code for the client application.
- **api**: Contains code for the API server.

## Installation and Usage
- Replace the existing ```MONGO``` url from .env file in ```./api/.env```

- Then, import the dummy data to mongoDB from ```./api/dummy-datas``` and use the credentials as necessary.

To get started, follow these steps in 3 different terminals:

### 1. Admin Directory

```bash
cd admin
npm install
npm run dev
```


### 2. Client Directory 
```bash
cd client
npm install
npm run dev
```

### 3. API Directory

```bash
cd api
npm install
npm start
```