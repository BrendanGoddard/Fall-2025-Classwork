import numpy as np
from collections import Counter
import random

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def simple_word2vec_neg_sampling(corpus, vector_size=50, window=2, epochs=5, lr=0.05, neg_samples=5, seed=42, verbose=True):
    rng = np.random.default_rng(seed)
    vocab = sorted({w for sent in corpus for w in sent})
    word_to_id = {w: i for i, w in enumerate(vocab)}
    id_to_word = {i: w for w, i in word_to_id.items()}
    V = len(vocab)

    # Precompute unigram distribution for negative sampling
    word_freq = Counter(w for sent in corpus for w in sent)
    freq = np.array([word_freq[w] for w in vocab], dtype=np.float32)
    unigram_dist = freq ** 0.75
    unigram_dist /= unigram_dist.sum()

    W1 = rng.normal(0, 0.1, size=(V, vector_size)).astype(np.float32)
    W2 = rng.normal(0, 0.1, size=(V, vector_size)).astype(np.float32)

    for epoch in range(1, epochs + 1):
        total_loss = 0.0
        for sentence in corpus:
            n = len(sentence)
            for i, center_word in enumerate(sentence):
                c_id = word_to_id[center_word]
                L = max(0, i - window)
                R = min(n, i + window + 1)
                ctx_ids = [word_to_id[sentence[j]] for j in range(L, R) if j != i]
                if not ctx_ids:
                    continue

                for t_id in ctx_ids:
                    # Positive sample
                    score = np.dot(W1[c_id], W2[t_id])
                    p = sigmoid(score)
                    loss = -np.log(p + 1e-12)
                    total_loss += loss
                    grad = lr * (p - 1)
                    W1[c_id] -= grad * W2[t_id]
                    W2[t_id] -= grad * W1[c_id]

                    # Negative samples
                    for _ in range(neg_samples):
                        neg_id = rng.choice(V, p=unigram_dist)
                        if neg_id == t_id:
                            continue
                        score_neg = np.dot(W1[c_id], W2[neg_id])
                        p_neg = sigmoid(score_neg)
                        loss_neg = -np.log(1 - p_neg + 1e-12)
                        total_loss += loss_neg
                        grad_neg = lr * p_neg
                        W1[c_id] -= grad_neg * W2[neg_id]
                        W2[neg_id] -= grad_neg * W1[c_id]

        if verbose:
            print(f"Epoch {epoch}/{epochs} | Loss: {total_loss:.4f}")

    return {id_to_word[i]: W1[i] for i in range(V)}