
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold tracking-widest text-green-700">
          CONTACT UNITYHUB
        </p>

        <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
          We'd Love to Hear From You
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-600">
          Have a question, suggestion or an idea for a social
          development event? Get in touch with us. We are always
          happy to connect with people who want to make a difference.
        </p>
      </section>

      {/* Contact Cards */}
      <section className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
            01
          </div>

          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Get in Touch
          </h2>

          <p className="leading-7 text-gray-600">
            Have questions about UnityHub or our community events?
            We welcome your feedback and suggestions.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
            02
          </div>

          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Join Our Community
          </h2>

          <p className="leading-7 text-gray-600">
            Become part of a community that supports social
            development, volunteering and helping others.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto mt-10 max-w-5xl rounded-2xl bg-slate-900 px-8 py-12 text-center text-white md:px-16">
        <h2 className="mb-4 text-3xl font-bold">
          Together We Can Create Change
        </h2>

        <p className="mx-auto max-w-2xl leading-8 text-gray-300">
          Your ideas and participation can make a real difference.
          Join UnityHub and help build a better community for everyone.
        </p>

        <a
          href="/upcoming-events"
          className="mt-8 inline-block rounded-lg bg-green-600 px-7 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Explore Events
        </a>
      </section>
    </main>
  );
}
