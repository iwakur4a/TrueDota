# TrueDota_Backend
This is the server side for the website https://true-dota.bestgastore.site/. It handles user registration, creating their profiles in the database, and connecting the TrueDota bot.

## Installation
Place the files on the server (Ubuntu/Apache).
Create a .env file in the project's root folder and enter the following:
Code snippet
SUPABASE_URL = 'supabase database URL'
SUPABASE_KEY = 'service_role database key'
TG_BOT_TOKEN = 'TG bot token'
TG_CHAT_ID = 'bot ID'

Run an SQL query in the Supabase console to create the profiles table (fields: id, email, nickname, rank_value, rank_label, role, role_label, about).

## Technologies
PHP (cURL) — data transfer between the website, database, and Telegram; Supabase Auth — user account management; PostgreSQL — storage of game profiles; Telegram API — sending service notifications; dotenv — secure reading of sensitive data

## Files
server.php — main file, receives data from the frontend, registers the user in Auth, and saves the profile to the .env table; stores secret access keys and connection settings; script.js — sends asynchronous requests to the server from the browser