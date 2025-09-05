// Document Analysis Service - Comprehensive document verification, analysis, and intelligence
class DocumentAnalysisService {
  constructor() {
    this.analysisHistory = [];
    this.verificationRules = new Map();
    this.documentTypes = new Map();
    this.intelligentScanning = true;
    this.analysisMetrics = {
      totalAnalyzed: 0,
      totalVerified: 0,
      averageConfidence: 0,
      documentCategories: new Map()
    };
    
    this.initializeVerificationRules();
    this.initializeDocumentTypes();
    this.startContinuousAnalysis();
  }

  // Initialize verification rules for different document types
  initializeVerificationRules() {
    this.verificationRules.set('code', {
      extensions: ['.js', '.ts', '.py', '.css', '.html', '.json'],
      checks: ['syntax_validation', 'best_practices', 'security_scan', 'performance_check'],
      requiredElements: ['proper_indentation', 'comments', 'error_handling'],
      qualityMetrics: ['readability', 'maintainability', 'efficiency']
    });

    this.verificationRules.set('documentation', {
      extensions: ['.md', '.txt', '.doc', '.pdf'],
      checks: ['grammar_check', 'completeness', 'structure_analysis', 'clarity_assessment'],
      requiredElements: ['clear_headings', 'proper_formatting', 'examples'],
      qualityMetrics: ['comprehensiveness', 'accuracy', 'usefulness']
    });

    this.verificationRules.set('configuration', {
      extensions: ['.json', '.yaml', '.yml', '.xml', '.config'],
      checks: ['schema_validation', 'security_review', 'compatibility_check'],
      requiredElements: ['valid_structure', 'required_fields', 'proper_values'],
      qualityMetrics: ['correctness', 'security', 'maintainability']
    });

    this.verificationRules.set('data', {
      extensions: ['.csv', '.xlsx', '.json', '.sql'],
      checks: ['data_integrity', 'format_validation', 'consistency_check'],
      requiredElements: ['proper_headers', 'valid_data_types', 'no_corruption'],
      qualityMetrics: ['completeness', 'accuracy', 'consistency']
    });
  }

  // Initialize document type detection patterns
  initializeDocumentTypes() {
    this.documentTypes.set('research_paper', {
      indicators: ['abstract', 'introduction', 'methodology', 'results', 'conclusion'],
      structure: 'academic',
      analysisDepth: 'comprehensive'
    });

    this.documentTypes.set('technical_documentation', {
      indicators: ['api', 'function', 'class', 'method', 'parameter'],
      structure: 'technical',
      analysisDepth: 'detailed'
    });

    this.documentTypes.set('business_document', {
      indicators: ['executive summary', 'revenue', 'strategy', 'market'],
      structure: 'business',
      analysisDepth: 'strategic'
    });

    this.documentTypes.set('educational_content', {
      indicators: ['learning objective', 'exercise', 'example', 'tutorial'],
      structure: 'educational',
      analysisDepth: 'pedagogical'
    });
  }

  // Start continuous document analysis
  startContinuousAnalysis() {
    // Monitor for new documents to analyze
    setInterval(() => {
      this.scanForNewDocuments();
    }, 300000); // Every 5 minutes

    // Perform periodic verification of existing documents
    setInterval(() => {
      this.performPeriodicVerification();
    }, 1800000); // Every 30 minutes

    console.log('📄 Document analysis service started with continuous monitoring');
  }

  // Comprehensive document analysis
  async analyzeDocument(documentPath, content = null, options = {}) {
    const analysisStart = Date.now();
    
    try {
      const analysis = {
        id: `analysis_${Date.now()}`,
        documentPath: documentPath,
        timestamp: new Date(),
        type: this.detectDocumentType(documentPath, content),
        verification: await this.verifyDocument(documentPath, content),
        qualityAssessment: await this.assessDocumentQuality(documentPath, content),
        intelligentInsights: await this.generateIntelligentInsights(documentPath, content),
        improvementSuggestions: [],
        confidence: 0,
        analysisTime: 0
      };

      // Generate improvement suggestions
      analysis.improvementSuggestions = this.generateImprovementSuggestions(analysis);
      
      // Calculate overall confidence
      analysis.confidence = this.calculateAnalysisConfidence(analysis);
      
      // Record analysis time
      analysis.analysisTime = Date.now() - analysisStart;

      // Store analysis
      this.analysisHistory.push(analysis);
      this.updateMetrics(analysis);

      console.log(`📊 Document analysis completed: ${documentPath} (${analysis.analysisTime}ms)`);
      
      return {
        success: true,
        analysis: analysis,
        summary: this.generateAnalysisSummary(analysis)
      };

    } catch (error) {
      console.error('Error analyzing document:', error);
      return {
        success: false,
        error: error.message,
        documentPath: documentPath
      };
    }
  }

