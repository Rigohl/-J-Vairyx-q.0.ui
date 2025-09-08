// Information Verification Service - Critical thinking about sources, fake information detection, and reliable knowledge curation
class InformationVerificationService {
  constructor() {
    this.reliableSources = this.initializeReliableSources();
    this.verificationFrameworks = this.initializeVerificationFrameworks();
    this.biasTypes = this.initializeBiasTypes();
    this.factCheckingMethods = this.initializeFactCheckingMethods();
    this.misinformationPatterns = this.initializeMisinformationPatterns();
    this.digitalLiteracy = this.initializeDigitalLiteracy();
    this.researchMethods = this.initializeResearchMethods();
  }

  initializeReliableSources() {
    return {
      technical_information: {
        primary_sources: {
          official_documentation: {
            examples: ['MDN Web Docs', 'Python.org', 'React Documentation', 'AWS Documentation'],
            reliability: 0.95,
            why_reliable: 'Maintained by creators/maintainers, regularly updated, peer-reviewed',
            verification_tips: [
              'Check if it\'s the official source (.org, .edu, company domains)',
              'Look for version dates and update frequency',
              'Cross-reference with other official sources'
            ]
          },
          academic_papers: {
            examples: ['IEEE', 'ACM Digital Library', 'arXiv.org', 'Google Scholar'],
            reliability: 0.90,
            why_reliable: 'Peer-reviewed, methodology transparent, reproducible results',
            verification_tips: [
              'Check citation count and quality of citing papers',
              'Verify journal reputation and impact factor',
              'Look for replication studies'
            ]
          },
          government_data: {
            examples: ['Census.gov', 'Data.gov', 'FDA.gov', 'SEC.gov'],
            reliability: 0.85,
            why_reliable: 'Legal obligation for accuracy, standardized collection methods',
            verification_tips: [
              'Check data collection methodology',
              'Look for confidence intervals and margins of error',
              'Compare with international sources'
            ]
          }
        },

        secondary_sources: {
          established_media: {
            tier_1: {
              examples: ['Reuters', 'Associated Press', 'BBC', 'Wall Street Journal'],
              reliability: 0.80,
              strengths: 'Professional standards, fact-checking, multiple sources',
              weaknesses: 'Can have bias, commercial pressures'
            },
            tier_2: {
              examples: ['TechCrunch', 'Ars Technica', 'The Verge', 'Wired'],
              reliability: 0.75,
              strengths: 'Domain expertise, industry connections',
              weaknesses: 'More opinion-driven, advertising influence'
            }
          },
          
          expert_communities: {
            examples: ['Stack Overflow', 'GitHub', 'Reddit (specific subs)', 'HackerNews'],
            reliability: 0.70,
            strengths: 'Real practitioner experience, community validation',
            weaknesses: 'Variable expertise, potential misinformation',
            verification_tips: [
              'Check user reputation and history',
              'Look for community consensus',
              'Verify claims with primary sources'
            ]
          }
        },

        unreliable_sources: {
          red_flags: [
            'No author attribution or credentials',
            'Clickbait headlines with extraordinary claims',
            'No sources cited or links to verify claims',
            'Recent domain registration with no track record',
            'Excessive ads or monetization focus',
            'Emotional language designed to trigger reactions',
            'Claims that "experts don\'t want you to know"'
          ],
          
          common_misinformation_sources: [
            'Social media posts without verification',
            'YouTube videos without credentials',
            'Blogs with no expertise demonstrated',
            'Forwarded messages and chain emails',
            'Anonymous forums and imageboards'
          ]
        }
      },

      business_financial: {
        authoritative: {
          financial_data: ['SEC EDGAR', 'Yahoo Finance', 'Bloomberg', 'Morningstar'],
          market_research: ['Gartner', 'Forrester', 'McKinsey', 'BCG Reports'],
          industry_analysis: ['Industry associations', 'Trade publications', 'Government statistics'],
          economic_data: ['Federal Reserve', 'Bureau of Labor Statistics', 'World Bank', 'IMF']
        },
        
        verification_methods: {
          cross_reference: 'Compare same data across multiple authoritative sources',
          methodology_check: 'Understand how data was collected and processed',
          bias_assessment: 'Consider potential conflicts of interest',
          date_relevance: 'Ensure data is current and applicable to context'
        }
      },

      scientific_information: {
        gold_standard: {
          peer_reviewed: 'Papers reviewed by domain experts before publication',
          meta_analyses: 'Studies that synthesize results from multiple studies',
          systematic_reviews: 'Comprehensive review of all available evidence',
          randomized_trials: 'Controlled experiments with randomization'
        },
        
        quality_indicators: [
          'Sample size adequate for conclusions drawn',
          'Control groups and proper methodology',
          'Conflicts of interest declared',
          'Results reproducible by other researchers',
          'Conclusions supported by data presented'
        ],
        
        red_flags: [
          'Cherry-picked data without context',
          'Correlation presented as causation',
          'Small sample sizes with broad claims',
          'Financial conflicts not disclosed',
          'Extraordinary claims without extraordinary evidence'
        ]
      }
    };
  }

