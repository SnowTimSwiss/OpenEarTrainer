const STORAGE_KEY = "open-ear-trainer-stats-v1";

const MODES = [
  { id: "hear", label: "Hoeren" },
  { id: "sing", label: "Singen" },
];

const CATEGORIES = {
  intervale: {
    label: "Intervalle",
    description: "Intervalle hoeren oder vom Grundton aus singen.",
    answerLabel: "Intervall",
    exerciseKinds: [
      { id: "m2", label: "kleine Sekunde", semitones: 1 },
      { id: "M2", label: "grosse Sekunde", semitones: 2 },
      { id: "m3", label: "kleine Terz", semitones: 3 },
      { id: "M3", label: "grosse Terz", semitones: 4 },
      { id: "P4", label: "reine Quarte", semitones: 5 },
      { id: "TT", label: "Tritonus", semitones: 6 },
      { id: "P5", label: "reine Quinte", semitones: 7 },
      { id: "m6", label: "kleine Sexte", semitones: 8 },
      { id: "M6", label: "grosse Sexte", semitones: 9 },
      { id: "m7", label: "kleine Septime", semitones: 10 },
      { id: "M7", label: "grosse Septime", semitones: 11 },
      { id: "P8", label: "Oktave", semitones: 12 },
    ],
    generator: generateIntervalExercise,
  },
  dreiklaenge: {
    label: "Dreiklaenge",
    description: "Dur, Moll, vermindert, uebermaessig mit Umkehrungen.",
    answerLabel: "Dreiklang",
    exerciseKinds: [
      { id: "maj-root", label: "Dur Grundstellung", intervals: [0, 4, 7] },
      { id: "maj-1", label: "Dur 1. Umkehrung", intervals: [0, 3, 8] },
      { id: "maj-2", label: "Dur 2. Umkehrung", intervals: [0, 5, 9] },
      { id: "min-root", label: "Moll Grundstellung", intervals: [0, 3, 7] },
      { id: "min-1", label: "Moll 1. Umkehrung", intervals: [0, 4, 9] },
      { id: "min-2", label: "Moll 2. Umkehrung", intervals: [0, 5, 8] },
      { id: "dim-root", label: "Vermindert Grundstellung", intervals: [0, 3, 6] },
      { id: "dim-1", label: "Vermindert 1. Umkehrung", intervals: [0, 3, 9] },
      { id: "dim-2", label: "Vermindert 2. Umkehrung", intervals: [0, 6, 9] },
      { id: "aug-root", label: "Uebermaessig Grundstellung", intervals: [0, 4, 8] },
      { id: "aug-1", label: "Uebermaessig 1. Umkehrung", intervals: [0, 4, 8] },
      { id: "aug-2", label: "Uebermaessig 2. Umkehrung", intervals: [0, 4, 8] },
    ],
    generator: generateChordExercise,
  },
  vierklaenge: {
    label: "Vierklaenge",
    description: "Maj7, moll7, Dominant7 und vermindert zufaellig gemischt.",
    answerLabel: "Vierklang",
    exerciseKinds: [
      { id: "maj7-root", label: "Maj7 Grundstellung", intervals: [0, 4, 7, 11] },
      { id: "maj7-1", label: "Maj7 1. Umkehrung", intervals: [0, 3, 7, 8] },
      { id: "maj7-2", label: "Maj7 2. Umkehrung", intervals: [0, 4, 5, 9] },
      { id: "maj7-3", label: "Maj7 3. Umkehrung", intervals: [0, 1, 5, 8] },
      { id: "min7-root", label: "Moll7 Grundstellung", intervals: [0, 3, 7, 10] },
      { id: "min7-1", label: "Moll7 1. Umkehrung", intervals: [0, 4, 7, 9] },
      { id: "min7-2", label: "Moll7 2. Umkehrung", intervals: [0, 3, 5, 8] },
      { id: "min7-3", label: "Moll7 3. Umkehrung", intervals: [0, 2, 5, 9] },
      { id: "dom7-root", label: "Dom7 Grundstellung", intervals: [0, 4, 7, 10] },
      { id: "dom7-1", label: "Dom7 1. Umkehrung", intervals: [0, 3, 6, 8] },
      { id: "dom7-2", label: "Dom7 2. Umkehrung", intervals: [0, 3, 5, 9] },
      { id: "dom7-3", label: "Dom7 3. Umkehrung", intervals: [0, 2, 6, 9] },
      { id: "dim7-root", label: "Vermindert7 Grundstellung", intervals: [0, 3, 6, 9] },
      { id: "dim7-1", label: "Vermindert7 1. Umkehrung", intervals: [0, 3, 6, 9] },
      { id: "dim7-2", label: "Vermindert7 2. Umkehrung", intervals: [0, 3, 6, 9] },
      { id: "dim7-3", label: "Vermindert7 3. Umkehrung", intervals: [0, 3, 6, 9] },
    ],
    generator: generateChordExercise,
  },
  tonmaterial: {
    label: "Tonmaterial",
    description: "Kirchentonleitern und weitere Skalen erkennen oder singen.",
    answerLabel: "Tonmaterial",
    exerciseKinds: [
      { id: "ionisch", label: "Ionisch / Dur", intervals: [0, 2, 4, 5, 7, 9, 11, 12] },
      { id: "dorisch", label: "Dorisch", intervals: [0, 2, 3, 5, 7, 9, 10, 12] },
      { id: "phrygisch", label: "Phrygisch", intervals: [0, 1, 3, 5, 7, 8, 10, 12] },
      { id: "lydisch", label: "Lydisch", intervals: [0, 2, 4, 6, 7, 9, 11, 12] },
      { id: "mixolydisch", label: "Mixolydisch", intervals: [0, 2, 4, 5, 7, 9, 10, 12] },
      { id: "aeolisch", label: "Aeolisch / Moll", intervals: [0, 2, 3, 5, 7, 8, 10, 12] },
      { id: "lokrisch", label: "Lokrisch", intervals: [0, 1, 3, 5, 6, 8, 10, 12] },
      { id: "harm-moll", label: "Harmonisch Moll", intervals: [0, 2, 3, 5, 7, 8, 11, 12] },
      { id: "mel-moll", label: "Melodisch Moll", intervals: [0, 2, 3, 5, 7, 9, 11, 12] },
      { id: "ganzton", label: "Ganztonleiter", intervals: [0, 2, 4, 6, 8, 10, 12] },
      { id: "halb-ganz", label: "Halbton-Ganzton", intervals: [0, 1, 3, 4, 6, 7, 9, 10, 12] },
      { id: "harm-dur", label: "Harmonisch Dur", intervals: [0, 2, 4, 5, 7, 8, 11, 12] },
    ],
    generator: generateScaleExercise,
  },
};

