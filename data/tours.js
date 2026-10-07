const notice = true;

export const tours = [
  {
    id: "cultural-heritage-journey",
    slug: "cultural-heritage-journey",
    title: "Cultural & Heritage Journey",
    category: "culture",
    destinationIds: ["sigiriya", "kandy"],
    region: "Sigiriya, Dambulla, and Kandy",
    durationLabel: "7 days",
    durationDays: 7,
    summary:
      "A week from the palace rock at Sigiriya to the lake city of Kandy, with room to listen as well as look.",
    overview: [
      "This sample journey links the Cultural Triangle with Kandy for travellers who want the island’s classical places explained in order. It is written as a private week, not a coach circuit.",
      "The shape moves from Sigiriya and Dambulla toward Kandy, leaving the last days adjustable. Nothing here assumes flights, a particular hotel, or a vehicle already booked.",
    ],
    heroImage: "sigiriyaGardens",
    gallery: ["sigiriyaHero", "dambullaCave", "kandyTemple", "kandyLake", "kandyInterior"],
    highlights: [
      "Sigiriya’s gardens and rock, walked before they are climbed",
      "The cave temple at Dambulla",
      "Kandy’s lake and the Temple of the Tooth",
      "Evenings kept free so the days do not blur together",
    ],
    itineraryStyle: "days",
    itinerary: [
      {
        label: "Day 1",
        title: "Arrive and settle",
        detail:
          "A gentle start in or near Colombo. If energy allows, a short orientation walk. If not, the day stays quiet. Transfers are discussed separately and are not assumed.",
      },
      {
        label: "Day 2",
        title: "Toward Sigiriya",
        detail:
          "Travel inland to Sigiriya. The afternoon is for the water gardens and the first view of the rock, not a rushed climb.",
      },
      {
        label: "Day 3",
        title: "The rock, at your pace",
        detail:
          "Climb Sigiriya in the cooler part of the day, with the story of the palace told on the way. The visit can stop at the gardens if the stairway is not right for everyone.",
      },
      {
        label: "Day 4",
        title: "Dambulla",
        detail:
          "The cave temple at Dambulla, then an unhurried afternoon. A village pause can replace a second monument if the group has seen enough stone.",
      },
      {
        label: "Day 5",
        title: "The road to Kandy",
        detail:
          "Travel toward Kandy through the countryside. Arrive in time for a lake walk rather than another full visit.",
      },
      {
        label: "Day 6",
        title: "Kandy",
        detail:
          "The Temple of the Sacred Tooth Relic, with context before the courtyard. The rest of the day can hold a garden, a viewpoint, or nothing at all.",
      },
      {
        label: "Day 7",
        title: "Return, or continue",
        detail:
          "Travel back toward Colombo, or connect to the hills or the south if you are extending the journey. The week is a chapter, not a closed package.",
      },
    ],
    inclusions: [
      "A private guide throughout the agreed days",
      "Planning conversations before you travel",
      "Suggested visiting order for Sigiriya, Dambulla, and Kandy",
      "Help with modest-dress and temple etiquette",
    ],
    exclusions: [
      "Flights and travel insurance",
      "Hotels and meals, unless later agreed in writing",
      "Entrance tickets, unless added to a confirmed plan",
      "A private vehicle or driver — transport is discussed, not included by default",
    ],
    faqs: [
      {
        id: "pace",
        question: "Is seven days too long for these places?",
        answer:
          "The length is there so the travel days are not the whole experience. It can be shortened if you already know you prefer a tighter route.",
      },
      {
        id: "hotels",
        question: "Are places to stay included?",
        answer:
          "Not in this sample. Accommodation can be suggested when a real enquiry is planned. This preview does not reserve rooms.",
      },
      {
        id: "children",
        question: "Can the climb be adapted for children or older guests?",
        answer:
          "Yes. Sigiriya can be appreciated from the gardens. The itinerary says so because the stairway is not the only way to understand the site.",
      },
    ],
    featured: true,
    priceLabel: "Price on enquiry",
    indicative: notice,
  },
  {
    id: "kandy-day-tour",
    slug: "kandy-day-tour",
    title: "Kandy Day Tour",
    category: "culture",
    destinationIds: ["kandy"],
    region: "Kandy",
    durationLabel: "1 day",
    durationDays: 1,
    summary:
      "A single, well-paced day in the lake city: the temple, the water, and time to ask questions.",
    overview: [
      "This day is for travellers already based within reach of Kandy, or for a cultural week that needs one focused city. It does not try to add nearby peaks or several museums.",
      "The visit is private. The order can flip if a ceremony, the weather, or the group’s energy suggests a quieter start.",
    ],
    heroImage: "kandyTemple",
    gallery: ["kandyLake", "kandyInterior", "kandyTemple"],
    highlights: [
      "A morning walk beside Kandy Lake",
      "The Temple of the Sacred Tooth Relic, with context",
      "One unhurried stop of your choosing in the city",
    ],
    itineraryStyle: "stops",
    itinerary: [
      {
        label: "Morning",
        title: "The lake",
        detail: "Begin with the water and the hills around it, before the temple quarter is at its busiest.",
      },
      {
        label: "Late morning",
        title: "Temple of the Tooth",
        detail:
          "A guided visit to the temple complex. Clothing and photography follow the practice of the day. The explanation stays with the place, not a script of dates.",
      },
      {
        label: "Afternoon",
        title: "One more layer",
        detail:
          "A viewpoint, a garden, or a walk through the city grid — chosen with you that morning, then the return.",
      },
    ],
    inclusions: [
      "A private guide for the day",
      "A suggested order for the lake and temple",
      "Practical notes on dress and behaviour before the visit",
    ],
    exclusions: [
      "Temple tickets, unless added later",
      "Lunch, unless you ask for a recommendation",
      "Transport to and from Kandy",
      "Evening performances — they can be discussed, not assumed",
    ],
    faqs: [
      {
        id: "base",
        question: "Do we need to stay in Kandy?",
        answer:
          "It helps. The sample day assumes you can reach the city without turning the visit into a long drive. Tell us where you are based and the timing can be judged properly.",
      },
      {
        id: "dress",
        question: "What should we wear?",
        answer:
          "Cover shoulders and knees for the temple, and choose shoes you can remove comfortably. Exact expectations are confirmed closer to the day.",
      },
    ],
    featured: false,
    priceLabel: "Price on enquiry",
    indicative: notice,
  },
  {
    id: "sigiriya-dambulla",
    slug: "sigiriya-dambulla",
    title: "Sigiriya & Dambulla",
    category: "culture",
    destinationIds: ["sigiriya"],
    region: "Sigiriya and Dambulla",
    durationLabel: "1 day",
    durationDays: 1,
    summary:
      "Two rocks, two kinds of sacred architecture, and a day that does not climb for the sake of it.",
    overview: [
      "A one-day heritage visit pairing Sigiriya with the cave temple at Dambulla. It suits travellers staying in the Cultural Triangle who want a clear, finite day.",
      "The climb is optional in spirit: the gardens still tell the story if the stairway is too much. Dambulla asks for modest dress and a slower eye.",
    ],
    heroImage: "sigiriyaFortress",
    gallery: ["sigiriyaHero", "sigiriyaGardens", "dambullaCave", "sigiriyaRemote"],
    highlights: [
      "Sigiriya’s water gardens and, if you wish, the summit",
      "Painted caves at Dambulla",
      "A day with two sites, not five",
    ],
    itineraryStyle: "stops",
    itinerary: [
      {
        label: "Early",
        title: "Sigiriya gardens",
        detail: "Start among the terraces and pools, while the plan of the old city is easy to read.",
      },
      {
        label: "Morning",
        title: "The rock",
        detail:
          "Continue up if the group wants the summit. Otherwise stay with the lower terraces and the view from below.",
      },
      {
        label: "Afternoon",
        title: "Dambulla",
        detail:
          "The cave temple under the rock overhang. Time inside is kept unhurried, then the day ends.",
      },
    ],
    inclusions: [
      "A private guide for both sites",
      "Help deciding whether the full climb is worthwhile that day",
      "Notes on dress for the cave temple",
    ],
    exclusions: [
      "Entrance fees",
      "Hotel pickup, unless transport is agreed separately",
      "Meals",
      "A second cultural site beyond Dambulla",
    ],
    faqs: [
      {
        id: "both",
        question: "Can both sites fit comfortably?",
        answer:
          "Yes, if the day starts properly and neither visit is treated as a photograph stop. If the climb runs long, Dambulla can be shortened rather than rushed.",
      },
      {
        id: "heat",
        question: "What about the heat?",
        answer:
          "The sample puts the climb earlier. Hats, water, and a willingness to stop are part of the plan. This page does not give a seasonal forecast.",
      },
    ],
    featured: false,
    priceLabel: "Price on enquiry",
    indicative: notice,
  },
  {
    id: "ella-hill-country",
    slug: "ella-hill-country",
    title: "Ella & Hill Country",
    category: "hill-country",
    destinationIds: ["ella"],
    region: "Ella and the tea country",
    durationLabel: "4 days",
    durationDays: 4,
    summary:
      "Tea slopes, cloud, and the Nine Arches Bridge, arranged so the hills set the pace.",
    overview: [
      "Four days in the southern hills, based around Ella. The sample includes tea country, the railway bridge, and a waterfall landscape near Talawakelle, with one day left deliberately light.",
      "It is a private journey for people who would rather walk and watch the weather than collect viewpoints.",
    ],
    heroImage: "ellaTea",
    gallery: ["ellaBridge", "ellaValley", "hillFalls", "ellaTea"],
    highlights: [
      "A walk in a working tea landscape",
      "Nine Arches Bridge, seen rather than queued",
      "Mist, forest, and a flexible afternoon",
      "St. Clair’s Falls as a scenic pause, not a tick",
    ],
    itineraryStyle: "days",
    itinerary: [
      {
        label: "Day 1",
        title: "Into the hills",
        detail:
          "Arrive in Ella and keep the first evening short. The point is the change of air, not an orientation march.",
      },
      {
        label: "Day 2",
        title: "Tea and a walk",
        detail:
          "A morning among the tea, with as much or as little walking as the group wants. The afternoon stays open for cloud, rest, or a second short trail.",
      },
      {
        label: "Day 3",
        title: "The bridge",
        detail:
          "Time at the Nine Arches Bridge. A train ride can be discussed if it suits the day; it is not booked by this preview.",
      },
      {
        label: "Day 4",
        title: "A wider view",
        detail:
          "A scenic pause toward Talawakelle and St. Clair’s Falls, then travel onward or back, as your wider route requires.",
      },
    ],
    inclusions: [
      "A private guide for the hill days",
      "Walks chosen for the group, not a fixed trail grade",
      "Suggestions for pacing if the weather closes in",
    ],
    exclusions: [
      "Train tickets and reserved seats",
      "Estate factory tours, unless a visit is confirmed later",
      "Hotels and meals",
      "Transport between cities",
    ],
    faqs: [
      {
        id: "train",
        question: "Is the train included?",
        answer:
          "No. The bridge and the railway are part of the story. Riding is optional and depends on seats and timing, which this demo cannot hold.",
      },
      {
        id: "rain",
        question: "What if the hills are wet?",
        answer:
          "The route expects mist. Walks shorten, viewpoints wait, and the day still has tea country to look at. We do not publish a best month here.",
      },
    ],
    featured: true,
    priceLabel: "Price on enquiry",
    indicative: notice,
  },
  {
    id: "yala-wildlife-safari",
    slug: "yala-wildlife-safari",
    title: "Yala Wildlife Safari",
    category: "wildlife",
    destinationIds: ["yala"],
    region: "Yala National Park",
    durationLabel: "2 days",
    durationDays: 2,
    summary:
      "A patient look at Yala’s dry-zone wildlife, with leopards treated as a hope, not a booking.",
    overview: [
      "Two days built around one proper game drive in Yala National Park, plus time to rest and to talk about what you saw. Elephants, birds, and deer are as much the point as the chance of a leopard.",
      "The sample is explicit about limits: animals are wild, access rules apply, and nothing in this preview reserves a jeep or a park slot.",
    ],
    heroImage: "yalaElephants",
    gallery: ["yalaLeopard", "yalaElephants"],
    highlights: [
      "A morning inside Yala with a park guide’s direction",
      "Time at waterholes rather than a race between sightings",
      "An honest briefing: no animal is guaranteed",
    ],
    itineraryStyle: "days",
    itinerary: [
      {
        label: "Day 1",
        title: "Arrive and brief",
        detail:
          "Settle near the park and talk through how the drive will work: staying in the vehicle, keeping voices low, and accepting that the morning may be quiet.",
      },
      {
        label: "Day 2",
        title: "The drive",
        detail:
          "An early game drive in the park. Afterwards, rest, a short second look if it is worthwhile, or a gentle end to the day. The decision is made from the morning, not from a brochure.",
      },
    ],
    inclusions: [
      "A private guide to host the wildlife days",
      "A briefing on park behaviour and realistic sightings",
      "Help shaping the hours around an early start",
    ],
    exclusions: [
      "Park fees and jeep hire, until a real plan confirms them",
      "Any promise of a leopard or other species",
      "Lodges and meals",
      "Drives in other parks, unless you ask to redesign the route",
    ],
    faqs: [
      {
        id: "leopard",
        question: "Will we see a leopard?",
        answer:
          "Maybe, and maybe not. Yala is known for them. This journey will not describe a sighting as included, likely, or guaranteed.",
      },
      {
        id: "children",
        question: "Is it suitable for children?",
        answer:
          "Often, if they are comfortable with an early start and sitting quietly. Say how old they are in your enquiry and the day can be judged properly.",
      },
    ],
    featured: true,
    priceLabel: "Price on enquiry",
    indicative: notice,
  },
  {
    id: "colombo-city-stories",
    slug: "colombo-city-stories",
    title: "Colombo City Stories",
    category: "city",
    destinationIds: [],
    region: "Colombo",
    durationLabel: "1 day",
    durationDays: 1,
    summary:
      "A walking day in Colombo for arrivals, departures, or anyone who wants the capital at street level.",
    overview: [
      "Colombo is usually a gateway. This sample day treats it as a city with a seafront, neighbourhoods, and a history of trade, rather than a stop to be endured between flights.",
      "The route is on foot as far as heat and distance allow. It does not attempt the whole city.",
    ],
    heroImage: "colomboFace",
    gallery: ["colomboFace"],
    highlights: [
      "The oceanfront at Galle Face",
      "A neighbourhood walk chosen for story, not shopping",
      "A day that respects jet lag and departure times",
    ],
    itineraryStyle: "stops",
    itinerary: [
      {
        label: "Morning",
        title: "The seafront",
        detail: "Start at Galle Face, where the city meets the Indian Ocean, and talk about how Colombo grew along this edge.",
      },
      {
        label: "Midday",
        title: "A district, not a list",
        detail:
          "One neighbourhood — fort streets, a market edge, or a quieter residential grid — walked with enough pauses.",
      },
      {
        label: "Afternoon",
        title: "Leave space",
        detail:
          "End in time for a meal, a hotel, or an airport. The day is successful if you understand the city a little, not if you crossed all of it.",
      },
    ],
    inclusions: [
      "A private guide for the walking day",
      "A route adjusted to heat, mobility, and flight times",
      "Suggestions for where to pause",
    ],
    exclusions: [
      "Museum tickets",
      "Meals and tuk-tuk fares",
      "Airport transfers",
      "A tour of the entire city",
    ],
    faqs: [
      {
        id: "layover",
        question: "Can this work on an arrival day?",
        answer:
          "Often, if the flight lands with enough of the day left. Tell us the rough timing and we can say whether a walk is sensible or whether rest is the better plan.",
      },
    ],
    featured: false,
    priceLabel: "Price on enquiry",
    indicative: notice,
  },
  {
    id: "galle-southern-coast",
    slug: "galle-southern-coast",
    title: "Galle & Southern Coast",
    category: "coastal",
    destinationIds: ["galle"],
    region: "Galle and the south coast",
    durationLabel: "3 days",
    durationDays: 3,
    summary:
      "The fort, the lanes, and a stretch of southern coast, kept personal rather than beach-led.",
    overview: [
      "Three days on the south coast centred on Galle Fort, with time for Koggala’s stilt fishermen and a bay such as Unawatuna or Mirissa. The sea is present. It is not the whole itinerary.",
      "The sample suits couples and families who want architecture and everyday fort life, plus one unhurried coastal hour.",
    ],
    heroImage: "mirissa",
    gallery: ["galleFort", "galleStilts", "galleStreet", "unawatuna", "mirissa"],
    highlights: [
      "A walking tour of Galle Fort",
      "Stilt fishing at Koggala, observed respectfully",
      "Time at Unawatuna or Mirissa without a packed beach programme",
    ],
    itineraryStyle: "days",
    itinerary: [
      {
        label: "Day 1",
        title: "Into the fort",
        detail:
          "Arrive and walk the ramparts while the layout is still fresh: walls, streets, and the mix of communities that still use the town.",
      },
      {
        label: "Day 2",
        title: "Lanes and the coast",
        detail:
          "A slower morning in the fort, then Koggala to see the stilt fishermen. The late afternoon can be a swim or a shaded pause.",
      },
      {
        label: "Day 3",
        title: "A bay, then onward",
        detail:
          "Unawatuna or Mirissa for coastline and granite, chosen with you. Then continue, or simply end the journey by the water.",
      },
    ],
    inclusions: [
      "A private guide for the coastal days",
      "A fort walk focused on history and daily life",
      "Help balancing culture and time by the sea",
    ],
    exclusions: [
      "Boat trips and whale watching — ask if you want them considered",
      "Hotels, meals, and beach clubs",
      "Intercity transport",
      "Any claim about sea conditions on a given week",
    ],
    faqs: [
      {
        id: "beach",
        question: "Is this a beach holiday?",
        answer:
          "No. The coast is part of the journey, and swimming can be included if you want it. The spine of the three days is Galle and the southern shore’s culture.",
      },
      {
        id: "stilts",
        question: "Are the stilt fishermen a performance?",
        answer:
          "The sample treats them as a local fishing tradition at Koggala. We do not stage it, and we do not ask you to treat people as scenery.",
      },
    ],
    featured: true,
    priceLabel: "Price on enquiry",
    indicative: notice,
  },
];

export const featuredTourOrder = [
  "cultural-heritage-journey",
  "ella-hill-country",
  "yala-wildlife-safari",
  "galle-southern-coast",
];
