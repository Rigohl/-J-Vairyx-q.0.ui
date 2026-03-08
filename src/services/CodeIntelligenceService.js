// Code Intelligence Service - Deep understanding of programming concepts, best practices, and software development
class CodeIntelligenceService {
  constructor() {
    this.programmingConcepts = this.initializeProgrammingConcepts();
    this.softwareDesign = this.initializeSoftwareDesign();
    this.bestPractices = this.initializeBestPractices();
    this.developmentMethodologies = this.initializeDevelopmentMethodologies();
    this.codeQuality = this.initializeCodeQuality();
    this.algorithmicThinking = this.initializeAlgorithmicThinking();
    this.systemArchitecture = this.initializeSystemArchitecture();
  }

  initializeProgrammingConcepts() {
    return {
      fundamental_concepts: {
        abstraction: {
          definition: 'Hiding complexity behind simple interfaces',
          importance: 'Allows humans to work with complex systems by focusing on relevant details',
          examples: [
            'Functions abstract away implementation details',
            'Classes abstract data and behavior together',
            'APIs abstract complex services behind simple calls',
            'Operating systems abstract hardware complexity'
          ],
          levels: [
            'Hardware abstraction (assembly → high-level languages)',
            'Data abstraction (primitive types → complex data structures)',
            'Procedural abstraction (code blocks → functions)',
            'Object abstraction (data + methods → objects)',
            'System abstraction (components → services)'
          ]
        },

        encapsulation: {
          definition: 'Bundling data and methods together while hiding internal implementation',
          benefits: [
            'Reduces complexity by limiting interactions',
            'Improves maintainability by containing changes',
            'Increases reusability through clear interfaces',
            'Enhances security by controlling access'
          ],
          implementation: [
            'Private/protected/public access modifiers',
            'Getter and setter methods',
            'Module systems and namespaces',
            'Interface-based design'
          ]
        },

        modularity: {
          definition: 'Breaking large systems into smaller, manageable pieces',
          principles: [
            'High cohesion: Related functionality grouped together',
            'Low coupling: Minimal dependencies between modules',
            'Single responsibility: Each module has one clear purpose',
            'Interface segregation: Clients depend only on what they use'
          ],
          benefits: [
            'Easier testing and debugging',
            'Parallel development by teams',
            'Code reusability across projects',
            'Simplified maintenance and updates'
          ]
        },

        polymorphism: {
          definition: 'Same interface, different implementations',
          types: [
            'Runtime polymorphism (virtual methods, interfaces)',
            'Compile-time polymorphism (method overloading)',
            'Parametric polymorphism (generics/templates)',
            'Ad-hoc polymorphism (operator overloading)'
          ],
          power: 'Enables extensible, flexible designs that can work with new types without modification'
        }
      },

      programming_paradigms: {
        object_oriented: {
          core_principles: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'],
          strengths: [
            'Models real-world entities naturally',
            'Promotes code reuse through inheritance',
            'Encapsulation provides security and maintainability',
            'Polymorphism enables flexible, extensible designs'
          ],
          challenges: [
            'Can lead to over-engineering',
            'Inheritance hierarchies can become complex',
            'Performance overhead from dynamic dispatch',
            'Can encourage mutable state'
          ],
          best_for: 'Large applications with complex domain models'
        },

        functional: {
          core_principles: ['Immutability', 'Pure functions', 'Higher-order functions', 'Composition'],
          strengths: [
            'Easier to reason about and test',
            'Natural parallelization due to immutability',
            'Reduced bugs from side effects',
            'Mathematical foundation enables optimization'
          ],
          concepts: [
            'First-class functions',
            'Closures and lexical scoping',
            'Recursion over iteration',
            'Map, filter, reduce patterns'
          ],
          best_for: 'Data processing, concurrent systems, mathematical computations'
        },

        procedural: {
          core_principles: ['Step-by-step procedures', 'Top-down design', 'Structured programming'],
          strengths: [
            'Simple and straightforward',
            'Good for linear problem solving',
            'Easy to understand execution flow',
            'Minimal cognitive overhead'
          ],
          best_for: 'Scripts, simple applications, system programming'
        },

        declarative: {
          concept: 'Describe what you want, not how to get it',
          examples: [
            'SQL for database queries',
            'HTML for document structure',
            'CSS for styling',
            'Regular expressions for pattern matching'
          ],
          benefits: [
            'More concise and readable',
            'System can optimize execution',
            'Less error-prone',
            'Focuses on problem domain'
          ]
        }
      },

      data_structures_algorithms: {
        fundamental_structures: {
          arrays: {
            characteristics: 'Contiguous memory, fixed size, O(1) access',
            use_cases: 'When you need fast random access to elements',
            trade_offs: 'Fast access vs fixed size and expensive insertion/deletion'
          },
          linked_lists: {
            characteristics: 'Dynamic size, O(n) access, O(1) insertion/deletion at known position',
            use_cases: 'When size varies and you mainly access sequentially',
            trade_offs: 'Dynamic size vs slower access and extra memory overhead'
          },
          stacks: {
            characteristics: 'LIFO (Last In, First Out) access pattern',
            use_cases: 'Function calls, undo operations, expression evaluation',
            operations: 'Push, pop, peek - all O(1)'
          },
          queues: {
            characteristics: 'FIFO (First In, First Out) access pattern',
            use_cases: 'Task scheduling, breadth-first search, buffering',
            operations: 'Enqueue, dequeue - both O(1)'
          },
          trees: {
            characteristics: 'Hierarchical structure with root and children',
            types: 'Binary trees, BST, AVL, Red-Black, B-trees',
            use_cases: 'Hierarchical data, searching, sorting, decision making'
          },
          graphs: {
            characteristics: 'Nodes connected by edges, can be directed/undirected',
            representations: 'Adjacency matrix, adjacency list',
            use_cases: 'Networks, relationships, pathfinding, dependencies'
          },
          hash_tables: {
            characteristics: 'Key-value pairs with O(1) average access',
            use_cases: 'Fast lookups, caching, counting, indexing',
            trade_offs: 'Fast access vs memory overhead and hash collisions'
          }
        },

        algorithmic_complexity: {
          big_o_notation: {
            purpose: 'Describes how algorithm performance scales with input size',
            common_complexities: {
              'O(1)': 'Constant - hash table lookup',
              'O(log n)': 'Logarithmic - binary search',
              'O(n)': 'Linear - array traversal',
              'O(n log n)': 'Linearithmic - efficient sorting',
              'O(n²)': 'Quadratic - nested loops',
              'O(2^n)': 'Exponential - naive recursive algorithms'
            }
          },
          
          space_complexity: {
            concept: 'How much extra memory algorithm uses',
            considerations: [
              'In-place vs out-of-place algorithms',
              'Recursive call stack depth',
              'Auxiliary data structures',
              'Trade-offs between time and space'
            ]
          }
        },

        problem_solving_patterns: {
          divide_and_conquer: 'Break problem into smaller subproblems, solve recursively',
          dynamic_programming: 'Store solutions to subproblems to avoid recomputation',
          greedy_algorithms: 'Make locally optimal choice at each step',
          backtracking: 'Try all possibilities, backtrack when you hit dead end',
          two_pointers: 'Use two pointers moving toward each other',
          sliding_window: 'Maintain window of elements that slides through array'
        }
      }
    };
  }

