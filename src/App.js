import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useEffect, useState} from "react";
import {AvField, AvForm} from "availity-reactstrap-validation";

function App() {
    const [isOpen, setIsOpen] = useState(true);
    const [number, setNumber] = useState("");
    const [type, setType] = useState(0);
    const [step, setStep] = useState(0);
    const [birthday, setBirthday] = useState("");

    const [data, setData] = useState({
        fullName: "MUXAMMATOV NIZOM AHADOVICH",
        pinfl: "14556898756412",
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

    return (
        <div>
            <Modal isOpen={isOpen} size="lg">
                <ModalHeader className="justify-content-center">
                    {step === 0 ?
                        "Заполните данные" :
                        step === 1 ?
                            "Подтвердите данные" :
                            step === 2 ?
                                "Подтвердите заказ": ""
                    }
                </ModalHeader>
                {step === 0 ?
                    <AvForm>
                        <ModalBody>
                            <div className="form-group">
                                <label htmlFor="seria">Серия и номер папорта или ПИНФЛ</label>
                                <input autoComplete="off" type="text" id="seria" value={number}
                                       className="form-control" onChange={changeNumber}/>
                            </div>
                            <AvField type="date" onChange={(e) => setBirthday(e.target.value)} name="birthday"
                                     label="Дата рождения"/>
                        </ModalBody>
                        <ModalFooter>
                            <button type="button" className="btn btn-warning"
                                    onClick={() => setStep(1)}>Подтвердить
                            </button>
                        </ModalFooter>
                    </AvForm> :
                    step === 1 ?
                        <AvForm model={data}>
                            <ModalBody>
                                <AvField name="fullName" type="text" label="Ф.И.О" disabled/>

                                <AvField name="seria" type="text" value={number} disabled/>

                                <AvField name="pinfl" type="number" disabled/>

                                <AvField name="birthday" type="date" value={birthday} disabled/>
                            </ModalBody>
                            <ModalFooter>
                                <button type="button" className="btn btn-warning"
                                        onClick={() => setStep(step + 1)}>Подтвердить
                                </button>
                            </ModalFooter>
                        </AvForm> :
                        step === 2 ?
                            <>
                                <ModalBody>
                                    <div className="credit-info">
                                        <div className="d-flex justify-content-between align-items-center ">
                                            <div>
                                                <h5 className="mb-0">Название товара:</h5>
                                            </div>
                                            <div>
                                                <p className="mb-0">iPhone 12 Pro Max</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center ">
                                            <div>
                                                <h5 className="mb-0">Цена товара:</h5>
                                            </div>
                                            <div>
                                                <p className="mb-0">12 340 000 сум</p>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center ">
                                            <div>
                                                <h5 className="mb-0">Срок рассрочки:</h5>
                                            </div>
                                            <div>
                                                <p className="mb-0">12 месяц</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center ">
                                            <div>
                                                <h5 className="mb-0">Годовая процентная ставка:</h5>
                                            </div>
                                            <div>
                                                <p className="mb-0">17%</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center ">
                                            <div>
                                                <h5 className="mb-0">Оплата каждый месяц:</h5>
                                            </div>
                                            <div>
                                                <p className="mb-0">2 000 000 сум</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center ">
                                            <div>
                                                <h5 className="mb-0">Оплата каждый месяц за проценты:</h5>
                                            </div>
                                            <div>
                                                <p className="mb-0">243 000 сум</p>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center ">
                                            <div>
                                                <h5 className="mb-0 text-success">Общая сумма:</h5>
                                            </div>
                                            <div>
                                                <p className="mb-0 text-success">16 760 000 сум</p>
                                            </div>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <button type="button" className="btn btn-warning">Подтвердить</button>
                                </ModalFooter>
                            </> : ""
                }
            </Modal>
        </div>
    );
}

export default App;
