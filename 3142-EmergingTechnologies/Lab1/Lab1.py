import time
import os
import itertools

# ---------------------------------------------------
# Dictionary Loader
# ---------------------------------------------------
def load_words():
    word_dict = {}
    files = {
        "NOUN": "NounsIndex.txt",
        "VERB": "VerbsIndex.txt",
        "ADJECTIVE": "AdjIndex.txt",
        "ADVERB": "AdvIndex.txt"
    }

    for pos, filename in files.items():
        if not os.path.exists(filename):
            continue
        with open(filename, "r", encoding="utf-8") as f:
            for line in f:
                if "|" not in line:
                    continue
                word = line.strip().split("|")[0].lower()
                if "_" not in word and word != "":
                    word_dict[word] = pos
    return word_dict


# ---------------------------------------------------
# Permutation Generator
# ---------------------------------------------------
def get_permutations(word):
    return {''.join(p).lower() for p in itertools.permutations(word)}


# ---------------------------------------------------
# Word Solver
# ---------------------------------------------------
def solve_anagram(word, dictionary):
    perms = get_permutations(word)
    matches = []
    for p in perms:
        if p in dictionary:
            matches.append((p.upper(), dictionary[p].upper()))  # enforce ALL CAPS
    return matches


# ---------------------------------------------------
# Main Program
# ---------------------------------------------------
def run_main():
    dictionary = load_words()
    while True:
        print("\nEnter the Jumble Puzzle Word: (<enter> to quit)", end=" ")
        jumble = input().strip()
        if jumble == "":
            break

        jumble = jumble.upper()
        start_time = time.strftime("%H:%M:%S", time.localtime())
        print(f"Start time: {start_time}")

        matches = solve_anagram(jumble, dictionary)

        if matches:
            for word, pos in matches:
                print(f"{word} {pos}")
        else:
            print("<Not found>")

        finish_time = time.strftime("%H:%M:%S", time.localtime())
        print(f"Finish time: {finish_time}")


if __name__ == "__main__":
    run_main()
