import React, { useEffect, useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "hi", name: "Hindi" },
    { code: "zh-CN", name: "Chinese" },
    { code: "ar", name: "Arabic" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "bn", name: "Bengali" },
    { code: "pa", name: "Punjabi" },
    { code: "gu", name: "Gujarati" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
];

const GoogleTranslate = () => {
    const [selectedLang, setSelectedLang] = useState("en");

    useEffect(() => {
        const addScript = document.createElement("script");
        addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(addScript);

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                { pageLanguage: "en", includedLanguages: languages.map(lang => lang.code).join(",") },
                "google_translate_element"
            );

            setTimeout(() => {
                document.querySelector(".VIpgJd-ZVi9od-ORHb")?.remove(); // Remove the Google Translate toolbar
            }, 500);
        };

        return () => {
            document.body.removeChild(addScript);
            delete window.googleTranslateElementInit;
        };
    }, []);

    const handleLanguageChange = (event) => {
        const langCode = event.target.value;
        setSelectedLang(langCode);
        const translateDropdown = document.querySelector(".goog-te-combo");
        if (translateDropdown) {
            translateDropdown.value = langCode;
            translateDropdown.dispatchEvent(new Event("change"));
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px",
        marginTop:"20px", marginLeft:"10px" }}>
<FormControl sx={{ minWidth: 200 }} variant="outlined">
    <InputLabel id="language-select-label">Select Language</InputLabel>
    <Select
        labelId="language-select-label"
        value={selectedLang}
        onChange={handleLanguageChange}
        label="Select Language"
    >
        {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
            </MenuItem>
        ))}
    </Select>
</FormControl>

            <div id="google_translate_element" style={{ display: "none" }}></div>
        </div>
    );
};

export default GoogleTranslate;