  initializeSoftwareDesign() {
    return {
      design_principles: {
        solid: {
          single_responsibility: {
            principle: 'A class should have only one reason to change',
            benefit: 'Easier to understand, test, and maintain',
            violation_signs: 'Class doing multiple unrelated things'
          },
          open_closed: {
            principle: 'Open for extension, closed for modification',
            benefit: 'Add new functionality without changing existing code',
            implementation: 'Use inheritance, composition, or strategy pattern'
          },
          liskov_substitution: {
            principle: 'Derived classes must be substitutable for base classes',
            benefit: 'Polymorphism works correctly',
            violation_signs: 'Derived class throws unexpected exceptions or has weaker postconditions'
          },
          interface_segregation: {
            principle: 'Clients should not depend on interfaces they don\'t use',
            benefit: 'Reduces coupling and increases cohesion',
            implementation: 'Create specific, focused interfaces'
          },
          dependency_inversion: {
            principle: 'Depend on abstractions, not concretions',
            benefit: 'Loose coupling, easier testing and flexibility',
            implementation: 'Inject dependencies rather than creating them'
          }
        },

        dry: {
          principle: 'Don\'t Repeat Yourself',
          application: 'Every piece of knowledge should have single, authoritative representation',
          benefits: 'Easier maintenance, fewer bugs, consistent behavior',
          techniques: 'Functions, classes, modules, configuration files'
        },

        kiss: {
          principle: 'Keep It Simple, Stupid',
          application: 'Simplest solution that works is usually the best',
          benefits: 'Easier to understand, debug, and maintain',
          guidelines: 'Avoid over-engineering, prefer clear over clever'
        },

        yagni: {
          principle: 'You Aren\'t Gonna Need It',
          application: 'Don\'t implement functionality until you actually need it',
          benefits: 'Reduces complexity, faster development, less code to maintain',
          balance: 'Plan for extensibility without over-engineering'
        }
      },

      design_patterns: {
        creational: {
          singleton: {
            intent: 'Ensure class has only one instance',
            use_case: 'Configuration objects, database connections',
            implementation: 'Private constructor, static instance method'
          },
          factory: {
            intent: 'Create objects without specifying exact class',
            use_case: 'When creation logic is complex or varies',
            benefit: 'Loose coupling between client and concrete classes'
          },
          builder: {
            intent: 'Construct complex objects step by step',
            use_case: 'Objects with many optional parameters',
            benefit: 'Flexible construction, immutable objects'
          }
        },

        structural: {
          adapter: {
            intent: 'Make incompatible interfaces work together',
            use_case: 'Integrating third-party libraries',
            implementation: 'Wrapper that translates interface'
          },
          decorator: {
            intent: 'Add behavior to objects dynamically',
            use_case: 'Adding features without modifying original class',
            benefit: 'Flexible alternative to inheritance'
          },
          facade: {
            intent: 'Provide simple interface to complex subsystem',
            use_case: 'Simplifying complex APIs',
            benefit: 'Reduces coupling and improves usability'
          }
        },

        behavioral: {
          observer: {
            intent: 'Notify multiple objects about state changes',
            use_case: 'Event handling, model-view architectures',
            implementation: 'Subject maintains list of observers'
          },
          strategy: {
            intent: 'Encapsulate algorithms and make them interchangeable',
            use_case: 'Multiple ways to perform same operation',
            benefit: 'Runtime algorithm selection'
          },
          command: {
            intent: 'Encapsulate request as object',
            use_case: 'Undo/redo, queuing operations, logging',
            benefit: 'Decouples sender from receiver'
          }
        }
      },

      architectural_patterns: {
        mvc: {
          components: {
            model: 'Data and business logic',
            view: 'User interface',
            controller: 'Handles user input and coordinates model/view'
          },
          benefits: 'Separation of concerns, parallel development, multiple views',
          variations: 'MVP (Model-View-Presenter), MVVM (Model-View-ViewModel)'
        },

        layered_architecture: {
          concept: 'Organize code into horizontal layers',
          typical_layers: ['Presentation', 'Business Logic', 'Data Access', 'Database'],
          benefits: 'Clear separation of concerns, easier testing, reusable layers',
          constraints: 'Each layer only communicates with layer below'
        },

        microservices: {
          concept: 'Application as suite of small, independent services',
          benefits: [
            'Independent deployment and scaling',
            'Technology diversity',
            'Fault isolation',
            'Team autonomy'
          ],
          challenges: [
            'Distributed system complexity',
            'Network latency and failures',
            'Data consistency',
            'Operational overhead'
          ]
        },

        event_driven: {
          concept: 'Components communicate through events',
          benefits: 'Loose coupling, scalability, real-time processing',
          patterns: 'Event sourcing, CQRS, publish-subscribe',
          use_cases: 'Real-time systems, microservices communication'
        }
      }
    };
  }

