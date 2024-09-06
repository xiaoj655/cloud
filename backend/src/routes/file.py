from fastapi import APIRouter, Path, Depends, UploadFile, Query
from uuid import UUID, uuid4
from src import auth
from typing import Annotated
from src import db
import os
from src.models import Response
import shutil
from fastapi.responses import FileResponse
from src import models
import hashlib
import io
from PIL import Image

router = APIRouter()
data_dir = os.path.join(os.getcwd(), 'data')
os.makedirs(data_dir, exist_ok=True)

@router.get('/file/{id}')
async def get(id: UUID = Path(...)):
    # user = auth.decode_token(token)
    file_item: models.File | None = db.query_one('File', {'id': id})
    if file_item:
        return FileResponse(path=file_item.file_path, filename=file_item.file_name, media_type=file_item.file_type)
    else:
        return Response(status_code=404)


def save_bytesio_to_file(bytesio_obj: io.BytesIO, output_path: str):
    with open(output_path, 'wb') as f:
        f.write(bytesio_obj.getvalue())

@router.post('/file')
async def post(token: Annotated[str, Depends(auth.oauth2_scheme)], files: list[UploadFile]):
    user = auth.get_identity(token)
    user_id = db.query_one('User', {"name": user}).id
    suc_arr = []
    os.makedirs(os.path.join(data_dir, user_id), exist_ok=True)
    for file in files:
        file_md5 = hashlib.md5()
        while chunk := await file.read(4096):
            file_md5.update(chunk)
        file_md5 = file_md5.hexdigest()
        await file.seek(0)
        file_content = await file.read()
        file.seek(0)
        img = Image.open(io.BytesIO(file_content))
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='webp', quality=80)
        img_byte_arr.seek(0)

        file_id = str(uuid4())[:8]
        file_path = os.path.join(data_dir, user_id, file_id + '.' + file.filename.split('.')[-1])
        save_bytesio_to_file(img_byte_arr, file_path)
        # with open(file_path, 'wb') as buffer:
        #     shutil.copyfileobj(file.file, buffer)
        # file_item = File(file_type=file.filename.split('.')[-1], file_name=file.filename, publisher_id=user_id)
        _id = uuid4()
        item = {
                "file_type": file.content_type,
                "file_name": file.filename,
                "publisher_id": user_id,
                "id": _id,
                "url": f"http://139.159.135.46:5000/file/{_id}",
                "file_path": file_path,
                "size": file.size,
                "file_md5": file_md5
                }
        db.insert(table_name='File', item=item)
        suc_arr.append(item)

    return Response(data=suc_arr)

@router.get('/file_list')
async def get(token: Annotated[str, Depends(auth.oauth2_scheme)], offset: int = 0, size: int = Query(40, max=100)):
    # username = auth.get_identity(token)
    # if username is None:
    #     return Response(status_code=401, detail='invalid token')
    # user_id = db.query_one('User', {'name': username}).id
    # if user_id is None:
    #     return Response(status_code=401, detail='invalid token')
    return db.get_user_files(token=token)