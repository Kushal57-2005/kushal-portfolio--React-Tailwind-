import { useState } from "react";
import Button from "./uiComponents/Button";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        const response = await fetch("https://formsubmit.co/ajax/kushalwaykole57@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        });
        
        const data = await response.json();
        
        if (response.ok) {
            setResult("Form Submitted Successfully!");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message || "Something went wrong!");
        }
    } catch (error) {
        console.log(error);
        setResult("Something went wrong!");
    }
  };

  return (
    <section id="contact" className="min-h-screen w-full py-16 md:py-20 px-4 md:px-24 flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            Contact Me
        </h2>
        <p className="text-center text-gray-600 mb-8 md:mb-12 text-base md:text-lg px-2">
            Feel free to reach out for collaborations or just a friendly hello!
        </p>

        <form onSubmit={onSubmit} className="w-full max-w-lg mx-auto bg-white p-5 md:p-8 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.1)]">
            <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    required 
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    required 
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea 
                    name="message" 
                    id="message" 
                    rows="5"
                    required
                    placeholder="Your detailed message..."
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors resize-none"
                ></textarea>
            </div>
            
            <input type="hidden" name="_subject" value="New submission from Portfolio!" />
            <input type="hidden" name="_captcha" value="false" />

            <div className="flex justify-center">
                <Button text="Send Message" />
            </div>
            
            {result && (
                <div className={`mt-4 text-center font-medium ${result.includes("Success") ? "text-green-600" : "text-amber-600"}`}>
                    {result}
                </div>
            )}
        </form>
      </div>
    </section>
  );
}