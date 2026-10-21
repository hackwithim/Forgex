export const EXPEDITION_DATA = {
  title: "OPERATION FORGE X",
  subtitle: "India’s First Military-Led Leadership Expedition",
  tagline: "A leadership experience for decision-makers, led by decorated senior military veterans.",
  dates: "27–30 November 2026",
  location: "Hyatt Regency Dehradun, India",
  phones: [
    { label: "Direct Line 1", number: "+91 9979869175", raw: "919979869175" },
    { label: "Direct Line 2", number: "+91 9408758746", raw: "919408758746" }
  ],
  stats: [
    { value: "03", label: "INTENSE DAYS", sub: "Episodic Tactical Immersion" },
    { value: "07", label: "MILITARY COMMANDERS", sub: "Army · Navy · Air Force" },
    { value: "20", label: "OPERATIVES / PLATOON", sub: "Strictly Capped Cohort" },
    { value: "5★", label: "HYATT BASECAMP", sub: "Foothills of Dehradun" }
  ],
  doctrine: {
    leadQuote: "Leadership is not only tested by what happens. It is tested by how you respond.",
    p1: "Leadership often requires decisions to be made with incomplete information, competing priorities and little time to consider the alternatives. The ability to remain composed, communicate clearly and bring people together becomes particularly important when familiar ways of working no longer apply.",
    p2: "Operation Forge X is designed to explore these qualities through experience. Across three days, participants enter a structured, military-inspired environment led by retired officers and experienced faculty. Physical activities, team missions and leadership sessions create opportunities to observe how individuals and groups respond to unfamiliar situations.",
    mission: "Develop your ability to respond under pressure, strengthen the way you work with others, and leave with a clearer understanding of your own approach to leadership."
  },
  faculty: [
    {
      id: "bharwan",
      name: "Col. Rajeev Bharwan (Retd.)",
      branch: "army",
      branchName: "Indian Army",
      tag: "Expedition Commander",
      role: "Gorkha Rifles & Airborne Specialist",
      image: "assets/images/faculty/bharwan.jpg",
      bio: "Veteran of the Indian Army with over two decades of distinguished service in high-altitude warfare, counter-insurgency, and parachute operations. Day 01 Keynote: What It Takes to Lead.",
      dossier: [
        "Commended for resolute leadership in high-risk border operations.",
        "Specialist in unconventional problem-solving and rapid combat team cohesion.",
        "Translates regimental battlefield discipline into decisive board-level governance."
      ]
    },
    {
      id: "kashyap_sc",
      name: "Col. Kaushal Kashyap, SC",
      branch: "army",
      branchName: "Special Forces",
      tag: "Shaurya Chakra",
      role: "Former Special Forces Commander & Author",
      image: "assets/images/faculty/kashyap_sc.jpg",
      bio: "Decorated Special Forces Commander and Shaurya Chakra recipient. Renowned author and military leadership strategist on psychological endurance, warrior courage, and high-performance team mindsets.",
      dossier: [
        "Conferred the Shaurya Chakra for gallantry in frontline Special Forces operations.",
        "Pioneered high-altitude commando strike coordination and situational composure models.",
        "Author on operational grit and building resilient leadership cultures under extreme friction."
      ]
    },
    {
      id: "kapoor",
      name: "Air Marshal Nagesh Kapoor (Retd.)",
      branch: "airforce",
      branchName: "Indian Air Force",
      tag: "Former Vice Chief of Air Staff",
      role: "SYSM · PVSM · AVSM · VM",
      image: "assets/images/faculty/kapoor.jpg",
      bio: "Former Vice Chief of Air Staff, Indian Air Force. Decorated with SYSM, PVSM, AVSM, VM. Top-tier supersonic combat pilot with thousands of flying hours who directed strategic air doctrine.",
      dossier: [
        "Conferred the Param Vishisht Seva Medal and Ati Vishisht Seva Medal for extraordinary service.",
        "Expert in split-second high-G decision making under severe uncertainty and strategic ambiguity.",
        "Delivers masterclasses on strategic air dominance, organizational survivability, and mission clarity."
      ]
    },
    {
      id: "tewari",
      name: "Cmde. Shiv Tewari (Retd.)",
      branch: "navy",
      branchName: "Indian Navy & DefTech",
      tag: "Warship Fleet Commander",
      role: "Co-founder, Aksha Integrated Design & Arista Risk",
      image: "assets/images/faculty/tewari.jpg",
      bio: "Ex-Indian Navy commander and defense-technology entrepreneur. Co-founder of Aksha Integrated Design & Arista Risk. Bridges frontline naval command with deep-tech innovation and corporate risk strategy.",
      dossier: [
        "Commanded guided-missile destroyers in complex blue-water tactical exercises.",
        "Architect of maritime defense modernization programs and joint aerospace initiatives.",
        "Guides founders on technological agility, supply-chain resilience, and crisis alignment."
      ]
    },
    {
      id: "sathe",
      name: "Wg. Cdr. Amit Sathe (Retd.)",
      branch: "airforce",
      branchName: "Indian Air Force",
      tag: "Combat Fighter Pilot",
      role: "Host, Officers' Mess / Night 02 Immersion",
      image: "assets/images/faculty/sathe.jpg",
      bio: "Combat fighter pilot and Qualified Flying Instructor with mastery in supersonic tactics and cockpit resource management. Host of the Night 02 traditional Officers' Mess banquet.",
      dossier: [
        "Instructed elite fighter squadrons in supersonic combat maneuvering and high-G drills.",
        "Master of debriefing culture where failure is deconstructed without ego or hierarchy.",
        "Translates aviation post-flight analytics to enterprise post-mortems and learning loops."
      ]
    },
    {
      id: "kaushalendra",
      name: "Lt. Col. Kaushalendra Singh, SM",
      branch: "army",
      branchName: "Indian Army & Special Ops",
      tag: "Sena Medal Veteran",
      role: "Host, 'Monks & Warriors' / Night 01 Immersion",
      image: "assets/images/faculty/kaushalendra.jpg",
      bio: "Decorated combat veteran and Sena Medal recipient. Host of the Night 01 campfire session 'Monks & Warriors,' bridging battlefield grit with contemplative discipline and mental fortitude.",
      dossier: [
        "Awarded the Sena Medal for gallantry and resolute command in active combat operations.",
        "Parachute-trained combat leader experienced in unconventional mountain warfare.",
        "Leads the Night 01 campfire exploration into character, composure, and ethical leadership."
      ]
    }
  ],
  days: [
    {
      id: "day-1",
      number: "01",
      name: "DAY 01 — MUSTER",
      sub: "Assemble · Connect · Prepare",
      motto: "STEP OUT OF THE FAMILIAR.",
      phases: [
        {
          tag: "PHASE 01 // ARRIVAL & INDUCTION",
          title: "INDUCTION & ORIENTATION",
          desc: "Arrive at the Hyatt Regency Dehradun basecamp, meet your fellow operatives, and transition from executive routine into expedition mindset with kit allocation and platoon briefing."
        },
        {
          tag: "KEYNOTE ADDRESS",
          title: "WHAT IT TAKES TO LEAD",
          speaker: "Delivered by Col. Rajeev Bharwan (Retd.)",
          desc: "Col. Rajeev Bharwan (Retd.) sets the operational context for the days ahead, drawing on two decades of operational military command to explore what leadership asks of individuals when certainty vanishes."
        },
        {
          tag: "NIGHT IMMERSION",
          title: "CAMPFIRE DISPATCHES",
          speaker: "Open Fireline Discussions",
          desc: "Gather under the Himalayan night sky around the crackling bonfire for candid discussions, regimental military lore, and shared reflections on high-stakes dilemmas."
        }
      ],
      image: "assets/images/hero_expedition.jpg",
      captionTitle: "THE MUSTER & PLATOON INDUCTION",
      caption: "Step away from familiar comfort into a structured military crucible designed to uncover your true operational instincts."
    },
    {
      id: "day-2",
      number: "02",
      name: "DAY 02 — THE CRUCIBLE",
      sub: "Challenge · Adapt · Lead",
      motto: "PRESSURE REVEALS CHARACTER.",
      phases: [
        {
          tag: "PHASE 02 // FIELD OPERATIONS",
          title: "MISSION TASKS — PUT YOUR TEAM TO THE TEST",
          desc: "Step into practical challenges that demand coordination, adaptability, and collective problem-solving. Put your learning into action through team-based missions that test judgement, communication, and shared accountability."
        },
        {
          tag: "KEYNOTE ADDRESS",
          title: "LEADERSHIP UNDER FIRE",
          speaker: "Delivered by Cmde. Shiv Tewari (Retd.)",
          desc: "Cmde. Shiv Tewari explores how leaders navigate uncertainty, make critical decisions, and guide their teams through challenging situations, connecting military grit with tech innovation."
        },
        {
          tag: "NIGHT EXPERIENCE // FORMAL DINNER",
          title: "THE OFFICERS’ MESS",
          speaker: "Hosted by Wg. Cdr. Amit Sathe (Retd.) & Col. Rajeev Bharwan (Retd.)",
          desc: "Join Wg. Cdr. Amit Sathe (Retd.) and Col. Rajeev Bharwan (Retd.) for an evening inspired by Officers’ Mess traditions, bringing the cohort together over formal dinner, conversation, and camaraderie."
        }
      ],
      image: "assets/images/crucible_action.jpg",
      captionTitle: "THE CRUCIBLE FIELD MISSIONS",
      caption: "Real-world team-based problem solving under pressure in rugged Himalayan foothills. Observe how your peers communicate when comfort disappears."
    },
    {
      id: "day-3",
      number: "03",
      name: "DAY 03 — GRADUATION",
      sub: "Reflect · Recognise · Move Forward",
      motto: "FINISH AS ONE UNIT.",
      phases: [
        {
          tag: "PHASE 03 // CULMINATING EXERCISE",
          title: "FINAL TASKS — FINISH AS A TEAM",
          desc: "Bring the experience together through the final challenges, drawing on the trust, resilience, and teamwork built over the expedition. Recognise the effort, teamwork, and achievements that defined the expedition."
        },
        {
          tag: "KEYNOTE ADDRESS",
          title: "THE WARRIOR CODE",
          speaker: "Delivered by Air Marshal Nagesh Kapoor (Retd.)",
          desc: "Air Marshal Nagesh Kapoor (Retd.) reflects on the values, discipline, and personal standards that shape leadership — and the principles that carry beyond the field into corporate boardrooms and high-stakes ventures."
        },
        {
          tag: "REGIMENTAL DINNER // EXPEDITION CLOSE",
          title: "THE FORMAL REGIMENTAL DINNER",
          speaker: "With All Faculty Officers",
          desc: "A formal dinner to mark the conclusion of the expedition, offering a moment to celebrate the cohort's journey, share final reflections, and forge bonds that endure long after leaving basecamp."
        }
      ],
      image: "assets/images/officers_mess.jpg",
      captionTitle: "THE REGIMENTAL CLOSING CEREMONY",
      caption: "A milestone evening honouring shared triumph, regimental traditions, and lasting bonds forged under high-pressure expedition conditions."
    }
  ],
  cohort: {
    title: "Cohort Structure",
    lead: "The People Beside You Are Part of the Experience.",
    desc1: "Forge X brings together founders, senior professionals, corporate leaders, defence-technology innovators and people from a range of professional backgrounds.",
    desc2: "Participants arrive with different experiences and perspectives. The expedition creates a shared environment in which they work towards common objectives, learn about one another through action and develop relationships beyond their usual professional circles.",
    breakdown: [
      { label: "FOUNDERS & C-SUITE EXECUTIVES", pct: 45 },
      { label: "SENIOR DIRECTORS & VP LEADERS", pct: 30 },
      { label: "DEFTECH INNOVATORS & SPECIALISTS", pct: 15 },
      { label: "ENTERPRISE STRATEGISTS", pct: 10 }
    ],
    rules: [
      { num: "01", title: "Max 20 Per Platoon", desc: "Small tactical unit size guarantees intense personal engagement and peer scrutiny." },
      { num: "02", title: "Direct Officer Mentorship", desc: "1:3 faculty-to-participant ratio ensures continuous observational feedback." },
      { num: "03", title: "Zero Hierarchy Rule", desc: "Corporate titles are stripped at induction. Only your decisions in the field matter." }
    ]
  },
  outcomes: [
    {
      num: "01",
      title: "Lead with Clarity",
      desc: "Strengthen leadership principles, personal accountability and decisive action when ambiguous circumstances leave no clear playbook."
    },
    {
      num: "02",
      title: "Navigate Uncertainty",
      desc: "Learn to make structured decisions with limited information and competing operational priorities without paralysis."
    },
    {
      num: "03",
      title: "Strengthen Team Cohesion",
      desc: "Observe how trust, clear communication, and defined roles shape collective performance under physically and mentally demanding missions."
    },
    {
      num: "04",
      title: "Build Personal Composure",
      desc: "Develop techniques to stay composed, focused, and steady when high-pressure situations challenge your routine ways of working."
    },
    {
      num: "05",
      title: "Think Beyond the Routine",
      desc: "Step away from daily corporate operational noise to reflect on your leadership approach and return with renewed perspective."
    }
  ],
  basecamp: {
    name: "Hyatt Regency Dehradun Resort and Spa",
    tagline: "The intensity of the expedition meets the comfort of a considered retreat.",
    desc: "Set against the foothills of the Himalayas beside Malsi Forest, the property offers a place to recharge between missions, unwind after a demanding day, and connect with fellow participants beyond the field.",
    pillars: [
      {
        title: "The Property",
        desc: "Set beside Malsi Forest and the Himalayan foothills, a setting that brings you closer to nature and the vast mountain landscape."
      },
      {
        title: "The Infinity Pool",
        desc: "A moment to slow down, with mountain views stretching beyond the water, reflecting the changing colours of the Himalayan twilight."
      },
      {
        title: "Luxury Quarters",
        desc: "Thoughtfully appointed rooms offer a comfortable retreat between days of challenge, reflection, and discovery."
      },
      {
        title: "Dining & Lounges",
        desc: "From considered dining to relaxed conversations over a drink, the perfect setting to reconnect after the day's field debriefs."
      }
    ]
  },
  quarters: {
    single: {
      id: "single",
      title: "Single Occupancy",
      desc: "A private room for one participant throughout the entire expedition.",
      basePrice: 195000,
      formattedPrice: "₹1,95,000",
      features: [
        "Private King Deluxe Suite at Hyatt Regency Dehradun",
        "Complete 3-Day military field mission programme & tactical gear",
        "All gourmet dining, Officers’ Mess banquet & Regimental dinner",
        "1-on-1 private advisory session with faculty commander",
        "Official regimental kit, challenge coins & certification"
      ]
    },
    twin: {
      id: "twin",
      title: "Twin-Sharing Occupancy",
      desc: "A shared room for two participants throughout the expedition.",
      basePrice: 165000,
      formattedPrice: "₹1,65,000",
      features: [
        "Shared Twin Room with fellow cohort leader or colleague",
        "Complete 3-Day military field mission programme & tactical gear",
        "All gourmet dining, Officers’ Mess banquet & Regimental dinner",
        "Full access to keynotes, evening bonfires & wargame debriefs",
        "Official regimental kit, challenge coins & certification"
      ]
    }
  },
  faqs: [
    {
      q: "Who can participate in Operation Forge X?",
      a: "Operation Forge X is designed for business leaders, founders, entrepreneurs, senior professionals and emerging leaders who want to strengthen their leadership capabilities. It is suited to individuals and teams willing to challenge themselves, collaborate with others and learn through experience."
    },
    {
      q: "Do I need prior military or outdoor experience?",
      a: "No prior military experience is intended to be necessary. The programme is built around guided, military-led experiences that introduce participants to leadership principles through practical challenges. Specific outdoor experience requirements, if any, will be shared before registration."
    },
    {
      q: "How physically demanding is the programme?",
      a: "The expedition includes outdoor and physical activities designed to challenge participants within reasonable and safe limits. While reasonable general fitness helps ensure full participation, the focus remains on teamwork, decision-making and leadership under pressure rather than pure athletic endurance."
    },
    {
      q: "What is included in the programme fee?",
      a: "The fee includes accommodation at Hyatt Regency Dehradun for 3 nights, all meals, access to faculty sessions, activities, materials, and local transport between venues during the expedition. Travel to and from Dehradun is arranged independently by participants."
    },
    {
      q: "How will this help my leadership in business?",
      a: "Through mission-based challenges, participants experience the dynamics of decision-making, team alignment and resilience first-hand. The programme encourages reflection on how individuals behave under pressure, collaborate across functions, and translate military discipline to everyday business leadership."
    },
    {
      q: "Are corporate teams or group bookings welcome?",
      a: "Yes. Operation Forge X offers an exceptional environment for executive teams, co-founders, and leadership groups seeking to build deeper trust and shared resilience. Group accommodation arrangements and corporate invoices are available."
    },
    {
      q: "What is the cancellation and refund policy?",
      a: "Due to the exclusive 20-operative platoon limit and advance Hyatt reservation logistics, registrations can be transferred to a qualified substitute executive up to 14 days prior to muster. Full written terms are provided upon receipt of your enlistment application."
    }
  ]
};
