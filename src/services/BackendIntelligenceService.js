// Backend Intelligence Service - Deep understanding of backend technologies, APIs, databases, and system architecture
class BackendIntelligenceService {
  constructor() {
    this.backendKnowledge = this.initializeBackendKnowledge();
    this.apiExpertise = this.initializeAPIExpertise();
    this.databaseKnowledge = this.initializeDatabaseKnowledge();
    this.architecturePatterns = this.initializeArchitecturePatterns();
    this.securityPrinciples = this.initializeSecurityPrinciples();
    this.currentTrends = this.initializeCurrentTrends();
  }

  initializeBackendKnowledge() {
    return {
      languages: {
        javascript: {
          runtime: 'Node.js',
          frameworks: ['Express.js', 'Koa.js', 'Fastify', 'NestJS'],
          strengths: ['Event-driven', 'Non-blocking I/O', 'JSON native', 'Large ecosystem'],
          use_cases: ['Real-time applications', 'APIs', 'Microservices', 'IoT backends'],
          concepts: ['Event loop', 'Callbacks', 'Promises', 'Async/await', 'Streams']
        },
        python: {
          frameworks: ['Django', 'Flask', 'FastAPI', 'Pyramid'],
          strengths: ['Rapid development', 'AI/ML integration', 'Clean syntax', 'Rich libraries'],
          use_cases: ['Data processing', 'AI services', 'Automation', 'Scientific computing'],
          concepts: ['WSGI/ASGI', 'Decorators', 'Context managers', 'Generators']
        },
        java: {
          frameworks: ['Spring Boot', 'Quarkus', 'Micronaut'],
          strengths: ['Enterprise-grade', 'Strong typing', 'JVM ecosystem', 'Performance'],
          use_cases: ['Large-scale systems', 'Financial systems', 'Enterprise applications'],
          concepts: ['JVM', 'Garbage collection', 'Multithreading', 'Reflection']
        },
        csharp: {
          frameworks: ['.NET Core', 'ASP.NET', 'Blazor'],
          strengths: ['Microsoft ecosystem', 'Strong typing', 'Cross-platform', 'Performance'],
          use_cases: ['Enterprise applications', 'Windows services', 'Cloud applications'],
          concepts: ['CLR', 'LINQ', 'Async patterns', 'Dependency injection']
        },
        go: {
          frameworks: ['Gin', 'Echo', 'Fiber', 'Chi'],
          strengths: ['Concurrency', 'Performance', 'Simple deployment', 'Fast compilation'],
          use_cases: ['Microservices', 'Cloud infrastructure', 'CLI tools', 'DevOps tools'],
          concepts: ['Goroutines', 'Channels', 'Interfaces', 'Composition']
        }
      },
      
      server_technologies: {
        web_servers: {
          nginx: {
            type: 'Reverse proxy & web server',
            strengths: ['High performance', 'Load balancing', 'SSL termination'],
            use_cases: ['Static content', 'Reverse proxy', 'Load balancer']
          },
          apache: {
            type: 'Web server',
            strengths: ['Modular', 'Widely supported', 'Feature-rich'],
            use_cases: ['Traditional hosting', 'PHP applications']
          }
        },
        application_servers: {
          docker: {
            type: 'Containerization platform',
            benefits: ['Consistency', 'Isolation', 'Scalability', 'Portability'],
            concepts: ['Containers', 'Images', 'Dockerfile', 'Orchestration']
          },
          kubernetes: {
            type: 'Container orchestration',
            benefits: ['Auto-scaling', 'Self-healing', 'Service discovery', 'Rolling updates'],
            concepts: ['Pods', 'Services', 'Deployments', 'ConfigMaps']
          }
        }
      }
    };
  }

