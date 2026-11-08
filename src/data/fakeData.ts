export type Game = {
    id: string;
    leagueId: string;
    startsAt: string;
    location: string;
    playersPerTeam: number;
    price: number;
    status: "upcoming" | "completed" | "cancelled";
};

export const games: Game[] = [
    {id: "g1", leagueId: "l1", startsAt: "2026-11-03T20:00:00Z", location: "North Turf", playersPerTeam: 11, price: 0, status: "completed"},
    {id: "g2", leagueId: "l1", startsAt: "2026-11-07T20:00:00Z", location: "Patch Reef Park", playersPerTeam: 11, price: 200, status: "upcoming"},
    {id: "g3", leagueId: "l2", startsAt: "2026-11-08T20:00:00Z", location: "South Turf", playersPerTeam: 11, price: 1000, status: "upcoming"}
];
