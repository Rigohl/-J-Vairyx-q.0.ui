// Business Intelligence Service - Deep understanding of companies, markets, business models, and strategic thinking
class BusinessIntelligenceService {
  constructor() {
    this.businessModels = this.initializeBusinessModels();
    this.marketDynamics = this.initializeMarketDynamics();
    this.companyStructures = this.initializeCompanyStructures();
    this.strategicFrameworks = this.initializeStrategicFrameworks();
    this.financialConcepts = this.initializeFinancialConcepts();
    this.industryInsights = this.initializeIndustryInsights();
    this.competitiveAnalysis = this.initializeCompetitiveAnalysis();
  }

  initializeBusinessModels() {
    return {
      saas: {
        name: 'Software as a Service',
        description: 'Software entregado a través de internet con suscripción recurrente',
        examples: ['Spotify', 'Netflix', 'Salesforce', 'Adobe Creative Cloud'],
        key_metrics: ['MRR (Monthly Recurring Revenue)', 'Churn Rate', 'LTV (Customer Lifetime Value)', 'CAC (Customer Acquisition Cost)'],
        advantages: [
          'Ingresos predecibles y recurrentes',
          'Escalabilidad alta con costos marginales bajos',
          'Actualizaciones continuas y mejora del producto',
          'Datos abundantes sobre el uso del producto'
        ],
        challenges: [
          'Alta competencia y facilidad de cambio',
          'Necesidad constante de retener clientes',
          'Inversión inicial alta en desarrollo',
          'Dependencia de infraestructura tecnológica'
        ],
        success_factors: [
          'Producto que resuelve un problema real',
          'Excelente experiencia de usuario',
          'Valor entregado mayor al costo',
          'Capacidad de evolucionar rápidamente'
        ]
      },

      marketplace: {
        name: 'Marketplace',
        description: 'Plataforma que conecta compradores y vendedores, tomando comisión',
        examples: ['Amazon', 'eBay', 'Airbnb', 'Uber', 'Mercado Libre'],
        key_metrics: ['GMV (Gross Merchandise Value)', 'Take Rate', 'Active Users', 'Repeat Purchase Rate'],
        advantages: [
          'Efectos de red (más usuarios atraen más usuarios)',
          'Escalabilidad sin inventario propio',
          'Diversificación de riesgo entre múltiples vendedores',
          'Datos ricos sobre comportamiento de mercado'
        ],
        challenges: [
          'Problema del huevo y la gallina al inicio',
          'Gestión de calidad y confianza',
          'Competencia de participantes que se van directo',
          'Regulaciones complejas en múltiples jurisdicciones'
        ],
        network_effects: 'Cada nuevo usuario hace la plataforma más valiosa para todos los demás usuarios'
      },

      freemium: {
        name: 'Freemium',
        description: 'Versión básica gratuita con funciones premium de pago',
        examples: ['Spotify', 'LinkedIn', 'Slack', 'Zoom', 'Dropbox'],
        key_metrics: ['Conversion Rate', 'Free to Paid Ratio', 'Feature Usage', 'Time to Conversion'],
        strategy: {
          free_tier: 'Debe ser útil pero limitado, crear deseo por versión premium',
          premium_tier: 'Debe ofrecer valor significativamente mayor',
          conversion_path: 'Debe ser natural y basada en necesidades reales del usuario'
        },
        psychological_aspects: [
          'Reciprocidad: usuario siente obligación después de recibir valor gratis',
          'Compromiso: usar el producto crea hábitos y dependencia',
          'Aversión a la pérdida: miedo a perder funcionalidad al no pagar'
        ]
      },

      subscription_economy: {
        name: 'Economía de Suscripción',
        description: 'Modelo donde los clientes pagan regularmente por acceso continuo',
        examples: ['Netflix', 'Amazon Prime', 'Dollar Shave Club', 'HelloFresh'],
        psychological_drivers: [
          'Conveniencia: automatización de compras recurrentes',
          'Personalización: productos adaptados a preferencias',
          'Descubrimiento: acceso a productos nuevos regularmente',
          'Simplificación: una decisión en lugar de múltiples compras'
        ],
        success_metrics: [
          'Retention rate más importante que acquisition',
          'LTV/CAC ratio debe ser superior a 3:1',
          'Negative churn (expansion revenue)',
          'Time to value (qué tan rápido ven beneficios)'
        ]
      },

      platform_business: {
        name: 'Negocio de Plataforma',
        description: 'Crea valor facilitando intercambios entre grupos externos',
        examples: ['Apple App Store', 'Google Play', 'YouTube', 'Twitch'],
        value_creation: [
          'Reduce costos de transacción',
          'Facilita descubrimiento y matching',
          'Proporciona herramientas y servicios',
          'Construye confianza y seguridad'
        ],
        monetization: [
          'Comisiones por transacción',
          'Tarifas de membresía o listado',
          'Publicidad y promoción pagada',
          'Servicios premium o herramientas adicionales'
        ]
      }
    };
  }

