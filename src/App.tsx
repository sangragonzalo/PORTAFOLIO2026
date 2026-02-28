/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FC, useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import {
  Box,
  Camera,
  Cpu,
  ExternalLink,
  Instagram,
  Mail,
  Play,
  Smartphone,
  Sparkles,
  Zap,
  Palette,
  Layers,
  Code,
  ChevronRight,
  Download,
  FileDown,
  Volume2,
  VolumeX,
  X,
  Globe
} from "lucide-react";

// --- Types ---

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  images?: string[]; // Optional for carousel
  tags: string[];
}

interface VideoProject {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
}

// --- Data ---

const BRANDING_PROJECTS: Project[] = [
  {
    id: "travel-trading",
    title: "Travel Trading",
    category: "Branding",
    description: "Identidad visual para una innovadora agencia de turismo receptivo.",
    image: "/assets/branding/travel-trading/1.jpeg",
    images: [
      "/assets/branding/travel-trading/1.jpeg",
      "/assets/branding/travel-trading/2.jpeg",
      "/assets/branding/travel-trading/3.jpeg",
      "/assets/branding/travel-trading/4.jpeg",
      "/assets/branding/travel-trading/5.jpeg"
    ],
    tags: ["Logotipo", "Paleta", "Tipografía"]
  },
  {
    id: "henko",
    title: "Henko",
    category: "Branding",
    description: "Desarrollo de identidad visual para un emprendimiento en el sector deportivo.",
    image: "/assets/branding/henko/1.jpeg",
    images: [
      "/assets/branding/henko/1.jpeg",
      "/assets/branding/henko/2.jpeg",
      "/assets/branding/henko/3.jpeg",
      "/assets/branding/henko/4.jpeg"
    ],
    tags: ["Deporte", "Identidad", "Concepto"]
  },
  {
    id: "sky-eleven",
    title: "Sky Eleven",
    category: "Branding",
    description: "Contribución al crecimiento de una empresa pionera en criptomonedas y servicios financieros.",
    image: "/assets/branding/sky-eleven/0.png",
    images: [
      "/assets/branding/sky-eleven/0.png",
      "/assets/branding/sky-eleven/1.jpeg",
      "/assets/branding/sky-eleven/2.jpeg",
      "/assets/branding/sky-eleven/3.jpeg",
      "/assets/branding/sky-eleven/4.jpg",
      "/assets/branding/sky-eleven/5.jpg",
      "/assets/branding/sky-eleven/6.jpg",
      "/assets/branding/sky-eleven/7.jpg"
    ],
    tags: ["Fintech", "Crypto", "Estratégico"]
  }
];

const CLIENT_PROJECTS: Project[] = [
  {
    id: "fondo-blanco",
    title: "Fondo Blanco",
    category: "Trabajo Particular",
    description: "confeccion de logo y publicaciones para redes",
    image: "/assets/client/fondo-blanco/1.jpg",
    images: [
      "/assets/client/fondo-blanco/1.jpg",
      "/assets/client/fondo-blanco/2.jpg",
      "/assets/client/fondo-blanco/3.png"
    ],
    tags: ["Audiovisual", "Gráfico"]
  },
  {
    id: "figaro-trendy",
    title: "Figaro Trendy",
    category: "Trabajo Particular",
    description: "Concepto visual moderno para marca de tendencia y estilo.",
    image: "/assets/client/figaro-trendy/1.png",
    images: [
      "/assets/client/figaro-trendy/1.png",
      "/assets/client/figaro-trendy/2.png",
      "/assets/client/figaro-trendy/3.jpeg"
    ],
    tags: ["Moda", "Minimalismo", "Branding"]
  },
  {
    id: "fenix",
    title: "Fenix Centro Deportivo",
    category: "Trabajo Particular",
    description: "Desarrollo de contenido estratégico y pauta publicitaria para el sponsor de gatorade.",
    image: "/assets/client/fenix/0.jpg",
    images: [
      "/assets/client/fenix/0.jpg",
      "/assets/client/fenix/1.jpg",
      "/assets/client/fenix/2.jpg",
      "/assets/client/fenix/3.jpg",
      "/assets/client/fenix/4.jpg",
      "/assets/client/fenix/5.jpg",
      "/assets/client/fenix/6.jpg",
      "/assets/client/fenix/7.jpg"
    ],
    tags: ["Social Media", "Marketing", "Fitness"]
  }
];

