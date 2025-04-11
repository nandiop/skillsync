"use client";

import React, { useEffect, useState, useRef } from "react";
import HeroSection from "../components/hero";
import { Card, CardContent } from "../components/ui/card";
import { Brain, BarChart, ShieldCheck, Briefcase } from "lucide-react";
import { howItWorks } from "../data/howItWorks";
import { testimonial } from "../data/testimonial";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";
import { faqs } from "../data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";

// Typewriter Effect with Scroll Trigger
const TypewriterNumber = ({ value, isVisible, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return; // Start only when section is visible

    let start = 0;
    const end = parseInt(value.replace(/\D/g, ""), 10); // Extracts numeric values
    const duration = 2000; // Animation duration in ms
    const increment = Math.ceil(end / (duration / 30)); // Step increment based on duration

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(start);
    }, 30);

    return () => clearInterval(interval);
  }, [value, isVisible]);

  return (
    <span>
      {count}
      {value.replace(/\d+/g, "")}
      {suffix}
    </span>
  ); // Keeps non-numeric parts (e.g., "+", "%", "/7")
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Start animation when 30% of section is visible
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const features = [
    {
      title: "AI-Powered Coaching",
      icon: <Brain size={32} className="text-primary" />,
      description:
        "Leverage AI-driven insights to enhance your career growth with personalized coaching.",
    },
    {
      title: "Data-Driven Decisions",
      icon: <BarChart size={32} className="text-primary" />,
      description:
        "Make informed decisions with powerful analytics and real-time performance tracking.",
    },
    {
      title: "Secure & Private",
      icon: <ShieldCheck size={32} className="text-primary" />,
      description:
        "Your data is encrypted and secured, ensuring privacy and compliance with industry standards.",
    },
    {
      title: "Career Growth Tools",
      icon: <Briefcase size={32} className="text-primary" />,
      description:
        "Access tools and resources tailored to help you achieve professional success.",
    },
  ];

  const statistics = [
    {
      title: "50+",
      description: "Industries Covered",
    },
    {
      title: "1000+",
      description: "Interview Questions",
    },
    {
      title: "95%",
      description: "Success Rate",
    },
    {
      title: "24",
      suffix: "/7",
      description: "Online Support",
    },
  ];

  return (
    <div>
      <div className="grid-background"></div>
      <HeroSection />

      <section className="py-16 text-white mt-10">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Sensible AI <span className="orange-text">skills</span> to{" "}
            <span className="gradient-title-orange">sync</span> with your <span className="font-light">career </span>
            growth.
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Unlock the power of AI-driven coaching and career advancement tools.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="mt-7 bg-background/80 backdrop-blur-xs text-white p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <CardContent className="flex flex-col items-center space-y-4">
                  <div className="p-4 rounded-full">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-400 text-sm text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Scroll-Triggered Counter */}
      <section ref={statsRef} className="py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 mt-16 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="text-white p-6 rounded-xl shadow-lg transform transition duration-300"
              >
                <div className="flex flex-col items-center space-y-4">
                  <h3 className="text-5xl font-semibold">
                    <TypewriterNumber
                      value={stat.title}
                      suffix={stat.suffix}
                      isVisible={isVisible}
                    />
                  </h3>
                  <p className="text-gray-400 text-sm text-center">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white mt-10 bg-black/20">
        <div className="container mx-auto px-6 text-center  bg-black/20">
          <h1 className="text-2xl md:text-5xl font-bold mb-6 text-gray-200">
            <span className="orange-text">4</span> Simple steps to <br />
            elevate <span className="font-light italic">your career</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-10 mt-20 ">
            {howItWorks.map((item, index) => {
              return (
                <div className="gap-4">
                  <div
                    key={index}
                    className="flex flex-col items-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10  backdrop-blur-xs flex items-center justify-center mb-5">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl text-gray-200 mb-5">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 text-white mt-10 p-10 bg-black/30 backdrop-blur-2xl  border border-white/10 shadow-lg">
        <div className="container mx-auto  text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-6  ">
            Let's see the candidate's <span className="font-light">review</span>
          </h1>

          <Carousel className="w-full max-w-4xl mx-auto mt-20 border-gray-400">
            <CarouselContent className="flex">
              {testimonial.map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/3">
                  <div className="p-4">
                    <Card
                      className="border-gray-400 transition-all 0.5s ease-in-out"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = "#FE725D")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = "gray")
                      }
                    >
                      <CardContent className="flex flex-col items-center text-center p-6rounded-2xl shadow-lg">
                        <img
                          src={feature.image}
                          className="w-15 h-15 object-cover rounded-full mb-4 border-2"
                        />
                        <div>
                          <h1 className="text-lg font-semibold text-white">
                            {feature.author}
                          </h1>
                          <h3 className="text-sm font-light text-gray-400">
                            {feature.role}
                          </h3>
                          <h2 className="text-sm font-medium text-gray-300">
                            {feature.company}
                          </h2>
                          <p className="text-gray-300 italic mt-3">
                            " {feature.quote} "
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section className="py-16 text-white mt-10 bg-black/20   shadow-lg">
  <div className="container mx-auto px-6 text-center">
    <h1 className="text-2xl md:text-5xl font-bold mb-6 text-gray-200">
      Frequently <span className="font-thin">asked</span>{" "}
      <span className="orange-text">Questions</span>
    </h1>

    {/* Centered Accordion */}
    <div className="flex justify-center mt-10">
      <Accordion
        type="single"
        collapsible
        className="w-full bg-black p-15 rounded-2xl border border-gray-600 mt-10"
      >
        {faqs.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="w-full" >
            <AccordionTrigger className="text-white text-lg font-medium hover:orange-text transition duration-300">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-sm p-4 rounded-md transition-all duration-300 ease-in-out">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
</section>

<section className="w-full">
        <div className="mx-auto py-24 gradient-orange mt-15 mb-20">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="h-11 mt-5 animate-bounce"
              >
                Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}
