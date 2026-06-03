// KumiteMaster - Core Application Logic

// Application State
let state = {
  categories: [],
  fighters: [],
  matches: [],
  eventName: "KumiteMaster Championship",
  eventLogo: "",
  adminLogo: "",
  adminName: "Sensei Admin",
  adminTitle: "Tournament Host",
  eventDate: "May 25, 2026",
  eventLocation: "Tokyo Budokan, JP",
  eventTime: "09:00 AM",
  bannerPhoto: "",
  theme: "dark",
  tatamis: [
    { id: 1, name: "Tatami 1" },
    { id: 2, name: "Tatami 2" },
    { id: 3, name: "Tatami 3" }
  ],
  staff: [],
  badgeBg: "classic-white",
  badgeSize: "cr80",
  badgeWidth: 54,
  badgeHeight: 86,
  badgeBgStyle: "solid",
  badgeBgColor1: "#ffffff",
  badgeBgColor2: "#f3f4f6",
  badgeTextColor: "#1e293b",
  badgeAccentColor: "#7c3aed",
  badgeFont: "Inter",
  badgeTextScale: "medium",
  badgeShowLogo: true,
  badgeLogo: "",
  badgeBgImg: "",
  badgeHeaderSize: "",
  badgeIdSize: "",
  badgeShowSignature: true,
  badgeAuthName: "",
  badgeAuthTitle: "",
  events: [],
  currentEventId: ""
};

// Global variables
let currentFighterPhoto = '';
let currentStaffPhoto = '';
let currentStaffProfileEditPhoto = '';
let currentPlayerProfileEditPhoto = '';
const STORAGE_KEY = 'kumitemaster_state';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initNavigation();
  initEventHandlers();
  initFormSubmissions();
  initInteractiveHubListeners();
  
  // Theme initialization
  applyTheme();
  
  // Brand propagation initialization
  updateBrandingUI();
  
  // Event Switcher dropdown load
  renderEventSwitcherDropdown();
  
  // Initialize Admin Security
  initAdminSecurityListeners();
  
  // Load persisted appearance settings (colours, fonts, sidebar style)
  loadAppearanceSettings();
  
  // Initialize Supabase Connection if credentials exist in local storage
  initSupabaseOnLoad();
  
  // If state is empty, load demo data automatically to showcase features
  if (state.categories.length === 0 && state.fighters.length === 0) {
    loadDemoData();
  } else {
    renderAll();
  }
  
  updateAdminControlStates();
});

// ================= STATE MANAGEMENT =================

function syncCurrentEvent() {
  state.events = state.events || [];
  state.currentEventId = state.currentEventId || 'event-' + Date.now();
  
  let activeEvent = state.events.find(e => e.id === state.currentEventId);
  if (!activeEvent) {
    activeEvent = {
      id: state.currentEventId,
      name: state.eventName || "KumiteMaster Championship",
      logo: state.eventLogo || "",
      adminPhoto: state.adminLogo || "",
      adminName: state.adminName || "Sensei Admin",
      adminTitle: state.adminTitle || "Tournament Host",
      categories: state.categories || [],
      fighters: state.fighters || [],
      matches: state.matches || [],
      tatamis: state.tatamis || [
        { id: 1, name: "Tatami 1" },
        { id: 2, name: "Tatami 2" },
        { id: 3, name: "Tatami 3" }
      ],
      staff: state.staff || [],
      badgeBg: state.badgeBg || "classic-white",
      badgeSize: state.badgeSize || "cr80",
      badgeWidth: state.badgeWidth || 54,
      badgeHeight: state.badgeHeight || 86,
      badgeBgStyle: state.badgeBgStyle || "solid",
      badgeBgColor1: state.badgeBgColor1 || "#ffffff",
      badgeBgColor2: state.badgeBgColor2 || "#f3f4f6",
      badgeTextColor: state.badgeTextColor || "#1e293b",
      badgeAccentColor: state.badgeAccentColor || "#7c3aed",
      badgeFont: state.badgeFont || "Inter",
      badgeTextScale: state.badgeTextScale || "medium",
      badgeShowLogo: state.badgeShowLogo !== undefined ? state.badgeShowLogo : true,
      badgeLogo: state.badgeLogo || "",
      badgeBgImg: state.badgeBgImg || "",
      badgeHeaderSize: state.badgeHeaderSize || "",
      badgeIdSize: state.badgeIdSize || "",
      badgeShowSignature: state.badgeShowSignature !== undefined ? state.badgeShowSignature : true,
      badgeAuthName: state.badgeAuthName || "",
      badgeAuthTitle: state.badgeAuthTitle || "",
      eventDate: state.eventDate || "May 25, 2026",
      eventLocation: state.eventLocation || "Tokyo Budokan, JP",
      eventTime: state.eventTime || "09:00 AM",
      bannerPhoto: state.bannerPhoto || "",
      eventPrefix: state.eventPrefix || ""
    };
    state.events.push(activeEvent);
  } else {
    activeEvent.name = state.eventName;
    activeEvent.logo = state.eventLogo;
    activeEvent.adminPhoto = state.adminLogo;
    activeEvent.adminName = state.adminName || "Sensei Admin";
    activeEvent.adminTitle = state.adminTitle || "Tournament Host";
    activeEvent.categories = state.categories;
    activeEvent.fighters = state.fighters;
    activeEvent.matches = state.matches;
    activeEvent.tatamis = state.tatamis;
    activeEvent.staff = state.staff || [];
    activeEvent.badgeBg = state.badgeBg || "classic-white";
    activeEvent.badgeSize = state.badgeSize || "cr80";
    activeEvent.badgeWidth = state.badgeWidth || 54;
    activeEvent.badgeHeight = state.badgeHeight || 86;
    activeEvent.badgeBgStyle = state.badgeBgStyle || "solid";
    activeEvent.badgeBgColor1 = state.badgeBgColor1 || "#ffffff";
    activeEvent.badgeBgColor2 = state.badgeBgColor2 || "#f3f4f6";
    activeEvent.badgeTextColor = state.badgeTextColor || "#1e293b";
    activeEvent.badgeAccentColor = state.badgeAccentColor || "#7c3aed";
    activeEvent.badgeFont = state.badgeFont || "Inter";
    activeEvent.badgeTextScale = state.badgeTextScale || "medium";
    activeEvent.badgeShowLogo = state.badgeShowLogo !== undefined ? state.badgeShowLogo : true;
    activeEvent.badgeLogo = state.badgeLogo || "";
    activeEvent.badgeBgImg = state.badgeBgImg || "";
    activeEvent.badgeHeaderSize = state.badgeHeaderSize || "";
    activeEvent.badgeIdSize = state.badgeIdSize || "";
    activeEvent.badgeShowSignature = state.badgeShowSignature !== undefined ? state.badgeShowSignature : true;
    activeEvent.badgeAuthName = state.badgeAuthName || "";
    activeEvent.badgeAuthTitle = state.badgeAuthTitle || "";
    activeEvent.eventDate = state.eventDate || "May 25, 2026";
    activeEvent.eventLocation = state.eventLocation || "Tokyo Budokan, JP";
    activeEvent.eventTime = state.eventTime || "09:00 AM";
    activeEvent.bannerPhoto = state.bannerPhoto || "";
    activeEvent.eventPrefix = state.eventPrefix || "";
  }
}

function ensureAllEntityIds() {
  state.fighters = state.fighters || [];
  state.staff = state.staff || [];

  const prefix = state.eventPrefix ? state.eventPrefix.trim().toUpperCase() : 'KM';

  // Dynamically migrate prefix for auto-generated custom IDs if prefix changed
  const autoIdRegex = /^(.*)-(COMP|COACH|REF|OFFICIAL|STAFF)-(\d{4,})$/;

  state.fighters.forEach(f => {
    if (f.customId) {
      const match = f.customId.match(autoIdRegex);
      if (match && match[1] !== prefix) {
        f.customId = `${prefix}-${match[2]}-${match[3]}`;
      }
    }
  });

  state.staff.forEach(s => {
    if (s.customId) {
      const match = s.customId.match(autoIdRegex);
      if (match && match[1] !== prefix) {
        s.customId = `${prefix}-${match[2]}-${match[3]}`;
      }
    }
  });

  // Gather existing customIds to avoid duplicates
  const existingIds = new Set();
  state.fighters.forEach(f => { if (f.customId) existingIds.add(f.customId); });
  state.staff.forEach(s => { if (s.customId) existingIds.add(s.customId); });

  // Generator helper
  function generateNextId(pref) {
    let num = 1001;
    while (true) {
      let formattedNum = String(num).padStart(4, '0');
      let candidate = `${pref}-${formattedNum}`;
      if (!existingIds.has(candidate)) {
        existingIds.add(candidate);
        return candidate;
      }
      num++;
    }
  }

  // Assign to fighters
  state.fighters.forEach(f => {
    if (!f.customId) {
      f.customId = generateNextId(`${prefix}-COMP`);
    }
  });

  // Assign to staff
  state.staff.forEach(s => {
    if (!s.customId) {
      let roleLower = (s.role || '').toLowerCase();
      let rolePart = 'STAFF';
      if (roleLower.includes('coach')) {
        rolePart = 'COACH';
      } else if (roleLower.includes('referee') || roleLower.includes('ref')) {
        rolePart = 'REF';
      } else if (roleLower.includes('official')) {
        rolePart = 'OFFICIAL';
      }
      s.customId = generateNextId(`${prefix}-${rolePart}`);
    }
  });
}

function syncCompetitorProfileAcrossAllEvents(originalName, originalClub, updatedData) {
  if (!originalName) return;
  const oNameClean = originalName.trim().toLowerCase();
  const oClubClean = (originalClub || '').trim().toLowerCase();

  // 1. Sync in active event fighters
  if (state.fighters) {
    state.fighters.forEach(f => {
      if ((f.name || '').trim().toLowerCase() === oNameClean && 
          (f.club || '').trim().toLowerCase() === oClubClean) {
        f.name = updatedData.name;
        if (updatedData.belt) f.belt = updatedData.belt.toLowerCase();
        f.club = updatedData.club;
        f.dob = updatedData.dob;
        f.gender = updatedData.gender;
        f.weight = updatedData.weight;
        if (updatedData.city !== undefined) f.city = updatedData.city;
        if (updatedData.country !== undefined) f.country = updatedData.country;
        if (updatedData.photo !== undefined) f.photo = updatedData.photo;
        if (updatedData.customId !== undefined) {
          if (updatedData.customId) {
            f.customId = updatedData.customId;
          } else {
            delete f.customId;
          }
        }
      }
    });
  }

  // 2. Sync in all other events in state.events
  if (state.events) {
    state.events.forEach(ev => {
      if (ev.fighters) {
        ev.fighters.forEach(f => {
          if ((f.name || '').trim().toLowerCase() === oNameClean && 
              (f.club || '').trim().toLowerCase() === oClubClean) {
            f.name = updatedData.name;
            if (updatedData.belt) f.belt = updatedData.belt.toLowerCase();
            f.club = updatedData.club;
            f.dob = updatedData.dob;
            f.gender = updatedData.gender;
            f.weight = updatedData.weight;
            if (updatedData.city !== undefined) f.city = updatedData.city;
            if (updatedData.country !== undefined) f.country = updatedData.country;
            if (updatedData.photo !== undefined) f.photo = updatedData.photo;
            if (updatedData.customId !== undefined) {
              if (updatedData.customId) {
                f.customId = updatedData.customId;
              } else {
                delete f.customId;
              }
            }
          }
        });
      }
    });
  }
}

function saveState() {
  ensureAllEntityIds();
  syncCurrentEvent();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderAll();
  updateBrandingUI();
  
  // Async upload to Supabase if connected
  if (supabaseClient && !isSyncingFromSupabase) {
    uploadStateToSupabase();
  }
}

function loadState() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      state = JSON.parse(data);
      state.events = state.events || [];
      state.theme = state.theme || "dark";
      
      // Legacy data migration wrapper
      if (state.events.length === 0) {
        const legacyEvent = {
          id: 'event-default',
          name: state.eventName || "KumiteMaster Championship",
          logo: state.eventLogo || "",
          adminPhoto: state.adminLogo || "",
          adminName: state.adminName || "Sensei Admin",
          adminTitle: state.adminTitle || "Tournament Host",
          categories: state.categories || [],
          fighters: state.fighters || [],
          matches: state.matches || [],
          tatamis: state.tatamis || [
            { id: 1, name: "Tatami 1" },
            { id: 2, name: "Tatami 2" },
            { id: 3, name: "Tatami 3" }
          ],
          staff: state.staff || [],
          badgeBg: state.badgeBg || "classic-white",
          badgeSize: state.badgeSize || "cr80",
          badgeWidth: state.badgeWidth || 54,
          badgeHeight: state.badgeHeight || 86,
          badgeBgStyle: state.badgeBgStyle || "solid",
          badgeBgColor1: state.badgeBgColor1 || "#ffffff",
          badgeBgColor2: state.badgeBgColor2 || "#f3f4f6",
          badgeTextColor: state.badgeTextColor || "#1e293b",
          badgeAccentColor: state.badgeAccentColor || "#7c3aed",
          badgeFont: state.badgeFont || "Inter",
          badgeTextScale: state.badgeTextScale || "medium",
          badgeShowLogo: true,
          badgeLogo: "",
          eventDate: state.eventDate || "May 25, 2026",
          eventLocation: state.eventLocation || "Tokyo Budokan, JP",
          eventTime: state.eventTime || "09:00 AM",
          bannerPhoto: state.bannerPhoto || "",
          eventPrefix: state.eventPrefix || ""
        };
        state.events.push(legacyEvent);
        state.currentEventId = 'event-default';
      }
      
      if (!state.currentEventId) {
        state.currentEventId = state.events[0].id;
      }
      
      // Unpack active event data to top-level state
      const activeEvent = state.events.find(e => e.id === state.currentEventId) || state.events[0];
      state.currentEventId = activeEvent.id;
      state.eventName = activeEvent.name || "KumiteMaster Championship";
      state.eventLogo = activeEvent.logo || "";
      state.adminLogo = activeEvent.adminPhoto || "";
      state.adminName = activeEvent.adminName || "Sensei Admin";
      state.adminTitle = activeEvent.adminTitle || "Tournament Host";
      state.categories = activeEvent.categories || [];
      state.fighters = activeEvent.fighters || [];
      state.matches = activeEvent.matches || [];
      state.tatamis = activeEvent.tatamis || [
        { id: 1, name: "Tatami 1" },
        { id: 2, name: "Tatami 2" },
        { id: 3, name: "Tatami 3" }
      ];
      state.staff = activeEvent.staff || [];
      state.badgeBg = activeEvent.badgeBg || "classic-white";
      state.badgeSize = activeEvent.badgeSize || "cr80";
      state.badgeWidth = activeEvent.badgeWidth || 54;
      state.badgeHeight = activeEvent.badgeHeight || 86;
      state.badgeBgStyle = activeEvent.badgeBgStyle || "solid";
      state.badgeBgColor1 = activeEvent.badgeBgColor1 || "#ffffff";
      state.badgeBgColor2 = activeEvent.badgeBgColor2 || "#f3f4f6";
      state.badgeTextColor = activeEvent.badgeTextColor || "#1e293b";
      state.badgeAccentColor = activeEvent.badgeAccentColor || "#7c3aed";
      state.badgeFont = activeEvent.badgeFont || "Inter";
      state.badgeTextScale = activeEvent.badgeTextScale || "medium";
      state.badgeShowLogo = activeEvent.badgeShowLogo !== undefined ? activeEvent.badgeShowLogo : true;
      state.badgeLogo = activeEvent.badgeLogo || "";
      state.badgeBgImg = activeEvent.badgeBgImg || "";
      state.badgeHeaderSize = activeEvent.badgeHeaderSize || "";
      state.badgeIdSize = activeEvent.badgeIdSize || "";
      state.badgeShowSignature = activeEvent.badgeShowSignature !== undefined ? activeEvent.badgeShowSignature : true;
      state.badgeAuthName = activeEvent.badgeAuthName || "";
      state.badgeAuthTitle = activeEvent.badgeAuthTitle || "";
      state.eventDate = activeEvent.eventDate || "May 25, 2026";
      state.eventLocation = activeEvent.eventLocation || "Tokyo Budokan, JP";
      state.eventTime = activeEvent.eventTime || "09:00 AM";
      state.bannerPhoto = activeEvent.bannerPhoto || "";
      state.eventPrefix = activeEvent.eventPrefix || "";

      // Initialize global branding defaults
      state.brandTitle = state.brandTitle || "ASSAM KARATE";
      state.brandSubtitle = state.brandSubtitle || "Association";

      // Normal self-healing for structure checks
      state.categories.forEach(cat => {
        if (!cat.type) {
          cat.type = cat.name.toLowerCase().includes('kata') ? 'Kata' : 'Kumite';
        }
        if (!cat.gender) {
          if (cat.name.toLowerCase().includes('female')) cat.gender = 'Female';
          else if (cat.name.toLowerCase().includes('male')) cat.gender = 'Male';
          else cat.gender = 'Mixed';
        }
        if (!cat.ageClass) {
          if (cat.name.toLowerCase().includes('senior')) cat.ageClass = 'Senior';
          else if (cat.name.toLowerCase().includes('junior')) cat.ageClass = 'Junior';
          else if (cat.name.toLowerCase().includes('cadet')) cat.ageClass = 'Cadet';
          else if (cat.name.toLowerCase().includes('children') || cat.name.toLowerCase().includes('u14')) cat.ageClass = 'Children';
          else cat.ageClass = 'Senior';
        }
        if (!cat.weightClass) {
          const match = cat.name.match(/([+-]?\d+\s*kg|open)/i);
          cat.weightClass = match ? match[0] : 'Open';
        }
      });

      state.fighters.forEach(f => {
        if (!f.dob) f.dob = '';
        if (!f.gender) f.gender = '';
        if (!f.weight) f.weight = '';
      });
      ensureAllEntityIds();
    } catch (e) {
      console.error('Error loading state from localStorage', e);
    }
  } else {
    syncCurrentEvent();
  }
}

// ================= NAVIGATION =================

function initNavigation() {
  const navItems = document.querySelectorAll('.sidebar .nav-item');
  const sections = document.querySelectorAll('.main-content .view-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const viewId = item.getAttribute('data-view');
      
      navItems.forEach(nav => nav.classList.remove('active'));
      sections.forEach(sec => sec.classList.remove('active'));
      
      item.classList.add('active');
      const targetSec = document.getElementById(viewId);
      if (targetSec) {
        targetSec.classList.add('active');
      }

      // Special rendering triggers per view
      if (viewId === 'dashboard-view') {
        renderDashboard();
      } else if (viewId === 'fighters-view') {
        renderFightersView();
      } else if (viewId === 'brackets-view') {
        renderBracketsView();
      } else if (viewId === 'scheduler-view') {
        renderSchedulerView();
      } else if (viewId === 'rankings-view') {
        renderRankingsView();
      } else if (viewId === 'winners-view') {
        renderWinnersView();
      } else if (viewId === 'credentials-view') {
        renderCredentialsView();
      } else if (viewId === 'settings-view') {
        syncSettingsUI();
      }
      
      updateAdminControlStates();
    });
  });
}

// ================= EVENT HANDLERS & MODALS =================

function initEventHandlers() {
  // Modal toggle helper
  const toggleModal = (modalId, show = true) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      if (show) modal.classList.add('active');
      else modal.classList.remove('active');
    }
  };

  // Add Category Modals
  document.getElementById('qa-add-category').addEventListener('click', () => {
    document.getElementById('category-form').reset();
    document.getElementById('category-edit-id').value = '';
    document.getElementById('category-modal-title').innerText = 'Create Division';
    toggleModal('modal-category', true);
  });
  document.getElementById('view-add-category-btn').addEventListener('click', () => {
    document.getElementById('category-form').reset();
    document.getElementById('category-edit-id').value = '';
    document.getElementById('category-modal-title').innerText = 'Create Division';
    toggleModal('modal-category', true);
  });

  const cleanEmptyBtn = document.getElementById('btn-clean-empty-categories');
  if (cleanEmptyBtn) {
    cleanEmptyBtn.addEventListener('click', cleanAllEmptyCategories);
  }
  document.getElementById('close-category-modal').addEventListener('click', () => toggleModal('modal-category', false));
  document.getElementById('cancel-category-btn').addEventListener('click', () => toggleModal('modal-category', false));

  // Category dynamic title compilation listeners
  const updateCategoryPreview = () => {
    const type = document.getElementById('category-type').value;
    const gender = document.getElementById('category-gender').value;
    const age = document.getElementById('category-age').value.trim();
    const weight = document.getElementById('category-weight').value.trim();
    if (age || weight) {
      document.getElementById('category-name').value = `${gender} ${age} ${type} ${weight}`;
    }
  };
  document.getElementById('category-type').addEventListener('change', updateCategoryPreview);
  document.getElementById('category-gender').addEventListener('change', updateCategoryPreview);
  document.getElementById('category-age').addEventListener('input', updateCategoryPreview);
  document.getElementById('category-weight').addEventListener('input', updateCategoryPreview);

  // Add Fighter Modals
  document.getElementById('qa-add-fighter').addEventListener('click', () => {
    openFighterModal();
  });
  document.getElementById('view-add-fighter-btn').addEventListener('click', () => {
    if (activeCategoryFilterId && activeCategoryFilterId !== 'ALL') {
      openFighterModal('', activeCategoryFilterId);
    } else {
      openFighterModal();
    }
  });
  document.getElementById('close-fighter-modal').addEventListener('click', () => toggleModal('modal-fighter', false));
  document.getElementById('cancel-fighter-btn').addEventListener('click', () => toggleModal('modal-fighter', false));

  // Auto-Fill Division Criteria click handler
  const autofillBtn = document.getElementById('btn-autofill-division-criteria');
  if (autofillBtn) {
    autofillBtn.addEventListener('click', () => {
      const selectedCat = document.getElementById('fighter-division').value;
      if (selectedCat && selectedCat !== 'AUTO_CREATE') {
        autofillFighterDetailsFromCategory(selectedCat);
        showToast("Criteria auto-filled successfully!", "success");
      } else {
        showToast("Please select a standard division first!", "warning");
      }
    });
  }

  // Competition Discipline radio buttons change listener
  const disciplineRadios = document.querySelectorAll('input[name="fighter-discipline"]');
  disciplineRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const val = e.target.value;
      
      // Update label active classes
      document.querySelectorAll('.discipline-label').forEach(lbl => {
        lbl.classList.remove('active');
      });
      const activeLabel = document.getElementById(`lbl-discipline-${val}`);
      if (activeLabel) activeLabel.classList.add('active');

      // Toggle division selects and required properties
      const kumiteGroup = document.getElementById('fighter-kumite-division-group');
      const kataGroup = document.getElementById('fighter-kata-division-group');
      const kumiteSelect = document.getElementById('fighter-division');
      const kataSelect = document.getElementById('fighter-kata-division');

      if (val === 'kumite') {
        if (kumiteGroup) kumiteGroup.style.display = 'block';
        if (kataGroup) kataGroup.style.display = 'none';
        if (kumiteSelect) kumiteSelect.required = true;
        if (kataSelect) kataSelect.required = false;
      } else if (val === 'kata') {
        if (kumiteGroup) kumiteGroup.style.display = 'none';
        if (kataGroup) kataGroup.style.display = 'block';
        if (kumiteSelect) kumiteSelect.required = false;
        if (kataSelect) kataSelect.required = true;
      } else if (val === 'both') {
        if (kumiteGroup) kumiteGroup.style.display = 'block';
        if (kataGroup) kataGroup.style.display = 'block';
        if (kumiteSelect) kumiteSelect.required = true;
        if (kataSelect) kataSelect.required = true;
      }
    });
  });

  // Fighter Auto-Matchmaking triggers
  document.getElementById('fighter-dob').addEventListener('change', handleFighterModalAutoMatch);
  document.getElementById('fighter-gender').addEventListener('change', handleFighterModalAutoMatch);
  document.getElementById('fighter-weight').addEventListener('input', handleFighterModalAutoMatch);

  // Import CSV Modals & drag-drop
  document.getElementById('view-import-csv-btn').addEventListener('click', () => {
    document.getElementById('import-preview-console').style.display = 'none';
    document.getElementById('import-preview-console').innerHTML = '';
    document.getElementById('process-import-csv-btn').disabled = true;
    toggleModal('modal-import-csv', true);
  });
  document.getElementById('close-import-csv-modal').addEventListener('click', () => toggleModal('modal-import-csv', false));
  document.getElementById('cancel-import-csv-btn').addEventListener('click', () => toggleModal('modal-import-csv', false));
  document.getElementById('process-import-csv-btn').addEventListener('click', processCSVImport);

  setupDragAndDropCSV();

  // Quick Action Navigators
  document.getElementById('qa-go-bracket').addEventListener('click', () => {
    triggerViewTransition('brackets-view');
  });
  document.getElementById('qa-go-scheduler').addEventListener('click', () => {
    triggerViewTransition('scheduler-view');
  });

  // Manual Scheduler Modals
  document.getElementById('scheduler-add-match-btn').addEventListener('click', () => {
    openScheduleModal();
  });
  document.getElementById('close-schedule-modal').addEventListener('click', () => toggleModal('modal-schedule', false));
  document.getElementById('cancel-schedule-btn').addEventListener('click', () => toggleModal('modal-schedule', false));

  // Scorecard modal closers
  document.getElementById('close-scorecard-modal').addEventListener('click', () => toggleModal('modal-scorecard', false));
  document.getElementById('cancel-scorecard-btn').addEventListener('click', () => toggleModal('modal-scorecard', false));

  // Bracket events
  document.getElementById('bracket-generate-btn').addEventListener('click', handleBracketGeneration);
  document.getElementById('bracket-generate-all-btn').addEventListener('click', handleBracketGenerationAll);
  document.getElementById('bracket-reset-btn').addEventListener('click', handleBracketReset);
  const bracketJpgBtn = document.getElementById('bracket-jpg-btn');
  if (bracketJpgBtn) {
    bracketJpgBtn.addEventListener('click', () => {
      if (state.categories.length === 0) {
        showToast("No karate divisions found. Please create one in Fighters & Divisions first!", "warning");
        return;
      }
      const modal = document.getElementById('modal-bracket-export-choices');
      if (modal) modal.classList.add('active');
    });
  }

  const exportBtnBracketJpg = document.getElementById('export-btn-bracket-jpg');
  if (exportBtnBracketJpg) {
    exportBtnBracketJpg.addEventListener('click', () => {
      const modal = document.getElementById('modal-bracket-export-choices');
      if (modal) modal.classList.remove('active');
      downloadSingleBracketJPG();
    });
  }

  const exportBtnBulkJpg = document.getElementById('export-btn-bulk-jpg');
  if (exportBtnBulkJpg) {
    exportBtnBulkJpg.addEventListener('click', () => {
      const modal = document.getElementById('modal-bracket-export-choices');
      if (modal) modal.classList.remove('active');
      downloadAllBracketsBulkJPG();
    });
  }
  
  const handleBracketAddFighter = () => {
    const activeCategory = document.getElementById('bracket-division-select').value;
    openFighterModal('', activeCategory);
  };
  document.getElementById('bracket-add-fighter-btn').addEventListener('click', handleBracketAddFighter);
  
  document.getElementById('bracket-tree-container').addEventListener('click', (e) => {
    const btn = e.target.closest('#bracket-empty-add-fighter-btn');
    if (btn) {
      handleBracketAddFighter();
    }
  });
  
  // Select dropdown events
  document.getElementById('bracket-division-select').addEventListener('change', (e) => {
    renderBracketsTree(e.target.value);
  });
  document.getElementById('rankings-division-select').addEventListener('change', (e) => {
    renderRankingsTable(e.target.value);
  });
  document.getElementById('winners-division-select').addEventListener('change', (e) => {
    renderPodiumDisplay(e.target.value);
  });

  // Scorecard adjustments
  document.getElementById('sc-pt-a-plus').addEventListener('click', () => adjustScore('A', 1));
  document.getElementById('sc-pt-a-minus').addEventListener('click', () => adjustScore('A', -1));
  document.getElementById('sc-pt-b-plus').addEventListener('click', () => adjustScore('B', 1));
  document.getElementById('sc-pt-b-minus').addEventListener('click', () => adjustScore('B', -1));

  // Select victors in scorecard
  document.getElementById('sc-fighter-a-box').addEventListener('click', () => selectWinnerInScorecard('A'));
  document.getElementById('sc-fighter-b-box').addEventListener('click', () => selectWinnerInScorecard('B'));

  // Save Scorecard Match
  document.getElementById('save-scorecard-btn').addEventListener('click', saveScorecard);

  // Auto assign scheduler matches
  document.getElementById('scheduler-auto-assign-btn').addEventListener('click', handleAutoSchedule);

  // Demo buttons
  document.getElementById('dashboard-setup-demo-btn').addEventListener('click', () => {
    loadDemoData();
    showToast("Successfully loaded Karate tournament demonstration dataset!", "success");
  });

  // Theme Switcher Toggle
  document.getElementById('theme-switcher-btn').addEventListener('click', () => {
    toggleTheme();
  });

  // Event Switcher dropdown change
  document.getElementById('event-switcher-select').addEventListener('change', (e) => {
    switchEvent(e.target.value);
  });

  // Create Event button
  document.getElementById('btn-create-event').addEventListener('click', () => {
    const name = prompt("Enter the name of the new tournament event:");
    if (name) createNewEvent(name);
  });

  // Delete Event button
  document.getElementById('btn-delete-event').addEventListener('click', () => {
    deleteActiveEvent();
  });

  // Update Event details button
  const btnUpdateEvent = document.getElementById('btn-update-event');
  if (btnUpdateEvent) {
    btnUpdateEvent.addEventListener('click', () => {
      updateActiveEventDetails();
    });
  }

  // Event Name Realtime Sync
  document.getElementById('dashboard-event-name-input').addEventListener('input', (e) => {
    state.eventName = e.target.value.trim() || "KumiteMaster Championship";
    saveState();
  });

  // Event ID Prefix Realtime Sync
  const dashboardEventPrefixInput = document.getElementById('dashboard-event-prefix-input');
  if (dashboardEventPrefixInput) {
    dashboardEventPrefixInput.addEventListener('input', (e) => {
      state.eventPrefix = e.target.value.trim().toUpperCase();
      saveState();
      
      // Reactive update of credentials grid and sidebar IDs
      if (typeof renderCredentialsView === 'function') renderCredentialsView();
    });
  }

  // Admin Name Realtime Sync
  document.getElementById('dashboard-admin-name-input').addEventListener('input', (e) => {
    state.adminName = e.target.value.trim() || "Sensei Admin";
    saveState();
  });

  // Admin Title Realtime Sync
  document.getElementById('dashboard-admin-title-input').addEventListener('input', (e) => {
    state.adminTitle = e.target.value.trim() || "Tournament Host";
    saveState();
  });

  // Event Date Realtime Sync
  const dashboardEventDateInput = document.getElementById('dashboard-event-date-input');
  if (dashboardEventDateInput) {
    dashboardEventDateInput.addEventListener('input', (e) => {
      state.eventDate = e.target.value.trim() || "May 25, 2026";
      saveState();
    });
  }

  // Event Location Realtime Sync
  const dashboardEventLocationInput = document.getElementById('dashboard-event-location-input');
  if (dashboardEventLocationInput) {
    dashboardEventLocationInput.addEventListener('input', (e) => {
      state.eventLocation = e.target.value.trim() || "Tokyo Budokan, JP";
      saveState();
    });
  }

  // Event Time Realtime Sync
  const dashboardEventTimeInput = document.getElementById('dashboard-event-time-input');
  if (dashboardEventTimeInput) {
    dashboardEventTimeInput.addEventListener('input', (e) => {
      state.eventTime = e.target.value.trim() || "09:00 AM";
      saveState();
    });
  }

  // Bracket schedule match button click
  const bracketScheduleMatchBtn = document.getElementById('bracket-schedule-match-btn');
  if (bracketScheduleMatchBtn) {
    bracketScheduleMatchBtn.addEventListener('click', () => {
      const activeCategoryId = document.getElementById('bracket-division-select').value;
      openScheduleModal(activeCategoryId);
    });
  }

  // Image Upload Delegations
  document.getElementById('dashboard-event-logo-btn').addEventListener('click', () => {
    document.getElementById('dashboard-event-logo-input').click();
  });
  document.getElementById('dashboard-admin-photo-btn').addEventListener('click', () => {
    document.getElementById('dashboard-admin-photo-input').click();
  });
  const dashboardEventBannerBtn = document.getElementById('dashboard-event-banner-btn');
  if (dashboardEventBannerBtn) {
    dashboardEventBannerBtn.addEventListener('click', () => {
      const uploader = document.getElementById('dashboard-event-banner-input');
      if (uploader) uploader.click();
    });
  }
  document.getElementById('btn-fighter-photo-upload').addEventListener('click', () => {
    document.getElementById('fighter-photo-input').click();
  });

  // Map Picker Modal bindings
  const openMapBtn = document.getElementById('btn-open-location-map-modal');
  if (openMapBtn) {
    openMapBtn.addEventListener('click', () => {
      toggleModal('modal-location-map', true);
      setTimeout(initLocationPickerMap, 200); // 200ms timeout for smooth transition & exact rendering size
    });
  }

  const mapSearchBtn = document.getElementById('map-search-btn');
  if (mapSearchBtn) {
    mapSearchBtn.addEventListener('click', performMapSearch);
  }

  const mapSearchInput = document.getElementById('map-search-input');
  if (mapSearchInput) {
    mapSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        performMapSearch();
      }
    });
  }

  const confirmMapLocationBtn = document.getElementById('btn-confirm-map-location');
  if (confirmMapLocationBtn) {
    confirmMapLocationBtn.addEventListener('click', confirmPickedLocation);
  }

  // Image Upload Changes & Canvas Compressions
  document.getElementById('dashboard-event-logo-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(file, (base64) => {
        state.eventLogo = base64;
        saveState();
        showToast("Main event brand logo successfully uploaded & verified!", "success");
      });
    }
  });
  document.getElementById('dashboard-event-banner-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      compressBannerPhoto(file, (base64) => {
        state.bannerPhoto = base64;
        saveState();
        showToast("Main event banner photo successfully uploaded & verified!", "success");
      });
    }
  });
  document.getElementById('dashboard-admin-photo-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(file, (base64) => {
        state.adminLogo = base64;
        saveState();
        showToast("Administrator verification photo uploaded & registered!", "success");
      });
    }
  });
  document.getElementById('fighter-photo-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      compressProfilePhoto(file, (base64) => {
        currentFighterPhoto = base64;
        const img = document.getElementById('fighter-photo-preview');
        const placeholder = document.getElementById('fighter-photo-placeholder');
        if (img && placeholder) {
          img.src = base64;
          img.style.display = 'block';
          placeholder.style.display = 'none';
        }
      });
    }
  });

  // Manage Tatamis Modals
  document.getElementById('scheduler-manage-tatamis-btn').addEventListener('click', () => {
    toggleModal('modal-tatami-management', true);
    renderTatamiManagementList();
  });
  document.getElementById('close-tatami-modal').addEventListener('click', () => {
    toggleModal('modal-tatami-management', false);
  });

  // Add Dynamic Tatami Form
  document.getElementById('add-tatami-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('new-tatami-name');
    const name = input.value.trim();
    if (!name) return;

    const newId = state.tatamis.length > 0 ? Math.max(...state.tatamis.map(t => t.id)) + 1 : 1;
    state.tatamis.push({ id: newId, name: name });
    input.value = '';

    showToast(`Successfully registered new combat mat: ${name}`, "success");
    saveState();
    renderTatamiManagementList();
  });

  // Download CSV Format Roster Template
  document.getElementById('download-csv-template-btn').addEventListener('click', () => {
    downloadCSVTemplate();
  });

  // Full Tournament Multi-Page PDF Exporter
  document.getElementById('dashboard-export-report-btn').addEventListener('click', () => {
    downloadFullTournamentReport();
  });

  // Scorecard Manual Bracket Editor Pairings Button Toggle
  document.getElementById('scorecard-edit-pairings-btn').addEventListener('click', () => {
    if (!activeMatchObj) return;
    const m = activeMatchObj;

    scorecardEditMode = !scorecardEditMode;
    const swapBtn = document.getElementById('scorecard-swap-btn');
    if (scorecardEditMode) {
      document.getElementById('sc-fighter-a-name').style.display = 'none';
      document.getElementById('sc-fighter-b-name').style.display = 'none';
      document.getElementById('sc-fighter-a-select').style.display = 'block';
      document.getElementById('sc-fighter-b-select').style.display = 'block';
      document.getElementById('scorecard-edit-pairings-btn').innerHTML = '💾 Save Pairings';
      document.getElementById('scorecard-edit-pairings-btn').classList.add('btn-primary');
      document.getElementById('scorecard-edit-pairings-btn').classList.remove('btn-secondary');
      if (swapBtn) swapBtn.style.display = 'inline-flex';
    } else {
      const selectA = document.getElementById('sc-fighter-a-select');
      const selectB = document.getElementById('sc-fighter-b-select');

      const valA = selectA.value;
      const valB = selectB.value;

      // Update match bindings
      m.fighterAId = valA === 'TBD' ? null : valA;
      m.fighterBId = valB === 'TBD' ? null : valB;

      // Clean active scores if matchups were manually overwritten
      m.scoreA = 0;
      m.scoreB = 0;
      m.winnerId = null;
      m.status = 'scheduled';

      document.getElementById('sc-score-a').value = 0;
      document.getElementById('sc-score-b').value = 0;
      document.getElementById('sc-fighter-a-box').classList.remove('selected-winner');
      document.getElementById('sc-fighter-b-box').classList.remove('selected-winner');
      scorecardSelectedWinner = null;

      // Auto resolve bye-pairings if newly assigned
      checkAndResolveByeMatch(m);

      // Re-load scorecard details
      document.getElementById('sc-fighter-a-name').style.display = 'block';
      document.getElementById('sc-fighter-b-name').style.display = 'block';
      document.getElementById('sc-fighter-a-select').style.display = 'none';
      document.getElementById('sc-fighter-b-select').style.display = 'none';
      document.getElementById('scorecard-edit-pairings-btn').innerHTML = '✏️ Edit Matchup';
      document.getElementById('scorecard-edit-pairings-btn').classList.remove('btn-primary');
      document.getElementById('scorecard-edit-pairings-btn').classList.add('btn-secondary');
      if (swapBtn) swapBtn.style.display = 'none';

      const fA_new = state.fighters.find(f => f.id === m.fighterAId);
      const fB_new = state.fighters.find(f => f.id === m.fighterBId);

      document.getElementById('sc-fighter-a-name').innerText = fA_new ? fA_new.name : (m.fighterAId === 'BYE' ? 'BYE' : 'To Be Decided');
      document.getElementById('sc-fighter-b-name').innerText = fB_new ? fB_new.name : (m.fighterBId === 'BYE' ? 'BYE' : 'To Be Decided');

      document.getElementById('sc-fighter-a-club').innerText = fA_new ? fA_new.club : '-';
      document.getElementById('sc-fighter-b-club').innerText = fB_new ? fB_new.club : '-';

      const badgeA = document.getElementById('sc-fighter-a-belt');
      badgeA.className = `belt-badge belt-${fA_new ? fA_new.belt : 'white'}`;
      badgeA.innerText = fA_new ? fA_new.belt : 'White';

      const badgeB = document.getElementById('sc-fighter-b-belt');
      badgeB.className = `belt-badge belt-${fB_new ? fB_new.belt : 'white'}`;
      badgeB.innerText = fB_new ? fB_new.belt : 'White';

      // Recursive self-healing of downstream paths
      healMatchDownstream(m);
      saveState();
      renderBracketsTree(m.categoryId);
      showToast("Matchup pairings updated manually inside tournament bracket tree!", "success");
    }
  });

  // Fighter Copy Selector Listener
  const copySelect = document.getElementById('fighter-copy-existing-select');
  if (copySelect) {
    copySelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val) {
        const f = JSON.parse(val);
        document.getElementById('fighter-name').value = f.name || '';
        document.getElementById('fighter-club').value = f.club || '';
        document.getElementById('fighter-belt').value = f.belt || '';
        document.getElementById('fighter-gender').value = f.gender || '';
        document.getElementById('fighter-dob').value = f.dob || '';
        document.getElementById('fighter-weight').value = f.weight || '';
        document.getElementById('fighter-city').value = f.city || '';
        const fcopyCountryEl = document.getElementById('fighter-country');
        if (fcopyCountryEl) fcopyCountryEl.value = f.country || '';
        
        currentFighterPhoto = f.photo || '';
        const previewImg = document.getElementById('fighter-photo-preview');
        const placeholder = document.getElementById('fighter-photo-placeholder');
        if (previewImg && placeholder) {
          if (currentFighterPhoto) {
            previewImg.src = currentFighterPhoto;
            previewImg.style.display = 'block';
            placeholder.style.display = 'none';
          } else {
            previewImg.style.display = 'none';
            placeholder.style.display = 'block';
          }
        }
        
        handleFighterModalAutoMatch();
      }
    });
  }

  // Scorecard Side Swap Button
  const scSwapBtn = document.getElementById('scorecard-swap-btn');
  if (scSwapBtn) {
    scSwapBtn.addEventListener('click', () => {
      const selectA = document.getElementById('sc-fighter-a-select');
      const selectB = document.getElementById('sc-fighter-b-select');
      if (selectA && selectB) {
        const valA = selectA.value;
        const valB = selectB.value;
        selectA.value = valB;
        selectB.value = valA;
      }
    });
  }

  // Rankings Tabs Toggle Buttons
  const btnRankingsFighters = document.getElementById('btn-rankings-fighters');
  const btnRankingsDojos = document.getElementById('btn-rankings-dojos');
  const rankingsFightersContainer = document.getElementById('rankings-fighters-container');
  const rankingsDojosContainer = document.getElementById('rankings-dojos-container');

  if (btnRankingsFighters && btnRankingsDojos && rankingsFightersContainer && rankingsDojosContainer) {
    btnRankingsFighters.addEventListener('click', () => {
      btnRankingsFighters.classList.add('active', 'btn-primary');
      btnRankingsFighters.classList.remove('btn-secondary');
      btnRankingsDojos.classList.remove('active', 'btn-primary');
      btnRankingsDojos.classList.add('btn-secondary');
      rankingsFightersContainer.style.display = 'block';
      rankingsDojosContainer.style.display = 'none';
      renderRankingsView();
    });

    btnRankingsDojos.addEventListener('click', () => {
      btnRankingsDojos.classList.add('active', 'btn-primary');
      btnRankingsDojos.classList.remove('btn-secondary');
      btnRankingsFighters.classList.remove('active', 'btn-primary');
      btnRankingsFighters.classList.add('btn-secondary');
      rankingsFightersContainer.style.display = 'none';
      rankingsDojosContainer.style.display = 'block';
      renderDojoRankings();
    });
  }

  // --- Credentials View Handlers ---
  
  // Choose Staff Photo Button
  const btnStaffPhotoUpload = document.getElementById('btn-staff-photo-upload');
  if (btnStaffPhotoUpload) {
    btnStaffPhotoUpload.addEventListener('click', () => {
      document.getElementById('staff-photo-input').click();
    });
  }

  // Staff Photo Input Change
  const staffPhotoInput = document.getElementById('staff-photo-input');
  if (staffPhotoInput) {
    staffPhotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        compressProfilePhoto(file, (base64) => {
          currentStaffPhoto = base64;
          const img = document.getElementById('staff-photo-preview');
          const placeholder = document.getElementById('staff-photo-placeholder');
          if (img && placeholder) {
            img.src = base64;
            img.style.display = 'block';
            placeholder.style.display = 'none';
          }
        });
      }
    });
  }

  // Badge Theme Selection Buttons
  const themeBtns = document.querySelectorAll('.badge-theme-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const theme = btn.getAttribute('data-theme');
      state.badgeBg = theme;
      saveState();
    });
  });

  // Credentials View Filter Tabs (Competitors vs Staff)
  const filterTabs = document.querySelectorAll('.cred-filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const targetTab = tab.getAttribute('data-tab');
      const divFilterWrapper = document.getElementById('cred-division-filter-wrapper');
      const roleFilterWrapper = document.getElementById('cred-role-filter-wrapper');
      
      if (targetTab === 'competitors') {
        if (divFilterWrapper) divFilterWrapper.style.display = 'flex';
        if (roleFilterWrapper) roleFilterWrapper.style.display = 'none';
      } else {
        if (divFilterWrapper) divFilterWrapper.style.display = 'none';
        if (roleFilterWrapper) roleFilterWrapper.style.display = 'flex';
      }
      renderCredentialsView();
    });
  });

  // Division Select change triggers render
  const credDivSelect = document.getElementById('cred-division-select');
  if (credDivSelect) {
    credDivSelect.addEventListener('change', () => {
      renderCredentialsView();
    });
  }

  // Live search input triggers render
  const credSearchInput = document.getElementById('cred-search-input');
  if (credSearchInput) {
    credSearchInput.addEventListener('input', () => {
      renderCredentialsView();
    });
  }

  // Role select filter triggers render
  const credRoleSelect = document.getElementById('cred-role-select');
  if (credRoleSelect) {
    credRoleSelect.addEventListener('change', () => {
      renderCredentialsView();
    });
  }

  // Batch JPG Export Button
  const btnExportBadges = document.getElementById('btn-export-badges-batch');
  if (btnExportBadges) {
    btnExportBadges.addEventListener('click', () => {
      const activeTabBtn = document.querySelector('.cred-filter-tab.active');
      const isStaff = activeTabBtn ? (activeTabBtn.getAttribute('data-tab') === 'staff') : false;
      downloadAllBadgesJPG(isStaff);
    });
  }

  // Batch JPG (individual files) Export Button  
  const btnExportBadgesJpg = document.getElementById('btn-export-badges-batch-jpg');
  if (btnExportBadgesJpg) {
    btnExportBadgesJpg.addEventListener('click', () => {
      const activeTabBtn = document.querySelector('.cred-filter-tab.active');
      const isStaff = activeTabBtn ? (activeTabBtn.getAttribute('data-tab') === 'staff') : false;
      downloadAllBadgesJPG(isStaff);
    });
  }

  // Player Profile Modal Closers
  const closeProfileModal = () => toggleModal('modal-player-profile', false);
  const elCloseProfile = document.getElementById('close-player-profile-modal');
  if (elCloseProfile) elCloseProfile.addEventListener('click', closeProfileModal);
  const elCloseProfileBtn = document.getElementById('btn-profile-close');
  if (elCloseProfileBtn) elCloseProfileBtn.addEventListener('click', closeProfileModal);

  // Player Profile Badge JPG download trigger
  const elProfilePrintBadge = document.getElementById('btn-profile-print-badge');
  if (elProfilePrintBadge) {
    elProfilePrintBadge.addEventListener('click', () => {
      const activeFighterId = elProfilePrintBadge.getAttribute('data-fighter-id');
      if (activeFighterId) {
        downloadSingleBadgeJPG(activeFighterId, false);
      }
    });
  }

  // Competitor Profile Showcase Editor handlers
  const elPlayerProfileEdit = document.getElementById('btn-player-profile-edit');
  if (elPlayerProfileEdit) {
    elPlayerProfileEdit.addEventListener('click', () => {
      const activeFighterId = elProfilePrintBadge ? elProfilePrintBadge.getAttribute('data-fighter-id') : null;
      if (activeFighterId) {
        const f = state.fighters.find(item => item.id === activeFighterId);
        if (f) {
          document.getElementById('player-profile-view-mode').style.display = 'none';
          document.getElementById('player-profile-edit-mode').style.display = 'block';
          
          document.getElementById('player-edit-id').value = f.id;
          document.getElementById('player-edit-name').value = f.name || '';
          document.getElementById('player-edit-belt').value = f.belt ? f.belt.toLowerCase() : 'white';
          document.getElementById('player-edit-dojo').value = f.club || '';
          document.getElementById('player-edit-weight').value = f.weight || '';
          document.getElementById('player-edit-gender').value = f.gender || '';
          document.getElementById('player-edit-dob').value = f.dob || '';
          document.getElementById('player-edit-customid').value = f.customId || '';
          document.getElementById('player-edit-city').value = f.city || '';
          const countrySelect = document.getElementById('player-edit-country');
          if (countrySelect) countrySelect.value = f.country || '';
          
          currentPlayerProfileEditPhoto = f.photo || '';
          const previewImg = document.getElementById('player-edit-photo-preview');
          const placeholder = document.getElementById('player-edit-photo-placeholder');
          if (previewImg && placeholder) {
            if (currentPlayerProfileEditPhoto) {
              previewImg.src = currentPlayerProfileEditPhoto;
              previewImg.style.display = 'block';
              placeholder.style.display = 'none';
            } else {
              previewImg.src = '';
              previewImg.style.display = 'none';
              placeholder.style.display = 'block';
            }
          }
        }
      }
    });
  }

  const elPlayerProfileCancel = document.getElementById('btn-player-edit-cancel');
  if (elPlayerProfileCancel) {
    elPlayerProfileCancel.addEventListener('click', () => {
      document.getElementById('player-profile-view-mode').style.display = 'block';
      document.getElementById('player-profile-edit-mode').style.display = 'none';
    });
  }

  const elPlayerPhotoUpload = document.getElementById('btn-player-photo-upload');
  if (elPlayerPhotoUpload) {
    elPlayerPhotoUpload.addEventListener('click', () => {
      document.getElementById('player-edit-photo-input').click();
    });
  }

  const elPlayerPhotoInput = document.getElementById('player-edit-photo-input');
  if (elPlayerPhotoInput) {
    elPlayerPhotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        compressProfilePhoto(file, (base64) => {
          currentPlayerProfileEditPhoto = base64;
          const img = document.getElementById('player-edit-photo-preview');
          const placeholder = document.getElementById('player-edit-photo-placeholder');
          if (img && placeholder) {
            img.src = base64;
            img.style.display = 'block';
            placeholder.style.display = 'none';
          }
        });
      }
    });
  }

  const elPlayerProfileEditForm = document.getElementById('player-profile-edit-form');
  if (elPlayerProfileEditForm) {
    elPlayerProfileEditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('player-edit-id').value;
      const name = document.getElementById('player-edit-name').value.trim();
      const belt = document.getElementById('player-edit-belt').value;
      const club = document.getElementById('player-edit-dojo').value.trim();
      const weight = parseFloat(document.getElementById('player-edit-weight').value) || 0;
      const gender = document.getElementById('player-edit-gender').value;
      const dob = document.getElementById('player-edit-dob').value;
      const customId = document.getElementById('player-edit-customid').value.trim().toUpperCase();
      const city = document.getElementById('player-edit-city').value.trim();
      const country = document.getElementById('player-edit-country').value;

      const idx = state.fighters.findIndex(f => f.id === id);
      if (idx !== -1) {
        const originalFighter = state.fighters[idx];
        const originalName = originalFighter.name;
        const originalClub = originalFighter.club;

        // Update all matching profiles across all events simultaneously to prevent data drift
        syncCompetitorProfileAcrossAllEvents(originalName, originalClub, {
          name: name,
          belt: belt,
          club: club,
          weight: weight,
          gender: gender,
          dob: dob,
          city: city,
          country: country,
          photo: currentPlayerProfileEditPhoto || originalFighter.photo || "",
          customId: customId
        });

        saveState();
        showToast(`Competitor profile for "${name}" updated successfully across all divisions!`, "success");
        
        // Refresh View Mode and switch back
        openPlayerProfileModal(id);
      }
    });
  }

  // Rankings and Winners JPG Exporters
  const elRankingsExportJpg = document.getElementById('rankings-export-jpg-btn');
  if (elRankingsExportJpg) {
    elRankingsExportJpg.addEventListener('click', () => {
      downloadRankingsJPG();
    });
  }

  const elWinnersExportJpg = document.getElementById('winners-export-jpg-btn');
  if (elWinnersExportJpg) {
    elWinnersExportJpg.addEventListener('click', () => {
      downloadAllTournamentWinnersJPG();
    });
  }

  // Backup JSON event listener
  const btnDownloadEventJson = document.getElementById('btn-download-event-json');
  if (btnDownloadEventJson) {
    btnDownloadEventJson.addEventListener('click', () => {
      try {
        const jsonString = JSON.stringify(state, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", url);
        downloadAnchor.setAttribute("download", `tournament_backup_${state.eventName ? state.eventName.toLowerCase().replace(/\s+/g, '_') : 'event'}_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        URL.revokeObjectURL(url);
        showToast("Tournament JSON backup file downloaded successfully!", "success");
      } catch (err) {
        console.error("Backup JSON export failed:", err);
        showToast("Error downloading tournament backup file.", "error");
      }
    });
  }

  // --- Official & Staff Profile Modal Handlers ---
  const closeStaffModal = () => document.getElementById('modal-staff-profile').classList.remove('active');
  const elCloseStaff = document.getElementById('close-staff-profile-modal');
  if (elCloseStaff) elCloseStaff.addEventListener('click', closeStaffModal);
  const elCloseStaffBtn = document.getElementById('btn-staff-profile-close');
  if (elCloseStaffBtn) elCloseStaffBtn.addEventListener('click', closeStaffModal);

  const elStaffProfileEdit = document.getElementById('btn-staff-profile-edit');
  if (elStaffProfileEdit) {
    elStaffProfileEdit.addEventListener('click', () => {
      document.getElementById('staff-profile-view-mode').style.display = 'none';
      document.getElementById('staff-profile-edit-mode').style.display = 'block';
      currentStaffProfileEditPhoto = ''; // Reset upload variable
    });
  }

  const elStaffProfileCancel = document.getElementById('btn-staff-profile-edit-cancel');
  if (elStaffProfileCancel) {
    elStaffProfileCancel.addEventListener('click', () => {
      document.getElementById('staff-profile-view-mode').style.display = 'block';
      document.getElementById('staff-profile-edit-mode').style.display = 'none';
    });
  }

  const elStaffProfilePhotoUpload = document.getElementById('btn-staff-profile-photo-upload');
  if (elStaffProfilePhotoUpload) {
    elStaffProfilePhotoUpload.addEventListener('click', () => {
      document.getElementById('staff-profile-edit-photo-input').click();
    });
  }

  const elStaffProfilePhotoInput = document.getElementById('staff-profile-edit-photo-input');
  if (elStaffProfilePhotoInput) {
    elStaffProfilePhotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        compressProfilePhoto(file, (base64) => {
          currentStaffProfileEditPhoto = base64;
          const img = document.getElementById('staff-profile-edit-photo-preview');
          const placeholder = document.getElementById('staff-profile-edit-photo-placeholder');
          if (img && placeholder) {
            img.src = base64;
            img.style.display = 'block';
            placeholder.style.display = 'none';
          }
        });
      }
    });
  }

  const elStaffProfileEditForm = document.getElementById('staff-profile-edit-form');
  if (elStaffProfileEditForm) {
    elStaffProfileEditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('staff-profile-edit-id').value;
      const name = document.getElementById('staff-profile-edit-name').value.trim();
      const role = document.getElementById('staff-profile-edit-role').value;
      const dojo = document.getElementById('staff-profile-edit-dojo').value.trim();
      const customId = document.getElementById('staff-profile-edit-customid-val').value.trim().toUpperCase();

      state.staff = state.staff || [];
      const member = state.staff.find(s => s.id === id);
      if (member) {
        member.name = name;
        member.role = role;
        member.dojo = dojo;
        if (customId) {
          member.customId = customId;
        } else {
          delete member.customId;
        }
        if (currentStaffProfileEditPhoto) {
          member.photo = currentStaffProfileEditPhoto;
        }

        saveState();
        showToast(`Official profile for "${name}" updated successfully!`, "success");
        
        // Refresh View Mode values in the modal and switch back
        openStaffProfileModal(id);
      }
    });
  }

  // Premium badge designer handlers initialization
  initBadgeDesignerHandlers();
}

function syncBadgeDesignerFromState() {
  const themeSelect = document.getElementById('badge-theme-select');
  if (themeSelect) themeSelect.value = state.badgeBg || 'classic-white';
  
  const customBgSettings = document.getElementById('badge-custom-bg-settings');
  if (customBgSettings) customBgSettings.style.display = state.badgeBg === 'custom' ? 'flex' : 'none';
  
  const bgStyleSelect = document.getElementById('badge-bg-style-select');
  if (bgStyleSelect) bgStyleSelect.value = state.badgeBgStyle || 'solid';
  
  const color2Group = document.getElementById('badge-bg-color2-group');
  if (color2Group) color2Group.style.display = (state.badgeBgStyle === 'gradient' || state.badgeBgStyle === 'radial') ? 'block' : 'none';

  // Toggle Background Colors group and Background Image uploader depending on the style select
  const bgColorsGroup = document.getElementById('badge-custom-bg-colors-group');
  const bgImageSection = document.getElementById('badge-bg-image-uploader-section');
  if (bgColorsGroup && bgImageSection) {
    if (state.badgeBgStyle === 'image') {
      bgColorsGroup.style.display = 'none';
      bgImageSection.style.display = 'flex';
    } else {
      bgColorsGroup.style.display = 'flex';
      bgImageSection.style.display = 'none';
    }
  }
  
  const bgColor1Picker = document.getElementById('badge-bg-color1');
  if (bgColor1Picker) bgColor1Picker.value = state.badgeBgColor1 || '#ffffff';
  
  const bgColor1Text = document.getElementById('badge-bg-color1-text');
  if (bgColor1Text) bgColor1Text.value = state.badgeBgColor1 || '#ffffff';
  
  const bgColor2Picker = document.getElementById('badge-bg-color2');
  if (bgColor2Picker) bgColor2Picker.value = state.badgeBgColor2 || '#f3f4f6';
  
  const bgColor2Text = document.getElementById('badge-bg-color2-text');
  if (bgColor2Text) bgColor2Text.value = state.badgeBgColor2 || '#f3f4f6';
  
  const sizePreset = document.getElementById('badge-size-preset');
  if (sizePreset) sizePreset.value = state.badgeSize || 'cr80';
  
  const customSizeInputs = document.getElementById('badge-custom-size-inputs');
  if (customSizeInputs) customSizeInputs.style.display = state.badgeSize === 'custom' ? 'flex' : 'none';
  
  const widthInput = document.getElementById('badge-width-input');
  if (widthInput) widthInput.value = state.badgeWidth || 54;
  
  const heightInput = document.getElementById('badge-height-input');
  if (heightInput) heightInput.value = state.badgeHeight || 86;
  
  const fontSelect = document.getElementById('badge-font-select');
  if (fontSelect) fontSelect.value = state.badgeFont || 'Inter';
  
  const fontSizeSelect = document.getElementById('badge-font-size-select');
  if (fontSizeSelect) fontSizeSelect.value = state.badgeTextScale || 'medium';

  // Load custom Header and ID sizes
  const headerSizeInput = document.getElementById('badge-header-size-input');
  if (headerSizeInput) headerSizeInput.value = state.badgeHeaderSize || '';

  const idSizeInput = document.getElementById('badge-id-size-input');
  if (idSizeInput) idSizeInput.value = state.badgeIdSize || '';
  
  const textColorPicker = document.getElementById('badge-text-color-picker');
  if (textColorPicker) textColorPicker.value = state.badgeTextColor || '#1e293b';
  
  const textColorHex = document.getElementById('badge-text-color-hex');
  if (textColorHex) textColorHex.value = state.badgeTextColor || '#1e293b';
  
  const accentColorPicker = document.getElementById('badge-accent-color-picker');
  if (accentColorPicker) accentColorPicker.value = state.badgeAccentColor || '#7c3aed';
  
  const accentColorHex = document.getElementById('badge-accent-color-hex');
  if (accentColorHex) accentColorHex.value = state.badgeAccentColor || '#7c3aed';

  // Load Background Image preview
  const bgImgPreview = document.getElementById('badge-bg-img-preview');
  const bgImgPlaceholder = document.getElementById('badge-bg-img-placeholder');
  const btnBgImgClear = document.getElementById('btn-badge-bg-img-clear');
  if (bgImgPreview && bgImgPlaceholder) {
    if (state.badgeBgImg) {
      bgImgPreview.src = state.badgeBgImg;
      bgImgPreview.style.display = 'block';
      bgImgPlaceholder.style.display = 'none';
      if (btnBgImgClear) btnBgImgClear.style.display = 'block';
    } else {
      bgImgPreview.src = '';
      bgImgPreview.style.display = 'none';
      bgImgPlaceholder.style.display = 'block';
      if (btnBgImgClear) btnBgImgClear.style.display = 'none';
    }
  }
  
  const showLogoChk = document.getElementById('badge-show-logo-chk');
  if (showLogoChk) showLogoChk.checked = state.badgeShowLogo !== false;
  
  const logoPreview = document.getElementById('badge-logo-preview');
  const logoPlaceholder = document.getElementById('badge-logo-placeholder');
  if (logoPreview && logoPlaceholder) {
    if (state.badgeLogo) {
      logoPreview.src = state.badgeLogo;
      logoPreview.style.display = 'block';
      logoPlaceholder.style.display = 'none';
    } else {
      logoPreview.src = '';
      logoPreview.style.display = 'none';
      logoPlaceholder.style.display = 'block';
    }
  }

  // Load Signatory Footer settings
  const showSignatureChk = document.getElementById('badge-show-signature-chk');
  if (showSignatureChk) showSignatureChk.checked = state.badgeShowSignature !== false;

  const authNameInput = document.getElementById('badge-auth-name-input');
  if (authNameInput) authNameInput.value = state.badgeAuthName || '';

  const authTitleInput = document.getElementById('badge-auth-title-input');
  if (authTitleInput) authTitleInput.value = state.badgeAuthTitle || '';

  const sigSettingsSection = document.getElementById('badge-signature-settings-section');
  if (sigSettingsSection) {
    sigSettingsSection.style.display = (state.badgeShowSignature !== false) ? 'flex' : 'none';
  }
}

function initBadgeDesignerHandlers() {
  const themeSelect = document.getElementById('badge-theme-select');
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      state.badgeBg = e.target.value;
      const customBgSettings = document.getElementById('badge-custom-bg-settings');
      if (customBgSettings) customBgSettings.style.display = state.badgeBg === 'custom' ? 'flex' : 'none';
      saveState();
      renderCredentialsView();
    });
  }

  const bgStyleSelect = document.getElementById('badge-bg-style-select');
  if (bgStyleSelect) {
    bgStyleSelect.addEventListener('change', (e) => {
      state.badgeBgStyle = e.target.value;
      const color2Group = document.getElementById('badge-bg-color2-group');
      if (color2Group) color2Group.style.display = (state.badgeBgStyle === 'gradient' || state.badgeBgStyle === 'radial') ? 'block' : 'none';
      
      const bgColorsGroup = document.getElementById('badge-custom-bg-colors-group');
      const bgImageSection = document.getElementById('badge-bg-image-uploader-section');
      if (bgColorsGroup && bgImageSection) {
        if (state.badgeBgStyle === 'image') {
          bgColorsGroup.style.display = 'none';
          bgImageSection.style.display = 'flex';
        } else {
          bgColorsGroup.style.display = 'flex';
          bgImageSection.style.display = 'none';
        }
      }
      
      saveState();
      renderCredentialsView();
    });
  }

  // Color 1 picker & text input
  const bgColor1Picker = document.getElementById('badge-bg-color1');
  const bgColor1Text = document.getElementById('badge-bg-color1-text');
  if (bgColor1Picker && bgColor1Text) {
    bgColor1Picker.addEventListener('input', (e) => {
      bgColor1Text.value = e.target.value;
      state.badgeBgColor1 = e.target.value;
      saveState();
      renderCredentialsView();
    });
    bgColor1Text.addEventListener('input', (e) => {
      const val = e.target.value;
      if (/^#[0-9A-F]{6}$/i.test(val)) {
        bgColor1Picker.value = val;
        state.badgeBgColor1 = val;
        saveState();
        renderCredentialsView();
      }
    });
  }

  // Color 2 picker & text input
  const bgColor2Picker = document.getElementById('badge-bg-color2');
  const bgColor2Text = document.getElementById('badge-bg-color2-text');
  if (bgColor2Picker && bgColor2Text) {
    bgColor2Picker.addEventListener('input', (e) => {
      bgColor2Text.value = e.target.value;
      state.badgeBgColor2 = e.target.value;
      saveState();
      renderCredentialsView();
    });
    bgColor2Text.addEventListener('input', (e) => {
      const val = e.target.value;
      if (/^#[0-9A-F]{6}$/i.test(val)) {
        bgColor2Picker.value = val;
        state.badgeBgColor2 = val;
        saveState();
        renderCredentialsView();
      }
    });
  }

  // Preset size
  const sizePreset = document.getElementById('badge-size-preset');
  if (sizePreset) {
    sizePreset.addEventListener('change', (e) => {
      state.badgeSize = e.target.value;
      const customSizeInputs = document.getElementById('badge-custom-size-inputs');
      if (customSizeInputs) customSizeInputs.style.display = state.badgeSize === 'custom' ? 'flex' : 'none';
      
      if (state.badgeSize === 'cr80') {
        state.badgeWidth = 54;
        state.badgeHeight = 86;
      } else if (state.badgeSize === 'cr100') {
        state.badgeWidth = 70;
        state.badgeHeight = 100;
      } else if (state.badgeSize === 'square') {
        state.badgeWidth = 85;
        state.badgeHeight = 85;
      } else if (state.badgeSize === 'custom') {
        const widthInput = document.getElementById('badge-width-input');
        const heightInput = document.getElementById('badge-height-input');
        if (widthInput && heightInput) {
          state.badgeWidth = parseInt(widthInput.value) || 54;
          state.badgeHeight = parseInt(heightInput.value) || 86;
        }
      }
      saveState();
      renderCredentialsView();
    });
  }

  // Width & height inputs
  const widthInput = document.getElementById('badge-width-input');
  const heightInput = document.getElementById('badge-height-input');
  if (widthInput) {
    widthInput.addEventListener('input', (e) => {
      state.badgeWidth = parseInt(e.target.value) || 54;
      saveState();
      renderCredentialsView();
    });
  }
  if (heightInput) {
    heightInput.addEventListener('input', (e) => {
      state.badgeHeight = parseInt(e.target.value) || 86;
      saveState();
      renderCredentialsView();
    });
  }

  // Font
  const fontSelect = document.getElementById('badge-font-select');
  if (fontSelect) {
    fontSelect.addEventListener('change', (e) => {
      state.badgeFont = e.target.value;
      saveState();
      renderCredentialsView();
    });
  }

  // Text scale
  const fontSizeSelect = document.getElementById('badge-font-size-select');
  if (fontSizeSelect) {
    fontSizeSelect.addEventListener('change', (e) => {
      state.badgeTextScale = e.target.value;
      saveState();
      renderCredentialsView();
    });
  }

  // Text color picker & text input
  const textColorPicker = document.getElementById('badge-text-color-picker');
  const textColorHex = document.getElementById('badge-text-color-hex');
  if (textColorPicker && textColorHex) {
    textColorPicker.addEventListener('input', (e) => {
      textColorHex.value = e.target.value;
      state.badgeTextColor = e.target.value;
      saveState();
      renderCredentialsView();
    });
    textColorHex.addEventListener('input', (e) => {
      const val = e.target.value;
      if (/^#[0-9A-F]{6}$/i.test(val)) {
        textColorPicker.value = val;
        state.badgeTextColor = val;
        saveState();
        renderCredentialsView();
      }
    });
  }

  // Accent color picker & text input
  const accentColorPicker = document.getElementById('badge-accent-color-picker');
  const accentColorHex = document.getElementById('badge-accent-color-hex');
  if (accentColorPicker && accentColorHex) {
    accentColorPicker.addEventListener('input', (e) => {
      accentColorHex.value = e.target.value;
      state.badgeAccentColor = e.target.value;
      saveState();
      renderCredentialsView();
    });
    accentColorHex.addEventListener('input', (e) => {
      const val = e.target.value;
      if (/^#[0-9A-F]{6}$/i.test(val)) {
        accentColorPicker.value = val;
        state.badgeAccentColor = val;
        saveState();
        renderCredentialsView();
      }
    });
  }

  // Show logo checkbox
  const showLogoChk = document.getElementById('badge-show-logo-chk');
  if (showLogoChk) {
    showLogoChk.addEventListener('change', (e) => {
      state.badgeShowLogo = e.target.checked;
      saveState();
      renderCredentialsView();
    });
  }

  // Logo upload
  const btnBadgeLogoUpload = document.getElementById('btn-badge-logo-upload');
  const badgeLogoInput = document.getElementById('badge-logo-input');
  if (btnBadgeLogoUpload && badgeLogoInput) {
    btnBadgeLogoUpload.addEventListener('click', () => {
      badgeLogoInput.click();
    });
    badgeLogoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        compressBadgeLogo(file, (base64) => {
          state.badgeLogo = base64;
          const logoPreview = document.getElementById('badge-logo-preview');
          const logoPlaceholder = document.getElementById('badge-logo-placeholder');
          if (logoPreview && logoPlaceholder) {
            logoPreview.src = base64;
            logoPreview.style.display = 'block';
            logoPlaceholder.style.display = 'none';
          }
          saveState();
          renderCredentialsView();
        });
      }
    });
  }

  // Custom Header & ID Font Sizes
  const headerSizeInput = document.getElementById('badge-header-size-input');
  if (headerSizeInput) {
    headerSizeInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      state.badgeHeaderSize = isNaN(val) ? '' : val;
      saveState();
      renderCredentialsView();
    });
  }

  const idSizeInput = document.getElementById('badge-id-size-input');
  if (idSizeInput) {
    idSizeInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      state.badgeIdSize = isNaN(val) ? '' : val;
      saveState();
      renderCredentialsView();
    });
  }

  // Background Image Upload & Clear
  const btnBgImgUpload = document.getElementById('btn-badge-bg-img-upload');
  const bgImgInput = document.getElementById('badge-bg-img-input');
  const btnBgImgClear = document.getElementById('btn-badge-bg-img-clear');

  if (btnBgImgUpload && bgImgInput) {
    btnBgImgUpload.addEventListener('click', () => {
      bgImgInput.click();
    });

    bgImgInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        compressBgImage(file, (base64) => {
          state.badgeBgImg = base64;
          const bgImgPreview = document.getElementById('badge-bg-img-preview');
          const bgImgPlaceholder = document.getElementById('badge-bg-img-placeholder');
          if (bgImgPreview && bgImgPlaceholder) {
            bgImgPreview.src = base64;
            bgImgPreview.style.display = 'block';
            bgImgPlaceholder.style.display = 'none';
          }
          if (btnBgImgClear) {
            btnBgImgClear.style.display = 'block';
          }
          saveState();
          renderCredentialsView();
        });
      }
    });
  }

  if (btnBgImgClear) {
    btnBgImgClear.addEventListener('click', () => {
      state.badgeBgImg = '';
      if (bgImgInput) bgImgInput.value = '';
      const bgImgPreview = document.getElementById('badge-bg-img-preview');
      const bgImgPlaceholder = document.getElementById('badge-bg-img-placeholder');
      if (bgImgPreview && bgImgPlaceholder) {
        bgImgPreview.src = '';
        bgImgPreview.style.display = 'none';
        bgImgPlaceholder.style.display = 'block';
      }
      btnBgImgClear.style.display = 'none';
      saveState();
      renderCredentialsView();
    });
  }

  // Signatory Footer checkbox
  const showSignatureChk = document.getElementById('badge-show-signature-chk');
  if (showSignatureChk) {
    showSignatureChk.addEventListener('change', (e) => {
      state.badgeShowSignature = e.target.checked;
      const sigSettingsSection = document.getElementById('badge-signature-settings-section');
      if (sigSettingsSection) {
        sigSettingsSection.style.display = state.badgeShowSignature ? 'flex' : 'none';
      }
      saveState();
      renderCredentialsView();
    });
  }

  // Signatory Name input
  const authNameInput = document.getElementById('badge-auth-name-input');
  if (authNameInput) {
    authNameInput.addEventListener('input', (e) => {
      state.badgeAuthName = e.target.value.trim();
      saveState();
      renderCredentialsView();
    });
  }

  // Signatory Title input
  const authTitleInput = document.getElementById('badge-auth-title-input');
  if (authTitleInput) {
    authTitleInput.addEventListener('input', (e) => {
      state.badgeAuthTitle = e.target.value.trim();
      saveState();
      renderCredentialsView();
    });
  }
}

// ================= INTELLIGENT MATCHMAKER & CATEGORY MATCHING =================

function calculateAge(dobString) {
  if (!dobString) return 0;
  const today = new Date();
  const birthDate = new Date(dobString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function calculateCategoryMatch(dob, gender, weightStr) {
  if (!gender) return null;
  
  // Determine Age Class
  let ageClass = 'Senior';
  if (dob) {
    const age = calculateAge(dob);
    if (age < 14) ageClass = 'Children';
    else if (age >= 14 && age < 16) ageClass = 'Cadet';
    else if (age >= 16 && age < 18) ageClass = 'Junior';
  }
  
  // Determine Weight Class
  let weightClass = 'Open';
  if (weightStr) {
    const weight = parseFloat(weightStr);
    if (!isNaN(weight) && weight > 0) {
      if (gender === 'Male') {
        if (weight <= 60) weightClass = '-60kg';
        else if (weight <= 67) weightClass = '-67kg';
        else if (weight <= 75) weightClass = '-75kg';
        else if (weight <= 84) weightClass = '-84kg';
        else weightClass = '+84kg';
      } else {
        // Female bins
        if (weight <= 50) weightClass = '-50kg';
        else if (weight <= 55) weightClass = '-55kg';
        else if (weight <= 61) weightClass = '-61kg';
        else if (weight <= 68) weightClass = '-68kg';
        else weightClass = '+68kg';
      }
    }
  }

  // Search for existing category matching gender, ageClass, and weightClass
  const matched = state.categories.find(c => {
    const cGender = (c.gender || '').toLowerCase();
    const cAge = (c.ageClass || '').toLowerCase();
    const cWeight = (c.weightClass || '').toLowerCase();
    return cGender === gender.toLowerCase() && cAge === ageClass.toLowerCase() && cWeight === weightClass.toLowerCase();
  });

  const name = `${gender} ${ageClass} Kumite ${weightClass}`;

  if (matched) {
    return {
      status: 'FOUND',
      id: matched.id,
      name: matched.name,
      gender,
      ageClass,
      weightClass,
      type: 'Kumite'
    };
  } else {
    return {
      status: 'AUTO_CREATE',
      id: 'AUTO_CREATE',
      name: name,
      gender,
      ageClass,
      weightClass,
      type: 'Kumite'
    };
  }
}

function handleFighterModalAutoMatch() {
  const dob = document.getElementById('fighter-dob').value;
  const gender = document.getElementById('fighter-gender').value;
  const weight = document.getElementById('fighter-weight').value;
  const badge = document.getElementById('fighter-auto-match-badge');
  const catSelect = document.getElementById('fighter-division');

  if (!gender) {
    badge.style.display = 'none';
    return;
  }

  const match = calculateCategoryMatch(dob, gender, weight);
  if (match) {
    badge.style.display = 'inline-block';
    
    // Clear any previous auto-create options
    const prevAutoOpt = catSelect.querySelector('option[value="AUTO_CREATE"]');
    if (prevAutoOpt) prevAutoOpt.remove();

    if (match.status === 'FOUND') {
      catSelect.value = match.id;
    } else {
      // Add AUTO_CREATE option to the dropdown
      const opt = document.createElement('option');
      opt.value = 'AUTO_CREATE';
      opt.innerText = `[Auto-Create & Match] ${match.name}`;
      opt.setAttribute('data-name', match.name);
      opt.setAttribute('data-gender', match.gender);
      opt.setAttribute('data-age', match.ageClass);
      opt.setAttribute('data-weight', match.weightClass);
      opt.setAttribute('data-type', match.type);
      catSelect.insertBefore(opt, catSelect.firstChild);
      catSelect.value = 'AUTO_CREATE';
    }
  } else {
    badge.style.display = 'none';
  }

  // Auto-match Kata division too if dob and gender are set
  const kataSelect = document.getElementById('fighter-kata-division');
  if (kataSelect && dob && gender) {
    const age = calculateAge(dob);
    let ageClass = 'Senior';
    if (age < 14) ageClass = 'Children';
    else if (age >= 14 && age < 16) ageClass = 'Cadet';
    else if (age >= 16 && age < 18) ageClass = 'Junior';

    const matchedKata = state.categories.find(c => {
      const isKata = (c.type || '').toLowerCase() === 'kata';
      const cGender = (c.gender || '').toLowerCase();
      const cAge = (c.ageClass || '').toLowerCase();
      return isKata && cGender === gender.toLowerCase() && cAge === ageClass.toLowerCase();
    });

    if (matchedKata) {
      kataSelect.value = matchedKata.id;
    }
  }
}

// ================= HIGH-FIDELITY BRACKET PDF EXPORT =================

function downloadSingleBracketA4() {
  const catId = document.getElementById('bracket-division-select').value;
  if (!catId) {
    showToast("Please select a karate division to export!", "warning");
    return;
  }

  const cat = state.categories.find(c => c.id === catId);
  const catMatches = state.matches.filter(m => m.categoryId === catId && m.round > 0);
  
  if (catMatches.length === 0) {
    showToast("No active tournament tree found for the selected division. Please generate it first!", "warning");
    return;
  }

  showToast("Compiling single draw sheet PDF, please wait...", "info");

  // Association Logo — use uploaded logo or event name abbreviation
  let logoHTML = '';
  if (state.eventLogo) {
    logoHTML = `<img src="${state.eventLogo}" style="max-height: 60px; max-width: 120px; object-fit: contain;" crossorigin="anonymous">`;
  } else {
    const abbr = (state.eventName || 'Tournament').split(' ').map(w => w[0]).join('').substring(0, 4).toUpperCase();
    logoHTML = `<div style="background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; font-weight: 800; padding: 10px 15px; border-radius: 6px; font-size: 1.1rem; letter-spacing: 1px; text-transform: uppercase;">${abbr}</div>`;
  }

  let adminHTML = '';
  if (state.adminLogo && (state.adminLogo.startsWith('data:image/') || state.adminLogo.includes('localhost') || state.adminLogo.includes('127.0.0.1'))) {
    adminHTML = `<img src="${state.adminLogo}" style="max-height: 50px; max-width: 50px; border-radius: 50%; object-fit: cover; border: 1.5px solid #7c3aed;">`;
  } else {
    adminHTML = `<div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(124,58,237,0.1); border: 1.5px solid #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">🥋</div>`;
  }

  // Create wide desktop-aspect offscreen container
  const printContainer = document.createElement('div');
  printContainer.className = 'bracket-pdf-print-container light-theme';
  printContainer.style = 'position: absolute; top: -9999px; left: -9999px; width: 1440px; height: 1018px; box-sizing: border-box; padding: 40px; background: #ffffff; color: #111827; font-family: system-ui, sans-serif; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; z-index: 99999;';

  // Header HTML
  const eventName = state.eventName || "KumiteMaster Championship";
  const divName = cat ? cat.name : "Unknown Division";
  const headerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #eaeaea; padding-bottom: 15px; margin-bottom: 20px;">
      <div style="display: flex; align-items: center; gap: 18px;">
        ${logoHTML}
        <div>
          <h1 style="font-size: 1.8rem; margin: 0; color: #111827; font-weight: 800; line-height: 1.1;">${eventName}</h1>
          <h2 style="font-size: 1.25rem; margin: 4px 0 0 0; color: #4b5563; font-weight: 700;">Division Draw Sheet: ${divName}</h2>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px; text-align: right;">
        <div>
          <div style="font-size: 0.9rem; font-weight: 800; color: #7c3aed; text-transform: uppercase;">Sensei Administrator</div>
          <div style="font-size: 0.8rem; color: #6b7280;">Host Verification</div>
        </div>
        ${adminHTML}
      </div>
    </div>
  `;

  // Podium/Winners section
  let winnersHTML = '';
  const totalRounds = Math.max(...catMatches.map(m => m.round));
  const finalMatch = catMatches.find(m => m.round === totalRounds);
  if (finalMatch && finalMatch.status === 'completed' && finalMatch.winnerId) {
    const gF = state.fighters.find(f => f.id === finalMatch.winnerId);
    const runnerUpId = finalMatch.winnerId === finalMatch.fighterAId ? finalMatch.fighterBId : finalMatch.fighterAId;
    const sF = state.fighters.find(f => f.id === runnerUpId);
    
    const semiRound = totalRounds - 1;
    const semiMatches = catMatches.filter(m => m.round === semiRound);
    let bF1 = null;
    let bF2 = null;
    if (semiMatches.length > 0) {
      const semiLosers = [];
      semiMatches.forEach(m => {
        if (m.winnerId) {
          const loserId = m.winnerId === m.fighterAId ? m.fighterBId : m.fighterAId;
          if (loserId && loserId !== 'BYE') semiLosers.push(loserId);
        }
      });
      const losersFighters = state.fighters.filter(f => semiLosers.includes(f.id));
      if (losersFighters.length > 0) {
        bF1 = losersFighters[0] || null;
        bF2 = losersFighters[1] || null;
      }
    }

    const gridCols = bF2 ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr';
    winnersHTML = `
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 24px; margin-bottom: 20px; display: grid; grid-template-columns: ${gridCols}; gap: 15px; text-align: center; font-size: 1rem;">
        <div style="border-right: 1px solid #eaeaea; padding: 2px;">
          <span style="font-weight: 700; color: #f59e0b; text-transform: uppercase; font-size: 0.8rem;">🥇 Gold</span>
          <span style="font-weight: 800; color: #111827; margin-left: 8px;">${gF ? gF.name : 'Unknown'}</span>
        </div>
        <div style="border-right: 1px solid #eaeaea; padding: 2px;">
          <span style="font-weight: 700; color: #9ca3af; text-transform: uppercase; font-size: 0.8rem;">🥈 Silver</span>
          <span style="font-weight: 800; color: #111827; margin-left: 8px;">${sF ? sF.name : 'Unknown'}</span>
        </div>
        <div style="${bF2 ? 'border-right: 1px solid #eaeaea;' : ''} padding: 2px;">
          <span style="font-weight: 700; color: #b45309; text-transform: uppercase; font-size: 0.8rem;">🥉 Bronze</span>
          <span style="font-weight: 800; color: #111827; margin-left: 8px;">${bF1 ? bF1.name : 'Unknown'}</span>
        </div>
        ${bF2 ? `
        <div style="padding: 2px;">
          <span style="font-weight: 700; color: #b45309; text-transform: uppercase; font-size: 0.8rem;">🥉 Bronze</span>
          <span style="font-weight: 800; color: #111827; margin-left: 8px;">${bF2.name}</span>
        </div>
        ` : ''}
      </div>
    `;
  }

  // Draw Tree Columns (100% Horizontal)
  let treeHTML = `<div style="display: flex; flex-direction: row; gap: 40px; align-items: center; justify-content: space-between; flex-grow: 1; width: 100%; height: 100%; box-sizing: border-box;">`;
  for (let r = 1; r <= totalRounds; r++) {
    let title = `Round ${r}`;
    if (r === totalRounds) title = "Championship";
    else if (r === totalRounds - 1) title = "Semi-Finals";
    else if (r === totalRounds - 2) title = "Quarter-Finals";

    treeHTML += `
      <div style="display: flex; flex-direction: column; justify-content: space-around; height: 100%; min-width: 220px; flex-grow: 1; position: relative; padding-top: 30px;">
        <div style="font-size: 0.9rem; text-transform: uppercase; color: #374151; font-weight: 800; text-align: center; border-bottom: 2.5px solid #374151; padding-bottom: 6px; position: absolute; top: 0; left: 0; right: 0;">${title}</div>`;

    const roundMatches = catMatches.filter(m => m.round === r).sort((a, b) => a.matchNumber - b.matchNumber);
    roundMatches.forEach(m => {
      const fA = state.fighters.find(f => f.id === m.fighterAId);
      const fB = state.fighters.find(f => f.id === m.fighterBId);

      const nameA = fA ? fA.name : (m.fighterAId === 'BYE' ? 'BYE' : 'TBD');
      const nameB = fB ? fB.name : (m.fighterBId === 'BYE' ? 'BYE' : 'TBD');

      const isWinnerA = m.winnerId && m.winnerId === m.fighterAId;
      const isWinnerB = m.winnerId && m.winnerId === m.fighterBId;

      const liveClass = m.status === 'live' ? 'border-color: #ef4444 !important; box-shadow: 0 0 10px rgba(239, 68, 68, 0.15) !important;' : '';
      const compClass = m.status === 'completed' ? 'border-color: #10b981 !important;' : '';

      treeHTML += `
        <div style="background: #f9fafb; border: 1.5px solid #cbd5e1; border-radius: 8px; display: flex; flex-direction: column; overflow: hidden; position: relative; padding: 12px 14px; gap: 8px; width: 100%; box-shadow: none; ${liveClass} ${compClass}">
          <div style="font-size: 0.7rem; color: #6b7280; display: flex; justify-content: space-between; border-bottom: 1px dashed #e5e7eb; padding-bottom: 4px; font-weight: 700;">
            <span>Match ${m.matchNumber}</span>
            <span>Mat ${m.mat || '-'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; color: ${isWinnerA ? '#b45309' : '#1f2937'}; padding: 4px 0;">
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">🔴 Aka: ${nameA}</span>
            <span style="font-size: 0.85rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: ${isWinnerA ? 'rgba(245, 158, 11, 0.25)' : '#e5e7eb'}; color: ${isWinnerA ? '#b45309' : '#111827'};">${m.scoreA}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; color: ${isWinnerB ? '#b45309' : '#1f2937'}; padding: 4px 0;">
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">🔵 Ao: ${nameB}</span>
            <span style="font-size: 0.85rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: ${isWinnerB ? 'rgba(245, 158, 11, 0.25)' : '#e5e7eb'}; color: ${isWinnerB ? '#b45309' : '#111827'};">${m.scoreB}</span>
          </div>
        </div>
      `;
    });
    treeHTML += `</div>`;
  }
  treeHTML += `</div>`;

  // Scale down the bracket inside the wrapper dynamically based on round count to fit the A4 page perfectly!
  let zoomScale = '1.0';
  if (totalRounds === 3) zoomScale = '0.9';
  else if (totalRounds === 4) zoomScale = '0.78';
  else if (totalRounds >= 5) zoomScale = '0.6';

  const middleWrapper = document.createElement('div');
  middleWrapper.style = `flex-grow: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; width: 100%; height: 100%; transform: scale(${zoomScale}); transform-origin: center center;`;
  middleWrapper.innerHTML = treeHTML;

  // Footer HTML
  const exporter = state.adminName || 'Sensei Administrator';
  const dateStr = new Date().toLocaleDateString();
  const timeStr = new Date().toLocaleTimeString();
  const footerHTML = `
    <div style="border-top: 2px dashed #cbd5e1; padding-top: 10px; margin-top: 15px; display: flex; justify-content: space-between; align-items: center; color: #4b5563; font-size: 0.8rem; width: 100%;">
      <div>🔒 Official Tournament Record • Generated by KumiteMaster Platform</div>
      <div>Exported By: <strong>${exporter}</strong> • Date: <strong>${dateStr}</strong> • Time: <strong>${timeStr}</strong></div>
    </div>
  `;

  // Assemble printContainer
  printContainer.innerHTML = headerHTML + (winnersHTML ? winnersHTML : '');
  printContainer.appendChild(middleWrapper);
  
  const footerDiv = document.createElement('div');
  footerDiv.style = "width: 100%;";
  footerDiv.innerHTML = footerHTML;
  printContainer.appendChild(footerDiv);

  document.body.appendChild(printContainer);

  const safeFileName = `kumitemaster_draw_${divName.toLowerCase().replace(/\s+/g, '_')}.pdf`;
  const opt = {
    margin:       0,
    filename:     safeFileName,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 1.5, useCORS: true, logging: false, scrollY: 0, scrollX: 0 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
  };

  if (typeof html2pdf === 'undefined') {
    showToast("PDF compiler offline. Opening native print...", "warning");
    window.print();
    document.body.removeChild(printContainer);
    return;
  }

  html2pdf().set(opt).from(printContainer).save().then(() => {
    document.body.removeChild(printContainer);
    showToast("Draw Sheet exported successfully in landscape A4!", "success");
  }).catch((err) => {
    if (document.body.contains(printContainer)) {
      document.body.removeChild(printContainer);
    }
    console.error("Single PDF export failed:", err);
    showToast("Failed to compile single Draw Sheet PDF.", "error");
  });
}

function downloadAllBracketsSinglePageA4() {
  // Gather active categories (categories with generated brackets)
  const activeDivs = state.categories.filter(cat => {
    const catMatches = state.matches.filter(m => m.categoryId === cat.id && m.round > 0);
    return catMatches.length > 0;
  });

  if (activeDivs.length === 0) {
    showToast("No active tournament trees found! Please select a category and click 'Generate Bracket' first.", "warning");
    return;
  }

  showToast(`Compiling ${activeDivs.length} Bracket Draw Sheets into a single A4 page...`, "info");

  // Association Logo — use uploaded logo or event name abbreviation
  let logoHTML = '';
  if (state.eventLogo) {
    logoHTML = `<img src="${state.eventLogo}" style="max-height: 50px; max-width: 100px; object-fit: contain;" crossorigin="anonymous">`;
  } else {
    const abbr = (state.eventName || 'Tournament').split(' ').map(w => w[0]).join('').substring(0, 4).toUpperCase();
    logoHTML = `<div style="background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; font-weight: 800; padding: 8px 12px; border-radius: 4px; font-size: 0.95rem; letter-spacing: 0.5px;">${abbr}</div>`;
  }

  let adminHTML = '';
  if (state.adminLogo && (state.adminLogo.startsWith('data:image/') || state.adminLogo.includes('localhost') || state.adminLogo.includes('127.0.0.1'))) {
    adminHTML = `<img src="${state.adminLogo}" style="max-height: 40px; max-width: 40px; border-radius: 50%; object-fit: cover; border: 1.5px solid #7c3aed;">`;
  } else {
    adminHTML = `<div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(124,58,237,0.1); border: 1.5px solid #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">🥋</div>`;
  }

  // Create Print Container with 1440x1018px size
  const printContainer = document.createElement('div');
  printContainer.className = 'bracket-pdf-print-container light-theme';
  printContainer.style = 'position: absolute; top: -9999px; left: -9999px; width: 1440px; height: 1018px; box-sizing: border-box; padding: 30px; background: #ffffff; color: #111827; font-family: system-ui, sans-serif; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; z-index: 99999;';

  // Header HTML
  const eventName = state.eventName || "KumiteMaster Championship";
  const headerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #eaeaea; padding-bottom: 10px; margin-bottom: 15px;">
      <div style="display: flex; align-items: center; gap: 15px;">
        ${logoHTML}
        <div>
          <h1 style="font-size: 1.6rem; margin: 0; color: #111827; font-weight: 800; line-height: 1.1;">${eventName}</h1>
          <h2 style="font-size: 1.1rem; margin: 3px 0 0 0; color: #4b5563; font-weight: 700;">Official Brackets Draw Sheets • All Divisions</h2>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px; text-align: right;">
        <div>
          <div style="font-size: 0.8rem; font-weight: 800; color: #7c3aed; text-transform: uppercase;">Sensei Administrator</div>
          <div style="font-size: 0.72rem; color: #6b7280;">Host Verification</div>
        </div>
        ${adminHTML}
      </div>
    </div>
  `;

  // Build Brackets Grid
  // Layout setup: 2 columns for up to 4 brackets, 3 columns for 5+ brackets.
  let columnsCount = 1;
  if (activeDivs.length === 2) columnsCount = 2;
  else if (activeDivs.length === 3 || activeDivs.length === 4) columnsCount = 2;
  else if (activeDivs.length >= 5) columnsCount = 3;

  let gridHTML = `<div style="display: grid; grid-template-columns: repeat(${columnsCount}, 1fr); gap: 20px; align-items: flex-start; justify-content: center; flex-grow: 1; width: 100%; overflow: hidden;">`;

  activeDivs.forEach(cat => {
    const catMatches = state.matches.filter(m => m.categoryId === cat.id && m.round > 0);
    const totalRounds = Math.max(...catMatches.map(m => m.round));

    // Champion badge if completed
    let championBadge = '';
    const finalMatch = catMatches.find(m => m.round === totalRounds);
    if (finalMatch && finalMatch.status === 'completed' && finalMatch.winnerId) {
      const champ = state.fighters.find(f => f.id === finalMatch.winnerId);
      if (champ) {
        championBadge = `<span style="font-size: 0.65rem; color: #d97706; background: rgba(245,158,11,0.08); padding: 2px 6px; border-radius: 4px; font-weight: 800;">🏆 ${champ.name}</span>`;
      }
    }

    gridHTML += `
      <div style="background: #ffffff; border: 2px solid #eaeaea; border-radius: 8px; padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; gap: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.02); height: 100%; overflow: hidden;">
        <h3 style="font-size: 0.85rem; font-weight: 800; color: #7c3aed; border-bottom: 2.5px solid #7c3aed; padding-bottom: 4px; margin: 0; text-transform: uppercase; letter-spacing: 0.3px; display: flex; align-items: center; justify-content: space-between;">
          <span>🎯 ${cat.name}</span>
          ${championBadge}
        </h3>
        <div style="display: flex; flex-direction: row; gap: 15px; align-items: center; justify-content: flex-start; flex-grow: 1; height: 100%;">
    `;

    for (let r = 1; r <= totalRounds; r++) {
      let title = `R${r}`;
      if (r === totalRounds) title = "Champ";
      else if (r === totalRounds - 1) title = "Semi";
      else if (r === totalRounds - 2) title = "Quarter";

      gridHTML += `
        <div style="display: flex; flex-direction: column; justify-content: space-around; height: 100%; gap: 10px; min-width: 130px; position: relative; padding-top: 20px; flex-grow: 1;">
          <div style="font-size: 0.6rem; text-transform: uppercase; color: #6b7280; font-weight: 800; text-align: center; position: absolute; top: 1px; left: 0; right: 0; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 2px;">${title}</div>`;

      const roundMatches = catMatches.filter(m => m.round === r).sort((a, b) => a.matchNumber - b.matchNumber);
      roundMatches.forEach(m => {
        const fA = state.fighters.find(f => f.id === m.fighterAId);
        const fB = state.fighters.find(f => f.id === m.fighterBId);

        const nameA = fA ? fA.name : (m.fighterAId === 'BYE' ? 'BYE' : 'TBD');
        const nameB = fB ? fB.name : (m.fighterBId === 'BYE' ? 'BYE' : 'TBD');

        const isWinnerA = m.winnerId && m.winnerId === m.fighterAId;
        const isWinnerB = m.winnerId && m.winnerId === m.fighterBId;

        const liveClass = m.status === 'live' ? 'border-color: #ef4444 !important; box-shadow: 0 0 5px rgba(239, 68, 68, 0.1) !important;' : '';
        const compClass = m.status === 'completed' ? 'border-color: #10b981 !important;' : '';

        gridHTML += `
          <div style="background: #f9fafb; border: 1px solid #cbd5e1; border-radius: 6px; display: flex; flex-direction: column; overflow: hidden; position: relative; padding: 6px 8px; gap: 4px; min-width: 120px; box-shadow: none; ${liveClass} ${compClass}">
            <div style="font-size: 0.55rem; color: #6b7280; display: flex; justify-content: space-between; border-bottom: 1px dashed #e5e7eb; padding-bottom: 2px; font-weight: 700;">
              <span>Match ${m.matchNumber}</span>
              <span>Mat ${m.mat || '-'}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; font-weight: 600; color: ${isWinnerA ? '#b45309' : '#374151'}; padding: 2px 0;">
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;">🔴 Aka: ${nameA}</span>
              <span style="font-size: 0.72rem; font-weight: 800; padding: 1px 4px; border-radius: 3px; background: ${isWinnerA ? 'rgba(245, 158, 11, 0.2)' : '#e5e7eb'}; color: ${isWinnerA ? '#b45309' : '#111827'};">${m.scoreA}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; font-weight: 600; color: ${isWinnerB ? '#b45309' : '#374151'}; padding: 2px 0;">
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;">🔵 Ao: ${nameB}</span>
              <span style="font-size: 0.72rem; font-weight: 800; padding: 1px 4px; border-radius: 3px; background: ${isWinnerB ? 'rgba(245, 158, 11, 0.2)' : '#e5e7eb'}; color: ${isWinnerB ? '#b45309' : '#111827'};">${m.scoreB}</span>
            </div>
          </div>
        `;
      });
      gridHTML += `</div>`;
    }
    gridHTML += `
        </div>
      </div>
    `;
  });
  gridHTML += `</div>`;

  // Scale down the grid dynamically based on division count to fit the A4 page perfectly!
  let zoomScale = '1.0';
  if (activeDivs.length === 2) zoomScale = '0.9';
  else if (activeDivs.length === 3 || activeDivs.length === 4) zoomScale = '0.78';
  else if (activeDivs.length >= 5) zoomScale = '0.62';

  const middleWrapper = document.createElement('div');
  middleWrapper.style = `flex-grow: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; width: 100%; height: 100%; transform: scale(${zoomScale}); transform-origin: center center;`;
  middleWrapper.innerHTML = gridHTML;

  // Footer HTML
  const exporter = state.adminName || 'Sensei Administrator';
  const dateStr = new Date().toLocaleDateString();
  const timeStr = new Date().toLocaleTimeString();
  const footerHTML = `
    <div style="border-top: 2px dashed #cbd5e1; padding-top: 8px; margin-top: 10px; display: flex; justify-content: space-between; align-items: center; color: #4b5563; font-size: 0.75rem; width: 100%;">
      <div>🔒 Official Tournament Records Sheet • Compiled by KumiteMaster Platform</div>
      <div>Exported By: <strong>${exporter}</strong> • Date: <strong>${dateStr}</strong> • Time: <strong>${timeStr}</strong></div>
    </div>
  `;

  // Assemble printContainer
  printContainer.innerHTML = headerHTML;
  printContainer.appendChild(middleWrapper);
  
  const footerDiv = document.createElement('div');
  footerDiv.style = "width: 100%;";
  footerDiv.innerHTML = footerHTML;
  printContainer.appendChild(footerDiv);

  document.body.appendChild(printContainer);

  const safeFileName = `kumitemaster_all_brackets_${Date.now()}.pdf`;
  const opt = {
    margin:       0,
    filename:     safeFileName,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 1.5, useCORS: true, logging: false, scrollY: 0, scrollX: 0 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
  };

  if (typeof html2pdf === 'undefined') {
    showToast("PDF compiler offline. Opening native print...", "warning");
    window.print();
    document.body.removeChild(printContainer);
    return;
  }

  html2pdf().set(opt).from(printContainer).save().then(() => {
    document.body.removeChild(printContainer);
    showToast("All Brackets Draw Sheets compiled successfully in 1 A4 page!", "success");
  }).catch((err) => {
    if (document.body.contains(printContainer)) {
      document.body.removeChild(printContainer);
    }
    console.error("All brackets PDF export failed:", err);
    showToast("Failed compiling all brackets PDF.", "error");
  });
}

function downloadAllBracketsMultiPagePDF() {
  const activeDivs = state.categories.filter(cat => {
    const catMatches = state.matches.filter(m => m.categoryId === cat.id && m.round > 0);
    return catMatches.length > 0;
  });

  if (activeDivs.length === 0) {
    showToast("No active tournament trees found! Please select a category and click 'Generate Bracket' first.", "warning");
    return;
  }

  showToast(`Compiling all ${activeDivs.length} division brackets into a multi-page PDF, please wait...`, "info");

  // Association Logo — use uploaded logo or event name abbreviation
  let logoHTML = '';
  if (state.eventLogo) {
    logoHTML = `<img src="${state.eventLogo}" style="max-height: 60px; max-width: 120px; object-fit: contain;" crossorigin="anonymous">`;
  } else {
    const abbr = (state.eventName || 'Tournament').split(' ').map(w => w[0]).join('').substring(0, 4).toUpperCase();
    logoHTML = `<div style="background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; font-weight: 800; padding: 10px 15px; border-radius: 6px; font-size: 1.1rem; letter-spacing: 1px; text-transform: uppercase;">${abbr}</div>`;
  }

  let adminHTML = '';
  if (state.adminLogo && (state.adminLogo.startsWith('data:image/') || state.adminLogo.includes('localhost') || state.adminLogo.includes('127.0.0.1'))) {
    adminHTML = `<img src="${state.adminLogo}" style="max-height: 50px; max-width: 50px; border-radius: 50%; object-fit: cover; border: 1.5px solid #7c3aed;">`;
  } else {
    adminHTML = `<div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(124,58,237,0.1); border: 1.5px solid #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">🥋</div>`;
  }

  const printContainer = document.createElement('div');
  printContainer.className = 'bracket-pdf-print-container light-theme';
  printContainer.style = 'position: absolute; top: -9999px; left: -9999px; width: 1440px; box-sizing: border-box; background: #ffffff; color: #111827; font-family: system-ui, sans-serif; z-index: 99999;';

  activeDivs.forEach((cat, idx) => {
    const catMatches = state.matches.filter(m => m.categoryId === cat.id && m.round > 0);
    const totalRounds = Math.max(...catMatches.map(m => m.round));
    const divName = cat.name;
    const eventName = state.eventName || "KumiteMaster Championship";

    // Header HTML
    const headerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #eaeaea; padding-bottom: 15px; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 18px;">
          ${logoHTML}
          <div>
            <h1 style="font-size: 1.8rem; margin: 0; color: #111827; font-weight: 800; line-height: 1.1;">${eventName}</h1>
            <h2 style="font-size: 1.25rem; margin: 4px 0 0 0; color: #4b5563; font-weight: 700;">Division Draw Sheet: ${divName}</h2>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; text-align: right;">
          <div>
            <div style="font-size: 0.9rem; font-weight: 800; color: #7c3aed; text-transform: uppercase;">Sensei Administrator</div>
            <div style="font-size: 0.8rem; color: #6b7280;">Host Verification</div>
          </div>
          ${adminHTML}
        </div>
      </div>
    `;

    // Winners Board (Podium) at the top of the sheet
    let winnersHTML = '';
    const finalMatch = catMatches.find(m => m.round === totalRounds);
    if (finalMatch && finalMatch.status === 'completed' && finalMatch.winnerId) {
      const gF = state.fighters.find(f => f.id === finalMatch.winnerId);
      const runnerUpId = finalMatch.winnerId === finalMatch.fighterAId ? finalMatch.fighterBId : finalMatch.fighterAId;
      const sF = state.fighters.find(f => f.id === runnerUpId);
      
      const semiRound = totalRounds - 1;
      const semiMatches = catMatches.filter(m => m.round === semiRound);
      let bF1 = null;
      let bF2 = null;
      if (semiMatches.length > 0) {
        const semiLosers = [];
        semiMatches.forEach(m => {
          if (m.winnerId) {
            const loserId = m.winnerId === m.fighterAId ? m.fighterBId : m.fighterAId;
            if (loserId && loserId !== 'BYE') semiLosers.push(loserId);
          }
        });
        const losersFighters = state.fighters.filter(f => semiLosers.includes(f.id));
        if (losersFighters.length > 0) {
          bF1 = losersFighters[0] || null;
          bF2 = losersFighters[1] || null;
        }
      }

      const gridCols = bF2 ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr';
      winnersHTML = `
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 24px; margin-bottom: 20px; display: grid; grid-template-columns: ${gridCols}; gap: 15px; text-align: center; font-size: 1rem;">
          <div style="border-right: 1px solid #eaeaea; padding: 2px;">
            <span style="font-weight: 700; color: #f59e0b; text-transform: uppercase; font-size: 0.8rem;">🥇 Gold</span>
            <span style="font-weight: 800; color: #111827; margin-left: 8px;">${gF ? gF.name : 'Unknown'}</span>
          </div>
          <div style="border-right: 1px solid #eaeaea; padding: 2px;">
            <span style="font-weight: 700; color: #9ca3af; text-transform: uppercase; font-size: 0.8rem;">🥈 Silver</span>
            <span style="font-weight: 800; color: #111827; margin-left: 8px;">${sF ? sF.name : 'Unknown'}</span>
          </div>
          <div style="${bF2 ? 'border-right: 1px solid #eaeaea;' : ''} padding: 2px;">
            <span style="font-weight: 700; color: #b45309; text-transform: uppercase; font-size: 0.8rem;">🥉 Bronze</span>
            <span style="font-weight: 800; color: #111827; margin-left: 8px;">${bF1 ? bF1.name : 'Unknown'}</span>
          </div>
          ${bF2 ? `
          <div style="padding: 2px;">
            <span style="font-weight: 700; color: #b45309; text-transform: uppercase; font-size: 0.8rem;">🥉 Bronze</span>
            <span style="font-weight: 800; color: #111827; margin-left: 8px;">${bF2.name}</span>
          </div>
          ` : ''}
        </div>
      `;
    }

    // Draw Tree Columns (100% Horizontal)
    let treeHTML = `<div style="display: flex; flex-direction: row; gap: 40px; align-items: center; justify-content: space-between; flex-grow: 1; width: 100%; height: 100%; box-sizing: border-box;">`;
    for (let r = 1; r <= totalRounds; r++) {
      let title = `Round ${r}`;
      if (r === totalRounds) title = "Championship";
      else if (r === totalRounds - 1) title = "Semi-Finals";
      else if (r === totalRounds - 2) title = "Quarter-Finals";

      treeHTML += `
        <div style="display: flex; flex-direction: column; justify-content: space-around; height: 100%; min-width: 220px; flex-grow: 1; position: relative; padding-top: 30px;">
          <div style="font-size: 0.9rem; text-transform: uppercase; color: #374151; font-weight: 800; text-align: center; border-bottom: 2.5px solid #374151; padding-bottom: 6px; position: absolute; top: 0; left: 0; right: 0;">${title}</div>`;

      const roundMatches = catMatches.filter(m => m.round === r).sort((a, b) => a.matchNumber - b.matchNumber);
      roundMatches.forEach(m => {
        const fA = state.fighters.find(f => f.id === m.fighterAId);
        const fB = state.fighters.find(f => f.id === m.fighterBId);

        const nameA = fA ? fA.name : (m.fighterAId === 'BYE' ? 'BYE' : 'TBD');
        const nameB = fB ? fB.name : (m.fighterBId === 'BYE' ? 'BYE' : 'TBD');

        const isWinnerA = m.winnerId && m.winnerId === m.fighterAId;
        const isWinnerB = m.winnerId && m.winnerId === m.fighterBId;

        const liveClass = m.status === 'live' ? 'border-color: #ef4444 !important; box-shadow: 0 0 10px rgba(239, 68, 68, 0.15) !important;' : '';
        const compClass = m.status === 'completed' ? 'border-color: #10b981 !important;' : '';

        treeHTML += `
          <div style="background: #f9fafb; border: 1.5px solid #cbd5e1; border-radius: 8px; display: flex; flex-direction: column; overflow: hidden; position: relative; padding: 12px 14px; gap: 8px; width: 100%; box-shadow: none; ${liveClass} ${compClass}">
            <div style="font-size: 0.7rem; color: #6b7280; display: flex; justify-content: space-between; border-bottom: 1px dashed #e5e7eb; padding-bottom: 4px; font-weight: 700;">
              <span>Match ${m.matchNumber}</span>
              <span>Mat ${m.mat || '-'}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; color: ${isWinnerA ? '#b45309' : '#1f2937'}; padding: 4px 0;">
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">🔴 Aka: ${nameA}</span>
              <span style="font-size: 0.85rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: ${isWinnerA ? 'rgba(245, 158, 11, 0.25)' : '#e5e7eb'}; color: ${isWinnerA ? '#b45309' : '#111827'};">${m.scoreA}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; color: ${isWinnerB ? '#b45309' : '#1f2937'}; padding: 4px 0;">
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">🔵 Ao: ${nameB}</span>
              <span style="font-size: 0.85rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: ${isWinnerB ? 'rgba(245, 158, 11, 0.25)' : '#e5e7eb'}; color: ${isWinnerB ? '#b45309' : '#111827'};">${m.scoreB}</span>
            </div>
          </div>
        `;
      });
      treeHTML += `</div>`;
    }
    treeHTML += `</div>`;

    // Scale down the bracket inside the wrapper dynamically based on round count to fit the A4 page perfectly!
    let zoomScale = '1.0';
    if (totalRounds === 3) zoomScale = '0.9';
    else if (totalRounds === 4) zoomScale = '0.78';
    else if (totalRounds >= 5) zoomScale = '0.6';

    // Page PageWrapper of exactly 1440x1018px size
    const pageWrapper = document.createElement('div');
    pageWrapper.style = 'width: 1440px; height: 1018px; box-sizing: border-box; padding: 40px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative;';
    if (idx < activeDivs.length - 1) {
      pageWrapper.style.pageBreakAfter = 'always';
    }

    const middleWrapper = document.createElement('div');
    middleWrapper.style = `flex-grow: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; width: 100%; height: 100%; transform: scale(${zoomScale}); transform-origin: center center;`;
    middleWrapper.innerHTML = treeHTML;

    // Footer HTML
    const exporter = state.adminName || 'Sensei Administrator';
    const dateStr = new Date().toLocaleDateString();
    const footerHTML = `
      <div style="border-top: 2px dashed #cbd5e1; padding-top: 10px; margin-top: 15px; display: flex; justify-content: space-between; align-items: center; color: #4b5563; font-size: 0.8rem; width: 100%;">
        <div>🔒 Official Tournament Record • Generated by KumiteMaster Platform</div>
        <div>Exported By: <strong>${exporter}</strong> • Page <strong>${idx + 1} of ${activeDivs.length}</strong> • Date: <strong>${dateStr}</strong></div>
      </div>
    `;

    // Assemble pageWrapper
    pageWrapper.innerHTML = headerHTML + (winnersHTML ? winnersHTML : '');
    pageWrapper.appendChild(middleWrapper);
    
    const footerDiv = document.createElement('div');
    footerDiv.style = "width: 100%;";
    footerDiv.innerHTML = footerHTML;
    pageWrapper.appendChild(footerDiv);

    printContainer.appendChild(pageWrapper);
  });

  document.body.appendChild(printContainer);

  const safeFileName = `kumitemaster_all_brackets_book_${Date.now()}.pdf`;
  const opt = {
    margin:       0,
    filename:     safeFileName,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 1.5, useCORS: true, logging: false, scrollY: 0, scrollX: 0 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
  };

  if (typeof html2pdf === 'undefined') {
    showToast("PDF compiler offline. Opening native print...", "warning");
    window.print();
    document.body.removeChild(printContainer);
    return;
  }

  html2pdf().set(opt).from(printContainer).save().then(() => {
    document.body.removeChild(printContainer);
    showToast("📚 All Draw Sheets compiled successfully into a single multi-page PDF Book!", "success");
  }).catch((err) => {
    if (document.body.contains(printContainer)) {
      document.body.removeChild(printContainer);
    }
    console.error("Multi-page PDF compilation failed:", err);
    showToast("Failed compiling multi-page draw sheets PDF book.", "error");
  });
}

function downloadAllBracketsBulkJPG() {
  const activeDivs = state.categories.filter(cat => {
    const catMatches = state.matches.filter(m => m.categoryId === cat.id && m.round > 0);
    return catMatches.length > 0;
  });

  if (activeDivs.length === 0) {
    showToast("No active tournament trees found! Please select a category and click 'Generate Bracket' first.", "warning");
    return;
  }

  if (typeof html2canvas === 'undefined') {
    showToast("HTML Canvas screenshot tool offline. Please try again.", "error");
    return;
  }

  showToast(`Preparing batch download of ${activeDivs.length} division draw sheets...`, "info");

  // Association Logo — use uploaded logo or event name abbreviation
  let logoHTML = '';
  if (state.eventLogo) {
    logoHTML = `<img src="${state.eventLogo}" style="max-height: 60px; max-width: 120px; object-fit: contain;" crossorigin="anonymous">`;
  } else {
    const abbr = (state.eventName || 'Tournament').split(' ').map(w => w[0]).join('').substring(0, 4).toUpperCase();
    logoHTML = `<div style="background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; font-weight: 800; padding: 10px 15px; border-radius: 6px; font-size: 1.1rem; letter-spacing: 1px; text-transform: uppercase;">${abbr}</div>`;
  }

  let adminHTML = '';
  if (state.adminLogo && (state.adminLogo.startsWith('data:image/') || state.adminLogo.includes('localhost') || state.adminLogo.includes('127.0.0.1'))) {
    adminHTML = `<img src="${state.adminLogo}" style="max-height: 50px; max-width: 50px; border-radius: 50%; object-fit: cover; border: 1.5px solid #7c3aed;">`;
  } else {
    adminHTML = `<div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(124,58,237,0.1); border: 1.5px solid #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">🥋</div>`;
  }

  let index = 0;

  function processNextJPG() {
    if (index >= activeDivs.length) {
      showToast("🗂️ All division draw sheets successfully downloaded as JPGs!", "success");
      return;
    }

    const cat = activeDivs[index];
    const catMatches = state.matches.filter(m => m.categoryId === cat.id && m.round > 0);
    const totalRounds = Math.max(...catMatches.map(m => m.round));
    const divName = cat.name;
    const eventName = state.eventName || "KumiteMaster Championship";

    showToast(`📸 Rendering Division ${index + 1} of ${activeDivs.length}: ${divName}...`, "info");

    const printContainer = document.createElement('div');
    printContainer.className = 'bracket-pdf-print-container light-theme';
    printContainer.style = 'position: absolute; top: -9999px; left: -9999px; width: 1440px; height: 1018px; box-sizing: border-box; padding: 40px; background: #ffffff; color: #111827; font-family: system-ui, sans-serif; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; z-index: 99999;';

    // Header HTML
    const headerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #eaeaea; padding-bottom: 15px; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 18px;">
          ${logoHTML}
          <div>
            <h1 style="font-size: 1.8rem; margin: 0; color: #111827; font-weight: 800; line-height: 1.1;">${eventName}</h1>
            <h2 style="font-size: 1.25rem; margin: 4px 0 0 0; color: #4b5563; font-weight: 700;">Division Draw Sheet: ${divName}</h2>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; text-align: right;">
          <div>
            <div style="font-size: 0.9rem; font-weight: 800; color: #7c3aed; text-transform: uppercase;">Sensei Administrator</div>
            <div style="font-size: 0.8rem; color: #6b7280;">Host Verification</div>
          </div>
          ${adminHTML}
        </div>
      </div>
    `;

    // Winners Board
    let winnersHTML = '';
    const finalMatch = catMatches.find(m => m.round === totalRounds);
    if (finalMatch && finalMatch.status === 'completed' && finalMatch.winnerId) {
      const gF = state.fighters.find(f => f.id === finalMatch.winnerId);
      const runnerUpId = finalMatch.winnerId === finalMatch.fighterAId ? finalMatch.fighterBId : finalMatch.fighterAId;
      const sF = state.fighters.find(f => f.id === runnerUpId);
      
      const semiRound = totalRounds - 1;
      const semiMatches = catMatches.filter(m => m.round === semiRound);
      let bF1 = null;
      let bF2 = null;
      if (semiMatches.length > 0) {
        const semiLosers = [];
        semiMatches.forEach(m => {
          if (m.winnerId) {
            const loserId = m.winnerId === m.fighterAId ? m.fighterBId : m.fighterAId;
            if (loserId && loserId !== 'BYE') semiLosers.push(loserId);
          }
        });
        const losersFighters = state.fighters.filter(f => semiLosers.includes(f.id));
        if (losersFighters.length > 0) {
          bF1 = losersFighters[0] || null;
          bF2 = losersFighters[1] || null;
        }
      }

      const gridCols = bF2 ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr';
      winnersHTML = `
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 24px; margin-bottom: 20px; display: grid; grid-template-columns: ${gridCols}; gap: 15px; text-align: center; font-size: 1rem;">
          <div style="border-right: 1px solid #eaeaea; padding: 2px;">
            <span style="font-weight: 700; color: #f59e0b; text-transform: uppercase; font-size: 0.8rem;">🥇 Gold</span>
            <span style="font-weight: 800; color: #111827; margin-left: 8px;">${gF ? gF.name : 'Unknown'}</span>
          </div>
          <div style="border-right: 1px solid #eaeaea; padding: 2px;">
            <span style="font-weight: 700; color: #9ca3af; text-transform: uppercase; font-size: 0.8rem;">🥈 Silver</span>
            <span style="font-weight: 800; color: #111827; margin-left: 8px;">${sF ? sF.name : 'Unknown'}</span>
          </div>
          <div style="${bF2 ? 'border-right: 1px solid #eaeaea;' : ''} padding: 2px;">
            <span style="font-weight: 700; color: #b45309; text-transform: uppercase; font-size: 0.8rem;">🥉 Bronze</span>
            <span style="font-weight: 800; color: #111827; margin-left: 8px;">${bF1 ? bF1.name : 'Unknown'}</span>
          </div>
          ${bF2 ? `
          <div style="padding: 2px;">
            <span style="font-weight: 700; color: #b45309; text-transform: uppercase; font-size: 0.8rem;">🥉 Bronze</span>
            <span style="font-weight: 800; color: #111827; margin-left: 8px;">${bF2.name}</span>
          </div>
          ` : ''}
        </div>
      `;
    }

    // Draw Tree
    let treeHTML = `<div style="display: flex; flex-direction: row; gap: 40px; align-items: center; justify-content: space-between; flex-grow: 1; width: 100%; height: 100%; box-sizing: border-box;">`;
    for (let r = 1; r <= totalRounds; r++) {
      let title = `Round ${r}`;
      if (r === totalRounds) title = "Championship";
      else if (r === totalRounds - 1) title = "Semi-Finals";
      else if (r === totalRounds - 2) title = "Quarter-Finals";

      treeHTML += `
        <div style="display: flex; flex-direction: column; justify-content: space-around; height: 100%; min-width: 220px; flex-grow: 1; position: relative; padding-top: 30px;">
          <div style="font-size: 0.9rem; text-transform: uppercase; color: #374151; font-weight: 800; text-align: center; border-bottom: 2.5px solid #374151; padding-bottom: 6px; position: absolute; top: 0; left: 0; right: 0;">${title}</div>`;

      const roundMatches = catMatches.filter(m => m.round === r).sort((a, b) => a.matchNumber - b.matchNumber);
      roundMatches.forEach(m => {
        const fA = state.fighters.find(f => f.id === m.fighterAId);
        const fB = state.fighters.find(f => f.id === m.fighterBId);

        const nameA = fA ? fA.name : (m.fighterAId === 'BYE' ? 'BYE' : 'TBD');
        const nameB = fB ? fB.name : (m.fighterBId === 'BYE' ? 'BYE' : 'TBD');

        const isWinnerA = m.winnerId && m.winnerId === m.fighterAId;
        const isWinnerB = m.winnerId && m.winnerId === m.fighterBId;

        const liveClass = m.status === 'live' ? 'border-color: #ef4444 !important; box-shadow: 0 0 10px rgba(239, 68, 68, 0.15) !important;' : '';
        const compClass = m.status === 'completed' ? 'border-color: #10b981 !important;' : '';

        treeHTML += `
          <div style="background: #f9fafb; border: 1.5px solid #cbd5e1; border-radius: 8px; display: flex; flex-direction: column; overflow: hidden; position: relative; padding: 12px 14px; gap: 8px; width: 100%; box-shadow: none; ${liveClass} ${compClass}">
            <div style="font-size: 0.7rem; color: #6b7280; display: flex; justify-content: space-between; border-bottom: 1px dashed #e5e7eb; padding-bottom: 4px; font-weight: 700;">
              <span>Match ${m.matchNumber}</span>
              <span>Mat ${m.mat || '-'}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; color: ${isWinnerA ? '#b45309' : '#1f2937'}; padding: 4px 0;">
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">🔴 Aka: ${nameA}</span>
              <span style="font-size: 0.85rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: ${isWinnerA ? 'rgba(245, 158, 11, 0.25)' : '#e5e7eb'}; color: ${isWinnerA ? '#b45309' : '#111827'};">${m.scoreA}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; color: ${isWinnerB ? '#b45309' : '#1f2937'}; padding: 4px 0;">
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">🔵 Ao: ${nameB}</span>
              <span style="font-size: 0.85rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: ${isWinnerB ? 'rgba(245, 158, 11, 0.25)' : '#e5e7eb'}; color: ${isWinnerB ? '#b45309' : '#111827'};">${m.scoreB}</span>
            </div>
          </div>
        `;
      });
      treeHTML += `</div>`;
    }
    treeHTML += `</div>`;

    let zoomScale = '1.0';
    if (totalRounds === 3) zoomScale = '0.9';
    else if (totalRounds === 4) zoomScale = '0.78';
    else if (totalRounds >= 5) zoomScale = '0.6';

    const middleWrapper = document.createElement('div');
    middleWrapper.style = `flex-grow: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; width: 100%; height: 100%; transform: scale(${zoomScale}); transform-origin: center center;`;
    middleWrapper.innerHTML = treeHTML;

    const exporter = state.adminName || 'Sensei Administrator';
    const dateStr = new Date().toLocaleDateString();
    const timeStr = new Date().toLocaleTimeString();
    const footerHTML = `
      <div style="border-top: 2px dashed #cbd5e1; padding-top: 10px; margin-top: 15px; display: flex; justify-content: space-between; align-items: center; color: #4b5563; font-size: 0.8rem; width: 100%;">
        <div>🔒 Official Tournament Record • Generated by KumiteMaster Platform</div>
        <div>Exported By: <strong>${exporter}</strong> • Date: <strong>${dateStr}</strong> • Time: <strong>${timeStr}</strong></div>
      </div>
    `;

    printContainer.innerHTML = headerHTML + (winnersHTML ? winnersHTML : '');
    printContainer.appendChild(middleWrapper);
    
    const footerDiv = document.createElement('div');
    footerDiv.style = "width: 100%;";
    footerDiv.innerHTML = footerHTML;
    printContainer.appendChild(footerDiv);

    document.body.appendChild(printContainer);

    const safeFileName = `kumitemaster_draw_${divName.toLowerCase().replace(/\s+/g, '_')}.jpg`;

    html2canvas(printContainer, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      scrollY: 0,
      scrollX: 0
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg', 0.92);
      const link = document.createElement('a');
      link.href = imgData;
      link.download = safeFileName;
      link.click();
      document.body.removeChild(printContainer);
      
      // Advance with brief sequential cooling window (800ms)
      index++;
      setTimeout(processNextJPG, 800);
    }).catch(err => {
      if (document.body.contains(printContainer)) {
        document.body.removeChild(printContainer);
      }
      console.error(`Bulk JPG render failed for ${divName}:`, err);
      
      // Continue anyway
      index++;
      setTimeout(processNextJPG, 800);
    });
  }

  processNextJPG();
}

function downloadSingleBracketJPG() {
  const catId = document.getElementById('bracket-division-select').value;
  if (!catId) {
    showToast("Please select a karate division to export!", "warning");
    return;
  }

  const cat = state.categories.find(c => c.id === catId);
  const catMatches = state.matches.filter(m => m.categoryId === catId && m.round > 0);
  
  if (catMatches.length === 0) {
    showToast("No active tournament tree found for the selected division. Please generate it first!", "warning");
    return;
  }

  showToast("Rendering bracket draw sheet to high-quality JPG, please wait...", "info");

  // Association Logo — use uploaded logo or event name abbreviation
  let logoHTML = '';
  if (state.eventLogo) {
    logoHTML = `<img src="${state.eventLogo}" style="max-height: 60px; max-width: 120px; object-fit: contain;" crossorigin="anonymous">`;
  } else {
    const abbr = (state.eventName || 'Tournament').split(' ').map(w => w[0]).join('').substring(0, 4).toUpperCase();
    logoHTML = `<div style="background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; font-weight: 800; padding: 10px 15px; border-radius: 6px; font-size: 1.1rem; letter-spacing: 1px; text-transform: uppercase;">${abbr}</div>`;
  }

  let adminHTML = '';
  if (state.adminLogo && (state.adminLogo.startsWith('data:image/') || state.adminLogo.includes('localhost') || state.adminLogo.includes('127.0.0.1'))) {
    adminHTML = `<img src="${state.adminLogo}" style="max-height: 50px; max-width: 50px; border-radius: 50%; object-fit: cover; border: 1.5px solid #7c3aed;">`;
  } else {
    adminHTML = `<div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(124,58,237,0.1); border: 1.5px solid #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">🥋</div>`;
  }

  // Create wide desktop-aspect offscreen container
  const printContainer = document.createElement('div');
  printContainer.className = 'bracket-pdf-print-container light-theme';
  printContainer.style = 'position: absolute; top: -9999px; left: -9999px; width: 1440px; height: 1018px; box-sizing: border-box; padding: 40px; background: #ffffff; color: #111827; font-family: system-ui, sans-serif; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; z-index: 99999;';

  // Header HTML
  const eventName = state.eventName || "KumiteMaster Championship";
  const divName = cat ? cat.name : "Unknown Division";
  const headerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #eaeaea; padding-bottom: 15px; margin-bottom: 20px;">
      <div style="display: flex; align-items: center; gap: 18px;">
        ${logoHTML}
        <div>
          <h1 style="font-size: 1.8rem; margin: 0; color: #111827; font-weight: 800; line-height: 1.1;">${eventName}</h1>
          <h2 style="font-size: 1.25rem; margin: 4px 0 0 0; color: #4b5563; font-weight: 700;">Division Draw Sheet: ${divName}</h2>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px; text-align: right;">
        <div>
          <div style="font-size: 0.9rem; font-weight: 800; color: #7c3aed; text-transform: uppercase;">Sensei Administrator</div>
          <div style="font-size: 0.8rem; color: #6b7280;">Host Verification</div>
        </div>
        ${adminHTML}
      </div>
    </div>
  `;

  // Winners Board (Podium) at the top of the sheet
  let winnersHTML = '';
  const totalRounds = Math.max(...catMatches.map(m => m.round));
  const finalMatch = catMatches.find(m => m.round === totalRounds);
  if (finalMatch && finalMatch.status === 'completed' && finalMatch.winnerId) {
    const gF = state.fighters.find(f => f.id === finalMatch.winnerId);
    const runnerUpId = finalMatch.winnerId === finalMatch.fighterAId ? finalMatch.fighterBId : finalMatch.fighterAId;
    const sF = state.fighters.find(f => f.id === runnerUpId);
    
    const semiRound = totalRounds - 1;
    const semiMatches = catMatches.filter(m => m.round === semiRound);
    let bF1 = null;
    let bF2 = null;
    if (semiMatches.length > 0) {
      const semiLosers = [];
      semiMatches.forEach(m => {
        if (m.winnerId) {
          const loserId = m.winnerId === m.fighterAId ? m.fighterBId : m.fighterAId;
          if (loserId && loserId !== 'BYE') semiLosers.push(loserId);
        }
      });
      const losersFighters = state.fighters.filter(f => semiLosers.includes(f.id));
      if (losersFighters.length > 0) {
        bF1 = losersFighters[0] || null;
        bF2 = losersFighters[1] || null;
      }
    }

    const gridCols = bF2 ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr';
    winnersHTML = `
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 24px; margin-bottom: 20px; display: grid; grid-template-columns: ${gridCols}; gap: 15px; text-align: center; font-size: 1rem;">
        <div style="border-right: 1px solid #eaeaea; padding: 2px;">
          <span style="font-weight: 700; color: #f59e0b; text-transform: uppercase; font-size: 0.8rem;">🥇 Gold</span>
          <span style="font-weight: 800; color: #111827; margin-left: 8px;">${gF ? gF.name : 'Unknown'}</span>
        </div>
        <div style="border-right: 1px solid #eaeaea; padding: 2px;">
          <span style="font-weight: 700; color: #9ca3af; text-transform: uppercase; font-size: 0.8rem;">🥈 Silver</span>
          <span style="font-weight: 800; color: #111827; margin-left: 8px;">${sF ? sF.name : 'Unknown'}</span>
        </div>
        <div style="${bF2 ? 'border-right: 1px solid #eaeaea;' : ''} padding: 2px;">
          <span style="font-weight: 700; color: #b45309; text-transform: uppercase; font-size: 0.8rem;">🥉 Bronze</span>
          <span style="font-weight: 800; color: #111827; margin-left: 8px;">${bF1 ? bF1.name : 'Unknown'}</span>
        </div>
        ${bF2 ? `
        <div style="padding: 2px;">
          <span style="font-weight: 700; color: #b45309; text-transform: uppercase; font-size: 0.8rem;">🥉 Bronze</span>
          <span style="font-weight: 800; color: #111827; margin-left: 8px;">${bF2.name}</span>
        </div>
        ` : ''}
      </div>
    `;
  }

  // Draw Tree Columns (100% Horizontal)
  let treeHTML = `<div style="display: flex; flex-direction: row; gap: 40px; align-items: center; justify-content: space-between; flex-grow: 1; width: 100%; height: 100%; box-sizing: border-box;">`;
  for (let r = 1; r <= totalRounds; r++) {
    let title = `Round ${r}`;
    if (r === totalRounds) title = "Championship";
    else if (r === totalRounds - 1) title = "Semi-Finals";
    else if (r === totalRounds - 2) title = "Quarter-Finals";

    treeHTML += `
      <div style="display: flex; flex-direction: column; justify-content: space-around; height: 100%; min-width: 220px; flex-grow: 1; position: relative; padding-top: 30px;">
        <div style="font-size: 0.9rem; text-transform: uppercase; color: #374151; font-weight: 800; text-align: center; border-bottom: 2.5px solid #374151; padding-bottom: 6px; position: absolute; top: 0; left: 0; right: 0;">${title}</div>`;

    const roundMatches = catMatches.filter(m => m.round === r).sort((a, b) => a.matchNumber - b.matchNumber);
    roundMatches.forEach(m => {
      const fA = state.fighters.find(f => f.id === m.fighterAId);
      const fB = state.fighters.find(f => f.id === m.fighterBId);

      const nameA = fA ? fA.name : (m.fighterAId === 'BYE' ? 'BYE' : 'TBD');
      const nameB = fB ? fB.name : (m.fighterBId === 'BYE' ? 'BYE' : 'TBD');

      const isWinnerA = m.winnerId && m.winnerId === m.fighterAId;
      const isWinnerB = m.winnerId && m.winnerId === m.fighterBId;

      const liveClass = m.status === 'live' ? 'border-color: #ef4444 !important; box-shadow: 0 0 10px rgba(239, 68, 68, 0.15) !important;' : '';
      const compClass = m.status === 'completed' ? 'border-color: #10b981 !important;' : '';

      treeHTML += `
        <div style="background: #f9fafb; border: 1.5px solid #cbd5e1; border-radius: 8px; display: flex; flex-direction: column; overflow: hidden; position: relative; padding: 12px 14px; gap: 8px; width: 100%; box-shadow: none; ${liveClass} ${compClass}">
          <div style="font-size: 0.7rem; color: #6b7280; display: flex; justify-content: space-between; border-bottom: 1px dashed #e5e7eb; padding-bottom: 4px; font-weight: 700;">
            <span>Match ${m.matchNumber}</span>
            <span>Mat ${m.mat || '-'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; color: ${isWinnerA ? '#b45309' : '#1f2937'}; padding: 4px 0;">
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">🔴 Aka: ${nameA}</span>
            <span style="font-size: 0.85rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: ${isWinnerA ? 'rgba(245, 158, 11, 0.25)' : '#e5e7eb'}; color: ${isWinnerA ? '#b45309' : '#111827'};">${m.scoreA}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; color: ${isWinnerB ? '#b45309' : '#1f2937'}; padding: 4px 0;">
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">🔵 Ao: ${nameB}</span>
            <span style="font-size: 0.85rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: ${isWinnerB ? 'rgba(245, 158, 11, 0.25)' : '#e5e7eb'}; color: ${isWinnerB ? '#b45309' : '#111827'};">${m.scoreB}</span>
          </div>
        </div>
      `;
    });
    treeHTML += `</div>`;
  }
  treeHTML += `</div>`;

  // Scale down the bracket inside the wrapper dynamically based on round count to fit the A4 page perfectly!
  let zoomScale = '1.0';
  if (totalRounds === 3) zoomScale = '0.9';
  else if (totalRounds === 4) zoomScale = '0.78';
  else if (totalRounds >= 5) zoomScale = '0.6';

  const middleWrapper = document.createElement('div');
  middleWrapper.style = `flex-grow: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; width: 100%; height: 100%; transform: scale(${zoomScale}); transform-origin: center center;`;
  middleWrapper.innerHTML = treeHTML;

  // Footer HTML
  const exporter = state.adminName || 'Sensei Administrator';
  const dateStr = new Date().toLocaleDateString();
  const timeStr = new Date().toLocaleTimeString();
  const footerHTML = `
    <div style="border-top: 2px dashed #cbd5e1; padding-top: 10px; margin-top: 15px; display: flex; justify-content: space-between; align-items: center; color: #4b5563; font-size: 0.8rem; width: 100%;">
      <div>🔒 Official Tournament Record • Generated by KumiteMaster Platform</div>
      <div>Exported By: <strong>${exporter}</strong> • Date: <strong>${dateStr}</strong> • Time: <strong>${timeStr}</strong></div>
    </div>
  `;

  // Assemble printContainer
  printContainer.innerHTML = headerHTML + (winnersHTML ? winnersHTML : '');
  printContainer.appendChild(middleWrapper);
  
  const footerDiv = document.createElement('div');
  footerDiv.style = "width: 100%;";
  footerDiv.innerHTML = footerHTML;
  printContainer.appendChild(footerDiv);

  document.body.appendChild(printContainer);

  const safeFileName = `kumitemaster_draw_${divName.toLowerCase().replace(/\s+/g, '_')}.jpg`;

  if (typeof html2canvas === 'undefined') {
    showToast("HTML Canvas screenshot tool offline. Please try again.", "error");
    document.body.removeChild(printContainer);
    return;
  }

  html2canvas(printContainer, {
    scale: 2, // Double resolution for ultra-premium HD image clarity!
    useCORS: true,
    logging: false,
    scrollY: 0,
    scrollX: 0
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const link = document.createElement('a');
    link.href = imgData;
    link.download = safeFileName;
    link.click();
    document.body.removeChild(printContainer);
    showToast("Draw Sheet JPG downloaded successfully in landscape A4!", "success");
  }).catch(err => {
    if (document.body.contains(printContainer)) {
      document.body.removeChild(printContainer);
    }
    console.error("Single JPG export failed:", err);
    showToast("Failed to compile Draw Sheet JPG.", "error");
  });
}

// ================= CSV BULK PARTICIPANTS IMPORT =================

let tempImportedFighters = [];

function setupDragAndDropCSV() {
  const zone = document.getElementById('csv-drag-drop-zone');
  const fileInput = document.getElementById('csv-file-input');

  // Trigger file browser on click
  zone.addEventListener('click', () => fileInput.click());

  // Prevent defaults
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    zone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  });

  // Drag over states
  ['dragenter', 'dragover'].forEach(eventName => {
    zone.addEventListener(eventName, () => zone.classList.add('dragover'), false);
  });
  ['dragleave', 'drop'].forEach(eventName => {
    zone.addEventListener(eventName, () => zone.classList.remove('dragover'), false);
  });

  // Handle drop
  zone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length) {
      handleCSVFile(files[0]);
    }
  });

  // Handle select file
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      handleCSVFile(e.target.files[0]);
    }
  });
}

function handleCSVFile(file) {
  if (!file.name.endsWith('.csv')) {
    showToast("Please upload a valid .csv file!", "error");
    return;
  }

  const reader = new FileReader();
  reader.readAsText(file);
  
  reader.onload = (e) => {
    const csvContent = e.target.result;
    parseCSV(csvContent);
  };
}

function parseCSV(text) {
  const consolePreview = document.getElementById('import-preview-console');
  const importBtn = document.getElementById('process-import-csv-btn');
  consolePreview.innerHTML = '';
  consolePreview.style.display = 'block';

  const lines = text.split(/\r?\n/);
  if (lines.length < 2) {
    consolePreview.innerHTML = 'Error: CSV file is empty or invalid.';
    importBtn.disabled = true;
    return;
  }

  // Parse Headers
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const nameIdx = headers.findIndex(h => h.includes('name'));
  const clubIdx = headers.findIndex(h => h.includes('club') || h.includes('dojo') || h.includes('affil'));
  const beltIdx = headers.findIndex(h => h.includes('belt') || h.includes('rank'));
  const dobIdx = headers.findIndex(h => h.includes('dob') || h.includes('birth') || h.includes('date'));
  const genderIdx = headers.findIndex(h => h.includes('gender') || h.includes('sex'));
  const weightIdx = headers.findIndex(h => h.includes('weight') || h.includes('kg') || h.includes('mass'));
  const typeIdx = headers.findIndex(h => h.includes('type') || h.includes('division type'));

  if (nameIdx === -1) {
    consolePreview.innerHTML = 'Error: Missing mandatory column "Name".';
    importBtn.disabled = true;
    return;
  }

  tempImportedFighters = [];
  let logText = `<strong>Successfully parsed headers!</strong><br>Found fields: ${headers.join(', ')}<br><br>`;
  let successCount = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Smart split that respects quotes (for commas inside quotes)
    let cols = [];
    let insideQuote = false;
    let current = '';
    for (let char of line) {
      if (char === '"') insideQuote = !insideQuote;
      else if (char === ',' && !insideQuote) {
        cols.push(current.trim());
        current = '';
      } else current += char;
    }
    cols.push(current.trim());

    if (cols.length < nameIdx + 1) continue;

    const name = cols[nameIdx];
    const club = clubIdx !== -1 && cols[clubIdx] ? cols[clubIdx] : '';
    const belt = beltIdx !== -1 && cols[beltIdx] ? cols[beltIdx].toLowerCase() : 'white';
    const dob = dobIdx !== -1 && cols[dobIdx] ? cols[dobIdx] : '';
    const gender = genderIdx !== -1 && cols[genderIdx] ? cols[genderIdx] : 'Male';
    const weight = weightIdx !== -1 && cols[weightIdx] ? parseFloat(cols[weightIdx]) || 0 : 0;
    const type = typeIdx !== -1 && cols[typeIdx] ? cols[typeIdx] : 'Kumite';

    if (!name) continue;

    // Validate belt
    const validBelts = ['white', 'yellow', 'orange', 'green', 'blue', 'purple', 'brown', 'black'];
    const cleanedBelt = validBelts.includes(belt) ? belt : 'white';

    // Normalize gender
    const normalizedGender = gender.toLowerCase().startsWith('f') ? 'Female' : 'Male';

    tempImportedFighters.push({
      name,
      club,
      belt: cleanedBelt,
      dob,
      gender: normalizedGender,
      weight,
      type: type.toLowerCase().includes('kata') ? 'Kata' : 'Kumite'
    });

    logText += `✓ Parsed: ${name} (${normalizedGender} • ${weight}kg • ${cleanedBelt.toUpperCase()})<br>`;
    successCount++;
  }

  logText += `<br><strong>Total Valid Fighters Found: ${successCount}</strong>`;
  consolePreview.innerHTML = logText;

  if (successCount > 0) {
    importBtn.disabled = false;
    importBtn.innerText = `Import ${successCount} Fighters`;
  } else {
    importBtn.disabled = true;
    importBtn.innerText = 'Import 0 Fighters';
  }
}

function processCSVImport() {
  if (tempImportedFighters.length === 0) return;

  let createdCategoriesCount = 0;
  let importedFightersCount = 0;

  tempImportedFighters.forEach(item => {
    const suffix = Date.now() + '-' + Math.floor(Math.random() * 10000);

    // 1. Run matchmaking algorithm for Kumite
    const match = calculateCategoryMatch(item.dob, item.gender, item.weight);
    let categoryId = '';

    if (match && match.status === 'FOUND') {
      categoryId = match.id;
    } else {
      // Category does not exist, dynamic create!
      const newCatId = 'cat-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
      const newCatName = match ? match.name : `${item.gender} Senior Kumite Open`;
      
      const newCat = {
        id: newCatId,
        name: newCatName,
        type: 'Kumite',
        ageClass: match ? match.ageClass : 'Senior',
        gender: item.gender,
        weightClass: match ? match.weightClass : 'Open'
      };
      
      state.categories.push(newCat);
      categoryId = newCatId;
      createdCategoriesCount++;
    }

    // 2. Add Kumite fighter to list
    const kumiteFighter = {
      id: 'fight-' + suffix + '-kumite',
      name: item.name,
      club: item.club,
      belt: item.belt,
      dob: item.dob,
      gender: item.gender,
      weight: item.weight,
      categoryId: categoryId,
      wins: 0,
      losses: 0,
      points: 0,
      photo: ""
    };
    state.fighters.push(kumiteFighter);

    // 3. Find or create Kata category
    const age = calculateAge(item.dob);
    let ageClass = 'Senior';
    if (age < 14) ageClass = 'Children';
    else if (age >= 14 && age < 16) ageClass = 'Cadet';
    else if (age >= 16 && age < 18) ageClass = 'Junior';

    const matchedKata = state.categories.find(c => {
      const isKata = (c.type || '').toLowerCase() === 'kata';
      const cGender = (c.gender || '').toLowerCase();
      const cAge = (c.ageClass || '').toLowerCase();
      return isKata && cGender === item.gender.toLowerCase() && cAge === ageClass.toLowerCase();
    });

    let kataCategoryId = '';
    if (matchedKata) {
      kataCategoryId = matchedKata.id;
    } else {
      const newKataCatId = 'cat-' + Date.now() + '-' + Math.floor(Math.random() * 10000) + '-kata';
      const newKataCatName = `${item.gender} ${ageClass} Kata`;
      const newKataCat = {
        id: newKataCatId,
        name: newKataCatName,
        type: 'Kata',
        ageClass: ageClass,
        gender: item.gender,
        weightClass: 'Open'
      };
      state.categories.push(newKataCat);
      kataCategoryId = newKataCatId;
      createdCategoriesCount++;
    }

    // 4. Add Kata fighter to list
    const kataFighter = {
      id: 'fight-' + suffix + '-kata',
      name: item.name,
      club: item.club,
      belt: item.belt,
      dob: item.dob,
      gender: item.gender,
      weight: item.weight,
      categoryId: kataCategoryId,
      wins: 0,
      losses: 0,
      points: 0,
      photo: ""
    };
    state.fighters.push(kataFighter);

    importedFightersCount++;
  });

  // Clear modal and state
  document.getElementById('modal-import-csv').classList.remove('active');
  document.getElementById('import-preview-console').style.display = 'none';
  document.getElementById('import-preview-console').innerHTML = '';
  document.getElementById('process-import-csv-btn').disabled = true;
  tempImportedFighters = [];

  showToast(`Successfully imported ${importedFightersCount} competitors (registered for both Kata & Kumite) and generated ${createdCategoriesCount} new categories!`, "success");
  saveState();
  if (typeof renderFightersView === 'function') renderFightersView();
  if (typeof renderCredentialsView === 'function') renderCredentialsView();
}

function openCategoryEditModal(id) {
  const cat = state.categories.find(c => c.id === id);
  if (!cat) return;
  
  document.getElementById('category-edit-id').value = cat.id;
  document.getElementById('category-name').value = cat.name;
  document.getElementById('category-type').value = cat.type || 'Kumite';
  document.getElementById('category-age').value = cat.ageClass || 'Senior';
  document.getElementById('category-gender').value = cat.gender || 'Mixed';
  document.getElementById('category-weight').value = cat.weightClass || 'Open';
  
  const timeField = document.getElementById('category-time');
  if (timeField) {
    timeField.value = cat.time || '';
  }
  
  document.getElementById('category-modal-title').innerText = 'Edit Division';
  document.getElementById('modal-category').classList.add('active');
}

function deleteCategory(id) {
  const cat = state.categories.find(c => c.id === id);
  if (!cat) return;
  
  const count = state.fighters.filter(f => f.categoryId === id).length;
  
  // If the category is completely empty, delete it in a single click without prompt!
  if (count === 0) {
    state.matches = state.matches.filter(m => m.categoryId !== id);
    state.categories = state.categories.filter(c => c.id !== id);
    if (activeCategoryFilterId === id) {
      activeCategoryFilterId = 'ALL';
    }
    showToast(`Empty division "${cat.name}" deleted successfully.`, "info");
    saveState();
  } else {
    // If it has fighters, prompt for confirmation
    if (confirm(`Are you sure you want to delete the division "${cat.name}"? This will also remove all registered fighters and match brackets associated with this division.`)) {
      state.fighters = state.fighters.filter(f => f.categoryId !== id);
      state.matches = state.matches.filter(m => m.categoryId !== id);
      state.categories = state.categories.filter(c => c.id !== id);
      if (activeCategoryFilterId === id) {
        activeCategoryFilterId = 'ALL';
      }
      showToast("Division and all associated data deleted successfully.", "info");
      saveState();
    }
  }
}

function cleanAllEmptyCategories() {
  const emptyCategories = state.categories.filter(cat => {
    const count = state.fighters.filter(f => f.categoryId === cat.id).length;
    return count === 0;
  });

  if (emptyCategories.length === 0) {
    showToast("No empty divisions found in the system!", "info");
    return;
  }

  const countDeleted = emptyCategories.length;
  const deletedNames = emptyCategories.map(c => `'${c.name}'`).join(", ");

  emptyCategories.forEach(cat => {
    state.matches = state.matches.filter(m => m.categoryId !== cat.id);
    state.categories = state.categories.filter(c => c.id !== cat.id);
    if (activeCategoryFilterId === cat.id) {
      activeCategoryFilterId = 'ALL';
    }
  });

  showToast(`Successfully deleted ${countDeleted} empty divisions: ${deletedNames}!`, "success");
  saveState();
}

function autofillFighterDetailsFromCategory(categoryId) {
  const cat = state.categories.find(c => c.id === categoryId);
  if (!cat) return;

  // 1. Gender Auto-Fill
  const genderSelect = document.getElementById('fighter-gender');
  if (cat.gender && (cat.gender === 'Male' || cat.gender === 'Female')) {
    genderSelect.value = cat.gender;
  } else {
    genderSelect.value = 'Male'; // Fallback
  }

  // 2. Date of Birth (Age) Auto-Fill
  const dobInput = document.getElementById('fighter-dob');
  const today = new Date();
  const currentYear = today.getFullYear();
  let targetAge = 22; // default fallback (Senior)

  const ageStr = (cat.ageClass || '').toLowerCase();
  if (ageStr.includes('senior') || ageStr.includes('18+')) {
    targetAge = 22;
  } else if (ageStr.includes('under 21') || ageStr.includes('u21') || ageStr.includes('18-20')) {
    targetAge = 19;
  } else if (ageStr.includes('junior') || ageStr.includes('16-17')) {
    targetAge = 16;
  } else if (ageStr.includes('cadet') || ageStr.includes('14-15')) {
    targetAge = 14;
  } else if (ageStr.includes('children') || ageStr.includes('u14')) {
    targetAge = 11;
  } else {
    // Try to parse range or a single number
    const rangeMatch = ageStr.match(/(\d+)\s*-\s*(\d+)/);
    if (rangeMatch) {
      targetAge = parseInt(rangeMatch[1]);
    } else {
      const singleMatch = ageStr.match(/(\d+)/);
      if (singleMatch) {
        targetAge = parseInt(singleMatch[1]);
      }
    }
  }

  // standardizing on mid-January birthdate to prevent time zone offset shifts
  const birthYear = currentYear - targetAge;
  dobInput.value = `${birthYear}-01-15`;

  // 3. Weight Auto-Fill
  const weightInput = document.getElementById('fighter-weight');
  let targetWeight = 70.0; // standard Male fallback
  if (genderSelect.value === 'Female') {
    targetWeight = 58.0; // standard Female fallback
  }

  const weightStr = (cat.weightClass || '').toLowerCase();
  if (weightStr.includes('open') || weightStr === '') {
    // Keep fallback
  } else {
    const minusMatch = weightStr.match(/-\s*(\d+(\.\d+)?)/);
    const plusMatch = weightStr.match(/\+\s*(\d+(\.\d+)?)/);
    
    if (minusMatch) {
      const maxWeight = parseFloat(minusMatch[1]);
      targetWeight = maxWeight - 2.5; // E.g. for -67kg, set to 64.5kg
    } else if (plusMatch) {
      const minWeight = parseFloat(plusMatch[1]);
      targetWeight = minWeight + 3.5; // E.g. for +84kg, set to 87.5kg
    } else {
      const numMatch = weightStr.match(/(\d+(\.\d+)?)/);
      if (numMatch) {
        targetWeight = parseFloat(numMatch[1]);
      }
    }
  }
  
  weightInput.value = targetWeight.toFixed(1);

  // Trigger visual auto-match visual badge confirmation
  handleFighterModalAutoMatch();
}

function openFighterModal(editFighterId = '', preSelectedCategoryId = '') {
  const form = document.getElementById('fighter-form');
  form.reset();
  
  // Hide auto-match badge initially
  document.getElementById('fighter-auto-match-badge').style.display = 'none';
  
  // Populate Categories drop-downs in form
  const catSelect = document.getElementById('fighter-division');
  catSelect.innerHTML = '';
  
  const kataSelect = document.getElementById('fighter-kata-division');
  if (kataSelect) kataSelect.innerHTML = '';

  state.categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.innerText = `${cat.name} (${cat.gender || 'Mixed'} • ${cat.ageClass})`;
    
    const isKata = (cat.type || '').toLowerCase() === 'kata';
    if (isKata) {
      if (kataSelect) kataSelect.appendChild(opt);
    } else {
      catSelect.appendChild(opt);
    }
  });

  const previewImg = document.getElementById('fighter-photo-preview');
  const placeholder = document.getElementById('fighter-photo-placeholder');

  // Copy Existing Competitor Selector logic
  const copyGroup = document.getElementById('fighter-copy-existing-group');
  const copySelect = document.getElementById('fighter-copy-existing-select');

  // Helper to toggle active discipline UI classes
  const setDisciplineUI = (val) => {
    document.querySelectorAll('input[name="fighter-discipline"]').forEach(radio => {
      if (radio.value === val) radio.checked = true;
    });
    document.querySelectorAll('.discipline-label').forEach(lbl => {
      lbl.classList.remove('active');
    });
    const activeLabel = document.getElementById(`lbl-discipline-${val}`);
    if (activeLabel) activeLabel.classList.add('active');

    const kumiteGroup = document.getElementById('fighter-kumite-division-group');
    const kataGroup = document.getElementById('fighter-kata-division-group');
    const kumiteSel = document.getElementById('fighter-division');
    const kataSel = document.getElementById('fighter-kata-division');

    if (val === 'kumite') {
      if (kumiteGroup) kumiteGroup.style.display = 'block';
      if (kataGroup) kataGroup.style.display = 'none';
      if (kumiteSel) kumiteSel.required = true;
      if (kataSel) kataSel.required = false;
    } else if (val === 'kata') {
      if (kumiteGroup) kumiteGroup.style.display = 'none';
      if (kataGroup) kataGroup.style.display = 'block';
      if (kumiteSel) kumiteSel.required = false;
      if (kataSel) kataSel.required = true;
    } else if (val === 'both') {
      if (kumiteGroup) kumiteGroup.style.display = 'block';
      if (kataGroup) kataGroup.style.display = 'block';
      if (kumiteSel) kumiteSel.required = true;
      if (kataSel) kataSel.required = true;
    }
  };

  if (editFighterId) {
    if (copyGroup) copyGroup.style.display = 'none';
    const f = state.fighters.find(item => item.id === editFighterId);
    if (f) {
      document.getElementById('fighter-edit-id').value = f.id;
      document.getElementById('fighter-name').value = f.name;
      document.getElementById('fighter-club').value = f.club;
      document.getElementById('fighter-belt').value = f.belt;
      document.getElementById('fighter-gender').value = f.gender || '';
      document.getElementById('fighter-dob').value = f.dob || '';
      document.getElementById('fighter-weight').value = f.weight || '';
      document.getElementById('fighter-city').value = f.city || '';
      const fcountryEl = document.getElementById('fighter-country');
      if (fcountryEl) fcountryEl.value = f.country || '';

      // Check if linked competitor (in another style) exists
      const isKataFighter = state.categories.find(c => c.id === f.categoryId)?.type?.toLowerCase() === 'kata';
      let linkedFighter = null;
      if (f.name && f.club) {
        linkedFighter = state.fighters.find(item => 
          item.id !== f.id &&
          item.name.trim().toLowerCase() === f.name.trim().toLowerCase() &&
          (item.club || '').trim().toLowerCase() === (f.club || '').trim().toLowerCase()
        );
      }

      if (linkedFighter) {
        setDisciplineUI('both');
        if (isKataFighter) {
          document.getElementById('fighter-division').value = linkedFighter.categoryId;
          document.getElementById('fighter-kata-division').value = f.categoryId;
        } else {
          document.getElementById('fighter-division').value = f.categoryId;
          document.getElementById('fighter-kata-division').value = linkedFighter.categoryId;
        }
      } else {
        if (isKataFighter) {
          setDisciplineUI('kata');
          document.getElementById('fighter-kata-division').value = f.categoryId;
        } else {
          setDisciplineUI('kumite');
          document.getElementById('fighter-division').value = f.categoryId;
        }
      }

      document.getElementById('fighter-modal-title').innerText = 'Edit Competitor';
      
      if (f.dob && f.gender && f.weight) {
        document.getElementById('fighter-auto-match-badge').style.display = 'inline-block';
      }

      currentFighterPhoto = f.photo || '';
      if (previewImg && placeholder) {
        if (currentFighterPhoto) {
          previewImg.src = currentFighterPhoto;
          previewImg.style.display = 'block';
          placeholder.style.display = 'none';
        } else {
          previewImg.style.display = 'none';
          placeholder.style.display = 'block';
        }
      }
    }
  } else {
    setDisciplineUI('both');
    document.getElementById('fighter-edit-id').value = '';
    document.getElementById('fighter-modal-title').innerText = 'Register Competitor';
    currentFighterPhoto = '';
    if (previewImg && placeholder) {
      previewImg.style.display = 'none';
      placeholder.style.display = 'block';
    }

    if (copyGroup && copySelect) {
      copyGroup.style.display = 'block';
      copySelect.innerHTML = '<option value="">-- Choose Competitor to Copy --</option>';
      
      let allFighters = [];
      if (state.fighters) {
        allFighters = allFighters.concat(state.fighters);
      }
      if (state.events) {
        state.events.forEach(ev => {
          if (ev.fighters) {
            allFighters = allFighters.concat(ev.fighters);
          }
        });
      }

      const seen = new Set();
      const uniqueFighters = [];
      allFighters.forEach(f => {
        if (!f || !f.name) return;
        const key = f.name.trim().toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          uniqueFighters.push(f);
        }
      });

      uniqueFighters.sort((a, b) => a.name.localeCompare(b.name));

      uniqueFighters.forEach(f => {
        const opt = document.createElement('option');
        opt.value = JSON.stringify({
          name: f.name || '',
          club: f.club || '',
          belt: f.belt || '',
          gender: f.gender || '',
          dob: f.dob || '',
          weight: f.weight || '',
          photo: f.photo || ''
        });
        opt.innerText = `${f.name} (${f.club || 'No Dojo'}) - ${f.belt || 'No Belt'}`;
        copySelect.appendChild(opt);
      });
    }

    if (preSelectedCategoryId) {
      const selectElement = document.getElementById('fighter-division');
      const isKata = state.categories.find(c => c.id === preSelectedCategoryId)?.type?.toLowerCase() === 'kata';
      if (isKata) {
        const kSel = document.getElementById('fighter-kata-division');
        if (kSel && [...kSel.options].some(o => o.value === preSelectedCategoryId)) {
          setDisciplineUI('kata');
          kSel.value = preSelectedCategoryId;
          autofillFighterDetailsFromCategory(preSelectedCategoryId);
        }
      } else {
        if (selectElement && [...selectElement.options].some(o => o.value === preSelectedCategoryId)) {
          setDisciplineUI('kumite');
          selectElement.value = preSelectedCategoryId;
          autofillFighterDetailsFromCategory(preSelectedCategoryId);
        }
      }
    }
  }

  document.getElementById('modal-fighter').classList.add('active');
}

function openScheduleModal(categoryId = "") {
  const form = document.getElementById('schedule-form');
  form.reset();

  const divSelect = document.getElementById('sched-division-select');
  divSelect.innerHTML = '<option value="">-- Select Division --</option>';
  
  state.categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.innerText = `${cat.name} (${cat.gender || 'Mixed'} • ${cat.ageClass})`;
    divSelect.appendChild(opt);
  });

  const fighterA = document.getElementById('sched-fighter-a-select');
  const fighterB = document.getElementById('sched-fighter-b-select');
  
  const populateFightersForCategory = (cid) => {
    fighterA.innerHTML = '<option value="">-- Select Fighter Red --</option>';
    fighterB.innerHTML = '<option value="">-- Select Fighter Blue --</option>';

    if (cid) {
      const filtered = state.fighters.filter(f => f.categoryId === cid);
      filtered.forEach(f => {
        const optA = document.createElement('option');
        optA.value = f.id;
        optA.innerText = `${f.name} [${f.belt.toUpperCase()}] (${f.club})`;
        fighterA.appendChild(optA);

        const optB = document.createElement('option');
        optB.value = f.id;
        optB.innerText = `${f.name} [${f.belt.toUpperCase()}] (${f.club})`;
        fighterB.appendChild(optB);
      });
    }
  };

  divSelect.addEventListener('change', (e) => {
    populateFightersForCategory(e.target.value);
  });

  // Dynamically load active tatami dropdown list
  const matSelect = document.getElementById('sched-mat-select');
  if (matSelect) {
    matSelect.innerHTML = '';
    state.tatamis.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.innerText = t.name;
      matSelect.appendChild(opt);
    });
  }

  if (categoryId) {
    divSelect.value = categoryId;
    populateFightersForCategory(categoryId);
  }

  document.getElementById('modal-schedule').classList.add('active');
}

function triggerViewTransition(targetViewId) {
  const navItem = document.querySelector(`.sidebar .nav-item[data-view="${targetViewId}"]`);
  if (navItem) {
    navItem.click();
  }
}

// ================= FORM SUBMISSIONS =================

function initFormSubmissions() {
  // Category Form Submit
  document.getElementById('category-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('category-edit-id').value;
    const name = document.getElementById('category-name').value.trim();
    const type = document.getElementById('category-type').value;
    const ageClass = document.getElementById('category-age').value;
    const gender = document.getElementById('category-gender').value;
    const weightClass = document.getElementById('category-weight').value;
    const time = document.getElementById('category-time')?.value.trim() || '';

    if (editId) {
      const idx = state.categories.findIndex(c => c.id === editId);
      if (idx !== -1) {
        state.categories[idx].name = name;
        state.categories[idx].type = type;
        state.categories[idx].ageClass = ageClass;
        state.categories[idx].gender = gender;
        state.categories[idx].weightClass = weightClass;
        state.categories[idx].time = time;
        showToast("Division successfully updated!", "success");
      }
    } else {
      const newCat = {
        id: 'cat-' + Date.now(),
        name: name,
        type: type,
        ageClass: ageClass,
        gender: gender,
        weightClass: weightClass,
        time: time
      };
      state.categories.push(newCat);
      showToast(`Division "${name}" created!`, "success");
    }

    document.getElementById('modal-category').classList.remove('active');
    saveState();
  });

  // Fighter Form Submit
  document.getElementById('fighter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('fighter-edit-id').value;
    const name = document.getElementById('fighter-name').value.trim();
    const club = document.getElementById('fighter-club').value.trim();
    const belt = document.getElementById('fighter-belt').value;
    
    const discipline = document.querySelector('input[name="fighter-discipline"]:checked').value;
    
    const catSelect = document.getElementById('fighter-division');
    let categoryId = catSelect.value;
    
    const kataSelect = document.getElementById('fighter-kata-division');
    let kataCategoryId = kataSelect ? kataSelect.value : '';
    
    const dob = document.getElementById('fighter-dob').value;
    const gender = document.getElementById('fighter-gender').value;
    const weight = parseFloat(document.getElementById('fighter-weight').value) || 0;
    const city = document.getElementById('fighter-city').value.trim();
    const country = document.getElementById('fighter-country').value;

    // Check if the auto-create division option is selected
    if (discipline !== 'kata' && categoryId === 'AUTO_CREATE') {
      const opt = catSelect.querySelector('option[value="AUTO_CREATE"]');
      if (opt) {
        const catName = opt.getAttribute('data-name');
        const catGender = opt.getAttribute('data-gender');
        const catAge = opt.getAttribute('data-age');
        const catWeight = opt.getAttribute('data-weight');
        const catType = opt.getAttribute('data-type') || 'Kumite';

        const newCatId = 'cat-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
        const newCat = {
          id: newCatId,
          name: catName,
          type: catType,
          ageClass: catAge,
          gender: catGender,
          weightClass: catWeight
        };
        state.categories.push(newCat);
        categoryId = newCatId;
        showToast(`Auto-created division "${catName}"!`, "success");
      }
    }
    if (editId) {
      const idx = state.fighters.findIndex(f => f.id === editId);
      if (idx !== -1) {
        const f = state.fighters[idx];
        const oldNameClean = (f.name || '').trim().toLowerCase();
        const oldClubClean = (f.club || '').trim().toLowerCase();
        
        // Find existing linked partner if any
        let linkedFighter = null;
        if (f.name && f.club) {
          linkedFighter = state.fighters.find(item => 
            item.id !== f.id &&
            (item.name || '').trim().toLowerCase() === oldNameClean &&
            (item.club || '').trim().toLowerCase() === oldClubClean
          );
        }

        // Capture original profile details to find and sync records
        const originalName = f.name;
        const originalClub = f.club;
        const originalPhoto = f.photo;
        const originalCustomId = f.customId;

        // Sync competitor profile across all events and divisions first
        syncCompetitorProfileAcrossAllEvents(originalName, originalClub, {
          name: name,
          club: club,
          belt: belt,
          dob: dob,
          gender: gender,
          weight: weight,
          city: city,
          country: country,
          photo: currentFighterPhoto || originalPhoto || "",
          customId: originalCustomId
        });

        if (discipline === 'kumite') {
          f.name = name;
          f.club = club;
          f.belt = belt;
          f.categoryId = categoryId;
          f.dob = dob;
          f.gender = gender;
          f.weight = weight;
          f.city = city;
          f.country = country;
          f.photo = currentFighterPhoto || "";

          // Remove the linked record if there was one
          if (linkedFighter) {
            state.fighters = state.fighters.filter(item => item.id !== linkedFighter.id);
          }
          showToast("Competitor profile updated (Kumite Only)!", "success");
        } else if (discipline === 'kata') {
          f.name = name;
          f.club = club;
          f.belt = belt;
          f.categoryId = kataCategoryId;
          f.dob = dob;
          f.gender = gender;
          f.weight = weight;
          f.city = city;
          f.country = country;
          f.photo = currentFighterPhoto || "";

          // Remove the linked record if there was one
          if (linkedFighter) {
            state.fighters = state.fighters.filter(item => item.id !== linkedFighter.id);
          }
          showToast("Competitor profile updated (Kata Only)!", "success");
        } else if (discipline === 'both') {
          f.name = name;
          f.club = club;
          f.belt = belt;
          f.categoryId = categoryId;
          f.dob = dob;
          f.gender = gender;
          f.weight = weight;
          f.city = city;
          f.country = country;
          f.photo = currentFighterPhoto || "";

          if (linkedFighter) {
            linkedFighter.name = name;
            linkedFighter.club = club;
            linkedFighter.belt = belt;
            linkedFighter.categoryId = kataCategoryId;
            linkedFighter.dob = dob;
            linkedFighter.gender = gender;
            linkedFighter.weight = weight;
            linkedFighter.city = city;
            linkedFighter.country = country;
            linkedFighter.photo = currentFighterPhoto || "";
          } else {
            const partner = {
              id: 'fight-' + Date.now() + '-kata',
              name: name,
              club: club,
              belt: belt,
              dob: dob,
              gender: gender,
              weight: weight,
              city: city,
              country: country,
              categoryId: kataCategoryId,
              wins: 0,
              losses: 0,
              points: 0,
              photo: currentFighterPhoto || ""
            };
            state.fighters.push(partner);
          }
          showToast("Competitor profile updated in both disciplines!", "success");
        }
      }
    } else {
      if (discipline === 'kumite') {
        const newFighter = {
          id: 'fight-' + Date.now(),
          name: name,
          club: club,
          belt: belt,
          dob: dob,
          gender: gender,
          weight: weight,
          city: city,
          country: country,
          categoryId: categoryId,
          wins: 0,
          losses: 0,
          points: 0,
          photo: currentFighterPhoto || ""
        };
        state.fighters.push(newFighter);
        showToast(`Fighter "${name}" registered in Kumite!`, "success");
      } else if (discipline === 'kata') {
        const newFighter = {
          id: 'fight-' + Date.now(),
          name: name,
          club: club,
          belt: belt,
          dob: dob,
          gender: gender,
          weight: weight,
          city: city,
          country: country,
          categoryId: kataCategoryId,
          wins: 0,
          losses: 0,
          points: 0,
          photo: currentFighterPhoto || ""
        };
        state.fighters.push(newFighter);
        showToast(`Fighter "${name}" registered in Kata!`, "success");
      } else if (discipline === 'both') {
        const kumiteFighter = {
          id: 'fight-' + Date.now() + '-kumite',
          name: name,
          club: club,
          belt: belt,
          dob: dob,
          gender: gender,
          weight: weight,
          city: city,
          country: country,
          categoryId: categoryId,
          wins: 0,
          losses: 0,
          points: 0,
          photo: currentFighterPhoto || ""
        };
        const kataFighter = {
          id: 'fight-' + Date.now() + '-kata',
          name: name,
          club: club,
          belt: belt,
          dob: dob,
          gender: gender,
          weight: weight,
          city: city,
          country: country,
          categoryId: kataCategoryId,
          wins: 0,
          losses: 0,
          points: 0,
          photo: currentFighterPhoto || ""
        };
        state.fighters.push(kumiteFighter);
        state.fighters.push(kataFighter);
        showToast(`Fighter "${name}" registered in both Kata & Kumite!`, "success");
      }
    }

    document.getElementById('modal-fighter').classList.remove('active');
    saveState();
    if (typeof renderFightersView === 'function') renderFightersView();
    if (typeof renderCredentialsView === 'function') renderCredentialsView();
  });

  // Manual Schedule Match Form Submit
  document.getElementById('schedule-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const catId = document.getElementById('sched-division-select').value;
    const fighterAId = document.getElementById('sched-fighter-a-select').value;
    const fighterBId = document.getElementById('sched-fighter-b-select').value;
    const mat = parseInt(document.getElementById('sched-mat-select').value);
    const customTime = document.getElementById('sched-match-time')?.value.trim() || '';

    if (fighterAId === fighterBId) {
      showToast("Cannot schedule a match against the same fighter!", "warning");
      return;
    }

    const newMatch = {
      id: 'match-' + Date.now(),
      categoryId: catId,
      round: 1,
      matchNumber: state.matches.filter(m => m.categoryId === catId && m.round === 1).length + 1,
      fighterAId: fighterAId,
      fighterBId: fighterBId,
      scoreA: 0,
      scoreB: 0,
      winnerId: null,
      status: 'scheduled',
      mat: mat,
      dateScheduled: customTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    state.matches.push(newMatch);
    showToast("Exhibition Match Scheduled successfully!", "success");
    document.getElementById('modal-schedule').classList.remove('active');
    
    // Clear scheduled time field
    const timeField = document.getElementById('sched-match-time');
    if (timeField) timeField.value = '';

    saveState();
  });

  // Staff Registration Form Submit
  const staffForm = document.getElementById('staff-registration-form');
  if (staffForm) {
    staffForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = document.getElementById('staff-edit-id').value;
      const name = document.getElementById('staff-name').value.trim();
      const role = document.getElementById('staff-role').value;
      const dojo = document.getElementById('staff-dojo').value.trim();
      const customIdVal = document.getElementById('staff-custom-id').value.trim().toUpperCase();
      
      state.staff = state.staff || [];

      if (editId) {
        const idx = state.staff.findIndex(s => s.id === editId);
        if (idx !== -1) {
          state.staff[idx].name = name;
          state.staff[idx].role = role;
          state.staff[idx].dojo = dojo;
          state.staff[idx].photo = currentStaffPhoto || state.staff[idx].photo || "";
          if (customIdVal) {
            state.staff[idx].customId = customIdVal;
          } else {
            delete state.staff[idx].customId;
          }
          showToast(`Staff member "${name}" successfully updated!`, "success");
        }
      } else {
        const newStaff = {
          id: 'staff-' + Date.now(),
          name: name,
          role: role,
          dojo: dojo,
          photo: currentStaffPhoto || ""
        };
        if (customIdVal) {
          newStaff.customId = customIdVal;
        }
        state.staff.push(newStaff);
        showToast(`Staff member "${name}" registered successfully!`, "success");
      }

      // Reset form
      staffForm.reset();
      document.getElementById('staff-edit-id').value = '';
      document.getElementById('staff-custom-id').value = '';
      currentStaffPhoto = '';
      
      const img = document.getElementById('staff-photo-preview');
      const placeholder = document.getElementById('staff-photo-placeholder');
      if (img && placeholder) {
        img.src = '';
        img.style.display = 'none';
        placeholder.style.display = 'block';
      }

      document.getElementById('staff-submit-btn').innerHTML = '➕ Register Official';
      
      saveState();
    });
  }
}

// ================= TOURNAMENT BRACKET GENERATION =================

function generateSingleCategoryBracket(catId, force = false, silent = false) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return false;

  const categoryFighters = state.fighters.filter(f => f.categoryId === catId);
  if (categoryFighters.length < 2) {
    if (!silent) {
      showToast(`A bracket requires at least 2 competitors! Category '${cat.name}' only has ${categoryFighters.length}.`, "warning");
    }
    return false;
  }

  // Check if brackets already exist
  const existingMatches = state.matches.filter(m => m.categoryId === catId && m.round > 0);
  if (existingMatches.length > 0) {
    if (!force) {
      if (!confirm(`Brackets already exist for '${cat.name}'. Generating a new bracket will wipe out current progress. Proceed?`)) {
        return false;
      }
    }
    // Wipe matches for this category
    state.matches = state.matches.filter(m => m.categoryId !== catId);
  }

  const N = categoryFighters.length;
  
  // Find next power of 2
  let P = 1;
  while (P < N) {
    P *= 2;
  }

  // Standard Single Elimination setup
  const totalRounds = Math.log2(P);
  let roundMatchesCount = P / 2;
  const createdMatches = [];

  for (let r = 1; r <= totalRounds; r++) {
    for (let m = 1; m <= roundMatchesCount; m++) {
      const matchId = `bracket-${catId}-r${r}-m${m}`;
      
      let nextMatchId = null;
      let positionInNextMatch = null;
      
      if (r < totalRounds) {
        const nextRoundM = Math.ceil(m / 2);
        nextMatchId = `bracket-${catId}-r${r+1}-m${nextRoundM}`;
        positionInNextMatch = (m % 2 !== 0) ? 'A' : 'B';
      }

      createdMatches.push({
        id: matchId,
        categoryId: catId,
        round: r,
        matchNumber: m,
        fighterAId: null,
        fighterBId: null,
        scoreA: 0,
        scoreB: 0,
        winnerId: null,
        status: 'scheduled',
        mat: Math.floor(Math.random() * 3) + 1,
        dateScheduled: `Round ${r} - M${m}`,
        nextMatchId: nextMatchId,
        positionInNextMatch: positionInNextMatch
      });
    }
    roundMatchesCount /= 2;
  }

  const shuffledFighters = [...categoryFighters];
  const round1Matches = createdMatches.filter(m => m.round === 1);
  
  for (let idx = 0; idx < P; idx += 2) {
    const matchIdx = idx / 2;
    const match = round1Matches[matchIdx];
    
    const fighterA = shuffledFighters[idx] || null;
    const fighterB = shuffledFighters[idx + 1] || null;
    
    match.fighterAId = fighterA ? fighterA.id : 'BYE';
    match.fighterBId = fighterB ? fighterB.id : 'BYE';
    
    checkAndResolveByeMatch(match);
  }

  state.matches.push(...createdMatches);
  if (!silent) {
    showToast(`Bracket for '${cat.name}' generated with ${N} fighters and ${P - N} Byes!`, "success");
  }
  return true;
}

function handleBracketGeneration() {
  const catId = document.getElementById('bracket-division-select').value;
  if (!catId) {
    showToast("Please select a division first!", "warning");
    return;
  }
  const success = generateSingleCategoryBracket(catId, false, false);
  if (success) {
    saveState();
  }
}

function handleBracketGenerationAll() {
  if (state.categories.length === 0) {
    showToast("No karate divisions found! Please create one in Fighters & Divisions first.", "warning");
    return;
  }

  // Count divisions with at least 2 fighters
  const categoriesWithFighters = state.categories.filter(cat => {
    const count = state.fighters.filter(f => f.categoryId === cat.id).length;
    return count >= 2;
  });

  if (categoriesWithFighters.length === 0) {
    showToast("None of the divisions have at least 2 competitors! Please assign competitors first.", "warning");
    return;
  }

  // Check if any category has existing brackets/matches
  const divisionsWithExistingMatches = categoriesWithFighters.filter(cat => {
    const count = state.matches.filter(m => m.categoryId === cat.id && m.round > 0).length;
    return count > 0;
  });

  if (divisionsWithExistingMatches.length > 0) {
    const listNames = divisionsWithExistingMatches.map(c => `'${c.name}'`).join(", ");
    if (!confirm(`Brackets already exist for some divisions (${listNames}). Generating new brackets will wipe out progress for these divisions. Proceed?`)) {
      return;
    }
  }

  let generatedCount = 0;
  categoriesWithFighters.forEach(cat => {
    const success = generateSingleCategoryBracket(cat.id, true, true);
    if (success) generatedCount++;
  });

  if (generatedCount > 0) {
    saveState();
    showToast(`Successfully generated brackets for all ${generatedCount} qualified divisions!`, "success");
  } else {
    showToast("No brackets could be generated.", "info");
  }
}

function handleBracketReset() {
  const catId = document.getElementById('bracket-division-select').value;
  if (!catId) return;

  if (confirm("Are you sure you want to reset all bracket results for this category? This cannot be undone.")) {
    state.matches = state.matches.filter(m => m.categoryId !== catId);
    showToast("Brackets wiped successfully.", "info");
    saveState();
  }
}

function checkAndResolveByeMatch(m) {
  if (!m) return;
  if (m.fighterAId === 'BYE' || m.fighterBId === 'BYE') {
    if (m.fighterAId === 'BYE' && m.fighterBId === 'BYE') {
      m.winnerId = null;
      m.status = 'completed';
      m.scoreA = 0;
      m.scoreB = 0;
      if (m.nextMatchId) {
        propagateWinner(m.nextMatchId, m.positionInNextMatch, null);
        const nextM = state.matches.find(item => item.id === m.nextMatchId);
        if (nextM) {
          checkAndResolveByeMatch(nextM);
        }
      }
    } else {
      const realFighterId = m.fighterAId === 'BYE' ? m.fighterBId : m.fighterAId;
      if (realFighterId && realFighterId !== 'BYE') {
        m.winnerId = realFighterId;
        m.status = 'completed';
        m.scoreA = m.fighterAId === 'BYE' ? 0 : 1;
        m.scoreB = m.fighterBId === 'BYE' ? 0 : 1;
        if (m.nextMatchId) {
          propagateWinner(m.nextMatchId, m.positionInNextMatch, realFighterId);
          // Recursively resolve next match if it now has a bye
          const nextM = state.matches.find(item => item.id === m.nextMatchId);
          if (nextM) {
            checkAndResolveByeMatch(nextM);
          }
        }
      }
    }
  }
}

function propagateWinner(nextMatchId, position, winnerId) {
  if (!nextMatchId) return;
  
  const targetMatchIdx = state.matches.findIndex(m => m.id === nextMatchId);
  if (targetMatchIdx !== -1) {
    const nextMatch = state.matches[targetMatchIdx];
    if (position === 'A') {
      nextMatch.fighterAId = winnerId;
    } else {
      nextMatch.fighterBId = winnerId;
    }
    
    // Check and resolve if this target match now has a BYE
    checkAndResolveByeMatch(nextMatch);
  }
}


// ================= RENDERING VIEWS =================

function renderAll() {
  renderDropdowns();
  renderDashboard();
  renderFightersView();
  renderBracketsView();
  renderSchedulerView();
  renderRankingsView();
  renderWinnersView();
  renderCredentialsView();
  updateAdminControlStates();
}

// Dropdowns setup
function renderDropdowns() {
  const bracketSelect = document.getElementById('bracket-division-select');
  const rankingsSelect = document.getElementById('rankings-division-select');
  const winnersSelect = document.getElementById('winners-division-select');

  // Keep track of previously selected values
  const bVal = bracketSelect.value;
  const rVal = rankingsSelect.value;
  const wVal = winnersSelect.value;

  const getOptionsHTML = () => {
    let html = '<option value="">-- Select Division --</option>';
    state.categories.forEach(cat => {
      html += `<option value="${cat.id}">${cat.name} (${cat.gender || 'Mixed'} • ${cat.ageClass})</option>`;
    });
    return html;
  };

  const getRankingsOptionsHTML = () => {
    let html = '<option value="ALL">-- All Divisions / Categories --</option>';
    state.categories.forEach(cat => {
      html += `<option value="${cat.id}">${cat.name} (${cat.gender || 'Mixed'} • ${cat.ageClass})</option>`;
    });
    return html;
  };

  bracketSelect.innerHTML = getOptionsHTML();
  rankingsSelect.innerHTML = getRankingsOptionsHTML();
  winnersSelect.innerHTML = getOptionsHTML();

  // Restore values
  if (bVal && state.categories.find(c => c.id === bVal)) bracketSelect.value = bVal;
  if (rVal && (rVal === 'ALL' || state.categories.find(c => c.id === rVal))) {
    rankingsSelect.value = rVal;
  } else {
    rankingsSelect.value = 'ALL';
  }
  if (wVal && state.categories.find(c => c.id === wVal)) winnersSelect.value = wVal;

  const credSelect = document.getElementById('cred-division-select');
  if (credSelect) {
    const credVal = credSelect.value;
    let html = '<option value="ALL">All Categories</option>';
    state.categories.forEach(cat => {
      html += `<option value="${cat.id}">${cat.name}</option>`;
    });
    credSelect.innerHTML = html;
    if (credVal && (credVal === 'ALL' || state.categories.find(c => c.id === credVal))) {
      credSelect.value = credVal;
    } else {
      credSelect.value = "ALL";
    }
  }
}

// 1. Dashboard View
function renderDashboard() {
  // Stats counters
  const uniqueCount = (() => {
    const seen = new Set();
    let count = 0;
    state.fighters.forEach(f => {
      const key = `${(f.name || '').trim().toLowerCase()}|${(f.club || '').trim().toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        count++;
      }
    });
    return count;
  })();
  document.getElementById('stat-total-fighters').innerText = uniqueCount;
  document.getElementById('stat-total-categories').innerText = state.categories.length;
  
  const bracketMatches = state.matches.filter(m => m.round > 0);
  const scheduled = bracketMatches.filter(m => m.status === 'scheduled').length;
  const completed = bracketMatches.filter(m => m.status === 'completed').length;
  
  document.getElementById('stat-scheduled-matches').innerText = scheduled;
  document.getElementById('stat-completed-matches').innerText = completed;

  // Active / Recent Match logs
  const listContainer = document.getElementById('dashboard-match-list');
  listContainer.innerHTML = '';

  const activeMatches = state.matches.filter(m => m.status === 'live' || (m.status === 'completed' && m.round > 0)).slice(-5);
  
  if (activeMatches.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 40px; height: 40px; opacity: 0.3;"><path d="M18 4H6v2h12V4zm0 6H6v2h12v-2zm0 6H6v2h12v-2z"/></svg>
        <p>No active matches. Head over to the Brackets or Scheduler tab to live track karate matches!</p>
      </div>
    `;
    return;
  }

  // Reverse list to show newest on top
  [...activeMatches].reverse().forEach(m => {
    const cat = state.categories.find(c => c.id === m.categoryId);
    const fA = state.fighters.find(f => f.id === m.fighterAId);
    const fB = state.fighters.find(f => f.id === m.fighterBId);
    
    const nameA = fA ? fA.name : (m.fighterAId === 'BYE' ? 'BYE' : 'To Be Decided');
    const nameB = fB ? fB.name : (m.fighterBId === 'BYE' ? 'BYE' : 'To Be Decided');
    const statusText = m.status === 'live' ? 'LIVE' : 'COMPLETED';
    const badgeStyle = m.status === 'live' ? 'background: rgba(239, 68, 68, 0.15); color: #f87171;' : 'background: rgba(16, 185, 129, 0.15); color: #34d399;';

    const card = document.createElement('div');
    card.className = 'activity-card';
    card.innerHTML = `
      <div class="activity-fighter-info">
        <div style="text-align: left;">
          <div class="activity-title">${nameA} vs ${nameB}</div>
          <div class="activity-subtitle">${cat ? cat.name : 'Exhibition'} • Mat ${m.mat}</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="font-family: var(--font-title); font-weight: 800; font-size: 1.1rem; letter-spacing: 0.1rem;">
          ${m.scoreA} - ${m.scoreB}
        </span>
        <span class="activity-badge" style="${badgeStyle}">${statusText}</span>
      </div>
    `;
    
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => openScorecardModal(m.id));
    listContainer.appendChild(card);
  });

  // Call interactive hub renderer to update lists dynamically
  renderInteractiveHub();
}

// ================= NEW INTERACTIVE HOME SCREEN HUB LOGIC =================
function renderInteractiveHub() {
  const activeTabBtn = document.querySelector('.hub-tab-btn.active');
  const targetTab = activeTabBtn ? activeTabBtn.getAttribute('data-hub-tab') : 'hub-fighters';

  if (targetTab === 'hub-fighters') renderInteractiveHubFighters();
  else if (targetTab === 'hub-divisions') renderInteractiveHubDivisions();
  else if (targetTab === 'hub-matches') renderInteractiveHubMatches();
}

function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderInteractiveHubFighters() {
  const tbody = document.getElementById('hub-fighters-list-body');
  if (!tbody) return;

  const searchQuery = (document.getElementById('hub-fighter-search')?.value || '').trim().toLowerCase();
  const beltFilter = document.getElementById('hub-fighter-belt-filter')?.value || '';

  // Get deduplicated competitors with aggregated stats
  const seen = new Set();
  const competitors = [];

  state.fighters.forEach(f => {
    const key = `${(f.name || '').trim().toLowerCase()}|${(f.club || '').trim().toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      
      const siblingRecords = state.fighters.filter(item => 
        (item.name || '').trim().toLowerCase() === (f.name || '').trim().toLowerCase() && 
        (item.club || '').trim().toLowerCase() === (f.club || '').trim().toLowerCase()
      );
      
      let totalWins = 0;
      let totalLosses = 0;
      let totalPoints = 0;
      const categories = [];

      siblingRecords.forEach(r => {
        totalWins += (r.wins || 0);
        totalLosses += (r.losses || 0);
        totalPoints += (r.points || 0);
        
        const cat = state.categories.find(c => c.id === r.categoryId);
        if (cat) {
          categories.push(cat.name);
        }
      });

      competitors.push({
        ...f,
        wins: totalWins,
        losses: totalLosses,
        points: totalPoints,
        divisions: categories.length > 0 ? categories.join(', ') : 'No Division'
      });
    }
  });

  // Filter based on search and belt
  let filtered = competitors;
  if (beltFilter) {
    filtered = filtered.filter(f => (f.belt || '').toLowerCase() === beltFilter.toLowerCase());
  }
  if (searchQuery) {
    filtered = filtered.filter(f => 
      (f.name || '').toLowerCase().includes(searchQuery) ||
      (f.club || '').toLowerCase().includes(searchQuery) ||
      (f.belt || '').toLowerCase().includes(searchQuery) ||
      (f.divisions || '').toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="padding: 2rem; text-align: center; color: var(--text-muted);">No competitors found matching your criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(f => {
    return `
      <tr>
        <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
          🥋 ${escapeHTML(f.name)}
        </td>
        <td style="padding: 0.75rem 1rem; color: var(--text-main);">${escapeHTML(f.club)}</td>
        <td style="padding: 0.75rem 1rem;">
          <span class="belt-badge belt-${(f.belt || 'white').toLowerCase()}" style="font-size: 0.7rem; padding: 0.15rem 0.45rem;">
            ${f.belt || 'White'}
          </span>
        </td>
        <td style="padding: 0.75rem 1rem; color: var(--text-muted); font-size: 0.78rem;">${escapeHTML(f.divisions)}</td>
        <td style="padding: 0.75rem 1rem; text-align: center; font-weight: 700; color: #10b981;">${f.wins}</td>
        <td style="padding: 0.75rem 1rem; text-align: center; font-weight: 700; color: #ef4444;">${f.losses}</td>
        <td style="padding: 0.75rem 1rem; text-align: center; font-weight: 800; color: var(--accent);">${f.points}</td>
      </tr>
    `;
  }).join('');
}

function renderInteractiveHubDivisions() {
  const container = document.getElementById('hub-divisions-grid-list');
  if (!container) return;

  if (state.categories.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; width: 100%; text-align: center; padding: 2rem 1rem;">
        <p style="color: var(--text-muted);">No divisions registered yet. Create categories under Fighters & Divisions tab!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.categories.map(cat => {
    const fighterCount = state.fighters.filter(f => f.categoryId === cat.id).length;
    const matchCount = state.matches.filter(m => m.categoryId === cat.id).length;
    const typeBadgeColor = cat.type === 'Kata' ? '#10b981' : '#3b82f6';
    
    return `
      <div class="glass-card" style="padding: 1rem; border: 1px solid var(--border-color); display: flex; flex-direction: column; justify-content: space-between; gap: 0.75rem;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
            <h4 style="font-family: var(--font-title); font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin: 0;">${escapeHTML(cat.name)}</h4>
            <span style="font-size: 0.68rem; font-weight: 800; text-transform: uppercase; color: #fff; background: ${typeBadgeColor}; padding: 0.15rem 0.45rem; border-radius: 4px;">${cat.type || 'Kumite'}</span>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">
            Age: <strong style="color: var(--text-main);">${cat.ageClass || 'Open'}</strong> | Gender: <strong style="color: var(--text-main);">${cat.gender || 'Any'}</strong>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">
            Weight: <strong style="color: var(--text-main);">${cat.weightClass || 'Open'}</strong>
          </div>
          ${cat.time ? `
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem; display: flex; align-items: center; gap: 0.25rem;">
            🕒 Time: <span style="background: rgba(124, 58, 237, 0.15); color: #a78bfa; padding: 0.1rem 0.35rem; border-radius: 4px; font-weight: 700; font-size: 0.7rem;">${escapeHTML(cat.time)}</span>
          </div>
          ` : ''}
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.75rem; margin-top: 0.25rem;">
          <div style="display: flex; gap: 0.75rem; font-size: 0.75rem;">
            <span>👥 <strong style="color: var(--text-main);">${fighterCount}</strong> Fighters</span>
            <span>🥋 <strong style="color: var(--text-main);">${matchCount}</strong> Games</span>
          </div>
          <button type="button" class="btn btn-primary btn-sm" onclick="viewBracketFromHub('${cat.id}')" style="height: 28px; font-size: 0.7rem; padding: 0 0.65rem;">
            View Bracket
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderInteractiveHubMatches() {
  const tbody = document.getElementById('hub-matches-list-body');
  if (!tbody) return;

  const statusFilter = document.getElementById('hub-match-status-filter')?.value || 'all';
  const divisionFilter = document.getElementById('hub-match-division-filter')?.value || 'all';

  // Filter matches
  let filtered = state.matches;
  
  if (statusFilter !== 'all') {
    filtered = filtered.filter(m => m.status === statusFilter);
  }
  if (divisionFilter !== 'all') {
    filtered = filtered.filter(m => m.categoryId === divisionFilter);
  }

  // Populate the division filter options dynamically
  const divFilterSelect = document.getElementById('hub-match-division-filter');
  if (divFilterSelect && divFilterSelect.options.length <= 1) {
    let html = '<option value="all">All Divisions</option>';
    state.categories.forEach(cat => {
      html += `<option value="${cat.id}">${escapeHTML(cat.name)}</option>`;
    });
    divFilterSelect.innerHTML = html;
    divFilterSelect.value = divisionFilter;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="padding: 2rem; text-align: center; color: var(--text-muted);">No matches scheduled yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(m => {
    const cat = state.categories.find(c => c.id === m.categoryId);
    const fA = state.fighters.find(f => f.id === m.fighterAId);
    const fB = state.fighters.find(f => f.id === m.fighterBId);

    const nameA = fA ? fA.name : (m.fighterAId === 'BYE' ? 'BYE' : 'To Be Decided');
    const nameB = fB ? fB.name : (m.fighterBId === 'BYE' ? 'BYE' : 'To Be Decided');
    
    let statusBadge = '';
    if (m.status === 'scheduled') {
      statusBadge = `<span class="activity-badge" style="background: rgba(156, 163, 175, 0.15); color: #d1d5db;">Scheduled</span>`;
    } else if (m.status === 'live') {
      statusBadge = `<span class="activity-badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171;">LIVE</span>`;
    } else if (m.status === 'completed') {
      statusBadge = `<span class="activity-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">Completed</span>`;
    }

    const matText = m.mat ? `Mat ${m.mat}` : 'Unassigned';
    
    // Time display
    const timeDisplay = m.dateScheduled ? `<div style="font-size: 0.72rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.25rem; margin-top: 0.2rem;">🕒 ${m.dateScheduled}</div>` : '';

    return `
      <tr>
        <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--text-main);">
          #${m.matchNumber || m.id.split('-')[1] || 'Exh'}
          ${timeDisplay}
        </td>
        <td style="padding: 0.75rem 1rem; color: var(--text-main); font-size: 0.8rem; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${cat ? escapeHTML(cat.name) : 'Exhibition'}
        </td>
        <td style="padding: 0.75rem 1rem; color: var(--text-muted); font-size: 0.8rem;">${matText}</td>
        <td style="padding: 0.75rem 1rem; font-weight: 600; color: #ef4444;">🔴 ${escapeHTML(nameA)}</td>
        <td style="padding: 0.75rem 1rem; text-align: center; font-family: var(--font-title); font-weight: 800; font-size: 1rem; color: #ef4444;">${m.scoreA}</td>
        <td style="padding: 0.75rem 1rem; text-align: center; font-family: var(--font-title); font-weight: 800; font-size: 1rem; color: #3b82f6;">${m.scoreB}</td>
        <td style="padding: 0.75rem 1rem; font-weight: 600; color: #3b82f6;">🔵 ${escapeHTML(nameB)}</td>
        <td style="padding: 0.75rem 1rem;">${statusBadge}</td>
        <td style="padding: 0.75rem 1rem; text-align: center;">
          <div style="display: flex; gap: 0.35rem; justify-content: center;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="openScorecardModal('${m.id}', true)" style="height: 28px; font-size: 0.7rem; padding: 0 0.5rem;">
              Score
            </button>
            <button type="button" class="btn btn-primary btn-sm" onclick="viewBracketFromHub('${m.categoryId}')" style="height: 28px; font-size: 0.7rem; padding: 0 0.5rem; background: rgba(79, 70, 229, 0.1); border: 1px solid rgba(79, 70, 229, 0.2); color: #818cf8;">
              Bracket
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function initInteractiveHubListeners() {
  const hubTabBtns = document.querySelectorAll('.hub-tab-btn');
  const hubTabContents = document.querySelectorAll('.hub-tab-content');

  hubTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-hub-tab');
      
      hubTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      hubTabContents.forEach(content => {
        if (content.id === `hub-tab-content-${targetTab}`) {
          content.classList.add('active');
          content.style.display = 'block';
        } else {
          content.classList.remove('active');
          content.style.display = 'none';
        }
      });

      if (targetTab === 'hub-fighters') renderInteractiveHubFighters();
      else if (targetTab === 'hub-divisions') renderInteractiveHubDivisions();
      else if (targetTab === 'hub-matches') renderInteractiveHubMatches();
    });
  });

  document.getElementById('hub-fighter-search')?.addEventListener('input', renderInteractiveHubFighters);
  document.getElementById('hub-fighter-belt-filter')?.addEventListener('change', renderInteractiveHubFighters);

  document.getElementById('hub-match-status-filter')?.addEventListener('change', renderInteractiveHubMatches);
  document.getElementById('hub-match-division-filter')?.addEventListener('change', renderInteractiveHubMatches);

  const wFighters = document.getElementById('widget-total-fighters');
  if (wFighters) {
    wFighters.addEventListener('click', () => {
      const tabBtn = document.querySelector('.hub-tab-btn[data-hub-tab="hub-fighters"]');
      if (tabBtn) tabBtn.click();
      const hubCard = document.querySelector('.interactive-hub-card');
      if (hubCard) hubCard.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const wCategories = document.getElementById('widget-total-categories');
  if (wCategories) {
    wCategories.addEventListener('click', () => {
      const tabBtn = document.querySelector('.hub-tab-btn[data-hub-tab="hub-divisions"]');
      if (tabBtn) tabBtn.click();
      const hubCard = document.querySelector('.interactive-hub-card');
      if (hubCard) hubCard.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const wScheduled = document.getElementById('widget-scheduled-matches');
  if (wScheduled) {
    wScheduled.addEventListener('click', () => {
      const statusFilter = document.getElementById('hub-match-status-filter');
      if (statusFilter) statusFilter.value = 'scheduled';
      const tabBtn = document.querySelector('.hub-tab-btn[data-hub-tab="hub-matches"]');
      if (tabBtn) tabBtn.click();
      const hubCard = document.querySelector('.interactive-hub-card');
      if (hubCard) hubCard.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const wCompleted = document.getElementById('widget-completed-matches');
  if (wCompleted) {
    wCompleted.addEventListener('click', () => {
      const statusFilter = document.getElementById('hub-match-status-filter');
      if (statusFilter) statusFilter.value = 'completed';
      const tabBtn = document.querySelector('.hub-tab-btn[data-hub-tab="hub-matches"]');
      if (tabBtn) tabBtn.click();
      const hubCard = document.querySelector('.interactive-hub-card');
      if (hubCard) hubCard.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

window.viewBracketFromHub = function(categoryId) {
  const select = document.getElementById('bracket-division-select');
  if (select) {
    select.value = categoryId;
  }
  switchMainView('brackets-view');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function switchMainView(viewId) {
  const navItems = document.querySelectorAll('.sidebar .nav-item');
  const sections = document.querySelectorAll('.main-content .view-section');
  
  navItems.forEach(nav => {
    if (nav.getAttribute('data-view') === viewId) {
      nav.classList.add('active');
    } else {
      nav.classList.remove('active');
    }
  });
  
  sections.forEach(sec => {
    if (sec.id === viewId) {
      sec.classList.add('active');
    } else {
      sec.classList.remove('active');
    }
  });

  if (viewId === 'dashboard-view') renderDashboard();
  else if (viewId === 'fighters-view') renderFightersView();
  else if (viewId === 'brackets-view') renderBracketsView();
  else if (viewId === 'scheduler-view') renderSchedulerView();
  else if (viewId === 'rankings-view') renderRankingsView();
  else if (viewId === 'winners-view') renderWinnersView();
  else if (viewId === 'credentials-view') renderCredentialsView();
}

// 2. Fighters & Divisions View
let activeCategoryFilterId = 'ALL';

function renderFightersView() {
  // Calculate unique de-duplicated competitor list and count for ALL view
  const uniqueCount = (() => {
    const seen = new Set();
    let count = 0;
    state.fighters.forEach(f => {
      const key = `${(f.name || '').trim().toLowerCase()}|${(f.club || '').trim().toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        count++;
      }
    });
    return count;
  })();

  // 1. Render Category Pills
  const pillContainer = document.getElementById('categories-pill-list');
  pillContainer.innerHTML = '';

  // All Category Pill
  const allPill = document.createElement('button');
  allPill.className = `category-pill ${activeCategoryFilterId === 'ALL' ? 'active' : ''}`;
  allPill.innerHTML = `
    <span>All Registered</span>
    <span class="category-badge-count">${uniqueCount}</span>
  `;
  allPill.addEventListener('click', () => {
    activeCategoryFilterId = 'ALL';
    renderFightersView();
  });
  pillContainer.appendChild(allPill);

  // Dynamic Category Pills
  state.categories.forEach(cat => {
    const count = state.fighters.filter(f => f.categoryId === cat.id).length;
    const pill = document.createElement('div');
    pill.className = `category-pill ${activeCategoryFilterId === cat.id ? 'active' : ''}`;
    pill.innerHTML = `
      <div class="category-pill-click-area" style="flex-grow: 1; display: flex; flex-direction: column; text-align: left;">
        <span style="font-size: 0.95rem; font-weight: 700;">${cat.name}</span>
        <span style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.15rem;">
          ${cat.gender || 'Mixed'} • ${cat.ageClass || 'Senior'}${cat.time ? ` • 🕒 ${cat.time}` : ''}
        </span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.4rem;">
        <button class="action-btn-icon" onclick="event.stopPropagation(); openCategoryEditModal('${cat.id}')" title="Edit Division">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="action-btn-icon delete" onclick="event.stopPropagation(); deleteCategory('${cat.id}')" title="Delete Division">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
        <span class="category-badge-count" style="margin-left: 0.2rem;">${count}</span>
      </div>
    `;
    pill.querySelector('.category-pill-click-area').addEventListener('click', () => {
      activeCategoryFilterId = cat.id;
      renderFightersView();
    });
    pillContainer.appendChild(pill);
  });

  // 2. Render Fighters Grid
  const grid = document.getElementById('fighters-grid-list');
  grid.innerHTML = '';

  let filteredFighters = [];
  if (activeCategoryFilterId !== 'ALL') {
    filteredFighters = state.fighters.filter(f => f.categoryId === activeCategoryFilterId);
    const cat = state.categories.find(c => c.id === activeCategoryFilterId);
    document.getElementById('fighter-list-category-title').innerText = cat ? `${cat.name} (${cat.ageClass})` : 'Fighters';
  } else {
    document.getElementById('fighter-list-category-title').innerText = 'All Registered Fighters';
    
    // Group duplicates for the "All Registered" view and aggregate statistics
    const seen = new Set();
    state.fighters.forEach(f => {
      const key = `${(f.name || '').trim().toLowerCase()}|${(f.club || '').trim().toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        
        // Find all records for this competitor to aggregate stats
        const matches = state.fighters.filter(item => 
          (item.name || '').trim().toLowerCase() === (f.name || '').trim().toLowerCase() && 
          (item.club || '').trim().toLowerCase() === (f.club || '').trim().toLowerCase()
        );
        
        let totalWins = 0;
        let totalLosses = 0;
        let totalPoints = 0;
        matches.forEach(m => {
          totalWins += (m.wins || 0);
          totalLosses += (m.losses || 0);
          totalPoints += (m.points || 0);
        });

        filteredFighters.push({
          ...f,
          wins: totalWins,
          losses: totalLosses,
          points: totalPoints
        });
      }
    });
  }

  document.getElementById('fighter-list-count').innerText = `${filteredFighters.length} ${filteredFighters.length === 1 ? 'Competitor' : 'Competitors'}`;

  if (filteredFighters.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; width: 100%;">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 48px; height: 48px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        <p>No fighters found in this category. Go ahead and add some competitors!</p>
      </div>
    `;
    return;
  }

  filteredFighters.forEach(f => {
    const initials = f.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const card = document.createElement('div');
    card.className = 'fighter-card';
    card.style.cursor = 'pointer';
    card.innerHTML = `
      <div class="fighter-card-actions">
        <button class="action-btn-icon" onclick="event.stopPropagation(); openFighterModal('${f.id}')" title="Edit Competitor">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="action-btn-icon delete" onclick="event.stopPropagation(); deleteFighter('${f.id}')" title="Remove Competitor">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
      <div class="fighter-avatar" style="overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); position: relative;">
        ${f.photo ? `<img src="${f.photo}" style="width: 100%; height: 100%; object-fit: cover;">` : `<span class="fighter-avatar-initials">${initials}</span>`}
      </div>
      <div class="fighter-card-name">${f.name}</div>
      <div class="fighter-card-club">${f.club}</div>
      <span class="belt-badge belt-${f.belt}">${f.belt} Belt</span>
      
      <div class="fighter-card-stats">
        <div class="fighter-stat-item">
          <span>${f.wins}</span>Wins
        </div>
        <div class="fighter-stat-item" style="border-left: 1px solid var(--border-color); border-right: 1px solid var(--border-color); padding: 0 0.75rem;">
          <span>${f.losses}</span>Losses
        </div>
        <div class="fighter-stat-item">
          <span>${f.points}</span>Points
        </div>
      </div>
    `;
    card.addEventListener('click', () => {
      openPlayerProfileModal(f.id);
    });
    grid.appendChild(card);
  });
  updateAdminControlStates();
}

function deleteFighter(id) {
  const f = state.fighters.find(item => item.id === id);
  if (!f) return;
  
  // Find linked records
  const linked = state.fighters.filter(item => 
    item.id !== id && 
    (item.name || '').trim().toLowerCase() === (f.name || '').trim().toLowerCase() && 
    (item.club || '').trim().toLowerCase() === (f.club || '').trim().toLowerCase()
  );

  let message = "Are you sure you want to remove this competitor? This will clear them from brackets and leaderboards.";
  let removeAll = false;
  if (linked.length > 0) {
    if (confirm(message + "\n\nThis competitor is also registered in other divisions. Click OK to remove them from ALL divisions, or Cancel to only remove them from the current division.")) {
      removeAll = true;
    }
  } else {
    if (!confirm(message)) {
      return;
    }
  }

  const idsToRemove = removeAll ? [id, ...linked.map(l => l.id)] : [id];
  state.fighters = state.fighters.filter(item => !idsToRemove.includes(item.id));
  
  // Clear scheduled match references if any
  state.matches.forEach(m => {
    if (idsToRemove.includes(m.fighterAId)) m.fighterAId = null;
    if (idsToRemove.includes(m.fighterBId)) m.fighterBId = null;
  });

  showToast(removeAll ? "Competitor removed from all divisions!" : "Competitor profile deleted successfully from division.", "info");
  saveState();
  if (typeof renderFightersView === 'function') renderFightersView();
  if (typeof renderCredentialsView === 'function') renderCredentialsView();
}

// 3. Brackets View
function renderBracketsView() {
  const catSelect = document.getElementById('bracket-division-select');
  if (catSelect.value) {
    renderBracketsTree(catSelect.value);
  } else {
    // Select first category by default if available
    if (state.categories.length > 0) {
      catSelect.value = state.categories[0].id;
      renderBracketsTree(state.categories[0].id);
    } else {
      document.getElementById('bracket-tree-container').innerHTML = `
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 5v4h10V5H7m11-2H6c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"/></svg>
          <p>Please create a Division and register competitors before generating tournament trees.</p>
        </div>
      `;
    }
  }
}

function renderBracketsTree(categoryId) {
  // Update the breadcrumb banner details
  updateBracketBanner(categoryId);

  const container = document.getElementById('bracket-tree-container');
  container.innerHTML = '';

  const catMatches = state.matches.filter(m => m.categoryId === categoryId && m.round > 0);
  
  if (catMatches.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 48px; height: 48px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        <p>No brackets generated for this division yet. Let's build a tournament tree!</p>
        <p style="font-size: 0.8rem; color: var(--text-muted);">Ensure you have registered at least 2 fighters in this division.</p>
        <button class="btn btn-secondary btn-sm" id="bracket-empty-add-fighter-btn" style="margin-top: 0.75rem; border: 1px solid rgba(124, 58, 237, 0.3); display: inline-flex; align-items: center; gap: 0.25rem;">
          <span>➕</span> Add Competitor to Division
        </button>
      </div>
    `;
    return;
  }

  // Get max round number
  const totalRounds = Math.max(...catMatches.map(m => m.round));
  
  // Draw columns round by round
  for (let r = 1; r <= totalRounds; r++) {
    const roundCol = document.createElement('div');
    roundCol.className = 'bracket-round-col';
    
    // Round titles
    let title = `Round ${r}`;
    if (r === totalRounds) title = "Championship";
    else if (r === totalRounds - 1) title = "Semi-Finals";
    else if (r === totalRounds - 2) title = "Quarter-Finals";

    roundCol.innerHTML = `<div class="round-col-header">${title}</div>`;

    const roundMatches = catMatches.filter(m => m.round === r).sort((a, b) => a.matchNumber - b.matchNumber);
    
    roundMatches.forEach(m => {
      const fA = state.fighters.find(f => f.id === m.fighterAId);
      const fB = state.fighters.find(f => f.id === m.fighterBId);

      const nameA = fA ? fA.name : (m.fighterAId === 'BYE' ? 'BYE' : 'TBD');
      const nameB = fB ? fB.name : (m.fighterBId === 'BYE' ? 'BYE' : 'TBD');

      const showActionA = (m.fighterAId !== 'BYE' && m.fighterAId !== null);
      const actionHTML_A = showActionA 
        ? `<button class="btn-clear-slot" title="Clear Slot" data-slot="fighterAId">❌</button>` 
        : (m.fighterAId !== 'BYE' ? `<button class="btn-assign-slot" title="Assign Competitor" data-slot="fighterAId">➕</button>` : '');

      const showActionB = (m.fighterBId !== 'BYE' && m.fighterBId !== null);
      const actionHTML_B = showActionB 
        ? `<button class="btn-clear-slot" title="Clear Slot" data-slot="fighterBId">❌</button>` 
        : (m.fighterBId !== 'BYE' ? `<button class="btn-assign-slot" title="Assign Competitor" data-slot="fighterBId">➕</button>` : '');

      const isWinnerA = m.winnerId && m.winnerId === m.fighterAId;
      const isWinnerB = m.winnerId && m.winnerId === m.fighterBId;

      const liveClass = m.status === 'live' ? 'status-match-live' : '';
      const compClass = m.status === 'completed' ? 'status-match-completed' : '';

      const node = document.createElement('div');
      node.className = `bracket-match-node ${liveClass} ${compClass}`;
      node.setAttribute('data-match-id', m.id);
      node.innerHTML = `
        <div class="bracket-match-node-header">
          <span>Match ${m.matchNumber}</span>
          <div class="bracket-node-actions">
            <button class="btn-node-edit" title="Edit Matchup">✏️</button>
            <button class="btn-node-delete" title="Delete Match">🗑️</button>
          </div>
          <span>Mat ${m.mat || '-'}</span>
        </div>
        <div class="bracket-fighter-node ${isWinnerA ? 'is-winner' : ''} ${m.fighterAId === 'BYE' ? 'is-bye' : ''}" 
             draggable="${showActionA ? 'true' : 'false'}" 
             data-match-id="${m.id}" 
             data-slot="fighterAId">
          <span style="max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            🔴 Aka: ${nameA}
          </span>
          <div class="fighter-slot-actions">
            ${actionHTML_A}
          </div>
          <span class="bracket-score-pill">${m.scoreA}</span>
        </div>
        <div class="bracket-fighter-node ${isWinnerB ? 'is-winner' : ''} ${m.fighterBId === 'BYE' ? 'is-bye' : ''}" 
             draggable="${showActionB ? 'true' : 'false'}" 
             data-match-id="${m.id}" 
             data-slot="fighterBId">
          <span style="max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            🔵 Ao: ${nameB}
          </span>
          <div class="fighter-slot-actions">
            ${actionHTML_B}
          </div>
          <span class="bracket-score-pill">${m.scoreB}</span>
        </div>
      `;

      // Connectors
      if (r < totalRounds) {
        const conn = document.createElement('div');
        conn.className = 'connector-right';
        node.appendChild(conn);
      }

      // Click to open scorecard modal (ignore button clicks)
      node.addEventListener('click', (e) => {
        if (e.target.closest('.btn-node-edit') || e.target.closest('.btn-node-delete') || 
            e.target.closest('.btn-clear-slot') || e.target.closest('.btn-assign-slot')) {
          return;
        }
        if (m.fighterAId !== 'BYE' && m.fighterBId !== 'BYE') {
          openScorecardModal(m.id);
        } else {
          openScorecardModal(m.id, true);
        }
      });

      // Bind button events inside node directly
      const editBtn = node.querySelector('.btn-node-edit');
      if (editBtn) {
        editBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openScorecardModal(m.id, true);
        });
      }

      const deleteBtn = node.querySelector('.btn-node-delete');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          deleteMatch(m.id);
        });
      }

      const clearBtnA = node.querySelector('.btn-clear-slot[data-slot="fighterAId"]');
      if (clearBtnA) {
        clearBtnA.addEventListener('click', (e) => {
          e.stopPropagation();
          clearFighterSlot(m.id, 'fighterAId');
        });
      }

      const assignBtnA = node.querySelector('.btn-assign-slot[data-slot="fighterAId"]');
      if (assignBtnA) {
        assignBtnA.addEventListener('click', (e) => {
          e.stopPropagation();
          openScorecardModal(m.id, true);
        });
      }

      const clearBtnB = node.querySelector('.btn-clear-slot[data-slot="fighterBId"]');
      if (clearBtnB) {
        clearBtnB.addEventListener('click', (e) => {
          e.stopPropagation();
          clearFighterSlot(m.id, 'fighterBId');
        });
      }

      const assignBtnB = node.querySelector('.btn-assign-slot[data-slot="fighterBId"]');
      if (assignBtnB) {
        assignBtnB.addEventListener('click', (e) => {
          e.stopPropagation();
          openScorecardModal(m.id, true);
        });
      }

      // Drag and Drop Event Binds
      node.querySelectorAll('.bracket-fighter-node[draggable="true"]').forEach(elem => {
        elem.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', JSON.stringify({
            matchId: elem.getAttribute('data-match-id'),
            slot: elem.getAttribute('data-slot'),
            fighterId: elem.getAttribute('data-slot') === 'fighterAId' ? m.fighterAId : m.fighterBId
          }));
          elem.classList.add('dragging');
        });
        
        elem.addEventListener('dragend', (e) => {
          elem.classList.remove('dragging');
        });
      });

      node.querySelectorAll('.bracket-fighter-node').forEach(elem => {
        elem.addEventListener('dragover', (e) => {
          e.preventDefault();
          elem.classList.add('drag-hover');
        });
        
        elem.addEventListener('dragleave', () => {
          elem.classList.remove('drag-hover');
        });
        
        elem.addEventListener('drop', (e) => {
          e.preventDefault();
          elem.classList.remove('drag-hover');
          try {
            const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
            handleFighterDrop(dragData, elem.getAttribute('data-match-id'), elem.getAttribute('data-slot'));
          } catch(err) {
            console.error("Drop error", err);
          }
        });
      });

      node.addEventListener('dragover', (e) => {
        e.preventDefault();
        node.classList.add('drag-hover');
      });

      node.addEventListener('dragleave', () => {
        node.classList.remove('drag-hover');
      });

      node.addEventListener('drop', (e) => {
        e.preventDefault();
        node.classList.remove('drag-hover');
        try {
          const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
          handleFighterMatchDrop(dragData, m.id);
        } catch(err) {
          console.error("Match drop error", err);
        }
      });

      roundCol.appendChild(node);
    });

    container.appendChild(roundCol);
  }
}

// ================= BRACKETS INTERACTIVE DRAG & DROP HANDLERS =================

function handleFighterDrop(dragData, targetMatchId, targetSlot) {
  const { matchId: srcMatchId, slot: srcSlot, fighterId } = dragData;
  if (!fighterId) return;

  // If dropped on same slot, do nothing
  if (srcMatchId === targetMatchId && srcSlot === targetSlot) return;

  const srcMatch = state.matches.find(m => m.id === srcMatchId);
  const targetMatch = state.matches.find(m => m.id === targetMatchId);

  if (!srcMatch || !targetMatch) return;

  if (targetMatchId === srcMatch.nextMatchId) {
    // Declaring winner of srcMatch!
    setMatchWinnerDirectly(srcMatchId, fighterId);
    return;
  }

  // Swap / Reassignment
  const targetFighterId = targetMatch[targetSlot];

  srcMatch[srcSlot] = targetFighterId;
  targetMatch[targetSlot] = fighterId;

  // Recursive self-healing of downstream paths
  healMatchDownstream(srcMatch);
  healMatchDownstream(targetMatch);

  saveState();
  renderBracketsTree(srcMatch.categoryId);
  showToast("Competitors swapped successfully! Downstream matches healed.", "success");
}

function handleFighterMatchDrop(dragData, targetMatchId) {
  const { matchId: srcMatchId, slot: srcSlot, fighterId } = dragData;
  if (!fighterId) return;

  const srcMatch = state.matches.find(m => m.id === srcMatchId);
  if (!srcMatch) return;

  // Check if targetMatchId is the upcoming/next match
  if (targetMatchId === srcMatch.nextMatchId) {
    setMatchWinnerDirectly(srcMatchId, fighterId);
  } else {
    showToast("To assign to a different match, drag and drop directly onto the Aka or Ao slot.", "info");
  }
}

function setMatchWinnerDirectly(matchId, fighterId) {
  const m = state.matches.find(match => match.id === matchId);
  if (!m) return;

  // Ensure fighterId is one of the competitors in this match
  if (m.fighterAId !== fighterId && m.fighterBId !== fighterId) {
    showToast("Fighter must be a participant in this match to be declared winner!", "warning");
    return;
  }

  // Clear previous stats if this match was already completed with a different winner
  if (m.status === 'completed' && m.winnerId !== fighterId) {
    const oldWinnerId = m.winnerId;
    const oldLoserId = oldWinnerId === m.fighterAId ? m.fighterBId : m.fighterAId;
    
    const prevWinner = state.fighters.find(f => f.id === oldWinnerId);
    if (prevWinner) {
      prevWinner.wins = Math.max(0, prevWinner.wins - 1);
      prevWinner.points = Math.max(0, prevWinner.points - (oldWinnerId === m.fighterAId ? m.scoreA : m.scoreB));
    }
    const prevLoser = state.fighters.find(f => f.id === oldLoserId);
    if (prevLoser) {
      prevLoser.losses = Math.max(0, prevLoser.losses - 1);
      prevLoser.points = Math.max(0, prevLoser.points - (oldWinnerId === m.fighterAId ? m.scoreB : m.scoreA));
    }
  }

  // If not already completed with this winner
  if (m.winnerId !== fighterId) {
    m.winnerId = fighterId;
    m.status = 'completed';
    
    // Default score: winner gets 1
    if (m.fighterAId === fighterId) {
      if (m.scoreA <= m.scoreB) {
        m.scoreA = Math.max(m.scoreA, m.scoreB + 1);
      }
    } else {
      if (m.scoreB <= m.scoreA) {
        m.scoreB = Math.max(m.scoreB, m.scoreA + 1);
      }
    }

    // Assign new stats
    const winnerFighter = state.fighters.find(f => f.id === fighterId);
    const loserFighterId = m.fighterAId === fighterId ? m.fighterBId : m.fighterAId;
    const loserFighter = state.fighters.find(f => f.id === loserFighterId);
    
    if (winnerFighter) {
      winnerFighter.wins++;
      winnerFighter.points += (m.fighterAId === fighterId ? m.scoreA : m.scoreB);
    }
    if (loserFighter) {
      loserFighter.losses++;
      loserFighter.points += (m.fighterAId === fighterId ? m.scoreB : m.scoreA);
    }

    // Propagate winner
    if (m.nextMatchId) {
      propagateWinner(m.nextMatchId, m.positionInNextMatch, fighterId);
      showToast(`${winnerFighter ? winnerFighter.name : 'Competitor'} advanced to next round!`, "success");
    } else {
      showToast("Championship completed! Champion crowned!", "success");
    }
    
    saveState();
    renderBracketsTree(m.categoryId);
  }
}

function healMatchDownstream(m) {
  if (!m) return;
  
  if (m.winnerId) {
    const prevWinner = state.fighters.find(f => f.id === m.winnerId);
    if (prevWinner) {
      prevWinner.wins = Math.max(0, prevWinner.wins - 1);
      prevWinner.points = Math.max(0, prevWinner.points - (m.winnerId === m.fighterAId ? m.scoreA : m.scoreB));
    }
    const loserFighterId = m.winnerId === m.fighterAId ? m.fighterBId : m.fighterAId;
    const prevLoser = state.fighters.find(f => f.id === loserFighterId);
    if (prevLoser) {
      prevLoser.losses = Math.max(0, prevLoser.losses - 1);
      prevLoser.points = Math.max(0, prevLoser.points - (m.winnerId === m.fighterAId ? m.scoreB : m.scoreA));
    }
  }

  m.scoreA = 0;
  m.scoreB = 0;
  m.winnerId = null;
  m.status = 'scheduled';

  // Propagate null forward to clear downstream matches
  if (m.nextMatchId) {
    propagateWinner(m.nextMatchId, m.positionInNextMatch, null);
    
    // Recursively heal downstream matches!
    const nextMatch = state.matches.find(next => next.id === m.nextMatchId);
    if (nextMatch) {
      healMatchDownstream(nextMatch);
    }
  }

  // If this match now has a BYE, resolve it immediately!
  checkAndResolveByeMatch(m);
}

// Update Bracket Banner Details dynamically
function updateBracketBanner(categoryId) {
  // Main event name
  const bannerEventName = document.getElementById('bracket-banner-event-name');
  if (bannerEventName) {
    bannerEventName.textContent = state.eventName || "KumiteMaster Championship";
  }

  // Event metadata details
  const bannerLocation = document.getElementById('bracket-banner-location');
  if (bannerLocation) {
    bannerLocation.textContent = `📍 ${state.eventLocation || "Tokyo Budokan, JP"}`;
  }
  const bannerTime = document.getElementById('bracket-banner-time');
  if (bannerTime) {
    bannerTime.textContent = `🕒 ${state.eventTime || "09:00 AM"}`;
  }
  const bannerDateBadge = document.getElementById('bracket-banner-date-badge');
  if (bannerDateBadge) {
    bannerDateBadge.textContent = state.eventDate || "May 25, 2026";
  }

  const cat = state.categories.find(c => c.id === categoryId);
  const bannerDivName = document.getElementById('bracket-banner-division-name');
  const bannerWinnerName = document.getElementById('bracket-banner-winner-name');

  if (cat) {
    const catMatches = state.matches.filter(m => m.categoryId === categoryId && m.round > 0);
    if (bannerDivName) {
      bannerDivName.textContent = `${cat.name} (${catMatches.length} Matches)`;
    }

    if (catMatches.length > 0) {
      const maxRound = Math.max(...catMatches.map(m => m.round));
      const champMatch = catMatches.find(m => m.round === maxRound);
      if (champMatch) {
        if (champMatch.status === 'completed' && champMatch.winnerId) {
          const winnerFighter = state.fighters.find(f => f.id === champMatch.winnerId);
          const winnerName = winnerFighter ? winnerFighter.name : champMatch.winnerId;
          if (bannerWinnerName) {
            bannerWinnerName.textContent = `Winner: ${winnerName}`;
            bannerWinnerName.style.color = 'var(--gold)';
          }
        } else if (champMatch.status === 'live' || catMatches.some(m => m.status === 'live' || m.status === 'completed')) {
          if (bannerWinnerName) {
            bannerWinnerName.textContent = `Winner: In Progress`;
            bannerWinnerName.style.color = 'var(--accent)';
          }
        } else {
          if (bannerWinnerName) {
            bannerWinnerName.textContent = `Winner: TBD`;
            bannerWinnerName.style.color = 'var(--text-muted)';
          }
        }
      } else {
        if (bannerWinnerName) {
          bannerWinnerName.textContent = `Winner: -`;
          bannerWinnerName.style.color = 'var(--text-muted)';
        }
      }
    } else {
      if (bannerWinnerName) {
        bannerWinnerName.textContent = `Winner: -`;
        bannerWinnerName.style.color = 'var(--text-muted)';
      }
    }
  } else {
    if (bannerDivName) {
      bannerDivName.textContent = `Select Division`;
    }
    if (bannerWinnerName) {
      bannerWinnerName.textContent = `Winner: -`;
      bannerWinnerName.style.color = 'var(--text-muted)';
    }
  }
}

// Delete custom or bracket match with self-healing
function deleteMatch(matchId) {
  const confirmDelete = confirm("Are you sure you want to delete this match from the bracket?");
  if (!confirmDelete) return;

  const m = state.matches.find(item => item.id === matchId);
  if (!m) return;

  // Propagate null to child match if it exists
  if (m.nextMatchId) {
    propagateWinner(m.nextMatchId, m.positionInNextMatch, null);
  }

  // Find parent matches pointing to this match, and set their nextMatchId to null
  state.matches.forEach(parentMatch => {
    if (parentMatch.nextMatchId === matchId) {
      parentMatch.nextMatchId = null;
      parentMatch.positionInNextMatch = null;
    }
  });

  // Remove the match from state.matches
  state.matches = state.matches.filter(item => item.id !== matchId);

  saveState();
  showToast("Match successfully deleted and bracket healed.", "success");
}

// Clear fighter slot in brackets with self-healing
function clearFighterSlot(matchId, slotProp) {
  const m = state.matches.find(item => item.id === matchId);
  if (!m) return;
  
  const confirmClear = confirm(`Are you sure you want to clear this competitor slot?`);
  if (!confirmClear) return;
  
  m[slotProp] = null;
  if (slotProp === 'fighterAId') {
    m.scoreA = 0;
  } else {
    m.scoreB = 0;
  }
  
  m.winnerId = null;
  m.status = 'scheduled';
  
  // Recursively propagate null downstream
  if (m.nextMatchId) {
    propagateWinner(m.nextMatchId, m.positionInNextMatch, null);
  }
  
  saveState();
  showToast("Competitor slot cleared and downstream bracket updated.", "success");
}

// High-fidelity image compression for large background banners
function compressBannerPhoto(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      let width = img.width;
      let height = img.height;
      const maxDim = 800;
      
      if (width > height) {
        if (width > maxDim) {
          height = Math.round(height * (maxDim / width));
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round(width * (maxDim / height));
          height = maxDim;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx.drawImage(img, 0, 0, width, height);
      const isPng = file.type === 'image/png';
      const compressedDataUrl = canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', isPng ? undefined : 0.6);
      callback(compressedDataUrl);
    };
  };
}

function compressBadgeLogo(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      let width = img.width;
      let height = img.height;
      const maxDim = 128;
      
      if (width > height) {
        if (width > maxDim) {
          height = Math.round(height * (maxDim / width));
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round(width * (maxDim / height));
          height = maxDim;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx.drawImage(img, 0, 0, width, height);
      const isPng = file.type === 'image/png';
      const compressedDataUrl = canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', isPng ? undefined : 0.7);
      callback(compressedDataUrl);
    };
  };
}

function compressBgImage(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      let width = img.width;
      let height = img.height;
      const maxDim = 800;
      
      if (width > height) {
        if (width > maxDim) {
          height = Math.round(height * (maxDim / width));
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round(width * (maxDim / height));
          height = maxDim;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx.drawImage(img, 0, 0, width, height);
      const isPng = file.type === 'image/png';
      const compressedDataUrl = canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', isPng ? undefined : 0.65);
      callback(compressedDataUrl);
    };
  };
}

// 4. Scheduler View
function renderSchedulerView() {
  const container = document.getElementById('tatami-mats-container');
  if (!container) return;
  container.innerHTML = '';

  // Dynamically generate Tatami lane columns
  state.tatamis.forEach(t => {
    const lane = document.createElement('div');
    lane.className = `tatami-lane tatami-${t.id}`;
    lane.id = `tatami-lane-${t.id}`;
    lane.innerHTML = `
      <div class="tatami-header">
        <span class="tatami-title">
          <span class="tatami-dot"></span>
          ${t.name}
        </span>
        <span class="category-badge-count" id="tatami-count-${t.id}">0 matches</span>
      </div>
      <div class="tatami-card-list" id="tatami-list-${t.id}"></div>
    `;
    container.appendChild(lane);
  });

  const schedMatches = state.matches.filter(m => m.status !== 'completed' || m.round > 0);

  // Initialize counts
  let counts = {};
  state.tatamis.forEach(t => {
    counts[t.id] = 0;
  });

  schedMatches.forEach(m => {
    // Only schedule if mat exists in active state.tatamis list
    const hasMat = state.tatamis.some(t => t.id === m.mat);
    if (!hasMat) return;

    const fA = state.fighters.find(f => f.id === m.fighterAId);
    const fB = state.fighters.find(f => f.id === m.fighterBId);
    
    // Ignore Byes from scheduling lane since they resolved automatically
    if (m.fighterAId === 'BYE' || m.fighterBId === 'BYE') return;

    counts[m.mat]++;

    const nameA = fA ? fA.name : 'TBD';
    const nameB = fB ? fB.name : 'TBD';

    const cat = state.categories.find(c => c.id === m.categoryId);
    const statusText = m.status === 'live' ? 'Live' : (m.status === 'completed' ? 'Finished' : 'Scheduled');
    const badgeClass = m.status === 'live' ? 'status-live' : (m.status === 'completed' ? 'status-completed' : 'status-scheduled');

    const card = document.createElement('div');
    card.className = 'match-schedule-card';
    card.innerHTML = `
      <div class="match-schedule-header">
        <span>Mat ${m.mat} • ${m.dateScheduled || 'Exhibition'}</span>
        <span class="match-status-badge ${badgeClass}">${statusText}</span>
      </div>
      <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; margin-bottom: 0.4rem;">
        ${cat ? cat.name : 'Tournament Division'}
      </div>
      <div class="match-schedule-fighters">
        <div class="schedule-fighter-row ${m.winnerId && m.winnerId === m.fighterAId ? 'winner-row' : ''}">
          <span>🔴 Aka: ${nameA}</span>
          <span class="schedule-fighter-score">${m.scoreA}</span>
        </div>
        <div class="schedule-fighter-row ${m.winnerId && m.winnerId === m.fighterBId ? 'winner-row' : ''}">
          <span>🔵 Ao: ${nameB}</span>
          <span class="schedule-fighter-score">${m.scoreB}</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openScorecardModal(m.id));
    
    const listEl = document.getElementById(`tatami-list-${m.mat}`);
    if (listEl) {
      listEl.appendChild(card);
    }
  });

  // Display counters and empty states
  state.tatamis.forEach(t => {
    const countEl = document.getElementById(`tatami-count-${t.id}`);
    if (countEl) {
      countEl.innerText = `${counts[t.id]} matches`;
    }

    const listEl = document.getElementById(`tatami-list-${t.id}`);
    if (listEl && listEl.children.length === 0) {
      listEl.innerHTML = `
        <div class="empty-state" style="padding: 1.5rem 1rem;">
          <p style="font-size: 0.8rem;">No active matches assigned to ${t.name}.</p>
        </div>
      `;
    }
  });
  updateAdminControlStates();
}

// Auto Assign Scheduler Match Algorithm
function handleAutoSchedule() {
  if (state.tatamis.length === 0) {
    showToast("No active Tatami mats registered! Please add a Tatami first.", "warning");
    return;
  }

  const activeUnscheduled = state.matches.filter(m => m.status === 'scheduled' && (m.fighterAId !== 'BYE' && m.fighterBId !== 'BYE'));
  if (activeUnscheduled.length === 0) {
    showToast("All current matches already assigned to Tatami mats!", "info");
    return;
  }

  activeUnscheduled.forEach((m, idx) => {
    // Distribute matches evenly across available Tatamis list
    const tatamiIdx = idx % state.tatamis.length;
    m.mat = state.tatamis[tatamiIdx].id;
  });

  showToast(`Auto assigned ${activeUnscheduled.length} matches evenly across registered Tatamis.`, "success");
  saveState();
}

// 5. Rankings & Leaderboards
function renderRankingsView() {
  const select = document.getElementById('rankings-division-select');
  if (select.value) {
    renderRankingsTable(select.value);
  } else {
    select.value = 'ALL';
    renderRankingsTable('ALL');
  }
  renderDojoRankings();
}

function renderRankingsTable(categoryId) {
  const tbody = document.getElementById('rankings-table-body');
  tbody.innerHTML = '';

  const catFighters = categoryId === 'ALL' ? state.fighters : state.fighters.filter(f => f.categoryId === categoryId);
  
  if (catFighters.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-state">
            <p>No registered fighters in this division yet.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  // Sorting Formula:
  // 1. By Wins (Descending)
  // 2. By total Points Scored (Descending)
  // 3. By Losses (Ascending)
  const sorted = [...catFighters].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.points !== a.points) return b.points - a.points;
    return a.losses - b.losses;
  });

  sorted.forEach((f, idx) => {
    const rank = idx + 1;
    let rankClass = '';
    if (rank === 1) rankClass = 'rank-1';
    else if (rank === 2) rankClass = 'rank-2';
    else if (rank === 3) rankClass = 'rank-3';

    const initials = f.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
    const matchesCount = f.wins + f.losses;

    const cat = state.categories.find(c => c.id === f.categoryId);
    const divisionSub = categoryId === 'ALL' && cat ? `<span style="font-size: 0.72rem; color: var(--text-muted); display: block; margin-top: 0.15rem; font-weight: 500;">${cat.name}</span>` : '';

    const row = document.createElement('tr');
    row.className = rankClass;
    row.innerHTML = `
      <td style="text-align: center;">
        <div class="rank-number">${rank}</div>
      </td>
      <td>
        <div class="rankings-fighter-profile">
          <div class="rankings-fighter-avatar" style="overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); position: relative;">${f.photo ? `<img src="${f.photo}" style="width: 100%; height: 100%; object-fit: cover;">` : initials}</div>
          <div>
            <div style="font-weight: 700;">${f.name}</div>
            <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
              <span class="belt-badge belt-${f.belt}" style="margin: 0.15rem 0 0 0; font-size:0.6rem; padding:0.1rem 0.4rem;">${f.belt}</span>
              ${divisionSub}
            </div>
          </div>
        </div>
      </td>
      <td>${f.club}</td>
      <td style="text-align: center; font-weight: 600;">${matchesCount}</td>
      <td style="text-align: center; font-weight: 700; color: var(--accent);">${f.wins}</td>
      <td style="text-align: center; font-weight: 700; color: #f87171;">${f.losses}</td>
      <td style="text-align: center; font-weight: 800; color: var(--gold); font-family: var(--font-title); font-size:1.1rem;">
        ${f.points}
      </td>
    `;
    row.addEventListener('click', () => {
      openPlayerProfileModal(f.id);
    });
    tbody.appendChild(row);
  });
}

function renderDojoRankings() {
  const tbody = document.getElementById('rankings-dojos-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  const dojoStats = {};

  state.categories.forEach(cat => {
    const winners = getDivisionWinners(cat.id);
    if (winners.gold && winners.gold.club) {
      const club = winners.gold.club.trim();
      if (club) {
        const key = club.toLowerCase();
        if (!dojoStats[key]) {
          dojoStats[key] = { name: club, gold: 0, silver: 0, bronze: 0 };
        }
        dojoStats[key].gold++;
      }
    }
    if (winners.silver && winners.silver.club) {
      const club = winners.silver.club.trim();
      if (club) {
        const key = club.toLowerCase();
        if (!dojoStats[key]) {
          dojoStats[key] = { name: club, gold: 0, silver: 0, bronze: 0 };
        }
        dojoStats[key].silver++;
      }
    }
    if (winners.bronze1 && winners.bronze1.club) {
      const club = winners.bronze1.club.trim();
      if (club) {
        const key = club.toLowerCase();
        if (!dojoStats[key]) {
          dojoStats[key] = { name: club, gold: 0, silver: 0, bronze: 0 };
        }
        dojoStats[key].bronze++;
      }
    }
    if (winners.bronze2 && winners.bronze2.club) {
      const club = winners.bronze2.club.trim();
      if (club) {
        const key = club.toLowerCase();
        if (!dojoStats[key]) {
          dojoStats[key] = { name: club, gold: 0, silver: 0, bronze: 0 };
        }
        dojoStats[key].bronze++;
      }
    }
  });

  const dojosArray = Object.values(dojoStats);

  if (dojosArray.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-state">
            <p>No club standings available yet. Complete brackets and assign gold/silver/bronze winners to see rankings.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  dojosArray.forEach(d => {
    d.totalPoints = (d.gold * 5) + (d.silver * 3) + (d.bronze * 1);
    d.totalMedals = d.gold + d.silver + d.bronze;
  });

  dojosArray.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.gold !== a.gold) return b.gold - a.gold;
    if (b.silver !== a.silver) return b.silver - a.silver;
    if (b.bronze !== a.bronze) return b.bronze - a.bronze;
    return a.name.localeCompare(b.name);
  });

  dojosArray.forEach((d, idx) => {
    const rank = idx + 1;
    let rankClass = '';
    if (rank === 1) rankClass = 'rank-1';
    else if (rank === 2) rankClass = 'rank-2';
    else if (rank === 3) rankClass = 'rank-3';

    const row = document.createElement('tr');
    row.className = rankClass;
    row.innerHTML = `
      <td style="text-align: center;">
        <div class="rank-number">${rank}</div>
      </td>
      <td style="font-weight: 700; color: var(--text-main); font-size: 0.92rem;">
        🏢 ${d.name}
      </td>
      <td style="text-align: center; font-weight: 700; color: #f59e0b;">${d.gold}</td>
      <td style="text-align: center; font-weight: 700; color: #9ca3af;">${d.silver}</td>
      <td style="text-align: center; font-weight: 700; color: #b45309;">${d.bronze}</td>
      <td style="text-align: center; font-weight: 600;">${d.totalMedals}</td>
      <td style="text-align: center; font-weight: 800; color: var(--gold); font-family: var(--font-title); font-size: 1.15rem;">
        ${d.totalPoints}
      </td>
    `;
    tbody.appendChild(row);
  });
}

// 6. Winners Podium View
function renderWinnersView() {
  const select = document.getElementById('winners-division-select');
  if (select.value) {
    renderPodiumDisplay(select.value);
  } else {
    if (state.categories.length > 0) {
      select.value = state.categories[0].id;
      renderPodiumDisplay(state.categories[0].id);
    } else {
      document.getElementById('podium-display-wrapper').innerHTML = `
        <div class="empty-state" style="width:100%">
          <p>Please register categories and complete brackets to view the Podium champions.</p>
        </div>
      `;
    }
  }
}

function renderPodiumDisplay(categoryId) {
  const wrapper = document.getElementById('podium-display-wrapper');
  wrapper.innerHTML = '';

  const catMatches = state.matches.filter(m => m.categoryId === categoryId && m.round > 0);
  
  if (catMatches.length === 0) {
    wrapper.innerHTML = `
      <div class="empty-state" style="width: 100%;">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 48px; height: 48px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        <p>No tournament logs found. Make brackets for this division and mark the final game completed!</p>
      </div>
    `;
    return;
  }

  // Find championship match (highest round)
  const totalRounds = Math.max(...catMatches.map(m => m.round));
  const finalMatch = catMatches.find(m => m.round === totalRounds);

  if (!finalMatch || finalMatch.status !== 'completed' || !finalMatch.winnerId) {
    wrapper.innerHTML = `
      <div class="empty-state" style="width: 100%;">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 48px; height: 48px; color: var(--gold);"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <p>Tournament is in progress! Complete the final Match (Round ${totalRounds}) to crown the champions.</p>
      </div>
    `;
    return;
  }

  // 1st Place: Winner of final match
  const goldFighter = state.fighters.find(f => f.id === finalMatch.winnerId);
  
  // 2nd Place: Loser of final match
  const runnerUpId = finalMatch.winnerId === finalMatch.fighterAId ? finalMatch.fighterBId : finalMatch.fighterAId;
  const silverFighter = state.fighters.find(f => f.id === runnerUpId);

  // 3rd Place: The losing semi-finalists (karate singles always has two Bronze places)
  const semiRound = totalRounds - 1;
  const semiMatches = catMatches.filter(m => m.round === semiRound);
  let bronzeFighter1 = null;
  let bronzeFighter2 = null;

  if (semiMatches.length > 0) {
    const semiLoserIds = [];
    semiMatches.forEach(m => {
      if (m.winnerId) {
        const loserId = m.winnerId === m.fighterAId ? m.fighterBId : m.fighterAId;
        if (loserId && loserId !== 'BYE') {
          semiLoserIds.push(loserId);
        }
      }
    });

    const semiLosers = state.fighters.filter(f => semiLoserIds.includes(f.id));
    if (semiLosers.length > 0) {
      bronzeFighter1 = semiLosers[0] || null;
      bronzeFighter2 = semiLosers[1] || null;
    }
  }

  // Generate Podium Visual HTML
  const goldInit = goldFighter ? goldFighter.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : '1';
  const silverInit = silverFighter ? silverFighter.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : '2';
  const bronze1Init = bronzeFighter1 ? bronzeFighter1.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : '3';
  const bronze2Init = bronzeFighter2 ? bronzeFighter2.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : '3';

  // 1. Gold Column (1st)
  const colGold = document.createElement('div');
  colGold.className = 'podium-column gold-column';
  colGold.innerHTML = `
    <div class="podium-fighter-info">
      <div class="podium-avatar-wrapper">
        <div class="podium-crown">👑</div>
        <div class="podium-fighter-avatar" style="overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); position: relative;">${goldFighter && goldFighter.photo ? `<img src="${goldFighter.photo}" style="width: 100%; height: 100%; object-fit: cover;">` : goldInit}</div>
      </div>
      <div class="podium-fighter-name">${goldFighter ? goldFighter.name : 'Unknown Champ'}</div>
      <span class="belt-badge belt-${goldFighter ? goldFighter.belt : 'black'}">${goldFighter ? goldFighter.belt : 'black'}</span>
      <div class="podium-fighter-sub">${goldFighter ? goldFighter.club : 'Dojo'}</div>
    </div>
    <div class="podium-block">1</div>
  `;

  // 2. Silver Column (2nd)
  const colSilver = document.createElement('div');
  colSilver.className = 'podium-column silver-column';
  colSilver.innerHTML = `
    <div class="podium-fighter-info">
      <div class="podium-avatar-wrapper">
        <div class="podium-fighter-avatar" style="overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); position: relative;">${silverFighter && silverFighter.photo ? `<img src="${silverFighter.photo}" style="width: 100%; height: 100%; object-fit: cover;">` : silverInit}</div>
      </div>
      <div class="podium-fighter-name">${silverFighter ? silverFighter.name : 'Runner Up'}</div>
      <span class="belt-badge belt-${silverFighter ? silverFighter.belt : 'brown'}">${silverFighter ? silverFighter.belt : 'brown'}</span>
      <div class="podium-fighter-sub">${silverFighter ? silverFighter.club : 'Dojo'}</div>
    </div>
    <div class="podium-block">2</div>
  `;

  // 3. Bronze Column 1 (3rd)
  const colBronze1 = document.createElement('div');
  colBronze1.className = 'podium-column bronze-column';
  colBronze1.innerHTML = `
    <div class="podium-fighter-info">
      <div class="podium-avatar-wrapper">
        <div class="podium-fighter-avatar" style="overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); position: relative;">${bronzeFighter1 && bronzeFighter1.photo ? `<img src="${bronzeFighter1.photo}" style="width: 100%; height: 100%; object-fit: cover;">` : bronze1Init}</div>
      </div>
      <div class="podium-fighter-name">${bronzeFighter1 ? bronzeFighter1.name : 'Semi Finalist'}</div>
      <span class="belt-badge belt-${bronzeFighter1 ? bronzeFighter1.belt : 'blue'}">${bronzeFighter1 ? bronzeFighter1.belt : 'blue'}</span>
      <div class="podium-fighter-sub">${bronzeFighter1 ? bronzeFighter1.club : 'Dojo'}</div>
    </div>
    <div class="podium-block">3</div>
  `;

  // 4. Bronze Column 2 (3rd)
  const colBronze2 = document.createElement('div');
  colBronze2.className = 'podium-column bronze-column';
  colBronze2.innerHTML = `
    <div class="podium-fighter-info">
      <div class="podium-avatar-wrapper">
        <div class="podium-fighter-avatar" style="overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); position: relative;">${bronzeFighter2 && bronzeFighter2.photo ? `<img src="${bronzeFighter2.photo}" style="width: 100%; height: 100%; object-fit: cover;">` : bronze2Init}</div>
      </div>
      <div class="podium-fighter-name">${bronzeFighter2 ? bronzeFighter2.name : 'Semi Finalist'}</div>
      <span class="belt-badge belt-${bronzeFighter2 ? bronzeFighter2.belt : 'blue'}">${bronzeFighter2 ? bronzeFighter2.belt : 'blue'}</span>
      <div class="podium-fighter-sub">${bronzeFighter2 ? bronzeFighter2.club : 'Dojo'}</div>
    </div>
    <div class="podium-block">3</div>
  `;

  wrapper.appendChild(colSilver);
  wrapper.appendChild(colGold);
  wrapper.appendChild(colBronze1);
  if (bronzeFighter2) {
    wrapper.appendChild(colBronze2);
  }

  // Trigger celebration particle effects!
  triggerConfetti();
}

function triggerConfetti() {
  const container = document.getElementById('podium-confetti-container');
  container.innerHTML = '';
  
  const colors = ['#f59e0b', '#7c3aed', '#10b981', '#ef4444', '#4f46e5', '#cbd5e1'];
  
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = `${Math.random() * 100}%`;
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animation = `fallConfetti ${Math.random() * 2 + 1.5}s linear forwards`;
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    container.appendChild(p);
  }
}

// ================= SCORECARD MODAL LOGIC =================

let activeScorecardMatchId = null;
let scorecardSelectedWinner = null; // 'A' or 'B'
let activeMatchObj = null;
let scorecardEditMode = false;

function openScorecardModal(matchId, forceEditMode = false) {
  const m = state.matches.find(item => item.id === matchId);
  if (!m) return;

  activeScorecardMatchId = matchId;
  activeMatchObj = m;
  scorecardEditMode = forceEditMode;

  // Restore standard displays and hide selectors
  document.getElementById('sc-fighter-a-name').style.display = forceEditMode ? 'none' : 'block';
  document.getElementById('sc-fighter-b-name').style.display = forceEditMode ? 'none' : 'block';
  document.getElementById('sc-fighter-a-select').style.display = forceEditMode ? 'block' : 'none';
  document.getElementById('sc-fighter-b-select').style.display = forceEditMode ? 'block' : 'none';
  
  const editBtn = document.getElementById('scorecard-edit-pairings-btn');
  if (editBtn) {
    if (forceEditMode) {
      editBtn.innerHTML = '💾 Save Pairings';
      editBtn.className = 'btn btn-primary btn-sm';
    } else {
      editBtn.innerHTML = '✏️ Edit Matchup';
      editBtn.className = 'btn btn-secondary btn-sm';
    }
  }

  const fA = state.fighters.find(f => f.id === m.fighterAId);
  const fB = state.fighters.find(f => f.id === m.fighterBId);

  // Fill scorecard modal fields
  document.getElementById('sc-fighter-a-name').innerText = fA ? fA.name : (m.fighterAId === 'BYE' ? 'BYE' : 'To Be Decided');
  document.getElementById('sc-fighter-a-club').innerText = fA ? fA.club : '-';
  
  const badgeA = document.getElementById('sc-fighter-a-belt');
  badgeA.className = `belt-badge belt-${fA ? fA.belt : 'white'}`;
  badgeA.innerText = fA ? fA.belt : 'White';

  document.getElementById('sc-fighter-b-name').innerText = fB ? fB.name : (m.fighterBId === 'BYE' ? 'BYE' : 'To Be Decided');
  document.getElementById('sc-fighter-b-club').innerText = fB ? fB.club : '-';
  
  const badgeB = document.getElementById('sc-fighter-b-belt');
  badgeB.className = `belt-badge belt-${fB ? fB.belt : 'white'}`;
  badgeB.innerText = fB ? fB.belt : 'White';

  // Fill scores
  document.getElementById('sc-score-a').value = m.scoreA;
  document.getElementById('sc-score-b').value = m.scoreB;

  // Fill match scheduled time
  const scTimeInput = document.getElementById('sc-time-input');
  if (scTimeInput) {
    scTimeInput.value = m.dateScheduled || '';
  }

  // Fill tatami mat selectors dynamically
  const scMatSelect = document.getElementById('sc-mat-select');
  if (scMatSelect) {
    scMatSelect.innerHTML = '<option value="0">Unassigned</option>';
    state.tatamis.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = t.name;
      scMatSelect.appendChild(opt);
    });
    scMatSelect.value = m.mat || '0';
  }

  document.getElementById('sc-status-select').value = m.status;

  // Fill referee selectors dynamically
  const scRefSelect = document.getElementById('sc-referee-select');
  if (scRefSelect) {
    scRefSelect.innerHTML = '<option value="">Unassigned Referee</option>';
    
    const referees = (state.staff || []).filter(s => {
      const roleLower = (s.role || '').toLowerCase();
      return roleLower.includes('referee') || roleLower.includes('ref');
    });

    const otherStaff = (state.staff || []).filter(s => {
      const roleLower = (s.role || '').toLowerCase();
      return !(roleLower.includes('referee') || roleLower.includes('ref'));
    });

    referees.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = `${r.name} (Referee - ID: ${r.id})`;
      scRefSelect.appendChild(opt);
    });

    if (otherStaff.length > 0) {
      const group = document.createElement('optgroup');
      group.label = "Other Officials & Staff";
      otherStaff.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = `${s.name} (${s.role || 'Staff'} - ID: ${s.id})`;
        group.appendChild(opt);
      });
      scRefSelect.appendChild(group);
    }

    scRefSelect.value = m.refereeId || '';
  }

  // Clear selections
  document.getElementById('sc-fighter-a-box').classList.remove('selected-winner');
  document.getElementById('sc-fighter-b-box').classList.remove('selected-winner');
  scorecardSelectedWinner = null;

  if (m.winnerId) {
    if (m.winnerId === m.fighterAId) {
      selectWinnerInScorecard('A');
    } else if (m.winnerId === m.fighterBId) {
      selectWinnerInScorecard('B');
    }
  }

  // Populate dynamic select list for manual matchup overrides
  const categoryFighters = state.fighters.filter(f => f.categoryId === m.categoryId);
  const selectA = document.getElementById('sc-fighter-a-select');
  const selectB = document.getElementById('sc-fighter-b-select');
  
  if (selectA && selectB) {
    selectA.innerHTML = '';
    selectB.innerHTML = '';

    const addSpecialOptions = (selectEl, selectedValue) => {
      // TBD option
      const optTBD = document.createElement('option');
      optTBD.value = 'TBD';
      optTBD.textContent = 'To Be Decided';
      if (!selectedValue || selectedValue === 'TBD') optTBD.selected = true;
      selectEl.appendChild(optTBD);
      
      // BYE option
      const optBYE = document.createElement('option');
      optBYE.value = 'BYE';
      optBYE.textContent = 'BYE';
      if (selectedValue === 'BYE') optBYE.selected = true;
      selectEl.appendChild(optBYE);
      
      // Fighter options
      categoryFighters.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.id;
        opt.textContent = f.name;
        if (f.id === selectedValue) opt.selected = true;
        selectEl.appendChild(opt);
      });
    };
    
    addSpecialOptions(selectA, m.fighterAId);
    addSpecialOptions(selectB, m.fighterBId);
  }

  document.getElementById('modal-scorecard').classList.add('active');
}

function adjustScore(player, delta) {
  const input = document.getElementById(`sc-score-${player.toLowerCase()}`);
  let val = parseInt(input.value) || 0;
  val = Math.max(0, val + delta);
  input.value = val;

  // Auto pick winner based on higher score
  const scoreA = parseInt(document.getElementById('sc-score-a').value) || 0;
  const scoreB = parseInt(document.getElementById('sc-score-b').value) || 0;

  if (scoreA > scoreB) selectWinnerInScorecard('A');
  else if (scoreB > scoreA) selectWinnerInScorecard('B');
}

function selectWinnerInScorecard(player) {
  const boxA = document.getElementById('sc-fighter-a-box');
  const boxB = document.getElementById('sc-fighter-b-box');

  boxA.classList.remove('selected-winner');
  boxB.classList.remove('selected-winner');

  scorecardSelectedWinner = player;
  document.getElementById(`sc-fighter-${player.toLowerCase()}-box`).classList.add('selected-winner');
}

function saveScorecard() {
  if (!activeScorecardMatchId) return;

  const mIdx = state.matches.findIndex(m => m.id === activeScorecardMatchId);
  if (mIdx === -1) return;

  const m = state.matches[mIdx];
  const scoreA = parseInt(document.getElementById('sc-score-a').value) || 0;
  const scoreB = parseInt(document.getElementById('sc-score-b').value) || 0;
  const mat = parseInt(document.getElementById('sc-mat-select').value);
  let status = document.getElementById('sc-status-select').value;

  // Auto-complete match if winner is decided (unequal score or explicit box selection)
  if (scoreA !== scoreB || scorecardSelectedWinner) {
    status = 'completed';
  }

  m.scoreA = scoreA;
  m.scoreB = scoreB;
  m.mat = mat;
  m.status = status;

  // Save referee if selected
  const scRefSelect = document.getElementById('sc-referee-select');
  if (scRefSelect) {
    m.refereeId = scRefSelect.value || '';
  }

  // Save match time if modified
  const scTimeInput = document.getElementById('sc-time-input');
  if (scTimeInput) {
    m.dateScheduled = scTimeInput.value.trim() || m.dateScheduled;
  }

  if (status === 'completed') {
    if (!scorecardSelectedWinner) {
      // Pick based on score or prompt
      if (scoreA > scoreB) scorecardSelectedWinner = 'A';
      else if (scoreB > scoreA) scorecardSelectedWinner = 'B';
      else {
        showToast("Scores are tied! Please explicitly select the winner by clicking their box.", "warning");
        return;
      }
    }

    const winnerFighterId = scorecardSelectedWinner === 'A' ? m.fighterAId : m.fighterBId;
    const loserFighterId = scorecardSelectedWinner === 'A' ? m.fighterBId : m.fighterAId;
    
    // Check if this completion changed the winner from a previous save
    const previousWinnerId = m.winnerId;
    m.winnerId = winnerFighterId;

    // Recalculate Fighter Stats (only if winner changed or it is first complete)
    if (previousWinnerId !== winnerFighterId) {
      // Revert previous stats first
      if (previousWinnerId) {
        const prevWinner = state.fighters.find(f => f.id === previousWinnerId);
        if (prevWinner) {
          prevWinner.wins = Math.max(0, prevWinner.wins - 1);
          prevWinner.points = Math.max(0, prevWinner.points - (previousWinnerId === m.fighterAId ? scoreA : scoreB));
        }
        const prevLoser = state.fighters.find(f => f.id === (previousWinnerId === m.fighterAId ? m.fighterBId : m.fighterAId));
        if (prevLoser) {
          prevLoser.losses = Math.max(0, prevLoser.losses - 1);
          prevLoser.points = Math.max(0, prevLoser.points - (previousWinnerId === m.fighterAId ? scoreB : scoreA));
        }
      }

      // Add new stats
      const winFighter = state.fighters.find(f => f.id === winnerFighterId);
      if (winFighter) {
        winFighter.wins++;
        winFighter.points += (scorecardSelectedWinner === 'A' ? scoreA : scoreB);
      }
      
      const loseFighter = state.fighters.find(f => f.id === loserFighterId);
      if (loseFighter) {
        loseFighter.losses++;
        loseFighter.points += (scorecardSelectedWinner === 'A' ? scoreB : scoreA);
      }
    }

    // Propagate winner inside brackets
    if (m.nextMatchId) {
      propagateWinner(m.nextMatchId, m.positionInNextMatch, winnerFighterId);
      showToast("Match results recorded! Winner advanced in bracket.", "success");
    } else {
      showToast("Championship match completed! Gold champion crowned!", "success");
    }
  } else {
    // If set back from completed, clean stats and propagation
    if (m.winnerId) {
      const prevWinner = state.fighters.find(f => f.id === m.winnerId);
      if (prevWinner) {
        prevWinner.wins = Math.max(0, prevWinner.wins - 1);
        prevWinner.points = Math.max(0, prevWinner.points - (m.winnerId === m.fighterAId ? scoreA : scoreB));
      }
      const prevLoser = state.fighters.find(f => f.id === (m.winnerId === m.fighterAId ? m.fighterBId : m.fighterAId));
      if (prevLoser) {
        prevLoser.losses = Math.max(0, prevLoser.losses - 1);
        prevLoser.points = Math.max(0, prevLoser.points - (m.winnerId === m.fighterAId ? scoreB : scoreA));
      }
      
      m.winnerId = null;
      // Revert in next match
      if (m.nextMatchId) {
        propagateWinner(m.nextMatchId, m.positionInNextMatch, null);
      }
    }
    showToast("Match details updated successfully.", "info");
  }

  document.getElementById('modal-scorecard').classList.remove('active');
  saveState();
}

// ================= CUSTOM DYNAMIC NOTIFICATIONS (TOASTS) =================

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  `;
  if (type === 'success') {
    icon = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    `;
  } else if (type === 'warning') {
    icon = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    `;
  }

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto remove toast after 3.5s
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s reverse forwards';
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 3500);
}

// ================= DEMO INITIALIZER SYSTEM =================

function loadDemoData() {
  state.categories = [
    { id: 'cat-101', name: 'Male Senior Kumite -67kg', ageClass: 'Senior', gender: 'Male', time: '10:00 AM' },
    { id: 'cat-102', name: 'Female Senior Kumite +68kg', ageClass: 'Senior', gender: 'Female', time: '11:30 AM' },
    { id: 'cat-103', name: 'Male Junior Kumite -76kg', ageClass: 'Junior', gender: 'Male', time: '01:30 PM' }
  ];

  state.fighters = [
    // -67kg Division
    { id: 'f-1', name: 'Hiroshi Tanaka', club: 'Tokyo Shotokan Dojo', belt: 'black', categoryId: 'cat-101', wins: 3, losses: 0, points: 14 },
    { id: 'f-2', name: 'Jean-Pierre Laurent', club: 'Marseille Dojo', belt: 'brown', categoryId: 'cat-101', wins: 2, losses: 1, points: 10 },
    { id: 'f-3', name: 'Diego Silva', club: 'Sao Paulo Karate Club', belt: 'purple', categoryId: 'cat-101', wins: 1, losses: 1, points: 6 },
    { id: 'f-4', name: 'Marcus Vance', club: 'London Budokai', belt: 'blue', categoryId: 'cat-101', wins: 1, losses: 1, points: 5 },
    { id: 'f-5', name: 'Alexei Ivanov', club: 'Moscow Honbu', belt: 'green', categoryId: 'cat-101', wins: 0, losses: 1, points: 2 },
    { id: 'f-6', name: 'Kenji Takahashi', club: 'Kyoto Wado-Ryu Dojo', belt: 'black', categoryId: 'cat-101', wins: 0, losses: 1, points: 1 },
    
    // +68kg Women Division
    { id: 'f-7', name: 'Elena Petrova', club: 'St. Petersburg Kai', belt: 'black', categoryId: 'cat-102', wins: 1, losses: 0, points: 6 },
    { id: 'f-8', name: 'Sofia Rodriguez', club: 'Madrid Goju-Ryu', belt: 'brown', categoryId: 'cat-102', wins: 0, losses: 1, points: 3 },
    { id: 'f-9', name: 'Emily Watson', club: 'New York Seido', belt: 'blue', categoryId: 'cat-102', wins: 0, losses: 0, points: 0 },
    { id: 'f-10', name: 'Yuki Sato', club: 'Osaka Shito-Ryu', belt: 'black', categoryId: 'cat-102', wins: 0, losses: 0, points: 0 },

    // Junior -76kg Division
    { id: 'f-11', name: 'Lucas Meyer', club: 'Berlin Shito-Kai', belt: 'purple', categoryId: 'cat-103', wins: 0, losses: 0, points: 0 },
    { id: 'f-12', name: 'Tariq Al-Mansoor', club: 'Dubai Karate Center', belt: 'brown', categoryId: 'cat-103', wins: 0, losses: 0, points: 0 }
  ];

  // Wipe matches
  state.matches = [];

  // Generate an active tournament in cat-101 for the demo experience!
  // N = 6, next power of 2 is 8 (2 byes)
  const cat1Matches = [
    // Round 1
    {
      id: 'bracket-cat-101-r1-m1',
      categoryId: 'cat-101',
      round: 1,
      matchNumber: 1,
      fighterAId: 'f-1',
      fighterBId: 'f-5',
      scoreA: 6,
      scoreB: 2,
      winnerId: 'f-1',
      status: 'completed',
      mat: 1,
      dateScheduled: 'R1 Match 1',
      nextMatchId: 'bracket-cat-101-r2-m1',
      positionInNextMatch: 'A'
    },
    {
      id: 'bracket-cat-101-r1-m2',
      categoryId: 'cat-101',
      round: 1,
      matchNumber: 2,
      fighterAId: 'f-3',
      fighterBId: 'f-6',
      scoreA: 4,
      scoreB: 1,
      winnerId: 'f-3',
      status: 'completed',
      mat: 1,
      dateScheduled: 'R1 Match 2',
      nextMatchId: 'bracket-cat-101-r2-m1',
      positionInNextMatch: 'B'
    },
    {
      id: 'bracket-cat-101-r1-m3',
      categoryId: 'cat-101',
      round: 1,
      matchNumber: 3,
      fighterAId: 'f-2',
      fighterBId: 'BYE',
      scoreA: 1,
      scoreB: 0,
      winnerId: 'f-2',
      status: 'completed',
      mat: 2,
      dateScheduled: 'R1 Match 3',
      nextMatchId: 'bracket-cat-101-r2-m2',
      positionInNextMatch: 'A'
    },
    {
      id: 'bracket-cat-101-r1-m4',
      categoryId: 'cat-101',
      round: 1,
      matchNumber: 4,
      fighterAId: 'f-4',
      fighterBId: 'BYE',
      scoreA: 1,
      scoreB: 0,
      winnerId: 'f-4',
      status: 'completed',
      mat: 2,
      dateScheduled: 'R1 Match 4',
      nextMatchId: 'bracket-cat-101-r2-m2',
      positionInNextMatch: 'B'
    },

    // Round 2 (Semi Finals)
    {
      id: 'bracket-cat-101-r2-m1',
      categoryId: 'cat-101',
      round: 2,
      matchNumber: 1,
      fighterAId: 'f-1', // Hiroshi
      fighterBId: 'f-3', // Diego
      scoreA: 8,
      scoreB: 2,
      winnerId: 'f-1',
      status: 'completed',
      mat: 3,
      dateScheduled: 'R2 Semi 1',
      nextMatchId: 'bracket-cat-101-r3-m1',
      positionInNextMatch: 'A'
    },
    {
      id: 'bracket-cat-101-r2-m2',
      categoryId: 'cat-101',
      round: 2,
      matchNumber: 2,
      fighterAId: 'f-2', // Jean-Pierre
      fighterBId: 'f-4', // Marcus
      scoreA: 5,
      scoreB: 4,
      winnerId: 'f-2',
      status: 'completed',
      mat: 3,
      dateScheduled: 'R2 Semi 2',
      nextMatchId: 'bracket-cat-101-r3-m1',
      positionInNextMatch: 'B'
    },

    // Round 3 (Finals)
    {
      id: 'bracket-cat-101-r3-m1',
      categoryId: 'cat-101',
      round: 3,
      matchNumber: 1,
      fighterAId: 'f-1', // Hiroshi
      fighterBId: 'f-2', // Jean-Pierre
      scoreA: 0,
      scoreB: 0,
      winnerId: null,
      status: 'live', // Active and ready to score live!
      mat: 1,
      dateScheduled: 'Final Match',
      nextMatchId: null,
      positionInNextMatch: null
    }
  ];

  state.matches.push(...cat1Matches);

  // Generate static brackets for women's division cat-102
  const cat2Matches = [
    {
      id: 'bracket-cat-102-r1-m1',
      categoryId: 'cat-102',
      round: 1,
      matchNumber: 1,
      fighterAId: 'f-7', // Elena
      fighterBId: 'f-8', // Sofia
      scoreA: 6,
      scoreB: 3,
      winnerId: 'f-7',
      status: 'completed',
      mat: 2,
      dateScheduled: 'R1 M1',
      nextMatchId: 'bracket-cat-102-r2-m1',
      positionInNextMatch: 'A'
    },
    {
      id: 'bracket-cat-102-r1-m2',
      categoryId: 'cat-102',
      round: 1,
      matchNumber: 2,
      fighterAId: 'f-9',
      fighterBId: 'f-10',
      scoreA: 0,
      scoreB: 0,
      winnerId: null,
      status: 'scheduled',
      mat: 2,
      dateScheduled: 'R1 M2',
      nextMatchId: 'bracket-cat-102-r2-m1',
      positionInNextMatch: 'B'
    },
    {
      id: 'bracket-cat-102-r2-m1',
      categoryId: 'cat-102',
      round: 2,
      matchNumber: 1,
      fighterAId: 'f-7',
      fighterBId: null,
      scoreA: 0,
      scoreB: 0,
      winnerId: null,
      status: 'scheduled',
      mat: 3,
      dateScheduled: 'Grand Final',
      nextMatchId: null,
      positionInNextMatch: null
    }
  ];

  state.matches.push(...cat2Matches);

  // Default staff members for demo
  state.staff = [
    { id: 'staff-demo-1', name: 'Sensei Kenji', role: 'Referee', dojo: 'Japan Karate Association', photo: '' },
    { id: 'staff-demo-2', name: 'Coach Sarah Miller', role: 'Coach', dojo: 'London Wado-Ryu Dojo', photo: '' },
    { id: 'staff-demo-3', name: 'Dr. David Evans', role: 'Official', dojo: 'World Medical Commission', photo: '' },
    { id: 'staff-demo-4', name: 'Agent John Doe', role: 'Staff', dojo: 'Tournament Security', photo: '' }
  ];

  // Auto save
  saveState();
}

// ================= BRANDING & IMAGES COMPRESSION =================

function updateBrandingUI() {
  // Update Event Name across the inputs and sidebar
  const eventNameInput = document.getElementById('dashboard-event-name-input');
  if (eventNameInput) {
    eventNameInput.value = state.eventName;
  }

  // Update Event Prefix in the input
  const eventPrefixInput = document.getElementById('dashboard-event-prefix-input');
  if (eventPrefixInput) {
    eventPrefixInput.value = state.eventPrefix || '';
  }
  
  const logoSubText = document.getElementById('logo-sub-text');
  if (logoSubText) {
    logoSubText.textContent = state.brandSubtitle || 'Association';
  }

  const logoMainText = document.getElementById('logo-main-text');
  if (logoMainText) {
    logoMainText.innerHTML = formatBrandTitle(state.brandTitle || 'ASSAM KARATE');
  }

  // Update Admin Name and Title in inputs
  const adminNameInput = document.getElementById('dashboard-admin-name-input');
  if (adminNameInput) {
    adminNameInput.value = state.adminName || '';
  }
  
  const adminTitleInput = document.getElementById('dashboard-admin-title-input');
  if (adminTitleInput) {
    adminTitleInput.value = state.adminTitle || '';
  }

  // Update Event Date, Location, Time in inputs
  const eventDateInput = document.getElementById('dashboard-event-date-input');
  if (eventDateInput) {
    eventDateInput.value = state.eventDate || "May 25, 2026";
  }
  const eventLocationInput = document.getElementById('dashboard-event-location-input');
  if (eventLocationInput) {
    eventLocationInput.value = state.eventLocation || "Tokyo Budokan, JP";
  }
  const eventTimeInput = document.getElementById('dashboard-event-time-input');
  if (eventTimeInput) {
    eventTimeInput.value = state.eventTime || "09:00 AM";
  }

  // Update Sidebar organizer details
  const sidebarAdminName = document.getElementById('sidebar-admin-name');
  if (sidebarAdminName) {
    sidebarAdminName.textContent = state.adminName || 'Sensei Admin';
  }
  
  const sidebarAdminRole = document.getElementById('sidebar-admin-role');
  if (sidebarAdminRole) {
    sidebarAdminRole.textContent = state.adminTitle || 'Tournament Host';
  }

  // Update Welcome Title on Dashboard
  const welcomeTitle = document.getElementById('dashboard-welcome-title');
  if (welcomeTitle) {
    welcomeTitle.innerHTML = `Welcome back, <span class="gradient-text">${state.adminName || 'Sensei'}</span>`;
  }

  // Sync text labels in dashboard banner
  const dashBannerDateBadge = document.getElementById('dashboard-banner-date-badge');
  if (dashBannerDateBadge) {
    dashBannerDateBadge.textContent = state.eventDate || "May 25, 2026";
  }
  const dashBannerTitle = document.getElementById('dashboard-banner-title');
  if (dashBannerTitle) {
    dashBannerTitle.textContent = state.eventName || "KumiteMaster Championship";
  }
  const dashBannerLocation = document.getElementById('dashboard-banner-location');
  if (dashBannerLocation) {
    dashBannerLocation.textContent = `📍 ${state.eventLocation || "Tokyo Budokan, JP"}`;
  }
  const dashBannerTime = document.getElementById('dashboard-banner-time');
  if (dashBannerTime) {
    dashBannerTime.textContent = `🕒 ${state.eventTime || "09:00 AM"}`;
  }

  // Sync text labels in bracket banner
  const bracketBannerDate = document.getElementById('bracket-banner-date-badge');
  if (bracketBannerDate) {
    bracketBannerDate.textContent = state.eventDate || "May 25, 2026";
  }
  const bracketBannerEventName = document.getElementById('bracket-banner-event-name');
  if (bracketBannerEventName) {
    bracketBannerEventName.textContent = state.eventName || "KumiteMaster Championship";
  }
  const bracketBannerLocation = document.getElementById('bracket-banner-location');
  if (bracketBannerLocation) {
    bracketBannerLocation.textContent = `📍 ${state.eventLocation || "Tokyo Budokan, JP"}`;
  }
  const bracketBannerTime = document.getElementById('bracket-banner-time');
  if (bracketBannerTime) {
    bracketBannerTime.textContent = `🕒 ${state.eventTime || "09:00 AM"}`;
  }

  // Sync background images of #dashboard-banner-bg-img and #bracket-banner-bg-img
  const dashBannerBg = document.getElementById('dashboard-banner-bg-img');
  const bracketBannerBg = document.getElementById('bracket-banner-bg-img');
  
  if (state.bannerPhoto) {
    if (dashBannerBg) {
      dashBannerBg.style.backgroundImage = `url(${state.bannerPhoto})`;
      dashBannerBg.style.opacity = '0.7';
    }
    if (bracketBannerBg) {
      bracketBannerBg.style.backgroundImage = `url(${state.bannerPhoto})`;
      bracketBannerBg.style.opacity = '0.7';
    }
  } else {
    if (dashBannerBg) {
      dashBannerBg.style.backgroundImage = 'none';
      dashBannerBg.style.opacity = '0';
    }
    if (bracketBannerBg) {
      bracketBannerBg.style.backgroundImage = 'none';
      bracketBannerBg.style.opacity = '0';
    }
  }

  // Sync #dashboard-event-banner-btn text and border styling depending on banner presence
  const dashEventBannerBtn = document.getElementById('dashboard-event-banner-btn');
  if (dashEventBannerBtn) {
    if (state.bannerPhoto) {
      dashEventBannerBtn.innerHTML = `🖼️ Banner Registered`;
      dashEventBannerBtn.style.border = '1px solid var(--accent)';
    } else {
      dashEventBannerBtn.innerHTML = 'Upload Banner Photo';
      dashEventBannerBtn.style.border = '1px dashed var(--border-color)';
    }
  }

  // Update Event Logo image & svg visibility in Sidebar and Dashboard
  const logoImg = document.getElementById('logo-icon-img');
  const logoSvg = document.getElementById('logo-icon-svg');
  const eventLogoBtn = document.getElementById('dashboard-event-logo-btn');
  
  if (state.eventLogo) {
    if (logoImg) {
      logoImg.src = state.eventLogo;
      logoImg.style.display = 'block';
    }
    if (logoSvg) {
      logoSvg.style.display = 'none';
    }
    if (eventLogoBtn) {
      eventLogoBtn.innerHTML = `🛡️ Logo Registered`;
      eventLogoBtn.style.border = '1px solid var(--accent)';
    }
  } else {
    if (logoImg) {
      logoImg.src = 'logo.png';
      logoImg.style.display = 'block';
    }
    if (logoSvg) {
      logoSvg.style.display = 'none';
    }
    if (eventLogoBtn) {
      eventLogoBtn.innerHTML = 'Upload Brand Logo';
      eventLogoBtn.style.border = '1px dashed var(--border-color)';
    }
  }

  // Update Admin Photo in Sidebar and Dashboard
  const adminImg = document.getElementById('sidebar-admin-avatar');
  const adminPlaceholder = document.getElementById('sidebar-admin-avatar-placeholder');
  const adminPhotoBtn = document.getElementById('dashboard-admin-photo-btn');
  
  if (state.adminLogo) {
    if (adminImg) {
      adminImg.src = state.adminLogo;
      adminImg.style.display = 'block';
    }
    if (adminPlaceholder) {
      adminPlaceholder.style.display = 'none';
    }
    if (adminPhotoBtn) {
      adminPhotoBtn.innerHTML = `👤 Photo Registered`;
      adminPhotoBtn.style.border = '1px solid var(--accent)';
    }
  } else {
    if (adminImg) {
      adminImg.style.display = 'none';
    }
    if (adminPlaceholder) {
      adminPlaceholder.style.display = 'block';
    }
    if (adminPhotoBtn) {
      adminPhotoBtn.innerHTML = 'Upload Photo';
      adminPhotoBtn.style.border = '1px dashed var(--border-color)';
    }
  }
}

function compressImage(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Enforce max 128px bounding box to keep base64 string extremely light (<30KB)
      let width = img.width;
      let height = img.height;
      const maxDim = 128;
      
      if (width > height) {
        if (width > maxDim) {
          height = Math.round(height * (maxDim / width));
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round(width * (maxDim / height));
          height = maxDim;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw image onto canvas and compress
      ctx.drawImage(img, 0, 0, width, height);
      const isPng = file.type === 'image/png';
      const compressedDataUrl = canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', isPng ? undefined : 0.7);
      callback(compressedDataUrl);
    };
  };
}

// ================= THEME SWITCHER SYSTEMS =================

function applyTheme() {
  const isLight = state.theme === 'light';
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  
  if (isLight) {
    document.body.classList.add('light-theme');
    if (themeIcon) themeIcon.textContent = '🌙';
    if (themeText) themeText.textContent = 'Dark Mode';
  } else {
    document.body.classList.remove('light-theme');
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeText) themeText.textContent = 'Light Mode';
  }
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  saveState();
  applyTheme();
  showToast(`Switched to ${state.theme === 'light' ? 'Light' : 'Dark'} theme!`, "success");
}

// ================= TATAMI MANAGEMENT SYSTEM =================

function renderTatamiManagementList() {
  const listContainer = document.getElementById('tatami-modal-list');
  if (!listContainer) return;
  
  listContainer.innerHTML = '';
  
  if (state.tatamis.length === 0) {
    listContainer.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 1rem 0;">No active combat mats. Add one below!</div>`;
    return;
  }

  state.tatamis.forEach(t => {
    const row = document.createElement('div');
    row.style = 'display: flex; gap: 0.5rem; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 0.5rem; border-radius: var(--radius-sm); margin-bottom: 0.5rem;';
    row.innerHTML = `
      <input type="text" id="tatami-edit-input-${t.id}" class="form-control" value="${t.name}" style="margin-bottom: 0; flex-grow: 1; height: 36px; font-size: 0.85rem;">
      <button type="button" class="btn btn-primary btn-sm" onclick="saveTatamiName(${t.id})" style="height: 36px; padding: 0 0.75rem; font-size: 0.75rem; white-space: nowrap;">💾 Save</button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="deleteTatami(${t.id})" style="height: 36px; padding: 0 0.75rem; font-size: 0.75rem; white-space: nowrap; background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3);">🗑️ Delete</button>
    `;
    listContainer.appendChild(row);
  });
}

window.saveTatamiName = function(id) {
  const input = document.getElementById(`tatami-edit-input-${id}`);
  if (!input) return;
  const newName = input.value.trim();
  if (!newName) {
    showToast("Tatami name cannot be empty!", "warning");
    return;
  }
  
  const tatami = state.tatamis.find(t => t.id === id);
  if (tatami) {
    tatami.name = newName;
    saveState();
    showToast(`Renamed Tatami to: ${newName}`, "success");
    renderTatamiManagementList();
    if (document.getElementById('scheduler-view').classList.contains('active')) {
      renderSchedulerView();
    }
  }
};

window.deleteTatami = function(id) {
  const tatami = state.tatamis.find(t => t.id === id);
  if (!tatami) return;
  
  if (confirm(`Are you sure you want to delete "${tatami.name}"? Active matches assigned to this mat will be set to Unassigned (Mat 0).`)) {
    // Update matches on this tatami to unassigned
    state.matches.forEach(m => {
      if (m.mat === id) {
        m.mat = 0;
      }
    });
    
    state.tatamis = state.tatamis.filter(t => t.id !== id);
    saveState();
    showToast(`Removed tatami area: ${tatami.name}`, "info");
    renderTatamiManagementList();
    if (document.getElementById('scheduler-view').classList.contains('active')) {
      renderSchedulerView();
    }
  }
};

// ================= CSV TEMPLATE EXPORT =================

function downloadCSVTemplate() {
  const csvContent = [
    "Name,Club,Belt,DoB,Gender,Weight,Type",
    "Hiroshi Tanaka,Tokyo Shotokan Dojo,black,1998-04-12,Male,66.5,Kumite",
    "Elena Petrova,St. Petersburg Kai,black,2001-11-22,Female,69.2,Kumite",
    "Jean-Pierre Laurent,Marseille Dojo,brown,1995-07-08,Male,74.5,Kumite",
    "Sofia Rodriguez,Madrid Goju-Ryu,brown,2002-01-30,Female,71.0,Kata",
    "Kenji Takahashi,Kyoto Wado-Ryu Dojo,black,1999-09-15,Male,61.2,Kumite",
    "Emily Watson,New York Seido,blue,2004-03-05,Female,70.5,Kumite"
  ].join("\n");
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "kumitemaster_roster_template.csv");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("CSV roster template downloaded successfully!", "success");
}

// ================= DYNAMIC MULTI-PAGE FULL TOURNAMENT EXPORT =================

function getDivisionWinners(catId) {
  const catMatches = state.matches.filter(m => m.categoryId === catId && m.round > 0);
  if (catMatches.length === 0) return { gold: null, silver: null, bronze1: null, bronze2: null };
  const totalRounds = Math.max(...catMatches.map(m => m.round));
  const finalMatch = catMatches.find(m => m.round === totalRounds);
  
  let gold = null;
  let silver = null;
  let bronze1 = null;
  let bronze2 = null;
  
  if (finalMatch && finalMatch.status === 'completed' && finalMatch.winnerId) {
    gold = state.fighters.find(f => f.id === finalMatch.winnerId);
    const runnerUpId = finalMatch.winnerId === finalMatch.fighterAId ? finalMatch.fighterBId : finalMatch.fighterAId;
    silver = state.fighters.find(f => f.id === runnerUpId);
    
    const semiRound = totalRounds - 1;
    const semiMatches = catMatches.filter(m => m.round === semiRound);
    if (semiMatches.length > 0) {
      const semiLoserIds = [];
      semiMatches.forEach(m => {
        if (m.winnerId) {
          const loserId = m.winnerId === m.fighterAId ? m.fighterBId : m.fighterAId;
          if (loserId && loserId !== 'BYE') semiLoserIds.push(loserId);
        }
      });
      const semiLosers = state.fighters.filter(f => semiLoserIds.includes(f.id));
      if (semiLosers.length > 0) {
        bronze1 = semiLosers[0] || null;
        bronze2 = semiLosers[1] || null;
      }
    }
  }
  return { gold, silver, bronze1, bronze2 };
}

function downloadFullTournamentReport() {
  showToast("Compiling full tournament report PDF, please wait...", "info");
  
  const reportContainer = document.createElement('div');
  reportContainer.className = 'report-page light-theme';
  reportContainer.style = 'padding: 40px; color: #111827; background: #ffffff; font-family: "Inter", sans-serif; box-sizing: border-box;';
  
  // Calculate quick stats
  const totalFighters = state.fighters.length;
  const totalDivisions = state.categories.length;
  const totalMatches = state.matches.length;
  const completedMatches = state.matches.filter(m => m.status === 'completed').length;
  const completionRate = totalMatches > 0 ? Math.round((completedMatches / totalMatches) * 100) : 0;
  
  // Association Logo (Full Report Cover) — use uploaded logo or event name abbreviation
  let eventLogoHTML = '';
  if (state.eventLogo) {
    eventLogoHTML = `<img src="${state.eventLogo}" style="max-height: 120px; max-width: 200px; object-fit: contain; margin-bottom: 20px;" crossorigin="anonymous">`;
  } else {
    const abbr = (state.eventName || 'Tournament').split(' ').map(w => w[0]).join('').substring(0, 4).toUpperCase();
    eventLogoHTML = `<div style="background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; font-weight: 800; padding: 20px 30px; border-radius: 12px; font-size: 2.2rem; letter-spacing: 2px; display: inline-block; margin-bottom: 25px;">${abbr}</div>`;
  }
  
  let adminPhotoHTML = '';
  if (state.adminLogo) {
    adminPhotoHTML = `<img src="${state.adminLogo}" style="max-height: 90px; max-width: 90px; border-radius: 50%; object-fit: cover; border: 2.5px solid #7c3aed; box-shadow: 0 4px 10px rgba(124, 58, 237, 0.15);">`;
  } else {
    adminPhotoHTML = `<div style="width: 90px; height: 90px; border-radius: 50%; background: #eaeaea; display: flex; align-items: center; justify-content: center; font-size: 2rem; border: 2px solid #7c3aed;">🥋</div>`;
  }
  
  const page1 = `
    <div class="report-cover-section" style="min-height: 260mm; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always; padding: 40px 0;">
      <div style="text-align: center; margin-top: 50px;">
        ${eventLogoHTML}
        <h1 style="font-size: 3.2rem; color: #111827; font-family: 'Outfit', sans-serif; font-weight: 800; margin: 10px 0 5px 0; letter-spacing: -0.03em;">${state.eventName}</h1>
        <p style="font-size: 1.25rem; color: #4b5563; font-weight: 500;">Official Championship Tournament Summary Report</p>
        <div style="width: 80px; height: 4px; background: #7c3aed; margin: 25px auto; border-radius: 2px;"></div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 20px; max-width: 800px; margin: 40px auto; width: 100%; text-align: center;">
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
          <div style="font-size: 1.8rem; font-weight: 800; color: #7c3aed;">${totalDivisions}</div>
          <div style="font-size: 0.8rem; color: #6b7280; font-weight: 600; text-transform: uppercase; margin-top: 5px;">Divisions</div>
        </div>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
          <div style="font-size: 1.8rem; font-weight: 800; color: #10b981;">${totalFighters}</div>
          <div style="font-size: 0.8rem; color: #6b7280; font-weight: 600; text-transform: uppercase; margin-top: 5px;">Competitors</div>
        </div>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
          <div style="font-size: 1.8rem; font-weight: 800; color: #f59e0b;">${totalMatches}</div>
          <div style="font-size: 0.8rem; color: #6b7280; font-weight: 600; text-transform: uppercase; margin-top: 5px;">Total Games</div>
        </div>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
          <div style="font-size: 1.8rem; font-weight: 800; color: #4f46e5;">${completionRate}%</div>
          <div style="font-size: 0.8rem; color: #6b7280; font-weight: 600; text-transform: uppercase; margin-top: 5px;">Completion</div>
        </div>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #eaeaea; padding-top: 30px; margin-top: 50px;">
        <div style="display: flex; align-items: center; gap: 15px;">
          ${adminPhotoHTML}
          <div style="text-align: left;">
            <div style="font-size: 0.95rem; font-weight: 700; color: #7c3aed; text-transform: uppercase;">Sensei Administrator</div>
            <div style="font-size: 0.85rem; color: #4b5563;">Tournament Host & Referee Director</div>
            <div style="font-size: 0.75rem; color: #9ca3af; margin-top: 2px;">Verified Roster & Brackets</div>
          </div>
        </div>
        <div style="text-align: right; font-size: 0.85rem; color: #6b7280; font-family: monospace;">
          Report Generated: ${new Date().toLocaleDateString()}<br>
          System: KumiteMaster v1.0.0
        </div>
      </div>
    </div>
  `;
  
  // Page 2: Division Champion Standings
  let divisionPodiumsHTML = '';
  state.categories.forEach(cat => {
    const winners = getDivisionWinners(cat.id);
    divisionPodiumsHTML += `
      <tr style="height: 50px;">
        <td style="font-weight: 700; color: #111827; padding: 10px; border-bottom: 1px solid #e5e7eb;">${cat.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #d97706;">🥇 ${winners.gold ? winners.gold.name : '<span style="color:#9ca3af;font-weight:400;">TBD</span>'}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">🥈 ${winners.silver ? winners.silver.name : '<span style="color:#9ca3af;">TBD</span>'}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #b45309;">🥉 ${winners.bronze ? winners.bronze.name : '<span style="color:#9ca3af;">TBD</span>'}</td>
      </tr>
    `;
  });
  
  if (state.categories.length === 0) {
    divisionPodiumsHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#6b7280;">No divisions registered yet.</td></tr>`;
  }
  
  const page2 = `
    <div class="report-section" style="min-height: 260mm; page-break-after: always; padding: 20px 0;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid #7c3aed; padding-bottom: 10px; margin-bottom: 20px;">
        <h2 style="font-size: 1.8rem; color: #111827; font-family: 'Outfit', sans-serif;">🏆 Championship Divisions Standings</h2>
        <span style="font-size: 0.8rem; color: #7c3aed; font-weight: 700;">PAGE 2</span>
      </div>
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
        <thead>
          <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 12px; font-weight: 700; color: #374151;">Division / Weight Category</th>
            <th style="padding: 12px; font-weight: 700; color: #374151;">First Place (Gold)</th>
            <th style="padding: 12px; font-weight: 700; color: #374151;">Second Place (Silver)</th>
            <th style="padding: 12px; font-weight: 700; color: #374151;">Third Place (Bronze)</th>
          </tr>
        </thead>
        <tbody>
          ${divisionPodiumsHTML}
        </tbody>
      </table>
    </div>
  `;
  
  // Page 3: Roster Leaderboard
  let rosterHTML = '';
  const sortedFighters = [...state.fighters].sort((a,b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.points !== a.points) return b.points - a.points;
    return a.losses - b.losses;
  });
  
  sortedFighters.forEach((f, idx) => {
    const cat = state.categories.find(c => c.id === f.categoryId);
    rosterHTML += `
      <tr style="height: 40px; background-color: ${idx % 2 === 0 ? '#ffffff' : '#f9fafb'};">
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 700;">${idx + 1}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${f.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${f.club}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-transform: capitalize;"><span class="belt-badge belt-${f.belt}">${f.belt}</span></td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${cat ? cat.name : 'Unassigned'}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 700; color: #10b981; text-align:center;">${f.wins}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 700; color: #ef4444; text-align:center;">${f.losses}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 700; text-align:center;">${f.points}</td>
      </tr>
    `;
  });
  
  if (state.fighters.length === 0) {
    rosterHTML = `<tr><td colspan="8" style="text-align:center; padding: 20px; color:#6b7280;">No registered competitors found.</td></tr>`;
  }
  
  const page3 = `
    <div class="report-section" style="min-height: 260mm; page-break-after: always; padding: 20px 0;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid #7c3aed; padding-bottom: 10px; margin-bottom: 20px;">
        <h2 style="font-size: 1.8rem; color: #111827; font-family: 'Outfit', sans-serif;">🥋 Complete Fighter Roster & Stats</h2>
        <span style="font-size: 0.8rem; color: #7c3aed; font-weight: 700;">PAGE 3</span>
      </div>
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.8rem;">
        <thead>
          <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 10px; font-weight: 700; color: #374151; width: 40px;">Rank</th>
            <th style="padding: 10px; font-weight: 700; color: #374151;">Full Name</th>
            <th style="padding: 10px; font-weight: 700; color: #374151;">Club Dojo</th>
            <th style="padding: 10px; font-weight: 700; color: #374151; width: 90px;">Belt Rank</th>
            <th style="padding: 10px; font-weight: 700; color: #374151;">Division</th>
            <th style="padding: 10px; font-weight: 700; color: #374151; width: 60px; text-align:center;">Wins</th>
            <th style="padding: 10px; font-weight: 700; color: #374151; width: 60px; text-align:center;">Losses</th>
            <th style="padding: 10px; font-weight: 700; color: #374151; width: 60px; text-align:center;">Points</th>
          </tr>
        </thead>
        <tbody>
          ${rosterHTML}
        </tbody>
      </table>
    </div>
  `;
  
  // Page 4: Match Schedules Log
  let matchesHTML = '';
  state.matches.forEach((m, index) => {
    const cat = state.categories.find(c => c.id === m.categoryId);
    const tatami = state.tatamis.find(t => t.id === m.mat);
    const fighterA = state.fighters.find(f => f.id === m.fighterAId);
    const fighterB = state.fighters.find(f => f.id === m.fighterBId);
    
    const nameA = fighterA ? fighterA.name : (m.fighterAId === 'BYE' ? 'BYE' : 'TBD');
    const nameB = fighterB ? fighterB.name : (m.fighterBId === 'BYE' ? 'BYE' : 'TBD');
    
    let scoreString = `${m.scoreA} - ${m.scoreB}`;
    let statusBadge = `<span style="padding: 2px 6px; font-size:0.7rem; font-weight:700; background-color:#e5e7eb; color:#4b5563; border-radius:4px; text-transform:uppercase;">Scheduled</span>`;
    
    if (m.status === 'live') {
      statusBadge = `<span style="padding: 2px 6px; font-size:0.7rem; font-weight:700; background-color:#fef3c7; color:#d97706; border-radius:4px; text-transform:uppercase;">Live</span>`;
    } else if (m.status === 'completed') {
      statusBadge = `<span style="padding: 2px 6px; font-size:0.7rem; font-weight:700; background-color:rgba(16,185,129,0.15); color:#059669; border-radius:4px; text-transform:uppercase;">Complete</span>`;
    }
    
    matchesHTML += `
      <tr style="height: 40px; background-color: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight:700;">${m.id.replace('bracket-', '').replace('cat-', '')}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${cat ? cat.name : 'Unknown Division'}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align:center;">Round ${m.round}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight:600; text-align:right; width:25%;">${nameA}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight:700; text-align:center; color:#7c3aed; background:rgba(124,58,237,0.03); width:100px;">${scoreString}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight:600; text-align:left; width:25%;">${nameB}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align:center;">${tatami ? tatami.name : 'Unassigned'}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align:center;">${statusBadge}</td>
      </tr>
    `;
  });
  
  if (state.matches.length === 0) {
    matchesHTML = `<tr><td colspan="8" style="text-align:center; padding: 20px; color:#6b7280;">No games or matches scheduled yet.</td></tr>`;
  }
  
  const page4 = `
    <div class="report-section" style="min-height: 260mm; padding: 20px 0;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid #7c3aed; padding-bottom: 10px; margin-bottom: 20px;">
        <h2 style="font-size: 1.8rem; color: #111827; font-family: 'Outfit', sans-serif;">⚔️ Tournament Game Records & Schedules Log</h2>
        <span style="font-size: 0.8rem; color: #7c3aed; font-weight: 700;">PAGE 4</span>
      </div>
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.78rem;">
        <thead>
          <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 10px; font-weight: 700; color: #374151; width: 90px;">Match ID</th>
            <th style="padding: 10px; font-weight: 700; color: #374151;">Division</th>
            <th style="padding: 10px; font-weight: 700; color: #374151; width: 80px; text-align:center;">Round</th>
            <th style="padding: 10px; font-weight: 700; color: #374151; text-align:right;">Competitor Red</th>
            <th style="padding: 10px; font-weight: 700; color: #374151; text-align:center;">Score</th>
            <th style="padding: 10px; font-weight: 700; color: #374151; text-align:left;">Competitor Blue</th>
            <th style="padding: 10px; font-weight: 700; color: #374151; width: 100px; text-align:center;">Tatami Mat</th>
            <th style="padding: 10px; font-weight: 700; color: #374151; width: 90px; text-align:center;">State</th>
          </tr>
        </thead>
        <tbody>
          ${matchesHTML}
        </tbody>
      </table>
    </div>
  `;
  
  reportContainer.innerHTML = page1 + page2 + page3 + page4;
  document.body.appendChild(reportContainer);
  
  const safeFileName = `kumitemaster_full_report_${state.eventName.toLowerCase().replace(/\s+/g, '_')}.pdf`;
  
  const opt = {
    margin:       10,
    filename:     safeFileName,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, logging: false, scrollY: 0, scrollX: 0 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(reportContainer).save().then(() => {
    document.body.removeChild(reportContainer);
    showToast("Full tournament summary report compiled and exported successfully!", "success");
  }).catch((err) => {
    if (document.body.contains(reportContainer)) {
      document.body.removeChild(reportContainer);
    }
    console.error("Full PDF report generation failed:", err);
    showToast("Failed compiling tournament summary PDF report.", "error");
  });
}

// ================= MULTI-EVENT HELPERS =================

function renderEventSwitcherDropdown() {
  const select = document.getElementById('event-switcher-select');
  if (!select) return;
  select.innerHTML = '';
  
  state.events = state.events || [];
  state.events.forEach(evt => {
    const opt = document.createElement('option');
    opt.value = evt.id;
    opt.innerText = evt.name;
    select.appendChild(opt);
  });
  
  if (state.currentEventId) {
    select.value = state.currentEventId;
  }
}

function switchEvent(id) {
  // First, sync current top-level data into the current event in state.events
  syncCurrentEvent();
  
  const targetEvent = state.events.find(e => e.id === id);
  if (!targetEvent) return;
  
  state.currentEventId = id;
  
  // Unpack target event properties to top-level state
  state.eventName = targetEvent.name || "KumiteMaster Championship";
  state.eventLogo = targetEvent.logo || "";
  state.adminPhoto = targetEvent.adminPhoto || "";
  state.adminName = targetEvent.adminName || "Sensei Admin";
  state.adminTitle = targetEvent.adminTitle || "Tournament Host";
  state.categories = targetEvent.categories || [];
  state.fighters = targetEvent.fighters || [];
  state.matches = targetEvent.matches || [];
  state.tatamis = targetEvent.tatamis || [
    { id: 1, name: "Tatami 1" },
    { id: 2, name: "Tatami 2" },
    { id: 3, name: "Tatami 3" }
  ];
  state.staff = targetEvent.staff || [];
  state.badgeBg = targetEvent.badgeBg || "classic-white";
  state.eventDate = targetEvent.eventDate || "May 25, 2026";
  state.eventLocation = targetEvent.eventLocation || "Tokyo Budokan, JP";
  state.eventTime = targetEvent.eventTime || "09:00 AM";
  state.bannerPhoto = targetEvent.bannerPhoto || "";
  state.eventPrefix = targetEvent.eventPrefix || "";
  
  // Save state
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  
  // Update UI and re-render everything
  updateBrandingUI();
  renderEventSwitcherDropdown();
  renderAll();
  
  showToast(`Switched to tournament: ${state.eventName}`, "success");
}

function createNewEvent(name) {
  const newId = 'event-' + Date.now();
  const newEvent = {
    id: newId,
    name: name,
    logo: "",
    adminPhoto: "",
    adminName: "Sensei Admin",
    adminTitle: "Tournament Host",
    categories: [],
    fighters: [],
    matches: [],
    tatamis: [
      { id: 1, name: "Tatami 1" },
      { id: 2, name: "Tatami 2" },
      { id: 3, name: "Tatami 3" }
    ],
    staff: [],
    badgeBg: "classic-white",
    eventDate: "May 25, 2026",
    eventLocation: "Tokyo Budokan, JP",
    eventTime: "09:00 AM",
    bannerPhoto: "",
    eventPrefix: ""
  };
  
  state.events = state.events || [];
  state.events.push(newEvent);
  
  // Save and switch
  switchEvent(newId);
  showToast(`Created new tournament event: ${name}`, "success");
}

function deleteActiveEvent() {
  state.events = state.events || [];
  if (state.events.length <= 1) {
    showToast("Cannot delete the only tournament event!", "warning");
    return;
  }
  
  const confirmDelete = confirm(`Are you sure you want to delete the active tournament event "${state.eventName}"?\nThis will erase all fighters, categories, matches, and branding data for this event!`);
  if (!confirmDelete) return;
  
  const activeIndex = state.events.findIndex(e => e.id === state.currentEventId);
  if (activeIndex > -1) {
    state.events.splice(activeIndex, 1);
  }
  
  // Select first event as next active
  const nextActiveId = state.events[0].id;
  
  // Sync state first by resetting currentEventId to something valid
  state.currentEventId = nextActiveId;
  
  // Switch to it
  const targetEvent = state.events[0];
  state.eventName = targetEvent.name || "KumiteMaster Championship";
  state.eventLogo = targetEvent.logo || "";
  state.adminLogo = targetEvent.adminPhoto || "";
  state.adminName = targetEvent.adminName || "Sensei Admin";
  state.adminTitle = targetEvent.adminTitle || "Tournament Host";
  state.categories = targetEvent.categories || [];
  state.fighters = targetEvent.fighters || [];
  state.matches = targetEvent.matches || [];
  state.tatamis = targetEvent.tatamis || [
    { id: 1, name: "Tatami 1" },
    { id: 2, name: "Tatami 2" },
    { id: 3, name: "Tatami 3" }
  ];
  state.staff = targetEvent.staff || [];
  state.badgeBg = targetEvent.badgeBg || "classic-white";
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  
  updateBrandingUI();
  renderEventSwitcherDropdown();
  renderAll();
  
  showToast("Tournament event deleted successfully", "success");
}

function updateActiveEventDetails() {
  const eventNameInput = document.getElementById('dashboard-event-name-input');
  const adminNameInput = document.getElementById('dashboard-admin-name-input');
  const adminTitleInput = document.getElementById('dashboard-admin-title-input');
  const eventPrefixInput = document.getElementById('dashboard-event-prefix-input');
  const eventDateInput = document.getElementById('dashboard-event-date-input');
  const eventLocationInput = document.getElementById('dashboard-event-location-input');
  const eventTimeInput = document.getElementById('dashboard-event-time-input');

  const name = eventNameInput ? eventNameInput.value.trim() : "";
  if (!name) {
    showToast("Event Name cannot be empty!", "error");
    return;
  }

  // Update top-level state
  state.eventName = name;
  if (adminNameInput) state.adminName = adminNameInput.value.trim() || "Sensei Admin";
  if (adminTitleInput) state.adminTitle = adminTitleInput.value.trim() || "Tournament Host";
  if (eventPrefixInput) state.eventPrefix = eventPrefixInput.value.trim().toUpperCase();
  if (eventDateInput) state.eventDate = eventDateInput.value.trim() || "May 25, 2026";
  if (eventLocationInput) state.eventLocation = eventLocationInput.value.trim() || "Tokyo Budokan, JP";
  if (eventTimeInput) state.eventTime = eventTimeInput.value.trim() || "09:00 AM";

  // Re-run ID generation checks if prefix was changed
  ensureAllEntityIds();

  // Save state (which syncs top-level state to the current active event item inside state.events list)
  saveState();

  // Re-render switcher dropdown to reflect any event name change instantly in the dropdown selector
  renderEventSwitcherDropdown();

  // Refresh credential grid if active
  if (typeof renderCredentialsView === 'function') renderCredentialsView();

  showToast("🔄 Tournament event details updated and synchronized successfully!", "success");
}

// ================= CREDENTIALS HUB & BADGES ENGINE =================

function compressProfilePhoto(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      let width = img.width;
      let height = img.height;
      const maxDim = 96;
      
      if (width > height) {
        if (width > maxDim) {
          height = Math.round(height * (maxDim / width));
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round(width * (maxDim / height));
          height = maxDim;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx.drawImage(img, 0, 0, width, height);
      const isPng = file.type === 'image/png';
      const compressedDataUrl = canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', isPng ? undefined : 0.7);
      callback(compressedDataUrl);
    };
  };
}

function editStaffMember(id) {
  state.staff = state.staff || [];
  const member = state.staff.find(s => s.id === id);
  if (!member) return;

  document.getElementById('staff-edit-id').value = member.id;
  document.getElementById('staff-name').value = member.name;
  document.getElementById('staff-role').value = member.role;
  document.getElementById('staff-dojo').value = member.dojo;
  document.getElementById('staff-custom-id').value = member.customId || '';
  
  currentStaffPhoto = member.photo || '';
  const img = document.getElementById('staff-photo-preview');
  const placeholder = document.getElementById('staff-photo-placeholder');
  
  if (img && placeholder) {
    if (currentStaffPhoto) {
      img.src = currentStaffPhoto;
      img.style.display = 'block';
      placeholder.style.display = 'none';
    } else {
      img.src = '';
      img.style.display = 'none';
      placeholder.style.display = 'block';
    }
  }

  const submitBtn = document.getElementById('staff-submit-btn');
  if (submitBtn) {
    submitBtn.innerHTML = '💾 Save Changes';
  }

  showToast(`Editing profile of ${member.name}`, "info");
  
  // Scroll to staff registration card
  const regForm = document.getElementById('staff-registration-form');
  if (regForm) {
    regForm.scrollIntoView({ behavior: 'smooth' });
  }
}

function deleteStaffMember(id) {
  state.staff = state.staff || [];
  const member = state.staff.find(s => s.id === id);
  if (!member) return;

  if (confirm(`Are you sure you want to remove the credentials pass for "${member.name}"?`)) {
    state.staff = state.staff.filter(s => s.id !== id);
    saveState();
    showToast("Staff credentials pass removed successfully", "success");
  }
}

function generateBarcodeSVG(code) {
  const width = 160;
  const height = 32;
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = code.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let svg = `<svg class="cred-barcode-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<rect width="${width}" height="${height}" fill="transparent"/>`;
  
  let currentX = 10;
  const availWidth = width - 20;
  const barCount = 35;
  const step = availWidth / barCount;
  
  let seed = Math.abs(hash);
  function nextRandom() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }
  
  for (let i = 0; i < barCount; i++) {
    const isBar = i % 2 === 0;
    if (isBar) {
      const isGuard = i < 3 || i > barCount - 4 || (i > barCount / 2 - 2 && i < barCount / 2 + 2);
      let barWidth = step;
      if (!isGuard) {
        const rand = nextRandom();
        if (rand > 0.6) {
          barWidth = step * 2;
        }
      }
      svg += `<rect x="${currentX}" y="0" width="${barWidth}" height="${height}" class="cred-barcode" fill="currentColor"/>`;
      currentX += barWidth;
    } else {
      let spaceWidth = step;
      const rand = nextRandom();
      if (rand > 0.7) {
        spaceWidth = step * 1.5;
      }
      currentX += spaceWidth;
    }
    if (currentX >= width - 10) break;
  }
  
  svg += `</svg>`;
  return svg;
}

function renderCredentialsView() {
  // Sync sidebar controls with current state
  syncBadgeDesignerFromState();

  // Sync backdrop buttons
  const bgTheme = state.badgeBg || 'classic-white';
  const themeBtns = document.querySelectorAll('.badge-theme-btn');
  themeBtns.forEach(btn => {
    if (btn.getAttribute('data-theme') === bgTheme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const activeTabBtn = document.querySelector('.cred-filter-tab.active');
  const activeTab = activeTabBtn ? activeTabBtn.getAttribute('data-tab') : 'competitors';

  const container = document.getElementById('credentials-grid-container');
  if (!container) return;
  container.innerHTML = '';

  const searchInput = document.getElementById('cred-search-input');
  const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';

  if (activeTab === 'competitors') {
    const divSelect = document.getElementById('cred-division-select');
    const selectedDivision = divSelect ? divSelect.value : 'ALL';
    
    let filteredFighters = state.fighters || [];
    if (selectedDivision && selectedDivision !== 'ALL') {
      filteredFighters = filteredFighters.filter(f => f.categoryId === selectedDivision);
    }

    if (searchQuery) {
      filteredFighters = filteredFighters.filter(f => {
        const name = (f.name || '').toLowerCase();
        const club = (f.club || '').toLowerCase();
        const customId = (f.customId || '').toLowerCase();
        const id = (f.id || '').toLowerCase();
        const belt = (f.belt || '').toLowerCase();
        return name.includes(searchQuery) || club.includes(searchQuery) || customId.includes(searchQuery) || id.includes(searchQuery) || belt.includes(searchQuery);
      });
    }

    if (filteredFighters.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; width: 100%; text-align: center; padding: 3rem 1rem;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">🥋</div>
          <h3>No Competitors Found</h3>
          <p style="color: var(--text-muted); max-width: 300px; margin: 0.5rem auto 1.5rem auto; font-size: 0.85rem;">
            ${searchQuery ? 'No competitors match your search filters.' : 'There are no fighters registered in this division yet. Go to Fighters Roster or Brackets to add some!'}
          </p>
        </div>
      `;
      return;
    }

    // De-duplicate fighters based on Name + Club in credentials grid
    const seenFighters = new Set();
    const deduplicatedFighters = [];
    filteredFighters.forEach(f => {
      const key = `${(f.name || '').trim().toLowerCase()}|${(f.club || '').trim().toLowerCase()}`;
      if (!seenFighters.has(key)) {
        seenFighters.add(key);
        deduplicatedFighters.push(f);
      }
    });

    deduplicatedFighters.forEach(fighter => {
      const card = document.createElement('div');
      card.innerHTML = getCardHTML(fighter, false, bgTheme);
      container.appendChild(card.firstElementChild);
    });

  } else {
    // Staff tab
    const roleSelect = document.getElementById('cred-role-select');
    const selectedRole = roleSelect ? roleSelect.value : 'ALL';

    let filteredStaff = state.staff || [];
    if (selectedRole && selectedRole !== 'ALL') {
      filteredStaff = filteredStaff.filter(s => (s.role || '').toLowerCase() === selectedRole.toLowerCase());
    }

    if (searchQuery) {
      filteredStaff = filteredStaff.filter(s => {
        const name = (s.name || '').toLowerCase();
        const dojo = (s.dojo || '').toLowerCase();
        const role = (s.role || '').toLowerCase();
        const customId = (s.customId || '').toLowerCase();
        const id = (s.id || '').toLowerCase();
        return name.includes(searchQuery) || dojo.includes(searchQuery) || role.includes(searchQuery) || customId.includes(searchQuery) || id.includes(searchQuery);
      });
    }

    if (filteredStaff.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; width: 100%; text-align: center; padding: 3rem 1rem;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">💼</div>
          <h3>No Officials Registered</h3>
          <p style="color: var(--text-muted); max-width: 300px; margin: 0.5rem auto 1.5rem auto; font-size: 0.85rem;">
            ${searchQuery || selectedRole !== 'ALL' ? 'No officials match your search or role filters.' : 'No referees, coaches, or staff credentials passes have been registered for this tournament yet.'}
          </p>
        </div>
      `;
      return;
    }

    filteredStaff.forEach(staff => {
      const card = document.createElement('div');
      card.innerHTML = getCardHTML(staff, true, bgTheme);
      container.appendChild(card.firstElementChild);
    });
  }
  updateAdminControlStates();
}

function generateStaffId(person) {
  if (person.customId) return person.customId;
  
  const eventFirstLetter = state.eventPrefix ? state.eventPrefix.trim().toUpperCase() : (state.eventName ? state.eventName.trim().charAt(0).toUpperCase() : 'E');
  
  let cleanDate = '20260525';
  const rawDate = state.eventDate || "May 25, 2026";
  const parsed = Date.parse(rawDate);
  if (!isNaN(parsed)) {
    const d = new Date(parsed);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    cleanDate = `${yyyy}${mm}${dd}`;
  } else {
    const digits = rawDate.replace(/\D/g, '');
    if (digits.length >= 4) {
      cleanDate = digits;
    } else {
      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      cleanDate = `${yyyy}${mm}${dd}`;
    }
  }
  
  state.staff = state.staff || [];
  const idx = state.staff.findIndex(s => s.id === person.id);
  const serialNo = idx !== -1 ? idx + 1 : state.staff.length + 1;
  const paddedSerial = String(serialNo).padStart(3, '0');
  
  return `${eventFirstLetter}-${cleanDate}-${paddedSerial}`;
}

function getCardHTML(person, isStaff, theme) {
  // Event Logo or Placeholder based on Show Logo preference
  let logoHTML = '';
  if (state.badgeShowLogo !== false) {
    if (state.badgeLogo) {
      logoHTML = `<img class="cred-logo-icon" src="${state.badgeLogo}" alt="Logo">`;
    } else if (state.eventLogo) {
      logoHTML = `<img class="cred-logo-icon" src="${state.eventLogo}" alt="Logo">`;
    } else {
      logoHTML = `<div class="cred-logo-icon" style="background: linear-gradient(135deg, #7c3aed, #4f46e5); border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.55rem; color: #fff; font-weight: 800;">KM</div>`;
    }
  }

  // Profile Photo or Initial Placeholder
  let photoHTML = '';
  if (person.photo) {
    photoHTML = `<img class="cred-avatar-img" src="${person.photo}" alt="${person.name}">`;
  } else {
    const initials = person.name ? person.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '??';
    photoHTML = `<div class="cred-avatar-img" style="display:flex; align-items:center; justify-content:center; background:#475569; color:#f1f5f9; font-weight:bold; font-size:1.6rem; width:100%; height:100%;">${initials}</div>`;
  }

  // Dojo or Category Label
  let dojoOrCat = '';
  if (isStaff) {
    dojoOrCat = person.dojo || 'Tournament Official';
  } else {
    // Find all matching competitors by name + club
    const matchingFighters = state.fighters.filter(f => 
      (f.name || '').trim().toLowerCase() === (person.name || '').trim().toLowerCase() && 
      (f.club || '').trim().toLowerCase() === (person.club || '').trim().toLowerCase()
    );
    const catNames = matchingFighters.map(f => {
      const cat = state.categories.find(c => c.id === f.categoryId);
      return cat ? cat.name : null;
    }).filter(Boolean);
    
    dojoOrCat = catNames.length > 0 ? catNames.join(' & ') : 'Unassigned Division';
  }

  // Role tag HTML
  let roleTag = '';
  if (isStaff) {
    const roleClass = (person.role || 'Staff').toLowerCase();
    roleTag = `<div class="cred-role-tag ${roleClass}">${person.role || 'Staff'}</div>`;
  } else {
    roleTag = `<div class="cred-role-tag competitor">Competitor</div>`;
  }

  // ID and Barcode
  const prefix = state.eventPrefix ? state.eventPrefix.trim().toUpperCase() : 'KM';
  const displayId = isStaff ? generateStaffId(person) : (person.customId || `${prefix}-COMP-${person.id}`);
  const barcodeSVG = generateBarcodeSVG(displayId);

  // Overlay menu
  const overlayHTML = `
    <div class="credential-card-overlay">
      <button type="button" class="btn btn-sm btn-primary cred-print-btn" onclick="downloadSingleBadgeJPG('${person.id}', ${isStaff})" style="background: linear-gradient(135deg, #10b981, #059669); border: none;">🖼️ Save JPG</button>
      ${isStaff ? `
        <button type="button" class="btn btn-sm btn-secondary cred-edit-btn" onclick="openStaffProfileModal('${person.id}')">👤 View Profile</button>
        <button type="button" class="btn btn-sm btn-danger cred-delete-btn" onclick="deleteStaffMember('${person.id}')">❌ Remove Pass</button>
      ` : `
        <button type="button" class="btn btn-sm btn-secondary cred-edit-btn" onclick="openPlayerProfileModal('${person.id}')">👤 View Profile</button>
        <button type="button" class="btn btn-sm btn-danger cred-delete-btn" onclick="deleteFighter('${person.id}')">❌ Remove Fighter</button>
      `}
    </div>
  `;

  // Premium Dynamic Styling Configuration
  let inlineStyles = '';
  if (theme === 'custom') {
    // Background style
    let bgStyle = '';
    const styleSelect = state.badgeBgStyle || 'solid';
    const c1 = state.badgeBgColor1 || '#ffffff';
    const c2 = state.badgeBgColor2 || '#f3f4f6';
    if (styleSelect === 'solid') {
      bgStyle = `background: ${c1} !important;`;
    } else if (styleSelect === 'gradient') {
      bgStyle = `background: linear-gradient(135deg, ${c1}, ${c2}) !important;`;
    } else if (styleSelect === 'radial') {
      bgStyle = `background: radial-gradient(circle, ${c1}, ${c2}) !important;`;
    } else if (styleSelect === 'image') {
      if (state.badgeBgImg) {
        bgStyle = `background: url(${state.badgeBgImg}) center/cover no-repeat !important;`;
      } else {
        bgStyle = `background: ${c1} !important;`;
      }
    }
    
    // Custom font family
    const fontStr = state.badgeFont ? `font-family: '${state.badgeFont}', sans-serif !important;` : '';
    
    // Custom text color
    const textCol = state.badgeTextColor ? `color: ${state.badgeTextColor} !important;` : '';
    
    // Scale factor
    let scaleVal = 1.0;
    if (state.badgeTextScale === 'small') scaleVal = 0.85;
    else if (state.badgeTextScale === 'large') scaleVal = 1.15;
    
    // Card real dimensions
    const w = state.badgeWidth || 54;
    const h = state.badgeHeight || 86;
    
    // Preview scaling (standardize around width 270px)
    const previewW = w * 5;
    const previewH = h * 5;
    
    inlineStyles = `${bgStyle} ${fontStr} ${textCol} --badge-accent: ${state.badgeAccentColor || '#7c3aed'}; --badge-scale: ${scaleVal}; --badge-width: ${w}mm; --badge-height: ${h}mm; --badge-preview-width: ${previewW}px; --badge-preview-height: ${previewH}px;`;
  } else {
    inlineStyles = `--badge-width: 54mm; --badge-height: 86mm; --badge-preview-width: 270px; --badge-preview-height: 430px;`;
  }

  // Inject Custom Header Size and ID Size variables universally
  const headerFontSize = state.badgeHeaderSize ? `--badge-header-size: ${state.badgeHeaderSize}px;` : '';
  const idFontSize = state.badgeIdSize ? `--badge-id-size: ${state.badgeIdSize}px;` : '';
  inlineStyles += ` ${headerFontSize} ${idFontSize}`;

  // Dynamic Signatory Footer signature block
  let signatureHTML = '';
  if (state.badgeShowSignature !== false) {
    const authName = state.badgeAuthName !== undefined ? state.badgeAuthName : state.adminName;
    const authTitle = state.badgeAuthTitle !== undefined ? state.badgeAuthTitle : state.adminTitle;
    
    if (authName || authTitle) {
      signatureHTML = `
        <div class="cred-footer-signature">
          <div style="display: flex; flex-direction: column; align-items: flex-start; text-align: left;">
            <span class="cred-signature-title">Authorized By</span>
            <span class="cred-signature-name">${escapeHTML(authName || 'Sensei Admin')}</span>
          </div>
          <span class="cred-signature-title" style="max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHTML(authTitle || 'Tournament Host')}</span>
        </div>
      `;
    }
  }

  return `
    <div class="credential-card ${theme}" data-id="${person.id}" style="${inlineStyles}">
      ${overlayHTML}
      <div class="cred-header">
        ${logoHTML}
        <span class="cred-event-title">${state.eventName}</span>
      </div>
      <div class="cred-avatar-wrapper">
        ${photoHTML}
      </div>
      <div class="cred-name">${person.name}</div>
      <div class="cred-dojo" title="${dojoOrCat}">${dojoOrCat}</div>
      ${roleTag}
      <div class="cred-barcode-container">
        <div class="cred-id">${displayId}</div>
        ${barcodeSVG}
      </div>
      ${signatureHTML}
    </div>
  `;
}

function downloadSingleBadgePDF(id, isStaff) {
  let person = null;
  if (isStaff) {
    state.staff = state.staff || [];
    person = state.staff.find(s => s.id === id);
  } else {
    person = state.fighters.find(f => f.id === id);
  }
  
  if (!person) {
    showToast("Credentials holder record not found!", "error");
    return;
  }
  
  showToast(`Generating PDF badge for ${person.name}...`, "info");
  
  // Create offscreen container
  const tempSheet = document.createElement('div');
  tempSheet.id = 'badge-print-sheet';
  tempSheet.style.background = '#ffffff';
  tempSheet.style.padding = '0';
  tempSheet.style.margin = '0';
  
  const pageContainer = document.createElement('div');
  pageContainer.className = 'print-page-container';
  
  const cardW = state.badgeWidth || 54;
  const cardH = state.badgeHeight || 86;
  
  pageContainer.style.setProperty('--page-cols', 1);
  pageContainer.style.setProperty('--page-rows', 1);
  pageContainer.style.setProperty('--badge-width', `${cardW}mm`);
  pageContainer.style.setProperty('--badge-height', `${cardH}mm`);
  pageContainer.style.setProperty('--page-gap-x', `0mm`);
  pageContainer.style.setProperty('--page-gap-y', `0mm`);
  
  const cardHTML = getCardHTML(person, isStaff, state.badgeBg || 'classic-white');
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = cardHTML;
  const cardEl = tempDiv.firstElementChild;
  
  // Remove interactive overlay inside PDF
  const overlay = cardEl.querySelector('.credential-card-overlay');
  if (overlay) overlay.remove();
  
  pageContainer.appendChild(cardEl);
  tempSheet.appendChild(pageContainer);
  document.body.appendChild(tempSheet);
  
  // Robust Fallback check for html2pdf
  if (typeof html2pdf === 'undefined') {
    showToast("PDF compiler offline. Launching native print dialog...", "warning");
    window.print();
    document.body.removeChild(tempSheet);
    return;
  }
  
  const safeName = `badge_${person.name.toLowerCase().replace(/\s+/g, '_')}.pdf`;
  const opt = {
    margin:       0,
    filename:     safeName,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, logging: false, scrollY: 0, scrollX: 0 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(tempSheet).save().then(() => {
    document.body.removeChild(tempSheet);
    showToast("Badge credentials PDF generated successfully!", "success");
  }).catch(err => {
    if (document.body.contains(tempSheet)) {
      document.body.removeChild(tempSheet);
    }
    console.error("Single Badge PDF export failed, falling back to print dialog:", err);
    showToast("PDF export failed. Opening native print...", "warning");
    document.body.appendChild(tempSheet);
    window.print();
    document.body.removeChild(tempSheet);
  });
}

// ---- Single Badge JPG Export ----
function downloadSingleBadgeJPG(id, isStaff) {
  let person = null;
  if (isStaff) {
    state.staff = state.staff || [];
    person = state.staff.find(s => s.id === id);
  } else {
    person = state.fighters.find(f => f.id === id);
  }

  if (!person) {
    showToast('Credentials holder record not found!', 'error');
    return;
  }

  if (typeof html2canvas === 'undefined') {
    showToast('Screenshot tool (html2canvas) not loaded. Please check internet connection.', 'error');
    return;
  }

  showToast(`Generating JPG badge for ${person.name}...`, 'info');

  // Compute card pixel dimensions from CSS preview variables
  const cardW = state.badgeWidth || 54;
  const cardH = state.badgeHeight || 86;
  // CSS renders card at (width*5)px x (height*5)px (see getCardHTML inlineStyles)
  const pxW = (state.badgeBg === 'custom') ? cardW * 5 : 270;
  const pxH = (state.badgeBg === 'custom') ? cardH * 5 : 410;

  // Build isolated card offscreen, fixed to exact rendered dimensions
  const cardHTML = getCardHTML(person, isStaff, state.badgeBg || 'classic-white');
  const tempWrapper = document.createElement('div');
  tempWrapper.style.cssText = `position:fixed;top:-9999px;left:-9999px;z-index:99999;width:${pxW}px;height:${pxH}px;overflow:hidden;padding:0;margin:0;background:transparent;`;
  tempWrapper.innerHTML = cardHTML;
  const cardEl = tempWrapper.firstElementChild;

  // Remove interactive overlay so it doesn't appear in the screenshot
  const overlay = cardEl ? cardEl.querySelector('.credential-card-overlay') : null;
  if (overlay) overlay.remove();

  // Force card to fill exact pixel dimensions
  if (cardEl) {
    cardEl.style.width = pxW + 'px';
    cardEl.style.height = pxH + 'px';
    cardEl.style.minWidth = pxW + 'px';
    cardEl.style.minHeight = pxH + 'px';
    cardEl.style.maxWidth = pxW + 'px';
    cardEl.style.maxHeight = pxH + 'px';
    cardEl.style.overflow = 'hidden';
    cardEl.style.boxSizing = 'border-box';
  }

  document.body.appendChild(tempWrapper);

  // Allow CSS to fully paint before capturing
  setTimeout(() => {
    html2canvas(cardEl || tempWrapper, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: pxW,
      height: pxH,
      scrollX: 0,
      scrollY: 0,
      windowWidth: pxW,
      windowHeight: pxH
    }).then(canvas => {
      document.body.removeChild(tempWrapper);
      const safeName = `id_badge_${(person.name || 'badge').toLowerCase().replace(/\s+/g, '_')}.jpg`;
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg', 0.97);
      link.download = safeName;
      link.click();
      showToast(`🖼️ JPG badge for ${person.name} saved!`, 'success');
    }).catch(err => {
      if (document.body.contains(tempWrapper)) document.body.removeChild(tempWrapper);
      console.error('Single badge JPG export failed:', err);
      showToast('JPG export failed. Please try again.', 'error');
    });
  }, 150);
}

// ---- Bulk All Badges JPG Export ----
function downloadAllBadgesJPG(isStaff) {
  let list = [];
  const searchInput = document.getElementById('cred-search-input');
  const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';

  if (isStaff) {
    const roleSelect = document.getElementById('cred-role-select');
    const selectedRole = roleSelect ? roleSelect.value : 'ALL';
    list = state.staff || [];
    if (selectedRole && selectedRole !== 'ALL') {
      list = list.filter(s => (s.role || '').toLowerCase() === selectedRole.toLowerCase());
    }
    if (searchQuery) {
      list = list.filter(s => {
        const name = (s.name || '').toLowerCase();
        const dojo = (s.dojo || '').toLowerCase();
        const role = (s.role || '').toLowerCase();
        return name.includes(searchQuery) || dojo.includes(searchQuery) || role.includes(searchQuery);
      });
    }
  } else {
    const divSelect = document.getElementById('cred-division-select');
    const selectedDivision = divSelect ? divSelect.value : 'ALL';
    list = state.fighters || [];
    if (selectedDivision && selectedDivision !== 'ALL') {
      list = list.filter(f => f.categoryId === selectedDivision);
    }
    if (searchQuery) {
      list = list.filter(f => {
        const name = (f.name || '').toLowerCase();
        const club = (f.club || '').toLowerCase();
        return name.includes(searchQuery) || club.includes(searchQuery);
      });
    }
    // De-duplicate by Name + Club
    const seen = new Set();
    list = list.filter(f => {
      const key = `${(f.name || '').trim().toLowerCase()}|${(f.club || '').trim().toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  if (list.length === 0) {
    showToast('No ID badges to export matching the current filters!', 'warning');
    return;
  }

  if (typeof html2canvas === 'undefined') {
    showToast('Screenshot tool (html2canvas) not loaded. Please check internet connection.', 'error');
    return;
  }

  showToast(`Preparing batch JPG download of ${list.length} ID badges...`, 'info');

  const cardW = state.badgeWidth || 54;
  const cardH = state.badgeHeight || 86;
  const pxW = (state.badgeBg === 'custom') ? cardW * 5 : 270;
  const pxH = (state.badgeBg === 'custom') ? cardH * 5 : 410;
  let index = 0;

  function processNext() {
    if (index >= list.length) {
      showToast(`🗂️ All ${list.length} ID badges downloaded as JPG files!`, 'success');
      return;
    }

    const person = list[index];
    index++;

    const cardHTML = getCardHTML(person, isStaff, state.badgeBg || 'classic-white');
    const tempWrapper = document.createElement('div');
    tempWrapper.style.cssText = `position:fixed;top:-9999px;left:-9999px;z-index:99999;width:${pxW}px;height:${pxH}px;overflow:hidden;padding:0;margin:0;background:transparent;`;
    tempWrapper.innerHTML = cardHTML;
    const cardEl = tempWrapper.firstElementChild;
    const overlay = cardEl ? cardEl.querySelector('.credential-card-overlay') : null;
    if (overlay) overlay.remove();

    if (cardEl) {
      cardEl.style.width = pxW + 'px';
      cardEl.style.height = pxH + 'px';
      cardEl.style.minWidth = pxW + 'px';
      cardEl.style.minHeight = pxH + 'px';
      cardEl.style.maxWidth = pxW + 'px';
      cardEl.style.maxHeight = pxH + 'px';
      cardEl.style.overflow = 'hidden';
      cardEl.style.boxSizing = 'border-box';
    }

    document.body.appendChild(tempWrapper);

    setTimeout(() => {
      html2canvas(cardEl || tempWrapper, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: pxW,
        height: pxH,
        scrollX: 0,
        scrollY: 0,
        windowWidth: pxW,
        windowHeight: pxH
      }).then(canvas => {
        document.body.removeChild(tempWrapper);
        const safeName = `id_badge_${(person.name || `badge_${index}`).toLowerCase().replace(/\s+/g, '_')}.jpg`;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg', 0.97);
        link.download = safeName;
        link.click();
        setTimeout(processNext, 500);
      }).catch(err => {
        if (document.body.contains(tempWrapper)) document.body.removeChild(tempWrapper);
        console.error(`Badge JPG export failed for ${person.name}:`, err);
        setTimeout(processNext, 500);
      });
    }, 150);
  }

  processNext();
}

function downloadAllBadgesPDF(isStaff) {
  let list = [];
  const searchInput = document.getElementById('cred-search-input');
  const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';

  if (isStaff) {
    const roleSelect = document.getElementById('cred-role-select');
    const selectedRole = roleSelect ? roleSelect.value : 'ALL';
    
    list = state.staff || [];
    if (selectedRole && selectedRole !== 'ALL') {
      list = list.filter(s => (s.role || '').toLowerCase() === selectedRole.toLowerCase());
    }
    if (searchQuery) {
      list = list.filter(s => {
        const name = (s.name || '').toLowerCase();
        const dojo = (s.dojo || '').toLowerCase();
        const role = (s.role || '').toLowerCase();
        const customId = (s.customId || '').toLowerCase();
        const id = (s.id || '').toLowerCase();
        return name.includes(searchQuery) || dojo.includes(searchQuery) || role.includes(searchQuery) || customId.includes(searchQuery) || id.includes(searchQuery);
      });
    }
  } else {
    const divSelect = document.getElementById('cred-division-select');
    const selectedDivision = divSelect ? divSelect.value : 'ALL';
    list = state.fighters || [];
    if (selectedDivision && selectedDivision !== 'ALL') {
      list = list.filter(f => f.categoryId === selectedDivision);
    }
    if (searchQuery) {
      list = list.filter(f => {
        const name = (f.name || '').toLowerCase();
        const club = (f.club || '').toLowerCase();
        const customId = (f.customId || '').toLowerCase();
        const id = (f.id || '').toLowerCase();
        const belt = (f.belt || '').toLowerCase();
        return name.includes(searchQuery) || club.includes(searchQuery) || customId.includes(searchQuery) || id.includes(searchQuery) || belt.includes(searchQuery);
      });
    }
  }

  // De-duplicate competitor list by Name + Club before A4 page layout packaging
  if (!isStaff) {
    const seen = new Set();
    list = list.filter(f => {
      const key = `${(f.name || '').trim().toLowerCase()}|${(f.club || '').trim().toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  if (list.length === 0) {
    showToast("No badges available to export matching the filters!", "warning");
    return;
  }

  showToast(`Compiling A4 batch badges report for ${list.length} records...`, "info");

  // Create temporary print container
  const printSheet = document.createElement('div');
  printSheet.id = 'badge-print-sheet';
  printSheet.style.background = '#ffffff';
  printSheet.style.padding = '0';
  printSheet.style.margin = '0';

  const cardW = state.badgeWidth || 54;
  const cardH = state.badgeHeight || 86;
  const colGap = 5;
  const rowGap = 5;
  const cols = Math.max(1, Math.floor((190 + colGap) / (cardW + colGap)));
  const rows = Math.max(1, Math.floor((277 + rowGap) / (cardH + rowGap)));
  const cardsPerPage = cols * rows;

  for (let i = 0; i < list.length; i += cardsPerPage) {
    const chunk = list.slice(i, i + cardsPerPage);
    const pageContainer = document.createElement('div');
    pageContainer.className = 'print-page-container';
    
    // Set custom page layout grid inline variables
    pageContainer.style.setProperty('--page-cols', cols);
    pageContainer.style.setProperty('--page-rows', rows);
    pageContainer.style.setProperty('--badge-width', `${cardW}mm`);
    pageContainer.style.setProperty('--badge-height', `${cardH}mm`);
    pageContainer.style.setProperty('--page-gap-x', `${colGap}mm`);
    pageContainer.style.setProperty('--page-gap-y', `${rowGap}mm`);

    chunk.forEach(person => {
      const cardHTML = getCardHTML(person, isStaff, state.badgeBg || 'classic-white');
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cardHTML;
      const cardEl = tempDiv.firstElementChild;
      
      // Remove interactive overlay inside PDF
      const overlay = cardEl.querySelector('.credential-card-overlay');
      if (overlay) overlay.remove();
      
      pageContainer.appendChild(cardEl);
    });
    
    printSheet.appendChild(pageContainer);
  }

  document.body.appendChild(printSheet);

  // Robust Fallback check for html2pdf
  if (typeof html2pdf === 'undefined') {
    showToast("PDF compiler offline. Launching native print dialog...", "warning");
    window.print();
    document.body.removeChild(printSheet);
    return;
  }

  const safeName = isStaff ? 'kumitemaster_staff_badges.pdf' : 'kumitemaster_competitor_badges.pdf';
  const opt = {
    margin:       0,
    filename:     safeName,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, logging: false, scrollY: 0, scrollX: 0 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(printSheet).save().then(() => {
    document.body.removeChild(printSheet);
    showToast("Batch badges PDF compiled and exported successfully!", "success");
  }).catch(err => {
    if (document.body.contains(printSheet)) {
      document.body.removeChild(printSheet);
    }
    console.error("Batch Badge PDF export failed, falling back to print dialog:", err);
    showToast("PDF export failed. Opening native print...", "warning");
    document.body.appendChild(printSheet);
    window.print();
    document.body.removeChild(printSheet);
  });
}

function openPlayerProfileModal(fighterId) {
  const f = state.fighters.find(fighter => fighter.id === fighterId);
  if (!f) return;
  
  // Find all matching competitors by name + club
  const matchingFighters = state.fighters.filter(item => 
    (item.name || '').trim().toLowerCase() === (f.name || '').trim().toLowerCase() && 
    (item.club || '').trim().toLowerCase() === (f.club || '').trim().toLowerCase()
  );

  // Aggregate stats across Kata and Kumite records
  let totalWins = 0;
  let totalLosses = 0;
  let totalPoints = 0;
  matchingFighters.forEach(item => {
    totalWins += (item.wins || 0);
    totalLosses += (item.losses || 0);
    totalPoints += (item.points || 0);
  });
  const totalMatchesCount = totalWins + totalLosses;

  const prefix = state.eventPrefix ? state.eventPrefix.trim().toUpperCase() : 'KM';
  document.getElementById('profile-name').innerText = f.name || '';
  document.getElementById('profile-id').innerText = f.customId || `${prefix}-COMP-${f.id}`;
  document.getElementById('profile-dojo').innerText = f.club || 'No Dojo';
  
  document.getElementById('profile-stat-matches').innerText = totalMatchesCount;
  document.getElementById('profile-stat-wins').innerText = totalWins;
  document.getElementById('profile-stat-losses').innerText = totalLosses;
  document.getElementById('profile-stat-points').innerText = totalPoints;
  
  // Retrieve and join all registered division names
  const divisionNames = matchingFighters.map(item => {
    const cat = state.categories.find(c => c.id === item.categoryId);
    return cat ? cat.name : null;
  }).filter(Boolean);
  
  document.getElementById('profile-detail-division').innerText = divisionNames.length > 0 ? divisionNames.join(' & ') : 'Unassigned';
  
  const cat = state.categories.find(c => c.id === f.categoryId);
  document.getElementById('profile-detail-weight').innerText = f.weight ? `${f.weight} kg` : (cat && cat.weightClass ? cat.weightClass : 'N/A');
  document.getElementById('profile-detail-gender-dob').innerText = `${f.gender || 'N/A'} | ${f.dob || 'N/A'}`;
  document.getElementById('profile-detail-belt').innerText = f.belt ? `${f.belt} Belt` : 'N/A';
  
  // Show Location row only if city or country is set
  const locationParts = [f.city, f.country].filter(Boolean);
  const locationRow = document.getElementById('profile-location-row');
  const locationSpan = document.getElementById('profile-detail-location');
  if (locationRow && locationSpan) {
    if (locationParts.length > 0) {
      locationSpan.innerText = locationParts.join(', ');
      locationRow.style.display = 'flex';
    } else {
      locationRow.style.display = 'none';
    }
  }
  
  const beltBadge = document.getElementById('profile-belt-badge');
  if (beltBadge) {
    beltBadge.style.background = '';
    beltBadge.style.color = '';
    beltBadge.className = f.belt ? `belt-badge belt-${f.belt.toLowerCase()}` : 'belt-badge';
    beltBadge.innerText = f.belt ? `${f.belt} Belt` : 'N/A';
  }

  const imgEl = document.getElementById('profile-avatar-img');
  const placeholderEl = document.getElementById('profile-avatar-placeholder');
  
  if (f.photo) {
    imgEl.src = f.photo;
    imgEl.style.display = 'block';
    placeholderEl.style.display = 'none';
  } else {
    imgEl.style.display = 'none';
    const initials = f.name ? f.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '??';
    placeholderEl.innerText = initials;
    placeholderEl.style.display = 'block';
  }
  
  const btnPrint = document.getElementById('btn-profile-print-badge');
  if (btnPrint) {
    btnPrint.setAttribute('data-fighter-id', f.id);
  }
  
  document.getElementById('modal-player-profile').classList.add('active');
}

function downloadRankingsPDF() {
  const selectedCategoryId = document.getElementById('rankings-division-select')?.value || 'ALL';
  const catFighters = selectedCategoryId === 'ALL' ? state.fighters : state.fighters.filter(f => f.categoryId === selectedCategoryId);
  
  if (catFighters.length === 0) {
    showToast("No rankings data available to export!", "warning");
    return;
  }
  
  let categoryName = "All Divisions / Categories";
  if (selectedCategoryId !== 'ALL') {
    const cat = state.categories.find(c => c.id === selectedCategoryId);
    if (cat) categoryName = cat.name;
  }
  
  showToast(`Generating Standings PDF for ${categoryName}...`, "info");
  
  const sorted = [...catFighters].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.points !== a.points) return b.points - a.points;
    return a.losses - b.losses;
  });
  
  const tempSheet = document.createElement('div');
  tempSheet.id = 'rankings-print-sheet';
  tempSheet.style.background = '#ffffff';
  tempSheet.style.color = '#1e293b';
  tempSheet.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  tempSheet.style.padding = '20px';
  tempSheet.style.margin = '0';
  
  let logoHTML = '';
  if (state.eventLogo) {
    logoHTML = `<img src="${state.eventLogo}" style="height: 60px; max-width: 150px; object-fit: contain; margin-bottom: 10px;">`;
  }
  
  let rowsHTML = '';
  sorted.forEach((f, idx) => {
    const rank = idx + 1;
    const matchesCount = f.wins + f.losses;
    const cat = state.categories.find(c => c.id === f.categoryId);
    const catLabel = selectedCategoryId === 'ALL' && cat ? `<div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">${cat.name}</div>` : '';
    
    rowsHTML += `
      <tr style="border-bottom: 1px solid #e2e8f0; ${rank <= 3 ? 'background-color: #f8fafc;' : ''}">
        <td style="padding: 10px 8px; text-align: center; font-weight: bold; width: 50px;">
          <span style="display: inline-block; width: 24px; height: 24px; line-height: 24px; border-radius: 50%; ${
            rank === 1 ? 'background: #fef08a; color: #854d0e;' : 
            rank === 2 ? 'background: #e2e8f0; color: #475569;' : 
            rank === 3 ? 'background: #ffedd5; color: #c2410c;' : ''
          }">${rank}</span>
        </td>
        <td style="padding: 10px 8px; font-weight: 600; color: #0f172a;">
          <div>${f.name}</div>
          ${catLabel}
        </td>
        <td style="padding: 10px 8px; font-size: 0.85rem; color: #475569;">
          <span style="display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; text-transform: capitalize; border: 1px solid #cbd5e1; background: #f8fafc;">
            ${f.belt}
          </span>
        </td>
        <td style="padding: 10px 8px; color: #475569;">${f.club || 'N/A'}</td>
        <td style="padding: 10px 8px; text-align: center; font-weight: 500;">${matchesCount}</td>
        <td style="padding: 10px 8px; text-align: center; font-weight: 600; color: #16a34a;">${f.wins}</td>
        <td style="padding: 10px 8px; text-align: center; font-weight: 600; color: #dc2626;">${f.losses}</td>
        <td style="padding: 10px 8px; text-align: center; font-weight: bold; color: #4f46e5; font-size: 1.05rem;">${f.points}</td>
      </tr>
    `;
  });
  
  tempSheet.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #4f46e5; padding-bottom: 15px; margin-bottom: 20px;">
      <div>
        <h1 style="margin: 0; font-size: 1.8rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">${state.eventName || 'Championship Tournament'}</h1>
        <p style="margin: 3px 0 0 0; font-size: 0.9rem; color: #4f46e5; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Standings & Rankings Leaderboard</p>
        <p style="margin: 2px 0 0 0; font-size: 0.8rem; color: #64748b;">${state.eventDate || ''} | ${state.eventLocation || ''}</p>
      </div>
      <div style="text-align: right;">
        ${logoHTML}
      </div>
    </div>
    
    <div style="margin-bottom: 20px; background: #f1f5f9; padding: 12px 15px; border-radius: 6px; border-left: 4px solid #4f46e5;">
      <span style="font-size: 0.8rem; text-transform: uppercase; color: #64748b; font-weight: 700; display: block; letter-spacing: 0.05em;">Selected Division / Filter</span>
      <span style="font-size: 1.1rem; color: #0f172a; font-weight: 800;">${categoryName}</span>
    </div>
    
    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
      <thead>
        <tr style="background-color: #0f172a; color: #ffffff; border-bottom: 2px solid #4f46e5;">
          <th style="padding: 10px 8px; font-weight: 700; text-align: center; border-top-left-radius: 4px;">Rank</th>
          <th style="padding: 10px 8px; font-weight: 700; text-align: left;">Competitor</th>
          <th style="padding: 10px 8px; font-weight: 700; text-align: left;">Belt</th>
          <th style="padding: 10px 8px; font-weight: 700; text-align: left;">Dojo / Club</th>
          <th style="padding: 10px 8px; font-weight: 700; text-align: center;">Played</th>
          <th style="padding: 10px 8px; font-weight: 700; text-align: center; color: #4ade80;">W</th>
          <th style="padding: 10px 8px; font-weight: 700; text-align: center; color: #f87171;">L</th>
          <th style="padding: 10px 8px; font-weight: 700; text-align: center; color: #a5b4fc; border-top-right-radius: 4px;">PTS</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHTML}
      </tbody>
    </table>
    
    <div style="margin-top: 30px; border-top: 1px dashed #cbd5e1; padding-top: 15px; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #64748b;">
      <span>Generated by Championship Tournament Suite</span>
      <span>${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  `;
  
  document.body.appendChild(tempSheet);
  
  const opt = {
    margin:       [10, 10, 10, 10],
    filename:     `tournament_rankings_${Date.now()}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, letterRendering: true, scrollY: 0, scrollX: 0 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(tempSheet).save().then(() => {
    document.body.removeChild(tempSheet);
    showToast("Standings PDF downloaded successfully!", "success");
  }).catch(err => {
    if (document.body.contains(tempSheet)) {
      document.body.removeChild(tempSheet);
    }
    console.error("Rankings PDF export failed:", err);
    showToast("Error generating standings PDF.", "error");
  });
}

function downloadAllTournamentWinnersPDF() {
  if (state.categories.length === 0) {
    showToast("No divisions available in the tournament!", "warning");
    return;
  }
  
  showToast("Generating Tournament Winners PDF...", "info");
  
  const tempSheet = document.createElement('div');
  tempSheet.id = 'winners-print-sheet';
  tempSheet.style.background = '#ffffff';
  tempSheet.style.color = '#1e293b';
  tempSheet.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  tempSheet.style.padding = '20px';
  tempSheet.style.margin = '0';
  
  let logoHTML = '';
  if (state.eventLogo) {
    logoHTML = `<img src="${state.eventLogo}" style="height: 60px; max-width: 150px; object-fit: contain; margin-bottom: 10px;">`;
  }
  
  let rowsHTML = '';
  state.categories.forEach(cat => {
    const winners = getDivisionWinners(cat.id);
    
    const goldText = winners.gold ? 
      `<div style="font-weight: 700; color: #b45309;">🥇 ${winners.gold.name}</div><div style="font-size: 0.72rem; color: #64748b;">${winners.gold.club || 'No Club'}</div>` : 
      `<span style="color: #94a3b8; font-style: italic; font-size: 0.85rem;">TBD</span>`;
      
    const silverText = winners.silver ? 
      `<div style="font-weight: 700; color: #475569;">🥈 ${winners.silver.name}</div><div style="font-size: 0.72rem; color: #64748b;">${winners.silver.club || 'No Club'}</div>` : 
      `<span style="color: #94a3b8; font-style: italic; font-size: 0.85rem;">TBD</span>`;
      
    let bronzeText = '';
    if (winners.bronze1 || winners.bronze2) {
      if (winners.bronze1) {
        bronzeText += `<div style="font-weight: 700; color: #b45309; margin-bottom: 4px;">🥉 ${winners.bronze1.name}</div><div style="font-size: 0.72rem; color: #64748b; margin-bottom: 6px;">${winners.bronze1.club || 'No Club'}</div>`;
      }
      if (winners.bronze2) {
        bronzeText += `<div style="font-weight: 700; color: #b45309;">🥉 ${winners.bronze2.name}</div><div style="font-size: 0.72rem; color: #64748b;">${winners.bronze2.club || 'No Club'}</div>`;
      }
    } else {
      bronzeText = `<span style="color: #94a3b8; font-style: italic; font-size: 0.85rem;">TBD</span>`;
    }
      
    rowsHTML += `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 12px 10px; font-weight: bold; color: #0f172a; font-size: 0.95rem; width: 30%;">
          ${cat.name}
          <div style="font-size: 0.7rem; color: #64748b; font-weight: 500; text-transform: uppercase; margin-top: 3px; letter-spacing: 0.02em;">
            ${cat.type || 'Kumite'} | ${cat.gender || 'Mixed'} | ${cat.ageClass || 'Open'}
          </div>
        </td>
        <td style="padding: 12px 10px; width: 23%;">${goldText}</td>
        <td style="padding: 12px 10px; width: 23%;">${silverText}</td>
        <td style="padding: 12px 10px; width: 24%;">${bronzeText}</td>
      </tr>
    `;
  });
  
  tempSheet.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #b45309; padding-bottom: 15px; margin-bottom: 25px;">
      <div>
        <h1 style="margin: 0; font-size: 1.8rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">${state.eventName || 'Championship Tournament'}</h1>
        <p style="margin: 3px 0 0 0; font-size: 0.9rem; color: #b45309; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Championship Winners & Podium Medallists</p>
        <p style="margin: 2px 0 0 0; font-size: 0.8rem; color: #64748b;">${state.eventDate || ''} | ${state.eventLocation || ''}</p>
      </div>
      <div style="text-align: right;">
        ${logoHTML}
      </div>
    </div>
    
    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-top: 10px;">
      <thead>
        <tr style="background-color: #0f172a; color: #ffffff; border-bottom: 2px solid #b45309;">
          <th style="padding: 10px; font-weight: 700; text-align: left; border-top-left-radius: 4px;">Division / Category</th>
          <th style="padding: 10px; font-weight: 700; text-align: left;">🥇 Gold Champion</th>
          <th style="padding: 10px; font-weight: 700; text-align: left;">🥈 Silver Medallist</th>
          <th style="padding: 10px; font-weight: 700; text-align: left; border-top-right-radius: 4px;">🥉 Bronze Medallist</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHTML}
      </tbody>
    </table>
    
    <div style="margin-top: 40px; border-top: 1px dashed #cbd5e1; padding-top: 15px; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #64748b;">
      <span>Official Podium Standings Report | Championship Tournament Suite</span>
      <span>${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  `;
  
  document.body.appendChild(tempSheet);
  
  const opt = {
    margin:       [10, 10, 10, 10],
    filename:     `tournament_winners_${Date.now()}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, letterRendering: true, scrollY: 0, scrollX: 0 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(tempSheet).save().then(() => {
    document.body.removeChild(tempSheet);
    showToast("Tournament winners PDF downloaded successfully!", "success");
  }).catch(err => {
    if (document.body.contains(tempSheet)) {
      document.body.removeChild(tempSheet);
    }
    console.error("Winners PDF export failed:", err);
    showToast("Error generating tournament winners PDF.", "error");
  });
}

function openStaffProfileModal(staffId) {
  state.staff = state.staff || [];
  const member = state.staff.find(s => s.id === staffId);
  if (!member) return;

  // View Mode elements
  document.getElementById('staff-profile-name').innerText = member.name || '';
  const displayId = generateStaffId(member);
  document.getElementById('staff-profile-id').innerText = displayId;
  document.getElementById('staff-profile-dojo').innerText = member.dojo || 'No Dojo / Affiliation';

  document.getElementById('staff-profile-detail-dojo').innerText = member.dojo || 'N/A';
  document.getElementById('staff-profile-detail-role').innerText = member.role || 'Staff';
  document.getElementById('staff-profile-detail-customid').innerText = member.customId || 'None';

  const roleBadge = document.getElementById('staff-profile-role-badge');
  if (roleBadge) {
    roleBadge.innerText = member.role || 'Staff';
  }

  // View Mode Avatar
  const imgEl = document.getElementById('staff-profile-avatar-img');
  const placeholderEl = document.getElementById('staff-profile-avatar-placeholder');
  if (member.photo) {
    imgEl.src = member.photo;
    imgEl.style.display = 'block';
    placeholderEl.style.display = 'none';
  } else {
    imgEl.style.display = 'none';
    const initials = member.name ? member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '??';
    placeholderEl.innerText = initials;
    placeholderEl.style.display = 'block';
  }

  // Edit Mode elements - populate inputs
  document.getElementById('staff-profile-edit-id').value = member.id;
  document.getElementById('staff-profile-edit-name').value = member.name || '';
  document.getElementById('staff-profile-edit-role').value = member.role || 'Staff';
  document.getElementById('staff-profile-edit-dojo').value = member.dojo || '';
  document.getElementById('staff-profile-edit-customid-val').value = member.customId || '';

  // Edit Mode Photo Preview
  currentStaffProfileEditPhoto = member.photo || '';
  const editImgEl = document.getElementById('staff-profile-edit-photo-preview');
  const editPlaceholderEl = document.getElementById('staff-profile-edit-photo-placeholder');
  if (currentStaffProfileEditPhoto) {
    editImgEl.src = currentStaffProfileEditPhoto;
    editImgEl.style.display = 'block';
    editPlaceholderEl.style.display = 'none';
  } else {
    editImgEl.src = '';
    editImgEl.style.display = 'none';
    editPlaceholderEl.style.display = 'block';
  }

  // Reset view mode to visible, edit mode to hidden
  document.getElementById('staff-profile-view-mode').style.display = 'block';
  document.getElementById('staff-profile-edit-mode').style.display = 'none';

  // Open modal
  document.getElementById('modal-staff-profile').classList.add('active');
}

// ================= ADMIN SECURITY LOGIC =================
let isAdmin = false;

// Check sessionStorage so that admin status is kept if the page is refreshed during a session
if (sessionStorage.getItem('kumitemaster_is_admin') === 'true') {
  isAdmin = true;
}

function updateAdminControlStates() {
  const guestCard = document.getElementById('sidebar-guest-card');
  const adminCard = document.getElementById('sidebar-admin-card');
  
  if (isAdmin) {
    if (guestCard) guestCard.style.display = 'none';
    if (adminCard) adminCard.style.display = 'flex';
  } else {
    if (guestCard) guestCard.style.display = 'flex';
    if (adminCard) adminCard.style.display = 'none';
  }

  // All UI elements that allow making edits/changes
  const editSelectors = [
    '#dashboard-setup-demo-btn',
    '#btn-create-event',
    '#btn-delete-event',
    '#dashboard-event-name-input',
    '#dashboard-admin-name-input',
    '#dashboard-admin-title-input',
    '#dashboard-event-prefix-input',
    '#dashboard-event-date-input',
    '#dashboard-event-location-input',
    '#dashboard-event-time-input',
    '#dashboard-event-logo-btn',
    '#dashboard-admin-photo-btn',
    '#dashboard-event-banner-btn',
    '#qa-add-fighter',
    '#qa-add-category',
    '#view-import-csv-btn',
    '#view-add-category-btn',
    '#view-add-fighter-btn',
    '#bracket-generate-btn',
    '#bracket-reset-btn',
    '#bracket-add-fighter-btn',
    '#bracket-schedule-match-btn',
    '#scheduler-add-match-btn',
    '#scheduler-auto-assign-btn',
    '#scheduler-manage-tatamis-btn',
    '#staff-submit-btn',
    '#btn-staff-photo-upload',
    '#btn-badge-logo-upload',
    '#staff-registration-form input',
    '#staff-registration-form select',
    '#staff-registration-form button',
    '#btn-player-profile-edit',
    '#btn-staff-profile-edit'
  ];

  editSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (isAdmin) {
        el.removeAttribute('disabled');
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
      } else {
        if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'BUTTON') {
          el.setAttribute('disabled', 'true');
        }
        el.style.opacity = '0.5';
        el.style.pointerEvents = 'none';
      }
    });
  });

  // Toggle list action icons (edit, delete buttons inside lists and grids)
  const actionSelectors = [
    '.fighter-card-actions',
    '.category-pill .btn',
    '.action-btn-icon',
    '.tatami-card-list .btn',
    '#bracket-empty-add-fighter-btn'
  ];

  actionSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (isAdmin) {
        el.style.display = '';
        el.style.pointerEvents = 'auto';
      } else {
        el.style.display = 'none';
        el.style.pointerEvents = 'none';
      }
    });
  });
}

// Attach listeners for login / logout
function initAdminSecurityListeners() {
  const loginBtn = document.getElementById('sidebar-login-btn');
  const logoutBtn = document.getElementById('sidebar-logout-btn');
  const closeLoginBtn = document.getElementById('close-admin-login-modal');
  const loginForm = document.getElementById('admin-login-form');
  const loginModal = document.getElementById('modal-admin-login');

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      if (loginModal) {
        loginModal.classList.add('active');
        document.getElementById('admin-login-password').value = '';
        document.getElementById('admin-login-password').focus();
      }
    });
  }

  if (closeLoginBtn) {
    closeLoginBtn.addEventListener('click', () => {
      if (loginModal) loginModal.classList.remove('active');
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      isAdmin = false;
      sessionStorage.removeItem('kumitemaster_is_admin');
      updateAdminControlStates();
      showToast("Console locked. Switched to Guest View (Read-Only).", "info");
      
      // Force active view refresh to trigger rendering without edit controls
      const activeNav = document.querySelector('.sidebar .nav-item.active');
      if (activeNav) {
        const viewId = activeNav.getAttribute('data-view');
        if (viewId === 'dashboard-view') renderDashboard();
        else if (viewId === 'fighters-view') renderFightersView();
        else if (viewId === 'brackets-view') renderBracketsView();
        else if (viewId === 'scheduler-view') renderSchedulerView();
        else if (viewId === 'credentials-view') renderCredentialsView();
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const passwordVal = document.getElementById('admin-login-password').value;
      
      if (passwordVal === 'admin123') {
        isAdmin = true;
        sessionStorage.setItem('kumitemaster_is_admin', 'true');
        if (loginModal) loginModal.classList.remove('active');
        updateAdminControlStates();
        showToast("Welcome Sensei! Admin privileges unlocked.", "success");
        
        // Refresh the active view to display full editing elements
        const activeNav = document.querySelector('.sidebar .nav-item.active');
        if (activeNav) {
          const viewId = activeNav.getAttribute('data-view');
          if (viewId === 'dashboard-view') renderDashboard();
          else if (viewId === 'fighters-view') renderFightersView();
          else if (viewId === 'brackets-view') renderBracketsView();
          else if (viewId === 'scheduler-view') renderSchedulerView();
          else if (viewId === 'credentials-view') renderCredentialsView();
        }
      } else {
        showToast("Incorrect password. Please try again.", "error");
        document.getElementById('admin-login-password').value = '';
        document.getElementById('admin-login-password').focus();
      }
    });
  }

  // Google Login UI elements
  const googleSigninBtn = document.getElementById('google-signin-btn');
  const googleChooserModal = document.getElementById('modal-google-chooser');
  const closeGoogleChooserBtn = document.getElementById('close-google-chooser-modal');
  const googleAccBarun = document.getElementById('google-acc-barun');
  const googleAccGuest = document.getElementById('google-acc-guest');

  if (googleSigninBtn) {
    googleSigninBtn.addEventListener('click', () => {
      if (googleChooserModal) {
        googleChooserModal.classList.add('active');
      }
    });
  }

  if (closeGoogleChooserBtn) {
    closeGoogleChooserBtn.addEventListener('click', () => {
      if (googleChooserModal) {
        googleChooserModal.classList.remove('active');
      }
    });
  }

  const handleGoogleSuccess = (name, email, role, avatarLetter, avatarColor) => {
    isAdmin = true;
    sessionStorage.setItem('kumitemaster_is_admin', 'true');
    
    // Dynamically update admin profile inside active state and UI
    state.adminName = "Sensei " + name.split(' ')[0];
    state.adminTitle = role;
    state.adminLogo = ""; // Reset avatar photo to force placeholder initials display
    saveState();
    
    // Custom style for avatar initials placeholder
    const avatarPlaceholder = document.getElementById('sidebar-admin-avatar-placeholder');
    if (avatarPlaceholder) {
      avatarPlaceholder.innerHTML = `<span style="font-weight: 800; font-size: 1.1rem; color: #fff;">${avatarLetter}</span>`;
      const wrapper = document.querySelector('.admin-avatar-wrapper');
      if (wrapper) {
        wrapper.style.background = avatarColor;
        wrapper.style.borderColor = 'var(--accent)';
      }
    }

    if (googleChooserModal) googleChooserModal.classList.remove('active');
    if (loginModal) loginModal.classList.remove('active');
    
    updateAdminControlStates();
    showToast(`Signed in with Google as ${name}! Admin privileges unlocked.`, "success");
    
    // Refresh the active view to display full editing elements
    const activeNav = document.querySelector('.sidebar .nav-item.active');
    if (activeNav) {
      const viewId = activeNav.getAttribute('data-view');
      if (viewId === 'dashboard-view') renderDashboard();
      else if (viewId === 'fighters-view') renderFightersView();
      else if (viewId === 'brackets-view') renderBracketsView();
      else if (viewId === 'scheduler-view') renderSchedulerView();
      else if (viewId === 'credentials-view') renderCredentialsView();
    }
  };

  if (googleAccBarun) {
    googleAccBarun.addEventListener('click', () => {
      handleGoogleSuccess("Barun Assam Karate", "barun.aksa@gmail.com", "Chief Sensei", "B", "linear-gradient(135deg, #7c3aed, #10b981)");
    });
  }

  if (googleAccGuest) {
    googleAccGuest.addEventListener('click', () => {
      handleGoogleSuccess("Guest Tester", "tester@gmail.com", "Tournament Host", "G", "linear-gradient(135deg, #3b82f6, #60a5fa)");
    });
  }
}


// ===================== SETTINGS PANEL =====================

// Store appearance settings separately (so they survive page load)
const APPEARANCE_KEY = 'kumitemaster_appearance';

function loadAppearanceSettings() {
  try {
    const raw = localStorage.getItem(APPEARANCE_KEY);
    if (!raw) return;
    const ap = JSON.parse(raw);
    if (ap.primaryColor) _applyPrimaryColorVars(ap.primaryColor, ap.primaryHover || ap.primaryColor, ap.primaryGlow || 'rgba(124,58,237,0.35)');
    if (ap.accentColor) _applyAccentColorVars(ap.accentColor, ap.accentGlow || 'rgba(16,185,129,0.2)');
    if (ap.sidebarStyle) _applySidebarStyleClass(ap.sidebarStyle);
    if (ap.fontSize) _applyFontSizeClass(ap.fontSize);
  } catch (e) { /* ignore */ }
}

function saveAppearanceSettings(key, value) {
  try {
    const raw = localStorage.getItem(APPEARANCE_KEY);
    const ap = raw ? JSON.parse(raw) : {};
    Object.assign(ap, key === 'object' ? value : { [key]: value });
    localStorage.setItem(APPEARANCE_KEY, JSON.stringify(ap));
  } catch (e) { /* ignore */ }
}

function syncSettingsUI() {
  // Theme mode
  const isDark = state.theme !== 'light';
  document.getElementById('settings-dark-btn')?.classList.toggle('active', isDark);
  document.getElementById('settings-light-btn')?.classList.toggle('active', !isDark);

  // Load stored appearance prefs into UI
  try {
    const raw = localStorage.getItem(APPEARANCE_KEY);
    if (!raw) return;
    const ap = JSON.parse(raw);

    // Primary colour swatches
    if (ap.primaryColor) {
      document.querySelectorAll('#primary-color-presets .settings-color-swatch').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.color === ap.primaryColor);
      });
    }

    // Accent colour swatches
    if (ap.accentColor) {
      document.querySelectorAll('#accent-color-presets .settings-color-swatch').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.color === ap.accentColor);
      });
    }

    // Sidebar style
    if (ap.sidebarStyle) {
      document.querySelectorAll('.settings-sidebar-style-btn').forEach(btn => btn.classList.remove('active'));
      document.getElementById(`sidebar-style-${ap.sidebarStyle}`)?.classList.add('active');
    }

    // Font size
    if (ap.fontSize) {
      document.querySelectorAll('.settings-font-btn').forEach(btn => btn.classList.remove('active'));
      document.getElementById(`font-size-${ap.fontSize}`)?.classList.add('active');
    }
  } catch (e) { /* ignore */ }

  // Sync branding fields
  const brandTitleInput = document.getElementById('settings-branding-title');
  if (brandTitleInput) {
    brandTitleInput.value = state.brandTitle || 'ASSAM KARATE';
  }
  const brandSubtitleInput = document.getElementById('settings-branding-subtitle');
  if (brandSubtitleInput) {
    brandSubtitleInput.value = state.brandSubtitle || 'Association';
  }
  const brandLogoPreview = document.getElementById('settings-branding-logo-preview');
  if (brandLogoPreview) {
    brandLogoPreview.src = state.eventLogo || 'logo.png';
  }
}

// ---- Theme Mode ----
function setThemeMode(mode) {
  state.theme = mode;
  saveState();
  applyTheme();
  syncSettingsUI();
  showToast(`Switched to ${mode === 'light' ? '☀️ Light' : '🌑 Dark'} Mode`, 'success');
}

// ---- Primary Colour ----
function setPrimaryColor(color, hover, glow) {
  _applyPrimaryColorVars(color, hover, glow);
  saveAppearanceSettings('object', { primaryColor: color, primaryHover: hover, primaryGlow: glow });
  document.querySelectorAll('#primary-color-presets .settings-color-swatch').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.color === color);
  });
  showToast('🎨 Primary colour updated!', 'success');
}

function applyCustomPrimaryColor(color) {
  // Generate a slightly darker hover and glow from the chosen colour
  const hover = _darkenHex(color, 15);
  const glow = _hexToRgba(color, 0.35);
  _applyPrimaryColorVars(color, hover, glow);
  saveAppearanceSettings('object', { primaryColor: color, primaryHover: hover, primaryGlow: glow });
  document.querySelectorAll('#primary-color-presets .settings-color-swatch').forEach(btn => btn.classList.remove('active'));
}

function _applyPrimaryColorVars(color, hover, glow) {
  const root = document.documentElement;
  root.style.setProperty('--primary', color);
  root.style.setProperty('--primary-hover', hover);
  root.style.setProperty('--primary-glow', glow);
  root.style.setProperty('--secondary', hover);
  root.style.setProperty('--secondary-glow', _hexToRgba(hover, 0.3));
  root.style.setProperty('--border-hover', _hexToRgba(color, 0.4));
}

// ---- Accent Colour ----
function setAccentColor(color, glow) {
  _applyAccentColorVars(color, glow);
  saveAppearanceSettings('object', { accentColor: color, accentGlow: glow });
  document.querySelectorAll('#accent-color-presets .settings-color-swatch').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.color === color);
  });
  showToast('✨ Accent colour updated!', 'success');
}

function applyCustomAccentColor(color) {
  const glow = _hexToRgba(color, 0.2);
  _applyAccentColorVars(color, glow);
  saveAppearanceSettings('object', { accentColor: color, accentGlow: glow });
  document.querySelectorAll('#accent-color-presets .settings-color-swatch').forEach(btn => btn.classList.remove('active'));
}

function _applyAccentColorVars(color, glow) {
  const root = document.documentElement;
  root.style.setProperty('--accent', color);
  root.style.setProperty('--accent-glow', glow);
}

// ---- Sidebar Style ----
function setSidebarStyle(style) {
  _applySidebarStyleClass(style);
  saveAppearanceSettings('sidebarStyle', style);
  document.querySelectorAll('.settings-sidebar-style-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`sidebar-style-${style}`)?.classList.add('active');
  showToast(`🗂️ Sidebar style: ${style.charAt(0).toUpperCase() + style.slice(1)}`, 'success');
}

function _applySidebarStyleClass(style) {
  document.body.classList.remove('sidebar-solid', 'sidebar-minimal');
  if (style === 'solid') document.body.classList.add('sidebar-solid');
  if (style === 'minimal') document.body.classList.add('sidebar-minimal');
}

// ---- Font Size ----
function setFontSize(size) {
  _applyFontSizeClass(size);
  saveAppearanceSettings('fontSize', size);
  document.querySelectorAll('.settings-font-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`font-size-${size}`)?.classList.add('active');
  showToast(`🔤 Font size: ${size.toUpperCase()}`, 'success');
}

function _applyFontSizeClass(size) {
  document.body.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');
  document.body.classList.add(`font-size-${size}`);
}

// ---- Reset Appearance ----
function resetAppearance() {
  localStorage.removeItem(APPEARANCE_KEY);
  const root = document.documentElement;
  root.style.setProperty('--primary', '#7c3aed');
  root.style.setProperty('--primary-hover', '#6d28d9');
  root.style.setProperty('--primary-glow', 'rgba(124,58,237,0.35)');
  root.style.setProperty('--secondary', '#4f46e5');
  root.style.setProperty('--secondary-glow', 'rgba(79,70,229,0.3)');
  root.style.setProperty('--accent', '#10b981');
  root.style.setProperty('--accent-glow', 'rgba(16,185,129,0.2)');
  root.style.setProperty('--border-hover', 'rgba(124,58,237,0.4)');
  document.body.classList.remove('sidebar-solid', 'sidebar-minimal', 'font-size-sm', 'font-size-md', 'font-size-lg');
  syncSettingsUI();
  showToast('🔄 Appearance reset to defaults', 'success');
}

// ---- Utility Helpers ----
function _hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function _darkenHex(hex, amount) {
  let r = Math.max(0, parseInt(hex.slice(1,3), 16) - amount);
  let g = Math.max(0, parseInt(hex.slice(3,5), 16) - amount);
  let b = Math.max(0, parseInt(hex.slice(5,7), 16) - amount);
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

let temporaryUploadedBrandingLogo = null;

function formatBrandTitle(text) {
  if (!text) return 'ASSAM <span style="color: var(--primary);">KARATE</span>';
  const words = text.trim().split(/\s+/);
  if (words.length === 1) {
    return `<span style="color: var(--primary);">${words[0]}</span>`;
  }
  const firstPart = words.slice(0, words.length - 1).join(' ');
  const lastWord = words[words.length - 1];
  return `${firstPart} <span style="color: var(--primary);">${lastWord}</span>`;
}

function handleBrandingLogoUpload(input) {
  if (input.files && input.files[0]) {
    showToast("Processing and compressing brand logo, please wait...", "info");
    compressImage(input.files[0], (dataUrl) => {
      temporaryUploadedBrandingLogo = dataUrl;
      const previewImg = document.getElementById('settings-branding-logo-preview');
      if (previewImg) {
        previewImg.src = dataUrl;
      }
      showToast("Logo compressed successfully! Click 'Save Branding' to apply.", "success");
    });
  }
}

function saveBrandingSettings() {
  const brandTitle = document.getElementById('settings-branding-title').value.trim();
  const brandSubtitle = document.getElementById('settings-branding-subtitle').value.trim();
  
  if (!brandTitle) {
    showToast("Please enter a brand title!", "warning");
    return;
  }
  
  state.brandTitle = brandTitle;
  state.brandSubtitle = brandSubtitle || 'Association';
  
  if (temporaryUploadedBrandingLogo) {
    state.eventLogo = temporaryUploadedBrandingLogo;
    temporaryUploadedBrandingLogo = null;
  }
  
  // Sync it back to active event too so PDF draw sheets update!
  if (state.currentEventId && state.events) {
    const activeEvent = state.events.find(e => e.id === state.currentEventId);
    if (activeEvent) {
      activeEvent.logo = state.eventLogo;
    }
  }
  
  saveState();
  showToast("Association branding updated successfully!", "success");
}

function resetBrandingSettings() {
  if (confirm("Are you sure you want to reset association branding to defaults?")) {
    state.brandTitle = "ASSAM KARATE";
    state.brandSubtitle = "Association";
    state.eventLogo = "";
    temporaryUploadedBrandingLogo = null;
    
    if (state.currentEventId && state.events) {
      const activeEvent = state.events.find(e => e.id === state.currentEventId);
      if (activeEvent) {
        activeEvent.logo = "";
      }
    }
    
    saveState();
    syncSettingsUI();
    showToast("Branding reset to defaults.", "info");
  }
}

let pickerMap = null;
let pickerMarker = null;
let lastPickedAddress = "";

function initLocationPickerMap() {
  if (typeof L === 'undefined') {
    showToast("Map picker system offline. Please check internet connection.", "error");
    return;
  }

  let lat = 35.7686;
  let lon = 139.8163;
  let zoom = 14;

  const currentLocValue = document.getElementById('dashboard-event-location-input').value.trim();
  
  const mapContainer = document.getElementById('location-picker-map');
  if (!mapContainer) return;

  if (pickerMap) {
    pickerMap.remove();
    pickerMap = null;
    pickerMarker = null;
  }

  pickerMap = L.map('location-picker-map').setView([lat, lon], zoom);

  L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: 'Google Maps Roadmap'
  }).addTo(pickerMap);

  pickerMap.on('click', (e) => {
    const coords = e.latlng;
    
    if (pickerMarker) {
      pickerMarker.setLatLng(coords);
    } else {
      pickerMarker = L.marker(coords, { draggable: true }).addTo(pickerMap);
      pickerMarker.on('dragend', (ev) => {
        const draggedCoords = ev.target.getLatLng();
        reverseGeocode(draggedCoords.lat, draggedCoords.lng);
      });
    }
    
    reverseGeocode(coords.lat, coords.lng);
  });

  if (currentLocValue && currentLocValue !== "Tokyo Budokan, JP") {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(currentLocValue)}&limit=1`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const lLat = parseFloat(data[0].lat);
          const lLon = parseFloat(data[0].lon);
          
          pickerMap.setView([lLat, lLon], 16);
          pickerMarker = L.marker([lLat, lLon], { draggable: true }).addTo(pickerMap);
          pickerMarker.on('dragend', (ev) => {
            const draggedCoords = ev.target.getLatLng();
            reverseGeocode(draggedCoords.lat, draggedCoords.lng);
          });
          
          lastPickedAddress = data[0].display_name;
          document.getElementById('map-selected-address-text').textContent = lastPickedAddress;
          document.getElementById('btn-confirm-map-location').disabled = false;
        } else {
          pickerMarker = L.marker([lat, lon], { draggable: true }).addTo(pickerMap);
          pickerMarker.on('dragend', (ev) => {
            const draggedCoords = ev.target.getLatLng();
            reverseGeocode(draggedCoords.lat, draggedCoords.lng);
          });
          reverseGeocode(lat, lon);
        }
      })
      .catch(() => {
        pickerMarker = L.marker([lat, lon], { draggable: true }).addTo(pickerMap);
        pickerMarker.on('dragend', (ev) => {
          const draggedCoords = ev.target.getLatLng();
          reverseGeocode(draggedCoords.lat, draggedCoords.lng);
        });
        reverseGeocode(lat, lon);
      });
  } else {
    pickerMarker = L.marker([lat, lon], { draggable: true }).addTo(pickerMap);
    pickerMarker.on('dragend', (ev) => {
      const draggedCoords = ev.target.getLatLng();
      reverseGeocode(draggedCoords.lat, draggedCoords.lng);
    });
    reverseGeocode(lat, lon);
  }

  setTimeout(() => {
    if (pickerMap) pickerMap.invalidateSize();
  }, 100);
}

function reverseGeocode(lat, lon) {
  const addressDisplay = document.getElementById('map-selected-address-text');
  const confirmBtn = document.getElementById('btn-confirm-map-location');
  
  if (addressDisplay) addressDisplay.textContent = "📍 Catching address details from Google Map, please wait...";
  if (confirmBtn) confirmBtn.disabled = true;

  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`, {
    headers: {
      'Accept-Language': 'en'
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data && data.display_name) {
        const cleanAddress = data.display_name;
        lastPickedAddress = cleanAddress;
        if (addressDisplay) addressDisplay.textContent = cleanAddress;
        if (confirmBtn) confirmBtn.disabled = false;
      } else {
        const coordsText = `Coordinates: Lat ${lat.toFixed(5)}, Lon ${lon.toFixed(5)}`;
        lastPickedAddress = `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
        if (addressDisplay) addressDisplay.textContent = coordsText;
        if (confirmBtn) confirmBtn.disabled = false;
      }
    })
    .catch(err => {
      console.error("Reverse geocode failed:", err);
      const coordsText = `Coordinates: Lat ${lat.toFixed(5)}, Lon ${lon.toFixed(5)}`;
      lastPickedAddress = `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
      if (addressDisplay) addressDisplay.textContent = coordsText;
      if (confirmBtn) confirmBtn.disabled = false;
    });
}

function performMapSearch() {
  const queryInput = document.getElementById('map-search-input');
  if (!queryInput) return;

  const query = queryInput.value.trim();
  if (!query) {
    showToast("Please type a location or stadium name to search!", "warning");
    return;
  }

  const addressDisplay = document.getElementById('map-selected-address-text');
  const confirmBtn = document.getElementById('btn-confirm-map-location');
  
  if (addressDisplay) addressDisplay.textContent = "🔍 Searching Google Map for query...";

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`, {
    headers: {
      'Accept-Language': 'en'
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data && data.length > 0) {
        const sLat = parseFloat(data[0].lat);
        const sLon = parseFloat(data[0].lon);
        const cleanAddress = data[0].display_name;

        if (pickerMap) {
          pickerMap.setView([sLat, sLon], 16);
        }

        if (pickerMarker) {
          pickerMarker.setLatLng([sLat, sLon]);
        } else if (pickerMap) {
          pickerMarker = L.marker([sLat, sLon], { draggable: true }).addTo(pickerMap);
          pickerMarker.on('dragend', (ev) => {
            const draggedCoords = ev.target.getLatLng();
            reverseGeocode(draggedCoords.lat, draggedCoords.lng);
          });
        }

        lastPickedAddress = cleanAddress;
        if (addressDisplay) addressDisplay.textContent = cleanAddress;
        if (confirmBtn) confirmBtn.disabled = false;
        showToast("Location found! Pin moved.", "success");
      } else {
        if (addressDisplay) addressDisplay.textContent = "Search returned no matching results.";
        showToast("No locations matching your query could be found.", "warning");
      }
    })
    .catch(err => {
      console.error("Geocoding query failed:", err);
      showToast("Connection to map query service failed.", "error");
      if (addressDisplay) addressDisplay.textContent = "Geocoding service currently unavailable.";
    });
}

function confirmPickedLocation() {
  if (!lastPickedAddress) return;

  const locInput = document.getElementById('dashboard-event-location-input');
  if (locInput) {
    locInput.value = lastPickedAddress;
    state.eventLocation = lastPickedAddress;
    
    if (state.currentEventId && state.events) {
      const activeEvent = state.events.find(e => e.id === state.currentEventId);
      if (activeEvent) {
        activeEvent.eventLocation = lastPickedAddress;
      }
    }
  }

  const mapModal = document.getElementById('modal-location-map');
  if (mapModal) {
    mapModal.classList.remove('active');
  }
  showToast("📍 Event Location caught and saved successfully!", "success");
  saveState();
}

// ================= SUPABASE REALTIME SYNC INTEGRATION =================

let supabaseClient = null;
let supabaseChannel = null;
let isSyncingFromSupabase = false;

// Initialize Supabase on application load
function initSupabaseOnLoad() {
  const defaultUrl = 'https://tcmqgwpgrbohrqkkdgko.supabase.co';
  const defaultKey = 'sb_publishable_CngZ5fNyKcznjVHfPvYULQ_w3OEACY0';

  const isDisabled = localStorage.getItem('supabase_disabled') === 'true';
  const url = isDisabled ? null : (localStorage.getItem('supabase_url') || defaultUrl);
  const key = isDisabled ? null : (localStorage.getItem('supabase_key') || defaultKey);
  
  // Populate UI inputs if keys exist
  const urlInput = document.getElementById('settings-supabase-url');
  const keyInput = document.getElementById('settings-supabase-key');
  if (urlInput) urlInput.value = url || '';
  if (keyInput) keyInput.value = key || '';

  if (url && key) {
    setupSupabaseClient(url, key, true);
  } else {
    updateSupabaseStatusUI('disconnected', 'Disconnected from Supabase (Local Storage only).');
  }
}

// Set up the Supabase Client and subscribe to realtime changes
async function setupSupabaseClient(url, key, isOnLoad = false) {
  try {
    if (typeof supabase === 'undefined') {
      console.warn("Supabase library not loaded. Check internet connection.");
      updateSupabaseStatusUI('error', 'Failed to load Supabase SDK. Please check your internet connection.');
      return false;
    }
    
    updateSupabaseStatusUI('connecting', 'Connecting to Supabase...');
    supabaseClient = supabase.createClient(url, key);
    
    // Test connection by fetching the current event row
    const eventId = state.currentEventId || 'event-default';
    const { data, error } = await supabaseClient
      .from('tournaments')
      .select('*')
      .eq('id', eventId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    // Save keys to localStorage for persistence
    localStorage.setItem('supabase_url', url);
    localStorage.setItem('supabase_key', key);

    // Sync state
    if (data) {
      console.log('Supabase: Synced tournament state from cloud database.');
      isSyncingFromSupabase = true;
      
      // Update local state (unpacking active event state)
      state.events = state.events || [];
      const localEventIdx = state.events.findIndex(e => e.id === eventId);
      if (localEventIdx !== -1) {
        state.events[localEventIdx] = data.data;
      } else {
        state.events.push(data.data);
      }
      state.currentEventId = eventId;
      
      unpackEventState(data.data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      renderAll();
      updateBrandingUI();
      isSyncingFromSupabase = false;
      
      if (!isOnLoad) {
        showToast("Connected to Supabase. State synchronized successfully!", "success");
      }
    } else {
      console.log('Supabase: Creating tournament row in cloud database...');
      await uploadStateToSupabase();
      if (!isOnLoad) {
        showToast("Connected. Initial state uploaded to Supabase!", "success");
      }
    }

    // Subscribe to Realtime notifications for this specific event row
    subscribeToRealtime(eventId);
    updateSupabaseStatusUI('connected', 'Connected and syncing in real-time!');
    return true;
  } catch (err) {
    console.error('Supabase setup error:', err);
    updateSupabaseStatusUI('error', `Connection failed: ${err.message || err}`);
    if (!isOnLoad) {
      showToast("Supabase connection failed! Check your credentials and table schema.", "error");
    }
    return false;
  }
}

// Unpack an event state object into top-level state
function unpackEventState(activeEvent) {
  state.eventName = activeEvent.name || "KumiteMaster Championship";
  state.eventLogo = activeEvent.logo || "";
  state.adminLogo = activeEvent.adminPhoto || "";
  state.adminName = activeEvent.adminName || "Sensei Admin";
  state.adminTitle = activeEvent.adminTitle || "Tournament Host";
  state.categories = activeEvent.categories || [];
  state.fighters = activeEvent.fighters || [];
  state.matches = activeEvent.matches || [];
  state.tatamis = activeEvent.tatamis || [
    { id: 1, name: "Tatami 1" },
    { id: 2, name: "Tatami 2" },
    { id: 3, name: "Tatami 3" }
  ];
  state.staff = activeEvent.staff || [];
  state.badgeBg = activeEvent.badgeBg || "classic-white";
  state.badgeSize = activeEvent.badgeSize || "cr80";
  state.badgeWidth = activeEvent.badgeWidth || 54;
  state.badgeHeight = activeEvent.badgeHeight || 86;
  state.badgeBgStyle = activeEvent.badgeBgStyle || "solid";
  state.badgeBgColor1 = activeEvent.badgeBgColor1 || "#ffffff";
  state.badgeBgColor2 = activeEvent.badgeBgColor2 || "#f3f4f6";
  state.badgeTextColor = activeEvent.badgeTextColor || "#1e293b";
  state.badgeAccentColor = activeEvent.badgeAccentColor || "#7c3aed";
  state.badgeFont = activeEvent.badgeFont || "Inter";
  state.badgeTextScale = activeEvent.badgeTextScale || "medium";
  state.badgeShowLogo = activeEvent.badgeShowLogo !== undefined ? activeEvent.badgeShowLogo : true;
  state.badgeLogo = activeEvent.badgeLogo || "";
  state.badgeBgImg = activeEvent.badgeBgImg || "";
  state.badgeHeaderSize = activeEvent.badgeHeaderSize || "";
  state.badgeIdSize = activeEvent.badgeIdSize || "";
  state.badgeShowSignature = activeEvent.badgeShowSignature !== undefined ? activeEvent.badgeShowSignature : true;
  state.badgeAuthName = activeEvent.badgeAuthName || "";
  state.badgeAuthTitle = activeEvent.badgeAuthTitle || "";
  state.eventDate = activeEvent.eventDate || "May 25, 2026";
  state.eventLocation = activeEvent.eventLocation || "Tokyo Budokan, JP";
  state.eventTime = activeEvent.eventTime || "09:00 AM";
  state.bannerPhoto = activeEvent.bannerPhoto || "";
  state.eventPrefix = activeEvent.eventPrefix || "";
}

// Pack top level properties into a single event state object for upload
function packEventState() {
  return {
    id: state.currentEventId || 'event-default',
    name: state.eventName || "KumiteMaster Championship",
    logo: state.eventLogo || "",
    adminPhoto: state.adminLogo || "",
    adminName: state.adminName || "Sensei Admin",
    adminTitle: state.adminTitle || "Tournament Host",
    categories: state.categories || [],
    fighters: state.fighters || [],
    matches: state.matches || [],
    tatamis: state.tatamis || [
      { id: 1, name: "Tatami 1" },
      { id: 2, name: "Tatami 2" },
      { id: 3, name: "Tatami 3" }
    ],
    staff: state.staff || [],
    badgeBg: state.badgeBg || "classic-white",
    badgeSize: state.badgeSize || "cr80",
    badgeWidth: state.badgeWidth || 54,
    badgeHeight: state.badgeHeight || 86,
    badgeBgStyle: state.badgeBgStyle || "solid",
    badgeBgColor1: state.badgeBgColor1 || "#ffffff",
    badgeBgColor2: state.badgeBgColor2 || "#f3f4f6",
    badgeTextColor: state.badgeTextColor || "#1e293b",
    badgeAccentColor: state.badgeAccentColor || "#7c3aed",
    badgeFont: state.badgeFont || "Inter",
    badgeTextScale: state.badgeTextScale || "medium",
    badgeShowLogo: state.badgeShowLogo !== undefined ? state.badgeShowLogo : true,
    badgeLogo: state.badgeLogo || "",
    badgeBgImg: state.badgeBgImg || "",
    badgeHeaderSize: state.badgeHeaderSize || "",
    badgeIdSize: state.badgeIdSize || "",
    badgeShowSignature: state.badgeShowSignature !== undefined ? state.badgeShowSignature : true,
    badgeAuthName: state.badgeAuthName || "",
    badgeAuthTitle: state.badgeAuthTitle || "",
    eventDate: state.eventDate || "May 25, 2026",
    eventLocation: state.eventLocation || "Tokyo Budokan, JP",
    eventTime: state.eventTime || "09:00 AM",
    bannerPhoto: state.bannerPhoto || "",
    eventPrefix: state.eventPrefix || ""
  };
}

// Upload current event's state to Supabase
async function uploadStateToSupabase() {
  if (!supabaseClient) return;
  
  const eventId = state.currentEventId || 'event-default';
  const name = state.eventName || "KumiteMaster Championship";
  const eventData = packEventState();
  
  try {
    const { error } = await supabaseClient
      .from('tournaments')
      .upsert({
        id: eventId,
        name: name,
        data: eventData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
      
    if (error) throw error;
    console.log('Supabase: Uploaded state update.');
  } catch (err) {
    console.error('Supabase upload failed:', err);
  }
}

// Subscribe to Supabase Realtime channel for table updates
function subscribeToRealtime(eventId) {
  if (!supabaseClient) return;
  
  if (supabaseChannel) {
    supabaseClient.removeChannel(supabaseChannel);
  }
  
  supabaseChannel = supabaseClient
    .channel('tournaments-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'tournaments',
        filter: `id=eq.${eventId}`
      },
      (payload) => {
        if (isSyncingFromSupabase) return;
        
        console.log('Supabase: Realtime update received!');
        const updatedRow = payload.new;
        if (updatedRow && updatedRow.data) {
          isSyncingFromSupabase = true;
          
          state.events = state.events || [];
          const localEventIdx = state.events.findIndex(e => e.id === eventId);
          if (localEventIdx !== -1) {
            state.events[localEventIdx] = updatedRow.data;
          } else {
            state.events.push(updatedRow.data);
          }
          
          unpackEventState(updatedRow.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          renderAll();
          updateBrandingUI();
          isSyncingFromSupabase = false;
          
          showToast("🔄 Data synced in real-time from Supabase!", "success");
        }
      }
    )
    .subscribe((status) => {
      console.log(`Supabase: Realtime subscription status: ${status}`);
    });
}

// Save button click in UI Settings card
async function connectSupabase() {
  const url = document.getElementById('settings-supabase-url').value.trim();
  const key = document.getElementById('settings-supabase-key').value.trim();
  
  if (!url || !key) {
    showToast("Please enter both the Supabase URL and Anon Key!", "warning");
    return;
  }
  
  localStorage.removeItem('supabase_disabled');
  const success = await setupSupabaseClient(url, key, false);
  if (!success) {
    localStorage.removeItem('supabase_url');
    localStorage.removeItem('supabase_key');
  }
}

// Disconnect button click in UI Settings card
function disconnectSupabase() {
  if (supabaseChannel && supabaseClient) {
    supabaseClient.removeChannel(supabaseChannel);
  }
  supabaseClient = null;
  supabaseChannel = null;
  
  localStorage.setItem('supabase_disabled', 'true');
  localStorage.removeItem('supabase_url');
  localStorage.removeItem('supabase_key');
  
  const urlInput = document.getElementById('settings-supabase-url');
  const keyInput = document.getElementById('settings-supabase-key');
  if (urlInput) urlInput.value = '';
  if (keyInput) keyInput.value = '';
  
  updateSupabaseStatusUI('disconnected', 'Disconnected from Supabase (Local Storage only).');
  showToast("Disconnected from Supabase. Falling back to local storage.", "info");
}

// Update the connection status card UI message
function updateSupabaseStatusUI(status, message) {
  const msgDiv = document.getElementById('supabase-status-message');
  if (!msgDiv) return;
  
  msgDiv.style.display = 'block';
  msgDiv.innerText = message;
  
  msgDiv.className = '';
  if (status === 'connected') {
    msgDiv.style.background = 'rgba(16, 185, 129, 0.1)';
    msgDiv.style.color = '#10b981';
    msgDiv.style.border = '1px solid rgba(16, 185, 129, 0.2)';
  } else if (status === 'connecting') {
    msgDiv.style.background = 'rgba(245, 158, 11, 0.1)';
    msgDiv.style.color = '#f59e0b';
    msgDiv.style.border = '1px solid rgba(245, 158, 11, 0.2)';
  } else if (status === 'error') {
    msgDiv.style.background = 'rgba(239, 68, 68, 0.1)';
    msgDiv.style.color = '#ef4444';
    msgDiv.style.border = '1px solid rgba(239, 68, 68, 0.2)';
  } else {
    msgDiv.style.background = 'rgba(255, 255, 255, 0.05)';
    msgDiv.style.color = 'var(--text-muted)';
    msgDiv.style.border = '1px solid var(--border-color)';
  }
}

