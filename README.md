# Transaction Manager (React + Node/Express + MongoDB)

A full CRUD app for managing transactions: **Create, Update, Delete, Search, and View**.

## Structure

```
transaction-app/
├── backend/     Express + MongoDB API
└── frontend/    React (Vite) UI
```

## Transaction fields

| Field       | Type              |
|-------------|-------------------|
| date        | Date              |
| description | String            |
| amount      | Number            |
| type        | "income" \| "expense" |

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env if needed (MONGO_URI, PORT)
npm run dev        # or: npm start
```

Make sure MongoDB is running locally, or use a MongoDB Atlas connection string in `.env`.

The API runs at `http://localhost:5000` and exposes:

| Method | Endpoint                  | Purpose                          |
|--------|----------------------------|-----------------------------------|
| GET    | /api/transactions          | List/search transactions (supports `?search=&type=&from=&to=`) |
| GET    | /api/transactions/:id      | Get one transaction              |
| POST   | /api/transactions          | Create a transaction             |
| PUT    | /api/transactions/:id      | Update a transaction             |
| DELETE | /api/transactions/:id      | Delete a transaction             |

## 2. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and proxies `/api` requests to the backend on port 5000 (see `vite.config.js`).

## 3. Using the app

- **Create**: fill out the form on the left and click "Add Transaction".
- **View**: all transactions display in the table, with a running income/expense/balance summary.
- **Update**: click "Edit" on a row, change the fields, and click "Save Changes".
- **Delete**: click "Delete" on a row (asks for confirmation first).
- **Search**: type in the search box to filter by description, and/or pick income/expense from the dropdown, then click "Search".

## Notes

- The search endpoint also supports date-range filtering via `from`/`to` query params if you want to extend the UI later.
- CORS is enabled on the backend so the frontend can call it directly during development.
