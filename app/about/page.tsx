
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f3faf5] px-6 py-16">
      {/* Hero Section */}
      <section className="mx-auto max-w-5xl text-center">
        <p className="mb-4 font-semibold text-green-700">
          ABOUT UNITYHUB
        </p>

        <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
          Together We Can Make a Difference
        </h1>

        <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-600">
          UnityHub is a community-driven platform that connects people
          through social development events. We help people create,
          join and participate in activities that make our communities
          better.
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-green-700">
            Our Mission
          </h2>

          <p className="leading-7 text-gray-600">
            Our mission is to encourage people to participate in
            community service, help others and create positive social
            change.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-green-700">
            Our Vision
          </h2>

          <p className="leading-7 text-gray-600">
            Our vision is to build a connected and supportive community
            where everyone can contribute to a better future.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto mt-10 max-w-5xl rounded-2xl bg-green-700 p-10 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">
          Be Part of the Change
        </h2>

        <p className="mx-auto max-w-2xl leading-7 text-green-50">
          Join UnityHub, participate in meaningful events and help
          make a positive difference in society.
        </p>
      </section>
    </main>
  );
}