  initializeBestPractices() {
    return {
      code_quality: {
        readability: {
          naming: [
            'Use descriptive, searchable names',
            'Avoid abbreviations and mental mapping',
            'Use consistent naming conventions',
            'Names should reveal intent'
          ],
          functions: [
            'Functions should be small and do one thing',
            'Fewer than 3 parameters ideally',
            'No side effects unless clearly indicated',
            'Use meaningful names that describe what function does'
          ],
          comments: [
            'Code should be self-documenting',
            'Comments explain why, not what',
            'Keep comments up to date with code',
            'Use comments for complex business logic'
          ],
          formatting: [
            'Consistent indentation and spacing',
            'Group related code together',
            'Use vertical spacing to separate concepts',
            'Follow team/language conventions'
          ]
        },

        maintainability: {
          modularity: 'Break code into logical, cohesive modules',
          coupling: 'Minimize dependencies between modules',
          cohesion: 'Keep related functionality together',
          complexity: 'Avoid overly complex methods and classes'
        },

        testing: {
          unit_tests: {
            purpose: 'Test individual components in isolation',
            characteristics: 'Fast, deterministic, independent',
            best_practices: [
              'Test behavior, not implementation',
              'One assertion per test',
              'Descriptive test names',
              'Arrange-Act-Assert pattern'
            ]
          },
          integration_tests: {
            purpose: 'Test interactions between components',
            scope: 'Database, external services, file system',
            trade_offs: 'More realistic but slower and more fragile'
          },
          test_driven_development: {
            cycle: 'Red (write failing test) → Green (make it pass) → Refactor',
            benefits: [
              'Better design through testability',
              'Higher confidence in changes',
              'Documentation through tests',
              'Reduced debugging time'
            ]
          }
        }
      },

      version_control: {
        git_workflow: {
          branching_strategies: {
            git_flow: 'Feature branches, develop branch, release branches',
            github_flow: 'Feature branches merged directly to main',
            gitlab_flow: 'Environment-based branches for deployment'
          },
          commit_practices: [
            'Atomic commits that represent single logical change',
            'Clear, descriptive commit messages',
            'Present tense, imperative mood',
            'Reference issue numbers when applicable'
          ]
        },

        code_review: {
          benefits: [
            'Catch bugs before they reach production',
            'Share knowledge across team',
            'Maintain code quality standards',
            'Mentoring and learning opportunities'
          ],
          best_practices: [
            'Review code, not the person',
            'Be specific and constructive',
            'Focus on most important issues first',
            'Balance thoroughness with velocity'
          ]
        }
      },

      performance: {
        optimization_principles: [
          'Measure before optimizing',
          'Optimize for common case',
          'Cache expensive operations',
          'Minimize I/O operations',
          'Use appropriate data structures'
        ],

        common_optimizations: {
          algorithmic: 'Choose better algorithms and data structures',
          caching: 'Store expensive computation results',
          lazy_loading: 'Load data only when needed',
          connection_pooling: 'Reuse database connections',
          compression: 'Reduce data transfer sizes'
        }
      },

      security: {
        secure_coding: [
          'Validate all input from external sources',
          'Use parameterized queries to prevent SQL injection',
          'Sanitize output to prevent XSS',
          'Implement proper authentication and authorization',
          'Keep dependencies up to date'
        ],

        common_vulnerabilities: {
          injection: 'SQL, NoSQL, command injection',
          broken_authentication: 'Session management flaws',
          sensitive_data_exposure: 'Unencrypted data transmission',
          security_misconfiguration: 'Default passwords, unnecessary features',
          cross_site_scripting: 'Untrusted data in web pages'
        }
      }
    };
  }

  initializeDevelopmentMethodologies() {
    return {
      agile: {
        principles: [
          'Individuals and interactions over processes and tools',
          'Working software over comprehensive documentation',
          'Customer collaboration over contract negotiation',
          'Responding to change over following a plan'
        ],
        
        scrum: {
          roles: ['Product Owner', 'Scrum Master', 'Development Team'],
          events: ['Sprint Planning', 'Daily Standup', 'Sprint Review', 'Retrospective'],
          artifacts: ['Product Backlog', 'Sprint Backlog', 'Increment'],
          timeboxes: 'Sprints (1-4 weeks), Daily Standups (15 min)'
        },

        kanban: {
          principles: ['Visualize workflow', 'Limit work in progress', 'Manage flow', 'Continuous improvement'],
          benefits: 'Flexible, visual, continuous delivery',
          metrics: 'Lead time, cycle time, throughput'
        }
      },

      devops: {
        culture: 'Collaboration between development and operations',
        practices: [
          'Continuous Integration (CI)',
          'Continuous Deployment (CD)',
          'Infrastructure as Code',
          'Monitoring and Logging',
          'Automated Testing'
        ],
        benefits: [
          'Faster delivery',
          'Higher quality',
          'Improved collaboration',
          'Reduced risk'
        ]
      },

      lean_software: {
        principles: [
          'Eliminate waste',
          'Build quality in',
          'Create knowledge',
          'Defer commitment',
          'Deliver fast',
          'Respect people',
          'Optimize the whole'
        ],
        waste_types: [
          'Partially done work',
          'Extra features',
          'Relearning',
          'Handoffs',
          'Delays',
          'Task switching',
          'Defects'
        ]
      }
    };
  }

  initializeCodeQuality() {
    return {
      metrics: {
        cyclomatic_complexity: {
          definition: 'Number of linearly independent paths through code',
          guidelines: '1-10 simple, 11-20 moderate, 21+ complex',
          improvement: 'Break down large methods, use early returns'
        },

        code_coverage: {
          definition: 'Percentage of code executed by tests',
          types: 'Line coverage, branch coverage, function coverage',
          target: '80-90% coverage for critical code paths'
        },

        technical_debt: {
          definition: 'Cost of additional rework caused by choosing easy solution',
          causes: 'Tight deadlines, lack of knowledge, changing requirements',
          management: 'Regular refactoring, code reviews, technical debt tracking'
        }
      },

      refactoring: {
        when_to_refactor: [
          'Before adding new features',
          'When fixing bugs',
          'During code reviews',
          'When code becomes hard to understand'
        ],

        common_refactorings: {
          extract_method: 'Pull out code into separate method',
          rename_variable: 'Give variables more descriptive names',
          remove_duplication: 'Eliminate repeated code',
          simplify_conditionals: 'Make complex if statements clearer'
        },

        safety_net: 'Comprehensive tests before refactoring'
      },

      code_smells: {
        long_method: 'Methods that are too long and do too much',
        large_class: 'Classes with too many responsibilities',
        duplicate_code: 'Same code in multiple places',
        long_parameter_list: 'Methods with too many parameters',
        feature_envy: 'Method uses data from another class extensively',
        data_clumps: 'Same groups of parameters appearing together'
      }
    };
  }