  // Detect document type based on path and content
  detectDocumentType(documentPath, content) {
    const extension = this.getFileExtension(documentPath);
    const fileName = this.getFileName(documentPath);
    
    // First check by extension
    for (const [type, rules] of this.verificationRules) {
      if (rules.extensions.includes(extension)) {
        return type;
      }
    }

    // Then check by content patterns if available
    if (content) {
      for (const [type, patterns] of this.documentTypes) {
        const matchCount = patterns.indicators.filter(indicator => 
          content.toLowerCase().includes(indicator.toLowerCase())
        ).length;
        
        if (matchCount >= 2) {
          return type;
        }
      }
    }

    // Check by filename patterns
    if (fileName.toLowerCase().includes('readme')) return 'documentation';
    if (fileName.toLowerCase().includes('config')) return 'configuration';
    if (fileName.toLowerCase().includes('test')) return 'code';

    return 'unknown';
  }

  // Verify document according to its type
  async verifyDocument(documentPath, content) {
    const documentType = this.detectDocumentType(documentPath, content);
    const rules = this.verificationRules.get(documentType);
    
    if (!rules) {
      return {
        status: 'unverifiable',
        reason: 'No verification rules for document type',
        checks: []
      };
    }

    const verification = {
      status: 'verified',
      checks: [],
      issues: [],
      warnings: [],
      score: 0
    };

    // Perform verification checks
    for (const check of rules.checks) {
      const checkResult = await this.performVerificationCheck(check, documentPath, content, documentType);
      verification.checks.push(checkResult);
      
      if (checkResult.status === 'failed') {
        verification.issues.push(checkResult);
      } else if (checkResult.status === 'warning') {
        verification.warnings.push(checkResult);
      }
    }

    // Calculate verification score
    const totalChecks = verification.checks.length;
    const passedChecks = verification.checks.filter(check => check.status === 'passed').length;
    verification.score = totalChecks > 0 ? (passedChecks / totalChecks) * 100 : 0;

    // Set overall status
    if (verification.issues.length > 0) {
      verification.status = verification.score < 50 ? 'failed' : 'partial';
    }

    return verification;
  }

  // Perform individual verification check
  async performVerificationCheck(checkType, documentPath, content, documentType) {
    const check = {
      type: checkType,
      status: 'passed',
      message: '',
      details: {},
      timestamp: new Date()
    };

    try {
      switch (checkType) {
        case 'syntax_validation':
          return this.validateSyntax(documentPath, content);
          
        case 'best_practices':
          return this.checkBestPractices(documentPath, content, documentType);
          
        case 'security_scan':
          return this.performSecurityScan(documentPath, content);
          
        case 'grammar_check':
          return this.checkGrammar(content);
          
        case 'completeness':
          return this.checkCompleteness(content, documentType);
          
        case 'structure_analysis':
          return this.analyzeStructure(content, documentType);
          
        case 'data_integrity':
          return this.checkDataIntegrity(content);
          
        default:
          check.status = 'skipped';
          check.message = `Check type '${checkType}' not implemented`;
      }
    } catch (error) {
      check.status = 'error';
      check.message = `Error performing ${checkType}: ${error.message}`;
    }

    return check;
  }

  // Validate syntax for code files
  validateSyntax(documentPath, content) {
    const extension = this.getFileExtension(documentPath);
    const check = {
      type: 'syntax_validation',
      status: 'passed',
      message: 'Syntax validation completed',
      details: {}
    };

    try {
      switch (extension) {
        case '.json':
          try {
            JSON.parse(content || '{}');
            check.message = 'Valid JSON syntax';
          } catch (error) {
            check.status = 'failed';
            check.message = `Invalid JSON: ${error.message}`;
          }
          break;
          
        case '.js':
        case '.ts':
          // Simulate JavaScript/TypeScript syntax checking
          const jsIssues = this.findJavaScriptSyntaxIssues(content || '');
          if (jsIssues.length > 0) {
            check.status = 'warning';
            check.message = `Found ${jsIssues.length} potential syntax issues`;
            check.details.issues = jsIssues;
          }
          break;
          
        case '.css':
          const cssIssues = this.findCSSIssues(content || '');
          if (cssIssues.length > 0) {
            check.status = 'warning';
            check.message = `Found ${cssIssues.length} CSS issues`;
            check.details.issues = cssIssues;
          }
          break;
          
        default:
          check.status = 'skipped';
          check.message = `Syntax validation not available for ${extension}`;
      }
    } catch (error) {
      check.status = 'error';
      check.message = `Syntax validation error: ${error.message}`;
    }

    return check;
  }