  initializeAPIExpertise() {
    return {
      api_types: {
        rest: {
          description: 'Representational State Transfer',
          principles: ['Stateless', 'Cacheable', 'Uniform interface', 'Layered system'],
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
          status_codes: {
            '2xx': 'Success responses',
            '3xx': 'Redirection messages', 
            '4xx': 'Client error responses',
            '5xx': 'Server error responses'
          },
          best_practices: [
            'Use appropriate HTTP methods',
            'Design intuitive resource URLs',
            'Use proper status codes',
            'Version your API',
            'Implement proper authentication',
            'Include comprehensive documentation'
          ]
        },
        graphql: {
          description: 'Query language and runtime for APIs',
          benefits: ['Single endpoint', 'Client-specified queries', 'Strong typing', 'Real-time subscriptions'],
          concepts: ['Queries', 'Mutations', 'Subscriptions', 'Resolvers', 'Schema'],
          use_cases: ['Complex data requirements', 'Mobile applications', 'Real-time features']
        },
        websockets: {
          description: 'Full-duplex communication protocol',
          benefits: ['Real-time communication', 'Low latency', 'Bidirectional'],
          use_cases: ['Chat applications', 'Live updates', 'Gaming', 'Collaborative tools']
        },
        grpc: {
          description: 'High-performance RPC framework',
          benefits: ['Type safety', 'Performance', 'Streaming', 'Multi-language support'],
          use_cases: ['Microservices communication', 'High-performance systems']
        }
      },
      
      api_design_patterns: {
        authentication: {
          jwt: 'JSON Web Tokens for stateless authentication',
          oauth2: 'Industry standard for authorization',
          api_keys: 'Simple authentication for internal systems',
          basic_auth: 'Username/password over HTTPS'
        },
        rate_limiting: {
          purpose: 'Prevent abuse and ensure fair usage',
          strategies: ['Token bucket', 'Fixed window', 'Sliding window', 'Leaky bucket']
        },
        caching: {
          strategies: ['Browser caching', 'CDN caching', 'Application caching', 'Database caching'],
          headers: ['Cache-Control', 'ETag', 'Last-Modified']
        }
      }
    };
  }

  initializeDatabaseKnowledge() {
    return {
      relational_databases: {
        mysql: {
          type: 'RDBMS',
          strengths: ['Wide adoption', 'Good performance', 'Replication support'],
          use_cases: ['Web applications', 'E-commerce', 'Content management']
        },
        postgresql: {
          type: 'Advanced RDBMS',
          strengths: ['ACID compliance', 'Advanced features', 'JSON support', 'Extensibility'],
          use_cases: ['Complex applications', 'Analytics', 'Geospatial data']
        },
        sqlite: {
          type: 'Embedded database',
          strengths: ['Serverless', 'Zero configuration', 'Cross-platform'],
          use_cases: ['Mobile apps', 'Desktop applications', 'Prototyping']
        }
      },
      
      nosql_databases: {
        mongodb: {
          type: 'Document database',
          strengths: ['Flexible schema', 'Horizontal scaling', 'JSON-like documents'],
          use_cases: ['Content management', 'Real-time analytics', 'IoT applications']
        },
        redis: {
          type: 'In-memory data store',
          strengths: ['High performance', 'Data structures', 'Pub/Sub', 'Caching'],
          use_cases: ['Caching', 'Session storage', 'Real-time analytics', 'Message queuing']
        },
        elasticsearch: {
          type: 'Search and analytics engine',
          strengths: ['Full-text search', 'Real-time analytics', 'Scalability'],
          use_cases: ['Search functionality', 'Log analysis', 'Business intelligence']
        }
      },
      
      database_concepts: {
        acid_properties: {
          atomicity: 'All operations in a transaction succeed or fail together',
          consistency: 'Database remains in a valid state after transactions',
          isolation: 'Concurrent transactions do not interfere with each other',
          durability: 'Committed transactions are permanent'
        },
        scaling_strategies: {
          vertical: 'Adding more power to existing machines',
          horizontal: 'Adding more machines to the pool of resources',
          sharding: 'Distributing data across multiple databases',
          replication: 'Creating copies of data for availability and performance'
        }
      }
    };
  }

  initializeArchitecturePatterns() {
    return {
      microservices: {
        description: 'Architecture style that structures an application as a collection of loosely coupled services',
        benefits: [
          'Independent deployability',
          'Technology diversity',
          'Fault isolation',
          'Scalability',
          'Team autonomy'
        ],
        challenges: [
          'Distributed system complexity',
          'Network latency',
          'Data consistency',
          'Service discovery',
          'Monitoring and debugging'
        ],
        patterns: [
          'Service mesh',
          'Circuit breaker',
          'API gateway',
          'Event sourcing',
          'CQRS'
        ]
      },
      
      serverless: {
        description: 'Cloud computing execution model where cloud provider manages server infrastructure',
        benefits: [
          'No server management',
          'Automatic scaling',
          'Pay-per-execution',
          'High availability'
        ],
        use_cases: [
          'Event-driven processing',
          'API backends',
          'Data processing',
          'Scheduled tasks'
        ],
        providers: ['AWS Lambda', 'Azure Functions', 'Google Cloud Functions', 'Vercel Functions']
      },
      
      event_driven: {
        description: 'Architecture pattern where components communicate through events',
        benefits: [
          'Loose coupling',
          'Scalability',
          'Resilience',
          'Flexibility'
        ],
        patterns: [
          'Event sourcing',
          'CQRS',
          'Saga pattern',
          'Event streaming'
        ]
      }
    };
  }

