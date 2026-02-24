import asyncio
import logging
import os
from dotenv import load_dotenv

from aiogram import Bot, Dispatcher

from app.handlers import router


load_dotenv()  # Загружает переменные из файла .env

TOKEN = os.getenv("TOKEN")
bot = Bot(token=TOKEN)  # Иницилизация бота
dp = Dispatcher()  # Роутер. Обратбтка входящий сообщений


async def main():
    dp.include_router(router)
    await dp.start_polling(bot)  # Отправляет запросы в телеграм


if __name__ == "__main__":  # Запуск только через этот файл
    logging.basicConfig(level=logging.INFO)  # Логгирование действий в боте
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Exit")
