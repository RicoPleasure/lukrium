from fastapi import FastAPI
from get_database_concorrentes import get_data_from_api  # Ensure this fetches and saves JSON
from ai_processor import generate_statistics
import json

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.get("/generate_price")
def generate_price():
    get_data_from_api()

    try:
        with open("products.json", "r", encoding="utf-8") as json_file:
            product_data = json.load(json_file)
    except FileNotFoundError:
        return {"error": "products.json not found"}

    dataset = json.dumps(product_data, indent=2)

    prompt = f"""
    Você é um especialista em precificação de produtos e análise de mercado. Sua tarefa é estimar um preço razoável para um produto com base no seu nome e descrição.  
    Você é um modelo de IA treinado em análise de mercado e estratégias de precificação. Sua missão é determinar um preço adequado para um produto, utilizando um conjunto de dados com preços de produtos como referência.

    {dataset}

    1. **Analise o Conjunto de Dados**: Identifique padrões de preços com base no tipo de produto, marca e categoria.
    2. **Compare o Nome e a Descrição do Produto**:  
        - Se um produto semelhante existir no conjunto de dados, use-o como referência.
        - Se o produto for único, estime seu preço com base em categorias similares.
    3. **Gere um Preço Justo**:  
        - Certifique-se de que o preço está alinhado com as tendências do mercado.
        - Considere preços mais altos para marcas conhecidas e produtos especiais.
        - Produtos genéricos ou de menor qualidade podem ter preços mais baixos.

        - **Nome do Produto**: Pão de Forma  
        - **Descrição do Produto**: Com códea  

    Forneça um único valor numérico representando o preço estimado. **Não inclua símbolos monetários ou texto extra, apenas o valor do preço.**
    """ 

    ai_result = generate_statistics(prompt)

    return {"ai_analysis": ai_result.text}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
