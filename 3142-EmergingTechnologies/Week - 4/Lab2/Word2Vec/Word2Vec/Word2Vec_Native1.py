import numpy as np

def simple_word2vec(corpus, vector_size=10, window=2, epochs=100, learning_rate=0.01):
    """
    Very simple teaching version of Word2Vec (skip-gram, no negative sampling).
    Trains small word embeddings from a list of tokenized sentences.
    """

    # Build vocabulary
    vocab = sorted(set(word for sentence in corpus for word in sentence))
    word_to_id = {w: i for i, w in enumerate(vocab)}
    id_to_word = {i: w for w, i in word_to_id.items()}
    vocab_size = len(vocab)

    # One-hot encode words
    def one_hot(idx):
        vec = np.zeros(vocab_size)
        vec[idx] = 1
        return vec

    # Initialize weights (word vectors)
    W1 = np.random.rand(vocab_size, vector_size)  # input -> hidden
    W2 = np.random.rand(vector_size, vocab_size)  # hidden -> output

    # Training loop
    for epoch in range(epochs):
        loss = 0
        for sentence in corpus:
            for i, word in enumerate(sentence):
                w_id = word_to_id[word]
                center = one_hot(w_id)

                # Context words within window
                start = max(0, i - window)
                end = min(len(sentence), i + window + 1)
                context_ids = [word_to_id[sentence[j]] for j in range(start, end) if j != i]

                # Forward pass
                hidden = np.dot(center, W1)                 # (1, vector_size)
                output = np.dot(hidden, W2)                 # (1, vocab_size)
                probs = np.exp(output) / np.sum(np.exp(output))  # softmax

                # Backpropagation (update weights)
                for c_id in context_ids:
                    target = one_hot(c_id)
                    error = probs - target
                    loss += -np.log(probs[c_id] + 1e-10)

                    # Gradient updates
                    W2 -= learning_rate * np.outer(hidden, error)
                    W1 -= learning_rate * np.outer(center, np.dot(W2, error))

        if (epoch + 1) % (epochs // 10) == 0:
            print(f"Epoch {epoch+1}/{epochs}, Loss: {loss:.4f}")

    # Final word embeddings (W1 rows)
    word_vectors = {id_to_word[i]: W1[i] for i in range(vocab_size)}
    return word_vectors


# Example usage
if __name__ == "__main__":
    corpus = [
        "the cat sat on the mat".split(),
        "the dog barked at the cat".split()
    ]
    #with open('the-verdict.txt', 'r', encoding='utf-8') as f:
    #    corpus = [word_tokenize(line.lower()) for line in f]

    vectors = simple_word2vec(corpus, vector_size=5, window=2, epochs=200)

    # Print some embeddings
    for word, vec in vectors.items():
        print(word, vec.round(3))


