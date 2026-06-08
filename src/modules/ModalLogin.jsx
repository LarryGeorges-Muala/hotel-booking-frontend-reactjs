import React, { useState, useRef } from 'react'
import Modal from './components/Modal'
import InputEmail from './components/InputEmail'
import InputPassword from './components/InputPassword'
import InputPasswordShow from './components/InputPasswordShow'
import InputSubmit from './components/InputSubmit'
import Button from './components/Button'
import LoggerError from './components/LoggerError'
import LoggerInfo from './components/LoggerInfo'

function ModalLogin (props) {

  /* Handle Passwords */
  const [passwordType, setPasswordType] = useState('password');
  /* Swicth to Login */
  const [switchToRegister, setSwitchToRegister] = useState(false);
  /* Form */
  const formRef = useRef(null);

  /* Handle Form */
  function ManualFormReset() {
    formRef.current?.reset();
  }

  function GenerateLogin() {

    /* Handle Modal */
    function CloseModal() {
      props.HideModalFunction();
      formRef.current?.reset();
      setSwitchToRegister(false);
      DisplayErrors('');
    }

    /* Handle Errors */
    function DisplayErrors(msg) {
      props.setModalLoginErrorMessage(msg);
      setTimeout(() => {
        props.setModalLoginErrorMessage('');
      }, 10000);
    }

    /* Switch Modal */
    function EnableSwicthModal() {
      DisplayErrors(`Account not found... Please register...`);
      setSwitchToRegister(true);
    }
    function SwicthModal() {
      CloseModal();
      props.ShowRegisterModalFunction();
    }

    /* Handle Invalid password */
    function InvalidPassword() {
      DisplayErrors(`Invalid password...`);
    }

    /* Reset Password */
    function HandleResetPassword(){
      CloseModal();
      props.setModalRecoveryRequestOrigin('login');
      props.ShowRecoveryModalFunction();
    }

    /* Form submit handle */
    const HandleLogin = async (event) => {
      try {
        // Prevent the browser from reloading the page
        event.preventDefault();

        DisplayErrors('');

        const form = formRef.current;
        if (form.reportValidity()) {
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());

          // LoggerInfo(data);

          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND}/booking/users/verify/`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': props.csrfToken,
              },
              body: JSON.stringify(data),
              credentials: 'include',
            });
            let result = await response.json();
            // result = JSON.stringify(result);
            // result = JSON.parse(result);
            // LoggerInfo(typeof result);
            // LoggerInfo(`Success: ${result}`);
            // LoggerInfo(result[0]);

            if (result.code === 400) {
              throw new Error("Bad request.");
            }

            if (result.code === 200) {
              // LoggerInfo("USER EXISTS");
              const accessClient = props.ip;
              const sessionObj = {
                'accessClient': accessClient,
                'password': data.password,
                'email': data.email
              }
              // LoggerInfo(sessionObj);
              const fetchUser = await fetch(`${import.meta.env.VITE_BACKEND}/booking/users/login/`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': props.csrfToken,
                },
                body: JSON.stringify(sessionObj),
                credentials: 'include',
              });
              let fetchUserResult = await fetchUser.json();
              // fetchUserResult = JSON.stringify(fetchUserResult);
              // fetchUserResult = JSON.parse(fetchUserResult);
              // LoggerInfo(typeof fetchUserResult);
              // LoggerInfo(`Success: ${fetchUserResult}`);
              // LoggerInfo(fetchUserResult.data.accessToken);

              if (fetchUserResult) {

                if (Object.hasOwn(fetchUserResult.data, 'valid')) {

                  if (fetchUserResult.data.valid) {

                    // Create Session
                    const sessionRedisObj = {
                      'accessToken': fetchUserResult.data.accessToken,
                      'accessClient': accessClient,
                      'username': fetchUserResult.data.username,
                      'userId': fetchUserResult.data.userId,
                      'firstname': fetchUserResult.data.firstname,
                      'surname': fetchUserResult.data.surname,
                      'email': fetchUserResult.data.email,
                      'title': fetchUserResult.data.title,
                      'phone': fetchUserResult.data.phone
                    }
                    const createSession = await fetch(`${import.meta.env.VITE_BACKEND}/booking/session/`, {
                      method: "POST",
                      headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': props.csrfToken,
                      },
                      body: JSON.stringify(sessionRedisObj),
                      credentials: 'include',
                    });
                    await createSession.json();
                    // let createSessionResult = await createSession.json();
                    // createSessionResult = JSON.stringify(createSessionResult);
                    // createSessionResult = JSON.parse(createSessionResult);
                    // LoggerInfo(typeof createSessionResult);
                    // LoggerInfo(`Success: ${createSessionResult}`);
                    // LoggerInfo(createSessionResult.message);

                    if (Object.hasOwn(fetchUserResult.data, 'accessToken')) {
                      props.setToken(fetchUserResult.data.accessToken);
                    }

                    if (Object.hasOwn(fetchUserResult.data, 'email')) {
                      props.ResetEmailLoginRegisterFunction('');
                      props.EmailFunction(fetchUserResult.data.email);
                      props.EmailReadOnlyFunction(true);
                    }

                    if (Object.hasOwn(fetchUserResult.data, 'firstname')) {
                      props.FirstnameFunction(fetchUserResult.data.firstname);
                    }

                    if (Object.hasOwn(fetchUserResult.data, 'surname')) {
                      props.SurnameFunction(fetchUserResult.data.surname);
                    }

                    if (Object.hasOwn(fetchUserResult.data, 'title')) {
                      props.TitleFunction(fetchUserResult.data.title);
                    }

                    if (Object.hasOwn(fetchUserResult.data, 'phone')) {
                      props.PhoneNumberFunction(fetchUserResult.data.phone);
                    }

                    // Enable Logged in options
                    props.setUserLoggedIn(true);

                    CloseModal();

                  } else {
                    InvalidPassword();
                  }

                } else {
                  InvalidPassword();
                }

              } else {
                InvalidPassword();
              }

            } else {
              // LoggerInfo("CREATE USER");
              EnableSwicthModal();
            }

            form.reset();

          } catch (error) {
            DisplayErrors(`Oops! Something went wrong and your login couldn't be processed... We apologize for the technicality and please try again later.`);
            LoggerError(error);
          }

        }
      } catch (err) {
        DisplayErrors(`Oops! Something went wrong and your login couldn't be processed... We apologize for the technicality and please try again later.`);
        LoggerError(err);
      }
    };

    /* Component */
    return (
      <div>
      {/* Content */}
        {/* Form */}
        <form id="modal-form-login" ref={formRef} onSubmit={HandleLogin}>
          {/* Email */}
          <InputEmail
            name='email'
            labelText='Email:'
            inputDefaultValue={props.emailLoginRegister}
            divClassName='modal-component-form-container'
            labelClassName='label'
            autoComplete='on'
            required={true}
            inputOnChange={ props.EmailLoginRegisterFunction }
          />
          {/* Password */}
          <InputPassword
            type={passwordType}
            name='password'
            labelText='Password:'
            divClassName='modal-component-form-container'
            labelClassName='label'
            autoComplete='off'
            required={true}
          />
          <InputPasswordShow
            divClassName='modal-component-form-container'
            inputClassName='modal-component-form-password-show'
            labelClassName='modal-component-form-password-show-label'
            showPassword={(event) => { event.target.checked ? setPasswordType('text') : setPasswordType('password');} }
          />
          {/* Submit */}
          { !switchToRegister &&
          <InputSubmit
            name='submit-button'
            inputValue='Submit'
            divClassName='modal-component-form-container'
            inputClassName='modal-component-submit-button'
          />
          }
        </form>
        {/* Alt Button */}
        { switchToRegister &&
        <Button
          text='Login'
          type='button'
          className='modal-component-button'
          onClick={SwicthModal}
        />
        }
        {/* Reset */}
        <Button
          text='Forgot password?'
          type='button'
          className='modal-component-button'
          onClick={HandleResetPassword}
        />

      {/* End Content */}
      </div>
    );
  }

  return (
    <div>
      {/* Modal Login */}
      <Modal
        id='login-modal'
        header='Login'
        modalErrorMessage={props.modalLoginErrorMessage}
        toggleModal={props.toggleLoginModal}
        HideModalFunction={() => {
          props.setToggleLoginModal('hide-modal');
          props.ResetEmailLoginRegisterFunction('');
          ManualFormReset();
          props.setModalRecoveryRequestOrigin('');
        }}
      >
        { GenerateLogin() }
      </Modal>
      {/* End Modal Login */}
    </div>
  );
}

export default ModalLogin;
