import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Briefcase, 
  GraduationCap, 
  Gamepad2, 
  Trophy, 
  Mail, 
  Phone,
  ChevronRight,
  X,
  Sparkles,
  Camera,
  Cloud,
  ExternalLink,
  Play,
  FileText,
  Layout,
  Search,
  Filter,
  Dribbble
} from 'lucide-react';
import { RESUME_DATA } from './constants';

const WindowFrame = ({ title, children, onClose, className = "" }: { title: string, children: React.ReactNode, onClose?: () => void, className?: string }) => (
  <motion.div 
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className={`bg-white border-2 border-black rounded-lg overflow-hidden window-shadow ${className}`}
  >
    <div className="bg-black text-white px-3 py-1 flex justify-between items-center font-mono text-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <span>{title}</span>
      </div>
      {onClose && <button onClick={onClose}><X size={14} /></button>}
    </div>
    <div className="p-4">
      {children}
    </div>
  </motion.div>
);

const CloudSkill = ({ skill, style }: { skill: typeof RESUME_DATA.skills[0], style: any, key?: React.Key }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute group transition-all duration-300 z-10"
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center justify-center">
        {/* Cloud Shape using multiple circles */}
        <div className={`absolute inset-0 transition-colors duration-300 ${isHovered ? 'text-retro-blue' : 'text-white'}`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-current rounded-full border-2 border-black window-shadow" />
          <div className="absolute -top-4 left-1/4 w-12 h-12 bg-current rounded-full border-t-2 border-l-2 border-black" />
          <div className="absolute -top-6 left-1/2 w-14 h-14 bg-current rounded-full border-t-2 border-black" />
          <div className="absolute -top-3 right-1/4 w-10 h-10 bg-current rounded-full border-t-2 border-r-2 border-black" />
        </div>

        <div className="relative px-6 py-4 min-w-[140px] min-h-[80px] flex items-center justify-center text-center z-20">
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.div
                key="title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-1"
              >
                <Cloud size={20} className="text-blue-400" />
                <span className="font-bold text-sm text-black">{skill.name}</span>
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-[10px] text-black leading-tight font-medium max-w-[120px]"
              >
                {skill.detail}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const FloatingSkills = () => {
  const cloudStyles = [
    { top: '15%', left: '10%', scale: 1.1 },
    { top: '45%', left: '35%', scale: 1.0 },
    { top: '10%', left: '65%', scale: 1.2 },
    { top: '60%', left: '10%', scale: 1.15 },
    { top: '55%', left: '70%', scale: 1.1 },
  ];

  return (
    <div className="relative h-[400px] w-full overflow-hidden bg-white/30 rounded-2xl border-2 border-dashed border-slate-300 mb-12">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-slate-300 font-display text-5xl opacity-20 uppercase tracking-widest">Skill Map</span>
      </div>
      {RESUME_DATA.skills.map((skill, idx) => (
        <CloudSkill 
          key={idx} 
          skill={skill} 
          style={{ 
            top: cloudStyles[idx % cloudStyles.length].top, 
            left: cloudStyles[idx % cloudStyles.length].left,
            transform: `scale(${cloudStyles[idx % cloudStyles.length].scale})`
          }} 
        />
      ))}
    </div>
  );
};

const AcademicArchive = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    RESUME_DATA.academicArchive.forEach(item => item.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredItems = useMemo(() => {
    if (!filter) return RESUME_DATA.academicArchive;
    return RESUME_DATA.academicArchive.filter(item => item.tags.includes(filter));
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 pb-4 border-b border-dashed border-slate-200">
        <button 
          onClick={() => setFilter(null)}
          className={`px-3 py-1 rounded-full text-xs border border-black transition-colors ${!filter ? 'bg-black text-white' : 'bg-white hover:bg-slate-100'}`}
        >
          全部
        </button>
        {allTags.map(tag => (
          <button 
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-3 py-1 rounded-full text-xs border border-black transition-colors ${filter === tag ? 'bg-black text-white' : 'bg-white hover:bg-slate-100'}`}
          >
            #{tag}
          </button>
        ))}
      </div>
      
      <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {filteredItems.map((item, idx) => (
          <motion.div 
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={item.title} 
            className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-black transition-colors group"
          >
            <h5 className="font-bold text-sm group-hover:text-blue-600 transition-colors">{item.title}</h5>
            <div className="flex gap-2 mt-2">
              {item.tags.map(tag => (
                <span key={tag} className="text-[10px] text-slate-400">#{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const sections = [
    { id: 'product', title: '产品与 AI 实践', icon: <Briefcase className="text-blue-500" />, color: 'bg-blue-100' },
    { id: 'academic', title: '学术档案', icon: <GraduationCap className="text-purple-500" />, color: 'bg-purple-100' },
    { id: 'game', title: '游戏宇宙', icon: <Gamepad2 className="text-pink-500" />, color: 'bg-pink-100' },
    { id: 'others', title: '其他', icon: <Sparkles className="text-yellow-500" />, color: 'bg-yellow-100' },
  ];

  return (
    <div className="min-h-screen pb-20 selection:bg-retro-purple selection:text-white">
      {/* Hero Section */}
      <header className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-retro-blue to-retro-purple">
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center z-10"
        >
          <div className="inline-block bg-white/80 backdrop-blur px-6 py-2 rounded-full border-2 border-black mb-4 window-shadow">
            <h1 className="text-2xl md:text-4xl font-display tracking-wider">Welcome to My Channel!</h1>
          </div>
          <p className="text-slate-600 font-mono italic">"There has always been someone in my heart who has tried so hard to not be anyone."</p>
        </motion.div>
      </header>

      <main className="max-w-4xl mx-auto px-4 -mt-12 relative z-20">
        {/* Profile Section */}
        <WindowFrame title="About Me">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative group">
              <div className="absolute -inset-1 bg-black rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src={RESUME_DATA.profileImage} 
                alt={RESUME_DATA.name}
                className="w-48 h-64 object-cover rounded-lg border-2 border-black relative transition-all duration-500 bg-slate-200"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-2 -right-2 bg-retro-pink border-2 border-black p-2 rounded-full window-shadow">
                <Camera size={20} />
              </div>
            </div>
            
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h2 className="text-3xl font-display text-slate-900 mb-1">{RESUME_DATA.name}</h2>
                <p className="text-lg text-slate-600 font-medium">{RESUME_DATA.school} · {RESUME_DATA.major}</p>
                <p className="text-sm text-slate-400 font-mono mt-1 uppercase tracking-widest">{RESUME_DATA.status}</p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                  <Mail size={14} /> {RESUME_DATA.contact.email}
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                  <Phone size={14} /> {RESUME_DATA.contact.phone}
                </div>
              </div>

              <div className="pt-4 border-t border-dashed border-slate-200">
                <p className="text-slate-700 leading-relaxed italic">
                  "哲学与心理学的跨界探索者，热爱足球与游戏的逻辑分析师。"
                </p>
              </div>
            </div>
          </div>
        </WindowFrame>

        {/* Skills Cloud Section */}
        <div className="mt-12">
          <h3 className="text-xl font-display mb-6 flex items-center justify-center gap-2">
            <Cloud className="text-blue-400" />
            技能云图
          </h3>
          <FloatingSkills />
        </div>

        {/* Interactive Section */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-display mb-8 flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-500" />
            你想了解哪方面的我？
            <Sparkles className="text-yellow-500" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center justify-between p-4 rounded-xl border-2 border-black window-shadow ${section.color} group transition-colors`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg border border-black">
                    {section.icon}
                  </div>
                  <span className="font-bold text-lg">{section.title}</span>
                </div>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Detail Modals/Sections */}
        <AnimatePresence>
          {activeSection && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="w-full max-w-2xl max-h-[85vh] overflow-y-auto"
              >
                <WindowFrame 
                  title={sections.find(s => s.id === activeSection)?.title || ""} 
                  onClose={() => setActiveSection(null)}
                >
                  <div className="space-y-6 py-2">
                    {activeSection === 'product' && (
                      <div className="space-y-6">
                        {RESUME_DATA.productAI.map((item, idx) => (
                          <div key={idx} className="p-4 bg-blue-50 border border-blue-200 rounded-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-10"><Briefcase size={40} /></div>
                            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                              {item.video ? <Play size={16} /> : item.link ? <FileText size={16} /> : <Layout size={16} />}
                              {item.title}
                            </h4>
                            {item.desc && <p className="text-sm text-slate-600 mb-2">{item.desc}</p>}
                            {item.video && (
                              <a href={item.video} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-blue-600 hover:underline mb-3">
                                <ExternalLink size={12} /> 视频链接
                              </a>
                            )}
                            {item.expand && (
                              <div>
                                <button 
                                  onClick={() => setExpandedProject(expandedProject === idx ? null : idx)}
                                  className="text-xs bg-white border border-black px-3 py-1 rounded hover:bg-slate-100 transition-colors"
                                >
                                  {expandedProject === idx ? "收起说明" : "展开说明"}
                                </button>
                                <AnimatePresence>
                                  {expandedProject === idx && (
                                    <motion.p 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="text-xs text-slate-500 mt-3 leading-relaxed bg-white/50 p-3 rounded border border-blue-100"
                                    >
                                      {item.expand}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                            {item.link && (
                              <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs bg-white border border-black px-3 py-1 rounded hover:bg-slate-100 transition-colors">
                                <ExternalLink size={12} /> 查看报告
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {activeSection === 'academic' && <AcademicArchive />}

                    {activeSection === 'game' && (
                      <div className="space-y-6">
                        <div className="bg-pink-50 p-4 rounded-xl border border-pink-200">
                          <h4 className="font-bold mb-4 flex items-center gap-2"><Gamepad2 size={18} /> 游戏经历</h4>
                          <div className="space-y-3">
                            {RESUME_DATA.gameUniverse.experience.map((exp, i) => (
                              <div key={i} className="text-sm border-b border-pink-100 pb-2 last:border-0">
                                <span className="font-bold text-pink-600 mr-2">[{exp.cat}]</span>
                                <span className="text-slate-600">{exp.detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {RESUME_DATA.gameUniverse.docs.map((doc, i) => (
                            <a 
                              key={i} 
                              href={doc.link} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-black transition-all group"
                            >
                              <span className="text-sm font-bold">{doc.name}</span>
                              <ExternalLink size={14} className="text-slate-300 group-hover:text-black transition-colors" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeSection === 'others' && (
                      <div className="space-y-6">
                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                          <h4 className="font-bold mb-3 flex items-center gap-2"><Trophy size={18} /> 竞技体育</h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {RESUME_DATA.others.sportsInterests.map(interest => (
                              <span key={interest} className="bg-white px-3 py-1 rounded-full text-xs border border-yellow-200">{interest}</span>
                            ))}
                          </div>
                          <div className="border-2 border-black rounded-lg overflow-hidden window-shadow bg-white">
                            <img 
                              src={RESUME_DATA.others.sportsAttributeImage} 
                              alt="竞体属性表" 
                              className="w-full h-auto"
                            />
                          </div>
                        </div>
                        <div className="p-4 bg-[#f4f9d8] rounded-xl border-2 border-black window-shadow">
                          <h4 className="font-bold mb-2 text-sm flex items-center gap-2">
                            运动 🎾
                          </h4>
                          <p className="text-sm text-black leading-relaxed font-medium">{RESUME_DATA.others.sportsExperience}</p>
                        </div>

                        {/* LinaBell Section */}
                        <div className="bg-pink-50 p-4 rounded-xl border-2 border-pink-200 flex items-center gap-4 group hover:bg-pink-100 transition-colors">
                          <div className="w-16 h-16 rounded-full border-2 border-pink-400 overflow-hidden shrink-0 window-shadow">
                            <img src={RESUME_DATA.linaBell.avatar} alt="LinaBell" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-pink-600 flex items-center gap-2">
                              {RESUME_DATA.linaBell.title}
                              <Heart size={14} className="fill-pink-400 text-pink-400" />
                            </h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </WindowFrame>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Taskbar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black p-2 flex justify-center gap-4 z-40">
        <div className="flex items-center gap-4 px-4 py-1 bg-slate-100 rounded-lg border border-slate-300 font-mono text-xs">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> ONLINE</span>
          <span className="text-slate-400">|</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </footer>
    </div>
  );
}
