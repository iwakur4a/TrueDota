from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message

router = Router()


@router.message(Command('start'))
async def get_user_id(message: Message):
    user_id = message.from_user.id
    print("user_id")
