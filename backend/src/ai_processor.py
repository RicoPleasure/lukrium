from google import genai

client = genai.Client(api_key="AIzaSyC8PQSPCqBFLGDp4jkFKpwJPcd64b3h5as")

def generate_statistics(PROMPT):

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=PROMPT,
    )
    return response
    