export type Category = "food" | "stay" | "sight" | "outdoors" | "transit";

export interface Stop {
  id: number;
  name: string;
  place: string;
  time: string;
  duration: string;
  category: Category;
  /* position on the placeholder map, in SVG viewBox units */
  x: number;
  y: number;
}

export interface TripDay {
  label: string;
  date: string;
  stops: Stop[];
}

export const trip = {
  title: "oregon coast loop",
  dates: "Jun 12 – 18",
  travelers: ["A", "M", "S"],
  extraTravelers: 2,
  budget: "$2,840.00",
  reservations: { flights: 2, lodging: 3, rentals: 1 },
};

export const days: TripDay[] = [
  {
    label: "Day 1",
    date: "Thu, Jun 12",
    stops: [
      {
        id: 1,
        name: "Arrive PDX",
        place: "Portland, OR",
        time: "9:40 AM",
        duration: "pickup 45 min",
        category: "transit",
        x: 300,
        y: 80,
      },
      {
        id: 2,
        name: "Food cart lunch",
        place: "Portland, OR",
        time: "12:15 PM",
        duration: "avg visit 1 hr",
        category: "food",
        x: 268,
        y: 108,
      },
      {
        id: 3,
        name: "Cannon Beach",
        place: "Cannon Beach, OR",
        time: "3:30 PM",
        duration: "avg visit 2–3 hr",
        category: "outdoors",
        x: 128,
        y: 130,
      },
      {
        id: 4,
        name: "Surfsand cabin",
        place: "Cannon Beach, OR",
        time: "6:00 PM",
        duration: "2 nights",
        category: "stay",
        x: 122,
        y: 158,
      },
    ],
  },
  {
    label: "Day 2",
    date: "Fri, Jun 13",
    stops: [
      {
        id: 5,
        name: "Ecola State Park",
        place: "Cannon Beach, OR",
        time: "9:00 AM",
        duration: "avg visit 3–4 hr",
        category: "outdoors",
        x: 108,
        y: 196,
      },
      {
        id: 6,
        name: "Haystack Rock lookout",
        place: "Cannon Beach, OR",
        time: "2:00 PM",
        duration: "avg visit 1 hr",
        category: "sight",
        x: 140,
        y: 232,
      },
      {
        id: 7,
        name: "Chowder on the wharf",
        place: "Garibaldi, OR",
        time: "6:30 PM",
        duration: "reservation",
        category: "food",
        x: 176,
        y: 268,
      },
    ],
  },
];
