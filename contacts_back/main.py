
from fastapi import FastAPI, Body, File, UploadFile
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from database import Database
import uuid



DB = Database()
 
 
app = FastAPI()

origins = [
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def main():
    return {"message": "Ебать черти"}

@app.get("/get_users")
async def get_users():
    data = await DB.get_users()
    result = []
    for user in data:
        result.append({"id": user[0], "name": user[1], "avatar": user[2], "number": user[3], "group": user[4]})
    return result       

@app.post("/create_user")
async def create_users(data = Body()):
    await DB.create_user(data["name"], data["number"], data["group"], data["avatar"])
    return {"status": "success"}

@app.get("/get_user/{id}")
async def get_user(id):
    user = DB.get_user(id)
    result = {"id": user[0], "name": user[1], "avatar": user[2], "number": user[3], "group": user[4]}
    return result

@app.put("/update_user")
async def update_user(data = Body()):
    await DB.update_user(data["id"], data["name"], data["number"], data["group"], data["avatar"])
    return {"status": "success"}

@app.delete("/delete_user/{id}")
async def delete_user(id):
    await DB.delete_user(id)
    return {"status": "success"}

@app.get("/get_groups")
async def get_groups():
    data = await DB.get_groups()
    result = []
    for group in data:
        result.append({"id": group[0], "group": group[1]})
    return result

@app.post("/upload_avatar")
async def upload_avatar(file: UploadFile = File(...)):
    file.filename = f"{uuid.uuid4()}.jpg"
    contents = await file.read()
    with open(f"images/{file.filename}", "wb") as f:
        f.write(contents)
    return {"filename": file.filename}

@app.get("/images/{filename}")
async def get_image(filename):
    return FileResponse(f"C:/Users/busin/Desktop/react/contacts_back/images/{filename}")