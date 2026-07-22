from pathlib import Path

from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
)


def extract_primary_sources(text: str):
    """
    Extract the 'Primary Sources' section from a knowledge file.
    """

    sources = []

    if "Primary Sources:" not in text:
        return sources

    section = text.split("Primary Sources:", 1)[1]

    for line in section.splitlines():

        line = line.strip()

        if line.startswith("-"):
            sources.append(line[1:].strip())

        elif line == "":
            continue

        else:
            break

    return sources


def load_documents():

    docs = []

    kb = Path("knowledge_base")

    for file in kb.rglob("*"):

        if file.suffix == ".txt":

            loader = TextLoader(
                str(file),
                encoding="utf-8",
            )

            loaded = loader.load()

            for doc in loaded:

                doc.metadata["source"] = str(file)

                doc.metadata["primary_sources"] = extract_primary_sources(
                    doc.page_content
                )

            docs.extend(loaded)

        elif file.suffix == ".pdf":

            loader = PyPDFLoader(str(file))

            loaded = loader.load()

            for doc in loaded:
                doc.metadata["source"] = str(file)

            docs.extend(loaded)

    return docs