import {Select} from 'antd'
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import axios from "axios";
import {useMediaQuery} from 'react-responsive'
import {toast, ToastContainer} from 'react-toastify';

import {useRef, useState} from 'react';
import {API_PATH} from "./tools/constants";
import {FadeLoader} from "react-spinners";

export default function Home() {
    const [state2, setState2] = useState(false)
    const [state3, setState3] = useState(false)
    const [state4, setState4] = useState(false)
    const [state5, setState5] = useState(false)
    const [state6, setState6] = useState(false)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [phoneNumber, setPhoneNumber] = useState("");
    const [status, setStatus] = useState(2)
    const [isLoading, setIsLoading] = useState(false);

    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);

    const [number, setNumber] = useState("");
    const [type, setType] = useState(0);

    const inputValue2 = useRef()

    const {Option} = Select;

    function click() {
        setStatus(5)
        setTimeout(() => {
            setLoading(!loading)
        }, 99999999999)
    }

    const changeInput = (e) => {

        if (e.target.value.length > phoneNumber.length) {
            if (phoneNumber.length === 2 || phoneNumber.length === 6 || phoneNumber.length === 9) {
                setPhoneNumber(phoneNumber + " " + e.target.value.slice(-1));
            } else {
                setPhoneNumber(e.target.value)
            }
            if (e.target.value.length === 12) {

            } else {

            }
        } else {
            setPhoneNumber(e.target.value)
        }
    }
    const isNumber = (value) => {
        return value.charCodeAt(0) >= 48 && value.charCodeAt(0) <= 57;
    }
    const isLetter = (value) => {
        return (value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122) || (value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90);
    }
    const changeNumber = (e) => {
        let value = e.target.value;
        console.log(value);
        let lastChar = value.slice(-1);
        if (value.length !== 14 && (value.length > number.length || value.length === 1)) {
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
        if (value.length === 14) {
            setType(1);
        }
    }

    const onChange = (value, name) => {
        if (name === 'day')
            setDay(value);
        else if (name === "month")
            setMonth(value);
        else if (name === "year")
            setYear(value);
    }

    const submitForm = (e) => {
        e.preventDefault();
    }

    const sendFirst = (e) => {
        e.preventDefault();


        if (day > 0 && month > 0 && year > 0 && state3) {
            setIsLoading(true);

            const DOB = "Customer.DateOfBirth=" + day + "." + month + "." + year;
            const AGREEMENT = "Customer.Agreement=true";
            let param = "";

            if (type === 0) {
                param = "Customer.PassportSerial=" + number.slice(0, 2) + "&Customer.PassportNumber=" + number.slice(3);
            } else {
                param = "Customer.PINFL=" + number;
            }
            axios.post(API_PATH + "customerIdentification?" + DOB + "&" + param + "&" + AGREEMENT)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200 && res.data.fullName) {
                        setData({
                            ...res.data,
                            address2: res.data.address.slice(res.data.address.indexOf(',', res.data.address.length / 2) + 1),
                            address: res.data.address.slice(0, res.data.address.indexOf(',', res.data.address.length / 2))
                        });

                        setStatus(3);
                    } else if (res.data.message === "") {
                        toast.error("");
                    }
                })
                .catch((e) => {
                    toast.error("Пользователь с этими данными не найдено")
                })
                .finally(() => {
                    setIsLoading(false);
                })
        } else {
            toast.error("Пожалуйста, заполните все поля");
        }
    }

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 576px)'
    })

    return (
        isDesktopOrLaptop ?
            <div className="">
                <h3 className="text-center my-5">Данная функция пока недоступна для персональных компьютеров</h3>

                <div className="d-flex download justify-content-center">
                    <a href="https://play.google.com/store/apps/details?id=com.zoodel.kz" target="_blank"
                       className="download-item font-roboto-medium d-flex align-items-center" rel="noreferrer">
                        <span className="icon icon-google"/>
                        Google play
                    </a>
                    <a href="https://apps.apple.com/app/id1281450163?mt=8" target="_blank"
                       className="download-item font-roboto-medium d-flex align-items-center" rel="noreferrer">
                        <span className="icon icon-apple"/>
                        App Store
                    </a>
                </div>
            </div> :
            <div className="container">
                {
                    status === 1 ?
                        <div className="second">


                            {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
                            <a href="#" className="logo"/>

                            <form className="form" onSubmit={sendFirst}>
                                <label htmlFor="data">Введите серийный номер паспорта или ПИНФЛ:</label>
                                <input autoComplete="off" type="text" id="data" value={number}
                                       onChange={changeNumber} name="pinfl" placeholder="Введите данные"/>

                                <label htmlFor="day">Введите, дату рождения:</label>
                                <div className="select_wrap">

                                    <Select
                                        id="day"
                                        className={"firstSelect"}
                                        style={{width: 200}}
                                        placeholder="День"
                                        optionFilterProp="children"
                                        dropdownStyle={{backgroundColor: 'transparent', backdropFilter: "blur(200px)"}}
                                        dropdownClassName="dropdown"
                                        name="nizom"
                                        onClick={(e) => {
                                            document.querySelector(".firstSelect").querySelector(".ant-select-selector").style.opacity = "1"
                                        }}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        onChange={(v) => onChange(v, 'day')}
                                    >
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                        <Option value="5">5</Option>
                                        <Option value="6">6</Option>
                                        <Option value="7">7</Option>
                                        <Option value="8">8</Option>
                                        <Option value="9">9</Option>
                                        <Option value="10">10</Option>
                                        <Option value="11">11</Option>
                                        <Option value="12">12</Option>
                                        <Option value="13">13</Option>
                                        <Option value="14">14</Option>
                                        <Option value="15">15</Option>
                                        <Option value="16">16</Option>
                                        <Option value="17">17</Option>
                                        <Option value="18">18</Option>
                                        <Option value="19">19</Option>
                                        <Option value="20">20</Option>
                                        <Option value="21">21</Option>
                                        <Option value="22">22</Option>
                                        <Option value="23">23</Option>
                                        <Option value="24">24</Option>
                                        <Option value="25">25</Option>
                                        <Option value="26">26</Option>
                                        <Option value="27">27</Option>
                                        <Option value="28">28</Option>
                                        <Option value="29">29</Option>
                                        <Option value="30">30</Option>
                                        <Option value="31">31</Option>


                                    </Select>
                                    <Select
                                        className={"  secondSelect "}
                                        style={{width: 200}}
                                        placeholder="Месяц"
                                        optionFilterProp="children"
                                        onChange={(v) => onChange(v, 'month')}
                                        onClick={(e) => {
                                            document.querySelector(".secondSelect").querySelector(".ant-select-selector").style.opacity = "1"
                                        }}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        dropdownStyle={{backgroundColor: 'transparent', backdropFilter: "blur(200px)"}}
                                        dropdownClassName="dropdown"
                                    >
                                        <Option value="01">Январ</Option>
                                        <Option value="02">Феврал</Option>
                                        <Option value="03">Март</Option>
                                        <Option value="04">Апрел</Option>
                                        <Option value="05">Май</Option>
                                        <Option value="06">Июн</Option>
                                        <Option value="07">Июл</Option>
                                        <Option value="08">Август</Option>
                                        <Option value="09">Сентяб</Option>
                                        <Option value="10">Октябр</Option>
                                        <Option value="11">Ноябр</Option>


                                    </Select>
                                    <Select
                                        className={"  lastSelect "}
                                        style={{width: 200}}
                                        placeholder="Год"
                                        optionFilterProp="children"
                                        onChange={(v) => onChange(v, 'year')}
                                        dropdownStyle={{backgroundColor: 'transparent', backdropFilter: "blur(200px)"}}
                                        dropdownClassName="dropdown"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        onClick={(e) => {
                                            document.querySelector(".lastSelect").querySelector(".ant-select-selector").style.opacity = "1"
                                        }}

                                    >
                                        {Array.from({length: 112}, (v, k) => 2012 - k).map((item) => (
                                            <Option value={item}>{item}</Option>
                                        ))}
                                    </Select>
                                </div>
                                <label className="agrement">{
                                    state3 ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                  xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.6566 13.6566C16.7811 10.532 16.7811 5.46801 13.6566 2.34343C10.532 -0.781145 5.46801 -0.781145 2.34343 2.34343C-0.781145 5.46801 -0.781145 10.532 2.34343 13.6566C5.46801 16.7811 10.5353 16.7811 13.6566 13.6566ZM5.13172 6.77727L6.93072 8.57627L10.8715 4.63871L12.2657 6.03285L8.32813 9.97041L6.93072 11.3646L5.53658 9.97041L3.73758 8.17141L5.13172 6.77727Z"
                                                fill="#303493"/>
                                        </svg>
                                        : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                               xmlns="http://www.w3.org/2000/svg">
                                            <rect opacity="0.4" x="0.5" y="0.5" width="15" height="15" rx="7.5"
                                                  stroke="#818181"/>
                                        </svg>
                                }
                                    <input type="checkbox" value={state3}/>
                                    <span onClick={() => setState3(!state3)}>Продолжая, я согласшаюсь на <b>Обработку и передачу персональных данных.</b></span>
                                </label>
                                <div className="line"/>
                                <h4 className="font-roboto-semi-bold">ВАЖНО ЗНАТЬ</h4>
                                <div className="d-flex align-items-center info">
                                    <div className="circle d-flex align-items-center justify-content-center">
                                        <span className="icon icon-plus"/>
                                    </div>
                                    Кредит выдается на срок - 12 месяцев
                                </div>
                                <div className="d-flex align-items-center info">
                                    <div className="circle d-flex align-items-center justify-content-center">
                                        <span className="icon icon-plus"/>
                                    </div>
                                    Максимальная сумма кредита - 50,000,000 UZS
                                </div>
                                <div className="d-flex align-items-center info">
                                    <div className="circle d-flex align-items-center justify-content-center">
                                        <span className="icon icon-plus"/>
                                    </div>
                                    Процентная ставка - 26% годовых
                                </div>
                                <div className="next">
                                    <button className="btn_submit" disabled={isLoading}> {isLoading &&
                                    <span className="spinner-border spinner-border-sm mr-2 text-dark"/>}Продолжить
                                    </button>
                                </div>
                            </form>

                        </div> :
                        status === 2 ?
                            <div className="third">
                                {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
                                <a href="#" className="logo"/>

                                <form className="form" onSubmit={submitForm}>
                                    <label htmlFor="name">Ваше Ф.И.О:</label>
                                    <input id="name" value={data?.fullName} disabled autoComplete="off"
                                           ref={inputValue2}
                                           type="text"/>
                                    <label htmlFor="birth">Ваше место жительства :</label>
                                    <input id="birth" disabled value={data?.address} autoComplete="off" type="text"/>
                                    <input type="text" disabled value={data?.address2}/>
                                    <div className="next">

                                        {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
                                        <a href="#" className="zood_logo"/>

                                        <button className="btn_submit" onClick={() => {
                                            setStatus(3);
                                            setTimeout(() => {
                                                setStatus(4)
                                            }, 3000)
                                        }}>Да, все верно
                                        </button>
                                    </div>
                                </form>

                            </div> :
                            status === 3 ?
                                <div className="spinner">
                                    <h5>Пожалуйста подождите, <br/>
                                        проверЯЕМ ВОЗМОЖНОСТЬ <br/> ПРЕДОСТАВЛЕНИЯ КРЕДИТА.</h5>
                                    <FadeLoader
                                        color="#FEC50C"
                                        height="25"
                                        width="7"
                                        radius="40"
                                        margin="20"
                                    />
                                    <p>Желательно не закрывайте это окно или приложение.</p>
                                </div> :
                                status === 4 ?
                                    <div className="credit-card">
                                        <div className="text-center">
                                            <img src="/images/smile.svg" alt="smile.svg"/>
                                            <h4>ПОЗДРАВЛЯЕМ!</h4>
                                            <p>Осталось застраховать себя</p>
                                        </div>



                                    </div> :
                                    status === 7 ?
                                        <div className="four">
                                            {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
                                            <a href="#" className="logo"/>

                                            <form className="form" onSubmit={submitForm}>
                                                <label htmlFor="credit">Выберите тип кредита:</label>
                                                <div className="checkbox">
                                                    {
                                                        state5 ?
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M13.6566 13.6566C16.7811 10.532 16.7811 5.46801 13.6566 2.34343C10.532 -0.781145 5.46801 -0.781145 2.34343 2.34343C-0.781145 5.46801 -0.781145 10.532 2.34343 13.6566C5.46801 16.7811 10.5353 16.7811 13.6566 13.6566ZM5.13172 6.77727L6.93072 8.57627L10.8715 4.63871L12.2657 6.03285L8.32813 9.97041L6.93072 11.3646L5.53658 9.97041L3.73758 8.17141L5.13172 6.77727Z"
                                                                    fill="#303493"/>
                                                            </svg> :
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <rect opacity="0.4" x="0.5" y="0.5" width="15"
                                                                      height="15"
                                                                      rx="7.5"
                                                                      stroke="#818181"/>
                                                            </svg>

                                                    }
                                                    <div>
                                                        <label>
                                                            <input type="checkbox" value={state5}
                                                                   onChange={() => setState5(!state5)}/>
                                                            <p>350,000 UZS</p>
                                                            <span>в течении 6 месяцев</span>
                                                        </label>
                                                    </div>
                                                    <span>26% годовых</span>
                                                </div>
                                                <div className="checkbox">
                                                    {
                                                        state6 ?
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M13.6566 13.6566C16.7811 10.532 16.7811 5.46801 13.6566 2.34343C10.532 -0.781145 5.46801 -0.781145 2.34343 2.34343C-0.781145 5.46801 -0.781145 10.532 2.34343 13.6566C5.46801 16.7811 10.5353 16.7811 13.6566 13.6566ZM5.13172 6.77727L6.93072 8.57627L10.8715 4.63871L12.2657 6.03285L8.32813 9.97041L6.93072 11.3646L5.53658 9.97041L3.73758 8.17141L5.13172 6.77727Z"
                                                                    fill="#303493"/>
                                                            </svg> :
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <rect opacity="0.4" x="0.5" y="0.5" width="15"
                                                                      height="15"
                                                                      rx="7.5"
                                                                      stroke="#818181"/>
                                                            </svg>

                                                    }
                                                    <div>
                                                        <label>
                                                            <input type="checkbox" value={state6}
                                                                   onChange={() => setState6(!state6)}/>
                                                            <p>350,000 UZS</p>
                                                            <span>в течении 6 месяцев</span>
                                                        </label>
                                                    </div>
                                                    <span>26% годовых</span>
                                                </div>
                                                <div className="next">
                                                    {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
                                                    <a href="#" className="zood_logo"/>

                                                    <button className="btn_submit" onClick={click}>Далее</button>
                                                </div>
                                            </form>

                                        </div> :
                                        status === 5 ?
                                            <>
                                                <div className={`${loading ? "active" : ""}  five`}>
                                                    {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
                                                    <a href="#" className="logo"/>

                                                    {loading ?
                                                        <div className="spinner"><FadeLoader color="#FEC50C" height="25"
                                                                                             width="7"
                                                                                             radius="40"
                                                                                             margin="20"/> <p>Желательно
                                                            не
                                                            закрывайте это
                                                            окно или приложение.</p></div> :
                                                        <form className="form" onSubmit={submitForm}>
                                                            <div className="firstNumber">
                                                                <label htmlFor="phoneNumber">Введите Ваш номер
                                                                    телефона</label>
                                                                <div className="inputGroup" onFocus={(e) => {
                                                                    if (document.querySelector(".inputGroup")) {
                                                                        document.querySelector(".inputGroup").classList.add("active")
                                                                    }

                                                                }} onMouseLeave={(e) => {
                                                                    if (document.querySelector(".inputGroup")) {
                                                                        document.querySelector(".inputGroup").classList.remove("active")
                                                                    }
                                                                }}
                                                                >
                                                                    <div className="inputGroupAppend ">
                                                                        +998
                                                                    </div>
                                                                    <input type="text" id="phoneNumber" maxLength="12"
                                                                           pattern="[0-9]+"
                                                                           autoComplete="off"
                                                                           placeholder="-- --- -- --"
                                                                           value={phoneNumber}
                                                                           onChange={changeInput}
                                                                           className="phoneInput "/>
                                                                </div>
                                                            </div>
                                                            <div className="codes">
                                                                <label htmlFor="num">Введите код из SMS</label>
                                                                <div>
                                                                    <input id="num" type="text" maxLength="1"
                                                                           pattern="[0-9]+"/>
                                                                    <input type="text" maxLength="1" pattern="[0-9]+"/>
                                                                    <input type="text" maxLength="1" pattern="[0-9]+"/>
                                                                    <input type="text" maxLength="1" pattern="[0-9]+"/>
                                                                    <input type="text" maxLength="1" pattern="[0-9]+"/>
                                                                </div>
                                                            </div>
                                                            <label className="agrement">{
                                                                state2 ?
                                                                    <svg width="16" height="16" viewBox="0 0 16 16"
                                                                         fill="none"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M13.6566 13.6566C16.7811 10.532 16.7811 5.46801 13.6566 2.34343C10.532 -0.781145 5.46801 -0.781145 2.34343 2.34343C-0.781145 5.46801 -0.781145 10.532 2.34343 13.6566C5.46801 16.7811 10.5353 16.7811 13.6566 13.6566ZM5.13172 6.77727L6.93072 8.57627L10.8715 4.63871L12.2657 6.03285L8.32813 9.97041L6.93072 11.3646L5.53658 9.97041L3.73758 8.17141L5.13172 6.77727Z"
                                                                            fill="#303493"/>
                                                                    </svg> :
                                                                    <svg width="16" height="16" viewBox="0 0 16 16"
                                                                         fill="none"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <rect opacity="0.4" x="0.5" y="0.5" width="15"
                                                                              height="15"
                                                                              rx="7.5"
                                                                              stroke="#818181"/>
                                                                    </svg>

                                                            }
                                                                <input type="checkbox" value={state2}/>
                                                                <p><span
                                                                    onClick={() => setState2(!state2)}>Продолжая, я принимаю</span> Условия
                                                                    пользования и согласен с Договором оферты.</p>
                                                            </label>
                                                            <label className="agrement">{
                                                                state4 ?
                                                                    <svg width="16" height="16" viewBox="0 0 16 16"
                                                                         fill="none"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M13.6566 13.6566C16.7811 10.532 16.7811 5.46801 13.6566 2.34343C10.532 -0.781145 5.46801 -0.781145 2.34343 2.34343C-0.781145 5.46801 -0.781145 10.532 2.34343 13.6566C5.46801 16.7811 10.5353 16.7811 13.6566 13.6566ZM5.13172 6.77727L6.93072 8.57627L10.8715 4.63871L12.2657 6.03285L8.32813 9.97041L6.93072 11.3646L5.53658 9.97041L3.73758 8.17141L5.13172 6.77727Z"
                                                                            fill="#303493"/>
                                                                    </svg> :
                                                                    <svg width="16" height="16" viewBox="0 0 16 16"
                                                                         fill="none"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <rect opacity="0.4" x="0.5" y="0.5" width="15"
                                                                              height="15"
                                                                              rx="7.5"
                                                                              stroke="#818181"/>
                                                                    </svg>

                                                            }
                                                                <input type="checkbox" value={state4}/>
                                                                <p><span
                                                                    onClick={() => setState4(!state4)}>Продолжая, я согласен с</span> Кредитным
                                                                    договором и даю согласие на перевод средств в
                                                                    компанию
                                                                    поставщика
                                                                    услуг..
                                                                </p>
                                                            </label>
                                                            <div className="next">
                                                                {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
                                                                <a href="#" className="zood_logo"/>

                                                                <button className="btn_submit"
                                                                        onClick={() => setStatus(6)}>Далее
                                                                </button>
                                                            </div>
                                                        </form>}


                                                </div>
                                            </> :
                                            <div className="last">
                                                <div>
                                                    <svg width="49" height="48" viewBox="0 0 49 48" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M24.4999 0C11.2664 0 0.5 10.7664 0.5 24.0001C0.5 37.2337 11.2664 48 24.4999 48C37.7335 48 48.4999 37.2336 48.4999 24.0001C48.4999 10.7665 37.7336 0 24.4999 0ZM24.4999 44.4851C13.2045 44.4851 4.01495 35.2955 4.01495 24.0001C4.01495 12.7047 13.2045 3.51506 24.4999 3.51506C35.7953 3.51506 44.9849 12.7047 44.9849 24.0001C44.9849 35.2955 35.7955 44.4851 24.4999 44.4851Z"
                                                            fill="#00AD27"/>
                                                        <path
                                                            d="M34.981 28.4633C34.2443 27.8314 33.1347 27.9162 32.5029 28.6531C30.4961 30.9926 27.5791 32.3345 24.4999 32.3345C21.4209 32.3345 18.504 30.9927 16.4972 28.6532C15.8652 27.9165 14.7558 27.8316 14.019 28.4635C13.2823 29.0955 13.1974 30.205 13.8293 30.9417C16.5047 34.0606 20.3941 35.8495 24.5 35.8495C28.6061 35.8495 32.4955 34.0606 35.1708 30.9414C35.8027 30.2048 35.7177 29.0952 34.981 28.4633Z"
                                                            fill="#00AD27"/>
                                                        <path
                                                            d="M14.7432 21.2358C15.7138 21.2358 16.5007 20.4489 16.5007 19.4783C16.5007 18.9149 16.9591 18.4564 17.5226 18.4564C18.086 18.4564 18.5445 18.9149 18.5445 19.4783C18.5445 20.4489 19.3314 21.2358 20.302 21.2358C21.2726 21.2358 22.0594 20.4489 22.0594 19.4783C22.0594 16.9767 20.0242 14.9415 17.5226 14.9415C15.021 14.9415 12.9857 16.9767 12.9857 19.4783C12.9857 20.449 13.7726 21.2358 14.7432 21.2358Z"
                                                            fill="#00AD27"/>
                                                        <path
                                                            d="M31.4774 14.9416C28.9758 14.9416 26.9406 16.9769 26.9406 19.4785C26.9406 20.449 27.7274 21.2359 28.698 21.2359C29.6686 21.2359 30.4555 20.449 30.4555 19.4785C30.4555 18.915 30.914 18.4565 31.4774 18.4565C32.0409 18.4565 32.4993 18.915 32.4993 19.4785C32.4993 20.449 33.2862 21.2359 34.2568 21.2359C35.2274 21.2359 36.0143 20.449 36.0143 19.4785C36.0143 16.9767 33.979 14.9416 31.4774 14.9416Z"
                                                            fill="#00AD27"/>
                                                    </svg>
                                                    <p><span>ПОЗДРАВЛЯЕМ!</span>
                                                        ВЫ получили кредит и оплатили товар</p>
                                                </div>

                                                <div>

                                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                    <a href="#">Посмотреть график выплат</a>

                                                    <button className="btn_submit" type="button"
                                                            onClick={() => setStatus(1)}>Ваши
                                                        заказы
                                                    </button>
                                                </div>
                                            </div>
                }

                <ToastContainer/>
            </div>
    )
}