  initializeMarketDynamics() {
    return {
      market_forces: {
        supply_demand: {
          concept: 'Relación fundamental entre disponibilidad y deseo de productos/servicios',
          implications: [
            'Escasez aumenta valor percibido',
            'Abundancia reduce márgenes pero puede aumentar volumen',
            'Elasticidad de demanda varía por tipo de producto',
            'Tiempo y contexto afectan dramáticamente la demanda'
          ],
          strategic_applications: [
            'Crear escasez artificial para productos premium',
            'Timing de lanzamientos para maximizar demanda',
            'Segmentación de precios basada en elasticidad',
            'Anticipar cambios de demanda por tendencias'
          ]
        },

        network_effects: {
          concept: 'El valor del producto aumenta con cada usuario adicional',
          types: [
            'Directos: cada usuario beneficia directamente a otros (teléfono)',
            'Indirectos: más usuarios atraen complementarios (consolas de juegos)',
            'Data network effects: más usuarios = más datos = mejor producto',
            'Social network effects: valor viene de conexiones sociales'
          ],
          strategic_importance: [
            'Crear ventajas competitivas sostenibles',
            'Justificar inversiones iniciales altas',
            'Acelerar crecimiento una vez alcanzada masa crítica',
            'Hacer muy difícil que competidores entren al mercado'
          ]
        },

        switching_costs: {
          concept: 'Costos que enfrenta un cliente al cambiar de proveedor',
          types: [
            'Financieros: tarifas de cancelación, costos de migración',
            'Procedimentales: tiempo y esfuerzo requerido',
            'Relacionales: pérdida de relaciones y estatus',
            'Emocionales: ansiedad y incertidumbre del cambio'
          ],
          strategic_building: [
            'Integración profunda en flujos de trabajo del cliente',
            'Datos y personalización difíciles de replicar',
            'Entrenamiento y certificaciones específicas',
            'Ecosistemas de partners y integraciones'
          ]
        }
      },

      competitive_dynamics: {
        porters_five_forces: {
          threat_of_new_entrants: {
            factors: ['Barriers to entry', 'Capital requirements', 'Brand loyalty', 'Government regulations'],
            strategic_response: 'Build moats through technology, brand, or exclusive partnerships'
          },
          bargaining_power_suppliers: {
            factors: ['Number of suppliers', 'Uniqueness of service', 'Cost of switching'],
            strategic_response: 'Diversify suppliers, build internal capabilities, or integrate vertically'
          },
          bargaining_power_buyers: {
            factors: ['Number of buyers', 'Importance of product', 'Availability of substitutes'],
            strategic_response: 'Increase switching costs, differentiate product, or create dependency'
          },
          threat_of_substitutes: {
            factors: ['Performance comparison', 'Cost comparison', 'Ease of switching'],
            strategic_response: 'Continuous innovation, ecosystem lock-in, or redefine category'
          },
          competitive_rivalry: {
            factors: ['Number of competitors', 'Market growth', 'Product differentiation'],
            strategic_response: 'Find blue ocean, build unique capabilities, or consolidate market'
          }
        },

        competitive_strategies: {
          cost_leadership: {
            description: 'Ser el productor de menor costo en la industria',
            examples: ['Walmart', 'Southwest Airlines', 'IKEA'],
            requirements: ['Economies of scale', 'Efficient operations', 'Cost control culture'],
            risks: ['Race to bottom', 'Difficult to maintain', 'Vulnerable to innovation']
          },
          differentiation: {
            description: 'Crear productos únicos por los que clientes pagan premium',
            examples: ['Apple', 'Tesla', 'Rolex'],
            sources: ['Superior technology', 'Brand prestige', 'Customer service', 'Design'],
            sustainability: 'Must continuously innovate to maintain uniqueness'
          },
          focus_strategy: {
            description: 'Servir excelentemente a un nicho específico',
            examples: ['Ferrari', 'Patagonia', 'Gartner'],
            advantages: ['Deep customer understanding', 'Specialized capabilities', 'Brand loyalty'],
            risks: ['Limited growth potential', 'Market changes', 'Larger players targeting niche']
          }
        }
      }
    };
  }

