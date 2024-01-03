import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen bg-zinc-900 overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
    </main>
  );
};

export default LandingLayout;
