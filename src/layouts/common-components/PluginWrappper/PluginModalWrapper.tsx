import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import './index.css'
import PluginModal from './PluginModal'
import IndexPlugins from '../../../components/plugins/V2/Indexplugins'
import PaymentProcessing from '../../../components/plugins/V2/PaymentProcessing'
import PaymentSuccess from '../../../components/plugins/V2/PaymentSuccess'
import AddFundsModal from '../../../components/plugins/V2/AddFundsModal'
import AddRulesModal from '../../../components/plugins/V2/AddRulesModal'
import AutomationSuccess from '../../../components/plugins/V2/AutomationSuccess'
import DeleteRecurringModule from '../../../components/plugins/V2/DeleteRecurringModule'
import EditRecurringModule from '../../../components/plugins/V2/EditRecurringMoule'
import ModalOneTimeAddCard from '../../../components/plugins/V2/ModalOneTimeAddCard'
import ModalOneTimePayment from '../../../components/plugins/V2/ModalOneTimePayment'
import ModalOneTimeProcessing from '../../../components/plugins/V2/ModalOneTimeProcessing'
import ModalOneTimeSuccess from '../../../components/plugins/V2/ModalOneTimeSuccess'
import ModalPauseRecurringRule from '../../../components/plugins/V2/ModalPauseRecurringRule'
import ModalRecurringAddCard from '../../../components/plugins/V2/ModalRecurringAddCard'
import ModalRecurringDeleteConfirmation from '../../../components/plugins/V2/ModalRecurringDeleteConfirmation'
import ModalRecurringDeposit from '../../../components/plugins/V2/ModalRecurringDeposit'
import ModalRecurringPauseConfirmation from '../../../components/plugins/V2/ModalRecurringPauseConfirmation'
import ModalRecurringReward from '../../../components/plugins/V2/ModalRecurringReward'
import ModalRecurringSchedule from '../../../components/plugins/V2/ModalRecurringSchedule'
import ModalRecurringSetupComplete from '../../../components/plugins/V2/ModalRecurringSetupComplete'
import ModalTransferAmount from '../../../components/plugins/V2/ModalTransferAmount'
import ModalTransferGoalSelect from '../../../components/plugins/V2/ModalTransferGoalSelect'
import ModalTransferProcessing from '../../../components/plugins/V2/ModalTransferProcessing'
import ModalTransferSuccess from '../../../components/plugins/V2/ModalTransferSuccess'
import ModalWelcomeBonus from '../../../components/plugins/V2/ModalWelcomeBonus'
import OneTimeModal from '../../../components/plugins/V2/OneTimeModal'
import RewardSuccess from '../../../components/plugins/V2/RewardSuccess'
import PickGoal from '../../../components/plugins/V2/PickGoal';
import ModalWithDrawAccountSelect from '../../../components/plugins/V2/ModalWithDrawAccountSelect'
import { useLocation } from 'react-router-dom'
import ModalWithDrawAmount from '../../../components/plugins/V2/ModalWithDrawAmount'
import ModalWithDrawProcessing from '../../../components/plugins/V2/ModalWithDrawProcessing'
import ModalWithDrawSuccess from '../../../components/plugins/V2/ModalWithDrawSuccess'
import VerifyMobile from '../../../components/plugins/V2/VerifyMobile'
import StepTwoRecurring from '../../../components/plugins/StepTwoCommon/StepTwoRecurring'
import StepTwoSchedule from '../../../components/plugins/StepTwoCommon/StepTwoSchedule'
import StepTwo from '../../../components/plugins/StepTwoCommon/StepTwoWrapper'
import CustomGoal from '../../../components/plugins/V2/CustomGoal'
import StepThree from '../../../components/plugins/V2/StepThree'
import BasicDetails from '../../../components/plugins/V2/BasicDetails'



