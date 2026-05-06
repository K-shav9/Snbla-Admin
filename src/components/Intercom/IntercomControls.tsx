import React, { useEffect } from "react";
import { useIntercom } from "react-use-intercom";

const IntercomControls = () => {
    const {
        boot,
        shutdown,
        update,
        hide,
        show,
        trackEvent,
        getVisitorId
    }: any = useIntercom();

    // Boot Intercom when the component mounts
    useEffect(() => {
        // console.log("Booting Intercom in Debug Mode...");
        boot({
            hide_default_launcher: false,
            // debug: true,  // ✅ Enable debug mode here
        });
        // update();
    }, [boot]);


    const handleTrackEvent = () => {
        trackEvent("invited_friend", { referrer: "User123" });
    };

    const handleGetVisitorId = async () => {
        const visitorId = await getVisitorId();
        console.log("Visitor ID:", visitorId);
    };

    return (
        // <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">

        <div className="">

            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Intercom Demo</h1>

                <div className="grid grid-cols-2 gap-4">
                    <button onClick={boot} >
                        Live Chat
                    </button>
                    <button onClick={shutdown} className="px-4 py-2 bg-red-600 text-white rounded-lg focus:outline-none">
                        Shutdown
                    </button>
                    <button onClick={show} className="px-4 py-2 bg-green-600 text-white rounded-lg focus:outline-none">
                        Show Messenger
                    </button>
                    <button onClick={hide} className="px-4 py-2 bg-yellow-500 text-white rounded-lg focus:outline-none">
                        Hide Messenger
                    </button>
                    <button onClick={() => update({ user_id: "12345", name: "John Doe", email: "john@example.com" })}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg focus:outline-none">
                        Update User Info
                    </button>
                    <button onClick={handleTrackEvent} >
                        Track Event
                    </button>
                    <button onClick={handleGetVisitorId} >
                        Get Visitor ID
                    </button>
                </div>
            </div> *
        </div>

    );
};

export default IntercomControls;
