
from fastapi import FastAPI
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
from firebase_admin import db
import json

app = FastAPI()

cred = credentials.Certificate('certs/fbfscbc-sdk.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.get("/barbers/{barber_id}")
async def Get_barber(barber_id):
    
    doc_ref = db.collection(u'Barbers').document(barber_id)
    doc = doc_ref.get()
    if doc.exists:
        barb = doc.to_dict()
        return barb["name"]
    else:
        return {"there is no barber"}
    


