import asyncio
from supabase import AsyncClient
from aiogram import Bot
from app.users_id import read_user_id


async def get_db(supabase: AsyncClient, bot: Bot):
    async def notify_all(bot, username):  # отправка нового логина в чат с ботом
        users_id = read_user_id()
            for user_id in users_id:
                await bot.send_message(chat_id=int(user_id.strip()), text=f"Новый логин: {username}")

    def handle_record_inserted(payload):  #
        new_record = payload.get("data", {}).get("record", {})
        username = new_record.get("username", "неизвестен")
        asyncio.create_task(notify_all(bot, username))

    channel = supabase.channel("RunTimeToken")  # подключение к каналу бд
    channel.on_postgres_changes(
        event="INSERT",
        schema="public",
        table="profiles",
        callback=handle_record_inserted,
    )
    await channel.subscribe()
    return channel


async def get_register_time(supabase: AsyncClient):  # получение времени регистрации для сортировки
    register_time = await supabase.table('profiles').select('updated_at').execute()
    return register_time


async def get_last_time(supabase: AsyncClient):  # получение последнего логина иссходя из времени
    result = await get_register_time(supabase)
    register_time = result.data

    if not register_time:
        return None

    times = [row["updated_at"] for row in register_time]
    times.sort()
    last_login = times[-1]

    result = await (
        supabase.table("profiles")
        .select("username")
        .eq("updated_at", last_login)
        .execute()
    )

    if not result.data:
        return None

    return result.data[-1]["username"]