  initializeSecurityPrinciples() {
    return {
      authentication_authorization: {
        authentication: 'Verifying who the user is',
        authorization: 'Determining what the user can access',
        best_practices: [
          'Use strong passwords and MFA',
          'Implement proper session management',
          'Use HTTPS everywhere',
          'Validate all inputs',
          'Follow principle of least privilege'
        ]
      },
      
      common_vulnerabilities: {
        injection: 'SQL injection, NoSQL injection, command injection',
        broken_authentication: 'Session management flaws, weak passwords',
        sensitive_data_exposure: 'Unencrypted data transmission/storage',
        xxe: 'XML External Entity attacks',
        broken_access_control: 'Improper authorization checks',
        security_misconfiguration: 'Default configurations, unnecessary features',
        xss: 'Cross-Site Scripting attacks',
        insecure_deserialization: 'Untrusted data deserialization',
        vulnerable_components: 'Outdated libraries and frameworks',
        insufficient_logging: 'Poor logging and monitoring'
      },
      
      security_headers: {
        'Content-Security-Policy': 'Prevents XSS and code injection',
        'Strict-Transport-Security': 'Enforces HTTPS connections',
        'X-Frame-Options': 'Prevents clickjacking attacks',
        'X-Content-Type-Options': 'Prevents MIME type sniffing',
        'Referrer-Policy': 'Controls referrer information'
      }
    };
  }

  initializeCurrentTrends() {
    return {
      cloud_native: {
        description: 'Applications designed specifically for cloud environments',
        technologies: ['Kubernetes', 'Docker', 'Service mesh', 'Cloud functions'],
        principles: ['Microservices', 'Containers', 'Dynamic management', 'DevOps']
      },
      
      edge_computing: {
        description: 'Processing data closer to where it is generated',
        benefits: ['Reduced latency', 'Bandwidth optimization', 'Improved privacy'],
        use_cases: ['IoT applications', 'Real-time processing', 'Content delivery']
      },
      
      ai_ml_integration: {
        description: 'Incorporating AI/ML capabilities into backend systems',
        applications: [
          'Intelligent APIs',
          'Automated testing',
          'Performance optimization',
          'Security threat detection',
          'Predictive scaling'
        ]
      }
    };
  }

  // Main method to explain backend concepts
  explainConcept(concept, context = {}) {
    concept = concept.toLowerCase();
    
    // API explanations
    if (concept.includes('api')) {
      return this.explainAPI(concept, context);
    }
    
    // Database explanations
    if (concept.includes('database') || concept.includes('db')) {
      return this.explainDatabase(concept, context);
    }
    
    // Architecture explanations
    if (concept.includes('microservice') || concept.includes('architecture')) {
      return this.explainArchitecture(concept, context);
    }
    
    // Security explanations
    if (concept.includes('security') || concept.includes('auth')) {
      return this.explainSecurity(concept, context);
    }
    
    // General backend explanation
    return this.explainBackendGeneral(concept, context);
  }