  initializeVerificationFrameworks() {
    return {
      lateral_reading: {
        concept: 'Read across multiple sources rather than deep into one source',
        steps: [
          'Get basic info from initial source',
          'Open new tabs to research source credibility',
          'Search for other sources covering same topic',
          'Compare claims across sources',
          'Investigate any discrepancies'
        ],
        benefits: [
          'Prevents falling for sophisticated misinformation',
          'Reveals source bias and funding',
          'Provides broader context',
          'Identifies consensus vs outlier positions'
        ]
      },

      sift_method: {
        stop: 'Pause and consider what you\'re looking at',
        investigate_source: 'Who is behind this information?',
        find_coverage: 'What do other sources say?',
        trace_claims: 'Where did this information originally come from?'
      },

      craap_test: {
        currency: 'Is the information current and up-to-date?',
        relevance: 'Does it relate to your topic and meet your needs?',
        authority: 'Who is the author/publisher? What are their credentials?',
        accuracy: 'Is the information correct and well-sourced?',
        purpose: 'Why was this information published? What\'s the bias?'
      },

      fact_checking_process: {
        claim_identification: 'Isolate specific factual claims',
        source_tracing: 'Find original source of claim',
        expert_consultation: 'Check with domain experts',
        evidence_evaluation: 'Assess quality and quantity of evidence',
        context_consideration: 'Understand broader context and nuance'
      }
    };
  }

  initializeBiasTypes() {
    return {
      cognitive_biases: {
        confirmation_bias: {
          definition: 'Seeking information that confirms existing beliefs',
          example: 'Only reading news sources that align with your political views',
          mitigation: 'Actively seek out contrarian viewpoints and steel-man arguments'
        },
        
        availability_heuristic: {
          definition: 'Overestimating likelihood of events with recent examples',
          example: 'Overestimating plane crash risk after seeing news coverage',
          mitigation: 'Look for statistical data rather than relying on memorable examples'
        },
        
        anchoring_bias: {
          definition: 'Over-relying on first piece of information encountered',
          example: 'First price you see influences perception of subsequent prices',
          mitigation: 'Research baseline data before making comparisons'
        },
        
        dunning_kruger: {
          definition: 'Overconfidence in areas where you have little knowledge',
          example: 'Feeling like expert after reading few articles on complex topic',
          mitigation: 'Actively seek out what you don\'t know, consult actual experts'
        }
      },

      source_biases: {
        commercial_bias: {
          definition: 'Information slanted to promote business interests',
          examples: ['Company blog posts', 'Sponsored content', 'Industry reports'],
          identification: 'Look for financial relationships, advertising, funding sources'
        },
        
        political_bias: {
          definition: 'Information filtered through political ideology',
          examples: ['Partisan news sources', 'Think tank reports', 'Government communications'],
          identification: 'Check funding sources, board members, historical positions'
        },
        
        academic_bias: {
          definition: 'Pressure to publish, career advancement, funding considerations',
          examples: ['Publish or perish pressure', 'Grant funding influence', 'Institutional prestige'],
          identification: 'Check funding sources, author conflicts of interest, methodology'
        },
        
        cultural_bias: {
          definition: 'Information filtered through cultural assumptions and values',
          examples: ['Western-centric research', 'Gender assumptions', 'Socioeconomic blind spots'],
          identification: 'Look for diverse perspectives, international sources, demographic analysis'
        }
      },

      algorithmic_bias: {
        filter_bubbles: {
          concept: 'Algorithms show you information similar to what you\'ve engaged with',
          platforms: ['Google search', 'Facebook feed', 'YouTube recommendations', 'Twitter timeline'],
          mitigation: [
            'Use private browsing for research',
            'Vary your search terms and sources',
            'Deliberately seek out different perspectives',
            'Use multiple search engines and platforms'
          ]
        },
        
        echo_chambers: {
          concept: 'Online spaces where similar views are reinforced',
          identification: [
            'Everyone seems to agree on controversial topics',
            'Opposing views are ridiculed rather than addressed',
            'Complex issues are oversimplified',
            'Emotional content is heavily promoted'
          ],
          escape_strategies: [
            'Join communities with diverse viewpoints',
            'Follow people who disagree with you respectfully',
            'Read primary sources rather than interpretations',
            'Engage with steel-man versions of opposing arguments'
          ]
        }
      }
    };
  }

