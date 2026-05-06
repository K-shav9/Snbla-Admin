import React, { useEffect } from 'react'
import ResetPasswordForm from './ResetPasswordForm'
import ChangePasswordForm from './ChangePasswordForm'

const ResetPassword = () => {
  useEffect(() => {
    document.title = "Reset Password | Snbla";
  }, []);
  return (
    <div>
        <ChangePasswordForm />
    </div>
  )
}

export default ResetPassword