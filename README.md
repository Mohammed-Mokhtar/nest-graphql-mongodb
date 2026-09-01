# 🎓 NestJS GraphQL MongoDB API

A scalable backend service built with **NestJS**, **GraphQL (Code-First)**, and **MongoDB** using **TypeORM**. It provides a robust GraphQL API to manage students, lessons, and many-to-many relationship resolutions between them.

---

## 🚀 Features

- **NestJS Framework**: Modular, scalable architecture with dependency injection and clean separation of concerns.
- **Code-First GraphQL**: Types, inputs, queries, and mutations automatically generated from TypeScript classes using `@nestjs/graphql` and Apollo Server.
- **MongoDB + TypeORM**: Document database integration with custom UUID primary identifiers and `MongoRepository`.
- **Dynamic Field Resolvers**: Nested GraphQL relationship resolution with `@ResolveField()` to populate student details on lessons efficiently.
- **Request Validation**: Schema and input validation using `class-validator` and `ValidationPipe`.
- **Apollo Sandbox**: Interactive GraphQL IDE plugin enabled for testing and exploring queries and mutations.

---

## 🛠️ Tech Stack

- **Runtime / Framework**: [Node.js](https://nodejs.org/), [NestJS](https://nestjs.com/)
- **API Protocol**: [GraphQL](https://graphql.org/), [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- **Database & ORM**: [MongoDB](https://www.mongodb.com/), [TypeORM](https://typeorm.io/)
- **Validation**: [class-validator](https://github.com/typestack/class-validator), [class-transformer](https://github.com/typestack/class-transformer)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 📁 Project Structure

```text
src/
├── app.module.ts              # Root application module with TypeORM & GraphQL configuration
├── main.ts                    # Application entry point with ValidationPipe
├── lesson/                    # Lesson domain module
│   ├── assign-student-to-lesson.input.ts # Input DTO for assigning students
│   ├── create-lesson.input.ts # Input DTO for creating a lesson
│   ├── lesson.entity.ts       # TypeORM MongoDB entity for Lesson
│   ├── lesson.module.ts       # Lesson feature module
│   ├── lesson.resolver.ts     # GraphQL Queries, Mutations & Field Resolvers
│   ├── lesson.service.ts      # Lesson business logic & repository operations
│   └── lesson.type.ts         # GraphQL ObjectType schema definition
└── student/                   # Student domain module
    ├── create-student.input.ts# Input DTO for creating a student
    ├── student.entity.ts      # TypeORM MongoDB entity for Student
    ├── student.module.ts      # Student feature module
    ├── student.resolver.ts    # GraphQL Queries & Mutations
    ├── student.service.ts     # Student business logic & repository operations
    └── student.type.ts        # GraphQL ObjectType schema definition
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher
- **npm** or **yarn** / **pnpm**
- **MongoDB**: Local MongoDB instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mohammed-Mokhtar/nest-graphql-mongodb.git
   cd nest-graphql-mongodb
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (based on `.env.example`):
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority
   ```

4. **Start the application**:
   ```bash
   # Development watch mode
   npm run start:dev

   # Production mode
   npm run start:prod
   ```

5. **Open Apollo Sandbox**:
   Visit [http://localhost:3000/graphql](http://localhost:3000/graphql) in your browser.

---

## 🧪 GraphQL API Reference

### 1. Students

#### Create a Student
```graphql
mutation CreateStudent($createStudentInput: CreateStudentInput!) {
  createStudent(createStudentInput: $createStudentInput) {
    id
    firstName
    lastName
  }
}
```
**Variables:**
```json
{
  "createStudentInput": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Get All Students
```graphql
query GetAllStudents {
  students {
    id
    firstName
    lastName
  }
}
```

#### Get Student By ID
```graphql
query GetStudentById($id: String!) {
  student(id: $id) {
    id
    firstName
    lastName
  }
}
```

---

### 2. Lessons

#### Create a Lesson
```graphql
mutation CreateLesson($createLessonInput: CreateLessonInput!) {
  createLesson(createLessonInput: $createLessonInput) {
    id
    name
    startDate
    endDate
    students {
      id
      firstName
      lastName
    }
  }
}
```
**Variables:**
```json
{
  "createLessonInput": {
    "name": "Advanced Physics",
    "startDate": "2026-09-02T10:00:00.000Z",
    "endDate": "2026-09-02T12:00:00.000Z",
    "students": [
      "STUDENT_UUID_1",
      "STUDENT_UUID_2"
    ]
  }
}
```

#### Assign Students to Lesson
```graphql
mutation AssignStudents($assignStudentsToLessonInput: AssignStudentsToLessonInput!) {
  assignStudentToLesson(assignStudentsToLessonInput: $assignStudentsToLessonInput) {
    id
    name
    students {
      id
      firstName
      lastName
    }
  }
}
```
**Variables:**
```json
{
  "assignStudentsToLessonInput": {
    "lessonId": "LESSON_UUID",
    "studentIds": [
      "STUDENT_UUID"
    ]
  }
}
```

#### Get All Lessons (with Nested Students)
```graphql
query GetAllLessons {
  Lessons {
    id
    name
    startDate
    endDate
    students {
      id
      firstName
      lastName
    }
  }
}
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run start:dev` | Start the server in hot-reload development mode |
| `npm run build` | Build the production application |
| `npm run lint` | Run ESLint with automated fixes |
| `npm run format` | Format codebase using Prettier |
| `npm run test` | Run Jest unit tests |

---

## 📄 License

This project is licensed under the UNLICENSED license.