  initializeFactCheckingMethods() {
    return {
      verification_techniques: {
        reverse_image_search: {
          purpose: 'Verify if images are original or reused from other contexts',
          tools: ['Google Images', 'TinEye', 'Yandex Images'],
          process: [
            'Right-click image and "Search Google for image"',
            'Look for earliest appearance and original context',
            'Check if image has been manipulated or taken out of context'
          ]
        },
        
        domain_analysis: {
          whois_lookup: 'Find when domain was registered and by whom',
          about_page: 'Check credentials, funding, mission of organization',
          contact_info: 'Legitimate sources provide clear contact information',
          track_record: 'Search for previous work and reputation'
        },
        
        citation_checking: {
          follow_links: 'Click through to verify sources actually support claims',
          dead_links: 'Broken links may indicate poor maintenance or fabricated sources',
          circular_citations: 'Multiple sources citing each other without original source',
          primary_sources: 'Trace back to original research, data, or eyewitness accounts'
        },
        
        expert_verification: {
          credentialed_experts: 'PhD in relevant field, published research, institutional affiliation',
          professional_consensus: 'What do most experts in field agree on?',
          peer_review: 'Has expert\'s work been scrutinized by other experts?',
          conflicts_of_interest: 'Financial or ideological motivations that might bias opinion'
        }
      },

      red_flag_detection: {
        emotional_manipulation: [
          'Language designed to trigger anger, fear, or outrage',
          'All-caps text, excessive exclamation points',
          'Us-vs-them framing with no nuance',
          'Appeals to fear rather than evidence'
        ],
        
        logical_fallacies: [
          'Ad hominem: Attacking person rather than argument',
          'Straw man: Misrepresenting opposing position',
          'False dichotomy: Presenting only two options when more exist',
          'Appeal to authority: Citing irrelevant authority figures',
          'Slippery slope: Claiming extreme consequences without justification'
        ],
        
        statistical_manipulation: [
          'Cherry-picking data points that support conclusion',
          'Correlation presented as causation',
          'Relative vs absolute risk confusion',
          'Misleading graphs and visualizations',
          'Sample sizes too small for conclusions drawn'
        ]
      },

      fact_checking_resources: {
        general: ['Snopes', 'FactCheck.org', 'PolitiFact', 'Reuters Fact Check'],
        international: ['BBC Reality Check', 'AFP Fact Check', 'Full Fact (UK)'],
        specialized: ['Climate Feedback', 'Health Feedback', 'Lead Stories'],
        academic: ['AllSides', 'Media Bias/Fact Check', 'Ad Fontes Media Chart']
      }
    };
  }