  initializeCompanyStructures() {
    return {
      organizational_types: {
        startup: {
          characteristics: [
            'Búsqueda de modelo de negocio escalable y repetible',
            'Alta incertidumbre y riesgo',
            'Recursos limitados y necesidad de eficiencia',
            'Crecimiento rápido como objetivo principal'
          ],
          stages: {
            ideation: 'Validación de problema y solución inicial',
            mvp: 'Producto mínimo viable para probar mercado',
            product_market_fit: 'Encontrar encaje producto-mercado',
            scaling: 'Crecimiento acelerado y expansión',
            maturity: 'Operaciones estables y optimización'
          },
          success_factors: [
            'Equipo complementario y comprometido',
            'Validación temprana con usuarios reales',
            'Iteración rápida basada en feedback',
            'Gestión eficiente de recursos limitados',
            'Timing correcto para el mercado'
          ],
          common_failures: [
            'Solución en busca de problema',
            'Falta de validación con mercado real',
            'Escalabilidad prematura sin product-market fit',
            'Equipos no complementarios o conflictos',
            'Recursos insuficientes para llegar a siguiente nivel'
          ]
        },

        scaleup: {
          description: 'Empresa que ya encontró product-market fit y se enfoca en crecimiento',
          challenges: [
            'Mantener cultura mientras crece rápidamente',
            'Profesionalizar procesos sin perder agilidad',
            'Atraer talento senior para liderar crecimiento',
            'Gestionar complejidad operacional creciente'
          ],
          key_decisions: [
            'Mercados geográficos a expandir',
            'Productos adicionales vs profundizar existentes',
            'Canales de distribución y partnerships',
            'Estructura organizacional y delegación'
          ]
        },

        enterprise: {
          characteristics: [
            'Operaciones estables y predecibles',
            'Múltiples líneas de negocio',
            'Estructuras formales y procesos establecidos',
            'Enfoque en eficiencia y optimización'
          ],
          advantages: [
            'Recursos abundantes para inversión',
            'Brand recognition y credibilidad',
            'Acceso a distribución y partnerships',
            'Capacidad de aguantar ciclos económicos'
          ],
          challenges: [
            'Lentitud para innovar y adaptarse',
            'Burocracia y procesos complejos',
            'Competencia de startups ágiles',
            'Legacy systems y deuda técnica'
          ],
          transformation_strategies: [
            'Corporate venture capital e incubadoras',
            'Adquisiciones de startups innovadoras',
            'Equipos internos con autonomía startup-like',
            'Partnerships estratégicos con disruptores'
          ]
        }
      },

      business_functions: {
        product_management: {
          role: 'Define qué construir y por qué',
          responsibilities: [
            'Investigación de usuario y mercado',
            'Definición de roadmap y prioridades',
            'Coordinación entre equipos técnicos y negocio',
            'Medición y optimización de métricas'
          ],
          key_skills: [
            'Customer empathy y research',
            'Análisis de datos y métricas',
            'Comunicación y influencia sin autoridad',
            'Pensamiento estratégico y ejecución táctica'
          ]
        },

        engineering: {
          role: 'Construye el producto y la infraestructura',
          specializations: [
            'Frontend: interfaces de usuario',
            'Backend: lógica de negocio y datos',
            'DevOps: infraestructura y deployment',
            'QA: calidad y testing'
          ],
          strategic_importance: [
            'Velocidad de desarrollo determina competitividad',
            'Arquitectura técnica habilita o limita crecimiento',
            'Calidad técnica afecta experiencia de usuario',
            'Innovación tecnológica puede crear ventajas competitivas'
          ]
        },

        sales_marketing: {
          sales: {
            focus: 'Convertir prospects en clientes paying',
            metrics: ['Conversion rate', 'Sales cycle length', 'Average deal size', 'Win rate'],
            types: ['Inside sales', 'Field sales', 'Channel sales', 'Self-service']
          },
          marketing: {
            focus: 'Generar awareness y leads calificados',
            channels: ['Content marketing', 'SEO/SEM', 'Social media', 'Events', 'PR'],
            funnel: ['Awareness', 'Interest', 'Consideration', 'Purchase', 'Retention', 'Advocacy']
          },
          alignment: 'Sales y marketing deben estar alineados en definición de lead calificado'
        }
      }
    };
  }

  initializeStrategicFrameworks() {
    return {
      lean_startup: {
        core_philosophy: 'Aprender rápido y barato a través de experimentación',
        build_measure_learn: {
          build: 'Crear experimentos mínimos para probar hipótesis',
          measure: 'Recolectar datos cuantitativos y cualitativos',
          learn: 'Extraer insights y decidir pivotear o perseverar'
        },
        key_concepts: {
          mvp: 'Minimum Viable Product - versión más simple que permite aprender',
          pivot: 'Cambio estructural para probar nueva hipótesis fundamental',
          validated_learning: 'Aprendizaje demostrado por datos reales de usuarios',
          innovation_accounting: 'Métricas que importan para early-stage companies'
        },
        application: [
          'Validar problem-solution fit antes de construir',
          'Probar willingness to pay con prototipos',
          'Iterar basado en comportamiento real vs opiniones',
          'Fallar rápido y barato en lugar de lento y caro'
        ]
      },

      jobs_to_be_done: {
        core_insight: 'Clientes "contratan" productos para hacer trabajos específicos',
        framework: {
          functional_job: 'Tarea práctica que el cliente quiere accomplir',
          emotional_job: 'Cómo quiere sentirse o ser percibido',
          social_job: 'Cómo quiere ser percibido por otros'
        },
        application: [
          'Entender motivaciones profundas vs features superficiales',
          'Identificar competencia inesperada (diferentes productos, mismo job)',
          'Innovar en dimensiones que realmente importan',
          'Segmentar por job en lugar de demografía'
        ],
        example: 'McDonald\'s milkshake: job era entretenimiento durante commute, no nutrición'
      },

      blue_ocean_strategy: {
        concept: 'Crear mercados no disputados en lugar de competir en existentes',
        red_vs_blue: {
          red_ocean: 'Mercados existentes con competencia intensa',
          blue_ocean: 'Mercados nuevos con poca o ninguna competencia'
        },
        four_actions: {
          eliminate: 'Qué factores dar la industria da por sentado que deberías eliminar',
          reduce: 'Qué factores deberías reducir muy por debajo del estándar',
          raise: 'Qué factores deberías elevar muy por encima del estándar',
          create: 'Qué factores deberías crear que la industria nunca ha ofrecido'
        },
        examples: [
          'Cirque du Soleil: eliminó animales, creó experiencia artística',
          'Southwest Airlines: eliminó amenities, creó convenience',
          'Nintendo Wii: eliminó poder de procesamiento, creó movimiento físico'
        ]
      },

      okrs: {
        structure: {
          objective: 'Qué quieres lograr (cualitativo, inspiracional)',
          key_results: 'Cómo medirás progreso (cuantitativo, específico)'
        },
        principles: [
          'Aspirational pero achievable (70% completion is success)',
          'Transparentes en toda la organización',
          'Quarterly cycles para mantener relevancia',
          'Limited number (3-5 objectives max)'
        ],
        benefits: [
          'Alineación en organizaciones complejas',
          'Focus en outcomes sobre outputs',
          'Transparencia y accountability',
          'Agilidad para adaptar a cambios'
        ]
      }
    };
  }