  initializeAlgorithmicThinking() {
    return {
      problem_solving_approach: {
        understand_problem: [
          'Read problem carefully multiple times',
          'Identify inputs, outputs, and constraints',
          'Work through examples manually',
          'Ask clarifying questions'
        ],

        plan_solution: [
          'Break problem into smaller subproblems',
          'Identify patterns or similar problems',
          'Choose appropriate data structures',
          'Consider edge cases'
        ],

        implement: [
          'Start with brute force solution',
          'Optimize if needed',
          'Handle edge cases',
          'Test with examples'
        ],

        optimize: [
          'Analyze time and space complexity',
          'Look for redundant operations',
          'Consider different approaches',
          'Trade-offs between time and space'
        ]
      },

      common_techniques: {
        recursion: {
          when_to_use: 'Problem can be broken into smaller similar problems',
          structure: 'Base case + recursive case',
          optimization: 'Memoization to avoid repeated calculations'
        },

        iteration: {
          when_to_use: 'Processing collections or repeating operations',
          patterns: 'For loops, while loops, foreach',
          optimization: 'Early termination, loop unrolling'
        },

        divide_and_conquer: {
          approach: 'Divide problem, solve subproblems, combine results',
          examples: 'Merge sort, quick sort, binary search',
          complexity: 'Often O(n log n) for sorting problems'
        },

        dynamic_programming: {
          approach: 'Store solutions to subproblems',
          when_to_use: 'Overlapping subproblems + optimal substructure',
          types: 'Top-down (memoization), bottom-up (tabulation)'
        }
      }
    };
  }

  initializeSystemArchitecture() {
    return {
      scalability: {
        horizontal_scaling: {
          concept: 'Add more machines to handle increased load',
          benefits: 'No upper limit, fault tolerance',
          challenges: 'Complexity, data consistency, state management'
        },

        vertical_scaling: {
          concept: 'Add more power to existing machines',
          benefits: 'Simple, no architectural changes needed',
          limitations: 'Hardware limits, single point of failure'
        },

        load_balancing: {
          purpose: 'Distribute requests across multiple servers',
          types: 'Round robin, least connections, weighted',
          benefits: 'Better resource utilization, fault tolerance'
        }
      },

      reliability: {
        fault_tolerance: 'System continues operating despite component failures',
        redundancy: 'Multiple instances of critical components',
        graceful_degradation: 'Reduced functionality rather than complete failure',
        circuit_breakers: 'Prevent cascade failures by stopping calls to failing services'
      },

      performance: {
        caching_strategies: {
          client_side: 'Browser cache, mobile app cache',
          server_side: 'Application cache, database cache',
          distributed: 'Redis, Memcached for shared cache',
          cdn: 'Content delivery network for static assets'
        },

        database_optimization: {
          indexing: 'Speed up queries on frequently searched columns',
          query_optimization: 'Efficient SQL, avoid N+1 problems',
          connection_pooling: 'Reuse database connections',
          read_replicas: 'Separate read and write operations'
        }
      },

      security_architecture: {
        defense_in_depth: 'Multiple layers of security controls',
        least_privilege: 'Minimum necessary access rights',
        zero_trust: 'Never trust, always verify',
        encryption: 'Data at rest and in transit'
      }
    };
  }

  // Main method to explain programming concepts
  explainConcept(concept, context = {}) {
    concept = concept.toLowerCase();
    
    if (concept.includes('código') || concept.includes('programming') || concept.includes('code')) {
      return this.explainProgramming(concept, context);
    }
    
    if (concept.includes('algoritmo') || concept.includes('algorithm')) {
      return this.explainAlgorithms(concept, context);
    }
    
    if (concept.includes('diseño') || concept.includes('design') || concept.includes('architecture')) {
      return this.explainSoftwareDesign(concept, context);
    }
    
    if (concept.includes('calidad') || concept.includes('quality') || concept.includes('best practice')) {
      return this.explainCodeQuality(concept, context);
    }
    
    return this.explainProgrammingGeneral(concept, context);
  }

  explainProgramming(concept, context) {
    return {
      title: '💻 Por Qué Entender Código es como Entender el Lenguaje del Futuro',
      
      fundamental_reality: `El código NO es solo para programadores. Es el **lenguaje universal** que:
- Define cómo funciona todo dispositivo que usas
- Automatiza procesos y toma decisiones por ti
- Conecta el mundo digital en el que vivimos
- Determina qué es posible y qué no en tecnología`,

      why_code_matters: {
        business_perspective: [
          'Código eficiente = productos más rápidos = usuarios más felices',
          'Código mantenible = desarrollo más rápido = ventaja competitiva',
          'Código seguro = protección de datos = confianza del cliente',
          'Código escalable = crecimiento sin límites técnicos'
        ],
        
        strategic_thinking: [
          'Entender código te permite evaluar soluciones técnicas',
          'Puedes comunicarte efectivamente con equipos de desarrollo',
          'Identificas oportunidades de automatización',
          'Tomas decisiones informadas sobre tecnología'
        ],
        
        personal_power: [
          'Automatizas tareas repetitivas',
          'Creas herramientas para tus necesidades específicas',
          'Entiendes cómo funcionan las aplicaciones que usas',
          'Desarrollas pensamiento lógico y estructurado'
        ]
      },

      programming_essence: {
        what_is_programming: `Programar es **enseñarle a una máquina a resolver problemas**:
- Descompones problemas complejos en pasos simples
- Defines lógica clara y sin ambigüedades
- Anticipas diferentes escenarios y casos especiales
- Creas soluciones que escalan y se mantienen`,

        core_concepts: {
          abstraction: {
            real_world: 'Como usar un carro sin entender el motor',
            programming: 'Usar funciones sin saber cómo están implementadas',
            power: 'Te permite construir sistemas complejos manejando la complejidad'
          },
          
          algorithms: {
            real_world: 'Como una receta de cocina paso a paso',
            programming: 'Secuencia de instrucciones para resolver un problema',
            power: 'Determinan la eficiencia y escalabilidad de las soluciones'
          },
          
          data_structures: {
            real_world: 'Como organizar tu closet para encontrar ropa rápido',
            programming: 'Formas de organizar datos para acceso eficiente',
            power: 'Afectan dramáticamente el rendimiento de las aplicaciones'
          }
        }
      },

      code_quality_importance: {
        readable_code: `Código legible es código **que comunica claramente su intención**:
- Nombres descriptivos que explican qué hace cada parte
- Estructura lógica que fluye naturalmente
- Comentarios que explican el "por qué", no el "qué"
- Simplicidad sobre complejidad innecesaria`,

        maintainable_code: `Código mantenible es código **que evoluciona sin romper**:
- Cambios localizados no afectan otras partes
- Nuevas funcionalidades se agregan fácilmente
- Bugs se identifican y corrigen rápidamente
- Diferentes desarrolladores pueden trabajar sin interferencia`,

        scalable_code: `Código escalable es código **que crece con el éxito**:
- Maneja 10x más usuarios sin reescribir todo
- Nuevos features no ralentizan el sistema
- Recursos se utilizan eficientemente
- Arquitectura soporta crecimiento orgánico`
      },

      modern_development: {
        agile_thinking: 'Iteración rápida, feedback temprano, adaptación continua',
        testing_mindset: 'Escribir código que se puede verificar automáticamente',
        collaboration: 'Código que otros pueden entender y mejorar',
        continuous_learning: 'Tecnología evoluciona, habilidades deben evolucionar también'
      },

      strategic_insights: [
        '**Código es activo empresarial**: Bien escrito, aumenta valor; mal escrito, es pasivo',
        '**Velocidad vs Calidad**: Código rápido y malo es más caro que código lento y bueno',
        '**Deuda técnica**: Decisiones de hoy determinan velocidad de desarrollo futuro',
        '**Automatización**: Código que escribe código multiplica productividad exponencialmente'
      ],

      learning_approach: {
        start_with_why: 'Entiende por qué existe cada concepto antes de cómo implementarlo',
        think_in_systems: 'Ve cómo las partes se conectan para crear el todo',
        practice_regularly: 'Programar es habilidad práctica, requiere ejercicio constante',
        read_great_code: 'Aprende de código bien escrito como lees buena literatura'
      }
    };
  }

