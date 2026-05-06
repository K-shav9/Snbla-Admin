import React, { useEffect, useState } from "react";
import { createSettings, fetchSettings } from "../../actions/settings";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spin, Input } from "antd";

const Setting = () => {
  const [referrerBonus, setReferrerBonus] = useState("");
  const [welcomeBonus, setWelcomeBonus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const dispatch: any = useDispatch();
  const { isLoading } = useSelector((state: any) => state?.General);

  useEffect(() => {
    document.title = "Settings | Snbla";

    dispatch(
      fetchSettings((data: any) => {
        if (data.length > 0) {
          const referrerSetting = data.find((item: any) => item.label === "referrer_bonus");
          const welcomeSetting = data.find((item: any) => item.label === "welcome_bonus");

          setReferrerBonus(referrerSetting ? referrerSetting.value : "");
          setWelcomeBonus(welcomeSetting ? welcomeSetting.value : "");
        }
      })
    );
  }, [dispatch]);

  const handleSave = () => {
    if (!referrerBonus || !welcomeBonus) {
      setError("Both referrer and referee bonus values are required.");
      return;
    }

    setIsSaving(true); // Start the save spinner

    const referralData = [
      {
        label: "referrer_bonus",
        value: referrerBonus,
      },
      {
        label: "welcome_bonus",
        value: welcomeBonus,
      },
    ];
    console.log("Saving Referral Bonus:", referralData);
    dispatch(
      createSettings(referralData, (response: any) => {
        setIsSaving(false); // Stop the save spinner after saving is done

        if (response.status === 200 || response.status === 201) {
          console.log("response", response.data);
        } else {
          alert("Failed to create settings.");
        }
      })
    );
  };

  const handleReferrerBonusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numeric input
    if (/^\d*\.?\d*$/.test(value)) {
      setReferrerBonus(value);
      setError(""); // Clear any previous error message when input changes
    }
  };

  const handleWelcomeBonusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numeric input
    if (/^\d*\.?\d*$/.test(value)) {
      setWelcomeBonus(value);
      setError(""); // Clear any previous error message when input changes
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Show a loading spinner on the entire page */}
        {isLoading && !isSaving ? (
          <div className="flex justify-center items-center mt-4">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm mb-2">Referrer Bonus</label>
                <Input
                  type="text"
                  value={referrerBonus}
                  onChange={handleReferrerBonusChange}
                  className="border p-2 w-full"
                  placeholder="Enter number"
                />
              </div>

              <div className="flex-1">
                <label className="block text-gray-700 text-sm mb-2">Welcome Bonus</label>
                <Input
                  type="text"
                  value={welcomeBonus}
                  onChange={handleWelcomeBonusChange}
                  className="border p-2 w-full"
                  placeholder="Enter number"
                />
              </div>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>} {/* Error message */}

            <div className="mt-6">
              <Button
                onClick={handleSave}
                loading={isSaving} // Use isSaving for button spinner
                type="primary"
                className="px-6 py-2"
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;