  initializeFinancialConcepts() {
    return {
      key_metrics: {
        saas_metrics: {
          mrr: {
            name: 'Monthly Recurring Revenue',
            importance: 'Predecibilidad de ingresos',
            calculation: 'Suma de todas las suscripciones mensuales'
          },
          arr: {
            name: 'Annual Recurring Revenue', 
            importance: 'Escala de negocio recurrente',
            calculation: 'MRR * 12 (ajustado por annual contracts)'
          },
          churn_rate: {
            name: 'Customer Churn Rate',
            importance: 'Retención de clientes',
            calculation: 'Clientes perdidos / Total clientes al inicio del periodo'
          },
          ltv: {
            name: 'Customer Lifetime Value',
            importance: 'Valor total de relación con cliente',
            calculation: 'Average Revenue per User / Churn Rate'
          },
          cac: {
            name: 'Customer Acquisition Cost',
            importance: 'Eficiencia de marketing y sales',
            calculation: 'Total marketing + sales costs / New customers acquired'
          },
          ltv_cac_ratio: {
            importance: 'Viabilidad económica del modelo',
            healthy_ratio: '3:1 o superior',
            interpretation: 'Si es menor a 3:1, cada cliente cuesta demasiado adquirir'
          }
        },

        marketplace_metrics: {
          gmv: {
            name: 'Gross Merchandise Value',
            importance: 'Volumen total de transacciones',
            note: 'No es revenue de la empresa, sino valor total transaccionado'
          },
          take_rate: {
            name: 'Take Rate',
            importance: 'Porcentaje que retiene la plataforma',
            calculation: 'Platform Revenue / GMV',
            typical_ranges: '2-30% dependiendo de valor agregado'
          },
          frequency: {
            importance: 'Engagement y habit formation',
            metrics: ['Transactions per user', 'Monthly active users', 'Repeat purchase rate']
          }
        },

        unit_economics: {
          definition: 'Rentabilidad de una unidad individual del negocio',
          importance: [
            'Predice profitabilidad a escala',
            'Identifica palancas para mejorar economics',
            'Guía decisiones de pricing y marketing',
            'Fundamental para fundraising y valuación'
          ],
          components: [
            'Revenue per unit (ARPU, ACV, etc.)',
            'Variable costs per unit (COGS, processing fees)',
            'Contribution margin',
            'Acquisition cost',
            'Retention/lifetime'
          ]
        }
      },

      financial_strategy: {
        pricing_strategies: {
          cost_plus: {
            method: 'Costo + margen deseado',
            pros: 'Simple, asegura margen',
            cons: 'Ignora valor percibido y competencia'
          },
          value_based: {
            method: 'Basado en valor entregado al cliente',
            pros: 'Maximiza revenue, alineado con valor',
            cons: 'Difícil de determinar, requiere investigación profunda'
          },
          competitive: {
            method: 'Basado en precios de competencia',
            pros: 'Market acceptance, simple benchmarking',
            cons: 'Race to bottom, commoditización'
          },
          penetration: {
            method: 'Precio bajo para ganar market share',
            pros: 'Rápida adopción, barriers to competition',
            cons: 'Difícil subir precios después'
          },
          skimming: {
            method: 'Precio alto inicialmente, bajar gradualmente',
            pros: 'Maximiza revenue de early adopters',
            cons: 'Limita adopción masiva'
          }
        },

        fundraising: {
          stages: {
            pre_seed: {
              amount: '$50k - $500k',
              purpose: 'Validar idea y construir MVP',
              investors: 'Friends, family, angels'
            },
            seed: {
              amount: '$500k - $3M',
              purpose: 'Product-market fit',
              investors: 'Seed funds, angels, strategic investors'
            },
            series_a: {
              amount: '$3M - $15M',
              purpose: 'Scale business model probado',
              investors: 'VCs, growth equity'
            },
            series_b_plus: {
              amount: '$15M+',
              purpose: 'Expansión geográfica o vertical',
              investors: 'Late-stage VCs, private equity'
            }
          },
          investor_considerations: [
            'Market size y growth potential',
            'Team experience y execution capability',
            'Product differentiation y competitive moats',
            'Business model y unit economics',
            'Traction y momentum'
          ]
        }
      }
    };
  }

