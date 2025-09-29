from gensim.models import Word2Vec
from nltk.tokenize import word_tokenize
import nltk

nltk.download('punkt_tab')

# Read and tokenize your text
with open('the-verdict.txt', 'r', encoding='utf-8') as f:
    sentences = [word_tokenize(line.lower()) for line in f]

# Train the Word2Vec model
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, workers=4)

# Save word vectors in Word2Vec format
model.wv.save_word2vec_format('word_vectors.vec')
