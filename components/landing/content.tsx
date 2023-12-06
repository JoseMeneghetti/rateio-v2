import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./../ui/card";

const testimonials = [
  {
    name: "Jose",
    avatar: "J",
    title: "Software Engineer",
    description: "This is the best app i've used",
  },
  {
    name: "Carol",
    avatar: "J",
    title: "FPNA",
    description: "Amazing Split tools.",
  },
  {
    name: "Joao Vitor",
    avatar: "J",
    title: "Mechanic",
    description: "I loved the Suggestions",
  },
  {
    name: "Antonio",
    avatar: "A",
    title: "Studant",
    description: "It's helps in my New Yers eve a lot.",
  },
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div className="flex gap-y-2 flex-col">
                  <div className="text-lg flex gap-x-2">
                    <div className="w-7 h-7 rounded-full bg-white text-zinc-700 text-sm flex items-center justify-center">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                    {testimonial.name}
                  </div>
                  <p className="text-zinc-400 text-sm">{testimonial.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-1 px-0">
                {testimonial.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