  initializeIndustryInsights() {
    return {
      technology_industry: {
        trends: [
          'AI/ML integration in every product',
          'Edge computing y distributed systems',
          'Privacy-first design y data regulations',
          'Low-code/no-code democratization',
          'Sustainability y green computing'
        ],
        business_models: [
          'Platform-as-a-Service expansion',
          'API-first product strategy',
          'Open source with commercial layers',
          'Usage-based pricing models'
        ],
        key_players: {
          cloud_providers: ['AWS', 'Microsoft Azure', 'Google Cloud'],
          software_platforms: ['Microsoft', 'Salesforce', 'Adobe'],
          infrastructure: ['Cloudflare', 'MongoDB', 'Databricks']
        }
      },

      fintech_industry: {
        disruption_areas: [
          'Payments: Stripe, Square, PayPal',
          'Lending: Affirm, Klarna, LendingClub',
          'Investment: Robinhood, Betterment, Wealthfront',
          'Banking: Chime, N26, Revolut',
          'Insurance: Lemonade, Root, Oscar'
        ],
        key_trends: [
          'Embedded finance en productos no-financieros',
          'DeFi y cryptocurrencies mainstream adoption',
          'RegTech para compliance automatizada',
          'Open banking y API standardization'
        ],
        success_factors: [
          'Regulatory compliance desde día 1',
          'Trust y security como differentiators',
          'User experience superior a tradicional',
          'Unit economics que escalen'
        ]
      },

      ecommerce_industry: {
        evolution: [
          'Traditional retail → Online marketplaces',
          'Pure-play e-commerce → Omnichannel',
          'Product-centric → Experience-centric',
          'Mass market → Personalization'
        ],
        current_trends: [
          'Social commerce (TikTok, Instagram Shopping)',
          'Voice commerce y conversational interfaces',
          'Augmented reality para try-before-buy',
          'Sustainability y ethical consumption'
        ],
        key_metrics: [
          'Conversion rate optimization',
          'Customer acquisition cost',
          'Average order value',
          'Return rate y customer satisfaction'
        ]
      }
    };
  }

  initializeCompetitiveAnalysis() {
    return {
      analysis_framework: {
        direct_competitors: 'Productos que resuelven el mismo problema de la misma manera',
        indirect_competitors: 'Productos que resuelven el mismo problema de manera diferente',
        substitute_products: 'Productos que satisfacen la misma necesidad subyacente',
        potential_entrants: 'Empresas que podrían entrar al mercado fácilmente'
      },

      competitive_intelligence: {
        data_sources: [
          'Public financial reports y SEC filings',
          'Product releases y feature announcements',
          'Job postings y team composition',
          'Customer reviews y social media sentiment',
          'Patent filings y R&D investments',
          'Partnership announcements',
          'Pricing changes y promotional activities'
        ],
        analysis_dimensions: [
          'Product capabilities y roadmap',
          'Go-to-market strategy',
          'Financial performance y funding',
          'Team strength y culture',
          'Customer satisfaction y retention',
          'Technology stack y IP portfolio'
        ]
      },

      strategic_responses: {
        defend: [
          'Improve switching costs',
          'Deepen customer relationships',
          'Accelerate innovation',
          'Optimize pricing strategy'
        ],
        attack: [
          'Target competitor weaknesses',
          'Leapfrog with superior technology',
          'Aggressive pricing or value proposition',
          'Build ecosystem around your solution'
        ],
        avoid: [
          'Find blue ocean opportunities',
          'Focus on underserved segments',
          'Redefine category boundaries',
          'Create new value propositions'
        ]
      }
    };
  }

  // Main method to explain business concepts
  explainConcept(concept, context = {}) {
    concept = concept.toLowerCase();
    
    if (concept.includes('empresa') || concept.includes('company') || concept.includes('negocio')) {
      return this.explainCompany(concept, context);
    }
    
    if (concept.includes('mercado') || concept.includes('market')) {
      return this.explainMarket(concept, context);
    }
    
    if (concept.includes('estrategia') || concept.includes('strategy')) {
      return this.explainStrategy(concept, context);
    }
    
    if (concept.includes('competencia') || concept.includes('competition')) {
      return this.explainCompetition(concept, context);
    }
    
    return this.explainBusinessGeneral(concept, context);
  }

