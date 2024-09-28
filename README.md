# Milestone Lookup Chatbot

# Backend Setup

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [MongoDB](https://www.mongodb.com/) (Local or remote instance)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory of the project with the following content:

```bash
DB_URI=mongodb://localhost:27017/neuromnia
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 4. Start the Server

Run the server using nodemon for development:

```bash
node index.js
# or
nodemon index.js
```

Open http://localhost:3001/api-docs with your browser to see the api docs.

---

# Frontend Setup

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd frontend
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
npm install
```

### 3. Run the Development Server

Start the development server:

```bash
npm start
```

Open http://localhost:3000 with your browser to see the result.