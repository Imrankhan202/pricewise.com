# main.py
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import timedelta
from bson import ObjectId
from fastapi import HTTPException
from bson.objectid import ObjectId
from db import db
from fastapi import HTTPException
from bson import ObjectId
from auth_utils import hash_password, verify_password, create_access_token
from dotenv import load_dotenv
import os
load_dotenv()

app = FastAPI(title="Pricewise API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

# ---------- AUTH ----------
@app.post("/api/auth/register")
def register(user: dict):
    email = user.get("email")
    password = user.get("password")
    if not email or not password:
        raise HTTPException(status_code=400, detail="email and password required")
    if db.users.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="User already exists")
    user_doc = {"email": email, "password_hash": hash_password(password), "name": user.get("name"), "favorites": [], "created_at": None}
    db.users.insert_one(user_doc)
    return {"msg": "ok"}

@app.post("/api/auth/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.users.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": str(user["_id"])})
    return {"access_token": token, "token_type": "bearer"}

# helper to get current user
from jose import jwt
from fastapi import Depends
SECRET_KEY = os.getenv("JWT_SECRET", "devsecret123")
ALGORITHM = "HS256"
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401)
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=401)
        user["id"] = str(user["_id"])
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid auth token")

# ---------- SEARCH ----------

@app.get("/search")
def search_products(query: str):
    # Search products by name (case-insensitive partial match)
    products_cursor = db.products.find({
        "normalized_title": {"$regex": f"^{query}", "$options": "i"}
    })

    products = []
    for product in products_cursor:
        product["_id"] = str(product["_id"])
        products.append(product)

    if not products:
        return {"results": []}

    return {"results": products}
# ---------------suggestion----------
@app.get("/suggest")
def suggest_products(query: str):
    if not query or len(query) < 2:
        return {"suggestions": []}
    cursor = db.products.find(
        {"normalized_title": {"$regex": f"^{query}", "$options": "i"}},
        {"_id": 1, "title": 1}
    ).limit(8)
    suggestions = [{"_id": str(p["_id"]), "title": p["title"]} for p in cursor]
    return {"suggestions": suggestions}


@app.get("/products")
def get_products(category: str = None):
    query = {}
    if category:
        query["category"] = category.lower()
    products = list(db.products.find(query, {"_id": 1, "title": 1, "price": 1, "retailers": 1, "category": 1}))
    for p in products:
        p["_id"] = str(p["_id"])
    return {"products": products}


@app.get("/product/{product_id}")
def get_product_detail(product_id: str):
    product = db.products.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product["_id"] = str(product["_id"])
    return {"product": product}


# ---------- PRODUCT DETAIL ----------
@app.get("/api/products/{product_id}")
def product_detail(product_id: str):
    p = db.products.find_one({"_id": ObjectId(product_id)})
    if not p:
        raise HTTPException(status_code=404)
    p["id"] = str(p["_id"]); p.pop("_id", None)
    return p

# ---------- FAVORITES ----------
@app.post("/api/users/me/favorites")
def add_favorite(payload: dict, current_user = Depends(get_current_user)):
    product_id = payload.get("product_id")
    if not product_id:
        raise HTTPException(status_code=400)
    db.users.update_one({"_id": ObjectId(current_user["_id"])}, {"$addToSet": {"favorites": ObjectId(product_id)}})
    return {"ok": True}

@app.delete("/api/users/me/favorites/{product_id}")
def remove_favorite(product_id: str, current_user = Depends(get_current_user)):
    db.users.update_one({"_id": ObjectId(current_user["_id"])}, {"$pull": {"favorites": ObjectId(product_id)}})
    return {"ok": True}

# ---------- REVIEWS ----------
@app.post("/api/products/{product_id}/reviews")
def add_review(product_id: str, payload: dict, current_user = Depends(get_current_user)):
    rating = int(payload.get("rating", 0))
    comment = payload.get("comment", "")
    if rating < 1 or rating > 5:
        raise HTTPException(status_code=400, detail="Rating 1-5 required")
    review = {"product_id": ObjectId(product_id), "user_id": ObjectId(current_user["_id"]), "rating": rating, "comment": comment, "created_at": None}
    db.reviews.insert_one(review)
    return {"ok": True}

@app.get("/api/products/{product_id}/reviews")
def get_reviews(product_id: str):
    docs = list(db.reviews.find({"product_id": ObjectId(product_id)}))
    for d in docs:
        d["id"] = str(d["_id"]); d.pop("_id", None)
    return docs

# ---------- ALERTS ----------
@app.post("/api/alerts")
def create_alert(payload: dict, current_user = Depends(get_current_user)):
    product_id = payload.get("product_id")
    target_price = payload.get("target_price")
    if not product_id or target_price is None:
        raise HTTPException(status_code=400)
    db.alerts.insert_one({"user_id": ObjectId(current_user["_id"]), "product_id": ObjectId(product_id), "target_price": float(target_price), "notified": False})
    return {"ok": True}

@app.get("/api/alerts")
def list_alerts(current_user = Depends(get_current_user)):
    docs = list(db.alerts.find({"user_id": ObjectId(current_user["_id"])}))
    for d in docs:
        d["id"] = str(d["_id"]); d.pop("_id", None)
    return docs

# ---------- RECOMMEND ----------
from rapidfuzz import process, fuzz
@app.get("/api/products/{product_id}/recommend")
def recommend(product_id: str, top_k: int = 5):
    p = db.products.find_one({"_id": ObjectId(product_id)})
    if not p:
        raise HTTPException(status_code=404)
    title = p["normalized_title"]
    candidates = list(db.products.find({}, {"normalized_title": 1}).limit(500))
    choices = {str(c["_id"]): c["normalized_title"] for c in candidates}
    matches = process.extract(title, choices, scorer=fuzz.ratio, limit=top_k+1)
    recs = []
    for match, score, choice_id in matches:
        if choice_id == str(product_id): continue
        doc = db.products.find_one({"_id": ObjectId(choice_id)})
        if doc:
            doc["id"] = str(doc["_id"]); doc.pop("_id", None)
            recs.append(doc)
        if len(recs) >= top_k:
            break
    return recs
