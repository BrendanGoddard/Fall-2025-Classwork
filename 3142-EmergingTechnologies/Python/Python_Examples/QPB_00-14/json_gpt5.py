import requests
import re
import json

def get_wikipedia_article(topic):
    # Wikipedia API for full plain extract
    url = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "prop": "extracts",
        "explaintext": False,  # get HTML (we'll clean it ourselves)
        "titles": topic
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        return {"error": f"Failed to retrieve topic '{topic}'"}

    data = response.json()
    pages = data.get("query", {}).get("pages", {})
    if not pages:
        return {"error": f"No pages found for '{topic}'"}

    page = next(iter(pages.values()))
    raw_html = page.get("extract", "")

    # --- Cleaning ---
    # Remove HTML tags
    text = re.sub(r"<.*?>", "", raw_html)

    # Remove special characters, keep words, spaces, punctuation
    text = re.sub(r"[^a-zA-Z0-9\s\.,!?;:()'\"-]", "", text)

    # Collapse multiple spaces/newlines
    text = re.sub(r"\s+", " ", text).strip()

    return text

# Example usage
if __name__ == "__main__":
    #topic = "Python (programming language)"  # use spaces, API will handle
    topic = "Donald Trump"  # use spaces, API will handle
    #print(get_wikipedia_article(topic))
    #json = get_wikipedia_article(topic)
    file_object = open("wiki_json_file.txt", 'w')
    file_object.write(get_wikipedia_article(topic))
    file_object.close()