const BLENDER_PROJECTS: VideoProject[] = [
  {
    id: "b1",
    title: "sky eleven - publicidad",
    videoUrl: "/assets/blender/publi-skyeleven.mp4",
    thumbnail: ""
  },
  {
    id: "b2",
    title: "wise guys co - diseño remera",
    videoUrl: "/assets/blender/reel-2.mp4",
    thumbnail: ""
  },
  {
    id: "b3",
    title: "wise guys co - colaboracion con marca de ropa",
    videoUrl: "/assets/blender/wise-final.mp4",
    thumbnail: ""
  }
];

const REEL_PROJECTS: VideoProject[] = [
  {
    id: "r1",
    title: "fitnes 360 - gym",
    videoUrl: "/assets/reels/martin-fitness.mp4",
    thumbnail: ""
  },
  {
    id: "r2",
    title: "Sky Eleven - reel publicitario",
    videoUrl: "/assets/reels/publi-1-final.mp4",
    thumbnail: ""
  },
  {
    id: "r3",
    title: "area club- reel publicitario",
    videoUrl: "/assets/reels/reel-area-final.mp4",
    thumbnail: ""
  },
  {
    id: "r4",
    title: "sky eleven - spot publicitario",
    videoUrl: "/assets/reels/vertical.mp4",
    thumbnail: ""
  },
  {
    id: "r5",
    title: "figaro trendy - reel publicitario",
    videoUrl: "/assets/reels/figaro-reel.mp4",
    thumbnail: ""
  }
];

// --- Components ---

