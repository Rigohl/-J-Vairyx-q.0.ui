# Optimizador de Rutas de Aprendizaje en Julia

struct StudentPattern
    attention_span::Int
    preferred_format::String # "video", "text", "interactive"
    average_recall::Float64
end

function determine_best_path(pattern::StudentPattern)
    println("Julia: Analizando patrones para el mejor camino de aprendizaje...")

    if pattern.attention_span < 10
        return "Micro-learning: Videos cortos y retos rápidos"
    elseif pattern.preferred_format == "video"
        return "Priorizar contenido multimedia y tutoriales visuales"
    else
        return "Modo Académico: Lectura profunda y síntesis"
    end
end

# Simulación
p = StudentPattern(8, "video", 0.75)
println(determine_best_path(p))