  explainAlgorithms(concept, context) {
    return {
      title: '🧮 Algoritmos: Las Recetas Mágicas que Resuelven Cualquier Problema',
      
      algorithm_essence: `Un algoritmo es una **receta super precisa** para resolver problemas:
- Lista exacta de pasos a seguir
- Sin ambigüedad - cada paso está claramente definido
- Termina en tiempo finito con una respuesta
- Funciona para cualquier entrada válida del problema`,

      why_algorithms_matter: {
        efficiency_impact: [
          'Algoritmo malo: tu app tarda 10 segundos en cargar',
          'Algoritmo bueno: tu app carga en 0.1 segundos',
          'Diferencia: 100x más rápido con mejor algoritmo',
          'Escala: Con millones de usuarios, diferencia es dramática'
        ],
        
        business_impact: [
          'Google existe porque PageRank es algoritmo superior',
          'Netflix recomienda mejor contenido con algoritmos ML',
          'Amazon optimiza rutas de entrega con algoritmos',
          'Tesla hace carros autónomos con algoritmos de visión'
        ],
        
        problem_solving: [
          'Algoritmos enseñan pensamiento estructurado',
          'Descomponer problemas complejos en pasos simples',
          'Identificar patrones y reutilizar soluciones',
          'Optimizar procesos en cualquier dominio'
        ]
      },

      algorithmic_thinking: {
        pattern_recognition: {
          concept: 'Identificar problemas similares a otros ya resueltos',
          examples: [
            'Buscar algo → binary search',
            'Encontrar ruta más corta → Dijkstra',
            'Optimizar recurso limitado → greedy algorithm',
            'Dividir trabajo → divide and conquer'
          ]
        },
        
        complexity_analysis: {
          time_complexity: 'Qué tan rápido corre tu algoritmo',
          space_complexity: 'Cuánta memoria usa tu algoritmo',
          trade_offs: 'A veces cambias velocidad por memoria o viceversa',
          big_o: 'Lenguaje universal para comparar eficiencia'
        },
        
        optimization_mindset: [
          '¿Hay trabajo duplicado que puedo evitar?',
          '¿Puedo usar estructura de datos más eficiente?',
          '¿Puedo resolver problema más pequeño primero?',
          '¿Hay información que puedo precalcular?'
        ]
      },

      real_world_applications: {
        search_recommendation: {
          problem: 'Encontrar contenido relevante en billones de opciones',
          algorithms: 'PageRank, collaborative filtering, machine learning',
          impact: 'Google, Netflix, Spotify, Amazon recommendations'
        },
        
        logistics_optimization: {
          problem: 'Rutas más eficientes para entrega',
          algorithms: 'Traveling salesman, vehicle routing, graph algorithms',
          impact: 'UPS ahorra millones con ORION algorithm'
        },
        
        financial_trading: {
          problem: 'Detectar patrones y oportunidades en mercados',
          algorithms: 'High-frequency trading, risk assessment, fraud detection',
          impact: 'Algoritmos manejan mayoría del trading global'
        },
        
        social_networks: {
          problem: 'Conectar personas y contenido relevante',
          algorithms: 'Graph algorithms, news feed ranking, community detection',
          impact: 'Facebook, LinkedIn, Twitter feeds'
        }
      },

      learning_journey: {
        beginner_algorithms: [
          'Linear search - buscar elemento en lista',
          'Binary search - buscar en lista ordenada',
          'Bubble sort - ordenar elementos',
          'Factorial - multiplicar números secuenciales'
        ],
        
        intermediate_patterns: [
          'Two pointers - resolver problemas de arrays',
          'Sliding window - problemas de subarrays',
          'Recursion - problemas que se dividen en subproblemas',
          'Dynamic programming - optimización con subproblemas'
        ],
        
        advanced_concepts: [
          'Graph algorithms - redes y relaciones',
          'Machine learning algorithms - patrones en datos',
          'Distributed algorithms - sistemas a gran escala',
          'Approximation algorithms - soluciones casi óptimas'
        ]
      },

      strategic_value: `**¿Por qué entender algoritmos te da superpoderes?**
- **Solución de problemas**: Approach sistemático para cualquier desafío
- **Optimización**: Encontrar la forma más eficiente de hacer algo
- **Pensamiento escalable**: Soluciones que funcionan para 1 o 1 millón
- **Ventaja competitiva**: Algoritmos superiores = productos superiores
- **Automatización inteligente**: Crear sistemas que mejoran automáticamente`
    };
  }

