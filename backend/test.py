from dotenv import load_dotenv
load_dotenv()
from src import db
from src import models
from sqlmodel import select
import os



ret = db.query_one('User', {"name": "xiaoj655@gmail.com"})
print(ret)