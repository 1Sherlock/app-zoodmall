import {Modal, ModalBody, ModalFooter, ModalHeader, Collapse} from "reactstrap";
import {useEffect, useState} from "react";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {useMediaQuery} from 'react-responsive'

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [number, setNumber] = useState("");
    const [type, setType] = useState(0);
    const [step, setStep] = useState(0);
    const [birthday, setBirthday] = useState("");

    const [data, setData] = useState({
        fullName: "MUXAMMATOV NIZOM AHADOVICH",
        pinfl: "+998 93 436 63 31",
    })

    const isNumber = (value) => {
        return value.charCodeAt(0) >= 48 && value.charCodeAt(0) <= 57;
    }

    const isLetter = (value) => {
        return (value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122) || (value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90);
    }

    const changeNumber = (e) => {
        let value = e.target.value;
        let lastChar = value.slice(-1);
        console.log(lastChar.charCodeAt(0));
        console.log("keldi")
        if (value.length > number.length || value.length === 1) {
            if (isNumber(lastChar) || isLetter(lastChar)) {
                if (value.length === 1) {
                    if (isNumber(value)) {
                        setType(1);
                    } else if (isLetter(value)) {
                        setType(0);
                    }
                    setNumber(value.toUpperCase());
                } else {
                    if (type === 0) {
                        if (value.length <= 10)
                            if ((value.length === 2 && isLetter(lastChar)) || (value.length > 2 && isNumber(lastChar))) {
                                if (number.length === 2) {
                                    setNumber(number + " " + lastChar);
                                } else
                                    setNumber(value.toUpperCase());
                            }
                    } else {
                        if (!isLetter(lastChar) && value.length <= 14) {
                            setNumber(value);
                        }
                    }
                }
            }
        } else
            setNumber(value);
    }

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 576px)'
    })

    const submitForm = async (e, error, values) => {
        setStep(step + 1);
    }

    return (
        isDesktopOrLaptop ?
            <div className="">
                <h3 className="text-center my-5">Это функция пока что не доступно для этого устройство</h3>
            </div> :
            <div>
                {/*{step === 0 ?*/}
                {/*    "Заполните данные" :*/}
                {/*    step === 1 ?*/}
                {/*        "Подтвердите данные" :*/}
                {/*        step === 2 ?*/}
                {/*            "Подтвердите заказ" : ""*/}
                {/*}*/}
                {step === 3 ?
                    <div
                        className="congratulations d-flex align-items-center vh-100 justify-content-center position-relative">
                        <div>
                            <div className="text-center">
                                <img src="/images/check.svg" alt="check.svg"/>
                                <h4 className="font-roboto-bold">Congratulations!</h4>
                                <p className="info">Your application is under process, we will notify you after you get
                                    approved</p>
                                <h5 className="font-roboto-medium">Current Credit Option</h5>
                            </div>
                            <div className="credit-info">
                                <h6 className="font-roboto-medium">UZS 41,666.66 x <span
                                    className="font-roboto-regular">12 months</span></h6>
                                <p className="credit-info-percent">26% interest fee</p>
                            </div>
                            <p className="terms-zoodpay">
                                By continuing, you agree with ZoodPay’s <a href="#">Terms of Use</a> and <a
                                href="#">Privacy Policy</a>
                            </p>
                        </div>
                        <button type="button" className="btn-block font-roboto-medium">Continue</button>
                    </div> :
                    step === 2 ?
                        <>
                            <div className="loader-wrap d-flex align-items-center justify-content-center vh-100">
                                <div className="text-center">
                                    <h3 className="font-roboto-bold">We are reviewing your application...</h3>
                                    <h1 className="font-roboto-medium" onClick={() => setStep(step + 1)}>15:00</h1>
                                    <p>Final desicion will be maked after 15 minutes</p>
                                </div>
                            </div>
                        </> :
                        <>
                            <div className="header">
                                <h6 className="text-center font-roboto-medium">Personal Information</h6>
                                <a href="#"><span className="icon icon-arrow-left"/></a>
                            </div>
                            <AvForm onSubmit={submitForm} className="parent">

                                <div className="wrap">
                                    <div className="content text-center">
                                        <img src="/images/logo.svg" alt="logo.svg"/>
                                        <h4 className="font-roboto-medium">{step === 0 ?
                                            "Fill in personal information" :
                                            step === 1 ?
                                                "Personal info confirmation" : ""
                                        }</h4>
                                    </div>
                                    {step === 0 ?
                                        <>
                                            <div className="form-group">
                                                <label htmlFor="seria">Passport series / PNFIL*</label>
                                                <input autoComplete="off" type="text" id="seria" value={number}
                                                       className="form-control" onChange={changeNumber}/>
                                            </div>
                                            <AvField type="date" onChange={(e) => setBirthday(e.target.value)}
                                                     name="birthday"
                                                     label="Дата рождения" placeholder="nizom"/>
                                            {/*<button type="button" className="btn btn-warning"*/}
                                            {/*        onClick={() => setStep(1)}>Подтвердить*/}
                                            {/*</button>*/}
                                        </>

                                        :
                                        step === 1 ?
                                            <>
                                                <AvField name="fullName" type="text" label="Full Name" disabled
                                                         value={data.fullName}/>

                                                <AvField name="seria" label="Passport series / PNFIL*" type="text"
                                                         value={number}
                                                         disabled/>

                                                <AvField name="pinfl" type="text" label="Number" disabled
                                                         value={data.pinfl}/>

                                                <AvField name="birthday" type="date" label="Date of Birth*"
                                                         value={birthday}
                                                         disabled/>
                                                {/*<button type="button" className="btn btn-warning"*/}
                                                {/*        onClick={() => setStep(step + 1)}>Подтвердить*/}
                                                {/*</button>*/}
                                            </>

                                            :
                                            step === 2 ?
                                                <>
                                                    <div className="credit-info">
                                                        <div
                                                            className="d-flex justify-content-between align-items-center ">
                                                            <div>
                                                                <h5 className="mb-0">Название товара:</h5>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0">iPhone 12 Pro Max</p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-between align-items-center ">
                                                            <div>
                                                                <h5 className="mb-0">Цена товара:</h5>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0">12 340 000 сум</p>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="d-flex justify-content-between align-items-center ">
                                                            <div>
                                                                <h5 className="mb-0">Срок рассрочки:</h5>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0">12 месяц</p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-between align-items-center ">
                                                            <div>
                                                                <h5 className="mb-0">Годовая процентная ставка:</h5>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0">17%</p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-between align-items-center ">
                                                            <div>
                                                                <h5 className="mb-0">Оплата каждый месяц:</h5>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0">2 000 000 сум</p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-between align-items-center ">
                                                            <div>
                                                                <h5 className="mb-0">Оплата каждый месяц за
                                                                    проценты:</h5>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0">243 000 сум</p>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="d-flex justify-content-between align-items-center ">
                                                            <div>
                                                                <h5 className="mb-0 text-success">Общая сумма:</h5>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 text-success">16 760 000 сум</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*<button type="button" className="btn btn-warning">Подтвердить</button>*/}
                                                </> : ""
                                    }

                                    <div className="terms">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="font-roboto-medium mb-0">Terms of use</p>
                                            <span className={`icon icon-${isOpen ? "minus" : "plus"}`}
                                                  onClick={() => setIsOpen(!isOpen)}/>
                                        </div>
                                        <Collapse isOpen={isOpen} className="text">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores,
                                                provident!
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus error
                                                est
                                                excepturi harum laudantium, rem!
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet.
                                            </p>
                                        </Collapse>
                                    </div>


                                </div>
                                <div className="footer">
                                    <p>
                                        By continuing, <a href="#" className="font-roboto-medium">Agreement
                                        terms</a> and <a
                                        href="#" className="font-roboto-medium">Privacy Policy</a>.
                                        Provided information is filled out correctly.
                                    </p>
                                    <button type="button" className="font-roboto-medium btn-block"
                                            onClick={submitForm}>Continue
                                    </button>
                                </div>
                            </AvForm>
                        </>
                }
            </div>
    )

}

export default App;
