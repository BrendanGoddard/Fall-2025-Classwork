# Lab1_Test_FullAnimated_Colored.py
# Fully Animated Scramble Solver – Colored Loading Bars

import time
import random
import os
import itertools

# ANSI colors
RESET = "\033[0m"
RED = "\033[91m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
BLUE = "\033[94m"
MAGENTA = "\033[95m"
CYAN = "\033[96m"

# === Dictionary Loader ===
def load_words():
    word_dict = {}
    files = {
        "noun": "NounsIndex.txt",
        "verb": "VerbsIndex.txt",
        "adjective": "AdjIndex.txt",
        "adverb": "AdvIndex.txt"
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

# === Permutation Generator ===
def get_permutations(word):
    return {''.join(p).lower() for p in itertools.permutations(word)}

# === Solver ===
def solve_anagram(word, dictionary):
    perms = get_permutations(word)
    matches = [p for p in perms if p in dictionary]
    return matches

# === Utility ===
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def animate_word_colored(word, compute_time, max_bar_length=40):
    """Animated colored loading bar scaled by word length & compute time"""
    word_len_factor = min(len(word), 10) / 10
    bar_length = int(max_bar_length * word_len_factor)
    step_time = compute_time / max(bar_length, 1)
    color_cycle = [RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN]
    for i in range(bar_length + 1):
        color = color_cycle[i % len(color_cycle)]
        bar = color + "█" * i + RESET + "-" * (bar_length - i)
        print(f"Solving '{word}' [{bar}]", end='\r')
        time.sleep(step_time)
    print()

# === ASCII Graphs ===
def print_ascii_graphs(results, total_time=None):
    print("=== POS Distribution by Word Length ===\n")
    pos_colors = {"noun": GREEN, "verb": BLUE, "adjective": YELLOW, "adverb": MAGENTA}
    for length in sorted(results.keys()):
        pos_counts = results[length]
        total = sum(pos_counts.values())
        print(f"{length:>2} letters |", end=' ')
        for pos in ["noun", "verb", "adjective", "adverb"]:
            count = pos_counts.get(pos, 0)
            bar_len = int((count / total) * 50) if total > 0 else 0
            color = pos_colors.get(pos, RESET)
            print(f"{color}{pos[0].upper() * bar_len}{RESET}", end='')
        summary = " ".join([f"{p[0].upper()}:{pos_counts[p]}" for p in ["noun", "verb", "adjective", "adverb"]])
        print(f"  [{summary}]")
    if total_time is not None:
        print(f"\nTotal Time for batch: {total_time:.2f} ms")

# === Auto Test Harness ===
def run_auto_tests(dictionary, min_len=3, max_len=10, words_per_len=10):
    results = {}
    length_buckets = {}
    for word, pos in dictionary.items():
        l = len(word)
        if min_len <= l <= max_len:
            length_buckets.setdefault(l, []).append((word, pos))

    for length in range(min_len, max_len + 1):
        if length not in length_buckets:
            continue

        words = random.sample(length_buckets[length], min(words_per_len, len(length_buckets[length])))
        pos_distribution = {"noun": 0, "verb": 0, "adjective": 0, "adverb": 0}
        batch_start = time.perf_counter()

        for w, _ in words:
            scrambled = ''.join(random.sample(w, len(w)))
            word_start = time.perf_counter()
            matches = solve_anagram(scrambled, dictionary)
            word_end = time.perf_counter()
            elapsed = word_end - word_start

            animate_word_colored(scrambled, elapsed)

            for match in matches:
                pos = dictionary.get(match, "other")
                if pos in pos_distribution:
                    pos_distribution[pos] += 1

        batch_end = time.perf_counter()
        total_time = (batch_end - batch_start) * 1000  # ms
        results[length] = pos_distribution

        clear_screen()
        print_ascii_graphs(results, total_time=total_time)
        time.sleep(1)

    return results

# === Manual Solve Mode ===
def run_manual(dictionary):
    print("=== Manual Anagram Solver ===")
    print("Type 'Q' to return to the menu.\n")
    while True:
        word = input("Enter scrambled word: ").strip().lower()
        if word.upper() == "Q":
            break
        start = time.perf_counter()
        matches = solve_anagram(word, dictionary)
        end = time.perf_counter()
        elapsed_ms = (end - start) * 1000

        if matches:
            print(f"Matches found ({len(matches)}): {', '.join(matches)}")
            for m in matches:
                pos = dictionary.get(m, "other")
                print(f" - '{m}' is a {pos}")
        else:
            print("No matches found.")
        print(f"Time to solve: {elapsed_ms:.2f} ms\n")

# === Main Menu ===
def main_menu():
    dictionary = load_words()
    print(f"Loaded {len(dictionary)} words from index files.")
    time.sleep(1)

    while True:
        clear_screen()
        print("=== Scramble Solver ===")
        print("1. Auto Solve Tests")
        print("2. Manual Solve")
        print("Q. Quit")
        choice = input("\nSelect an option: ").strip().upper()

        if choice == "1":
            run_auto_tests(dictionary)
            input("\nPress Enter to return to menu...")
        elif choice == "2":
            run_manual(dictionary)
        elif choice == "Q":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Try again.")
            time.sleep(1)

if __name__ == "__main__":
    main_menu()
