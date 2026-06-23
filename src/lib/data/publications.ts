import type { Publication } from "@/types";

export const publications: Publication[] = [
  {
    id: "ml-bus-transportation",
    title: "ML Driven Predictive Analytics for Bus Transportation System",
    journal: "IJIRT",
    journalFull: "International Journal of Innovative Research in Technology",
    date: "2025",
    abstract:
      "This paper presents a machine learning-based predictive analytics framework for bus transportation systems, analyzing commuter behavior patterns and transit demand signals to deliver data-driven operational recommendations. We demonstrate how structured ML pipelines applied to transit data can meaningfully improve route efficiency and user engagement.",
    problem:
      "Urban public transit systems suffer from demand-supply mismatches caused by an absence of data-driven operational intelligence. Route planners lack predictive tools to anticipate ridership patterns, resulting in service inefficiencies and resource waste.",
    methodology: [
      "Collected and preprocessed historical bus transit datasets spanning multiple routes and time periods",
      "Performed exploratory data analysis to identify behavioral patterns, peak demand windows, and anomalies",
      "Engineered domain-relevant features including temporal patterns, route density metrics, and commuter clustering signals",
      "Applied classification and regression models (Random Forest, Gradient Boosting) for demand prediction",
      "Built collaborative filtering recommendation engine for route optimization",
      "Evaluated models using cross-validation with MAE, RMSE, and precision@k metrics",
    ],
    results: [
      "Achieved statistically significant prediction accuracy on holdout test sets",
      "Identified actionable route optimization opportunities through demand clustering",
      "Demonstrated 15–25% improvement in recommendation relevance vs. baseline heuristics",
      "Interactive Streamlit dashboard deployed for stakeholder consumption of insights",
    ],
    impact:
      "Provides transit authorities with a replicable ML framework for evidence-based operational planning, contributing to smarter urban mobility and public transit efficiency in developing-world contexts.",
    keywords: [
      "Machine Learning", "Predictive Analytics", "Bus Transportation",
      "Commuter Behavior", "Recommendation System", "Smart City", "Data Engineering",
    ],
  },
  {
    id: "website-traffic-analysis",
    title: "Website Traffic Analysis",
    journal: "IJAMEMA",
    journalFull:
      "International Journal of Advanced Mathematics, Engineering & Management Applications",
    date: "2024",
    abstract:
      "An analytical study of website traffic patterns using statistical and machine learning techniques to derive actionable insights for digital product optimization. The research examines traffic source attribution, user behavior signals, and engagement metrics to inform data-driven product decisions.",
    problem:
      "Web product teams struggle to convert raw analytics data into clear, actionable product decisions. Existing traffic analysis is largely descriptive — failing to surface predictive or causal signals that drive meaningful user engagement improvements.",
    methodology: [
      "Collected and processed web traffic datasets including session data, source attribution, and engagement metrics",
      "Applied statistical analysis to identify traffic patterns, seasonal trends, and anomaly windows",
      "Used clustering algorithms to segment user journeys into behavioral archetypes",
      "Modeled traffic source attribution using regression analysis",
      "Visualized findings using Tableau and Power BI for stakeholder reporting",
    ],
    results: [
      "Identified high-value traffic segments and low-performing source channels",
      "Built user segmentation model revealing 4 distinct behavioral archetypes",
      "Produced actionable recommendations for content strategy and channel optimization",
      "Delivered comprehensive visual dashboards for non-technical stakeholder review",
    ],
    impact:
      "Demonstrates how applied data analytics can drive measurable improvements in digital product strategy, offering a replicable framework for product-analytics alignment across web platforms.",
    keywords: [
      "Web Analytics", "Traffic Analysis", "User Behavior",
      "Data Visualization", "Machine Learning", "Statistical Analysis", "Digital Product",
    ],
  },
];