  explainCompany(concept, context) {
    return {
      title: '🏢 Qué es una Empresa: Mucho Más que un Lugar de Trabajo',
      
      fundamental_definition: `Una empresa es una **máquina de resolver problemas** que:
- Identifica problemas reales que la gente tiene
- Crea soluciones que la gente valora más que el dinero que paga
- Organiza recursos (personas, tecnología, capital) de manera eficiente
- Captura parte del valor creado como beneficio para reinvertir y crecer`,

      why_companies_exist: {
        value_creation: 'Transforman recursos en algo más valioso',
        specialization: 'Cada persona se enfoca en lo que hace mejor',
        risk_sharing: 'Distribuyen el riesgo entre múltiples stakeholders',
        scale_economics: 'Logran eficiencias imposibles individualmente',
        innovation: 'Combinan conocimientos para crear nuevas soluciones'
      },

      company_anatomy: {
        vision: 'El futuro que quieren crear (aspiracional)',
        mission: 'Cómo van a crear ese futuro (operacional)',
        values: 'Principios que guían decisiones (cultural)',
        strategy: 'Plan para ganar en el mercado (competitivo)',
        execution: 'Cómo convierten planes en resultados (operacional)'
      },

      business_model_essence: `**El modelo de negocio responde 4 preguntas fundamentales:**
1. **¿Qué valor creamos?** (Propuesta de valor)
2. **¿Para quién lo creamos?** (Segmento de clientes)
3. **¿Cómo lo entregamos?** (Canales y recursos)
4. **¿Cómo capturamos valor?** (Estructura de ingresos)`,

      types_by_growth_stage: {
        startup: 'Busca modelo de negocio escalable - alta incertidumbre, alto potencial',
        growth_company: 'Escala modelo probado - foco en eficiencia y expansión',
        mature_company: 'Optimiza operaciones estables - foco en defensa y nuevas oportunidades'
      },

      success_indicators: [
        'Crece consistentemente en mercados competitivos',
        'Genera más valor del que consume',
        'Atrae y retiene talento excepcional',
        'Innova continuamente para mantenerse relevante',
        'Construye relaciones duraderas con stakeholders'
      ],

      strategic_thinking: `**¿Por qué entender empresas te hace más inteligente?**
- Ves oportunidades donde otros ven problemas
- Entiendes cómo se toman decisiones importantes
- Puedes predecir qué empresas tendrán éxito
- Desarrollas pensamiento sistémico y estratégico
- Te conviertes en un colaborador más valioso`
    };
  }

  explainMarket(concept, context) {
    return {
      title: '🎯 Mercados: Donde se Decide el Destino de las Empresas',
      
      market_definition: `Un mercado es un **ecosistema de intercambio** donde:
- Compradores buscan soluciones a sus problemas
- Vendedores compiten por satisfacer esas necesidades
- El precio se determina por la intersección de oferta y demanda
- La información fluye entre participantes
- Las reglas del juego evolucionan constantemente`,

      market_dynamics: {
        supply_demand: {
          concept: 'Danza fundamental entre disponibilidad y deseo',
          implications: [
            'Escasez aumenta precios (conciertos, productos limitados)',
            'Abundancia reduce precios (software una vez desarrollado)',
            'Timing es crítico (paraguas cuando llueve)',
            'Percepción puede ser más importante que realidad'
          ]
        },
        
        market_size: {
          tam: 'Total Addressable Market - tamaño total del universo',
          sam: 'Serviceable Addressable Market - porción que puedes servir',
          som: 'Serviceable Obtainable Market - lo que realisticamente puedes capturar',
          strategic_insight: 'Empresas exitosas a menudo crean nuevos mercados en lugar de solo competir en existentes'
        }
      },

      market_types: {
        blue_ocean: 'Mercados nuevos sin competencia - requiere educación pero mayor margen',
        red_ocean: 'Mercados saturados con competencia intensa - requiere diferenciación clara',
        emerging: 'Mercados en formación - alto riesgo pero potencial de definir categoría',
        declining: 'Mercados en contracción - oportunidad de consolidación'
      },

      customer_segments: {
        innovators: '2.5% - Buscan lo último, toleran imperfecciones',
        early_adopters: '13.5% - Líderes de opinión, buscan ventaja competitiva',
        early_majority: '34% - Pragmáticos, necesitan referencias y casos probados',
        late_majority: '34% - Escépticos, adoptan por presión social o necesidad',
        laggards: '16% - Conservadores, adoptan solo cuando es inevitable'
      },

      market_research_insights: [
        'Los clientes no siempre saben lo que quieren hasta que lo ven',
        'Comportamiento real difiere de lo que dicen en encuestas',
        'Jobs-to-be-done revela motivaciones más profundas que demografía',
        'Early adopters no representan el mercado masivo',
        'El contexto de uso importa más que las características del producto'
      ],

      competitive_intelligence: `**Entender tu mercado significa entender:**
- ¿Quién más está compitiendo por la atención de tus clientes?
- ¿Qué alternativas consideran antes de elegir tu solución?
- ¿Qué tendencias están cambiando las expectativas?
- ¿Qué barreras de entrada protegen o amenazan tu posición?
- ¿Cómo puedes redefinir la competencia a tu favor?`,

      market_strategy: {
        penetration: 'Ganar share en mercado existente con producto existente',
        development: 'Encontrar nuevos mercados para producto existente',
        product_dev: 'Crear nuevos productos para mercado existente',
        diversification: 'Nuevos productos para nuevos mercados (más riesgoso)'
      }
    };
  }

