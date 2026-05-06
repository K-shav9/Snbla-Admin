import React, { useEffect } from 'react'

const Referral = () => {
  useEffect(() => {
    document.title = "Referral | Snbla";
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold text-left mb-6">Referrals</h1>
    </div>
  );
}

export default Referral
