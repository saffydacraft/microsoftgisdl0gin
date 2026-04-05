import { useEffect, useRef, useState } from "react";

const SEQUENCE = ["ArrowUp", "ArrowDown", "ArrowUp", "ArrowDown"];

const FakeRestricted = ({ onBypass }: { onBypass: () => void }) => {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === SEQUENCE[indexRef.current]) {
        const next = indexRef.current + 1;
        indexRef.current = next;
        setIndex(next);
        if (next === SEQUENCE.length) {
          onBypass();
        }
      } else {
        indexRef.current = 0;
        setIndex(0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onBypass]);

  return (
    <div className="min-h-screen bg-white text-black font-sans select-none">
      {/* Red banner */}
      <div className="bg-[#8b0000] text-white text-center py-3 text-2xl font-bold tracking-wide shadow-md">
        RESTRICTED
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 text-center">
        <p className="text-base font-medium mb-8">
          You have been restricted by the district's internet filter policy.
        </p>

        <div className="text-left space-y-2 text-sm mb-8 pl-4">
          <p><span className="text-[#cc6600] font-semibold">URL:</span>&nbsp; for-lightspeed.b-cdn.net</p>
          <p><span className="text-[#cc6600] font-semibold">URL Categories:</span>&nbsp; Proxies:Filtering-Bypass (Global)</p>
          <p><span className="text-[#cc6600] font-semibold">Policy:</span>&nbsp; Policy=ms-students; AD Group=aus-studentusers</p>
          <p><span className="text-[#cc6600] font-semibold">User:</span>&nbsp; student@students.garlandisd.net</p>
          <p><span className="text-[#cc6600] font-semibold">User's IP:</span>&nbsp; 192.168.34.102</p>
          <p><span className="text-[#cc6600] font-semibold">Appliance:</span>&nbsp; ContentKeeper</p>
          <p><span className="text-[#cc6600] font-semibold">Appliance IP:</span>&nbsp; 192.168.34.101</p>
        </div>

        <button className="border border-gray-400 px-6 py-1 text-sm bg-gray-100 hover:bg-gray-200 mb-6">
          Login
        </button>

        <hr className="border-gray-300 mb-6" />

        <p className="text-[#cc0000] font-semibold text-sm mb-1">Website Review</p>
        <p className="text-xs text-gray-600 mb-1">To have a website reviewed for access:</p>
        <p className="text-xs text-gray-600 mb-1">If you are a student, please submit the exact URL and policy to your teacher.</p>
        <p className="text-xs text-gray-600 mb-2">If you are a staff member, please submit the exact URL and policy to:</p>
        <a href="#" className="text-blue-600 underline text-xs" onClick={e => e.preventDefault()}>
          GISD Web Page Submit Form
        </a>
      </div>

      <div className="bg-[#8b0000] h-8 mt-8" />
    </div>
  );
};

export default FakeRestricted;
