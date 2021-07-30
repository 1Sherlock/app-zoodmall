import {Modal, ModalBody, ModalFooter, ModalHeader, Collapse} from "reactstrap";
import {useEffect, useState} from "react";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {useMediaQuery} from 'react-responsive'
import FadeLoader from "react-spinners/FadeLoader";

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
            step === 0 ?
                <div className="wrap vh-100 d-flex align-items-center justify-content-between flex-column">
                    <div className="logo">
                        <img src="/images/logo.svg" alt="logo.svg"/>
                    </div>
                    <AvForm className="form">
                        <div className="padding">
                            <div className="form-group">
                                <label htmlFor="seria">Введите серийный номер паспорта или ПИНФЛ:</label>
                                <input autoComplete="off" type="text" id="seria" value={number}
                                       className="form-control" placeholder="Введите данные" onChange={changeNumber}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="day">Введите, дату рождения:</label>
                                <div className="d-flex">
                                    <select id="day" className="form-control">
                                        <option value="">День</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                    </select>
                                    <select id="month" className="form-control">
                                        <option value="">Месяц</option>
                                        <option value="01">Январ</option>
                                        <option value="02">Феврал</option>
                                        <option value="03">Март</option>
                                        <option value="04">Апрел</option>
                                        <option value="05">Май</option>
                                        <option value="06">Июн</option>
                                        <option value="07">Июл</option>
                                        <option value="08">Август</option>
                                        <option value="09">Сентяб</option>
                                        <option value="10">Октябр</option>
                                        <option value="11">Ноябр</option>
                                        <option value="12">Декабр</option>
                                    </select>
                                    <select id="year" className="form-control">
                                        <option value="">Год</option>
                                        <option value="2012">2012</option>
                                        <option value="2011">2011</option>
                                        <option value="2010">2010</option>
                                        <option value="2009">2009</option>
                                        <option value="2008">2008</option>
                                        <option value="2007">2007</option>
                                        <option value="2006">2006</option>
                                        <option value="2005">2005</option>
                                        <option value="2004">2004</option>
                                        <option value="2003">2003</option>
                                        <option value="2002">2002</option>
                                        <option value="2001">2001</option>
                                        <option value="2000">2000</option>
                                        <option value="1999">1999</option>
                                        <option value="1998">1998</option>
                                        <option value="1997">1997</option>
                                        <option value="1996">1996</option>
                                        <option value="1995">1995</option>
                                        <option value="1994">1994</option>
                                        <option value="1993">1993</option>
                                        <option value="1992">1992</option>
                                        <option value="1991">1991</option>
                                        <option value="1990">1990</option>
                                        <option value="1989">1989</option>
                                        <option value="1988">1988</option>
                                        <option value="1987">1987</option>
                                        <option value="1986">1986</option>
                                        <option value="1985">1985</option>
                                        <option value="1984">1984</option>
                                        <option value="1983">1983</option>
                                        <option value="1982">1982</option>
                                        <option value="1981">1981</option>
                                        <option value="1980">1980</option>
                                        <option value="1979">1979</option>
                                        <option value="1978">1978</option>
                                        <option value="1977">1977</option>
                                        <option value="1976">1976</option>
                                        <option value="1975">1975</option>
                                        <option value="1974">1974</option>
                                        <option value="1973">1973</option>
                                        <option value="1972">1972</option>
                                        <option value="1971">1971</option>
                                        <option value="1970">1970</option>
                                        <option value="1969">1969</option>
                                        <option value="1968">1968</option>
                                        <option value="1967">1967</option>
                                        <option value="1966">1966</option>
                                        <option value="1965">1965</option>
                                        <option value="1964">1964</option>
                                        <option value="1963">1963</option>
                                        <option value="1962">1962</option>
                                        <option value="1961">1961</option>
                                        <option value="1960">1960</option>
                                        <option value="1959">1959</option>
                                        <option value="1958">1958</option>
                                        <option value="1957">1957</option>
                                        <option value="1956">1956</option>
                                        <option value="1955">1955</option>
                                        <option value="1954">1954</option>
                                        <option value="1953">1953</option>
                                        <option value="1952">1952</option>
                                        <option value="1951">1951</option>
                                        <option value="1950">1950</option>
                                        <option value="1949">1949</option>
                                        <option value="1948">1948</option>
                                        <option value="1947">1947</option>
                                        <option value="1946">1946</option>
                                        <option value="1945">1945</option>
                                        <option value="1944">1944</option>
                                        <option value="1943">1943</option>
                                        <option value="1942">1942</option>
                                        <option value="1941">1941</option>
                                        <option value="1940">1940</option>
                                        <option value="1939">1939</option>
                                        <option value="1938">1938</option>
                                        <option value="1937">1937</option>
                                        <option value="1936">1936</option>
                                        <option value="1935">1935</option>
                                        <option value="1934">1934</option>
                                        <option value="1933">1933</option>
                                        <option value="1932">1932</option>
                                        <option value="1931">1931</option>
                                        <option value="1930">1930</option>
                                        <option value="1929">1929</option>
                                        <option value="1928">1928</option>
                                        <option value="1927">1927</option>
                                        <option value="1926">1926</option>
                                        <option value="1925">1925</option>
                                        <option value="1924">1924</option>
                                        <option value="1923">1923</option>
                                        <option value="1922">1922</option>
                                        <option value="1921">1921</option>
                                        <option value="1920">1920</option>
                                        <option value="1919">1919</option>
                                        <option value="1918">1918</option>
                                        <option value="1917">1917</option>
                                        <option value="1916">1916</option>
                                        <option value="1915">1915</option>
                                        <option value="1914">1914</option>
                                        <option value="1913">1913</option>
                                        <option value="1912">1912</option>
                                        <option value="1911">1911</option>
                                        <option value="1910">1910</option>
                                        <option value="1909">1909</option>
                                        <option value="1908">1908</option>
                                        <option value="1907">1907</option>
                                        <option value="1906">1906</option>
                                        <option value="1905">1905</option>
                                        <option value="1904">1904</option>
                                        <option value="1903">1903</option>
                                        <option value="1902">1902</option>
                                        <option value="1901">1901</option>
                                        <option value="1900">1900</option>
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <input type="checkbox" className="h-auto"/>
                                <p className="font-roboto-medium mb-0">
                                    Продолжая, я согласшаюсь на <a href="#">Обработку и передачу персональных данных</a>.
                                </p>
                            </div>
                        </div>
                        <button type="button" className="font-roboto-bold btn-block" onClick={() => setStep(1)}>Продолжить</button>
                    </AvForm>
                </div> :
                step === 1 ?
                    <div className="wrap vh-100 d-flex align-items-center justify-content-between flex-column">
                        <div className="logo">
                            <img src="/images/logo.svg" alt="logo.svg"/>
                        </div>
                        <AvForm className="form w-100" model={data}>
                            <div className="padding">
                                <AvField name="fullName" type="text" label="Полное имя" disabled
                                         value={data.fullName}/>

                                <label htmlFor="address">Ваше место жительства </label>
                                <input type="text" className="form-control margin-bottom" id="address" disabled value="Москва, Российская империя"/>
                                <input type="text" className="form-control mb-64" id="address" disabled value="ул. Пушкина, дом Калотушкни 32А"/>
                            </div>
                            <button type="button" className="font-roboto-bold btn-block" onClick={() => setStep(2)}>Да, все верно</button>
                        </AvForm>
                    </div> :
                    step === 2 ?
                        <div className="wrap vh-100 d-flex align-items-center justify-content-between flex-column">
                            <div className="logo-check text-center">
                                <span className="icon icon-check"/>
                                <p className="font-roboto-medium">ПОЗДРАВЛЯЕМ!</p>
                                <h5 className="font-roboto-medium">МЫ МОЖЕМ ВЫДЕЛИТЬ КРЕДИТ НА ПОКУПКУ ВАШЕГО ТОВАРА.</h5>
                            </div>
                            <div className="content w-100">
                                <div className="padding">
                                    <p className="choose-type">Выберите тип кредита:</p>

                                    <div className="choose-item d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <input type="checkbox"/>
                                            <div>
                                                <h5 className="font-roboto-medium">350,000 UZS</h5>
                                                <p className="font-roboto-medium">в течении 6 месяцев</p>
                                            </div>
                                        </div>
                                        <h5 className="font-roboto-medium">26% годовых</h5>
                                    </div>

                                    <div className="choose-item d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <input type="checkbox"/>
                                            <div>
                                                <h5 className="font-roboto-medium">150,000 UZS</h5>
                                                <p className="font-roboto-medium">в течении 12 месяцев</p>
                                            </div>
                                        </div>
                                        <h5 className="font-roboto-medium">26% годовых</h5>
                                    </div>
                                </div>

                                <button type="button" className="font-roboto-bold btn-block" onClick={() => setStep(3)}>Далее</button>
                            </div>


                        </div> :
                        step === 3 ?
                            <div className="wrap vh-100 d-flex align-items-center justify-content-center">
                                <div className="loader">
                                    <p className="font-roboto-medium mx-auto">
                                        Пожалуйста подождите,
                                        проверЯЕМ ВОЗМОЖНОСТЬ ПРЕДОСТАВЛЕНИЯ КРЕДИТА.
                                    </p>
                                    <FadeLoader color="#FEC50C"/>
                                    <h5 className="font-roboto-medium mx-auto" onClick={() => setStep(4)}>
                                        Желательно не закрывайте это
                                        окно или приложение.
                                    </h5>
                                </div>
                            </div> :
                            step === 4 ?
                                <div className="wrap vh-100 d-flex align-items-center justify-content-between flex-column">
                                    <div className="logo">
                                        <img src="/images/logo.svg" alt="logo.svg"/>
                                    </div>
                                    <AvForm className="form w-100">
                                        <div className="padding">
                                            <AvField name="fullName" type="text" label="Введите Ваш номер телефона" placeholder="+998"/>

                                            <div className="form-group">
                                                <label htmlFor="first">Введите код из SMS</label>
                                                <div className="d-flex">
                                                    <input type="text" className="form-control mr-8"/>
                                                    <input type="text" className="form-control mr-8"/>
                                                    <input type="text" className="form-control mr-8"/>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <input type="checkbox" className="h-auto"/>
                                                <p className="font-roboto-medium mb-0">
                                                    Продолжая, я принимаю <a href="#">Условия пользования и согласен с Договором оферты</a>.
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <input type="checkbox" className="h-auto"/>
                                                <p className="font-roboto-medium mb-0">
                                                    Продолжая, я согласен с <a href="#">Кредитным договором и даю согласие на перевод средств в компанию поставщика услуг</a>.
                                                </p>
                                            </div>
                                        </div>
                                        <button type="button" className="font-roboto-bold btn-block" onClick={() => setStep(5)}>Получить кредит</button>
                                    </AvForm>
                                </div> :
                                step === 5 ?
                                    <div className="wrap vh-100 d-flex align-items-center justify-content-between flex-column">
                                        <div className="logo-check text-center">
                                            <span className="icon icon-smile"/>
                                            <p className="font-roboto-medium">ПОЗДРАВЛЯЕМ!</p>
                                            <h5 className="font-roboto-medium">ВЫ получили кредит и оплатили товар</h5>
                                        </div>
                                        <div className="content w-100">
                                            <div className="padding">
                                                <h4 className="choose-type font-roboto-medium">Посмотреть график выплат</h4>
                                            </div>

                                            <button type="button" className="font-roboto-bold btn-block">Далее</button>
                                        </div>


                                    </div> : ""
    )

}

export default App;
