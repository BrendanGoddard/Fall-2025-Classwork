import numpy as np

def stable_softmax(z):
    z = z - np.max(z)
    ez = np.exp(z)
    return ez / (np.sum(ez) + 1e-12)

def simple_word2vec(corpus, vector_size=50, window=2, epochs=5, lr=0.05, seed=42, verbose=True):
    """
    Ultra-simple skip-gram with full softmax (O(|V|) per center).
    - corpus: list[list[str]]  (already tokenized)
    - Returns: dict word -> embedding (np.ndarray)
    """
    rng = np.random.default_rng(seed)

    # ---- vocab ----
    vocab = sorted({w for sent in corpus for w in sent})
    word_to_id = {w: i for i, w in enumerate(vocab)}
    id_to_word = {i: w for w, i in word_to_id.items()}
    V = len(vocab)

    # ---- params ----
    W1 = rng.normal(0, 0.1, size=(V, vector_size))  # input embeddings
    W2 = rng.normal(0, 0.1, size=(vector_size, V))  # output embeddings

    for epoch in range(1, epochs + 1):
        total_loss = 0.0
        # (Optional) shuffle sentences to improve SGD
        for sentence in corpus:
            n = len(sentence)
            for i, center_word in enumerate(sentence):
                c_id = word_to_id[center_word]

                # --- collect context indices ---
                L = max(0, i - window)
                R = min(n, i + window + 1)
                ctx_ids = [word_to_id[sentence[j]] for j in range(L, R) if j != i]
                if not ctx_ids:
                    continue

                # --- forward ---
                scores = W2.T @ h                           # (V,)
                probs = stable_softmax(scores)              # (V,)

                # target: uniform mass over context words
                y = np.zeros(V, dtype=np.float32)
                for t in ctx_ids:
                    y[t] += 1.0
                y /= len(ctx_ids)

                # cross-entropy with soft targets
                # loss = -sum_t y_t * log p_t
                total_loss += -np.log(probs[ctx_ids]).mean()

                # --- backward ---
                grad_scores = probs - y                     # (V,)
                grad_W2 = np.outer(h, grad_scores)          # (d, V)
                grad_h  = W2 @ grad_scores                  # (d,)

                # --- SGD updates (use old W2 for grad_h above) ---
                W2 -= lr * grad_W2
                W1[c_id] -= lr * grad_h

        if verbose:
            print(f"Epoch {epoch}/{epochs} | Loss: {total_loss:.4f}")

    # Return input embeddings as word vectors
    return {id_to_word[i]: W1[i] for i in range(V)}

def save_vectors(data, filename, sep=" "):
    with open(filename, "w", encoding="utf-8") as f:
        for word, vec in vectors.items():
            f.write(word + " " + str(vec.round(3)) + "\n")

# -------- example usage ----------
if __name__ == "__main__":
    with open('the-verdict.txt', 'r', encoding='utf-8') as f:
        corpus = [line.strip().split() for line in f if line.strip()]

    vectors = simple_word2vec(corpus, vector_size=50, window=2, epochs=5, lr=0.05)

    for word, vec in vectors.items():
        print(word, vec.round(3))

    save_vectors(vectors, "verdict-vect.txt")
