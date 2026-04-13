// RAZ 分级读物索引 — 共 974 本，20 个级别
// 音频路径: /media/raz/<level>/<title>.mp3
// PDF路径: /media/RAZ 2000册/<level folder>/<book>/<book>_clr.pdf（彩色绘本正文）
// 生产环境通过 mediaUrl() 转换为 https://media.qierfel-kid.com/...

export const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL || ''

const razLevelsRaw = [
  {
    "level": "aa",
    "grade": "Pre-K",
    "ar": "0.1-0.4",
    "desc": "学前启蒙，简单图文对应",
    "count": 49,
    "books": [
      {
        "title": "Big",
        "audio": "/media/raz/aa/Big.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Big/raz_laa06_big_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Big/raz_laa06_big_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Big/raz_laa27wb_big.pdf"
      },
      {
        "title": "Colorful Eggs",
        "audio": "/media/raz/aa/Colorful Eggs.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Colorful Eggs/raz_laa54_colorfuleggs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Colorful Eggs/raz_laa54_colorfuleggs_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Colorful Eggs/raz_laa54wb_colorfuleggs.pdf"
      },
      {
        "title": "Counting Bugs",
        "audio": "/media/raz/aa/Counting Bugs.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Counting Bugs/raz_laa48_countingbugs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Counting Bugs/raz_laa48_countingbugs_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Counting Bugs/raz_laa48wb_countingbugs.pdf"
      },
      {
        "title": "Counting Letters",
        "audio": "/media/raz/aa/Counting Letters.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Counting Letters/raz_laa25_countletters_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Counting Letters/raz_laa25_countletters_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Counting Letters/raz_laa25wb_countletters.pdf"
      },
      {
        "title": "Farm Animals",
        "audio": "/media/raz/aa/Farm Animals.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Farm Animals/raz_laa02_farmanimals_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Farm Animals/raz_laa02_farmanimals_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Farm Animals/raz_laa02wb_farmanimals.pdf"
      },
      {
        "title": "Fido Gets Dressed",
        "audio": "/media/raz/aa/Fido Gets Dressed.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Fido Gets Dressed/raz_laa15_fidogetdress_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Fido Gets Dressed/raz_laa15_fidodress_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Fido Gets Dressed/raz_laa15wb_fidogetdress.pdf"
      },
      {
        "title": "Four",
        "audio": "/media/raz/aa/Four.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Four/raz_laa59_four_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Four/raz_laa59_four_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Four/raz_laa59wb_four.pdf"
      },
      {
        "title": "Go- Go- Go",
        "audio": "/media/raz/aa/Go- Go- Go.mp3"
      },
      {
        "title": "In",
        "audio": "/media/raz/aa/In.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/In/raz_laa10_in_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/In/raz_laa10_in_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/In/raz_laa29wb_in.pdf"
      },
      {
        "title": "It Is Fall",
        "audio": "/media/raz/aa/It Is Fall.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/It Is Fall/raz_laa49_itisfall_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/It Is Fall/raz_laa21_itisfall_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/It Is Fall/raz_laa41wb_itisfall.pdf"
      },
      {
        "title": "Jump Over",
        "audio": "/media/raz/aa/Jump Over.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Jump Over/raz_laa26_jumpover_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Jump Over/raz_laa26_jumpover_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Jump Over/raz_laa26wb_jumpover.pdf"
      },
      {
        "title": "Little",
        "audio": "/media/raz/aa/Little.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Little/raz_laa42_little_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Little/raz_laa07_little_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Little/raz_laa07wb_little.pdf"
      },
      {
        "title": "Lunch at School",
        "audio": "/media/raz/aa/Lunch at School.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Lunch at School/raz_laa52_lunchatschool_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Lunch at School/raz_laa52_lunchatschool_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Lunch at School/raz_laa52wb_lunchatschool.pdf"
      },
      {
        "title": "My Family",
        "audio": "/media/raz/aa/My Family.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/My Family/raz_laa05_myfamily_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/My Family/raz_laa05_myfamily_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/My Family/raz_laa05wb_myfamily.pdf"
      },
      {
        "title": "My Gift for Mom",
        "audio": "/media/raz/aa/My Gift for Mom.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/My Gift for Mom/raz_laa50_mygiftmom_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/My Gift for Mom/raz_laa50_mygiftmom_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/My Gift for Mom/raz_laa50wb_mygiftmom.pdf"
      },
      {
        "title": "My School Bus",
        "audio": "/media/raz/aa/My School Bus.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/My School Bus/raz_laa51_myschoolbus_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/My School Bus/raz_laa51_myschoolbus_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/My School Bus/raz_laa51wb_myschoolbus.pdf"
      },
      {
        "title": "On",
        "audio": "/media/raz/aa/On.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/On/raz_laa43_on_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/On/raz_laa12_on_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/On/raz_laa43wb_on.pdf"
      },
      {
        "title": "One Insect",
        "audio": "/media/raz/aa/One Insect.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/One Insect/raz_la32_oneinsect_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/One Insect/raz_la32_oneinsect_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/One Insect/raz_la32wb_oneinsect.pdf"
      },
      {
        "title": "One",
        "audio": "/media/raz/aa/One.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/One/raz_laa57_one_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/One/raz_laa57_one_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/One/raz_laa57wb_one(1).pdf"
      },
      {
        "title": "Out",
        "audio": "/media/raz/aa/Out.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Out/raz_laa11_out_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Out/raz_laa11_out_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Out/raz_laa30wb_out.pdf"
      },
      {
        "title": "Over",
        "audio": "/media/raz/aa/Over.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Over/raz_laa16_over_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Over/raz_laa16_over_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Over/raz_laa16wb_over.pdf"
      },
      {
        "title": "Pasta!",
        "audio": "/media/raz/aa/Pasta!.mp3"
      },
      {
        "title": "Pets",
        "audio": "/media/raz/aa/Pets.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Pets/raz_laa44_pets_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Pets/raz_laa14_pets_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Pets/raz_laa14wb_pets.pdf"
      },
      {
        "title": "Play Ball!",
        "audio": "/media/raz/aa/Play Ball!.mp3"
      },
      {
        "title": "Show Some Love",
        "audio": "/media/raz/aa/Show Some Love.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Show Some Love/raz_laa49_showsomelove_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Show Some Love/raz_laa49_showsomelove_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Show Some Love/raz_laa49wb_showsomelove.pdf"
      },
      {
        "title": "Spring",
        "audio": "/media/raz/aa/Spring.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Spring/raz_laa48_spring_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Spring/raz_laa19_spring_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Spring/raz_laa31wb_spring.pdf"
      },
      {
        "title": "Summer Picnics",
        "audio": "/media/raz/aa/Summer Picnics.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Summer Picnics/raz_laa24_summerpicnics_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Summer Picnics/raz_laa24_summerpicnics_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Summer Picnics/raz_laa24wb_summerpicnics.pdf"
      },
      {
        "title": "Summer",
        "audio": "/media/raz/aa/Summer.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Summer/raz_laa44_summer_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Summer/raz_laa08_summer_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Summer/raz_laa44wb_summer.pdf"
      },
      {
        "title": "The Backyard",
        "audio": "/media/raz/aa/The Backyard.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Backyard/raz_laa46_backyard_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Backyard/raz_laa46_backyard_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Backyard/raz_laa46wb_backyard.pdf"
      },
      {
        "title": "The Book",
        "audio": "/media/raz/aa/The Book.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Book/raz_laa48_book_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Book/raz_laa48_book_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Book/raz_laa48wb_book.pdf"
      },
      {
        "title": "The City",
        "audio": "/media/raz/aa/The City.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The City/raz_laa03_thecity_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The City/raz_laa03_thecity_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The City/raz_laa03wb_thecity.pdf"
      },
      {
        "title": "The Classroom",
        "audio": "/media/raz/aa/The Classroom.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Classroom/raz_laa17_theclassroom_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Classroom/raz_laa17_theclassroom_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Classroom/raz_laa17wb_theclassroom.pdf"
      },
      {
        "title": "The Coast",
        "audio": "/media/raz/aa/The Coast.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Coast/raz_laa39_coast_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Coast/raz_laa39_coast_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Coast/raz_laa39wb_coast.pdf"
      },
      {
        "title": "The Fort",
        "audio": "/media/raz/aa/The Fort.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Fort/raz_laa53_fort_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Fort/raz_laa53_fort_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Fort/raz_laa53wb_fort.pdf"
      },
      {
        "title": "The Garden",
        "audio": "/media/raz/aa/The Garden.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Garden/raz_laa23_thegarden_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Garden/raz_laa23_thegarden_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Garden/raz_laa23wb_thegarden.pdf"
      },
      {
        "title": "The Ocean",
        "audio": "/media/raz/aa/The Ocean.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Ocean/raz_laa37_ocean_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Ocean/raz_laa37_ocean_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Ocean/raz_laa37wb_ocean.pdf"
      },
      {
        "title": "The Plant",
        "audio": "/media/raz/aa/The Plant.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Plant/raz_laa40_plant_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Plant/raz_laa38_plant_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Plant/raz_laa38wb_plant.pdf"
      },
      {
        "title": "The School",
        "audio": "/media/raz/aa/The School.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The School/raz_laa22_theschool_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The School/raz_laa22_theschool_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The School/raz_laa22wb_theschool.pdf"
      },
      {
        "title": "The Street",
        "audio": "/media/raz/aa/The Street.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Street/raz_laa55_street_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Street/raz_laa55_street_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Street/raz_laa55wb_street.pdf"
      },
      {
        "title": "The Supermarket",
        "audio": "/media/raz/aa/The Supermarket.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Supermarket/raz_laa48_supermarket_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Supermarket/raz_laa48_supermarket_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Supermarket/raz_laa48wb_supermarket.pdf"
      },
      {
        "title": "The Trip",
        "audio": "/media/raz/aa/The Trip.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Trip/raz_laa47_trip_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Trip/raz_laa47_trip_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/The Trip/raz_laa47wb_trip.pdf"
      },
      {
        "title": "Three",
        "audio": "/media/raz/aa/Three.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Three/raz_laa58_three_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Three/raz_laa58_three_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Three/raz_laa58wb_three.pdf"
      },
      {
        "title": "Too Many Sweets",
        "audio": "/media/raz/aa/Too Many Sweets.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Too Many Sweets/raz_laa49_toomanysweets_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Too Many Sweets/raz_laa49_toomanysweets_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Too Many Sweets/raz_laa49wb_toomanysweets.pdf"
      },
      {
        "title": "Toys",
        "audio": "/media/raz/aa/Toys.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Toys/raz_laa26_toys_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Toys/raz_laa26_toys_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Toys/raz_laa26wb_toys.pdf"
      },
      {
        "title": "Two",
        "audio": "/media/raz/aa/Two.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Two/raz_laa56_two_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Two/raz_laa56_two_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Two/raz_laa56wb_two.pdf"
      },
      {
        "title": "Under",
        "audio": "/media/raz/aa/Under.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Under/raz_laa45_under_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Under/raz_laa13_under_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Under/raz_laa45wb_under.pdf"
      },
      {
        "title": "Water",
        "audio": "/media/raz/aa/Water.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Water/raz_laa47_water_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Water/raz_laa47_water_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Water/raz_laa47wb_water.pdf"
      },
      {
        "title": "We Build",
        "audio": "/media/raz/aa/We Build.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/We Build/raz_laa18_webuild_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/We Build/raz_laa18_webuild_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/We Build/raz_laa18wb_webuild.pdf"
      },
      {
        "title": "Winter",
        "audio": "/media/raz/aa/Winter.mp3",
        "pdf": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Winter/raz_laa09_winter_clr.pdf",
        "worksheet": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Winter/raz_laa09_winter_wksh.pdf",
        "workbook": "/media/RAZ 2000册/AA 93+2+4-2019-02/AA 93+2+4/Winter/raz_laa09wb_winter.pdf"
      }
    ]
  },
  {
    "level": "A",
    "grade": "K",
    "ar": "0.4-0.7",
    "desc": "幼儿园，单词和短语",
    "count": 48,
    "books": [
      {
        "title": "All Kinds of Faces",
        "audio": "/media/raz/A/All Kinds of Faces.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/All Kinds of Faces/raz_la26_allkindsfaces_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/All Kinds of Faces/raz_la26_allkindsfaces_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/All Kinds of Faces/raz_la26wb_allkindsfaces.pdf"
      },
      {
        "title": "Baby Animals",
        "audio": "/media/raz/A/Baby Animals.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Baby Animals/raz_la07_babyanimals_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Baby Animals/raz_la07_babyanimals_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Baby Animals/raz_la07wb_babyanimals.pdf"
      },
      {
        "title": "Bedtime Counting",
        "audio": "/media/raz/A/Bedtime Counting.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Bedtime Counting/raz_la38_bedtimecounting_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Bedtime Counting/raz_la38_bedtimecounting_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Bedtime Counting/raz_la38wb_bedtimecounting.pdf"
      },
      {
        "title": "Bird Colors",
        "audio": "/media/raz/A/Bird Colors.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Bird Colors/raz_la37_birdcolors_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Bird Colors/raz_la37_birdcolors_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Bird Colors/raz_la37wb_birdcolors.pdf"
      },
      {
        "title": "Bird Goes Home",
        "audio": "/media/raz/A/Bird Goes Home.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Bird Goes Home/raz_la03_birdhome_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Bird Goes Home/raz_la03_birdgoes_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Bird Goes Home/raz_la03wb_birdhome.pdf"
      },
      {
        "title": "Car Parts",
        "audio": "/media/raz/A/Car Parts.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Car Parts/raz_la38_carparts_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Car Parts/raz_la38_carparts_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Car Parts/raz_la38wb_carparts.pdf"
      },
      {
        "title": "Carlos Counts Kittens",
        "audio": "/media/raz/A/Carlos Counts Kittens.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Carlos Counts Kittens/carloscountskittens_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Carlos Counts Kittens/carloscountskittens_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Carlos Counts Kittens/raz_la29wb_carloscountskittens.pdf"
      },
      {
        "title": "Carlos Goes to School",
        "audio": "/media/raz/A/Carlos Goes to School.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Carlos Goes to School/Carlos Goes to School.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Carlos Goes to School/raz_carlosgoestoschool_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Carlos Goes to School/raz_la30wb_carlosgoestoschool.pdf"
      },
      {
        "title": "Fruit Colors",
        "audio": "/media/raz/A/Fruit Colors.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Fruit Colors/raz_la31_fruitcolors_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Fruit Colors/raz_la31_fruitcolors_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Fruit Colors/raz_la31wb_fruitcolors.pdf"
      },
      {
        "title": "Fruit",
        "audio": "/media/raz/A/Fruit.mp3"
      },
      {
        "title": "Fun in the Water",
        "audio": "/media/raz/A/Fun in the Water.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Fun in the Water/raz_la41_funinwater_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Fun in the Water/raz_la41_funinwater_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Fun in the Water/raz_la41wb_funinwater.pdf"
      },
      {
        "title": "Getting Dressed",
        "audio": "/media/raz/A/Getting Dressed.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Getting Dressed/raz_la14_getdressed_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Getting Dressed/raz_la14_getdressed_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Getting Dressed/raz_la14wb_getdressed.pdf"
      },
      {
        "title": "Going Places",
        "audio": "/media/raz/A/Going Places.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Going Places/raz_la37_goingplaces_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Going Places/raz_la11_goingplaces_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Going Places/raz_la11wb_goingplaces.pdf"
      },
      {
        "title": "Hamster Home",
        "audio": "/media/raz/A/Hamster Home.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Hamster Home/raz_la33_hamsterhome_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Hamster Home/raz_la33_hamsterhome_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Hamster Home/raz_la33wb_hamsterhome.pdf"
      },
      {
        "title": "He Runs",
        "audio": "/media/raz/A/He Runs.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/He Runs/raz_la06_heruns_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/He Runs/raz_la06_heruns_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/He Runs/raz_la06wb_heruns.pdf"
      },
      {
        "title": "Hot and Cold",
        "audio": "/media/raz/A/Hot and Cold.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Hot and Cold/raz_la37_hotandcold_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Hot and Cold/raz_la18_hotandcold_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Hot and Cold/raz_la18wb_hotandcold.pdf"
      },
      {
        "title": "I Can",
        "audio": "/media/raz/A/I Can.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/I Can/raz_la10_ican_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/I Can/raz_la10_ican_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/I Can/raz_la10wb_ican.pdf"
      },
      {
        "title": "I Draw a Bunny",
        "audio": "/media/raz/A/I Draw a Bunny.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/I Draw a Bunny/raz_la37_idrawbunny_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/I Draw a Bunny/raz_la37_idrawbunny_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/I Draw a Bunny/raz_cqla37_idrawbunny.pdf"
      },
      {
        "title": "I Love Flowers",
        "audio": "/media/raz/A/I Love Flowers.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/I Love Flowers/raz_la39_iloveflowers_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/I Love Flowers/raz_la39_iloveflowers_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/I Love Flowers/raz_la39wb_iloveflowers.pdf"
      },
      {
        "title": "I Save Money",
        "audio": "/media/raz/A/I Save Money.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/I Save Money/raz_la27_isavemoney_clr.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/I Save Money/raz_la27wb_isavemoney.pdf"
      },
      {
        "title": "I See My Colors",
        "audio": "/media/raz/A/I See My Colors.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/I See My Colors/raz_la35_iseemycolors_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/I See My Colors/raz_la35_iseemycolors_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/I See My Colors/raz_la35wb_iseemycolor.pdf"
      },
      {
        "title": "I Set the Table",
        "audio": "/media/raz/A/I Set the Table.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/I Set the Table/raz_la35_isettable_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/I Set the Table/raz_la35_isettable_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/I Set the Table/raz_la35wb_isettable.pdf"
      },
      {
        "title": "In and Out",
        "audio": "/media/raz/A/In and Out.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/In and Out/raz_la08_inandout_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/In and Out/raz_la08_inandout_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/In and Out/raz_la08wb_inandout.pdf"
      },
      {
        "title": "Maria Counts Pumpkins",
        "audio": "/media/raz/A/Maria Counts Pumpkins.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Maria Counts Pumpkins/raz_la37_mariacountspumpkins_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Maria Counts Pumpkins/raz_la16_mariacounts_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Maria Counts Pumpkins/raz_la16wb_maria_counts.pdf"
      },
      {
        "title": "Maria Goes to School",
        "audio": "/media/raz/A/Maria Goes to School.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Maria Goes to School/raz_la37_mariagoestoschool_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Maria Goes to School/raz_la15_mariaschool_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Maria Goes to School/raz_la15wb_mariagoschool.pdf"
      },
      {
        "title": "Mom and I",
        "audio": "/media/raz/A/Mom and I.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Mom and I/raz_la23_momandi_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Mom and I/raz_la23_momandi_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Mom and I/raz_la23wb_momandi.pdf"
      },
      {
        "title": "My Body",
        "audio": "/media/raz/A/My Body.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/My Body/raz_la13_mybody_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/My Body/raz_la13_mybody_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/My Body/raz_la13wb_mybody.pdf"
      },
      {
        "title": "My Dog",
        "audio": "/media/raz/A/My Dog.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/My Dog/raz_la31_mydog_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/My Dog/raz_la02_mydog_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/My Dog/raz_la31wb_mydog.pdf"
      },
      {
        "title": "My Face",
        "audio": "/media/raz/A/My Face.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/My Face/raz_la12_myface_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/My Face/raz_la12_myface_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/My Face/raz_la12wb_myface.pdf"
      },
      {
        "title": "My Hair",
        "audio": "/media/raz/A/My Hair.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/My Hair/raz_la09_myhair_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/My Hair/raz_la09_myhair_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/My Hair/raz_la09wb_myhair.pdf"
      },
      {
        "title": "My House",
        "audio": "/media/raz/A/My House.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/My House/raz_la38_myhouse_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/My House/raz_la38_myhouse_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/My House/raz_la38wb_myhouse.pdf"
      },
      {
        "title": "My Room",
        "audio": "/media/raz/A/My Room.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/My Room/raz_la05_myroom_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/My Room/raz_la05_myroom_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/My Room/raz_la05wb_myroom.pdf"
      },
      {
        "title": "Opposites",
        "audio": "/media/raz/A/Opposites.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Opposites/raz_la25_opposites_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Opposites/raz_la25_opposites_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Opposites/raz_la25wb_opposites.pdf"
      },
      {
        "title": "Pond Animals",
        "audio": "/media/raz/A/Pond Animals.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Pond Animals/raz_la24_pondanimals_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Pond Animals/raz_la24_pondanimals_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Pond Animals/raz_la24wb_pondanimals.pdf"
      },
      {
        "title": "Rabbits",
        "audio": "/media/raz/A/Rabbits.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Rabbits/raz_la35_rabbits_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Rabbits/raz_la35_rabbits_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Rabbits/raz_la35wb_rabbits.pdf"
      },
      {
        "title": "Shapes in Nature",
        "audio": "/media/raz/A/Shapes in Nature.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Shapes in Nature/raz_la37_shapesinnature_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Shapes in Nature/raz_la37_shapesinnature_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Shapes in Nature/raz_la37wb_shapesinnature.pdf"
      },
      {
        "title": "Spring Weather",
        "audio": "/media/raz/A/Spring Weather.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Spring Weather/raz_la21_springweather_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Spring Weather/raz_la21_springweather_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Spring Weather/raz_la21wb_springweather.pdf"
      },
      {
        "title": "The Big Cat",
        "audio": "/media/raz/A/The Big Cat.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/The Big Cat/raz_la37_bigcat_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/The Big Cat/raz_la37_bigcat_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/The Big Cat/raz_la37wb_bigcat.pdf"
      },
      {
        "title": "The Forest",
        "audio": "/media/raz/A/The Forest.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/The Forest/raz_la32_forest_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/The Forest/raz_la32_forest_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/The Forest/raz_la32wb_forest.pdf"
      },
      {
        "title": "The Parade",
        "audio": "/media/raz/A/The Parade.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/The Parade/raz_la39_parade_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/The Parade/raz_la39_parade_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/The Parade/raz_la39wb_parade.pdf"
      },
      {
        "title": "The Rainstorm",
        "audio": "/media/raz/A/The Rainstorm.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/The Rainstorm/raz_la35_rainstorm_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/The Rainstorm/raz_la35_rainstorm_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/The Rainstorm/raz_la35wb_rainstorm.pdf"
      },
      {
        "title": "These Shoes",
        "audio": "/media/raz/A/These Shoes.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/These Shoes/raz_la36_theseshoes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/These Shoes/raz_la36_theseshoes_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/These Shoes/raz_la36wb_theseshoes.pdf"
      },
      {
        "title": "This Is My Bear",
        "audio": "/media/raz/A/This Is My Bear.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/This Is My Bear/raz_la34_thisismybear_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/This Is My Bear/raz_la34_thisismybear_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/This Is My Bear/raz_la34wb_thisismybear.pdf"
      },
      {
        "title": "Up and Down",
        "audio": "/media/raz/A/Up and Down.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/Up and Down/raz_la37_upanddown_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/Up and Down/raz_la22_upanddown_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/Up and Down/raz_la22wb_updown.pdf"
      },
      {
        "title": "We Can Make Sounds",
        "audio": "/media/raz/A/We Can Make Sounds.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/We Can Make Sounds/raz_la17_wemakesounds_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/We Can Make Sounds/raz_la17_wemakesounds_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/We Can Make Sounds/raz_la17wb_wemakesounds.pdf"
      },
      {
        "title": "What I Like",
        "audio": "/media/raz/A/What I Like.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/What I Like/raz_la20_whatilike_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/What I Like/raz_la20_whatilike_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/What I Like/raz_la20wb_whatilike.pdf"
      },
      {
        "title": "What Lives Here",
        "audio": "/media/raz/A/What Lives Here.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/What Lives Here/raz_la37_whatliveshere_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/What Lives Here/raz_la32_whatliveshere_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/What Lives Here/raz_la19wb_whatliveshere.pdf"
      },
      {
        "title": "You Can Dance",
        "audio": "/media/raz/A/You Can Dance.mp3",
        "pdf": "/media/RAZ 2000册/A 95+2+4-2019-02/You Can Dance/raz_la40_youcandance_clr.pdf",
        "worksheet": "/media/RAZ 2000册/A 95+2+4-2019-02/You Can Dance/raz_la40_youcandance_wksh.pdf",
        "workbook": "/media/RAZ 2000册/A 95+2+4-2019-02/You Can Dance/raz_la40wb_youcandance.pdf"
      }
    ]
  },
  {
    "level": "B",
    "grade": "K",
    "ar": "0.7-1.0",
    "desc": "幼儿园高段，重复句式",
    "count": 48,
    "books": [
      {
        "title": "Animal Coverings",
        "audio": "/media/raz/B/Animal Coverings.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Animal Coverings/raz_lb25_animalcoverings_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Animal Coverings/raz_lb25_animalcovering_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Animal Coverings/raz_lb25wb_animalcoverings.pdf"
      },
      {
        "title": "Animal Ears",
        "audio": "/media/raz/B/Animal Ears.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Animal Ears/raz_lb52_animalears_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Animal Ears/raz_lb52_animalears_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Animal Ears/raz_lb52wb_animalears.pdf"
      },
      {
        "title": "Animal Sounds",
        "audio": "/media/raz/B/Animal Sounds.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Animal Sounds/raz_lb47_animalsounds_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Animal Sounds/raz_lb17_animalsound_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Animal Sounds/raz_lb17wb_animalsounds.pdf"
      },
      {
        "title": "Animals Can Move",
        "audio": "/media/raz/B/Animals Can Move.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Animals Can Move/raz_lb18_animalscanmove_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Animals Can Move/raz_lb18_animalsmove_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Animals Can Move/raz_lb18wb_animalscanmove.pdf"
      },
      {
        "title": "Applesauce",
        "audio": "/media/raz/B/Applesauce.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Applesauce/raz_lb44_applesauce_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Applesauce/raz_lb44_applesauce_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Applesauce/raz_lb44wb_applesauce.pdf"
      },
      {
        "title": "Bananas Sometimes",
        "audio": "/media/raz/B/Bananas Sometimes.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Bananas Sometimes/raz_lb47_bananassometimes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Bananas Sometimes/raz_lb22_bananassome_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Bananas Sometimes/raz_lb22wb_bananassome.pdf"
      },
      {
        "title": "Carlos and His Teacher",
        "audio": "/media/raz/B/Carlos and His Teacher.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Carlos and His Teacher/raz_lb32_carlosandhisteacher_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Carlos and His Teacher/raz_lb32_carlosandhisteacher_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Carlos and His Teacher/raz_lb32wb_carlosandhisteacher.pdf"
      },
      {
        "title": "Games We Play",
        "audio": "/media/raz/B/Games We Play.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Games We Play/raz_lb03_gamesweplay_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Games We Play/raz_lb03_games_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Games We Play/raz_lb03wb_gamesweplay.pdf"
      },
      {
        "title": "Go Animals Go",
        "audio": "/media/raz/B/Go Animals Go.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Go Animals Go/raz_lb39_goanimalsgo_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Go Animals Go/raz_lb02_goanigo_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Go Animals Go/raz_lb39wb_goanimalsgo.pdf"
      },
      {
        "title": "Gracie's Nose",
        "audio": "/media/raz/B/Gracie's Nose.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Gracie's Nose/raz_lb38_graciesnose_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Gracie's Nose/raz_lb38_graciesnose_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Gracie's Nose/raz_lb38wb_graciesnose.pdf"
      },
      {
        "title": "How Many Legs",
        "audio": "/media/raz/B/How Many Legs.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/How Many Legs/raz_lb47_howmanylegs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/How Many Legs/raz_lb12_howmanylegs_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/How Many Legs/raz_lb40wb_howmanylegs.pdf"
      },
      {
        "title": "I Love Art Class",
        "audio": "/media/raz/B/I Love Art Class.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/I Love Art Class/raz_lb49_iloveartclass_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/I Love Art Class/raz_lb49_iloveartclass_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/I Love Art Class/raz_lb49wb_iloveartclass.pdf"
      },
      {
        "title": "I Love the Earth",
        "audio": "/media/raz/B/I Love the Earth.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/I Love the Earth/raz_lb46_iloveearth_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/I Love the Earth/raz_lb46_iloveearth_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/I Love the Earth/raz_lb46wb_iloveearth.pdf"
      },
      {
        "title": "I Pick Up",
        "audio": "/media/raz/B/I Pick Up.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/I Pick Up/raz_lb19_ipickup_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/I Pick Up/raz_lb19_ipickup_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/I Pick Up/raz_lb19wb_ipickup.pdf"
      },
      {
        "title": "I Read a Book",
        "audio": "/media/raz/B/I Read a Book.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/I Read a Book/raz_lb05_iread_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/I Read a Book/raz_lb05_iread_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/I Read a Book/raz_lb35wb_ireadbook.pdf"
      },
      {
        "title": "It Is School Time",
        "audio": "/media/raz/B/It Is School Time.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/It Is School Time/raz_lb20_itisschooltime_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/It Is School Time/raz_lb20_itisschooltime_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/It Is School Time/raz_lb20wb_itisschooltime.pdf"
      },
      {
        "title": "It Is Spring",
        "audio": "/media/raz/B/It Is Spring.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/It Is Spring/raz_lb06_itisspring_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/It Is Spring/raz_lb06_itisspring_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/It Is Spring/raz_lb06wb_itisspring.pdf"
      },
      {
        "title": "Light and Heavy",
        "audio": "/media/raz/B/Light and Heavy.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Light and Heavy/raz_lb47_lightandheavy_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Light and Heavy/raz_lb47_lightandheavy_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Light and Heavy/raz_lb47wb_lightandheavy.pdf"
      },
      {
        "title": "Maria and Her Teacher",
        "audio": "/media/raz/B/Maria and Her Teacher.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Maria and Her Teacher/raz_lb24_mariateacher_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Maria and Her Teacher/raz_lb24_mariateacher_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Maria and Her Teacher/raz_lb24wb_mariateacher.pdf"
      },
      {
        "title": "Near and Far Away",
        "audio": "/media/raz/B/Near and Far Away.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Near and Far Away/raz_lb14_nearandfaraway_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Near and Far Away/raz_lb14_nearandfar_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Near and Far Away/raz_lb14wb_nearandfaraway.pdf"
      },
      {
        "title": "On the Farm",
        "audio": "/media/raz/B/On the Farm.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/On the Farm/raz_lb36_onfarm_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/On the Farm/raz_lb04_onthefarm_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/On the Farm/raz_lb36wb_onfarm.pdf"
      },
      {
        "title": "Our Show",
        "audio": "/media/raz/B/Our Show.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Our Show/raz_lb50_ourshow_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Our Show/raz_lb50_ourshow_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Our Show/raz_lb50wb_ourshow.pdf"
      },
      {
        "title": "Paint It Purple",
        "audio": "/media/raz/B/Paint It Purple.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Paint It Purple/raz_lb40_paintitpurple_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Paint It Purple/raz_lb11_paintpurple_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Paint It Purple/raz_lb40wb_paintitpurple.pdf"
      },
      {
        "title": "Playful Puppy",
        "audio": "/media/raz/B/Playful Puppy.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Playful Puppy/raz_lb41_playfulpuppy_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Playful Puppy/raz_lb08_playfulpuppy_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Playful Puppy/raz_lb41wb_playfulpuppy.pdf"
      },
      {
        "title": "Pond Life",
        "audio": "/media/raz/B/Pond Life.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Pond Life/raz_lb15_pondlife_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Pond Life/raz_lb15_pondlife_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Pond Life/raz_lb15wb_pondlife.pdf"
      },
      {
        "title": "Rain in the City",
        "audio": "/media/raz/B/Rain in the City.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Rain in the City/raz_lb47_rainincity_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Rain in the City/raz_lb47_rainincity_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Rain in the City/raz_lb47wb_rainincity.pdf"
      },
      {
        "title": "Taking Care of Chase",
        "audio": "/media/raz/B/Taking Care of Chase.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Taking Care of Chase/raz_lb52_takingcareofchase_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Taking Care of Chase/raz_lb52_takingcareofchase_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Taking Care of Chase/raz_lb52wb_takingcareofchase.pdf"
      },
      {
        "title": "Taking the Bus",
        "audio": "/media/raz/B/Taking the Bus.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Taking the Bus/raz_lb26_takingthebus_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Taking the Bus/raz_lb26_takingthebus_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Taking the Bus/raz_lb26wb_takingthebus.pdf"
      },
      {
        "title": "Ten",
        "audio": "/media/raz/B/Ten.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Ten/raz_lb47_ten_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Ten/raz_lb47_ten_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Ten/raz_lb47wb_ten.pdf"
      },
      {
        "title": "The Big Game",
        "audio": "/media/raz/B/The Big Game.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/The Big Game/raz_lb51_biggame_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/The Big Game/raz_lb51_biggame_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/The Big Game/raz_lb51wb_biggame.pdf"
      },
      {
        "title": "The Hungry Goat",
        "audio": "/media/raz/B/The Hungry Goat.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/The Hungry Goat/raz_lb48_hungrygoat_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/The Hungry Goat/raz_lb48_hungrygoat_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/The Hungry Goat/raz_lb48wb_hungrygoat.pdf"
      },
      {
        "title": "The New Forest Path",
        "audio": "/media/raz/B/The New Forest Path.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/The New Forest Path/raz_lb46_newforestpath_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/The New Forest Path/raz_lb46_newforestpath_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/The New Forest Path/raz_lb46wb_newforestpath.pdf"
      },
      {
        "title": "The Picnic",
        "audio": "/media/raz/B/The Picnic.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/The Picnic/raz_lb42_picnic_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/The Picnic/raz_lb10_thepicnic_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/The Picnic/raz_lb42wb_picnic.pdf"
      },
      {
        "title": "Three Baby Birds",
        "audio": "/media/raz/B/Three Baby Birds.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Three Baby Birds/raz_lb45_threebabybirds_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Three Baby Birds/raz_lb45_threebabybirds_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Three Baby Birds/raz_lb45wb_threebabybirds.pdf"
      },
      {
        "title": "Too Many Leaves",
        "audio": "/media/raz/B/Too Many Leaves.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Too Many Leaves/raz_lb_toomanyleaves_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Too Many Leaves/raz_lb_toomanyleaves_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Too Many Leaves/rz_lb_toomanyleaves_wb.pdf"
      },
      {
        "title": "Two Little Dicky Birds",
        "audio": "/media/raz/B/Two Little Dicky Birds.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Two Little Dicky Birds/raz_lb46_twolittledickybirds_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Two Little Dicky Birds/raz_lb46_twolittledickybirds_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Two Little Dicky Birds/raz_lb46wb_twolittledickybirds.pdf"
      },
      {
        "title": "We Make Cookies",
        "audio": "/media/raz/B/We Make Cookies.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/We Make Cookies/raz_lb37_makecookies_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/We Make Cookies/raz_lb07_wemake_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/We Make Cookies/raz_lb37wb_makecookies.pdf"
      },
      {
        "title": "We Pack a Picnic",
        "audio": "/media/raz/B/We Pack a Picnic.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/We Pack a Picnic/raz_lb47_packpicnic_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/We Pack a Picnic/raz_lb29_wepackpicnic_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/We Pack a Picnic/raz_lb43wb_packpicnic.pdf"
      },
      {
        "title": "What Has These Feet",
        "audio": "/media/raz/B/What Has These Feet.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/What Has These Feet/raz_lb16_whathasfeet_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/What Has These Feet/raz_lb16_whathasfeet_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/What Has These Feet/raz_lb16wb_whathasfeet.pdf"
      },
      {
        "title": "What Has These Spots",
        "audio": "/media/raz/B/What Has These Spots.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/What Has These Spots/raz_lb30_whathasspots_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/What Has These Spots/raz_lb30_whathasspots_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/What Has These Spots/raz_lb30wb_whathasspots.pdf"
      },
      {
        "title": "What Has These Stripes",
        "audio": "/media/raz/B/What Has These Stripes.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/What Has These Stripes/raz_lb28_whathasstripes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/What Has These Stripes/raz_lb28_whathasstripes_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/What Has These Stripes/raz_lb28wb_whathasstripes.pdf"
      },
      {
        "title": "What Has This Tail",
        "audio": "/media/raz/B/What Has This Tail.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/What Has This Tail/raz_lb31_whathastail_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/What Has This Tail/raz_lb31_whathastail_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/What Has This Tail/raz_lb31wb_whathastail.pdf"
      },
      {
        "title": "Where Is Water",
        "audio": "/media/raz/B/Where Is Water.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Where Is Water/raz_lb13_whereiswater_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Where Is Water/raz_lb13_whereiswater_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Where Is Water/raz_lb13wb_whereiswater.pdf"
      },
      {
        "title": "Where",
        "audio": "/media/raz/B/Where.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Where/raz_lb09_where_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Where/raz_lb09_where_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Where/raz_lb09wb_where.pdf"
      },
      {
        "title": "Winter Fun",
        "audio": "/media/raz/B/Winter Fun.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Winter Fun/raz_lb27_winterfun_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Winter Fun/raz_lb27_winterfun_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Winter Fun/raz_lb27wb_winterfun.pdf"
      },
      {
        "title": "You Can Go",
        "audio": "/media/raz/B/You Can Go.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/You Can Go/raz_lb23_youcango_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/You Can Go/raz_lb23_youcango_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/You Can Go/raz_lb23wb_youcango.pdf"
      },
      {
        "title": "You and I",
        "audio": "/media/raz/B/You and I.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/You and I/raz_lb21_youandi_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/You and I/raz_lb21_youandi_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/You and I/raz_lb21wb_youandi.pdf"
      },
      {
        "title": "Yours or Mine",
        "audio": "/media/raz/B/Yours or Mine.mp3",
        "pdf": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Yours or Mine/raz_lb52_yoursormine_clr.pdf",
        "worksheet": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Yours or Mine/raz_lb52_yoursormine_wksh.pdf",
        "workbook": "/media/RAZ 2000册/B 95+2+4-2019-03/B 95+2+4-2019-02/Yours or Mine/raz_lb52wb_yoursormine.pdf"
      }
    ]
  },
  {
    "level": "C",
    "grade": "G1",
    "ar": "1.0-1.2",
    "desc": "一年级，常用词汇短句",
    "count": 49,
    "books": [
      {
        "title": "A Place Called Home",
        "audio": "/media/raz/C/A Place Called Home.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/A Place Called Home/raz_lc46_placecalledhome_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/A Place Called Home/raz_lc46_placecalledhome_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/A Place Called Home/raz_lc46wb_placecalledhome.pdf"
      },
      {
        "title": "All About Penguins",
        "audio": "/media/raz/C/All About Penguins.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/All About Penguins/raz_lc47_allaboutpenguins_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/All About Penguins/raz_lc47_allaboutpenguins_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/All About Penguins/raz_lc47wb_allaboutpenguins.pdf"
      },
      {
        "title": "All About Spiders",
        "audio": "/media/raz/C/All About Spiders.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/All About Spiders/raz_lc47_allaboutspiders_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/All About Spiders/raz_lc47_allaboutspiders_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/All About Spiders/raz_lc47wb_allaboutspiders.pdf"
      },
      {
        "title": "Allie and Ollie",
        "audio": "/media/raz/C/Allie and Ollie.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Allie and Ollie/raz_lc28_allieandollie_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Allie and Ollie/raz_lc28_allieandollie_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Allie and Ollie/raz_lc31wb_allieandollie.pdf"
      },
      {
        "title": "Birthday Party",
        "audio": "/media/raz/C/Birthday Party.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Birthday Party/raz_lc05_birthdayparty_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Birthday Party/raz_lc05_bparty_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Birthday Party/raz_lc05wb_birthdayparty.pdf"
      },
      {
        "title": "Busy At School",
        "audio": "/media/raz/C/Busy At School.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Busy At School/raz_lc44_busyatschool_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Busy At School/raz_lc18_busyatschool_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Busy At School/raz_lc34wb_busyatschool.pdf"
      },
      {
        "title": "Different Kinds of Sharks",
        "audio": "/media/raz/C/Different Kinds of Sharks.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Different Kinds of Sharks/raz_lc43_differentkindsofsharks_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Different Kinds of Sharks/raz_lc43_differentkindsofsharks_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Different Kinds of Sharks/raz_lc43wb_differentkindsofsharks.pdf"
      },
      {
        "title": "Fall Foods",
        "audio": "/media/raz/C/Fall Foods.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Fall Foods/raz_lc47_fallfoods_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Fall Foods/raz_lc47_fallfoods_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Fall Foods/raz_lc47wb_fallfoods.pdf"
      },
      {
        "title": "Fall",
        "audio": "/media/raz/C/Fall.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Fall/raz_lc14_fall_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Fall/raz_lc14_fall_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Fall/raz_lc14wb_fall.pdf"
      },
      {
        "title": "Feelings",
        "audio": "/media/raz/C/Feelings.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Feelings/raz_lc12_feelings_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Feelings/raz_lc12_feelings_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Feelings/raz_lc12wb_feelings.pdf"
      },
      {
        "title": "Get In",
        "audio": "/media/raz/C/Get In.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Get In/raz_lc34_getin_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Get In/raz_lc03_getin_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Get In/raz_lc34wb_getin.pdf"
      },
      {
        "title": "Go Away- Lily",
        "audio": "/media/raz/C/Go Away- Lily.mp3"
      },
      {
        "title": "Going Away",
        "audio": "/media/raz/C/Going Away.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Going Away/raz_lc07_goingaway_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Going Away/raz_lc07_goingaway_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Going Away/raz_lc07wb_goingaway.pdf"
      },
      {
        "title": "How Frogs Grow",
        "audio": "/media/raz/C/How Frogs Grow.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/How Frogs Grow/raz_lc40_howfrogsgrow_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/How Frogs Grow/raz_lc40_howfrogsgrow_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/How Frogs Grow/raz_lc40wb_howfrogsgrow.pdf"
      },
      {
        "title": "How Many Wheels",
        "audio": "/media/raz/C/How Many Wheels.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/How Many Wheels/raz_lc16_howmanywheels_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/How Many Wheels/raz_lc16_howmany_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/How Many Wheels/raz_lc16wb_howmanywheels.pdf"
      },
      {
        "title": "How Many",
        "audio": "/media/raz/C/How Many.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/How Many/raz_lc35_howmany_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/How Many/raz_lc09_howmany_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/How Many/raz_lc35wb_howmany.pdf"
      },
      {
        "title": "I Can Be",
        "audio": "/media/raz/C/I Can Be.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/I Can Be/raz_lc25_icanbe_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/I Can Be/raz_lc25_icanbe_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/I Can Be/raz_lc25wb_icanbe.pdf"
      },
      {
        "title": "I Looked Everywhere",
        "audio": "/media/raz/C/I Looked Everywhere.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/I Looked Everywhere/raz_lc21_ilookedevery_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/I Looked Everywhere/raz_lc21_ilookedevery_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/I Looked Everywhere/raz_lc21wb_ilookedevery.pdf"
      },
      {
        "title": "I Won't",
        "audio": "/media/raz/C/I Won't.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/I Won't/raz_lc29_iwont_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/I Won't/raz_lc29_iwont_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/I Won't/raz_lc29wb_iwont.pdf"
      },
      {
        "title": "I Wonder",
        "audio": "/media/raz/C/I Wonder.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/I Wonder/raz_lc33_iwonder_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/I Wonder/raz_lc33_iwonder_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/I Wonder/raz_lc33wb_iwonder.pdf"
      },
      {
        "title": "Jack and Lily's Favorite Food",
        "audio": "/media/raz/C/Jack and Lily's Favorite Food.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Jack and Lily's Favorite Food/raz_lc28_jackandlilysfavoritefood_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Jack and Lily's Favorite Food/raz_lc28_jackandlilysfavoritefood_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Jack and Lily's Favorite Food/raz_lc28wb_jackandlilysfavoritefood.pdf"
      },
      {
        "title": "Lucy Did It",
        "audio": "/media/raz/C/Lucy Did It.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Lucy Did It/raz_lc27_lucydidit_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Lucy Did It/raz_lc27_lucydidit_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Lucy Did It/raz_lc27wb_lucydidit.pdf"
      },
      {
        "title": "Machines at Home",
        "audio": "/media/raz/C/Machines at Home.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Machines at Home/machinesathome_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Machines at Home/raz_lc46_machinesathome_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Machines at Home/raz_lc46wb_machinesathome.pdf"
      },
      {
        "title": "Making Salsa!",
        "audio": "/media/raz/C/Making Salsa!.mp3"
      },
      {
        "title": "Mash the Potatoes",
        "audio": "/media/raz/C/Mash the Potatoes.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Mash the Potatoes/raz_lc43_mashpotatoes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Mash the Potatoes/raz_lc43_mashpotatoes_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Mash the Potatoes/raz_lc43wb_mashpotatoes.pdf"
      },
      {
        "title": "Mongo and Cutie",
        "audio": "/media/raz/C/Mongo and Cutie.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Mongo and Cutie/raz_lc41_mongoandcutie_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Mongo and Cutie/raz_lc41_mongoandcutie_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Mongo and Cutie/raz_lc41wb_mongoandcutie.pdf"
      },
      {
        "title": "New Again",
        "audio": "/media/raz/C/New Again.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/New Again/raz_lc47_newagain_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/New Again/raz_lc47_newagain_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/New Again/raz_lc47wb_newagain.pdf"
      },
      {
        "title": "Open and Close",
        "audio": "/media/raz/C/Open and Close.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Open and Close/raz_lc04_openclose_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Open and Close/raz_lc04_openclose_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Open and Close/raz_lc04wb_openclose.pdf"
      },
      {
        "title": "Pairs",
        "audio": "/media/raz/C/Pairs.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Pairs/raz_lc47_pairs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Pairs/raz_lc47_pairs_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Pairs/raz_lc47wb_pairs.pdf"
      },
      {
        "title": "Rocks",
        "audio": "/media/raz/C/Rocks.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Rocks/raz_lc19_rocks_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Rocks/raz_lc19_rocks_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Rocks/raz_lc19wb_rocks.pdf"
      },
      {
        "title": "Sherman Sure Is Shy",
        "audio": "/media/raz/C/Sherman Sure Is Shy.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Sherman Sure Is Shy/raz_lc42_shermansureisshy_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Sherman Sure Is Shy/raz_lc42_shermansureisshy_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Sherman Sure Is Shy/raz_lc42wb_shermansureisshy.pdf"
      },
      {
        "title": "Space",
        "audio": "/media/raz/C/Space.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Space/raz_lc41_space_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Space/raz_lc41_space_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Space/raz_lc41wb_space.pdf"
      },
      {
        "title": "Taking Turns",
        "audio": "/media/raz/C/Taking Turns.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Taking Turns/raz_lc42_takingturns_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Taking Turns/raz_lc42_takingturns_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Taking Turns/raz_lc42wb_takingturns.pdf"
      },
      {
        "title": "Teeth Brushing Fun",
        "audio": "/media/raz/C/Teeth Brushing Fun.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Teeth Brushing Fun/raz_lc47_teethbrushingfun_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Teeth Brushing Fun/raz_lc47_teethbrushingfun_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Teeth Brushing Fun/raz_lc47wb_teethbrushingfun.pdf"
      },
      {
        "title": "The Animals of Canada",
        "audio": "/media/raz/C/The Animals of Canada.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/The Animals of Canada/raz_lc15_animalsofcanada_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/The Animals of Canada/raz_lc15_animalcanada_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/The Animals of Canada/raz_lc15wb_animalsofcanada.pdf"
      },
      {
        "title": "The Easter Egg Hunt",
        "audio": "/media/raz/C/The Easter Egg Hunt.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/The Easter Egg Hunt/raz_lc45_easteregghunt_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/The Easter Egg Hunt/raz_lc45_easteregghunt_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/The Easter Egg Hunt/raz_lc45wb_easteregghunt.pdf"
      },
      {
        "title": "The Woodsy Band Jam",
        "audio": "/media/raz/C/The Woodsy Band Jam.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/The Woodsy Band Jam/raz_lc44_woodsybandjam_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/The Woodsy Band Jam/raz_lc20_woodsyband_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/The Woodsy Band Jam/raz_lc36wb_woodsybandjam.pdf"
      },
      {
        "title": "Tools",
        "audio": "/media/raz/C/Tools.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Tools/raz_lc13_tools_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Tools/raz_lc13_tools_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/Tools/raz_lc13wb_tools.pdf"
      },
      {
        "title": "We Count",
        "audio": "/media/raz/C/We Count.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/We Count/raz_lc22_wecount_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/We Count/raz_lc22_wecount_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/We Count/raz_lc22wb_wecount.pdf"
      },
      {
        "title": "We Make a Snowman",
        "audio": "/media/raz/C/We Make a Snowman.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/We Make a Snowman/raz_lc43_makesnowman_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/We Make a Snowman/raz_lc17_snowman_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/We Make a Snowman/raz_lc17wb_wemakesnowman.pdf"
      },
      {
        "title": "What Animals Eat",
        "audio": "/media/raz/C/What Animals Eat.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What Animals Eat/raz_lc02_whatanieat_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What Animals Eat/raz_lc02_whatanieat_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What Animals Eat/raz_lc37wb_whatanimalseat.pdf"
      },
      {
        "title": "What Do I Wear",
        "audio": "/media/raz/C/What Do I Wear.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What Do I Wear/raz_lc24_whatdoiwear_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What Do I Wear/raz_lc24_whatdoiwear_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What Do I Wear/raz_lc24wb_whatdoiwear.pdf"
      },
      {
        "title": "What I Want",
        "audio": "/media/raz/C/What I Want.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What I Want/raz_lc39_whatiwant_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What I Want/raz_lc39_whatiwant_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What I Want/raz_lc39wb_whatiwant.pdf"
      },
      {
        "title": "What Is at the Zoo",
        "audio": "/media/raz/C/What Is at the Zoo.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What Is at the Zoo/raz_lc08_whatatzoo_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What Is at the Zoo/raz_lc08_whatatzoo_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What Is at the Zoo/raz_lc08wb_whatatzoo.pdf"
      },
      {
        "title": "What's My Job",
        "audio": "/media/raz/C/What's My Job.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What's My Job/raz_lc44_whatsmyjob_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What's My Job/raz_lc44_whatsmyjob_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What's My Job/raz_lc44wb_whatsmyjob.pdf"
      },
      {
        "title": "What's for Breakfast",
        "audio": "/media/raz/C/What's for Breakfast.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What's for Breakfast/raz_lc47_whatsbreakfast_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What's for Breakfast/raz_lc47_whatsbreakfast_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/What's for Breakfast/raz_lc47wb_whatsbreakfast.pdf"
      },
      {
        "title": "When Is Nighttime",
        "audio": "/media/raz/C/When Is Nighttime.mp3",
        "pdf": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/When Is Nighttime/raz_lc11_whennight_clr.pdf",
        "worksheet": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/When Is Nighttime/raz_lc11_whennight_wksh.pdf",
        "workbook": "/media/RAZ 2000册/C 96+2+4-2019-03/C 96+2+4-2019-03/When Is Nighttime/raz_lc11wb_whennight.pdf"
      },
      {
        "title": "Who- Who- Who",
        "audio": "/media/raz/C/Who- Who- Who.mp3"
      },
      {
        "title": "Yummy- Yummy",
        "audio": "/media/raz/C/Yummy- Yummy.mp3"
      }
    ]
  },
  {
    "level": "D",
    "grade": "G1",
    "ar": "1.2-1.5",
    "desc": "一年级，稍长句子",
    "count": 47,
    "books": [
      {
        "title": "A Day for Dad",
        "audio": "/media/raz/D/A Day for Dad.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/A Day for Dad/raz_ld48_daydad_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/A Day for Dad/raz_ld48_daydad_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/A Day for Dad/raz_ld48wb_daydad.pdf"
      },
      {
        "title": "Animal Tongues",
        "audio": "/media/raz/D/Animal Tongues.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Animal Tongues/raz_ld42_animaltongues_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Animal Tongues/raz_ld42_animaltongues_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Animal Tongues/raz_ld42wb_animaltongues.pdf"
      },
      {
        "title": "At the Library",
        "audio": "/media/raz/D/At the Library.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/At the Library/raz_ld49_atlibrary_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/At the Library/raz_ld49_atlibrary_wksh.pdf"
      },
      {
        "title": "Backyard Camping",
        "audio": "/media/raz/D/Backyard Camping.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Backyard Camping/raz_ld49_backyardcamping_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Backyard Camping/raz_ld49_backyardcamping_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Backyard Camping/raz_ld49wb_backyardcamping.pdf"
      },
      {
        "title": "Bats Day and Night",
        "audio": "/media/raz/D/Bats Day and Night.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Bats Day and Night/raz_ld50_batsdayandnight_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Bats Day and Night/raz_ld50_batsdayandnight_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Bats Day and Night/raz_ld50wb_batsdayandnight.pdf"
      },
      {
        "title": "Caretakers",
        "audio": "/media/raz/D/Caretakers.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Caretakers/raz_ld11_caretakers_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Caretakers/raz_ld11_caretakers_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Caretakers/raz_ld11wb_caretakers.pdf"
      },
      {
        "title": "Clouds",
        "audio": "/media/raz/D/Clouds.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Clouds/raz_ld35_clouds_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Clouds/raz_ld08_clouds_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Clouds/raz_ld35wb_clouds.pdf"
      },
      {
        "title": "Community Helpers",
        "audio": "/media/raz/D/Community Helpers.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Community Helpers/raz_ld04_commhelpers_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Community Helpers/raz_ld04_community_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Community Helpers/raz_ld04wb_commhelpers.pdf"
      },
      {
        "title": "Country Places",
        "audio": "/media/raz/D/Country Places.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Country Places/raz_ld23_countryplaces_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Country Places/raz_ld23_countryplaces_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Country Places/raz_ld23wb_countryplaces.pdf"
      },
      {
        "title": "Dollars and Cents",
        "audio": "/media/raz/D/Dollars and Cents.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Dollars and Cents/raz_ld42_dollarsandcents_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Dollars and Cents/raz_ld42_dollarsandcents_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Dollars and Cents/raz_ld42wb_dollarsandcents.pdf"
      },
      {
        "title": "Frog Is Hungry",
        "audio": "/media/raz/D/Frog Is Hungry.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Frog Is Hungry/raz_ld45_frogishungry_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Frog Is Hungry/raz_ld20_frogishungry_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Frog Is Hungry/raz_ld20wb_frogishungry.pdf"
      },
      {
        "title": "Getting Around the City",
        "audio": "/media/raz/D/Getting Around the City.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Getting Around the City/raz_ld06_getaround_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Getting Around the City/raz_ld06_gettingaround_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Getting Around the City/raz_ld06wb_getaround.pdf"
      },
      {
        "title": "Give Them Back!",
        "audio": "/media/raz/D/Give Them Back!.mp3"
      },
      {
        "title": "Grow- Vegetables- Grow!",
        "audio": "/media/raz/D/Grow- Vegetables- Grow!.mp3"
      },
      {
        "title": "Hobbies",
        "audio": "/media/raz/D/Hobbies.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Hobbies/raz_ld50_hobbies_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Hobbies/raz_ld50_hobbies_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Hobbies/raz_ld50wb_hobbies.pdf"
      },
      {
        "title": "I Count 100 Things",
        "audio": "/media/raz/D/I Count 100 Things.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/I Count 100 Things/raz_ld18_icount100_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/I Count 100 Things/raz_ld18_icount100_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/I Count 100 Things/raz_ld18wb_icount100.pdf"
      },
      {
        "title": "I Like My Hair",
        "audio": "/media/raz/D/I Like My Hair.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/I Like My Hair/raz_ld34_ilikemyhair_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/I Like My Hair/raz_ld30_ilikemyhair_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/I Like My Hair/raz_ld30wb_ilikemyhair.pdf"
      },
      {
        "title": "I Need An Eraser",
        "audio": "/media/raz/D/I Need An Eraser.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/I Need An Eraser/raz_ld17_ineederaser_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/I Need An Eraser/raz_ld17_ineederaser_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/I Need An Eraser/raz_ld17wb_ineederaser.pdf"
      },
      {
        "title": "Lily the Cat",
        "audio": "/media/raz/D/Lily the Cat.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Lily the Cat/raz_ld26_lilythecat_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Lily the Cat/raz_ld26_lilythecat_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Lily the Cat/raz_ld26wb_lilythecat.pdf"
      },
      {
        "title": "Little Loon",
        "audio": "/media/raz/D/Little Loon.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Little Loon/raz_ld32_littleloon_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Little Loon/raz_ld32_littleloon_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Little Loon/raz_ld32wb_littleloon.pdf"
      },
      {
        "title": "Maria's Halloween",
        "audio": "/media/raz/D/Maria's Halloween.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Maria's Halloween/raz_ld46_mariashalloween_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Maria's Halloween/raz_ld15_mariashallow_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Maria's Halloween/raz_ld36wb_mariashalloween.pdf"
      },
      {
        "title": "Mud Balls!",
        "audio": "/media/raz/D/Mud Balls!.mp3"
      },
      {
        "title": "My Neighborhood",
        "audio": "/media/raz/D/My Neighborhood.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/My Neighborhood/raz_ld24_myneighborhood_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/My Neighborhood/raz_ld24_myneighborhood_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/My Neighborhood/raz_ld24wb_myneighborhood.pdf"
      },
      {
        "title": "My New School",
        "audio": "/media/raz/D/My New School.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/My New School/raz_ld41_mynewschool_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/My New School/raz_ld41_mynewschool_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/My New School/raz_ld41wb_mynewschool.pdf"
      },
      {
        "title": "No- Lily- Don't!",
        "audio": "/media/raz/D/No- Lily- Don't!.mp3"
      },
      {
        "title": "Nothing Scares Me!",
        "audio": "/media/raz/D/Nothing Scares Me!.mp3"
      },
      {
        "title": "Our Good Night Story",
        "audio": "/media/raz/D/Our Good Night Story.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Our Good Night Story/raz_ld34_ourgoodnightstory_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Our Good Night Story/raz_ld30_ourgoodnightstory_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Our Good Night Story/raz_ld30wb_ourgoodnightstory.pdf"
      },
      {
        "title": "Polly Gets Out",
        "audio": "/media/raz/D/Polly Gets Out.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Polly Gets Out/raz_ld19_pollygetsout_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Polly Gets Out/raz_ld19_pollygetsout_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Polly Gets Out/raz_ld19wb_pollygetsout.pdf"
      },
      {
        "title": "Senses",
        "audio": "/media/raz/D/Senses.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Senses/raz_ld37_senses_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Senses/raz_ld09_senses_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Senses/raz_ld37wb_senses.pdf"
      },
      {
        "title": "Sky High!",
        "audio": "/media/raz/D/Sky High!.mp3"
      },
      {
        "title": "Stone Soup",
        "audio": "/media/raz/D/Stone Soup.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Stone Soup/raz_ld50_stonesoup_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Stone Soup/raz_ld50_stonesoup_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Stone Soup/raz_ld50wb_stonesoup.pdf"
      },
      {
        "title": "Swamp Music",
        "audio": "/media/raz/D/Swamp Music.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Swamp Music/raz_ld45_swampmusic_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Swamp Music/raz_ld45_swampmusic_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Swamp Music/raz_ld45wb_swampmusic.pdf"
      },
      {
        "title": "Tadpole Teasing",
        "audio": "/media/raz/D/Tadpole Teasing.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Tadpole Teasing/raz_ld46_tadpoleteasing_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Tadpole Teasing/raz_ld46_tadpoleteasing_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Tadpole Teasing/raz_ld46wb_tadpoleteasing.pdf"
      },
      {
        "title": "The Busy Pond",
        "audio": "/media/raz/D/The Busy Pond.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/The Busy Pond/raz_ld21_thebusypond_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/The Busy Pond/raz_ld21_thebusypond_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/The Busy Pond/raz_ld21wb_thebusypond.pdf"
      },
      {
        "title": "The Mitten",
        "audio": "/media/raz/D/The Mitten.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/The Mitten/raz_ld46_mitten_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/The Mitten/raz_ld16_themitten_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/The Mitten/raz_ld38wb_mitten.pdf"
      },
      {
        "title": "The Sky Is Falling",
        "audio": "/media/raz/D/The Sky Is Falling.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/The Sky Is Falling/raz_ld03_skyfall_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/The Sky Is Falling/raz_ld03_skyfalling_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/The Sky Is Falling/raz_ld03wb_skyfall.pdf"
      },
      {
        "title": "The Team",
        "audio": "/media/raz/D/The Team.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/The Team/raz_ld07_theteam_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/The Team/raz_ld07_theteam_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/The Team/raz_ld07wb_theteam.pdf"
      },
      {
        "title": "To the Store",
        "audio": "/media/raz/D/To the Store.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/To the Store/raz_ld39_tostore_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/To the Store/raz_ld12_tothestore_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/To the Store/raz_ld39wb_tostore.pdf"
      },
      {
        "title": "To the Woods",
        "audio": "/media/raz/D/To the Woods.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/To the Woods/raz_ld02_tothewoods_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/To the Woods/raz_ld02_tothewoods_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/To the Woods/raz_ld02wb_tothewoods.pdf"
      },
      {
        "title": "We Give Away",
        "audio": "/media/raz/D/We Give Away.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/We Give Away/raz_ld44_giveaway_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/We Give Away/raz_ld44_giveaway_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/We Give Away/raz_ld44wb_giveaway.pdf"
      },
      {
        "title": "Welcome Back- Butterflies",
        "audio": "/media/raz/D/Welcome Back- Butterflies.mp3"
      },
      {
        "title": "What Do You See",
        "audio": "/media/raz/D/What Do You See.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/What Do You See/raz_ld22_whatdoyousee_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/What Do You See/raz_ld22_whatdoyousee_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/What Do You See/raz_ld22wb_whatdoyousee.pdf"
      },
      {
        "title": "What",
        "audio": "/media/raz/D/What.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/What/raz_ld40_what_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/What/raz_ld10_what_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/What/raz_ld40wb_what.pdf"
      },
      {
        "title": "Where Animals Live",
        "audio": "/media/raz/D/Where Animals Live.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Where Animals Live/raz_ld05_whereanilive_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Where Animals Live/raz_ld05_whereanimals_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Where Animals Live/raz_ld05wb_whereanilive.pdf"
      },
      {
        "title": "Where Plants Grow",
        "audio": "/media/raz/D/Where Plants Grow.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Where Plants Grow/raz_ld45_whereplantsgrow_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Where Plants Grow/raz_ld14_whereplants_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Where Plants Grow/raz_ld14wb_whereplantsgrow.pdf"
      },
      {
        "title": "Why Can't I",
        "audio": "/media/raz/D/Why Can't I.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Why Can't I/raz_ld43_whycanti_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Why Can't I/raz_ld43_whycanti_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Why Can't I/raz_ld43wb_whycanti.pdf"
      },
      {
        "title": "Workers",
        "audio": "/media/raz/D/Workers.mp3",
        "pdf": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Workers/raz_ld13_workers_clr.pdf",
        "worksheet": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Workers/raz_ld13_workers_wksh.pdf",
        "workbook": "/media/RAZ 2000册/D 88+2+4-2019-03/D 88+2+4-2019-03/Workers/raz_ld13wb_workers.pdf"
      }
    ]
  },
  {
    "level": "E",
    "grade": "G1",
    "ar": "1.5-1.8",
    "desc": "一年级高段",
    "count": 48,
    "books": [
      {
        "title": "A Day of Firsts",
        "audio": "/media/raz/E/A Day of Firsts.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/A Day of Firsts/raz_le47_dayoffirsts_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/A Day of Firsts/raz_le47_dayoffirsts_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/A Day of Firsts/raz_le47wb_dayoffirsts.pdf"
      },
      {
        "title": "A Sweet Tale",
        "audio": "/media/raz/E/A Sweet Tale.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/A Sweet Tale/raz_le39_sweettale_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/A Sweet Tale/raz_le39_sweettale_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/A Sweet Tale/raz_le39wb_sweettale.pdf"
      },
      {
        "title": "A Week With Grandpa",
        "audio": "/media/raz/E/A Week With Grandpa.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/A Week With Grandpa/raz_le34_weekwithgrandpa_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/A Week With Grandpa/raz_le03_weekgpa_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/A Week With Grandpa/raz_le34wb_weekwithgrandpa.pdf"
      },
      {
        "title": "All Kinds of Factories",
        "audio": "/media/raz/E/All Kinds of Factories.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/All Kinds of Factories/raz_le43_allkindsoffactories_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/All Kinds of Factories/raz_le43_allkindsoffactories_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/All Kinds of Factories/raz_le43wb_allkindsoffactories.pdf"
      },
      {
        "title": "All Kinds of Farms",
        "audio": "/media/raz/E/All Kinds of Farms.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/All Kinds of Farms/raz_le43_allkindsoffarms_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/All Kinds of Farms/raz_le13_allkindsfarms_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/All Kinds of Farms/raz_le13wb_allkindsfarms.pdf"
      },
      {
        "title": "Animals- Animals",
        "audio": "/media/raz/E/Animals- Animals.mp3"
      },
      {
        "title": "At the Rodeo",
        "audio": "/media/raz/E/At the Rodeo.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/At the Rodeo/raz_le48_atrodeo_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/At the Rodeo/raz_le48_atrodeo_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/At the Rodeo/raz_le48wb_atrodeo.pdf"
      },
      {
        "title": "Bear and Kangaroo",
        "audio": "/media/raz/E/Bear and Kangaroo.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Bear and Kangaroo/raz_le06_bearandkanga_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Bear and Kangaroo/raz_le06_bearandkang_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Bear and Kangaroo/raz_le06wb_bearandkanga.pdf"
      },
      {
        "title": "Calming Down",
        "audio": "/media/raz/E/Calming Down.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Calming Down/raz_le47_calmingdown_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Calming Down/raz_le47_calmingdown_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Calming Down/raz_le47wb_calmingdown.pdf"
      },
      {
        "title": "Carlos's First Halloween",
        "audio": "/media/raz/E/Carlos's First Halloween.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Carlos's First Halloween/raz_ld28_carlossfirsthalloween_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Carlos's First Halloween/raz_ld28_carlossfirsthalloween_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Carlos's First Halloween/raz_ld28wb_carlossfirsthalloween.pdf"
      },
      {
        "title": "City Animals",
        "audio": "/media/raz/E/City Animals.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/City Animals/raz_le11_cityanimals_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/City Animals/raz_le11_cityanimals_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/City Animals/raz_le11wb_cityanimals.pdf"
      },
      {
        "title": "City Places",
        "audio": "/media/raz/E/City Places.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/City Places/raz_le35_cityplaces_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/City Places/raz_le08_cityplaces_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/City Places/raz_le35wb_cityplaces.pdf"
      },
      {
        "title": "Country Animals",
        "audio": "/media/raz/E/Country Animals.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Country Animals/raz_le44_countryanimals_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Country Animals/raz_le24_countryanimals_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Country Animals/raz_le24wb_countryanimals.pdf"
      },
      {
        "title": "Doctor Jen",
        "audio": "/media/raz/E/Doctor Jen.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Doctor Jen/raz_le04_drjen_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Doctor Jen/raz_le04_drjen_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Doctor Jen/raz_le04wb_drjen.pdf"
      },
      {
        "title": "Dolly's Drama Queen Day",
        "audio": "/media/raz/E/Dolly's Drama Queen Day.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Dolly's Drama Queen Day/raz_le45_dollysdramaqueenday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Dolly's Drama Queen Day/raz_le45_dollysdramaqueenday_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Dolly's Drama Queen Day/raz_le45wb_dollysdramaqueenday.pdf"
      },
      {
        "title": "Getting Ready for School",
        "audio": "/media/raz/E/Getting Ready for School.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Getting Ready for School/raz_le12_getreadyschool_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Getting Ready for School/raz_le12_getready_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Getting Ready for School/raz_le12wb_getreadyschool.pdf"
      },
      {
        "title": "Grandparents Day",
        "audio": "/media/raz/E/Grandparents Day.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Grandparents Day/raz_le43_grandparentsday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Grandparents Day/raz_le43_grandparentsday_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Grandparents Day/raz_le43wb_grandparentsday.pdf"
      },
      {
        "title": "Happy Birthday- Snag!",
        "audio": "/media/raz/E/Happy Birthday- Snag!.mp3"
      },
      {
        "title": "Hooray for the Farmer's Market!",
        "audio": "/media/raz/E/Hooray for the Farmer's Market!.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Hooray for the Farmer's Market!/raz_le41_hooraythefarmersmarket_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Hooray for the Farmer's Market!/raz_le41_hooraythefarmersmarket_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Hooray for the Farmer's Market!/raz_le41wb_hooraythefarmersmarket.pdf"
      },
      {
        "title": "Hugs",
        "audio": "/media/raz/E/Hugs.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Hugs/raz_le36_hugs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Hugs/raz_le02_hugs_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Hugs/raz_le36wb_hugs.pdf"
      },
      {
        "title": "I Am Your New Plant",
        "audio": "/media/raz/E/I Am Your New Plant.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/I Am Your New Plant/raz_le52_iamyournewplant_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/I Am Your New Plant/raz_le52_iamyournewplant_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/I Am Your New Plant/raz_le52wb_iamyournewplant.pdf"
      },
      {
        "title": "I'd Like To Be",
        "audio": "/media/raz/E/I'd Like To Be.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/I'd Like To Be/raz_le27_idliketobe_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/I'd Like To Be/raz_le27_idliketobe_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/I'd Like To Be/raz_le27_idliketobe_wb.pdf"
      },
      {
        "title": "In the Mountains",
        "audio": "/media/raz/E/In the Mountains.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/In the Mountains/raz_le25_inthemountains_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/In the Mountains/raz_le25_inthemountains_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/In the Mountains/raz_le25wb_inthemountains.pdf"
      },
      {
        "title": "Let's Carve a Pumpkin",
        "audio": "/media/raz/E/Let's Carve a Pumpkin.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Let's Carve a Pumpkin/raz_le51_letscarvepumpkin_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Let's Carve a Pumpkin/raz_le51_letscarvepumpkin_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Let's Carve a Pumpkin/raz_le51wb_letscarvepumpkin.pdf"
      },
      {
        "title": "Let's Make Lemonade",
        "audio": "/media/raz/E/Let's Make Lemonade.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Let's Make Lemonade/raz_le33_letsmakelemonade_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Let's Make Lemonade/raz_le33_letsmakelemonade_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Let's Make Lemonade/raz_le33wb_letsmakelemonade.pdf"
      },
      {
        "title": "Maddy Loves to March",
        "audio": "/media/raz/E/Maddy Loves to March.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Maddy Loves to March/raz_le15_maddymarch_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Maddy Loves to March/raz_le15_maddymarch_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Maddy Loves to March/raz_le15wb_maddymarch.pdf"
      },
      {
        "title": "Make a Tree Friend",
        "audio": "/media/raz/E/Make a Tree Friend.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Make a Tree Friend/raz_le42_maketreefriend_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Make a Tree Friend/raz_le42_maketreefriend_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Make a Tree Friend/raz_le42wb_maketreefriend.pdf"
      },
      {
        "title": "Making Pizza",
        "audio": "/media/raz/E/Making Pizza.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Making Pizza/raz_le44_makingpizza_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Making Pizza/raz_le18_makingpizza_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Making Pizza/raz_le18wb_makingpizza.pdf"
      },
      {
        "title": "Nothing for Father's Day",
        "audio": "/media/raz/E/Nothing for Father's Day.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Nothing for Father's Day/raz_le10_fathersday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Nothing for Father's Day/raz_le10_fathersday_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Nothing for Father's Day/raz_le10wb_fathersday.pdf"
      },
      {
        "title": "Places Plants and Animals Live",
        "audio": "/media/raz/E/Places Plants and Animals Live.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Places Plants and Animals Live/raz_le21_placesplantsani_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Places Plants and Animals Live/raz_le21_placesplantsani_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Places Plants and Animals Live/raz_le21wb_placesplantsani.pdf"
      },
      {
        "title": "Police Officers",
        "audio": "/media/raz/E/Police Officers.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Police Officers/raz_le26_policeofficers_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Police Officers/raz_le26_policeofficers_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Police Officers/raz_le26wb_policeofficers.pdf"
      },
      {
        "title": "Shapes in Tide Pools",
        "audio": "/media/raz/E/Shapes in Tide Pools.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Shapes in Tide Pools/raz_le20_shapestidepool_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Shapes in Tide Pools/raz_le20_shapetidepool_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Shapes in Tide Pools/raz_le20wb_shapestidepool.pdf"
      },
      {
        "title": "Shoes Men Wear",
        "audio": "/media/raz/E/Shoes Men Wear.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Shoes Men Wear/raz_le22_shoesmenwear_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Shoes Men Wear/raz_le23_shoeswear_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Shoes Men Wear/raz_le22wb_shoesmenwear.pdf"
      },
      {
        "title": "Shoes Women Wear",
        "audio": "/media/raz/E/Shoes Women Wear.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Shoes Women Wear/raz_le23_shoeswomenwear_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Shoes Women Wear/raz_le23_shoeswear_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Shoes Women Wear/raz_le23wb_shoeswomenwear.pdf"
      },
      {
        "title": "Sloth Wants to Snooze",
        "audio": "/media/raz/E/Sloth Wants to Snooze.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Sloth Wants to Snooze/raz_le48_slothwantstosnooze_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Sloth Wants to Snooze/raz_le48_slothwantstosnooze_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Sloth Wants to Snooze/raz_le48wb_slothwantstosnooze.pdf"
      },
      {
        "title": "Stop Snoring!",
        "audio": "/media/raz/E/Stop Snoring!.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Stop Snoring!/raz_le46_stopsnoring_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Stop Snoring!/raz_le46_stopsnoring_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Stop Snoring!/raz_le46wb_stopsnoring.pdf"
      },
      {
        "title": "The Boy Who Cried -Wolf!",
        "audio": "/media/raz/E/The Boy Who Cried -Wolf!.mp3"
      },
      {
        "title": "The Contest",
        "audio": "/media/raz/E/The Contest.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/The Contest/raz_le17_thecontest_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/The Contest/raz_le17_thecontest_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/The Contest/raz_le17wb_thecontest.pdf"
      },
      {
        "title": "The Four Seasons",
        "audio": "/media/raz/E/The Four Seasons.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/The Four Seasons/raz_le44_fourseasons_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/The Four Seasons/raz_le14_fourseasons_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/The Four Seasons/raz_le37wb_fourseasons.pdf"
      },
      {
        "title": "The Storm",
        "audio": "/media/raz/E/The Storm.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/The Storm/raz_le07_thestorm_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/The Storm/raz_le07_thestorm_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/The Storm/raz_le07wb_thestorm.pdf"
      },
      {
        "title": "The Vet",
        "audio": "/media/raz/E/The Vet.mp3"
      },
      {
        "title": "Time For Bed",
        "audio": "/media/raz/E/Time For Bed.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Time For Bed/raz_le37_timebed_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Time For Bed/raz_le05_timeforbed_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Time For Bed/raz_le37wb_timebed.pdf"
      },
      {
        "title": "Tiny Tugboat",
        "audio": "/media/raz/E/Tiny Tugboat.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Tiny Tugboat/raz_le50_tinytugboat_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Tiny Tugboat/raz_le50_tinytugboat_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Tiny Tugboat/raz_le50wb_tinytugboat.pdf"
      },
      {
        "title": "Too Much Work!",
        "audio": "/media/raz/E/Too Much Work!.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Too Much Work!/raz_le29_toomuchwork_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Too Much Work!/raz_le29_toomuchwork_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/Too Much Work!/raz_le29wb_toomuchwork.pdf"
      },
      {
        "title": "What Is in the Box",
        "audio": "/media/raz/E/What Is in the Box.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/What Is in the Box/raz_le19_whatisinbox_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/What Is in the Box/raz_le19_whatisinbox_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/What Is in the Box/raz_le19wb_whatisinbox.pdf"
      },
      {
        "title": "What's In That Pouch",
        "audio": "/media/raz/E/What's In That Pouch.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/What's In That Pouch/raz_le44_whatsinthatpouch_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/What's In That Pouch/raz_le44_whatsinthatpouch_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/What's In That Pouch/raz_le44wb_whatsinthatpouch.pdf"
      },
      {
        "title": "What's for Dinner",
        "audio": "/media/raz/E/What's for Dinner.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/What's for Dinner/raz_le16_whatsfordinner_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/What's for Dinner/raz_le16_whatsfordinner_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/What's for Dinner/raz_le16wb_whatsfordinner.pdf"
      },
      {
        "title": "When I Grow Up",
        "audio": "/media/raz/E/When I Grow Up.mp3",
        "pdf": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/When I Grow Up/raz_le09_igrowup_clr.pdf",
        "worksheet": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/When I Grow Up/raz_le09_growup_wksh.pdf",
        "workbook": "/media/RAZ 2000册/E 87+2+4-2019-03/E 87+2+4-2019-03/When I Grow Up/raz_le09wb_igrowup.pdf"
      }
    ]
  },
  {
    "level": "F",
    "grade": "G1-2",
    "ar": "1.8-2.0",
    "desc": "一二年级过渡",
    "count": 47,
    "books": [
      {
        "title": "A Clown Face",
        "audio": "/media/raz/F/A Clown Face.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/A Clown Face/raz_lf32_clownface_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/A Clown Face/raz_lf09_clownface_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/A Clown Face/raz_lf32wb_clownface.pdf"
      },
      {
        "title": "A Pet for Jupe",
        "audio": "/media/raz/F/A Pet for Jupe.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/A Pet for Jupe/raz_tm03_apetforjupe_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/A Pet for Jupe/raz_tm03_petforjupe_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/A Pet for Jupe/raz_tm03_apetforjupe_wb.pdf"
      },
      {
        "title": "Are You From India",
        "audio": "/media/raz/F/Are You From India.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Are You From India/raz_lf38_areyoufromindia_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Are You From India/raz_lf38_areyoufromindia_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Are You From India/raz_lf38wb_areyoufromindia.pdf"
      },
      {
        "title": "Best of Friends",
        "audio": "/media/raz/F/Best of Friends.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Best of Friends/raz_lf27_bestoffriends_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Best of Friends/raz_lf27_bestoffriends_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Best of Friends/raz_lf27wb_bestoffriends.pdf"
      },
      {
        "title": "Changing Seasons",
        "audio": "/media/raz/F/Changing Seasons.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Changing Seasons/raz_lf05_seasons_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Changing Seasons/raz_lf05_seasons_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Changing Seasons/raz_lf05wb_seasons.pdf"
      },
      {
        "title": "Cleaning My Room",
        "audio": "/media/raz/F/Cleaning My Room.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Cleaning My Room/raz_lf44_cleaningmyroom_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Cleaning My Room/raz_lf44_cleaningmyroom_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Cleaning My Room/raz_lf44wb_cleaningmyroom.pdf"
      },
      {
        "title": "Community Workers",
        "audio": "/media/raz/F/Community Workers.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Community Workers/raz_lf16_communitywork_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Community Workers/raz_lf16_communitywork_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Community Workers/raz_lf16wb_communitywork.pdf"
      },
      {
        "title": "Does It Sink or Float",
        "audio": "/media/raz/F/Does It Sink or Float.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Does It Sink or Float/raz_lf22_doesitsink_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Does It Sink or Float/raz_lf22_doesitsink_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Does It Sink or Float/raz_lf22wb_doesitsink.pdf"
      },
      {
        "title": "Double It!",
        "audio": "/media/raz/F/Double It!.mp3"
      },
      {
        "title": "Eat Like a Pig",
        "audio": "/media/raz/F/Eat Like a Pig.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Eat Like a Pig/raz_lf45_eatlikepig_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Eat Like a Pig/raz_lf45_eatlikepig_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Eat Like a Pig/raz_lf45wb_eatlikepig.pdf"
      },
      {
        "title": "Farm Friends",
        "audio": "/media/raz/F/Farm Friends.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Farm Friends/raz_tm16_farmfriends_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Farm Friends/raz_tm16_farmfriends_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Farm Friends/raz_tm16_farmfriends_wb.pdf"
      },
      {
        "title": "Firefighters",
        "audio": "/media/raz/F/Firefighters.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Firefighters/raz_lf26_firefighters_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Firefighters/raz_lf26_firefighters_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Firefighters/raz_lf26wb_firefighters.pdf"
      },
      {
        "title": "Fishing with Grandpa",
        "audio": "/media/raz/F/Fishing with Grandpa.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Fishing with Grandpa/raz_lf08_fishingwgpa_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Fishing with Grandpa/raz_lf08_fishinggpa_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Fishing with Grandpa/raz_lf08wb_fishingwgpa.pdf"
      },
      {
        "title": "Flashlight Shadow Show",
        "audio": "/media/raz/F/Flashlight Shadow Show.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Flashlight Shadow Show/raz_lf41_flashlightshadowshow_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Flashlight Shadow Show/raz_lf41_flashlightshadowshow_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Flashlight Shadow Show/raz_lf41wb_flashlightshadowshow.pdf"
      },
      {
        "title": "Following the Map",
        "audio": "/media/raz/F/Following the Map.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Following the Map/raz_lf41_followingmap_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Following the Map/raz_lf41_followingmap_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Following the Map/raz_lf41wb_followingmap.pdf"
      },
      {
        "title": "Friends in the Stars",
        "audio": "/media/raz/F/Friends in the Stars.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Friends in the Stars/raz_lf24_friendsinstars_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Friends in the Stars/raz_lf24_friendsinstars_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Friends in the Stars/raz_lf24wb_friendsinstars.pdf"
      },
      {
        "title": "Gaggle- Herd- and Murder",
        "audio": "/media/raz/F/Gaggle- Herd- and Murder.mp3"
      },
      {
        "title": "Glassblowing",
        "audio": "/media/raz/F/Glassblowing.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Glassblowing/raz_lf12_glassblowing_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Glassblowing/raz_lf12_glassblowing_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Glassblowing/raz_lf12wb_glassblowing.pdf"
      },
      {
        "title": "Hibernation",
        "audio": "/media/raz/F/Hibernation.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Hibernation/raz_lf25_hibernation_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Hibernation/raz_lf25_hibernation_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Hibernation/raz_lf25wb_hibernation.pdf"
      },
      {
        "title": "Hide and Seek with Zog",
        "audio": "/media/raz/F/Hide and Seek with Zog.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Hide and Seek with Zog/raz_tm06_hideandseek_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Hide and Seek with Zog/raz_tm06_hideandseek_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Hide and Seek with Zog/raz_tm06_hideandseek_wb.pdf"
      },
      {
        "title": "How Do They Move",
        "audio": "/media/raz/F/How Do They Move.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/How Do They Move/raz_lf04_howdotheymove_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/How Do They Move/raz_lf04_howmove_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/How Do They Move/raz_lf04wb_howdotheymove.pdf"
      },
      {
        "title": "How Is the Weather Today",
        "audio": "/media/raz/F/How Is the Weather Today.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/How Is the Weather Today/raz_lf06_theweather_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/How Is the Weather Today/raz_lf06_howweather_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/How Is the Weather Today/raz_lf06wb_theweather.pdf"
      },
      {
        "title": "How to Make a Snow Person",
        "audio": "/media/raz/F/How to Make a Snow Person.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/How to Make a Snow Person/raz_lf20_snowperson_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/How to Make a Snow Person/raz_lf20_snowperson_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/How to Make a Snow Person/raz_lf20wb_snowperson.pdf"
      },
      {
        "title": "In a Chinese Garden",
        "audio": "/media/raz/F/In a Chinese Garden.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/In a Chinese Garden/raz_lf21_chinesegarden_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/In a Chinese Garden/raz_lf21_chinesegarden_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/In a Chinese Garden/raz_lf21wb_chinesegarden.pdf"
      },
      {
        "title": "Jobs for James",
        "audio": "/media/raz/F/Jobs for James.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Jobs for James/raz_lf37_jobsjames_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Jobs for James/raz_lf37_jobsjames_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Jobs for James/raz_lf37wb_jobsjames.pdf"
      },
      {
        "title": "Josh Gets Glasses",
        "audio": "/media/raz/F/Josh Gets Glasses.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Josh Gets Glasses/raz_lf03_joshglasses_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Josh Gets Glasses/raz_lf03_joshglasses_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Josh Gets Glasses/raz_lf03wb_joshglasses.pdf"
      },
      {
        "title": "Monster Reading Buddies",
        "audio": "/media/raz/F/Monster Reading Buddies.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Monster Reading Buddies/raz_tm28_readingbuddies_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Monster Reading Buddies/raz_tm28_readingbuddies_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Monster Reading Buddies/raz_tm28_readingbuddies_wb.pdf"
      },
      {
        "title": "Mother's Day",
        "audio": "/media/raz/F/Mother's Day.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Mother's Day/raz_lf33_mothersday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Mother's Day/raz_lf10_mothersday_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Mother's Day/raz_lf33wb_mothersday.pdf"
      },
      {
        "title": "Needs and Wants",
        "audio": "/media/raz/F/Needs and Wants.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Needs and Wants/raz_lf11_needsandwants_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Needs and Wants/raz_lf11_needswants_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Needs and Wants/raz_lf11wb_needsandwants.pdf"
      },
      {
        "title": "Night Animals",
        "audio": "/media/raz/F/Night Animals.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Night Animals/raz_lf38_nightanimals_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Night Animals/raz_lf38_nightanimals_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Night Animals/raz_lf38wb_nightanimals.pdf"
      },
      {
        "title": "Our Camping Trip",
        "audio": "/media/raz/F/Our Camping Trip.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Our Camping Trip/raz_lf39_ourcampingtrip_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Our Camping Trip/raz_lf13_campingtrip_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Our Camping Trip/raz_lf34wb_ourcampingtrip.pdf"
      },
      {
        "title": "Our Class Flag",
        "audio": "/media/raz/F/Our Class Flag.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Our Class Flag/raz_lf40_ourclassflag_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Our Class Flag/raz_lf40_ourclassflag_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Our Class Flag/raz_lf40wb_ourclassflag.pdf"
      },
      {
        "title": "Scaredy Crow",
        "audio": "/media/raz/F/Scaredy Crow.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Scaredy Crow/raz_lf38_scaredycrow_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Scaredy Crow/raz_lf17_scaredycrow_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Scaredy Crow/raz_lf17wb_scaredycrow.pdf"
      },
      {
        "title": "Smart Crows",
        "audio": "/media/raz/F/Smart Crows.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Smart Crows/raz_lf36_smartcrows_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Smart Crows/raz_lf36_smartcrows_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Smart Crows/raz_lf36wb_smartcrows.pdf"
      },
      {
        "title": "Some Birds Go",
        "audio": "/media/raz/F/Some Birds Go.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Some Birds Go/raz_lf45_somebirdsgo_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Some Birds Go/raz_lf45_somebirdsgo_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Some Birds Go/raz_lf45wb_somebirdsgo.pdf"
      },
      {
        "title": "SuperZero",
        "audio": "/media/raz/F/SuperZero.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/SuperZero/raz_lf39_superzero_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/SuperZero/raz_lf39_superzero_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/SuperZero/raz_lf39wb_superzero.pdf"
      },
      {
        "title": "Taste This",
        "audio": "/media/raz/F/Taste This.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Taste This/raz_lf23_tastethis_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Taste This/raz_lf23_tastethis_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Taste This/raz_lf23wb_tastethis.pdf"
      },
      {
        "title": "Thank You- Everyone!",
        "audio": "/media/raz/F/Thank You- Everyone!.mp3"
      },
      {
        "title": "The Food Chain",
        "audio": "/media/raz/F/The Food Chain.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/The Food Chain/raz_lf07_foodchain_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/The Food Chain/raz_lf07_foodchain_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/The Food Chain/raz_lf07wb_foodchain.pdf"
      },
      {
        "title": "The Snowstorm",
        "audio": "/media/raz/F/The Snowstorm.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/The Snowstorm/raz_lf19_thesnowstorm_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/The Snowstorm/raz_lf19_thesnowstorm_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/The Snowstorm/raz_lf19wb_thesnowstorm.pdf"
      },
      {
        "title": "The Three Little Pigs",
        "audio": "/media/raz/F/The Three Little Pigs.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/The Three Little Pigs/raz_lf38_threelittlepigs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/The Three Little Pigs/raz_lf28_threelittlepigs_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/The Three Little Pigs/raz_lf28wb_threelittlepigs.pdf"
      },
      {
        "title": "The Tortoise and the Hare",
        "audio": "/media/raz/F/The Tortoise and the Hare.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/The Tortoise and the Hare/raz_lf42_tortoiseandhare_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/The Tortoise and the Hare/raz_lf42_tortoiseandhare_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/The Tortoise and the Hare/raz_lf42wb_tortoiseandhare.pdf"
      },
      {
        "title": "Trucking",
        "audio": "/media/raz/F/Trucking.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Trucking/raz_lf18_trucking_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Trucking/raz_lf18_trucking_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Trucking/raz_lf18wb_trucking.pdf"
      },
      {
        "title": "Two for Me- One for You",
        "audio": "/media/raz/F/Two for Me- One for You.mp3"
      },
      {
        "title": "Using Less Energy",
        "audio": "/media/raz/F/Using Less Energy.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Using Less Energy/raz_lf29_usinglessenergy_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Using Less Energy/raz_lf29_usinglessenergy_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Using Less Energy/raz_lf29wb_usinglessenergy.pdf"
      },
      {
        "title": "Weird White House Pets",
        "audio": "/media/raz/F/Weird White House Pets.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Weird White House Pets/raz_lf39_weirdwhitehousepets_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Weird White House Pets/raz_lf14_whitepets_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Weird White House Pets/raz_lf35wb_whitehousepets.pdf"
      },
      {
        "title": "Where Is Cub",
        "audio": "/media/raz/F/Where Is Cub.mp3",
        "pdf": "/media/RAZ 2000册/F 81+2/F 81+2/Where Is Cub/raz_lf35_whereiscub_clr.pdf",
        "worksheet": "/media/RAZ 2000册/F 81+2/F 81+2/Where Is Cub/raz_lf02_whereiscub_wksh.pdf",
        "workbook": "/media/RAZ 2000册/F 81+2/F 81+2/Where Is Cub/raz_lf35wb_whereiscub.pdf"
      }
    ]
  },
  {
    "level": "G",
    "grade": "G2",
    "ar": "2.0-2.3",
    "desc": "二年级",
    "count": 51,
    "books": [
      {
        "title": "A Seed Grows",
        "audio": "/media/raz/G/A Seed Grows.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/A Seed Grows/raz_lg38_seedgrows_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/A Seed Grows/raz_lg08_seedgrows_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/A Seed Grows/raz_lg08wb_aseedgrows.pdf"
      },
      {
        "title": "All Kinds of Homes",
        "audio": "/media/raz/G/All Kinds of Homes.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/All Kinds of Homes/raz_lg38_allkindsofhomes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/All Kinds of Homes/raz_lg38_allkindsofhomes_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/All Kinds of Homes/raz_lg38wb_allkindsofhomes.pdf"
      },
      {
        "title": "American Symbols",
        "audio": "/media/raz/G/American Symbols.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/American Symbols/raz_lg39_americansymbols_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/American Symbols/raz_lg39_americansymbols_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/American Symbols/raz_lg39wb_americansymbols.pdf"
      },
      {
        "title": "Animal Eyes",
        "audio": "/media/raz/G/Animal Eyes.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Animal Eyes/raz_lg35_animaleyes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Animal Eyes/raz_lg12_animaleyes_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Animal Eyes/raz_lg12wb_animaleyes.pdf"
      },
      {
        "title": "Ants- Ants- and More Ants",
        "audio": "/media/raz/G/Ants- Ants- and More Ants.mp3"
      },
      {
        "title": "Beanie and the Missing Bear",
        "audio": "/media/raz/G/Beanie and the Missing Bear.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Beanie and the Missing Bear/raz_lg16_beaniemissing_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Beanie and the Missing Bear/raz_lg16_beaniemissing_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Beanie and the Missing Bear/raz_lg16wb_beaniemissing.pdf"
      },
      {
        "title": "Billy Gets Lost",
        "audio": "/media/raz/G/Billy Gets Lost.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Billy Gets Lost/raz_lg18_billygetslost_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Billy Gets Lost/raz_lg18_billygetslost_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Billy Gets Lost/raz_lg18wb_billygetslost.pdf"
      },
      {
        "title": "Bonk's Bad Dream",
        "audio": "/media/raz/G/Bonk's Bad Dream.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Bonk's Bad Dream/raz_tm17_bonksbaddream_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Bonk's Bad Dream/raz_tm17_bonksbad_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Bonk's Bad Dream/raz_tm17_bonksbaddream_wb.pdf"
      },
      {
        "title": "Bonk's Loose Tooth",
        "audio": "/media/raz/G/Bonk's Loose Tooth.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Bonk's Loose Tooth/raz_tm04_bonkstooth_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Bonk's Loose Tooth/raz_tm04_bonkstooth_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Bonk's Loose Tooth/raz_tm04_bonkstooth_wb.pdf"
      },
      {
        "title": "Caring for Your Dog",
        "audio": "/media/raz/G/Caring for Your Dog.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Caring for Your Dog/raz_lg38_caringyourdog_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Caring for Your Dog/raz_lg38_caringyourdog_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Caring for Your Dog/raz_lg38wb_caringyourdog.pdf"
      },
      {
        "title": "Carlos Joins the Team",
        "audio": "/media/raz/G/Carlos Joins the Team.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Carlos Joins the Team/raz_lg_carlosjoinsteam_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Carlos Joins the Team/raz_lg_carlosjoinsteam_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Carlos Joins the Team/raz_lg22wb_carlosjoinsteam.pdf"
      },
      {
        "title": "Chess",
        "audio": "/media/raz/G/Chess.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Chess/raz_lg38_chess_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Chess/raz_lg38_chess_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Chess/raz_lg38wb_chess.pdf"
      },
      {
        "title": "Dogs at Work",
        "audio": "/media/raz/G/Dogs at Work.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Dogs at Work/raz_lg17_dogsatwork_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Dogs at Work/raz_lg17_dogsatwork_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Dogs at Work/raz_lg17wb_dogsatwork.pdf"
      },
      {
        "title": "Fire Safety",
        "audio": "/media/raz/G/Fire Safety.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Fire Safety/raz_lg38_firesafety_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Fire Safety/raz_lg38_firesafety_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Fire Safety/raz_lg38wb_firesafety.pdf"
      },
      {
        "title": "Going to the Dentist",
        "audio": "/media/raz/G/Going to the Dentist.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Going to the Dentist/raz_lg28_goingtodentist_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Going to the Dentist/raz_lg28_goingtodentist_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Going to the Dentist/raz_lg28wb_goingtodentist.pdf"
      },
      {
        "title": "Gordon Finds His Way",
        "audio": "/media/raz/G/Gordon Finds His Way.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Gordon Finds His Way/raz_lg35_gordonfindshisway_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Gordon Finds His Way/raz_lg13_gordonfinds_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Gordon Finds His Way/raz_lg13wb_gordonfindsway.pdf"
      },
      {
        "title": "Groundhog Goes Outside",
        "audio": "/media/raz/G/Groundhog Goes Outside.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Groundhog Goes Outside/raz_lg30_groundhoggoesoutside_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Groundhog Goes Outside/raz_lg30_groundhoggoesoutside_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Groundhog Goes Outside/raz_lg30wb_groundhoggoesoutside.pdf"
      },
      {
        "title": "Grow Tomatoes in Six Steps",
        "audio": "/media/raz/G/Grow Tomatoes in Six Steps.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Grow Tomatoes in Six Steps/raz_lg19_growtomatoesinsixsteps_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Grow Tomatoes in Six Steps/raz_lg19_growtomatoesinsixsteps_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Grow Tomatoes in Six Steps/raz_lg19wb_growtomatoesinsixsteps.pdf"
      },
      {
        "title": "How Many Rhymes",
        "audio": "/media/raz/G/How Many Rhymes.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/How Many Rhymes/raz_lg26_howmanyrhymes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/How Many Rhymes/raz_lg06_howrhymes_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/How Many Rhymes/raz_lg26wb_howmanyrhymes.pdf"
      },
      {
        "title": "I Bet I Can",
        "audio": "/media/raz/G/I Bet I Can.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/I Bet I Can/raz_lg05_ibetican_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/I Bet I Can/raz_lg05_ibetican_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/I Bet I Can/raz_lg05wb_ibetican.pdf"
      },
      {
        "title": "Laws for Kids",
        "audio": "/media/raz/G/Laws for Kids.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Laws for Kids/raz_lg36_lawskids_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Laws for Kids/raz_lg36_lawskids_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Laws for Kids/raz_lg36wb_lawskids.pdf"
      },
      {
        "title": "Let's Go to the Circus!",
        "audio": "/media/raz/G/Let's Go to the Circus!.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Let's Go to the Circus!/raz_tm05_letsgocircus_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Let's Go to the Circus!/raz_tm05_letsgocircus_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Let's Go to the Circus!/raz_tm05_letsgocircus_wb.pdf"
      },
      {
        "title": "Long Ago and Today",
        "audio": "/media/raz/G/Long Ago and Today.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Long Ago and Today/raz_lg04_longago_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Long Ago and Today/raz_lg04_longago_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Long Ago and Today/raz_lg04wb_longagotdy.pdf"
      },
      {
        "title": "Loose Tooth",
        "audio": "/media/raz/G/Loose Tooth.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Loose Tooth/raz_lg35_loosetooth_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Loose Tooth/raz_lg35_loosetooth_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Loose Tooth/raz_lg35wb_loosetooth.pdf"
      },
      {
        "title": "Maria Joins the Team",
        "audio": "/media/raz/G/Maria Joins the Team.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Maria Joins the Team/raz_lg14_mariajoinsteam_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Maria Joins the Team/raz_lg14_mariajoins_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Maria Joins the Team/raz_lg14wb_mariajoinsteam.pdf"
      },
      {
        "title": "Monster Halloween",
        "audio": "/media/raz/G/Monster Halloween.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Monster Halloween/raz_tm09_halloween_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Monster Halloween/raz_tm09_halloween_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Monster Halloween/raz_tm09_halloween_wb.pdf"
      },
      {
        "title": "Monsters' Stormy Day",
        "audio": "/media/raz/G/Monsters' Stormy Day.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Monsters' Stormy Day/raz_tm18_monstersstormy_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Monsters' Stormy Day/raz_tm18_monstersstorm_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Monsters' Stormy Day/raz_tm18_monstersstormy_wb.pdf"
      },
      {
        "title": "My Day",
        "audio": "/media/raz/G/My Day.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/My Day/raz_lg07_myday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/My Day/raz_lg07_myday_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/My Day/raz_lg07wb_myday.pdf"
      },
      {
        "title": "New Rule!",
        "audio": "/media/raz/G/New Rule!.mp3"
      },
      {
        "title": "Pedro's Burro",
        "audio": "/media/raz/G/Pedro's Burro.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Pedro's Burro/raz_lg39_pedrosburro_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Pedro's Burro/raz_lg39_pedrosburro_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Pedro's Burro/raz_lg39wb_pedrosburro.pdf"
      },
      {
        "title": "Penny the Rude Penguin",
        "audio": "/media/raz/G/Penny the Rude Penguin.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Penny the Rude Penguin/raz_lg33_pennyrudepenguin_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Penny the Rude Penguin/raz_lg33_pennyrudepenguin_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Penny the Rude Penguin/raz_lg33wb_pennyrudepenguin.pdf"
      },
      {
        "title": "Places People Live",
        "audio": "/media/raz/G/Places People Live.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Places People Live/raz_lg27_placespeoplelive_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Places People Live/raz_lg02_placeslive_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Places People Live/raz_lg27wb_placespeoplelive.pdf"
      },
      {
        "title": "Ready- Set- Bike!",
        "audio": "/media/raz/G/Ready- Set- Bike!.mp3"
      },
      {
        "title": "Rock Hunting",
        "audio": "/media/raz/G/Rock Hunting.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Rock Hunting/raz_lg29_rockhunting_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Rock Hunting/raz_lg29_rockhunting_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Rock Hunting/raz_lg29wb_rockhunting.pdf"
      },
      {
        "title": "Rude Robot",
        "audio": "/media/raz/G/Rude Robot.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Rude Robot/raz_lg29_ruderobot_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Rude Robot/raz_lg29_ruderobot_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Rude Robot/raz_lg29wb_ruderobot.pdf"
      },
      {
        "title": "Signs Are Everywhere",
        "audio": "/media/raz/G/Signs Are Everywhere.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Signs Are Everywhere/raz_lg19_signsareeverywhere_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Signs Are Everywhere/raz_lg19_signsareeverywher_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Signs Are Everywhere/raz_lg23wb_signsareeverywhere.pdf"
      },
      {
        "title": "Stars and Stripes",
        "audio": "/media/raz/G/Stars and Stripes.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Stars and Stripes/raz_lg38_starsandstripes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Stars and Stripes/raz_lg38_starsandstripes_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Stars and Stripes/raz_lg38wb_starsandstripes.pdf"
      },
      {
        "title": "The Camel and the Pig",
        "audio": "/media/raz/G/The Camel and the Pig.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/The Camel and the Pig/raz_lg34_camelandpig_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/The Camel and the Pig/raz_lg34_camelandpig_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/The Camel and the Pig/raz_lg34wb_camelandpig.pdf"
      },
      {
        "title": "The Chase",
        "audio": "/media/raz/G/The Chase.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/The Chase/raz_lg27_chase_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/The Chase/raz_lg09_thechase_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/The Chase/raz_lg27wb_chase.pdf"
      },
      {
        "title": "The Food We Eat",
        "audio": "/media/raz/G/The Food We Eat.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/The Food We Eat/raz_lg28_foodeat_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/The Food We Eat/raz_lg03_foodweeat_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/The Food We Eat/raz_lg28wb_foodeat.pdf"
      },
      {
        "title": "The Legend of Nian",
        "audio": "/media/raz/G/The Legend of Nian.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/The Legend of Nian/raz_lg37_legendofnian_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/The Legend of Nian/raz_lg37_legendofnian_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/The Legend of Nian/raz_lg37wb_legendofnian.pdf"
      },
      {
        "title": "The Little Red Hen",
        "audio": "/media/raz/G/The Little Red Hen.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/The Little Red Hen/raz_lg28_littleredhen_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/The Little Red Hen/raz_lg28_littleredhen_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/The Little Red Hen/raz_lg28wb_littleredhen.pdf"
      },
      {
        "title": "The Queen Ant's Birthday",
        "audio": "/media/raz/G/The Queen Ant's Birthday.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/The Queen Ant's Birthday/raz_lg25_queenantsbirthday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/The Queen Ant's Birthday/raz_lg25_queenantsbirthday_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/The Queen Ant's Birthday/raz_lg25wb_queenantsbirthday.pdf"
      },
      {
        "title": "The Spider's Web",
        "audio": "/media/raz/G/The Spider's Web.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/The Spider's Web/raz_lg38_spidersweb_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/The Spider's Web/raz_lg38_spidersweb_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/The Spider's Web/raz_lg38wb_spidersweb.pdf"
      },
      {
        "title": "This Is a Bird",
        "audio": "/media/raz/G/This Is a Bird.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/This Is a Bird/raz_lg20_thisisbird_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/This Is a Bird/raz_lg20_thisisbird_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/This Is a Bird/raz_lg20wb_thisisbird.pdf"
      },
      {
        "title": "Time of Day",
        "audio": "/media/raz/G/Time of Day.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Time of Day/raz_lg38_timeofday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Time of Day/raz_lg38_timeofday_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Time of Day/raz_lg38wb_timeofday.pdf"
      },
      {
        "title": "Troll Bridge",
        "audio": "/media/raz/G/Troll Bridge.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Troll Bridge/raz_lg30_trollbridge_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Troll Bridge/raz_lg31_trollbridge_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Troll Bridge/raz_lg31wb_trollbridge.pdf"
      },
      {
        "title": "What in the World Is That",
        "audio": "/media/raz/G/What in the World Is That.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/What in the World Is That/raz_lg33_whatinworldisthat_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/What in the World Is That/raz_lg33_whatinworldisthat_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/What in the World Is That/raz_lg33wb_whatinworldisthat.pdf"
      },
      {
        "title": "Whose Eggs Are These",
        "audio": "/media/raz/G/Whose Eggs Are These.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Whose Eggs Are These/raz_lg37_whoseeggsarethese_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Whose Eggs Are These/raz_lg10_whoseeggs_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Whose Eggs Are These/raz_lg28wb_whoseeggsarethese.pdf"
      },
      {
        "title": "Why Do Leaves Change Color",
        "audio": "/media/raz/G/Why Do Leaves Change Color.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Why Do Leaves Change Color/raz_lg39_whydoleaveschangecolor_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Why Do Leaves Change Color/raz_lg39_whydoleaveschangecolor_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Why Do Leaves Change Color/raz_lg39wb_whydoleaveschangecolor.pdf"
      },
      {
        "title": "Wiggly Worms",
        "audio": "/media/raz/G/Wiggly Worms.mp3",
        "pdf": "/media/RAZ 2000册/G 81+2/G 81+2/Wiggly Worms/raz_lg39_wigglyworms_clr.pdf",
        "worksheet": "/media/RAZ 2000册/G 81+2/G 81+2/Wiggly Worms/raz_lg39_wigglyworms_wksh.pdf",
        "workbook": "/media/RAZ 2000册/G 81+2/G 81+2/Wiggly Worms/raz_lg39wb_wigglyworms.pdf"
      }
    ]
  },
  {
    "level": "H",
    "grade": "G2",
    "ar": "2.3-2.6",
    "desc": "二年级高段",
    "count": 48,
    "books": [
      {
        "title": "A Desert Counting Book",
        "audio": "/media/raz/H/A Desert Counting Book.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/A Desert Counting Book/raz_lh22_desertcountingbook_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/A Desert Counting Book/raz_lh22_desertcountingbook_wksh.pdf"
      },
      {
        "title": "A Monster Fish Tale",
        "audio": "/media/raz/H/A Monster Fish Tale.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/A Monster Fish Tale/raz_tm12_monsterfishtale_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/A Monster Fish Tale/raz_tm12_monsterfish_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/A Monster Fish Tale/raz_tm12_monsterfishtale_wb.pdf"
      },
      {
        "title": "Animals- Animals",
        "audio": "/media/raz/H/Animals- Animals.mp3"
      },
      {
        "title": "Anna and the Dancing Goose",
        "audio": "/media/raz/H/Anna and the Dancing Goose.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Anna and the Dancing Goose/raz_lh27_annaanddancinggoose_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Anna and the Dancing Goose/raz_lh27_annaanddancing_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Anna and the Dancing Goose/raz_lh27wb_annaanddancinggoose.pdf"
      },
      {
        "title": "At a Touch Tank",
        "audio": "/media/raz/H/At a Touch Tank.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/At a Touch Tank/raz_lh21_attouchtank_clr.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/At a Touch Tank/raz_lh21wb_attouchtank.pdf"
      },
      {
        "title": "Blackbeard the Pirate",
        "audio": "/media/raz/H/Blackbeard the Pirate.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Blackbeard the Pirate/raz_lh34_blackbeardpirate_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Blackbeard the Pirate/raz_lh34_blackbeardpirate_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Blackbeard the Pirate/raz_lh34wb_blackbeardpirate.pdf"
      },
      {
        "title": "Brother Messy- Brother Neat",
        "audio": "/media/raz/H/Brother Messy- Brother Neat.mp3"
      },
      {
        "title": "Butterfly Café",
        "audio": "/media/raz/H/Butterfly Café.mp3"
      },
      {
        "title": "Carlos's First Thanksgiving",
        "audio": "/media/raz/H/Carlos's First Thanksgiving.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Carlos's First Thanksgiving/raz_lh22_carlossfirstthanksgiving_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Carlos's First Thanksgiving/raz_lh22_carlossfirstthanksgiving_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Carlos's First Thanksgiving/raz_lh22wb_carlossfirstthanksgiving.pdf"
      },
      {
        "title": "Club Monster",
        "audio": "/media/raz/H/Club Monster.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Club Monster/raz_tm07_clubmonster_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Club Monster/raz_tm07_clubmonster_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Club Monster/raz_tm07_clubmonster_wb.pdf"
      },
      {
        "title": "Cool as a Cuke",
        "audio": "/media/raz/H/Cool as a Cuke.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Cool as a Cuke/raz_tm10_coolasacuke_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Cool as a Cuke/raz_tm10_coolasacuke_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Cool as a Cuke/raz_tm10_coolasacuke_wb.pdf"
      },
      {
        "title": "Dr. King's Memorial",
        "audio": "/media/raz/H/Dr. King's Memorial.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Dr. King's Memorial/raz_lh35_drkingsmemorial_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Dr. King's Memorial/raz_lh35_drkingsmemorial_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Dr. King's Memorial/raz_lh35wb_drkingsmemorial.pdf"
      },
      {
        "title": "Earth's Water",
        "audio": "/media/raz/H/Earth's Water.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Earth's Water/raz_lh13_earthswater_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Earth's Water/raz_lh13_earthswater_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Earth's Water/raz_lh13wb_earthswater.pdf"
      },
      {
        "title": "Friends Around the World",
        "audio": "/media/raz/H/Friends Around the World.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Friends Around the World/raz_lh04_friendsaround_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Friends Around the World/raz_lh04_friendsaround_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Friends Around the World/raz_lh04wb_friendsaround.pdf"
      },
      {
        "title": "Goats Are Great!",
        "audio": "/media/raz/H/Goats Are Great!.mp3"
      },
      {
        "title": "Grasshopper's Gross Lunch",
        "audio": "/media/raz/H/Grasshopper's Gross Lunch.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Grasshopper's Gross Lunch/raz_lh19_grassgrosslunch_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Grasshopper's Gross Lunch/raz_lh19_grassgrosslunch_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Grasshopper's Gross Lunch/raz_lh19wb_grassgrosslunch.pdf"
      },
      {
        "title": "Grounded to Earth",
        "audio": "/media/raz/H/Grounded to Earth.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Grounded to Earth/raz_lh32_groundedtoearth_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Grounded to Earth/raz_lh32_groundedtoearth_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Grounded to Earth/raz_lh32wb_groundedtoearth.pdf"
      },
      {
        "title": "How the Mice Beat the Men",
        "audio": "/media/raz/H/How the Mice Beat the Men.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/How the Mice Beat the Men/raz_lh09_micebeatmen_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/How the Mice Beat the Men/raz_lh09_micemen_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/How the Mice Beat the Men/raz_lh09wb_micebeatmen.pdf"
      },
      {
        "title": "How to Make a Drum",
        "audio": "/media/raz/H/How to Make a Drum.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/How to Make a Drum/raz_lh34_howtomakedrum_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/How to Make a Drum/raz_lh34_howtomakedrum_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/How to Make a Drum/raz_lh34wb_howtomakedrum.pdf"
      },
      {
        "title": "I Live in the City",
        "audio": "/media/raz/H/I Live in the City.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/I Live in the City/raz_lh21_iliveincity_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/I Live in the City/raz_lh21_iliveincity_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/I Live in the City/raz_lh21wb_iliveincity.pdf"
      },
      {
        "title": "I'd Like To Be",
        "audio": "/media/raz/H/I'd Like To Be.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/I'd Like To Be/raz_lh06_idliketobe_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/I'd Like To Be/raz_lh06_idliketo_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/I'd Like To Be/raz_lh06wb_idliketobe.pdf"
      },
      {
        "title": "Legs- Wings- Fins- and Flippers",
        "audio": "/media/raz/H/Legs- Wings- Fins- and Flippers.mp3"
      },
      {
        "title": "Maria's Thanksgiving",
        "audio": "/media/raz/H/Maria's Thanksgiving.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Maria's Thanksgiving/raz_lh12_mariathanks_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Maria's Thanksgiving/raz_lh12_mariathanks_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Maria's Thanksgiving/raz_lh12wb_mariathanks.pdf"
      },
      {
        "title": "Math Test Mix-Up",
        "audio": "/media/raz/H/Math Test Mix-Up.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Math Test Mix-Up/raz_lh34_mathtestmixup_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Math Test Mix-Up/raz_lh15_mathtestmixup_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Math Test Mix-Up/raz_lh15wb_mathtestmixup.pdf"
      },
      {
        "title": "Monsters on Wheels",
        "audio": "/media/raz/H/Monsters on Wheels.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Monsters on Wheels/raz_tm02_monsterwheels_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Monsters on Wheels/raz_tm02_monwheels_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Monsters on Wheels/raz_tm02_monsterwheels_wb.pdf"
      },
      {
        "title": "Moose on the Move",
        "audio": "/media/raz/H/Moose on the Move.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Moose on the Move/raz_lh30_mooseonmove_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Moose on the Move/raz_lh30_mooseonmove_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Moose on the Move/raz_lh30wb_mooseonmove.pdf"
      },
      {
        "title": "Nami's Gifts",
        "audio": "/media/raz/H/Nami's Gifts.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Nami's Gifts/raz_lh18_namisgifts_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Nami's Gifts/raz_lh18_namisgifts_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Nami's Gifts/raz_lh18wb_namisgifts.pdf"
      },
      {
        "title": "Our Five Senses",
        "audio": "/media/raz/H/Our Five Senses.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Our Five Senses/raz_lh21_ourfivesenses_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Our Five Senses/raz_lh21_ourfivesenses_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Our Five Senses/raz_lh21wb_ourfivesenses.pdf"
      },
      {
        "title": "PIZZA!",
        "audio": "/media/raz/H/PIZZA!.mp3"
      },
      {
        "title": "Pip- the Monster Princess",
        "audio": "/media/raz/H/Pip- the Monster Princess.mp3"
      },
      {
        "title": "Pocket Parks",
        "audio": "/media/raz/H/Pocket Parks.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Pocket Parks/raz_lh34_pocketparks_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Pocket Parks/raz_lh34_pocketparks_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Pocket Parks/raz_lh34wb_pocketparks.pdf"
      },
      {
        "title": "Police Officers",
        "audio": "/media/raz/H/Police Officers.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Police Officers/raz_lh08_police_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Police Officers/raz_lh08_police_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Police Officers/raz_lh08wb_police.pdf"
      },
      {
        "title": "Sam's Fourth of July",
        "audio": "/media/raz/H/Sam's Fourth of July.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Sam's Fourth of July/raz_lh31_samsfourthofjuly_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Sam's Fourth of July/raz_lh31_unclesamsholiday_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Sam's Fourth of July/raz_lh31wb_samsfourthofjuly.pdf"
      },
      {
        "title": "Ships and Boats",
        "audio": "/media/raz/H/Ships and Boats.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Ships and Boats/raz_lh10_shipsandboats_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Ships and Boats/raz_lh10_shipboat_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Ships and Boats/raz_lh10wb_shipsandboats.pdf"
      },
      {
        "title": "Smaller and Smaller",
        "audio": "/media/raz/H/Smaller and Smaller.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Smaller and Smaller/raz_lh02_smallnsmall_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Smaller and Smaller/raz_lh02_smallnsmall_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Smaller and Smaller/raz_lh02wb_smallnsmall.pdf"
      },
      {
        "title": "Spring Is Here",
        "audio": "/media/raz/H/Spring Is Here.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Spring Is Here/raz_lh34_springishere_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Spring Is Here/raz_lh14_springishere_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Spring Is Here/raz_lh14wb_springishere.pdf"
      },
      {
        "title": "Statues in the Ice",
        "audio": "/media/raz/H/Statues in the Ice.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Statues in the Ice/raz_lh36_statuesinice_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Statues in the Ice/raz_lh36_statuesinice_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Statues in the Ice/raz_lh36wb_statuesinice.pdf"
      },
      {
        "title": "Statues in the Sand",
        "audio": "/media/raz/H/Statues in the Sand.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Statues in the Sand/raz_lh35_statuesinsand_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Statues in the Sand/raz_lh35_statuesinsand_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Statues in the Sand/raz_lh35wb_statuesinsand.pdf"
      },
      {
        "title": "Summer Olympics Events",
        "audio": "/media/raz/H/Summer Olympics Events.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Summer Olympics Events/raz_lh11_olympevents_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Summer Olympics Events/raz_lh11_olympevents_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Summer Olympics Events/raz_lh11wb_olympevents.pdf"
      },
      {
        "title": "Tag-Along Goat",
        "audio": "/media/raz/H/Tag-Along Goat.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Tag-Along Goat/raz_tm22_tagalonggoat_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Tag-Along Goat/raz_tm22_tagalonggoat_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Tag-Along Goat/raz_tm22_tagalonggoat_wb.pdf"
      },
      {
        "title": "Terell's Taste Buds",
        "audio": "/media/raz/H/Terell's Taste Buds.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Terell's Taste Buds/raz_lh17_terellstastebuds_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Terell's Taste Buds/raz_lh17_terelltastebuds_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Terell's Taste Buds/raz_lh17wb_terellstastebuds.pdf"
      },
      {
        "title": "The Butterfly Life Cycle",
        "audio": "/media/raz/H/The Butterfly Life Cycle.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/The Butterfly Life Cycle/raz_lh35_butterflylifecycle_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/The Butterfly Life Cycle/raz_lh35_butterflylifecycle_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/The Butterfly Life Cycle/raz_lh35wb_butterflylifecycle.pdf"
      },
      {
        "title": "The Day I Needed Help",
        "audio": "/media/raz/H/The Day I Needed Help.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/The Day I Needed Help/raz_lh29_dayineededhelp_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/The Day I Needed Help/raz_lh29_dayineededhelp_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/The Day I Needed Help/raz_lh29wb_dayineededhelp.pdf"
      },
      {
        "title": "The Goat and the Singing Wolf",
        "audio": "/media/raz/H/The Goat and the Singing Wolf.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/The Goat and the Singing Wolf/raz_lh35_goatandsingingwolf_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/The Goat and the Singing Wolf/raz_lh35_goatandsingingwolf_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/The Goat and the Singing Wolf/raz_lh35wb_goatandsingingwolf.pdf"
      },
      {
        "title": "The Owl and the Pussycat",
        "audio": "/media/raz/H/The Owl and the Pussycat.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/The Owl and the Pussycat/raz_lh03_owlandpussycat_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/The Owl and the Pussycat/raz_lh03_owlpussycat_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/The Owl and the Pussycat/raz_lh03wb_owlandpussyca.pdf"
      },
      {
        "title": "Weird Bird Beaks",
        "audio": "/media/raz/H/Weird Bird Beaks.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Weird Bird Beaks/raz_lh07_birdbeaks_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Weird Bird Beaks/raz_lh07_weirdbeaks_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Weird Bird Beaks/raz_lh07wb_birdbeaks.pdf"
      },
      {
        "title": "What Lives in This Hole",
        "audio": "/media/raz/H/What Lives in This Hole.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/What Lives in This Hole/raz_lh34_whatlivesinthathole_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/What Lives in This Hole/raz_lh34_whatlivesinthathole_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/What Lives in This Hole/raz_lh34wb_whatliveinthathole.pdf"
      },
      {
        "title": "Wing's Visit to Singapore",
        "audio": "/media/raz/H/Wing's Visit to Singapore.mp3",
        "pdf": "/media/RAZ 2000册/H 70+2/H 70+2/Wing's Visit to Singapore/raz_lh32_wingsvisittosingapore_clr.pdf",
        "worksheet": "/media/RAZ 2000册/H 70+2/H 70+2/Wing's Visit to Singapore/raz_lh16_wingsvisit_wksh.pdf",
        "workbook": "/media/RAZ 2000册/H 70+2/H 70+2/Wing's Visit to Singapore/raz_lh16wb_wingsvisit.pdf"
      }
    ]
  },
  {
    "level": "I",
    "grade": "G2-3",
    "ar": "2.6-2.9",
    "desc": "二三年级过渡",
    "count": 48,
    "books": [
      {
        "title": "A Broken Leg for Bonk",
        "audio": "/media/raz/I/A Broken Leg for Bonk.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/A Broken Leg for Bonk/raz_tm25_brokenlegbonk_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/A Broken Leg for Bonk/raz_tm25_brokenlegbonk_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/A Broken Leg for Bonk/raz_tm25_brokenlegbonk_wb.pdf"
      },
      {
        "title": "A Pocket Park for Tiny",
        "audio": "/media/raz/I/A Pocket Park for Tiny.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/A Pocket Park for Tiny/raz_li33_pocketparktiny_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/A Pocket Park for Tiny/raz_li33_pocketparktiny_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/A Pocket Park for Tiny/raz_li33wb_pocketparktiny.pdf"
      },
      {
        "title": "A Visit to the Zoo",
        "audio": "/media/raz/I/A Visit to the Zoo.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/A Visit to the Zoo/raz_li07_visittozoo_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/A Visit to the Zoo/raz_li07_visittozoo_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/A Visit to the Zoo/raz_li07wb_visittozoo.pdf"
      },
      {
        "title": "Alistair's Night",
        "audio": "/media/raz/I/Alistair's Night.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Alistair's Night/raz_li15_alistairsnight_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Alistair's Night/raz_li15_alistairsnight_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Alistair's Night/raz_li15wb_alistairsnight.pdf"
      },
      {
        "title": "Amazing Beaches",
        "audio": "/media/raz/I/Amazing Beaches.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Amazing Beaches/raz_li34_amazingbeaches_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Amazing Beaches/raz_li34_amazingbeaches_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Amazing Beaches/raz_li34wb_amazingbeaches.pdf"
      },
      {
        "title": "Arthur's Bad News Day",
        "audio": "/media/raz/I/Arthur's Bad News Day.mp3"
      },
      {
        "title": "Bigger Than a Monster Truck",
        "audio": "/media/raz/I/Bigger Than a Monster Truck.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Bigger Than a Monster Truck/raz_li34_biggerthanmonstertruck_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Bigger Than a Monster Truck/raz_li34_biggerthanmonstertruck_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Bigger Than a Monster Truck/raz_li34wb_biggerthanmonstertruck.pdf"
      },
      {
        "title": "Birds",
        "audio": "/media/raz/I/Birds.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Birds/raz_li32_birds_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Birds/raz_li11_birds_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Birds/raz_li11wb_birds.pdf"
      },
      {
        "title": "Bonk and the Big Splash",
        "audio": "/media/raz/I/Bonk and the Big Splash.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Bonk and the Big Splash/raz_tm08_bonkbigsplash_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Bonk and the Big Splash/raz_tm08_bigsplash_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Bonk and the Big Splash/raz_tm08_bonkbigsplash_wb.pdf"
      },
      {
        "title": "Bonk and the Lucky Buckeye",
        "audio": "/media/raz/I/Bonk and the Lucky Buckeye.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Bonk and the Lucky Buckeye/raz_tm29_luckybuckeye_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Bonk and the Lucky Buckeye/raz_tm29_luckybuckeye_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Bonk and the Lucky Buckeye/raz_tm29_luckybuckeye_wb.pdf"
      },
      {
        "title": "Building a Bridge",
        "audio": "/media/raz/I/Building a Bridge.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Building a Bridge/raz_li05_buildingbridge_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Building a Bridge/raz_li05_bridge_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Building a Bridge/raz_li05wb_buildingbridge.pdf"
      },
      {
        "title": "Camping with Bonk",
        "audio": "/media/raz/I/Camping with Bonk.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Camping with Bonk/raz_tm01_campingwithbonk_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Camping with Bonk/raz_tm01_campbonk_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Camping with Bonk/raz_tm01_campingwithbonk_wb.pdf"
      },
      {
        "title": "Childhood Stories of George Washington",
        "audio": "/media/raz/I/Childhood Stories of George Washington.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Childhood Stories of George Washington/raz_li09_gwashstories_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Childhood Stories of George Washington/raz_li09_gwashington_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Childhood Stories of George Washington/raz_li09wb_gwashstories.pdf"
      },
      {
        "title": "Discovering Dinosaurs",
        "audio": "/media/raz/I/Discovering Dinosaurs.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Discovering Dinosaurs/raz_li33_discoveringdinosaurs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Discovering Dinosaurs/raz_li13_discoverdinos_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Discovering Dinosaurs/raz_li13wb_discoverdinos.pdf"
      },
      {
        "title": "Extreme Insects",
        "audio": "/media/raz/I/Extreme Insects.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Extreme Insects/raz_li14_extremeinsects_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Extreme Insects/raz_li14_extremeinsect_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Extreme Insects/raz_li14wb_extremeinsects.pdf"
      },
      {
        "title": "Families",
        "audio": "/media/raz/I/Families.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Families/raz_li04_families_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Families/raz_li04_families_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Families/raz_li04wb_families.pdf"
      },
      {
        "title": "Fantastic Flying Machines",
        "audio": "/media/raz/I/Fantastic Flying Machines.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Fantastic Flying Machines/raz_li28_flyingmachines_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Fantastic Flying Machines/raz_li28_flyingmac_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Fantastic Flying Machines/raz_li28wb_flyingmachine.pdf"
      },
      {
        "title": "Fast and Faster",
        "audio": "/media/raz/I/Fast and Faster.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Fast and Faster/raz_li34_fastandfaster_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Fast and Faster/raz_li34_fastandfaster_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Fast and Faster/raz_li34wb_fastandfaster.pdf"
      },
      {
        "title": "Goldilocks and the Other Three Bears",
        "audio": "/media/raz/I/Goldilocks and the Other Three Bears.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Goldilocks and the Other Three Bears/raz_li27_otherthreebears_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Goldilocks and the Other Three Bears/raz_li26_threebears_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Goldilocks and the Other Three Bears/raz_li27wb_otherthreebears.pdf"
      },
      {
        "title": "Goldilocks and the Three Bears",
        "audio": "/media/raz/I/Goldilocks and the Three Bears.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Goldilocks and the Three Bears/raz_li26_threebears_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Goldilocks and the Three Bears/raz_li26_threebears_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Goldilocks and the Three Bears/raz_li26wb_threebears.pdf"
      },
      {
        "title": "Healthy Me",
        "audio": "/media/raz/I/Healthy Me.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Healthy Me/raz_li06_healthyme_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Healthy Me/raz_li06_healthyme_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Healthy Me/raz_li06wb_healthyme.pdf"
      },
      {
        "title": "Hibernation",
        "audio": "/media/raz/I/Hibernation.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Hibernation/raz_li32_hibernation_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Hibernation/raz_li23_hibernation_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Hibernation/raz_li23wb_hibernation.pdf"
      },
      {
        "title": "Hippo's Toothache",
        "audio": "/media/raz/I/Hippo's Toothache.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Hippo's Toothache/raz_li02_hippostoothache_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Hippo's Toothache/raz_li02_hipposthache_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Hippo's Toothache/raz_li02wb_hippostoothache.pdf"
      },
      {
        "title": "How Glooskap Found Summer",
        "audio": "/media/raz/I/How Glooskap Found Summer.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/How Glooskap Found Summer/raz_li32_howglooskapfoundsummer_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/How Glooskap Found Summer/raz_li10_howglooskap_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/How Glooskap Found Summer/raz_li10wb_howglooskap.pdf"
      },
      {
        "title": "How to Make Paper",
        "audio": "/media/raz/I/How to Make Paper.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/How to Make Paper/raz_li19_howtomakepaper_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/How to Make Paper/raz_li19_howtomakepaper_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/How to Make Paper/raz_li19wb_howtomakepaper.pdf"
      },
      {
        "title": "Is That a Fish",
        "audio": "/media/raz/I/Is That a Fish.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Is That a Fish/raz_li12_isthatafish_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Is That a Fish/raz_li12_isthatafish_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Is That a Fish/raz_li12wb_isthatafish.pdf"
      },
      {
        "title": "Jane Goodall",
        "audio": "/media/raz/I/Jane Goodall.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Jane Goodall/raz_li32_janegoodall_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Jane Goodall/raz_li32_janegoodall_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Jane Goodall/raz_li32wb_janegoodall.pdf"
      },
      {
        "title": "Life at the Pond",
        "audio": "/media/raz/I/Life at the Pond.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Life at the Pond/raz_li08_lifeatthepond_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Life at the Pond/raz_li08_lifeatpond_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Life at the Pond/raz_li08wb_lifeatthepond.pdf"
      },
      {
        "title": "Lincoln Loved to Learn",
        "audio": "/media/raz/I/Lincoln Loved to Learn.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Lincoln Loved to Learn/raz_li34_lincolnlovedtolearn_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Lincoln Loved to Learn/raz_li34_lincolnlovedtolearn_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Lincoln Loved to Learn/raz_li34wb_lincolnlovedtolearn.pdf"
      },
      {
        "title": "Mike's Good Bad Day",
        "audio": "/media/raz/I/Mike's Good Bad Day.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Mike's Good Bad Day/raz_li32_mikesgoodbadday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Mike's Good Bad Day/raz_li18_mikesgoodbad_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Mike's Good Bad Day/raz_li18wb_mikesgoodbad.pdf"
      },
      {
        "title": "Monster Moving Day",
        "audio": "/media/raz/I/Monster Moving Day.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Monster Moving Day/raz_tm24_monstermoving_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Monster Moving Day/raz_tm24_monstermoving_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Monster Moving Day/raz_tm24_monstermoving_wb.pdf"
      },
      {
        "title": "Monster Music",
        "audio": "/media/raz/I/Monster Music.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Monster Music/raz_tm21_monstermusic_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Monster Music/raz_tm21_monstermusic_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Monster Music/raz_tm21_monstermusic_wb.pdf"
      },
      {
        "title": "Monster Snow Day",
        "audio": "/media/raz/I/Monster Snow Day.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Monster Snow Day/raz_tm20_monstersnow_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Monster Snow Day/raz_tm20_monstersnow_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Monster Snow Day/raz_tm20_monstersnow_wb.pdf"
      },
      {
        "title": "Monster Soccer",
        "audio": "/media/raz/I/Monster Soccer.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Monster Soccer/raz_tm11_monstersoccer_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Monster Soccer/raz_tm11_monsoccer_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Monster Soccer/raz_tm11_monstersoccer_wb.pdf"
      },
      {
        "title": "Owls Overhead",
        "audio": "/media/raz/I/Owls Overhead.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Owls Overhead/raz_li34_owlsoverhead_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Owls Overhead/raz_li34_owlsoverhead_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Owls Overhead/raz_li34wb_owlsoverhead.pdf"
      },
      {
        "title": "Roadside Oddities",
        "audio": "/media/raz/I/Roadside Oddities.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Roadside Oddities/raz_li34_roadsideoddities_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Roadside Oddities/raz_li34_roadsideoddities_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Roadside Oddities/raz_li34wb_roadsideoddities.pdf"
      },
      {
        "title": "Ruby Bridges",
        "audio": "/media/raz/I/Ruby Bridges.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Ruby Bridges/raz_li34_rubybridges_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Ruby Bridges/raz_li34_rubybridges_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Ruby Bridges/raz_li34wb_rubybridges.pdf"
      },
      {
        "title": "Slow and Slower",
        "audio": "/media/raz/I/Slow and Slower.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Slow and Slower/raz_li34_slowandslower_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Slow and Slower/raz_li34_slowandslower_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Slow and Slower/raz_li34wb_slowandslower.pdf"
      },
      {
        "title": "Soup and a Sandwish",
        "audio": "/media/raz/I/Soup and a Sandwish.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Soup and a Sandwish/raz_li03_soupandsandwish_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Soup and a Sandwish/raz_li03_sandwish_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Soup and a Sandwish/raz_li03wb_soupandsandwish.pdf"
      },
      {
        "title": "The 100th Day Project",
        "audio": "/media/raz/I/The 100th Day Project.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/The 100th Day Project/raz_li24_100thday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/The 100th Day Project/raz_li24_100thday_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/The 100th Day Project/raz_li24wb_100thday.pdf"
      },
      {
        "title": "The Magic Bike",
        "audio": "/media/raz/I/The Magic Bike.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/The Magic Bike/raz_li20_themagicbike_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/The Magic Bike/raz_li20_themagicbike_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/The Magic Bike/raz_li20wb_themagicbike.pdf"
      },
      {
        "title": "The Monster Pumpkins",
        "audio": "/media/raz/I/The Monster Pumpkins.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/The Monster Pumpkins/raz_tm23_monsterpumpkins_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/The Monster Pumpkins/raz_tm23_monsterpumpkins_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/The Monster Pumpkins/raz_tm23_monsterpumpkins_wb.pdf"
      },
      {
        "title": "The Three Little Pigs",
        "audio": "/media/raz/I/The Three Little Pigs.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/The Three Little Pigs/raz_li22_threelittlepigs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/The Three Little Pigs/raz_li22_threelittlepigs_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/The Three Little Pigs/raz_li22wb_threelittlepigs.pdf"
      },
      {
        "title": "Tian Tian- a Giant Panda",
        "audio": "/media/raz/I/Tian Tian- a Giant Panda.mp3"
      },
      {
        "title": "Turkeys in the Trees",
        "audio": "/media/raz/I/Turkeys in the Trees.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Turkeys in the Trees/raz_li32_turkeysintrees_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Turkeys in the Trees/raz_li32_turkeysintrees_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Turkeys in the Trees/raz_li32wb_turkeysintrees.pdf"
      },
      {
        "title": "We Make Maple Syrup",
        "audio": "/media/raz/I/We Make Maple Syrup.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/We Make Maple Syrup/raz_li31_makemaplesyrup_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/We Make Maple Syrup/raz_li31_makemaplesyrup_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/We Make Maple Syrup/raz_li31wb_makemaplesyrup.pdf"
      },
      {
        "title": "Why Robins Hop",
        "audio": "/media/raz/I/Why Robins Hop.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Why Robins Hop/raz_li33_whyrobinshop_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Why Robins Hop/raz_li16_whyrobinshop_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Why Robins Hop/raz_li16wb_whyrobinshop.pdf"
      },
      {
        "title": "Winter Vacation",
        "audio": "/media/raz/I/Winter Vacation.mp3",
        "pdf": "/media/RAZ 2000册/I 70+2/I 70+2/Winter Vacation/raz_li21_wintervacation_clr.pdf",
        "worksheet": "/media/RAZ 2000册/I 70+2/I 70+2/Winter Vacation/raz_li21_wintervacation_wksh.pdf",
        "workbook": "/media/RAZ 2000册/I 70+2/I 70+2/Winter Vacation/raz_li21wb_wintervacation.pdf"
      }
    ]
  },
  {
    "level": "J",
    "grade": "G3",
    "ar": "2.9-3.2",
    "desc": "三年级",
    "count": 51,
    "books": [
      {
        "title": "A Rainbow of Food",
        "audio": "/media/raz/J/A Rainbow of Food.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/A Rainbow of Food/raz_lj36_rainbowoffood_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/A Rainbow of Food/raz_lj36_rainbowoffood_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/A Rainbow of Food/raz_lj36wb_rainbowoffood.pdf"
      },
      {
        "title": "Animal Skeletons",
        "audio": "/media/raz/J/Animal Skeletons.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Animal Skeletons/raz_lj07_aniskeli_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Animal Skeletons/raz_lj07_animalskel_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Animal Skeletons/raz_lj07wb_aniskeli.pdf"
      },
      {
        "title": "Being Bilingual",
        "audio": "/media/raz/J/Being Bilingual.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Being Bilingual/raz_lj21_beingbilingual_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Being Bilingual/raz_lj21_beingbilingual_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Being Bilingual/raz_lj21wb_beingbilingual.pdf"
      },
      {
        "title": "Bonk at the Barbershop",
        "audio": "/media/raz/J/Bonk at the Barbershop.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Bonk at the Barbershop/raz_tm13_bonkbarber_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Bonk at the Barbershop/raz_tm13_bonkbarber_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Bonk at the Barbershop/raz_tm13_bonkbarber_wb.pdf"
      },
      {
        "title": "Bonk's New Bike",
        "audio": "/media/raz/J/Bonk's New Bike.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Bonk's New Bike/raz_tm15_bonksbike_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Bonk's New Bike/raz_tm15_bonksbike_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Bonk's New Bike/raz_tm15_bonksbike_wb.pdf"
      },
      {
        "title": "Bonk- the Healthy Monster",
        "audio": "/media/raz/J/Bonk- the Healthy Monster.mp3"
      },
      {
        "title": "Brazil",
        "audio": "/media/raz/J/Brazil.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Brazil/raz_lj38_brazil_clr.pdf"
      },
      {
        "title": "Broken Arm Blues",
        "audio": "/media/raz/J/Broken Arm Blues.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Broken Arm Blues/raz_lj34_brokenarmblues_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Broken Arm Blues/raz_lj34_brokenarmblues_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Broken Arm Blues/raz_lj34wb_brokenarmblues.pdf"
      },
      {
        "title": "Can You Say Pterodactyl",
        "audio": "/media/raz/J/Can You Say Pterodactyl.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Can You Say Pterodactyl/raz_lj24_canyousaypterodactyl_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Can You Say Pterodactyl/raz_lj04_canyousay_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Can You Say Pterodactyl/raz_lj24wb_canyousaypterodactyl.pdf"
      },
      {
        "title": "Changes",
        "audio": "/media/raz/J/Changes.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Changes/raz_lj03_changes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Changes/raz_lj03_changes_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Changes/raz_lj03wb_changes.pdf"
      },
      {
        "title": "Darby's Birthday Party",
        "audio": "/media/raz/J/Darby's Birthday Party.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Darby's Birthday Party/raz_lj02_darbysbday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Darby's Birthday Party/raz_lj02_darbysbday_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Darby's Birthday Party/raz_lj02wb_darbysbday.pdf"
      },
      {
        "title": "Egypt",
        "audio": "/media/raz/J/Egypt.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Egypt/raz_lj38_egypt_clr.pdf"
      },
      {
        "title": "Feliz Navidad- Carlos!",
        "audio": "/media/raz/J/Feliz Navidad- Carlos!.mp3"
      },
      {
        "title": "Firefighters",
        "audio": "/media/raz/J/Firefighters.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Firefighters/raz_lj09_firefighters_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Firefighters/raz_lj09_firefighters_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Firefighters/raz_lj09wb_firefighters.pdf"
      },
      {
        "title": "Garrett Morgan and the Traffic Signal",
        "audio": "/media/raz/J/Garrett Morgan and the Traffic Signal.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Garrett Morgan and the Traffic Signal/raz_lj15_garrettmorgan_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Garrett Morgan and the Traffic Signal/raz_lj15_garrettmorgan_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Garrett Morgan and the Traffic Signal/raz_lj15wb_garrettmorgan.pdf"
      },
      {
        "title": "Going to the Art Museum",
        "audio": "/media/raz/J/Going to the Art Museum.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Going to the Art Museum/raz_lj11_artmuseum_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Going to the Art Museum/raz_lj11_artmuseum_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Going to the Art Museum/raz_lj11wb_artmuseum.pdf"
      },
      {
        "title": "Guess That President",
        "audio": "/media/raz/J/Guess That President.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Guess That President/raz_lj36_guessthatpresident_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Guess That President/raz_lj36_guessthatpresident_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Guess That President/raz_lj36wb_guessthatpresident.pdf"
      },
      {
        "title": "Hannah's Townspeople",
        "audio": "/media/raz/J/Hannah's Townspeople.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Hannah's Townspeople/raz_lj36_hannahstownspeople_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Hannah's Townspeople/raz_lj22_hannahstown_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Hannah's Townspeople/raz_lj22wb_hannahstown.pdf"
      },
      {
        "title": "Heroes of September 11",
        "audio": "/media/raz/J/Heroes of September 11.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Heroes of September 11/raz_lj32_heroesofseptember11_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Heroes of September 11/raz_lj32_heroesofseptember11_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Heroes of September 11/raz_lj32wb_heroesofseptember11.pdf"
      },
      {
        "title": "I Broke It",
        "audio": "/media/raz/J/I Broke It.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/I Broke It/raz_lj37_ibrokeit_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/I Broke It/raz_lj37_ibrokeit_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/I Broke It/raz_lj37wb_ibrokeit.pdf"
      },
      {
        "title": "I'm the Tall One",
        "audio": "/media/raz/J/I'm the Tall One.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/I'm the Tall One/raz_lj33_imtallone_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/I'm the Tall One/raz_lj33_imtallone_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/I'm the Tall One/raz_lj33wb_imtallone.pdf"
      },
      {
        "title": "Ichiro Suzuki",
        "audio": "/media/raz/J/Ichiro Suzuki.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Ichiro Suzuki/raz_lj36_ichirosuzuki_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Ichiro Suzuki/raz_lj36_ichirosuzuki_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Ichiro Suzuki/raz_lj36wb_ichirosuzuki.pdf"
      },
      {
        "title": "It's Cinco de Mayo- Carlos!",
        "audio": "/media/raz/J/It's Cinco de Mayo- Carlos!.mp3"
      },
      {
        "title": "Leopard- Ram- and Jackal",
        "audio": "/media/raz/J/Leopard- Ram- and Jackal.mp3"
      },
      {
        "title": "Let's Make Shapes!",
        "audio": "/media/raz/J/Let's Make Shapes!.mp3"
      },
      {
        "title": "Mexico",
        "audio": "/media/raz/J/Mexico.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Mexico/raz_lj37_mexico_clr.pdf"
      },
      {
        "title": "Monkey and Crocodile",
        "audio": "/media/raz/J/Monkey and Crocodile.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Monkey and Crocodile/raz_lj35_monkeyandcrocodile_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Monkey and Crocodile/raz_lj35_monkeyandcrocodile_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Monkey and Crocodile/raz_lj35wb_monkeyandcrocodile.pdf"
      },
      {
        "title": "Monster Cowboy",
        "audio": "/media/raz/J/Monster Cowboy.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Monster Cowboy/raz_tm14_monstercowboy_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Monster Cowboy/raz_tm14_monstercowboy_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Monster Cowboy/raz_tm14_monstercowboy_clr_ds.pdf"
      },
      {
        "title": "My Uncle Is a Firefighter",
        "audio": "/media/raz/J/My Uncle Is a Firefighter.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/My Uncle Is a Firefighter/raz_lj36_myuncleisfirefighter_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/My Uncle Is a Firefighter/raz_lj36_myuncleisfirefighter_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/My Uncle Is a Firefighter/raz_lj36wb_myuncleisfirefighter.pdf"
      },
      {
        "title": "Number Twelve",
        "audio": "/media/raz/J/Number Twelve.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Number Twelve/raz_lj23_number12_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Number Twelve/raz_lj23_number12_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Number Twelve/raz_lj23wb_number12.pdf"
      },
      {
        "title": "Ocean Animals",
        "audio": "/media/raz/J/Ocean Animals.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Ocean Animals/raz_lj08_oceananimals_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Ocean Animals/raz_lj08_oceanani_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Ocean Animals/raz_lj08wb_oceananimals.pdf"
      },
      {
        "title": "Riding With Rosa Parks",
        "audio": "/media/raz/J/Riding With Rosa Parks.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Riding With Rosa Parks/raz_lj35_ridingwithrosaparks_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Riding With Rosa Parks/raz_lj13_rosaparks_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Riding With Rosa Parks/raz_lj13wb_rosaparks.pdf"
      },
      {
        "title": "Safe Biking with Dad",
        "audio": "/media/raz/J/Safe Biking with Dad.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Safe Biking with Dad/raz_lj32_safebikingwithdad_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Safe Biking with Dad/raz_lj32_safebikingwithdad_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Safe Biking with Dad/raz_lj32wb_safebikingwithdad.pdf"
      },
      {
        "title": "Sharks",
        "audio": "/media/raz/J/Sharks.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Sharks/raz_lj24_sharks.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Sharks/raz_lj24_sharks_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Sharks/raz_lj24wb_sharks.pdf"
      },
      {
        "title": "The Cinnamon Bun Mystery",
        "audio": "/media/raz/J/The Cinnamon Bun Mystery.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/The Cinnamon Bun Mystery/raz_lj14_cinnamonbun_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/The Cinnamon Bun Mystery/raz_lj14_cinnamonbun_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/The Cinnamon Bun Mystery/raz_lj14wb_cinnamonbun.pdf"
      },
      {
        "title": "The Creature Constitution",
        "audio": "/media/raz/J/The Creature Constitution.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/The Creature Constitution/raz_lj36_creatureconstitution_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/The Creature Constitution/raz_lj36_creatureconstitution_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/The Creature Constitution/raz_lj36wb_creatureconstitution.pdf"
      },
      {
        "title": "The Disappearing Moon",
        "audio": "/media/raz/J/The Disappearing Moon.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/The Disappearing Moon/raz_lj35_disappearingmoon_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/The Disappearing Moon/raz_lj16_disappearmoon_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/The Disappearing Moon/raz_lj16wb_disappearmoon.pdf"
      },
      {
        "title": "The Ship of Shapes",
        "audio": "/media/raz/J/The Ship of Shapes.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/The Ship of Shapes/raz_lj36_shipofshapes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/The Ship of Shapes/raz_lj36_shipofshapes_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/The Ship of Shapes/raz_lj36wb_shipofshapes.pdf"
      },
      {
        "title": "The Story of the Statue",
        "audio": "/media/raz/J/The Story of the Statue.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/The Story of the Statue/raz_lj31_storyofstatue_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/The Story of the Statue/raz_lj31_storyofstatue_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/The Story of the Statue/raz_lj31wb_storyofstatue.pdf"
      },
      {
        "title": "The Thanksgiving the Jacks Built",
        "audio": "/media/raz/J/The Thanksgiving the Jacks Built.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/The Thanksgiving the Jacks Built/raz_lj36_thanksgivingjacksbuilt_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/The Thanksgiving the Jacks Built/raz_lj17_thanksgivingjacks_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/The Thanksgiving the Jacks Built/raz_lj17wb_thanksgivingjacks.pdf"
      },
      {
        "title": "The Thanksgiving the Other Jacks Built",
        "audio": "/media/raz/J/The Thanksgiving the Other Jacks Built.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/The Thanksgiving the Other Jacks Built/raz_lj36_thanksgivingotherjacksbuilt_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/The Thanksgiving the Other Jacks Built/raz_lj17_thanksgivingjacks_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/The Thanksgiving the Other Jacks Built/raz_lj18wb_thanksotherjacks.pdf"
      },
      {
        "title": "Uzzle- The Football Star",
        "audio": "/media/raz/J/Uzzle- The Football Star.mp3"
      },
      {
        "title": "Welcome- Carlos!",
        "audio": "/media/raz/J/Welcome- Carlos!.mp3"
      },
      {
        "title": "What Pet Should You Get",
        "audio": "/media/raz/J/What Pet Should You Get.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/What Pet Should You Get/raz_lj19_whatpet_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/What Pet Should You Get/raz_lj18_whatpet_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/What Pet Should You Get/raz_lj19wb_whatpet.pdf"
      },
      {
        "title": "When Bad Things Happen",
        "audio": "/media/raz/J/When Bad Things Happen.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/When Bad Things Happen/raz_lj31_whenbadthingshappen_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/When Bad Things Happen/raz_lj29_whenbadthingshappen_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/When Bad Things Happen/raz_lj29wb_whenbadthingshappen.pdf"
      },
      {
        "title": "Where's the Joey",
        "audio": "/media/raz/J/Where's the Joey.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Where's the Joey/raz_lj35_wheresjoey_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Where's the Joey/raz_lj35_wheresjoey_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Where's the Joey/raz_lj35wb_wheresjoey.pdf"
      },
      {
        "title": "Whose Tracks Are These",
        "audio": "/media/raz/J/Whose Tracks Are These.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Whose Tracks Are These/raz_lj20_whosetracks_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Whose Tracks Are These/raz_lj20_whosetracks_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Whose Tracks Are These/raz_lj20wb_whosetracks.pdf"
      },
      {
        "title": "Why Do Leaves Change Color",
        "audio": "/media/raz/J/Why Do Leaves Change Color.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Why Do Leaves Change Color/raz_lj37_whydoleaveschangecolor_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Why Do Leaves Change Color/raz_lj37_whydoleaveschangecolor_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Why Do Leaves Change Color/raz_lj37wb_whydoleaveschangecolor.pdf"
      },
      {
        "title": "Why I'm Late Today",
        "audio": "/media/raz/J/Why I'm Late Today.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Why I'm Late Today/raz_lj36_whyimlatetoday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Why I'm Late Today/raz_lj36_whyimlatetoday_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Why I'm Late Today/raz_lj36wb_whyimlatetoday.pdf"
      },
      {
        "title": "Wiggly Worms",
        "audio": "/media/raz/J/Wiggly Worms.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Wiggly Worms/raz_lj38_wigglyworms_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Wiggly Worms/raz_lj38_wigglyworms_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Wiggly Worms/raz_lj38wb_wigglyworms.pdf"
      },
      {
        "title": "Wonders of Nature",
        "audio": "/media/raz/J/Wonders of Nature.mp3",
        "pdf": "/media/RAZ 2000册/J 75+2/J 75+2/Wonders of Nature/raz_lj25_wondersofnature_clr.pdf",
        "worksheet": "/media/RAZ 2000册/J 75+2/J 75+2/Wonders of Nature/raz_lj25_wondersofnature_wksh.pdf",
        "workbook": "/media/RAZ 2000册/J 75+2/J 75+2/Wonders of Nature/raz_lj25wb_wondersofnature.pdf"
      }
    ]
  },
  {
    "level": "K",
    "grade": "G3",
    "ar": "3.2-3.5",
    "desc": "三年级高段",
    "count": 48,
    "books": [
      {
        "title": "All About Kites",
        "audio": "/media/raz/K/All About Kites.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/All About Kites/raz_lk10_allaboutkites_clr.pdf"
      },
      {
        "title": "Animals- Animals",
        "audio": "/media/raz/K/Animals- Animals.mp3"
      },
      {
        "title": "Anna and the Magic Coat",
        "audio": "/media/raz/K/Anna and the Magic Coat.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Anna and the Magic Coat/raz_lk11_annamagiccoat_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Anna and the Magic Coat/raz_lk11_magiccoat_wksh.pdf"
      },
      {
        "title": "Barack Obama",
        "audio": "/media/raz/K/Barack Obama.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Barack Obama/raz_lk27_barackobama_clr.pdf"
      },
      {
        "title": "Blackbeard the Pirate",
        "audio": "/media/raz/K/Blackbeard the Pirate.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Blackbeard the Pirate/raz_lk29_blackbeardpirate_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Blackbeard the Pirate/raz_lk29_blackbeardpirate_wksh.pdf"
      },
      {
        "title": "Carlos's Family Celebration",
        "audio": "/media/raz/K/Carlos's Family Celebration.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Carlos's Family Celebration/raz_lk27_carlossfamilycelebration_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Carlos's Family Celebration/raz_lk27_carlossfamilycelebration_wksh.pdf"
      },
      {
        "title": "Chickens in My Backyard",
        "audio": "/media/raz/K/Chickens in My Backyard.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Chickens in My Backyard/raz_lk29_chickensinmybackyard_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Chickens in My Backyard/raz_lk29_chickensinmybackyard_wksh.pdf"
      },
      {
        "title": "Community Government",
        "audio": "/media/raz/K/Community Government.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Community Government/raz_lk29_communitygovernment_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Community Government/raz_lk29_communitygovernment_wksh.pdf"
      },
      {
        "title": "Día de los Muertos",
        "audio": "/media/raz/K/Día de los Muertos.mp3"
      },
      {
        "title": "Extreme Animals",
        "audio": "/media/raz/K/Extreme Animals.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Extreme Animals/raz_lk06_extremeanimals_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Extreme Animals/raz_lk06_extreme_wksh.pdf"
      },
      {
        "title": "Fishing in the Rain",
        "audio": "/media/raz/K/Fishing in the Rain.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Fishing in the Rain/raz_th08_fishingintherain_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Fishing in the Rain/raz_th08_fishinginrain_wksh.pdf"
      },
      {
        "title": "Flying Kites",
        "audio": "/media/raz/K/Flying Kites.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Flying Kites/raz_th03_flyingkites_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Flying Kites/raz_th03_flyingkites_wksh.pdf"
      },
      {
        "title": "France",
        "audio": "/media/raz/K/France.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/France/raz_lk29_france_clr.pdf"
      },
      {
        "title": "Friends Around the World",
        "audio": "/media/raz/K/Friends Around the World.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Friends Around the World/raz_lk26_friendsaround_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Friends Around the World/raz_lk26_friendsaround_wksh.pdf"
      },
      {
        "title": "Good for Thurgood!",
        "audio": "/media/raz/K/Good for Thurgood!.mp3"
      },
      {
        "title": "Grounded to Earth",
        "audio": "/media/raz/K/Grounded to Earth.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Grounded to Earth/raz_lk30_groundedtoearth_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Grounded to Earth/raz_lk30_groundedtoearth_wksh.pdf"
      },
      {
        "title": "How Glooskap Found Summer",
        "audio": "/media/raz/K/How Glooskap Found Summer.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/How Glooskap Found Summer/raz_lk22_howglooskap_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/How Glooskap Found Summer/raz_lk22_howglooskap_wksh.pdf"
      },
      {
        "title": "How Zebras Got Their Stripes",
        "audio": "/media/raz/K/How Zebras Got Their Stripes.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/How Zebras Got Their Stripes/raz_lk29_howzebrasgottheirstripes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/How Zebras Got Their Stripes/raz_lk02_howzebras_wksh.pdf"
      },
      {
        "title": "Hugs for Daddy",
        "audio": "/media/raz/K/Hugs for Daddy.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Hugs for Daddy/raz_lk27_hugsdaddy_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Hugs for Daddy/raz_lk27_hugsdaddy_wksh.pdf"
      },
      {
        "title": "I Fly Hot-Air Balloons",
        "audio": "/media/raz/K/I Fly Hot-Air Balloons.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/I Fly Hot-Air Balloons/raz_lk23_iflyballoons_ds_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/I Fly Hot-Air Balloons/raz_lk23_iflyballoons_wksh.pdf"
      },
      {
        "title": "I Love City Parks",
        "audio": "/media/raz/K/I Love City Parks.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/I Love City Parks/raz_lk29_ilovecityparks_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/I Love City Parks/raz_lk29_ilovecityparks_wksh.pdf"
      },
      {
        "title": "I'd Like To Be",
        "audio": "/media/raz/K/I'd Like To Be.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/I'd Like To Be/raz_lk19_idliketobe_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/I'd Like To Be/raz_lk19_idliketobe_wksh.pdf"
      },
      {
        "title": "I'm Allergic to Peanuts",
        "audio": "/media/raz/K/I'm Allergic to Peanuts.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/I'm Allergic to Peanuts/raz_lk29_imallergictopeanuts_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/I'm Allergic to Peanuts/raz_lk29_imallergictopeanuts_wksh.pdf"
      },
      {
        "title": "India",
        "audio": "/media/raz/K/India.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/India/raz_lk29_india_clr.pdf"
      },
      {
        "title": "It's About Time",
        "audio": "/media/raz/K/It's About Time.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/It's About Time/raz_lk27_itsabouttime_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/It's About Time/raz_lk15_itsabouttime_wksh.pdf"
      },
      {
        "title": "Japan",
        "audio": "/media/raz/K/Japan.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Japan/raz_lk29_japan_clr.pdf"
      },
      {
        "title": "Leap! A Salmon's Story",
        "audio": "/media/raz/K/Leap! A Salmon's Story.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Leap! A Salmon's Story/raz_lk30_leapsalmonsstory_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Leap! A Salmon's Story/raz_lk16_leapsalmon_wksh.pdf"
      },
      {
        "title": "Maria's Family Celebration",
        "audio": "/media/raz/K/Maria's Family Celebration.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Maria's Family Celebration/raz_lk29_mariasfamilycelebration_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Maria's Family Celebration/raz_lk17_mariasfamily_wksh.pdf"
      },
      {
        "title": "Migrating Geese",
        "audio": "/media/raz/K/Migrating Geese.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Migrating Geese/raz_lk27_migratinggeese_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Migrating Geese/raz_lk05_migrating_wksh.pdf"
      },
      {
        "title": "New Planet- New School",
        "audio": "/media/raz/K/New Planet- New School.mp3"
      },
      {
        "title": "Playing It Safe",
        "audio": "/media/raz/K/Playing It Safe.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Playing It Safe/raz_lk12_playingitsafe_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Playing It Safe/raz_lk12_playingitsafe_wksh.pdf"
      },
      {
        "title": "Police Officers",
        "audio": "/media/raz/K/Police Officers.mp3"
      },
      {
        "title": "Ratty Rats",
        "audio": "/media/raz/K/Ratty Rats.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Ratty Rats/raz_lk03_rattyrats_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Ratty Rats/raz_lk03_rattyrats_wksh.pdf"
      },
      {
        "title": "Sam's Fourth of July",
        "audio": "/media/raz/K/Sam's Fourth of July.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Sam's Fourth of July/raz_lk30_unclesamsholiday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Sam's Fourth of July/raz_lk30_unclesamsholiday_wksh.pdf"
      },
      {
        "title": "Ships and Boats",
        "audio": "/media/raz/K/Ships and Boats.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Ships and Boats/raz_lk24_shipsandboats_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Ships and Boats/raz_lk24_shipsandboats_wksh.pdf"
      },
      {
        "title": "Simple Machines",
        "audio": "/media/raz/K/Simple Machines.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Simple Machines/raz_lk07_simplemachines_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Simple Machines/raz_lk07_simplemac_wksh.pdf"
      },
      {
        "title": "Slithery and Slimy",
        "audio": "/media/raz/K/Slithery and Slimy.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Slithery and Slimy/raz_lk08_slithery_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Slithery and Slimy/raz_lk08_slithery_wksh.pdf"
      },
      {
        "title": "Soccer Is a Kick!",
        "audio": "/media/raz/K/Soccer Is a Kick!.mp3"
      },
      {
        "title": "Soggy Stepsisters",
        "audio": "/media/raz/K/Soggy Stepsisters.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Soggy Stepsisters/raz_lk29_soggystepsisters_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Soggy Stepsisters/raz_lk29_soggystepsisters_wksh.pdf"
      },
      {
        "title": "Strange Plants",
        "audio": "/media/raz/K/Strange Plants.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Strange Plants/raz_lk04_strangeplants_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Strange Plants/raz_lk04_strangeplants_wksh.pdf"
      },
      {
        "title": "Summer Olympics Events",
        "audio": "/media/raz/K/Summer Olympics Events.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Summer Olympics Events/raz_lk21_summerolympics_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Summer Olympics Events/raz_lk21_summerolympics_wksh.pdf"
      },
      {
        "title": "Tarantula!",
        "audio": "/media/raz/K/Tarantula!.mp3"
      },
      {
        "title": "The Mind Game",
        "audio": "/media/raz/K/The Mind Game.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/The Mind Game/raz_lk09_themindgame_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/The Mind Game/raz_lk09_mindgame_wksh.pdf"
      },
      {
        "title": "The Squire's Bride",
        "audio": "/media/raz/K/The Squire's Bride.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/The Squire's Bride/raz_lk13_squiresbride_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/The Squire's Bride/raz_lk13_squiresbride_wksh.pdf"
      },
      {
        "title": "To the Circus",
        "audio": "/media/raz/K/To the Circus.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/To the Circus/raz_th05_tothecircus_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/To the Circus/raz_th05_tothecircus_wksh.pdf"
      },
      {
        "title": "To the Pumpkin Patch",
        "audio": "/media/raz/K/To the Pumpkin Patch.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/To the Pumpkin Patch/raz_th10_pumpkinpatch_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/To the Pumpkin Patch/raz_th10_pumpkinpatch_wksh.pdf"
      },
      {
        "title": "What Lives in This Hole",
        "audio": "/media/raz/K/What Lives in This Hole.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/What Lives in This Hole/raz_lk29_whatlivesinthathole_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/What Lives in This Hole/raz_lk29_whatlivesinthathole_wksh.pdf"
      },
      {
        "title": "Where We Get Energy",
        "audio": "/media/raz/K/Where We Get Energy.mp3",
        "pdf": "/media/RAZ 2000册/K 75/K 75/Where We Get Energy/raz_lk27_wheregetenergy_clr.pdf",
        "worksheet": "/media/RAZ 2000册/K 75/K 75/Where We Get Energy/raz_lk27_wheregetenergy_wksh.pdf"
      }
    ]
  },
  {
    "level": "L",
    "grade": "G3-4",
    "ar": "3.5-3.8",
    "desc": "三四年级过渡",
    "count": 49,
    "books": [
      {
        "title": "A Hero's Name",
        "audio": "/media/raz/L/A Hero's Name.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/A Hero's Name/raz_ll29_herosname_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/A Hero's Name/raz_ll29_herosname_wksh.pdf"
      },
      {
        "title": "Ancient Egypt",
        "audio": "/media/raz/L/Ancient Egypt.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Ancient Egypt/raz_ll11_ancientegypt_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Ancient Egypt/raz_ll11_ancientegypt_wksh.pdf"
      },
      {
        "title": "Anna and the Painted Eggs",
        "audio": "/media/raz/L/Anna and the Painted Eggs.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Anna and the Painted Eggs/raz_ll29_annaandpaintedeggs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Anna and the Painted Eggs/raz_ll29_annaandpaintedeggs_wksh.pdf"
      },
      {
        "title": "At Jacob's House",
        "audio": "/media/raz/L/At Jacob's House.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/At Jacob's House/raz_ll19_atjacobshouse_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/At Jacob's House/raz_ll19_atjacobshouse_wksh.pdf"
      },
      {
        "title": "Big Machines",
        "audio": "/media/raz/L/Big Machines.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Big Machines/raz_ll06_bigmachine_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Big Machines/raz_ll06_bigmachines_wksh.pdf"
      },
      {
        "title": "Bigger Than a Monster Truck",
        "audio": "/media/raz/L/Bigger Than a Monster Truck.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Bigger Than a Monster Truck/raz_ll30_biggerthanmonstertruck_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Bigger Than a Monster Truck/raz_ll30_biggerthanmonstertruck_wksh.pdf"
      },
      {
        "title": "Catching Santa",
        "audio": "/media/raz/L/Catching Santa.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Catching Santa/raz_th12_catchingsanta_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Catching Santa/raz_th12_catchingsanta_wksh.pdf"
      },
      {
        "title": "China",
        "audio": "/media/raz/L/China.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/China/raz_ll30_china_clr.pdf"
      },
      {
        "title": "Colonial Life",
        "audio": "/media/raz/L/Colonial Life.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Colonial Life/raz_ll09_coloniallife_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Colonial Life/raz_ll09_coloniallife_wksh.pdf"
      },
      {
        "title": "Crocs and Gators",
        "audio": "/media/raz/L/Crocs and Gators.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Crocs and Gators/raz_ll08_crocsandgators_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Crocs and Gators/raz_ll08_crocsgators_wksh.pdf"
      },
      {
        "title": "Deep in the Ocean",
        "audio": "/media/raz/L/Deep in the Ocean.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Deep in the Ocean/raz_ll20_deepintheocean_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Deep in the Ocean/raz_ll20_deepintheocean_wksh.pdf"
      },
      {
        "title": "Diabetes and Me",
        "audio": "/media/raz/L/Diabetes and Me.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Diabetes and Me/raz_ll30_diabetesandme_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Diabetes and Me/raz_ll30_diabetesandme_wksh.pdf"
      },
      {
        "title": "Eggy's Easy Out",
        "audio": "/media/raz/L/Eggy's Easy Out.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Eggy's Easy Out/raz_ll13_eggyseasyout_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Eggy's Easy Out/raz_ll13_eggyseasyout_wksh.pdf"
      },
      {
        "title": "Every Dog Has Its Day",
        "audio": "/media/raz/L/Every Dog Has Its Day.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Every Dog Has Its Day/raz_ll29_everydoghasitsday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Every Dog Has Its Day/raz_ll29_everydoghasitsday_wksh.pdf"
      },
      {
        "title": "Fantastic Flying Machines",
        "audio": "/media/raz/L/Fantastic Flying Machines.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Fantastic Flying Machines/raz_ll12_flyingmachine_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Fantastic Flying Machines/raz_ll12_flyingmac_wksh.pdf"
      },
      {
        "title": "George Washington Carver",
        "audio": "/media/raz/L/George Washington Carver.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/George Washington Carver/raz_ll29_georgewashingtoncarver_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/George Washington Carver/raz_ll29_georgewashingtoncarver_wksh.pdf"
      },
      {
        "title": "Goldilocks and the Other Three Bears",
        "audio": "/media/raz/L/Goldilocks and the Other Three Bears.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Goldilocks and the Other Three Bears/raz_ll29_goldilocksandotherthreebears_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Goldilocks and the Other Three Bears/raz_ll22_threebears_wksh.pdf"
      },
      {
        "title": "Goldilocks and the Three Bears",
        "audio": "/media/raz/L/Goldilocks and the Three Bears.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Goldilocks and the Three Bears/raz_ll26_goldilocksandthreebears_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Goldilocks and the Three Bears/raz_ll22_threebears_wksh.pdf"
      },
      {
        "title": "How Animals Sleep",
        "audio": "/media/raz/L/How Animals Sleep.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/How Animals Sleep/raz_lp36_howanimalssleep_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/How Animals Sleep/raz_lp36_howanimalssleep_wksh.pdf"
      },
      {
        "title": "How We Measure",
        "audio": "/media/raz/L/How We Measure.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/How We Measure/raz_ll18_howwemeasure_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/How We Measure/raz_ll18_howwemeasure_wksh.pdf"
      },
      {
        "title": "How to Make Ice Cream",
        "audio": "/media/raz/L/How to Make Ice Cream.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/How to Make Ice Cream/raz_ll24_howtoicecream_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/How to Make Ice Cream/raz_ll24_howtoicecream_wksh.pdf"
      },
      {
        "title": "I'm the Guest",
        "audio": "/media/raz/L/I'm the Guest.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/I'm the Guest/raz_ll29_imguest_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/I'm the Guest/raz_ll29_imguest_wksh.pdf"
      },
      {
        "title": "Independence Day",
        "audio": "/media/raz/L/Independence Day.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Independence Day/raz_th07_independenceday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Independence Day/raz_th07_independence_wksh.pdf"
      },
      {
        "title": "Insect Life Cycle",
        "audio": "/media/raz/L/Insect Life Cycle.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Insect Life Cycle/raz_ll26_insectlifecycle_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Insect Life Cycle/raz_ll04_lifecycles_wksh.pdf"
      },
      {
        "title": "Introducing Planet Earth",
        "audio": "/media/raz/L/Introducing Planet Earth.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Introducing Planet Earth/raz_ll29_introducingplanetearth_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Introducing Planet Earth/raz_ll15_introduceearth_wksh.pdf"
      },
      {
        "title": "Jane Goodall",
        "audio": "/media/raz/L/Jane Goodall.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Jane Goodall/raz_ll29_janegoodall_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Jane Goodall/raz_ll29_janegoodall_wksh.pdf"
      },
      {
        "title": "Jessica Loves Soccer",
        "audio": "/media/raz/L/Jessica Loves Soccer.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Jessica Loves Soccer/raz_ll05_jessicasoccer_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Jessica Loves Soccer/raz_ll05_jessicasoccer_wksh.pdf"
      },
      {
        "title": "Joey's Stop Sign",
        "audio": "/media/raz/L/Joey's Stop Sign.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Joey's Stop Sign/raz_ll29_joeysstopsign_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Joey's Stop Sign/raz_ll29_joeysstopsign_wksh.pdf"
      },
      {
        "title": "Kenya",
        "audio": "/media/raz/L/Kenya.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Kenya/raz_ll30_kenya_clr.pdf"
      },
      {
        "title": "Maria's Family Christmas",
        "audio": "/media/raz/L/Maria's Family Christmas.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Maria's Family Christmas/raz_ll27_mariasfamilychristmas_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Maria's Family Christmas/raz_ll27_mariasfamilychristmas_wksh.pdf"
      },
      {
        "title": "Noise in the Night",
        "audio": "/media/raz/L/Noise in the Night.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Noise in the Night/raz_ll03_noise_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Noise in the Night/raz_ll03_noisenight_wksh.pdf"
      },
      {
        "title": "Oil- A Messy Resource",
        "audio": "/media/raz/L/Oil- A Messy Resource.mp3"
      },
      {
        "title": "Owls Overhead",
        "audio": "/media/raz/L/Owls Overhead.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Owls Overhead/raz_ll30_owlsoverhead_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Owls Overhead/raz_ll30_owlsoverhead_wksh.pdf"
      },
      {
        "title": "Plant Defenses",
        "audio": "/media/raz/L/Plant Defenses.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Plant Defenses/raz_ll30_plantdefenses_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Plant Defenses/raz_ll30_plantdefenses_wksh.pdf"
      },
      {
        "title": "Roadside Oddities",
        "audio": "/media/raz/L/Roadside Oddities.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Roadside Oddities/raz_ll30_roadsideoddities_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Roadside Oddities/raz_ll30_roadsideoddities_wksh.pdf"
      },
      {
        "title": "Sending Messages",
        "audio": "/media/raz/L/Sending Messages.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Sending Messages/raz_ll10_sendmessages_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Sending Messages/raz_ll10_sendmessage_wksh.pdf"
      },
      {
        "title": "Shoes Around the World",
        "audio": "/media/raz/L/Shoes Around the World.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Shoes Around the World/raz_ll29_shoesaroundworld_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Shoes Around the World/raz_ll26_shoesaroundworld_wksh.pdf"
      },
      {
        "title": "Sign Language and Hand Talk",
        "audio": "/media/raz/L/Sign Language and Hand Talk.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Sign Language and Hand Talk/raz_ll26_signlanguageandhandtalk_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Sign Language and Hand Talk/raz_ll14_signlanguage_wksh.pdf"
      },
      {
        "title": "Smelly Clyde",
        "audio": "/media/raz/L/Smelly Clyde.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Smelly Clyde/raz_ll02_smellyclyde_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Smelly Clyde/raz_ll02_smellyclyde_wksh.pdf"
      },
      {
        "title": "The 100th Day Project",
        "audio": "/media/raz/L/The 100th Day Project.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/The 100th Day Project/raz_ll25_100thday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/The 100th Day Project/raz_ll25_100thday_wksh.pdf"
      },
      {
        "title": "The Igloo",
        "audio": "/media/raz/L/The Igloo.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/The Igloo/raz_th01_theigloo_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/The Igloo/raz_th01_theigloo_wksh.pdf"
      },
      {
        "title": "The Power of Magnets",
        "audio": "/media/raz/L/The Power of Magnets.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/The Power of Magnets/raz_ll29_powerofmagnets_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/The Power of Magnets/raz_ll29_powerofmagnets_wksh.pdf"
      },
      {
        "title": "The Tinosaur",
        "audio": "/media/raz/L/The Tinosaur.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/The Tinosaur/raz_ll07_tinosaur_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/The Tinosaur/raz_ll07_tinosaur_wksh.pdf"
      },
      {
        "title": "Two Thanksgivings",
        "audio": "/media/raz/L/Two Thanksgivings.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Two Thanksgivings/raz_ll29_twothanksgivings_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Two Thanksgivings/raz_ll29_twothanksgivings_wksh.pdf"
      },
      {
        "title": "Valentine's Day",
        "audio": "/media/raz/L/Valentine's Day.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Valentine's Day/raz_th02_valentinesday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Valentine's Day/raz_th02_valentinesday_wksh.pdf"
      },
      {
        "title": "Vampire Dentist",
        "audio": "/media/raz/L/Vampire Dentist.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Vampire Dentist/raz_ll29_vampiredentist_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Vampire Dentist/raz_ll29_vampiredentist_wksh.pdf"
      },
      {
        "title": "Wonderful Winter",
        "audio": "/media/raz/L/Wonderful Winter.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Wonderful Winter/raz_ll21_wonderfulwinter_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Wonderful Winter/raz_ll21_wonderwinter_wksh.pdf"
      },
      {
        "title": "Woods of Wonder",
        "audio": "/media/raz/L/Woods of Wonder.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/Woods of Wonder/raz_ll30_woodsofwonder_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/Woods of Wonder/raz_ll30_woodsofwonder_wksh.pdf"
      },
      {
        "title": "World Holidays",
        "audio": "/media/raz/L/World Holidays.mp3",
        "pdf": "/media/RAZ 2000册/L 78+4/L 78+4/World Holidays/raz_ll16_worldholidays_clr.pdf",
        "worksheet": "/media/RAZ 2000册/L 78+4/L 78+4/World Holidays/raz_ll16_worldholiday_wksh.pdf"
      }
    ]
  },
  {
    "level": "M",
    "grade": "G4",
    "ar": "3.8-4.1",
    "desc": "四年级",
    "count": 48,
    "books": [
      {
        "title": "A Man of Vision",
        "audio": "/media/raz/M/A Man of Vision.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/A Man of Vision/raz_lm18_manofvision_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/A Man of Vision/raz_lm18_manofvision_wksh.pdf"
      },
      {
        "title": "A Prairie Dog's Life",
        "audio": "/media/raz/M/A Prairie Dog's Life.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/A Prairie Dog's Life/raz_lm13_prairiedogs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/A Prairie Dog's Life/raz_lm13_prairiedogs_wksh.pdf"
      },
      {
        "title": "Aesop's Fables",
        "audio": "/media/raz/M/Aesop's Fables.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Aesop's Fables/raz_lm09_aesopsfables_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Aesop's Fables/raz_lm09_aesop_wksh.pdf"
      },
      {
        "title": "Art Around Us",
        "audio": "/media/raz/M/Art Around Us.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Art Around Us/raz_lm27_artaroundus_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Art Around Us/raz_lm05_artaroundus_wksh.pdf"
      },
      {
        "title": "Arthur's Bad News Day",
        "audio": "/media/raz/M/Arthur's Bad News Day.mp3"
      },
      {
        "title": "Brad Needs a Budget",
        "audio": "/media/raz/M/Brad Needs a Budget.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Brad Needs a Budget/raz_lm27_bradneedsbudget_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Brad Needs a Budget/raz_lm27_bradneedsbudget_wksh.pdf"
      },
      {
        "title": "Can I Vote",
        "audio": "/media/raz/M/Can I Vote.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Can I Vote/raz_lm27_canivote_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Can I Vote/raz_lm27_canivote_wksh.pdf"
      },
      {
        "title": "Dogs at Work",
        "audio": "/media/raz/M/Dogs at Work.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Dogs at Work/raz_lm06_dogsatwork_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Dogs at Work/raz_lm06_dogsatwork_wksh.pdf"
      },
      {
        "title": "Endangered Birds",
        "audio": "/media/raz/M/Endangered Birds.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Endangered Birds/raz_lm12_endangeredbirds_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Endangered Birds/raz_lm12_endangered_wksh.pdf"
      },
      {
        "title": "Firefighters",
        "audio": "/media/raz/M/Firefighters.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Firefighters/raz_lm23_firefighters_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Firefighters/raz_lm23_firefighters_wksh.pdf"
      },
      {
        "title": "Frogs and Toads",
        "audio": "/media/raz/M/Frogs and Toads.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Frogs and Toads/raz_lm19_frogsandtoads_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Frogs and Toads/raz_lm19_frogsandtoads_wksh.pdf"
      },
      {
        "title": "Giant's Tale",
        "audio": "/media/raz/M/Giant's Tale.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Giant's Tale/raz_lm26_giantstale_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Giant's Tale/raz_lm26_giantstale_wksh.pdf"
      },
      {
        "title": "Hermit Crabs",
        "audio": "/media/raz/M/Hermit Crabs.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Hermit Crabs/raz_lm26_hermitcrabs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Hermit Crabs/raz_lm26_hermitcrabs_wksh.pdf"
      },
      {
        "title": "Hibernation",
        "audio": "/media/raz/M/Hibernation.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Hibernation/raz_lm27_hibernation_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Hibernation/raz_lm22_hibernation_wksh.pdf"
      },
      {
        "title": "History of the Bicycle",
        "audio": "/media/raz/M/History of the Bicycle.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/History of the Bicycle/raz_lm27_historyofbicycle_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/History of the Bicycle/raz_lm27_historyofbicycle_wksh.pdf"
      },
      {
        "title": "How Much Is a Trillion",
        "audio": "/media/raz/M/How Much Is a Trillion.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/How Much Is a Trillion/raz_lm27_howmuchistrillion_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/How Much Is a Trillion/raz_lm24_howmuchistrillion_wksh.pdf"
      },
      {
        "title": "How to Make Lemonade",
        "audio": "/media/raz/M/How to Make Lemonade.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/How to Make Lemonade/raz_lm27_howtomakelemonade_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/How to Make Lemonade/raz_lm25_howtolemonade_wksh.pdf"
      },
      {
        "title": "Ichiro Suzuki",
        "audio": "/media/raz/M/Ichiro Suzuki.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Ichiro Suzuki/raz_lm27_ichirosuzuki_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Ichiro Suzuki/raz_lm27_ichirosuzuki_wksh.pdf"
      },
      {
        "title": "Inside Your Body",
        "audio": "/media/raz/M/Inside Your Body.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Inside Your Body/raz_lm07_insidebody_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Inside Your Body/raz_lm07_insidebody_wksh.pdf"
      },
      {
        "title": "Jack's Tale",
        "audio": "/media/raz/M/Jack's Tale.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Jack's Tale/raz_lm26_jackstale_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Jack's Tale/raz_lm26_jackstale_wksh.pdf"
      },
      {
        "title": "Keb Needs a Home",
        "audio": "/media/raz/M/Keb Needs a Home.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Keb Needs a Home/raz_lm03_keb_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Keb Needs a Home/raz_lm03_kebneeds_wksh.pdf"
      },
      {
        "title": "Marcus Loses Patches",
        "audio": "/media/raz/M/Marcus Loses Patches.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Marcus Loses Patches/raz_lm27_marcuslosespatches_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Marcus Loses Patches/raz_lm15_marcusloses_wksh.pdf"
      },
      {
        "title": "Martin Luther King Jr.",
        "audio": "/media/raz/M/Martin Luther King Jr..mp3"
      },
      {
        "title": "Mighty Glaciers",
        "audio": "/media/raz/M/Mighty Glaciers.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Mighty Glaciers/raz_lm27_mightyglaciers_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Mighty Glaciers/raz_lm11_glaciers_wksh.pdf"
      },
      {
        "title": "Mother Teresa- Mother to Many",
        "audio": "/media/raz/M/Mother Teresa- Mother to Many.mp3"
      },
      {
        "title": "My Uncle Is a Firefighter",
        "audio": "/media/raz/M/My Uncle Is a Firefighter.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/My Uncle Is a Firefighter/raz_lm27_myuncleisfirefighter_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/My Uncle Is a Firefighter/raz_lm27_myuncleisfirefighter_wksh.pdf"
      },
      {
        "title": "Parrots",
        "audio": "/media/raz/M/Parrots.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Parrots/raz_lm27_parrots_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Parrots/raz_lm27_parrots_wksh.pdf"
      },
      {
        "title": "Sharks",
        "audio": "/media/raz/M/Sharks.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Sharks/raz_lm24_sharks.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Sharks/raz_lm24_sharks_wksh.pdf"
      },
      {
        "title": "Snow Camping",
        "audio": "/media/raz/M/Snow Camping.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Snow Camping/raz_lm27_snowcamping_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Snow Camping/raz_lm17_snowcamping_wksh.pdf"
      },
      {
        "title": "Sound All Around",
        "audio": "/media/raz/M/Sound All Around.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Sound All Around/raz_lm16_soundallaround_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Sound All Around/raz_lm16_soundaround_wksh.pdf"
      },
      {
        "title": "Story of the Sun",
        "audio": "/media/raz/M/Story of the Sun.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Story of the Sun/raz_lm24_storyofsun_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Story of the Sun/raz_lm02_storysun_wksh.pdf"
      },
      {
        "title": "The Best Guess",
        "audio": "/media/raz/M/The Best Guess.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/The Best Guess/raz_lm14_thebestguess_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/The Best Guess/raz_lm14_thebestguess_wksh.pdf"
      },
      {
        "title": "The Creature Constitution",
        "audio": "/media/raz/M/The Creature Constitution.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/The Creature Constitution/raz_lm27_creatureconstitution_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/The Creature Constitution/raz_lm27_creatureconstitution_wksh.pdf"
      },
      {
        "title": "The Day Before Thanksgiving",
        "audio": "/media/raz/M/The Day Before Thanksgiving.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/The Day Before Thanksgiving/raz_th11_thanksgiving_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/The Day Before Thanksgiving/raz_th11_thanksgiving_wksh.pdf"
      },
      {
        "title": "The Hoppers Start School",
        "audio": "/media/raz/M/The Hoppers Start School.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/The Hoppers Start School/raz_th09_startschool_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/The Hoppers Start School/raz_th09_startschool_wksh.pdf"
      },
      {
        "title": "The Legend of John Henry",
        "audio": "/media/raz/M/The Legend of John Henry.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/The Legend of John Henry/raz_lm26_legendofjohnhenry_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/The Legend of John Henry/raz_lm26_legendofjohnhenry_wksh.pdf"
      },
      {
        "title": "The Sleeping Dog",
        "audio": "/media/raz/M/The Sleeping Dog.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/The Sleeping Dog/raz_lm08_sleepingdog_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/The Sleeping Dog/raz_lm08_sleepdog_wksh.pdf"
      },
      {
        "title": "The Sometimes Friend",
        "audio": "/media/raz/M/The Sometimes Friend.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/The Sometimes Friend/raz_lm26_sometimesfriend_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/The Sometimes Friend/raz_lm26_sometimesfriend_wksh.pdf"
      },
      {
        "title": "The Story of Jeans",
        "audio": "/media/raz/M/The Story of Jeans.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/The Story of Jeans/raz_lm10_storyofjeans_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/The Story of Jeans/raz_lm10_jeans_wksh.pdf"
      },
      {
        "title": "The Story of the Statue",
        "audio": "/media/raz/M/The Story of the Statue.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/The Story of the Statue/raz_lm26_storyofstatue_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/The Story of the Statue/raz_lm26_storyofstatue_wksh.pdf"
      },
      {
        "title": "The Three Little Pigs",
        "audio": "/media/raz/M/The Three Little Pigs.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/The Three Little Pigs/raz_lm24_threelittlepigs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/The Three Little Pigs/raz_lm20_threelittlepigs_wksh.pdf"
      },
      {
        "title": "The Umbrella Trick",
        "audio": "/media/raz/M/The Umbrella Trick.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/The Umbrella Trick/raz_th04_umbrellatrick_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/The Umbrella Trick/raz_th04_umbrella_wksh.pdf"
      },
      {
        "title": "Vacation Time!",
        "audio": "/media/raz/M/Vacation Time!.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Vacation Time!/raz_th06_vacationtime_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Vacation Time!/raz_th06_vacationtime_wksh.pdf"
      },
      {
        "title": "Voyagers in Space",
        "audio": "/media/raz/M/Voyagers in Space.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Voyagers in Space/raz_lm27_voyagersinspace_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Voyagers in Space/raz_lm27_voyagersinspace_wksh.pdf"
      },
      {
        "title": "Why Do Leaves Change Color",
        "audio": "/media/raz/M/Why Do Leaves Change Color.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Why Do Leaves Change Color/raz_lm27_whydoleaveschangecolor_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Why Do Leaves Change Color/raz_lm27_whydoleaveschangecolor_wksh.pdf"
      },
      {
        "title": "Wiggly Worms",
        "audio": "/media/raz/M/Wiggly Worms.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Wiggly Worms/raz_lm27_wigglyworms_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Wiggly Worms/raz_lm27_wigglyworms_wksh.pdf"
      },
      {
        "title": "Wild Horses",
        "audio": "/media/raz/M/Wild Horses.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/Wild Horses/raz_lm27_wildhorses_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/Wild Horses/raz_lm27_wildhorses_wksh.pdf"
      },
      {
        "title": "You Stink!",
        "audio": "/media/raz/M/You Stink!.mp3",
        "pdf": "/media/RAZ 2000册/M 75+4/M/You Stink!/raz_lm21_youstink_clr.pdf",
        "worksheet": "/media/RAZ 2000册/M 75+4/M/You Stink!/raz_lm21_youstink_wksh.pdf"
      }
    ]
  },
  {
    "level": "O",
    "grade": "G4-5",
    "ar": "4.4-4.7",
    "desc": "四五年级过渡",
    "count": 49,
    "books": [
      {
        "title": "A Dog's Tale",
        "audio": "/media/raz/O/A Dog's Tale.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/A Dog's Tale/raz_lo18_adogstale_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/A Dog's Tale/raz_lo18_adogstale_wksh.pdf"
      },
      {
        "title": "All About Chocolate",
        "audio": "/media/raz/O/All About Chocolate.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/All About Chocolate/raz_lo22_chocolate_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/All About Chocolate/raz_lo22_chocolate_wksh.pdf"
      },
      {
        "title": "Anansi and the Talking Watermelon",
        "audio": "/media/raz/O/Anansi and the Talking Watermelon.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Anansi and the Talking Watermelon/raz_lo13_anansiwtrmelon_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Anansi and the Talking Watermelon/raz_lo13_anansimelon_wksh.pdf"
      },
      {
        "title": "Animal Discoveries",
        "audio": "/media/raz/O/Animal Discoveries.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Animal Discoveries/raz_lo25_animaldiscoveries_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Animal Discoveries/raz_lo25_animaldiscoveries_wksh.pdf"
      },
      {
        "title": "Annie Oakley",
        "audio": "/media/raz/O/Annie Oakley.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Annie Oakley/raz_lo25_annieoakley_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Annie Oakley/raz_lo25_annieoakley_wksh.pdf"
      },
      {
        "title": "Baltic Rescue",
        "audio": "/media/raz/O/Baltic Rescue.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Baltic Rescue/raz_lo24_balticrescue_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Baltic Rescue/raz_lo24_balticrescue_wksh.pdf"
      },
      {
        "title": "Barack Obama",
        "audio": "/media/raz/O/Barack Obama.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Barack Obama/raz_lo24_barackobama_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Barack Obama/raz_lo23_barackobama_wksh.pdf"
      },
      {
        "title": "Bats",
        "audio": "/media/raz/O/Bats.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Bats/raz_lo24_bats_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Bats/raz_lo08_bats_wksh.pdf"
      },
      {
        "title": "Bigger Than a Monster Truck",
        "audio": "/media/raz/O/Bigger Than a Monster Truck.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Bigger Than a Monster Truck/raz_lo25_biggerthanmonstertruck_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Bigger Than a Monster Truck/raz_lo25_biggerthanmonstertruck_wksh.pdf"
      },
      {
        "title": "Edible Bugs",
        "audio": "/media/raz/O/Edible Bugs.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Edible Bugs/raz_lo25_ediblebugs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Edible Bugs/raz_lo25_ediblebugs_wksh.pdf"
      },
      {
        "title": "George Washington Carver",
        "audio": "/media/raz/O/George Washington Carver.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/George Washington Carver/raz_lo25_georgewashingtoncarver_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/George Washington Carver/raz_lo25_georgewashingtoncarver_wksh.pdf"
      },
      {
        "title": "Giant Pumpkins",
        "audio": "/media/raz/O/Giant Pumpkins.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Giant Pumpkins/raz_lo25_giantpumpkins_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Giant Pumpkins/raz_lo25_giantpumpkins_wksh.pdf"
      },
      {
        "title": "HeroRATs- Rats Who Save Lives",
        "audio": "/media/raz/O/HeroRATs- Rats Who Save Lives.mp3"
      },
      {
        "title": "Irma's Sandwich Shop",
        "audio": "/media/raz/O/Irma's Sandwich Shop.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Irma's Sandwich Shop/raz_lo07_irmas_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Irma's Sandwich Shop/raz_lo07_irmas_wksh.pdf"
      },
      {
        "title": "Jane Goodall",
        "audio": "/media/raz/O/Jane Goodall.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Jane Goodall/raz_lo25_janegoodall_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Jane Goodall/raz_lo25_janegoodall_wksh.pdf"
      },
      {
        "title": "Jenny Loves Yoga",
        "audio": "/media/raz/O/Jenny Loves Yoga.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Jenny Loves Yoga/raz_lo04_jennyyoga_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Jenny Loves Yoga/raz_lo04_jennyyoga_wksh.pdf"
      },
      {
        "title": "Johnny Appleseed Heads West",
        "audio": "/media/raz/O/Johnny Appleseed Heads West.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Johnny Appleseed Heads West/raz_lo23_johnnyappleseedheadswest_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Johnny Appleseed Heads West/raz_lo23_johnnyappleseedheadswest_wksh.pdf"
      },
      {
        "title": "Katie's Forest Finds",
        "audio": "/media/raz/O/Katie's Forest Finds.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Katie's Forest Finds/raz_lo15_katiesforest_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Katie's Forest Finds/raz_lo15_katiesforest_wksh.pdf"
      },
      {
        "title": "Li's Tangram Animals",
        "audio": "/media/raz/O/Li's Tangram Animals.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Li's Tangram Animals/raz_lo16_listangram_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Li's Tangram Animals/raz_lo16_listangram_wksh.pdf"
      },
      {
        "title": "Little Red's Secret Sauce",
        "audio": "/media/raz/O/Little Red's Secret Sauce.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Little Red's Secret Sauce/raz_lo24_littleredssecretsauce_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Little Red's Secret Sauce/raz_lo24_littleredssecretsauce_wksh.pdf"
      },
      {
        "title": "Looking for Bigfoot",
        "audio": "/media/raz/O/Looking for Bigfoot.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Looking for Bigfoot/raz_lo25_lookingbigfoot_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Looking for Bigfoot/raz_lo25_lookingbigfoot_wksh.pdf"
      },
      {
        "title": "Makusani's Lesson",
        "audio": "/media/raz/O/Makusani's Lesson.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Makusani's Lesson/raz_lo06_makusani_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Makusani's Lesson/raz_lo06_makusani_wksh.pdf"
      },
      {
        "title": "Meeting Father in Plymouth",
        "audio": "/media/raz/O/Meeting Father in Plymouth.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Meeting Father in Plymouth/raz_lo23_meetingfatherinplymouth_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Meeting Father in Plymouth/raz_lo23_meetingfatherinplymouth_wksh.pdf"
      },
      {
        "title": "Off to Join the Circus",
        "audio": "/media/raz/O/Off to Join the Circus.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Off to Join the Circus/raz_lo25_offtojoincircus_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Off to Join the Circus/raz_lo25_offtojoincircus_wksh.pdf"
      },
      {
        "title": "Owls Overhead",
        "audio": "/media/raz/O/Owls Overhead.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Owls Overhead/raz_lo25_owlsoverhead_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Owls Overhead/raz_lo25_owlsoverhead_wksh.pdf"
      },
      {
        "title": "Park Rangers",
        "audio": "/media/raz/O/Park Rangers.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Park Rangers/raz_lo25_parkrangers_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Park Rangers/raz_lo25_parkrangers_wksh.pdf"
      },
      {
        "title": "Paul Bunyan and Babe the Blue Ox",
        "audio": "/media/raz/O/Paul Bunyan and Babe the Blue Ox.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Paul Bunyan and Babe the Blue Ox/raz_lo24_paulbunyanandbabeblueox_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Paul Bunyan and Babe the Blue Ox/raz_lo24_paulbunyanandbabeblueox_wksh.pdf"
      },
      {
        "title": "Pecos Bill Rides a Tornado",
        "audio": "/media/raz/O/Pecos Bill Rides a Tornado.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Pecos Bill Rides a Tornado/raz_lo24_pecosbillridestornado_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Pecos Bill Rides a Tornado/raz_lo24_pecosbillridestornado_wksh.pdf"
      },
      {
        "title": "Pepper- The King of Spices",
        "audio": "/media/raz/O/Pepper- The King of Spices.mp3"
      },
      {
        "title": "Pluto's New Friends",
        "audio": "/media/raz/O/Pluto's New Friends.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Pluto's New Friends/raz_lo24_plutosnewfriends_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Pluto's New Friends/raz_lo24_plutosnewfriends_wksh.pdf"
      },
      {
        "title": "Rainy-Day Savings",
        "audio": "/media/raz/O/Rainy-Day Savings.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Rainy-Day Savings/raz_lo23_rainydaysavings_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Rainy-Day Savings/raz_lo23_rainydaysavings_wksh.pdf"
      },
      {
        "title": "Roadside Oddities",
        "audio": "/media/raz/O/Roadside Oddities.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Roadside Oddities/raz_lo25_roadsideoddities_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Roadside Oddities/raz_lo25_roadsideoddities_wksh.pdf"
      },
      {
        "title": "Sally Ride",
        "audio": "/media/raz/O/Sally Ride.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Sally Ride/raz_lo24_sallyride_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Sally Ride/raz_lo03_sallyride_wksh.pdf"
      },
      {
        "title": "Salt Rocks!",
        "audio": "/media/raz/O/Salt Rocks!.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Salt Rocks!/raz_lo20_saltrocks_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Salt Rocks!/raz_lo20_saltrocks_wksh.pdf"
      },
      {
        "title": "Saving the Last Wild Tigers",
        "audio": "/media/raz/O/Saving the Last Wild Tigers.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Saving the Last Wild Tigers/raz_lo25_savinglastwildtigers_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Saving the Last Wild Tigers/raz_lo25_savinglastwildtigers_wksh.pdf"
      },
      {
        "title": "Scotty's Spring Training",
        "audio": "/media/raz/O/Scotty's Spring Training.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Scotty's Spring Training/raz_lo25_scottysspringtraining_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Scotty's Spring Training/raz_lo25_scottysspringtraining_wksh.pdf"
      },
      {
        "title": "Spider Monkey's Question",
        "audio": "/media/raz/O/Spider Monkey's Question.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Spider Monkey's Question/raz_lo09_spidermonkey_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Spider Monkey's Question/raz_lo09_spidermonkey_wksh.pdf"
      },
      {
        "title": "Summer Olympics Legends",
        "audio": "/media/raz/O/Summer Olympics Legends.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Summer Olympics Legends/raz_lo11_olymlegends_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Summer Olympics Legends/raz_lo11_olymlegends_wksh.pdf"
      },
      {
        "title": "The Backpack Tax",
        "audio": "/media/raz/O/The Backpack Tax.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/The Backpack Tax/raz_lo25_backpacktax_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/The Backpack Tax/raz_lo25_backpacktax_wksh.pdf"
      },
      {
        "title": "The Beekeeper",
        "audio": "/media/raz/O/The Beekeeper.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/The Beekeeper/raz_lo25_beekeeper_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/The Beekeeper/raz_lo10_beekeeper_wksh.pdf"
      },
      {
        "title": "The Great Land Run",
        "audio": "/media/raz/O/The Great Land Run.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/The Great Land Run/raz_lo25_greatlandrun_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/The Great Land Run/raz_lo25_greatlandrun_wksh.pdf"
      },
      {
        "title": "The Magic of Migration",
        "audio": "/media/raz/O/The Magic of Migration.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/The Magic of Migration/raz_lo12_magicmigration_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/The Magic of Migration/raz_lo12_magicmigration_wksh.pdf"
      },
      {
        "title": "The Shadow People",
        "audio": "/media/raz/O/The Shadow People.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/The Shadow People/raz_lo17_shadowpeople_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/The Shadow People/raz_lo17_shadowpeople_wksh.pdf"
      },
      {
        "title": "Three Little Pigs- The Wolf's Story",
        "audio": "/media/raz/O/Three Little Pigs- The Wolf's Story.mp3"
      },
      {
        "title": "Troika- Canine Superhero",
        "audio": "/media/raz/O/Troika- Canine Superhero.mp3"
      },
      {
        "title": "Whales",
        "audio": "/media/raz/O/Whales.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Whales/raz_lo02_whales_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Whales/raz_lo02_whales_wksh.pdf"
      },
      {
        "title": "Wonders of Nature",
        "audio": "/media/raz/O/Wonders of Nature.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Wonders of Nature/raz_lo24_wondersofnature_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Wonders of Nature/raz_lo24_wondersofnature_wksh.pdf"
      },
      {
        "title": "Woods of Wonder",
        "audio": "/media/raz/O/Woods of Wonder.mp3",
        "pdf": "/media/RAZ 2000册/O 78+4/O 78+4/Woods of Wonder/raz_lo25_woodsofwonder_clr.pdf",
        "worksheet": "/media/RAZ 2000册/O 78+4/O 78+4/Woods of Wonder/raz_lo25_woodsofwonder_wksh.pdf"
      },
      {
        "title": "You're a Jellyfish!",
        "audio": "/media/raz/O/You're a Jellyfish!.mp3"
      }
    ]
  },
  {
    "level": "P",
    "grade": "G5",
    "ar": "4.7-5.0",
    "desc": "五年级",
    "count": 48,
    "books": [
      {
        "title": "A Golden Tragedy",
        "audio": "/media/raz/P/A Golden Tragedy.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/A Golden Tragedy/raz_lp37_goldentragedy_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/A Golden Tragedy/raz_lp12_goldentragedy_wksh.pdf"
      },
      {
        "title": "A Late Night Chat with a Parakeet",
        "audio": "/media/raz/P/A Late Night Chat with a Parakeet.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/A Late Night Chat with a Parakeet/raz_lp37_latenightchatwithparakeet_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/A Late Night Chat with a Parakeet/raz_lp02_parakeet_wksh.pdf"
      },
      {
        "title": "A Nation on Wheels",
        "audio": "/media/raz/P/A Nation on Wheels.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/A Nation on Wheels/raz_lp23_nationonwheels_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/A Nation on Wheels/raz_lp23_nationonwheels_wksh.pdf"
      },
      {
        "title": "About Trees",
        "audio": "/media/raz/P/About Trees.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/About Trees/raz_lp17_abouttrees_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/About Trees/raz_lp17_abouttrees_wksh.pdf"
      },
      {
        "title": "Acropolis Adventure",
        "audio": "/media/raz/P/Acropolis Adventure.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Acropolis Adventure/raz_lp31_acropolisadv_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Acropolis Adventure/raz_lp31_acropolisadv_wksh.pdf"
      },
      {
        "title": "Alia and the Furniture Troll",
        "audio": "/media/raz/P/Alia and the Furniture Troll.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Alia and the Furniture Troll/raz_lp37_aliaandfurnituretroll_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Alia and the Furniture Troll/raz_lp37_aliaandfurnituretroll_wksh.pdf"
      },
      {
        "title": "Art Around Us",
        "audio": "/media/raz/P/Art Around Us.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Art Around Us/raz_lp37_artaroundus_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Art Around Us/raz_lp30_artaroundus_wksh.pdf"
      },
      {
        "title": "Becky's Puzzle Problem",
        "audio": "/media/raz/P/Becky's Puzzle Problem.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Becky's Puzzle Problem/raz_lp21_beckyspuzzle_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Becky's Puzzle Problem/raz_lp21_beckyspuzzle_wksh.pdf"
      },
      {
        "title": "Breeds of Dogs",
        "audio": "/media/raz/P/Breeds of Dogs.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Breeds of Dogs/raz_lp36_breedsofdogs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Breeds of Dogs/raz_lp36_breedsofdogs_wksh.pdf"
      },
      {
        "title": "Coyote and the Star",
        "audio": "/media/raz/P/Coyote and the Star.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Coyote and the Star/raz_lp35_coyoteandstar_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Coyote and the Star/raz_lp04_coyotestar_wksh.pdf"
      },
      {
        "title": "Daniel Boone",
        "audio": "/media/raz/P/Daniel Boone.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Daniel Boone/raz_lp10_danielboone_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Daniel Boone/raz_lp10_danielboone_wksh.pdf"
      },
      {
        "title": "Deep Inside a Copper Mine",
        "audio": "/media/raz/P/Deep Inside a Copper Mine.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Deep Inside a Copper Mine/raz_lp20_deepincopper_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Deep Inside a Copper Mine/raz_lp20_deepincopper_wksh.pdf"
      },
      {
        "title": "Desert People",
        "audio": "/media/raz/P/Desert People.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Desert People/raz_lp37_desertpeople_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Desert People/raz_lp36_desertpeople_wksh.pdf"
      },
      {
        "title": "Dictionary Dave",
        "audio": "/media/raz/P/Dictionary Dave.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Dictionary Dave/raz_lp37_dictionarydave_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Dictionary Dave/raz_lp37_dictionarydave_wksh.pdf"
      },
      {
        "title": "Dogs at Work",
        "audio": "/media/raz/P/Dogs at Work.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Dogs at Work/raz_lp29_dogsatwork_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Dogs at Work/raz_lp29_dogsatwork_wksh.pdf"
      },
      {
        "title": "Fantastic Flying Machines",
        "audio": "/media/raz/P/Fantastic Flying Machines.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Fantastic Flying Machines/raz_lp33_flyingmachines_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Fantastic Flying Machines/raz_lp33_flyingmac_wksh.pdf"
      },
      {
        "title": "Friends Around the World",
        "audio": "/media/raz/P/Friends Around the World.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Friends Around the World/raz_lp34_friendsaround_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Friends Around the World/raz_lp34_friendsaround_wksh.pdf"
      },
      {
        "title": "Giant Pandas",
        "audio": "/media/raz/P/Giant Pandas.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Giant Pandas/raz_lp26_giantpandas_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Giant Pandas/raz_lp26_giantpandas_wksh.pdf"
      },
      {
        "title": "Goldilocks and the Other Three Bears",
        "audio": "/media/raz/P/Goldilocks and the Other Three Bears.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Goldilocks and the Other Three Bears/raz_lp28_otherthreebears_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Goldilocks and the Other Three Bears/raz_lp27_threebears_wksh.pdf"
      },
      {
        "title": "Goldilocks and the Three Bears",
        "audio": "/media/raz/P/Goldilocks and the Three Bears.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Goldilocks and the Three Bears/raz_lp27_threebears_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Goldilocks and the Three Bears/raz_lp27_threebears_wksh.pdf"
      },
      {
        "title": "Guardian Dogs- Penguin Protectors",
        "audio": "/media/raz/P/Guardian Dogs- Penguin Protectors.mp3"
      },
      {
        "title": "Helen Keller",
        "audio": "/media/raz/P/Helen Keller.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Helen Keller/raz_lp14_helenkeller_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Helen Keller/raz_lp14_helenkeller_wksh.pdf"
      },
      {
        "title": "History to Chew On",
        "audio": "/media/raz/P/History to Chew On.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/History to Chew On/raz_lp19_historytochew_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/History to Chew On/raz_lp19_historytochew_wksh.pdf"
      },
      {
        "title": "I Am the Hope Diamond",
        "audio": "/media/raz/P/I Am the Hope Diamond.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/I Am the Hope Diamond/raz_lp18_hopediamond_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/I Am the Hope Diamond/raz_lp18_hopediamond_wksh.pdf"
      },
      {
        "title": "Ichiro Suzuki",
        "audio": "/media/raz/P/Ichiro Suzuki.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Ichiro Suzuki/raz_lp37_ichirosuzuki_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Ichiro Suzuki/raz_lp37_ichirosuzuki_wksh.pdf"
      },
      {
        "title": "Inside the Beast",
        "audio": "/media/raz/P/Inside the Beast.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Inside the Beast/raz_lp22_insidebeast_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Inside the Beast/raz_lp22_insidebeast_wksh.pdf"
      },
      {
        "title": "Landon's Pumpkins",
        "audio": "/media/raz/P/Landon's Pumpkins.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Landon's Pumpkins/raz_lp13_landonspumpkins_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Landon's Pumpkins/raz_lp13_landonspkins_wksh.pdf"
      },
      {
        "title": "Magnetism",
        "audio": "/media/raz/P/Magnetism.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Magnetism/raz_lp06_magnetism_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Magnetism/raz_lp06_magnetism_wksh.pdf"
      },
      {
        "title": "Manatees",
        "audio": "/media/raz/P/Manatees.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Manatees/raz_lp08_manatees_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Manatees/raz_lp08_manatees_wksh.pdf"
      },
      {
        "title": "Martin Luther King Jr.",
        "audio": "/media/raz/P/Martin Luther King Jr..mp3"
      },
      {
        "title": "Max",
        "audio": "/media/raz/P/Max.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Max/raz_lp37_max_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Max/raz_lp03_max_wksh.pdf"
      },
      {
        "title": "Musical Instruments",
        "audio": "/media/raz/P/Musical Instruments.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Musical Instruments/raz_lp05_musicinst_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Musical Instruments/raz_lp05_instruments_wksh.pdf"
      },
      {
        "title": "My Uncle Is a Firefighter",
        "audio": "/media/raz/P/My Uncle Is a Firefighter.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/My Uncle Is a Firefighter/raz_lp37_myuncleisfirefighter_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/My Uncle Is a Firefighter/raz_lp37_myuncleisfirefighter_wksh.pdf"
      },
      {
        "title": "Rockin' Rhythm and Sweet Harmony",
        "audio": "/media/raz/P/Rockin' Rhythm and Sweet Harmony.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Rockin' Rhythm and Sweet Harmony/raz_lp37_rockinrhythmandsweetharmony_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Rockin' Rhythm and Sweet Harmony/raz_lp37_rockinrhythmandsweetharmony_wksh.pdf"
      },
      {
        "title": "Seals- Sea Lions- and Walruses",
        "audio": "/media/raz/P/Seals- Sea Lions- and Walruses.mp3"
      },
      {
        "title": "Shelter Pets Are Best",
        "audio": "/media/raz/P/Shelter Pets Are Best.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Shelter Pets Are Best/raz_lp36_shelterpetsarebest_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Shelter Pets Are Best/raz_lp36_shelterpetsarebest_wksh.pdf"
      },
      {
        "title": "Sonia Joins the Supreme Court",
        "audio": "/media/raz/P/Sonia Joins the Supreme Court.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Sonia Joins the Supreme Court/raz_lp36_soniajoinssupremecourt_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Sonia Joins the Supreme Court/raz_lp36_soniajoinssupremecourt_wksh.pdf"
      },
      {
        "title": "The 100th Day Project",
        "audio": "/media/raz/P/The 100th Day Project.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/The 100th Day Project/raz_lp16_100thday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/The 100th Day Project/raz_lp16_100thday_wksh.pdf"
      },
      {
        "title": "The Creature Constitution",
        "audio": "/media/raz/P/The Creature Constitution.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/The Creature Constitution/raz_lp37_creatureconstitution_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/The Creature Constitution/raz_lp37_creatureconstitution_wksh.pdf"
      },
      {
        "title": "The Homework Lesson",
        "audio": "/media/raz/P/The Homework Lesson.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/The Homework Lesson/raz_lp36_homeworklesson_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/The Homework Lesson/raz_lp36_homeworklesson_wksh.pdf"
      },
      {
        "title": "The Legend of Sleepy Hollow",
        "audio": "/media/raz/P/The Legend of Sleepy Hollow.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/The Legend of Sleepy Hollow/raz_lp37_legendofsleepyhollow_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/The Legend of Sleepy Hollow/raz_lp37_legendofsleepyhollow_wksh.pdf"
      },
      {
        "title": "The Mona Lisa Mystery",
        "audio": "/media/raz/P/The Mona Lisa Mystery.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/The Mona Lisa Mystery/raz_lp24_monalisamystery_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/The Mona Lisa Mystery/raz_lp24_monalisamystery_wksh.pdf"
      },
      {
        "title": "The State Hermitage- Russia's Amazing Museum",
        "audio": "/media/raz/P/The State Hermitage- Russia's Amazing Museum.mp3"
      },
      {
        "title": "The Steam Engine",
        "audio": "/media/raz/P/The Steam Engine.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/The Steam Engine/raz_lp25_steamengine_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/The Steam Engine/raz_lp25_steamengine_wksh.pdf"
      },
      {
        "title": "The Story of the Statue",
        "audio": "/media/raz/P/The Story of the Statue.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/The Story of the Statue/raz_lp37_storyofstatue_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/The Story of the Statue/raz_lp37_storyofstatue_wksh.pdf"
      },
      {
        "title": "Voyagers in Space",
        "audio": "/media/raz/P/Voyagers in Space.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Voyagers in Space/raz_lp37_voyagersinspace_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Voyagers in Space/raz_lp37_voyagersinspace_wksh.pdf"
      },
      {
        "title": "Women of the Supreme Court",
        "audio": "/media/raz/P/Women of the Supreme Court.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/Women of the Supreme Court/raz_lp37_womenofsupremecourt_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/Women of the Supreme Court/raz_lp37_womenofsupremecourt_wksh.pdf"
      },
      {
        "title": "World Cup Soccer",
        "audio": "/media/raz/P/World Cup Soccer.mp3",
        "pdf": "/media/RAZ 2000册/P 75+4/P 75+4/World Cup Soccer/raz_lp36_worldcupsoccer_clr.pdf",
        "worksheet": "/media/RAZ 2000册/P 75+4/P 75+4/World Cup Soccer/raz_lp36_worldcupsoccer_wksh.pdf"
      }
    ]
  },
  {
    "level": "Q",
    "grade": "G5",
    "ar": "5.0-5.3",
    "desc": "五年级高段",
    "count": 53,
    "books": [
      {
        "title": "A Visit to Kitt Peak",
        "audio": "/media/raz/Q/A Visit to Kitt Peak.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/A Visit to Kitt Peak/raz_lq19_avisitkittpeak_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/A Visit to Kitt Peak/raz_lq19_avisitkittpeak_wksh.pdf"
      },
      {
        "title": "Amelia Earhart- A Legend in Flight",
        "audio": "/media/raz/Q/Amelia Earhart- A Legend in Flight.mp3"
      },
      {
        "title": "Arthur's Bad News Day",
        "audio": "/media/raz/Q/Arthur's Bad News Day.mp3"
      },
      {
        "title": "Castles",
        "audio": "/media/raz/Q/Castles.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Castles/raz_lq05_castles_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Castles/raz_lq05_castles_wksh.pdf"
      },
      {
        "title": "Cesar Chavez- Migrant Hero",
        "audio": "/media/raz/Q/Cesar Chavez- Migrant Hero.mp3"
      },
      {
        "title": "Chili Pepper Powder Surprise",
        "audio": "/media/raz/Q/Chili Pepper Powder Surprise.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Chili Pepper Powder Surprise/raz_lq30_chilipepper_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Chili Pepper Powder Surprise/raz_lq30_chilipepper_wksh.pdf"
      },
      {
        "title": "China",
        "audio": "/media/raz/Q/China.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/China/raz_lq40_china_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/China/raz_lq13_china_wksh.pdf"
      },
      {
        "title": "Chinzaemon the Silent",
        "audio": "/media/raz/Q/Chinzaemon the Silent.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Chinzaemon the Silent/raz_lq08_chinzaemon_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Chinzaemon the Silent/raz_lq08_chinzaemon_wksh.pdf"
      },
      {
        "title": "Coral Reefs",
        "audio": "/media/raz/Q/Coral Reefs.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Coral Reefs/raz_lq35_coralreefs_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Coral Reefs/raz_lq35_coralreefs_wksh.pdf"
      },
      {
        "title": "Día de los Muertos",
        "audio": "/media/raz/Q/Día de los Muertos.mp3"
      },
      {
        "title": "Earthquakes- Volcanoes- and Tsunamis",
        "audio": "/media/raz/Q/Earthquakes- Volcanoes- and Tsunamis.mp3"
      },
      {
        "title": "Eleventeen",
        "audio": "/media/raz/Q/Eleventeen.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Eleventeen/raz_lq39_eleventeen_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Eleventeen/raz_lq25_eleventeen_wksh.pdf"
      },
      {
        "title": "Emily",
        "audio": "/media/raz/Q/Emily.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Emily/raz_lq28_emily_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Emily/raz_lq28_emily_wksh.pdf"
      },
      {
        "title": "Extreme Animals",
        "audio": "/media/raz/Q/Extreme Animals.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Extreme Animals/raz_lq34_extremeanimals_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Extreme Animals/raz_lq34_extremeanimals_wksh.pdf"
      },
      {
        "title": "Famous First Ladies",
        "audio": "/media/raz/Q/Famous First Ladies.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Famous First Ladies/raz_lq14_famous1stladies_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Famous First Ladies/raz_lq14_famous1st_wksh.pdf"
      },
      {
        "title": "Fireworks",
        "audio": "/media/raz/Q/Fireworks.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Fireworks/raz_lq07_fireworks_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Fireworks/raz_lq07_fireworks_wksh.pdf"
      },
      {
        "title": "First Day of School",
        "audio": "/media/raz/Q/First Day of School.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/First Day of School/raz_lq27_firstdayschool_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/First Day of School/raz_lq27_firstdayschool_wksh.pdf"
      },
      {
        "title": "Gandhi",
        "audio": "/media/raz/Q/Gandhi.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Gandhi/raz_lq40_gandhi_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Gandhi/raz_lq40_gandhi_wksh.pdf"
      },
      {
        "title": "Good for Thurgood!",
        "audio": "/media/raz/Q/Good for Thurgood!.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Good for Thurgood!/raz_lq40_goodthurgood_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Good for Thurgood!/raz_lq40_goodthurgood_wksh.pdf"
      },
      {
        "title": "Horseshoes Aren't Just for Good Luck",
        "audio": "/media/raz/Q/Horseshoes Aren't Just for Good Luck.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Horseshoes Aren't Just for Good Luck/raz_lq37_horseshoes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Horseshoes Aren't Just for Good Luck/raz_lq37_horseshoes_wksh.pdf"
      },
      {
        "title": "How Glooskap Found Summer",
        "audio": "/media/raz/Q/How Glooskap Found Summer.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/How Glooskap Found Summer/raz_lq36_howglooskap_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/How Glooskap Found Summer/raz_lq36_howglooskap_wksh.pdf"
      },
      {
        "title": "Landfills- What a Load of Garbage!",
        "audio": "/media/raz/Q/Landfills- What a Load of Garbage!.mp3"
      },
      {
        "title": "Lost Cities",
        "audio": "/media/raz/Q/Lost Cities.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Lost Cities/raz_lq40_lostcities_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Lost Cities/raz_lq40_lostcities_wksh.pdf"
      },
      {
        "title": "Mermaid in a Teacup",
        "audio": "/media/raz/Q/Mermaid in a Teacup.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Mermaid in a Teacup/raz_lq02_mermaid_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Mermaid in a Teacup/raz_lq02_mermaid_wksh.pdf"
      },
      {
        "title": "Mike Van Zee- Special Olympian",
        "audio": "/media/raz/Q/Mike Van Zee- Special Olympian.mp3"
      },
      {
        "title": "Morty and the Oatmeal Babysitter",
        "audio": "/media/raz/Q/Morty and the Oatmeal Babysitter.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Morty and the Oatmeal Babysitter/raz_mm01_mortyoatmeal_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Morty and the Oatmeal Babysitter/raz_mm01_mortyoatmeal_wksh.pdf"
      },
      {
        "title": "Morty and the Suitcase Caper",
        "audio": "/media/raz/Q/Morty and the Suitcase Caper.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Morty and the Suitcase Caper/raz_mm02_mortysuitcase_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Morty and the Suitcase Caper/raz_mm02_mortysuitcase_wksh.pdf"
      },
      {
        "title": "Morty and the Teacher's Apples",
        "audio": "/media/raz/Q/Morty and the Teacher's Apples.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Morty and the Teacher's Apples/raz_mm03_mortyapples_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Morty and the Teacher's Apples/raz_mm03_mortyapples_wksh.pdf"
      },
      {
        "title": "My Earth Day Birthday",
        "audio": "/media/raz/Q/My Earth Day Birthday.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/My Earth Day Birthday/raz_lq40_myearthdaybirthday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/My Earth Day Birthday/raz_lq40_myearthdaybirthday_wksh.pdf"
      },
      {
        "title": "Mystery at Camp White Cloud",
        "audio": "/media/raz/Q/Mystery at Camp White Cloud.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Mystery at Camp White Cloud/raz_lq15_mysteryatcamp_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Mystery at Camp White Cloud/raz_lq15_mysterycamp_wksh.pdf"
      },
      {
        "title": "On Eagle River",
        "audio": "/media/raz/Q/On Eagle River.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/On Eagle River/raz_lq29_oneagleriver_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/On Eagle River/raz_lq29_oneagleriver_wksh.pdf"
      },
      {
        "title": "Plight of the Polar Bear",
        "audio": "/media/raz/Q/Plight of the Polar Bear.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Plight of the Polar Bear/raz_lq20_plightpolarbear_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Plight of the Polar Bear/raz_lq20_plightpolarbear_wksh.pdf"
      },
      {
        "title": "Robin Hood and the King",
        "audio": "/media/raz/Q/Robin Hood and the King.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Robin Hood and the King/raz_lq38_robinhoodandking_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Robin Hood and the King/raz_lq38_robinhoodandking_wksh.pdf"
      },
      {
        "title": "SPRAK!",
        "audio": "/media/raz/Q/SPRAK!.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/SPRAK!/raz_lq39_sprak_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/SPRAK!/raz_lq22_sprak_wksh.pdf"
      },
      {
        "title": "Salmon- A Link in the Food Chain",
        "audio": "/media/raz/Q/Salmon- A Link in the Food Chain.mp3"
      },
      {
        "title": "Sharks",
        "audio": "/media/raz/Q/Sharks.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Sharks/raz_lq40_sharks_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Sharks/raz_lq06_sharks_wksh.pdf"
      },
      {
        "title": "Sinkhole Science",
        "audio": "/media/raz/Q/Sinkhole Science.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Sinkhole Science/raz_lq40_sinkholescience_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Sinkhole Science/raz_lq40_sinkholescience_wksh.pdf"
      },
      {
        "title": "Summer Olympics Events",
        "audio": "/media/raz/Q/Summer Olympics Events.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Summer Olympics Events/raz_lq40_summerolympicsevents_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Summer Olympics Events/raz_lq32_summerolympics_wksh.pdf"
      },
      {
        "title": "Sweet Potato Challenge",
        "audio": "/media/raz/Q/Sweet Potato Challenge.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Sweet Potato Challenge/raz_lq39_sweetpotatochallenge_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Sweet Potato Challenge/raz_lq17_sweetpotato_wksh.pdf"
      },
      {
        "title": "The Buffalo Soldiers",
        "audio": "/media/raz/Q/The Buffalo Soldiers.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Buffalo Soldiers/raz_lq40_buffalosoldiers_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Buffalo Soldiers/raz_lq40_buffalosoldiers_wksh.pdf"
      },
      {
        "title": "The Castaway Pines",
        "audio": "/media/raz/Q/The Castaway Pines.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Castaway Pines/raz_lq04_castawaypines_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Castaway Pines/raz_lq04_castawaypines_wksh.pdf"
      },
      {
        "title": "The Cave of the Lost",
        "audio": "/media/raz/Q/The Cave of the Lost.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Cave of the Lost/raz_lq40_caveoflost_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Cave of the Lost/raz_lq40_caveoflost_wksh.pdf"
      },
      {
        "title": "The Footprint",
        "audio": "/media/raz/Q/The Footprint.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Footprint/raz_lq16_thefootprint_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Footprint/raz_lq16_thefootprint_wksh.pdf"
      },
      {
        "title": "The Golden Flute",
        "audio": "/media/raz/Q/The Golden Flute.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Golden Flute/raz_lq03_goldenflute_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Golden Flute/raz_lq03_goldenflute_wksh.pdf"
      },
      {
        "title": "The Hollow",
        "audio": "/media/raz/Q/The Hollow.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Hollow/raz_lq33_hollow_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Hollow/raz_lq33_hollow_wksh.pdf"
      },
      {
        "title": "The Legend of Nessie",
        "audio": "/media/raz/Q/The Legend of Nessie.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Legend of Nessie/raz_lq40_legendofnessie_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Legend of Nessie/raz_lq24_legendofnessie_wksh.pdf"
      },
      {
        "title": "The Little Fir Tree",
        "audio": "/media/raz/Q/The Little Fir Tree.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Little Fir Tree/raz_lq40_littlefirtree_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Little Fir Tree/raz_lq18_littlefirtree_wksh.pdf"
      },
      {
        "title": "The New Soccer Ball",
        "audio": "/media/raz/Q/The New Soccer Ball.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/The New Soccer Ball/raz_lq40_newsoccerball_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/The New Soccer Ball/raz_lq40_newsoccerball_wksh.pdf"
      },
      {
        "title": "The Three-R Plan",
        "audio": "/media/raz/Q/The Three-R Plan.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Three-R Plan/raz_lq31_threerplan_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/The Three-R Plan/raz_lq31_threerplan_wksh.pdf"
      },
      {
        "title": "Vincent's Bedroom",
        "audio": "/media/raz/Q/Vincent's Bedroom.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Vincent's Bedroom/raz_lq23_vincentsbed_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Vincent's Bedroom/raz_lq23_vincentsbed_wksh.pdf"
      },
      {
        "title": "Walking in Roman Footsteps",
        "audio": "/media/raz/Q/Walking in Roman Footsteps.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Walking in Roman Footsteps/raz_lq26_walkinginroman_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Walking in Roman Footsteps/raz_lq26_walkingroman_wksh.pdf"
      },
      {
        "title": "Why Abe Lincoln Grew a Beard",
        "audio": "/media/raz/Q/Why Abe Lincoln Grew a Beard.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Why Abe Lincoln Grew a Beard/raz_lq40_whyabelincolngrewbeard_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Why Abe Lincoln Grew a Beard/raz_lq40_whyabelincolngrewbeard_wksh.pdf",
        "workbook": "/media/RAZ 2000册/Q 84+4/Q 84+4/Why Abe Lincoln Grew a Beard/raz_cqlq40_whyabelincolngrewbeard.pdf"
      },
      {
        "title": "Zookeeping",
        "audio": "/media/raz/Q/Zookeeping.mp3",
        "pdf": "/media/RAZ 2000册/Q 84+4/Q 84+4/Zookeeping/raz_lq09_zookeeping_clr.pdf",
        "worksheet": "/media/RAZ 2000册/Q 84+4/Q 84+4/Zookeeping/raz_lq09_zookeeping_wksh.pdf"
      }
    ]
  },
  {
    "level": "R",
    "grade": "G5-6",
    "ar": "5.3-5.7",
    "desc": "五六年级过渡",
    "count": 52,
    "books": [
      {
        "title": "Alaska- The Last Frontier",
        "audio": "/media/raz/R/Alaska- The Last Frontier.mp3"
      },
      {
        "title": "All About Chocolate",
        "audio": "/media/raz/R/All About Chocolate.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/All About Chocolate/raz_lr24_chocolate_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/All About Chocolate/raz_lr24_chocolate_wksh.pdf"
      },
      {
        "title": "All About Kites",
        "audio": "/media/raz/R/All About Kites.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/All About Kites/raz_lr33_allaboutkites_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/All About Kites/raz_lr23_allaboutkites_wksh.pdf"
      },
      {
        "title": "An Apple a Day",
        "audio": "/media/raz/R/An Apple a Day.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/An Apple a Day/raz_lr13_appleaday_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/An Apple a Day/raz_lr13_appleaday_wksh.pdf"
      },
      {
        "title": "Animal Discoveries",
        "audio": "/media/raz/R/Animal Discoveries.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Animal Discoveries/raz_lr33_animaldiscoveries_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Animal Discoveries/raz_lr33_animaldiscoveries_wksh.pdf"
      },
      {
        "title": "April Fool's",
        "audio": "/media/raz/R/April Fool's.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/April Fool's/raz_lr33_aprilfools_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/April Fool's/raz_lr33_aprilfools_wksh.pdf"
      },
      {
        "title": "Arrows",
        "audio": "/media/raz/R/Arrows.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Arrows/raz_lr25_arrows_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Arrows/raz_lr25_arrows_wksh.pdf"
      },
      {
        "title": "Bessie Coleman",
        "audio": "/media/raz/R/Bessie Coleman.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Bessie Coleman/raz_lr15_bessiecoleman_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Bessie Coleman/raz_lr15_besscoleman_wksh.pdf"
      },
      {
        "title": "Charlene's Sea of Cortez Journal",
        "audio": "/media/raz/R/Charlene's Sea of Cortez Journal.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Charlene's Sea of Cortez Journal/raz_lr16_charlenessea_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Charlene's Sea of Cortez Journal/raz_lr16_charlenessea_wksh.pdf"
      },
      {
        "title": "Expedition 25- The Subtropics",
        "audio": "/media/raz/R/Expedition 25- The Subtropics.mp3"
      },
      {
        "title": "Expedition 40- The Secret of the Seasons",
        "audio": "/media/raz/R/Expedition 40- The Secret of the Seasons.mp3"
      },
      {
        "title": "Expedition 60- The Subarctic",
        "audio": "/media/raz/R/Expedition 60- The Subarctic.mp3"
      },
      {
        "title": "Expedition Zero",
        "audio": "/media/raz/R/Expedition Zero.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Expedition Zero/raz_lr31_expeditionzero_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Expedition Zero/raz_lr31_expeditionzero_wksh.pdf"
      },
      {
        "title": "Explorer's Guide to World Weather",
        "audio": "/media/raz/R/Explorer's Guide to World Weather.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Explorer's Guide to World Weather/raz_lr31_explorersguidetoworldweather_clr.pdf"
      },
      {
        "title": "Exploring Tide Pools",
        "audio": "/media/raz/R/Exploring Tide Pools.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Exploring Tide Pools/raz_lr12_tidepools_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Exploring Tide Pools/raz_lr12_tidepools_wksh.pdf"
      },
      {
        "title": "Fishing in Simplicity",
        "audio": "/media/raz/R/Fishing in Simplicity.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Fishing in Simplicity/raz_lr07_fishingsimplicity_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Fishing in Simplicity/raz_lr07_fishing_wksh.pdf"
      },
      {
        "title": "Foods Around the World",
        "audio": "/media/raz/R/Foods Around the World.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Foods Around the World/raz_lr31_foodsaroundworld_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Foods Around the World/raz_lr31_foodsaroundworld_wksh.pdf"
      },
      {
        "title": "George Washington Carver",
        "audio": "/media/raz/R/George Washington Carver.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/George Washington Carver/raz_lr33_georgewashingtoncarver_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/George Washington Carver/raz_lr33_georgewashingtoncarver_wksh.pdf"
      },
      {
        "title": "Glow-in-the-Dark Animals",
        "audio": "/media/raz/R/Glow-in-the-Dark Animals.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Glow-in-the-Dark Animals/raz_lr31_glowinthedarkanimals_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Glow-in-the-Dark Animals/raz_lr31_glowinthedarkanimals_wksh.pdf"
      },
      {
        "title": "Going to the Super Bowl",
        "audio": "/media/raz/R/Going to the Super Bowl.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Going to the Super Bowl/raz_lr31_goingtosuperbowl_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Going to the Super Bowl/raz_lr31_goingtosuperbowl_wksh.pdf"
      },
      {
        "title": "How the Robin Stole Fire",
        "audio": "/media/raz/R/How the Robin Stole Fire.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/How the Robin Stole Fire/raz_lr05_robinfire_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/How the Robin Stole Fire/raz_lr05_robinstole_wksh.pdf"
      },
      {
        "title": "Inventions",
        "audio": "/media/raz/R/Inventions.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Inventions/raz_lr33_inventions_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Inventions/raz_lr18_inventions_wksh.pdf"
      },
      {
        "title": "Morty's Roadside Refreshments",
        "audio": "/media/raz/R/Morty's Roadside Refreshments.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Morty's Roadside Refreshments/raz_mm06_mortyroadside_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Morty's Roadside Refreshments/raz_mm06_mortyroadside_wksh.pdf"
      },
      {
        "title": "Mozart",
        "audio": "/media/raz/R/Mozart.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Mozart/raz_lr09_mozart_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Mozart/raz_lr09_mozart_wksh.pdf"
      },
      {
        "title": "Murdoch's Path",
        "audio": "/media/raz/R/Murdoch's Path.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Murdoch's Path/raz_lr10_murdochspath_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Murdoch's Path/raz_lr10_murdochspath_wksh.pdf"
      },
      {
        "title": "Neighborhood Mystery",
        "audio": "/media/raz/R/Neighborhood Mystery.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Neighborhood Mystery/raz_lr20_neighbormystery_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Neighborhood Mystery/raz_lr20_neighbormystery_wksh.pdf"
      },
      {
        "title": "Only One Aunt Maggie",
        "audio": "/media/raz/R/Only One Aunt Maggie.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Only One Aunt Maggie/raz_lr22_onlyoneaunt_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Only One Aunt Maggie/raz_lr22_onlyoneaunt_wksh.pdf"
      },
      {
        "title": "Part 1- Charly Did It",
        "audio": "/media/raz/R/Part 1- Charly Did It.mp3"
      },
      {
        "title": "Part 2- Charly's New Year's Revolution",
        "audio": "/media/raz/R/Part 2- Charly's New Year's Revolution.mp3"
      },
      {
        "title": "Part 3- Charly Dances 'til It Drops",
        "audio": "/media/raz/R/Part 3- Charly Dances 'til It Drops.mp3"
      },
      {
        "title": "Part 4- Raining Cats- Dogs- and Other Animals",
        "audio": "/media/raz/R/Part 4- Raining Cats- Dogs- and Other Animals.mp3"
      },
      {
        "title": "Rattlers",
        "audio": "/media/raz/R/Rattlers.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Rattlers/raz_lr11_rattlers_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Rattlers/raz_lr11_rattlers_wksh.pdf"
      },
      {
        "title": "Robin Hood Wins the Sheriff's Golden Arrow",
        "audio": "/media/raz/R/Robin Hood Wins the Sheriff's Golden Arrow.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Robin Hood Wins the Sheriff's Golden Arrow/raz_lr29_robinarrow_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Robin Hood Wins the Sheriff's Golden Arrow/raz_lr29_robinarrow_wksh.pdf"
      },
      {
        "title": "Scaredy Camp",
        "audio": "/media/raz/R/Scaredy Camp.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Scaredy Camp/raz_lr33_scaredycamp_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Scaredy Camp/raz_lr33_scaredycamp_wksh.pdf"
      },
      {
        "title": "Sea Turtles",
        "audio": "/media/raz/R/Sea Turtles.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Sea Turtles/raz_lr02_seaturtles_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Sea Turtles/raz_lr02_seaturtles_wksh.pdf"
      },
      {
        "title": "September 11- Always Remember",
        "audio": "/media/raz/R/September 11- Always Remember.mp3"
      },
      {
        "title": "Ships and Boats",
        "audio": "/media/raz/R/Ships and Boats.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Ships and Boats/raz_lr27_shipsandboats_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Ships and Boats/raz_lr27_shipsandboats_wksh.pdf"
      },
      {
        "title": "Skydiving",
        "audio": "/media/raz/R/Skydiving.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Skydiving/raz_lr04_skydiving_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Skydiving/raz_lr04_skydiving_wksh.pdf"
      },
      {
        "title": "Speed",
        "audio": "/media/raz/R/Speed.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Speed/raz_lr03_speed_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Speed/raz_lr03_speed_wksh.pdf"
      },
      {
        "title": "Storm Chasers",
        "audio": "/media/raz/R/Storm Chasers.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Storm Chasers/raz_lr14_stormchasers_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Storm Chasers/raz_lr14_stormchasers_wksh.pdf"
      },
      {
        "title": "The Genius of Tesla",
        "audio": "/media/raz/R/The Genius of Tesla.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/The Genius of Tesla/raz_lr33_geniusoftesla_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/The Genius of Tesla/raz_lr33_geniusoftesla_wksh.pdf"
      },
      {
        "title": "The Hard Stuff! All About Bones",
        "audio": "/media/raz/R/The Hard Stuff! All About Bones.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/The Hard Stuff! All About Bones/raz_lr30_hardstuffbones_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/The Hard Stuff! All About Bones/raz_lr30_hardstuff_wksh.pdf"
      },
      {
        "title": "The Olympics- Past and Present",
        "audio": "/media/raz/R/The Olympics- Past and Present.mp3"
      },
      {
        "title": "The Thesaurus",
        "audio": "/media/raz/R/The Thesaurus.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/The Thesaurus/raz_lr08_thesaurus_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/The Thesaurus/raz_lr08_thesaurus_wksh.pdf"
      },
      {
        "title": "Treasure Found",
        "audio": "/media/raz/R/Treasure Found.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Treasure Found/raz_lr19_treasurefound_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Treasure Found/raz_lr19_treasurefound_wksh.pdf"
      },
      {
        "title": "Turtle Tom",
        "audio": "/media/raz/R/Turtle Tom.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Turtle Tom/raz_lr33_turtletom_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Turtle Tom/raz_lr06_turtletom_wksh.pdf"
      },
      {
        "title": "Two Artists- Vermeer's Forger",
        "audio": "/media/raz/R/Two Artists- Vermeer's Forger.mp3"
      },
      {
        "title": "We're in Business",
        "audio": "/media/raz/R/We're in Business.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/We're in Business/raz_lr17_wereinbusiness_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/We're in Business/raz_lr17_wereinbusiness_wksh.pdf"
      },
      {
        "title": "Weird Bird Beaks",
        "audio": "/media/raz/R/Weird Bird Beaks.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Weird Bird Beaks/raz_lr28_birdbeaks_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Weird Bird Beaks/raz_lr28_birdbeaks_wksh.pdf"
      },
      {
        "title": "Wildlife Rescue",
        "audio": "/media/raz/R/Wildlife Rescue.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Wildlife Rescue/raz_lr31_wildliferescue_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Wildlife Rescue/raz_lr31_wildliferescue_wksh.pdf"
      },
      {
        "title": "Wonders of Nature",
        "audio": "/media/raz/R/Wonders of Nature.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Wonders of Nature/raz_lr31_wondersofnature_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Wonders of Nature/raz_lr31_wondersofnature_wksh.pdf"
      },
      {
        "title": "Woods of Wonder",
        "audio": "/media/raz/R/Woods of Wonder.mp3",
        "pdf": "/media/RAZ 2000册/R 90+4/R 90+4/Woods of Wonder/raz_lr33_woodsofwonder_clr.pdf",
        "worksheet": "/media/RAZ 2000册/R 90+4/R 90+4/Woods of Wonder/raz_lr33_woodsofwonder_wksh.pdf"
      }
    ]
  },
  {
    "level": "S",
    "grade": "G6",
    "ar": "5.7-6.0",
    "desc": "六年级",
    "count": 46,
    "books": [
      {
        "title": "A Big League for Little Players",
        "audio": "/media/raz/S/A Big League for Little Players.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/A Big League for Little Players/raz_ls21_abigleague_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/A Big League for Little Players/raz_ls21_abigleague_wksh.pdf"
      },
      {
        "title": "A Selection From Alice in Wonderland",
        "audio": "/media/raz/S/A Selection From Alice in Wonderland.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/A Selection From Alice in Wonderland/raz_ls35_selectionfromaliceinwonderland_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/A Selection From Alice in Wonderland/raz_ls12_alice_wksh.pdf"
      },
      {
        "title": "Animals Feel Emotions",
        "audio": "/media/raz/S/Animals Feel Emotions.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Animals Feel Emotions/raz_ls22_animalsfeel_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Animals Feel Emotions/raz_ls22_animalsfeel_wksh.pdf"
      },
      {
        "title": "Barack Obama",
        "audio": "/media/raz/S/Barack Obama.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Barack Obama/raz_ls35_barackobama_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Barack Obama/raz_ls32_barackobama_wksh.pdf"
      },
      {
        "title": "Bears",
        "audio": "/media/raz/S/Bears.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Bears/raz_ls27_bears_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Bears/raz_ls27_bears_wksh.pdf"
      },
      {
        "title": "Bites and Stings",
        "audio": "/media/raz/S/Bites and Stings.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Bites and Stings/raz_ls37_bitesandstings_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Bites and Stings/raz_ls24_bitesstings_wksh.pdf"
      },
      {
        "title": "Building Big Dreams",
        "audio": "/media/raz/S/Building Big Dreams.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Building Big Dreams/raz_ls37_buildingbigdreams_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Building Big Dreams/raz_ls37_buildingbigdreams_wksh.pdf"
      },
      {
        "title": "Butterflies and Moths",
        "audio": "/media/raz/S/Butterflies and Moths.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Butterflies and Moths/raz_ls18_butterfliesmoths_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Butterflies and Moths/raz_ls18_buttermoths_wksh.pdf"
      },
      {
        "title": "Chef Morty's Party Surprise",
        "audio": "/media/raz/S/Chef Morty's Party Surprise.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Chef Morty's Party Surprise/raz_mm04_chefmorty_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Chef Morty's Party Surprise/raz_mm04_chefmorty_wksh.pdf"
      },
      {
        "title": "Finding the Tome",
        "audio": "/media/raz/S/Finding the Tome.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Finding the Tome/raz_ls37_findingtome_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Finding the Tome/raz_ls37_findingtome_wksh.pdf"
      },
      {
        "title": "France",
        "audio": "/media/raz/S/France.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/France/raz_ls37_france_clr.pdf"
      },
      {
        "title": "Frederick Douglass- Forever Free",
        "audio": "/media/raz/S/Frederick Douglass- Forever Free.mp3"
      },
      {
        "title": "Gems- Treasures from the Earth",
        "audio": "/media/raz/S/Gems- Treasures from the Earth.mp3"
      },
      {
        "title": "Ghosts in the House",
        "audio": "/media/raz/S/Ghosts in the House.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Ghosts in the House/raz_ls19_ghostsinhouse_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Ghosts in the House/raz_ls19_ghostsinhouse_wksh.pdf"
      },
      {
        "title": "Harold the Dummy",
        "audio": "/media/raz/S/Harold the Dummy.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Harold the Dummy/raz_ls13_haroldthedummy_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Harold the Dummy/raz_ls13_harolddummy_wksh.pdf"
      },
      {
        "title": "Harriet Tubman and the Underground Railroad",
        "audio": "/media/raz/S/Harriet Tubman and the Underground Railroad.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Harriet Tubman and the Underground Railroad/raz_ls37_harriettubmanandundergroundrailroad_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Harriet Tubman and the Underground Railroad/raz_ls14_harriettubman_wksh.pdf"
      },
      {
        "title": "How Little John Joined Robin Hood",
        "audio": "/media/raz/S/How Little John Joined Robin Hood.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/How Little John Joined Robin Hood/raz_ls35_howlittlejohnjoinedrobinhood_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/How Little John Joined Robin Hood/raz_ls35_howlittlejohnjoinedrobinhood_wksh.pdf"
      },
      {
        "title": "India",
        "audio": "/media/raz/S/India.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/India/raz_ls37_india_clr.pdf"
      },
      {
        "title": "Laura Ingalls Wilder- A Pioneer's Life",
        "audio": "/media/raz/S/Laura Ingalls Wilder- A Pioneer's Life.mp3"
      },
      {
        "title": "Let's Make Vegetable Soup",
        "audio": "/media/raz/S/Let's Make Vegetable Soup.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Let's Make Vegetable Soup/raz_ls29_letsmakesoup_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Let's Make Vegetable Soup/raz_ls29_letsmakesoup_wksh.pdf"
      },
      {
        "title": "Life in Space",
        "audio": "/media/raz/S/Life in Space.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Life in Space/raz_ls37_lifeinspace_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Life in Space/raz_ls37_lifeinspace_wksh.pdf"
      },
      {
        "title": "Losing Grandpa",
        "audio": "/media/raz/S/Losing Grandpa.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Losing Grandpa/raz_ls06_losinggpa_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Losing Grandpa/raz_ls06_losinggrandpa_wksh.pdf"
      },
      {
        "title": "Making Mosaics",
        "audio": "/media/raz/S/Making Mosaics.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Making Mosaics/raz_ls23_makingmosaics_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Making Mosaics/raz_ls23_makingmosaics_wksh.pdf"
      },
      {
        "title": "Martin Luther King Jr.",
        "audio": "/media/raz/S/Martin Luther King Jr..mp3"
      },
      {
        "title": "Monkey Business",
        "audio": "/media/raz/S/Monkey Business.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Monkey Business/raz_ls09_monkeybusiness_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Monkey Business/raz_ls09_monkbusiness_wksh.pdf"
      },
      {
        "title": "Morty and the Fancy-Pants Wedding",
        "audio": "/media/raz/S/Morty and the Fancy-Pants Wedding.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Morty and the Fancy-Pants Wedding/raz_mm07_mortyfancypants_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Morty and the Fancy-Pants Wedding/raz_mm07_mortyfancy_wksh.pdf"
      },
      {
        "title": "Morty and the Mousetown Talent Show",
        "audio": "/media/raz/S/Morty and the Mousetown Talent Show.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Morty and the Mousetown Talent Show/raz_mm05_mortytalent_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Morty and the Mousetown Talent Show/raz_mm05_mortytalent_wksh.pdf"
      },
      {
        "title": "National Parks",
        "audio": "/media/raz/S/National Parks.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/National Parks/raz_ls15_nationalparks_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/National Parks/raz_ls15_nationalparks_wksh.pdf"
      },
      {
        "title": "Our Solar System",
        "audio": "/media/raz/S/Our Solar System.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Our Solar System/raz_ls35_oursolarsystem_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Our Solar System/raz_ls35_oursolarsystem_wksh.pdf"
      },
      {
        "title": "Part 5- Let a Smiley Face Be Your Umbrella",
        "audio": "/media/raz/S/Part 5- Let a Smiley Face Be Your Umbrella.mp3"
      },
      {
        "title": "Penguins",
        "audio": "/media/raz/S/Penguins.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Penguins/raz_ls35_penguins_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Penguins/raz_ls35_penguins_wksh.pdf"
      },
      {
        "title": "Searching for the Loch Ness Monster",
        "audio": "/media/raz/S/Searching for the Loch Ness Monster.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Searching for the Loch Ness Monster/raz_ls25_searchinglochness_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Searching for the Loch Ness Monster/raz_ls25_searchlochness_wksh.pdf"
      },
      {
        "title": "Seven Wonders of the Modern World",
        "audio": "/media/raz/S/Seven Wonders of the Modern World.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Seven Wonders of the Modern World/raz_ls16_sevenwonders_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Seven Wonders of the Modern World/raz_ls16_sevenwonders_wksh.pdf"
      },
      {
        "title": "Snakebite!",
        "audio": "/media/raz/S/Snakebite!.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Snakebite!/raz_ls37_snakebite_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Snakebite!/raz_ls34_snakebite_wksh.pdf"
      },
      {
        "title": "The International T-Shirt Challenge",
        "audio": "/media/raz/S/The International T-Shirt Challenge.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/The International T-Shirt Challenge/raz_ls20_inttshirt_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/The International T-Shirt Challenge/raz_ls20_inttshirt_wksh.pdf"
      },
      {
        "title": "The Moon Bowl",
        "audio": "/media/raz/S/The Moon Bowl.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/The Moon Bowl/raz_ls37_moonbowl_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/The Moon Bowl/raz_ls10_moonbowl_wksh.pdf"
      },
      {
        "title": "The Titanic- Lost and Found",
        "audio": "/media/raz/S/The Titanic- Lost and Found.mp3"
      },
      {
        "title": "The Trouble with English",
        "audio": "/media/raz/S/The Trouble with English.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/The Trouble with English/raz_ls08_troubleenglish_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/The Trouble with English/raz_ls08_trouble_wksh.pdf"
      },
      {
        "title": "Tsunamis",
        "audio": "/media/raz/S/Tsunamis.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Tsunamis/raz_ls17_tsunamis_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Tsunamis/raz_ls17_tsunamis_wksh.pdf"
      },
      {
        "title": "Two Kettles",
        "audio": "/media/raz/S/Two Kettles.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Two Kettles/raz_ls33_twokettles_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Two Kettles/raz_ls33_twokettles_wksh.pdf"
      },
      {
        "title": "Volcanoes",
        "audio": "/media/raz/S/Volcanoes.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Volcanoes/raz_ls35_volcanoes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Volcanoes/raz_ls35_volcanoes_wksh.pdf"
      },
      {
        "title": "Voyagers in Space",
        "audio": "/media/raz/S/Voyagers in Space.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Voyagers in Space/raz_ls37_voyagersinspace_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Voyagers in Space/raz_ls37_voyagersinspace_wksh.pdf"
      },
      {
        "title": "What the Boys Found",
        "audio": "/media/raz/S/What the Boys Found.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/What the Boys Found/raz_ls26_whatboysfound_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/What the Boys Found/raz_ls26_whatboysfound_wksh.pdf"
      },
      {
        "title": "What's in a Name",
        "audio": "/media/raz/S/What's in a Name.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/What's in a Name/raz_ls02_whatsinaname_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/What's in a Name/raz_ls02_whatname_wksh.pdf"
      },
      {
        "title": "Wheeling the Snake",
        "audio": "/media/raz/S/Wheeling the Snake.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Wheeling the Snake/raz_ls05_wheeling_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Wheeling the Snake/raz_ls05_wheeling_wksh.pdf"
      },
      {
        "title": "Woolly and Fang",
        "audio": "/media/raz/S/Woolly and Fang.mp3",
        "pdf": "/media/RAZ 2000册/S 81 +4/S 81 +4/Woolly and Fang/raz_ls07_woollyfang_clr.pdf",
        "worksheet": "/media/RAZ 2000册/S 81 +4/S 81 +4/Woolly and Fang/raz_ls07_woollyfang_wksh.pdf"
      }
    ]
  },
  {
    "level": "T",
    "grade": "G6",
    "ar": "6.0-6.5",
    "desc": "六年级高段",
    "count": 47,
    "books": [
      {
        "title": "A Trip to a Prehistoric Cave",
        "audio": "/media/raz/T/A Trip to a Prehistoric Cave.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/A Trip to a Prehistoric Cave/raz_lt30_atriptoprecave_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/A Trip to a Prehistoric Cave/raz_lt30_atriptoprecave_wksh.pdf"
      },
      {
        "title": "Adventures with Abuela",
        "audio": "/media/raz/T/Adventures with Abuela.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Adventures with Abuela/raz_lt18_advabuela_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Adventures with Abuela/raz_lt18_advabuela_wksh.pdf"
      },
      {
        "title": "Aladdin and the Wonderful Lamp",
        "audio": "/media/raz/T/Aladdin and the Wonderful Lamp.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Aladdin and the Wonderful Lamp/raz_lt38_aladdinandwonderfullamp_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Aladdin and the Wonderful Lamp/raz_lt10_aladdin_wksh.pdf"
      },
      {
        "title": "Albert Einstein",
        "audio": "/media/raz/T/Albert Einstein.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Albert Einstein/raz_lt33_alberteinstein_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Albert Einstein/raz_lt33_alberteinstein_wksh.pdf"
      },
      {
        "title": "Alice's Birthday Cake",
        "audio": "/media/raz/T/Alice's Birthday Cake.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Alice's Birthday Cake/raz_lt20_alicebdaycake_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Alice's Birthday Cake/raz_lt20_alicebdaycake_wksh.pdf"
      },
      {
        "title": "Ants in My Bed",
        "audio": "/media/raz/T/Ants in My Bed.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Ants in My Bed/raz_lt16_antsinmybed_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Ants in My Bed/raz_lt16_antsinmybed_wksh.pdf"
      },
      {
        "title": "Art Around Us",
        "audio": "/media/raz/T/Art Around Us.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Art Around Us/raz_lt31_artaroundus_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Art Around Us/raz_lt31_artaroundus_wksh.pdf"
      },
      {
        "title": "Bats in the Attic",
        "audio": "/media/raz/T/Bats in the Attic.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Bats in the Attic/raz_lt37_batsinattic_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Bats in the Attic/raz_lt17_batsintheattic_wksh.pdf"
      },
      {
        "title": "Brazil",
        "audio": "/media/raz/T/Brazil.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Brazil/raz_lt38_brazil_clr.pdf"
      },
      {
        "title": "C Is for Canada",
        "audio": "/media/raz/T/C Is for Canada.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/C Is for Canada/raz_lt25_cisforcanada_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/C Is for Canada/raz_lt25_cisforcanada_wksh.pdf"
      },
      {
        "title": "Cali and Wanda Lou",
        "audio": "/media/raz/T/Cali and Wanda Lou.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Cali and Wanda Lou/raz_lt23_caliandwanda_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Cali and Wanda Lou/raz_lt23_caliandwanda_wksh.pdf"
      },
      {
        "title": "Camouflage",
        "audio": "/media/raz/T/Camouflage.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Camouflage/raz_lt08_camouflage_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Camouflage/raz_lt08_camouflage_wksh.pdf"
      },
      {
        "title": "Caribou Man",
        "audio": "/media/raz/T/Caribou Man.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Caribou Man/raz_lt38_caribouman_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Caribou Man/raz_lt05_caribouman_wksh.pdf"
      },
      {
        "title": "Carlos's Puzzle",
        "audio": "/media/raz/T/Carlos's Puzzle.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Carlos's Puzzle/raz_lt21_carlospuzzle_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Carlos's Puzzle/raz_lt21_carlospuzzle_wksh.pdf"
      },
      {
        "title": "Cathy Freeman",
        "audio": "/media/raz/T/Cathy Freeman.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Cathy Freeman/raz_lt06_cathyfreeman_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Cathy Freeman/raz_lt06_cathyfreeman_wksh.pdf"
      },
      {
        "title": "Desert People",
        "audio": "/media/raz/T/Desert People.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Desert People/raz_lt36_desertpeople_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Desert People/raz_lt36_desertpeople_wksh.pdf"
      },
      {
        "title": "Deserts Dry",
        "audio": "/media/raz/T/Deserts Dry.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Deserts Dry/raz_lt29_desertsdry_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Deserts Dry/raz_lt29_desertsdry_wksh.pdf"
      },
      {
        "title": "Drums and Drumming",
        "audio": "/media/raz/T/Drums and Drumming.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Drums and Drumming/raz_lt03_drums_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Drums and Drumming/raz_lt03_drums_wksh.pdf"
      },
      {
        "title": "Earthquakes- Volcanoes- and Tsunamis",
        "audio": "/media/raz/T/Earthquakes- Volcanoes- and Tsunamis.mp3"
      },
      {
        "title": "Elizabeth Blackwell- America's First Woman Doctor",
        "audio": "/media/raz/T/Elizabeth Blackwell- America's First Woman Doctor.mp3"
      },
      {
        "title": "Holidays Around the World",
        "audio": "/media/raz/T/Holidays Around the World.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Holidays Around the World/raz_lt12_holidays_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Holidays Around the World/raz_lt12_holidays_wksh.pdf"
      },
      {
        "title": "Horseshoes Aren't Just for Good Luck",
        "audio": "/media/raz/T/Horseshoes Aren't Just for Good Luck.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Horseshoes Aren't Just for Good Luck/raz_lt14_horseshoes_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Horseshoes Aren't Just for Good Luck/raz_lt14_horseshoes_wksh.pdf"
      },
      {
        "title": "InFLUenza",
        "audio": "/media/raz/T/InFLUenza.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/InFLUenza/raz_lt37_influenza_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/InFLUenza/raz_lt37_influenza_wksh.pdf"
      },
      {
        "title": "Japan",
        "audio": "/media/raz/T/Japan.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Japan/raz_lt38_japan_clr.pdf"
      },
      {
        "title": "Kid Inventors",
        "audio": "/media/raz/T/Kid Inventors.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Kid Inventors/raz_lt38_kidinventors_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Kid Inventors/raz_lt38_kidinventors_wksh.pdf"
      },
      {
        "title": "Lighter Than Air",
        "audio": "/media/raz/T/Lighter Than Air.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Lighter Than Air/raz_lt09_lighterthanair_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Lighter Than Air/raz_lt09_lighterthan_wksh.pdf"
      },
      {
        "title": "Mexico",
        "audio": "/media/raz/T/Mexico.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Mexico/raz_lt38_mexico_clr.pdf"
      },
      {
        "title": "Money in the USA",
        "audio": "/media/raz/T/Money in the USA.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Money in the USA/raz_lt38_moneyinusa_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Money in the USA/raz_lt24_moneyinusa_wksh.pdf"
      },
      {
        "title": "Morty and the Mousetown Gazette",
        "audio": "/media/raz/T/Morty and the Mousetown Gazette.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Morty and the Mousetown Gazette/raz_mm08_mousegazette_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Morty and the Mousetown Gazette/raz_mm08_mousegazette_wksh.pdf"
      },
      {
        "title": "My Secret Internet Friend",
        "audio": "/media/raz/T/My Secret Internet Friend.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/My Secret Internet Friend/raz_lt38_mysecretinternetfriend_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/My Secret Internet Friend/raz_lt38_mysecretinternetfriend_wksh.pdf"
      },
      {
        "title": "Mysteries of the Lost Civilization",
        "audio": "/media/raz/T/Mysteries of the Lost Civilization.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Mysteries of the Lost Civilization/raz_lt22_mysteriesoflost_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Mysteries of the Lost Civilization/raz_lt22_mysteriesoflost_wksh.pdf"
      },
      {
        "title": "Remembering the Alamo",
        "audio": "/media/raz/T/Remembering the Alamo.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Remembering the Alamo/raz_lt15_rememberalamo_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Remembering the Alamo/raz_lt15_rememberalamo_wksh.pdf"
      },
      {
        "title": "Ricardo's Dilemma",
        "audio": "/media/raz/T/Ricardo's Dilemma.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Ricardo's Dilemma/raz_lt07_ricardo_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Ricardo's Dilemma/raz_lt07_ricardo_wksh.pdf"
      },
      {
        "title": "Running for Freedom",
        "audio": "/media/raz/T/Running for Freedom.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Running for Freedom/raz_lt13_runningfreedom_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Running for Freedom/raz_lt13_runfreedom_wksh.pdf"
      },
      {
        "title": "Sally's Secret Ambition",
        "audio": "/media/raz/T/Sally's Secret Ambition.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Sally's Secret Ambition/raz_lt19_sallyssecret_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Sally's Secret Ambition/raz_lt19_sallyssecret_wksh.pdf"
      },
      {
        "title": "Severe Weather",
        "audio": "/media/raz/T/Severe Weather.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Severe Weather/raz_lt02_severeweather_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Severe Weather/raz_lt02_severe_wksh.pdf"
      },
      {
        "title": "Ships of Discovery",
        "audio": "/media/raz/T/Ships of Discovery.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Ships of Discovery/raz_lt34_shipsofdiscovery_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Ships of Discovery/raz_lt34_shipdiscovery_wksh.pdf"
      },
      {
        "title": "Special Effects",
        "audio": "/media/raz/T/Special Effects.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Special Effects/raz_lt37_specialeffects_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Special Effects/raz_lt26_specialeffects_wksh.pdf"
      },
      {
        "title": "The Black Stones",
        "audio": "/media/raz/T/The Black Stones.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/The Black Stones/raz_lt37_blackstones_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/The Black Stones/raz_lt37_blackstones_wksh.pdf"
      },
      {
        "title": "The Buffalo Soldiers",
        "audio": "/media/raz/T/The Buffalo Soldiers.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/The Buffalo Soldiers/raz_lt38_buffalosoldiers_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/The Buffalo Soldiers/raz_lt38_buffalosoldiers_wksh.pdf"
      },
      {
        "title": "The Red Baron",
        "audio": "/media/raz/T/The Red Baron.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/The Red Baron/raz_lt38_redbaron_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/The Red Baron/raz_lt38_redbaron_wksh.pdf"
      },
      {
        "title": "Thomas Jefferson",
        "audio": "/media/raz/T/Thomas Jefferson.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Thomas Jefferson/raz_lt38_thomasjefferson_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Thomas Jefferson/raz_lt38_thomasjefferson_wksh.pdf"
      },
      {
        "title": "Titanic Treasure",
        "audio": "/media/raz/T/Titanic Treasure.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Titanic Treasure/raz_lt27_titanictreasure_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Titanic Treasure/raz_lt27_titanictreasure_wksh.pdf"
      },
      {
        "title": "Vikings",
        "audio": "/media/raz/T/Vikings.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Vikings/raz_lt35_vikings_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Vikings/raz_lt35_vikings_wksh.pdf"
      },
      {
        "title": "Weave It!",
        "audio": "/media/raz/T/Weave It!.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Weave It!/raz_lt28_weaveit_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Weave It!/raz_lt28_weaveit_wksh.pdf"
      },
      {
        "title": "What Is Water Worth",
        "audio": "/media/raz/T/What Is Water Worth.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/What Is Water Worth/raz_lt38_whatiswaterworth_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/What Is Water Worth/raz_lt38_whatiswaterworth_wksh.pdf"
      },
      {
        "title": "Yee Haw! The Real Lives of the Cowboys",
        "audio": "/media/raz/T/Yee Haw! The Real Lives of the Cowboys.mp3",
        "pdf": "/media/RAZ 2000册/T 78+4/T 78+4/Yee Haw! The Real Lives of the Cowboys/raz_lt11_yeehaw_clr.pdf",
        "worksheet": "/media/RAZ 2000册/T 78+4/T 78+4/Yee Haw! The Real Lives of the Cowboys/raz_lt11_yeehaw_wksh.pdf"
      }
    ]
  }
]

export const RAZ_LEVELS = razLevelsRaw.map(l => ({
  ...l,
  books: l.books.map(b => ({ ...b })),
}))

export function getLevelBooks(level) {
  return RAZ_LEVELS.find(l => l.level === level)?.books || []
}

export default RAZ_LEVELS
