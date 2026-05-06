import React from "react";
import path from "path";
import fs from "fs";

export function formatTitle(str: string) {
  return str
    ?.replace(/\//g, '') // replace all - with space
    ?.replace(/-/g, ' ') // Replace all hyphens with spaces
    ?.split(' ') // Split the string into words
    ?.map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    ?.join(' '); // Join the words back together with spaces
}

export function capitalizeFirstLetter(str: string) {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}

export function capitalizeAfterComma(str: string) {
  return str?.split(',').map((word, index) => {
    if (index > 0) {
      return word?.trim()?.charAt(0)?.toUpperCase() + word?.slice(1);
    } else {
      return word?.trim();
    }
  }).join(', ');
}

export function formatAndCapitalizeString(str: string) {
  return str && str?.replace(/-/g, ' ')?.replace(/\b\w/g, match => match?.toUpperCase());
}

export function extractVideoId(url: string) {
  const urlRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url?.match(urlRegex);
  return (match && match[7]?.length === 11) ? match[7] : false;
}

export function truncateText(text: string, limit = 10) {
  if (text?.length <= limit) {
    return text;
  }

  // Find the last space within the limit
  const truncated = text?.substring(0, limit);
  const lastSpaceIndex = truncated?.lastIndexOf(' ');

  // If a space is found, truncate at the last space, else truncate at the limit
  return lastSpaceIndex > 0 ? text?.substring(0, lastSpaceIndex) + '...' : text?.substring(0, limit) + '...';
}

export function isValidEmail(email: string) {
  // Regular expression for validating an Email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}

export function appendRegisterReferrer(url: string) {
  // Create a new URL object
  const parsedUrl = new URL(url);

  // Split the pathname into segments
  const segments = parsedUrl.pathname.split('/');

  // Find the index of 'business-details'
  const index = segments.indexOf('business-details');

  // If 'business-details' is found, insert '/register-referrer' after it
  if (index !== -1) {
    segments.splice(index + 1, 0, 'register-referrer');
  }

  // Reconstruct the pathname
  parsedUrl.pathname = segments.join('/');

  // Return the modified URL as a string
  return parsedUrl.toString();
}

export function calculateCommission(finalAmount: number, percentage: number) {
  // Convert percentage to a decimal by dividing by 100
  const percentageDecimal = percentage / 100;

  // Calculate the commission by multiplying the final amount by the percentage decimal
  const commission = percentageDecimal && finalAmount * percentageDecimal;

  return commission;
}

export const isAdminEmail = (email: string) => {
  const emails = ['phil@SNBLAnetwork.com', 'justin@SNBLAnetwork.com']
  if (emails?.includes(email)) return true
  return false
}

const key = 9876543210
// Function to encrypt a number
export function encryptNumber(number: number, nKey = key) {
  return number ^ nKey;  // XOR the number with the key
}

//  ***** convert to valid data for referrer card ***********

// interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   mobileNumber?: string; // This is required
//   referralsCount: number;
//   BusinessDetails: {
//       id: number | null;
//       logo: string | null;
//       businessName: string;
//       url: string | null;
//       category: string | null;
//       services: string | null;
//   };
//   referrals: Array<{ id: number; email: string; createdAt: string }>;
// }



export const IndexPluginTitle = ({ merchantPlan }: any) => {
  return (
    <h4>
      Get paid to save up for {merchantPlan?.merchant?.businessName} purchases
    </h4>
  )
}

export const VerifyMobileTitle = () => {
  return (
    <h4>
      Rewards Ready For you
    </h4>
  )
}


