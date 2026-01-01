const countryList = {
    AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN",
    AOA: "AO", AQD: "AQ", ARS: "AR", AUD: "AU", AZN: "AZ", BAM: "BA",
    BBD: "BB", BDT: "BD", BEF: "BE", BGN: "BG", BHD: "BH", BIF: "BI",
    BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR", BSD: "BS", NOK: "BV",
    BWP: "BW", BYR: "BY", BZD: "BZ", CAD: "CA", CDF: "CD", XAF: "CF",
    CHF: "CH", CLP: "CL", CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU",
    CVE: "CV", CYP: "CY", CZK: "CZ", DJF: "DJ", DKK: "DK", DOP: "DO",
    DZD: "DZ", ECS: "EC", EEK: "EE", EGP: "EG", ETB: "ET", EUR: "FR",
    FJD: "FJ", FKP: "FK", GBP: "GB", GEL: "GE", GGP: "GG", GHS: "GH",
    GIP: "GI", GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK",
    HNL: "HN", HRK: "HR", HTG: "HT", HUF: "HU", IDR: "ID", ILS: "IL",
    INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM", JOD: "JO",
    JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KPW: "KP",
    KRW: "KR", KWD: "KW", KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB",
    LKR: "LK", LRD: "LR", LSL: "LS", LTL: "LT", LVL: "LV", LYD: "LY",
    MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN",
    MOP: "MO", MRO: "MR", MTL: "MT", MUR: "MU", MVR: "MV", MWK: "MW",
    MXN: "MX", MYR: "MY", MZN: "MZ", NAD: "NA", XPF: "NC", NGN: "NG",
    NIO: "NI", NLG: "NL", NOK: "NO", NPR: "NP", NZD: "NZ", OMR: "OM",
    PAB: "PA", PEN: "PE", PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL",
    PTE: "PT", PYG: "PY", QAR: "QA", RON: "RO", RSD: "RS", RUB: "RU",
    RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC", SDG: "SD", SEK: "SE",
    SGD: "SG", SHP: "SH", SIT: "SI", SKK: "SK", SLL: "SL", SOS: "SO",
    SRD: "SR", STD: "ST", SVC: "SV", SYP: "SY", SZL: "SZ", THB: "TH",
    TJS: "TJ", TMT: "TM", TND: "TN", TOP: "TO", TRL: "TR", TTD: "TT",
    TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US", UYU: "UY",
    UZS: "UZ", VEB: "VE", VND: "VN", VUV: "VU", WST: "WS", XAF: "YE",
    ZAR: "ZA", ZMK: "ZM", ZWD: "ZW",
};
const fromContainer = document.querySelector(".from-container");
const toContainer = document.querySelector(".to-container");
const fromFlag = document.createElement("img");
const toFlag = document.createElement("img");
const fromMenu = document.querySelector("#from-menu");
const toMenu = document.querySelector("#to-menu");
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const amountInput = document.querySelector("input");
const exchangeRateMsg = document.querySelector(".exchange-rate");

const updateFlag = (flagElement, currency_code) => {
    let country = countryList[currency_code];
    flagElement.src = `https://flagsapi.com/${country}/shiny/64.png`;
}
const updateExchangeRate = async () => {
    let amt = amountInput.value;
    if (amt === "" || amt <= 0) {
        exchangeRateMsg.textContent = "Please enter valid amount";
        return;
    }
    exchangeRateMsg.textContent = "Fetching exchange rate...";
    const url = `${BASE_URL}/${fromMenu.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let json_data = await response.json();
    let rate = json_data[fromMenu.value.toLowerCase()][toMenu.value.toLowerCase()];
    exchangeRateMsg.textContent = `${amountInput.value} ${fromMenu.value}=${(rate * amountInput.value).toFixed(2)} ${toMenu.value}`;
}
let musicStarted = false;
const bgMusic = document.querySelector("#bg-music");
(function () {
    const fFragment = document.createDocumentFragment();
    const tFragment = document.createDocumentFragment();
    for (let code in countryList) {
        let option_from = document.createElement("option");
        option_from.value = code;
        option_from.textContent = code;
        if (code === "USD") option_from.selected = true;
        fFragment.appendChild(option_from);
        let option_to = document.createElement("option");
        option_to.value = code;
        option_to.textContent = code;
        if (code === "INR") option_to.selected = true;
        tFragment.appendChild(option_to);

    }
    fromMenu.appendChild(fFragment);
    toMenu.appendChild(tFragment);
    updateFlag(toFlag, "INR");
    updateFlag(fromFlag, "USD");
})()



fromMenu.addEventListener("change", (event) => {
    updateFlag(fromFlag, event.target.value);
    updateExchangeRate();
})
toMenu.addEventListener("change", (event) => {
    updateFlag(toFlag, event.target.value);
    updateExchangeRate();
})
fromContainer.insertBefore(fromFlag, fromMenu);
toContainer.insertBefore(toFlag, toMenu);
amountInput.addEventListener("input", () => {
    updateExchangeRate();
    if (!musicStarted) {
        bgMusic.play();
        musicStarted = true;
    }
});
window.addEventListener("load", updateExchangeRate);
