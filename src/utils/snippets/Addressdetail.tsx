import React, { useState, useRef, useEffect } from "react";
import { Form, Input } from "antd";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

interface AddressAutocompleteProps {
  value?: string,
  onAddressSelect: (address: string) => void;
}
const GOOGLE_API_KEY =
  process.env.REACT_APP_GOOGLE_ADDRESS_KEY ??
  "AIzaSyAeGBMdC1x5sIZOgWO71ZFo8BxFsiErTWc";

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value = "",
  onAddressSelect,
}) => {
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<any>(null); // ✅ Ref to manipulate input field

  // Load Google Places API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: ["places"],
  });

  // ✅ Update local state when `value` prop changes (for prefilled address)
  useEffect(() => {
    setAddress(value);
    if (inputRef.current) {
      inputRef.current.value = value; // Ensure input field updates
    }
  }, [value]);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place?.formatted_address) {
        setAddress(place.formatted_address);
        onAddressSelect(place.formatted_address);
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
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your address"
        className="input-style"
      />
    </Autocomplete>
  );
};

export default AddressAutocomplete;