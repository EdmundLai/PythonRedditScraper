from fastapi import FastAPI

import PrawDataAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/osuskins")
async def get_osuskins():
    return await PrawDataAPI.get_osuskins_top_skins()
