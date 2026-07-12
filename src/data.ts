export type Category = "food" | "stay" | "sight" | "outdoors" | "transit";

export interface Stop {
  id: string;
  name: string;
  place: string;
  time: string;
  duration: string;
  category: Category;
  lng: number;
  lat: number;
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

export const initialDays: TripDay[] = [
  {
    label: "Day 1",
    date: "Thu, Jun 12",
    stops: [
      {
        id: "s1",
        name: "Arrive PDX",
        place: "Portland, OR",
        time: "9:40 AM",
        duration: "pickup 45 min",
        category: "transit",
        lng: -122.5951,
        lat: 45.5898,
      },
      {
        id: "s2",
        name: "Food cart lunch",
        place: "Portland, OR",
        time: "12:15 PM",
        duration: "avg visit 1 hr",
        category: "food",
        lng: -122.6742,
        lat: 45.5202,
      },
      {
        id: "s3",
        name: "Cannon Beach",
        place: "Cannon Beach, OR",
        time: "3:30 PM",
        duration: "avg visit 2–3 hr",
        category: "outdoors",
        lng: -123.9615,
        lat: 45.8918,
      },
      {
        id: "s4",
        name: "Beachfront cabin",
        place: "Cannon Beach, OR",
        time: "6:00 PM",
        duration: "2 nights",
        category: "stay",
        lng: -123.963,
        lat: 45.889,
      },
    ],
  },
  {
    label: "Day 2",
    date: "Fri, Jun 13",
    stops: [
      {
        id: "s5",
        name: "Ecola State Park",
        place: "Cannon Beach, OR",
        time: "9:00 AM",
        duration: "avg visit 3–4 hr",
        category: "outdoors",
        lng: -123.974,
        lat: 45.919,
      },
      {
        id: "s6",
        name: "Haystack Rock lookout",
        place: "Cannon Beach, OR",
        time: "2:00 PM",
        duration: "avg visit 1 hr",
        category: "sight",
        lng: -123.9685,
        lat: 45.8841,
      },
      {
        id: "s7",
        name: "Chowder on the wharf",
        place: "Garibaldi, OR",
        time: "6:30 PM",
        duration: "reservation",
        category: "food",
        lng: -123.911,
        lat: 45.5595,
      },
    ],
  },
];
