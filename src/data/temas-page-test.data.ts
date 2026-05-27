import type { CategoriaTemaId, TemaVisual } from "@/types/tema";

// === CATEGORIAS DE TEMAS | inicio ===
export const categoriasTema: Array<{ id: CategoriaTemaId; nome: string }> = [
  { id: "dark", nome: "Dark Classico" },
  { id: "light", nome: "Light Classico" },
  { id: "dark-neon", nome: "Dark Neon" },
  { id: "light-neon", nome: "Light Neon" },
  { id: "dark-cyber", nome: "Dark Cyberpunk" },
  { id: "light-cyber", nome: "Light Cyberpunk" },
  { id: "dark-sci", nome: "Dark Scientific" },
  { id: "light-sci", nome: "Light Scientific" },
  { id: "dark-editorial", nome: "Dark Editorial" },
  { id: "light-editorial", nome: "Light Editorial" },
  { id: "dark-nature", nome: "Dark Natureza" },
  { id: "light-nature", nome: "Light Natureza" },
  { id: "dark-luxury", nome: "Dark Luxo" },
  { id: "light-luxury", nome: "Light Luxo" }
];
// === CATEGORIAS DE TEMAS | fim ===

// === BANCO DE PALETAS | inicio ===
export const temasPorCategoria: Record<CategoriaTemaId, TemaVisual[]> = {
            "dark": [
                { name: "Telemetry Blue", bg: "#060913", text: "#F0F4F8", sec: "#718296", accent: "#00E5FF", border: "#2962FF" },
                { name: "Deep Space", bg: "#05050A", text: "#E2E8F0", sec: "#94A3B8", accent: "#38BDF8", border: "#1E3A8A" },
                { name: "Obsidian Core", bg: "#0F0F12", text: "#F3F4F6", sec: "#9CA3AF", accent: "#F3F4F6", border: "#374151" },
                { name: "Event Horizon", bg: "#020205", text: "#F5F5F7", sec: "#8E8E93", accent: "#A1A1AA", border: "#27272A" },
                { name: "Titan Methane", bg: "#0A0F14", text: "#E2F1F8", sec: "#78909C", accent: "#B0BEC5", border: "#37474F" },
                { name: "Eclipse Umbra", bg: "#0C0C0E", text: "#E5E7EB", sec: "#6B7280", accent: "#9CA3AF", border: "#4B5563" },
                { name: "Void Traveler", bg: "#080710", text: "#E0E7FF", sec: "#94A3B8", accent: "#C7D2FE", border: "#312E81" },
                { name: "Dark Comet", bg: "#0B0F19", text: "#F8FAFC", sec: "#64748B", accent: "#CBD5E1", border: "#1E293B" },
                { name: "Black Dwarf", bg: "#030712", text: "#F9FAFB", sec: "#9CA3AF", accent: "#E5E7EB", border: "#1F2937" },
                { name: "Cosmic Dust", bg: "#111111", text: "#F5F5F5", sec: "#A3A3A3", accent: "#E5E5E5", border: "#262626" }
            ],
            "light": [
                { name: "Apollo White", bg: "#F8FAFC", text: "#0F172A", sec: "#475569", accent: "#2563EB", border: "#94A3B8" },
                { name: "Solar Flare", bg: "#FFFBEB", text: "#78350F", sec: "#B45309", accent: "#D97706", border: "#FCD34D" },
                { name: "Stardust Plain", bg: "#F3F4F6", text: "#111827", sec: "#4B5563", accent: "#4B5563", border: "#D1D5DB" },
                { name: "Exosphere", bg: "#F0F9FF", text: "#0369A1", sec: "#0284C7", accent: "#0EA5E9", border: "#BAE6FD" },
                { name: "Lunar Dust", bg: "#F4F4F5", text: "#18181B", sec: "#52525B", accent: "#27272A", border: "#E4E4E7" },
                { name: "Stratosphere", bg: "#EEF2F6", text: "#1E293B", sec: "#64748B", accent: "#3B82F6", border: "#CBD5E1" },
                { name: "Nebula Light", bg: "#FAF5FF", text: "#581C87", sec: "#7E22CE", accent: "#A855F7", border: "#E9D5FF" },
                { name: "Glacier Moon", bg: "#F0FDFA", text: "#0F766E", sec: "#134E4A", accent: "#14B8A6", border: "#CCFBF1" },
                { name: "Cosmic Pearl", bg: "#FAFAFA", text: "#171717", sec: "#737373", accent: "#404040", border: "#E5E5E5" },
                { name: "Orion Belt", bg: "#F1F5F9", text: "#334155", sec: "#64748B", accent: "#475569", border: "#CBD5E1" }
            ],
            "dark-neon": [
                { name: "Caelum Neon", bg: "#090514", text: "#FFFFFF", sec: "#A78BFA", accent: "#F43F5E", border: "#8B5CF6" },
                { name: "Pulsar Green", bg: "#020617", text: "#F8FAFC", sec: "#34D399", accent: "#10B981", border: "#064E3B" },
                { name: "Andromeda Glow", bg: "#0F051D", text: "#FDF4FF", sec: "#E879F9", accent: "#D946EF", border: "#701A75" },
                { name: "Quasar Cyan", bg: "#030712", text: "#F9FAFB", sec: "#22D3EE", accent: "#06B6D4", border: "#083344" },
                { name: "Hyper Drive", bg: "#0D0221", text: "#F5F3FF", sec: "#A78BFA", accent: "#FF007F", border: "#4C1D95" },
                { name: "Gravity Pink", bg: "#11001C", text: "#FFF0F6", sec: "#FF87B2", accent: "#FF006E", border: "#4A002C" },
                { name: "Astro Mint", bg: "#001219", text: "#E2FDF2", sec: "#94D2BD", accent: "#0A9396", border: "#005F73" },
                { name: "Supernova Red", bg: "#0A0000", text: "#FFF5F5", sec: "#F87171", accent: "#EF4444", border: "#7F1D1D" },
                { name: "Plasma Gold", bg: "#0C0A00", text: "#FFFDF0", sec: "#FBBF24", accent: "#F59E0B", border: "#78350F" },
                { name: "Neutron Flash", bg: "#020813", text: "#FFFFFF", sec: "#38BDF8", accent: "#00F0FF", border: "#1E40AF" }
            ],
            "light-neon": [
                { name: "Cyber Day", bg: "#FFF5F5", text: "#991B1B", sec: "#EF4444", accent: "#FF0055", border: "#FEE2E2" },
                { name: "Electric Sky", bg: "#F0F9FF", text: "#075985", sec: "#0EA5E9", accent: "#00D2FF", border: "#E0F2FE" },
                { name: "Toxic Asteroid", bg: "#F0FDF4", text: "#166534", sec: "#16A34A", accent: "#10B981", border: "#DCFCE7" },
                { name: "Acid Moon", bg: "#FEFCE8", text: "#854D0E", sec: "#CA8A04", accent: "#EAB308", border: "#FEF9C3" },
                { name: "Neon Quartz", bg: "#FDF4FF", text: "#86198F", sec: "#D946EF", accent: "#F43F5E", border: "#FAE8FF" },
                { name: "Bubble Nebula", bg: "#FFF1F2", text: "#9D174D", sec: "#F43F5E", accent: "#FF007F", border: "#FFE4E6" },
                { name: "Radioactive Light", bg: "#FAFAF9", text: "#1C1917", sec: "#78716C", accent: "#39FF14", border: "#E7E5E4" },
                { name: "Laser Flare", bg: "#FFF7ED", text: "#9A3412", sec: "#EA580C", accent: "#FF4500", border: "#FFEDD5" },
                { name: "Cosmic Mint", bg: "#F0FDF4", text: "#14532D", sec: "#15803D", accent: "#00FFCC", border: "#DCFCE7" },
                { name: "Static Signal", bg: "#F8FAFC", text: "#334155", sec: "#475569", accent: "#4F46E5", border: "#E2E8F0" }
            ],
            "dark-cyber": [
                { name: "Matrix Orbit", bg: "#030704", text: "#E8F5E9", sec: "#4CAF50", accent: "#00FF66", border: "#1B5E20" },
                { name: "Cyberpunk 2077", bg: "#0D0D0D", text: "#FFFF00", sec: "#A6A600", accent: "#FFFF00", border: "#262626" },
                { name: "Megacity Grid", bg: "#0B0C10", text: "#C5C6C7", sec: "#66FCF1", accent: "#45A29E", border: "#1F2833" },
                { name: "Synthwave Dusk", bg: "#1A0933", text: "#FCE7F3", sec: "#F472B6", accent: "#FF007F", border: "#4C1D95" },
                { name: "Tokyo Neon", bg: "#05050A", text: "#FFFFFF", sec: "#00FFFF", accent: "#FF00FF", border: "#1E1E38" },
                { name: "Netrunner Black", bg: "#0A0F0D", text: "#D1FAE5", sec: "#34D399", accent: "#059669", border: "#064E3B" },
                { name: "Glitch Void", bg: "#0D0208", text: "#00FF41", sec: "#008F11", accent: "#00FF41", border: "#1A1A1A" },
                { name: "Chrome Core", bg: "#121214", text: "#E4E4E7", sec: "#A1A1AA", accent: "#3F3F46", border: "#27272A" },
                { name: "Hacker Protocol", bg: "#040D12", text: "#93B1A6", sec: "#5C8374", accent: "#183D3D", border: "#040D12" },
                { name: "Rebel Station", bg: "#1C0A10", text: "#FCE7F3", sec: "#FB7185", accent: "#E11D48", border: "#4C0519" }
            ],
            "light-cyber": [
                { name: "Neo Arcade", bg: "#FFF5FF", text: "#4A044E", sec: "#C084FC", accent: "#E879F9", border: "#F3E8FF" },
                { name: "Cyber White", bg: "#F8FAFC", text: "#0F172A", sec: "#0284C7", accent: "#06B6D4", border: "#E2E8F0" },
                { name: "Glitch Day", bg: "#FAFAFA", text: "#171717", sec: "#EF4444", accent: "#00FFFF", border: "#E5E5E5" },
                { name: "Plastic Space", bg: "#EDF2F7", text: "#2D3748", sec: "#4A5568", accent: "#ED64A6", border: "#CBD5E0" },
                { name: "Acid Rain", bg: "#FCFDE6", text: "#3F4E13", sec: "#7D9D24", accent: "#A3E635", border: "#ECFCCB" },
                { name: "Chroma Day", bg: "#F5F3FF", text: "#2E1065", sec: "#7C3AED", accent: "#EC4899", border: "#DDD6FE" },
                { name: "Synthwave Day", bg: "#FFF0F6", text: "#500732", sec: "#D946EF", accent: "#FF007F", border: "#FFDEE9" },
                { name: "Grid Tech", bg: "#F1F5F9", text: "#1E293B", sec: "#475569", accent: "#0EA5E9", border: "#CBD5E1" },
                { name: "Bright Byte", bg: "#F0FDF4", text: "#14532D", sec: "#22C55E", accent: "#16A34A", border: "#DCFCE7" },
                { name: "Cyberpunk Dust", bg: "#FFFBEB", text: "#451A03", sec: "#D97706", accent: "#FBBF24", border: "#FEF3C7" }
            ],
            "dark-sci": [
                { name: "Deep Radar", bg: "#050B0A", text: "#E0F2F1", sec: "#527874", accent: "#39FF14", border: "#00BFA5" },
                { name: "Astrophysics", bg: "#0C0F12", text: "#E2E8F0", sec: "#64748B", accent: "#38BDF8", border: "#1E293B" },
                { name: "Laboratory 9", bg: "#0F172A", text: "#F8FAFC", sec: "#94A3B8", accent: "#38BDF8", border: "#334155" },
                { name: "Quantum Mechanics", bg: "#0A0512", text: "#F3E8FF", sec: "#C084FC", accent: "#A855F7", border: "#3B0764" },
                { name: "Isotope Dark", bg: "#1A1A1A", text: "#FFFFFF", sec: "#99FF33", accent: "#99FF33", border: "#333333" },
                { name: "Deep Infrared", bg: "#120505", text: "#FEE2E2", sec: "#F87171", accent: "#EF4444", border: "#451A03" },
                { name: "Spectrograph", bg: "#080C14", text: "#F1F5F9", sec: "#475569", accent: "#F59E0B", border: "#1E293B" },
                { name: "Radio Telescope", bg: "#030712", text: "#E5E7EB", sec: "#9CA3AF", accent: "#60A5FA", border: "#1F2937" },
                { name: "Telemetry Green", bg: "#050C09", text: "#ECFDF5", sec: "#6EE7B7", accent: "#10B981", border: "#064E3B" },
                { name: "Bio-Dome", bg: "#061005", text: "#F0FDF4", sec: "#86EFAC", accent: "#22C55E", border: "#14532D" }
            ],
            "light-sci": [
                { name: "Clean Lab", bg: "#F8FAFC", text: "#0F172A", sec: "#475569", accent: "#0284C7", border: "#E2E8F0" },
                { name: "Isotope Light", bg: "#FFFFFF", text: "#1A1A1A", sec: "#66CC00", accent: "#66CC00", border: "#E5E5E5" },
                { name: "Research Center", bg: "#F1F5F9", text: "#1E293B", sec: "#64748B", accent: "#4F46E5", border: "#CBD5E1" },
                { name: "Infrared Scan", bg: "#FFF5F5", text: "#7F1D1D", sec: "#DC2626", accent: "#EF4444", border: "#FEE2E2" },
                { name: "Bio-Report", bg: "#F0FDF4", text: "#14532D", sec: "#16A34A", accent: "#15803D", border: "#DCFCE7" },
                { name: "Telemetry Sheet", bg: "#F0F9FF", text: "#0C4A6E", sec: "#0284C7", accent: "#0EA5E9", border: "#E0F2FE" },
                { name: "Clinical Day", bg: "#FAFAFA", text: "#262626", sec: "#737373", accent: "#0D9488", border: "#E5E5E5" },
                { name: "Stellar Map", bg: "#F8FAFC", text: "#334155", sec: "#64748B", accent: "#2563EB", border: "#E2E8F0" },
                { name: "Geology Station", bg: "#FAF7F5", text: "#451A03", sec: "#9A3412", accent: "#D97706", border: "#EDE8E4" },
                { name: "Spectra Light", bg: "#FFFBEB", text: "#78350F", sec: "#B45309", accent: "#EA580C", border: "#FCD34D" }
            ],
            "dark-editorial": [
                { name: "Ink Review", bg: "#111111", text: "#F7F3EA", sec: "#B8AEA0", accent: "#D6A85A", border: "#3A332A" },
                { name: "Midnight Press", bg: "#0B1020", text: "#F8FAFC", sec: "#94A3B8", accent: "#60A5FA", border: "#1E3A8A" },
                { name: "Charcoal Essay", bg: "#18181B", text: "#FAFAFA", sec: "#A1A1AA", accent: "#EAB308", border: "#3F3F46" },
                { name: "Museum Notes", bg: "#16120F", text: "#F5EFE7", sec: "#C2B6A6", accent: "#C08457", border: "#4A3428" },
                { name: "Cinema Noir", bg: "#08080A", text: "#F4F4F5", sec: "#A1A1AA", accent: "#E11D48", border: "#3F0A16" },
                { name: "Blue Journal", bg: "#0E1726", text: "#EFF6FF", sec: "#93C5FD", accent: "#3B82F6", border: "#1D4ED8" },
                { name: "Copper Column", bg: "#1A0F0A", text: "#FFF7ED", sec: "#FDBA74", accent: "#EA580C", border: "#7C2D12" },
                { name: "Olive Ledger", bg: "#11150B", text: "#F7FEE7", sec: "#A3E635", accent: "#84CC16", border: "#3F6212" }
            ],
            "light-editorial": [
                { name: "Paper Review", bg: "#FFFCF5", text: "#1C1917", sec: "#78716C", accent: "#B45309", border: "#E7D8C9" },
                { name: "Sunday Insert", bg: "#F8FAFC", text: "#0F172A", sec: "#475569", accent: "#2563EB", border: "#CBD5E1" },
                { name: "Gallery White", bg: "#FAFAF9", text: "#292524", sec: "#78716C", accent: "#A16207", border: "#E7E5E4" },
                { name: "Editorial Rose", bg: "#FFF1F2", text: "#881337", sec: "#BE123C", accent: "#E11D48", border: "#FFE4E6" },
                { name: "Notebook Blue", bg: "#EFF6FF", text: "#1E3A8A", sec: "#2563EB", accent: "#1D4ED8", border: "#DBEAFE" },
                { name: "Archive Sand", bg: "#FEF3C7", text: "#78350F", sec: "#92400E", accent: "#D97706", border: "#FDE68A" },
                { name: "Soft Magazine", bg: "#FDF2F8", text: "#831843", sec: "#BE185D", accent: "#DB2777", border: "#FCE7F3" },
                { name: "Morning Column", bg: "#F7F7F2", text: "#27272A", sec: "#71717A", accent: "#52525B", border: "#D6D3D1" }
            ],
            "dark-nature": [
                { name: "Forest Floor", bg: "#07130D", text: "#ECFDF5", sec: "#86EFAC", accent: "#22C55E", border: "#14532D" },
                { name: "Moss Trail", bg: "#10160A", text: "#F7FEE7", sec: "#BEF264", accent: "#84CC16", border: "#365314" },
                { name: "Deep Ocean", bg: "#03121A", text: "#ECFEFF", sec: "#67E8F9", accent: "#06B6D4", border: "#155E75" },
                { name: "Volcanic Ash", bg: "#15100D", text: "#FFF7ED", sec: "#FDBA74", accent: "#F97316", border: "#7C2D12" },
                { name: "Night Garden", bg: "#100B14", text: "#FAF5FF", sec: "#D8B4FE", accent: "#A855F7", border: "#581C87" },
                { name: "Rain Canopy", bg: "#06120F", text: "#F0FDFA", sec: "#5EEAD4", accent: "#14B8A6", border: "#115E59" },
                { name: "Cedar Shadow", bg: "#120D08", text: "#FFF7ED", sec: "#D6B18A", accent: "#C2410C", border: "#431407" },
                { name: "Aurora Pines", bg: "#061018", text: "#E0F2FE", sec: "#7DD3FC", accent: "#38BDF8", border: "#075985" }
            ],
            "light-nature": [
                { name: "Botanical Sheet", bg: "#F0FDF4", text: "#14532D", sec: "#15803D", accent: "#16A34A", border: "#BBF7D0" },
                { name: "Meadow Morning", bg: "#F7FEE7", text: "#365314", sec: "#65A30D", accent: "#84CC16", border: "#D9F99D" },
                { name: "Coastal Air", bg: "#ECFEFF", text: "#164E63", sec: "#0891B2", accent: "#06B6D4", border: "#CFFAFE" },
                { name: "Clay Garden", bg: "#FFF7ED", text: "#7C2D12", sec: "#C2410C", accent: "#EA580C", border: "#FED7AA" },
                { name: "Lavender Field", bg: "#F5F3FF", text: "#4C1D95", sec: "#7C3AED", accent: "#8B5CF6", border: "#DDD6FE" },
                { name: "Sage Studio", bg: "#F6F7F1", text: "#263528", sec: "#5F6F52", accent: "#6B8E23", border: "#D6DEC8" },
                { name: "Sunlit Grove", bg: "#FFFBEB", text: "#713F12", sec: "#A16207", accent: "#CA8A04", border: "#FEF3C7" },
                { name: "Alpine Mist", bg: "#F0F9FF", text: "#0C4A6E", sec: "#0369A1", accent: "#0EA5E9", border: "#BAE6FD" }
            ],
            "dark-luxury": [
                { name: "Black Marble", bg: "#09090B", text: "#FAFAFA", sec: "#A1A1AA", accent: "#D4AF37", border: "#3F3F46" },
                { name: "Velvet Wine", bg: "#16050A", text: "#FFF1F2", sec: "#FDA4AF", accent: "#BE123C", border: "#881337" },
                { name: "Emerald Suite", bg: "#03120C", text: "#ECFDF5", sec: "#6EE7B7", accent: "#10B981", border: "#065F46" },
                { name: "Sapphire Night", bg: "#071225", text: "#EFF6FF", sec: "#93C5FD", accent: "#2563EB", border: "#1E40AF" },
                { name: "Royal Plum", bg: "#13071E", text: "#FAF5FF", sec: "#C084FC", accent: "#9333EA", border: "#581C87" },
                { name: "Champagne Shadow", bg: "#15120B", text: "#FEFCE8", sec: "#FDE68A", accent: "#EAB308", border: "#713F12" },
                { name: "Graphite Gold", bg: "#121212", text: "#F5F5F4", sec: "#A8A29E", accent: "#F59E0B", border: "#44403C" },
                { name: "Ruby Lounge", bg: "#140508", text: "#FFF1F2", sec: "#FB7185", accent: "#E11D48", border: "#4C0519" }
            ],
            "light-luxury": [
                { name: "Pearl Atelier", bg: "#FAF7F2", text: "#1C1917", sec: "#78716C", accent: "#A16207", border: "#E7D8C9" },
                { name: "Champagne Hall", bg: "#FFFBEB", text: "#713F12", sec: "#B45309", accent: "#D97706", border: "#FDE68A" },
                { name: "Silk Rose", bg: "#FFF1F2", text: "#881337", sec: "#BE123C", accent: "#E11D48", border: "#FFE4E6" },
                { name: "Ivory Emerald", bg: "#F0FDF4", text: "#064E3B", sec: "#047857", accent: "#059669", border: "#BBF7D0" },
                { name: "Porcelain Blue", bg: "#EFF6FF", text: "#1E3A8A", sec: "#2563EB", accent: "#1D4ED8", border: "#BFDBFE" },
                { name: "Soft Onyx", bg: "#F5F5F4", text: "#1C1917", sec: "#57534E", accent: "#292524", border: "#D6D3D1" },
                { name: "Gold Leaf", bg: "#FEFCE8", text: "#713F12", sec: "#A16207", accent: "#CA8A04", border: "#FEF08A" },
                { name: "Lavish Lilac", bg: "#FAF5FF", text: "#581C87", sec: "#7E22CE", accent: "#9333EA", border: "#E9D5FF" }
            ]
        };
// === BANCO DE PALETAS | fim ===