const state = {
  mode: "hear",
  category: "intervale",
  currentExercise: null,
  revealed: false,
  singStep: "idle",
  statsOpen: false,
  introOpen: true,
  queues: {},
  stats: loadStats(),
};

const el = {};
let audioContext;

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  renderModeButtons();
  renderCategoryButtons();
  bindEvents();
  renderIntro();
  renderSession();
  renderStats();
  renderCategoryStats();
  renderStatsVisibility();
  renderExercise();
});

function cacheElements() {
  Object.assign(el, {
    modeButtons: document.getElementById("modeButtons"),
    categoryButtons: document.getElementById("categoryButtons"),
    sessionTitle: document.getElementById("sessionTitle"),
    sessionDescription: document.getElementById("sessionDescription"),
    newExerciseBtn: document.getElementById("newExerciseBtn"),
    playPromptBtn: document.getElementById("playPromptBtn"),
    revealBtn: document.getElementById("revealBtn"),
    taskTitle: document.getElementById("taskTitle"),
    taskInstructions: document.getElementById("taskInstructions"),
    difficultyBadge: document.getElementById("difficultyBadge"),
    singPanel: document.getElementById("singPanel"),
    singFlowText: document.getElementById("singFlowText"),
    singControls: document.getElementById("singControls"),
    playReferenceBtn: document.getElementById("playReferenceBtn"),
    playSolutionBtn: document.getElementById("playSolutionBtn"),
    doneSingingBtn: document.getElementById("doneSingingBtn"),
    feedbackBox: document.getElementById("feedbackBox"),
    answerOptions: document.getElementById("answerOptions"),
    answersSection: document.getElementById("answersSection"),
    globalStats: document.getElementById("globalStats"),
    categoryStatsTitle: document.getElementById("categoryStatsTitle"),
    categoryStats: document.getElementById("categoryStats"),
    resetStatsBtn: document.getElementById("resetStatsBtn"),
    closeStatsBtn: document.getElementById("closeStatsBtn"),
    statsPanel: document.getElementById("statsPanel"),
    toggleStatsBtn: document.getElementById("toggleStatsBtn"),
    introModal: document.getElementById("introModal"),
    introModeButtons: document.getElementById("introModeButtons"),
    introCategoryButtons: document.getElementById("introCategoryButtons"),
    startTrainingBtn: document.getElementById("startTrainingBtn"),
  });
}

