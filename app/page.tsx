/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

type Meal = "Breakfast" | "Lunch" | "Dinner";
type Dish = {
  id: string;
  name: string;
  desc: string;
  price: number;
  veg: boolean;
  rating: number;
  votes: number;
  img: string;
  best?: boolean;
};

const u = (id: string, w = 700) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const MENUS: Record<
  Meal,
  { window: string; blurb: string; slots: string[]; dishes: Dish[] }
> = {
  Breakfast: {
    window: "7:00 AM - 11:00 AM",
    blurb: "Bengali classics and light bowls to start the day.",
    slots: ["7:30 AM", "8:30 AM", "9:30 AM", "10:30 AM"],
    dishes: [
      {
        id: "b1",
        name: "Luchi & Aloor Dom",
        desc: "Puffed flatbreads with slow-cooked baby potatoes.",
        price: 220,
        veg: true,
        rating: 4.6,
        votes: 482,
        img: u("photo-1589301760014-d929f3979dbc"),
        best: true,
      },
      {
        id: "b2",
        name: "Egg Kosha Toast",
        desc: "Sourdough with spiced onion and egg masala.",
        price: 260,
        veg: false,
        rating: 4.4,
        votes: 215,
        img: u("photo-1525351484163-7529414344d8"),
      },
      {
        id: "b3",
        name: "Chhana Poha Bowl",
        desc: "Flattened rice, fresh cottage cheese, peanuts.",
        price: 240,
        veg: true,
        rating: 4.3,
        votes: 148,
        img: u("photo-1517673400267-0251440c45dc"),
      },
      {
        id: "b4",
        name: "Mishti Doi Parfait",
        desc: "Sweet yoghurt, jaggery granola, seasonal fruit.",
        price: 190,
        veg: true,
        rating: 4.5,
        votes: 301,
        img: u("photo-1488477181946-6428a0291777"),
      },
    ],
  },
  Lunch: {
    window: "12:30 PM - 3:30 PM",
    blurb: "Full thalis and river fish, cooked to order.",
    slots: ["12:30 PM", "1:30 PM", "2:30 PM", "3:00 PM"],
    dishes: [
      {
        id: "l1",
        name: "Kosha Mangsho Thali",
        desc: "Braised mutton, pulao, begun bhaja, chutney.",
        price: 640,
        veg: false,
        rating: 4.8,
        votes: 920,
        img: u("photo-1585937421612-70a008356fbe"),
        best: true,
      },
      {
        id: "l2",
        name: "Bhetki Paturi",
        desc: "Barramundi in mustard, steamed in banana leaf.",
        price: 590,
        veg: false,
        rating: 4.7,
        votes: 610,
        img: u("photo-1519708227418-c8fd9a32b7a2"),
      },
      {
        id: "l3",
        name: "Shukto & Steamed Rice",
        desc: "Bitter-sweet vegetable stew finished with ghee.",
        price: 420,
        veg: true,
        rating: 4.2,
        votes: 97,
        img: u("photo-1546069901-ba9599a7e63c"),
      },
      {
        id: "l4",
        name: "Paneer Lababdar Combo",
        desc: "Smoked paneer, tandoori roti, jeera rice.",
        price: 460,
        veg: true,
        rating: 4.4,
        votes: 356,
        img: u("photo-1631452180519-c014fe946bc7"),
      },
    ],
  },
  Dinner: {
    window: "7:00 PM - 11:00 PM",
    blurb: "Live tandoor, dum biryani and slow gravies.",
    slots: ["7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"],
    dishes: [
      {
        id: "d1",
        name: "Dum Biryani, Kolkata Style",
        desc: "Aged basmati, potato, egg, saffron milk.",
        price: 520,
        veg: false,
        rating: 4.9,
        votes: 1840,
        img: u("photo-1563379091339-03b21ab4a4f8"),
        best: true,
      },
      {
        id: "d2",
        name: "Tandoori Platter for Two",
        desc: "Malai tikka, seekh kebab, grilled prawns.",
        price: 1190,
        veg: false,
        rating: 4.6,
        votes: 702,
        img: u("photo-1599487488170-d11ec9c172f0"),
      },
      {
        id: "d3",
        name: "Chingri Malaikari",
        desc: "Tiger prawns in coconut cream, ghee rice.",
        price: 780,
        veg: false,
        rating: 4.7,
        votes: 433,
        img: u("photo-1565557623262-b51c2513a641"),
      },
      {
        id: "d4",
        name: "Gulab Jamun Brulee",
        desc: "Warm jamun, cardamom custard, sugar crust.",
        price: 280,
        veg: true,
        rating: 4.5,
        votes: 268,
        img: u("photo-1666190092159-3171cf0fbb12"),
      },
    ],
  },
};

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const MEALS = Object.keys(MENUS) as Meal[];