  initializeMisinformationPatterns() {
    return {
      common_patterns: {
        false_urgency: {
          pattern: 'Claims that action must be taken immediately',
          examples: ['Limited time offers', 'Share before it\'s deleted', 'Act now or lose forever'],
          psychology: 'Prevents critical thinking by creating time pressure',
          defense: 'Take time to verify urgent claims, real urgent issues will still be urgent tomorrow'
        },
        
        conspiracy_thinking: {
          pattern: 'Complex explanations involving secret coordination',
          characteristics: [
            'Lack of falsifiable predictions',
            'Evidence against conspiracy seen as proof of conspiracy',
            'Assumes vast coordination without leaks',
            'Simple explanations dismissed without consideration'
          ],
          defense: 'Apply Occam\'s razor, look for simpler explanations, check for disconfirming evidence'
        },
        
        pseudoscience: {
          pattern: 'Scientific-sounding claims without scientific rigor',
          red_flags: [
            'Cherry-picked studies while ignoring contradictory evidence',
            'Correlation claimed as causation',
            'Anecdotal evidence presented as scientific proof',
            'Claims of suppression by "establishment"',
            'Lack of peer review or replication'
          ],
          defense: 'Check for peer review, look for systematic reviews, understand scientific consensus'
        },
        
        emotional_manipulation: {
          pattern: 'Information designed to trigger strong emotional responses',
          techniques: [
            'Fear-mongering about threats to safety',
            'Outrage at perceived injustices',
            'Hope for miracle solutions',
            'Pride through in-group superiority'
          ],
          defense: 'Recognize emotional reaction, step back, seek objective information'
        }
      },

      platform_specific_issues: {
        social_media: {
          problems: [
            'Algorithm amplifies engaging (often false) content',
            'Information spreads faster than verification',
            'Context collapse - information shared without background',
            'Sockpuppet accounts and astroturfing'
          ],
          verification_strategies: [
            'Check account history and authenticity',
            'Look for original source before sharing',
            'Be skeptical of viral content',
            'Verify through external sources'
          ]
        },
        
        search_engines: {
          problems: [
            'SEO manipulation can boost low-quality sources',
            'Personalization creates filter bubbles',
            'Sponsored content mixed with organic results',
            'Autocomplete suggestions can introduce bias'
          ],
          strategies: [
            'Use multiple search engines',
            'Try different search terms',
            'Look beyond first page of results',
            'Check .org and .edu sources'
          ]
        },
        
        video_platforms: {
          problems: [
            'Deepfakes and sophisticated video manipulation',
            'Recommendation algorithms promote extremist content',
            'Easy to present opinion as fact',
            'Difficult to fact-check video content'
          ],
          verification: [
            'Check channel credentials and history',
            'Look for original sources cited',
            'Be skeptical of extraordinary claims',
            'Cross-reference with text-based sources'
          ]
        }
      }
    };
  }

  initializeDigitalLiteracy() {
    return {
      core_skills: {
        source_evaluation: {
          author_credentials: 'Research author\'s qualifications and track record',
          publication_quality: 'Assess reputation and standards of publishing platform',
          funding_transparency: 'Understand who pays for the information',
          peer_review: 'Determine if claims have been professionally scrutinized'
        },
        
        information_triangulation: {
          multiple_sources: 'Never rely on single source for important information',
          diverse_perspectives: 'Seek out different viewpoints and stakeholders',
          primary_sources: 'Go to original documents, data, and eyewitness accounts',
          expert_consensus: 'Understand what most qualified experts agree on'
        },
        
        critical_thinking: {
          question_assumptions: 'Challenge your own beliefs and the information presented',
          consider_alternatives: 'What other explanations could account for the evidence?',
          proportional_evidence: 'Extraordinary claims require extraordinary evidence',
          intellectual_humility: 'Be willing to change your mind when presented with better evidence'
        }
      },

      research_strategies: {
        systematic_approach: {
          define_question: 'Clearly articulate what you\'re trying to understand',
          identify_sources: 'Map out authoritative sources for your topic',
          gather_evidence: 'Collect information systematically, not just cherry-picking',
          synthesize_findings: 'Look for patterns and consensus across sources',
          document_process: 'Keep track of sources and reasoning for future reference'
        },
        
        source_hierarchy: {
          tier_1: 'Primary sources, peer-reviewed research, official data',
          tier_2: 'Established journalism, expert analysis, institutional reports',
          tier_3: 'Opinion pieces by credentialed experts, specialized blogs',
          tier_4: 'Social media, forums, unverified claims',
          usage: 'Start with tier 1, use lower tiers for context but verify independently'
        }
      },

      information_diet: {
        balanced_consumption: [
          'Mix of different ideological perspectives',
          'Primary sources alongside analysis',
          'Long-form content balanced with quick updates',
          'International sources for global perspective'
        ],
        
        quality_over_quantity: [
          'Few high-quality sources better than many poor ones',
          'Deep understanding over surface-level awareness',
          'Timeless principles over trending topics',
          'Evidence-based content over opinion'
        ],
        
        regular_detox: [
          'Periodic breaks from social media',
          'Unsubscribe from low-quality sources',
          'Reduce exposure to outrage-inducing content',
          'Focus on constructive rather than destructive information'
        ]
      }
    };
  }

