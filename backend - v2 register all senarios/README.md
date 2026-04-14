# Backend Setup for UniMate Project

This is the backend for the UniMate project. Follow the steps below to run it locally.

## 1. Clone the Repository

```bash
git clone <your-backend-repo-url>
cd <your-backend-folder>
```

## 2. Create a Virtual Environment

```bash
python -m venv venv
```

## 3. Activate the Virtual Environment

- On Windows:

```bash
venv\Scripts\activate
```

- On Mac/Linux:

```bash
source venv/bin/activate
```

## 4. Install Dependencies

```bash
pip install -r requirements.txt
```

## 5. Run the Backend

```bash
python -m uvicorn main:app --reload
```

You can access the API docs at:

```
http://localhost/docs
```