  explainAPI(concept, context) {
    return {
      explanation: `🔌 **¿Qué es una API?**

Una API (Application Programming Interface) es como un **camarero en un restaurante**:
- **Tú (cliente)** tienes una necesidad (quieres comida)
- **El camarero (API)** toma tu pedido y lo lleva a la cocina
- **La cocina (servidor/base de datos)** prepara lo que pediste
- **El camarero (API)** te trae exactamente lo que solicitaste

**¿Por qué son importantes las APIs?**
- **Conexión**: Permiten que diferentes aplicaciones se comuniquen
- **Reutilización**: Un backend puede servir a web, móvil, y otras apps
- **Escalabilidad**: Pueden manejar miles de solicitudes simultáneas
- **Seguridad**: Controlan qué datos se comparten y con quién

**Tipos principales:**
- **REST API**: La más común, usa HTTP como el navegador web
- **GraphQL**: Permite pedir exactamente los datos que necesitas
- **WebSockets**: Para comunicación en tiempo real (chats, juegos)`,

      examples: {
        real_world: [
          'Cuando usas WhatsApp, una API envía tus mensajes',
          'Cuando pagas con tarjeta, una API verifica tu saldo',
          'Cuando ves Netflix, una API busca tus películas',
          'Cuando uses Google Maps, una API calcula tu ruta'
        ],
        business_value: [
          'Una empresa puede crear una API y que otros desarrolladores construyan aplicaciones encima',
          'Permite integrar servicios de terceros fácilmente',
          'Acelera el desarrollo porque no reinventas la rueda',
          'Facilita crear ecosistemas de aplicaciones'
        ]
      },

      why_care: `**¿Por qué entender esto te hace más inteligente?**
- Las APIs están en TODO lo que usas diariamente
- Entender APIs te ayuda a comprender cómo funciona realmente la tecnología
- Te permite identificar oportunidades de automatización y mejora
- Es conocimiento fundamental para cualquier estrategia tecnológica`,

      next_steps: [
        'Pregúntame sobre REST vs GraphQL para detalles técnicos',
        'Consulta sobre seguridad de APIs',
        'Pide ejemplos de cómo diseñar una API exitosa'
      ]
    };
  }

  explainDatabase(concept, context) {
    return {
      explanation: `🗃️ **¿Qué es una Base de Datos?**

Una base de datos es como un **almacén ultra-organizado**:
- **Estructura**: Todo tiene su lugar específico y lógico
- **Velocidad**: Puedes encontrar cualquier información en milisegundos
- **Seguridad**: Solo personas autorizadas pueden acceder
- **Confiabilidad**: Los datos están protegidos contra pérdidas

**¿Por qué son críticas para el backend?**
- **Persistencia**: Guardan información permanentemente
- **Consultas**: Permiten buscar y filtrar datos complejos
- **Transacciones**: Aseguran que operaciones críticas sean exitosas o fallen completamente
- **Escalabilidad**: Pueden manejar desde miles hasta millones de usuarios`,

      types: {
        relational: {
          description: 'Como hojas de cálculo conectadas entre sí',
          examples: ['MySQL', 'PostgreSQL', 'SQLite'],
          best_for: 'Datos estructurados, transacciones financieras, sistemas empresariales'
        },
        nosql: {
          description: 'Más flexibles, como archivadores con diferentes tipos de documentos',
          examples: ['MongoDB', 'Redis', 'Elasticsearch'],
          best_for: 'Datos no estructurados, aplicaciones web modernas, análisis en tiempo real'
        }
      },

      business_impact: [
        'Una base de datos lenta puede hacer que los usuarios abandonen tu app',
        'Una base de datos bien diseñada puede ahorrar millones en infraestructura',
        'La pérdida de datos puede destruir una empresa',
        'Las consultas eficientes mejoran la experiencia del usuario'
      ],

      strategic_thinking: `**Pensamiento estratégico sobre datos:**
- Los datos son el nuevo petróleo, pero solo si sabes extraerlos y refinarlos
- Una buena arquitectura de datos permite tomar decisiones basadas en evidencia
- La escalabilidad de datos determina el crecimiento de tu negocio
- La seguridad de datos es crítica para la confianza del cliente`
    };
  }

  explainArchitecture(concept, context) {
    return {
      explanation: `🏗️ **Arquitectura de Backend: El Plano de Tu Imperio Digital**

La arquitectura de backend es como el **plano de una ciudad moderna**:
- **Monolito**: Una ciudad con un solo edificio gigante (simple pero limitado)
- **Microservicios**: Una ciudad con edificios especializados conectados (complejo pero escalable)
- **Serverless**: Una ciudad donde los edificios aparecen solo cuando los necesitas

**¿Por qué la arquitectura define el éxito?**
- **Escalabilidad**: Determina si puedes crecer de 100 a 100 millones de usuarios
- **Mantenimiento**: Una buena arquitectura facilita agregar nuevas funciones
- **Costos**: La arquitectura incorrecta puede ser 10x más cara de operar
- **Velocidad**: Afecta qué tan rápido tu equipo puede innovar`,

      patterns: {
        microservices: 'Como Netflix: cada función (usuarios, videos, recomendaciones) es un servicio independiente',
        monolith: 'Como una tienda tradicional: todo en un solo lugar, más simple de comenzar',
        serverless: 'Como Uber: pagas solo cuando alguien usa tu servicio'
      },

      strategic_decisions: [
        '¿Empezar con monolito para validar idea rápidamente?',
        '¿Cuándo migrar a microservicios para escalar?',
        '¿Qué servicios pueden ser serverless para optimizar costos?',
        '¿Cómo asegurar que la arquitectura apoye los objetivos de negocio?'
      ]
    };
  }