  initializeResearchMethods() {
    return {
      academic_research: {
        literature_review: {
          purpose: 'Understand current state of knowledge on topic',
          process: [
            'Start with recent systematic reviews or meta-analyses',
            'Look for seminal papers that are frequently cited',
            'Follow citation chains backwards and forwards',
            'Identify key researchers and institutions in field'
          ],
          databases: ['Google Scholar', 'PubMed', 'IEEE Xplore', 'JSTOR', 'arXiv']
        },
        
        source_evaluation: {
          journal_quality: 'Check impact factor, peer review process, editorial board',
          author_credentials: 'Academic affiliation, previous publications, expertise area',
          methodology: 'Sample size, control groups, statistical methods, reproducibility',
          conflicts_of_interest: 'Funding sources, financial relationships, institutional bias'
        }
      },

      investigative_techniques: {
        document_analysis: {
          primary_documents: 'Original memos, reports, legal filings, financial statements',
          secondary_analysis: 'Expert interpretation and analysis of primary documents',
          version_control: 'Track changes and evolution of documents over time',
          authenticity_verification: 'Confirm documents are genuine and unaltered'
        },
        
        data_verification: {
          methodology_review: 'Understand how data was collected and processed',
          sample_representativeness: 'Ensure sample accurately represents population',
          statistical_significance: 'Check if results are statistically meaningful',
          replication_attempts: 'Look for independent verification of findings'
        },
        
        expert_interviews: {
          credentialed_experts: 'PhD, professional experience, published research',
          multiple_perspectives: 'Interview experts with different viewpoints',
          conflict_disclosure: 'Understand potential biases and conflicts of interest',
          consensus_building: 'Identify areas of agreement and disagreement among experts'
        }
      },

      practical_verification: {
        quick_checks: {
          sniff_test: 'Does this claim seem plausible given your general knowledge?',
          source_check: 'Is this from a credible, authoritative source?',
          recency_check: 'Is this information current and relevant?',
          consensus_check: 'Do other reputable sources agree with this claim?'
        },
        
        deep_dives: {
          triangulation: 'Verify through multiple independent sources',
          primary_source: 'Trace back to original source of information',
          expert_consultation: 'Get opinion from qualified domain expert',
          methodology_review: 'Understand how conclusions were reached'
        }
      }
    };
  }

  // Main verification method
  verifyInformation(claim, sources = [], context = {}) {
    const verification = {
      claim_analysis: this.analyzeClaim(claim),
      source_credibility: this.assessSources(sources),
      bias_detection: this.detectBias(claim, sources, context),
      fact_check_results: this.performFactCheck(claim, sources),
      reliability_score: this.calculateReliabilityScore(claim, sources),
      recommendations: this.generateRecommendations(claim, sources, context)
    };

    return verification;
  }

  analyzeClaim(claim) {
    return {
      type: this.classifyClaimType(claim),
      verifiability: this.assessVerifiability(claim),
      specificity: this.assessSpecificity(claim),
      emotional_language: this.detectEmotionalLanguage(claim),
      logical_fallacies: this.detectLogicalFallacies(claim)
    };
  }