  explainSoftwareDesign(concept, context) {
    return {
      title: '🏗️ Diseño de Software: Arquitectura para el Mundo Digital',
      
      design_philosophy: `Diseño de software es como **arquitectura para sistemas digitales**:
- Planifica estructura antes de construir
- Balancea funcionalidad, mantenibilidad y eficiencia  
- Considera cómo el sistema evolucionará con el tiempo
- Anticipa necesidades futuras sin sobre-ingeniería`,

      why_design_matters: {
        business_impact: [
          'Buen diseño = desarrollo rápido de nuevas features',
          'Mal diseño = cada cambio rompe algo más',
          'Arquitectura escalable = crecimiento sin límites técnicos',
          'Código mantenible = menores costos operacionales'
        ],
        
        team_productivity: [
          'Desarrolladores entienden código rápidamente',
          'Nuevos miembros se integran eficientemente',
          'Bugs se localizan y corrigen fácilmente',
          'Testing y deployment son procesos simples'
        ],
        
        user_experience: [
          'Aplicaciones responden rápidamente',
          'Features funcionan de manera consistente',
          'Sistema es confiable y disponible',
          'Nuevas funcionalidades mejoran la experiencia'
        ]
      },

      design_principles: {
        solid_principles: {
          single_responsibility: {
            concept: 'Cada clase/módulo tiene una sola razón para cambiar',
            real_world: 'Chef cocina, mesero sirve, cajero cobra - cada uno su trabajo',
            benefit: 'Cambios localizados, fácil entender y testear'
          },
          
          open_closed: {
            concept: 'Abierto para extensión, cerrado para modificación',
            real_world: 'Smartphone acepta nuevas apps sin modificar hardware',
            benefit: 'Agregar features sin romper código existente'
          },
          
          dependency_inversion: {
            concept: 'Depende de abstracciones, no de implementaciones concretas',
            real_world: 'Carro funciona con cualquier gasolina, no una marca específica',
            benefit: 'Flexibilidad para cambiar componentes'
          }
        },

        modularity: {
          high_cohesion: 'Elementos relacionados juntos',
          low_coupling: 'Mínimas dependencias entre módulos',
          encapsulation: 'Esconde complejidad interna',
          interface_design: 'Contratos claros entre componentes'
        }
      },

      architectural_patterns: {
        layered_architecture: {
          concept: 'Organiza código en capas horizontales',
          example: 'Presentation → Business Logic → Data Access → Database',
          benefits: 'Separación clara, reutilización, testing independiente'
        },
        
        microservices: {
          concept: 'Aplicación como conjunto de servicios pequeños',
          benefits: 'Escalabilidad independiente, diversidad tecnológica',
          challenges: 'Complejidad de distribución, consistencia de datos'
        },
        
        mvc: {
          concept: 'Separa datos, lógica y presentación',
          components: 'Model (datos), View (UI), Controller (lógica)',
          benefit: 'Desarrollo paralelo, múltiples interfaces'
        }
      },

      design_patterns: {
        creational: 'Cómo crear objetos de manera flexible',
        structural: 'Cómo componer objetos en estructuras grandes',
        behavioral: 'Cómo objetos colaboran y comunican',
        value: 'Soluciones probadas a problemas comunes'
      },

      quality_attributes: {
        performance: 'Qué tan rápido responde el sistema',
        scalability: 'Capacidad de manejar carga creciente',
        reliability: 'Funciona consistentemente sin fallos',
        maintainability: 'Facilidad para modificar y evolucionar',
        security: 'Protección contra amenazas y vulnerabilidades',
        usability: 'Facilidad de uso para usuarios finales'
      },

      strategic_thinking: `**Diseño como Ventaja Competitiva:**
- **Velocidad de desarrollo**: Arquitectura bien diseñada acelera nuevas features
- **Costo de mantenimiento**: Buen diseño reduce costos a largo plazo
- **Escalabilidad**: Permite crecimiento sin reescribir todo
- **Adaptabilidad**: Facilita pivots y cambios de estrategia
- **Calidad**: Usuarios prefieren aplicaciones bien diseñadas`
    };
  }

  explainCodeQuality(concept, context) {
    return {
      title: '✨ Calidad de Código: La Diferencia Entre Éxito y Fracaso Técnico',
      
      quality_essence: `Código de calidad es como **una casa bien construida**:
- Estructura sólida que resiste el tiempo
- Fácil de navegar y entender
- Modificaciones no causan colapsos
- Incrementa valor con el tiempo en lugar de deteriorarse`,

      quality_dimensions: {
        readability: {
          importance: 'Código se lee 10x más de lo que se escribe',
          principles: [
            'Nombres descriptivos que revelan intención',
            'Funciones pequeñas que hacen una cosa bien',
            'Estructura lógica y flujo natural',
            'Comentarios explican el "por qué", no el "qué"'
          ],
          impact: 'Desarrolladores nuevos son productivos rápidamente'
        },
        
        maintainability: {
          importance: 'Software exitoso evoluciona constantemente',
          characteristics: [
            'Cambios localizados no afectan otras partes',
            'Nuevas features se agregan sin refactoring masivo',
            'Bugs se identifican y corrigen eficientemente',
            'Código se puede entender meses después de escribirlo'
          ],
          impact: 'Velocidad de desarrollo se mantiene alta'
        },
        
        reliability: {
          importance: 'Usuarios no toleran aplicaciones que fallan',
          practices: [
            'Testing exhaustivo en múltiples niveles',
            'Manejo elegante de errores y casos edge',
            'Validación rigurosa de inputs',
            'Monitoring y logging para detectar problemas'
          ],
          impact: 'Confianza del usuario y reputación del producto'
        },
        
        performance: {
          importance: 'Velocidad afecta directamente experiencia de usuario',
          considerations: [
            'Algoritmos eficientes para operaciones críticas',
            'Uso apropiado de estructuras de datos',
            'Optimización de queries de base de datos',
            'Caching inteligente de datos frecuentes'
          ],
          impact: 'Retención de usuarios y costos de infraestructura'
        }
      },

      technical_debt: {
        concept: 'Costo futuro de decisiones técnicas expeditas hoy',
        causes: [
          'Presión de tiempo para lanzar features',
          'Falta de conocimiento o experiencia',
          'Requisitos que cambian constantemente',
          'No invertir en refactoring regular'
        ],
        consequences: [
          'Desarrollo progresivamente más lento',
          'Mayor frecuencia de bugs',
          'Dificultad para onboarding nuevos desarrolladores',
          'Eventual necesidad de reescribir sistema'
        ],
        management: [
          'Hacer deuda técnica visible y medible',
          'Dedicar tiempo regular a refactoring',
          'Balancear features nuevas con mejoras técnicas',
          'Invertir en herramientas y procesos de calidad'
        ]
      },

      testing_strategy: {
        unit_tests: {
          purpose: 'Verificar comportamiento de componentes individuales',
          benefits: 'Rápidos, confiables, fáciles de debuggear',
          best_practices: 'Independientes, determinísticos, bien nombrados'
        },
        
        integration_tests: {
          purpose: 'Verificar interacciones entre componentes',
          scope: 'Bases de datos, APIs externas, servicios',
          trade_offs: 'Más realistas pero más lentos y frágiles'
        },
        
        end_to_end_tests: {
          purpose: 'Verificar flujos completos desde perspectiva de usuario',
          value: 'Confianza en que features funcionan completamente',
          challenges: 'Lentos, frágiles, difíciles de mantener'
        }
      },

      code_review: {
        benefits: [
          'Detectar bugs antes de producción',
          'Compartir conocimiento entre equipo',
          'Mantener estándares de calidad',
          'Mentoría y aprendizaje continuo'
        ],
        
        best_practices: [
          'Reviews pequeños y frecuentes',
          'Enfoque en código, no en persona',
          'Feedback constructivo y específico',
          'Balance entre thoroughness y velocity'
        ]
      },

      business_impact: `**¿Por qué calidad de código es inversión estratégica?**
- **Velocidad sostenible**: Calidad permite mantener velocidad de desarrollo
- **Costos predecibles**: Evita sorpresas costosas y refactoring masivo  
- **Confiabilidad**: Productos de calidad generan confianza del usuario
- **Competitividad**: Permite innovar rápido mientras competidores luchan con deuda técnica
- **Escalabilidad**: Código de calidad escala con crecimiento del negocio`,

      cultural_aspects: {
        craftsmanship: 'Orgullo en crear código excelente',
        continuous_improvement: 'Siempre buscar formas de mejorar',
        shared_ownership: 'Todo el equipo responsable por calidad',
        learning_culture: 'Aprender de errores y compartir conocimiento'
      }
    };
  }

