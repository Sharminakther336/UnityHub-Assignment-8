
"use client";

import Link from "next/link";

const statItems = [
  {
    value: "120+",
    label: "Total Events",
    icon: "▦",
    color: "bg-[#EAF7ED]",
    iconColor: "bg-[#D9F2DF] text-[#078344]",
    numberColor: "text-[#087D45]",
  },
  {
    value: "850+",
    label: "Active Members",
    icon: "♧",
    color: "bg-[#EDF6FF]",
    iconColor: "bg-[#DCEEFF] text-[#1685E8]",
    numberColor: "text-[#1765B0]",
  },
  {
    value: "500+",
    label: "Volunteers",
    icon: "🤝",
    color: "bg-[#FFF5E9]",
    iconColor: "bg-[#FFEBD3] text-[#D97706]",
    numberColor: "text-[#B96A0B]",
  },
  {
    value: "35+",
    label: "Communities",
    icon: "♧",
    color: "bg-[#F5EEFF]",
    iconColor: "bg-[#EBDDFE] text-[#7E22CE]",
    numberColor: "text-[#6516A5]",
  },
];

export default function Banner() {
  return (
    <section className="overflow-hidden bg-[#F5FAF6]">
      <div className="mx-auto grid max-w-[1500px] items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:px-12 lg:py-12">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#DFF4E4] px-5 py-3 text-sm font-semibold text-[#087D45]">
            <span className="text-lg">🌿</span>
            Community • Events • Volunteering
          </span>

          <h1 className="mt-7 text-[34px] font-extrabold leading-[1.2] tracking-tight text-[#14211E] sm:text-[40px] lg:text-[44px]">
            Bring People Together.
            <br />
            Build Stronger
            <br />
            <span className="text-[#078344]">Communities.</span>
          </h1>

          <p className="mt-6 max-w-[620px] text-base leading-8 text-[#56615D]">
            Discover local events, join community activities, volunteer for
            a better tomorrow, and create your own events with UnityHub.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-3 rounded-2xl bg-[#078344] px-7 py-4 text-[15px] font-bold text-white shadow-md transition hover:bg-[#056B37]"
            >
              <span className="text-xl">▦</span>
              Explore Events →
            </Link>

            <Link
              href="/dashboard/create-event"
              className="inline-flex items-center gap-3 rounded-2xl border-2 border-[#078344] bg-white px-7 py-4 text-[15px] font-bold text-[#078344] transition hover:bg-[#EAF7ED]"
            >
              <span className="text-xl">+</span>
              Create an Event
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-5 top-5 h-[90%] w-10 rounded-l-full bg-[#BDEBC9]" />

          <div className="relative overflow-hidden rounded-[32px] border-l-[8px] border-[#078344] shadow-xl">
            <img
              src="/images/unityhub-banner.png"
              alt="UnityHub community volunteers planting a tree together"
              className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[480px]"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-4 px-5 pb-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
        {statItems.map((stat) => (
          <div
            key={stat.label}
            className={`flex items-center gap-4 rounded-[26px] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${stat.color}`}
          >
            <div
              className={`flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full text-3xl ${stat.iconColor}`}
            >
              {stat.icon}
            </div>

            <div>
              <h2 className={`text-3xl font-extrabold ${stat.numberColor}`}>
                {stat.value}
              </h2>

              <p className="mt-1 text-base font-medium text-[#56615D]">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
