from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings


_embedding = None


def get_embedding():
    global _embedding

    if _embedding is None:
        _embedding = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2",
            model_kwargs={
                "device": "cpu",
            },
            encode_kwargs={
                "normalize_embeddings": True,
            },
        )

    return _embedding


def get_vectorstore():
    return Chroma(
        persist_directory="chroma_db",
        embedding_function=get_embedding(),
    )