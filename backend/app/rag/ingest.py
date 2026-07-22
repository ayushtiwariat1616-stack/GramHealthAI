import shutil
from pathlib import Path

from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.rag.documents import load_documents
from app.rag.vectorstore import get_vectorstore


CHROMA_PATH = "chroma_db"


def ingest():

    # Delete old database
    if Path(CHROMA_PATH).exists():
        shutil.rmtree(CHROMA_PATH)
        print("🗑️ Old ChromaDB deleted.")

    # Load documents
    documents = load_documents()

    print(f"📄 Loaded {len(documents)} documents.")

    for doc in documents:
        doc.metadata["source"] = doc.metadata.get(
            "source",
            "Unknown",
        )

    # Split into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=700,
        chunk_overlap=120,
    )

    chunks = splitter.split_documents(documents)

    print(f"✂️ Created {len(chunks)} chunks.")

    # Store embeddings
    db = get_vectorstore()
    db.add_documents(chunks)

    print(f"✅ Stored {len(chunks)} chunks in ChromaDB.")


if __name__ == "__main__":
    ingest()