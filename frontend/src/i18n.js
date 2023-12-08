import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { translate } from "../src/services/traductionReForm.js";

const chargerTraductions = async (langue) => {
    try {
        const traductions = await translate(langue);

        let res = JSON.parse(traductions);
        // console.log("traductions", typeof res, res);
        return res ;
    } catch (error) {
        console.error("Error loading translations", error);
        return { translations: {} };
    }
};
let tradFR = await chargerTraductions("fr");
let tradEN = await chargerTraductions("en");

    i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources: {
                en: {
                    translations: tradEN,
                }, // Resolve the promise here
                fr: {
                    translations: tradFR
                }
            },
            fallbackLng: "fr",
            debug: false,
            ns: ["translations"],
            defaultNS: "translations",
            keySeparator: false,
            interpolation: {
                escapeValue: false
            }
        });


export default i18n;
