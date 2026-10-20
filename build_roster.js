// build_roster.js
const fs = require('fs');
const { summary, offices, cadre } = require('./build_admin_data.js');

// We will construct the nominal roll records
const rosterRaw = `1,LO4398,HQ,Filled ,Mr. Muhammad Farooq Rasheed (PMS),Director General Mines & Minerals,,20,20,,,,,,,,,,,,,,
2,LO4398,HQ,Filled ,Mr. Muhammad Irshad,Director Mines & Minerals,,19,19,30879247,MUHAMMAD NAZEER,36401-9379053-5,Sahiwal ,0312-6945847,Male,Promotee ,,01.01.1969,28.07.1990,16.02.2022,06.03.2017,Information Services & Promotion,,
3,LO4398,HQ,Filled ,Mr. Aftab Ahmad,Director Mines & Minerals,,19,19,30379214,MUHAMMAD SAEED,33102-1817096-9,Faisalabad,0333-4401366,Male,Promotee ,,01.12.1975,31.05.2006,01.01.2025,16.08.2023,Small Mines Assistance / Titles,,
4,LO4398,HQ,Filled ,Mr. Ijaz Hadayat,Director Mines & Minerals,,19,19,30411192,MOULVI HADAYAT,35202-2903532-9,Lahore,0336-8700920,Male,Promotee ,,11.11.1978,16.06.2006,01.01.2025,26.12.2022,Administration,,
5,LO4398,HQ,Filled ,Mr. Jamil Haider Shah,Director Mines & Minerals,,18,19,,,,,0334-4126942,Male,S&GAD,,,,18.12.2025,,Minor Minerals,,
6,LO4398,HQ,Filled ,Mr. Asad Ali Shah,Director Mines & Minerals (Resource Mapping),,18,19,30379250,SYED LUTAF ALI SHAH,32102-0933101-3,Lahore,0315 3212514,Male,Promotee ,,03.03.1977,28.04.2006,05.04.2006,25.05.2026,Resource Mapping,"PD ADP Scheme, Manager (RMD)"
7,LO4398,HQ,Vacant,,Director Mines & Minerals,,,19,,,,,,,,,,,,,,
8,LO4398,HQ,Vacant,,Director Geographic Information System (GIS),,,19,,,,,,,,,,,,,,
9,LO4398,HQ,Filled ,Mr. Muhammad Imran Anwar,Deputy Director Mines & Minerals,,18,18,30881197,MUHAMMAD ANWAR,35202-2183537-3,Lahore,0322-4703689,Male,Promotee ,,09.11.1980,08.11.2007,08.03.2017,04.05.2017,Small Mines Assistance / Titles,DD (Auction),
10,LO4398,HQ,Filled ,Mr. Tanveer Ahmad,Deputy Director Mines & Minerals,,18,18,30918325,MUHAMMAD ISMAIL,32102-2668690-1,D.G. Khan,0333-4849606,Male,Promotee ,,10.10.1983,05.12.2007,06.02.2025,06.03.2017,DG Cell,DD (LSM),
11,LO4398,HQ,Filled ,Mr. Umar Farooq,Deputy Director Mines & Minerals,,18,18,31492186,MUHAMMAD AZAM,38403-1509281-1,Sargodha,0332-4571554,Male,Promotee ,,03.05.1987,11.04.2011,24.07.2025,11.11.2020,Small Mines Assistance / Titles,DD (ML-I) + DD (ML-II),
12,LO4398,HQ,Vacant,,Deputy Director Mines & Minerals,,,18,,,,,,,,,,,,,,
13,LO4398,HQ,Filled ,Mr. Muhammad Hafeez,Deputy Director Mines & Minerals,,18,18,31695033,MUHAMMAD SARWAR,35201-6961488-7,Lahore,0332-7736801,Male,Direct,Open,14.01.1985,02.03.2015,19.08.2025,30.01.2025,Minor Minerals,DD (MM),
14,LO4398,HQ,Filled ,Mrs. Sonia Liaqat,Deputy Director Mines & Minerals,,18,18,31680403,UMER FAROOQ,33202-1406003-4,Jhang,0337-0714344,Female,Direct,Women,25.08.1991,02.03.2015,20.03.2015,30.01.2025,,,
15,LO4398,HQ,Filled ,Mr. Shoaib Nasir,Deputy Director Mines & Minerals,,18,18,31504327,NASIR AHMAD,35202-0266193-3,Lahore,0313-4290383,Male,Direct,Open,03.07.1988,10.03.2015,01.10.2024,30.01.2025,,,Presently working as Section Officer (Technical) MMD on attachment
16,LO4398,HQ,Filled ,Mr. Ali Raza Gohar,Deputy Director Mines & Minerals,,18,18,31455987,ABDUL SATTAR,34601-7092256-9,Sialkot,0333-4173941,Male,Direct,Open,02.06.1984,22.06.2009,01.09.2025,26.01.2022,DG Cell,DD (Development),
17,LO4398,HQ,Vacant,,Manager (Information Technology),,,18,,,,,,,,,,,,,,
18,LO4398,HQ,Vacant,,Manager (Geological Mapping),,,18,,,,,,,,,,,,03.05.2017,,
19,LO4398,HQ,Vacant,,Manager (Mineral Data & Geo Chemistry),,,18,,,,,,,,,,,,,,
20,LO4398,HQ,Filled ,Mr. Rizwan Saqib,Manager (GIS & Clients System),,18,18,30411186,AAMAN ULLAH,38403-2184955-9,Sargodha,0336-4112901,Male,Promotee ,,01.01.1983,31.05.2006,30.05.2012,30.05.2012,Information Services & Promotion,"PM (ADP Schemes), Manager GIS",
21,LO4398,HQ,Filled ,Mr. Naveed Ahmad,Manager (Basin Studies),,18,18,31423661,MUHAMMAD ISMAIL,35102-5861310-9,Kasur,0321-8817323,Male,Direct,Open,18.11.1984,04.07.2009,12.10.2019,02.12.2022,Resource Mapping,,
22,LO4398,HQ,Filled ,Mr. Omar Zaman Malik,Manager (Geo-Physics),,18,18,30924958,Zia Safdar Malik,37405-9615604-7,Rawalpindi,0323-5226744,Male,Promotee ,,03.04.1982,01.12.2007,11.11.2020,11.11.2020,,,Resignation tendered by officer pending recovery
23,LO4398,HQ,Filled ,Mr. Rafi Ullah Niazi,Manager (Cartography & Survey),,18,18,30411175,ABDULLAH KHAN,38302-1200509-3,Mianwali,0333-6832762,Male,Promotee ,,15.10.1973,18.07.2006,16.08.2023,18.07.2006,Small Mines Assistance / Titles,DD (Revenue),
24,LO4398,HQ,Vacant,,Manager (Environment Facilitation) (EF),,,18,,,,,,,,,,,,,,
25,LO4398,HQ,Filled ,Mr. Zaheer Abbas,Assistant Director Mines & Minerals,,17,17,31680407,GHULAM RASOOL,38201-9011706-7,Khushab,0343-5536800,Male,Direct,Open,07.07.1991,02.03.2015,02.03.2015,28.11.2019,,,On extraordinary leave (without pay)
26,LO4398,HQ,Filled ,Mr. Ali Sher Butt,Assistant Director Mines & Minerals,,17,17,32123058,MUHAMMAD JAMSHEED BUTT,35202-5566056-3,Lahore,0321-4060690,Male,Direct,Open,02.11.1993,14.03.2019,08.02.2025,16.04.2026,Small Mines Assistance / Titles,AD (ML-I) + AD (ML-II),
27,LO4398,HQ,Filled ,Mrs. Maria Amin,Assistant Director Mines & Minerals,,17,17,31898786,MUHAMMAD AMIN BUTT,36601-5802066-8,Vehari,0336-8666295,Female,Direct,Women,10.02.1992,21.03.2017,21.03.2017,29.05.2020,Minor Minerals,AD (MM-II),
28,LO4398,HQ,Filled ,Mr. Muhammad Ahsan Saleem,Assistant Director Mines & Minerals,,17,17,31894364,SALEEM ASGHER,35201-9682260-9,Lahore,0304-0796695,Male,Direct,Open,28.10.1990,24.03.2017,15.04.2025,29.05.2020,,,On extraordinary leave (without pay)
29,LO4398,HQ,Filled ,Mr. Arslan Haidar,Assistant Director Mines & Minerals,,17,17,32162066,AZHAR KHURSHID,35202-8514526-1,Lahore,0334-4369781,Male,Direct,Special Person,11.12.1993,15.09.2020,24.09.2021,14.10.2024,Administration,AD (Estab.),
30,LO4398,HQ,Filled ,Mr. Danial Javed,Assistant Director Mines & Minerals,,17,17,31896008,MUHAMMAD JAVED,35202-7062155-9,Lahore,0341-8086700,Male,Direct,Open,03.10.1993,25.03.2017,01.10.2024,29.05.2020,,,On Ex-Pakistan leave
31,LO4398,HQ,Filled ,Syed Hammad ul Hassan,Assistant Director Mines & Minerals,,17,17,32293830,SYED IJAZ UL HASSAN,36502-5634346-1,Sahiwal ,0320-6900094,Male,Direct,Open,24.10.1997,02.09.2025,02.09.2025,On Contract,DG Cell,AD (LSM),
32,LO4398,HQ,Filled ,Mr. Saqib Tanveer,Assistant Director Mines & Minerals,,17,17,32121531,TANVEER AHMAD,35401-5140478-7,Sheikhupura,0333-4141830,Male,Direct,Open,03.08.1995,08.03.2019,26.10.2022,14.04.2022,,,On extraordinary leave
33,LO4398,HQ,Filled ,Mrs. Kashifa Zawar,Assistant Director Mines & Minerals,,17,17,32252540,ZAWAR HUSSAIN,37203-3947168-2,Chakwal,0314-4680764,Female,Direct,Women,04.01.1998,18.09.2023,18.09.2023,On Contract,,,At disposal of Admin Department
34,LO4398,HQ,Filled ,Mrs. Tayyaba Abid,Assistant Director Mines & Minerals,,17,17,32252539,ABID NAEEM,34101-8075861-0,Lahore,0309-4244409,Female,Direct,Open,08.05.1996,18.09.2023,18.09.2023,On Contract,DG Cell,AD (ADP Scheme),On Maternity Leave
35,LO4398,HQ,Filled ,Mr. Asad Ameer,Assistant Director Mines & Minerals,,17,17,32140563,AMEER ABDULLAH,38405-8533226-7,Sargodha,0345-5555037,Male,Direct,Open,20.09.1993,26.11.2019,22.03.2023,16.04.2026,,,At disposal of Minister MMD
36,LO4398,HQ,Filled ,Mr. Muhammad Aamir Shafiq,Assistant Director Mines & Minerals,,17,17,31891921,SHAFIQ AHMAD,34502-2711212-3,Narowal,0300-6266622,Male,Direct,Open,04.09.1991,25.03.2017,06.02.2025,29.05.2020,Minor Minerals,AD (MM-I),
37,LO4398,HQ,Filled ,Mr. Sarfraz Ahmad,Assistant Director (Admin),,17,17,30856988,NAZIR AHMED,35202-8789268-7,Sheikhupura,0348-4449373,Male,Promotee ,,04.04.1972,29.06.2006,15.06.2023,16.01.2015,,,At disposal of Admin Department
38,LO4398,HQ,Filled ,Mr. Junaid Ali,Geologist,,17,17,,MUHAMMAD JAVED IQBAL,38403-8990913-9,Sargodha,0345-7339192,Male,Direct,Open,22.03.2000,08.05.2025,02.09.2025,On Contract,Small Mines Assistance / Titles,AD (PL),
39,LO4398,HQ,Filled ,Mr. Adnan Ahmad Kiani,Assistant Director (Appeals),,17,17,32167921,MUHAMMAD RAMZAN KIANI,61101-1997056-9,Rawalpindi,0302-5453939,Male,Direct,Open,02.02.1981,01.02.2021,01.02.2021,09.05.2025,DG Cell,Appeal Section,
40,LO4398,HQ,Filled ,Mr. Zubair Idrees,Deputy Manager (Geological Mapping),,17,17,32074356,MUHAMMAD IDREES,35502-0112395-9,Nankana,0321-4422025,Male,Direct,Open,01.04.1989,18.04.2018,18.04.2018,31.05.2021,Large Scale Mining,AD (LSM),
41,LO4398,HQ,Filled ,Mr. Muhammad Yasin Shafiq,Deputy Manager (Cartography & Survey),,17,17,32090062,MUHAMMAD SHAFIQ,35502-0176646-1,Kasur,0311-4325435,Male,Direct,Open,12.06.1994,28.05.2018,31.05.2018,31.05.2021,Resource Mapping,Field Geologist / Monitoring Officer,ADP Scheme Attock Placer Gold
42,LO4398,HQ,Filled ,Mr. Mhammad Siddique,Deputy Manager (Mineral Data & Geo Chemistry),,17,17,32086562,MUKHTAR AHMAD,36203-6021133-3,Lodhran,0343-6824433,Male,Direct,Open,20.04.1989,16.05.2018,17.05.2018,31.05.2021,Resource Mapping,,
43,LO4398,HQ,Filled ,Mr. Mubasher Ahmad,Deputy Manager (Basin Studies),,17,17,,ZUBAIR AHMAD,35202-7087245-9,Lahore,0312-4723261,Male,Direct,Open,18.09.1985,10.09.2025,10.09.2025,On Contract,Resource Mapping,,
44,LO4398,HQ,Filled ,Mr. Hamza Ameer,Deputy Manager (Geo-Physics),,17,17,,,32402-2293405-3,Rajanpur,0335-3552727,Male,Direct,Open,01.03.1997,03.09.2025,03.09.2026,On Contract,Resource Mapping,,On duty of ADP Scheme in Attock
45,LO4398,HQ,Filled ,Rana Faizan Saleem,Deputy Manager (Environmental Facilitation) (EF),,17,17,32206318,MUHAMMAD SALEEM,35202-2010549-7,Lahore,0312-4267370,Male,Direct,Open,15.11.1994,12.05.2022,12.05.2022,27.06.2025,Environmental Facilitation,DM (EF),
46,LO4398,HQ,Filled ,Mr. Majid Ashraf,Assistant Engineer (Mechanical),18,18,17,30384443,MUHAMMAD ASHRAF,35202-2790152-1,Lahore,0333-4423170,Male,Direct,Open,11.01.1980,31.05.2006,05.12.2022,29.05.2020,DG Cell,MRO + R&I,
47,LO4398,HQ,Filled ,Mr. Umar Rasool,Audit Officer,,17,17,31893373,GHULAM RASOOL,36402-8428422-3,Pakpatan,0308-3743040,Male,Direct,Open,16.04.1992,13.02.2017,13.04.2022,30.10.2025,Administration,Audit Officer,
48,LO4398,HQ,Filled ,Mr. Muhammad Naveed,Account Officer (Budget & Accounts),,17,17,32222180,LIAQAT ALI,36601-1622306-3,Sahiwal ,0302-1318282,Male,Direct,Open,01.11.1987,17.11.2022,17.11.2022,On Contract,Administration,AO (B&A),
49,LO4398,HQ,Filled ,Rana Mubasher Ali,Database Administrator,,17,17,31820004,RANA KARAMAT ALI,31102-0340331-7,Bahawalpur,0344-7396496,Male,Direct,Open,16.08.1991,07.11.2022,07.11.2022,On Contract,DG Cell,IT (Branch),
50,LO4398,HQ,Filled ,Mr. Muhammad Asim Riaz,Network Administrator,,17,17,32294874,MUHAMMAD RIAZ,35201-9842641-1,Lahore,0300-4492618,Male,Direct,Open,27.02.1993,20.10.2025,20.10.2025,On Contract,DG Cell,IT (Branch),
51,LO4398,HQ,Filled ,Mr. Iqbal Hassan,GIS Development Officer,,17,17,32142238,ABDUL SATTAR,34501-7838759-9,Narowal,0330-6899677,Male,Direct,Open,26.05.1993,31.12.2019,31.12.2019,24.07.2023,Information Services & Promotion,GIS Lab,
52,LO4398,HQ,Filled ,Miss Javeriya Nasir,GIS Development Officer,,17,17,32142247,NASIR IQBAL ARSHAD,37101-4276010-4,Attock,0300-5604868,Female,Direct,Women,26.06.1992,31.12.2019,31.12.2019,24.07.2023,Information Services & Promotion,AD (ADP Schemes),
53,LO4398,HQ,Filled ,Mr. Abdul Rehman,GIS Development Officer,,17,17,32142445,BASHIR AHMAD,36601-2738218-5,Vehari,0336-6990019,Male,Direct,Open,13.03.1987,30.12.2019,30.12.2019,24.07.2023,Information Services & Promotion,GIS Lab,
54,LO4398,HQ,Vacant,,GIS Development Officer,,,17,,,,,,,,,,,,,,
55,LO4398,HQ,Filled ,Mr. Sufiyan Ullah,GIS Development Officer,,17,17,,BASHEER AHMAD,,,,Male,Direct,Open,,06.01.2025,06.01.2025,On Contract,Information Services & Promotion,GIS Lab,
56,LO4398,HQ,Filled ,Mr. Afief Tahir,Web GIS Development Officer,,17,17,32243149,MUHAMMAD TAHIR,,,0308-4155075,Male,Direct,Open,04.02.2000,09.05.2023,01.09.2025,On Contract,Information Services & Promotion,GIS Lab,
57,LO4398,HQ,Filled ,Mrs. Asma Saleem,Librarian,,17,17,31601424,MUHAMMAD EHSAN,35202-2690279-0,Lahore,0346-6681682,Female,Direct,Open,25.07.1987,19.04.2013,19.04.2013,24.06.2021,Information Services & Promotion,Library,
58,LO4398,HQ,Filled ,Mr. Aslam Nazir,Superintendent,,17,17,30145621,MUHAMMAD NAZIR,35200-1480992-5,Lahore,0314-4014377,Male,Promotee ,,12.03.1977,26.06.2006,27.06.2006,24.06.2021,Resource Mapping,,Working with Director RMD
59,LO4398,HQ,Vacant,,Superintendent,,,17,,,,,,,,,,,,24.06.2021,,
60,LO4398,HQ,Filled ,Mr. Muhammad Rizwan,Superintendent,,17,17,30074200,MUHAMMAD AMIN,35202-2210665-7,Lahore,0331-4390077,Male,Promotee ,,06.10.1967,11.02.1988,06.02.1988,24.06.2021,Small Mines Assistance / Titles,Auction (Branch),Attached to Lahore Region office for 3 months
61,LO4398,HQ,Filled ,Mr. Muhammad Shafqat,Superintendent,,17,17,30074195,CH MUHAMMAD SHAFI,35202-6254387-5,Lahore,0333-4309730,Male,Promotee ,,18.11.1968,01.02.1989,04.02.1988,11.11.2020,Large Scale Mining,LSM (Branch),
62,LO4398,HQ,Filled ,Mr. Shamas-ud-Din,Superintendent,,17,17,30859911,MANZOOR AHMAD SIAL,35202-2581451-3,Lahore,0323-4207744,Male,Promotee ,,19.05.1979,28.06.2006,28.06.2004,11.11.2020,Minor Minerals,Minor Minerals (Branch),
63,LO4398,HQ,Filled ,Mr. Tariq Aziz,Superintendent,,17,17,30859918,KHUDA BUKHSH,38303-5157379-1,Mianwali,0331-4851677,Male,Promotee ,,16.11.1973,04.07.2006,04.07.2006,29.03.2017,Small Mines Assistance / Titles,PL (Branch),
64,LO4398,HQ,Filled ,Mr. Zulfiqar Ali,Superintendent,,17,17,30074187,MUHAMMAD AMIN,35202-2398500-3,Lahore,0300-4746313,Male,Promotee ,,25.05.1968,18.08.1987,18.08.1987,24.06.2021,Small Mines Assistance / Titles,ML-I (Branch),
65,LO4398,HQ,Filled ,Mr. Muhammad Alam.,Superintendent,,17,17,30092412,CH NOOR MUHAMMAD,35201-1609829-5,Lahore,0321-4961392,Male,Promotee ,,10.08.1968,27.05.1990,07.05.1990,31.05.2024,,,At disposal of Minister MMD
66,LO4398,HQ,Filled ,Mr. Muhammad Aqeel Awan,Superintendent,,15,17,30857103,MUHAMMAD HANIF AWAN,35202-3017505-7,Lahore,0345-4165288,Male,Direct,Open,28.01.1983,03.02.2006,03.02.2006,31.01.2025,DG Cell,,Working under DD (Dev)
67,LO4398,HQ,Vacant,,Superintendent (Budget & Accounts),,,17,,,,,,,,,,,,,,
68,LO4398,HQ,Filled ,Raja Rafique Kamran,Mineral Development Officer,,16,16,30700618,RAJA ABDUL RAZZAQ,37302-7452229-9,Jhelum,0300-5478523,Male,Promotee ,,15.01.1968,04.04.1984,30.08.2023,25.09.2020,,,Attached to DGK office
69,LO4398,HQ,Filled,Mr. Muhammad Zaman,Mineral Development Officer,,16,16,30833372,,35302-1914363-7,,0345-9493786,Male,Promotee ,,10.04.1983,03.09.2007,28.02.2024,22.11.2023,,,Assigned additional duty at DGK office
70,LO4398,HQ,Vacant,,Mineral Development Officer,,,16,,,,,,,,,,,,,,
71,LO4398,HQ,Vacant,,Survey & Drawing Officer,,,16,,,,,,,,,,,,,,
72,LO4398,HQ,Vacant,,Computer Programmer,,,16,,,,,,,,,,,,,,
73,LO4398,HQ,Vacant,,Computer Programmer,,,16,,,,,,,,,,,,,,
74,LO4398,HQ,Vacant,,Account Officer,,,16,,,,,,,,,,,,,,
75,LO4398,HQ,Filled ,Mr. Muhammad Nadeem Aslam,Account Officer,,16,16,30700574,,33104-5180278-1,,0333-4356582,Male,Direct,Open,15.04.1967,04.05.1993,27.11.2024,04.05.1993,,,On LPR
76,LO4398,HQ,Vacant,,Hardware Technician,,,16,,,,,,,,,,,,,,
77,LO4398,HQ,Filled ,Mr. Muhammad Irfan Aslam,Hardware Technician,,16,16,32140566,MUHAMMAD ASLAM,36202-6031365-1,Lodhran,0345-7023915,Male,Direct,Open,20.08.1994,18.11.2019,18.11.2019,24.01.2023,,,Absent from duty since 19.03.2026
78,LO4398,HQ,Filled ,Mr. Sharafat Ali.,Assistant,,16,16,30055913,JAMAIT ALI,35202-2650339-1,Lahore,0322-4517386,Male,Promotee ,,20.03.1975,03.11.1995,08.03.2019,24.01.2023,DG Cell,PA to the DG M&M,
79,LO4398,HQ,Filled ,Mrs. Soofia Athar,Assistant,,16,16,30215357,SHARAFAT ALI,35202-8297772-8,Lahore,0322-4517386,Female,Promotee ,Women,15.01.1986,01.09.2005,08.03.2019,08.03.2019,Large Scale Mining,LSM (Branch),
80,LO4398,HQ,Filled ,Mr. Abdul Jabbar,Assistant,,16,16,30859916,GHULAM QADIR,33100-5275628-5,Faisalabad,0300-9665057,Male,Promotee ,,01.10.1975,01.01.2004,14.07.2020,08.03.2019,Small Mines Assistance / Titles,PL (Branch) + ML-II (Branch),
81,LO4398,HQ,Filled ,Mr. Muhammad Ali.,Assistant,,16,16,30058736,BASHARAT AHMAD,35202-2187296-3,Lahore,0345-4088985,Male,Promotee ,,25.09.1973,22.07.2000,08.03.2019,14.07.2020,Small Mines Assistance / Titles,PL (Branch),
82,LO4398,HQ,Filled ,Mr. Muhammad Ayaz,Assistant,,16,16,31423664,MUHAMMAD RIAZ,35202-7615351-7,Lahore,0321-1759733,Male,Promotee ,,11.01.1990,05.08.2009,14.07.2020,08.03.2019,,,At disposal of Admin Department
83,LO4398,HQ,Filled ,Hafiz Muhammad Shakeel,Assistant,,16,16,30857228,NAZIR HUSSAIN,35202-8626561-7,Lahore,0320-4042506,Male,Promotee ,,04.09.1984,01.01.2004,15.02.2024,14.07.2020,Administration,Caretaker,
84,LO4398,HQ,Filled ,Mr. Rooh-ul-Ameen,Assistant,,16,16,30857201,SALEEM AKHTAR,35202-2941111-5,Lahore,0333-4228577,Male,Promotee ,,06.03.1978,27.06.2006,15.02.2024,15.02.2024,Administration,Audit (Branch),
85,LO4398,HQ,Filled ,Mr. Muhammad Ehsan,Assistant,,16,16,30904936,TARIQ HABIB AHMED SADDIQUE,35202-3209168-3,Lahore,0334-4092449,Male,Promotee ,,24.02.1986,03.09.2007,15.02.2024,15.02.2024,Minor Minerals,Minor Minerals (Branch),
86,LO4398,HQ,Filled ,Rana Aamir Shahzad,Assistant,,16,16,30857117,RANA MUHAMMAD YAMIN,38303-0965375-1,Mianwali,0300-8023636,Male,Promotee ,,20.11.1980,27.06.2006,15.02.2024,15.02.2024,Information Services & Promotion,GIS Lab,Working under Manager GIS
87,LO4398,HQ,Filled ,Mr. Muhammad Yaqoob Khan,Assistant,,16,16,30856999,MUHAMMAD NAWAZ KHAN,38303-0981213-1,Mianwali,0301-1301959,Male,Promotee ,,01.01.1981,27.06.2006,15.02.2024,15.02.2024,Small Mines Assistance / Titles,ML-II (Branch),
88,LO4398,HQ,Filled ,Mr. Muhammad Fiaz,Assistant,,16,16,30856959,MUHAMMAD TUFAIL,36402-8528311-9,Sahiwal ,0306-4241808,Male,Promotee ,,05.03.1986,27.06.2006,03.12.2024,15.02.2024,Administration,P&C (Branch),
94,LO4398,HQ,Filled ,Mr. Muhammad Ismail,Head Draftsman,,15,15,30942664,NOOR MUHAMMAD,38302-7028728-5,Mianwali,0302-4688415,Male,Promotee ,,10.03.1977,04.09.2007,27.11.2024,29.05.2023,Information Services & Promotion,Drawing (Branch),
95,LO4398,HQ,Filled ,Mr. Muhammad Zubair,Stenographer,16,15,15,30856923,KARAMAT ALI,35202-5097750-1,Lahore,0333-4422507,Male,Direct,Open,11.09.1985,26.06.2006,26.06.2006,14.10.2009,Administration,Steno to Dir (Admin),
97,LO4398,HQ,Filled ,Mr. Saddam Hussain,Stenographer,,15,15,31697724,MUHAMMAD ALI SHAHID,35101-0847699-1,Kasur,0300-0099678,Male,Direct,Special Person,01.02.1996,01.06.2015,01.06.2015,01.07.2019,,,On extraordinary leave
98,LO4398,HQ,Filled ,Mrs. Perveen Saleem,Stenographer,16,15,15,30904939,AYYAZ FAHEEM BHATTI,35202-3837347-2,Lahore,0327-4336329,Female,Direct,Women,01.01.1989,03.09.2007,03.09.2007,14.10.2009,Administration,R&I (Branch),
99,LO4398,HQ,Filled ,Mr. Muhammad Babar,Stenographer,16,15,15,30856993,BASHIR AHMAD,33302-9637192-7,T.T Singh,0334-9726219,Male,Direct,Open,10.10.1985,04.07.2006,04.07.2006,14.10.2009,Minor Minerals,Steno to Dir (MM),
110,LO4398,HQ,Filled ,Mr. Muhammad Afzal,Senior Clerk ,,14,14,30857216,MUHAMMAD IBRAHIM,35404-3457882-9,Sheikhupura,0321-4906887,Male,Promotee ,,01.08.1978,05.01.2004,26.04.2019,26.04.2019,Administration,Budget & Account (Branch),Cashier at Hqr's office
111,LO4398,HQ,Filled ,Mr. Muhammad Mehboob,Senior Clerk ,,14,14,30859372,GHULAM MUSTAFA,38303-6993222-7,Mianwali,0333-8891496,Male,Promotee ,,01.05.1985,05.09.2007,26.04.2019,26.04.2019,Small Mines Assistance / Titles,ML-I (Branch),
112,LO4398,HQ,Filled ,Mr. Muhammad Riaz ,Senior Clerk ,,14,14,31461672,MUHAMMAD HAYAT,38201-1195836-1,Khushab,0344-4020900,Male,Promotee ,,15.06.1983,22.07.2010,26.04.2019,26.04.2019,Small Mines Assistance / Titles,Senior Clerk with Dir (SMA / T),
113,LO4398,HQ,Filled ,Hafiz Muhammad Usman,Senior Clerk ,,14,14,32111662,MUHAMMAD HAMID,37201-6999192-5,,0337-4888161,Male,Rule 17-A,,21.11.1994,05.11.2018,31.05.2021,31.05.2021,Small Mines Assistance / Titles,Accounts (Branch),
114,LO4398,HQ,Filled ,Mr. Muhammad Altaf.,Senior Clerk ,,14,14,30877799,MUHAMMAD HANIF,38303-4256077-7,Mianwali,0305-7444976,Male,Promotee ,,01.09.1988,27.06.2007,26.04.2019,26.04.2019,Small Mines Assistance / Titles,Auction (Branch),
115,LO4398,HQ,Filled ,Mr. Muhammad Kamran Latif,Senior Clerk ,,14,14,31691934,ABDUL LATIF,35101-4993809-9,Kasur,0312-4942022,Male,Promotee ,Special Person,05.07.1987,21.05.2015,31.05.2019,31.05.2021,Small Mines Assistance / Titles,PL (Branch),
116,LO4398,HQ,Filled ,Mr. Muhammad Faryad,Senior Clerk ,,14,14,30857195,ALLAH RAKHA,34602-0758281-1,Sialkot,0301-4120522,Male,Promotee ,,13.02.1980,06.01.2004,26.04.2019,26.04.2019,,,On Earned Leave for 06 months
117,LO4398,HQ,Filled ,Mr. Muhammad Imran Latif,Senior Clerk ,,14,14,31635967,MUHAMMAD LATIF,35202-9222919-5,Lahore,0323-8899720,Male,Promotee ,,28.09.1984,27.06.2014,31.05.2021,31.05.2021,Small Mines Assistance / Titles,PL (Branch),
118,LO4398,HQ,Filled ,Mrs. Abida Akbar.,Senior Clerk ,,14,14,30857093,SOHAIL AKBAR,35202-3409710-8,Lahore,0321-4765676,Female,Promotee ,Women,27.11.1986,26.06.2006,26.04.2019,26.04.2019,Administration,P&C (Branch),
125,LO4398,HQ,Filled ,Mr. Muhammad Zubair,Draftsman,,14,14,30833302,MUHAMMAD ANWAR PASHA KHAN,35202-7156228-1,Lahore,0323-4149399,Male,Promotee ,,27.09.1987,03.09.2007,27.05.2015,27.05.2015,,,
127,LO4398,HQ,Filled ,Mr. Muhammad Moeed,Draftsman,,14,14,30857181,MUHAMMAD SAEED,3740-59065626-3,Lahore,0312-5949497,Male,Promotee ,,03.04.1977,01.07.2006,31.05.2021,31.05.2021,Information Services & Promotion,Drawing (Branch),
128,LO4398,HQ,Filled ,Mr. Amjad Hussain,Draftsman,,14,14,31442674,NOOR MUHAMMAD,35201-1465648-1,Kasur,0300-4372147,Male,Promotee ,,06.04.1976,20.02.2010,01.12.2022,01.12.2022,Minor Minerals,Minor Minerals (Branch),
129,LO4398,HQ,Filled ,Mr. Muhammad Iqbal,Draftsman,,14,14,30857165,MUHAMMAD SIDDIQUE,38401-0351054-7,Sargodha,0321-7579376,Male,Promotee ,,10.04.1972,03.07.2006,23.12.2016,23.12.2016,Information Services & Promotion,Drawing (Branch),
130,LO4398,HQ,Filled ,Mr. Zain-ul-Abidin,Draftsman,,14,14,30857183,SAEED HUSSAIN,35202-2181940-9,Lahore,0332-4004578,Male,Promotee ,,05.04.1987,26.06.2006,01.12.2022,01.12.2022,Environmental Facilitation,EF (Branch),
131,LO4398,HQ,Filled ,Mrs. Shabana Babar,Computer Operator,13,13,12,30856969,MUHAMMAD BABAR,35202-8613729-4,Lahore,0323-1414795,Female,Direct,Women,05.01.1986,28.06.2006,14.10.2009,14.10.2025,Small Mines Assistance / Titles,Accounts (Branch),Looking after accounts matters
140,LO4398,HQ,Filled,Mr. Muhammad Rizwan Khan,Royalty Inspector,,11,11,30833337,,38303-1128443-9,,0345-4848032,Male,Direct,Open,07.02.1984,03.09.2007,24.03.2026,,Small Mines Assistance / Titles,Accounts (Branch),Currently working as AO (Major Minerals)
141,LO4398,HQ,Filled ,Mr. Nazar Hussain,Technician,12,12,11,30856982,AHMED YAR,32304-3848760-3,Muzaffargarh,0345- 4439380,Male,Direct,Open,15.07.1974,01.07.2006,01.07.2006,14.10.2009,Large Scale Mining,LSM (Branch),
142,LO4398,HQ,Filled ,Mr. Majid Nawaz,Technician,12,12,11,30859369,MUHAMMAD NAWAZ,34104-7640303-9,Gujrat,0331-4895012,Male,Direct,Open,12.01.1984,05.09.2007,05.09.2007,14.10.2009,,,Attached with office of DD Gujranwala
144,LO4398,HQ,Filled ,Mr. Shahbaz Nafees,Diesel Engine Operator,12,12,11,31442661,NAFEES AHMED BHATTI,35202-9683227-1,Lahore,0321-4194743,Male,Direct,Open,08.01.1985,15.02.2010,24.11.2014,19.01.2015,,,At disposal of Admin Department
145,LO4398,HQ,Filled ,Mr. Ubaid Ur Rehman ,Diesel Engine Operator,,11,11,30859371,MUHAMMAD HANIF,32202-2515780-9,Multan,0346-5506106,Male,Direct,Open,14.04.1981,03.09.2007,06.05.2021,14.10.2009,,,Attached with DD Multan
147,LO4398,HQ,Filled ,Mr. Muhammad Mubashir Mumtaz,Driller,12,12,11,30859370,RANA MUHAMMAD MUMTAZ AHMAD,38403-9774448-3,Sargodha,0346-8660919,Male,Direct,Open,19.07.1987,05.09.2007,05.09.2007,14.10.2009,Small Mines Assistance / Titles,ML-II (Branch),
148,LO4398,HQ,Filled ,Mr. Shakeel Ahmed,Driller,12,12,11,30540140,MUHAMMAD ASLAM,35302-6223023-9,Okara,0321-7080132,Male,Direct,Open,07.07.1984,01.07.2005,01.07.2005,14.10.2209,DG Cell,Appeal Section,
150,LO4398,HQ,Filled ,Mr. Khurram Shahzad,Junior Clerk ,,11,11,32142448,ABDUL GHAFFAR RANA,13101-90590607,Lahore,0333-3882222,Male,Direct,Special Person,02.05.1987,27.11.2019,27.11.2019,22.06.2023,Small Mines Assistance / Titles,Accounts (Branch),
151,LO4398,HQ,Filled ,Mr. Muhammad Asif,Junior Clerk ,,11,11,32135639,MUNIR AHMAD,34502-2559454-3,Sialkot,0331-6523389,Male,Direct,Special Person,05.04.1989,27.11.2019,27.11.2019,22.06.2023,Small Mines Assistance / Titles,Accounts (Branch),
152,LO4398,HQ,Filled ,Mr. Muhammad Ahmed,Junior Clerk ,,11,11,32098252,MUHAMMAD IDREES SHEIKH,35202-8958726-5,Lahore,0307-0475066,Male,Direct,Special Person,20.07.1995,25.06.2018,25.06.2018,21.10.2021,Small Mines Assistance / Titles,ML-II (Branch),
153,LO4398,HQ,Filled ,Mr. Muhammad Haseeb Ali,Junior Clerk ,,11,11,32261039,MURTAZA ALI,35202-0171840-7,Lahore,0321-8805336,Male,Rule 17-A,,07.12.2004,23.02.2024,23.02.2024,23.02.2024,DG Cell,Development (Section),
154,LO4398,HQ,Filled ,Mr. Sharafat Ali.,Junior Clerk ,,11,11,31899691,AMANAT ALI,35202-6343412-3,Lahore,0305-4503439,Male,Direct,Employee,02.08.1996,12.04.2017,12.04.2017,10.02.2025,,,On extraordinary leave
155,LO4398,HQ,Filled ,Mr. Rizwan Niamat,Junior Clerk ,,11,11,31899681,NIAMAT MASIH,35202-7213105-3,Lahore,0302-7244775,Male,Direct,Minority,23.02.1991,13.04.2017,13.04.2017,10.02.2025,,,On Ex-Pakistan leave
156,LO4398,HQ,Filled ,Mr. Muhammad Faizan Ali,Junior Clerk ,,11,11,32142451,MUHAMMAD AYYUB,42301-0503745-3,Lahore,0304-4367499,Male,Direct,Special Person,14.01.1983,27.11.2019,27.11.2019,22.06.2023,Administration,R&I (Branch),
157,LO4398,HQ,Filled ,Mr. Muhammad Awais,Junior Clerk ,,11,11,32142452,AKHTAR ALAM BURNEY,35200-9755730-5,Lahore,0322-4749864,Male,Direct,Special Person,16.06.1995,27.11.2019,27.11.2019,22.06.2023,Information Services & Promotion,GIS Lab,
158,LO4398,HQ,Filled ,Mr. Qasim Masih,Junior Clerk ,,11,11,31810694,MUKHTAR MASIH,35202-6949636-5,Lahore,0301-5032643,Male,Direct,Special Person,04.03.1989,31.05.2016,31.05.2016,10.02.2025,,,At disposal of Admin Department
159,LO4398,HQ,Filled ,Mr. Abdul Rehman,Junior Clerk ,,11,11,31898814,RANA IMRAN KHAN,35202-0123465-1,Lahore,0305-4342077,Male,Direct,Employee,11.05.1995,12.04.2017,12.04.2017,10.02.2025,Small Mines Assistance / Titles,Auction (Branch),
173,LO4398,HQ,Filled ,Mr. Rashid Iqbal,Electrician,7,7,6,31442668,MUHAMMAD IQBAL,35202-2761824-5,Kasur,0301-5032643,Male,Direct,Open,03.05.1980,15.02.2010,20.02.2024,14.03.2014,Administration,Electrician,Solar and electricity management
174,LO4398,HQ,Filled ,Mr. Kaleem Ullah,Electrician,7,7,6,31442687,IMAM BUKHSH,36301-5288706-9,Multan,0300-4203200,Male,Direct,Open,01.05.1976,24.02.2010,03.08.2017,14.03.2014,Administration,Electrician,Solar and electricity management
175,LO4398,HQ,Filled ,Mr. Khurram Shehzad,Electrician,7,7,6,31442689,KHUDA BAKHSH,38201-1066760-1,Khushab,0307-6095635,Male,Direct,Open,29.08.1982,22.02.2010,30.08.2017,14.03.2014,,,Attached to Khushab office
181,LO4398,HQ,Filled ,Mr. Muhammad Azam,Driver,10,10,5,30074217,MUHAMMAD YOUSAF,35202-2270627-7,Lahore,0343-4300557,Male,Direct,Open,01.09.1966,15.05.1989,03.01.2025,01.01.1991,,,On LPR
182,LO4398,HQ,Filled ,Mr. Muhammad Ashraf,Driver,,5,5,31898811,MAQBOOL AHMAD,35202-3871141-3,Lahore,0322-4233274,Male,Direct,Open,01.01.1982,12.04.2017,12.04.2017,04.08.2020,,,At disposal of Chief Minister Office
183,LO4398,HQ,Filled ,Mr. Mazhar Ali,Driver,,5,5,31899694,AMEER ALI,35402-2456005-5,Nankana,0301-3667460,Male,Direct,Open,25.08.1985,13.04.2017,13.04.2017,29.05.2020,DG Cell,Driver,
184,LO4398,HQ,Filled ,Mr. Muhammad Yaqoob Shahid,Driver,,5,5,31900937,MUHAMMAD ALI SHAHID,35101-3013338-5,Kasur,0300-9429790,Male,Direct,Open,09.05.1990,12.04.2017,12.04.2017,29.05.2020,,,At disposal of Admin Department
185,LO4398,HQ,Filled ,Mr. Naveed Ahmad,Driver,,5,5,31967425,ABDUL MATEEN,35202-4514456-9,Lahore,0302-4176284,Male,Direct,Open,05.10.1988,17.07.2017,17.07.2017,04.08.2020,DG Cell,Driver,
186,LO4398,HQ,Filled ,Mr. Bhanwar Ali,Driver,,5,5,31898794,RAO TASAWAR ALI,35201-5428192-7,Lahore,0304-7742045,Male,Direct,Open,10.01.1988,13.04.2017,27.11.2024,23.12.2020,Minor Minerals,Driver,Working under Director MM
187,LO4398,HQ,Filled ,Mr. Shahid Naveed,Driver,6,6,5,30857138,MUHAMMAD ASHRAF,35202-3095851-1,Lahore,0300-8576371,Male,Direct,Open,01.01.1980,27.06.2006,27.06.2006,14.10.2009,Resource Mapping,Driver,At disposal of ADP Scheme Attock
188,LO4398,HQ,Filled ,Mr. Khurram Shahzad,Driver,,5,5,31899684,MUHAMMAD MANSHA,35501-0104958-5,Nankana,0307-4784252,Male,Direct,Open,01.09.1987,13.04.2017,13.04.2017,04.08.2020,,,Working in Lahore Region office
190,LO4398,HQ,Filled ,Mr. Tariq Hussain,Driver,,5,5,31898780,SHER MUHAMMAD,35201-1565061-3,Lahore,0300-4805680,Male,Direct,Open,06.09.1981,13.04.2017,13.04.2017,29.05.2020,DG Cell,Driver,
191,LO4398,HQ,Filled ,Mr. Khizar Abbas,Driver,,5,5,31792818,CH FAYYAZ ABBAS,35202-4076308-3,Lahore,0321-8335555,Male,Direct,Open,16.04.1987,30.04.2016,30.04.2016,29.05.2020,Small Mines Assistance / Titles,Driver,
194,LO4398,HQ,Filled ,Mr. Muhammad Tariq,Helper,6,6,4,30856963,NAZIR AHMAD,35201-1446191-9,Lahore,0334-9899884,Male,Direct,Open,02.04.1983,01.07.2006,01.07.2006,14.10.2009,Administration,Establishment (Branch),
195,LO4398,HQ,Filled ,Mr. Khurram Saleem,Helper,6,6,4,30856930,MUHAMMAD SALEEM BHATTI,35202-9576374-3,Lahore,0321-9421447,Male,Direct,Open,22.11.1981,26.06.2006,26.06.2006,14.10.2009,Information Services & Promotion,,Working with Director ISP
196,LO4398,HQ,Filled ,Mr. Alam Sher,Chainman,3,3,1,30859376,SHER MUHAMMAD,38303-8088830-9,Mianwali,0302-7337046,Male,Direct,Open,25.03.1988,05.09.2007,05.09.2007,14.10.2009,Administration,,Working with Director Admin
197,LO4398,HQ,Filled ,Syed Muhammad Faizan Ali,Chainman,,1,1,32149601,SYED MEHBOOB ALI,35202-1331867-5,Lahore,0303-9538842,Male,Rule 17-A,,24.11.2001,23.04.2020,23.04.2020,23.04.2020,,,At disposal of Minister MMD
198,LO4398,HQ,Filled ,Mr. Muhammad Adeel Anwar,Naib Qasid,,1,1,32049332,MUHAMMAD ANWAR,35202-9687208-5,Lahore,0303-4173940,Male,Direct,Special Person,30.11.1990,15.12.2017,15.12.2017,26.01.2021,,,At disposal of Admin Department
199,LO4398,HQ,Filled ,Mr. Muhammad Hamid,Naib Qasid,,1,1,31900163,MUHAMMAD ASHRAF,35202-8172765-7,Lahore,0308-4104596,Male,Direct,Employee,29.12.1989,12.04.2017,12.04.2017,29.05.2020,,,At disposal of Admin Department
200,LO4398,HQ,Filled ,Hafiz Muhammad Imran,Naib Qasid,,1,1,32049335,RIASAT ALI,35201-9371011-9,Lahore,0324-4558094,Male,Direct,Open,20.06.1986,08.12.2017,08.12.2017,26.01.2021,,,At disposal of Admin Department
201,LO4398,HQ,Filled ,Syed Ali Raza Zaidi,Naib Qasid,,1,1,31947984,,35202-2528327-1,,0307-9500570,Male,Direct,Open,09.02.1999,26.08.2017,27.02.2025,,Administration,R&I (Branch),
202,LO4398,HQ,Filled ,Hafiz Muhammad Mudasser,Naib Qasid,,1,1,32049340,MUHAMMAD SHARIF,35202-2212346-5,Lahore,0302-5308754,Male,Direct,Open,01.01.1988,08.12.2017,08.12.2017,26.01.2021,DG Cell,,
203,LO4398,HQ,Filled ,Mrs. Agnus Saleem,Naib Qasid,,1,1,31900929,ALEEM MASIH,35202-7480059-2,Lahore,0324 7254909,Female,Direct,Minority,14.08.1995,13.04.2017,13.04.2017,29.05.2020,Administration,P&C (Branch),
204,LO4398,HQ,Filled ,Mrs. Ayesha Gulshan,Naib Qasid,,1,1,31898812,NAVEED AHMAD,35404-2632093-8,Sheikhupura,0307-0050783,Female,Direct,Women,01.05.1986,12.04.2017,12.04.2017,29.05.2020,Small Mines Assistance / Titles,ML-I (Branch),
205,LO4398,HQ,Filled ,Mrs. Ishrat Fatima,Naib Qasid,,1,1,31900064,IMRAN MUNIR,35201-1091177-6,Lahore,0322-3881933,Female,Direct,Women,13.03.1993,12.04.2017,12.04.2017,29.05.2020,,,On Ex-Pakistan leave
206,LO4398,HQ,Filled ,Mrs. Kalsoom Bibi,Naib Qasid,,1,1,32033186,MUHAMMAD RIAZ,35202-6223371-8,Lahore,0301-0013804,Female,Direct,Women,04.02.1986,13.12.2017,13.12.2017,26.01.2021,Small Mines Assistance / Titles,ML-I (Branch),Working as JC (BS-11) on CCB
207,LO4398,HQ,Filled ,Mrs. Nagina Maqsood,Naib Qasid,,1,1,31899690,SHAMAS DIN,35102-6815751-6,Kasur,0303-2528677,Female,Direct,Women,03.05.1985,13.04.2017,13.04.2017,29.05.2020,Small Mines Assistance / Titles,PL (Branch),
208,LO4398,HQ,Filled ,Miss Sidra Hafeez,Naib Qasid,,1,1,31898808,MUHAMMAD HAFEEZ,35202-9317227-6,Kasur,0334-4973347,Female,Direct,Women,10.10.1992,13.04.2017,13.04.2017,29.05.2020,Administration,Establishment (Branch),
209,LO4398,HQ,Filled ,Mrs. Sobia Hanif,Naib Qasid,,1,1,31898809,MUHAMMAD HANIF,35104-0645613-2,Lahore,0300-9847270,Female,Direct,Women,08.05.1993,13.04.2017,13.04.2017,23.12.2020,Information Services & Promotion,GIS Lab,
210,LO4398,HQ,Filled ,Mrs. Sumaira Rashid,Naib Qasid,,1,1,31898791,RASHID HASSAN,35201-0856585-8,Lahore,0324-1048789,Female,Direct,Women,14.08.1993,14.04.2017,14.04.2017,29.05.2020,Administration,R&I (Branch),
211,LO4398,HQ,Filled ,Mrs. Uzma Shahzadi,Naib Qasid,,1,1,32019533,MUHAMMAD AJMAL,35404-8771887-2,Sheikhupura,0300-8063337,Female,Direct,Women,01.01.1985,08.12.2017,08.12.2017,26.01.2021,Small Mines Assistance / Titles,Auction (Branch),
212,LO4398,HQ,Filled ,Mr. Adil Paul,Naib Qasid,3,3,1,30856939,SALEEM NAWAB,35202-5072386-9,Lahore,0304-4282254,Male,Direct,Special Person,15.12.1982,26.06.2006,26.06.2006,14.10.2009,Resource Mapping,,RMD & EF Division
213,LO4398,HQ,Filled ,Mr. Adil Shabir,Naib Qasid,,1,1,32049321,MUHAMMAD SHABIR,35201-7427151-5,Lahore,0322-8463044,Male,Direct,Open,03.01.1992,18.12.2017,18.12.2017,26.01.2021,,,At disposal of Minister MMD
214,LO4398,HQ,Filled ,Mr. Ali Raza,Naib Qasid,3,3,1,30856945,SAJJAD HUSSAIN SHAH,35202-2099539-9,Lahore,0322-8463044,Male,Direct,Open,15.12.1987,26.06.2006,26.06.2006,14.10.2009,DG Cell,,
215,LO4398,HQ,Filled ,Mr. Arslan Riaz,Naib Qasid,,1,1,31898790,RIAZ MASIH,35201-1427112-5,Lahore,0320-1436900,Male,Direct,Minority,31.08.1995,12.04.2017,12.04.2017,29.05.2020,Administration,R&I (Branch),
217,LO4398,HQ,Filled ,Mr. Danish Ali,Naib Qasid,,1,1,32049325,MUHAMMAD USMAN,35202-8447148-9,Lahore,0310-4978040,Male,Direct,Employee,08.07.1996,08.12.2017,08.12.2017,26.01.2021,Large Scale Mining,LSM (Branch),
218,LO4398,HQ,Filled ,Mr. Ghulam Murtaza,Naib Qasid,,1,1,31899686,GHULAM MUSTAFA,35201-7101088-5,Lahore,0312-4466633,Male,Direct,Employee,01.11.1987,12.04.2017,12.04.2017,29.05.2020,Small Mines Assistance / Titles,,At disposal of SMA Division
219,LO4398,HQ,Filled ,Mr. Hamza Khalid,Naib Qasid,,1,1,32049338,MUHAMMAD SADIQ,35202-5460542-3,Lahore,0322-4396887,Male,Direct,Open,07.06.1985,15.12.2017,15.12.2017,26.01.2021,Administration,Admin (Branch),
220,LO4398,HQ,Filled ,Mr. Hamza Shahid,Naib Qasid,,1,1,32049323,RANA SHAHID IQBAL,35201-6659736-3,Lahore,0321-4170136,Male,Direct,Open,01.08.1997,15.12.2017,15.12.2017,26.01.2021,Resource Mapping,,Working with Director RMD
221,LO4398,HQ,Filled ,Mr. Imdad Hussain,Naib Qasid,,1,1,32049329,MUHAMMAD SALEHAEEN QURESHI,35202-2657849-9,Lahore,0309-1441618,Male,Direct,Special Person,29.12.1982,08.12.2017,08.12.2017,26.01.2021,Minor Minerals,Minor Minerals (Branch),
222,LO4398,HQ,Filled ,Mr. Imran Hussain,Naib Qasid,3,3,1,30859920,IMADAD HUSSAIN,35201-3921796-5,Lahore,0324-4101453,Male,Direct,Open,19.09.1976,06.01.2004,06.01.2004,14.10.2009,Minor Minerals,,Working with Director MM
223,LO4398,HQ,Filled ,Mr. Joseph Masih,Naib Qasid,,1,1,32049343,HAMEED MASIH,35201-0772450-7,Faisalabad,0300-6534865,Male,Direct,Minority,08.06.1992,12.12.2017,12.12.2017,26.01.2021,Environmental Facilitation,,Working with Dir (SMA/T)
224,LO4398,HQ,Filled ,Mr. Khawar Ramzan,Naib Qasid,,1,1,31899688,ZAHOOR AHMAD,35402-0565599-5,Nankana,0344-1143062,Male,Direct,Open,04.01.1985,13.04.2017,13.04.2017,23.12.2020,,,Attached with Lahore Region
225,LO4398,HQ,Filled ,Mr. Khurram Shahzad,Naib Qasid,,1,1,31810697,MUHAMMAD BOOTA,35202-6190401-9,Lahore,0308-8407107,Male,Direct,Special Person,18.11.1990,31.05.2016,31.05.2016,27.11.2019,Small Mines Assistance / Titles,Accounts (Branch),
226,LO4398,HQ,Filled ,Mr. Dilawar Liaqat,Naib Qasid,,1,1,32222143,LIAQAT ALI,35501-0683950-5,Nankana,0304-4960925,Male,Rule 17-A,,01.01.2000,07.11.2022,07.11.2022,04.11.2022,,,At disposal of Admin Department
227,LO4398,HQ,Filled ,Mr. Muhammad Adeel,Naib Qasid,,1,1,32049316,KHALIL AHMAD,35303-1806171-3,Okara,0301-4157413,Male,Direct,Open,15.01.1990,08.12.2017,08.12.2017,26.01.2021,Environmental Facilitation,,Working with EF Division
228,LO4398,HQ,Filled ,Mr. Muhammad Amjad,Naib Qasid,,1,1,31899683,MUHAMMAD YAQOOB,35201-1465648-1,,0302 4067767,Male,Direct,Open,08.10.1993,13.04.2017,13.04.2017,26.01.2021,,,At disposal of Admin Department
229,LO4398,HQ,Filled ,Mr. Muhammad Haroon,Naib Qasid,,1,1,32049334,GHULAM MUSTAFA,35401-6832825-9,Lahore,0302 7570380,Male,Direct,Open,25.07.1993,05.12.2017,05.12.2017,26.01.2021,,,
230,LO4398,HQ,Filled ,Mr. Waqar Maqsood,Naib Qasid,,1,1,3189779,MAQSOOD AHMAD,35202-0990804-1,Lahore,0324-9534620,Male,Direct,Open,19.08.1988,13.04.2017,13.04.2017,29.05.2020,Administration,Budget & Account (Branch),
231,LO4398,HQ,Filled ,Mr. Muhammad Waqar ,Naib Qasid,,1,1,32049337,MUHAMMAD AKRAM,35202-2932837-9,Lahore,N/A,Male,Direct,Employee,06.10.1993,13.12.2017,13.12.2017,26.01.2021,DG Cell,,Working with DD (Dev)
232,LO4398,HQ,Filled ,Mr. Rafaqat Mughal,Naib Qasid,3,3,1,30058931,INAYAT MASIH,35202-8364317-3,Lahore,0320-6081569,Male,Direct,Open,25.06.1972,01.02.2001,01.02.2001,01.02.2001,,,
233,LO4398,HQ,Filled ,Mr. Roger,Naib Qasid,,1,1,32049315,RAFAQAT MUGHAL,35202-9718521-1,Lahore,0320-6081569,Male,Direct,Employee,16.06.1999,08.12.2017,08.12.2017,26.01.2021,Small Mines Assistance / Titles,ML-II (Branch) & PL (Branch),
234,LO4398,HQ,Filled ,Mr. Thomson Ashraf,Naib Qasid,,1,1,32049342,ASHRAF NANAK,35202-1585553-3,Lahore,0344-4779998,Male,Direct,Minority,19.12.1985,11.12.2017,11.12.2017,26.01.2021,DG Cell,IT (Section),
235,LO4398,HQ,Filled ,Mr. Zahid Ur Rehman ,Naib Qasid,3,3,1,30859913,FAZAL UR REHMAN,35200-1404268-7,Lahore,0306-4608026,Male,Direct,Open,01.07.1982,31.12.2003,31.12.2003,14.10.2009,DG Cell,Appeal Section,
236,LO4398,HQ,Filled ,Mr. Babar Liaqat,Naib Qasid,,1,1,32049320,LIAQAT ALI,35501-0586352-3,Nankana,0308-4515794,Male,Direct,Employee,10.09.1998,15.12.2017,15.12.2017,26.01.2021,Administration,Gatekeeper,
238,LO4398,HQ,Filled ,Mr. Maqbool Ahmad,Naib Qasid,2,2,1,30856935,MUHAMMAD ALI,31203-1711182-7,Bahawalpur,0301-6007362,Male,Direct,Open,12.11.1982,26.06.2006,26.06.2006,14.10.2009,,,Attached to Bahawalpur office
244,LO4398,HQ,Filled ,Mr. Muhammad Shahzad,Chowkidar,,1,1,31810703,ABDUL GHAFOOR,35201-3814192-3,Lahore,0323-0426094,Male,Direct,Special Person,01.01.1988,31.05.2016,31.05.2016,26.01.2021,Administration,Chowkidar (Day Shift),
245,LO4398,HQ,Filled ,Mr. Muhammad Kamran,Chowkidar,,1,1,32049327,RANA MUHAMMAD YAMIN,38303-0327858-1,Mianwlai,0323-0426094,Male,Direct,Open,06.09.1988,08.12.2017,08.12.2017,27.112019,Administration,Chowkidar (Night Shift),
247,LO4398,HQ,Filled ,Mr. Riaz Masih,Sweeper,5,5,1,30045307,YOUNAS MASIH,35201-3648369-7,Lahore,0331-1456653,Male,Direct,Open,27.05.1968,08.02.1993,08.02.1993,27.112019,,,At disposal of Admin Department
248,LO4398,HQ,Filled ,Mrs. Tanzilla,Sweeper,,1,1,31861466,KASHIF MASIH,36104-5279050-5,Lahore,0302-9627345,Female,Direct,Open,20.03.1979,01.09.2016,01.09.2016,08.02.1993,Administration,,
249,LO4398,HQ,Filled ,Mr. Muhammad Majeed,Sweeper,,1,1,31857721,GHULAM SARWAR,35201-5978940-1,Lahore,0305-4169589,Male,Direct,Open,19.09.1985,01.09.2016,01.09.2016,27.112019,Administration,,
250,LO4398,HQ,Filled ,Mr. Muhammad Muzamil,Sweeper,,1,1,32049319,MUHAMMAD ASHIQ,35201-7167182-5,Lahore,0301-2520327,Male,Direct,Special Person,02.01.1995,13.12.2017,13.12.2017,27.112019,Administration,,
251,LO4398,HQ,Filled ,Mr. Nabeel Masih,Sweeper,,1,1,31861439,SABIR MASIH,35202-4295084-1,Lahore,0308-4173776,Male,Direct,Open,05.11.1994,01.09.2016,01.09.2016,26.01.2021,,,At disposal of Minister MMD
252,LO4398,HQ,Filled ,Mr. Allah Ditta,Sweeper,,1,1,31861453,JAGAH MASIH,35202-2471810-9,Lahore,0304-8141970,Male,Direct,Open,01.09.1982,01.09.2016,01.09.2016,27.112019,,,
253,LO4398,HQ,Filled ,Mr. Mushtaq Masih ,Sweeper,,1,1,31861446,GULZAR,35202-6051190-7,Lahore,0323-4424340,Male,Direct,Open,18.03.1988,01.09.2016,01.09.2016,27.112019,,,At disposal of Admin Department
256,KB4001,Khushab Office,Filled,Mr. Zahid Khan Bahadar,Deputy Director Mines & Minerals,,18,18,31900354,SHER KHAN,38302-7975392-1,Mianwali,0303-9831407,Male,Direct,Open,12.11.1986,24.03.2017,20.03.2025,26.01.2022,,,
257,KB4001,Khushab Office,Filled,Mr. Muhammad Zeeshan,Assistant Director Mines & Minerals,,17,17,32251453,MUHAMMAD NAWAB KHAN,38201-2244323-9,Khushab,0306-9669173,Male,Direct,Open,10.11.1993,28.09.2023,06.01.2025,On Contract,,,
258,KB4001,Khushab Office,Filled,Mr. Muhammad Adnan Khan,Geologist,,17,17,32267413,GHULAM ASGHAR,32103-2272524-7,D.G. Khan,0306 9764313,Male,Direct,Open,05.04.1998,05.09.2025,02.09.2025,On Contract,,,
260,KB4001,Khushab Office,Filled,Mr. Muhammad Mumtaz,Survey & Drawing Officer,,16,16,30857157,,35202-2677356-5,,0300-4102950,Male,Promotee ,,04.04.1978,28.06.2006,10.10.2022,09.05.2025,,,
261,KB4001,Khushab Office,Filled,Mr. Muhammad Sajjad Akhtar,Assistant,,16,16,30916640,,38302-1182697-3,,0301-3959006,Male,Promotee ,,01.04.2004,17.01.1983,12.11.2022,14.04.2022,,,
264,KB4001,Khushab Office,Filled,Mr. Sami Ullah Khan,Senior Clerk,,14,14,30499720,,38303-0981224-9,,0302-8139965,Male,Promotee ,,06.10.2016,20.04.1982,09.05.2023,,,,
280,KB4001,Khushab Office,Filled,Mr. Aziz Ahmad,Driver,,5,5,31425435,,38201-7488693-3,,0301-3065151,Male,Direct,Open,17.02.2010,15.11.1979,31.03.2018,,,,
281,KB4001,Khushab Office,Filled,Mr. Ahmad Nawaz,Driver,,5,5,31900933,,38201-1195836-5,,0300-3893102,Male,Direct,Open,14.07.2017,20.02.1975,13.09.2013,,,,
283,KB4001,Khushab Office,Filled,Mr. Ansar Naseer,Sweeper,,1,1,32081919,,38201-7099844-7,,0302-6739868,Male,Direct,Minority,12.04.2018,02.09.1993,14.04.2018,,,,
284,KB4258,Khushab Office,Filled,Mr. Muhammad Arslan,Naib Qasid,,1,1,31900921,,38302-5418952-1,,0304-0645216,Male,Direct,Open,17.04.2017,13.07.1997,20.05.2019,,,,
285,KB4258,Khushab Office,Filled,Mr. Rafaqat Hussain,Naib Qasid,,1,1,32081208,,38201-6184071-5,,0344-7497797,Male,Direct,Open,16.04.2018,20.01.1992,16.04.2018,,,,
286,KB4258,Khushab Office,Filled,Mr. Shakeel Ahmad,Naib Qasid,,1,1,32081213,,38201-5158239-7,,0308-7000283,Male,Direct,Open,16.04.2018,20.11.1988,16.04.2018,,,,
287,KB4258,Khushab Office,Filled,Mr. Naeem Ullah,Naib Qasid,,1,1,31883840,,38302-5433134-5,,0301-2897791,Male,Direct,Employee,06.03.2017,26.07.1993,01.08.2018,,,,
288,KB4258,Khushab Office,Filled,Mr. Muhammad Kaleem,Naib Qasid,,1,1,32037484,,38201-3550352-3,,0305-6461710,Male,Direct,Open,26.01.2018,07.06.1993,29.11.2018,,,,
292,KB4258,Khushab Office,Filled,Mr. Ghulam Shabir,Chainman,2,2,1,30933232,,38303-7763348-3,,0308-7117982,Male,Direct,Open,01.07.2006,18.05.1976,23.05.2014,,,,Working as JC on CCB
293,KB4258,Khushab Office,Filled,Mr. Aamir Ali,Chainman,,1,1,32081909,,38403-7115156-3,,0344-4158784,Male,Direct,Employee,12.04.2018,10.09.1994,12.04.2018,,,,
294,KB4258,Khushab Office,Filled,Mr. Muhammad Amjad Ali,Chainman,,1,1,32081906,,38201-9676271-5,,0300-7246310,Male,Direct,Open,14.04.2018,01.01.1991,14.04.2018,,,,
296,KB4258,Khushab Office,Filled,Mr. Muhammad Abdullah,Chainman,,1,1,32081898,,38202-7410431-5,,0315-1713517,Male,Direct,Open,14.04.2018,20.03.1996,14.04.2018,,,,
297,KB4258,Khushab Office,Filled,Mr. Ameer Haider,Chainman,,1,1,32075709,,38404-0931969-3,,0301-3069400,Male,Direct,Open,19.03.2018,01.09.1994,02.02.2021,,,,
299,CT4002,Chiniot Office,Filled,Mr. Muhammad Fahad Akbar,Assistant Director Mines & Minerals,,17,17,31898784,ALI AKBAR RANA,35201-1608338-7,Lahore,0321-4290553,Male,Direct,Open,12.09.1993,21.03.2017,24.07.2025,29.05.2020,,,
300,CT4002,Chiniot Office,Filled,Mr. Tariq Mehmood Awan,Mineral Development Officer,,16,16,30700718,ATTA RASOOL,38404-0983553-1,Sargodha,0300-6024979,Male,Promotee ,,09.02.1968,01.07.2006,20.02.2025,,,,
302,CT4002,Chiniot Office,Filled,Mr. Mian Khan,Stenographer,,15,15,30877296,,33201-3862663-7,,0309-1955609,Male,Direct,Open,30.04.1982,03.07.2006,03.07.2006,,,,
303,CT4002,Chiniot Office,Filled,Mr. Saqlain Hussain Shah,Senior Clerk,,14,14,30515004,,38403-2138624-1,,0342-2791575,Male,Promotee ,,06.10.1969,12.07.1990,03.07.2017,,,,
308,CT4002,Chiniot Office,Filled,Mr. Imtiaz,Driver,,5,5,31675528,,33201-6471969-7,,0341-4378415,Male,Rule 17-A,,05.04.1988,14.01.2015,14.01.2015,,,,
309,CT4002,Chiniot Office,Filled,Mr. Ramooz Iqbal,Naib Qasid,,1,1,32075704,,33303-8908449-5,,0341-4890302,Male,Direct,Open,05.05.1992,13.03.2018,13.01.2025,,,,
311,CT4002,Chiniot Office,Filled,Mr. Muhammad Ashraf Ali,Chowkidar,,1,1,30877775,,33201-8201460-5,,0342-7951916,Male,Direct,Special Person,18.04.1975,16.07.2002,16.07.2002,,,,
312,CT4002,Chiniot Office,Filled,Mr. Muhammad Ahsan Khalid,Chainman,,1,1,32051171,,38403-7089882-7,,0308-2738987,Male,Direct,Open,24.05.1996,08.02.2018,30.04.2022,,,,Working at DD Sargodha as JC on CCB
313,DG4075,D.G. Khan Office,Filled,Mr. Muhammad Abrar Ahmad,Deputy Director Mines & Minerals,,18,18,30967861,MUHAMMAD IFTIKHAR AHMAD,34601-2994336-9,Sialkot,0302-5012446,Male,Promotee ,,20.08.1983,07.11.2007,04.01.2025,06.03.2017,,,
314,DG4075,D.G. Khan Office,Filled,Mr. Moin Khan,Assistant Director Mines & Minerals,,17,17,,MUHAMMAD KHAN,,,0320-9796435,Male,Direct,Open,06.06.1994,08.09.2025,02.09.2025,On Contract,,,
317,DG4075,D.G. Khan Office,Filled,Mr. Muhammad Hafeez,Survey & Drawing Officer,,,16,,MUHAMMAD AJMAL,38301-9278345-7,,,Male,Direct,Open,10.05.1987,22.06.2026,22.06.2026,On Contract,,,
320,DG4075,D.G. Khan Office,Filled,Mr. Muhammad Zohaib Haider,Senior Clerk,,14,14,32000180,,32103-2509136-5,,0333-8585390,Male,Promotee ,,05.03.1997,01.11.2017,13.03.2024,,,,
330,DG4075,D.G. Khan Office,Filled,Mr. Tariq Farooq Alvi,Royalty Inspector,13,13,11,30514992,,38403-0806155-5,,0307-6747526,Male,Direct,Open,09.02.1968,14.11.1989,26.12.2024,,,,Attached with SSM Khushab
331,DG4075,D.G. Khan Office,Filled,Mr. Liaqat Ali,Junior Clerk,,11,11,30700718,,32103-3419023-5,,0345-7618668,Male,Promotee ,,01.12.1981,10.07.2006,25.08.2025,,,,
334,DG4075,D.G. Khan Office,Filled,Mr. Shahbaz Hussain,Chainman,,1,1,31883786,,32102-6242347-7,,0341-6447688,Male,Direct,Open,17.04.1989,01.03.2017,01.09.2018,,,,
335,DG4075,D.G. Khan Office,Filled,Mr. Muhammad Siddique,Chainman,,1,1,32000204,,32102-2977460-5,,0336-6266600,Male,Direct,Open,04.01.1986,01.11.2017,01.11.2017,,,,
336,DG4075,D.G. Khan Office,Filled,Mr. Abdul Waheed,Chainman,,1,1,32000195,,32101-8522855-5,,0336-8619605,Male,Direct,Employee,01.01.1997,01.11.2017,01.11.2017,,,,
337,DG4075,D.G. Khan Office,Filled,Mr. Muhammad Khalil,Chainman,,1,1,32000211,,32402-0419525-3,,0347-6713527,Male,Direct,Open,23.01.1990,01.11.2017,01.11.2017,,,,
339,DG4075,D.G. Khan Office,Filled,Mr. Zubair Ahmad,Naib Qasid,,1,1,32000010,,32102-7594528-1,,0313-6716790,Male,Direct,Open,25.12.1989,01.11.2017,01.11.2017,,,,
340,DG4075,D.G. Khan Office,Filled,Hafiz Abdul Karim,Naib Qasid,,1,1,32000150,,32102-0497295-9,,0330-8345151,Male,Direct,Open,25.08.1995,01.11.2017,01.11.2017,,,,
341,DG4075,D.G. Khan Office,Filled,Mr. Muzamil Sardar,Naib Qasid,,1,1,32000171,,32102-9694981-3,,0334-0729782,Male,Direct,Employee,17.10.1988,01.11.2017,01.11.2017,,,,
342,DG4075,D.G. Khan Office,Filled,Mr. Muhammad Saleem,Naib Qasid,,1,1,31716309,,32103-7778383-3,,0345-7028373,Male,Direct,Special Person,12.11.1988,19.05.2015,19.05.2015,,,,
343,DG4075,D.G. Khan Office,Filled,Mr. Zahid Abbas,Naib Qasid,,1,1,32000179,,32102-0185864-3,,0332-6220608,Male,Direct,Employee,18.08.1994,01.11.2017,01.11.2017,,,,
344,DG4075,D.G. Khan Office,Filled,Mr. Zafar Iqbal,Naib Qasid,,1,1,32083156,,32103-2139255-7,,0332-7109998,Male,Direct,Open,07.01.1983,14.02.2018,28.11.2022,,,,
345,DG4075,D.G. Khan Office,Filled,Mrs. Rabia Bibi,Naib Qasid,,1,1,32000165,,32102-9591915-2,,0334-6785285,Female,Direct,Women,06.05.1985,01.11.2017,01.11.2017,,,,
348,DG4075,D.G. Khan Office,Filled,Mr. Muhammad Waseem Abbas,Sweeper,,1,1,32114179,,32102-3335730-5,,0332-6220608,Male,Rule 17-A,,10.08.1985,23.10.2018,23.10.2018,,,,
349,DG4075,D.G. Khan Office,Filled,Mr. Muhammad Usman,Chowkidar,,1,1,31883756,,32102-4887176-1,,0316-6727921,Male,Direct,Open,23.05.1988,01.03.2017,21.08.2019,,,,
350,SL4094,Sahiwal Office,Filled,Mr. Hammad Hussain,Assistant Director Mines & Minerals,,17,17,32206312,TARIQ MEHMOOD,33101-2464616-7,Faisalabad,0346 7686570,Male,Direct,Open,01.08.1994,13.04.2022,01.11.2023,09.05.2025,,,
351,SL4094,Sahiwal Office,Filled,Mr. Muhammad Ali Imran,Mineral Development Officer,,16,16,,MUHAMMAD KHAN,37405-9145925-5,Rawalpindi,0342-0666247,Male,Direct,Open,30.01.1996,25.11.2025,25.11.2025,On Contract,,,
354,SL4094,Sahiwal Office,Filled,Mr. Zeshan Sarwar,Senior Clerk,,14,14,30433382,,36502-0451870-5,,0300-9697688,Male,Promotee ,,18.05.1985,14.10.2009,01.07.2006,,,,
360,SL4405,Sahiwal Office,Filled,Mr. Umer Hayat,Chainman,,1,1,32081901,,36502-5229521-9,,0321-7282447,Male,Direct,Open,31.12.1989,12.04.2018,27.09.2018,,,,
361,MI4001,Mianwali Office,Filled,Mr. Usman Umar Tabassum,Deputy Director Mines & Minerals,,18,18,31681122,UMAR HAYAT,38405-7513357-5,Sargodha,0301-8467404,Male,Direct,Open,13.11.1987,01.03.2015,24.07.2025,30.01.2025,,,
362,MI4001,Mianwali Office,Filled,Mr. Saleem Ullah,Assistant Director Mines & Minerals,,17,17,32122293,MAZHAR HAFEEZ TAHIR,35401-3579602-3,Lahore,0331-4803930,Male,Direct,Open,29.05.1994,13.03.2019,24.07.2025,14.04.2022,,,
364,MI4001,Mianwali Office,Filled,Mr. Mehmood Arshad,Mineral Development Officer,,16,16,30967623,,61101-7682125-7,,0344-7457717,Male,Promotee ,Open,25.12.1973,30.06.2006,01.12.2023,,,,
365,MI4001,Mianwali Office,Filled,Rana Atif Shahzad,Assistant,,16,16,30702139,,38303-3502678-9,,0302-6020178,Male,Promotee ,Open,01.02.1986,13.09.2007,15.08.2016,,,,
367,MI4001,Mianwali Office,Filled,Mr. Karamat Hussain Khan,Draftsman,,14,14,31007363,,38302-1118070-9,,0301-6357558,Male,Direct,Open,16.04.1978,17.09.2007,12.04.2010,,,,
368,MI4001,Mianwali Office,Filled,Mr. Amjad Hussain,Senior Clerk,,14,14,30877834,,38303-3312612-1,,0341-4540500,Male,Promotee ,Open,15.10.1979,09.01.2004,04.07.2005,,,,
369,MI4001,Mianwali Office,Filled,Mr. Kamran Hassan,Computer Operator,,12,12,30880609,,38303-6771870-7,,0300-6084597,Male,Direct,Open,07.01.1986,03.09.2007,13.12.2017,,,,
383,MI4001,Mianwali Office,Filled,Mr. Zubair Abbas,Surveyor,10,10,9,30942665,,38303-2177210-3,,0300-9181093,Male,Direct,Open,24.08.1986,01.07.2006,18.12.2020,,,,
385,MI4001,Mianwali Office,Filled,Mr. Manzoor Hussain,Driver,6,6,5,30934017,,38303-5380304-5,,0301-4594154,Male,Direct,Open,10.02.1970,31.12.2003,01.01.2004,,,,
387,MI4001,Mianwali Office,Filled,Mr. Zeeshan Javeed,Driver,,5,5,32037466,,37405-1749999-5,,0333-6821607,Male,Direct,Open,14.02.1983,26.01.2018,26.01.2018,,,,
389,MI4001,Mianwali Office,Filled,Mr. Abdul Ghaffar,Naib Qasid,2,2,1,31007366,,38303-1297522-9,,0308-5530150,Male,Direct,Open,21.01.1979,14.09.2007,11.04.2017,,,,
390,MI4001,Mianwali Office,Filled,Mr. Shafi Ullah,Naib Qasid,2,2,1,30515028,,38302-1168391-7,,0306-8602697,Male,Direct,Open,03.01.1972,07.07.2006,01.01.2011,,,,
391,MI4001,Mianwali Office,Filled,Mr. Shakeel Akhtar,Naib Qasid,,1,1,31609494,,38302-7007537-7,,0307-0446510,Male,Direct,Open,18.12.1992,26.01.2018,26.01.2018,,,,
392,MI4001,Mianwali Office,Filled,Mr. Muhammad Shoaib,Naib Qasid,,1,1,32037483,,38302-9951301-7,,0304-4053168,Male,Direct,Open,01.04.1997,26.01.2018,26.01.2018,,,,
393,MI4001,Mianwali Office,Filled,Mr. Muhammad Saleem Akhtar,Naib Qasid,,1,1,32081234,,38302-0129480-3,,0308-6714770,Male,Direct,Employee,19.03.1995,12.04.2018,12.12.2018,,,,
394,MI4001,Mianwali Office,Filled,Mr. Asad Hussain,Naib Qasid,,1,1,32075723,,38302-1171918-1,,0322-8053896,Male,Direct,Open,12.12.1983,19.03.2018,12.01.2023,,,,
395,MI4001,Mianwali Office,Filled,Mrs. Rida Abdullah,Naib Qasid,,1,1,32075736,,38301-4958332-8,,N/A,Female,Direct,Women,21.07.1995,12.03.2018,12.01.2023,,,,
396,MI4001,Mianwali Office,Filled,Mr. Bilal Ahmad Khan,Naib Qasid,,1,1,32037493,,38302-8336648-7,,0304-9607677,Male,Direct,Open,15.04.1996,26.01.2018,26.01.2018,,,,
397,MI4001,Mianwali Office,Filled,Mr. Hassan Din,Naib Qasid,,1,1,31894137,,38302-3951356-9,,0305-8920786,Male,Direct,Employee,13.03.1993,03.04.2017,26.12.2019,,,,
398,MI4001,Mianwali Office,Filled,Mrs. Kiran Jahan,Naib Qasid,,1,1,32037487,,38302-0329229-2,,N/A,Female,Direct,Women,17.12.1996,26.01.2018,26.01.2018,,,,
399,MI4001,Mianwali Office,Filled,Mrs. Shameem Akhtar,Naib Qasid,,1,1,32037489,,38303-0937062-0,,N/A,Female,Direct,Women,01.12.1982,26.01.2018,26.01.2018,,,,
400,MI4001,Mianwali Office,Filled,Mr. Muhammad Waqas Khan,Naib Qasid,,1,1,32037470,,38302-9905452-3,,0308-7871811,Male,Direct,Open,16.03.1994,26.01.2018,26.01.2018,,,,
401,MI4001,Mianwali Office,Filled,Mr. Abdul Ghaffar Khan,Naib Qasid,,1,1,32037451,,38301-0994381-7,,0344-5097616,Male,Direct,Open,01.06.1985,26.01.2018,26.01.2018,,,,
402,MI4001,Mianwali Office,Filled,Mr. Khalid Iqbal,Naib Qasid,,1,1,32037476,,38301-6996047-9,,0336-7660439,Male,Direct,Open,15.10.1988,26.01.2018,26.01.2018,,,,
403,MI4001,Mianwali Office,Filled,Mr. Mureed Abbas,Chainman,3,3,1,30944753,,38302-6342565-9,,0313-4797165,Male,Direct,Open,15.06.1980,04.07.2006,04.07.2006,,,,
404,MI4001,Mianwali Office,Filled,Syed Azhar Hussain Shah,Chainman,2,2,1,30917915,,38303-1021067-1,,0301-4232598,Male,Direct,Open,20.10.1978,16.02.2010,09.07.2010,,,,
405,MI4001,Mianwali Office,Filled,Mr. Muhammad Farhad Khan,Chainman,,1,1,32037462,,38303-7919426-1,,0308-4904398,Male,Direct,Open,01.01.1994,26.01.2018,26.01.2018,,,,
406,MI4001,Mianwali Office,Filled,Mr. Muhammad Aamir Waheed,Chainman,,11,1,32037504,,38302-5115467-3,,0300-4152555,Male,Direct,Open,12.07.1994,26.01.2018,01.11.2024,,,,
407,MI4001,Mianwali Office,Filled,Mr. Asmat Ullah Khan,Chainman,,1,1,32037495,,38302-3077436-3,,0302-8797053,Male,Direct,Open,03.03.1990,26.01.2018,26.01.2018,,,,
408,MI4001,Mianwali Office,Filled,Mr. Muhammad Iqbal Nasir,Chainman,,1,1,32037498,,38303-4473907-9,,0334-6563446,Male,Direct,Open,13.03.1985,26.01.2018,26.01.2018,,,,At disposal of Admin Department
409,MI4001,Mianwali Office,Filled,Mr. Naseem Akram,Chainman,,1,1,32051170,,33105-4362797-9,,0341-7690474,Male,Direct,Open,13.12.1992,08.02.2018,08.02.2018,,,,
410,MI4001,Mianwali Office,Filled,Mr. Arshad Abbas,Chainman,,1,1,32037501,,38302-7364389-9,,0306-3960894,Male,Direct,Open,12.06.1987,26.01.2018,26.01.2018,,,,
412,MI4001,Mianwali Office,Filled,Mr. Muhammad Naveed,Ferro Printer,3,3,1,30934008,,38302-7530664-5,,0306-1520930,Male,Rule 17-A,,01.01.1984,06.08.2005,06.08.2005,,,,
413,MI4001,Mianwali Office,Filled,Mr. Imtiaz Hussain Shah,Bahishti,2,2,1,30942668,,38303-8986428-9,,0306-3959914,Male,Direct,Open,03.02.1984,01.07.2006,01.07.2006,,,,
415,MI4001,Mianwali Office,Filled,Mr. Bilawal Sultan,Chowkidar,,1,1,32037454,,38302-0633252-3,,0303-9504073,Male,Direct,Open,15.10.1997,26.01.2018,26.01.2018,,,,
416,MI4001,Mianwali Office,Filled,Mr. Saleem Akhtar,Sweeper,2,2,1,30715665,,38302-1125152-1,,0301-6754626,Male,Direct,Open,21.11.1975,28.06.2006,28.06.2006,,,,
417,MI4001,Mianwali Office,Filled,Mr. Salah Ud Din,Sweeper,,1,1,32037479,,38302-2441000-1,,0304-6175299,Male,Direct,Open,07.03.1988,26.01.2018,26.01.2018,,,,
418,BR4207,Bahawalpur Office,Filled,Mr. Muneeb Hasssan,Assistant Director Mines & Minerals,,17,17,32121464,ABDUL SATTAR,36603-8938543-5,Vehari,0333-5318053,Male,Direct,Open,01.04.1995,11.03.2019,03.01.2025,14.04.2022,,,
421,BR4207,Bahawalpur Office,Filled,Mr. Muhammad Ramzan,Senior Clerk,,14,14,30859374,,36602-1368602-9,,0300-1719658,Male,Promotee ,Open,08.10.1983,03.09.2007,22.12.2009,,,,
429,BR4207,Bahawalpur Office,Filled,Hafiz Muhammad Tanveer,Junior Clerk,,11,11,31825264,,31202-0862771-9,,0301-7400434,Male,Rule 17-A,,03.05.1991,11.08.2016,11.08.2016,,,,
430,BR4207,Bahawalpur Office,Filled,Mr. Muhammad Imran,Tracer,,9,9,31442672,,36302-9142456-5,,03058-300862,Male,Direct,Open,08.12.1987,08.02.2010,15.03.2016,,,,Attached with DD Multan
432,BR4207,Bahawalpur Office,Filled,Mr. Muhammad Adnan,Driver,,5,5,31883824,,31202-9040340-5,,0300-9809030,Male,Direct,Open,29.01.1990,01.03.2017,01.03.2017,,,,
433,BR4207,Bahawalpur Office,Filled,Mr. Liaqat Ali,Naib Qasid,3,3,1,30308354,,31202-6467056-5,,0302-7606090,Male,Rule 17-A,,06.02.1981,01.01.2001,01.01.2001,,,,Attached with DD DGK
434,BR4207,Bahawalpur Office,Filled,Mr. Nadeem Ahmad,Naib Qasid,2,2,1,31614086,,32102-3767374-9,,0303-7474204,Male,Rule 17-A,,01.01.1988,30.04.2013,30.04.2013,,,,Attached with AD Attock
435,BR4207,Bahawalpur Office,Filled,Hafiz Muhammad Abdul Qadeer,Naib Qasid,,1,1,32051168,,31202-8816566-9,,0300-6453171,Male,Direct,Open,11.11.1992,08.02.2018,08.02.2018,,,,
437,BR4207,Bahawalpur Office,Filled,Mr. Muhammad Umar Farooq,Chowkidar,,1,1,31888813,,31205-8070140-3,,0305-7597449,Male,Direct,Open,10.11.1990,02.03.2017,02.03.2017,,,,
438,BR4207,Bahawalpur Office,Filled,Mr. Muhammad Nadeem,Chowkidar,,1,1,31887090,,31202-1963197-1,,0300-6846856,Male,Direct,Open,05.04.1992,01.03.2017,01.03.2017,,,,
439,CH4025,DD Chakwal Office,Filled,Mr. Farooq Sultan,Deputy Director Mines & Minerals,,18,18,31599534,SULTAN MAHMOOD,35202-6570757-9,Sheikhupura,0334-4331482,Male,Promotee ,,02.09.1986,21.02.2013,16.01.2025,05.08.2022,,,
440,CH4025,DD Chakwal Office,Filled,Mr. Khurshid Ahmad Dar,Assistant Director Mines & Minerals,,,17,,,,,,,,,,,21.04.2026,,,,
441,CH4025,DD Chakwal Office,Filled,Mr. Muhammad Kashif,Geologist,,17,17,32121529,,38302-7333559-1,Mianwali,0316-5038878,Male,Direct,Open,05.06.1993,12.03.2019,01.04.2023,29.05.2020,,,Additional charge of Geologist SSM Khushab
470,CH4025,DD Chakwal Office,Filled,Mr. Hammad Nasir,Junior Clerk,,11,11,32240937,,37302-3804032-3,,0311-4285793,Male,Rule 17-A,,24.06.2000,12.05.2023,12.04.2023,,,,
471,CH4025,DD Chakwal Office,Filled,Mr. Muhammad Asif,Surveyor,,9,9,31466565,,37302-1001232-7,,0345-5825381,Male,Direct,Open,10.11.1976,19.02.2010,09.02.2015,,,,
474,CH4025,DD Chakwal Office,Filled,Mr. Qalab Abbas,Tracer,,9,9,30842862,,37202-2050570-7,,0331-9790614,Male,Direct,Open,11.03.1979,03.09.2007,19.09.2007,,,,On 4 months earned leave
475,CH4025,DD Chakwal Office,Filled,Mr. Muhammad Rauf,Driver,,5,5,30701249,,37201-1563687-5,,0332-5931910,Male,Direct,Open,26.07.1967,15.06.1987,30.12.2003,,,,
476,CH4025,DD Chakwal Office,Filled,Mr. Zia-ur-Rehman,Driver,,5,5,32037457,,37201-5324280-7,,0332-8945512,Male,Direct,Open,22.01.1989,26.01.2018,02.04.2026,,,,
478,CH4025,DD Chakwal Office,Filled,Mr. Arshad Iqbal,Naib Qasid,,1,1,30701308,,34401-0583651-3,,0334-5561601,Male,Direct,Open,10.02.1972,14.07.1990,14.07.1990,,,,
479,CH4025,DD Chakwal Office,Filled,Mrs. Khalida Naheed,Naib Qasid,,1,1,32071572,,37201-1699569-2,,0341-0243860,Female,Direct,Women,08.11.1983,13.03.2018,13.03.2018,,,,
480,CH4025,DD Chakwal Office,Filled,Mr. Bilal Ahmed,Naib Qasid,,1,1,31007249,,37201-3452312-3,,0336-5937827,Male,Direct,Open,01.05.1984,13.03.2018,13.03.2018,,,,
481,CH4025,DD Chakwal Office,Filled,Mr. Amir Farooq,Naib Qasid,,1,1,32075731,,37201-5213147-5,,0333-5913653,Male,Direct,Minority,25.08.1990,14.03.2018,13.03.2018,,,,
482,CH4025,DD Chakwal Office,Filled,Mr. Farhan Shahzad,Naib Qasid,,1,1,32071531,,37201-2614245-3,,0340-8718180,Male,Direct,Open,01.12.1996,14.03.2018,14.03.2018,,,,
484,CH4025,DD Chakwal Office,Filled,Mr. Muhammad Usama Karim,Naib Qasid,,1,1,32071598,,37201-5406-2361,,0336-0581614,Male,Direct,Open,28.10.1989,16.03.2018,12.03.2018,,,,
485,CH4025,DD Chakwal Office,Filled,Mr. Sajid Mehmood,Naib Qasid,,1,1,32071553,,37202-7271189-5,,0340-5898399,Male,Direct,Open,23.04.1984,12.03.2018,12.03.2018,,,,
486,CH4025,DD Chakwal Office,Filled,Mr. Asif Raees,Naib Qasid,,1,1,32071566,,37204-0127113-1,,0340-0824948,Male,Direct,Open,01.01.1996,12.03..2018,12.03.2018,,,,
487,CH4025,DD Chakwal Office,Filled,Mr. Ibrar Hussain,Naib Qasid,,1,1,32071560,,37204-0120842-3,,0342-7511106,Male,Direct,Open,12.03.1997,13.03.2018,12.03.2018,,,,
488,CH4025,DD Chakwal Office,Filled,Mr. Muhammad Ayyaz,Naib Qasid,,1,1,32071547,,37406-1375381-3,,0314-5345144,Male,Direct,Open,25.04.1987,14.03.2018,14.03.2018,,,,
494,CH4025,DD Chakwal Office,Filled,Mr. Tamoor Sultan,Chainman,,1,1,32071593,,37201-4213916-9,,0344-5852017,Male,Direct,Open,29.01.1990,13.03.2018,13.03.2018,,,,
495,CH4025,DD Chakwal Office,Filled,Mr. Aftab Ahmed,Chainman,,1,1,32071586,,37201-2197778-5,,0313-5778332,Male,Direct,Open,20.09.1987,12.03.2018,12.03.2018,,,,At disposal of Admin Department
496,CH4025,DD Chakwal Office,Filled,Mr. Muhammad Ramzan,Chainman,,1,1,32071578,,37201-3746144-1,,0332-5907568,Male,Direct,Open,19.01.1996,12.03.2018,12.03.2018,,,,
497,CH4025,DD Chakwal Office,Filled,Mr. Gulfaraz Ahmed,Chainman,,1,1,32075718,,37302-2479275-3,,0343-5521063,Male,Direct,Open,15.04.1987,19.03.2018,17.03.2018,,,,
498,CH4025,DD Chakwal Office,Filled,Mr. Muhammad Faheem Raza,Chainman,,1,1,32071605,,37202-7007676-9,,0348-8470585,Male,Direct,Open,18.06.1995,13.03.2018,13.03.2018,,,,
499,CH4025,DD Chakwal Office,Filled,Mr. Muhammad Waqas,Chainman,,1,1,32071582,,37204-0111840-5,,0344-5852017,Male,Direct,Open,29.01.1990,13.03.2018,13.03.2018,,,,
500,CH4025,DD Chakwal Office,Filled,Mr. Muhammad Ikram,Chainman,,,1,32071518,,37201-5406236-1,,0336-0581614,Male,Direct,Open,28.10.1989,13.03.2018,27.11.2024,,,,
501,CH4025,DD Chakwal Office,Filled,Mr. Francis Michel,Sweeper,,1,1,31894141,,37201-1645839-9,,0310-0117857,Male,Direct,Minority,03.07.1991,01.04.2017,01.04.2017,,,,
502,CH4024,AD Chakwal Office,Filled,Mr. Muhammad Asif Gill,Assistant Director Mines & Minerals,,17,17,31895728,MUHAMMAD YAQOOB,32203-4569617-5,Layyah,0344-8547896,Male,Direct,Open,24.01.1992,21.03.2017,22.04.2025,29.05.2020,,,
503,CH4024,AD Chakwal Office,Filled,Mr. Zeeshan Aziz,Mineral Development Officer,,16,16,,ABDUL AZIZ,,,0303-5735018,Male,Direct,Open,01.04.1998,25.11.2025,08.05.2026,On Contract,DG Cell,Planning Officer,
504,CH4024,AD Chakwal Office,Filled,Mr. Qamar Abbas,Assistant,,16,16,30816805,,38303-3299413-1,,0314-8602028,Male,Promotee ,,02.01.1985,03.09.2007,03.09.2007,14.04.2022,,,Working against post of Assistant on acting charge
507,CH4024,AD Chakwal Office,Filled,Mr. Gulzar Ahmad,Senior Clerk,,14,14,30816803,,3830-39891428-9,,0301-4776389,Male,Promotee ,,01.02.1987,03.09.2007,03.09.2007,,,,
515,CH4024,AD Chakwal Office,Filled,Mr. Yasir Nawaz,Tracer,,9,9,30700640,,37406-6309125-5,,0313-0517936,Male,Direct,Open,16.03.1983,01.07.2006,01.07.2006,,,,Attached with DD Rawalpindi
516,CH4024,AD Chakwal Office,Filled,Mr. Junaid Ehsan,Driver,,5,5,31894147,,37201-4898417-5,,0333-5695582,Male,Direct,Open,20.12.1986,03.04.2017,03.04.2017,,,,
517,CH4024,AD Chakwal Office,Filled,Mr. Javid Iqbal,Naib Qasid,4,4,1,30700659,,37201-1767362-1,,0344-5233830,Male,Direct,Open,31.12.1976,04.08.2000,04.08.2000,,,,
518,CH4024,AD Chakwal Office,Filled,Mr. Zafar Ullah,Naib Qasid,3,3,1,30982490,,38302-1113330-7,,0312-3522150,Male,Direct,Open,28.07.1976,01.04.2004,10.10.2008,,,,
519,CH4024,AD Chakwal Office,Filled,Mr. Asghar Ali,Naib Qasid,3,3,1,30700676,,38401-8406093-9,,0346-5860175,Male,Direct,Open,15.04.1982,30.06.2006,30.06.2006,,,,
521,CH4024,AD Chakwal Office,Filled,Mr. Shakeel Ahmad,Chowkidar,,1,1,32075688,,32202-7516330-3,,0306-1630109,Male,Direct,Open,22.10.1994,15.03.2018,15.03.2018,,,,
523,CH4024,AD Chakwal Office,Filled,Mr. Haroon Saddique,Sweeper,,1,1,31894128,,37405-9197872-9,,0318-5369752,Male,Direct,Open,02.11.1991,01.04.2017,01.04.2017,,,,
525,SG4080,Sargodha Office,Filled,Mr. Muhammad Zaib Khan,Assistant Director Mines & Minerals,,17,17,,SHOAIB KHAN,,,0316 1479073,Male,Direct,Open,,,02.09.2025,On Contract,,,
526,SG4080,Sargodha Office,Filled,Mr. Muhammad Nauman Azam,Assistant Director Mines & Minerals,,17,17,32121757,MUHAMMAD AZAM,32302-4742458-3,Muzaffargarh,0301-7413150,Male,Direct,Open,10.05.1994,13.03.2019,06.02.2025,14.04.2022,,,
528,SG4080,Sargodha Office,Filled,Mr. Muhammad Basheer,Survey & Drawing Officer,,16,16,,MUHAMMAD AZEEM,,,0307 8853095,Male,Direct,Open,12.10.1986,26.12.2024,26.12.2025,On Contract,,,
529,SG4080,Sargodha Office,Filled,Mr. Zaheer Ahmad,Assistant,,16,16,30515008,,31203-5311771-3,,0300-7856352,Male,Rule 17-A,,18.08.1972,13.11.1997,27.12.2002,,,,
534,SG4080,Sargodha Office,Filled,Mr. Waheed Khan,Draftsman,,14,14,30871607,,35201-7892153-7,,0336-4798097,Male,Direct,Open,07.12.1984,03.09.2007,27.11.2024,,,,
535,SG4080,Sargodha Office,Filled,Mr. Farooq Ahmad,Senior Clerk,,11,14,30942667,,38303-0948361-5,,0302-3956156,Male,Direct,Open,25.11.1970,01.01.2004,07.05.2018,,,,
536,SG4080,Sargodha Office,Filled,Mr. Rizwan Saeed,Senior Clerk,,14,14,30877410,,38405-0953265-7,,0344-7578338,Male,Promotee ,,01.04.1986,07.09.2007,31.10.2017,,,,
541,SG4080,Sargodha Office,Filled,Mr. Umar Sultan,Junior Clerk,,11,11,31641168,,38403-9732731-5,,0346-8690363,Male,Rule 17-A,,07.01.1989,05.11.2013,29.05.2018,,,,
545,SG4080,Sargodha Office,Filled,Mr. Muhammad Nadeem Yousaf,Driver,5,5,5,30916775,,38403-4890977-3,,0304-6785545,Male,Direct,Open,02.06.1979,27.06.2006,11.09.2013,,,,
546,SG4080,Sargodha Office,Filled,Mr. Hasnain Ahmad,Naib Qasid,,1,1,31837331,,38406-0448317-1,,0300-6032320,Male,Rule 17-A,,20.08.1998,01.11.2016,01.11.2016,,,,
547,SG4080,Sargodha Office,Filled,Mr. Zaigham Abbass,Naib Qasid,,1,1,32081912,,38403-8284631-5,,0300-7966835,Male,Direct,Open,22.03.1984,11.04.2018,09.07.2020,,,,
548,SG4080,Sargodha Office,Filled,Mr. Muhammad Nadeem,Naib Qasid,,1,1,32081228,,38403-8391612-3,,0315-6550040,Male,Direct,Open,29.06.1988,12.04.2018,18.03.2022,,,,
549,SG4080,Sargodha Office,Filled,Mr. Babar Shehzad,Naib Qasid,,1,1,31948017,,38406-0446661-3,,0341-7877273,Male,Direct,Open,13.04.1991,06.09.2017,17.09.2020,,,,
550,SG4080,Sargodha Office,Filled,Mr. Kaleem Ullah,Naib Qasid,2,2,1,31425304,MUHAMMAD YOUSAF,38403-6704263-5,,,Male,Direct,Open,01.01.1988,17.02.2010,07.02.2025,,,,
551,SG4080,Sargodha Office,Filled,Mr. Muhammad Usama Afzal,Chainman,,1,1,32051172,,33105-9958088-1,,0308-4415758,Male,Direct,Open,01.06.1997,08.02.2018,08.02.2018,,,,
552,SG4080,Sargodha Office,Filled,Mr. Inam Hussain,Chainman,2,2,1,30515024,,38403-6834955-5,,0347-4274150,Male,Direct,Open,12.12.1984,03.07.2006,03.07.2006,,,,
553,SG4080,Sargodha Office,Filled,Mr. Shehbaz Ahmad,Mali,3,3,1,30515026,,38403-1240774-9,,0300-6033823,Male,Rule 17-A,,01.07.1978,30.08.1997,30.08.1997,,,,
554,SG4080,Sargodha Office,Filled,Mr. Muhammad Qamar,Chowkidar,,1,1,31883236,,38403-2698558-9,,0346-2530031,Male,Direct,Open,27.12.1988,22.02.2017,22.02.2017,,,,
555,SG4080,Sargodha Office,Filled,Mr. Parviaz Masih,Sweeper,,1,1,31883238,,34501-2047973-1,,0342-7586126,Male,Direct,Open,26.03.1984,23.02.2017,23.02.2017,,,,
556,GA4176,Gujranwala Office,Filled,Mr. Muhammad Naveed Butt,Deputy Director Mines & Minerals,,18,18,31455986,MUHAMMAD SHAFIQUE,35201-1330724-9,Lahore,0321-4732056,Male,Promotee ,,10.04.1978,11.06.2010,24.07.2025,02.04.2018,,,
558,GA4176,Gujranwala Office,Filled,Mr. Muhammad Rahil Atif,Survey & Drawing Officer,,16,16,,MUHAMMAD YOUSAF,37202-3034881-7,Chakwal,0342-5254954,Male,Direct,Open,24.11.1987,07.11.2025,07.05.2026,On Contract,,,Attached with AD Jhelum
567,GA4176,Gujranwala Office,Filled,Mr. Malik Zaheer Abbas,Junior Clerk,,11,11,31661151,,34403-3083433-7,,0332-4134297,Male,Direct,Open,01.03.1986,20.10.2014,12.05.2022,,,,
568,GA4176,Gujranwala Office,Filled,Mr. Ghulam Murtaza,Surveyor,10,10,9,30714972,,37301-4873058-7,,0300-5588438,Male,Direct,Open,26.11.1980,03.07.2006,02.12.2024,,,,
569,GA4176,Gujranwala Office,Filled,Mr. Azhar Iqbal,Driver,,5,5,31977768,,35504-0339473-1,,0301-4349628,Male,Direct,Open,12.10.1987,05.09.2017,05.09.2017,,,,Attached with DS (Technical)
570,GA4176,Gujranwala Office,Filled,Mr. Nadeem Ali,Driver,,5,5,31948062,,34102-5649633-3,,0301-9656301,Male,Direct,Open,14.03.1984,11.10.2017,20.02.2025,,,,
572,GA4176,Gujranwala Office,Filled,Mr. Muhammad Nadeem,Naib Qasid,,1,1,31910535,,34104-2342354-1,,0300-3841318,Male,Direct,Open,02.04.1982,23.02.2017,07.07.2023,,,,
573,GA4176,Gujranwala Office,Filled,Mrs. Mafia Asghar,Naib Qasid,,1,1,31977739,,38403-5666192-2,,0342-8006874,Female,Direct,Open,02.10.1995,31.08.2017,31.08.2017,,,,
574,GA4176,Gujranwala Office,Filled,Mrs. Ayesha Asghar,Naib Qasid,,1,1,31977744,,38403-7155825-2,,0303-6253825,Female,Direct,Women,22.11.1996,31.08.2017,31.08.2017,,,,
575,GA4176,Gujranwala Office,Filled,Mr. Abdul Hadi,Chowkidar,,1,1,31977731,,34602-7619655-7,,0302-9758829,Male,Direct,Open,20.08.1996,19.08.2017,19.08.2027,,,,
576,GA4176,Gujranwala Office,Filled,Mr. Muhammad Usman,Chainman,,1,1,32073695,MUHAMMAD YOUSAF,34104-1323238-9,,0308-6569864,Male,Direct,Open,15.11.1991,26.08.2017,09.01.2025,,,,
577,GA4176,Gujranwala Office,Filled,Mr. Muhammad Usman,Chainman,,1,1,31977760,MUHAMMAD IRFAN,34602-8162325-7,,0309-6601959,Male,Direct,Open,12.11.1994,22.08.2017,22.08.2017,,,,
578,GA4176,Gujranwala Office,Filled,Mr. Imran Benyman,Sweeper,,1,1,31977785,,36302-2809224-3,,0305-7780452,Male,Direct,Open,04.01.1992,20.10.2014,26.08.2017,,,,
580,RI4396,Rawalpindi Office,Filled,Mr. Sajid Ur-Rehman,Deputy Director Mines & Minerals,,18,18,30884050,MANGTA KHAN,38401-2647298-1,Sargodha,0321-4702021,Male,Promotee ,,20.04.1983,03.01.2008,24.07.2025,06.03.2017,,,
581,RI4396,Rawalpindi Office,Filled,Mr. Muhammad Usman Manzoor,Assistant Director Mines & Minerals,,17,17,31898783,MANZOOR AHMAD,31202-2237578-3,Rahim Yar Khan,0321-6832669,Male,Direct,Open,25.02.1994,21.03.2017,24.07.2025,29.05.2020,,,
583,RI4396,Rawalpindi Office,Filled,Mr. Muhammad Saeed Bhatti,Survey & Drawing Officer,,16,16,30877349,,33201-9178884-3,,0320-6490767,Male,Promotee ,,05.06.1972,01.02.1995,20.05.2026,,,,
585,RI4396,Rawalpindi Office,Filled,Mr. Mazhar Hussain,Assistant,,16,16,31020773,,37401-6813537-1,,0300-9785792,Male,Promotee ,,12.07.1971,30.09.1993,09.12.2024,,,,Working as Superintendent (BS-17) on CCB
587,RI4396,Rawalpindi Office,Filled,Mr. Yasir Riaz,Stenographer,,15,15,31059042,,34203-5461103-3,,,Male,Direct,Open,22.02.1984,30.06.2006,06.08.1990,,,,Working in office of AD Jhelum
590,RI4396,Rawalpindi Office,Filled,Mr. Nadeem Iqbal,Senior Clerk,,14,14,31466562,,37301-2369237-5,,0347-6954890,Male,Promotee ,,18.11.1978,17.02.2010,17.02.2010,,,,
603,RI4396,Rawalpindi Office,Filled,Mr. Abdul Ghafoor,Bahishti,5,5,1,31020835,,35202-2677356-5,,0345-5137996,Male,Direct,,22.11.1969,06.08.1990,06.08.1990,,,,
604,RI4396,Rawalpindi Office,Filled,Mr. Nasir Mehmood,Chainman,2,2,1,31059043,,37405-8492232-5,,0334-5298200,Male,Direct,,02.10.1980,27.06.2006,27.06.2006,,,,
605,RI4396,Rawalpindi Office,Filled,Mr. Faisal Shahzad,Chainman,2,2,1,31050044,,38403-0215588-1,,0302-8993663,Male,Direct,,21.02.1987,30.06.2006,30.06.2010,,,,Attached with DD Sargodha
606,RI4396,Rawalpindi Office,Filled,Mr. Muhammed Rafique,Mali,1,1,1,31466568,,38302-1144607-5,,0306-3967547,Male,Direct,,05.12.1982,15.02.2010,15.02.2010,,,,
607,RI4396,Rawalpindi Office,Filled,Mr. Mohabat khan,Naib Qasid,5,5,1,31020916,,37405-02702775,,0300-5137414,Male,Direct,,22.07.1969,22.09.1990,22.09.1990,,,,
609,RI4396,Rawalpindi Office,Filled,Mr. Gulbaz khan,Chowkidar,5,5,1,32037480,,33201-6343656-3,,0347-6913616,Male,Direct,,01.03.1994,26.01.2018,13.01.2025,,,,
611,AK4059,Attock Office,Filled,Mr. Furqan Ahmad,Assistant Director Mines & Minerals,,17,17,31898782,MUHAMMAD SALEEM,35202-7664768-1,Lahore,0307-4919241,Male,Direct,Open,25.09.1989,17.03.2017,04.04.2023,29.05.2020,,,
616,AK4059,Attock Office,Filled,Miss Fatima Bushra,Senior Clerk,,14,14,3185472,,37101-6842194-6,,0313-3911853,Female,Promotee ,Rule 17-A,13.03.1998,05.11.2016,05.11.2016,,,,Working as Assistant (BS-16) on CCB
618,AK4059,Attock Office,Filled,Mr. Muhammad Qadeer,Draftsman,,14,14,30796837,MUHAMMAD YOUNIS,35201-3302817-3,,0324-7075583,Male,Promotee ,,16.11.1985,12.09.2007,14.10.2009,,,,
619,AK4059,Attock Office,Vacant,Mr. Feroz Khan,Royalty Inspector,13,13,11,30308461,,37103-2090183-3,,0333-6392463,Male,Direct,Open,22.07.1966,27.05.1993,29.04.2020,,,,
624,AK4059,Attock Office,Filled,Mr. Muhammad Jamal Shah,Surveyor,10,10,9,30576277,,37101-6011521-5,,0334-5289711,Male,Direct,Open,12.01.1981,28.06.2006,28.06.2006,,,,
625,AK4059,Attock Office,Filled,Mr. Muhammad Zubair Khan,Driver,,5,5,31007362,,38303-5750777-7,,0301-6350134,Male,Direct,Open,10.04.1981,14.09.2007,29.08.2025,,,,
626,AK4059,Attock Office,Filled,Mr. Shehbaz Ahmad,Mali,2,2,1,31498718,,34602-5439552-5,,0301-4913249,Male,Direct,Open,13.05.1984,17.02.2010,17.02.2010,,,,
627,AK4059,Attock Office,Filled,Mr. Ghulam Mazhar,Naib Qasid,,1,1,32081202,,37102-6153139-7,,0304-1359454,Male,Direct,Open,03.05.1994,17.04.2018,06.06.2022,,,,
628,AK4059,Attock Office,Filled,Mr. Muhammad Hasnain,Naib Qasid,,1,1,32083224,,37102-4552355-1,,0308-5263853,Male,Direct,Open,18.12.1995,17.04.2018,06.06.2022,,,,
629,AK4059,Attock Office,Filled,Mr. Muhammad Ifran,Chainman,,1,1,32081891,,37102-9499870-3,,0304-5179332,Male,Direct,Open,28.10.1995,16.04.2018,06.06.2022,,,,
630,AK4059,Attock Office,Filled,Mr. Sarfraz Saleem,Chainman,,1,1,32075716,,37101-4934746-3,,0305-3612347,Male,Direct,Open,02.05.1995,14.03.2018,23.12.2020,,,,
633,MN4562,Multan Office,Filled,Mr. Nauman Sarfraz,Deputy Director Mines & Minerals,,18,18,32104188,SARFRAZ AHMAD,34201-0560298-3,Gujrat,0301-6251348,Male,Direct,Open,14.12.1979,03.10.2018,26.08.2025,26.01.2022,,,
636,MN4562,Multan Office,Filled,Mr. Muhammad Ashraf,Assistant,,16,16,30307048,,31202-0298378-5,,0300-6811277,Male,Promotee ,,12.02.1968,06.05.1987,11.03.2016,,,,
638,MN4562,Multan Office,Filled,Mr. Qaiser Naveed Shah,Computer Operator,13,13,12,30348508,,36102-2658303-3,,0300-6235332,Male,Direct,Open,01.01.1978,05.09.2007,01.06.2016,,,,
643,MN4562,Multan Office,Filled,Mr. Muhammad Ishfaq,Junior Clerk,,11,11,30857189,,36302-0455823-3,,0311-4115710,Male,Direct,Open,01.04.1979,30.06.2006,06.09.2018,,,,
644,MN4562,Multan Office,Filled,Mr. Sajjad Hussain,Junior Clerk,,11,11,31647165,,31202-0397896-9,,0304-9594080,Male,Rule 17-A,,26.03.1991,30.05.2014,29.05.2017,,,,Attached with AD Bahawalpur
645,MN4562,Multan Office,Filled,Mr. Younas Kareem,Surveyor,10,10,9,30567543,,32102-1925317-1,,0300-7393237,Male,Direct,Open,14.03.1982,29.06.2006,21.04.2016,,,,
646,MN4562,Multan Office,Filled,Mr. Shahbaz Hassan,Driver,,5,5,31883829,,32103-9892718-1,,0342-6637167,Male,Direct,Open,17.08.1988,01.03.2017,01.03.2017,,,,
647,MN4562,Multan Office,Filled,Mr. Irshad Jamsheed,Driver,,4,5,31883832,,36303-0199838-7,,0300-6391997,Male,Direct,Open,07.09.1987,01.03.2017,01.03.2017,,,,
649,MN4562,Multan Office,Filled,Mr. Hafiz Muhammad Waseem Shad,Naib Qasid,,1,1,31883794,,36302-0374062-9,,0300-7189449,Male,Direct,Open,28.03.1982,01.03.2017,01.03.2017,,,,
650,MN4562,Multan Office,Filled,Mst. Sajida Yaseen,Naib Qasid,,1,1,31730416,,36302-5010990-4,,0314-6263772,Female,Direct,Women,04.04.1983,01.03.2017,01.03.2017,,,,
651,MN4562,Multan Office,Filled,Mr. Hafeez Ullah,Naib Qasid,,1,1,32081166,,32103-5728815-3,,0341-1653101,Male,Direct,Open,15.02.1997,27.07.2018,19.07.2018,,,,
652,MN4562,Multan Office,Filled,Mr. Tariq Mahmood,Chainman,,1,1,31883789,,32402-9919221-3,,0336-6488564,Male,Direct,Open,03.05.1988,01.03.2017,01.03.2017,,,,
653,MN4562,Multan Office,Filled,Mr. Muhammad Nadeem,Chainman,,1,1,32000184,,32203-6444318-3,,0300-8992051,Male,Direct,Open,21.06.1990,01.11.2019,07.08.2018,,,,
654,MN4562,Multan Office,Filled,Mr. Elahi Bukhsh,Chowkidar,3,3,1,30348508,,32402-6404547-5,,0334-6494510,Male,Direct,Open,19.02.1979,18.09.2001,08.06.2020,,,,Attached with DD DGK
655,MN4562,Multan Office,Filled,Mr. Ali Raza,Chowkidar,,1,1,31883776,,36302-8860488-3,,0303-6904443,Male,Direct,Open,01.11.1991,01.03.2017,01.03.2017,,,,
656,MN4562,Multan Office,Filled,Mr. Rizwan-ul-Haq,Sweeper,,1,1,31883818,,31202-8088656-7,,0306-7597188,Male,Direct,Open,01.09.1992,01.03.2017,01.03.2017,,,,
657,JM-4169,Jhelum Office,Filled,Mr. Mohsin Maqsood,Assistant Director Mines & Minerals,,17,17,31897448,MAQSOOD AHMAD,33104-4250296-9,Faisalabad,0321-7321793,Male,Direct,Open,22.10.1991,22.03.2017,24.07.2025,29.05.2020,,,
667,JM-4169,Jhelum Office,Filled,Mr. Yasir Mehmood,Naib Qasid,,1,1,31910530,,61101-0144273-5,,0332-5632659,Male,Direct,Employee,01.01.1998,21.02.2017,21.02.2017,,,,
669,JM-4405,Jhelum Office,Filled,Mr. Ghulam Shabir,Chainman,,1,1,30576346,,37302-3868142-9,,0301-5382739,Male,Direct,Open,15.09.1979,14.09.2007,02.08.2017,,,,
670,JM-4169,Jhelum Office,Filled,Mr. Muhammad Farooq,Chowkidar,,1,1,31910541,,38302-3181818-5,,0307-4628626,Male,Rule 17-A,,01.05.1993,20.02.2017,20.02.2017,,,,
671,JM-4169,Jhelum Office,Filled,Mr. Tanseer Abbas,Chowkidar,,1,1,31910547,,37302-6394095-3,,0345-4602329,Male,Rule 17-A,,01.01.1994,23.02.2017,23.02.2017,,,,
672,ST4044,Sialkot Office,Filled,Mr. Amjad Niaz Khan,Assistant Director Mines & Minerals,,17,17,32122295,BASHIR AHMED KHAN,33202-1674991-1,,0300-2592991,Male,Direct,Open,12.11.1989,18.03.2019,03.01.2025,14.04.2022,,,
673,ST4044,Sialkot Office,Filled,Mr. Muhammad Rafiq,Mineral Development Officer,,16,16,30567556,,38405-7892094-3,,0300-2701696,Male,Promotee ,Open,01.02.1987,29.06.2006,23.01.2025,,,,
680,ST4044,Sialkot Office,Filled,Mr. Shoaib Asgher,Driver,5,5,5,,MUHAMMAD ASGHAR,38401-0315589-3,,0346-8608019,Male,Direct,Open,26.07.1983,18.03.2019,20.02.2025,,,,
681,ST4044,Sialkot Office,Filled,Mr. Sajjad Ahmad,Chowkidar,2,2,1,30599517,ALLAH RAKHA ,34602-0484550-1,,0308-6170919,Male,Direct,Open,06.11.1982,03.07.2006,03.07.2006,,,,
682,ST4044,Sialkot Office,Filled,Mr. Zahid Sharif,Naib Qasid,,1,1,31948008,MUHAMMAD SHARIF ,61101-5871997-9,,0302-9274961,Male,Direct,Open,10.10.1992,28.08.2017,09.01.2025,,,,
683,ST4044,Sialkot Office,Filled,Mr. Tabraiz Khalid,Naib Qasid,,1,1,31977746,MERAJ DIN KHALID,34501-6811587-1,,0332-0457837,Male,Direct,Open,01.08.1993,22.08.2017,12.07.2023,,,,
684,ST4044,Sialkot Office,Filled,Mr. Qasim Ali,Dak Runner,,1,1,31948049,MUHAMMAD SAFDAR,37102-2553323-3,,0320-5461619,Male,Direct,Open,13.08.1987,06.09.2017,06.09.2017,,,,
685,ST4044,Sialkot Office,Filled,Mr. Khurram Shahzad,Sweeper,,1,1,31948042,AURANG ZAIB GILL,34603-8347274-1,,0301-6170077,Male,Direct,Open,19.09.1986,22.08.2017,22.08.2017,,,,
686,ST4405,Sialkot Office,Filled,Mr. Muzammil Riaz Ghumman,Chainman,,1,1,31977754,RIAZ AHMED GHUMMAN,34601-6459623-7,,0314-4480062,Male,Direct,Open,07.11.1990,17.02.2018,17.01.2025,,,,
687,ST4405,Sialkot Office,Filled,Mr. Asghar Ali,Naib Qasid,,1,1,32083157,MUSHTAQ AHMED ,38403-0949558-5,,0349-8600782,Male,Direct,Open,04.08.1996,23.02.2018,23.02.2018,,,,At disposal of Admin Department
688,ST4405,Sialkot Office,Filled,Mr. Muhammad Arif,Naib Qasid,,,1,32873688,,34603-8668457-1,,0349-0444851,Male,Direct,Open,05.09.1994,21.02.2018,27.06.2025,,,,
689,LO4397,Lahore Region Office,Filled,Mr. Aurang Zeb,Deputy Director Mines & Minerals,,18,18,31687745,SALAH UD DIN MUNIB,38104-2671825-5,Bhakkar,0341-9200101,Male,Direct,Open,07.07.1989,02.03.2015,25.11.2024,30.01.2025,,,
690,LO4397,Lahore Region Office,Filled,Mr. Muhammad Usman,Assistant Director Mines & Minerals,,,17,,,,,,,,,15.08.1997,21.04.2026,21.04.2026,On Contract,,,
691,LO4397,Lahore Region Office,Filled,Mr. Najeeb Ullah Khan,Survey & Drawing Officer,,16,16,,AMAN ULLAH KHAN,38301-3398029-9,Mianwali,0348-3679965,Male,Direct,Open,04.04.1991,13.05.2026,13.05.2026,On Contract,,,
692,LO4397,Lahore Region Office,Filled,Syed Olad Hussian Hamdani,Superintendent,,16,17,30056699,,35201-1349174-3,,0300-6292121,Male,Direct,Open,23.03.1969,23.07.1995,27.11.2024,,,,
694,LO4397,Lahore Region Office,Filled,Mr. Raheel Badar,Stenographer,,15,15,30715144,,35202-9177334-7,,0344-4170617,Male,Direct,Open,30.12.1982,26.06.2006,27.11.2024,,,,
695,LO4397,Lahore Region Office,Filled,Mr. Muhammad Umer,Stenographer,,15,15,30881225,,35202-0684217-7,,0322-4625369,Male,Direct,Open,18.05.1986,03.07.2007,09.09.2022,,,,
698,LO4397,Lahore Region Office,Filled,Mr. Rashid Khulfan,Senior Clerk,,14,14,31464184,,35404-5343611-5,,0345-8620599,Male,Direct,Open,01.02.1988,25.01.2010,02.05.2025,,Small Mines Assistance / Titles,Accounts (Branch),Working against Assistant on CCB
699,LO4397,Lahore Region Office,Filled,Mr. Dastagir Sharafat,Junior Clerk,,11,11,31938768,,35202-0817194-1,,0340-4836756,Male,Promotee ,,08.08.1996,30.07.2017,12.06.2025,,,,Attached with AD Sahiwal
707,LO4397,Lahore Region Office,Filled,Mr. Ali Sher,Driver,6,6,5,30714949,WARYAM ALI,35202-0663188-5,Rawalpindi,0300-4715372,Male,Direct,Open,28.04.1977,27.06.2006,27.11.2024,,Information Services & Promotion,Driver,Working with Director ISP
708,LO4397,Lahore Region Office,Filled,Mr. Muhammad Tanveer,Chainman,3,3,1,30715168,NAZEER AHMAD,35202-2707833-3,Lahore,0321-4616821,Male,Direct,Open,28.03.1987,26.06.2006,26.06.2006,,,,Attached with HQ
709,LO4397,Lahore Region Office,Filled,Mr. Muhammad Atif Ijaz,Chainman,,1,1,32081905,,35202-1773190-5,,0306-0086475,Male,Direct,Open,14.04.2018,15.01.1994,14.04.2018,,,,
710,LO4397,Lahore Region Office,Filled,Mrs. Asma Rubab,Naib Qasid,,,1,31878051,,35302-1955155-8,,0311-4975698,Male,Rule 17-A,,01.03.1998,28.12.2016,28.12.2016,,,,Presently working in Sahiwal office
716,LO4397,Lahore Region Office,Filled,Mr. Muhammad Asif,Chowkidar,,,1,31898777,,33104-5281901-9,,0306-0421328,Male,Direct,,15.07.1994,08.04.2017,05.12.2024,,,,Working as JC on CCB
717,,HQ,Filled,Mr. Rashid Latif,Deputy Director Mines & Minerals,,18,18,31492189,MUHAMMAD LATIF,35202-8831805-7,Lahore,0345-4287650,Male,Promotee ,,03.08.1988,11.04.2011,10.06.2022,15.11.2020,,,Deputy Secretary (Technical) MMD
718,,HQ,Filled,Mrs. Noor-ul-Ain,Assistant Director Mines & Minerals,,17,17,,,,,,Female,Direct,Women,,21.04.2026,21.04.2026,On Contract,Administration,AD (P&C),
719,,HQ,Filled,Mrs. Maniha Noor,Assistant Director Mines & Minerals,,17,17,,SHAHID MEHMOOD,34301-0956125-2,Hafizabad,0307-4720598,Female,Direct,Women,09.01.2001,21.04.2026,21.04.2026,On Contract,DG Cell,AD (LSM),
720,,HQ,Filled,Mrs. Fatima Aslam,Assistant Director Mines & Minerals,,17,17,,MUHAMMAD ASLAM,35202-6564999-8,Sheikhupura,0332-4470891,Female,Direct,Open,08.11.1997,28.04.2026,05.05.2026,On Contract,Small Mines Assistance / Titles,AD (Auction),
721,,Sargodha Office,Filled,Mr. Bahadar Khan,Senior Clerk,14,14,14,30567495,,38403-2121413-1,,0300-6058363,Male,Promotee ,,01.02.1965,09.06.1987,08.01.2004,,,,Transferred from Khushab office
722,,DD Chakwal Office,Filled,Mr. Muhammad Akram,Naib Qasid,1,1,1,30701288,,37405-0488120-1,,0349-8241721,Male,Direct,Open,18.02.1965,31.01.1985,07.06.2004,,,,
723,,Rawalpindi Office,Filled,Mr. Hameed Ullah Khan,Survey & Drawing Officer,16,18,18,30441545,,38301-2245439-1,,0300-6092397,Male,Promotee ,,07.03.1965,05.05.1990,03.11.2018,,,,
724,,Rawalpindi Office,Filled,Mr. Javaid Iqbal,Superintendent,17,17,17,,,,,,0300-5192152,Male,Promotee ,,01.04.1965,12.03.1984,03.11.2018,,,,
725,,DD Chakwal Office,Filled,Mr. Fahim Khalid Khan,Superintendent,17,17,17,30880162,,37103-4065491-9,Chakwal,0331-4331150,Male,Promotee ,,26.08.1965,03.02.1993,on LPR,,,,
726,,HQ Office,Filled,Mr. Irfan Athar,Superintendent,17,17,17,30074066,IRSHAD AHMAD,35202-7245278-0,Lahore,0315 4267557,Male,Promotee ,,17.11.1965,25.09.1984,on LPR,,,,On LPR
727,,Rawalpindi Office,Filled,Mr. Muhammad Yaqub Sheikh,Assistant,16,16,16,30700686,,37405-0224623-9,,0333-5078294,Male,Direct,,02.10.1965,22.05.1985,06.08.2010,,,,On LPR
728,,Lahore Region Office,Filled,Mr. Mehmood Ali,Naib Qasid,1,6,6,30083601,YAQOOB ALI,35202-7272918-1,Lahore,0321-4776382,Male,Direct,Open,10.11.1965,12.03.1987,12.03.1987,,,,On LPR
729,,Sargodha Office,Filled,Mr. Muhammad Asghar,Chainman,1,5,5,30515022,,38403-9568070-3,,0346-8646399,Male,Direct,Open,01.01.1966,01.07.1987,05.10.2010,,,,
730,,HQ Office,Filled,Mr. Allah Yar,Director Mines & Minerals (Resource Mapping),19,19,19,30124298,MUHAMMAD ISMAIL,35101-2483618-1,Kasur,0333-4073837,Male,Direct,Open,14.01.1966,22.12.1991,01.01.2025,11.05.2006,Resource Mapping,,
731,,HQ Office,Filled,Mr. Asghar Niaz,Account Officer,16,16,16,31011785,NIAZ ALI,37405-0217187-7,,0333-5318996,Male,,,12.05.1966,04.06.1988,On LPR,14.07.2020,,,,On LPR
732,,Chiniot Office,Filled,Raja Muhammad Ayyaz,Mineral Development Officer,16,16,16,,,,,0300-5515350,Male,Promotee ,,01.01.1967,09.04.1994,01.03.2024,,,,
733,,DD Chakwal Office,Filled,Mr. Mehmood Ali,Assistant,16,16,16,30701239,,,38303-9071438-7,,0314-9304264,Male,Promotee ,Open,01.01.1969,08.01.2004,08.01.2004,,,,
734,,HQ,Filled,Mr. Naseer Ahmad,Naib Qasid,1,1,1,,31464185,,35403-1611327-9,,Male,Direct,Open,01.02.1975,15.02.2010,,,,,
735,,HQ,Filled,Mr. Tariq Hussain,Driver,5,5,5,31898780,SHER MUHAMMAD,35201-1565061-3,Lahore,0300-4805680,Male,Direct,Open,06.09.1981,13.04.2017,13.04.2017,29.05.2020,DG Cell,Driver,
736,,HQ,Filled,Mr. Umair Anwar,Manager (Information Technology),18,18,18,32248129,KAUSAR NAHEED ANWAR,37301-8474157-7,Jhelum,0305-5844000,Male,Direct,Open,23.09.1988,21.06.2023,21.06.2023,On Contract,DG Cell,IT (Branch),
737,,HQ,Filled,Mr. Jalil Ahmad,Hardware Technician,16,16,16,32139258,ZAHOOR AHMED,34402-4270040-7,Mandi Bahauddin,0308-5536005,Male,Direct,Open,01.05.1993,01.11.2019,01.11.2019,15.10.2019,Information Services & Promotion,GIS Lab,Working with Manager IT
738,,DD Chakwal Office,Filled,Mr. Nakash Munawar,Chainman,1,1,1,31894134,,37202-9014309-1,,0343-5937450,Male,Direct,Open,06.10.1992,01.04.2017,01.04.2017,,,,Transferred to Chief Inspectorate of Mines
739,,HQ,Filled,Mr. Muhammad Jahangir,Driver,5,5,5,31922423,BASHIR AHMAD,35501-0125336-5,Nankana,0331-6385114,Male,Direct,Open,15.12.1986,13.04.2017,13.04.2017,23.12.2020,,,Absent from official duty`;