  explainSecurity(concept, context) {
    return {
      explanation: `🔒 **Seguridad en Backend: Protegiendo Tu Fortaleza Digital**

La seguridad es como un **sistema de defensa multicapa**:
- **Autenticación**: ¿Quién eres? (como mostrar tu ID)
- **Autorización**: ¿Qué puedes hacer? (como tener permisos específicos)
- **Encriptación**: Proteger datos en tránsito y en reposo
- **Monitoreo**: Detectar ataques en tiempo real

**¿Por qué la seguridad es estratégica?**
- **Confianza**: Los usuarios no usan servicios que no confían
- **Cumplimiento**: Regulaciones como GDPR requieren seguridad
- **Continuidad**: Un ataque puede paralizar tu negocio
- **Reputación**: Una brecha de seguridad puede destruir años de trabajo`,

      critical_principles: [
        'Principio del menor privilegio: dar solo los permisos mínimos necesarios',
        'Defensa en profundidad: múltiples capas de seguridad',
        'Fallar de forma segura: si algo falla, debe ser de forma segura',
        'No confiar nunca, verificar siempre: validar toda entrada'
      ],

      business_reality: `**La realidad empresarial:**
- El 95% de brechas de seguridad son por error humano
- Una brecha promedio cuesta $4.45 millones USD
- El 60% de pequeñas empresas cierran después de un ciberataque
- La seguridad no es un costo, es una inversión en supervivencia`
    };
  }

  explainBackendGeneral(concept, context) {
    return {
      explanation: `⚙️ **Backend: El Cerebro Invisible de la Tecnología**

El backend es como el **cerebro y sistema nervioso** de cualquier aplicación:
- **Invisible pero esencial**: Los usuarios nunca lo ven, pero sin él nada funciona
- **Toma decisiones**: Procesa la lógica de negocio y reglas complejas
- **Gestiona recursos**: Optimiza memoria, procesamiento y almacenamiento
- **Conecta todo**: Integra bases de datos, APIs externas, servicios de terceros

**¿Por qué el backend determina el éxito de una empresa?**
- **Experiencia del usuario**: Un backend lento = usuarios frustrados = pérdida de negocio
- **Escalabilidad**: Determina si puedes crecer o te quedas pequeño para siempre
- **Seguridad**: Protege los activos más valiosos de la empresa
- **Eficiencia**: Un backend optimizado puede ahorrar millones en infraestructura`,

      strategic_importance: [
        'Las empresas más valiosas del mundo (Google, Amazon, Facebook) son básicamente backends súper avanzados',
        'La diferencia entre un startup exitoso y uno fallido es often la calidad del backend',
        'Backend bien diseñado = capacidad de innovar rápido = ventaja competitiva',
        'Backend mal diseñado = deuda técnica = muerte lenta de la empresa'
      ],

      career_impact: `**¿Por qué entender backend te hace más valioso?**
- Te permite tomar decisiones tecnológicas informadas
- Entiendes los verdaderos costos y limitaciones de los proyectos
- Puedes comunicarte efectivamente con equipos técnicos
- Identificas oportunidades de automatización y optimización`
    };
  }

  // Method to get relevant tools and technologies for a specific use case
  recommendTools(useCase, requirements = {}) {
    const recommendations = {
      database: this.recommendDatabase(requirements),
      api_framework: this.recommendAPIFramework(requirements),
      architecture: this.recommendArchitecture(requirements),
      security: this.recommendSecurity(requirements)
    };

    return {
      use_case: useCase,
      recommendations,
      reasoning: this.explainRecommendations(useCase, recommendations, requirements)
    };
  }

