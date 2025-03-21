import pinecone
import json
import numpy as np
from typing import List, Dict
import os
from anthropic import Anthropic

class VectorStoreService:
    """Vector store using Pinecone and Claude for embeddings"""

    def __init__(self, index_name="kotoba-nexus", vector_dim=1536):
        self.index_name = index_name
        self.vector_dim = vector_dim
        
        # Pinecone API key & setup
        pinecone.init(api_key=os.getenv("PINECONE_API_KEY"), environment="us-west1-gcp")
        
        # Check if index exists, else create
        if self.index_name not in pinecone.list_indexes():
            pinecone.create_index(self.index_name, dimension=self.vector_dim, metric="cosine")
        
        self.index = pinecone.Index(self.index_name)

        # Claude API setup (Anthropic)
        self.claude = Anthropic(api_key=os.getenv("CLAUDE_API_KEY"))

    def embed_text(self, text: str) -> np.array:
        """Use Claude to generate embeddings"""
        # Use the embeddings API, not completions
        response = self.claude.embeddings.create(
            model="claude-3-opus-20240229",
            input=text
        )
        # Extract the embedding from the response
        embedding = response.embedding
        return np.array(embedding, dtype=np.float32)

    def add_transcriptions(self, transcriptions: List[str]):
        """Convert transcriptions to embeddings and store in Pinecone"""
        vectors = []
        for i, text in enumerate(transcriptions):
            embedding = self.embed_text(text).tolist()
            # Include the text as metadata for retrieval later
            vectors.append({
                "id": str(i),
                "values": embedding,
                "metadata": {"text": text}
            })
        
        # Updated upsert to handle the correct format
        self.index.upsert(vectors=vectors)

    def search_similar(self, query: str, top_k: int = 5) -> List[Dict[str, any]]:
        """Find top-k similar embeddings in Pinecone"""
        query_embedding = self.embed_text(query).tolist()
        results = self.index.query(
            vector=query_embedding,
            top_k=top_k,
            include_metadata=True
        )

        return [
            {"text": match["metadata"]["text"], "score": match["score"]}
            for match in results["matches"]
        ]