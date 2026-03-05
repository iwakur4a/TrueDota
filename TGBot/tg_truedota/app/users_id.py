import os
from dotenv import load_dotenv
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
