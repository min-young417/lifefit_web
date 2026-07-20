/* BMC 청약센터에서 가져온 이미지·아이콘 맵 */

import logo from './common/logo.png'
import logoWhite from './common/logo_w.png'
import lnbBg from './common/lnbbg.png'

import mainSlide from './bg/mainslide_sample.png'
import guide01 from './bg/guide01.png'
import guide03 from './bg/guide03.png'
import guide04 from './bg/guide04.png'
import subappBg from './bg/subappbg.svg'
import subapp01 from './bg/subapp01.svg'
import subapp01Active from './bg/subapp01-active.svg'
import subapp02 from './bg/subapp02.svg'
import subapp02Active from './bg/subapp02-active.svg'
import subapp04 from './bg/subapp04.svg'
import subapp04Active from './bg/subapp04-active.svg'
import subapp05 from './bg/subapp05.svg'
import subapp06 from './bg/subapp06.svg'
import subapp06Active from './bg/subapp06-active.svg'
import subapp07 from './bg/subapp07.svg'

import icoClose from './ico/ico-close.svg'
import icoTop from './ico/ico-top.svg'
import icoArrow from './ico/ico-service-arrow.svg'
import icoBullet from './ico/ico-bullet-type01.svg'
import icoBtnApp from './ico/ico-btnApp.svg'
import icoBtnPlusW from './ico/ico-btnplusW.svg'
import icoBtnPlusG from './ico/ico-btnplusG.svg'
import icoBtnPrint from './ico/ico-btnPrint.svg'
import icoLnb01 from './ico/ico-lnb01.svg'
import icoLnb02 from './ico/ico-lnb02.svg'
import icoLnb03 from './ico/ico-lnb03.svg'
import icoLnb04 from './ico/ico-lnb04.svg'

/** 주택 유형 → 아이콘 */
export const housingTypeIcons = {
  happy: { idle: subapp01, active: subapp01Active },
  national: { idle: subapp02, active: subapp02Active },
  public: { idle: subapp04, active: subapp04Active },
  purchase: { idle: subapp06, active: subapp06Active }
}

/** 라이프스타일 → 아이콘 (원형 뱃지용) */
export const lifestyleIcons = {
  startup: subapp02,
  leisure: subapp01,
  shopping: subapp05,
  culture: subapp07,
  nature: subapp07,
  transit: subapp06
}

export const assets = {
  logo,
  logoWhite,
  lnbBg,
  mainSlide,
  guide01,
  guide03,
  guide04,
  subappBg,
  subapp01,
  subapp02,
  subapp04,
  subapp05,
  subapp06,
  subapp07,
  icoClose,
  icoTop,
  icoArrow,
  icoBullet,
  icoBtnApp,
  icoBtnPlusW,
  icoBtnPlusG,
  icoBtnPrint,
  icoLnb01,
  icoLnb02,
  icoLnb03,
  icoLnb04
}

export default assets
