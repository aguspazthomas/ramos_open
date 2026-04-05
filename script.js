// Shared tournament config
const QUALY_SLOT_ID = "slot_qualy";
const PUBLIC_VIEW_IDS = new Set(["draws", "players", "history"]);

const roundHeadings = ["Octavos", "Cuartos", "Semifinal", "Final"];

const connectorLayout = [
  { gridColumn: "1 / 3", gridRow: "1 / 4", classes: "connector connector--short connector--forward" },
  { gridColumn: "1 / 3", gridRow: "5 / 8", classes: "connector connector--short connector--forward" },
  { gridColumn: "1 / 3", gridRow: "9 / 12", classes: "connector connector--short connector--forward" },
  { gridColumn: "1 / 3", gridRow: "13 / 16", classes: "connector connector--short connector--forward" },
  { gridColumn: "2 / 4", gridRow: "2 / 7", classes: "connector connector--medium connector--forward" },
  { gridColumn: "2 / 4", gridRow: "10 / 15", classes: "connector connector--medium connector--forward" },
  { gridColumn: "3 / 5", gridRow: "4 / 13", classes: "connector connector--long connector--forward" },
  { gridColumn: "1", gridRow: "15 / 18", classes: "connector connector--qualy" },
];

const drawRoundGrid = [
  { gridColumn: "1", rows: ["1", "3", "5", "7", "9", "11", "13", "15"], drawKey: "roundOf16" },
  { gridColumn: "2", rows: ["2", "6", "10", "14"], drawKey: "quarterFinals" },
  { gridColumn: "3", rows: ["4", "12"], drawKey: "semiFinals" },
  { gridColumn: "4", rows: ["8"], drawKey: "final" },
];

const qualyGridPlacement = {
  gridColumn: "1",
  gridRow: "17",
};

const quarterFinalSources = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
];

const ROUND_METADATA_BY_DRAW_KEY = {
  roundOf16: { idPrefix: "match_octavos", roundLabel: "Octavos" },
  quarterFinals: { idPrefix: "match_cuartos", roundLabel: "Cuartos" },
  semiFinals: { idPrefix: "match_semifinal", roundLabel: "Semifinal" },
  final: { idPrefix: "match_final", roundLabel: "Final" },
  qualy: { idPrefix: "match_qualy", roundLabel: "Qualy" },
};

const ROUND_SORT_ORDER = {
  Qualy: 0,
  Octavos: 1,
  Cuartos: 2,
  Semifinal: 3,
  Final: 4,
};

const SET_WIN_POINTS = 75;
const ROUND_WIN_POINTS = {
  Octavos: 250,
  Cuartos: 500,
  Semifinal: 750,
  Final: 1000,
};

function createEntrant(playerId = "", score = "") {
  return {
    playerId,
    score,
  };
}

function createMatchDetail(detail = {}) {
  return {
    duration: detail.duration ?? "",
    playerOrderIds: [...(detail.playerOrderIds ?? [])],
    sets: (detail.sets ?? []).map((set) => {
      if (typeof set === "string") {
        return set;
      }

      const first = set.first ?? "";
      const second = set.second ?? "";
      const tiebreak = set.tiebreak ?? "";
      const baseScore = `${first}-${second}`;

      return tiebreak !== "" ? `${baseScore}(${tiebreak})` : baseScore;
    }),
  };
}

function createPendingMatch(label, teamPlayerIds = ["", ""], date = "NO CONFIRMADO", options = {}) {
  return {
    id: options.id ?? "",
    status: options.status ?? "scheduled",
    roundLabel: options.roundLabel ?? "",
    label,
    date,
    detail: createMatchDetail(options.detail),
    teams: teamPlayerIds.map((playerId, teamIndex) => createEntrant(playerId, options.scores?.[teamIndex] ?? "")),
  };
}