function bindEvents() {
  el.newExerciseBtn.addEventListener("click", newExercise);
  el.playPromptBtn.addEventListener("click", playPrompt);
  el.revealBtn.addEventListener("click", revealSolution);
  el.playReferenceBtn.addEventListener("click", () => playReference(state.currentExercise));
  el.playSolutionBtn.addEventListener("click", () => playSolution(state.currentExercise));
  el.doneSingingBtn.addEventListener("click", markSingingDone);
  el.resetStatsBtn.addEventListener("click", resetStats);
  el.closeStatsBtn.addEventListener("click", toggleStats);
  el.toggleStatsBtn.addEventListener("click", toggleStats);
  el.startTrainingBtn.addEventListener("click", () => {
    state.introOpen = false;
    renderIntro();
    renderSession();
    renderExercise();
  });
}

function renderModeButtons() {
  renderButtonSet(el.modeButtons, MODES, state.mode, (modeId) => {
    state.mode = modeId;
    state.currentExercise = null;
    state.revealed = false;
    state.singStep = "idle";
    renderModeButtons();
    renderSession();
    renderExercise();
    renderStatsVisibility();
  });

  if (el.introModeButtons) {
    renderButtonSet(el.introModeButtons, MODES, state.mode, (modeId) => {
      state.mode = modeId;
      state.currentExercise = null;
      state.revealed = false;
      state.singStep = "idle";
      renderModeButtons();
      renderSession();
      renderExercise();
    });
  }
}

function renderCategoryButtons() {
  const categories = Object.entries(CATEGORIES).map(([id, category]) => ({ id, label: category.label }));

  renderButtonSet(el.categoryButtons, categories, state.category, (categoryId) => {
    state.category = categoryId;
    state.currentExercise = null;
    state.revealed = false;
    state.singStep = "idle";
    renderCategoryButtons();
    renderSession();
    renderExercise();
    renderCategoryStats();
    renderStatsVisibility();
  });

  if (el.introCategoryButtons) {
    renderButtonSet(el.introCategoryButtons, categories, state.category, (categoryId) => {
      state.category = categoryId;
      state.currentExercise = null;
      state.revealed = false;
      state.singStep = "idle";
      renderCategoryButtons();
      renderSession();
      renderExercise();
      renderCategoryStats();
    });
  }
}

function renderButtonSet(container, items, activeId, onClick) {
  container.innerHTML = "";
  items.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item.label;
    if (item.id === activeId) button.classList.add("active");
    button.addEventListener("click", () => onClick(item.id));
    container.appendChild(button);
  });
}

