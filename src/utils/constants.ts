export const API_BASE_URL = "http://localhost:4001/api/v1";
export const TOKEN_KEY = "authToken";
import dayjs from 'dayjs';
import CryptoJS from "crypto-js";



export const categories = [
    { label: "Education", value: "education" },
    { label: "Home & Furniture", value: "home_furniture" },
    { label: "Travel", value: "travel" },
    { label: "Health & Wellness", value: "health_wellness" },
    { label: "Jewellery", value: "jewellery" },
    { label: "Automotive", value: "auto" },
    { label: "Toys & Electronics", value: "toys_electronics" },
    { label: "Fashion & Apparel", value: "fashion_apparel" },
    { label: "Hotel", value: "hotel" },
    { label: "Fitness", value: "fitness" },
    { label: "Other", value: "other" },
];
export const groupByTypes = [
    { label: "Discount", value: "discount" },
    { label: "Cashback", value: "cashback" },
    { label: "Reward", value: "reward" },
];

export const gulfCountries = [
    { label: "Saudi Arabia", value: "SA" },
    { label: "United Arab Emirates", value: "UAE" },
    { label: "Qatar", value: "QA" },
    { label: "Kuwait", value: "KW" },
    { label: "Bahrain", value: "BH" },
    { label: "Oman", value: "OM" },
    { label: "Yemen", value: "YE" },
    { label: "India", value: "IN" },
];



// Function to get the suffix for the day
export const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // for 4-20
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};

// Custom validation for name and address (disallow spaces-only input)
export const validateNoSpaces = (_, value) => {
    if (value && /^\s+$/.test(value)) {
        return Promise.reject('This field cannot be empty or just spaces');
    }
    return Promise.resolve();
};

export const validateSaudiVAT = (_, value) => {
    const vatRegex = /^3\d{8}\d{1}\d{3}\d{2}$/;

    if (!value) {
        return Promise.reject("Please input the VAT number!");
    }

    if (!vatRegex.test(value)) {
        return Promise.reject("VAT Number must be a 15-digit Saudi Arabian VAT number starting with '3'.");
    }

    return Promise.resolve();
};

export const validateUnifiedNumber = (_, value) => {
    const unifiedNumberRegex = /^\d{9,15}$/;

    if (!value) {
        return Promise.reject("Please input the unified number!");
    }

    if (!unifiedNumberRegex.test(value)) {
        return Promise.reject("Unified Number must be between 9 and 15 digits.");
    }

    return Promise.resolve();
};

export const validateSaudiIBAN = (_, value) => {
    const ibanRegex = /^SA\d{2}\d{2}\d{18}$/;

    if (!value) {
        return Promise.reject("Please input the IBAN number!");
    }

    if (!ibanRegex.test(value)) {
        return Promise.reject("IBAN Number must start with 'SA', followed by 22 digits (24 characters total).");
    }

    return Promise.resolve();
};

export const validateCRNumber = (_, value) => {
    const crRegex = /^\d{10}$/; // Ensures exactly 10 digits

    if (!value) {
        return Promise.reject("Please input the commercial registration number!");
    }

    if (!crRegex.test(value)) {
        return Promise.reject("Commercial Registration Number must be exactly 10 digits.");
    }

    return Promise.resolve();
};

export const getQueryParams = (url) => {
    const params = new URL(url).searchParams;
    const token = params.get("token");
    const appLink = params.get("appLink");
    return { token, appLink };
}


export const formatDateToMonthDDYYYY = (dateString) => {
    return dayjs(dateString).format('MMMM D, YYYY');
};

// Example usage
// const inputDate = '2025-02-25';
// const formattedDate = formatDateToMonthDDYYYY(inputDate);
// console.log(formattedDate); // Output: "February 25, 2025"


export const nextDepositDate = (values) => {
    const { date, frequency, day } = values;
    if (!date) return;

    // Parse the starting date
    const startDate = new Date(date);
    const nextDepositDate = new Date(startDate);

    switch (frequency) {
        case "daily":
            nextDepositDate?.setDate(startDate?.getDate() + 1);
            break;
        case "weekly":
            nextDepositDate?.setDate(startDate?.getDate() + 7);
            break;
        case "monthly": {
            const dayOfMonth = parseInt(day, 10);
            nextDepositDate?.setMonth(startDate?.getMonth() + 1);

            // Adjust for months with fewer days
            const lastDayOfNextMonth = new Date(
                nextDepositDate?.getFullYear(),
                nextDepositDate?.getMonth() + 1,
                0
            ).getDate();
            console.log("lastDayOfNextMonth ::::::::::", startDate, dayOfMonth, lastDayOfNextMonth);
            nextDepositDate?.setDate(Math?.min(dayOfMonth, lastDayOfNextMonth));
            break;
        }
        default: {
            console.error("Invalid frequency");
            return;
        }
    }

    // Convert to "YYYY-MM-DD" format
    return nextDepositDate?.toISOString()?.split('T')?.[0];
};




export const generateHashForCardDetails = (params: any, password: string) => {
    const { cardNumber, email } = params;
    console.log("hashed ::::::::", params, password)
    if (!cardNumber || !email) {
        console.log("email :::::::", email, params?.card);
        return
    }
    // Function to reverse a string
    const ReverseString = (str: string) => [...str].reverse().join('');

    // Extract the necessary parts of the card number
    const cardStart = cardNumber.substr(0, 6);
    const cardEnd = cardNumber.substr(-4);

    // Reverse the required strings and concatenate them as per the hash requirements
    const toMd5 = ReverseString(email) + password + ReverseString(cardStart + cardEnd);

    // Generate the final hash
    const finalHash = CryptoJS.MD5(toMd5.toUpperCase()).toString();

    return finalHash;
};

export const extractAddressComponents = (address) => {
    const parts = address.split(",").map((part) => part.trim());
    const countryName = parts[parts.length - 1]; // Last part is the country
    const countryObj = gulfCountries.find(country => country.label === countryName);
    const countryCode = countryObj ? countryObj.value : ""; // Get country code or empty string
    const zipCode = parts[parts.length - 2].match(/\d+/)?.[0] || ""; // Extracts the postal code
    const city = parts.length > 3 ? parts[parts.length - 3] : ""; // City usually appears before state & zip
    const fullAddress = address; // Complete formatted address

    return { countryCode, zipCode, city, fullAddress };
};

export const formatAmount = (amount?: number | string) => {
  if (!amount) return "-"; // Handle undefined or null cases
  return Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatGulfNumber = (phone: string): string => {
  if (!phone) return "-";

  // Remove all non-numeric characters
  const digits = phone.replace(/\D/g, "");

  // Ensure we have at least 12 digits (default Gulf format)
  if (digits.length >= 12) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(
      5,
      8
    )} ${digits.slice(8, 12)}`;
  }

  return `+${digits}`; // Return raw if not enough digits
};

export const validateWebsite = (_: any, value: string) => {
  const websiteRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i;

  if (!value || websiteRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Please enter a valid website URL!"));
};


