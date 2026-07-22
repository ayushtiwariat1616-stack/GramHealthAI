from app.rag.vectorstore import get_vectorstore


def retrieve_context(query: str, k: int = 5):
    db = get_vectorstore()

    docs = db.max_marginal_relevance_search(
        query=query,
        k=k,
        fetch_k=15,
        lambda_mult=0.7,
    )

    # Remove duplicate chunks
    seen = set()
    unique_docs = []

    for doc in docs:
        text = doc.page_content.strip()

        if text not in seen:
            seen.add(text)
            unique_docs.append(doc)

    return unique_docs