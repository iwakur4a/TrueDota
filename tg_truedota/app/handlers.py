from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message

from app.users_id import add_id_to_db

router = Router()


@router.message(Command('start'))
async def get_user_id(message: Message):
    user_id = message.from_user.id
    add_id_to_db(user_id)