const FloatingShapes = () => {
  const shapes = [
    { type: "circle", color: "bg-emerald-400/20", size: "w-12 h-12" },
    { type: "square", color: "bg-cyan-400/20", size: "w-10 h-10" },
    { type: "triangle", color: "bg-emerald-400/20", size: "w-14 h-14" },
    { type: "x", color: "bg-cyan-400/20", size: "w-8 h-8" },
    { type: "circle", color: "bg-cyan-400/20", size: "w-16 h-16" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-sm ${shape.color} ${shape.size}`}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0
          }}
          animate={{
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            clipPath: shape.type === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" :
              shape.type === "square" ? "none" :
                shape.type === "x" ? "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)" : "none",
            borderRadius: shape.type === "circle" ? "50%" : "0"
          }}
        />
      ))}
    </div>
  );
};

const Lightbox: FC<{ image: string | null; onClose: () => void }> = ({ image, onClose }) => (
  <AnimatePresence>
    {image && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12"
        onClick={onClose}
      >
        <motion.button
          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
          onClick={onClose}
        >
          <X size={40} />
        </motion.button>
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          src={image}
          className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    )}
  </AnimatePresence>
);

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display font-bold tracking-tighter"
        >
          GONZALO<span className="text-emerald-400">SANGRA</span>
        </motion.div>
        <div className="hidden md:flex space-x-12 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
          <a href="#about" className="hover:text-emerald-400 transition-colors">Sobre Mí</a>
          <a href="#works" className="hover:text-emerald-400 transition-colors">Mis Trabajos</a>
          <a href="#skills" className="hover:text-emerald-400 transition-colors">Habilidades</a>
        </div>
      </div>
    </nav>
  );
};

const SectionHeader: FC<{ title: string; subtitle?: string; centered?: boolean }> = ({ title, subtitle, centered }) => (
  <div className={`mb-12 md:mb-20 ${centered ? 'text-center' : ''}`}>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-7xl font-display font-bold mb-4 md:mb-6 tracking-tighter"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-white/40 max-w-2xl ${centered ? 'mx-auto' : ''} text-sm md:text-lg leading-relaxed`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const ProjectCarousel: FC<{ images: string[]; onImageClick: (img: string) => void }> = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-zoom-in"
      onClick={() => onImageClick(images[currentIndex])}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-white w-4" : "bg-white/30"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectCard: FC<{ project: Project; onImageClick: (img: string) => void }> = ({ project, onImageClick }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="group relative overflow-hidden rounded-3xl glass w-full max-w-sm mx-auto"
  >
    <div className="aspect-[3/4] overflow-hidden">
      {project.images && project.images.length > 0 ? (
        <ProjectCarousel images={project.images} onImageClick={onImageClick} />
      ) : (
        <img
          src={project.image}
          alt={project.title}
          onClick={() => onImageClick(project.image)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
    <div className="p-4 md:p-6">
      <span className="text-[8px] md:text-[9px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-1 md:mb-2 block">
        {project.category}
      </span>
      <h3 className="text-lg md:text-xl font-display font-bold mb-1 md:mb-2">{project.title}</h3>
      <p className="text-white/40 text-[10px] md:text-xs mb-3 md:mb-4 leading-relaxed line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-1 md:gap-1.5">
        {project.tags.map(tag => (
          <span key={tag} className="text-[7px] md:text-[8px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/30 uppercase tracking-wider">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const VideoPlayer: FC<{ video: VideoProject; vertical?: boolean }> = ({ video, vertical }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={`relative ${vertical ? 'aspect-[9/16]' : 'aspect-video'} rounded-3xl overflow-hidden glass group cursor-pointer bg-zinc-900/50`}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20">
          <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-zinc-900">
          <X size={32} className="text-red-400 mb-4 opacity-50" />
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Error al cargar video</p>
          <p className="text-xs text-white/60 font-medium">{video.title}</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          poster={video.thumbnail}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setIsLoading(false)}
          onError={() => {
            console.error(`Error loading video: ${video.videoUrl}`);
            setHasError(true);
            setIsLoading(false);
          }}
          onClick={togglePlay}
          preload="metadata"
        >
          <source src={video.videoUrl} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
      )}

      {/* Overlay simple para info */}
      {!hasError && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <h4 className="text-sm font-display font-medium text-white/90 uppercase tracking-widest">{video.title}</h4>
        </div>
      )}

      {/* Controles Custom */}
      {!hasError && (
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            onClick={(e) => { e.stopPropagation(); toggleMute(); }}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-emerald-400/50 backdrop-blur-md transition-colors"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      )}

      {/* Play/Pause Button Indicator */}
      {!hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {!isPlaying && (
            <div className="p-4 rounded-full bg-black/50 text-white backdrop-blur-md">
              <Play size={32} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SkillNode: FC<{ title: string; items: string[]; icon: any; color: string }> = ({ title, items, icon: Icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="relative p-8 rounded-3xl glass border-t-2"
    style={{ borderTopColor: color }}
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 rounded-2xl bg-white/5">
        <Icon size={24} style={{ color }} />
      </div>
      <h3 className="text-xl font-display font-bold uppercase tracking-widest">{title}</h3>
    </div>
    <ul className="space-y-4">
      {items.map(item => (
        <li key={item} className="flex items-center gap-3 text-white/60 group">
          <ChevronRight size={14} className="text-white/20 group-hover:text-emerald-400 transition-colors" />
          <span className="text-sm font-medium">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen font-sans bg-black text-white">
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-400 z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      {/* Hero / Intro */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-6">
        <motion.div
          className="absolute inset-0 z-0 bg-zinc-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
          <FloatingShapes />
        </motion.div>

        <div className="relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-display font-bold mb-6 md:mb-8 tracking-tighter leading-[0.9] md:leading-[0.85]">
              GONZALO <br /> <span className="gradient-text">SANGRA</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-white/40 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[10px] font-bold">
              <span>Comunicador Visual</span>
              <div className="hidden md:block w-12 h-[1px] bg-white/10" />
              <span className="md:hidden opacity-20">/</span>
              <span>Artista Integral</span>
              <div className="hidden md:block w-12 h-[1px] bg-white/10" />
              <span className="md:hidden opacity-20">/</span>
              <span>AI Implementation Expert</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Sobre Mí */}
      <section id="about" className="py-20 md:py-40 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 md:mb-6 block">01 / Biografía</span>
            <h2 className="text-4xl md:text-7xl font-display font-bold mb-6 md:mb-10 tracking-tighter leading-tight md:leading-none">
              El arte de <br /> conectar mundos.
            </h2>
            <div className="space-y-4 md:space-y-6 text-base md:text-xl text-white/60 leading-relaxed font-light">
              <p>
                Soy Gonzalo Sangrá, un comunicador visual y artista integral con base en San Luis, Argentina. Mi trayectoria es un recorrido por la arquitectura, el diseño y la tecnología, lo que me ha permitido desarrollar una visión única donde la precisión técnica se encuentra con la sensibilidad artística.
              </p>
              <p>
                Me defino como un profesional en constante formación, capaz de adaptarme a los cambios vertiginosos del mundo laboral actual. Mi experiencia abarca desde el muralismo y la escultura hasta el modelado 3D en Blender y la implementación de Inteligencia Artificial Generativa.
              </p>
              <p>
                Hoy, mi propósito es potenciar marcas y proyectos a través de una comunicación visual estratégica, utilizando herramientas de vanguardia como Gemini y Antigravity para crear experiencias digitales que no solo se ven bien, sino que funcionan bien.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-12">
              <a
                href="/assets/profile/gonzalo-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 md:py-3 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[10px] md:text-sm font-bold uppercase tracking-widest hover:bg-emerald-400/20 transition-colors w-full sm:w-auto"
              >
                <Download size={18} /> Descargar CV
              </a>
              <a
                href="/assets/profile/gonzalo-portfolio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 md:py-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] md:text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                <FileDown size={18} /> Ver Portafolio PDF
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-first lg:order-last"
          >
            <div className="aspect-[4/5] rounded-[32px] md:rounded-[40px] overflow-hidden glass p-3 md:p-4">
              <img
                src="/assets/profile/gonzalo-photo.jpg"
                alt="Gonzalo Sangrá"
                className="w-full h-full object-cover rounded-[24px] md:rounded-[32px]"
              />
            </div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-400/20 rounded-full blur-[100px]" />
          </motion.div>
        </div>
      </section>

      {/* Section 2: Mis Trabajos */}
      <section id="works" className="py-40 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="Mis Trabajos"
            subtitle="Una selección de mis proyectos que demuestran versatilidad en trabajos de branding, diseño 3D y producción audiovisual."
            centered
          />

          {/* Branding & Creation */}
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[1px] flex-1 bg-white/10" />
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30">Brandings y Creación de Marcas</h3>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
              {BRANDING_PROJECTS.map(project => (
                <ProjectCard key={project.id} project={project} onImageClick={setSelectedImage} />
              ))}
            </div>
          </div>

          {/* Particular Works */}
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[1px] flex-1 bg-white/10" />
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30">Trabajos Particulares</h3>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
              {CLIENT_PROJECTS.map(project => (
                <ProjectCard key={project.id} project={project} onImageClick={setSelectedImage} />
              ))}
            </div>
          </div>

          {/* Web Development Section */}
          <div id="web" className="mb-24 md:mb-32 px-4 md:px-0">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[1px] flex-1 bg-white/10" />
              <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30">Desarrollo Web</h3>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="max-w-5xl mx-auto rounded-[32px] md:rounded-[40px] overflow-hidden glass p-3 md:p-8 border border-white/5 relative group"
            >
              <div className="aspect-video md:aspect-[16/9] rounded-[20px] md:rounded-[24px] overflow-hidden border border-white/10 bg-black/40 relative">
                <iframe
                  src="https://caffeto-web2-0.vercel.app/"
                  className="w-full h-full border-none opacity-80 group-hover:opacity-100 transition-opacity"
                  title="Cafetto Preview"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                  <div>
                    <h3 className="text-xl md:text-3xl font-display font-bold mb-1 md:mb-2">Cafetto</h3>
                    <p className="text-white/60 text-[10px] md:text-sm max-w-md hidden sm:block font-light">Ecosistema digital premium para café de especialidad. Optimizada con Gemini Pro.</p>
                  </div>
                  <a
                    href="https://caffeto-web2-0.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 md:p-4 rounded-full bg-emerald-400 text-black hover:scale-110 transition-transform flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[9px] md:text-xs pointer-events-auto w-full sm:w-auto"
                  >
                    <Globe size={18} /> Visitar Sitio
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3D & Blender */}
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[1px] flex-1 bg-white/10" />
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30">Edición 3D & Blender</h3>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BLENDER_PROJECTS.map(video => (
                <VideoPlayer key={video.id} video={video} />
              ))}
            </div>
          </div>

          {/* Reels & Ads */}
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[1px] flex-1 bg-white/10" />
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30">Reels o Videos Publicitarios</h3>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {REEL_PROJECTS.map(reel => (
                <VideoPlayer key={reel.id} video={reel} vertical />
              ))}
            </div>
          </div>

          {/* Reels & Ads */}

          {/* Special Mention: Cafetto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 border border-white/5 p-12 md:p-20 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                <Zap size={14} /> Mención Especial: Cafetto
              </div>
              <h3 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tighter">Desarrollo Web Integral con IA</h3>
              <p className="text-xl text-white/60 mb-12 leading-relaxed">
                El proyecto Cafetto representa la cúspide de mi flujo de trabajo actual. Utilizando <span className="text-white font-bold">Gemini</span> para la optimización de contenido y <span className="text-white font-bold">Antigravity</span> para un desarrollo ágil, logramos una plataforma que redefine la comunicación visual de la marca.
              </p>
              <div className="flex justify-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-emerald-400">
                    <Cpu size={32} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Gemini AI</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-cyan-400">
                    <Box size={32} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Antigravity</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Mis Habilidades (Nodes) */}
      <section id="skills" className="py-40 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Mis Habilidades"
            subtitle="Una matriz de conocimiento donde el arte físico alimenta la precisión digital y la innovación tecnológica."
            centered
          />

          <div className="relative">
            {/* Visual Connections (Desktop Only) */}
            <div className="hidden lg:block absolute inset-0 z-0">
              <svg className="w-full h-full opacity-10" viewBox="0 0 1000 400">
                <path d="M 250 200 L 500 200 L 750 200" stroke="white" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                <circle cx="250" cy="200" r="4" fill="white" />
                <circle cx="500" cy="200" r="4" fill="white" />
                <circle cx="750" cy="200" r="4" fill="white" />
              </svg>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <SkillNode
                title="Nodo Físico"
                color="#f87171"
                icon={Palette}
                items={["Muralismo", "Escultura", "Fotografía", "Arte Visual y Plástica", "Dibujo Digital"]}
              />
              <SkillNode
                title="Nodo Digital"
                color="#60a5fa"
                icon={Layers}
                items={["Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects", "Blender (3D Modeling)", "Marketing Digital"]}
              />
              <SkillNode
                title="Nodo Tecnológico / IA"
                color="#34d399"
                icon={Code}
                items={["Inteligencia Artificial (Gemini)", "Diseño Web", "Antigravity (Low-Code)", "Vercel Deployment", "Programación Básica"]}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24 text-center"
          >
            <p className="text-white/30 text-sm italic max-w-xl mx-auto">
              "Mi arte plástico no es solo una disciplina, es el motor creativo que alimenta mi precisión técnica en el mundo digital."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-display font-bold mb-4 tracking-tighter">
              GONZALO<span className="text-emerald-400">SANGRA</span>
            </h3>
            <p className="text-white/30 text-xs uppercase tracking-[0.2em]">San Luis, Argentina • 2026</p>
          </div>

          <div className="flex gap-8">
            <a href="https://www.instagram.com/gonzalosangra/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-emerald-400 transition-colors flex items-center gap-2">
              <Instagram size={18} /> <span className="text-[10px] font-bold uppercase tracking-widest">Instagram</span>
            </a>
            <a href="mailto:gonzalosangra5@gmail.com" className="text-white/40 hover:text-emerald-400 transition-colors flex items-center gap-2">
              <Mail size={18} /> <span className="text-[10px] font-bold uppercase tracking-widest">Email</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
