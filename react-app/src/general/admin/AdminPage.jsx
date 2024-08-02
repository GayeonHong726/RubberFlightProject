import React, { useState, useEffect } from 'react';
import { getCountryInfo } from '../../apis/countryApis';
import { getAirportInfo} from '../../apis/airportApis';
import axios from 'axios';
import CountryItem from './components/CountryItem';

const AdminPage = () => {
    const [countrys, setCountry] = useState([]); 
    const [countryIsoInput, setCountryIsoInput] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [airports, setAirport] = useState([]);
    const [AirportIataInput, setAirportIataInput] = useState("");

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:8282/country/list",
        })
        .then(response => {
            const { data, status } = response;
            if (status === 200) {
                setCountry(data);
            }
        })
        .catch(error => {
            console.error("Error fetching country list:", error);
        });
    }, [countrys]);

    const addCountry = async (e) => {
        e.preventDefault();

        if (!countryIsoInput) {
            window.alert("ISO 코드를 입력해주세요.");
            return;
        }

        try {
            const response = await getCountryInfo(countryIsoInput);
            const data = response.data[0];

            const extractedData = {
                countryId: data.countryId,
                countryIso: data.codeIso2Country,
                countryName: data.nameCountry,
            };
            setSelectedCountry(extractedData);

            const saveResponse = await fetch('http://localhost:8282/country/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(extractedData),
            });

            if (!saveResponse.ok) {
                throw new Error('저장시 오류 발생');
            }

            window.alert('저장 성공');

        } catch (error) {
            console.error("Error fetching country data:", error);
            window.alert("데이터를 가져오는 중 오류가 발생했습니다.");
        }
    };

    const deleteCountry = async (isoCode) => {
        if (!isoCode) {
            window.alert("삭제할 ISO 코드를 제공해주세요.");
            return;
        }

        try {
            const response = await axios({
                method: "delete",
                url: `http://localhost:8282/country/delete/${isoCode}`,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const { status } = response;
            if (status === 200) {
                window.alert('삭제 성공');
                setCountry(countrys.filter(country => country.codeIso2Country !== isoCode)); 
                setSelectedCountry(null); 
            } else {
                window.alert('삭제 실패');
            }
        } catch (error) {
            console.error("Error deleting country:", error);
            window.alert('삭제 중 오류가 발생했습니다.');
        }
    };

    const addAirport = async (e) => {
        e.preventDefault();

        if(!airportIataInput) {
            window.alert("Iata 코드를 입력해주세요");
            return;
        }

        try {
            const response = await getAirportInfo(airportIataInput);
            const data = response.data[0]

            const extractedData = {
                airportName : data.nameAirport,
                airportIso : data.codeIataAirport,
                latitudeAirport : data.latitudeAirport,
                longitudeAirport : data.longitudeAirport,

            }
        }catch (error) {
            console.error("Error fetching country data:", error);
            window.alert("데이터를 가져오는 중 오류가 발생했습니다.");
        }
        
    }

    return (
        <>
            {/* 나라 정보 추가, 삭제 */}
            <div>
                <form onSubmit={addCountry}>
                    <div>
                        <div>나라 입력</div>
                        <input
                            type="text"
                            placeholder="나라 ISO 코드 입력하기"
                            name="countryIso"
                            value={countryIsoInput}
                            onChange={(e) => setCountryIsoInput(e.target.value)}
                        />
                    </div>
                    <button type="submit" name="search">Country Add</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>id |</th>
                            <th>나라 id |</th>
                            <th>나라 iso 코드 |</th>
                            <th>나라 이름 |</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countrys.map(country => (
                            <CountryItem
                                key={country.countryId}
                                country={country}
                                onDelete={() => deleteCountry(country.countryIso)} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>


            <br/><br/>
            <hr/>
            <br/> <br/>


            {/* 공항 정보 추가,삭제 */}
            <div>
                <form onSubmit={addAirport}>
                    <div>
                        <div>공항 입력</div>
                        <input
                            type="text"
                            placeholder="공항 Iata 코드 입력하기"
                            name="AirportIata"
                            value={airportIataInput}
                            onChange={(e) => setAirportIataInput(e.target.value)}
                        />
                    </div>
                    <button type="submit" name="search">Airport Add</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>id |</th>
                            <th>공항 id |</th>
                            <th>공항 Iata 코드 |</th>
                            <th>공항 이름 |</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {countrys.map(country => (
                            <CountryItem
                                key={country.countryId}
                                country={country}
                                onDelete={() => deleteCountry(country.countryIso)} 
                            />
                        ))} */}
                    </tbody>
                </table>
            </div>

        </>
        
    );
};

export default AdminPage;