  explainProgrammingGeneral(concept, context) {
    return {
      title: '🚀 El Poder Transformador de Entender Programación',
      
      programming_reality: `La programación NO es solo escribir código. Es **la habilidad fundamental del siglo XXI**:
- Automatizar cualquier tarea repetitiva
- Crear herramientas que amplifican tu productividad
- Entender cómo funciona realmente la tecnología
- Desarrollar pensamiento lógico y sistemático`,

      universal_applications: {
        business_automation: [
          'Automatizar reportes y análisis de datos',
          'Integrar sistemas diferentes automáticamente',
          'Crear dashboards para tomar decisiones',
          'Optimizar procesos operacionales'
        ],
        
        personal_productivity: [
          'Scripts para organizar archivos automáticamente',
          'Herramientas para analizar finanzas personales',
          'Automatización de tareas administrativas',
          'Sistemas personalizados de productividad'
        ],
        
        creative_expression: [
          'Arte generativo y visualizaciones',
          'Música algorítmica y soundscapes',
          'Storytelling interactivo',
          'Juegos y experiencias inmersivas'
        ]
      },

      thinking_skills: {
        logical_reasoning: 'Estructurar problemas complejos en pasos lógicos',
        pattern_recognition: 'Identificar similitudes y reutilizar soluciones',
        abstraction: 'Enfocarse en elementos esenciales ignorando detalles',
        systematic_approach: 'Methodology consistente para resolver problemas',
        debugging_mindset: 'Encontrar y corregir errores de manera eficiente'
      },

      career_advantages: [
        'Comunicación efectiva con equipos técnicos',
        'Evaluación informada de soluciones tecnológicas',
        'Identificación de oportunidades de automatización',
        'Desarrollo de productos digitales',
        'Liderazgo en transformación digital'
      ],

      learning_path: {
        start_practical: 'Comienza automatizando algo que hagas manualmente',
        build_projects: 'Crea herramientas que resuelvan tus problemas reales',
        understand_principles: 'Aprende los conceptos fundamentales detrás del código',
        connect_domains: 'Aplica programación a tus areas de expertise existentes'
      }
    };
  }

  // Method to analyze code quality
  analyzeCodeQuality(codeSnippet, context = {}) {
    return {
      readability_score: this.assessReadability(codeSnippet),
      maintainability_issues: this.identifyMaintainabilityIssues(codeSnippet),
      performance_concerns: this.identifyPerformanceConcerns(codeSnippet),
      security_vulnerabilities: this.identifySecurityIssues(codeSnippet),
      best_practice_violations: this.identifyBestPracticeViolations(codeSnippet),
      improvement_suggestions: this.generateImprovementSuggestions(codeSnippet)
    };
  }

  // Method to recommend programming tools and practices
  recommendTools(useCase, context = {}) {
    return {
      development_environment: this.recommendDevelopmentEnvironment(useCase),
      frameworks_libraries: this.recommendFrameworks(useCase),
      testing_tools: this.recommendTestingTools(useCase),
      deployment_tools: this.recommendDeploymentTools(useCase),
      monitoring_tools: this.recommendMonitoringTools(useCase)
    };
  }

