# Brendan Goddard
# INFO-XXXX – Lab #3: Word Analogy Solver (FastText + NumPy Bonus)

import numpy as np
import time

# --------------------------------------------------
# Function: load_vectors
# Purpose:  Load all FastText word vectors into a dictionary (word → NumPy vector).
# --------------------------------------------------
def load_vectors(filename):
    print("Loading word vector dictionary")
    start = time.strftime("%H:%M:%S")
    print(start)
    vectors = {}
    with open(filename, "r", encoding="utf-8", errors="ignore") as f:
        first = f.readline()
        for line in f:
            parts = line.strip().split()
            if len(parts) < 11:
                continue
            word = parts[0]
            try:
                vec = np.array(list(map(float, parts[1:])), dtype=np.float32)
                vectors[word] = vec
            except:
                pass
    end = time.strftime("%H:%M:%S")
    print(end)
    print("Word vector dictionary is loaded\n")
    return vectors

# --------------------------------------------------
# Function: cosine_similarity
# Purpose:  Compute cosine similarity between two NumPy vectors.
# --------------------------------------------------
def cosine_similarity(v1, v2):
    denom = (np.linalg.norm(v1) * np.linalg.norm(v2))
    if denom == 0:
        return 0
    return float(np.dot(v1, v2) / denom)

# --------------------------------------------------
# Function: analogy
# Purpose:  Solve analogies of the form A is to B as C is to D using vector math.
# --------------------------------------------------
def analogy(a, b, c, vectors):
    if a not in vectors or b not in vectors or c not in vectors:
        missing = [x for x in (a, b, c) if x not in vectors]
        print(f"Missing words in dictionary: {', '.join(missing)}\n")
        return

    v5 = vectors[b] - vectors[a] + vectors[c]

    words = list(vectors.keys())
    matrix = np.stack(list(vectors.values()))
    norms = np.linalg.norm(matrix, axis=1)
    sim = np.dot(matrix, v5) / (np.linalg.norm(v5) * norms)
    sim = np.nan_to_num(sim)

    results = sorted(zip(sim, words), key=lambda x: x[0], reverse=True)
    results = [(s, w) for s, w in results if w not in (a, b, c)][:20]

    best_word = results[0][1] if results else "???"
    print(f"{a} is to {b} as {c} is to {best_word}\n")
    for score, word in results:
        print(f"{score:.15f}\t{word}")
    print()
    return best_word

# --------------------------------------------------
# Function: main
# Purpose:  Handle program flow: load data, take user input, process analogies.
# --------------------------------------------------
def main():
    print("\033[92m")  # green text
    print("Lab #3 – by Brendan Goddard\n")
    print("Analogies take the form: A is to B as C is to D")
    print("Example: 'man is to woman as king is to queen'\n")

    filename = "FastText100K.txt"
    vectors = load_vectors(filename)

    while True:
        line = input("Enter 3 analogy word tokens: ").strip()
        if not line:
            break
        parts = line.split()
        if len(parts) != 3:
            print("Please enter exactly 3 words.\n")
            continue

        a, b, c = parts
        print("Processing analogy...\n")
        analogy(a, b, c, vectors)

    print("Program ended – Brendan Goddard\n")
    print("\033[0m")

if __name__ == "__main__":
    main()
