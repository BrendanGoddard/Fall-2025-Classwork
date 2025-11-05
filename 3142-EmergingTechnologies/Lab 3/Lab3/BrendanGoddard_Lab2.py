import io
import math
import time

# ---------- Load word vectors ----------
def load_vectors(fname):
    fin = io.open(fname, 'r', encoding='utf-8', newline='\n', errors='ignore')
    num_words, vec_size = map(int, fin.readline().split())
    data = {}
    for line in fin:
        tokens = line.rstrip().split(' ')
        data[tokens[0]] = list(map(float, tokens[1:]))
    return data

# ---------- Cosine similarity helpers ----------
def dot_product(vec_a, vec_b):
    return sum(a * b for a, b in zip(vec_a, vec_b))

def magnitude(vector):
    return math.sqrt(dot_product(vector, vector))

def cosine_similarity(vec_a, vec_b):
    dot_prod = dot_product(vec_a, vec_b)
    magnitude_a = magnitude(vec_a)
    magnitude_b = magnitude(vec_b)
    return dot_prod / (magnitude_a * magnitude_b)

# ---------- Main program ----------
def main():
    start_time = time.strftime("%H:%M:%S")
    print(f"Start time: {start_time}")

    # Load the dictionary
    word_vectors = load_vectors("FastText100K.txt")

    finish_time = time.strftime("%H:%M:%S")
    print(f"Finish time: {finish_time}\n")
    print("Word vector dictionary is loaded")

    # Word entry loop
    while True:
        word = input("\nEnter search word: ").strip()
        if word == "":
            print("Exiting program.")
            break

        if word not in word_vectors:
            print(f"'{word}' not found in dictionary. Try another word.")
            continue

        base_vec = word_vectors[word]

        # Compute similarity for all words
        similarities = []
        for other_word, vec in word_vectors.items():
            if other_word == word:
                continue
            sim = cosine_similarity(base_vec, vec)
            similarities.append((sim, other_word))

        # Sort by similarity, highest first
        similarities.sort(reverse=True, key=lambda x: x[0])
        top5 = similarities[:5]

        print("The words with the highest cosine similarity are:")
        for sim, w in top5:
            print(f"{sim:.16f}\t \t {w}")

if __name__ == "__main__":
    main()