  explainStrategy(concept, context) {
    return {
      title: '🎯 Estrategia: El Arte de Ganar en Mercados Competitivos',
      
      strategy_essence: `Estrategia NO es un plan detallado. Estrategia es:
- **Una apuesta coherente** sobre cómo ganar en tu mercado
- **Un conjunto de decisiones** que se refuerzan mutuamente
- **Una ventaja sostenible** que es difícil de copiar
- **Una teoría** sobre qué te hará exitoso que puedes probar`,

      good_strategy_components: {
        diagnosis: 'Entender claramente el desafío o oportunidad',
        guiding_policy: 'Enfoque general para abordar el desafío',
        coherent_actions: 'Pasos específicos que se apoyan mutuamente'
      },

      strategic_frameworks: {
        competitive_advantage: {
          cost_leadership: 'Ser el productor más eficiente',
          differentiation: 'Crear valor único que justifica premium',
          focus: 'Servir excelentemente a un nicho específico'
        },
        
        moats: {
          network_effects: 'Más usuarios hacen producto más valioso',
          switching_costs: 'Difícil/caro cambiar a competidor',
          economies_scale: 'Costos unitarios bajan con volumen',
          brand: 'Preferencia irracional del consumidor',
          regulatory: 'Licencias o regulaciones crean barreras'
        },
        
        platform_strategy: {
          concept: 'Crear ecosistemas donde otros construyen valor',
          examples: 'App Store, Amazon Marketplace, Salesforce AppExchange',
          power: 'Capturas valor de toda la innovación en tu plataforma'
        }
      },

      strategic_thinking: {
        first_principles: 'Descomponer problemas a verdades fundamentales',
        systems_thinking: 'Entender interconexiones y efectos segundo orden',
        scenario_planning: 'Prepararse para múltiples futuros posibles',
        option_value: 'Crear flexibilidad para futuras oportunidades',
        timing: 'Cuándo hacer algo es tan importante como qué hacer'
      },

      strategy_execution: {
        okrs: 'Objectives and Key Results para alineación',
        resource_allocation: 'Poner dinero y gente detrás de la estrategia',
        culture_alignment: 'Asegurar que comportamientos apoyen estrategia',
        measurement: 'Métricas que indican si estrategia funciona',
        adaptation: 'Ajustar basado en nueva información'
      },

      common_strategy_mistakes: [
        'Confundir metas ambiciosas con estrategia',
        'Lista de wishful thinking sin trade-offs claros',
        'Copiar estrategias de otras empresas sin contexto',
        'Estrategia que no reconoce realidades competitivas',
        'Falla en ejecutar consistentemente por períodos largos'
      ],

      strategic_questions: [
        '¿Qué te hace único y difícil de replicar?',
        '¿Dónde eliges NO competir para ser mejor donde sí compites?',
        '¿Cómo tus decisiones se refuerzan mutuamente?',
        '¿Qué tendrías que creer sobre el futuro para que tu estrategia funcione?',
        '¿Cómo sabrás si tu estrategia está funcionando?'
      ]
    };
  }

  explainCompetition(concept, context) {
    return {
      title: '⚔️ Competencia: La Fuerza que Impulsa la Innovación',
      
      competition_reality: `La competencia es la **fuerza más poderosa** en los negocios:
- Obliga a las empresas a mejorar constantemente
- Reduce precios y aumenta calidad para consumidores
- Castiga la complacencia y premia la innovación
- Determina qué empresas sobreviven y prosperan`,

      types_of_competition: {
        direct: {
          definition: 'Productos similares para mismo target',
          example: 'iPhone vs Samsung Galaxy',
          strategy: 'Diferenciación clara o superioridad en ejecución'
        },
        indirect: {
          definition: 'Diferentes productos para misma necesidad',
          example: 'Netflix vs videojuegos vs libros (entretenimiento)',
          strategy: 'Redefinir categoría o crear nuevos hábitos'
        },
        substitute: {
          definition: 'Alternativas que satisfacen necesidad subyacente',
          example: 'Zoom vs viajes de negocio',
          strategy: 'Destacar ventajas únicas o costos de oportunidad'
        }
      },

      competitive_dynamics: {
        first_mover_advantage: {
          benefits: ['Brand recognition', 'Network effects', 'Learning curve', 'Resource preemption'],
          risks: ['Market education costs', 'Technology uncertainty', 'Fast follower advantages']
        },
        
        fast_follower: {
          benefits: ['Learn from pioneer mistakes', 'Improved technology', 'Proven market'],
          requirements: ['Superior execution', 'Better business model', 'Significant resources']
        },
        
        disruption: {
          concept: 'Nuevos participantes atacan desde segmentos "no interesantes"',
          pattern: 'Comienzan simple/barato → Mejoran → Desplazan incumbents',
          examples: 'Netflix vs Blockbuster, Tesla vs automotriz tradicional'
        }
      },

      competitive_intelligence: {
        what_to_track: [
          'Product launches y feature updates',
          'Pricing changes y promotional strategies',
          'Hiring patterns y team expansion',
          'Funding rounds y financial performance',
          'Partnership announcements',
          'Customer reviews y satisfaction scores'
        ],
        
        analysis_framework: [
          'Strengths que puedes neutralizar',
          'Weaknesses que puedes explotar',
          'Moves que puedes anticipar',
          'Resources que tienen vs necesitan',
          'Strategic options disponibles'
        ]
      },

      winning_strategies: {
        cost_leadership: 'Eficiencia operacional superior',
        differentiation: 'Valor único difícil de replicar',
        focus: 'Dominio completo de nicho específico',
        disruption: 'Cambiar las reglas del juego',
        ecosystem: 'Crear plataforma donde otros construyen valor'
      },

      competitive_moats: {
        network_effects: 'Cada usuario adicional aumenta valor para todos',
        switching_costs: 'Alto costo/esfuerzo para cambiar proveedor',
        economies_scale: 'Ventajas de costo por tamaño',
        brand_loyalty: 'Preferencia emocional del consumidor',
        regulatory_barriers: 'Licencias o aprobaciones requeridas',
        proprietary_technology: 'IP o know-how exclusivo'
      },

      strategic_response_options: {
        ignore: 'Cuando competidor no amenaza core business',
        monitor: 'Cuando amenaza es potential pero no inmediata',
        defend: 'Mejorar offering para retener clientes',
        attack: 'Ir agresivamente por mercado del competidor',
        collaborate: 'Partnerships cuando competencia no es zero-sum'
      }
    };
  }

