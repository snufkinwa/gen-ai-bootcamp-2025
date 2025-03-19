import boto3
import json
import numpy as np
from typing import List, Dict
from opensearchpy import OpenSearch, RequestsHttpConnection, AWSV4SignerAuth
import os

class VectorStoreService:
    """Vector store using Amazon Bedrock embeddings and OpenSearch Serverless"""

    def __init__(self, vector_dim=1536, collection_name="search-kotoba"):
        self.vector_dim = vector_dim
        self.collection_name = collection_name

        # AWS Clients
        self.bedrock = boto3.client(service_name="bedrock-runtime", region_name="us-east-1")
        self.opensearch_host = os.getenv("OPENSEARCH_ENDPOINT", "https://your-opensearch-endpoint")
        
        credentials = boto3.Session().get_credentials()
        auth = AWSV4SignerAuth(credentials, "us-east-1", "aoss")

        self.opensearch = OpenSearch(
            hosts=[{"host": self.opensearch_host, "port": 443}],
            http_auth=auth,
            use_ssl=True,
            verify_certs=True,
            connection_class=RequestsHttpConnection,
        )

    def embed_text(self, text: str) -> np.array:
        """Use Amazon Bedrock Titan model to generate embeddings"""
        payload = {"inputText": text}
        response = self.bedrock.invoke_model(
            modelId="amazon.titan-embed-text-v1",
            body=json.dumps(payload)
        )
        embedding = json.loads(response["body"].read())["embedding"]
        return np.array(embedding, dtype=np.float32)

    def add_transcriptions(self, transcriptions: List[str]):
        """Convert transcriptions to embeddings and store in OpenSearch"""
        for text in transcriptions:
            embedding = self.embed_text(text).tolist()

            doc = {
                "text": text,
                "embedding": embedding
            }

            self.opensearch.index(index=self.collection_name, body=doc)

    def search_similar(self, query: str, top_k: int = 5) -> List[Dict[str, any]]:
        """Find top-k similar embeddings in OpenSearch"""
        query_embedding = self.embed_text(query).tolist()

        search_query = {
            "size": top_k,
            "query": {
                "knn": {
                    "embedding": {
                        "vector": query_embedding,
                        "k": top_k
                    }
                }
            }
        }

        response = self.opensearch.search(index=self.collection_name, body=search_query)
        
        results = []
        for hit in response["hits"]["hits"]:
            results.append({
                "text": hit["_source"]["text"],
                "score": hit["_score"]
            })
        
        return results
