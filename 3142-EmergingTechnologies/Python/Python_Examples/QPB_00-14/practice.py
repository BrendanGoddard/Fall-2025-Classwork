
import json
import requests
response = requests.get("https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2023-04-01&endDate=2023-10-01")
weather = json.loads(response.text)
print(weather)
