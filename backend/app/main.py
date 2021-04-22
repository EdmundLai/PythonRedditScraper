from fastapi import FastAPI

import PrawDataAPI

from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

origins = ["http://localhost:80", "*"]

middleware = [Middleware(CORSMiddleware, allow_origins=origins)]

app = FastAPI(middleware=middleware)


@app.get("/api")
def read_root():
    return {"Hello": "World"}


@app.get("/api/osuskins")
async def get_osuskins():
    return await PrawDataAPI.get_osuskins_top_skins()


@app.get("/api/learnpython")
async def get_learnpython():
    return await PrawDataAPI.get_learnpython_10_hot_submissions()
