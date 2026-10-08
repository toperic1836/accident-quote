/* =====================================================================
 * rates.js ── 費率與商品參數（所有數字集中在這個檔案）
 * ---------------------------------------------------------------------
 * 來源：自原「意外險全方位保障｜即時報價系統」程式逐一取出，數字未經更動。
 * 表中所有「年齡」皆指「保險年齡」（規則見下方 RULES.insuranceAge 與 app.js parseRocBirth）。
 * 日後費率調整時，只要修改本檔對應數字、存檔，重新整理網頁即可生效。
 *
 * 陣列欄位順序一律為「職業類別 第1類 ~ 第6類」：
 *                   [ 1類,  2類,  3類,  4類,  5類,  6類 ]
 * 費率為 0 代表該職業類別「不可投保」（DM 上標示為「–」），
 * 程式會以 0 元計算（與原工具行為相同）。
 * ===================================================================== */
window.QUOTE_RATES = {

  /* ---------- 繳別係數：各期保費 = 年繳保費 × 係數（各險種分別四捨五入） ---------- */
  PAY_MODES: {
    annual  : { label: "年繳", factor: 1, suffix: "每年" },
    semi    : { label: "半年繳", factor: 0.52, suffix: "每半年" },
    quarter : { label: "季繳", factor: 0.262, suffix: "每季" },
    month   : { label: "月繳", factor: 0.088, suffix: "每月" },
  },

  /* ---------- ADG 意外身故／失能／燒燙傷 ----------
   * 單位：元／每萬元保額（年繳）。年繳保費 = 費率 × 保額(萬)
   * child = 14 歲(含)以下；age15 = 15 歲；adult = 16 歲以上 */
  ADG_RATES: {
    child: [  3.2,    0,    0,    0,    0,    0 ],
    age15: [  6.5,  8.1,  9.8, 14.6, 22.8, 29.3 ],
    adult: [  9.8, 12.3, 14.7, 22.1, 34.3, 44.1 ],
  },

  /* ---------- TMR 意外醫療實支實付 ----------
   * 年繳保費 = 前3萬保費 + (保額 − 3) × 每增加1萬保費（保額 ≤ 3 萬時只收前3萬保費）
   * 保額 0 = 不投保；保額上限 = min(20 萬, ADG 保額 × 10% 無條件捨去) */
  TMR_FIRST3: [  780,  960, 1140, 1680, 2580, 3300 ],   // 前 3 萬元保額的年繳保費
  TMR_EACH1:  [  165,  205,  246,  369,  574,  738 ],   // 超過 3 萬後，每增加 1 萬元的年繳保費

  /* ---------- ADM 意外住院日額／門診手術 ----------
   * 單位：元／每 100 元日額（年繳）。年繳保費 = 費率 × (日額 ÷ 100) */
  ADM_RATES: [   53,   66,   80,  119,  186,  239 ],

  /* ---------- ADH 骨力勇意外骨折傷害保險附約 ----------
   * 單位：元／每萬元保額（年繳）。已與官方 DM 第 4 頁「年繳費率表」逐格核對一致。
   * 保額上限：已有富邦主約 → 200 萬；另買 OLA6 → min(200 萬, OLA6 保額 × 5) */
  ADH_RATES: {
    child:     [   48,    0,    0,    0,    0,    0 ],   // 14 歲(含)以下
    age15:     [   53,   66,   79,  118,  183,  234 ],   // 15 歲
    age16to44: [   58,   72,   86,  129,  200,  257 ],   // 16 ~ 44 歲
    age45to59: [   79,   98,  118,  176,  273,  351 ],   // 45 ~ 59 歲
    age60to75: [  121,  151,  181,  271,  420,  540 ],   // 60 ~ 75 歲
  },

  /* ---------- ADH 骨折別表 + ADM 骨折未住院日數 ----------
   * adh  = ADH 意外傷害骨折保險金給付比例（%，完全骨折），已與 DM 第 3 頁核對一致
   * days = 骨折對應日數（ADM 用：實際住院日數上限及「未住院骨折」給付日數），
   *        此欄沿用原工具，DM（ADH）上沒有這欄，無法用 DM 核對
   * id 為程式內部代碼，請勿重複 */
  BONES: [
    { id: "skull"        , label: "頭蓋骨"               , adh: 60, days: 50 },
    { id: "nasal"        , label: "鼻骨、眶骨（含顴骨）"        , adh: 12, days: 14 },
    { id: "jaw"          , label: "下顎（齒槽醫療除外）"        , adh: 20, days: 20 },
    { id: "clavicle"     , label: "鎖骨"                , adh: 30, days: 28 },
    { id: "scapula"      , label: "肩胛骨"               , adh: 35, days: 34 },
    { id: "humerus"      , label: "臂骨"                , adh: 40, days: 40 },
    { id: "rib"          , label: "肋骨"                , adh: 20, days: 20 },
    { id: "spine"        , label: "椎骨（含胸椎、腰椎、尾骨）"     , adh: 40, days: 40 },
    { id: "radius"       , label: "橈骨或尺骨"             , adh: 30, days: 28 },
    { id: "radius-ulna"  , label: "橈骨與尺骨"             , adh: 40, days: 40 },
    { id: "carpal"       , label: "腕骨（一手或雙手）"         , adh: 40, days: 40 },
    { id: "pelvis"       , label: "骨盤（含腸骨、恥骨、坐骨、薦骨）"  , adh: 40, days: 40 },
    { id: "femoral-neck" , label: "大腿骨頸"              , adh: 80, days: 60 },
    { id: "finger"       , label: "指骨"                , adh:  3, days: 14 },
    { id: "metacarpal"   , label: "掌骨"                , adh: 12, days: 14 },
    { id: "femur"        , label: "股骨"                , adh: 60, days: 50 },
    { id: "patella"      , label: "膝蓋骨"               , adh: 30, days: 28 },
    { id: "tibia"        , label: "脛骨或腓骨"             , adh: 40, days: 40 },
    { id: "tibia-fibula" , label: "脛骨及腓骨"             , adh: 60, days: 50 },
    { id: "ankle"        , label: "踝骨（一足或雙足）"         , adh: 40, days: 40 },
    { id: "metatarsal"   , label: "蹠骨"                , adh: 12, days: 14 },
    { id: "toe"          , label: "趾骨"                , adh:  3, days: 14 },
  ],

  /* ---------- ADH 骨折別表圖（assets/adh-fracture-chart.webp，原圖 922 × 1296 px）的標示位置 ----------
   * 用途：選擇「骨折部位」時，在圖上框出該部位的標籤＋比例，並沿引線標出骨頭位置。
   * 所有數值都是「佔圖片寬／高的百分比」，圖片縮放時框線會跟著對齊。
   *   box  = [左, 上, 寬, 高]   → 標籤框（含白色名稱＋藍色比例）
   *   line = [起點X, 起點Y, 終點X, 終點Y] → 引線，起點在比例框右側，終點在骨頭上的圓點
   * 量測方式：以程式偵測圖上藍色比例框與引線端點後逐一人工目視核對（右側 px 為原圖像素）。
   * 「橈骨或尺骨／橈骨與尺骨」、「脛骨或腓骨／脛骨及腓骨」在 DM 上共用同一條引線。
   * key 必須與上方 BONES 的 id 相同；若更換圖片，需重新量測這些數值。 */
  BONE_CHART: {
    "skull":         { box: [24.73, 17.36, 14.10, 2.78], line: [38.94, 18.52, 57.05, 29.55] }, // 頭蓋骨 60%｜px 框 x228 y225 w130 h36；線 (359,240)→(526,383)
    "nasal":         { box: [15.08, 22.53, 23.75, 2.78], line: [38.94, 24.00, 54.01, 31.87] }, // 鼻骨、眶骨 12%｜px 框 x139 y292 w219 h36；線 (359,311)→(498,413)
    "jaw":           { box: [15.08, 25.93, 23.75, 2.78], line: [38.94, 27.39, 55.31, 35.65] }, // 下顎 20%｜px 框 x139 y336 w219 h36；線 (359,355)→(510,462)
    "clavicle":      { box: [24.73, 30.32, 14.10, 2.78], line: [38.94, 32.02, 55.53, 37.58] }, // 鎖骨 30%｜px 框 x228 y393 w130 h36；線 (359,415)→(512,487)
    "scapula":       { box: [24.73, 33.49, 14.10, 2.78], line: [38.94, 34.88, 51.52, 37.50] }, // 肩胛骨 35%｜px 框 x228 y434 w130 h36；線 (359,452)→(475,486)
    "humerus":       { box: [24.73, 36.65, 14.10, 2.78], line: [38.94, 38.04, 47.51, 41.44] }, // 臂骨 40%｜px 框 x228 y475 w130 h36；線 (359,493)→(438,537)
    "rib":           { box: [24.73, 39.81, 14.10, 2.78], line: [38.94, 41.28, 51.95, 42.52] }, // 肋骨 20%｜px 框 x228 y516 w130 h36；線 (359,535)→(479,551)
    "spine":         { box: [ 9.11, 43.06, 29.72, 2.70], line: [38.94, 44.37, 58.03, 44.37] }, // 椎骨 40%｜px 框 x84 y558 w274 h35；線 (359,575)→(535,575)
    "radius":        { box: [15.08, 47.38, 23.75, 2.01], line: [38.94, 49.38, 43.82, 49.38] }, // 橈骨或尺骨 30%｜px 框 x139 y614 w219 h26；線 (359,640)→(404,640)
    "radius-ulna":   { box: [15.08, 49.46, 23.75, 2.01], line: [38.94, 49.38, 43.82, 49.38] }, // 橈骨與尺骨 40%｜px 框 x139 y641 w219 h26；線 (359,640)→(404,640)
    "carpal":        { box: [15.08, 52.08, 23.75, 2.78], line: [38.94, 52.62, 42.52, 51.85] }, // 腕骨 40%｜px 框 x139 y675 w219 h36；線 (359,682)→(392,672)
    "pelvis":        { box: [ 5.31, 55.17, 33.51, 2.70], line: [38.94, 56.25, 52.06, 50.69] }, // 骨盤 40%｜px 框 x49 y715 w309 h35；線 (359,729)→(480,657)
    "femoral-neck":  { box: [15.08, 60.34, 23.75, 2.78], line: [38.94, 61.50, 51.52, 53.55] }, // 大腿骨頸 80%｜px 框 x139 y782 w219 h36；線 (359,797)→(475,694)
    "finger":        { box: [24.73, 63.58, 14.10, 2.70], line: [38.94, 63.58, 42.41, 55.94] }, // 指骨 3%｜px 框 x228 y824 w130 h35；線 (359,824)→(391,725)
    "metacarpal":    { box: [24.73, 66.74, 14.10, 2.78], line: [38.94, 67.52, 44.79, 54.01] }, // 掌骨 12%｜px 框 x228 y865 w130 h36；線 (359,875)→(413,700)
    "femur":         { box: [24.73, 69.98, 14.10, 2.78], line: [38.94, 71.14, 52.49, 59.26] }, // 股骨 60%｜px 框 x228 y907 w130 h36；線 (359,922)→(484,768)
    "patella":       { box: [24.73, 73.46, 14.10, 2.78], line: [38.94, 75.08, 51.95, 64.35] }, // 膝蓋骨 30%｜px 框 x228 y952 w130 h36；線 (359,973)→(479,834)
    "tibia":         { box: [15.08, 76.70, 23.75, 2.01], line: [38.94, 78.47, 52.06, 69.75] }, // 脛骨或腓骨 40%｜px 框 x139 y994 w219 h26；線 (359,1017)→(480,904)
    "tibia-fibula":  { box: [15.08, 78.70, 23.75, 2.01], line: [38.94, 78.47, 52.06, 69.75] }, // 脛骨及腓骨 60%｜px 框 x139 y1020 w219 h26；線 (359,1017)→(480,904)
    "ankle":         { box: [15.08, 81.10, 23.75, 2.70], line: [38.94, 82.56, 52.49, 75.23] }, // 踝骨 40%｜px 框 x139 y1051 w219 h35；線 (359,1070)→(484,975)
    "metatarsal":    { box: [24.73, 84.10, 14.10, 2.78], line: [38.94, 85.26, 52.28, 77.16] }, // 蹠骨 12%｜px 框 x228 y1090 w130 h36；線 (359,1105)→(482,1000)
    "toe":           { box: [24.73, 87.19, 14.10, 2.78], line: [38.94, 88.50, 51.41, 78.32] }, // 趾骨 3%｜px 框 x228 y1130 w130 h36；線 (359,1147)→(474,1015)
  },

  /* ---------- ADH 脫臼別表（意外傷害脫臼開放性復位術保險金）----------
   * 出處：ADH DM（ADH-DM-北富銀版，1150101 起適用）第 3 頁右欄「意外傷害脫臼開放性復位術保險金給付比例」；
   *       第 2 頁保險範圍：「意外傷害脫臼開放性復位術保險金：保險金額x脫臼別表(10%~30%)，同一意外傷害事故僅給付一次。」
   *       註2：「如因同一意外傷害事故致成二項以上脫臼經醫師診斷必須且實際施行二項以上之『脫臼開放性復位術』治療者，
   *             富邦人壽僅給付一項較高比例之意外傷害脫臼開放性復位術保險金。」
   * 給付金額 = ADH 保險金額 × pct%（脫臼沒有「關懷保險金」；關懷金只針對骨折：意外傷害骨折保險金 × 2%）。
   * 只用在骨折別表圖的點選試算，不影響報價卡（報價卡維持與原工具相同的骨折試算）。 */
  JOINTS: [
    { id: "shoulder", label: "肩關節",               pct: 20 },
    { id: "elbow"   , label: "肘關節",               pct: 10 },
    { id: "wrist"   , label: "腕關節",               pct: 10 },
    { id: "hip"     , label: "髖關節",               pct: 30 },
    { id: "knee"    , label: "膝關節（膝蓋骨除外）", pct: 20 },
    { id: "foot"    , label: "足關節",               pct: 20 },
    { id: "ankle"   , label: "踝關節",               pct: 20 },
    { id: "other"   , label: "其他關節",             pct: 10 },
  ],

  /* 脫臼別表在圖上的位置（同 BONE_CHART：佔圖片寬／高的百分比）
   *   box  = [左, 上, 寬, 高] → 標籤框（白色名稱＋綠色比例）
   *   line = [起點X, 起點Y, 終點X, 終點Y] → 引線，起點在標籤框「左」側，終點在關節上；「其他關節」在 DM 上沒有引線（null）
   * 量測方式：以程式偵測右欄綠色比例框與引線並逐一目視核對（右側 px 為原圖像素）。 */
  JOINT_CHART: {
    "shoulder": { box: [79.28, 37.11, 13.99, 2.78], line: [79.28, 38.50, 64.75, 38.27] }, // 肩關節 20%｜px 框 x731 y481 w129 h36；線 (731,499)→(597,496)
    "elbow":    { box: [79.28, 44.68, 13.99, 2.78], line: [79.28, 46.37, 69.20, 46.53] }, // 肘關節 10%｜px 框 x731 y579 w129 h36；線 (731,601)→(638,603)
    "wrist":    { box: [79.28, 48.30, 13.99, 2.70], line: [79.28, 50.00, 72.34, 51.62] }, // 腕關節 10%｜px 框 x731 y626 w129 h35；線 (731,648)→(667,669)
    "hip":      { box: [79.28, 55.17, 13.99, 2.78], line: [79.28, 56.79, 63.02, 51.31] }, // 髖關節 30%｜px 框 x731 y715 w129 h36；線 (731,736)→(581,665)（引線穿過手掌）
    "knee":     { box: [70.07, 61.88, 23.21, 2.78], line: [70.07, 63.58, 63.02, 63.43] }, // 膝關節 20%｜px 框 x646 y802 w214 h36；線 (646,824)→(581,822)
    "foot":     { box: [79.28, 72.99, 13.99, 2.78], line: [79.28, 74.38, 62.80, 75.00] }, // 足關節 20%｜px 框 x731 y946 w129 h36；線 (731,964)→(579,972)
    "ankle":    { box: [79.28, 76.54, 13.99, 2.78], line: [79.28, 78.16, 63.34, 76.39] }, // 踝關節 20%｜px 框 x731 y992 w129 h36；線 (731,1013)→(584,990)
    "other":    { box: [78.09, 81.87, 15.18, 2.78], line: null },                           // 其他關節 10%｜px 框 x720 y1061 w140 h36；無引線
  },

  /* ---------- 骨折程度：給付金額 = 完全骨折金額 × 係數；ADM 日數也 × 係數（四捨五入） ---------- */
  FRACTURE_TYPES: {
    complete  : { label: "完全骨折", factor: 1 },
    incomplete: { label: "不完全骨折", factor: 0.5 },
    crack     : { label: "骨骼龜裂", factor: 0.25 },
  },

  /* ---------- 投保規則與給付參數（原工具內建的上下限與比例） ---------- */
  RULES: {
    // 保險年齡：足歲 + （距最近一次生日「超過」6 個月就加 1 歲；剛好 6 個月不加）
    // 所有險種費率、15 歲／70 歲等年齡判斷與畫面顯示的年齡都使用保險年齡
    insuranceAge: { roundUpAfterMonths: 6 },
    maxEntryAge: 70,            // 附約投保年齡上限（超過顯示提醒）；DM：投保年齡 0~70 歲
    ola6: { min: 10, max: 90, terms: ["6", "10", "15", "20"] }, // OLA6 壽險保額（萬元）與可選繳費年期
    adg:  { max: 2000, step: 10 },  // ADG 保額上限（萬元）
    tmr:  { max: 20, adgRatio: 0.1 }, // TMR 保額上限 20 萬，且不超過 ADG 保額 × 10%（無條件捨去）
    adm:  { max: 2000, step: 100 }, // ADM 日額上限（元）
    adh:  { max: 200, mainMultiple: 5, step: 10 }, // ADH 上限 200 萬；另買 OLA6 時不得超過 OLA6 保額 × 5
    maxHospitalDays: 90,        // 骨折情境「實際住院日數」輸入上限
    adhCareRatio: 0.02,         // ADH 意外傷害骨折關懷保險金 = 骨折保險金 × 2%
    admBoneSupportRatio: 0.5,   // ADM 未住院骨折給付 = 剩餘骨折日數 × 日額 × 50%
    burn: { adg: 0.4, adh: 0.25 },  // 重大燒燙傷最高給付比例：ADG 40%、ADH 25%
    disabilityMinRatio: 0.05,   // 意外失能最低給付比例 5%（最高 100%）
  },

  /* ---------- 畫面預設值（開啟網頁時的示範資料） ---------- */
  DEFAULTS: {
    name: "示範客戶", rocBirth: "700101", gender: "female", occupation: 1, payMode: "annual",
    hasExistingMain: false, existingMainChecked: false,
    olaTerm: "20", olaAmount: 10, adgAmount: 200, tmrAmount: 5, admDaily: 2000, adhAmount: 50,
    boneId: "radius", fractureType: "complete", hospitalDaysInput: "5",
  },

  /* ---------- OLA6 金來寶小額終身壽險 ----------
   * 單位：元／每萬元保額（年繳）。年繳保費 = 費率 × 壽險保額(萬)
   * 外層 key = 繳費年期（6 / 10 / 15 / 20 年），內層 key = 年齡
   * 表中沒有的年齡 = 該年期不可投保（畫面會提示改選其他年期） */
  OLA6_RATES: {
    "6": { // 6 年期，年齡 0 ~ 84 歲
       0: { male:  396, female:  355 },
       1: { male:  404, female:  362 },
       2: { male:  412, female:  369 },
       3: { male:  420, female:  377 },
       4: { male:  429, female:  384 },
       5: { male:  437, female:  391 },
       6: { male:  446, female:  400 },
       7: { male:  455, female:  407 },
       8: { male:  464, female:  415 },
       9: { male:  473, female:  424 },
      10: { male:  482, female:  432 },
      11: { male:  492, female:  440 },
      12: { male:  501, female:  450 },
      13: { male:  511, female:  458 },
      14: { male:  521, female:  467 },
      15: { male:  531, female:  477 },
      16: { male:  541, female:  486 },
      17: { male:  551, female:  495 },
      18: { male:  562, female:  505 },
      19: { male:  573, female:  514 },
      20: { male:  584, female:  524 },
      21: { male:  595, female:  535 },
      22: { male:  606, female:  545 },
      23: { male:  618, female:  556 },
      24: { male:  630, female:  566 },
      25: { male:  641, female:  577 },
      26: { male:  654, female:  588 },
      27: { male:  666, female:  601 },
      28: { male:  679, female:  612 },
      29: { male:  693, female:  624 },
      30: { male:  706, female:  636 },
      31: { male:  719, female:  649 },
      32: { male:  732, female:  661 },
      33: { male:  747, female:  674 },
      34: { male:  761, female:  687 },
      35: { male:  775, female:  700 },
      36: { male:  790, female:  714 },
      37: { male:  805, female:  727 },
      38: { male:  819, female:  741 },
      39: { male:  834, female:  756 },
      40: { male:  850, female:  770 },
      41: { male:  866, female:  785 },
      42: { male:  881, female:  800 },
      43: { male:  897, female:  815 },
      44: { male:  913, female:  830 },
      45: { male:  930, female:  846 },
      46: { male:  946, female:  862 },
      47: { male:  963, female:  878 },
      48: { male:  980, female:  895 },
      49: { male:  996, female:  911 },
      50: { male: 1014, female:  929 },
      51: { male: 1031, female:  946 },
      52: { male: 1049, female:  963 },
      53: { male: 1067, female:  981 },
      54: { male: 1085, female: 1000 },
      55: { male: 1103, female: 1018 },
      56: { male: 1121, female: 1036 },
      57: { male: 1141, female: 1055 },
      58: { male: 1159, female: 1074 },
      59: { male: 1178, female: 1094 },
      60: { male: 1198, female: 1113 },
      61: { male: 1217, female: 1134 },
      62: { male: 1237, female: 1154 },
      63: { male: 1257, female: 1175 },
      64: { male: 1277, female: 1196 },
      65: { male: 1297, female: 1217 },
      66: { male: 1318, female: 1239 },
      67: { male: 1338, female: 1261 },
      68: { male: 1358, female: 1283 },
      69: { male: 1379, female: 1305 },
      70: { male: 1400, female: 1327 },
      71: { male: 1421, female: 1350 },
      72: { male: 1442, female: 1372 },
      73: { male: 1463, female: 1394 },
      74: { male: 1484, female: 1417 },
      75: { male: 1500, female: 1440 },
      76: { male: 1515, female: 1462 },
      77: { male: 1531, female: 1483 },
      78: { male: 1547, female: 1506 },
      79: { male: 1561, female: 1529 },
      80: { male: 1577, female: 1550 },
      81: { male: 1592, female: 1572 },
      82: { male: 1608, female: 1593 },
      83: { male: 1615, female: 1609 },
      84: { male: 1618, female: 1612 },
    },
    "10": { // 10 年期，年齡 0 ~ 75 歲
       0: { male:  246, female:  221 },
       1: { male:  252, female:  225 },
       2: { male:  256, female:  230 },
       3: { male:  262, female:  234 },
       4: { male:  266, female:  239 },
       5: { male:  272, female:  244 },
       6: { male:  277, female:  249 },
       7: { male:  283, female:  254 },
       8: { male:  289, female:  258 },
       9: { male:  294, female:  264 },
      10: { male:  301, female:  270 },
      11: { male:  306, female:  274 },
      12: { male:  312, female:  280 },
      13: { male:  319, female:  285 },
      14: { male:  324, female:  291 },
      15: { male:  331, female:  296 },
      16: { male:  337, female:  303 },
      17: { male:  343, female:  308 },
      18: { male:  351, female:  315 },
      19: { male:  357, female:  320 },
      20: { male:  363, female:  327 },
      21: { male:  371, female:  333 },
      22: { male:  378, female:  340 },
      23: { male:  385, female:  346 },
      24: { male:  393, female:  353 },
      25: { male:  400, female:  360 },
      26: { male:  408, female:  367 },
      27: { male:  416, female:  374 },
      28: { male:  423, female:  381 },
      29: { male:  432, female:  389 },
      30: { male:  440, female:  396 },
      31: { male:  449, female:  405 },
      32: { male:  457, female:  412 },
      33: { male:  466, female:  420 },
      34: { male:  475, female:  429 },
      35: { male:  484, female:  436 },
      36: { male:  493, female:  446 },
      37: { male:  503, female:  454 },
      38: { male:  512, female:  462 },
      39: { male:  522, female:  472 },
      40: { male:  531, female:  481 },
      41: { male:  541, female:  489 },
      42: { male:  551, female:  500 },
      43: { male:  561, female:  509 },
      44: { male:  572, female:  518 },
      45: { male:  582, female:  529 },
      46: { male:  593, female:  539 },
      47: { male:  603, female:  548 },
      48: { male:  614, female:  559 },
      49: { male:  625, female:  570 },
      50: { male:  636, female:  580 },
      51: { male:  647, female:  591 },
      52: { male:  658, female:  602 },
      53: { male:  670, female:  613 },
      54: { male:  682, female:  625 },
      55: { male:  693, female:  637 },
      56: { male:  706, female:  649 },
      57: { male:  718, female:  661 },
      58: { male:  731, female:  673 },
      59: { male:  743, female:  686 },
      60: { male:  757, female:  698 },
      61: { male:  770, female:  712 },
      62: { male:  784, female:  725 },
      63: { male:  797, female:  738 },
      64: { male:  812, female:  753 },
      65: { male:  826, female:  767 },
      66: { male:  842, female:  781 },
      67: { male:  856, female:  797 },
      68: { male:  872, female:  812 },
      69: { male:  889, female:  828 },
      70: { male:  906, female:  844 },
      71: { male:  922, female:  861 },
      72: { male:  941, female:  878 },
      73: { male:  959, female:  896 },
      74: { male:  978, female:  914 },
      75: { male:  993, female:  933 },
    },
    "15": { // 15 年期，年齡 0 ~ 65 歲
       0: { male:  172, female:  154 },
       1: { male:  176, female:  157 },
       2: { male:  179, female:  161 },
       3: { male:  183, female:  164 },
       4: { male:  187, female:  166 },
       5: { male:  190, female:  170 },
       6: { male:  194, female:  174 },
       7: { male:  197, female:  177 },
       8: { male:  202, female:  180 },
       9: { male:  206, female:  184 },
      10: { male:  210, female:  188 },
      11: { male:  214, female:  191 },
      12: { male:  218, female:  195 },
      13: { male:  223, female:  200 },
      14: { male:  227, female:  203 },
      15: { male:  231, female:  207 },
      16: { male:  235, female:  212 },
      17: { male:  240, female:  215 },
      18: { male:  244, female:  220 },
      19: { male:  250, female:  224 },
      20: { male:  254, female:  228 },
      21: { male:  259, female:  233 },
      22: { male:  264, female:  238 },
      23: { male:  269, female:  242 },
      24: { male:  275, female:  247 },
      25: { male:  280, female:  251 },
      26: { male:  286, female:  256 },
      27: { male:  291, female:  262 },
      28: { male:  297, female:  266 },
      29: { male:  302, female:  272 },
      30: { male:  308, female:  277 },
      31: { male:  314, female:  283 },
      32: { male:  320, female:  289 },
      33: { male:  326, female:  294 },
      34: { male:  333, female:  300 },
      35: { male:  340, female:  305 },
      36: { male:  346, female:  312 },
      37: { male:  353, female:  317 },
      38: { male:  359, female:  324 },
      39: { male:  366, female:  330 },
      40: { male:  373, female:  337 },
      41: { male:  380, female:  343 },
      42: { male:  387, female:  350 },
      43: { male:  394, female:  356 },
      44: { male:  402, female:  363 },
      45: { male:  409, female:  370 },
      46: { male:  418, female:  377 },
      47: { male:  425, female:  385 },
      48: { male:  432, female:  392 },
      49: { male:  441, female:  399 },
      50: { male:  449, female:  408 },
      51: { male:  457, female:  415 },
      52: { male:  466, female:  423 },
      53: { male:  475, female:  431 },
      54: { male:  483, female:  439 },
      55: { male:  492, female:  448 },
      56: { male:  502, female:  456 },
      57: { male:  512, female:  465 },
      58: { male:  522, female:  474 },
      59: { male:  531, female:  484 },
      60: { male:  542, female:  494 },
      61: { male:  553, female:  504 },
      62: { male:  565, female:  514 },
      63: { male:  576, female:  525 },
      64: { male:  589, female:  536 },
      65: { male:  601, female:  548 },
    },
    "20": { // 20 年期，年齡 0 ~ 60 歲
       0: { male:  135, female:  121 },
       1: { male:  138, female:  123 },
       2: { male:  141, female:  126 },
       3: { male:  144, female:  129 },
       4: { male:  146, female:  131 },
       5: { male:  149, female:  133 },
       6: { male:  153, female:  136 },
       7: { male:  155, female:  139 },
       8: { male:  158, female:  142 },
       9: { male:  162, female:  145 },
      10: { male:  165, female:  147 },
      11: { male:  168, female:  150 },
      12: { male:  171, female:  154 },
      13: { male:  175, female:  157 },
      14: { male:  179, female:  159 },
      15: { male:  181, female:  163 },
      16: { male:  185, female:  166 },
      17: { male:  189, female:  170 },
      18: { male:  192, female:  172 },
      19: { male:  196, female:  176 },
      20: { male:  200, female:  180 },
      21: { male:  204, female:  183 },
      22: { male:  207, female:  186 },
      23: { male:  212, female:  190 },
      24: { male:  216, female:  193 },
      25: { male:  220, female:  198 },
      26: { male:  224, female:  202 },
      27: { male:  229, female:  205 },
      28: { male:  233, female:  209 },
      29: { male:  238, female:  214 },
      30: { male:  242, female:  218 },
      31: { male:  248, female:  222 },
      32: { male:  252, female:  227 },
      33: { male:  257, female:  231 },
      34: { male:  263, female:  236 },
      35: { male:  267, female:  241 },
      36: { male:  273, female:  245 },
      37: { male:  278, female:  250 },
      38: { male:  284, female:  255 },
      39: { male:  289, female:  260 },
      40: { male:  295, female:  265 },
      41: { male:  301, female:  270 },
      42: { male:  306, female:  275 },
      43: { male:  313, female:  281 },
      44: { male:  319, female:  286 },
      45: { male:  325, female:  293 },
      46: { male:  331, female:  298 },
      47: { male:  338, female:  303 },
      48: { male:  344, female:  309 },
      49: { male:  351, female:  316 },
      50: { male:  358, female:  322 },
      51: { male:  365, female:  328 },
      52: { male:  373, female:  335 },
      53: { male:  379, female:  341 },
      54: { male:  388, female:  348 },
      55: { male:  395, female:  356 },
      56: { male:  403, female:  362 },
      57: { male:  413, female:  370 },
      58: { male:  422, female:  378 },
      59: { male:  431, female:  387 },
      60: { male:  441, female:  395 },
    },
  },
};