  assessSources(sources) {
    return sources.map(source => ({
      source: source,
      credibility_score: this.calculateSourceCredibility(source),
      bias_indicators: this.identifyBiasIndicators(source),
      verification_status: this.checkSourceVerification(source)
    }));
  }

  // Educational method to explain how to identify reliable information
  explainInformationLiteracy() {
    return {
      title: '🔍 Inteligencia Informacional: Tu Escudo Contra la Desinformación',
      
      fundamental_principle: `En la era digital, **la información es poder, pero la información falsa es peligro**.
Tu capacidad para distinguir información confiable de desinformación determina:
- La calidad de tus decisiones
- Tu comprensión del mundo
- Tu capacidad de influir positivamente
- Tu resistencia a la manipulación`,

      information_hierarchy: {
        tier_1_gold: {
          sources: 'Documentación oficial, papers peer-reviewed, datos gubernamentales',
          reliability: '90-95%',
          verification: 'Verificación mínima requerida',
          usage: 'Base tus decisiones importantes en estas fuentes'
        },
        tier_2_silver: {
          sources: 'Periodismo establecido, reportes de instituciones reconocidas',
          reliability: '75-85%',
          verification: 'Verificación cruzada recomendada',
          usage: 'Buena para entender contexto y tendencias'
        },
        tier_3_bronze: {
          sources: 'Blogs de expertos, opiniones fundamentadas',
          reliability: '60-75%',
          verification: 'Verificación esencial',
          usage: 'Perspectivas valiosas pero requieren validación'
        },
        tier_4_caution: {
          sources: 'Redes sociales, foros, fuentes anónimas',
          reliability: '0-50%',
          verification: 'Verificación exhaustiva necesaria',
          usage: 'Señales tempranas pero nunca fuente única'
        }
      },

      red_flags_critical: [
        '🚩 **Urgencia artificial**: "Comparte antes de que lo borren"',
        '🚩 **Autoridad falsa**: "Los expertos no quieren que sepas esto"',
        '🚩 **Emociones extremas**: Contenido diseñado para generar ira o miedo',
        '🚩 **Evidencia ausente**: Afirmaciones extraordinarias sin fuentes',
        '🚩 **Teorías conspirativas**: Explicaciones complejas sin evidencia',
        '🚩 **Cherry picking**: Datos selectivos ignorando contexto completo'
      ],

      verification_process: {
        step_1: {
          action: 'PARA y evalúa la fuente',
          questions: ['¿Quién escribió esto?', '¿Cuáles son sus credenciales?', '¿Qué motivación podrían tener?']
        },
        step_2: {
          action: 'BUSCA fuentes adicionales',
          questions: ['¿Otras fuentes confiables reportan lo mismo?', '¿Hay consenso o controversia?']
        },
        step_3: {
          action: 'RASTREA la fuente original',
          questions: ['¿Dónde se originó esta información?', '¿Es fuente primaria o interpretación?']
        },
        step_4: {
          action: 'CONTEXTUALIZA la información',
          questions: ['¿Qué factores podrían estar influyendo?', '¿Hay información importante omitida?']
        }
      },

      cognitive_defenses: {
        confirmation_bias: {
          problem: 'Buscamos información que confirma lo que ya creemos',
          defense: 'Activamente busca evidencia que contradiga tus creencias'
        },
        availability_heuristic: {
          problem: 'Sobrestimamos probabilidades basadas en ejemplos memorables',
          defense: 'Busca datos estadísticos reales, no solo casos anecdóticos'
        },
        dunning_kruger: {
          problem: 'Confianza excesiva en áreas donde sabemos poco',
          defense: 'Entre más aprendes, más consciente te vuelves de lo que no sabes'
        }
      },

      practical_tools: {
        browser_techniques: [
          'Búsqueda de imágenes inversas para verificar fotos',
          'Modo incógnito para evitar personalización de resultados',
          'Múltiples motores de búsqueda para perspectivas diferentes',
          'Verificación de dominio con WHOIS lookup'
        ],
        fact_checking: [
          'Snopes.com para claims virales',
          'FactCheck.org para claims políticos',
          'PolitiFact para verificación política',
          'Reuters Fact Check para noticias internacionales'
        ],
        academic_sources: [
          'Google Scholar para investigación académica',
          'ResearchGate para papers científicos',
          'JSTOR para artículos académicos históricos',
          'PubMed para investigación médica'
        ]
      },

      strategic_importance: `**¿Por qué dominar esto te da superpoderes?**
- **Tomas mejores decisiones** basadas en información confiable
- **Eres inmune a manipulación** de desinformación
- **Tienes ventaja competitiva** al entender la realidad más claramente
- **Puedes influir positivamente** ayudando a otros a discernir información
- **Construyes credibilidad** al compartir solo información verificada`,

      advanced_techniques: {
        lateral_reading: 'Lee múltiples fuentes simultáneamente en lugar de profundizar en una sola',
        source_triangulation: 'Verifica información importante con al menos 3 fuentes independientes',
        expert_networks: 'Desarrolla relaciones con expertos en campos de tu interés',
        information_diet: 'Cuida conscientemente qué información consumes diariamente'
      }
    };
  }