  explainBusinessGeneral(concept, context) {
    return {
      title: '💼 El Mundo de los Negocios: Tu Guía para Entender el Motor de la Economía',
      
      business_fundamentals: `Los negocios son el **motor de la innovación y el progreso**:
- Convierten ideas en productos que mejoran vidas
- Crean empleos y oportunidades económicas
- Financian investigación y desarrollo
- Solucionan problemas complejos de la sociedad`,

      how_value_flows: {
        step1: 'Identificar problema real que la gente tiene',
        step2: 'Crear solución que resuelve problema mejor que alternativas',
        step3: 'Entregar solución de manera eficiente y escalable',
        step4: 'Capturar parte del valor creado como revenue',
        step5: 'Reinvertir para mejorar y expandir'
      },

      business_ecosystems: {
        customers: 'Personas/empresas que pagan por valor recibido',
        suppliers: 'Proveen recursos necesarios para crear valor',
        partners: 'Colaboran para entregar valor completo al cliente',
        investors: 'Proveen capital a cambio de retorno futuro',
        employees: 'Aportan talento y trabajo para ejecutar visión',
        regulators: 'Establecen reglas para operación justa'
      },

      modern_business_trends: [
        'Digitalización: Software eating the world',
        'Subscription economy: Relationships over transactions',
        'Platform businesses: Ecosystems over productos',
        'Data-driven: Decisions based on evidence',
        'Customer-centric: Experience over features',
        'Sustainability: Profit with purpose'
      ],

      why_understanding_business_matters: [
        'Todo el mundo interactúa con businesses diariamente',
        'Decisiones de carrera se benefician de business acumen',
        'Permite identificar oportunidades de emprendimiento',
        'Desarrolla pensamiento crítico y analítico',
        'Facilita comunicación con stakeholders diversos'
      ],

      business_success_patterns: [
        'Obsesión genuina por resolver problema del cliente',
        'Ejecución consistente y mejora continua',
        'Ventaja competitiva sostenible y defendible',
        'Culture que atrae y retiene talento excepcional',
        'Adaptabilidad para evolucionar con mercado'
      ]
    };
  }

  // Method to analyze business opportunity
  analyzeOpportunity(description, context = {}) {
    return {
      market_assessment: this.assessMarket(description, context),
      competitive_landscape: this.analyzeCompetition(description, context),
      business_model_options: this.suggestBusinessModels(description, context),
      success_factors: this.identifySuccessFactors(description, context),
      risks_mitigation: this.identifyRisks(description, context),
      strategic_recommendations: this.generateRecommendations(description, context)
    };
  }

  assessMarket(description, context) {
    return {
      size_potential: 'Análisis basado en problema descrito y audiencia target',
      growth_trends: 'Tendencias que apoyan o dificultan la oportunidad',
      customer_segments: 'Grupos específicos más likely to adopt',
      willingness_to_pay: 'Indicadores de que customers pagarían por solución'
    };
  }

  generateBusinessInsight(topic, userContext = {}) {
    const insights = {
      strategic_thinking: this.generateStrategicInsight(topic),
      market_opportunity: this.identifyMarketOpportunity(topic),
      competitive_analysis: this.analyzeCompetitiveSpace(topic),
      business_model: this.suggestBusinessModel(topic),
      success_metrics: this.defineSuccessMetrics(topic)
    };

    return {
      topic,
      insights,
      actionable_recommendations: this.generateActionableRecommendations(insights),
      learning_questions: this.generateLearningQuestions(topic)
    };
  }

  generateStrategicInsight(topic) {
    return `Análisis estratégico de ${topic} considerando tendencias actuales, 
    fuerzas competitivas, y oportunidades de creación de valor único.`;
  }

  generateActionableRecommendations(insights) {
    return [
      'Validar asunciones con clientes reales',
      'Construir MVP para probar product-market fit',
      'Analizar unit economics antes de escalar',
      'Identificar y construir moats competitivos',
      'Desarrollar métricas leading indicators'
    ];
  }

  generateLearningQuestions(topic) {
    return [
      `¿Qué cambios en ${topic} crearían nuevas oportunidades?`,
      `¿Qué asunciones sobre ${topic} podrían estar equivocadas?`,
      `¿Cómo podría redefinirse la competencia en ${topic}?`,
      `¿Qué métricas indicarían éxito temprano en ${topic}?`
    ];
  }
}

// Create and export singleton instance
const businessIntelligenceService = new BusinessIntelligenceService();
export default businessIntelligenceService;