function renderSession() {
  const category = CATEGORIES[state.category];
  el.sessionTitle.textContent = `${state.mode === "hear" ? "Hoeren" : "Singen"}: ${category.label}`;
  el.sessionDescription.textContent = category.description;
}

function newExercise() {
  const category = CATEGORIES[state.category];
  const kind = nextKindForCategory(state.category);
  state.currentExercise = category.generator(category, kind, state.mode);
  state.revealed = false;
  state.singStep = state.mode === "sing" ? "prompt" : "idle";
  renderExercise();
  if (state.mode === "hear") {
    playPrompt();
  }
}

function renderExercise() {
  const exercise = state.currentExercise;
  el.answerOptions.innerHTML = "";
  el.feedbackBox.className = "feedback muted";
  el.feedbackBox.textContent = "Noch keine Bewertung.";

  const isSingMode = state.mode === "sing";
  const hasExercise = Boolean(exercise);
  el.singPanel.classList.toggle("hidden", !isSingMode || !hasExercise);
  el.singControls.classList.toggle("hidden", !isSingMode || !hasExercise);
  el.answersSection.classList.toggle("hidden", isSingMode || !hasExercise);

  if (!exercise) {
    el.taskTitle.textContent = "Noch keine Aufgabe";
    el.taskInstructions.textContent = "Erstelle eine Aufgabe, um zu starten.";
    el.categoryStatsTitle.textContent = `Themen-Statistik: ${CATEGORIES[state.category].label}`;
    if (el.singFlowText) {
      el.singFlowText.textContent = "Starte eine Aufgabe, um den Ablauf zu sehen.";
    }
    return;
  }

  el.taskTitle.textContent = exercise.title;
  el.taskInstructions.textContent = exercise.instructions;
  el.difficultyBadge.textContent = `${CATEGORIES[state.category].exerciseKinds.length} Varianten, zufaellig gemischt`;

  const options = [...CATEGORIES[state.category].exerciseKinds]
    .sort((a, b) => a.label.localeCompare(b.label, "de"))
    .map((kind) => {
      const button = document.createElement("button");
      button.textContent = kind.label;
      button.disabled = isSingMode;
      button.addEventListener("click", () => submitAnswer(kind.id));
      return button;
    });

  options.forEach((button) => el.answerOptions.appendChild(button));
  renderSingFlow();
  renderCategoryStats();
}

function submitAnswer(answerId) {
  const exercise = state.currentExercise;
  if (!exercise || state.mode !== "hear") return;

  const isCorrect = answerId === exercise.correctAnswerId;
  const answerButtons = [...el.answerOptions.querySelectorAll("button")];
  answerButtons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === exercise.correctAnswerLabel) button.classList.add("correct");
    if (!isCorrect && button.textContent === getKindById(state.category, answerId).label) {
      button.classList.add("wrong");
    }
  });

  recordResult(state.category, exercise.correctAnswerId, isCorrect);
  state.revealed = true;
  el.feedbackBox.className = `feedback ${isCorrect ? "good" : "bad"}`;
  el.feedbackBox.textContent = isCorrect
    ? `Richtig: ${exercise.correctAnswerLabel}`
    : `Nicht ganz. Richtig waere: ${exercise.correctAnswerLabel}`;
  renderStats();
  renderCategoryStats();
}

function revealSolution() {
  const exercise = state.currentExercise;
  if (!exercise) return;

  state.revealed = true;
  if (state.mode === "sing") {
    state.singStep = "revealed";
    el.feedbackBox.className = "feedback good";
    el.feedbackBox.textContent = `Loesung: ${exercise.correctAnswerLabel}. Jetzt kannst du die Loesung anhoeren und vergleichen.`;
    renderSingFlow();
    return;
  }

  playSolution(exercise);
}

