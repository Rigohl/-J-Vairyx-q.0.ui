import React, { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import consentManagementService from "../services/ConsentManagementService";

const ConsentBanner = () => {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "cloud inline",
          position: "bottom center",
          equalWeightButtons: true,
          flipButtons: false
        },
        preferencesModal: {
          layout: "box",
          equalWeightButtons: true,
          flipButtons: false
        }
      },
      onFirstConsent: ({ cookie }) => {
        updateInternalConsent();
      },
      onConsent: ({ cookie }) => {
        updateInternalConsent();
      },
      onChange: ({ changedCategories, changedServices }) => {
        updateInternalConsent();
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
          services: {
            app_essential: {
              label: "Servicios Esenciales de la Aplicación"
            }
          }
        },
        analytics: {
          services: {
            app_analytics: {
              label: "Análisis de uso para mejorar la experiencia"
            }
          }
        },
        learning: {
          services: {
            app_learning: {
              label: "Aprendizaje personalizado y modelos de IA (JARVIS)"
            }
          }
        },
        assistant_history: {
          services: {
            app_history: {
              label: "Historial de chat y contexto del asistente"
            }
          }
        }
      },
      language: {
        default: 'es',
        translations: {
          es: {
            consentModal: {
              title: "Privacidad y Consentimiento",
              description: "J-Vairyx utiliza datos locales para ofrecerte una experiencia hiper-personalizada. Puedes configurar tus preferencias de privacidad aquí.",
              acceptAllBtn: "Aceptar todo",
              acceptNecessaryBtn: "Solo necesarios",
              showPreferencesBtn: "Configurar opciones"
            },
            preferencesModal: {
              title: "Preferencias de Privacidad",
              acceptAllBtn: "Aceptar todo",
              acceptNecessaryBtn: "Solo necesarios",
              savePreferencesBtn: "Guardar preferencias",
              closeIconLabel: "Cerrar ventana",
              sections: [
                {
                  title: "Uso de Datos (GDPR)",
                  description: "Controla cómo J-Vairyx aprende de tus interacciones y qué datos conserva localmente."
                },
                {
                  title: "Estrictamente Necesarios",
                  description: "Estos ajustes son esenciales para que la aplicación funcione y no se pueden desactivar.",
                  linkedCategory: "necessary"
                },
                {
                  title: "Aprendizaje IA (JARVIS)",
                  description: "Permite que la IA aprenda de tus flujos de trabajo para ser más proactiva y personalizada.",
                  linkedCategory: "learning"
                },
                {
                  title: "Historial de Asistente",
                  description: "Permite guardar el contexto y conversaciones pasadas para mantener continuidad.",
                  linkedCategory: "assistant_history"
                },
                {
                  title: "Análisis",
                  description: "Métricas de uso anónimas para mejorar el sistema interno.",
                  linkedCategory: "analytics"
                }
              ]
            }
          }
        }
      }
    });

    const updateInternalConsent = () => {
      consentManagementService.updateConsents({
        analytics: CookieConsent.acceptedCategory('analytics'),
        learning: CookieConsent.acceptedCategory('learning'),
        assistant_history: CookieConsent.acceptedCategory('assistant_history')
      });
    };
  }, []);

  return null;
};

export default ConsentBanner;
