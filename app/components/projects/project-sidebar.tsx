"use client";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  technologies: string[];
}

export const ProjectSidebar = ({ isOpen, onClose, technologies }: SidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTech = searchParams.get("technology");

  const handleTechSelect = (tech: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentTech === tech) {
      params.delete("technology");
    } else {
      params.set("technology", tech);
    }
    router.push(`/projects?${params.toString()}`);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99]" onClick={onClose} />
      )}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-neutral-950 z-[100] transform transition-transform duration-300 ease-in-out border-l border-neutral-800 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Filters</h2>
            <button onClick={onClose} className="p-1 hover:bg-neutral-800 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4">By Technology</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <button
                key={tech}
                onClick={() => handleTechSelect(tech)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${
                  currentTech === tech 
                  ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' 
                  : 'bg-transparent border-neutral-800 text-neutral-400 hover:border-neutral-500'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};