import numpy as np
import time

from gensim.models import Word2Vec as GensimWord2Vec
from Word2Vec_Native3 import simple_word2vec
from Word2Vec_Optimized import simple_word2vec_neg_sampling

def cosine_similarity(vec1, vec2):
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

def load_corpus(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return [line.strip().split() for line in f if line.strip()]

def compare_models(corpus, test_words):
    # Native3
    start = time.time()
    native3_vectors = simple_word2vec(corpus, vector_size=50, window=2, epochs=5, lr=0.05, verbose=False)
    t_native3 = time.time() - start

    # Optimized
    start = time.time()
    opt_vectors = simple_word2vec_neg_sampling(corpus, vector_size=50, window=2, epochs=5, lr=0.05, neg_samples=5, verbose=False)
    t_opt = time.time() - start

    # Gensim
    start = time.time()
    gensim_model = GensimWord2Vec(sentences=corpus, vector_size=50, window=2, min_count=1, sg=1, epochs=5)
    t_gensim = time.time() - start

    print(f"Training time (seconds):")
    print(f"  Native3:   {t_native3:.2f}")
    print(f"  Optimized: {t_opt:.2f}")
    print(f"  Gensim:    {t_gensim:.2f}")

    print("\nCosine similarities (word pairs):")
    for w1, w2 in test_words:
        try:
            v1 = native3_vectors[w1]
            v2 = native3_vectors[w2]
            print(f"Native3:   {w1}-{w2}: {cosine_similarity(v1, v2):.3f}")
        except KeyError:
            print(f"Native3:   {w1}-{w2}: N/A")
        try:
            v1 = opt_vectors[w1]
            v2 = opt_vectors[w2]
            print(f"Optimized: {w1}-{w2}: {cosine_similarity(v1, v2):.3f}")
        except KeyError:
            print(f"Optimized: {w1}-{w2}: N/A")
        try:
            v1 = gensim_model.wv[w1]
            v2 = gensim_model.wv[w2]
            print(f"Gensim:    {w1}-{w2}: {cosine_similarity(v1, v2):.3f}")
        except KeyError:
            print(f"Gensim:    {w1}-{w2}: N/A")
        print("")

if __name__ == "__main__":
    corpus = load_corpus('the-verdict.txt')
    test_words = [('king', 'queen'), ('man', 'woman'), ('dog', 'cat')]  # Change as needed
    compare_models(corpus, test_words)