  // Method to explain why critical thinking matters
  explainCriticalThinking() {
    return {
      title: '🧠 Pensamiento Crítico: Tu Superpoder Mental',
      
      definition: `El pensamiento crítico es **tu sistema inmunológico mental**:
- Protege contra ideas tóxicas y manipulación
- Te permite tomar decisiones basadas en evidencia
- Desarrolla tu capacidad de resolver problemas complejos
- Te convierte en un colaborador más valioso`,

      core_components: {
        analysis: 'Descomponer información compleja en partes comprensibles',
        evaluation: 'Juzgar la credibilidad y calidad de la evidencia',
        inference: 'Sacar conclusiones lógicas basadas en evidencia',
        interpretation: 'Entender significado y contexto de la información',
        explanation: 'Comunicar tu razonamiento de manera clara',
        self_regulation: 'Monitorear y corregir tu propio pensamiento'
      },

      strategic_questions: [
        '¿Qué evidencia apoya esta afirmación?',
        '¿Qué evidencia la contradice?',
        '¿Qué asunciones estoy haciendo?',
        '¿Qué perspectivas alternativas existen?',
        '¿Qué no sé que podría ser importante?',
        '¿Cómo podría estar equivocado?'
      ],

      business_applications: [
        'Evaluar oportunidades de inversión',
        'Analizar estrategias competitivas',
        'Tomar decisiones de producto',
        'Evaluar riesgos y oportunidades',
        'Desarrollar soluciones innovadoras'
      ],

      daily_benefits: [
        'Mejores decisiones financieras',
        'Relaciones más saludables',
        'Menor susceptibilidad a estafas',
        'Mayor efectividad en el trabajo',
        'Comprensión más profunda del mundo'
      ]
    };
  }

  // Method to recommend reliable sources for specific topics
  recommendSources(topic, context = {}) {
    const topic_lower = topic.toLowerCase();
    
    if (topic_lower.includes('tecnología') || topic_lower.includes('programming') || topic_lower.includes('software')) {
      return this.getTechSources();
    }
    
    if (topic_lower.includes('negocio') || topic_lower.includes('business') || topic_lower.includes('empresa')) {
      return this.getBusinessSources();
    }
    
    if (topic_lower.includes('ciencia') || topic_lower.includes('investigación')) {
      return this.getScienceSources();
    }
    
    return this.getGeneralSources();
  }

  getTechSources() {
    return {
      primary_authoritative: [
        'Official documentation (MDN, Python.org, React docs)',
        'IEEE Computer Society publications',
        'ACM Digital Library',
        'RFC documents for internet standards'
      ],
      secondary_reliable: [
        'Ars Technica for in-depth technical analysis',
        'Stack Overflow for practical programming questions',
        'GitHub for open source code and projects',
        'Hacker News for tech industry discussions'
      ],
      expert_communities: [
        'Reddit r/programming (with source verification)',
        'Dev.to for developer tutorials and experiences',
        'Medium publications by recognized tech companies',
        'YouTube channels by established tech educators'
      ],
      avoid: [
        'Clickbait tech blogs without expertise',
        'Social media posts without verification',
        'Tutorials without code examples or testing',
        'Sources that promise "secrets" or "hacks"'
      ]
    };
  }

