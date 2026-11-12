export type Game = {
    id: string;
    leagueId: string;
    startsAt: string;
    location: string;
    playersPerTeam: number;
    price: number;
    status: "upcoming" | "completed" | "cancelled";
};
export type Player = {
    id: string;
    name: string;
    position: "GK" | "DEF" | "MID" | "FWD";
};
export type Signup = {
    id: string;
    gameId: string;
    playerId: string;
    status: "confirmed" | "waitlisted" | "dropped";
    createdAt: string;
};

export const games: Game[] = [
    {id: "g1", leagueId: "l1", startsAt: "2026-11-03T20:00:00Z", location: "North Turf", playersPerTeam: 11, price: 0, status: "completed"},
    {id: "g2", leagueId: "l1", startsAt: "2026-11-10T20:00:00Z", location: "Patch Reef Park", playersPerTeam: 2, price: 200, status: "upcoming"},
    {id: "g3", leagueId: "l2", startsAt: "2026-11-15T20:00:00Z", location: "South Turf", playersPerTeam: 11, price: 1000, status: "upcoming"}
];
export const players: Player[] = [
    {id: "p1", name: "John Doe", position: "GK"},
    {id: "p2", name: "Jane Doe", position: "DEF"},
    {id: "p3", name: "Moris Suveyke", position: "DEF"},
    {id: "p4", name: "Ricardo Rocha", position: "MID"},
    {id: "p5", name: "Olivia Aiken", position: "MID"},
    {id: "p6", name: "Joaquin Pereyra", position: "FWD"},
    {id: "p7", name: "Test User", position: "FWD"}
];
export const signups: Signup[] = [
    {id: "s1", gameId: "g2", playerId: "p1", status: "confirmed", createdAt: "2026-11-07T12:01:00Z"},
    {id: "s2", gameId: "g2", playerId: "p2", status: "confirmed", createdAt: "2026-11-07T12:02:00Z"},
    {id: "s3", gameId: "g2", playerId: "p3", status: "confirmed", createdAt: "2026-11-07T12:03:00Z"},
    {id: "s4", gameId: "g2", playerId: "p4", status: "confirmed", createdAt: "2026-11-07T12:04:00Z"},
    {id: "s5", gameId: "g2", playerId: "p5", status: "waitlisted", createdAt: "2026-11-07T12:05:00Z"},
    {id: "s6", gameId: "g2", playerId: "p6", status: "waitlisted", createdAt: "2026-11-07T12:06:00Z"}
];

export const currentPlayerId = "p7";