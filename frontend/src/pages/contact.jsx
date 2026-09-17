import React, { useState } from "react";

const contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // wire up your submit logic here
  };

  return (
    <div className="bg-[#EAE2D6] w-full px-8 md:px-20 py-24">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <p className="text-xs tracking-[0.3em] text-[#8B9A6E] font-medium">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-[#3A362F]">
            Contact Us
          </h1>
          <p className="text-base tracking-wide text-[#5C5750] max-w-md">
            Have a question about an order, a product, or just want to say hello?
            We'd love to hear from you.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Left: Info + Map */}
          <div className="flex flex-col gap-10">

            <div className="flex flex-col gap-6">
              <div>
                <span className="text-sm font-semibold tracking-wider uppercase text-[#2F3A25]">
                  Address
                </span>
                <p className="mt-1 text-sm tracking-wide text-[#5C5750]">
                  45 Textile Lane, Kochi, Kerala, India
                </p>
              </div>

              <div>
                <span className="text-sm font-semibold tracking-wider uppercase text-[#2F3A25]">
                  Email
                </span>
                <p className="mt-1 text-sm tracking-wide text-[#5C5750]">
                  hello@elvorthreads.com
                </p>
              </div>

              <div>
                <span className="text-sm font-semibold tracking-wider uppercase text-[#2F3A25]">
                  Phone
                </span>
                <p className="mt-1 text-sm tracking-wide text-[#5C5750]">
                  +91 98765 43210
                </p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="w-full h-64 bg-[#D9CBB4] flex items-center justify-center">
              <span className="text-sm tracking-wide text-[#6B6558]">
                Map placeholder
              </span>
            </div>

          </div>

          {/* Right: Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#F7F2EB] p-10 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium tracking-wide text-[#2F3A25]">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-transparent border-b border-[#C9BFA9] py-2 text-sm text-[#3A362F] focus:outline-none focus:border-[#8B9A6E] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium tracking-wide text-[#2F3A25]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent border-b border-[#C9BFA9] py-2 text-sm text-[#3A362F] focus:outline-none focus:border-[#8B9A6E] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium tracking-wide text-[#2F3A25]">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="bg-transparent border-b border-[#C9BFA9] py-2 text-sm text-[#3A362F] focus:outline-none focus:border-[#8B9A6E] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium tracking-wide text-[#2F3A25]">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="bg-transparent border-b border-[#C9BFA9] py-2 text-sm text-[#3A362F] focus:outline-none focus:border-[#8B9A6E] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-fit bg-[#8B9A6E] text-white px-8 py-3 text-sm tracking-[0.15em] hover:bg-[#7a8960] transition-colors duration-200"
            >
              Send Message
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default contact;