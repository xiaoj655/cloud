import uvicorn
from dotenv import load_dotenv
import os

if __name__ == '__main__':
    load_dotenv()
    uvicorn.run('src:app', host='0.0.0.0', reload=True, port=80)