  recommendDatabase(requirements) {
    if (requirements.data_structure === 'structured') {
      return {
        primary: 'PostgreSQL',
        reasoning: 'ACID compliance, advanced features, excellent for complex queries'
      };
    }
    
    if (requirements.scale === 'high' && requirements.reads > requirements.writes) {
      return {
        primary: 'MongoDB',
        caching: 'Redis',
        reasoning: 'Horizontal scaling, flexible schema, with Redis for read performance'
      };
    }

    return {
      primary: 'PostgreSQL',
      reasoning: 'Most versatile choice for general applications'
    };
  }

  recommendAPIFramework(requirements) {
    if (requirements.language === 'javascript') {
      return {
        framework: 'Express.js',
        reasoning: 'Most popular, extensive ecosystem, great for rapid development'
      };
    }

    if (requirements.performance === 'high') {
      return {
        framework: 'Go with Gin',
        reasoning: 'Excellent performance, built-in concurrency'
      };
    }

    return {
      framework: 'Express.js',
      reasoning: 'Great balance of features and ease of use'
    };
  }

  recommendArchitecture(requirements) {
    if (requirements.team_size < 5 && requirements.complexity === 'low') {
      return {
        pattern: 'Monolith',
        reasoning: 'Simpler to develop, deploy, and debug with small teams'
      };
    }

    if (requirements.scale === 'high' && requirements.team_size > 10) {
      return {
        pattern: 'Microservices',
        reasoning: 'Independent scaling, team autonomy, fault isolation'
      };
    }

    return {
      pattern: 'Modular Monolith',
      reasoning: 'Good compromise between simplicity and scalability'
    };
  }

  recommendSecurity(requirements) {
    const baseRecommendations = [
      'HTTPS everywhere',
      'JWT for authentication',
      'Input validation',
      'Rate limiting'
    ];

    if (requirements.sensitive_data) {
      baseRecommendations.push('End-to-end encryption', 'Data masking', 'Audit logging');
    }

    if (requirements.compliance) {
      baseRecommendations.push('Access controls', 'Data retention policies', 'Regular security audits');
    }

    return baseRecommendations;
  }

  explainRecommendations(useCase, recommendations, requirements) {
    return `Para el caso de uso "${useCase}", he considerado:
- Estructura de datos: ${requirements.data_structure || 'flexible'}
- Escala esperada: ${requirements.scale || 'medium'}
- Tamaño del equipo: ${requirements.team_size || 'small-medium'}
- Requerimientos de rendimiento: ${requirements.performance || 'standard'}

Estas recomendaciones balancean simplicidad, escalabilidad y costos para tu contexto específico.`;
  }

  // Method to explain why backend matters for businesses
  explainBusinessImportance() {
    return {
      title: '💼 Por qué el Backend es el Corazón de Todo Negocio Moderno',
      
      fundamental_truth: `Todo negocio moderno es, en esencia, un negocio de software. 
      El backend es donde vive la inteligencia, la lógica y el valor real de tu empresa.`,
      
      business_examples: {
        uber: 'Sin su backend que conecta conductores y pasajeros en tiempo real, Uber sería solo una idea',
        netflix: 'Su backend de recomendaciones genera el 80% del contenido que ves',
        amazon: 'Su backend de inventario y logística es su ventaja competitiva real',
        spotify: 'Su backend musical entiende tus gustos mejor que tú mismo'
      },
      
      competitive_advantages: [
        'Velocidad: Backend optimizado = respuestas más rápidas = usuarios más felices',
        'Personalización: Backend inteligente = experiencias únicas = mayor retención',
        'Escalabilidad: Backend robusto = crecimiento sin límites técnicos',
        'Automatización: Backend avanzado = procesos automáticos = eficiencia extrema'
      ],
      
      cost_impact: {
        good_backend: 'Ahorra millones en infraestructura, permite crecimiento exponencial',
        bad_backend: 'Cuesta millones en mantenimiento, limita crecimiento, frustra usuarios'
      },
      
      strategic_questions: [
        '¿Tu backend actual puede manejar 10x más usuarios?',
        '¿Qué tan rápido puedes lanzar nuevas funcionalidades?',
        '¿Tu backend aprende y mejora automáticamente?',
        '¿Puedes predecir y prevenir problemas antes de que ocurran?'
      ]
    };
  }
}

// Create and export singleton instance
const backendIntelligenceService = new BackendIntelligenceService();
export default backendIntelligenceService;