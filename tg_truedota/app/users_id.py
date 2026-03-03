import os
from dotenv import load_dotenv
from postgrest.exceptions import APIError
from supabase import Client, create_client

load_dotenv()

SUPABASE_URL = os.getenv("ID_SUPABASE_URL")
SUPABASE_KEY = os.getenv("ID_SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def read_user_id():
    response = (
        supabase.table('tgtg')
        .select('user_id')
        .execute()
    ).data
    user = [row["user_id"] for row in response]
    return user


def add_id_to_db(user_id):
    try:
        response = (
            supabase.table('tgtg')
            .insert({'user_id': user_id})
            .execute())
        return response
    except APIError as e:
        if e.code == '23505':
            print("4mo")
