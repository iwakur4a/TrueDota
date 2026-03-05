# TrueDota_bot
This is a helper bot for the website https://true-dota.bestgastore.site/. It is used to notify you via Telegram about new user registrations.

## Installation
Clone the repo - git clone https://github.com/iwakur4a/TrueDota && git checkout TGBot
Install dependencies - pip install -r requirements.txt
Create a .env file in the project's root folder and enter the following:
TOKEN = 'TG bot token'
SUPABASE_URL = 'supabase database URL'
SUPABASE_KEY = 'database access key'
Run - python run.py

## Framework
aiogram - API for creating a bot
supabase - working with a database
logging - logging bot actions
os, dotenv - loading and reading the .env file
asyncio - asynchronous operation

## Files
run.py - initializes the bot and connects to the database
handlers.py - needed only to obtain the Telegram account ID
users_id.py - reads and adds the same ID to another database
database.py - the core. Tracks new user registrations and sends them to Telegram chat based on the ID