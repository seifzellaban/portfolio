import {
  IconCode,
  IconRocket,
  IconPalette,
  IconDeviceMobile,
  IconBrandFigma,
  IconChartBar,
} from "@tabler/icons-react";
import { JSX } from "react";

export type LayoutType =
  | "two-column-cards"
  | "single-column-detailed"
  | "grid-features"
  | "minimal-centered"
  | "process-timeline"
  | "classic-feature-list";

export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: JSX.Element;
  features: string[];
  timeRange: string;
  priceRange: string;
  layoutType: LayoutType;
}

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Building scalable, performant, and secure web applications using modern technologies like Next.js, React, and Node.js.",
    fullDescription:
      "We build high-performance, scalable, and secure web applications tailored to your business needs. From simple landing pages to complex enterprise solutions, our web development services ensure your digital presence is robust, responsive, and ready for growth. We specialize in the modern JavaScript stack, leveraging the power of Next.js and React.",
    icon: <IconCode size={32} className="text-primary" />,
    features: [
      "Custom Web Application Development",
      "E-commerce Solutions",
      "Content Management Systems (CMS)",
      "API Development & Integration",
      "Software As a Service (SAAS)",
      "Performance Optimization",
    ],
    timeRange: "4 - 12 Weeks",
    priceRange: "EGP5,000 - EGP15,000+",
    layoutType: "two-column-cards",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "Creating native and cross-platform mobile applications that provide seamless user experiences on iOS and Android devices.",
    fullDescription:
      "Reach your customers on the devices they use most. We design and develop native and cross-platform mobile applications that offer seamless user experiences. Whether you need an iOS app, an Android app, or a solution that works perfectly on both, we use frameworks like React Native and Flutter to deliver high-quality apps efficiently.",
    icon: <IconDeviceMobile size={32} className="text-primary" />,
    features: [
      "iOS & Android App Development",
      "Cross-Platform Development (React Native/Expo)",
      "UI/UX Design for Mobile",
      "App Store Optimization (ASO)",
      "Maintenance & Support",
      "Mobile Strategy Consulting",
    ],
    timeRange: "8 - 16 Weeks",
    priceRange: "EGP5,000 - EGP20,000+",
    layoutType: "single-column-detailed",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Designing intuitive and beautiful user interfaces that prioritize user experience, accessibility, and engagement.",
    fullDescription:
      "Design is more than just aesthetics; it's about how it works. Our UI/UX design services focus on creating intuitive, engaging, and accessible interfaces that delight users and drive conversions. We start with user research and wireframing, moving through prototyping to the final polished design, ensuring every interaction is thoughtful and purposeful.",
    icon: <IconPalette size={32} className="text-primary" />,
    features: [
      "User Research & Personas",
      "Wireframing & Prototyping",
      "Visual Design & Design Systems",
      "Interaction Design",
      "Usability Testing",
      "Accessibility Audits",
    ],
    timeRange: "3 - 8 Weeks",
    priceRange: "EGP2,500 - EGP10,000+",
    layoutType: "grid-features",
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    description:
      "Crafting unique and memorable brand identities, including logos, typography, and color palettes that resonate with your audience.",
    fullDescription:
      "Your brand is your promise. We help you define and express that promise through a cohesive and memorable brand identity. From logo design and color palettes to typography and brand guidelines, we ensure your visual identity reflects your core values and resonates with your target audience across all touchpoints.",
    icon: <IconBrandFigma size={32} className="text-primary" />,
    features: [
      "Logo Design",
      "Brand Strategy & Positioning",
      "Visual Identity Systems",
      "Brand Guidelines (Style Guides)",
      "Stationery & Collateral Design",
      "Rebranding Services",
    ],
    timeRange: "2 - 6 Weeks",
    priceRange: "EGP120/hr or Project Basis",
    layoutType: "minimal-centered",
  },
  {
    id: "consulting-strategy",
    title: "Consulting & Strategy",
    description:
      "Providing expert advice on digital strategy, technology stack selection, and product roadmap to ensure your project's success.",
    fullDescription:
      "Navigate the complex digital landscape with confidence. Our consulting and strategy services provide you with expert guidance on technology choices, product roadmaps, and digital transformation. We work closely with you to understand your business goals and align them with the right technical solutions to maximize ROI and minimize risk.",
    icon: <IconRocket size={32} className="text-primary" />,
    features: [
      "Digital Transformation Strategy",
      "Technology Stack Selection",
      "Product Roadmap Planning",
      "Technical Feasibility Audits",
      "Startup MVP Strategy",
      "Process Optimization",
    ],
    timeRange: "1 - 4 Weeks",
    priceRange: "EGP150/hr or Project Basis",
    layoutType: "process-timeline",
  },
  {
    id: "seo-digital-marketing",
    title: "SEO & Digital Marketing",
    description:
      "Optimizing your digital presence to improve visibility, drive organic traffic, and convert visitors into loyal customers.",
    fullDescription:
      "Building a great website is just the beginning. You need people to find it. Our SEO and digital marketing services are designed to increase your online visibility, drive high-quality organic traffic, and convert visitors into customers. We use data-driven strategies to improve your search rankings and optimize your marketing funnel.",
    icon: <IconChartBar size={32} className="text-primary" />,
    features: [
      "Search Engine Optimization (SEO)",
      "Content Strategy & Marketing",
      "Conversion Rate Optimization (CRO)",
      "Technical SEO Audits",
      "Local SEO",
      "Analytics & Reporting",
    ],
    timeRange: "Ongoing / Monthly",
    priceRange: "EGP1,000 - EGP5,000 / month",
    layoutType: "classic-feature-list",
  },
];
