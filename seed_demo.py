# seed_demo.py
from db import db
from datetime import datetime

def seed_demo():
    products = [
        {
            "title": "Nike Air Zoom Pegasus 39",
            "normalized_title": "nike air zoom pegasus 39",
            "images": ["/assets/sample1.jpg"],
            "category": "shoes",
            "attributes": {"brand": "Nike"},
            "retailers":[{"retailer_id":"daraz","retailer_name":"Daraz","product_url":"https://www.daraz.pk/example-nike","price":12999,"currency":"PKR","last_checked":datetime.utcnow()}],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "iPhone 14 Pro Max",
            "normalized_title":"iphone 14 pro max",
            "images":["/assets/sample2.jpg"],
            "category":"mobiles",
            "attributes":{"brand":"Apple"},
            "retailers":[{"retailer_id":"bazaar","retailer_name":"BazaarLotLo","product_url":"https://www.bazaarlotlo.com/example-iphone","price":345000,"currency":"PKR","last_checked":datetime.utcnow()}],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        # add more items similarly...
    ]

    for p in products:
        existing = db.products.find_one({"normalized_title": p["normalized_title"]})
        if existing:
            db.products.update_one({"_id": existing["_id"]}, {"$set": p})
            print("Updated:", p["title"])
        else:
            db.products.insert_one(p)
            print("Inserted:", p["title"])
    print("Done seeding demo data")

if __name__ == "__main__":
    seed_demo()
