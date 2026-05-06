import React from 'react'
import { Link } from 'react-router-dom'

const ModalRecurringSetupComplete = ()=> {
  return (
    <div className="plugin-body withoutpadding">
      <div className="automate-saving">
        <h4>You’ve automated your savings</h4>
        <p className="black">Next deposit: November 18th, 2024</p>
        <div className="deposite">
          <div >
            <p>Deposit</p>
            <p className="reward"><span className="purple" />SAR 250.00</p>
          </div>
          <div >
            <p>Reward</p>
            <p className="reward"><span className="green" />SAR 17.50</p>
          </div>
        </div>
        <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width={240} height={123} viewBox="0 0 240 123" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M239.401 14.9801C240.062 8.38581 234.627 3.00001 228 3.00001C221.373 3.00001 216.077 8.39317 215.251 14.9689C214.184 23.4633 211.983 31.7949 208.693 39.7376C203.868 51.3849 196.797 61.9678 187.882 70.8823C178.968 79.7967 168.385 86.868 156.738 91.6924C145.09 96.5169 132.607 99 120 99C107.393 99 94.9097 96.5169 83.2625 91.6924C71.6152 86.868 61.0323 79.7967 52.1178 70.8823C43.2034 61.9678 36.1321 51.3849 31.3076 39.7376C28.0177 31.7949 25.8165 23.4633 24.7491 14.9689C23.9228 8.39316 18.6275 3 12.0001 3C5.37267 3 -0.0620566 8.3858 0.599589 14.9801C1.76839 26.629 4.63786 38.0661 9.13454 48.922C15.1651 63.4811 24.0042 76.7098 35.1473 87.8528C46.2903 98.9959 59.519 107.835 74.0781 113.866C88.6371 119.896 104.241 123 120 123C135.759 123 151.363 119.896 165.922 113.866C180.481 107.835 193.71 98.9959 204.853 87.8528C215.996 76.7098 224.835 63.4811 230.866 48.922C235.362 38.0661 238.232 26.629 239.401 14.9801Z" fill="#10B981" />
            <path fillRule="evenodd" clipRule="evenodd" d="M232.955 43.5107C235.192 37.2723 231.222 30.7311 224.792 29.1278C218.361 27.5245 211.918 31.4769 209.526 37.6574C202.512 55.7751 190.124 71.4355 173.89 82.447C154.329 95.7158 130.561 101.302 107.137 98.1346C83.7133 94.9676 62.2814 83.2704 46.9463 65.2835C34.2199 50.3565 26.4348 31.9685 24.4845 12.6389C23.8191 6.04494 18.6573 0.523477 12.0318 0.361556C5.40641 0.199635 -0.158382 5.45168 0.341851 12.0602C2.25328 37.3118 12.1204 61.4278 28.6829 80.8543C47.8519 103.338 74.6417 117.959 103.921 121.918C133.201 125.877 162.912 118.895 187.363 102.309C208.49 87.9779 224.407 67.3481 232.955 43.5107Z" fill="#474DF4" />
          </svg>
        </div>
      </div>
      <div className="bgwithicon text-center">
        <p>Wow! That’s worth far more than any credit card points or standard interest could offer!</p>
      </div>
      <Link to="#recurring-reward" className="submitbtn">Continue</Link>
    </div>
  )
}

export default ModalRecurringSetupComplete