export interface Event {
    title: string;
    longitude: number;
    latitude: number;
    time: Date;
    host: string;
    sponsor: string;
    picture: URL | null;
}

export const events: Event[] = [
    {
        title: "After craig lunch!",
        longitude: -75.69122,
        latitude: 45.42177,
        time: new Date("2025-04-11T14:00:00Z"),
        host: "Sarah Liu",
        sponsor: "",
        picture: new URL("https://www.exploresquamish.com/site/assets/files/18595/coppercoil_lead1500x1000.2400x1348.webp")
    },
    {
        title: "Post hike slack lining meetup",
        longitude: -123.1547657,
        latitude: 49.6787659215371,
        time: new Date("2025-04-14T17:00Z"),
        host: "James Murphy",
        sponsor: "",
        picture: new URL("https://oceanusadventure.com/wp-content/uploads/2022/09/The-Chief-Hike-6-of-7-min-1024x768.jpg")

    },
    {
        title: "Coffee with Peter Croft!",
        longitude: -123.1459792,
        latitude: 49.70687241,
        time: new Date("2025-04-22T10:00Z"),
        host: "Shaun V",
        sponsor: "",
        picture: new URL("https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/27/f0/42/caption.jpg?w=900&h=500&s=1")

    },
    {
        title: "Post run sunset hangout",
        longitude: -123.1543927,
        latitude: 49.27482344,
        time: new Date("2025-04-30T19:00Z"),
        host: "Jenny R",
        sponsor: "",
        picture: null

    },
    {
        title: "River Dip + Donuts",
        longitude: -123.1990196,
        latitude: 49.27543606,
        time: new Date("2025-05-02T17:00Z"),
        host: "Anna M",
        sponsor: "",
        picture: null

    },
    {
        title: "Climbers of Colour Meetup",
        longitude: -123.1146845,
        latitude: 49.31729628,
        time: new Date("2025-05-06T20:00Z"),
        host: "Sage W",
        sponsor: "",
        picture: null

    },
    {
        title: "after bike arcteryx window shopping",
        longitude: -123.0161402,
        latitude: 49.3047037,
        time: new Date("2025-05-08T16:00Z"),
        host: "Aiko R",
        sponsor: "",
        picture: null

    },
    {
        title: "Bikes & breweries",
        longitude: -123.0716716,
        latitude: 49.30766203,
        time: new Date("2025-05-12T18:00Z"),
        host: "House of Funk Brewing",
        sponsor: "",
        picture: new URL("https://images.squarespace-cdn.com/content/v1/5449a23fe4b04f35b928c028/1441742031916-M9E81WBNFIW3J1LUHFJT/IMG_9063.jpg")

    },
    {
        title: "Seawall walk and gelato",
        longitude: -123.1278898,
        latitude: 49.29279688,
        time: new Date("2025-05-14T15:00Z"),
        host: "Mark Murry",
        sponsor: "",
        picture: null
    },
    {
        title: "Queer & Climbing: Post session hang",
        longitude: -123.0834257,
        latitude: 49.26484799,
        time: new Date("2025-05-20T13:00Z"),
        host: "Eli V",
        sponsor: "",
        picture: new URL("https://vancouver.ca/images/cov/feature/picnic-second-beach-facebook.jpg")
    },
    {
        title: "Beach cleanup!",
        longitude: -123.1432215,
        latitude: 49.28699015,
        time: new Date("2025-05-25T15:00Z"),
        host: "The Hive Bouldering Gym",
        sponsor: "",
        picture: new URL("https://vancouver.ca/images/cov/feature/neighbourhood-clean-up-party-landing.jpg")
    },
]