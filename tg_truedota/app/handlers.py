from aiogram import F, Router
from aiogram.filters import Command
from aiogram.types import Message

from app.data_base import test123

router = Router()


@router.message(F.text)
async def logg(message: Message):
    await message.bot.send_message(chat_id=-1003773950381, text=test123)
