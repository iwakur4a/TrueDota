import asyncio
import logging
import os
from dotenv import load_dotenv
from supabase import acreate_client, AsyncClient
from aiogram import Bot, Dispatcher

from app.handlers import router
from app.data_base import get_db

load_dotenv()  # Загружает переменные из файла .env

TOKEN = os.getenv("TOKEN")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


async def main():
    supabase: AsyncClient = await acreate_client(SUPABASE_URL, SUPABASE_KEY)  # подключение к бд
    bot = Bot(token=TOKEN)  # Иницилизация бота
    await get_db(supabase, bot)  # прослушка бд
    dp = Dispatcher()  # Роутер. Обратбтка входящий сообщений
    dp.include_router(router)

    await dp.start_polling(bot, supabase=supabase)  # Отправляет запросы в телеграм

if __name__ == "__main__":  # Запуск только через этот файл
    logging.basicConfig(level=logging.INFO)  # Логгирование действий в боте
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Exit")
