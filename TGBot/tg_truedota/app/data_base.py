import asyncio
from supabase import AsyncClient
from aiogram import Bot
from app.users_id import read_user_id


async def get_db(supabase: AsyncClient, bot: Bot):
    async def notify_all(bot, email, nickname, rank_value, role, about):  # отправка в чат с ботом
        text = f"""Зарегистрирован новый пользователь
👤Ник: {nickname}
📧Почта: {email}
🏅Ранг: {rank_value}
🎯Роль: {role}
🗣О себе: {about}"""
        users_id = read_user_id()
        for user_id in users_id:
            await bot.send_message(chat_id=int(user_id),
                                   text=text)

    def handle_record_inserted(payload):  #
        new_record = payload.get("data", {}).get("record", {})
        email = new_record.get("email", "неизвестен")
        nickname = new_record.get("nickname", "неизвестен")
        rank_value = new_record.get("rank_value", "неизвестен")
        role = new_record.get("role", "неизвестна")
        about = new_record.get("about", " ")

        asyncio.create_task(notify_all(bot, email, nickname, rank_value, role, about))

    channel = supabase.channel("RunTimeToken")  # подключение к каналу бд
    channel.on_postgres_changes(
        event="INSERT",
        schema="public",
        table="profiles",
        callback=handle_record_inserted,
    )
    await channel.subscribe()
    return channel
