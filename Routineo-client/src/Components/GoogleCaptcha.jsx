import React from 'react'
import { GoogleReCaptchaProvider, GoogleReCaptchaCheckbox } from '@google-recaptcha/react';


const GoogleCaptcha = () => {
  return (
    <div>
 <GoogleReCaptchaProvider
    type="v2-checkbox"
    siteKey="6Ld-bb4qAAAAAEGfh8ocROPwLnvY08OkOIKFbIfB"
  >
    <GoogleReCaptchaCheckbox
      onChange={(token) => {
        console.log(token);
      }}
    />
  </GoogleReCaptchaProvider>
  </div>
  )
}

export default GoogleCaptcha