function renderSingFlow() {
  if (!el.singFlowText) return;

  if (state.mode !== "sing" || !state.currentExercise) {
    el.singFlowText.textContent = "Starte eine Aufgabe, um den Ablauf zu sehen.";
    return;
  }

  const exercise = state.currentExercise;
  const flowByStep = {
    prompt: `1. Hoere die Aufgabe. 2. Spiele den Grundton bei Bedarf nochmals ab. 3. Singe ${exercise.correctAnswerLabel} selbst.`,
    attempted: "Dein Versuch ist abgeschlossen. Blende jetzt die Loesung ein, wenn du kontrollieren willst.",
    revealed: `Loesung sichtbar: ${exercise.correctAnswerLabel}. Spiele sie jetzt zum Vergleichen ab.`,
  };

  el.singFlowText.textContent = flowByStep[state.singStep] || flowByStep.prompt;
  el.playReferenceBtn.disabled = state.singStep === "revealed";
  el.doneSingingBtn.disabled = state.singStep === "revealed";
  el.playSolutionBtn.disabled = state.singStep !== "revealed";
}

function markSingingDone() {
  if (!state.currentExercise || state.mode !== "sing") return;
  state.singStep = "attempted";
  el.feedbackBox.className = "feedback muted";
  el.feedbackBox.textContent = "Dein Versuch ist abgeschlossen. Zeige jetzt die Loesung, wenn du vergleichen willst.";
  renderSingFlow();
}

function renderStats() {
  const overall = summarizeStats(state.stats);
  const rows = [
    { label: "Aufgaben", value: overall.total },
    { label: "Richtig", value: overall.correct },
    { label: "Quote", value: `${overall.accuracy}%` },
    { label: "Shuffle", value: "Immer aktiv" },
  ];

  el.globalStats.innerHTML = "";
  rows.forEach((row) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<strong>${row.value}</strong><span>${row.label}</span>`;
    el.globalStats.appendChild(card);
  });
}

function renderStatsVisibility() {
  el.statsPanel.classList.toggle("hidden", !state.statsOpen);
  el.toggleStatsBtn.textContent = state.statsOpen ? "Statistik ausblenden" : "Statistik anzeigen";
}

function renderIntro() {
  el.introModal.classList.toggle("hidden", !state.introOpen);
}

function renderCategoryStats() {
  const category = CATEGORIES[state.category];
  const categoryStats = state.stats[state.category] || {};
  el.categoryStatsTitle.textContent = `Themen-Statistik: ${category.label}`;
  el.categoryStats.innerHTML = "";

  category.exerciseKinds.forEach((kind) => {
    const item = categoryStats[kind.id] || { total: 0, correct: 0 };
    const accuracy = item.total ? Math.round((item.correct / item.total) * 100) : 0;
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<strong>${accuracy}%</strong><span>${kind.label}</span><p class="muted">${item.correct}/${item.total} richtig</p>`;
    el.categoryStats.appendChild(card);
  });
}

function resetStats() {
  state.stats = {};
  saveStats(state.stats);
  renderStats();
  renderCategoryStats();
  el.feedbackBox.className = "feedback muted";
  el.feedbackBox.textContent = "Statistik wurde zurueckgesetzt.";
}

function toggleStats() {
  state.statsOpen = !state.statsOpen;
  renderStatsVisibility();
}

function nextKindForCategory(categoryId) {
  if (!state.queues[categoryId] || state.queues[categoryId].length === 0) {
    state.queues[categoryId] = shuffledCopy(CATEGORIES[categoryId].exerciseKinds);
  }
  return state.queues[categoryId].pop();
}

