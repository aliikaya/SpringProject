import { useTranslation } from "react-i18next";

export function LanguageSelector(){

    const{i18n} = useTranslation();

    const onSelectLanguage = (language) => {
        i18n.changeLanguage(language)
        localStorage.setItem('lang', language)
    };
    return (
    <>
    
    <img
    role = "button"
  src="https://flagcdn.com/w80/tr.png"
  width="26"
  height='18'
  alt="Turkce"
  onClick={() => onSelectLanguage('tr')}
  ></img>

<img
    role = "button"
  src="https://flagcdn.com/w80/us.png"
  width="26"
  height='18'
  alt="English"
  onClick={() => onSelectLanguage('en')}
  ></img>
    
    
    </>
    );
}