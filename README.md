Perlaki András  
CBSDZH  
Kliensoldali Webprogramozás - Ticket-to-ride  
2021/04/11  
Ezt a megoldást Perlaki András, CBSDZH küldte be és készítette a Kliensoldali Webprogramozás kurzus Ticket-to-ride feladatához.  
Kijelentem, hogy ez a megoldás a saját munkám.  
Nem másoltam vagy használtam harmadik féltől származó megoldásokat.  
Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem közzé.  
Az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere (ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja,
hogy mindaddig, amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak jelentős részét - saját munkájaként mutatja be,
az fegyelmi vétségnek számít. A fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.

## Betölthető redux-dev-tool állapotok:

A betölthető állapotokat a _redux_state_presets_ mappa tartalmazza. Sajnos a randomizált keverés miatt öszekavarodnak az értékek. Igyekeztem ezt kiküböszöbölni, de sajnos nem mindig működik, és már nincs időm többet foglalkozni vele.

1. Játék vége:

Az `end_game.json` preset egy olyan állapotot tartalmaz, amiben egy befejezett játék található. Az utlsó jópár lépés visszapörgethető, és egy utolsó lépéssel be lehet fejezni.

2. Cél befejezése:

A 'route_complete.json' presetben az aktív játékossal a Bruxels-Amsterdam útvonalat megépítve sikeresen teljesül az 'Amsterdam - Pamplona' cél. A kék játékos körét végig léptetve a zöld játékos következő körében már látszik is a befejezett cél.
