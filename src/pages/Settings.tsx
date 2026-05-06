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
    <div className="space-y-8 pb-12 font-sans text-foreground max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] font-semibold tracking-widest text-primary mb-2 uppercase">Configuration</div>
          <h1 className="text-4xl font-bold tracking-tight">Node Settings</h1>
          <p className="text-muted-foreground mt-2 text-sm">Manage compute protocols, encryption, and visual telemetry.</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 space-y-2">
          <div className="rounded-xl bg-primary/10 border border-primary/20 text-primary p-4 cursor-pointer hover:bg-primary/20 transition-all flex items-center gap-3 font-semibold shadow-sm text-sm">
             <Hexagon className="w-5 h-5" />
             <span>Compute Node</span>
          </div>
          <div className="rounded-xl border border-transparent text-muted-foreground p-4 cursor-pointer hover:bg-muted hover:text-foreground transition-all flex items-center gap-3 font-medium text-sm">
             <Shield className="w-5 h-5" />
             <span>Security Vector</span>
          </div>
          <div className="rounded-xl border border-transparent text-muted-foreground p-4 cursor-pointer hover:bg-muted hover:text-foreground transition-all flex items-center gap-3 font-medium text-sm">
             <Network className="w-5 h-5" />
             <span>Telemetry API</span>
          </div>
          <div className="rounded-xl border border-transparent text-muted-foreground p-4 cursor-pointer hover:bg-muted hover:text-foreground transition-all flex items-center gap-3 font-medium text-sm">
             <Database className="w-5 h-5" />
             <span>Volume Storage</span>
          </div>
        </motion.div>

        <div className="lg:col-span-2 space-y-8">
          {SETTINGS_SECTIONS.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
            >
              <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
                  <section.icon className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
              </div>
              <div className="p-0">
                {section.settings.map((setting, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between p-5 border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <div>
                      <h3 className="font-medium text-sm">{setting.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{setting.desc}</p>
                    </div>
                    <div>
                      <div className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${setting.active ? 'bg-primary' : 'bg-muted border border-border'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${setting.active ? 'translate-x-5' : 'translate-x-0'}`}></div>
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
             className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8"
          >
             <div>
               <h3 className="font-semibold text-sm text-destructive">Purge Node Data</h3>
               <p className="text-xs text-destructive/80 mt-1">Permanently delete all locally cached volumes and insights.</p>
             </div>
             <button className="px-5 py-2.5 rounded-lg bg-destructive text-destructive-foreground font-medium text-sm transition-colors shrink-0 shadow-sm hover:bg-destructive/90">
               Execute Purge
             </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}