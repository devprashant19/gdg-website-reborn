"use client";
import React from "react";
import { motion } from "framer-motion";

export default function SciFiProjectCard({ project, borderColor, onExpand }: any) {
  return (
    <motion.div
      layoutId={project._id}
      whileHover={{ y: -10, rotateY: 5 }}
      onClick={onExpand}
      className="relative group w-full cursor-pointer h-64"
    >
      {/* Dynamic Google Border */}
      <div 
        className="absolute inset-0 border-2 rounded-xl transition-all duration-500 opacity-50 group-hover:opacity-100"
        style={{ borderColor: borderColor, boxShadow: `0 0 15px ${borderColor}33` }}
      />
      
      <div className="absolute inset-2 bg-zinc-900 rounded-lg overflow-hidden flex flex-col justify-end p-5">
        <h3 className="text-xl font-black italic uppercase tracking-tighter" style={{ color: borderColor }}>
          {project.title}
        </h3>
        <p className="text-[9px] text-zinc-500 font-mono mt-2 uppercase">Click to expand system</p>
      </div>
    </motion.div>
  );
}