  // Find JavaScript syntax issues (simplified)
  findJavaScriptSyntaxIssues(content) {
    const issues = [];
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      // Check for common issues
      if (line.includes('console.log') && !line.includes('//')) {
        issues.push({
          line: index + 1,
          issue: 'Console.log found - consider removing for production',
          severity: 'warning'
        });
      }
      
      if (line.includes('var ') && !line.includes('//')) {
        issues.push({
          line: index + 1,
          issue: 'Use let/const instead of var',
          severity: 'suggestion'
        });
      }
      
      // Check for missing semicolons
      if (line.trim().match(/^(let|const|var|\w+\s*=).*[^;{}\s]$/)) {
        issues.push({
          line: index + 1,
          issue: 'Missing semicolon',
          severity: 'warning'
        });
      }
    });
    
    return issues;
  }

  // Find CSS issues (simplified)
  findCSSIssues(content) {
    const issues = [];
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      // Check for common CSS issues
      if (line.includes('!important') && !line.includes('/*')) {
        issues.push({
          line: index + 1,
          issue: 'Avoid using !important',
          severity: 'warning'
        });
      }
      
      if (line.includes('position: absolute') && !line.includes('/*')) {
        issues.push({
          line: index + 1,
          issue: 'Consider if absolute positioning is necessary',
          severity: 'suggestion'
        });
      }
    });
    
    return issues;
  }

  // Check best practices
  checkBestPractices(documentPath, content, documentType) {
    const check = {
      type: 'best_practices',
      status: 'passed',
      message: 'Best practices check completed',
      details: {
        recommendations: [],
        violations: []
      }
    };

    if (!content) {
      check.status = 'skipped';
      check.message = 'No content to analyze';
      return check;
    }

    const extension = this.getFileExtension(documentPath);
    
    // Check based on file type
    switch (extension) {
      case '.js':
      case '.ts':
        this.checkJavaScriptBestPractices(content, check);
        break;
        
      case '.css':
        this.checkCSSBestPractices(content, check);
        break;
        
      case '.md':
        this.checkMarkdownBestPractices(content, check);
        break;
        
      case '.json':
        this.checkJSONBestPractices(content, check);
        break;
    }

    // Set status based on violations
    if (check.details.violations.length > 3) {
      check.status = 'warning';
      check.message = `Found ${check.details.violations.length} best practice violations`;
    }

    return check;
  }

  // Check JavaScript best practices
  checkJavaScriptBestPractices(content, check) {
    const lines = content.split('\n');
    
    // Check for function documentation
    const functionPattern = /function\s+\w+|const\s+\w+\s*=/;
    let functionsFound = 0;
    let documentedFunctions = 0;
    
    lines.forEach((line, index) => {
      if (functionPattern.test(line)) {
        functionsFound++;
        // Check if previous lines contain comments
        if (index > 0 && lines[index - 1].trim().startsWith('//')) {
          documentedFunctions++;
        }
      }
    });
    
    if (functionsFound > 0 && documentedFunctions / functionsFound < 0.5) {
      check.details.violations.push('Less than 50% of functions are documented');
    }
    
    // Check for error handling
    const hasErrorHandling = content.includes('try') || content.includes('catch') || content.includes('.catch(');
    if (!hasErrorHandling && content.length > 500) {
      check.details.violations.push('No error handling detected in substantial code');
    }
    
    // Recommendations
    check.details.recommendations.push('Add JSDoc comments for functions');
    check.details.recommendations.push('Implement error handling');
    check.details.recommendations.push('Use consistent naming conventions');
  }

  // Check CSS best practices
  checkCSSBestPractices(content, check) {
    // Check for organization
    if (!content.includes('/* ') && content.length > 200) {
      check.details.violations.push('No comments found for organization');
    }
    
    // Check for responsive design
    if (!content.includes('@media') && content.length > 300) {
      check.details.violations.push('No responsive design patterns detected');
    }
    
    check.details.recommendations.push('Add comments for CSS sections');
    check.details.recommendations.push('Use responsive design patterns');
    check.details.recommendations.push('Consider CSS methodologies like BEM');
  }

  // Check Markdown best practices
  checkMarkdownBestPractices(content, check) {
    const lines = content.split('\n');
    
    // Check for proper headings structure
    const headings = lines.filter(line => line.trim().startsWith('#'));
    if (headings.length === 0 && content.length > 200) {
      check.details.violations.push('No headings found in substantial content');
    }
    
    // Check for table of contents in long documents
    if (content.length > 2000 && !content.toLowerCase().includes('table of contents')) {
      check.details.recommendations.push('Consider adding table of contents for long document');
    }
    
    check.details.recommendations.push('Use consistent heading hierarchy');
    check.details.recommendations.push('Add code blocks with language specification');
  }

  // Check JSON best practices
  checkJSONBestPractices(content, check) {
    try {
      const parsed = JSON.parse(content);
      
      // Check for proper structure
      if (typeof parsed === 'object' && parsed !== null) {
        // Check for required fields in common JSON types
        if ('name' in parsed && 'version' in parsed) {
          // Looks like package.json
          if (!('description' in parsed)) {
            check.details.recommendations.push('Add description field');
          }
        }
      }
    } catch (error) {
      check.details.violations.push('Invalid JSON structure');
    }
  }

  // Perform security scan
  performSecurityScan(documentPath, content) {
    const check = {
      type: 'security_scan',
      status: 'passed',
      message: 'Security scan completed',
      details: {
        vulnerabilities: [],
        warnings: [],
        recommendations: []
      }
    };

    if (!content) {
      check.status = 'skipped';
      return check;
    }

    // Check for common security issues
    const securityPatterns = {
      'hardcoded_password': /password\s*=\s*["'][^"']+["']/gi,
      'api_key': /api[_-]?key\s*=\s*["'][^"']+["']/gi,
      'secret': /secret\s*=\s*["'][^"']+["']/gi,
      'token': /token\s*=\s*["'][^"']+["']/gi,
      'sql_injection': /(select|insert|update|delete).*\+.*['"]/gi,
      'xss_vulnerable': /innerHTML\s*=\s*[^"']*\+/gi
    };

    Object.entries(securityPatterns).forEach(([vuln, pattern]) => {
      const matches = content.match(pattern);
      if (matches) {
        check.details.vulnerabilities.push({
          type: vuln,
          matches: matches.length,
          severity: this.getVulnerabilitySeverity(vuln)
        });
      }
    });

    // Set status based on findings
    if (check.details.vulnerabilities.length > 0) {
      const criticalVulns = check.details.vulnerabilities.filter(v => v.severity === 'critical');
      check.status = criticalVulns.length > 0 ? 'failed' : 'warning';
      check.message = `Found ${check.details.vulnerabilities.length} potential security issues`;
    }

    // Add recommendations
    check.details.recommendations.push('Store secrets in environment variables');
    check.details.recommendations.push('Use parameterized queries for database operations');
    check.details.recommendations.push('Sanitize user input');

    return check;
  }

  // Get vulnerability severity
  getVulnerabilitySeverity(vulnType) {
    const severityMap = {
      'hardcoded_password': 'critical',
      'api_key': 'critical',
      'secret': 'critical',
      'token': 'high',
      'sql_injection': 'critical',
      'xss_vulnerable': 'high'
    };
    
    return severityMap[vulnType] || 'medium';
  }

  // Check grammar (simplified)
  checkGrammar(content) {
    const check = {
      type: 'grammar_check',
      status: 'passed',
      message: 'Grammar check completed',
      details: {
        issues: [],
        suggestions: []
      }
    };

    if (!content) {
      check.status = 'skipped';
      return check;
    }

    // Simple grammar checks
    const sentences = content.split(/[.!?]+/);
    
    sentences.forEach((sentence, index) => {
      const trimmed = sentence.trim();
      
      // Check for very long sentences
      if (trimmed.split(' ').length > 30) {
        check.details.issues.push({
          sentence: index + 1,
          issue: 'Very long sentence - consider breaking up',
          severity: 'suggestion'
        });
      }
      
      // Check for repeated words
      const words = trimmed.toLowerCase().split(' ');
      const wordCounts = {};
      words.forEach(word => {
        if (word.length > 3) {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      });
      
      Object.entries(wordCounts).forEach(([word, count]) => {
        if (count > 3) {
          check.details.issues.push({
            sentence: index + 1,
            issue: `Word "${word}" repeated ${count} times`,
            severity: 'warning'
          });
        }
      });
    });

    if (check.details.issues.length > 0) {
      check.status = 'warning';
      check.message = `Found ${check.details.issues.length} grammar/style issues`;
    }

    return check;
  }

  // Check document completeness
  checkCompleteness(content, documentType) {
    const check = {
      type: 'completeness',
      status: 'passed',
      message: 'Completeness check completed',
      details: {
        missing: [],
        present: [],
        score: 0
      }
    };

    if (!content) {
      check.status = 'failed';
      check.message = 'Document is empty';
      return check;
    }

    const typePatterns = this.documentTypes.get(documentType);
    if (typePatterns) {
      const required = typePatterns.indicators;
      const contentLower = content.toLowerCase();
      
      required.forEach(indicator => {
        if (contentLower.includes(indicator.toLowerCase())) {
          check.details.present.push(indicator);
        } else {
          check.details.missing.push(indicator);
        }
      });
      
      check.details.score = (check.details.present.length / required.length) * 100;
      
      if (check.details.score < 60) {
        check.status = 'warning';
        check.message = `Document appears incomplete (${check.details.score.toFixed(0)}% of expected elements found)`;
      }
    }

    return check;
  }

  // Analyze document structure
  analyzeStructure(content, documentType) {
    const check = {
      type: 'structure_analysis',
      status: 'passed',
      message: 'Structure analysis completed',
      details: {
        structure: {},
        recommendations: []
      }
    };

    if (!content) {
      check.status = 'skipped';
      return check;
    }

    const lines = content.split('\n');
    
    // Analyze heading structure for markdown
    if (content.includes('#')) {
      const headings = lines.filter(line => line.trim().startsWith('#'));
      check.details.structure.headings = headings.length;
      check.details.structure.maxHeadingLevel = Math.max(...headings.map(h => h.match(/^#+/)?.[0].length || 0));
      
      if (check.details.structure.headings === 0 && content.length > 500) {
        check.details.recommendations.push('Add headings for better structure');
      }
    }
    
    // Analyze paragraph structure
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim());
    check.details.structure.paragraphs = paragraphs.length;
    
    // Check average paragraph length
    const avgParagraphLength = paragraphs.reduce((sum, p) => sum + p.length, 0) / paragraphs.length;
    if (avgParagraphLength > 500) {
      check.details.recommendations.push('Consider breaking up long paragraphs');
    }

    return check;
  }

  // Check data integrity
  checkDataIntegrity(content) {
    const check = {
      type: 'data_integrity',
      status: 'passed',
      message: 'Data integrity check completed',
      details: {
        issues: [],
        stats: {}
      }
    };

    if (!content) {
      check.status = 'skipped';
      return check;
    }

    try {
      // Try to parse as JSON
      const data = JSON.parse(content);
      
      if (Array.isArray(data)) {
        check.details.stats.records = data.length;
        
        // Check for consistency in array elements
        if (data.length > 0) {
          const firstKeys = Object.keys(data[0] || {});
          const inconsistentRecords = data.filter(item => {
            const itemKeys = Object.keys(item || {});
            return itemKeys.length !== firstKeys.length || 
                   !firstKeys.every(key => itemKeys.includes(key));
          });
          
          if (inconsistentRecords.length > 0) {
            check.details.issues.push(`${inconsistentRecords.length} records have inconsistent structure`);
          }
        }
      } else if (typeof data === 'object') {
        check.details.stats.properties = Object.keys(data).length;
      }
      
    } catch (error) {
      // Not JSON, try other formats
      const lines = content.split('\n');
      
      // Check for CSV-like structure
      if (lines.length > 1 && lines[0].includes(',')) {
        const headerColumns = lines[0].split(',').length;
        const inconsistentRows = lines.slice(1).filter(line => 
          line.split(',').length !== headerColumns
        );
        
        if (inconsistentRows.length > 0) {
          check.details.issues.push(`${inconsistentRows.length} rows have inconsistent column count`);
        }
        
        check.details.stats.rows = lines.length - 1;
        check.details.stats.columns = headerColumns;
      }
    }

    if (check.details.issues.length > 0) {
      check.status = 'warning';
      check.message = `Found ${check.details.issues.length} data integrity issues`;
    }

    return check;
  }

  // Assess document quality
  async assessDocumentQuality(documentPath, content) {
    const quality = {
      overall: 0,
      readability: 0,
      completeness: 0,
      technical: 0,
      structure: 0,
      factors: {}
    };

    if (!content) {
      return quality;
    }

    // Readability assessment
    quality.readability = this.assessReadability(content);
    
    // Completeness assessment
    const documentType = this.detectDocumentType(documentPath, content);
    quality.completeness = this.assessCompleteness(content, documentType);
    
    // Technical quality assessment
    quality.technical = this.assessTechnicalQuality(documentPath, content);
    
    // Structure assessment
    quality.structure = this.assessStructureQuality(content);
    
    // Calculate overall quality
    quality.overall = (quality.readability + quality.completeness + quality.technical + quality.structure) / 4;
    
    // Store quality factors
    quality.factors = {
      wordCount: content.split(/\s+/).length,
      averageSentenceLength: this.calculateAverageSentenceLength(content),
      complexityScore: this.calculateComplexityScore(content),
      maintainabilityIndex: this.calculateMaintainabilityIndex(content)
    };

    return quality;
  }

  // Assess readability
  assessReadability(content) {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim());
    const words = content.split(/\s+/).filter(w => w.trim());
    
    if (sentences.length === 0 || words.length === 0) return 0;
    
    const avgWordsPerSentence = words.length / sentences.length;
    const avgSyllablesPerWord = this.estimateAverageSyllables(words);
    
    // Simplified Flesch Reading Ease
    const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    
    // Convert to 0-100 scale
    return Math.max(0, Math.min(100, fleschScore));
  }

  // Estimate average syllables per word
  estimateAverageSyllables(words) {
    const totalSyllables = words.reduce((sum, word) => {
      // Simple syllable estimation
      const syllables = word.toLowerCase().replace(/[^a-z]/g, '').replace(/e$/, '').match(/[aeiouy]+/g)?.length || 1;
      return sum + syllables;
    }, 0);
    
    return totalSyllables / words.length;
  }

  // Assess completeness
  assessCompleteness(content, documentType) {
    const typePatterns = this.documentTypes.get(documentType);
    
    if (!typePatterns) {
      // Basic completeness check
      return content.length > 100 ? 80 : (content.length / 100) * 80;
    }
    
    const required = typePatterns.indicators;
    const contentLower = content.toLowerCase();
    const found = required.filter(indicator => contentLower.includes(indicator.toLowerCase()));
    
    return (found.length / required.length) * 100;
  }

  // Assess technical quality
  assessTechnicalQuality(documentPath, content) {
    const extension = this.getFileExtension(documentPath);
    let score = 50; // Base score
    
    // Technical documentation specific checks
    if (extension === '.md' || extension === '.txt') {
      if (content.includes('```')) score += 20; // Code examples
      if (content.includes('http')) score += 10; // Links
      if (content.includes('## ') || content.includes('### ')) score += 15; // Structure
    }
    
    // Code quality checks
    if (['.js', '.ts', '.py', '.css'].includes(extension)) {
      if (content.includes('//') || content.includes('/*')) score += 20; // Comments
      if (content.includes('function') || content.includes('class')) score += 15; // Structure
      if (content.length > 200) score += 10; // Substantial content
    }
    
    return Math.min(100, score);
  }

  // Assess structure quality
  assessStructureQuality(content) {
    let score = 0;
    
    // Check for headings
    const headings = (content.match(/^#+\s/gm) || []).length;
    score += Math.min(30, headings * 10);
    
    // Check for lists
    const lists = (content.match(/^\s*[-*+]\s/gm) || []).length;
    score += Math.min(20, lists * 2);
    
    // Check for paragraphs
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim()).length;
    score += Math.min(30, paragraphs * 5);
    
    // Check for links
    const links = (content.match(/\[.*?\]\(.*?\)/g) || []).length;
    score += Math.min(20, links * 5);
    
    return Math.min(100, score);
  }

  // Calculate average sentence length
  calculateAverageSentenceLength(content) {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim());
    const words = content.split(/\s+/).filter(w => w.trim());
    
    return sentences.length > 0 ? words.length / sentences.length : 0;
  }

  // Calculate complexity score
  calculateComplexityScore(content) {
    const words = content.split(/\s+/);
    const longWords = words.filter(word => word.length > 6).length;
    const complexityRatio = words.length > 0 ? longWords / words.length : 0;
    
    return complexityRatio * 100;
  }

  // Calculate maintainability index
  calculateMaintainabilityIndex(content) {
    const lines = content.split('\n').length;
    const words = content.split(/\s+/).length;
    const comments = (content.match(/(\/\/|\/\*|#|<!--)/g) || []).length;
    
    // Simplified maintainability calculation
    const commentRatio = lines > 0 ? comments / lines : 0;
    const wordPerLineRatio = lines > 0 ? words / lines : 0;
    
    return Math.min(100, (commentRatio * 50) + (1 / Math.max(1, wordPerLineRatio)) * 50);
  }

  // Generate intelligent insights
  async generateIntelligentInsights(documentPath, content) {
    const insights = {
      keyTopics: [],
      technicalLevel: 'unknown',
      purposeAnalysis: '',
      audienceAnalysis: '',
      improvementPotential: [],
      relationships: [],
      metadata: {}
    };

    if (!content) return insights;

    // Extract key topics
    insights.keyTopics = this.extractKeyTopics(content);
    
    // Determine technical level
    insights.technicalLevel = this.determineTechnicalLevel(content);
    
    // Analyze purpose
    insights.purposeAnalysis = this.analyzePurpose(documentPath, content);
    
    // Analyze audience
    insights.audienceAnalysis = this.analyzeAudience(content);
    
    // Identify improvement potential
    insights.improvementPotential = this.identifyImprovementPotential(content);
    
    // Find relationships with other documents
    insights.relationships = this.findDocumentRelationships(documentPath, content);
    
    // Extract metadata
    insights.metadata = this.extractMetadata(documentPath, content);

    return insights;
  }

  // Extract key topics from content
  extractKeyTopics(content) {
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    // Count word frequency
    const wordFreq = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // Get top frequent words (excluding common words)
    const commonWords = new Set(['this', 'that', 'with', 'have', 'will', 'been', 'from', 'they', 'know', 'want', 'been', 'good', 'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just', 'like', 'long', 'make', 'many', 'over', 'such', 'take', 'than', 'them', 'well', 'were']);
    
    return Object.entries(wordFreq)
      .filter(([word, freq]) => freq > 1 && !commonWords.has(word))
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word, freq]) => ({ word, frequency: freq }));
  }

  // Determine technical level
  determineTechnicalLevel(content) {
    const technicalTerms = [
      'api', 'algorithm', 'database', 'framework', 'function', 'class', 'method',
      'variable', 'parameter', 'object', 'array', 'json', 'xml', 'http', 'ssl',
      'authentication', 'encryption', 'deployment', 'configuration', 'optimization'
    ];
    
    const contentLower = content.toLowerCase();
    const foundTerms = technicalTerms.filter(term => contentLower.includes(term));
    
    const technicalRatio = foundTerms.length / Math.max(1, content.split(' ').length / 100);
    
    if (technicalRatio > 5) return 'expert';
    if (technicalRatio > 2) return 'intermediate';
    if (technicalRatio > 0.5) return 'beginner';
    return 'general';
  }

  // Analyze document purpose
  analyzePurpose(documentPath, content) {
    const fileName = this.getFileName(documentPath);
    const contentLower = content.toLowerCase();
    
    // Check filename patterns
    if (fileName.includes('readme')) return 'Documentation and guidance';
    if (fileName.includes('tutorial')) return 'Educational content';
    if (fileName.includes('api')) return 'API documentation';
    if (fileName.includes('config')) return 'Configuration specification';
    
    // Check content patterns
    if (contentLower.includes('how to') || contentLower.includes('tutorial')) {
      return 'Instructional guide';
    }
    if (contentLower.includes('api') && contentLower.includes('endpoint')) {
      return 'API documentation';
    }
    if (contentLower.includes('function') && contentLower.includes('parameter')) {
      return 'Technical reference';
    }
    
    return 'General information document';
  }

  // Analyze target audience
  analyzeAudience(content) {
    const technicalLevel = this.determineTechnicalLevel(content);
    const avgSentenceLength = this.calculateAverageSentenceLength(content);
    const complexityScore = this.calculateComplexityScore(content);
    
    if (technicalLevel === 'expert' && complexityScore > 40) {
      return 'Technical experts and developers';
    }
    if (technicalLevel === 'intermediate' && avgSentenceLength < 20) {
      return 'Technical practitioners and advanced users';
    }
    if (technicalLevel === 'beginner' && avgSentenceLength < 15) {
      return 'Beginners and general users';
    }
    
    return 'General audience with varied technical backgrounds';
  }

  // Identify improvement potential
  identifyImprovementPotential(content) {
    const potential = [];
    
    // Check for examples
    if (!content.includes('example') && !content.includes('```')) {
      potential.push({
        area: 'examples',
        suggestion: 'Add practical examples to illustrate concepts',
        impact: 'high'
      });
    }
    
    // Check for structure
    if (!content.includes('#') && content.length > 500) {
      potential.push({
        area: 'structure',
        suggestion: 'Add headings to improve document structure',
        impact: 'medium'
      });
    }
    
    // Check for links
    if (!content.includes('http') && content.length > 300) {
      potential.push({
        area: 'references',
        suggestion: 'Add links to related resources',
        impact: 'medium'
      });
    }
    
    return potential;
  }

  // Find relationships with other documents
  findDocumentRelationships(documentPath, content) {
    const relationships = [];
    
    // Check for explicit references
    const linkPattern = /\[.*?\]\((.*?)\)/g;
    const links = [];
    let match;
    
    while ((match = linkPattern.exec(content)) !== null) {
      links.push(match[1]);
    }
    
    links.forEach(link => {
      relationships.push({
        type: 'reference',
        target: link,
        relationship: 'explicitly references'
      });
    });
    
    // Check for similar topics (simplified)
    const keyTopics = this.extractKeyTopics(content);
    if (keyTopics.length > 0) {
      relationships.push({
        type: 'topical',
        topics: keyTopics.slice(0, 3).map(t => t.word),
        relationship: 'shares topics with related documents'
      });
    }
    
    return relationships;
  }

  // Extract metadata
  extractMetadata(documentPath, content) {
    const metadata = {
      fileName: this.getFileName(documentPath),
      extension: this.getFileExtension(documentPath),
      estimatedReadTime: Math.ceil(content.split(/\s+/).length / 200), // 200 WPM
      wordCount: content.split(/\s+/).filter(w => w.trim()).length,
      lineCount: content.split('\n').length,
      characterCount: content.length,
      lastModified: new Date() // Would be actual file timestamp in real implementation
    };
    
    return metadata;
  }

  // Generate improvement suggestions
  generateImprovementSuggestions(analysis) {
    const suggestions = [];
    
    // Based on verification results
    if (analysis.verification.issues.length > 0) {
      suggestions.push({
        category: 'critical',
        type: 'fix_issues',
        description: `Fix ${analysis.verification.issues.length} critical issues found`,
        priority: 'high',
        actionable: true
      });
    }
    
    // Based on quality assessment
    if (analysis.qualityAssessment.overall < 70) {
      suggestions.push({
        category: 'quality',
        type: 'improve_quality',
        description: 'Overall document quality could be improved',
        priority: 'medium',
        actionable: true
      });
    }
    
    // Based on intelligent insights
    analysis.intelligentInsights.improvementPotential.forEach(potential => {
      suggestions.push({
        category: 'enhancement',
        type: potential.area,
        description: potential.suggestion,
        priority: potential.impact === 'high' ? 'high' : 'medium',
        actionable: true
      });
    });
    
    return suggestions;
  }

  // Calculate analysis confidence
  calculateAnalysisConfidence(analysis) {
    let confidence = 0.5; // Base confidence
    
    // Increase confidence based on available data
    if (analysis.verification.checks.length > 0) confidence += 0.2;
    if (analysis.qualityAssessment.overall > 0) confidence += 0.2;
    if (analysis.intelligentInsights.keyTopics.length > 0) confidence += 0.1;
    
    // Decrease confidence for errors or unknowns
    if (analysis.type === 'unknown') confidence -= 0.2;
    if (analysis.verification.status === 'failed') confidence -= 0.1;
    
    return Math.max(0.1, Math.min(1.0, confidence));
  }

  // Generate analysis summary
  generateAnalysisSummary(analysis) {
    const summary = {
      documentType: analysis.type,
      overallStatus: this.getOverallStatus(analysis),
      keyFindings: [],
      recommendedActions: [],
      qualityScore: Math.round(analysis.qualityAssessment.overall),
      confidence: Math.round(analysis.confidence * 100)
    };
    
    // Add key findings
    if (analysis.verification.issues.length > 0) {
      summary.keyFindings.push(`Found ${analysis.verification.issues.length} verification issues`);
    }
    
    if (analysis.intelligentInsights.technicalLevel !== 'unknown') {
      summary.keyFindings.push(`Technical level: ${analysis.intelligentInsights.technicalLevel}`);
    }
    
    if (analysis.intelligentInsights.keyTopics.length > 0) {
      summary.keyFindings.push(`Key topics: ${analysis.intelligentInsights.keyTopics.slice(0, 3).map(t => t.word).join(', ')}`);
    }
    
    // Add recommended actions
    analysis.improvementSuggestions
      .filter(s => s.priority === 'high')
      .forEach(suggestion => {
        summary.recommendedActions.push(suggestion.description);
      });
    
    return summary;
  }

  // Get overall status
  getOverallStatus(analysis) {
    if (analysis.verification.status === 'failed') return 'needs_attention';
    if (analysis.qualityAssessment.overall < 50) return 'poor_quality';
    if (analysis.qualityAssessment.overall < 70) return 'acceptable';
    if (analysis.qualityAssessment.overall < 90) return 'good';
    return 'excellent';
  }

  // Update metrics
  updateMetrics(analysis) {
    this.analysisMetrics.totalAnalyzed++;
    
    if (analysis.verification.status === 'verified') {
      this.analysisMetrics.totalVerified++;
    }
    
    // Update average confidence
    const totalConfidence = this.analysisMetrics.averageConfidence * (this.analysisMetrics.totalAnalyzed - 1) + analysis.confidence;
    this.analysisMetrics.averageConfidence = totalConfidence / this.analysisMetrics.totalAnalyzed;
    
    // Update document categories
    const category = analysis.type;
    const currentCount = this.analysisMetrics.documentCategories.get(category) || 0;
    this.analysisMetrics.documentCategories.set(category, currentCount + 1);
  }

  // Scan for new documents
  scanForNewDocuments() {
    // This would integrate with file system APIs to scan for new documents
    console.log('🔍 Scanning for new documents to analyze...');
    
    // Simulate finding documents
    const simulatedDocuments = [
      { path: './README.md', lastModified: new Date() },
      { path: './src/config.json', lastModified: new Date() },
      { path: './docs/api.md', lastModified: new Date() }
    ];
    
    // Check if we've analyzed these recently
    simulatedDocuments.forEach(doc => {
      const recentAnalysis = this.analysisHistory.find(a => 
        a.documentPath === doc.path && 
        Date.now() - new Date(a.timestamp).getTime() < 3600000 // 1 hour
      );
      
      if (!recentAnalysis) {
        console.log(`📄 Found new/updated document: ${doc.path}`);
        // Would trigger analysis here
      }
    });
  }

  // Perform periodic verification
  performPeriodicVerification() {
    console.log('🔄 Performing periodic verification of analyzed documents...');
    
    // Re-verify documents that haven't been checked in a while
    const oldAnalyses = this.analysisHistory.filter(a => 
      Date.now() - new Date(a.timestamp).getTime() > 86400000 // 24 hours
    );
    
    if (oldAnalyses.length > 0) {
      console.log(`📋 ${oldAnalyses.length} documents need re-verification`);
      // Would trigger re-analysis here
    }
  }

  // Get file extension
  getFileExtension(path) {
    const lastDot = path.lastIndexOf('.');
    return lastDot >= 0 ? path.substring(lastDot) : '';
  }

  // Get file name
  getFileName(path) {
    const lastSlash = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
    return lastSlash >= 0 ? path.substring(lastSlash + 1) : path;
  }

  // Get analysis statistics
  getAnalysisStatistics() {
    return {
      metrics: { ...this.analysisMetrics },
      recentAnalyses: this.analysisHistory.slice(-10),
      documentCategories: Object.fromEntries(this.analysisMetrics.documentCategories),
      verificationRules: Array.from(this.verificationRules.keys()),
      supportedTypes: Array.from(this.documentTypes.keys())
    };
  }

  // Cleanup old analyses
  cleanupOldAnalyses(maxAge = 604800000) { // 7 days
    const cutoff = Date.now() - maxAge;
    const initialCount = this.analysisHistory.length;
    
    this.analysisHistory = this.analysisHistory.filter(analysis => 
      new Date(analysis.timestamp).getTime() > cutoff
    );
    
    const removed = initialCount - this.analysisHistory.length;
    if (removed > 0) {
      console.log(`🗑️ Cleaned up ${removed} old document analyses`);
    }
  }
}

// Create singleton instance
const documentAnalysisService = new DocumentAnalysisService();

export default documentAnalysisService;