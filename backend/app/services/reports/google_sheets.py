# backend/app/services/reports/google_sheets.py
from __future__ import annotations

import json
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build

from ...config import get_settings

settings = get_settings()
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]


def export_tasks_to_sheet(spreadsheet_name: str, rows: list[list[str]]) -> str:
    creds = service_account.Credentials.from_service_account_file(
        settings.google_service_account_json, scopes=SCOPES
    )
    service = build("sheets", "v4", credentials=creds)
    spreadsheet = (
        service.spreadsheets()
        .create(body={"properties": {"title": spreadsheet_name}})
        .execute()
    )
    spreadsheet_id = spreadsheet["spreadsheetId"]
    body = {"values": rows}
    service.spreadsheets().values().update(
        spreadsheetId=spreadsheet_id, range="A1", valueInputOption="RAW", body=body
    ).execute()
    return f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}"
