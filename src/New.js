import { Select } from 'antd'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import axios from "axios";
import { useMediaQuery } from 'react-responsive'
import { toast, ToastContainer } from 'react-toastify';

import { useEffect, useRef, useState } from 'react';
import { API_PATH } from "./tools/constants";
import { FadeLoader } from "react-spinners";
import * as https from "https";
import InputMask from 'react-input-mask';

export default function Home(props) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const [state2, setState2] = useState(false)
    const [state3, setState3] = useState(false)
    const [state4, setState4] = useState(false)
    const [state5, setState5] = useState(false)
    const [showCvc, setShowCvc] = useState(false)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [phoneNumber, setPhoneNumber] = useState("");
    const [status, setStatus] = useState(3)
    const [isLoading, setIsLoading] = useState(false);


    const [checkbox, setCheckbox] = useState(0)
    const [checkbox2, setCheckbox2] = useState(false)
    const [codes,setCodes] = useState(false)
    const [codes2,setCodes2] = useState(false)

    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);

    const [number, setNumber] = useState("");
    const [type, setType] = useState(0);

    const inputValue2 = useRef()

    const { Option } = Select;

    // function click() {
    //     setStatus(5)
    //     setTimeout(() => {
    //         setLoading(!loading)
    //     }, 50000000)
    // }

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

            // const DOB = "Customer.DateOfBirth=" + day + "." + month + "." + year;
            // const AGREEMENT = "Customer.Agreement=true";
            // let param = "";

            // if (type === 0) {
            //     param = "Customer.PassportSerial=" + number.slice(0, 2) + "&Customer.PassportNumber=" + number.slice(3);
            // } else {
            //     param = "Customer.PINFL=" + number;
            // }
            axios.post(API_PATH + "scoring/customerIdentification", {
                customer: type === 0 ? {
                    passportSerial: number.slice(0, 2),
                    passportNumber: number.slice(3),
                    agreement: true,
                    dateOfBirth: day + "." + month + "." + year
                } : {
                    pinfl: number,
                    agreement: true,
                    dateOfBirth: day + "." + month + "." + year
                },
                userId: props.match.params.userId,
                transactionId: props.match.params.transactionId
            }, {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            })
                .then((res) => {
                    if (res.status === 200 && res.data.fullName) {
                        setData({
                            ...res.data,
                            address2: res.data.address.indexOf(',') > 0 ? res.data.address.slice(res.data.address.indexOf(',', res.data.address.length / 2) + 1) : "",
                            address: res.data.address.indexOf(',') > 0 ? res.data.address.slice(0, res.data.address.indexOf(',', res.data.address.length / 2)) : res.data.address
                        });

                        setStatus(3);
                    } else if (res.data.message === "Customer Not Found") {
                        toast.error("???????????????????????? ?? ?????????? ?????????????? ???? ????????????");
                    }
                })
                .catch((e) => {
                    toast.error("???????????????????????? ?? ?????????? ?????????????? ???? ????????????")
                })
                .finally(() => {
                    setIsLoading(false);
                })
        } else {
            toast.error("????????????????????, ?????????????????? ?????? ????????");
        }
    }

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 576px)'
    })

    const changeCard = (e) => {
            setShowCvc(e.target.value.startsWith("5189"));
    }

    return (
        isDesktopOrLaptop ?
            <div className="">
                <h3 className="text-center my-5">???????????? ?????????????? ???????? ???????????????????? ?????? ???????????????????????? ??????????????????????</h3>

                <div className="d-flex download justify-content-center">
                    <a href="https://play.google.com/store/apps/details?id=com.zoodel.kz" target="_blank"
                        className="download-item font-roboto-medium d-flex align-items-center" rel="noreferrer">
                        <span className="icon icon-google" />
                        Google play
                    </a>
                    <a href="https://apps.apple.com/app/id1281450163?mt=8" target="_blank"
                        className="download-item font-roboto-medium d-flex align-items-center" rel="noreferrer">
                        <span className="icon icon-apple" />
                        App Store
                    </a>
                </div>
            </div> :
            <div className="container">
                {
                    status === 1 ?
                        <div className="second">


                            {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
                            <a href="#" className="logo" />

                            <form className="form" onSubmit={sendFirst}>
                                <h2 className="font-roboto-semi-bold title">?????????????????? ???????????????????????? ????????????</h2>
                                <label htmlFor="data" className="">?????????????? ???????????????? ?????????? ???????????????? ?????? ??????????:</label>
                                <input autoComplete="off" type="text" id="data" value={number}
                                    onChange={changeNumber} name="pinfl" placeholder="?????????????? ????????????" />

                                <label htmlFor="day">??????????????, ???????? ????????????????:</label>
                                <div className="select_wrap">

                                    <Select
                                        id="day"
                                        className={"firstSelect"}
                                        style={{ width: 200 }}
                                        placeholder="????????"
                                        optionFilterProp="children"
                                        dropdownStyle={{ backgroundColor: 'transparent', backdropFilter: "blur(200px)" }}
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
                                        style={{ width: 200 }}
                                        placeholder="??????????"
                                        optionFilterProp="children"
                                        onChange={(v) => onChange(v, 'month')}
                                        onClick={(e) => {
                                            document.querySelector(".secondSelect").querySelector(".ant-select-selector").style.opacity = "1"
                                        }}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        dropdownStyle={{ backgroundColor: 'transparent', backdropFilter: "blur(200px)" }}
                                        dropdownClassName="dropdown"
                                    >
                                        <Option value="01">????????????</Option>
                                        <Option value="02">??????????????</Option>
                                        <Option value="03">????????</Option>
                                        <Option value="04">????????????</Option>
                                        <Option value="05">??????</Option>
                                        <Option value="06">????????</Option>
                                        <Option value="07">????????</Option>
                                        <Option value="08">????????????</Option>
                                        <Option value="09">??????????????</Option>
                                        <Option value="10">??????????????</Option>
                                        <Option value="11">????????????</Option>
                                        <Option value="11">??????????????</Option>


                                    </Select>
                                    <Select
                                        className={"  lastSelect "}
                                        style={{ width: 200 }}
                                        placeholder="??????"
                                        optionFilterProp="children"
                                        onChange={(v) => onChange(v, 'year')}
                                        dropdownStyle={{ backgroundColor: 'transparent', backdropFilter: "blur(200px)" }}
                                        dropdownClassName="dropdown"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        onClick={(e) => {
                                            document.querySelector(".lastSelect").querySelector(".ant-select-selector").style.opacity = "1"
                                        }}

                                    >
                                        {Array.from({ length: 112 }, (v, k) => 2012 - k).map((item, index) => (
                                            <Option value={item} key={index}>{item}</Option>
                                        ))}
                                    </Select>
                                </div>
                                <label className="agrement">{
                                    state3 ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" onClick={() => setState3(!state3)}>
                                        <path
                                            d="M13.6566 13.6566C16.7811 10.532 16.7811 5.46801 13.6566 2.34343C10.532 -0.781145 5.46801 -0.781145 2.34343 2.34343C-0.781145 5.46801 -0.781145 10.532 2.34343 13.6566C5.46801 16.7811 10.5353 16.7811 13.6566 13.6566ZM5.13172 6.77727L6.93072 8.57627L10.8715 4.63871L12.2657 6.03285L8.32813 9.97041L6.93072 11.3646L5.53658 9.97041L3.73758 8.17141L5.13172 6.77727Z"
                                            fill="#303493" />
                                    </svg>
                                        : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" onClick={() => setState3(!state3)}>
                                            <rect opacity="0.4" x="0.5" y="0.5" width="15" height="15" rx="7.5"
                                                stroke="#818181" />
                                        </svg>
                                }
                                    <input type="checkbox" value={state3} />
                                    <span onClick={() => setState3(!state3)}>??????????????????, ?? ?????????????????????? ???? <b>?????????????????? ?? ???????????????? ???????????????????????? ????????????.</b></span>
                                </label>
                                <h2 className="font-roboto-semi-bold title">?????????? ??????????</h2>
                                <div className="d-flex align-items-center info">
                                    <div className="circle d-flex align-items-center justify-content-center">
                                        {/*<span className="icon icon-plus" />*/}
                                    </div>
                                    ???????????? ???????????????? ???? ???????? - 12/24 ??????????????
                                </div>
                                <div className="d-flex align-items-center info">
                                    <div className="circle d-flex align-items-center justify-content-center">
                                        {/*<span className="icon icon-plus" />*/}
                                    </div>
                                    ???????????????????????? ?????????? ?????????????? - 50,000,000 UZS
                                </div>
                                <div className="d-flex align-items-center info">
                                    <div className="circle d-flex align-items-center justify-content-center">
                                        {/*<span className="icon icon-plus" />*/}
                                    </div>
                                    ???????????????????? ???????????? - 26% ??????????????
                                </div>
                                <div className="next">
                                    <button className="btn_submit" disabled={isLoading}> {isLoading &&
                                        <span className="spinner-border spinner-border-sm mr-2 text-dark" />}????????????????????
                                    </button>
                                </div>
                            </form>

                        </div> :
                        // status === 2 ?
                        //     <div className="third">
                        //         {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
                        //         <a href="#" className="logo" />
                        //
                        //         <form className="form" onSubmit={submitForm}>
                        //             <h2 className="font-roboto-semi-bold title">????????????????????????, {data?.fullName}</h2>
                        //
                        //             <label htmlFor="name">???????? ??.??.??:</label>
                        //             <input id="name" value={data?.fullName} disabled autoComplete="off"
                        //                 ref={inputValue2}
                        //                 type="text" />
                        //             <label htmlFor="birth">???????? ?????????? ???????????????????? :</label>
                        //             <input id="birth" disabled value={data?.address} autoComplete="off" type="text" />
                        //             <input type="text" disabled value={data?.address2} />
                        //             <div className="next">
                        //
                        //                 {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
                        //                 <a href="#" className="zood_logo" />
                        //
                        //                 <button className="btn_submit" onClick={() => {
                        //                     setStatus(3)
                        //                 }}>????, ?????? ??????????
                        //                 </button>
                        //             </div>
                        //         </form>
                        //
                        //     </div> :
                            status === 4 ? <>
                                <div className="inform_credit">
                                    <a href="#" className="logo" />

                                    <form className="form" >
                                        <h2 className="title">???????????????????? ?? ??????????????</h2>
                                         <div className="agree d-flex justify-content-between align-items-center"  onClick={() => setCheckbox(1)}>
                                             <div className="d-flex align-items-center" >
                                                 {checkbox === 1 ?
                                                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                         <path d="M13.6566 13.6566C16.7811 10.532 16.7811 5.46801 13.6566 2.34343C10.532 -0.781145 5.46801 -0.781145 2.34343 2.34343C-0.781145 5.46801 -0.781145 10.532 2.34343 13.6566C5.46801 16.7811 10.5353 16.7811 13.6566 13.6566ZM5.13172 6.77727L6.93072 8.57627L10.8715 4.63871L12.2657 6.03285L8.32813 9.97041L6.93072 11.3646L5.53658 9.97041L3.73758 8.17141L5.13172 6.77727Z" fill="#303493" />
                                                     </svg> : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                         <rect opacity="0.4" x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#818181" />
                                                     </svg>


                                                 } <div className="d-flex flex-column">
                                                 <p className="font-roboto-bold">150,000 UZS</p>
                                                 <span className="font-roboto-medium">?? ?????????????? 12 ??????????????</span>
                                             </div>
                                             </div>
                                             <p>26% ??????????????</p>

                                         </div>
                                        <div className="agree d-flex justify-content-between align-items-center" onClick={() => setCheckbox(2)}>
                                            <div className="d-flex align-items-center" >
                                                {checkbox === 2 ?
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.6566 13.6566C16.7811 10.532 16.7811 5.46801 13.6566 2.34343C10.532 -0.781145 5.46801 -0.781145 2.34343 2.34343C-0.781145 5.46801 -0.781145 10.532 2.34343 13.6566C5.46801 16.7811 10.5353 16.7811 13.6566 13.6566ZM5.13172 6.77727L6.93072 8.57627L10.8715 4.63871L12.2657 6.03285L8.32813 9.97041L6.93072 11.3646L5.53658 9.97041L3.73758 8.17141L5.13172 6.77727Z" fill="#303493" />
                                                    </svg> : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect opacity="0.4" x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#818181" />
                                                    </svg>


                                                } <div className="d-flex flex-column">
                                                    <p className="font-roboto-bold">150,000 UZS</p>
                                                    <span className="font-roboto-medium">?? ?????????????? 12 ??????????????</span>
                                                </div>
                                                </div>
                                                <p>26% ??????????????</p>

                                        </div>

                                        <h2 className="title">???????? ???????????? ??????????????</h2>
                                        <label htmlFor="day">???????????????? ???????? ???????????? ??????????????</label>
                                        <Select
                                            id="day"
                                            className={"firstSelect"}
                                            style={{ width: 200 }}
                                            placeholder="25 ?????????? ?????????????? ????????????"
                                            optionFilterProp="children"
                                            dropdownStyle={{ backgroundColor: 'transparent', backdropFilter: "blur(200px)" }}
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
                                            <Option value="1">1 ?????????? ?????????????? ????????????</Option>
                                            <Option value="2">2 ?????????? ?????????????? ????????????</Option>
                                            <Option value="3">3 ?????????? ?????????????? ????????????</Option>
                                            <Option value="4">4 ?????????? ?????????????? ????????????</Option>
                                            <Option value="5">5 ?????????? ?????????????? ????????????</Option>
                                            <Option value="6">6 ?????????? ?????????????? ????????????</Option>
                                            <Option value="7">7 ?????????? ?????????????? ????????????</Option>
                                            <Option value="8">8 ?????????? ?????????????? ????????????</Option>
                                            <Option value="9">9 ?????????? ?????????????? ????????????</Option>
                                            <Option value="10">10 ?????????? ?????????????? ????????????</Option>
                                            <Option value="11">11 ?????????? ?????????????? ????????????</Option>
                                            <Option value="12">12 ?????????? ?????????????? ????????????</Option>
                                            <Option value="13">13 ?????????? ?????????????? ????????????</Option>
                                            <Option value="14">14 ?????????? ?????????????? ????????????</Option>
                                            <Option value="15">15 ?????????? ?????????????? ????????????</Option>
                                            <Option value="16">16 ?????????? ?????????????? ????????????</Option>
                                            <Option value="17">17 ?????????? ?????????????? ????????????</Option>
                                            <Option value="18">18 ?????????? ?????????????? ????????????</Option>
                                            <Option value="19">19 ?????????? ?????????????? ????????????</Option>
                                            <Option value="20">20 ?????????? ?????????????? ????????????</Option>
                                            <Option value="21">21 ?????????? ?????????????? ????????????</Option>
                                            <Option value="22">22 ?????????? ?????????????? ????????????</Option>
                                            <Option value="23">23 ?????????? ?????????????? ????????????</Option>
                                            <Option value="24">24 ?????????? ?????????????? ????????????</Option>
                                            <Option value="25">25 ?????????? ?????????????? ????????????</Option>
                                        </Select>

                                        <div className="next">

                                            <a href="#" className="zood_logo" />

                                            <button className="btn_submit" onClick={() => {
                                                 setStatus(5)
                                                 setTimeout(() => {
                                                     setStatus(6)
                                                 }, 5000);
                                            }}>????????????????????
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            </> :
                                status === 3 ? <>
                                    <div className="preson_data">
                                        <a href="#" className="logo" />
                                        <form className="form" onSubmit={(e) => {
                                            e.preventDefault();
                                            setStatus(4)

                                        }}>
                                              <h2 className="font-roboto-semi-bold title">????????????????????????, {data?.fullName}</h2>

                                              <label htmlFor="inn">?????? ?????????? ????????????:</label>
                                            {/*<input placeholder="?????????????? ????????????"  id="inn" autoComplete="off"*/}
                                            {/*    type="number" required min="100000000" max="999999999" maxLength="9"/>*/}
                                            <InputMask  mask="999999999"
                                                        placeholder="?????????????? ????????????" required  id="inn" />
                                            <label htmlFor="place">???????????????? ??????????????????????:</label>
                                            <input id="place" placeholder="?????????????? ????????????" autoComplete="off" type="text" />
                                            {/*<label htmlFor="oklad">?????? ??????????:</label>*/}
                                            {/*<input id="oklad" type="text" className="mb-0" placeholder="?????????????? ????????????" />*/}
                                            <div className="next">

                                                <a href="#" className="zood_logo" />

                                                <button className="btn_submit" >????????????????????</button>
                                            </div>
                                        </form>
                                    </div>
                                </> :
                                    status === 5 ?
                                        <div className="spinner">
                                            <a href="#" className="logo" />


                                            <h5 className="text-center">???????????????????? ??????????????????,
                                                ?????????????????? ?????????????????????? ???????????????????????????? ??????????????.</h5>
                                            <div className="loader">
                                                <FadeLoader
                                                    color="#FEC50C"
                                                    height="25"
                                                    width="7"
                                                    radius="40"
                                                    margin="20"

                                                />
                                            </div>
                                            <p className="text-center">???????????????????? ???? ???????????????????? ?????? ???????? ?????? ????????????????????.</p>
                                        </div> :
                                        status === 6 ?
                                            <div className="credit-card">
                                                <div>
                                                    <div className="text-center">
                                                        <span className="icon icon-secure"/>
                                                    </div>
                                                    <h2 className="font-roboto-semi-bold title">???????????????????? ???????????????? ??????????????????????</h2>

                                                    <p>?????????? ????????????</p>
                                                    <h4>2 536 000 UZS</h4>


                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="images text-right">
                                                                <img src="/images/mastercard.png" alt="mastercard.png" />
                                                                <img src="/images/uzcard.png" alt="mastercard.png" />
                                                                <img src="/images/humo.png" alt="mastercard.png" />
                                                            </div>

                                                            <InputMask  mask="9999 9999 9999 9999" onChange={(e) => changeCard(e)} className="form-control shadow-none"
                                                                        placeholder="?????????? ??????????" />
                                                            <div className="select_wrap justify-content-start">
                                                                <Select
                                                                    className="card_number"
                                                                    placeholder="??????????"
                                                                    optionFilterProp="children"
                                                                    onChange={(v) => onChange(v, 'month')}

                                                                    filterOption={(input, option) =>
                                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                    }
                                                                    dropdownStyle={{
                                                                        backgroundColor: 'transparent',
                                                                        backdropFilter: "blur(200px)"
                                                                    }}
                                                                    dropdownClassName="dropdown"
                                                                >
                                                                    <Option value="01">????????????</Option>
                                                                    <Option value="02">??????????????</Option>
                                                                    <Option value="03">????????</Option>
                                                                    <Option value="04">????????????</Option>
                                                                    <Option value="05">??????</Option>
                                                                    <Option value="06">????????</Option>
                                                                    <Option value="07">????????</Option>
                                                                    <Option value="08">????????????</Option>
                                                                    <Option value="09">??????????????</Option>
                                                                    <Option value="10">??????????????</Option>
                                                                    <Option value="11">????????????</Option>
                                                                    <Option value="11">??????????????</Option>


                                                                </Select>
                                                                <Select
                                                                    className="select w-auto"
                                                                    placeholder="??????"
                                                                    optionFilterProp="children"
                                                                    onChange={(v) => onChange(v, 'year')}
                                                                    dropdownStyle={{
                                                                        backgroundColor: 'transparent',
                                                                        backdropFilter: "blur(200px)"
                                                                    }}
                                                                    dropdownClassName="dropdown"
                                                                    filterOption={(input, option) =>
                                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                    }
                                                                >
                                                                    {Array.from({ length: 112 }, (v, k) => 2012 - k).map((item, index) => (
                                                                        <Option value={item} key={index}>{item}</Option>
                                                                    ))}
                                                                </Select>
                                                                {showCvc ?
                                                                    <InputMask  mask="999"  className="form-control shadow-none h-auto"
                                                                                placeholder="CVC"  /> :
                                                                    <div/>
                                                                }

                                                            </div>
                                                        </div>

                                                    </div>
                                                     {codes && <div className="codes">
                                                        <label htmlFor="num">?????????????? ?????? ???? SMS</label>
                                                        <div>
                                                            <input id="num" type="text" maxLength="1"
                                                                pattern="[0-9]+" />
                                                            <input type="text" maxLength="1" pattern="[0-9]+" />
                                                            <input type="text" maxLength="1" pattern="[0-9]+" />
                                                            <input type="text" maxLength="1" pattern="[0-9]+" />
                                                            {/*<input type="text" maxLength="1" pattern="[0-9]+" />*/}
                                                        </div>
                                                    </div>}
                                                    <label className="agrement">{
                                                        state3 ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M13.6566 13.6566C16.7811 10.532 16.7811 5.46801 13.6566 2.34343C10.532 -0.781145 5.46801 -0.781145 2.34343 2.34343C-0.781145 5.46801 -0.781145 10.532 2.34343 13.6566C5.46801 16.7811 10.5353 16.7811 13.6566 13.6566ZM5.13172 6.77727L6.93072 8.57627L10.8715 4.63871L12.2657 6.03285L8.32813 9.97041L6.93072 11.3646L5.53658 9.97041L3.73758 8.17141L5.13172 6.77727Z"
                                                                fill="#303493" />
                                                        </svg>
                                                            : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <rect opacity="0.4" x="0.5" y="0.5" width="15" height="15" rx="7.5"
                                                                    stroke="#818181" />
                                                            </svg>
                                                    }
                                                        <input type="checkbox" value={state3} />
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                        <span onClick={() => setState3(!state3)}>??????????????????, ?? ???????????????? <a
                                                            href="#">?????????????? ?????????????????????? ?? ???????????????? ?? ?????????????????? ????????????</a>.</span>
                                                    </label>

                                                    <label className="agrement mb">{
                                                        state3 ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M13.6566 13.6566C16.7811 10.532 16.7811 5.46801 13.6566 2.34343C10.532 -0.781145 5.46801 -0.781145 2.34343 2.34343C-0.781145 5.46801 -0.781145 10.532 2.34343 13.6566C5.46801 16.7811 10.5353 16.7811 13.6566 13.6566ZM5.13172 6.77727L6.93072 8.57627L10.8715 4.63871L12.2657 6.03285L8.32813 9.97041L6.93072 11.3646L5.53658 9.97041L3.73758 8.17141L5.13172 6.77727Z"
                                                                fill="#303493" />
                                                        </svg>
                                                            : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <rect opacity="0.4" x="0.5" y="0.5" width="15" height="15" rx="7.5"
                                                                    stroke="#818181" />
                                                            </svg>
                                                    }
                                                        <input type="checkbox" value={state3} />
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                        <span onClick={() => setState3(!state3)}>??????????????????, ?? ???????????????? ?? <a
                                                            href="#">?????????????????? ?????????????????? ?? ?????? ???????????????? ???? ?????????????? ?????????????? ?? ???????????????? ???????????????????? ??????????</a>. </span>
                                                    </label>
                                                </div>

                                                <button className="btn_submit" onClick={() => {
                                                    if (codes) {
                                                        setStatus(7)
                                                    }else {
                                                        setCodes(true)
                                                    }
                                                }}>{!codes ? '??????????????????????' : "????????????????"}</button>

                                            </div> :
                                                status === 7 ?
                                                    <>
                                                        <div className="five">
                                                            {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
                                                            <a href="#" className="logo" />


                                                            <form className="form" onSubmit={submitForm}>
                                                                <h2 className="font-roboto-semi-bold title">???????????????? ???????????????? ????????????</h2>

                                                                <div className="firstNumber">
                                                                    <label htmlFor="phoneNumber">?????????????? ?????? ??????????
                                                                        ????????????????</label>
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
                                                                            className="phoneInput " />
                                                                    </div>
                                                                </div>
                                                                {
                                                                    codes2 &&  <div className="codes">
                                                                    <label htmlFor="num">?????????????? ?????? ???? SMS</label>
                                                                    <div>
                                                                        <input id="num" type="text" maxLength="1"
                                                                            pattern="[0-9]+" />
                                                                        <input type="text" maxLength="1" pattern="[0-9]+" />
                                                                        <input type="text" maxLength="1" pattern="[0-9]+" />
                                                                        <input type="text" maxLength="1" pattern="[0-9]+" />
                                                                        {/*<input type="text" maxLength="1" pattern="[0-9]+" />*/}
                                                                    </div>
                                                                </div>
                                                                }
                                                                <label className="agrement">{
                                                                    state2 ?
                                                                        <svg width="16" height="16" viewBox="0 0 16 16"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M13.6566 13.6566C16.7811 10.532 16.7811 5.46801 13.6566 2.34343C10.532 -0.781145 5.46801 -0.781145 2.34343 2.34343C-0.781145 5.46801 -0.781145 10.532 2.34343 13.6566C5.46801 16.7811 10.5353 16.7811 13.6566 13.6566ZM5.13172 6.77727L6.93072 8.57627L10.8715 4.63871L12.2657 6.03285L8.32813 9.97041L6.93072 11.3646L5.53658 9.97041L3.73758 8.17141L5.13172 6.77727Z"
                                                                                fill="#303493" />
                                                                        </svg> :
                                                                        <svg width="16" height="16" viewBox="0 0 16 16"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <rect opacity="0.4" x="0.5" y="0.5" width="15"
                                                                                height="15"
                                                                                rx="7.5"
                                                                                stroke="#818181" />
                                                                        </svg>

                                                                }
                                                                    <input type="checkbox" value={state2} />
                                                                    <p><span
                                                                        onClick={() => setState2(!state2)}>??????????????????, ?? ????????????????</span> ??????????????
                                                                        ?????????????????????? ?? ???????????????? ?? ?????????????????? ????????????.</p>
                                                                </label>
                                                                <label className="agrement">{
                                                                    state4 ?
                                                                        <svg width="16" height="16" viewBox="0 0 16 16"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M13.6566 13.6566C16.7811 10.532 16.7811 5.46801 13.6566 2.34343C10.532 -0.781145 5.46801 -0.781145 2.34343 2.34343C-0.781145 5.46801 -0.781145 10.532 2.34343 13.6566C5.46801 16.7811 10.5353 16.7811 13.6566 13.6566ZM5.13172 6.77727L6.93072 8.57627L10.8715 4.63871L12.2657 6.03285L8.32813 9.97041L6.93072 11.3646L5.53658 9.97041L3.73758 8.17141L5.13172 6.77727Z"
                                                                                fill="#303493" />
                                                                        </svg> :
                                                                        <svg width="16" height="16" viewBox="0 0 16 16"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <rect opacity="0.4" x="0.5" y="0.5" width="15"
                                                                                height="15"
                                                                                rx="7.5"
                                                                                stroke="#818181" />
                                                                        </svg>

                                                                }
                                                                    <input type="checkbox" value={state4} />
                                                                    <p><span
                                                                        onClick={() => setState4(!state4)}>??????????????????, ?? ???????????????? ??</span> ??????????????????
                                                                        ?????????????????? ?? ?????? ???????????????? ???? ?????????????? ?????????????? ??
                                                                        ????????????????
                                                                        ????????????????????
                                                                        ??????????..
                                                                    </p>
                                                                </label>
                                                                <div className="next">
                                                                    {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
                                                                    <a href="#" className="zood_logo" />

                                                                    <button className="btn_submit"
                                                                        onClick={() => {
                                                                            if (codes2) {
                                                                                setStatus(8)
                                                                            }else {
                                                                                setCodes2(true)
                                                                            }
                                                                        }}>??????????
                                                                    </button>
                                                                </div>
                                                            </form>


                                                        </div>
                                                    </> :
                                                    <div className="last">
                                                        <div>
                                                            <div className="text-center congratulations">
                                                                <img src="/images/uis_check.svg" width="32" height="32" alt=""/>
                                                            </div>
                                                            <h2 className="title"> ???????????? ?????????????? ?? ??????????????</h2>


                                                            <div className="checkbox">
                                                                {
                                                                    <svg width="16" height="16" viewBox="0 0 16 16"
                                                                         fill="none"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M13.6566 13.6566C16.7811 10.532 16.7811 5.46801 13.6566 2.34343C10.532 -0.781145 5.46801 -0.781145 2.34343 2.34343C-0.781145 5.46801 -0.781145 10.532 2.34343 13.6566C5.46801 16.7811 10.5353 16.7811 13.6566 13.6566ZM5.13172 6.77727L6.93072 8.57627L10.8715 4.63871L12.2657 6.03285L8.32813 9.97041L6.93072 11.3646L5.53658 9.97041L3.73758 8.17141L5.13172 6.77727Z"
                                                                            fill="#303493"/>
                                                                    </svg>

                                                                }
                                                                <div>
                                                                    <label>
                                                                        <input type="checkbox" className="d-none" value={state5}
                                                                            onChange={() => setState5(!state5)} />
                                                                        <p>350,000 UZS</p>
                                                                        <span>?? ?????????????? 6 ??????????????</span>
                                                                    </label>
                                                                </div>
                                                                <span>26% ??????????????</span>
                                                            </div>

                                                            <table
                                                                className="table table-striped table-borderless text-center table-sm">
                                                                <thead>
                                                                    <tr>
                                                                        <th>????????</th>
                                                                        <th>??????????</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>10 ????????????????</td>
                                                                        <td>605,000.10 UZS</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>10 ????????????????</td>
                                                                        <td>605,000.10 UZS</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>10 ????????????????</td>
                                                                        <td>605,000.10 UZS</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>10 ????????????????</td>
                                                                        <td>605,000.10 UZS</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>10 ????????????????</td>
                                                                        <td>605,000.10 UZS</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                        <div>

                                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                            <a href="#">?????????????????? ????????????</a>

                                                            <button className="btn_submit" type="button"
                                                                onClick={() => setStatus(1)}>????????
                                                                ????????????
                                                            </button>
                                                        </div>
                                                    </div>
                }

                <ToastContainer />
            </div>
    )
}
