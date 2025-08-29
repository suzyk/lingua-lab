const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 flex-1 bg-white">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-600 mb-6 text-center">
        Get in Touch
      </h1>

      <p className="text-gray-700 text-center mb-10 max-w-lg">
        We love hearing from parents and kids! Follow us on Instagram for
        updates, or send us a message with any questions about our programs.
      </p>

      {/* Contact Card */}
      <div className="flex flex-col md:flex-row items-center bg-white border-2 border-gray-200 rounded-3xl shadow-lg p-8 md:p-12 gap-8 w-full max-w-3xl">
        {/* Left side: text + button */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h2 className="text-2xl font-semibold text-amber-600">
            Follow Us on Instagram
          </h2>
          <p className="text-gray-600">
            Stay updated with fun games, stories, and activities for kids!
          </p>
          <a
            href="https://instagram.com/izmir_kids_english/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-500 hover:bg-amber-400 transition-colors text-white font-medium py-2 px-6 rounded-full shadow-md"
          >
            Visit Us
          </a>
        </div>

        {/* Right side: logo */}
        <img
          src="../images/izmir_kids_logo.png"
          alt="Izmir Kids Logo"
          className="w-48 h-48 rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export default Contact;