const PluginModalWrapper = ({ pluginModal, handlePluginModal, handlePluginModalValue, merchantPlan }: any) => {
    const [title, setTitle] = useState<any>();
    const [type, setType] = useState<any>();

    const location: any = useLocation();
    const webToken = localStorage.getItem('web-token')


    // Function to set title based on the modal type
    const getTitle = (hash: string) => {
        switch (hash) {
            case "":
                !webToken ? setType("index-plugins") : setType("")
                break;
            case "#verify-mobile":
                setType("verify-mobile")
                break;
            default:
                setType("")
        }
    };

    // Update title whenever the hash changes
    useEffect(() => {
        setTitle(getTitle(location.hash));
        if (location?.hash === "#automation-success") {
            handlePluginModalValue(true)
        }
    }, [location.hash]);

    const renderModalComponent = (modalType: any = "", props: any = {}) => {
        // console.log("location--", location)
        switch (location?.hash) {
            case "#index-plugins":
                return <IndexPlugins merchantPlan={merchantPlan} />;
            case "#basic-details":
                return <BasicDetails {...props} />;
            case "#pick-goal":
                return <PickGoal {...props} />;
            case "#custom-goal":
                return <CustomGoal {...props} />;
            case "#step-two":
                return <StepTwo {...props} />;
            case "#step-two-recurring":
                return <StepTwoRecurring {...props} />;
            case "#step-two-schedule":
                return <StepTwoSchedule {...props} />;
            case "#step-three":
                return <StepThree {...props} />;
            case "#payment-processing":
                return <PaymentProcessing {...props} />;
            case "#payment-success":
                return <PaymentSuccess {...props} />;
            case "#add-funds":
                return <AddFundsModal {...props} />;
            case "#add-rules":
                return <AddRulesModal {...props} />;
            case "#automation-success":
                return <AutomationSuccess {...props} />;
            case "#delete-recurring":
                return <DeleteRecurringModule {...props} />;
            case "#edit-recurring":
                return <EditRecurringModule {...props} />;
            case "#one-time-add-card":
                return <ModalOneTimeAddCard {...props} />;
            case "#one-time-payment":
                return <ModalOneTimePayment {...props} />;
            case "#one-time-processing":
                return <ModalOneTimeProcessing {...props} />;
            case "#one-time-success":
                return <ModalOneTimeSuccess {...props} />;
            case "#pause-recurring-rule":
                return <ModalPauseRecurringRule {...props} />;
            case "#recurring-add-card":
                return <ModalRecurringAddCard {...props} />;
            case "#recurring-Delete-Confirmation":
                return <ModalRecurringDeleteConfirmation {...props} />;
            case "#recurring-deposit":
                return <ModalRecurringDeposit {...props} />;
            case "#recurring-pause-confirmation":
                return <ModalRecurringPauseConfirmation {...props} />;
            case "#recurring-reward":
                return <ModalRecurringReward {...props} />;
            case "#recurring-schedule":
                return <ModalRecurringSchedule {...props} />;
            case "#recurring-setup-complete":
                return <ModalRecurringSetupComplete {...props} />;
            case "#transfer-amount":
                return <ModalTransferAmount {...props} />;
            case "#transfer-goal-select":
                return <ModalTransferGoalSelect {...props} />;
            case "#transfer-processing":
                return <ModalTransferProcessing {...props} />;
            case "#transfer-success":
                return <ModalTransferSuccess {...props} />;
            case "#welcome-bonus":
                return <ModalWelcomeBonus {...props} />;
            case "#with-draw-account-select":
                return <ModalWithDrawAccountSelect {...props} />;
            case "#with-draw-amount":
                return <ModalWithDrawAmount {...props} />;
            case "#with-draw-processing":
                return <ModalWithDrawProcessing {...props} />;
            case "#with-draw-success":
                return <ModalWithDrawSuccess {...props} />;
            case "#one-time-deposit":
                return <OneTimeModal {...props} />;
            case "#reward-success":
                return <RewardSuccess {...props} />;
            case "#verify-mobile":
                return <VerifyMobile {...props} />;
            default:
                return !webToken ? <IndexPlugins merchantPlan={merchantPlan} /> : <PickGoal {...props} />;
        }
    };

    return (
        <div className="modalWrapper">
            <Modal
                open={pluginModal}
                centered
                onCancel={handlePluginModal}
                onClose={handlePluginModal}
                footer={null}
                closable={false}
                className="custom-modal"
                maskClosable={false} // Prevents closing on outside click

            >
                <PluginModal handleCloseModal={handlePluginModal} merchantPlan={merchantPlan} type={type}>
                    {renderModalComponent("", { pluginModal, handlePluginModal, merchantPlan })}
                </PluginModal>
            </Modal>
        </div>
    );
};

export default PluginModalWrapper;
