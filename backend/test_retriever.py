from app.rag.retriever import retrieve_context

query = "What are the symptoms of malaria?"

context = retrieve_context(query)

print("=" * 60)
print(context)
print("=" * 60)