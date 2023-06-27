import { useTranslation } from 'react-i18next';
// '@mui
import { enUS, viVN, zhCN } from '@mui/material/locale';

import ChineseFlag from '../../assets/images/cn.svg';
import EnglishFlag from '../../assets/images/en.svg';
import VietNamFlag from '../../assets/images/vi.svg';
// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'Vietnamese',
    value: 'vi',
    systemValue: viVN,
    icon: VietNamFlag,
  },
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: EnglishFlag,
  },
  {
    label: 'Chinese',
    value: 'cn',
    systemValue: zhCN,
    icon: ChineseFlag,
  },
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[0];

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