function shuffledCopy(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateIntervalExercise(category, kind, mode) {
  const root = randomMidi(55, 66);
  const notes = [root, root + kind.semitones];
  const direction = Math.random() > 0.5 ? "aufwaerts" : "abwaerts";
  const ordered = direction === "aufwaerts" ? notes : [...notes].reverse();

  return {
    type: "interval",
    kindId: kind.id,
    title: "Intervalltraining",
    instructions: mode === "hear"
      ? "Hoere das Intervall und waehle die richtige Bezeichnung."
      : `Singe vom Grundton aus eine ${kind.label} ${direction}.`,
    root,
    notes: ordered,
    correctAnswerId: kind.id,
    correctAnswerLabel: kind.label,
  };
}

function generateChordExercise(category, kind, mode) {
  const root = randomMidi(48, 60);
  const notes = kind.intervals.map((interval) => root + interval);
  return {
    type: "chord",
    kindId: kind.id,
    title: category.label,
    instructions: mode === "hear"
      ? `${category.answerLabel} anhoeren und richtige Variante auswaehlen.`
      : `Hoere die Aufgabe, spiele den Grundton nach Bedarf ab und singe dann ${kind.label}.`,
    root,
    notes,
    correctAnswerId: kind.id,
    correctAnswerLabel: kind.label,
  };
}

function generateScaleExercise(category, kind, mode) {
  const root = randomMidi(50, 62);
  const notes = kind.intervals.map((interval) => root + interval);
  return {
    type: "scale",
    kindId: kind.id,
    title: "Tonmaterial",
    instructions: mode === "hear"
      ? "Hoere die Tonfolge und waehle die passende Skala oder den passenden Modus."
      : `Hoere die Aufgabe, spiele den Grundton nach Bedarf ab und singe dann ${kind.label}.`,
    root,
    notes,
    correctAnswerId: kind.id,
    correctAnswerLabel: kind.label,
  };
}

function playPrompt() {
  const exercise = state.currentExercise;
  if (!exercise) return;
  ensureAudio();

  if (state.mode === "sing") {
    state.singStep = "prompt";
    renderSingFlow();
  }

  if (exercise.type === "interval" || exercise.type === "scale") {
    playSequence(exercise.notes, 0.62);
  } else {
    playChord(exercise.notes, 1.25);
  }
}

function playReference(exercise) {
  if (!exercise) return;
  ensureAudio();
  playSequence([exercise.root], 0.9);
}

function playSolution(exercise) {
  if (!exercise) return;
  ensureAudio();

  if (exercise.type === "chord") {
    playSequence([exercise.root], 0.6, 0.08);
    playChord(exercise.notes, 1.3, 0.75);
    return;
  }

  playSequence([exercise.root], 0.6, 0.08);
  playSequence(exercise.notes, 0.62, 0.75);
}

function ensureAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") audioContext.resume();
}

function playSequence(notes, duration = 0.6, offset = 0) {
  const start = audioContext.currentTime + offset;
  notes.forEach((midi, index) => {
    playTone(midi, start + index * (duration + 0.04), duration);
  });
}

function playChord(notes, duration = 1.2, offset = 0) {
  const start = audioContext.currentTime + offset;
  notes.forEach((midi) => playTone(midi, start, duration, 0.16));
}

function playTone(midi, start, duration, gainValue = 0.18) {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "triangle";
  osc.frequency.value = midiToFreq(midi);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function midiToFreq(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function randomMidi(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getKindById(categoryId, kindId) {
  return CATEGORIES[categoryId].exerciseKinds.find((kind) => kind.id === kindId);
}

function loadStats() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveStats(stats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function recordResult(categoryId, kindId, isCorrect) {
  state.stats[categoryId] ||= {};
  state.stats[categoryId][kindId] ||= { total: 0, correct: 0 };
  state.stats[categoryId][kindId].total += 1;
  if (isCorrect) state.stats[categoryId][kindId].correct += 1;
  saveStats(state.stats);
}

function summarizeStats(stats) {
  let total = 0;
  let correct = 0;

  Object.values(stats).forEach((category) => {
    Object.values(category).forEach((kind) => {
      total += kind.total;
      correct += kind.correct;
    });
  });

  return {
    total,
    correct,
    accuracy: total ? Math.round((correct / total) * 100) : 0,
  };
}
