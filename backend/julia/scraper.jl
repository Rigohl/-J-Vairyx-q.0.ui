using HTTP
using Gumbo
using Cascadia

# Configuración de fuentes educativas ampliadas
const EDUCATIONAL_SOURCES = [
    "https://es.wikipedia.org/wiki/",
    "https://arxiv.org/search/?query=",
    "https://stackoverflow.com/search?q=",
    "https://pypi.org/search/?q="
]

function scrape_educational_content(url::String)
    println("Julia: Iniciando scraping educativo profundo en $url")
    try
        response = HTTP.get(url)
        html = parsehtml(String(response.body))

        # Extracción mejorada: buscamos contenido denso
        paragraphs = eachmatch(Selector("p, article, section"), html.root)

        content = ""
        count = 0
        for p in paragraphs
            text = nodeText(p)
            if length(text) > 50 # Filtrar fragmentos cortos
                content *= text * "\n\n"
                count += 1
            end
            count >= 15 && break
        end

        return content
    catch e
        return "Error en scraping profundo: $e"
    end
end

function research_topic_multi_source(query::String)
    println("Julia: Investigando '$query' en múltiples fuentes...")
    results = []

    # Simulación de investigación proactiva
    for source in EDUCATIONAL_SOURCES
        target_url = source * replace(query, " " => "+")
        println("Julia: Consultando $target_url")
        push!(results, "Datos extraídos de $source para el tema $query")
    end

    return join(results, " | ")
end

# Ejemplo de uso interno
# println(research_topic_multi_source("inteligencia artificial"))