const rosterLines = rosterRaw.split('\n').filter(l => l.trim().length > 0);

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += c;
    }
  }
  result.push(current.trim());
  return result;
}

const roster = rosterLines.map((line, idx) => {
  const cols = parseCsvLine(line);
  const sr = cols[0] || String(idx + 1);
  const costCentre = cols[1] || '';
  const office = cols[2] || 'Headquarters (Lahore)';
  const status = (cols[3] || 'Filled').trim();
  const name = cols[4] || '-';
  const designation = cols[5] || cols[6] || '-';
  const bps = cols[8] || cols[7] || cols[6] || '1';
  const personalNo = cols[9] || '-';
  const fatherName = cols[10] || '-';
  const cnic = cols[11] || '-';
  const domicile = cols[12] || '-';
  const contact = cols[13] || '-';
  const gender = cols[14] || (name.includes('Mrs.') || name.includes('Miss') || name.includes('Mst.') ? 'Female' : 'Male');
  const appointmentType = cols[15] || 'Direct';
  const quota = cols[16] || 'Open';
  const dob = cols[17] || '-';
  const entryDate = cols[18] || '-';
  const postingDate = cols[19] || '-';
  const regularizationDate = cols[20] || '-';
  const division = cols[21] || 'Administration';
  const branch = cols[22] || '-';
  const remarks = cols[23] || '';

  return {
    sr: parseInt(sr, 10) || (idx + 1),
    costCentre,
    office: office.replace(/office/i, 'Office').trim(),
    status,
    name,
    designation,
    bps: parseInt(bps, 10) || 16,
    personalNo,
    fatherName,
    cnic,
    domicile,
    contact,
    gender,
    appointmentType,
    quota,
    dob,
    entryDate,
    postingDate,
    regularizationDate,
    division,
    branch,
    remarks
  };
});

console.log('Parsed roster records:', roster.length);

const output = `// ===================================================================
// GOVERNMENT OF THE PUNJAB — DIRECTORATE GENERAL OF MINES & MINERALS
// ADMINISTRATION DIVISION & HUMAN CAPITAL MASTER REGISTER
// ===================================================================

if (typeof window === 'undefined') {
  global.window = {};
}

window.DGM_DATA = window.DGM_DATA || {};

window.DGM_DATA.admin = {
  summary: ${JSON.stringify(summary, null, 2)},
  offices: ${JSON.stringify(offices, null, 2)},
  cadre: ${JSON.stringify(cadre, null, 2)},
  roster: ${JSON.stringify(roster, null, 2)}
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.DGM_DATA.admin;
}
`;

fs.writeFileSync('c:\\Users\\dgmnm\\OneDrive\\Desktop\\DG M&M Data\\admin_data.js', output, 'utf8');
console.log('Successfully generated admin_data.js!');
