import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  Upload,
  Film,
  Loader2,
  RefreshCw,
  AlertCircle,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ProjectItem } from '../types';
import { CategoryInfo } from '../lib/projectRegistry';
import { MagneticButton } from './MagneticButton';

interface CaseStudyPageProps {
  project: ProjectItem;
  category: CategoryInfo;
  onBackToCategory: () => void;
  onBackToHome: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenInquiry: (projectName: string) => void;
  onUpdateVideo?: (projectId: string, videoUrl: string) => void;
}

export function CaseStudyPage({
  project,
  category,
  onBackToCategory,
  onBackToHome,
  onSelectProject,
  onOpenInquiry,
  onUpdateVideo,
}: CaseStudyPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const hasVideo = Boolean(project.videoUrl);
    setIsPlayingVideo(hasVideo);
    setIsVideoLoading(hasVideo);
    setVideoError(false);
  }, [project]);

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateVideo) {
      const blobUrl = URL.createObjectURL(file);
      onUpdateVideo(project.id, blobUrl);
      setIsPlayingVideo(true);
      setIsVideoLoading(true);
      setVideoError(false);
    }
  };

  const handleStartPlayback = () => {
    setIsPlayingVideo(true);
    setIsVideoLoading(true);
    setVideoError(false);
  };

  const handleRetryVideo = () => {
    setVideoError(false);
    setIsVideoLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  // Find previous and next projects in this category
  const currentIndex = category.projects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? category.projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < category.projects.length - 1
      ? category.projects[currentIndex + 1]
      : null;

  return (
    <article className="min-h-screen bg-[#08080A] text-white pt-28 pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase">
            <button
              onClick={onBackToHome}
              className="text-[#8E8E9A] hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-white/20">/</span>
            <button
              onClick={onBackToCategory}
              className="text-[#8E8E9A] hover:text-white transition-colors cursor-pointer"
            >
              {category.name}
            </button>
            <span className="text-white/20">/</span>
            <span className="text-white font-medium">{project.title}</span>
          </div>

          <div className="flex items-center gap-2">
            {onUpdateVideo && (
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white text-xs font-mono cursor-pointer transition-colors border border-white/10">
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Attach Video (.mp4)</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  className="hidden"
                  onChange={handleVideoFileChange}
                />
              </label>
            )}

            <button
              onClick={onBackToCategory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white text-xs font-mono transition-colors cursor-pointer border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Library</span>
            </button>
          </div>
        </div>

        {/* Project Header Info */}
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 text-white/80">
              {project.number}
            </span>
            <span className="text-xs uppercase tracking-wider font-mono text-[#9D9DA8]">
              {project.category}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-xs font-mono text-white/60">{project.year}</span>
            {project.featured && (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold">
                Category Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#C2C2CC] leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </header>

        {/* Media visual showcase */}
        <div className="relative aspect-[16/9] w-full bg-black rounded-2xl border border-white/[0.12] overflow-hidden group shadow-2xl">
          {project.videoUrl && isPlayingVideo ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              {/* Blurred poster background during video initialization for seamless visual continuity */}
              {isVideoLoading && project.image && (
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter blur-md brightness-40 scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                </div>
              )}

              {/* High-tech video preloader / buffering indicator */}
              {isVideoLoading && !videoError && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm pointer-events-none transition-opacity duration-300">
                  <div className="relative flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border border-emerald-500/20 animate-ping absolute" />
                    <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-emerald-400 animate-spin" />
                    <Loader2 className="w-5 h-5 text-emerald-400 animate-spin absolute" />
                  </div>

                  <div className="flex flex-col items-center gap-1.5 text-center px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono tracking-widest uppercase text-white font-medium">
                        INITIALIZING VIDEO STREAM
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-white/60 tracking-wide">
                      Buffering 4K frames & media stream...
                    </span>
                  </div>
                </div>
              )}

              {/* Video playback failure fallback */}
              {videoError ? (
                <div className="relative z-10 flex flex-col items-center justify-center gap-3 p-6 text-center max-w-sm">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-white">Playback Error</div>
                    <p className="text-xs text-white/60 font-mono">
                      Unable to stream the video from the source URL.
                    </p>
                  </div>
                  <button
                    onClick={handleRetryVideo}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer border border-white/10"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry Stream</span>
                  </button>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  loop
                  onLoadStart={() => {
                    setIsVideoLoading(true);
                    setVideoError(false);
                  }}
                  onWaiting={() => setIsVideoLoading(true)}
                  onCanPlay={() => setIsVideoLoading(false)}
                  onLoadedData={() => setIsVideoLoading(false)}
                  onPlaying={() => setIsVideoLoading(false)}
                  onError={() => {
                    setIsVideoLoading(false);
                    setVideoError(true);
                  }}
                  className={`w-full h-full object-contain bg-black transition-opacity duration-500 relative z-[1] ${
                    isVideoLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              )}
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E14] via-transparent to-black/30 pointer-events-none" />

              {/* Simulated cinematic player overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    4K Master Cut Available
                  </span>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                    {project.title}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pointer-events-auto">
                  {project.videoUrl ? (
                    <button
                      onClick={handleStartPlayback}
                      className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-[#eaeaea] transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>Play Reel</span>
                    </button>
                  ) : onUpdateVideo ? (
                    <label className="flex items-center gap-1.5 text-xs font-mono text-white/90 bg-black/70 hover:bg-black/90 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/20 cursor-pointer transition-colors">
                      <Film className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{project.duration || 'Watch Reel'}</span>
                    </label>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content body and Details */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0E0E14] border border-white/[0.08] space-y-10">
          
          {/* Key Metrics (if available in project.json) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#8A8A96]">
                    {m.label}
                  </div>
                  <div className="text-xl sm:text-2xl font-display font-bold text-white tabular-nums">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tools & Neural Models */}
          {project.tools && project.tools.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-white/[0.06]">
              <h3 className="text-xs uppercase font-mono tracking-wider text-[#8A8A96]">
                Generative Tools & Neural Pipeline
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.05] text-white/90 border border-white/[0.08]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#8E8E9A] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{project.category} · {project.year}</span>
              {project.client && (
                <>
                  <span className="text-white/20">•</span>
                  <span>{project.client}</span>
                </>
              )}
            </div>

            <MagneticButton
              onClick={() => onOpenInquiry(project.title)}
              strength={0.25}
              className="py-3 px-6 bg-white text-black text-xs uppercase font-semibold tracking-wider rounded-xl hover:bg-[#EDEDED] transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Inquire About Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>

        {/* Previous / Next Project navigation in category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/[0.08]">
          {prevProject ? (
            <button
              onClick={() => onSelectProject(prevProject)}
              className="group p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.15] text-left transition-colors cursor-pointer flex flex-col gap-1"
            >
              <span className="text-[11px] font-mono text-[#8E8E9A] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                Previous in {category.name}
              </span>
              <span className="text-base font-display font-bold text-white group-hover:text-emerald-400 transition-colors">
                {prevProject.title}
              </span>
            </button>
          ) : (
            <div />
          )}

          {nextProject ? (
            <button
              onClick={() => onSelectProject(nextProject)}
              className="group p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.15] text-right transition-colors cursor-pointer flex flex-col items-end gap-1"
            >
              <span className="text-[11px] font-mono text-[#8E8E9A] flex items-center gap-1">
                Next in {category.name}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="text-base font-display font-bold text-white group-hover:text-emerald-400 transition-colors">
                {nextProject.title}
              </span>
            </button>
          ) : (
            <div />
          )}
        </div>

      </div>
    </article>
  );
}
