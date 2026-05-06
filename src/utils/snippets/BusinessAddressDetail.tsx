import React, { useState, useRef, useEffect } from "react";
import { Form, Input } from "antd";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

interface BusinessAddressAutocompleteProps {
  value?: string,
  onBusinessAddressSelect: (address: string) => void;
}
const GOOGLE_API_KEY =
  process.env.REACT_APP_GOOGLE_ADDRESS_KEY ??
  "AIzaSyAeGBMdC1x5sIZOgWO71ZFo8BxFsiErTWc";

const BusinessAddressAutocomplete: React.FC<BusinessAddressAutocompleteProps> = ({
  value = "",
  onBusinessAddressSelect,
}) => {
  const [businessAddress, setBusinessAdderess] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<any>(null); // ✅ Ref to manipulate input field

  // Load Google Places API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: ["places"],
  });

  // ✅ Update local state when `value` prop changes (for prefilled address)
  useEffect(() => {
    setBusinessAdderess(value);
    if (inputRef.current) {
      inputRef.current.value = value; // Ensure input field updates
    }
  }, [value]);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place?.formatted_address) {
        setBusinessAdderess(place.formatted_address);
        onBusinessAddressSelect(place.formatted_address);
      }
    }
  };

  if (!isLoaded) return <p>Loading Google Maps...</p>; // Prevent error by waiting for the API to load

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={handlePlaceChanged}
    >
      <Input
        ref={inputRef}
        value={businessAddress}
        onChange={(e) => setBusinessAdderess(e.target.value)}
        placeholder="Enter your business address"
        className="input-style"
      />
    </Autocomplete>
  );
};

export default BusinessAddressAutocomplete;