function Photo({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-brand via-rose-500 to-amber-400 ${className}`}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={(e) => (e.currentTarget.style.display = "none")}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      className={`inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border-2 bg-white ${veg ? "border-veg" : "border-brand"}`}
    >
      <span className={`h-2 w-2 rounded-full ${veg ? "bg-veg" : "bg-brand"}`} />
    </span>
  );
}

const Wrap = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
    {children}
  </div>
);

const Heading = ({ title, sub }: { title: string; sub?: string }) => (
  <div className="max-w-2xl">
    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
      {title}
    </h2>
    {sub && <p className="mt-3 text-lg text-mute">{sub}</p>}
  </div>
);

export default function Home() {
  const [meal, setMeal] = useState<Meal>("Dinner");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [vegOnly, setVegOnly] = useState(false);
  const [booking, setBooking] = useState<{ meal: Meal; slot: string } | null>(
    null,
  );
  const [confirmed, setConfirmed] = useState(false);

  const m = MENUS[meal];
  const all = Object.values(MENUS).flatMap((x) => x.dishes);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = all.reduce((s, d) => s + d.price * (cart[d.id] || 0), 0);
  const change = (id: string, by: number) =>
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + by) }));

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-lg">
        <Wrap className="flex h-[72px] items-center justify-between">
          <a href="#top" className="text-2xl font-extrabold tracking-tight">
            bagula<span className="text-brand">.</span>
            <span className="ml-2 hidden text-sm font-semibold text-mute sm:inline">
              open kitchen
            </span>
          </a>
          <nav className="hidden items-center gap-9 text-sm font-semibold md:flex">
            {[
              ["Menu", "#menu"],
              ["Book a table", "#book"],
              ["Delivery", "#delivery"],
              ["Visit", "#visit"],
            ].map(([t, h]) => (
              <a
                key={t}
                href={h}
                className="text-mute transition hover:text-brand"
              >
                {t}
              </a>
            ))}
          </nav>
          <a
            href="#menu"
            className="rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark"
          >
            Order now
          </a>
        </Wrap>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="bg-gradient-to-b from-brand-soft via-white to-white"
      >
        <Wrap className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-sm font-semibold shadow-sm">
              <span className="h-2 w-2 rounded-full bg-veg" /> Kitchen open
              until 11 PM
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Cooked in front of you.
              <br />
              <span className="text-brand">Delivered free.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-mute">
              Bagula&apos;s open kitchen serves breakfast, lunch and dinner.
              Dine with us or get it at home with no delivery fee and no minimum
              order.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="rounded-full bg-brand px-8 py-4 font-bold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                Explore the menu
              </a>
              <a
                href="#book"
                className="rounded-full border border-ink/15 px-8 py-4 font-bold transition hover:border-ink"
              >
                Book a table
              </a>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-black/10 pt-8">
              {[
                ["₹0", "Delivery fee"],
                ["35 min", "Avg. arrival"],
                ["4.7 ★", "12k+ ratings"],
              ].map(([a, b]) => (
                <div key={b}>
                  <dt className="text-2xl font-extrabold tabular-nums">{a}</dt>
                  <dd className="mt-0.5 text-sm text-mute">{b}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid grid-cols-5 grid-rows-2 gap-4">
            <Photo
              src={u("photo-1563379091339-03b21ab4a4f8", 900)}
              className="col-span-3 row-span-2 h-[420px] rounded-[2rem] shadow-2xl sm:h-[480px]"
            />
            <Photo
              src={u("photo-1585937421612-70a008356fbe")}
              className="col-span-2 h-[202px] rounded-[2rem] shadow-xl sm:h-[232px]"
            />
            <Photo
              src={u("photo-1599487488170-d11ec9c172f0")}
              className="col-span-2 h-[202px] rounded-[2rem] shadow-xl sm:h-[232px]"
            />
          </div>
        </Wrap>
      </section>

      {/* Highlights */}
      <section className="border-y border-black/5 bg-surface">
        <Wrap className="grid gap-px sm:grid-cols-3">
          {[
            ["Free home delivery", "Every order within 8 km, no minimum"],
            ["Three daily menus", "Breakfast, lunch and dinner windows"],
            ["Open kitchen", "Watch the chefs cook at the counter"],
          ].map(([t, d]) => (
            <div key={t} className="py-7 sm:px-6 sm:first:pl-0">
              <div className="font-extrabold">{t}</div>
              <div className="mt-1 text-sm text-mute">{d}</div>
            </div>
          ))}
        </Wrap>
      </section>

      {/* Menu */}
      <section id="menu" className="py-20">
        <Wrap>
          <Heading title="Today's menu" sub={m.blurb} />

          <div className="sticky top-[72px] z-30 -mx-5 mt-8 border-b border-black/5 bg-white/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
            <div className="no-scrollbar mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto">
              {MEALS.map((k) => (
                <button
                  key={k}
                  onClick={() => setMeal(k)}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-left transition ${meal === k ? "border-brand bg-brand text-white" : "border-black/10 bg-white hover:border-brand"}`}
                >
                  <span className="block text-sm font-extrabold leading-tight">
                    {k}
                  </span>
                  <span
                    className={`block text-xs font-medium ${meal === k ? "text-white/85" : "text-mute"}`}
                  >
                    {MENUS[k].window}
                  </span>
                </button>
              ))}
              <button
                onClick={() => setVegOnly(!vegOnly)}
                aria-pressed={vegOnly}
                className={`ml-auto flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-bold ${vegOnly ? "border-veg text-veg" : "border-black/10"}`}
              >
                <VegMark veg /> Veg only
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {m.dishes
              .filter((d) => !vegOnly || d.veg)
              .map((d) => (
                <article
                  key={d.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,.2)] transition hover:-translate-y-1 hover:shadow-[0_24px_44px_-16px_rgba(0,0,0,.28)]"
                >
                  <Photo src={d.img} className="h-48"></Photo>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between">
                      <VegMark veg={d.veg} />
                      <span className="rounded-md bg-veg px-2 py-0.5 text-xs font-extrabold text-white">
                        {d.rating} ★
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-extrabold leading-snug">
                      {d.name}
                    </h3>
                    <p className="mt-1 flex-1 text-sm leading-relaxed text-mute">
                      {d.desc}
                    </p>
                    {d.best && (
                      <span className="mt-3 w-fit rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
                        Bestseller · {d.votes} ratings
                      </span>
                    )}
                    <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
                      <span className="text-xl font-extrabold tabular-nums">
                        {inr(d.price)}
                      </span>
                      {cart[d.id] ? (
                        <div className="flex h-10 w-24 items-center justify-between rounded-xl bg-brand px-1 text-white">
                          <button
                            onClick={() => change(d.id, -1)}
                            aria-label={`Remove one ${d.name}`}
                            className="h-full px-2.5 text-lg font-bold"
                          >
                            −
                          </button>
                          <span className="font-extrabold tabular-nums">
                            {cart[d.id]}
                          </span>
                          <button
                            onClick={() => change(d.id, 1)}
                            aria-label={`Add one ${d.name}`}
                            className="h-full px-2.5 text-lg font-bold"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => change(d.id, 1)}
                          className="h-10 w-24 rounded-xl border-2 border-brand text-sm font-extrabold text-brand transition hover:bg-brand hover:text-white"
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </Wrap>
      </section>

      {/* Book a table */}
      <section id="book" className="bg-ink py-20 text-white">
        <Wrap>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Book a table
            </h2>
            <p className="mt-3 text-lg text-white/65">
              Choose a meal and a time. Sit at the open kitchen counter and
              watch it being cooked.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {MEALS.map((k) => (
              <div
                key={k}
                className="rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10"
              >
                <h3 className="text-xl font-extrabold">{k}</h3>
                <p className="mt-1 text-sm text-gold">{MENUS[k].window}</p>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {MENUS[k].slots.map((s) => {
                    const on = booking?.meal === k && booking.slot === s;
                    return (
                      <button
                        key={s}
                        aria-pressed={on}
                        onClick={() => {
                          setBooking({ meal: k, slot: s });
                          setConfirmed(false);
                        }}
                        className={`rounded-xl border py-2.5 text-sm font-bold tabular-nums transition ${on ? "border-brand bg-brand" : "border-white/20 hover:border-white/60"}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              disabled={!booking}
              onClick={() => setConfirmed(true)}
              className="rounded-full bg-white px-8 py-3.5 font-extrabold text-ink transition hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {booking
                ? `Confirm ${booking.meal} at ${booking.slot}`
                : "Select a time"}
            </button>
            {confirmed && booking && (
              <span className="font-semibold text-green-400">
                Table reserved for {booking.meal.toLowerCase()} at{" "}
                {booking.slot}. Demo only, nothing was sent.
              </span>
            )}
          </div>
        </Wrap>
      </section>

      {/* Delivery */}
      <section id="delivery" className="py-20">
        <Wrap>
          <Heading
            title="Free home delivery, every order"
            sub="No delivery fee, no minimum basket, no surge pricing."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [
                "Choose your menu",
                "Order from breakfast, lunch or dinner within its serving window.",
              ],
              [
                "We cook it fresh",
                "Plated at the open kitchen pass and sealed in insulated packaging.",
              ],
              [
                "It reaches your door",
                "Our own riders deliver within 8 km, usually in about 35 minutes.",
              ],
            ].map(([t, d], i) => (
              <div key={t} className="rounded-3xl bg-surface p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-lg font-extrabold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-5 text-xl font-extrabold">{t}</h3>
                <p className="mt-2 text-mute">{d}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <footer id="visit" className="bg-ink text-white/75">
        <Wrap className="grid gap-10 py-14 md:grid-cols-3">
          <div>
            <div className="text-2xl font-extrabold text-white">
              bagula<span className="text-brand">.</span>
            </div>
            <p className="mt-2 max-w-xs text-sm">
              A restaurant where the kitchen is the main room.
            </p>
          </div>
          <div className="text-sm leading-relaxed">
            <b className="text-white">Visit</b>
            <p className="mt-2">
              12 Lake View Road, Raiganj
              <br />
              West Bengal 733134
              <br />
              Open daily, 7:00 AM to 11:00 PM
            </p>
          </div>
          <div className="text-sm leading-relaxed">
            <b className="text-white">Contact</b>
            <p className="mt-2">
              +91 98765 43210
              <br />
              hello@bagulakitchen.example
            </p>
          </div>
        </Wrap>
        <p className="border-t border-white/10 py-5 text-center text-xs">
          © 2026 Bagula Open Kitchen. All data on this page is dummy data.
        </p>
      </footer>

      {count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-3">
          <div className="mx-auto flex max-w-xl items-center justify-between rounded-2xl bg-brand px-6 py-4 text-white shadow-2xl shadow-brand/50">
            <div>
              <div className="font-extrabold tabular-nums">
                {count} {count === 1 ? "item" : "items"} · {inr(total)}
              </div>
              <div className="text-xs text-white/85">
                Delivery ₹0. Free on every order.
              </div>
            </div>
            <button className="font-extrabold">View cart ›</button>
          </div>
        </div>
      )}
    </div>
  );
}