  getBusinessSources() {
    return {
      financial_data: [
        'SEC EDGAR database for public company filings',
        'Bloomberg Terminal for market data',
        'Yahoo Finance for basic financial information',
        'Morningstar for investment research'
      ],
      analysis_research: [
        'McKinsey Global Institute reports',
        'BCG Insights and publications',
        'Harvard Business Review for strategic thinking',
        'MIT Sloan Management Review'
      ],
      news_analysis: [
        'Wall Street Journal for financial news',
        'Financial Times for global business',
        'Reuters for unbiased business reporting',
        'The Economist for economic analysis'
      ],
      industry_specific: [
        'Trade association reports',
        'Gartner for technology industry analysis',
        'Forrester for market research',
        'PwC industry reports and surveys'
      ]
    };
  }

  getScienceSources() {
    return {
      peer_reviewed: [
        'PubMed for medical and life sciences',
        'arXiv for physics, mathematics, computer science',
        'Nature and Science for multidisciplinary research',
        'Journal-specific databases for specialized fields'
      ],
      institutional: [
        'National Academy of Sciences',
        'Royal Society publications',
        'University research publications',
        'Government research agencies (NIH, NSF, etc.)'
      ],
      synthesis: [
        'Cochrane Reviews for medical evidence synthesis',
        'IPCC reports for climate science',
        'Meta-analyses and systematic reviews',
        'Scientific consensus statements'
      ]
    };
  }

  getGeneralSources() {
    return {
      news: [
        'Reuters and Associated Press for unbiased reporting',
        'BBC News for international perspective',
        'NPR for in-depth analysis',
        'ProPublica for investigative journalism'
      ],
      fact_checking: [
        'Snopes for viral claims',
        'FactCheck.org for political claims',
        'PolitiFact for political fact-checking',
        'AllSides for media bias analysis'
      ],
      reference: [
        'Wikipedia (as starting point, verify sources)',
        'Encyclopedia Britannica',
        'Government websites (.gov domains)',
        'Educational institutions (.edu domains)'
      ]
    };
  }

  // Utility methods
  calculateSourceCredibility(source) {
    // TODO: Implement real source credibility calculation logic.
    // This is a development placeholder and MUST be implemented before production use.
    throw new Error('calculateSourceCredibility is not implemented. Replace placeholder before production.');
  }

  identifyBiasIndicators(source) {
    // Implementation would detect bias patterns
    return ['potential_commercial_bias']; // Placeholder
  }

  checkSourceVerification(source) {
    // Implementation would verify source authenticity
    return 'verified'; // Placeholder
  }

  classifyClaimType(claim) {
    // Implementation would classify the type of claim
    return 'factual_claim'; // Placeholder
  }

  assessVerifiability(claim) {
    // Implementation would assess if claim can be verified
    return 'verifiable'; // Placeholder
  }

  assessSpecificity(claim) {
    // Implementation would assess claim specificity
    return 'specific'; // Placeholder
  }

  detectEmotionalLanguage(claim) {
    // Implementation would detect emotional manipulation
    return false; // Placeholder
  }

  detectLogicalFallacies(claim) {
    // Implementation would detect logical fallacies
    return []; // Placeholder
  }

  performFactCheck(claim, sources) {
    // Implementation would perform comprehensive fact-checking
    return {
      status: 'needs_verification',
      confidence: 0.7,
      supporting_evidence: [],
      contradicting_evidence: []
    };
  }

  calculateReliabilityScore(claim, sources) {
    // Implementation would calculate overall reliability
    return 0.8; // Placeholder
  }

  generateRecommendations(claim, sources, context) {
    return [
      'Verify with additional authoritative sources',
      'Check for potential bias in current sources',
      'Look for expert consensus on this topic',
      'Consider alternative explanations'
    ];
  }
}

// Create and export singleton instance
const informationVerificationService = new InformationVerificationService();
export default informationVerificationService;