from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import PrawDataAPI

app = FastAPI()

origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api")
def read_root():
    return {"Hello": "World"}


@app.get("/api/osuskins")
async def get_osuskins():
    return await PrawDataAPI.get_osuskins_top_skins()


@app.get("/api/learnpython")
async def get_learnpython():
    return await PrawDataAPI.get_learnpython_10_hot_submissions()