  // Utility methods for code analysis
  assessReadability(code) {
    if (!code || typeof code !== 'string') {
      return { score: 0, issues: ['No code provided'] };
    }

    const issues = [];
    let score = 1.0;

    // Check for long lines
    const lines = code.split('\n');
    const longLines = lines.filter(line => line.length > 120);
    if (longLines.length > 0) {
      issues.push(`${longLines.length} línea(s) muy larga(s) (>120 caracteres)`);
      score -= 0.1;
    }

    // Check for deep nesting
    const maxIndentation = Math.max(...lines.map(line => {
      const match = line.match(/^[\s]*/);
      return match ? match[0].length : 0;
    }));
    if (maxIndentation > 16) {
      issues.push('Anidamiento profundo detectado');
      score -= 0.15;
    }

    // Check for meaningful variable names (very simple heuristic)
    const shortVarPattern = /\b[a-z]\b(?!\s*[=:])/gi;
    const shortVars = code.match(shortVarPattern);
    if (shortVars && shortVars.length > 3) {
      issues.push('Uso de nombres de variables de una sola letra');
      score -= 0.1;
    }

    // Check for comments
    const commentPattern = /\/\/|\/\*|\*\/|#/g;
    const hasComments = commentPattern.test(code);
    if (!hasComments && lines.length > 20) {
      issues.push('Código largo sin comentarios');
      score -= 0.1;
    }


    };
  }

  identifyMaintainabilityIssues(code) {
    if (!code || typeof code !== 'string') return [];

    const issues = [];
    const lines = code.split('\n');

    // Check for function/method length
    const functionMatches = code.match(/function\s+\w+\s*\([^)]*\)\s*{|=>\s*{|^\s*\w+\s*\([^)]*\)\s*{/gm);
    if (functionMatches) {
      functionMatches.forEach(match => {
        const startIndex = code.indexOf(match);
        let braceCount = 1;
        let endIndex = startIndex + match.length;

        while (braceCount > 0 && endIndex < code.length) {
          if (code[endIndex] === '{') braceCount++;
          if (code[endIndex] === '}') braceCount--;
          endIndex++;
        }
        const functionLines = code.substring(startIndex, endIndex).split('\n').length;
        if (functionLines > 50) {
          issues.push(`Función/método muy largo (${functionLines} líneas)`);
        }
      });
    }

    // Check for code duplication patterns
    const duplicatePattern = /(.{20,})\1/g;
    if (duplicatePattern.test(code)) {
      issues.push('Posible duplicación de código detectada');
    }

    // Check for magic numbers
    const magicNumberPattern = /[^a-zA-Z_](\d{2,})[^a-zA-Z_\d]/g;
    const magicNumbers = code.match(magicNumberPattern);
    if (magicNumbers && magicNumbers.length > 3) {
      issues.push('Números "mágicos" sin explicación (considere usar constantes)');
    }

    return issues.length > 0 ? issues : ['Sin problemas evidentes de mantenibilidad'];
  }

  identifyPerformanceConcerns(code) {
    if (!code || typeof code !== 'string') return [];

    const concerns = [];

    // Check for nested loops
    const forLoopPattern = /for\s*\(/g;
    const whileLoopPattern = /while\s*\(/g;
    const forEachPattern = /\.forEach\s*\(/g;
    const mapPattern = /\.map\s*\(/g;

    const loopMatches = [
      ...(code.match(forLoopPattern) || []),
      ...(code.match(whileLoopPattern) || []),
      ...(code.match(forEachPattern) || []),
      ...(code.match(mapPattern) || [])
    ];

    if (loopMatches.length > 2) {
      // Simple heuristic: if there are multiple loops, check for nesting
      const lines = code.split('\n');
      let inLoop = 0;
      for (const line of lines) {
        if (/for\s*\(|while\s*\(|\.forEach|\.map/.test(line)) inLoop++;
        if (inLoop > 1) {
          concerns.push('Bucles anidados detectados - considere optimización');
          break;
        }
        if (line.includes('}')) inLoop = Math.max(0, inLoop - 1);
      }
    }

    // Check for synchronous operations in loops
    if (/for|while/.test(code) && /await\s+/.test(code)) {
      concerns.push('Operaciones asíncronas en bucles - considere Promise.all()');
    }

    // Check for multiple DOM queries
    const domQueryPattern = /document\.(getElementById|querySelector|getElementsBy)/g;
    const domQueries = code.match(domQueryPattern);
    if (domQueries && domQueries.length > 5) {
      concerns.push('Múltiples consultas DOM - considere cachear referencias');
    }

    // Check for inefficient array operations
    if (/\.filter\s*\(.*\)\.map\s*\(/g.test(code)) {
      concerns.push('Operaciones encadenadas filter().map() - considere combinarlas');
    }

    return concerns.length > 0 ? concerns : ['Sin preocupaciones evidentes de rendimiento'];
  }

  identifySecurityIssues(code) {
    if (!code || typeof code !== 'string') return [];

    const issues = [];

    // Check for SQL injection vulnerabilities
    if (/SELECT.*\+|INSERT.*\+|UPDATE.*\+|DELETE.*\+/.test(code)) {
      issues.push('Posible vulnerabilidad de inyección SQL (concatenación de strings en queries)');
    }

    // Check for eval usage
    if (/\beval\s*\(/.test(code)) {
      issues.push('Uso de eval() - riesgo de seguridad crítico');
    }

    // Check for innerHTML without sanitization
    if (/\.innerHTML\s*=/.test(code) && !/sanitize|escape|DOMPurify/.test(code)) {
      issues.push('Uso de innerHTML sin sanitización - riesgo XSS');
    }

    // Check for hardcoded credentials
    if (/password\s*[=:]\s*['"][^'"]+['"]|api[_-]?key\s*[=:]\s*['"][^'"]+['"]/i.test(code)) {
      issues.push('Posibles credenciales hardcodeadas en el código');
    }

    // Check for console.log with sensitive data
    if (/console\.log\s*\([^)]*password|console\.log\s*\([^)]*token|console\.log\s*\([^)]*key/i.test(code)) {
      issues.push('console.log() con posibles datos sensibles');
    }

    // Check for missing input validation
    if (/function.*\(.*\)|=>\s*{/.test(code) && !/if\s*\(.*null|if\s*\(.*undefined|validate|check/.test(code)) {
      issues.push('Falta validación de entrada en funciones');
    }

    return issues.length > 0 ? issues : ['Sin vulnerabilidades evidentes detectadas'];
  }

  identifyBestPracticeViolations(code) {
    return ['No error handling', 'Hard-coded values'];
  }

  generateImprovementSuggestions(code) {
    return [
      'Extract complex logic into separate methods',
      'Add input validation',
      'Implement proper error handling',
      'Use constants for magic numbers'
    ];
  }

  recommendDevelopmentEnvironment(useCase) {
    return ['Visual Studio Code', 'IntelliJ IDEA', 'Sublime Text'];
  }

  recommendFrameworks(useCase) {
    return ['React for frontend', 'Express.js for backend', 'Jest for testing'];
  }

  recommendTestingTools(useCase) {
    return ['Jest for unit testing', 'Cypress for e2e testing'];
  }

  recommendDeploymentTools(useCase) {
    return ['Docker for containerization', 'GitHub Actions for CI/CD'];
  }

  recommendMonitoringTools(useCase) {
    return ['New Relic for APM', 'Sentry for error tracking'];
  }
}

// Create and export singleton instance
const codeIntelligenceService = new CodeIntelligenceService();
export default codeIntelligenceService;