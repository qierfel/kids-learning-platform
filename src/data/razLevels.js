// RAZ 分级读物索引 — 共 974 本，20 个级别
// 音频路径开发环境: /media/raz/<level>/<title>.mp3（由 vite 本地媒体插件提供）
// 生产环境需替换 MEDIA_BASE_URL，或通过 Firebase Storage / Cloudflare R2 提供

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
        "audio": "/media/raz/aa/Big.mp3"
      },
      {
        "title": "Colorful Eggs",
        "audio": "/media/raz/aa/Colorful Eggs.mp3"
      },
      {
        "title": "Counting Bugs",
        "audio": "/media/raz/aa/Counting Bugs.mp3"
      },
      {
        "title": "Counting Letters",
        "audio": "/media/raz/aa/Counting Letters.mp3"
      },
      {
        "title": "Farm Animals",
        "audio": "/media/raz/aa/Farm Animals.mp3"
      },
      {
        "title": "Fido Gets Dressed",
        "audio": "/media/raz/aa/Fido Gets Dressed.mp3"
      },
      {
        "title": "Four",
        "audio": "/media/raz/aa/Four.mp3"
      },
      {
        "title": "Go- Go- Go",
        "audio": "/media/raz/aa/Go- Go- Go.mp3"
      },
      {
        "title": "In",
        "audio": "/media/raz/aa/In.mp3"
      },
      {
        "title": "It Is Fall",
        "audio": "/media/raz/aa/It Is Fall.mp3"
      },
      {
        "title": "Jump Over",
        "audio": "/media/raz/aa/Jump Over.mp3"
      },
      {
        "title": "Little",
        "audio": "/media/raz/aa/Little.mp3"
      },
      {
        "title": "Lunch at School",
        "audio": "/media/raz/aa/Lunch at School.mp3"
      },
      {
        "title": "My Family",
        "audio": "/media/raz/aa/My Family.mp3"
      },
      {
        "title": "My Gift for Mom",
        "audio": "/media/raz/aa/My Gift for Mom.mp3"
      },
      {
        "title": "My School Bus",
        "audio": "/media/raz/aa/My School Bus.mp3"
      },
      {
        "title": "On",
        "audio": "/media/raz/aa/On.mp3"
      },
      {
        "title": "One Insect",
        "audio": "/media/raz/aa/One Insect.mp3"
      },
      {
        "title": "One",
        "audio": "/media/raz/aa/One.mp3"
      },
      {
        "title": "Out",
        "audio": "/media/raz/aa/Out.mp3"
      },
      {
        "title": "Over",
        "audio": "/media/raz/aa/Over.mp3"
      },
      {
        "title": "Pasta!",
        "audio": "/media/raz/aa/Pasta!.mp3"
      },
      {
        "title": "Pets",
        "audio": "/media/raz/aa/Pets.mp3"
      },
      {
        "title": "Play Ball!",
        "audio": "/media/raz/aa/Play Ball!.mp3"
      },
      {
        "title": "Show Some Love",
        "audio": "/media/raz/aa/Show Some Love.mp3"
      },
      {
        "title": "Spring",
        "audio": "/media/raz/aa/Spring.mp3"
      },
      {
        "title": "Summer Picnics",
        "audio": "/media/raz/aa/Summer Picnics.mp3"
      },
      {
        "title": "Summer",
        "audio": "/media/raz/aa/Summer.mp3"
      },
      {
        "title": "The Backyard",
        "audio": "/media/raz/aa/The Backyard.mp3"
      },
      {
        "title": "The Book",
        "audio": "/media/raz/aa/The Book.mp3"
      },
      {
        "title": "The City",
        "audio": "/media/raz/aa/The City.mp3"
      },
      {
        "title": "The Classroom",
        "audio": "/media/raz/aa/The Classroom.mp3"
      },
      {
        "title": "The Coast",
        "audio": "/media/raz/aa/The Coast.mp3"
      },
      {
        "title": "The Fort",
        "audio": "/media/raz/aa/The Fort.mp3"
      },
      {
        "title": "The Garden",
        "audio": "/media/raz/aa/The Garden.mp3"
      },
      {
        "title": "The Ocean",
        "audio": "/media/raz/aa/The Ocean.mp3"
      },
      {
        "title": "The Plant",
        "audio": "/media/raz/aa/The Plant.mp3"
      },
      {
        "title": "The School",
        "audio": "/media/raz/aa/The School.mp3"
      },
      {
        "title": "The Street",
        "audio": "/media/raz/aa/The Street.mp3"
      },
      {
        "title": "The Supermarket",
        "audio": "/media/raz/aa/The Supermarket.mp3"
      },
      {
        "title": "The Trip",
        "audio": "/media/raz/aa/The Trip.mp3"
      },
      {
        "title": "Three",
        "audio": "/media/raz/aa/Three.mp3"
      },
      {
        "title": "Too Many Sweets",
        "audio": "/media/raz/aa/Too Many Sweets.mp3"
      },
      {
        "title": "Toys",
        "audio": "/media/raz/aa/Toys.mp3"
      },
      {
        "title": "Two",
        "audio": "/media/raz/aa/Two.mp3"
      },
      {
        "title": "Under",
        "audio": "/media/raz/aa/Under.mp3"
      },
      {
        "title": "Water",
        "audio": "/media/raz/aa/Water.mp3"
      },
      {
        "title": "We Build",
        "audio": "/media/raz/aa/We Build.mp3"
      },
      {
        "title": "Winter",
        "audio": "/media/raz/aa/Winter.mp3"
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
        "audio": "/media/raz/A/All Kinds of Faces.mp3"
      },
      {
        "title": "Baby Animals",
        "audio": "/media/raz/A/Baby Animals.mp3"
      },
      {
        "title": "Bedtime Counting",
        "audio": "/media/raz/A/Bedtime Counting.mp3"
      },
      {
        "title": "Bird Colors",
        "audio": "/media/raz/A/Bird Colors.mp3"
      },
      {
        "title": "Bird Goes Home",
        "audio": "/media/raz/A/Bird Goes Home.mp3"
      },
      {
        "title": "Car Parts",
        "audio": "/media/raz/A/Car Parts.mp3"
      },
      {
        "title": "Carlos Counts Kittens",
        "audio": "/media/raz/A/Carlos Counts Kittens.mp3"
      },
      {
        "title": "Carlos Goes to School",
        "audio": "/media/raz/A/Carlos Goes to School.mp3"
      },
      {
        "title": "Fruit Colors",
        "audio": "/media/raz/A/Fruit Colors.mp3"
      },
      {
        "title": "Fruit",
        "audio": "/media/raz/A/Fruit.mp3"
      },
      {
        "title": "Fun in the Water",
        "audio": "/media/raz/A/Fun in the Water.mp3"
      },
      {
        "title": "Getting Dressed",
        "audio": "/media/raz/A/Getting Dressed.mp3"
      },
      {
        "title": "Going Places",
        "audio": "/media/raz/A/Going Places.mp3"
      },
      {
        "title": "Hamster Home",
        "audio": "/media/raz/A/Hamster Home.mp3"
      },
      {
        "title": "He Runs",
        "audio": "/media/raz/A/He Runs.mp3"
      },
      {
        "title": "Hot and Cold",
        "audio": "/media/raz/A/Hot and Cold.mp3"
      },
      {
        "title": "I Can",
        "audio": "/media/raz/A/I Can.mp3"
      },
      {
        "title": "I Draw a Bunny",
        "audio": "/media/raz/A/I Draw a Bunny.mp3"
      },
      {
        "title": "I Love Flowers",
        "audio": "/media/raz/A/I Love Flowers.mp3"
      },
      {
        "title": "I Save Money",
        "audio": "/media/raz/A/I Save Money.mp3"
      },
      {
        "title": "I See My Colors",
        "audio": "/media/raz/A/I See My Colors.mp3"
      },
      {
        "title": "I Set the Table",
        "audio": "/media/raz/A/I Set the Table.mp3"
      },
      {
        "title": "In and Out",
        "audio": "/media/raz/A/In and Out.mp3"
      },
      {
        "title": "Maria Counts Pumpkins",
        "audio": "/media/raz/A/Maria Counts Pumpkins.mp3"
      },
      {
        "title": "Maria Goes to School",
        "audio": "/media/raz/A/Maria Goes to School.mp3"
      },
      {
        "title": "Mom and I",
        "audio": "/media/raz/A/Mom and I.mp3"
      },
      {
        "title": "My Body",
        "audio": "/media/raz/A/My Body.mp3"
      },
      {
        "title": "My Dog",
        "audio": "/media/raz/A/My Dog.mp3"
      },
      {
        "title": "My Face",
        "audio": "/media/raz/A/My Face.mp3"
      },
      {
        "title": "My Hair",
        "audio": "/media/raz/A/My Hair.mp3"
      },
      {
        "title": "My House",
        "audio": "/media/raz/A/My House.mp3"
      },
      {
        "title": "My Room",
        "audio": "/media/raz/A/My Room.mp3"
      },
      {
        "title": "Opposites",
        "audio": "/media/raz/A/Opposites.mp3"
      },
      {
        "title": "Pond Animals",
        "audio": "/media/raz/A/Pond Animals.mp3"
      },
      {
        "title": "Rabbits",
        "audio": "/media/raz/A/Rabbits.mp3"
      },
      {
        "title": "Shapes in Nature",
        "audio": "/media/raz/A/Shapes in Nature.mp3"
      },
      {
        "title": "Spring Weather",
        "audio": "/media/raz/A/Spring Weather.mp3"
      },
      {
        "title": "The Big Cat",
        "audio": "/media/raz/A/The Big Cat.mp3"
      },
      {
        "title": "The Forest",
        "audio": "/media/raz/A/The Forest.mp3"
      },
      {
        "title": "The Parade",
        "audio": "/media/raz/A/The Parade.mp3"
      },
      {
        "title": "The Rainstorm",
        "audio": "/media/raz/A/The Rainstorm.mp3"
      },
      {
        "title": "These Shoes",
        "audio": "/media/raz/A/These Shoes.mp3"
      },
      {
        "title": "This Is My Bear",
        "audio": "/media/raz/A/This Is My Bear.mp3"
      },
      {
        "title": "Up and Down",
        "audio": "/media/raz/A/Up and Down.mp3"
      },
      {
        "title": "We Can Make Sounds",
        "audio": "/media/raz/A/We Can Make Sounds.mp3"
      },
      {
        "title": "What I Like",
        "audio": "/media/raz/A/What I Like.mp3"
      },
      {
        "title": "What Lives Here",
        "audio": "/media/raz/A/What Lives Here.mp3"
      },
      {
        "title": "You Can Dance",
        "audio": "/media/raz/A/You Can Dance.mp3"
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
        "audio": "/media/raz/B/Animal Coverings.mp3"
      },
      {
        "title": "Animal Ears",
        "audio": "/media/raz/B/Animal Ears.mp3"
      },
      {
        "title": "Animal Sounds",
        "audio": "/media/raz/B/Animal Sounds.mp3"
      },
      {
        "title": "Animals Can Move",
        "audio": "/media/raz/B/Animals Can Move.mp3"
      },
      {
        "title": "Applesauce",
        "audio": "/media/raz/B/Applesauce.mp3"
      },
      {
        "title": "Bananas Sometimes",
        "audio": "/media/raz/B/Bananas Sometimes.mp3"
      },
      {
        "title": "Carlos and His Teacher",
        "audio": "/media/raz/B/Carlos and His Teacher.mp3"
      },
      {
        "title": "Games We Play",
        "audio": "/media/raz/B/Games We Play.mp3"
      },
      {
        "title": "Go Animals Go",
        "audio": "/media/raz/B/Go Animals Go.mp3"
      },
      {
        "title": "Gracie's Nose",
        "audio": "/media/raz/B/Gracie's Nose.mp3"
      },
      {
        "title": "How Many Legs",
        "audio": "/media/raz/B/How Many Legs.mp3"
      },
      {
        "title": "I Love Art Class",
        "audio": "/media/raz/B/I Love Art Class.mp3"
      },
      {
        "title": "I Love the Earth",
        "audio": "/media/raz/B/I Love the Earth.mp3"
      },
      {
        "title": "I Pick Up",
        "audio": "/media/raz/B/I Pick Up.mp3"
      },
      {
        "title": "I Read a Book",
        "audio": "/media/raz/B/I Read a Book.mp3"
      },
      {
        "title": "It Is School Time",
        "audio": "/media/raz/B/It Is School Time.mp3"
      },
      {
        "title": "It Is Spring",
        "audio": "/media/raz/B/It Is Spring.mp3"
      },
      {
        "title": "Light and Heavy",
        "audio": "/media/raz/B/Light and Heavy.mp3"
      },
      {
        "title": "Maria and Her Teacher",
        "audio": "/media/raz/B/Maria and Her Teacher.mp3"
      },
      {
        "title": "Near and Far Away",
        "audio": "/media/raz/B/Near and Far Away.mp3"
      },
      {
        "title": "On the Farm",
        "audio": "/media/raz/B/On the Farm.mp3"
      },
      {
        "title": "Our Show",
        "audio": "/media/raz/B/Our Show.mp3"
      },
      {
        "title": "Paint It Purple",
        "audio": "/media/raz/B/Paint It Purple.mp3"
      },
      {
        "title": "Playful Puppy",
        "audio": "/media/raz/B/Playful Puppy.mp3"
      },
      {
        "title": "Pond Life",
        "audio": "/media/raz/B/Pond Life.mp3"
      },
      {
        "title": "Rain in the City",
        "audio": "/media/raz/B/Rain in the City.mp3"
      },
      {
        "title": "Taking Care of Chase",
        "audio": "/media/raz/B/Taking Care of Chase.mp3"
      },
      {
        "title": "Taking the Bus",
        "audio": "/media/raz/B/Taking the Bus.mp3"
      },
      {
        "title": "Ten",
        "audio": "/media/raz/B/Ten.mp3"
      },
      {
        "title": "The Big Game",
        "audio": "/media/raz/B/The Big Game.mp3"
      },
      {
        "title": "The Hungry Goat",
        "audio": "/media/raz/B/The Hungry Goat.mp3"
      },
      {
        "title": "The New Forest Path",
        "audio": "/media/raz/B/The New Forest Path.mp3"
      },
      {
        "title": "The Picnic",
        "audio": "/media/raz/B/The Picnic.mp3"
      },
      {
        "title": "Three Baby Birds",
        "audio": "/media/raz/B/Three Baby Birds.mp3"
      },
      {
        "title": "Too Many Leaves",
        "audio": "/media/raz/B/Too Many Leaves.mp3"
      },
      {
        "title": "Two Little Dicky Birds",
        "audio": "/media/raz/B/Two Little Dicky Birds.mp3"
      },
      {
        "title": "We Make Cookies",
        "audio": "/media/raz/B/We Make Cookies.mp3"
      },
      {
        "title": "We Pack a Picnic",
        "audio": "/media/raz/B/We Pack a Picnic.mp3"
      },
      {
        "title": "What Has These Feet",
        "audio": "/media/raz/B/What Has These Feet.mp3"
      },
      {
        "title": "What Has These Spots",
        "audio": "/media/raz/B/What Has These Spots.mp3"
      },
      {
        "title": "What Has These Stripes",
        "audio": "/media/raz/B/What Has These Stripes.mp3"
      },
      {
        "title": "What Has This Tail",
        "audio": "/media/raz/B/What Has This Tail.mp3"
      },
      {
        "title": "Where Is Water",
        "audio": "/media/raz/B/Where Is Water.mp3"
      },
      {
        "title": "Where",
        "audio": "/media/raz/B/Where.mp3"
      },
      {
        "title": "Winter Fun",
        "audio": "/media/raz/B/Winter Fun.mp3"
      },
      {
        "title": "You Can Go",
        "audio": "/media/raz/B/You Can Go.mp3"
      },
      {
        "title": "You and I",
        "audio": "/media/raz/B/You and I.mp3"
      },
      {
        "title": "Yours or Mine",
        "audio": "/media/raz/B/Yours or Mine.mp3"
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
        "audio": "/media/raz/C/A Place Called Home.mp3"
      },
      {
        "title": "All About Penguins",
        "audio": "/media/raz/C/All About Penguins.mp3"
      },
      {
        "title": "All About Spiders",
        "audio": "/media/raz/C/All About Spiders.mp3"
      },
      {
        "title": "Allie and Ollie",
        "audio": "/media/raz/C/Allie and Ollie.mp3"
      },
      {
        "title": "Birthday Party",
        "audio": "/media/raz/C/Birthday Party.mp3"
      },
      {
        "title": "Busy At School",
        "audio": "/media/raz/C/Busy At School.mp3"
      },
      {
        "title": "Different Kinds of Sharks",
        "audio": "/media/raz/C/Different Kinds of Sharks.mp3"
      },
      {
        "title": "Fall Foods",
        "audio": "/media/raz/C/Fall Foods.mp3"
      },
      {
        "title": "Fall",
        "audio": "/media/raz/C/Fall.mp3"
      },
      {
        "title": "Feelings",
        "audio": "/media/raz/C/Feelings.mp3"
      },
      {
        "title": "Get In",
        "audio": "/media/raz/C/Get In.mp3"
      },
      {
        "title": "Go Away- Lily",
        "audio": "/media/raz/C/Go Away- Lily.mp3"
      },
      {
        "title": "Going Away",
        "audio": "/media/raz/C/Going Away.mp3"
      },
      {
        "title": "How Frogs Grow",
        "audio": "/media/raz/C/How Frogs Grow.mp3"
      },
      {
        "title": "How Many Wheels",
        "audio": "/media/raz/C/How Many Wheels.mp3"
      },
      {
        "title": "How Many",
        "audio": "/media/raz/C/How Many.mp3"
      },
      {
        "title": "I Can Be",
        "audio": "/media/raz/C/I Can Be.mp3"
      },
      {
        "title": "I Looked Everywhere",
        "audio": "/media/raz/C/I Looked Everywhere.mp3"
      },
      {
        "title": "I Won't",
        "audio": "/media/raz/C/I Won't.mp3"
      },
      {
        "title": "I Wonder",
        "audio": "/media/raz/C/I Wonder.mp3"
      },
      {
        "title": "Jack and Lily's Favorite Food",
        "audio": "/media/raz/C/Jack and Lily's Favorite Food.mp3"
      },
      {
        "title": "Lucy Did It",
        "audio": "/media/raz/C/Lucy Did It.mp3"
      },
      {
        "title": "Machines at Home",
        "audio": "/media/raz/C/Machines at Home.mp3"
      },
      {
        "title": "Making Salsa!",
        "audio": "/media/raz/C/Making Salsa!.mp3"
      },
      {
        "title": "Mash the Potatoes",
        "audio": "/media/raz/C/Mash the Potatoes.mp3"
      },
      {
        "title": "Mongo and Cutie",
        "audio": "/media/raz/C/Mongo and Cutie.mp3"
      },
      {
        "title": "New Again",
        "audio": "/media/raz/C/New Again.mp3"
      },
      {
        "title": "Open and Close",
        "audio": "/media/raz/C/Open and Close.mp3"
      },
      {
        "title": "Pairs",
        "audio": "/media/raz/C/Pairs.mp3"
      },
      {
        "title": "Rocks",
        "audio": "/media/raz/C/Rocks.mp3"
      },
      {
        "title": "Sherman Sure Is Shy",
        "audio": "/media/raz/C/Sherman Sure Is Shy.mp3"
      },
      {
        "title": "Space",
        "audio": "/media/raz/C/Space.mp3"
      },
      {
        "title": "Taking Turns",
        "audio": "/media/raz/C/Taking Turns.mp3"
      },
      {
        "title": "Teeth Brushing Fun",
        "audio": "/media/raz/C/Teeth Brushing Fun.mp3"
      },
      {
        "title": "The Animals of Canada",
        "audio": "/media/raz/C/The Animals of Canada.mp3"
      },
      {
        "title": "The Easter Egg Hunt",
        "audio": "/media/raz/C/The Easter Egg Hunt.mp3"
      },
      {
        "title": "The Woodsy Band Jam",
        "audio": "/media/raz/C/The Woodsy Band Jam.mp3"
      },
      {
        "title": "Tools",
        "audio": "/media/raz/C/Tools.mp3"
      },
      {
        "title": "We Count",
        "audio": "/media/raz/C/We Count.mp3"
      },
      {
        "title": "We Make a Snowman",
        "audio": "/media/raz/C/We Make a Snowman.mp3"
      },
      {
        "title": "What Animals Eat",
        "audio": "/media/raz/C/What Animals Eat.mp3"
      },
      {
        "title": "What Do I Wear",
        "audio": "/media/raz/C/What Do I Wear.mp3"
      },
      {
        "title": "What I Want",
        "audio": "/media/raz/C/What I Want.mp3"
      },
      {
        "title": "What Is at the Zoo",
        "audio": "/media/raz/C/What Is at the Zoo.mp3"
      },
      {
        "title": "What's My Job",
        "audio": "/media/raz/C/What's My Job.mp3"
      },
      {
        "title": "What's for Breakfast",
        "audio": "/media/raz/C/What's for Breakfast.mp3"
      },
      {
        "title": "When Is Nighttime",
        "audio": "/media/raz/C/When Is Nighttime.mp3"
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
        "audio": "/media/raz/D/A Day for Dad.mp3"
      },
      {
        "title": "Animal Tongues",
        "audio": "/media/raz/D/Animal Tongues.mp3"
      },
      {
        "title": "At the Library",
        "audio": "/media/raz/D/At the Library.mp3"
      },
      {
        "title": "Backyard Camping",
        "audio": "/media/raz/D/Backyard Camping.mp3"
      },
      {
        "title": "Bats Day and Night",
        "audio": "/media/raz/D/Bats Day and Night.mp3"
      },
      {
        "title": "Caretakers",
        "audio": "/media/raz/D/Caretakers.mp3"
      },
      {
        "title": "Clouds",
        "audio": "/media/raz/D/Clouds.mp3"
      },
      {
        "title": "Community Helpers",
        "audio": "/media/raz/D/Community Helpers.mp3"
      },
      {
        "title": "Country Places",
        "audio": "/media/raz/D/Country Places.mp3"
      },
      {
        "title": "Dollars and Cents",
        "audio": "/media/raz/D/Dollars and Cents.mp3"
      },
      {
        "title": "Frog Is Hungry",
        "audio": "/media/raz/D/Frog Is Hungry.mp3"
      },
      {
        "title": "Getting Around the City",
        "audio": "/media/raz/D/Getting Around the City.mp3"
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
        "audio": "/media/raz/D/Hobbies.mp3"
      },
      {
        "title": "I Count 100 Things",
        "audio": "/media/raz/D/I Count 100 Things.mp3"
      },
      {
        "title": "I Like My Hair",
        "audio": "/media/raz/D/I Like My Hair.mp3"
      },
      {
        "title": "I Need An Eraser",
        "audio": "/media/raz/D/I Need An Eraser.mp3"
      },
      {
        "title": "Lily the Cat",
        "audio": "/media/raz/D/Lily the Cat.mp3"
      },
      {
        "title": "Little Loon",
        "audio": "/media/raz/D/Little Loon.mp3"
      },
      {
        "title": "Maria's Halloween",
        "audio": "/media/raz/D/Maria's Halloween.mp3"
      },
      {
        "title": "Mud Balls!",
        "audio": "/media/raz/D/Mud Balls!.mp3"
      },
      {
        "title": "My Neighborhood",
        "audio": "/media/raz/D/My Neighborhood.mp3"
      },
      {
        "title": "My New School",
        "audio": "/media/raz/D/My New School.mp3"
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
        "audio": "/media/raz/D/Our Good Night Story.mp3"
      },
      {
        "title": "Polly Gets Out",
        "audio": "/media/raz/D/Polly Gets Out.mp3"
      },
      {
        "title": "Senses",
        "audio": "/media/raz/D/Senses.mp3"
      },
      {
        "title": "Sky High!",
        "audio": "/media/raz/D/Sky High!.mp3"
      },
      {
        "title": "Stone Soup",
        "audio": "/media/raz/D/Stone Soup.mp3"
      },
      {
        "title": "Swamp Music",
        "audio": "/media/raz/D/Swamp Music.mp3"
      },
      {
        "title": "Tadpole Teasing",
        "audio": "/media/raz/D/Tadpole Teasing.mp3"
      },
      {
        "title": "The Busy Pond",
        "audio": "/media/raz/D/The Busy Pond.mp3"
      },
      {
        "title": "The Mitten",
        "audio": "/media/raz/D/The Mitten.mp3"
      },
      {
        "title": "The Sky Is Falling",
        "audio": "/media/raz/D/The Sky Is Falling.mp3"
      },
      {
        "title": "The Team",
        "audio": "/media/raz/D/The Team.mp3"
      },
      {
        "title": "To the Store",
        "audio": "/media/raz/D/To the Store.mp3"
      },
      {
        "title": "To the Woods",
        "audio": "/media/raz/D/To the Woods.mp3"
      },
      {
        "title": "We Give Away",
        "audio": "/media/raz/D/We Give Away.mp3"
      },
      {
        "title": "Welcome Back- Butterflies",
        "audio": "/media/raz/D/Welcome Back- Butterflies.mp3"
      },
      {
        "title": "What Do You See",
        "audio": "/media/raz/D/What Do You See.mp3"
      },
      {
        "title": "What",
        "audio": "/media/raz/D/What.mp3"
      },
      {
        "title": "Where Animals Live",
        "audio": "/media/raz/D/Where Animals Live.mp3"
      },
      {
        "title": "Where Plants Grow",
        "audio": "/media/raz/D/Where Plants Grow.mp3"
      },
      {
        "title": "Why Can't I",
        "audio": "/media/raz/D/Why Can't I.mp3"
      },
      {
        "title": "Workers",
        "audio": "/media/raz/D/Workers.mp3"
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
        "audio": "/media/raz/E/A Day of Firsts.mp3"
      },
      {
        "title": "A Sweet Tale",
        "audio": "/media/raz/E/A Sweet Tale.mp3"
      },
      {
        "title": "A Week With Grandpa",
        "audio": "/media/raz/E/A Week With Grandpa.mp3"
      },
      {
        "title": "All Kinds of Factories",
        "audio": "/media/raz/E/All Kinds of Factories.mp3"
      },
      {
        "title": "All Kinds of Farms",
        "audio": "/media/raz/E/All Kinds of Farms.mp3"
      },
      {
        "title": "Animals- Animals",
        "audio": "/media/raz/E/Animals- Animals.mp3"
      },
      {
        "title": "At the Rodeo",
        "audio": "/media/raz/E/At the Rodeo.mp3"
      },
      {
        "title": "Bear and Kangaroo",
        "audio": "/media/raz/E/Bear and Kangaroo.mp3"
      },
      {
        "title": "Calming Down",
        "audio": "/media/raz/E/Calming Down.mp3"
      },
      {
        "title": "Carlos's First Halloween",
        "audio": "/media/raz/E/Carlos's First Halloween.mp3"
      },
      {
        "title": "City Animals",
        "audio": "/media/raz/E/City Animals.mp3"
      },
      {
        "title": "City Places",
        "audio": "/media/raz/E/City Places.mp3"
      },
      {
        "title": "Country Animals",
        "audio": "/media/raz/E/Country Animals.mp3"
      },
      {
        "title": "Doctor Jen",
        "audio": "/media/raz/E/Doctor Jen.mp3"
      },
      {
        "title": "Dolly's Drama Queen Day",
        "audio": "/media/raz/E/Dolly's Drama Queen Day.mp3"
      },
      {
        "title": "Getting Ready for School",
        "audio": "/media/raz/E/Getting Ready for School.mp3"
      },
      {
        "title": "Grandparents Day",
        "audio": "/media/raz/E/Grandparents Day.mp3"
      },
      {
        "title": "Happy Birthday- Snag!",
        "audio": "/media/raz/E/Happy Birthday- Snag!.mp3"
      },
      {
        "title": "Hooray for the Farmer's Market!",
        "audio": "/media/raz/E/Hooray for the Farmer's Market!.mp3"
      },
      {
        "title": "Hugs",
        "audio": "/media/raz/E/Hugs.mp3"
      },
      {
        "title": "I Am Your New Plant",
        "audio": "/media/raz/E/I Am Your New Plant.mp3"
      },
      {
        "title": "I'd Like To Be",
        "audio": "/media/raz/E/I'd Like To Be.mp3"
      },
      {
        "title": "In the Mountains",
        "audio": "/media/raz/E/In the Mountains.mp3"
      },
      {
        "title": "Let's Carve a Pumpkin",
        "audio": "/media/raz/E/Let's Carve a Pumpkin.mp3"
      },
      {
        "title": "Let's Make Lemonade",
        "audio": "/media/raz/E/Let's Make Lemonade.mp3"
      },
      {
        "title": "Maddy Loves to March",
        "audio": "/media/raz/E/Maddy Loves to March.mp3"
      },
      {
        "title": "Make a Tree Friend",
        "audio": "/media/raz/E/Make a Tree Friend.mp3"
      },
      {
        "title": "Making Pizza",
        "audio": "/media/raz/E/Making Pizza.mp3"
      },
      {
        "title": "Nothing for Father's Day",
        "audio": "/media/raz/E/Nothing for Father's Day.mp3"
      },
      {
        "title": "Places Plants and Animals Live",
        "audio": "/media/raz/E/Places Plants and Animals Live.mp3"
      },
      {
        "title": "Police Officers",
        "audio": "/media/raz/E/Police Officers.mp3"
      },
      {
        "title": "Shapes in Tide Pools",
        "audio": "/media/raz/E/Shapes in Tide Pools.mp3"
      },
      {
        "title": "Shoes Men Wear",
        "audio": "/media/raz/E/Shoes Men Wear.mp3"
      },
      {
        "title": "Shoes Women Wear",
        "audio": "/media/raz/E/Shoes Women Wear.mp3"
      },
      {
        "title": "Sloth Wants to Snooze",
        "audio": "/media/raz/E/Sloth Wants to Snooze.mp3"
      },
      {
        "title": "Stop Snoring!",
        "audio": "/media/raz/E/Stop Snoring!.mp3"
      },
      {
        "title": "The Boy Who Cried -Wolf!",
        "audio": "/media/raz/E/The Boy Who Cried -Wolf!.mp3"
      },
      {
        "title": "The Contest",
        "audio": "/media/raz/E/The Contest.mp3"
      },
      {
        "title": "The Four Seasons",
        "audio": "/media/raz/E/The Four Seasons.mp3"
      },
      {
        "title": "The Storm",
        "audio": "/media/raz/E/The Storm.mp3"
      },
      {
        "title": "The Vet",
        "audio": "/media/raz/E/The Vet.mp3"
      },
      {
        "title": "Time For Bed",
        "audio": "/media/raz/E/Time For Bed.mp3"
      },
      {
        "title": "Tiny Tugboat",
        "audio": "/media/raz/E/Tiny Tugboat.mp3"
      },
      {
        "title": "Too Much Work!",
        "audio": "/media/raz/E/Too Much Work!.mp3"
      },
      {
        "title": "What Is in the Box",
        "audio": "/media/raz/E/What Is in the Box.mp3"
      },
      {
        "title": "What's In That Pouch",
        "audio": "/media/raz/E/What's In That Pouch.mp3"
      },
      {
        "title": "What's for Dinner",
        "audio": "/media/raz/E/What's for Dinner.mp3"
      },
      {
        "title": "When I Grow Up",
        "audio": "/media/raz/E/When I Grow Up.mp3"
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
        "audio": "/media/raz/F/A Clown Face.mp3"
      },
      {
        "title": "A Pet for Jupe",
        "audio": "/media/raz/F/A Pet for Jupe.mp3"
      },
      {
        "title": "Are You From India",
        "audio": "/media/raz/F/Are You From India.mp3"
      },
      {
        "title": "Best of Friends",
        "audio": "/media/raz/F/Best of Friends.mp3"
      },
      {
        "title": "Changing Seasons",
        "audio": "/media/raz/F/Changing Seasons.mp3"
      },
      {
        "title": "Cleaning My Room",
        "audio": "/media/raz/F/Cleaning My Room.mp3"
      },
      {
        "title": "Community Workers",
        "audio": "/media/raz/F/Community Workers.mp3"
      },
      {
        "title": "Does It Sink or Float",
        "audio": "/media/raz/F/Does It Sink or Float.mp3"
      },
      {
        "title": "Double It!",
        "audio": "/media/raz/F/Double It!.mp3"
      },
      {
        "title": "Eat Like a Pig",
        "audio": "/media/raz/F/Eat Like a Pig.mp3"
      },
      {
        "title": "Farm Friends",
        "audio": "/media/raz/F/Farm Friends.mp3"
      },
      {
        "title": "Firefighters",
        "audio": "/media/raz/F/Firefighters.mp3"
      },
      {
        "title": "Fishing with Grandpa",
        "audio": "/media/raz/F/Fishing with Grandpa.mp3"
      },
      {
        "title": "Flashlight Shadow Show",
        "audio": "/media/raz/F/Flashlight Shadow Show.mp3"
      },
      {
        "title": "Following the Map",
        "audio": "/media/raz/F/Following the Map.mp3"
      },
      {
        "title": "Friends in the Stars",
        "audio": "/media/raz/F/Friends in the Stars.mp3"
      },
      {
        "title": "Gaggle- Herd- and Murder",
        "audio": "/media/raz/F/Gaggle- Herd- and Murder.mp3"
      },
      {
        "title": "Glassblowing",
        "audio": "/media/raz/F/Glassblowing.mp3"
      },
      {
        "title": "Hibernation",
        "audio": "/media/raz/F/Hibernation.mp3"
      },
      {
        "title": "Hide and Seek with Zog",
        "audio": "/media/raz/F/Hide and Seek with Zog.mp3"
      },
      {
        "title": "How Do They Move",
        "audio": "/media/raz/F/How Do They Move.mp3"
      },
      {
        "title": "How Is the Weather Today",
        "audio": "/media/raz/F/How Is the Weather Today.mp3"
      },
      {
        "title": "How to Make a Snow Person",
        "audio": "/media/raz/F/How to Make a Snow Person.mp3"
      },
      {
        "title": "In a Chinese Garden",
        "audio": "/media/raz/F/In a Chinese Garden.mp3"
      },
      {
        "title": "Jobs for James",
        "audio": "/media/raz/F/Jobs for James.mp3"
      },
      {
        "title": "Josh Gets Glasses",
        "audio": "/media/raz/F/Josh Gets Glasses.mp3"
      },
      {
        "title": "Monster Reading Buddies",
        "audio": "/media/raz/F/Monster Reading Buddies.mp3"
      },
      {
        "title": "Mother's Day",
        "audio": "/media/raz/F/Mother's Day.mp3"
      },
      {
        "title": "Needs and Wants",
        "audio": "/media/raz/F/Needs and Wants.mp3"
      },
      {
        "title": "Night Animals",
        "audio": "/media/raz/F/Night Animals.mp3"
      },
      {
        "title": "Our Camping Trip",
        "audio": "/media/raz/F/Our Camping Trip.mp3"
      },
      {
        "title": "Our Class Flag",
        "audio": "/media/raz/F/Our Class Flag.mp3"
      },
      {
        "title": "Scaredy Crow",
        "audio": "/media/raz/F/Scaredy Crow.mp3"
      },
      {
        "title": "Smart Crows",
        "audio": "/media/raz/F/Smart Crows.mp3"
      },
      {
        "title": "Some Birds Go",
        "audio": "/media/raz/F/Some Birds Go.mp3"
      },
      {
        "title": "SuperZero",
        "audio": "/media/raz/F/SuperZero.mp3"
      },
      {
        "title": "Taste This",
        "audio": "/media/raz/F/Taste This.mp3"
      },
      {
        "title": "Thank You- Everyone!",
        "audio": "/media/raz/F/Thank You- Everyone!.mp3"
      },
      {
        "title": "The Food Chain",
        "audio": "/media/raz/F/The Food Chain.mp3"
      },
      {
        "title": "The Snowstorm",
        "audio": "/media/raz/F/The Snowstorm.mp3"
      },
      {
        "title": "The Three Little Pigs",
        "audio": "/media/raz/F/The Three Little Pigs.mp3"
      },
      {
        "title": "The Tortoise and the Hare",
        "audio": "/media/raz/F/The Tortoise and the Hare.mp3"
      },
      {
        "title": "Trucking",
        "audio": "/media/raz/F/Trucking.mp3"
      },
      {
        "title": "Two for Me- One for You",
        "audio": "/media/raz/F/Two for Me- One for You.mp3"
      },
      {
        "title": "Using Less Energy",
        "audio": "/media/raz/F/Using Less Energy.mp3"
      },
      {
        "title": "Weird White House Pets",
        "audio": "/media/raz/F/Weird White House Pets.mp3"
      },
      {
        "title": "Where Is Cub",
        "audio": "/media/raz/F/Where Is Cub.mp3"
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
        "audio": "/media/raz/G/A Seed Grows.mp3"
      },
      {
        "title": "All Kinds of Homes",
        "audio": "/media/raz/G/All Kinds of Homes.mp3"
      },
      {
        "title": "American Symbols",
        "audio": "/media/raz/G/American Symbols.mp3"
      },
      {
        "title": "Animal Eyes",
        "audio": "/media/raz/G/Animal Eyes.mp3"
      },
      {
        "title": "Ants- Ants- and More Ants",
        "audio": "/media/raz/G/Ants- Ants- and More Ants.mp3"
      },
      {
        "title": "Beanie and the Missing Bear",
        "audio": "/media/raz/G/Beanie and the Missing Bear.mp3"
      },
      {
        "title": "Billy Gets Lost",
        "audio": "/media/raz/G/Billy Gets Lost.mp3"
      },
      {
        "title": "Bonk's Bad Dream",
        "audio": "/media/raz/G/Bonk's Bad Dream.mp3"
      },
      {
        "title": "Bonk's Loose Tooth",
        "audio": "/media/raz/G/Bonk's Loose Tooth.mp3"
      },
      {
        "title": "Caring for Your Dog",
        "audio": "/media/raz/G/Caring for Your Dog.mp3"
      },
      {
        "title": "Carlos Joins the Team",
        "audio": "/media/raz/G/Carlos Joins the Team.mp3"
      },
      {
        "title": "Chess",
        "audio": "/media/raz/G/Chess.mp3"
      },
      {
        "title": "Dogs at Work",
        "audio": "/media/raz/G/Dogs at Work.mp3"
      },
      {
        "title": "Fire Safety",
        "audio": "/media/raz/G/Fire Safety.mp3"
      },
      {
        "title": "Going to the Dentist",
        "audio": "/media/raz/G/Going to the Dentist.mp3"
      },
      {
        "title": "Gordon Finds His Way",
        "audio": "/media/raz/G/Gordon Finds His Way.mp3"
      },
      {
        "title": "Groundhog Goes Outside",
        "audio": "/media/raz/G/Groundhog Goes Outside.mp3"
      },
      {
        "title": "Grow Tomatoes in Six Steps",
        "audio": "/media/raz/G/Grow Tomatoes in Six Steps.mp3"
      },
      {
        "title": "How Many Rhymes",
        "audio": "/media/raz/G/How Many Rhymes.mp3"
      },
      {
        "title": "I Bet I Can",
        "audio": "/media/raz/G/I Bet I Can.mp3"
      },
      {
        "title": "Laws for Kids",
        "audio": "/media/raz/G/Laws for Kids.mp3"
      },
      {
        "title": "Let's Go to the Circus!",
        "audio": "/media/raz/G/Let's Go to the Circus!.mp3"
      },
      {
        "title": "Long Ago and Today",
        "audio": "/media/raz/G/Long Ago and Today.mp3"
      },
      {
        "title": "Loose Tooth",
        "audio": "/media/raz/G/Loose Tooth.mp3"
      },
      {
        "title": "Maria Joins the Team",
        "audio": "/media/raz/G/Maria Joins the Team.mp3"
      },
      {
        "title": "Monster Halloween",
        "audio": "/media/raz/G/Monster Halloween.mp3"
      },
      {
        "title": "Monsters' Stormy Day",
        "audio": "/media/raz/G/Monsters' Stormy Day.mp3"
      },
      {
        "title": "My Day",
        "audio": "/media/raz/G/My Day.mp3"
      },
      {
        "title": "New Rule!",
        "audio": "/media/raz/G/New Rule!.mp3"
      },
      {
        "title": "Pedro's Burro",
        "audio": "/media/raz/G/Pedro's Burro.mp3"
      },
      {
        "title": "Penny the Rude Penguin",
        "audio": "/media/raz/G/Penny the Rude Penguin.mp3"
      },
      {
        "title": "Places People Live",
        "audio": "/media/raz/G/Places People Live.mp3"
      },
      {
        "title": "Ready- Set- Bike!",
        "audio": "/media/raz/G/Ready- Set- Bike!.mp3"
      },
      {
        "title": "Rock Hunting",
        "audio": "/media/raz/G/Rock Hunting.mp3"
      },
      {
        "title": "Rude Robot",
        "audio": "/media/raz/G/Rude Robot.mp3"
      },
      {
        "title": "Signs Are Everywhere",
        "audio": "/media/raz/G/Signs Are Everywhere.mp3"
      },
      {
        "title": "Stars and Stripes",
        "audio": "/media/raz/G/Stars and Stripes.mp3"
      },
      {
        "title": "The Camel and the Pig",
        "audio": "/media/raz/G/The Camel and the Pig.mp3"
      },
      {
        "title": "The Chase",
        "audio": "/media/raz/G/The Chase.mp3"
      },
      {
        "title": "The Food We Eat",
        "audio": "/media/raz/G/The Food We Eat.mp3"
      },
      {
        "title": "The Legend of Nian",
        "audio": "/media/raz/G/The Legend of Nian.mp3"
      },
      {
        "title": "The Little Red Hen",
        "audio": "/media/raz/G/The Little Red Hen.mp3"
      },
      {
        "title": "The Queen Ant's Birthday",
        "audio": "/media/raz/G/The Queen Ant's Birthday.mp3"
      },
      {
        "title": "The Spider's Web",
        "audio": "/media/raz/G/The Spider's Web.mp3"
      },
      {
        "title": "This Is a Bird",
        "audio": "/media/raz/G/This Is a Bird.mp3"
      },
      {
        "title": "Time of Day",
        "audio": "/media/raz/G/Time of Day.mp3"
      },
      {
        "title": "Troll Bridge",
        "audio": "/media/raz/G/Troll Bridge.mp3"
      },
      {
        "title": "What in the World Is That",
        "audio": "/media/raz/G/What in the World Is That.mp3"
      },
      {
        "title": "Whose Eggs Are These",
        "audio": "/media/raz/G/Whose Eggs Are These.mp3"
      },
      {
        "title": "Why Do Leaves Change Color",
        "audio": "/media/raz/G/Why Do Leaves Change Color.mp3"
      },
      {
        "title": "Wiggly Worms",
        "audio": "/media/raz/G/Wiggly Worms.mp3"
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
        "audio": "/media/raz/H/A Desert Counting Book.mp3"
      },
      {
        "title": "A Monster Fish Tale",
        "audio": "/media/raz/H/A Monster Fish Tale.mp3"
      },
      {
        "title": "Animals- Animals",
        "audio": "/media/raz/H/Animals- Animals.mp3"
      },
      {
        "title": "Anna and the Dancing Goose",
        "audio": "/media/raz/H/Anna and the Dancing Goose.mp3"
      },
      {
        "title": "At a Touch Tank",
        "audio": "/media/raz/H/At a Touch Tank.mp3"
      },
      {
        "title": "Blackbeard the Pirate",
        "audio": "/media/raz/H/Blackbeard the Pirate.mp3"
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
        "audio": "/media/raz/H/Carlos's First Thanksgiving.mp3"
      },
      {
        "title": "Club Monster",
        "audio": "/media/raz/H/Club Monster.mp3"
      },
      {
        "title": "Cool as a Cuke",
        "audio": "/media/raz/H/Cool as a Cuke.mp3"
      },
      {
        "title": "Dr. King's Memorial",
        "audio": "/media/raz/H/Dr. King's Memorial.mp3"
      },
      {
        "title": "Earth's Water",
        "audio": "/media/raz/H/Earth's Water.mp3"
      },
      {
        "title": "Friends Around the World",
        "audio": "/media/raz/H/Friends Around the World.mp3"
      },
      {
        "title": "Goats Are Great!",
        "audio": "/media/raz/H/Goats Are Great!.mp3"
      },
      {
        "title": "Grasshopper's Gross Lunch",
        "audio": "/media/raz/H/Grasshopper's Gross Lunch.mp3"
      },
      {
        "title": "Grounded to Earth",
        "audio": "/media/raz/H/Grounded to Earth.mp3"
      },
      {
        "title": "How the Mice Beat the Men",
        "audio": "/media/raz/H/How the Mice Beat the Men.mp3"
      },
      {
        "title": "How to Make a Drum",
        "audio": "/media/raz/H/How to Make a Drum.mp3"
      },
      {
        "title": "I Live in the City",
        "audio": "/media/raz/H/I Live in the City.mp3"
      },
      {
        "title": "I'd Like To Be",
        "audio": "/media/raz/H/I'd Like To Be.mp3"
      },
      {
        "title": "Legs- Wings- Fins- and Flippers",
        "audio": "/media/raz/H/Legs- Wings- Fins- and Flippers.mp3"
      },
      {
        "title": "Maria's Thanksgiving",
        "audio": "/media/raz/H/Maria's Thanksgiving.mp3"
      },
      {
        "title": "Math Test Mix-Up",
        "audio": "/media/raz/H/Math Test Mix-Up.mp3"
      },
      {
        "title": "Monsters on Wheels",
        "audio": "/media/raz/H/Monsters on Wheels.mp3"
      },
      {
        "title": "Moose on the Move",
        "audio": "/media/raz/H/Moose on the Move.mp3"
      },
      {
        "title": "Nami's Gifts",
        "audio": "/media/raz/H/Nami's Gifts.mp3"
      },
      {
        "title": "Our Five Senses",
        "audio": "/media/raz/H/Our Five Senses.mp3"
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
        "audio": "/media/raz/H/Pocket Parks.mp3"
      },
      {
        "title": "Police Officers",
        "audio": "/media/raz/H/Police Officers.mp3"
      },
      {
        "title": "Sam's Fourth of July",
        "audio": "/media/raz/H/Sam's Fourth of July.mp3"
      },
      {
        "title": "Ships and Boats",
        "audio": "/media/raz/H/Ships and Boats.mp3"
      },
      {
        "title": "Smaller and Smaller",
        "audio": "/media/raz/H/Smaller and Smaller.mp3"
      },
      {
        "title": "Spring Is Here",
        "audio": "/media/raz/H/Spring Is Here.mp3"
      },
      {
        "title": "Statues in the Ice",
        "audio": "/media/raz/H/Statues in the Ice.mp3"
      },
      {
        "title": "Statues in the Sand",
        "audio": "/media/raz/H/Statues in the Sand.mp3"
      },
      {
        "title": "Summer Olympics Events",
        "audio": "/media/raz/H/Summer Olympics Events.mp3"
      },
      {
        "title": "Tag-Along Goat",
        "audio": "/media/raz/H/Tag-Along Goat.mp3"
      },
      {
        "title": "Terell's Taste Buds",
        "audio": "/media/raz/H/Terell's Taste Buds.mp3"
      },
      {
        "title": "The Butterfly Life Cycle",
        "audio": "/media/raz/H/The Butterfly Life Cycle.mp3"
      },
      {
        "title": "The Day I Needed Help",
        "audio": "/media/raz/H/The Day I Needed Help.mp3"
      },
      {
        "title": "The Goat and the Singing Wolf",
        "audio": "/media/raz/H/The Goat and the Singing Wolf.mp3"
      },
      {
        "title": "The Owl and the Pussycat",
        "audio": "/media/raz/H/The Owl and the Pussycat.mp3"
      },
      {
        "title": "Weird Bird Beaks",
        "audio": "/media/raz/H/Weird Bird Beaks.mp3"
      },
      {
        "title": "What Lives in This Hole",
        "audio": "/media/raz/H/What Lives in This Hole.mp3"
      },
      {
        "title": "Wing's Visit to Singapore",
        "audio": "/media/raz/H/Wing's Visit to Singapore.mp3"
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
        "audio": "/media/raz/I/A Broken Leg for Bonk.mp3"
      },
      {
        "title": "A Pocket Park for Tiny",
        "audio": "/media/raz/I/A Pocket Park for Tiny.mp3"
      },
      {
        "title": "A Visit to the Zoo",
        "audio": "/media/raz/I/A Visit to the Zoo.mp3"
      },
      {
        "title": "Alistair's Night",
        "audio": "/media/raz/I/Alistair's Night.mp3"
      },
      {
        "title": "Amazing Beaches",
        "audio": "/media/raz/I/Amazing Beaches.mp3"
      },
      {
        "title": "Arthur's Bad News Day",
        "audio": "/media/raz/I/Arthur's Bad News Day.mp3"
      },
      {
        "title": "Bigger Than a Monster Truck",
        "audio": "/media/raz/I/Bigger Than a Monster Truck.mp3"
      },
      {
        "title": "Birds",
        "audio": "/media/raz/I/Birds.mp3"
      },
      {
        "title": "Bonk and the Big Splash",
        "audio": "/media/raz/I/Bonk and the Big Splash.mp3"
      },
      {
        "title": "Bonk and the Lucky Buckeye",
        "audio": "/media/raz/I/Bonk and the Lucky Buckeye.mp3"
      },
      {
        "title": "Building a Bridge",
        "audio": "/media/raz/I/Building a Bridge.mp3"
      },
      {
        "title": "Camping with Bonk",
        "audio": "/media/raz/I/Camping with Bonk.mp3"
      },
      {
        "title": "Childhood Stories of George Washington",
        "audio": "/media/raz/I/Childhood Stories of George Washington.mp3"
      },
      {
        "title": "Discovering Dinosaurs",
        "audio": "/media/raz/I/Discovering Dinosaurs.mp3"
      },
      {
        "title": "Extreme Insects",
        "audio": "/media/raz/I/Extreme Insects.mp3"
      },
      {
        "title": "Families",
        "audio": "/media/raz/I/Families.mp3"
      },
      {
        "title": "Fantastic Flying Machines",
        "audio": "/media/raz/I/Fantastic Flying Machines.mp3"
      },
      {
        "title": "Fast and Faster",
        "audio": "/media/raz/I/Fast and Faster.mp3"
      },
      {
        "title": "Goldilocks and the Other Three Bears",
        "audio": "/media/raz/I/Goldilocks and the Other Three Bears.mp3"
      },
      {
        "title": "Goldilocks and the Three Bears",
        "audio": "/media/raz/I/Goldilocks and the Three Bears.mp3"
      },
      {
        "title": "Healthy Me",
        "audio": "/media/raz/I/Healthy Me.mp3"
      },
      {
        "title": "Hibernation",
        "audio": "/media/raz/I/Hibernation.mp3"
      },
      {
        "title": "Hippo's Toothache",
        "audio": "/media/raz/I/Hippo's Toothache.mp3"
      },
      {
        "title": "How Glooskap Found Summer",
        "audio": "/media/raz/I/How Glooskap Found Summer.mp3"
      },
      {
        "title": "How to Make Paper",
        "audio": "/media/raz/I/How to Make Paper.mp3"
      },
      {
        "title": "Is That a Fish",
        "audio": "/media/raz/I/Is That a Fish.mp3"
      },
      {
        "title": "Jane Goodall",
        "audio": "/media/raz/I/Jane Goodall.mp3"
      },
      {
        "title": "Life at the Pond",
        "audio": "/media/raz/I/Life at the Pond.mp3"
      },
      {
        "title": "Lincoln Loved to Learn",
        "audio": "/media/raz/I/Lincoln Loved to Learn.mp3"
      },
      {
        "title": "Mike's Good Bad Day",
        "audio": "/media/raz/I/Mike's Good Bad Day.mp3"
      },
      {
        "title": "Monster Moving Day",
        "audio": "/media/raz/I/Monster Moving Day.mp3"
      },
      {
        "title": "Monster Music",
        "audio": "/media/raz/I/Monster Music.mp3"
      },
      {
        "title": "Monster Snow Day",
        "audio": "/media/raz/I/Monster Snow Day.mp3"
      },
      {
        "title": "Monster Soccer",
        "audio": "/media/raz/I/Monster Soccer.mp3"
      },
      {
        "title": "Owls Overhead",
        "audio": "/media/raz/I/Owls Overhead.mp3"
      },
      {
        "title": "Roadside Oddities",
        "audio": "/media/raz/I/Roadside Oddities.mp3"
      },
      {
        "title": "Ruby Bridges",
        "audio": "/media/raz/I/Ruby Bridges.mp3"
      },
      {
        "title": "Slow and Slower",
        "audio": "/media/raz/I/Slow and Slower.mp3"
      },
      {
        "title": "Soup and a Sandwish",
        "audio": "/media/raz/I/Soup and a Sandwish.mp3"
      },
      {
        "title": "The 100th Day Project",
        "audio": "/media/raz/I/The 100th Day Project.mp3"
      },
      {
        "title": "The Magic Bike",
        "audio": "/media/raz/I/The Magic Bike.mp3"
      },
      {
        "title": "The Monster Pumpkins",
        "audio": "/media/raz/I/The Monster Pumpkins.mp3"
      },
      {
        "title": "The Three Little Pigs",
        "audio": "/media/raz/I/The Three Little Pigs.mp3"
      },
      {
        "title": "Tian Tian- a Giant Panda",
        "audio": "/media/raz/I/Tian Tian- a Giant Panda.mp3"
      },
      {
        "title": "Turkeys in the Trees",
        "audio": "/media/raz/I/Turkeys in the Trees.mp3"
      },
      {
        "title": "We Make Maple Syrup",
        "audio": "/media/raz/I/We Make Maple Syrup.mp3"
      },
      {
        "title": "Why Robins Hop",
        "audio": "/media/raz/I/Why Robins Hop.mp3"
      },
      {
        "title": "Winter Vacation",
        "audio": "/media/raz/I/Winter Vacation.mp3"
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
        "audio": "/media/raz/J/A Rainbow of Food.mp3"
      },
      {
        "title": "Animal Skeletons",
        "audio": "/media/raz/J/Animal Skeletons.mp3"
      },
      {
        "title": "Being Bilingual",
        "audio": "/media/raz/J/Being Bilingual.mp3"
      },
      {
        "title": "Bonk at the Barbershop",
        "audio": "/media/raz/J/Bonk at the Barbershop.mp3"
      },
      {
        "title": "Bonk's New Bike",
        "audio": "/media/raz/J/Bonk's New Bike.mp3"
      },
      {
        "title": "Bonk- the Healthy Monster",
        "audio": "/media/raz/J/Bonk- the Healthy Monster.mp3"
      },
      {
        "title": "Brazil",
        "audio": "/media/raz/J/Brazil.mp3"
      },
      {
        "title": "Broken Arm Blues",
        "audio": "/media/raz/J/Broken Arm Blues.mp3"
      },
      {
        "title": "Can You Say Pterodactyl",
        "audio": "/media/raz/J/Can You Say Pterodactyl.mp3"
      },
      {
        "title": "Changes",
        "audio": "/media/raz/J/Changes.mp3"
      },
      {
        "title": "Darby's Birthday Party",
        "audio": "/media/raz/J/Darby's Birthday Party.mp3"
      },
      {
        "title": "Egypt",
        "audio": "/media/raz/J/Egypt.mp3"
      },
      {
        "title": "Feliz Navidad- Carlos!",
        "audio": "/media/raz/J/Feliz Navidad- Carlos!.mp3"
      },
      {
        "title": "Firefighters",
        "audio": "/media/raz/J/Firefighters.mp3"
      },
      {
        "title": "Garrett Morgan and the Traffic Signal",
        "audio": "/media/raz/J/Garrett Morgan and the Traffic Signal.mp3"
      },
      {
        "title": "Going to the Art Museum",
        "audio": "/media/raz/J/Going to the Art Museum.mp3"
      },
      {
        "title": "Guess That President",
        "audio": "/media/raz/J/Guess That President.mp3"
      },
      {
        "title": "Hannah's Townspeople",
        "audio": "/media/raz/J/Hannah's Townspeople.mp3"
      },
      {
        "title": "Heroes of September 11",
        "audio": "/media/raz/J/Heroes of September 11.mp3"
      },
      {
        "title": "I Broke It",
        "audio": "/media/raz/J/I Broke It.mp3"
      },
      {
        "title": "I'm the Tall One",
        "audio": "/media/raz/J/I'm the Tall One.mp3"
      },
      {
        "title": "Ichiro Suzuki",
        "audio": "/media/raz/J/Ichiro Suzuki.mp3"
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
        "audio": "/media/raz/J/Mexico.mp3"
      },
      {
        "title": "Monkey and Crocodile",
        "audio": "/media/raz/J/Monkey and Crocodile.mp3"
      },
      {
        "title": "Monster Cowboy",
        "audio": "/media/raz/J/Monster Cowboy.mp3"
      },
      {
        "title": "My Uncle Is a Firefighter",
        "audio": "/media/raz/J/My Uncle Is a Firefighter.mp3"
      },
      {
        "title": "Number Twelve",
        "audio": "/media/raz/J/Number Twelve.mp3"
      },
      {
        "title": "Ocean Animals",
        "audio": "/media/raz/J/Ocean Animals.mp3"
      },
      {
        "title": "Riding With Rosa Parks",
        "audio": "/media/raz/J/Riding With Rosa Parks.mp3"
      },
      {
        "title": "Safe Biking with Dad",
        "audio": "/media/raz/J/Safe Biking with Dad.mp3"
      },
      {
        "title": "Sharks",
        "audio": "/media/raz/J/Sharks.mp3"
      },
      {
        "title": "The Cinnamon Bun Mystery",
        "audio": "/media/raz/J/The Cinnamon Bun Mystery.mp3"
      },
      {
        "title": "The Creature Constitution",
        "audio": "/media/raz/J/The Creature Constitution.mp3"
      },
      {
        "title": "The Disappearing Moon",
        "audio": "/media/raz/J/The Disappearing Moon.mp3"
      },
      {
        "title": "The Ship of Shapes",
        "audio": "/media/raz/J/The Ship of Shapes.mp3"
      },
      {
        "title": "The Story of the Statue",
        "audio": "/media/raz/J/The Story of the Statue.mp3"
      },
      {
        "title": "The Thanksgiving the Jacks Built",
        "audio": "/media/raz/J/The Thanksgiving the Jacks Built.mp3"
      },
      {
        "title": "The Thanksgiving the Other Jacks Built",
        "audio": "/media/raz/J/The Thanksgiving the Other Jacks Built.mp3"
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
        "audio": "/media/raz/J/What Pet Should You Get.mp3"
      },
      {
        "title": "When Bad Things Happen",
        "audio": "/media/raz/J/When Bad Things Happen.mp3"
      },
      {
        "title": "Where's the Joey",
        "audio": "/media/raz/J/Where's the Joey.mp3"
      },
      {
        "title": "Whose Tracks Are These",
        "audio": "/media/raz/J/Whose Tracks Are These.mp3"
      },
      {
        "title": "Why Do Leaves Change Color",
        "audio": "/media/raz/J/Why Do Leaves Change Color.mp3"
      },
      {
        "title": "Why I'm Late Today",
        "audio": "/media/raz/J/Why I'm Late Today.mp3"
      },
      {
        "title": "Wiggly Worms",
        "audio": "/media/raz/J/Wiggly Worms.mp3"
      },
      {
        "title": "Wonders of Nature",
        "audio": "/media/raz/J/Wonders of Nature.mp3"
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
        "audio": "/media/raz/K/All About Kites.mp3"
      },
      {
        "title": "Animals- Animals",
        "audio": "/media/raz/K/Animals- Animals.mp3"
      },
      {
        "title": "Anna and the Magic Coat",
        "audio": "/media/raz/K/Anna and the Magic Coat.mp3"
      },
      {
        "title": "Barack Obama",
        "audio": "/media/raz/K/Barack Obama.mp3"
      },
      {
        "title": "Blackbeard the Pirate",
        "audio": "/media/raz/K/Blackbeard the Pirate.mp3"
      },
      {
        "title": "Carlos's Family Celebration",
        "audio": "/media/raz/K/Carlos's Family Celebration.mp3"
      },
      {
        "title": "Chickens in My Backyard",
        "audio": "/media/raz/K/Chickens in My Backyard.mp3"
      },
      {
        "title": "Community Government",
        "audio": "/media/raz/K/Community Government.mp3"
      },
      {
        "title": "Día de los Muertos",
        "audio": "/media/raz/K/Día de los Muertos.mp3"
      },
      {
        "title": "Extreme Animals",
        "audio": "/media/raz/K/Extreme Animals.mp3"
      },
      {
        "title": "Fishing in the Rain",
        "audio": "/media/raz/K/Fishing in the Rain.mp3"
      },
      {
        "title": "Flying Kites",
        "audio": "/media/raz/K/Flying Kites.mp3"
      },
      {
        "title": "France",
        "audio": "/media/raz/K/France.mp3"
      },
      {
        "title": "Friends Around the World",
        "audio": "/media/raz/K/Friends Around the World.mp3"
      },
      {
        "title": "Good for Thurgood!",
        "audio": "/media/raz/K/Good for Thurgood!.mp3"
      },
      {
        "title": "Grounded to Earth",
        "audio": "/media/raz/K/Grounded to Earth.mp3"
      },
      {
        "title": "How Glooskap Found Summer",
        "audio": "/media/raz/K/How Glooskap Found Summer.mp3"
      },
      {
        "title": "How Zebras Got Their Stripes",
        "audio": "/media/raz/K/How Zebras Got Their Stripes.mp3"
      },
      {
        "title": "Hugs for Daddy",
        "audio": "/media/raz/K/Hugs for Daddy.mp3"
      },
      {
        "title": "I Fly Hot-Air Balloons",
        "audio": "/media/raz/K/I Fly Hot-Air Balloons.mp3"
      },
      {
        "title": "I Love City Parks",
        "audio": "/media/raz/K/I Love City Parks.mp3"
      },
      {
        "title": "I'd Like To Be",
        "audio": "/media/raz/K/I'd Like To Be.mp3"
      },
      {
        "title": "I'm Allergic to Peanuts",
        "audio": "/media/raz/K/I'm Allergic to Peanuts.mp3"
      },
      {
        "title": "India",
        "audio": "/media/raz/K/India.mp3"
      },
      {
        "title": "It's About Time",
        "audio": "/media/raz/K/It's About Time.mp3"
      },
      {
        "title": "Japan",
        "audio": "/media/raz/K/Japan.mp3"
      },
      {
        "title": "Leap! A Salmon's Story",
        "audio": "/media/raz/K/Leap! A Salmon's Story.mp3"
      },
      {
        "title": "Maria's Family Celebration",
        "audio": "/media/raz/K/Maria's Family Celebration.mp3"
      },
      {
        "title": "Migrating Geese",
        "audio": "/media/raz/K/Migrating Geese.mp3"
      },
      {
        "title": "New Planet- New School",
        "audio": "/media/raz/K/New Planet- New School.mp3"
      },
      {
        "title": "Playing It Safe",
        "audio": "/media/raz/K/Playing It Safe.mp3"
      },
      {
        "title": "Police Officers",
        "audio": "/media/raz/K/Police Officers.mp3"
      },
      {
        "title": "Ratty Rats",
        "audio": "/media/raz/K/Ratty Rats.mp3"
      },
      {
        "title": "Sam's Fourth of July",
        "audio": "/media/raz/K/Sam's Fourth of July.mp3"
      },
      {
        "title": "Ships and Boats",
        "audio": "/media/raz/K/Ships and Boats.mp3"
      },
      {
        "title": "Simple Machines",
        "audio": "/media/raz/K/Simple Machines.mp3"
      },
      {
        "title": "Slithery and Slimy",
        "audio": "/media/raz/K/Slithery and Slimy.mp3"
      },
      {
        "title": "Soccer Is a Kick!",
        "audio": "/media/raz/K/Soccer Is a Kick!.mp3"
      },
      {
        "title": "Soggy Stepsisters",
        "audio": "/media/raz/K/Soggy Stepsisters.mp3"
      },
      {
        "title": "Strange Plants",
        "audio": "/media/raz/K/Strange Plants.mp3"
      },
      {
        "title": "Summer Olympics Events",
        "audio": "/media/raz/K/Summer Olympics Events.mp3"
      },
      {
        "title": "Tarantula!",
        "audio": "/media/raz/K/Tarantula!.mp3"
      },
      {
        "title": "The Mind Game",
        "audio": "/media/raz/K/The Mind Game.mp3"
      },
      {
        "title": "The Squire's Bride",
        "audio": "/media/raz/K/The Squire's Bride.mp3"
      },
      {
        "title": "To the Circus",
        "audio": "/media/raz/K/To the Circus.mp3"
      },
      {
        "title": "To the Pumpkin Patch",
        "audio": "/media/raz/K/To the Pumpkin Patch.mp3"
      },
      {
        "title": "What Lives in This Hole",
        "audio": "/media/raz/K/What Lives in This Hole.mp3"
      },
      {
        "title": "Where We Get Energy",
        "audio": "/media/raz/K/Where We Get Energy.mp3"
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
        "audio": "/media/raz/L/A Hero's Name.mp3"
      },
      {
        "title": "Ancient Egypt",
        "audio": "/media/raz/L/Ancient Egypt.mp3"
      },
      {
        "title": "Anna and the Painted Eggs",
        "audio": "/media/raz/L/Anna and the Painted Eggs.mp3"
      },
      {
        "title": "At Jacob's House",
        "audio": "/media/raz/L/At Jacob's House.mp3"
      },
      {
        "title": "Big Machines",
        "audio": "/media/raz/L/Big Machines.mp3"
      },
      {
        "title": "Bigger Than a Monster Truck",
        "audio": "/media/raz/L/Bigger Than a Monster Truck.mp3"
      },
      {
        "title": "Catching Santa",
        "audio": "/media/raz/L/Catching Santa.mp3"
      },
      {
        "title": "China",
        "audio": "/media/raz/L/China.mp3"
      },
      {
        "title": "Colonial Life",
        "audio": "/media/raz/L/Colonial Life.mp3"
      },
      {
        "title": "Crocs and Gators",
        "audio": "/media/raz/L/Crocs and Gators.mp3"
      },
      {
        "title": "Deep in the Ocean",
        "audio": "/media/raz/L/Deep in the Ocean.mp3"
      },
      {
        "title": "Diabetes and Me",
        "audio": "/media/raz/L/Diabetes and Me.mp3"
      },
      {
        "title": "Eggy's Easy Out",
        "audio": "/media/raz/L/Eggy's Easy Out.mp3"
      },
      {
        "title": "Every Dog Has Its Day",
        "audio": "/media/raz/L/Every Dog Has Its Day.mp3"
      },
      {
        "title": "Fantastic Flying Machines",
        "audio": "/media/raz/L/Fantastic Flying Machines.mp3"
      },
      {
        "title": "George Washington Carver",
        "audio": "/media/raz/L/George Washington Carver.mp3"
      },
      {
        "title": "Goldilocks and the Other Three Bears",
        "audio": "/media/raz/L/Goldilocks and the Other Three Bears.mp3"
      },
      {
        "title": "Goldilocks and the Three Bears",
        "audio": "/media/raz/L/Goldilocks and the Three Bears.mp3"
      },
      {
        "title": "How Animals Sleep",
        "audio": "/media/raz/L/How Animals Sleep.mp3"
      },
      {
        "title": "How We Measure",
        "audio": "/media/raz/L/How We Measure.mp3"
      },
      {
        "title": "How to Make Ice Cream",
        "audio": "/media/raz/L/How to Make Ice Cream.mp3"
      },
      {
        "title": "I'm the Guest",
        "audio": "/media/raz/L/I'm the Guest.mp3"
      },
      {
        "title": "Independence Day",
        "audio": "/media/raz/L/Independence Day.mp3"
      },
      {
        "title": "Insect Life Cycle",
        "audio": "/media/raz/L/Insect Life Cycle.mp3"
      },
      {
        "title": "Introducing Planet Earth",
        "audio": "/media/raz/L/Introducing Planet Earth.mp3"
      },
      {
        "title": "Jane Goodall",
        "audio": "/media/raz/L/Jane Goodall.mp3"
      },
      {
        "title": "Jessica Loves Soccer",
        "audio": "/media/raz/L/Jessica Loves Soccer.mp3"
      },
      {
        "title": "Joey's Stop Sign",
        "audio": "/media/raz/L/Joey's Stop Sign.mp3"
      },
      {
        "title": "Kenya",
        "audio": "/media/raz/L/Kenya.mp3"
      },
      {
        "title": "Maria's Family Christmas",
        "audio": "/media/raz/L/Maria's Family Christmas.mp3"
      },
      {
        "title": "Noise in the Night",
        "audio": "/media/raz/L/Noise in the Night.mp3"
      },
      {
        "title": "Oil- A Messy Resource",
        "audio": "/media/raz/L/Oil- A Messy Resource.mp3"
      },
      {
        "title": "Owls Overhead",
        "audio": "/media/raz/L/Owls Overhead.mp3"
      },
      {
        "title": "Plant Defenses",
        "audio": "/media/raz/L/Plant Defenses.mp3"
      },
      {
        "title": "Roadside Oddities",
        "audio": "/media/raz/L/Roadside Oddities.mp3"
      },
      {
        "title": "Sending Messages",
        "audio": "/media/raz/L/Sending Messages.mp3"
      },
      {
        "title": "Shoes Around the World",
        "audio": "/media/raz/L/Shoes Around the World.mp3"
      },
      {
        "title": "Sign Language and Hand Talk",
        "audio": "/media/raz/L/Sign Language and Hand Talk.mp3"
      },
      {
        "title": "Smelly Clyde",
        "audio": "/media/raz/L/Smelly Clyde.mp3"
      },
      {
        "title": "The 100th Day Project",
        "audio": "/media/raz/L/The 100th Day Project.mp3"
      },
      {
        "title": "The Igloo",
        "audio": "/media/raz/L/The Igloo.mp3"
      },
      {
        "title": "The Power of Magnets",
        "audio": "/media/raz/L/The Power of Magnets.mp3"
      },
      {
        "title": "The Tinosaur",
        "audio": "/media/raz/L/The Tinosaur.mp3"
      },
      {
        "title": "Two Thanksgivings",
        "audio": "/media/raz/L/Two Thanksgivings.mp3"
      },
      {
        "title": "Valentine's Day",
        "audio": "/media/raz/L/Valentine's Day.mp3"
      },
      {
        "title": "Vampire Dentist",
        "audio": "/media/raz/L/Vampire Dentist.mp3"
      },
      {
        "title": "Wonderful Winter",
        "audio": "/media/raz/L/Wonderful Winter.mp3"
      },
      {
        "title": "Woods of Wonder",
        "audio": "/media/raz/L/Woods of Wonder.mp3"
      },
      {
        "title": "World Holidays",
        "audio": "/media/raz/L/World Holidays.mp3"
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
        "audio": "/media/raz/M/A Man of Vision.mp3"
      },
      {
        "title": "A Prairie Dog's Life",
        "audio": "/media/raz/M/A Prairie Dog's Life.mp3"
      },
      {
        "title": "Aesop's Fables",
        "audio": "/media/raz/M/Aesop's Fables.mp3"
      },
      {
        "title": "Art Around Us",
        "audio": "/media/raz/M/Art Around Us.mp3"
      },
      {
        "title": "Arthur's Bad News Day",
        "audio": "/media/raz/M/Arthur's Bad News Day.mp3"
      },
      {
        "title": "Brad Needs a Budget",
        "audio": "/media/raz/M/Brad Needs a Budget.mp3"
      },
      {
        "title": "Can I Vote",
        "audio": "/media/raz/M/Can I Vote.mp3"
      },
      {
        "title": "Dogs at Work",
        "audio": "/media/raz/M/Dogs at Work.mp3"
      },
      {
        "title": "Endangered Birds",
        "audio": "/media/raz/M/Endangered Birds.mp3"
      },
      {
        "title": "Firefighters",
        "audio": "/media/raz/M/Firefighters.mp3"
      },
      {
        "title": "Frogs and Toads",
        "audio": "/media/raz/M/Frogs and Toads.mp3"
      },
      {
        "title": "Giant's Tale",
        "audio": "/media/raz/M/Giant's Tale.mp3"
      },
      {
        "title": "Hermit Crabs",
        "audio": "/media/raz/M/Hermit Crabs.mp3"
      },
      {
        "title": "Hibernation",
        "audio": "/media/raz/M/Hibernation.mp3"
      },
      {
        "title": "History of the Bicycle",
        "audio": "/media/raz/M/History of the Bicycle.mp3"
      },
      {
        "title": "How Much Is a Trillion",
        "audio": "/media/raz/M/How Much Is a Trillion.mp3"
      },
      {
        "title": "How to Make Lemonade",
        "audio": "/media/raz/M/How to Make Lemonade.mp3"
      },
      {
        "title": "Ichiro Suzuki",
        "audio": "/media/raz/M/Ichiro Suzuki.mp3"
      },
      {
        "title": "Inside Your Body",
        "audio": "/media/raz/M/Inside Your Body.mp3"
      },
      {
        "title": "Jack's Tale",
        "audio": "/media/raz/M/Jack's Tale.mp3"
      },
      {
        "title": "Keb Needs a Home",
        "audio": "/media/raz/M/Keb Needs a Home.mp3"
      },
      {
        "title": "Marcus Loses Patches",
        "audio": "/media/raz/M/Marcus Loses Patches.mp3"
      },
      {
        "title": "Martin Luther King Jr.",
        "audio": "/media/raz/M/Martin Luther King Jr..mp3"
      },
      {
        "title": "Mighty Glaciers",
        "audio": "/media/raz/M/Mighty Glaciers.mp3"
      },
      {
        "title": "Mother Teresa- Mother to Many",
        "audio": "/media/raz/M/Mother Teresa- Mother to Many.mp3"
      },
      {
        "title": "My Uncle Is a Firefighter",
        "audio": "/media/raz/M/My Uncle Is a Firefighter.mp3"
      },
      {
        "title": "Parrots",
        "audio": "/media/raz/M/Parrots.mp3"
      },
      {
        "title": "Sharks",
        "audio": "/media/raz/M/Sharks.mp3"
      },
      {
        "title": "Snow Camping",
        "audio": "/media/raz/M/Snow Camping.mp3"
      },
      {
        "title": "Sound All Around",
        "audio": "/media/raz/M/Sound All Around.mp3"
      },
      {
        "title": "Story of the Sun",
        "audio": "/media/raz/M/Story of the Sun.mp3"
      },
      {
        "title": "The Best Guess",
        "audio": "/media/raz/M/The Best Guess.mp3"
      },
      {
        "title": "The Creature Constitution",
        "audio": "/media/raz/M/The Creature Constitution.mp3"
      },
      {
        "title": "The Day Before Thanksgiving",
        "audio": "/media/raz/M/The Day Before Thanksgiving.mp3"
      },
      {
        "title": "The Hoppers Start School",
        "audio": "/media/raz/M/The Hoppers Start School.mp3"
      },
      {
        "title": "The Legend of John Henry",
        "audio": "/media/raz/M/The Legend of John Henry.mp3"
      },
      {
        "title": "The Sleeping Dog",
        "audio": "/media/raz/M/The Sleeping Dog.mp3"
      },
      {
        "title": "The Sometimes Friend",
        "audio": "/media/raz/M/The Sometimes Friend.mp3"
      },
      {
        "title": "The Story of Jeans",
        "audio": "/media/raz/M/The Story of Jeans.mp3"
      },
      {
        "title": "The Story of the Statue",
        "audio": "/media/raz/M/The Story of the Statue.mp3"
      },
      {
        "title": "The Three Little Pigs",
        "audio": "/media/raz/M/The Three Little Pigs.mp3"
      },
      {
        "title": "The Umbrella Trick",
        "audio": "/media/raz/M/The Umbrella Trick.mp3"
      },
      {
        "title": "Vacation Time!",
        "audio": "/media/raz/M/Vacation Time!.mp3"
      },
      {
        "title": "Voyagers in Space",
        "audio": "/media/raz/M/Voyagers in Space.mp3"
      },
      {
        "title": "Why Do Leaves Change Color",
        "audio": "/media/raz/M/Why Do Leaves Change Color.mp3"
      },
      {
        "title": "Wiggly Worms",
        "audio": "/media/raz/M/Wiggly Worms.mp3"
      },
      {
        "title": "Wild Horses",
        "audio": "/media/raz/M/Wild Horses.mp3"
      },
      {
        "title": "You Stink!",
        "audio": "/media/raz/M/You Stink!.mp3"
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
        "audio": "/media/raz/O/A Dog's Tale.mp3"
      },
      {
        "title": "All About Chocolate",
        "audio": "/media/raz/O/All About Chocolate.mp3"
      },
      {
        "title": "Anansi and the Talking Watermelon",
        "audio": "/media/raz/O/Anansi and the Talking Watermelon.mp3"
      },
      {
        "title": "Animal Discoveries",
        "audio": "/media/raz/O/Animal Discoveries.mp3"
      },
      {
        "title": "Annie Oakley",
        "audio": "/media/raz/O/Annie Oakley.mp3"
      },
      {
        "title": "Baltic Rescue",
        "audio": "/media/raz/O/Baltic Rescue.mp3"
      },
      {
        "title": "Barack Obama",
        "audio": "/media/raz/O/Barack Obama.mp3"
      },
      {
        "title": "Bats",
        "audio": "/media/raz/O/Bats.mp3"
      },
      {
        "title": "Bigger Than a Monster Truck",
        "audio": "/media/raz/O/Bigger Than a Monster Truck.mp3"
      },
      {
        "title": "Edible Bugs",
        "audio": "/media/raz/O/Edible Bugs.mp3"
      },
      {
        "title": "George Washington Carver",
        "audio": "/media/raz/O/George Washington Carver.mp3"
      },
      {
        "title": "Giant Pumpkins",
        "audio": "/media/raz/O/Giant Pumpkins.mp3"
      },
      {
        "title": "HeroRATs- Rats Who Save Lives",
        "audio": "/media/raz/O/HeroRATs- Rats Who Save Lives.mp3"
      },
      {
        "title": "Irma's Sandwich Shop",
        "audio": "/media/raz/O/Irma's Sandwich Shop.mp3"
      },
      {
        "title": "Jane Goodall",
        "audio": "/media/raz/O/Jane Goodall.mp3"
      },
      {
        "title": "Jenny Loves Yoga",
        "audio": "/media/raz/O/Jenny Loves Yoga.mp3"
      },
      {
        "title": "Johnny Appleseed Heads West",
        "audio": "/media/raz/O/Johnny Appleseed Heads West.mp3"
      },
      {
        "title": "Katie's Forest Finds",
        "audio": "/media/raz/O/Katie's Forest Finds.mp3"
      },
      {
        "title": "Li's Tangram Animals",
        "audio": "/media/raz/O/Li's Tangram Animals.mp3"
      },
      {
        "title": "Little Red's Secret Sauce",
        "audio": "/media/raz/O/Little Red's Secret Sauce.mp3"
      },
      {
        "title": "Looking for Bigfoot",
        "audio": "/media/raz/O/Looking for Bigfoot.mp3"
      },
      {
        "title": "Makusani's Lesson",
        "audio": "/media/raz/O/Makusani's Lesson.mp3"
      },
      {
        "title": "Meeting Father in Plymouth",
        "audio": "/media/raz/O/Meeting Father in Plymouth.mp3"
      },
      {
        "title": "Off to Join the Circus",
        "audio": "/media/raz/O/Off to Join the Circus.mp3"
      },
      {
        "title": "Owls Overhead",
        "audio": "/media/raz/O/Owls Overhead.mp3"
      },
      {
        "title": "Park Rangers",
        "audio": "/media/raz/O/Park Rangers.mp3"
      },
      {
        "title": "Paul Bunyan and Babe the Blue Ox",
        "audio": "/media/raz/O/Paul Bunyan and Babe the Blue Ox.mp3"
      },
      {
        "title": "Pecos Bill Rides a Tornado",
        "audio": "/media/raz/O/Pecos Bill Rides a Tornado.mp3"
      },
      {
        "title": "Pepper- The King of Spices",
        "audio": "/media/raz/O/Pepper- The King of Spices.mp3"
      },
      {
        "title": "Pluto's New Friends",
        "audio": "/media/raz/O/Pluto's New Friends.mp3"
      },
      {
        "title": "Rainy-Day Savings",
        "audio": "/media/raz/O/Rainy-Day Savings.mp3"
      },
      {
        "title": "Roadside Oddities",
        "audio": "/media/raz/O/Roadside Oddities.mp3"
      },
      {
        "title": "Sally Ride",
        "audio": "/media/raz/O/Sally Ride.mp3"
      },
      {
        "title": "Salt Rocks!",
        "audio": "/media/raz/O/Salt Rocks!.mp3"
      },
      {
        "title": "Saving the Last Wild Tigers",
        "audio": "/media/raz/O/Saving the Last Wild Tigers.mp3"
      },
      {
        "title": "Scotty's Spring Training",
        "audio": "/media/raz/O/Scotty's Spring Training.mp3"
      },
      {
        "title": "Spider Monkey's Question",
        "audio": "/media/raz/O/Spider Monkey's Question.mp3"
      },
      {
        "title": "Summer Olympics Legends",
        "audio": "/media/raz/O/Summer Olympics Legends.mp3"
      },
      {
        "title": "The Backpack Tax",
        "audio": "/media/raz/O/The Backpack Tax.mp3"
      },
      {
        "title": "The Beekeeper",
        "audio": "/media/raz/O/The Beekeeper.mp3"
      },
      {
        "title": "The Great Land Run",
        "audio": "/media/raz/O/The Great Land Run.mp3"
      },
      {
        "title": "The Magic of Migration",
        "audio": "/media/raz/O/The Magic of Migration.mp3"
      },
      {
        "title": "The Shadow People",
        "audio": "/media/raz/O/The Shadow People.mp3"
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
        "audio": "/media/raz/O/Whales.mp3"
      },
      {
        "title": "Wonders of Nature",
        "audio": "/media/raz/O/Wonders of Nature.mp3"
      },
      {
        "title": "Woods of Wonder",
        "audio": "/media/raz/O/Woods of Wonder.mp3"
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
        "audio": "/media/raz/P/A Golden Tragedy.mp3"
      },
      {
        "title": "A Late Night Chat with a Parakeet",
        "audio": "/media/raz/P/A Late Night Chat with a Parakeet.mp3"
      },
      {
        "title": "A Nation on Wheels",
        "audio": "/media/raz/P/A Nation on Wheels.mp3"
      },
      {
        "title": "About Trees",
        "audio": "/media/raz/P/About Trees.mp3"
      },
      {
        "title": "Acropolis Adventure",
        "audio": "/media/raz/P/Acropolis Adventure.mp3"
      },
      {
        "title": "Alia and the Furniture Troll",
        "audio": "/media/raz/P/Alia and the Furniture Troll.mp3"
      },
      {
        "title": "Art Around Us",
        "audio": "/media/raz/P/Art Around Us.mp3"
      },
      {
        "title": "Becky's Puzzle Problem",
        "audio": "/media/raz/P/Becky's Puzzle Problem.mp3"
      },
      {
        "title": "Breeds of Dogs",
        "audio": "/media/raz/P/Breeds of Dogs.mp3"
      },
      {
        "title": "Coyote and the Star",
        "audio": "/media/raz/P/Coyote and the Star.mp3"
      },
      {
        "title": "Daniel Boone",
        "audio": "/media/raz/P/Daniel Boone.mp3"
      },
      {
        "title": "Deep Inside a Copper Mine",
        "audio": "/media/raz/P/Deep Inside a Copper Mine.mp3"
      },
      {
        "title": "Desert People",
        "audio": "/media/raz/P/Desert People.mp3"
      },
      {
        "title": "Dictionary Dave",
        "audio": "/media/raz/P/Dictionary Dave.mp3"
      },
      {
        "title": "Dogs at Work",
        "audio": "/media/raz/P/Dogs at Work.mp3"
      },
      {
        "title": "Fantastic Flying Machines",
        "audio": "/media/raz/P/Fantastic Flying Machines.mp3"
      },
      {
        "title": "Friends Around the World",
        "audio": "/media/raz/P/Friends Around the World.mp3"
      },
      {
        "title": "Giant Pandas",
        "audio": "/media/raz/P/Giant Pandas.mp3"
      },
      {
        "title": "Goldilocks and the Other Three Bears",
        "audio": "/media/raz/P/Goldilocks and the Other Three Bears.mp3"
      },
      {
        "title": "Goldilocks and the Three Bears",
        "audio": "/media/raz/P/Goldilocks and the Three Bears.mp3"
      },
      {
        "title": "Guardian Dogs- Penguin Protectors",
        "audio": "/media/raz/P/Guardian Dogs- Penguin Protectors.mp3"
      },
      {
        "title": "Helen Keller",
        "audio": "/media/raz/P/Helen Keller.mp3"
      },
      {
        "title": "History to Chew On",
        "audio": "/media/raz/P/History to Chew On.mp3"
      },
      {
        "title": "I Am the Hope Diamond",
        "audio": "/media/raz/P/I Am the Hope Diamond.mp3"
      },
      {
        "title": "Ichiro Suzuki",
        "audio": "/media/raz/P/Ichiro Suzuki.mp3"
      },
      {
        "title": "Inside the Beast",
        "audio": "/media/raz/P/Inside the Beast.mp3"
      },
      {
        "title": "Landon's Pumpkins",
        "audio": "/media/raz/P/Landon's Pumpkins.mp3"
      },
      {
        "title": "Magnetism",
        "audio": "/media/raz/P/Magnetism.mp3"
      },
      {
        "title": "Manatees",
        "audio": "/media/raz/P/Manatees.mp3"
      },
      {
        "title": "Martin Luther King Jr.",
        "audio": "/media/raz/P/Martin Luther King Jr..mp3"
      },
      {
        "title": "Max",
        "audio": "/media/raz/P/Max.mp3"
      },
      {
        "title": "Musical Instruments",
        "audio": "/media/raz/P/Musical Instruments.mp3"
      },
      {
        "title": "My Uncle Is a Firefighter",
        "audio": "/media/raz/P/My Uncle Is a Firefighter.mp3"
      },
      {
        "title": "Rockin' Rhythm and Sweet Harmony",
        "audio": "/media/raz/P/Rockin' Rhythm and Sweet Harmony.mp3"
      },
      {
        "title": "Seals- Sea Lions- and Walruses",
        "audio": "/media/raz/P/Seals- Sea Lions- and Walruses.mp3"
      },
      {
        "title": "Shelter Pets Are Best",
        "audio": "/media/raz/P/Shelter Pets Are Best.mp3"
      },
      {
        "title": "Sonia Joins the Supreme Court",
        "audio": "/media/raz/P/Sonia Joins the Supreme Court.mp3"
      },
      {
        "title": "The 100th Day Project",
        "audio": "/media/raz/P/The 100th Day Project.mp3"
      },
      {
        "title": "The Creature Constitution",
        "audio": "/media/raz/P/The Creature Constitution.mp3"
      },
      {
        "title": "The Homework Lesson",
        "audio": "/media/raz/P/The Homework Lesson.mp3"
      },
      {
        "title": "The Legend of Sleepy Hollow",
        "audio": "/media/raz/P/The Legend of Sleepy Hollow.mp3"
      },
      {
        "title": "The Mona Lisa Mystery",
        "audio": "/media/raz/P/The Mona Lisa Mystery.mp3"
      },
      {
        "title": "The State Hermitage- Russia's Amazing Museum",
        "audio": "/media/raz/P/The State Hermitage- Russia's Amazing Museum.mp3"
      },
      {
        "title": "The Steam Engine",
        "audio": "/media/raz/P/The Steam Engine.mp3"
      },
      {
        "title": "The Story of the Statue",
        "audio": "/media/raz/P/The Story of the Statue.mp3"
      },
      {
        "title": "Voyagers in Space",
        "audio": "/media/raz/P/Voyagers in Space.mp3"
      },
      {
        "title": "Women of the Supreme Court",
        "audio": "/media/raz/P/Women of the Supreme Court.mp3"
      },
      {
        "title": "World Cup Soccer",
        "audio": "/media/raz/P/World Cup Soccer.mp3"
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
        "audio": "/media/raz/Q/A Visit to Kitt Peak.mp3"
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
        "audio": "/media/raz/Q/Castles.mp3"
      },
      {
        "title": "Cesar Chavez- Migrant Hero",
        "audio": "/media/raz/Q/Cesar Chavez- Migrant Hero.mp3"
      },
      {
        "title": "Chili Pepper Powder Surprise",
        "audio": "/media/raz/Q/Chili Pepper Powder Surprise.mp3"
      },
      {
        "title": "China",
        "audio": "/media/raz/Q/China.mp3"
      },
      {
        "title": "Chinzaemon the Silent",
        "audio": "/media/raz/Q/Chinzaemon the Silent.mp3"
      },
      {
        "title": "Coral Reefs",
        "audio": "/media/raz/Q/Coral Reefs.mp3"
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
        "audio": "/media/raz/Q/Eleventeen.mp3"
      },
      {
        "title": "Emily",
        "audio": "/media/raz/Q/Emily.mp3"
      },
      {
        "title": "Extreme Animals",
        "audio": "/media/raz/Q/Extreme Animals.mp3"
      },
      {
        "title": "Famous First Ladies",
        "audio": "/media/raz/Q/Famous First Ladies.mp3"
      },
      {
        "title": "Fireworks",
        "audio": "/media/raz/Q/Fireworks.mp3"
      },
      {
        "title": "First Day of School",
        "audio": "/media/raz/Q/First Day of School.mp3"
      },
      {
        "title": "Gandhi",
        "audio": "/media/raz/Q/Gandhi.mp3"
      },
      {
        "title": "Good for Thurgood!",
        "audio": "/media/raz/Q/Good for Thurgood!.mp3"
      },
      {
        "title": "Horseshoes Aren't Just for Good Luck",
        "audio": "/media/raz/Q/Horseshoes Aren't Just for Good Luck.mp3"
      },
      {
        "title": "How Glooskap Found Summer",
        "audio": "/media/raz/Q/How Glooskap Found Summer.mp3"
      },
      {
        "title": "Landfills- What a Load of Garbage!",
        "audio": "/media/raz/Q/Landfills- What a Load of Garbage!.mp3"
      },
      {
        "title": "Lost Cities",
        "audio": "/media/raz/Q/Lost Cities.mp3"
      },
      {
        "title": "Mermaid in a Teacup",
        "audio": "/media/raz/Q/Mermaid in a Teacup.mp3"
      },
      {
        "title": "Mike Van Zee- Special Olympian",
        "audio": "/media/raz/Q/Mike Van Zee- Special Olympian.mp3"
      },
      {
        "title": "Morty and the Oatmeal Babysitter",
        "audio": "/media/raz/Q/Morty and the Oatmeal Babysitter.mp3"
      },
      {
        "title": "Morty and the Suitcase Caper",
        "audio": "/media/raz/Q/Morty and the Suitcase Caper.mp3"
      },
      {
        "title": "Morty and the Teacher's Apples",
        "audio": "/media/raz/Q/Morty and the Teacher's Apples.mp3"
      },
      {
        "title": "My Earth Day Birthday",
        "audio": "/media/raz/Q/My Earth Day Birthday.mp3"
      },
      {
        "title": "Mystery at Camp White Cloud",
        "audio": "/media/raz/Q/Mystery at Camp White Cloud.mp3"
      },
      {
        "title": "On Eagle River",
        "audio": "/media/raz/Q/On Eagle River.mp3"
      },
      {
        "title": "Plight of the Polar Bear",
        "audio": "/media/raz/Q/Plight of the Polar Bear.mp3"
      },
      {
        "title": "Robin Hood and the King",
        "audio": "/media/raz/Q/Robin Hood and the King.mp3"
      },
      {
        "title": "SPRAK!",
        "audio": "/media/raz/Q/SPRAK!.mp3"
      },
      {
        "title": "Salmon- A Link in the Food Chain",
        "audio": "/media/raz/Q/Salmon- A Link in the Food Chain.mp3"
      },
      {
        "title": "Sharks",
        "audio": "/media/raz/Q/Sharks.mp3"
      },
      {
        "title": "Sinkhole Science",
        "audio": "/media/raz/Q/Sinkhole Science.mp3"
      },
      {
        "title": "Summer Olympics Events",
        "audio": "/media/raz/Q/Summer Olympics Events.mp3"
      },
      {
        "title": "Sweet Potato Challenge",
        "audio": "/media/raz/Q/Sweet Potato Challenge.mp3"
      },
      {
        "title": "The Buffalo Soldiers",
        "audio": "/media/raz/Q/The Buffalo Soldiers.mp3"
      },
      {
        "title": "The Castaway Pines",
        "audio": "/media/raz/Q/The Castaway Pines.mp3"
      },
      {
        "title": "The Cave of the Lost",
        "audio": "/media/raz/Q/The Cave of the Lost.mp3"
      },
      {
        "title": "The Footprint",
        "audio": "/media/raz/Q/The Footprint.mp3"
      },
      {
        "title": "The Golden Flute",
        "audio": "/media/raz/Q/The Golden Flute.mp3"
      },
      {
        "title": "The Hollow",
        "audio": "/media/raz/Q/The Hollow.mp3"
      },
      {
        "title": "The Legend of Nessie",
        "audio": "/media/raz/Q/The Legend of Nessie.mp3"
      },
      {
        "title": "The Little Fir Tree",
        "audio": "/media/raz/Q/The Little Fir Tree.mp3"
      },
      {
        "title": "The New Soccer Ball",
        "audio": "/media/raz/Q/The New Soccer Ball.mp3"
      },
      {
        "title": "The Three-R Plan",
        "audio": "/media/raz/Q/The Three-R Plan.mp3"
      },
      {
        "title": "Vincent's Bedroom",
        "audio": "/media/raz/Q/Vincent's Bedroom.mp3"
      },
      {
        "title": "Walking in Roman Footsteps",
        "audio": "/media/raz/Q/Walking in Roman Footsteps.mp3"
      },
      {
        "title": "Why Abe Lincoln Grew a Beard",
        "audio": "/media/raz/Q/Why Abe Lincoln Grew a Beard.mp3"
      },
      {
        "title": "Zookeeping",
        "audio": "/media/raz/Q/Zookeeping.mp3"
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
        "audio": "/media/raz/R/All About Chocolate.mp3"
      },
      {
        "title": "All About Kites",
        "audio": "/media/raz/R/All About Kites.mp3"
      },
      {
        "title": "An Apple a Day",
        "audio": "/media/raz/R/An Apple a Day.mp3"
      },
      {
        "title": "Animal Discoveries",
        "audio": "/media/raz/R/Animal Discoveries.mp3"
      },
      {
        "title": "April Fool's",
        "audio": "/media/raz/R/April Fool's.mp3"
      },
      {
        "title": "Arrows",
        "audio": "/media/raz/R/Arrows.mp3"
      },
      {
        "title": "Bessie Coleman",
        "audio": "/media/raz/R/Bessie Coleman.mp3"
      },
      {
        "title": "Charlene's Sea of Cortez Journal",
        "audio": "/media/raz/R/Charlene's Sea of Cortez Journal.mp3"
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
        "audio": "/media/raz/R/Expedition Zero.mp3"
      },
      {
        "title": "Explorer's Guide to World Weather",
        "audio": "/media/raz/R/Explorer's Guide to World Weather.mp3"
      },
      {
        "title": "Exploring Tide Pools",
        "audio": "/media/raz/R/Exploring Tide Pools.mp3"
      },
      {
        "title": "Fishing in Simplicity",
        "audio": "/media/raz/R/Fishing in Simplicity.mp3"
      },
      {
        "title": "Foods Around the World",
        "audio": "/media/raz/R/Foods Around the World.mp3"
      },
      {
        "title": "George Washington Carver",
        "audio": "/media/raz/R/George Washington Carver.mp3"
      },
      {
        "title": "Glow-in-the-Dark Animals",
        "audio": "/media/raz/R/Glow-in-the-Dark Animals.mp3"
      },
      {
        "title": "Going to the Super Bowl",
        "audio": "/media/raz/R/Going to the Super Bowl.mp3"
      },
      {
        "title": "How the Robin Stole Fire",
        "audio": "/media/raz/R/How the Robin Stole Fire.mp3"
      },
      {
        "title": "Inventions",
        "audio": "/media/raz/R/Inventions.mp3"
      },
      {
        "title": "Morty's Roadside Refreshments",
        "audio": "/media/raz/R/Morty's Roadside Refreshments.mp3"
      },
      {
        "title": "Mozart",
        "audio": "/media/raz/R/Mozart.mp3"
      },
      {
        "title": "Murdoch's Path",
        "audio": "/media/raz/R/Murdoch's Path.mp3"
      },
      {
        "title": "Neighborhood Mystery",
        "audio": "/media/raz/R/Neighborhood Mystery.mp3"
      },
      {
        "title": "Only One Aunt Maggie",
        "audio": "/media/raz/R/Only One Aunt Maggie.mp3"
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
        "audio": "/media/raz/R/Rattlers.mp3"
      },
      {
        "title": "Robin Hood Wins the Sheriff's Golden Arrow",
        "audio": "/media/raz/R/Robin Hood Wins the Sheriff's Golden Arrow.mp3"
      },
      {
        "title": "Scaredy Camp",
        "audio": "/media/raz/R/Scaredy Camp.mp3"
      },
      {
        "title": "Sea Turtles",
        "audio": "/media/raz/R/Sea Turtles.mp3"
      },
      {
        "title": "September 11- Always Remember",
        "audio": "/media/raz/R/September 11- Always Remember.mp3"
      },
      {
        "title": "Ships and Boats",
        "audio": "/media/raz/R/Ships and Boats.mp3"
      },
      {
        "title": "Skydiving",
        "audio": "/media/raz/R/Skydiving.mp3"
      },
      {
        "title": "Speed",
        "audio": "/media/raz/R/Speed.mp3"
      },
      {
        "title": "Storm Chasers",
        "audio": "/media/raz/R/Storm Chasers.mp3"
      },
      {
        "title": "The Genius of Tesla",
        "audio": "/media/raz/R/The Genius of Tesla.mp3"
      },
      {
        "title": "The Hard Stuff! All About Bones",
        "audio": "/media/raz/R/The Hard Stuff! All About Bones.mp3"
      },
      {
        "title": "The Olympics- Past and Present",
        "audio": "/media/raz/R/The Olympics- Past and Present.mp3"
      },
      {
        "title": "The Thesaurus",
        "audio": "/media/raz/R/The Thesaurus.mp3"
      },
      {
        "title": "Treasure Found",
        "audio": "/media/raz/R/Treasure Found.mp3"
      },
      {
        "title": "Turtle Tom",
        "audio": "/media/raz/R/Turtle Tom.mp3"
      },
      {
        "title": "Two Artists- Vermeer's Forger",
        "audio": "/media/raz/R/Two Artists- Vermeer's Forger.mp3"
      },
      {
        "title": "We're in Business",
        "audio": "/media/raz/R/We're in Business.mp3"
      },
      {
        "title": "Weird Bird Beaks",
        "audio": "/media/raz/R/Weird Bird Beaks.mp3"
      },
      {
        "title": "Wildlife Rescue",
        "audio": "/media/raz/R/Wildlife Rescue.mp3"
      },
      {
        "title": "Wonders of Nature",
        "audio": "/media/raz/R/Wonders of Nature.mp3"
      },
      {
        "title": "Woods of Wonder",
        "audio": "/media/raz/R/Woods of Wonder.mp3"
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
        "audio": "/media/raz/S/A Big League for Little Players.mp3"
      },
      {
        "title": "A Selection From Alice in Wonderland",
        "audio": "/media/raz/S/A Selection From Alice in Wonderland.mp3"
      },
      {
        "title": "Animals Feel Emotions",
        "audio": "/media/raz/S/Animals Feel Emotions.mp3"
      },
      {
        "title": "Barack Obama",
        "audio": "/media/raz/S/Barack Obama.mp3"
      },
      {
        "title": "Bears",
        "audio": "/media/raz/S/Bears.mp3"
      },
      {
        "title": "Bites and Stings",
        "audio": "/media/raz/S/Bites and Stings.mp3"
      },
      {
        "title": "Building Big Dreams",
        "audio": "/media/raz/S/Building Big Dreams.mp3"
      },
      {
        "title": "Butterflies and Moths",
        "audio": "/media/raz/S/Butterflies and Moths.mp3"
      },
      {
        "title": "Chef Morty's Party Surprise",
        "audio": "/media/raz/S/Chef Morty's Party Surprise.mp3"
      },
      {
        "title": "Finding the Tome",
        "audio": "/media/raz/S/Finding the Tome.mp3"
      },
      {
        "title": "France",
        "audio": "/media/raz/S/France.mp3"
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
        "audio": "/media/raz/S/Ghosts in the House.mp3"
      },
      {
        "title": "Harold the Dummy",
        "audio": "/media/raz/S/Harold the Dummy.mp3"
      },
      {
        "title": "Harriet Tubman and the Underground Railroad",
        "audio": "/media/raz/S/Harriet Tubman and the Underground Railroad.mp3"
      },
      {
        "title": "How Little John Joined Robin Hood",
        "audio": "/media/raz/S/How Little John Joined Robin Hood.mp3"
      },
      {
        "title": "India",
        "audio": "/media/raz/S/India.mp3"
      },
      {
        "title": "Laura Ingalls Wilder- A Pioneer's Life",
        "audio": "/media/raz/S/Laura Ingalls Wilder- A Pioneer's Life.mp3"
      },
      {
        "title": "Let's Make Vegetable Soup",
        "audio": "/media/raz/S/Let's Make Vegetable Soup.mp3"
      },
      {
        "title": "Life in Space",
        "audio": "/media/raz/S/Life in Space.mp3"
      },
      {
        "title": "Losing Grandpa",
        "audio": "/media/raz/S/Losing Grandpa.mp3"
      },
      {
        "title": "Making Mosaics",
        "audio": "/media/raz/S/Making Mosaics.mp3"
      },
      {
        "title": "Martin Luther King Jr.",
        "audio": "/media/raz/S/Martin Luther King Jr..mp3"
      },
      {
        "title": "Monkey Business",
        "audio": "/media/raz/S/Monkey Business.mp3"
      },
      {
        "title": "Morty and the Fancy-Pants Wedding",
        "audio": "/media/raz/S/Morty and the Fancy-Pants Wedding.mp3"
      },
      {
        "title": "Morty and the Mousetown Talent Show",
        "audio": "/media/raz/S/Morty and the Mousetown Talent Show.mp3"
      },
      {
        "title": "National Parks",
        "audio": "/media/raz/S/National Parks.mp3"
      },
      {
        "title": "Our Solar System",
        "audio": "/media/raz/S/Our Solar System.mp3"
      },
      {
        "title": "Part 5- Let a Smiley Face Be Your Umbrella",
        "audio": "/media/raz/S/Part 5- Let a Smiley Face Be Your Umbrella.mp3"
      },
      {
        "title": "Penguins",
        "audio": "/media/raz/S/Penguins.mp3"
      },
      {
        "title": "Searching for the Loch Ness Monster",
        "audio": "/media/raz/S/Searching for the Loch Ness Monster.mp3"
      },
      {
        "title": "Seven Wonders of the Modern World",
        "audio": "/media/raz/S/Seven Wonders of the Modern World.mp3"
      },
      {
        "title": "Snakebite!",
        "audio": "/media/raz/S/Snakebite!.mp3"
      },
      {
        "title": "The International T-Shirt Challenge",
        "audio": "/media/raz/S/The International T-Shirt Challenge.mp3"
      },
      {
        "title": "The Moon Bowl",
        "audio": "/media/raz/S/The Moon Bowl.mp3"
      },
      {
        "title": "The Titanic- Lost and Found",
        "audio": "/media/raz/S/The Titanic- Lost and Found.mp3"
      },
      {
        "title": "The Trouble with English",
        "audio": "/media/raz/S/The Trouble with English.mp3"
      },
      {
        "title": "Tsunamis",
        "audio": "/media/raz/S/Tsunamis.mp3"
      },
      {
        "title": "Two Kettles",
        "audio": "/media/raz/S/Two Kettles.mp3"
      },
      {
        "title": "Volcanoes",
        "audio": "/media/raz/S/Volcanoes.mp3"
      },
      {
        "title": "Voyagers in Space",
        "audio": "/media/raz/S/Voyagers in Space.mp3"
      },
      {
        "title": "What the Boys Found",
        "audio": "/media/raz/S/What the Boys Found.mp3"
      },
      {
        "title": "What's in a Name",
        "audio": "/media/raz/S/What's in a Name.mp3"
      },
      {
        "title": "Wheeling the Snake",
        "audio": "/media/raz/S/Wheeling the Snake.mp3"
      },
      {
        "title": "Woolly and Fang",
        "audio": "/media/raz/S/Woolly and Fang.mp3"
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
        "audio": "/media/raz/T/A Trip to a Prehistoric Cave.mp3"
      },
      {
        "title": "Adventures with Abuela",
        "audio": "/media/raz/T/Adventures with Abuela.mp3"
      },
      {
        "title": "Aladdin and the Wonderful Lamp",
        "audio": "/media/raz/T/Aladdin and the Wonderful Lamp.mp3"
      },
      {
        "title": "Albert Einstein",
        "audio": "/media/raz/T/Albert Einstein.mp3"
      },
      {
        "title": "Alice's Birthday Cake",
        "audio": "/media/raz/T/Alice's Birthday Cake.mp3"
      },
      {
        "title": "Ants in My Bed",
        "audio": "/media/raz/T/Ants in My Bed.mp3"
      },
      {
        "title": "Art Around Us",
        "audio": "/media/raz/T/Art Around Us.mp3"
      },
      {
        "title": "Bats in the Attic",
        "audio": "/media/raz/T/Bats in the Attic.mp3"
      },
      {
        "title": "Brazil",
        "audio": "/media/raz/T/Brazil.mp3"
      },
      {
        "title": "C Is for Canada",
        "audio": "/media/raz/T/C Is for Canada.mp3"
      },
      {
        "title": "Cali and Wanda Lou",
        "audio": "/media/raz/T/Cali and Wanda Lou.mp3"
      },
      {
        "title": "Camouflage",
        "audio": "/media/raz/T/Camouflage.mp3"
      },
      {
        "title": "Caribou Man",
        "audio": "/media/raz/T/Caribou Man.mp3"
      },
      {
        "title": "Carlos's Puzzle",
        "audio": "/media/raz/T/Carlos's Puzzle.mp3"
      },
      {
        "title": "Cathy Freeman",
        "audio": "/media/raz/T/Cathy Freeman.mp3"
      },
      {
        "title": "Desert People",
        "audio": "/media/raz/T/Desert People.mp3"
      },
      {
        "title": "Deserts Dry",
        "audio": "/media/raz/T/Deserts Dry.mp3"
      },
      {
        "title": "Drums and Drumming",
        "audio": "/media/raz/T/Drums and Drumming.mp3"
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
        "audio": "/media/raz/T/Holidays Around the World.mp3"
      },
      {
        "title": "Horseshoes Aren't Just for Good Luck",
        "audio": "/media/raz/T/Horseshoes Aren't Just for Good Luck.mp3"
      },
      {
        "title": "InFLUenza",
        "audio": "/media/raz/T/InFLUenza.mp3"
      },
      {
        "title": "Japan",
        "audio": "/media/raz/T/Japan.mp3"
      },
      {
        "title": "Kid Inventors",
        "audio": "/media/raz/T/Kid Inventors.mp3"
      },
      {
        "title": "Lighter Than Air",
        "audio": "/media/raz/T/Lighter Than Air.mp3"
      },
      {
        "title": "Mexico",
        "audio": "/media/raz/T/Mexico.mp3"
      },
      {
        "title": "Money in the USA",
        "audio": "/media/raz/T/Money in the USA.mp3"
      },
      {
        "title": "Morty and the Mousetown Gazette",
        "audio": "/media/raz/T/Morty and the Mousetown Gazette.mp3"
      },
      {
        "title": "My Secret Internet Friend",
        "audio": "/media/raz/T/My Secret Internet Friend.mp3"
      },
      {
        "title": "Mysteries of the Lost Civilization",
        "audio": "/media/raz/T/Mysteries of the Lost Civilization.mp3"
      },
      {
        "title": "Remembering the Alamo",
        "audio": "/media/raz/T/Remembering the Alamo.mp3"
      },
      {
        "title": "Ricardo's Dilemma",
        "audio": "/media/raz/T/Ricardo's Dilemma.mp3"
      },
      {
        "title": "Running for Freedom",
        "audio": "/media/raz/T/Running for Freedom.mp3"
      },
      {
        "title": "Sally's Secret Ambition",
        "audio": "/media/raz/T/Sally's Secret Ambition.mp3"
      },
      {
        "title": "Severe Weather",
        "audio": "/media/raz/T/Severe Weather.mp3"
      },
      {
        "title": "Ships of Discovery",
        "audio": "/media/raz/T/Ships of Discovery.mp3"
      },
      {
        "title": "Special Effects",
        "audio": "/media/raz/T/Special Effects.mp3"
      },
      {
        "title": "The Black Stones",
        "audio": "/media/raz/T/The Black Stones.mp3"
      },
      {
        "title": "The Buffalo Soldiers",
        "audio": "/media/raz/T/The Buffalo Soldiers.mp3"
      },
      {
        "title": "The Red Baron",
        "audio": "/media/raz/T/The Red Baron.mp3"
      },
      {
        "title": "Thomas Jefferson",
        "audio": "/media/raz/T/Thomas Jefferson.mp3"
      },
      {
        "title": "Titanic Treasure",
        "audio": "/media/raz/T/Titanic Treasure.mp3"
      },
      {
        "title": "Vikings",
        "audio": "/media/raz/T/Vikings.mp3"
      },
      {
        "title": "Weave It!",
        "audio": "/media/raz/T/Weave It!.mp3"
      },
      {
        "title": "What Is Water Worth",
        "audio": "/media/raz/T/What Is Water Worth.mp3"
      },
      {
        "title": "Yee Haw! The Real Lives of the Cowboys",
        "audio": "/media/raz/T/Yee Haw! The Real Lives of the Cowboys.mp3"
      }
    ]
  }
]

// 自动替换 base URL（生产环境通过环境变量注入）
const razLevels = razLevelsRaw.map(level => ({
  ...level,
  books: level.books.map(book => ({
    ...book,
    audio: MEDIA_BASE_URL + book.audio
  }))
}))

export default razLevels