// Tournament seed data
const playerSeed = [
  {
    id: "player_matias_p_mariuzza",
    name: "Matias P Mariuzza",
    photo: "",
    ranking: 8,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_matteo_manoni",
    name: "Matteo Manoni",
    photo: "",
    ranking: null,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_ramiro_fischetti",
    name: "Ramiro Fischetti",
    photo: "",
    ranking: null,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_santino_duranti",
    name: "Santino Duranti",
    photo: "",
    ranking: 5,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_tomas_liberi",
    name: "Tomas Liberi",
    photo: "",
    ranking: null,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_valentin_cerchiara",
    name: "Valentin Cerchiara",
    photo: "",
    ranking: null,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_valentin_zucconi",
    name: "Valentin Zucconi",
    photo: "",
    ranking: null,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_valentin_rego",
    name: "Valentin Rego",
    photo: "",
    ranking: 12,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_facundo_jimenez",
    name: "Facundo Jimenez",
    photo: "",
    ranking: null,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_agustin_paz",
    name: "Agustin Paz",
    photo: "",
    ranking: null,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_pedro_davice",
    name: "Pedro Davice",
    photo: "",
    ranking: null,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_santino_berlanga",
    name: "Santino Berlanga",
    photo: "",
    ranking: 4,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_nacho_velazco",
    name: "Nacho Velazco",
    photo: "",
    ranking: null,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_francisco_caparruva",
    name: "Francisco Caparruva",
    photo: "",
    ranking: null,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_gonzalo_rennis",
    name: "Gonzalo Rennis",
    photo: "",
    ranking: null,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_lautaro_zanzi",
    name: "Lautaro Zanzi",
    photo: "",
    ranking: null,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
  {
    id: "player_juan_martinez",
    name: "Juan Martinez",
    photo: "",
    ranking: null,
    stats: {},
    matches: [],
    wins: 0,
    losses: 0,
  },
];

const currentEditionDrawSeed = {
  roundOf16: [
    createPendingMatch("1", ["player_gonzalo_rennis", "player_francisco_caparruva"]),
    createPendingMatch("2", ["player_santino_berlanga", "player_matias_p_mariuzza"], "03/04/26", {
      scores: ["2", "1"],
      detail: {
        duration: "2:26 hs",
        playerOrderIds: ["player_matias_p_mariuzza", "player_santino_berlanga"],
        sets: [
          "6-4",
          "3-6",
          "4-6",
        ],
      },
    }),
    createPendingMatch("3", ["player_tomas_liberi", "player_nacho_velazco"]),
    createPendingMatch("4", ["player_valentin_zucconi", "player_matteo_manoni"]),
    createPendingMatch("5", ["player_ramiro_fischetti", "player_valentin_cerchiara"]),
    createPendingMatch("6", ["player_facundo_jimenez", "player_juan_martinez"]),
    createPendingMatch("7", ["player_santino_duranti", "player_valentin_rego"], "02/04/26", {
      scores: ["2", "0"],
      detail: {
        duration: "1:50 hs",
        playerOrderIds: ["player_santino_duranti", "player_valentin_rego"],
        sets: [
          "6-4",
          "7-6(5)",
        ],
      },
    }),
    createPendingMatch("8", ["player_agustin_paz", QUALY_SLOT_ID]),
  ],
  quarterFinals: [
    createPendingMatch("10"),
    createPendingMatch("11"),
    createPendingMatch("12"),
    createPendingMatch("13"),
  ],
  semiFinals: [
    createPendingMatch("14"),
    createPendingMatch("15"),
  ],
  final: [
    createPendingMatch("16"),
  ],
  qualy: createPendingMatch("9", ["player_lautaro_zanzi", "player_pedro_davice"]),
};

const firstEditionDrawSeed = {
  roundOf16: [
    createPendingMatch("1", ["player_ramiro_fischetti", "player_valentin_cerchiara"], "06/02/26", {
      scores: ["2", "0"],
      detail: {
        playerOrderIds: ["player_ramiro_fischetti", "player_valentin_cerchiara"],
        sets: ["6-4", "6-3"],
      },
    }),
    createPendingMatch("2", ["player_francisco_caparruva", QUALY_SLOT_ID], "03/03/26", {
      scores: ["0", "2"],
      detail: {
        playerOrderIds: ["player_francisco_caparruva", "player_santino_berlanga"],
        sets: ["4-6", "4-6"],
      },
    }),
    createPendingMatch("3", ["player_tomas_liberi", "player_matias_p_mariuzza"], "21/02/26", {
      scores: ["2", "1"],
      detail: {
        playerOrderIds: ["player_tomas_liberi", "player_matias_p_mariuzza"],
        sets: ["3-6", "6-1", "6-4"],
      },
    }),
    createPendingMatch("4", ["player_nacho_velazco", "player_matteo_manoni"], "19/02/26", {
      scores: ["0", "2"],
      detail: {
        playerOrderIds: ["player_nacho_velazco", "player_matteo_manoni"],
        sets: ["2-6", "5-7"],
      },
    }),
    createPendingMatch("5", ["player_santino_duranti", "player_juan_martinez"], "06/02/26", {
      scores: ["2", "0"],
      detail: {
        playerOrderIds: ["player_santino_duranti", "player_juan_martinez"],
        sets: ["7-6", "6-2"],
      },
    }),
    createPendingMatch("6", ["player_valentin_zucconi", "player_agustin_paz"], "13/02/26", {
      scores: ["2", "0"],
      detail: {
        playerOrderIds: ["player_valentin_zucconi", "player_agustin_paz"],
        sets: ["6-4", "7-6"],
      },
    }),
    createPendingMatch("7", ["player_gonzalo_rennis", "player_lautaro_zanzi"], "21/02/26", {
      scores: ["2", "0"],
      detail: {
        playerOrderIds: ["player_gonzalo_rennis", "player_lautaro_zanzi"],
        sets: ["6-1", "6-0"],
      },
    }),
    createPendingMatch("8", ["player_valentin_rego", "player_facundo_jimenez"], "22/02/26", {
      scores: ["0", "2"],
      detail: {
        playerOrderIds: ["player_valentin_rego", "player_facundo_jimenez"],
        sets: ["4-6", "4-6"],
      },
    }),
  ],
  quarterFinals: [
    createPendingMatch("10", ["", ""], "16/02/26", {
      scores: ["2", "0"],
      detail: {
        playerOrderIds: ["player_ramiro_fischetti", "player_santino_berlanga"],
        sets: ["6-1", "6-0"],
      },
    }),
    createPendingMatch("11", ["", ""], "28/02/26", {
      scores: ["2", "0"],
      detail: {
        playerOrderIds: ["player_tomas_liberi", "player_matteo_manoni"],
        sets: ["6-3", "6-3"],
      },
    }),
    createPendingMatch("12", ["", ""], "16/02/26", {
      scores: ["2", "1"],
      detail: {
        playerOrderIds: ["player_santino_duranti", "player_valentin_zucconi"],
        sets: ["4-6", "6-4", "6-4"],
      },
    }),
    createPendingMatch("13", ["", ""], "06/03/26", {
      scores: ["2", "0"],
      detail: {
        playerOrderIds: ["player_gonzalo_rennis", "player_facundo_jimenez"],
        sets: ["6-3", "6-4"],
      },
    }),
  ],
  semiFinals: [
    createPendingMatch("14", ["", ""], "09/03/26", {
      scores: ["2", "0"],
      detail: {
        playerOrderIds: ["player_ramiro_fischetti", "player_tomas_liberi"],
        sets: ["6-1", "6-4"],
      },
    }),
    createPendingMatch("15", ["", ""], "13/03/26", {
      scores: ["2", "1"],
      detail: {
        playerOrderIds: ["player_gonzalo_rennis", "player_santino_duranti"],
        sets: ["6-2", "4-6", "6-2"],
      },
    }),
  ],
  final: [
    createPendingMatch("16", ["", ""], "SUSPENDIDA", {
      status: "suspended",
      detail: {
        playerOrderIds: ["player_ramiro_fischetti", "player_gonzalo_rennis"],
      },
    }),
  ],
  qualy: createPendingMatch("9", ["player_santino_berlanga", "player_pedro_davice"], "02/03/26", {
    scores: ["2", "0"],
    detail: {
      playerOrderIds: ["player_santino_berlanga", "player_pedro_davice"],
      sets: ["6-3", "6-3"],
    },
  }),
};

const editionSeed = [
  {
    id: "ramos_open_segunda_edicion",
    name: "Ramos Open Segunda Edicion",
    status: "current",
    isCurrent: true,
    draws: currentEditionDrawSeed,
  },
  {
    id: "ramos_open_primera_edicion",
    name: "Ramos Open Primera Edicion",
    status: "historical",
    isCurrent: false,
    draws: firstEditionDrawSeed,
  },
];

// Tournament state helpers
function clonePlayer(player) {
  return {
    ...player,
    photo: player.photo ?? "",
    ranking: player.ranking ?? null,
    stats: { ...player.stats },
    matches: [...player.matches],
  };
}

function cloneEntrant(entrant) {
  return {
    playerId: entrant.playerId ?? "",
    score: entrant.score ?? "",
  };
}

function cloneMatch(match) {
  return {
    id: match.id ?? "",
    editionId: match.editionId ?? "",
    editionName: match.editionName ?? "",
    status: match.status ?? "scheduled",
    roundLabel: match.roundLabel ?? "",
    label: match.label,
    date: match.date,
    detail: createMatchDetail(match.detail),
    teams: match.teams.map(cloneEntrant),
  };
}

function cloneDraws(draws) {
  return {
    roundOf16: draws.roundOf16.map(cloneMatch),
    quarterFinals: draws.quarterFinals.map(cloneMatch),
    semiFinals: draws.semiFinals.map(cloneMatch),
    final: draws.final.map(cloneMatch),
    qualy: cloneMatch(draws.qualy),
  };
}

function buildPlayerLookup(players) {
  return Object.fromEntries(players.map((player) => [player.id, player]));
}

function buildPlayerNameLookup(players) {
  return Object.fromEntries(players.map((player) => [player.id, player.name]));
}

function buildEditionLookup(editions) {
  return Object.fromEntries(editions.map((edition) => [edition.id, edition]));
}

function applyMatchMetadata(draws, edition) {
  Object.entries(ROUND_METADATA_BY_DRAW_KEY).forEach(([drawKey, metadata]) => {
    if (drawKey === "qualy") {
      draws.qualy.id = draws.qualy.id || `${edition.id}_${metadata.idPrefix}`;
      draws.qualy.editionId = edition.id;
      draws.qualy.editionName = edition.name;
      draws.qualy.roundLabel = draws.qualy.roundLabel || metadata.roundLabel;
      draws.qualy.detail = createMatchDetail(draws.qualy.detail);
      return;
    }

    draws[drawKey].forEach((match, index) => {
      match.id = match.id || `${edition.id}_${metadata.idPrefix}_${index + 1}`;
      match.editionId = edition.id;
      match.editionName = edition.name;
      match.roundLabel = match.roundLabel || metadata.roundLabel;
      match.detail = createMatchDetail(match.detail);
    });
  });

  return draws;
}

function getMatchWinnerIndex(match) {
  const [firstTeam, secondTeam] = match.teams;
  const firstScore = Number(firstTeam.score);
  const secondScore = Number(secondTeam.score);

  if (!Number.isFinite(firstScore) || !Number.isFinite(secondScore) || firstScore === secondScore) {
    return -1;
  }

  return firstScore > secondScore ? 0 : 1;
}

function getQualifiedEntrant(match) {
  const winnerIndex = getMatchWinnerIndex(match);

  if (winnerIndex < 0) {
    return createEntrant();
  }

  return createEntrant(match.teams[winnerIndex].playerId);
}

function assignMatchEntrants(match, entrants) {
  const preferredOrder = match.detail?.playerOrderIds ?? [];
  const resolvedEntrants = entrants.every((entrant) => entrant?.playerId);
  const shouldRespectPreferredOrder = resolvedEntrants
    && preferredOrder.length === entrants.length
    && preferredOrder.every((playerId) => entrants.some((entrant) => entrant.playerId === playerId));
  const orderedEntrants = shouldRespectPreferredOrder
    ? preferredOrder.map((playerId) => entrants.find((entrant) => entrant.playerId === playerId) ?? createEntrant())
    : entrants;
  const existingTeams = match.teams.length === 2
    ? match.teams
    : [createEntrant(), createEntrant()];

  match.teams = existingTeams.map((team, index) => createEntrant(
    orderedEntrants[index]?.playerId ?? "",
    team.score,
  ));

  return match;
}

function resolveQualyEntrant(draws) {
  const qualyWinner = getQualifiedEntrant(draws.qualy);

  draws.roundOf16 = draws.roundOf16.map((match) => ({
    ...cloneMatch(match),
    teams: match.teams.map((team) => (
      team.playerId === QUALY_SLOT_ID && qualyWinner.playerId
        ? createEntrant(qualyWinner.playerId, team.score)
        : cloneEntrant(team)
    )),
  }));

  return draws;
}

function applyAdvancement(draws) {
  resolveQualyEntrant(draws);

  quarterFinalSources.forEach(([firstSourceIndex, secondSourceIndex], quarterFinalIndex) => {
    assignMatchEntrants(draws.quarterFinals[quarterFinalIndex], [
      getQualifiedEntrant(draws.roundOf16[firstSourceIndex]),
      getQualifiedEntrant(draws.roundOf16[secondSourceIndex]),
    ]);
  });

  draws.semiFinals.forEach((match, semiFinalIndex) => {
    assignMatchEntrants(match, [
      getQualifiedEntrant(draws.quarterFinals[semiFinalIndex * 2]),
      getQualifiedEntrant(draws.quarterFinals[(semiFinalIndex * 2) + 1]),
    ]);
  });

  assignMatchEntrants(draws.final[0], [
    getQualifiedEntrant(draws.semiFinals[0]),
    getQualifiedEntrant(draws.semiFinals[1]),
  ]);

  return draws;
}

function buildTournamentState(source) {
  const players = source.players.map(clonePlayer);
  const editions = source.editions.map((edition) => {
    const editionDraws = applyAdvancement(applyMatchMetadata(cloneDraws(edition.draws), edition));

    return {
      id: edition.id,
      name: edition.name,
      status: edition.status,
      isCurrent: Boolean(edition.isCurrent),
      draws: editionDraws,
    };
  });
  const currentEditionId = source.currentEditionId
    ?? editions.find((edition) => edition.isCurrent)?.id
    ?? editions[0]?.id
    ?? "";

  return {
    players,
    editions,
    currentEditionId,
    lookup: {
      playerById: buildPlayerLookup(players),
      playerNameById: buildPlayerNameLookup(players),
      editionById: buildEditionLookup(editions),
    },
  };
}

const appStore = {
  ui: {
    activePublicView: "draws",
    activeMatchDetailId: null,
    activePlayerDetailId: null,
    activeHistoryEditionId: null,
  },
  tournament: buildTournamentState({
    players: playerSeed,
    editions: editionSeed,
    currentEditionId: "ramos_open_segunda_edicion",
  }),
};

function getEditionById(tournament, editionId) {
  return tournament.lookup.editionById[editionId] ?? null;
}

function getCurrentEdition(tournament = appStore.tournament) {
  return getEditionById(tournament, tournament.currentEditionId);
}

function getHistoryEditions(tournament = appStore.tournament) {
  return tournament.editions.filter((edition) => !edition.isCurrent);
}

function getActiveBracketEdition(tournament = appStore.tournament) {
  if (appStore.ui.activePublicView === "history" && appStore.ui.activeHistoryEditionId) {
    return getEditionById(tournament, appStore.ui.activeHistoryEditionId);
  }

  return getCurrentEdition(tournament);
}

function getPlayerNameById(playerId, tournament = appStore.tournament) {
  if (playerId === QUALY_SLOT_ID) {
    return "QUALY";
  }

  return tournament.lookup.playerNameById[playerId] ?? "";
}

function getPlayerProfileById(playerId, tournament = appStore.tournament) {
  if (playerId === QUALY_SLOT_ID) {
    return {
      id: QUALY_SLOT_ID,
      name: "QUALY",
      photo: "",
      ranking: null,
    };
  }

  if (!playerId) {
    return {
      id: "",
      name: "Por definir",
      photo: "",
      ranking: null,
    };
  }

  return tournament.lookup.playerById[playerId] ?? {
    id: playerId,
    name: "Por definir",
    photo: "",
    ranking: null,
  };
}

function getAllEditionMatches(edition) {
  return [
    ...edition.draws.roundOf16,
    ...edition.draws.quarterFinals,
    ...edition.draws.semiFinals,
    ...edition.draws.final,
    edition.draws.qualy,
  ];
}

function getAllTournamentMatches(tournament = appStore.tournament) {
  return tournament.editions.flatMap((edition) => getAllEditionMatches(edition));
}

function getMatchById(tournament, matchId) {
  return getAllTournamentMatches(tournament).find((match) => match.id === matchId) ?? null;
}

function parseTournamentDate(dateValue) {
  const parsedDate = /^(\d{2})\/(\d{2})\/(\d{2})$/.exec(dateValue ?? "");

  if (!parsedDate) {
    return null;
  }

  const [, day, month, year] = parsedDate;
  const normalizedDate = Date.parse(`20${year}-${month}-${day}T00:00:00`);

  return Number.isNaN(normalizedDate) ? null : normalizedDate;
}

function getMatchRoundOrder(match) {
  return ROUND_SORT_ORDER[match.roundLabel] ?? 99;
}

function getMatchSequence(match) {
  const numericLabel = Number(match.label);

  return (getMatchRoundOrder(match) * 100) + (Number.isFinite(numericLabel) ? numericLabel : 0);
}

function hasMatchValue(value) {
  return value !== undefined && value !== null && String(value).trim() !== "";
}

function getMatchDurationValue(match) {
  return String(match?.detail?.duration ?? "").trim().replace(/\s+/g, " ");
}

function getMatchStatusValue(match) {
  return String(match?.status ?? "").trim().toLowerCase();
}

function getMatchScoreValues(match) {
  return (match?.teams ?? []).map((team) => String(team?.score ?? "").trim());
}

function hasResolvedMatchWinner(match) {
  if (hasMatchValue(match?.winnerId) || hasMatchValue(match?.winner)) {
    return true;
  }

  const [firstScore = "", secondScore = ""] = getMatchScoreValues(match);

  if (firstScore === "" || secondScore === "") {
    return false;
  }

  const firstValue = Number(firstScore);
  const secondValue = Number(secondScore);

  if (!Number.isFinite(firstValue) || !Number.isFinite(secondValue) || firstValue === secondValue) {
    return false;
  }

  return true;
}

function hasMatchScoreEvidence(match) {
  return getMatchScoreValues(match).some((score) => score !== "");
}

function hasMatchSetEvidence(match) {
  return (match?.detail?.sets ?? []).some((setScore) => String(setScore ?? "").trim() !== "");
}

function isMatchCompleted(match) {
  const status = getMatchStatusValue(match);

  if (match?.completed === true || hasMatchValue(match?.finishedAt)) {
    return true;
  }

  if (["completed", "complete", "finished", "finalized"].includes(status)) {
    return true;
  }

  return hasResolvedMatchWinner(match);
}

function hasMatchStarted(match) {
  const status = getMatchStatusValue(match);

  if (isMatchCompleted(match)) {
    return true;
  }

  if (match?.started === true || hasMatchValue(match?.startedAt)) {
    return true;
  }

  if (["in_progress", "in-progress", "ongoing", "live", "started", "playing", "paused", "suspended"].includes(status)) {
    return true;
  }

  return hasMatchScoreEvidence(match) || hasMatchSetEvidence(match);
}

function formatMatchDuration(match) {
  const duration = getMatchDurationValue(match);

  if (duration) {
    return duration.toUpperCase();
  }

  if (isMatchCompleted(match)) {
    return "DURACION NO REGISTRADA";
  }

  if (hasMatchStarted(match)) {
    return "EN CURSO";
  }

  return "NO INICIADO";
}

function isMatchPlayed(match) {
  return getMatchWinnerIndex(match) >= 0;
}

function getMatchDetailPlayerIds(match) {
  return match.detail?.playerOrderIds?.length === 2
    ? match.detail.playerOrderIds
    : match.teams.map((team) => team.playerId);
}

function parseSetScore(setScore) {
  const parsedSet = /^(\d+)-(\d+)(?:\((\d+)\))?$/.exec(setScore ?? "");

  if (!parsedSet) {
    return null;
  }

  const [, firstScore, secondScore, tiebreak = ""] = parsedSet;
  const firstValue = Number(firstScore);
  const secondValue = Number(secondScore);
  const winnerIndex = firstValue === secondValue ? -1 : firstValue > secondValue ? 0 : 1;

  return {
    firstScore,
    secondScore,
    tiebreak,
    winnerIndex,
  };
}

function formatSetFromPerspective(setScore, perspectiveIndex = 0) {
  const parsedSet = parseSetScore(setScore);

  if (!parsedSet) {
    return setScore;
  }

  const firstScore = perspectiveIndex === 0 ? parsedSet.firstScore : parsedSet.secondScore;
  const secondScore = perspectiveIndex === 0 ? parsedSet.secondScore : parsedSet.firstScore;

  return `${firstScore}-${secondScore}${parsedSet.tiebreak ? `(${parsedSet.tiebreak})` : ""}`;
}

function getMatchOpponentId(match, playerId) {
  const teamIndex = match.teams.findIndex((team) => team.playerId === playerId);

  if (teamIndex >= 0) {
    return match.teams[teamIndex === 0 ? 1 : 0]?.playerId ?? "";
  }

  const orderedPlayerIds = match.detail?.playerOrderIds ?? [];

  if (orderedPlayerIds.length === 2 && orderedPlayerIds.includes(playerId)) {
    return orderedPlayerIds[orderedPlayerIds[0] === playerId ? 1 : 0] ?? "";
  }

  return "";
}

function getPlayerMatchHistory(playerId, tournament = appStore.tournament) {
  return getAllTournamentMatches(tournament)
    .filter((match) =>
      match.teams.some((team) => team.playerId === playerId)
      || match.detail?.playerOrderIds?.includes(playerId),
    )
    .map((match) => {
      const winnerIndex = getMatchWinnerIndex(match);
      const playedMatch = isMatchPlayed(match);
      const playerTeamIndex = match.teams.findIndex((team) => team.playerId === playerId);
      const detailPlayerIds = getMatchDetailPlayerIds(match);
      const detailPlayerIndex = detailPlayerIds.indexOf(playerId);
      const orientedSets = (match.detail?.sets ?? [])
        .filter(Boolean)
        .map((setScore) => formatSetFromPerspective(setScore, detailPlayerIndex >= 0 ? detailPlayerIndex : 0));
      const opponentId = getMatchOpponentId(match, playerId);

      return {
        matchId: match.id,
        editionId: match.editionId,
        editionName: match.editionName,
        label: match.label,
        roundLabel: match.roundLabel,
        date: match.date,
        status: match.status ?? "scheduled",
        dateValue: parseTournamentDate(match.date),
        duration: match.detail?.duration ?? "",
        durationLabel: formatMatchDuration(match),
        scoreText: orientedSets.join(" ").trim(),
        sets: orientedSets,
        opponentId,
        opponentName: getPlayerNameById(opponentId, tournament) || "Por definir",
        isPlayed: playedMatch,
        isWin: playerTeamIndex >= 0 && winnerIndex === playerTeamIndex,
        isLoss: playerTeamIndex >= 0 && winnerIndex >= 0 && winnerIndex !== playerTeamIndex,
        sequence: getMatchSequence(match),
      };
    })
    .sort((firstEntry, secondEntry) => {
      const firstDate = firstEntry.dateValue ?? Number.POSITIVE_INFINITY;
      const secondDate = secondEntry.dateValue ?? Number.POSITIVE_INFINITY;

      if (firstDate !== secondDate) {
        return firstDate - secondDate;
      }

      return firstEntry.sequence - secondEntry.sequence;
    });
}

function getPlayerEditionMatchHistory(playerId, editionId, tournament = appStore.tournament) {
  return getPlayerMatchHistory(playerId, tournament).filter((entry) => entry.editionId === editionId);
}

function getPlayerWinsCount(playerId, tournament = appStore.tournament) {
  return getPlayerMatchHistory(playerId, tournament).filter((entry) => entry.isWin).length;
}

function getPlayerLossesCount(playerId, tournament = appStore.tournament) {
  return getPlayerMatchHistory(playerId, tournament).filter((entry) => entry.isLoss).length;
}

function getPlayerLastResult(playerId, tournament = appStore.tournament) {
  const playedMatches = getPlayerMatchHistory(playerId, tournament).filter((entry) => entry.isPlayed);

  if (!playedMatches.length) {
    return null;
  }

  return [...playedMatches].sort((firstEntry, secondEntry) => {
    const firstDate = firstEntry.dateValue ?? Number.NEGATIVE_INFINITY;
    const secondDate = secondEntry.dateValue ?? Number.NEGATIVE_INFINITY;

    if (firstDate !== secondDate) {
      return secondDate - firstDate;
    }

    return secondEntry.sequence - firstEntry.sequence;
  })[0];
}

function getPlayerNextMatch(playerId, tournament = appStore.tournament) {
  const upcomingMatches = getPlayerMatchHistory(playerId, tournament).filter((entry) => !entry.isPlayed);

  if (!upcomingMatches.length) {
    return null;
  }

  return [...upcomingMatches].sort((firstEntry, secondEntry) => {
    const firstDate = firstEntry.dateValue ?? Number.POSITIVE_INFINITY;
    const secondDate = secondEntry.dateValue ?? Number.POSITIVE_INFINITY;

    if (firstDate !== secondDate) {
      return firstDate - secondDate;
    }

    return firstEntry.sequence - secondEntry.sequence;
  })[0];
}

function getPlayerAlphabeticSortKey(player) {
  const visibleName = String(player?.name ?? "").trim();
  const nameParts = visibleName.split(/\s+/).filter(Boolean);
  const surname = nameParts[nameParts.length - 1] ?? visibleName;

  return `${surname} ${visibleName}`.trim().toUpperCase();
}

function getMatchSetWinTotals(match) {
  const detailPlayerIds = getMatchDetailPlayerIds(match);
  const totals = Object.fromEntries(detailPlayerIds.filter(Boolean).map((playerId) => [playerId, 0]));

  (match.detail?.sets ?? []).forEach((setScore) => {
    const parsedSet = parseSetScore(setScore);

    if (!parsedSet || parsedSet.winnerIndex < 0) {
      return;
    }

    const winnerPlayerId = detailPlayerIds[parsedSet.winnerIndex];

    if (!winnerPlayerId) {
      return;
    }

    totals[winnerPlayerId] = (totals[winnerPlayerId] ?? 0) + 1;
  });

  return totals;
}

function getMatchGameWinTotals(match) {
  const detailPlayerIds = getMatchDetailPlayerIds(match);
  const totals = Object.fromEntries(detailPlayerIds.filter(Boolean).map((playerId) => [playerId, 0]));

  (match.detail?.sets ?? []).forEach((setScore) => {
    const parsedSet = parseSetScore(setScore);

    if (!parsedSet) {
      return;
    }

    const firstPlayerId = detailPlayerIds[0];
    const secondPlayerId = detailPlayerIds[1];

    if (firstPlayerId) {
      totals[firstPlayerId] = (totals[firstPlayerId] ?? 0) + Number(parsedSet.firstScore);
    }

    if (secondPlayerId) {
      totals[secondPlayerId] = (totals[secondPlayerId] ?? 0) + Number(parsedSet.secondScore);
    }
  });

  return totals;
}

function getLatestRankingResultEntry(playerId, tournament = appStore.tournament) {
  const resolvedHistory = getPlayerMatchHistory(playerId, tournament)
    .filter((entry) => entry.isPlayed || entry.status === "suspended");

  if (!resolvedHistory.length) {
    return null;
  }

  return [...resolvedHistory].sort((firstEntry, secondEntry) => {
    const firstDate = firstEntry.dateValue ?? Number.NEGATIVE_INFINITY;
    const secondDate = secondEntry.dateValue ?? Number.NEGATIVE_INFINITY;

    if (firstDate !== secondDate) {
      return secondDate - firstDate;
    }

    return secondEntry.sequence - firstEntry.sequence;
  })[0];
}

function getLastResultTiebreakValue(playerId, tournament = appStore.tournament) {
  const latestEntry = getLatestRankingResultEntry(playerId, tournament);

  if (!latestEntry) {
    return {
      resultRank: 0,
      phaseRank: -1,
    };
  }

  if (latestEntry.isWin) {
    return {
      resultRank: 2,
      phaseRank: ROUND_SORT_ORDER[latestEntry.roundLabel] ?? -1,
    };
  }

  if (latestEntry.isLoss) {
    return {
      resultRank: 1,
      phaseRank: ROUND_SORT_ORDER[latestEntry.roundLabel] ?? -1,
    };
  }

  return {
    resultRank: 0,
    phaseRank: -1,
  };
}

function getPlayerRankingTable(tournament = appStore.tournament) {
  const allMatches = getAllTournamentMatches(tournament);

  return tournament.players
    .map((player, index) => {
      let setsWon = 0;
      let winsCount = 0;
      let gamesWon = 0;
      let phasePoints = 0;

      allMatches.forEach((match) => {
        const setTotals = getMatchSetWinTotals(match);
        const gameTotals = getMatchGameWinTotals(match);
        const winnerIndex = getMatchWinnerIndex(match);
        const winnerPlayerId = winnerIndex >= 0 ? match.teams[winnerIndex]?.playerId ?? "" : "";

        setsWon += setTotals[player.id] ?? 0;
        gamesWon += gameTotals[player.id] ?? 0;

        if (match.status === "suspended" || winnerPlayerId !== player.id) {
          return;
        }

        winsCount += 1;
        phasePoints += ROUND_WIN_POINTS[match.roundLabel] ?? 0;
      });

      const setPoints = setsWon * SET_WIN_POINTS;
      const lastResultTiebreak = getLastResultTiebreakValue(player.id, tournament);

      return {
        player,
        index,
        winsCount,
        setsWon,
        gamesWon,
        setPoints,
        phasePoints,
        totalPoints: setPoints + phasePoints,
        lastResultTiebreak,
        sortKey: getPlayerAlphabeticSortKey(player),
      };
    })
    .sort((firstEntry, secondEntry) => {
      if (firstEntry.totalPoints !== secondEntry.totalPoints) {
        return secondEntry.totalPoints - firstEntry.totalPoints;
      }

      if (firstEntry.gamesWon !== secondEntry.gamesWon) {
        return secondEntry.gamesWon - firstEntry.gamesWon;
      }

      if (firstEntry.lastResultTiebreak.resultRank !== secondEntry.lastResultTiebreak.resultRank) {
        return secondEntry.lastResultTiebreak.resultRank - firstEntry.lastResultTiebreak.resultRank;
      }

      if (
        firstEntry.lastResultTiebreak.resultRank > 0
        && secondEntry.lastResultTiebreak.resultRank > 0
        && firstEntry.lastResultTiebreak.phaseRank !== secondEntry.lastResultTiebreak.phaseRank
      ) {
        return secondEntry.lastResultTiebreak.phaseRank - firstEntry.lastResultTiebreak.phaseRank;
      }

      const nameOrder = firstEntry.sortKey.localeCompare(secondEntry.sortKey, "es", { sensitivity: "base" });

      if (nameOrder !== 0) {
        return nameOrder;
      }

      return firstEntry.index - secondEntry.index;
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
}

function getPlayerRankingEntry(playerId, tournament = appStore.tournament) {
  return getPlayerRankingTable(tournament).find((entry) => entry.player.id === playerId) ?? null;
}

function getPlayerRankingLabel(playerOrId, tournament = appStore.tournament) {
  const playerId = typeof playerOrId === "string" ? playerOrId : playerOrId?.id;
  const rankingEntry = playerId ? getPlayerRankingEntry(playerId, tournament) : null;

  return rankingEntry ? `#${rankingEntry.rank}` : "\u2014";
}

function formatRankingPoints(points) {
  return `${points} PTS`;
}

function getSortedPlayers(tournament = appStore.tournament) {
  return getPlayerRankingTable(tournament).map((entry) => entry.player);
}

// Future admin entry points
function getTournamentState() {
  return buildTournamentState({
    players: appStore.tournament.players,
    editions: appStore.tournament.editions,
    currentEditionId: appStore.tournament.currentEditionId,
  });
}

function setTournamentState(nextTournamentState) {
  const nextPlayers = nextTournamentState?.players ?? appStore.tournament.players;
  const nextEditions = nextTournamentState?.editions ?? appStore.tournament.editions;
  const nextCurrentEditionId = nextTournamentState?.currentEditionId ?? appStore.tournament.currentEditionId;

  appStore.tournament = buildTournamentState({
    players: nextPlayers,
    editions: nextEditions,
    currentEditionId: nextCurrentEditionId,
  });

  renderPublicApp();
}

function updatePlayer(playerId, nextFields) {
  const nextPlayers = appStore.tournament.players.map((player) => {
    if (player.id !== playerId) {
      return clonePlayer(player);
    }

    return {
      ...clonePlayer(player),
      ...nextFields,
      photo: nextFields?.photo ?? player.photo ?? "",
      ranking: nextFields?.ranking ?? player.ranking ?? null,
      stats: nextFields?.stats ? { ...nextFields.stats } : { ...player.stats },
      matches: nextFields?.matches ? [...nextFields.matches] : [...player.matches],
    };
  });

  setTournamentState({
    players: nextPlayers,
    editions: appStore.tournament.editions,
    currentEditionId: appStore.tournament.currentEditionId,
  });
}

function updateMatchResult(drawKey, matchIndex, nextMatchPatch, editionId = appStore.tournament.currentEditionId) {
  const nextEditions = appStore.tournament.editions.map((edition) => ({
    ...edition,
    draws: cloneDraws(edition.draws),
  }));
  const targetEdition = nextEditions.find((edition) => edition.id === editionId);

  if (!targetEdition) {
    return;
  }

  const drawCollection = targetEdition.draws[drawKey];
  const targetMatch = Array.isArray(drawCollection) ? drawCollection[matchIndex] : drawCollection;

  if (!targetMatch) {
    return;
  }

  if (typeof nextMatchPatch?.date === "string") {
    targetMatch.date = nextMatchPatch.date;
  }

  if (nextMatchPatch?.detail) {
    targetMatch.detail = createMatchDetail({
      ...targetMatch.detail,
      ...nextMatchPatch.detail,
    });
  }

  if (Array.isArray(nextMatchPatch?.teams)) {
    targetMatch.teams = targetMatch.teams.map((team, teamIndex) => {
      const teamPatch = nextMatchPatch.teams[teamIndex];

      if (!teamPatch) {
        return cloneEntrant(team);
      }

      return {
        ...cloneEntrant(team),
        ...teamPatch,
      };
    });
  }

  setTournamentState({
    players: appStore.tournament.players,
    editions: nextEditions,
    currentEditionId: appStore.tournament.currentEditionId,
  });
}

const futureAdminHooks = {
  getTournamentState,
  setTournamentState,
  updatePlayer,
  updateMatchResult,
};

// Public render
function createPlayerAvatarMarkup(player) {
  return player.photo
    ? `<img class="match-detail-avatar-image" src="${player.photo}" alt="${player.name}" />`
    : `<span class="match-detail-avatar-fallback">${createInitials(player.name)}</span>`;
}

function createScoreModuleCell(cell, options = {}) {
  const classNames = [
    "score-module-cell",
    options.isCompact ? "score-module-cell--compact" : "",
    cell.isWinner ? "score-module-cell--winner" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <span class="${classNames}">
      <span class="score-module-number">${cell.value}</span>
      ${cell.tiebreak ? `<span class="score-module-tiebreak">${cell.tiebreak}</span>` : ""}
    </span>
  `;
}

function createScoreModuleSet(parsedSet, options = {}) {
  const classNames = [
    "score-module-set",
    options.isCompact ? "score-module-set--compact" : "",
    options.isDetail ? "score-module-set--detail" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const styleAttribute = options.style ? ` style="${options.style}"` : "";

  return `
    <span class="${classNames}"${styleAttribute}>
      ${createScoreModuleCell({
        value: parsedSet.firstScore,
        tiebreak: parsedSet.tiebreak && parsedSet.winnerIndex === 0 ? parsedSet.tiebreak : "",
        isWinner: parsedSet.winnerIndex === 0,
      }, { isCompact: options.isCompact })}
      ${createScoreModuleCell({
        value: parsedSet.secondScore,
        tiebreak: parsedSet.tiebreak && parsedSet.winnerIndex === 1 ? parsedSet.tiebreak : "",
        isWinner: parsedSet.winnerIndex === 1,
      }, { isCompact: options.isCompact })}
    </span>
  `;
}

function createCompactScoreModule(setScores = [], ariaLabel = "Parciales del partido") {
  const parsedSets = setScores
    .map((setScore) => parseSetScore(setScore))
    .filter(Boolean);

  if (!parsedSets.length) {
    return "";
  }

  return `
    <span class="score-module score-module--compact" aria-label="${ariaLabel}">
      <span class="score-module-strip">
        ${parsedSets.map((setScore) => createScoreModuleSet(setScore, { isCompact: true })).join("")}
      </span>
    </span>
  `;
}

function formatDisplayTextUpper(text) {
  return String(text ?? "").trim().toUpperCase();
}

function getRoundDisplayLabel(roundLabel) {
  const roundLabels = {
    Qualy: "QUALY",
    Octavos: "OCTAVOS DE FINAL",
    Cuartos: "CUARTOS DE FINAL",
    Semifinal: "SEMIFINAL",
    Final: "FINAL",
  };

  return roundLabels[roundLabel] ?? formatDisplayTextUpper(roundLabel);
}

function getNextRoundLabel(roundLabel) {
  const nextRoundLabels = {
    Qualy: "Octavos",
    Octavos: "Cuartos",
    Cuartos: "Semifinal",
    Semifinal: "Final",
  };

  return nextRoundLabels[roundLabel] ?? "";
}

function createPlayerLastResultMarkup(entry) {
  if (!entry) {
    return '<span class="player-card-empty">SIN RESULTADO RECIENTE</span>';
  }

  const resultLabel = entry.isWin ? "GANO" : entry.isLoss ? "PERDIO" : "PENDIENTE";
  const resultClassName = entry.isWin
    ? " player-card-result-status--win"
    : entry.isLoss
      ? " player-card-result-status--loss"
      : "";
  const scoreMarkup = createCompactScoreModule(
    entry.sets,
    `Score del ultimo partido vs ${entry.opponentName}`,
  );

  return `
    <span class="player-card-last-result">
      <span class="player-card-last-result-copy">
        <span class="player-card-result-status${resultClassName}">${resultLabel}</span>
        <span class="player-card-result-opponent">vs ${formatDisplayTextUpper(entry.opponentName)}</span>
      </span>
      ${scoreMarkup || '<span class="player-card-empty">SIN SCORE CARGADO</span>'}
    </span>
  `;
}

function formatPlayerNextMatch(summary) {
  if (!summary) {
    return "SIN PROXIMO PARTIDO";
  }

  if (summary.type === "eliminated") {
    return `ELIMINADO EN ${getRoundDisplayLabel(summary.roundLabel)}`;
  }

  if (summary.type === "scheduled") {
    return `${getRoundDisplayLabel(summary.roundLabel)} - ${formatDisplayTextUpper(summary.opponentName)}`;
  }

  if (summary.type === "waiting") {
    return `${getRoundDisplayLabel(summary.roundLabel)} - ESPERANDO RIVAL`;
  }

  return "SIN PROXIMO PARTIDO";
}

function getPlayerNextMatchSummary(playerId, tournament = appStore.tournament) {
  const currentEdition = getCurrentEdition(tournament);
  const currentEditionHistory = currentEdition
    ? getPlayerEditionMatchHistory(playerId, currentEdition.id, tournament)
    : [];
  const nextMatch = currentEditionHistory
    .filter((entry) => !entry.isPlayed)
    .sort((firstEntry, secondEntry) => {
      const firstDate = firstEntry.dateValue ?? Number.POSITIVE_INFINITY;
      const secondDate = secondEntry.dateValue ?? Number.POSITIVE_INFINITY;

      if (firstDate !== secondDate) {
        return firstDate - secondDate;
      }

      return firstEntry.sequence - secondEntry.sequence;
    })[0] ?? null;

  if (nextMatch) {
    return {
      type: nextMatch.opponentId ? "scheduled" : "waiting",
      roundLabel: nextMatch.roundLabel,
      opponentName: nextMatch.opponentName,
    };
  }

  const playedCurrentEditionMatches = currentEditionHistory.filter((entry) => entry.isPlayed);
  const lastResult = [...playedCurrentEditionMatches].sort((firstEntry, secondEntry) => {
    const firstDate = firstEntry.dateValue ?? Number.NEGATIVE_INFINITY;
    const secondDate = secondEntry.dateValue ?? Number.NEGATIVE_INFINITY;

    if (firstDate !== secondDate) {
      return secondDate - firstDate;
    }

    return secondEntry.sequence - firstEntry.sequence;
  })[0] ?? null;

  if (!lastResult) {
    return null;
  }

  if (lastResult.isLoss) {
    return {
      type: "eliminated",
      roundLabel: lastResult.roundLabel,
    };
  }

  const nextRoundLabel = getNextRoundLabel(lastResult.roundLabel);

  if (nextRoundLabel) {
    return {
      type: "waiting",
      roundLabel: nextRoundLabel,
      opponentName: "",
    };
  }

  return null;
}

function createPlayerNextMatchMarkup(playerId, tournament) {
  const nextMatchSummary = getPlayerNextMatchSummary(playerId, tournament);

  if (!nextMatchSummary) {
    return '<span class="player-card-empty">SIN PROXIMO PARTIDO</span>';
  }

  if (nextMatchSummary.type === "eliminated") {
    return `
      <span class="player-card-next-match player-card-next-match--single">
        <span class="player-card-next-status">ELIMINADO EN ${getRoundDisplayLabel(nextMatchSummary.roundLabel)}</span>
      </span>
    `;
  }

  return `
    <span class="player-card-next-match">
      <span class="player-card-next-phase">${getRoundDisplayLabel(nextMatchSummary.roundLabel)}</span>
      <span class="player-card-next-opponent">${nextMatchSummary.type === "scheduled" ? formatDisplayTextUpper(nextMatchSummary.opponentName) : "ESPERANDO RIVAL"}</span>
    </span>
  `;
}

function createPlayerCard(player, tournament, rankingEntry = getPlayerRankingEntry(player.id, tournament)) {
  const rankingDisplay = rankingEntry ? `#${rankingEntry.rank}` : "&mdash;";
  const pointsLabel = formatRankingPoints(rankingEntry?.totalPoints ?? 0);
  const rankingValue = rankingEntry?.rank ?? 0;
  const rankingClassName = rankingValue ? "" : " player-card-rank-display--pending";
  const lastResultMarkup = createPlayerLastResultMarkup(getPlayerLastResult(player.id, tournament));
  const nextMatchMarkup = createPlayerNextMatchMarkup(player.id, tournament);

  return `
    <button class="player-card" type="button" data-player-id="${player.id}" aria-label="Ver detalle de ${player.name}">
      <span class="player-card-rank-panel">
        <span class="player-card-rank-display${rankingClassName}">${rankingDisplay}</span>
        <span class="player-card-rank-points">${pointsLabel}</span>
      </span>
      <span class="player-card-body">
        <span class="player-card-top">
          <span class="player-card-avatar">
            ${createPlayerAvatarMarkup(player)}
          </span>
          <span class="player-card-copy">
            <span class="player-card-name">${player.name}</span>
          </span>
        </span>
        <span class="player-card-summary">
          <span class="player-card-stat">
            <span class="player-card-stat-label">Ultimo resultado</span>
            <span class="player-card-stat-value player-card-stat-value--score">${lastResultMarkup}</span>
          </span>
          <span class="player-card-stat">
            <span class="player-card-stat-label">Proximo</span>
            <span class="player-card-stat-value player-card-stat-value--next">${nextMatchMarkup}</span>
          </span>
        </span>
      </span>
    </button>
  `;
}

function createPlayersView(tournament) {
  const rankingTable = getPlayerRankingTable(tournament);

  return `
    <div class="players-shell">
      <div class="players-grid" aria-label="Jugadores">
        ${rankingTable.map((entry) => createPlayerCard(entry.player, tournament, entry)).join("")}
      </div>
    </div>
  `;
}

function getMatchDisplayDate(match) {
  if (match.status === "suspended") {
    return "SUSPENDIDA";
  }

  return match.date || "NO CONFIRMADO";
}

function createTeamRow(team, tournament, isWinner = false) {
  const name = getPlayerNameById(team.playerId, tournament);
  const score = team.score ?? "";
  const winnerClassName = isWinner ? " is-winner" : "";

  return `
    <div class="match-entry${winnerClassName}">
      <div class="team-cell">
        <span class="team-name">${name}</span>
      </div>
      <span class="score-box">${score}</span>
    </div>
  `;
}

function createMatchCard(match, tournament) {
  const winnerIndex = getMatchWinnerIndex(match);

  return `
    <div class="match-card">
      <div class="match-meta">
        <span class="match-id">${match.label}</span>
        <button
          class="match-detail-trigger"
          type="button"
          data-match-id="${match.id}"
          aria-label="Ver detalle del partido ${match.label}"
        >
          Ver detalle
        </button>
        <time class="match-date">${getMatchDisplayDate(match)}</time>
      </div>
      <div class="match-players">
        ${match.teams.map((team, teamIndex) => createTeamRow(team, tournament, teamIndex === winnerIndex)).join("")}
      </div>
    </div>
  `;
}

function createConnectorMarkup() {
  return `
    <span class="connector-line connector-line--top"></span>
    <span class="connector-line connector-line--bottom"></span>
    <span class="connector-line connector-line--mid"></span>
    <span class="connector-line connector-line--stem"></span>
  `;
}

function createRoundHeadings() {
  return `
    <div class="round-headings" aria-hidden="true">
      ${roundHeadings.map((title) => `<span class="round-heading">${title}</span>`).join("")}
    </div>
  `;
}

function createInitials(name) {
  const words = name.split(" ").filter(Boolean);
  const firstInitial = words[0]?.[0] ?? "";
  const lastInitial = words.length > 1 ? words[words.length - 1]?.[0] ?? "" : "";
  const initials = `${firstInitial}${lastInitial}`.trim();

  return (initials || "PD").toUpperCase();
}

function getMatchDetailScoreboard(match, tournament) {
  const parsedSets = (match.detail?.sets ?? [])
    .map((setScore) => parseSetScore(setScore))
    .filter(Boolean);

  if (!parsedSets.length) {
    return null;
  }

  const orderedPlayerIds = getMatchDetailPlayerIds(match);
  const players = orderedPlayerIds.map((playerId) => getPlayerProfileById(playerId, tournament));
  const setWins = [0, 0];

  parsedSets.forEach((setScore) => {
    if (setScore.winnerIndex >= 0) {
      setWins[setScore.winnerIndex] += 1;
    }
  });

  const matchWinnerTeamIndex = getMatchWinnerIndex(match);
  const matchWinnerId = matchWinnerTeamIndex >= 0 ? match.teams[matchWinnerTeamIndex]?.playerId ?? "" : "";
  const matchWinnerIndex = matchWinnerId ? orderedPlayerIds.indexOf(matchWinnerId) : -1;

  return {
    parsedSets,
    rows: players.map((profile, rowIndex) => ({
      profile,
      total: setWins[rowIndex],
      isMatchWinner: rowIndex === matchWinnerIndex || (matchWinnerIndex < 0 && setWins[rowIndex] > setWins[rowIndex === 0 ? 1 : 0]),
      cells: parsedSets.map((setScore) => ({
        value: rowIndex === 0 ? setScore.firstScore : setScore.secondScore,
        tiebreak: setScore.tiebreak && setScore.winnerIndex === rowIndex ? setScore.tiebreak : "",
        isWinner: setScore.winnerIndex === rowIndex,
      })),
    })),
  };
}

function createMatchDetailScoreline(match, tournament) {
  const scoreboard = getMatchDetailScoreboard(match, tournament);

  if (!scoreboard) {
    return '<p class="match-detail-empty">Sin detalle cargado para este partido.</p>';
  }

  const columnTemplate = `minmax(0, 1.8fr) repeat(${scoreboard.parsedSets.length}, var(--score-module-cell-size))`;

  return `
    <div
      class="score-module score-module--detail"
      aria-label="Score del partido"
      style="grid-template-columns: ${columnTemplate};"
    >
      <span class="score-module-head score-module-head--player">Jugador</span>
      ${scoreboard.parsedSets.map((_, setIndex) => `<span class="score-module-head">S${setIndex + 1}</span>`).join("")}
      ${scoreboard.rows.map((row, rowIndex) => `
        <div
          class="score-module-player${row.isMatchWinner ? " is-winner" : ""}"
          style="grid-column:1;grid-row:${rowIndex + 2};"
        >
          <span class="score-module-player-name">${row.profile.name}</span>
        </div>
      `).join("")}
      ${scoreboard.parsedSets.map((setScore, setIndex) => createScoreModuleSet(setScore, {
        isDetail: true,
        style: `grid-column:${setIndex + 2};grid-row:2 / 4;`,
      })).join("")}
    </div>
  `;
}

function getMatchDetailPlayers(match, tournament) {
  const orderedPlayerIds = getMatchDetailPlayerIds(match);

  return orderedPlayerIds.map((playerId) => getPlayerProfileById(playerId, tournament));
}

function createMatchDetailPlayerCard(profile, tournament) {
  const rankingLabel = getPlayerRankingLabel(profile, tournament);

  return `
    <article class="match-detail-player-card">
      <div class="match-detail-avatar">
        ${createPlayerAvatarMarkup(profile)}
      </div>
      <div class="match-detail-player-copy">
        <p class="match-detail-player-label">Jugador</p>
        <h3 class="match-detail-player-name">${profile.name}</h3>
        <p class="match-detail-player-ranking">${rankingLabel}</p>
      </div>
    </article>
  `;
}

function createMatchDetailModal(match, tournament) {
  const durationLabel = formatMatchDuration(match);
  const detailPlayers = getMatchDetailPlayers(match, tournament);

  return `
    <div class="match-detail-overlay">
      <div
        class="match-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="matchDetailTitle"
      >
        <div class="match-detail-header">
          <div class="match-detail-header-copy">
            <p class="match-detail-kicker">${match.roundLabel}</p>
            <h2 class="match-detail-title" id="matchDetailTitle">Partido ${match.label}</h2>
          </div>
          <button class="match-detail-close" type="button" data-match-detail-close>
            Cerrar
          </button>
        </div>
        <div class="match-detail-meta-grid">
          <div class="match-detail-meta-item">
            <span class="match-detail-meta-label">Fecha</span>
            <strong class="match-detail-meta-value">${getMatchDisplayDate(match)}</strong>
          </div>
          <div class="match-detail-meta-item">
            <span class="match-detail-meta-label">Duracion</span>
            <strong class="match-detail-meta-value">${durationLabel}</strong>
          </div>
        </div>
        <section class="match-detail-section">
          <h3 class="match-detail-section-title">Resultado detallado</h3>
          ${createMatchDetailScoreline(match, tournament)}
        </section>
        <section class="match-detail-section">
          <h3 class="match-detail-section-title">Jugadores</h3>
          <div class="match-detail-player-grid">
            ${detailPlayers.map((profile) => createMatchDetailPlayerCard(profile, tournament)).join("")}
          </div>
        </section>
      </div>
    </div>
  `;
}

function createPlayerHistoryScoreboard(entry) {
  const scoreMarkup = createCompactScoreModule(
    entry.sets,
    `Parciales del partido ${entry.roundLabel} ${entry.label}`,
  );

  if (!scoreMarkup) {
    return '<span class="player-history-meta-chip">Sin score cargado</span>';
  }

  return `<div class="player-history-scoreboard">${scoreMarkup}</div>`;
}

function createPlayerHistoryItem(entry) {
  const resultLabel = entry.isWin ? "Gano" : entry.isLoss ? "Perdio" : "Pendiente";
  const resultClassName = entry.isWin
    ? " player-history-status--win"
    : entry.isLoss
      ? " player-history-status--loss"
      : "";

  return `
    <article class="player-history-item">
      <div class="player-history-header">
        <p class="player-history-kicker">${entry.editionName} - ${entry.roundLabel} - Partido ${entry.label}</p>
        <span class="player-history-status${resultClassName}">${resultLabel}</span>
      </div>
      <p class="player-history-opponent">vs ${entry.opponentName}</p>
      <div class="player-history-meta">
        ${createPlayerHistoryScoreboard(entry)}
        <span class="player-history-meta-chip">${entry.status === "suspended" ? "SUSPENDIDA" : entry.date}</span>
        <span class="player-history-meta-chip">${entry.durationLabel}</span>
      </div>
    </article>
  `;
}

function createPlayerDetailModal(player, tournament) {
  const history = getPlayerMatchHistory(player.id, tournament);
  const playedMatches = history.filter((entry) => entry.isPlayed).length;
  const winsCount = getPlayerWinsCount(player.id, tournament);
  const lossesCount = getPlayerLossesCount(player.id, tournament);
  const nextMatchLabel = formatPlayerNextMatch(getPlayerNextMatchSummary(player.id, tournament));
  const rankingEntry = getPlayerRankingEntry(player.id, tournament);
  const rankingLabel = getPlayerRankingLabel(player, tournament);
  const pointsLabel = formatRankingPoints(rankingEntry?.totalPoints ?? 0);
  const gamesWonLabel = String(rankingEntry?.gamesWon ?? 0);

  return `
    <div class="match-detail-overlay">
      <div
        class="match-detail-modal player-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="playerDetailTitle"
      >
        <div class="match-detail-header">
          <div class="match-detail-header-copy">
            <p class="match-detail-kicker">Jugador</p>
            <h2 class="match-detail-title" id="playerDetailTitle">${player.name}</h2>
          </div>
          <button class="match-detail-close" type="button" data-player-detail-close>
            Cerrar
          </button>
        </div>
        <section class="player-detail-identity">
          <div class="player-detail-avatar">
            ${createPlayerAvatarMarkup(player)}
          </div>
          <div class="player-detail-copy">
            <p class="player-detail-label">Ranking</p>
            <p class="player-detail-ranking">${rankingLabel}</p>
            <p class="player-detail-points">${pointsLabel}</p>
          </div>
        </section>
        <div class="match-detail-meta-grid player-detail-meta-grid">
          <div class="match-detail-meta-item">
            <span class="match-detail-meta-label">Partidos jugados</span>
            <strong class="match-detail-meta-value">${playedMatches}</strong>
          </div>
          <div class="match-detail-meta-item">
            <span class="match-detail-meta-label">Partidos ganados</span>
            <strong class="match-detail-meta-value">${winsCount}</strong>
          </div>
          <div class="match-detail-meta-item">
            <span class="match-detail-meta-label">Partidos perdidos</span>
            <strong class="match-detail-meta-value">${lossesCount}</strong>
          </div>
          <div class="match-detail-meta-item">
            <span class="match-detail-meta-label">Games ganados</span>
            <strong class="match-detail-meta-value">${gamesWonLabel}</strong>
          </div>
          <div class="match-detail-meta-item">
            <span class="match-detail-meta-label">Proximo partido</span>
            <strong class="match-detail-meta-value">${nextMatchLabel}</strong>
          </div>
        </div>
        <section class="match-detail-section">
          <h3 class="match-detail-section-title">Historial completo</h3>
          <div class="player-history-list">
            ${history.length ? history.map(createPlayerHistoryItem).join("") : '<p class="match-detail-empty">Sin historial cargado para este jugador.</p>'}
          </div>
        </section>
      </div>
    </div>
  `;
}

function getEditionCardTone(edition) {
  return edition.isCurrent ? "current" : "historical";
}

function getEditionCardStatus(edition) {
  return edition.isCurrent ? "ACTUAL" : "HISTORICO";
}

function getEditionCardMeta(edition) {
  if (edition.draws.final[0]?.status === "suspended") {
    return "FINAL SUSPENDIDA";
  }

  return edition.isCurrent ? "EN CURSO" : "VER CUADRO";
}

function createEditionCard(edition) {
  const toneClassName = ` edition-card--${getEditionCardTone(edition)}`;
  const statusLabel = getEditionCardStatus(edition);
  const metaLabel = getEditionCardMeta(edition);

  if (edition.isCurrent) {
    return `
      <article class="edition-card${toneClassName}" aria-label="${edition.name}">
        <span class="edition-card-status">${statusLabel}</span>
        <h2 class="edition-card-title">${edition.name}</h2>
        <p class="edition-card-meta">${metaLabel}</p>
      </article>
    `;
  }

  return `
    <button class="edition-card edition-card--interactive${toneClassName}" type="button" data-history-edition="${edition.id}" aria-label="Ver cuadro de ${edition.name}">
      <span class="edition-card-status">${statusLabel}</span>
      <h2 class="edition-card-title">${edition.name}</h2>
      <p class="edition-card-meta">${metaLabel}</p>
    </button>
  `;
}

function createHistoryView(tournament) {
  const editions = [...tournament.editions].sort((firstEdition, secondEdition) => {
    if (firstEdition.isCurrent !== secondEdition.isCurrent) {
      return firstEdition.isCurrent ? 1 : -1;
    }

    return firstEdition.name.localeCompare(secondEdition.name);
  });

  return `
    <div class="history-shell">
      <div class="history-grid" aria-label="Ediciones del torneo">
        ${editions.map((edition) => createEditionCard(edition)).join("")}
      </div>
    </div>
  `;
}

function createHistoryBracketHeader(edition) {
  const metaLabel = edition.draws.final[0]?.status === "suspended"
    ? "FINAL SUSPENDIDA"
    : edition.isCurrent
      ? "EN CURSO"
      : "HISTORICO";

  return `
    <div class="history-bracket-header">
      <div class="history-bracket-copy">
        <p class="history-bracket-kicker">${metaLabel}</p>
        <h2 class="history-bracket-title">${edition.name}</h2>
      </div>
      <button class="history-back-button" type="button" data-history-back>Volver a Historia</button>
    </div>
  `;
}

function renderEditionBracketView(host, tournament, edition, options = {}) {
  host.innerHTML = `
    <div class="${options.historyMode ? "history-shell history-shell--bracket" : "bracket-shell"}">
      ${options.historyMode ? createHistoryBracketHeader(edition) : ""}
      <div class="bracket-scroll">
        <div class="bracket-board">
          ${createRoundHeadings()}
          <div class="bracket-grid" id="bracketGrid"></div>
        </div>
      </div>
    </div>
  `;

  const bracketGrid = document.getElementById("bracketGrid");

  if (!bracketGrid) {
    return;
  }

  connectorLayout.forEach((connector) => {
    const connectorElement = document.createElement("div");
    connectorElement.className = connector.classes;
    connectorElement.style.gridColumn = connector.gridColumn;
    connectorElement.style.gridRow = connector.gridRow;
    connectorElement.innerHTML = createConnectorMarkup();
    bracketGrid.append(connectorElement);
  });

  drawRoundGrid.forEach((round) => {
    edition.draws[round.drawKey].forEach((match, index) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = createMatchCard(match, tournament);

      const card = wrapper.firstElementChild;

      if (!card) {
        return;
      }

      card.style.gridColumn = round.gridColumn;
      card.style.gridRow = round.rows[index];
      bracketGrid.append(card);
    });
  });

  const qualyWrapper = document.createElement("div");
  qualyWrapper.innerHTML = createMatchCard(edition.draws.qualy, tournament);

  const qualyCard = qualyWrapper.firstElementChild;

  if (!qualyCard) {
    return;
  }

  qualyCard.style.gridColumn = qualyGridPlacement.gridColumn;
  qualyCard.style.gridRow = qualyGridPlacement.gridRow;
  bracketGrid.append(qualyCard);
}

function renderPublicDrawsView(host, tournament) {
  const currentEdition = getCurrentEdition(tournament);

  if (!currentEdition) {
    host.innerHTML = "";
    return;
  }

  renderEditionBracketView(host, tournament, currentEdition);
}

function renderPublicPlayersView(host, tournament) {
  host.innerHTML = createPlayersView(tournament);
}

function renderPublicHistoryView(host, tournament) {
  const activeHistoryEdition = getEditionById(tournament, appStore.ui.activeHistoryEditionId);

  if (!activeHistoryEdition) {
    host.innerHTML = createHistoryView(tournament);
    return;
  }

  renderEditionBracketView(host, tournament, activeHistoryEdition, { historyMode: true });
}

function renderPlayerDetailModal(host, tournament) {
  const activePlayerId = appStore.ui.activePlayerDetailId;

  if (!activePlayerId || appStore.ui.activePublicView !== "players") {
    return;
  }

  const activePlayer = tournament.lookup.playerById[activePlayerId];

  if (!activePlayer) {
    return;
  }

  host.insertAdjacentHTML("beforeend", createPlayerDetailModal(activePlayer, tournament));
}

function renderMatchDetailModal(host, tournament) {
  const activeMatchId = appStore.ui.activeMatchDetailId;

  if (
    !activeMatchId
    || appStore.ui.activePublicView === "players"
    || (appStore.ui.activePublicView === "history" && !appStore.ui.activeHistoryEditionId)
  ) {
    return;
  }

  const activeMatch = getMatchById(tournament, activeMatchId);

  if (!activeMatch) {
    return;
  }

  host.insertAdjacentHTML("beforeend", createMatchDetailModal(activeMatch, tournament));
}

function updatePublicNavigation() {
  const navTabs = document.querySelectorAll(".nav-tab");

  navTabs.forEach((tab) => {
    const isActive = tab.dataset.view === appStore.ui.activePublicView;
    tab.classList.toggle("nav-tab--active", isActive);

    if (isActive) {
      tab.setAttribute("aria-current", "page");
      return;
    }

    tab.removeAttribute("aria-current");
  });
}

function syncPublicModalState() {
  document.body.classList.toggle(
    "is-modal-open",
    Boolean(appStore.ui.activeMatchDetailId || appStore.ui.activePlayerDetailId),
  );
}

function renderPublicApp() {
  const host = document.getElementById("bracketApp");

  if (!host) {
    return;
  }

  updatePublicNavigation();

  if (appStore.ui.activePublicView === "players") {
    renderPublicPlayersView(host, appStore.tournament);
    renderPlayerDetailModal(host, appStore.tournament);
    syncPublicModalState();
    return;
  }

  if (appStore.ui.activePublicView === "history") {
    renderPublicHistoryView(host, appStore.tournament);
    renderMatchDetailModal(host, appStore.tournament);
    syncPublicModalState();
    return;
  }

  renderPublicDrawsView(host, appStore.tournament);
  renderMatchDetailModal(host, appStore.tournament);
  syncPublicModalState();
}

function openMatchDetail(matchId) {
  if (!getMatchById(appStore.tournament, matchId)) {
    return;
  }

  appStore.ui.activePlayerDetailId = null;
  appStore.ui.activeMatchDetailId = matchId;
  renderPublicApp();
}

function closeMatchDetail() {
  if (!appStore.ui.activeMatchDetailId) {
    return;
  }

  appStore.ui.activeMatchDetailId = null;
  renderPublicApp();
}

function openPlayerDetail(playerId) {
  if (!appStore.tournament.lookup.playerById[playerId]) {
    return;
  }

  appStore.ui.activeMatchDetailId = null;
  appStore.ui.activePlayerDetailId = playerId;
  renderPublicApp();
}

function closePlayerDetail() {
  if (!appStore.ui.activePlayerDetailId) {
    return;
  }

  appStore.ui.activePlayerDetailId = null;
  renderPublicApp();
}

function closeActivePublicModal() {
  if (appStore.ui.activePlayerDetailId) {
    closePlayerDetail();
    return;
  }

  closeMatchDetail();
}

function setActivePublicView(view) {
  if (!PUBLIC_VIEW_IDS.has(view)) {
    return;
  }

  if (view === "history" && appStore.ui.activePublicView === "history") {
    if (appStore.ui.activeHistoryEditionId) {
      appStore.ui.activeHistoryEditionId = null;
      appStore.ui.activeMatchDetailId = null;
      renderPublicApp();
    }

    return;
  }

  if (appStore.ui.activePublicView === view) {
    return;
  }

  appStore.ui.activePublicView = view;
  appStore.ui.activeMatchDetailId = null;
  appStore.ui.activePlayerDetailId = null;
  appStore.ui.activeHistoryEditionId = null;
  renderPublicApp();
}

function openHistoryEdition(editionId) {
  const edition = getEditionById(appStore.tournament, editionId);

  if (!edition || edition.isCurrent) {
    return;
  }

  appStore.ui.activePublicView = "history";
  appStore.ui.activeHistoryEditionId = editionId;
  appStore.ui.activeMatchDetailId = null;
  appStore.ui.activePlayerDetailId = null;
  renderPublicApp();
}

function closeHistoryEdition() {
  if (!appStore.ui.activeHistoryEditionId) {
    return;
  }

  appStore.ui.activeHistoryEditionId = null;
  appStore.ui.activeMatchDetailId = null;
  renderPublicApp();
}

function handleNavigationClick(event) {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const tab = target.closest(".nav-tab");

  if (!(tab instanceof HTMLButtonElement)) {
    return;
  }

  setActivePublicView(tab.dataset.view ?? "");
}

function handlePublicAppClick(event) {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const matchTrigger = target.closest(".match-detail-trigger");

  if (matchTrigger instanceof HTMLButtonElement) {
    openMatchDetail(matchTrigger.dataset.matchId ?? "");
    return;
  }

  const historyEditionTrigger = target.closest("[data-history-edition]");

  if (historyEditionTrigger instanceof HTMLButtonElement) {
    openHistoryEdition(historyEditionTrigger.dataset.historyEdition ?? "");
    return;
  }

  const historyBackTrigger = target.closest("[data-history-back]");

  if (historyBackTrigger instanceof HTMLButtonElement) {
    closeHistoryEdition();
    return;
  }

  const playerTrigger = target.closest(".player-card");

  if (playerTrigger instanceof HTMLButtonElement) {
    openPlayerDetail(playerTrigger.dataset.playerId ?? "");
    return;
  }

  const closeTrigger = target.closest("[data-match-detail-close], [data-player-detail-close]");

  if (closeTrigger instanceof HTMLElement) {
    closeActivePublicModal();
    return;
  }

  if (target.classList.contains("match-detail-overlay")) {
    closeActivePublicModal();
  }
}

function handleGlobalKeydown(event) {
  if (event.key === "Escape") {
    closeActivePublicModal();
  }
}

// App bootstrap
function initializeApp() {
  const navigation = document.querySelector(".top-nav");
  const publicHost = document.getElementById("bracketApp");

  if (navigation) {
    navigation.addEventListener("click", handleNavigationClick);
  }

  if (publicHost) {
    publicHost.addEventListener("click", handlePublicAppClick);
  }

  document.addEventListener("keydown", handleGlobalKeydown);

  if (typeof window !== "undefined") {
    window.__tournamentAdmin = futureAdminHooks;
  }

  renderPublicApp();
}

initializeApp();
