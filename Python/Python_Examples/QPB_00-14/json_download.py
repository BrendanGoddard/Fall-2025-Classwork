import json
import requests

url = "https://en.wikipedia.org/w/api.php"
params = {
    "action": "query",
    "format": "json",
    "prop": "extracts",
    "explaintext": False,
    "titles": "Fanshawe College"
}

response = requests.get(url, params=params)

wiki_json = json.loads(response.text)
json_str = json.dumps(wiki_json)
pyObject = json.loads(json_str)

print(json_str)
print()
print(pyObject)
