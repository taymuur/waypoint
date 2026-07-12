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

export interface Trip {
  id: string;
  title: string;
  dates: string;
  days: TripDay[];
}

export interface Idea {
  id: string;
  title: string;
  region: string;
  blurb: string;
  /* gradient endpoints for the card banner */
  colors: [string, string];
  stops: Omit<Stop, "id">[];
}

export const sampleTrip: Trip = {
  id: "sample-oregon",
  title: "oregon coast loop",
  dates: "Jun 12 – 18",
  days: [
    {
      label: "Day 1",
      date: "Thu, Jun 12",
      stops: [
        { id: "s1", name: "Arrive PDX", place: "Portland, OR", time: "9:40 AM", duration: "pickup 45 min", category: "transit", lng: -122.5951, lat: 45.5898 },
        { id: "s2", name: "Food cart lunch", place: "Portland, OR", time: "12:15 PM", duration: "avg visit 1 hr", category: "food", lng: -122.6742, lat: 45.5202 },
        { id: "s3", name: "Cannon Beach", place: "Cannon Beach, OR", time: "3:30 PM", duration: "avg visit 2–3 hr", category: "outdoors", lng: -123.9615, lat: 45.8918 },
        { id: "s4", name: "Beachfront cabin", place: "Cannon Beach, OR", time: "6:00 PM", duration: "2 nights", category: "stay", lng: -123.963, lat: 45.889 },
      ],
    },
    {
      label: "Day 2",
      date: "Fri, Jun 13",
      stops: [
        { id: "s5", name: "Ecola State Park", place: "Cannon Beach, OR", time: "9:00 AM", duration: "avg visit 3–4 hr", category: "outdoors", lng: -123.974, lat: 45.919 },
        { id: "s6", name: "Haystack Rock lookout", place: "Cannon Beach, OR", time: "2:00 PM", duration: "avg visit 1 hr", category: "sight", lng: -123.9685, lat: 45.8841 },
        { id: "s7", name: "Chowder on the wharf", place: "Garibaldi, OR", time: "6:30 PM", duration: "reservation", category: "food", lng: -123.911, lat: 45.5595 },
      ],
    },
  ],
};

export const ideas: Idea[] = [
  {
    id: "high-desert-parks",
    title: "high desert parks",
    region: "Utah, USA",
    blurb: "Red-rock arches, canyon rims, and big-sky overlooks strung along one unhurried drive.",
    colors: ["#e4572e", "#e9a13b"],
    stops: [
      { name: "Arches scenic drive", place: "Moab, UT", time: "9:00 AM", duration: "avg visit 4 hr", category: "outdoors", lng: -109.5863, lat: 38.7331 },
      { name: "Canyon rim overlook", place: "Moab, UT", time: "2:30 PM", duration: "avg visit 2 hr", category: "sight", lng: -109.8782, lat: 38.326 },
      { name: "Dead Horse Point", place: "Moab, UT", time: "6:00 PM", duration: "sunset", category: "sight", lng: -109.7407, lat: 38.4822 },
    ],
  },
  {
    id: "california-coast-run",
    title: "california coast run",
    region: "California, USA",
    blurb: "Bridges, sea cliffs, and slow curves down one of the world's great coastal highways.",
    colors: ["#2456e6", "#0fa3a3"],
    stops: [
      { name: "Golden Gate viewpoint", place: "San Francisco, CA", time: "8:30 AM", duration: "avg visit 1 hr", category: "sight", lng: -122.4783, lat: 37.8199 },
      { name: "Bixby Creek Bridge", place: "Big Sur, CA", time: "1:00 PM", duration: "avg visit 30 min", category: "sight", lng: -121.9018, lat: 36.3728 },
      { name: "Elephant seal beach", place: "San Simeon, CA", time: "4:30 PM", duration: "avg visit 1 hr", category: "outdoors", lng: -121.1637, lat: 35.6631 },
    ],
  },
  {
    id: "cascade-volcanoes",
    title: "cascade volcanoes",
    region: "Washington & Oregon, USA",
    blurb: "Three snow-capped giants, alpine meadows, and a historic timberline lodge.",
    colors: ["#2e9e6b", "#2456e6"],
    stops: [
      { name: "Paradise meadows", place: "Mt Rainier, WA", time: "9:00 AM", duration: "avg visit 3 hr", category: "outdoors", lng: -121.7359, lat: 46.7867 },
      { name: "Johnston Ridge", place: "Mt St Helens, WA", time: "2:00 PM", duration: "avg visit 2 hr", category: "sight", lng: -122.2166, lat: 46.2751 },
      { name: "Timberline lodge", place: "Mt Hood, OR", time: "7:00 PM", duration: "overnight", category: "stay", lng: -121.711, lat: 45.3308 },
    ],
  },
  {
    id: "alpine-valleys",
    title: "alpine valleys",
    region: "Bernese Oberland, Switzerland",
    blurb: "Waterfall valleys, cogwheel trains, and villages tucked under four-thousand-meter peaks.",
    colors: ["#7a5af8", "#2456e6"],
    stops: [
      { name: "Lakeside old town", place: "Interlaken", time: "10:00 AM", duration: "avg visit 2 hr", category: "sight", lng: 7.8632, lat: 46.6863 },
      { name: "Waterfall valley walk", place: "Lauterbrunnen", time: "1:30 PM", duration: "avg visit 3 hr", category: "outdoors", lng: 7.9076, lat: 46.5936 },
      { name: "Mountain fondue dinner", place: "Grindelwald", time: "7:00 PM", duration: "reservation", category: "food", lng: 8.0413, lat: 46.6242 },
    ],
  },
  {
    id: "temples-and-tea",
    title: "temples & tea",
    region: "Kansai, Japan",
    blurb: "Vermilion gates at dawn, bamboo groves by noon, and deer-park temples before dark.",
    colors: ["#d6455d", "#e9a13b"],
    stops: [
      { name: "Thousand-gate shrine", place: "Kyoto", time: "7:00 AM", duration: "avg visit 2 hr", category: "sight", lng: 135.7727, lat: 34.9671 },
      { name: "Bamboo grove walk", place: "Arashiyama", time: "11:30 AM", duration: "avg visit 90 min", category: "outdoors", lng: 135.6725, lat: 35.0094 },
      { name: "Deer park temple", place: "Nara", time: "3:00 PM", duration: "avg visit 2 hr", category: "sight", lng: 135.8398, lat: 34.685 },
    ],
  },
];
