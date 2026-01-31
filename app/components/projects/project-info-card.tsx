"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, Cpu } from "lucide-react";

export interface ProjectInfoCardProps {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
}

export default function ProjectInfoCard(project: ProjectInfoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative w-full max-w-[400px] h-[450px] bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group shadow-2xl"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 3D Floating Element */}
      <div className="absolute top-4 right-4 z-20 opacity-20 group-hover:opacity-100 transition-opacity">
        <Cpu className="text-orange-500 w-8 h-8 animate-pulse" />
      </div>

      {/* Image Section */}
      <div className="relative h-1/2 w-full">
        <Image
          src={project.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400"}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between h-1/2" style={{ transform: "translateZ(30px)" }}>
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-2">
            {project.title}
          </h3>
          <p className="text-neutral-400 text-sm line-clamp-2 font-mono">
            {project.description}
          </p>
        </div>

        <div className="space-y-4">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 text-[10px] font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded uppercase">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <a href={project.githubLink} className="flex-1 bg-white text-black py-2 rounded-md font-bold text-xs flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white transition-all">
              <Github className="w-4 h-4" /> SOURCE
            </a>
            <a href={project.liveLink} className="p-2 border border-neutral-700 rounded-md hover:border-white transition-all text-white">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}