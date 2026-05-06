import { Settings as SettingsIcon, Shield, Bell, Key, Monitor, Database, Beaker, Hexagon, Network, Zap } from "lucide-react";
import { motion } from "motion/react";

const SETTINGS_SECTIONS = [
  {
    title: "System Interfaces",
    icon: Monitor,
    settings: [
      { name: "Holographic Overlays", desc: "Enable 3D volumetric HUD in Viewer3D", active: true },
      { name: "Neural Interpolation", desc: "Allow AI to guess frame gaps in STL uploads", active: false },
      { name: "Dark Mode Enforcement", desc: "Lock interface to high-contrast dark theme", active: true },
    ]
  },
  {
    title: "Security & Encryption",
    icon: Shield,
    settings: [
      { name: "Quantum Resistant Keys", desc: "Upgrade payload encryption to AES-256-GCM", active: true },
      { name: "Bio-Metric Lock", desc: "Require FaceID for accessing clinical notes", active: false },
      { name: "Session Expiry", desc: "Auto-terminate idle compute sessions after 15m", active: true },
    ]
  },
  {
    title: "AI & Compute",
    icon: Zap,
    settings: [
      { name: "Predictive Caching", desc: "Pre-load adjacent voxel data during scroll", active: true },
      { name: "Aggressive Diagnostics", desc: "Flag micro-fractures during initial scan analysis", active: true },
    ]
  }
];

export function Settings() {
  return (
    <div className="space-y-8 pb-12 font-sans text-white max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] font-mono tracking-widest text-[#2563EB] mb-2 drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]">SYSTEM_CONFIGURATION</div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94A3B8] tracking-tight">Node Settings</h1>
          <p className="text-[#94A3B8] mt-2 text-sm font-light">Manage compute protocols, encryption, and visual telemetry.</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 space-y-2">
          <div className="rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-white p-4 cursor-pointer hover:bg-[#2563EB]/20 transition-all flex items-center gap-3">
             <Hexagon className="w-5 h-5 text-[#3B82F6]" />
             <span className="font-semibold text-sm">Compute Node</span>
          </div>
          <div className="rounded-2xl border border-transparent text-[#94A3B8] p-4 cursor-pointer hover:bg-white/5 transition-all flex items-center gap-3">
             <Shield className="w-5 h-5" />
             <span className="font-semibold text-sm">Security Vector</span>
          </div>
          <div className="rounded-2xl border border-transparent text-[#94A3B8] p-4 cursor-pointer hover:bg-white/5 transition-all flex items-center gap-3">
             <Network className="w-5 h-5" />
             <span className="font-semibold text-sm">Telemetry API</span>
          </div>
          <div className="rounded-2xl border border-transparent text-[#94A3B8] p-4 cursor-pointer hover:bg-white/5 transition-all flex items-center gap-3">
             <Database className="w-5 h-5" />
             <span className="font-semibold text-sm">Volume Storage</span>
          </div>
        </motion.div>

        <div className="lg:col-span-2 space-y-8">
          {SETTINGS_SECTIONS.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className="rounded-[2rem] border border-white/5 bg-[#0F172A]/60 backdrop-blur-3xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
                <section.icon className="w-5 h-5 text-[#2563EB]" />
                <h2 className="text-lg font-bold tracking-tight text-white">{section.title}</h2>
              </div>
              <div className="p-0">
                {section.settings.map((setting, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between p-6 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <div>
                      <h3 className="font-semibold text-sm text-white">{setting.name}</h3>
                      <p className="text-xs text-[#94A3B8] mt-1 font-light">{setting.desc}</p>
                    </div>
                    <div>
                      <div className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${setting.active ? 'bg-[#14B8A6]' : 'bg-[#020617] border border-white/20'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${setting.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12"
          >
             <div>
               <h3 className="font-bold text-sm text-red-500">Purge Node Data</h3>
               <p className="text-xs text-red-400/80 mt-1">Permanently delete all locally cached volumes and insights.</p>
             </div>
             <button className="px-6 py-2.5 rounded-full bg-red-500 text-white font-bold text-xs tracking-wider uppercase hover:bg-red-600 transition-colors shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
               Execute Purge
             </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}