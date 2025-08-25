const Contact = () => {
  // show snippets of instagram account?

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-8 bg-amber-50 m-10 w-[80vw] h-80 rounded-2xl shadow-md">
        {/* Left side: text and button */}
        <div className="flex flex-col items-start gap-4 pl-25">
          <h1 className="header">Contact</h1>
          <h3 className="text-lg text-gray-600 font-medium max-w-md">
            Check out the program and DM me for any questions!
          </h3>
          <a
            href="https://instagram.com/izmir_kids_english/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 rounded-3xl py-2 px-5 text-white hover:bg-pink-400 shadow"
          >
            Visit Us
          </a>
        </div>

        {/* Right side: logo */}
        <img
          src="../images/izmir_kids_logo.png"
          className="w-48 h-48 rounded-full shadow-lg"
          alt="Izmir Kids Logo"
        />
      </div>
    </div>
  );
};
export default Contact;
