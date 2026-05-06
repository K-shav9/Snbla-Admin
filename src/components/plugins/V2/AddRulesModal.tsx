import React from 'react'


const AddRulesModal = ()=> {
  return (
    <div className="plugin-body">
      <div className="anyammount modal-any">
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
            <path d="M11.668 3.33301V21.6663H16.668V36.6663L28.3346 16.6663H21.668L28.3346 3.33301H11.668Z" fill="#1F242E" />
          </svg>
          Deposit today to continue earning
          <span className="goal-badge green">+7%</span>in rewards.
        </p>
      </div>
      <div className="automate-saving modal">
        <h4>How do you want to fund your wallet?</h4>
      </div>
      <div className="setforget">
        <div className="icon">
          <svg width={60} height={60} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 16C0 7.16344 7.16344 0 16 0H44C52.8366 0 60 7.16344 60 16V44C60 52.8366 52.8366 60 44 60H16C7.16344 60 0 52.8366 0 44V16Z" fill="#E9EBF0" />
            <path d="M31.1873 28.8002C28.814 28.0135 27.6673 27.5202 27.6673 26.2668C27.6673 24.9068 29.1473 24.4135 30.0807 24.4135C31.8273 24.4135 32.4673 25.7335 32.614 26.2002L34.7206 25.3068C34.5206 24.7068 33.6273 22.7468 31.334 22.3202V20.6668H28.6673V22.3468C25.3607 23.0935 25.3473 26.1602 25.3473 26.2935C25.3473 29.3202 28.3473 30.1735 29.814 30.7068C31.9206 31.4535 32.854 32.1335 32.854 33.4135C32.854 34.9202 31.454 35.5602 30.214 35.5602C27.7873 35.5602 27.094 33.0668 27.014 32.7735L24.8007 33.6668C25.6407 36.5868 27.8407 37.3735 28.6673 37.6135V39.3335H31.334V37.6802C31.8673 37.5602 35.2006 36.8935 35.2006 33.3868C35.2006 31.5335 34.3873 29.9068 31.1873 28.8002ZM18.0007 42.0002H15.334V34.0002H23.334V36.6668H20.0273C22.174 39.8802 25.8407 42.0002 30.0007 42.0002C36.6273 42.0002 42.0006 36.6268 42.0006 30.0002H44.6673C44.6673 38.1068 38.1073 44.6668 30.0007 44.6668C25.0407 44.6668 20.654 42.2002 18.0007 38.4402V42.0002ZM15.334 30.0002C15.334 21.8935 21.894 15.3335 30.0007 15.3335C34.9606 15.3335 39.3473 17.8002 42.0006 21.5602V18.0002H44.6673V26.0002H36.6673V23.3335H39.974C37.8273 20.1202 34.1606 18.0002 30.0007 18.0002C23.374 18.0002 18.0007 23.3735 18.0007 30.0002H15.334Z" fill="#4E5663" />
          </svg>
        </div>
        <div className="cont">
          <h5>Set and Forget</h5>
          <p>Save with recurring deposits</p>
        </div>
        <div className="popular">
          <span className="goal-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path d="M10.6673 4L12.194 5.52667L8.94065 8.78L6.27398 6.11333L1.33398 11.06L2.27398 12L6.27398 8L8.94065 10.6667L13.1407 6.47333L14.6673 8V4H10.6673Z" fill="#047857" />
            </svg>
            Popular</span>
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
            <path d="M6.4693 4L5.5293 4.94L8.58263 8L5.5293 11.06L6.4693 12L10.4693 8L6.4693 4Z" fill="#686E7D" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default AddRulesModal