import { useState } from 'react'
import './Reading.css'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PASSAGES = [
  // ══════════════════ KET (A2) ══════════════════
  {
    id: 1, level: 'KET', title: 'A Day at the Zoo', topic: 'Animals',
    wordCount: 82,
    text: `Last Saturday, Tom and his family went to the city zoo. They saw many animals. Tom loved the pandas most. The pandas were eating bamboo. There was also a show with dolphins. The dolphins could jump very high. Tom's little sister was scared of the lions. They had lunch at the zoo café. Tom had a sandwich and some juice. It was a wonderful day.`,
    questions: [
      { q: 'Where did Tom go last Saturday?', options: ['To the zoo', 'To the park', 'To the beach', 'To the museum'], answer: 0, explanation: 'The passage says "Tom and his family went to the city zoo."' },
      { q: 'What were the pandas doing?', options: ['Sleeping', 'Playing', 'Eating bamboo', 'Swimming'], answer: 2, explanation: 'The text states "The pandas were eating bamboo."' },
      { q: "How did Tom's sister feel about the lions?", options: ['Excited', 'Scared', 'Happy', 'Bored'], answer: 1, explanation: '"Tom\'s little sister was scared of the lions."' },
      { q: 'What did Tom have for lunch?', options: ['Pizza and water', 'Sandwich and juice', 'Noodles and tea', 'Rice and soup'], answer: 1, explanation: '"Tom had a sandwich and some juice."' },
    ],
  },
  {
    id: 2, level: 'KET', title: 'My Favourite Sport', topic: 'Sports',
    wordCount: 91,
    text: `Emma loves basketball. She plays basketball every day after school. Her team has twelve players. Emma is the tallest girl on the team. Last week, her team played against another school. The game was exciting. Emma scored ten points. Her team won by five points. After the game, the coach said Emma was the best player. Emma was very happy. She wants to play basketball in college one day.`,
    questions: [
      { q: 'When does Emma play basketball?', options: ['In the morning', 'At lunchtime', 'After school', 'On weekends'], answer: 2, explanation: '"She plays basketball every day after school."' },
      { q: "How many players are on Emma's team?", options: ['Ten', 'Eleven', 'Twelve', 'Thirteen'], answer: 2, explanation: '"Her team has twelve players."' },
      { q: 'How many points did Emma score?', options: ['Five', 'Eight', 'Ten', 'Fifteen'], answer: 2, explanation: '"Emma scored ten points."' },
      { q: 'What did the coach say about Emma?', options: ['She needs to practise more', 'She was the best player', 'She should join another team', 'She scored too few points'], answer: 1, explanation: '"The coach said Emma was the best player."' },
    ],
  },
  {
    id: 3, level: 'KET', title: 'A Letter from Summer Camp', topic: 'School Life',
    wordCount: 96,
    text: `Dear Mum and Dad,\n\nI am having a great time at summer camp. The camp is near a big lake. Every morning we go swimming in the lake. The water is cold but fun. In the afternoon, we do different activities. Yesterday I tried rock climbing for the first time. It was difficult but I did it! I made three new friends. Their names are Sam, Lucy, and Ben. We eat together at every meal. The food here is delicious. I miss you, but I am not homesick. See you on Friday!\n\nLove, Katie`,
    questions: [
      { q: 'Where is the camp?', options: ['Near a mountain', 'Near a big lake', 'Near the sea', 'Near a forest'], answer: 1, explanation: '"The camp is near a big lake."' },
      { q: 'What did Katie try for the first time?', options: ['Swimming', 'Cycling', 'Rock climbing', 'Fishing'], answer: 2, explanation: '"Yesterday I tried rock climbing for the first time."' },
      { q: 'How many new friends did Katie make?', options: ['Two', 'Three', 'Four', 'Five'], answer: 1, explanation: '"I made three new friends."' },
      { q: 'When is Katie going home?', options: ['Wednesday', 'Thursday', 'Friday', 'Saturday'], answer: 2, explanation: '"See you on Friday!"' },
    ],
  },
  {
    id: 4, level: 'KET', title: 'My Bedroom', topic: 'Home & Family',
    wordCount: 88,
    text: `My bedroom is my favourite place in the house. It is not very big, but it is comfortable. I have a blue bed, a wooden desk, and a large bookshelf. There are more than fifty books on the shelf. I love reading. There is a window next to my desk. I can see the garden from there. I have a small orange rug on the floor. My cat Biscuit loves to sleep on it. I always do my homework at my desk before dinner.`,
    questions: [
      { q: 'What colour is the bed?', options: ['White', 'Green', 'Blue', 'Brown'], answer: 2, explanation: '"I have a blue bed."' },
      { q: 'How many books are on the shelf?', options: ['Less than twenty', 'About thirty', 'More than fifty', 'Exactly forty'], answer: 2, explanation: '"There are more than fifty books on the shelf."' },
      { q: 'What can the writer see from the window?', options: ['The street', 'The garden', 'A park', 'Another house'], answer: 1, explanation: '"I can see the garden from there."' },
      { q: 'What colour is the rug?', options: ['Blue', 'Red', 'Yellow', 'Orange'], answer: 3, explanation: '"I have a small orange rug on the floor."' },
    ],
  },
  {
    id: 5, level: 'KET', title: 'School Timetable Notice', topic: 'School Life',
    wordCount: 94,
    text: `GREENWOOD PRIMARY SCHOOL — NOTICE\n\nDear Students and Parents,\n\nPlease note the following changes to next week's timetable:\n\n• Monday: PE is moved from Period 2 to Period 5.\n• Tuesday: There is no Music class. Students will have extra English instead.\n• Wednesday: The school trip to the science museum is at 9:00 am. Please bring a packed lunch.\n• Thursday: Normal timetable.\n• Friday: School finishes at 1:00 pm due to teacher training.\n\nThank you for your cooperation.\n\nThe School Office`,
    questions: [
      { q: 'On which day is PE moved?', options: ['Tuesday', 'Monday', 'Wednesday', 'Friday'], answer: 1, explanation: '"Monday: PE is moved from Period 2 to Period 5."' },
      { q: 'What replaces Music on Tuesday?', options: ['Art', 'Maths', 'Extra English', 'Science'], answer: 2, explanation: '"Students will have extra English instead."' },
      { q: 'What should students bring on Wednesday?', options: ['A raincoat', 'A packed lunch', 'Their PE kit', 'A notebook'], answer: 1, explanation: '"Please bring a packed lunch."' },
      { q: 'Why does school finish early on Friday?', options: ['Sports day', 'A school trip', 'Teacher training', 'A public holiday'], answer: 2, explanation: '"Friday: School finishes at 1:00 pm due to teacher training."' },
    ],
  },
  {
    id: 6, level: 'KET', title: 'Weather Around the World', topic: 'Geography',
    wordCount: 102,
    text: `Different places around the world have very different weather. In London, it rains a lot. People always carry umbrellas. In Dubai, the summer is extremely hot. Temperatures can reach 45 degrees Celsius. In Canada, winters are very cold. It snows for many months. People go skiing and skating. In Singapore, it is hot and rainy all year. The temperature is always around 30 degrees. In Sydney, Australia, December is a summer month. People go to the beach at Christmas. The weather in our world is very interesting. It depends on where you live.`,
    questions: [
      { q: 'What do people in London often carry?', options: ['Hats', 'Sunglasses', 'Umbrellas', 'Scarves'], answer: 2, explanation: '"In London, it rains a lot. People always carry umbrellas."' },
      { q: 'How hot can it get in Dubai in summer?', options: ['30°C', '35°C', '40°C', '45°C'], answer: 3, explanation: '"Temperatures can reach 45 degrees Celsius."' },
      { q: 'What do people do in winter in Canada?', options: ['Go swimming', 'Go skiing and skating', 'Go to the beach', 'Go camping'], answer: 1, explanation: '"People go skiing and skating."' },
      { q: 'When is December in Sydney?', options: ['Spring', 'Autumn', 'Winter', 'Summer'], answer: 3, explanation: '"In Sydney, Australia, December is a summer month."' },
    ],
  },
  {
    id: 7, level: 'KET', title: 'The New Student', topic: 'School Life',
    wordCount: 98,
    text: `A new student joined our class last Monday. Her name is Yuki. She comes from Japan. She speaks English very well. On her first day, she looked a little nervous. Our teacher asked me to sit next to her and help her. I showed her where everything was — the library, the canteen, and the sports hall. At break time, we played in the playground together. She told me she loves drawing and football. I think we will become good friends. I am happy she is in my class.`,
    questions: [
      { q: 'Where is Yuki from?', options: ['China', 'Korea', 'Japan', 'Thailand'], answer: 2, explanation: '"She comes from Japan."' },
      { q: 'How did Yuki feel on her first day?', options: ['Excited', 'Angry', 'Nervous', 'Bored'], answer: 2, explanation: '"On her first day, she looked a little nervous."' },
      { q: 'What did the writer do at break time?', options: ['Read in the library', 'Played in the playground with Yuki', 'Ate in the canteen', 'Did homework'], answer: 1, explanation: '"At break time, we played in the playground together."' },
      { q: 'What are Yuki\'s hobbies?', options: ['Reading and music', 'Drawing and football', 'Swimming and cooking', 'Dancing and art'], answer: 1, explanation: '"She told me she loves drawing and football."' },
    ],
  },
  {
    id: 8, level: 'KET', title: 'Healthy Eating', topic: 'Health & Food',
    wordCount: 105,
    text: `Eating healthy food is very important for your body and mind. Fruits and vegetables give you vitamins and energy. You should eat at least five portions of them every day. Bread, rice, and pasta give you energy too. Protein foods like meat, fish, eggs, and beans help your muscles grow. Dairy products such as milk and cheese are good for your bones and teeth. You should drink plenty of water every day — about eight glasses. It is also important to eat less sugar and fat. Fast food is tasty, but it is not healthy if you eat it too often.`,
    questions: [
      { q: 'How many portions of fruit and vegetables should you eat daily?', options: ['At least three', 'At least five', 'At least seven', 'At least ten'], answer: 1, explanation: '"You should eat at least five portions of them every day."' },
      { q: 'What helps your muscles grow?', options: ['Dairy products', 'Bread and rice', 'Protein foods', 'Fruits'], answer: 2, explanation: '"Protein foods like meat, fish, eggs, and beans help your muscles grow."' },
      { q: 'How many glasses of water should you drink per day?', options: ['About four', 'About six', 'About eight', 'About ten'], answer: 2, explanation: '"You should drink plenty of water every day — about eight glasses."' },
      { q: 'What does the text say about fast food?', options: ['You should never eat it', 'It is very healthy', 'It is fine to eat every day', 'It is not healthy if eaten too often'], answer: 3, explanation: '"Fast food is tasty, but it is not healthy if you eat it too often."' },
    ],
  },

  // ══════════════════ PET (B1) ══════════════════
  {
    id: 9, level: 'PET', title: 'Social Media and Teenagers', topic: 'Technology',
    wordCount: 130,
    text: `Social media has become a big part of teenagers' lives. Many young people spend several hours a day on platforms like Instagram and TikTok. While social media helps people stay connected with friends and family, it also has some negative effects. Research shows that too much time on social media can lead to feelings of loneliness and anxiety. Some teenagers compare themselves to others and feel unhappy. However, social media can also be used in positive ways. Young people share creative work, raise awareness about important issues, and even start small businesses online. The key is balance — using social media wisely without letting it control your life.`,
    questions: [
      { q: 'According to the text, what is one negative effect of social media?', options: ['It costs too much money', 'It can lead to loneliness and anxiety', 'It makes people lazy', 'It slows down computers'], answer: 1, explanation: '"Research shows that too much time on social media can lead to feelings of loneliness and anxiety."' },
      { q: 'What does the text suggest is most important?', options: ['Deleting all social media', 'Only using social media for business', 'Using social media in a balanced way', 'Spending more time online'], answer: 2, explanation: '"The key is balance — using social media wisely without letting it control your life."' },
      { q: 'Which of the following is mentioned as a positive use of social media?', options: ['Watching films', 'Playing games', 'Sharing creative work', 'Reading news'], answer: 2, explanation: '"Young people share creative work, raise awareness about important issues, and even start small businesses online."' },
    ],
  },
  {
    id: 10, level: 'PET', title: 'City Cycling', topic: 'Transport & Environment',
    wordCount: 148,
    text: `In recent years, many cities around the world have introduced bike-sharing programmes to encourage people to cycle instead of drive. These schemes allow people to rent a bicycle from a station, ride it to their destination, and return it to any other station in the city. Cities like Amsterdam, Copenhagen, and Paris have built hundreds of kilometres of cycle lanes to make cycling safer. Supporters argue that cycling reduces traffic jams, cuts air pollution, and improves people's health. However, critics point out that cycle lanes are expensive to build and sometimes cause problems for drivers. In some cities, not enough people use the bikes, so the schemes lose money. Despite the challenges, most transport experts agree that making cycling easier is an important step towards cleaner, healthier cities.`,
    questions: [
      { q: 'What can people do with a bike-sharing programme?', options: ['Buy a bicycle cheaply', 'Rent, ride, and return a bike at any station', 'Have a bicycle delivered to their home', 'Join a cycling club'], answer: 1, explanation: '"These schemes allow people to rent a bicycle from a station, ride it to their destination, and return it to any other station."' },
      { q: 'Which city is NOT mentioned as an example?', options: ['Amsterdam', 'Copenhagen', 'London', 'Paris'], answer: 2, explanation: 'The text mentions Amsterdam, Copenhagen, and Paris, but not London.' },
      { q: 'What is one argument AGAINST cycle lanes?', options: ['They are dangerous', 'They are expensive to build', 'They make traffic worse', 'They are too narrow'], answer: 1, explanation: '"Critics point out that cycle lanes are expensive to build."' },
      { q: 'What is the main idea of the text?', options: ['Cycling is dangerous in cities', 'Bike-sharing programmes always lose money', 'Making cycling easier can help create cleaner cities', 'Amsterdam has the best transport system'], answer: 2, explanation: '"Most transport experts agree that making cycling easier is an important step towards cleaner, healthier cities."' },
    ],
  },
  {
    id: 11, level: 'PET', title: 'Volunteering Abroad', topic: 'Travel & Culture',
    wordCount: 152,
    text: `Every summer, hundreds of young people from around the world travel to developing countries to take part in volunteering projects. These volunteers help build schools, teach English, work in hospitals, and protect wildlife. Many volunteers say the experience changed their lives. They gain new skills, learn about different cultures, and make friends from all over the world. However, volunteering abroad is not without problems. Some critics argue that volunteers often lack the professional skills needed and may actually cause more harm than good. Others point out that sending volunteers from rich countries can prevent local people from getting paid jobs. Organisations that run volunteering programmes are increasingly aware of these concerns. The best programmes train volunteers thoroughly before they travel and work closely with local communities to make sure the projects truly benefit the people they aim to help.`,
    questions: [
      { q: 'Which of the following is NOT mentioned as a volunteering activity?', options: ['Building schools', 'Teaching English', 'Growing food', 'Protecting wildlife'], answer: 2, explanation: 'The text mentions building schools, teaching English, working in hospitals, and protecting wildlife — not growing food.' },
      { q: 'What is one criticism of volunteering abroad?', options: ['Volunteers spend too much money', 'Volunteers may lack professional skills', 'It is too dangerous for young people', 'Volunteers cause environmental damage'], answer: 1, explanation: '"Some critics argue that volunteers often lack the professional skills needed and may actually cause more harm than good."' },
      { q: 'What do the best volunteering programmes do?', options: ['Only accept professional workers', 'Pay volunteers a high salary', 'Train volunteers and work with local communities', 'Send volunteers for at least two years'], answer: 2, explanation: '"The best programmes train volunteers thoroughly before they travel and work closely with local communities."' },
      { q: 'What does the word \'thoroughly\' mean in this context?', options: ['Quickly', 'Cheaply', 'Completely and carefully', 'In a friendly way'], answer: 2, explanation: '\'Thoroughly\' means completely and carefully — indicating the training is comprehensive.' },
    ],
  },
  {
    id: 12, level: 'PET', title: 'The Benefits of Learning a Musical Instrument', topic: 'Education & Arts',
    wordCount: 145,
    text: `Learning to play a musical instrument has benefits that go far beyond music itself. Studies show that children who learn an instrument perform better in subjects like maths and languages. This is because music training improves memory, concentration, and the ability to process information quickly. Playing an instrument also teaches discipline. Students must practise regularly and work hard to improve — skills that are useful in all areas of life. Furthermore, music provides an emotional outlet. When people feel stressed or sad, playing music can help them feel better. Group lessons and orchestras also develop teamwork and social skills. Despite these advantages, many schools are cutting music programmes due to budget pressures. Parents and educators are increasingly speaking out about the importance of keeping music in education for the benefit of future generations.`,
    questions: [
      { q: 'According to the text, which subjects do music learners often do better in?', options: ['Science and history', 'Maths and languages', 'Art and geography', 'PE and drama'], answer: 1, explanation: '"Studies show that children who learn an instrument perform better in subjects like maths and languages."' },
      { q: 'What does the text say music training improves?', options: ['Physical fitness', 'Memory and concentration', 'Drawing skills', 'Reading speed'], answer: 1, explanation: '"Music training improves memory, concentration, and the ability to process information quickly."' },
      { q: 'Why are schools cutting music programmes?', options: ['Students do not enjoy music', 'There are not enough teachers', 'Budget pressures', 'Music takes too long to learn'], answer: 2, explanation: '"Many schools are cutting music programmes due to budget pressures."' },
      { q: 'What is the main message of the final sentence?', options: ['Schools have too many subjects', 'Music should remain part of education', 'Parents should teach music at home', 'Orchestras are very expensive'], answer: 1, explanation: '"Parents and educators are increasingly speaking out about the importance of keeping music in education for the benefit of future generations."' },
    ],
  },
  {
    id: 13, level: 'PET', title: 'Fast Fashion', topic: 'Environment & Society',
    wordCount: 155,
    text: `Fast fashion refers to the rapid production of large quantities of cheap clothing that follows the latest trends. Over the last two decades, companies have dramatically increased the number of clothing collections they produce each year — from two seasons to sometimes fifty or more. While this means shoppers can buy fashionable clothes at low prices, it comes at a heavy environmental cost. The fashion industry is now one of the world's largest polluters. Making clothes uses enormous amounts of water and energy, and dyes used in fabric production pollute rivers and streams. Additionally, because the clothes are cheap and low quality, people throw them away quickly. Millions of tonnes of clothing end up in landfill every year. Some companies are now trying to become more sustainable by using recycled materials and encouraging customers to return old clothes. However, experts say that much more needs to be done to reduce the industry's impact on the planet.`,
    questions: [
      { q: 'What has changed in fashion production over the last twenty years?', options: ['Clothes have become more expensive', 'The number of collections per year has dramatically increased', 'Fewer clothes are made', 'Production has moved to Europe'], answer: 1, explanation: '"Companies have dramatically increased the number of clothing collections they produce each year."' },
      { q: 'What environmental problem is caused by fabric dyes?', options: ['Air pollution', 'Noise pollution', 'River and stream pollution', 'Soil destruction'], answer: 2, explanation: '"Dyes used in fabric production pollute rivers and streams."' },
      { q: 'Why do people throw fast fashion away quickly?', options: ['They get bored of the colours', 'The clothes are cheap and low quality', 'New trends come every week', 'The clothes are uncomfortable'], answer: 1, explanation: '"Because the clothes are cheap and low quality, people throw them away quickly."' },
      { q: 'What are SOME companies doing to address the problem?', options: ['Stopping production entirely', 'Using recycled materials and taking back old clothes', 'Making clothes more expensive', 'Reducing the number of styles'], answer: 1, explanation: '"Some companies are now trying to become more sustainable by using recycled materials and encouraging customers to return old clothes."' },
    ],
  },
  {
    id: 14, level: 'PET', title: 'Sleep and Your Health', topic: 'Health & Science',
    wordCount: 142,
    text: `Scientists agree that sleep is one of the most important things you can do for your health. During sleep, your brain processes information from the day and stores it as long-term memory. This is why students who sleep well before exams often perform better than those who stay up all night studying. Sleep also allows the body to repair itself. Muscles grow and recover, and the immune system becomes stronger. Most teenagers need between eight and ten hours of sleep per night, but research shows that many get fewer than seven. The main reason is the use of smartphones and screens before bed. The blue light from screens tells the brain to stay awake, making it harder to fall asleep. Experts recommend putting your phone away at least an hour before bedtime and keeping your bedroom cool and dark for the best sleep.`,
    questions: [
      { q: 'What does the brain do during sleep?', options: ['Rests completely', 'Processes and stores information', 'Produces more energy', 'Controls body temperature'], answer: 1, explanation: '"Your brain processes information from the day and stores it as long-term memory."' },
      { q: 'How many hours of sleep do most teenagers need?', options: ['6–8 hours', '7–9 hours', '8–10 hours', '9–11 hours'], answer: 2, explanation: '"Most teenagers need between eight and ten hours of sleep per night."' },
      { q: 'What effect does blue light from screens have?', options: ['It helps you relax', 'It tells the brain to stay awake', 'It makes you dream more', 'It reduces anxiety'], answer: 1, explanation: '"The blue light from screens tells the brain to stay awake, making it harder to fall asleep."' },
      { q: 'What do experts recommend for better sleep?', options: ['Drink warm milk before bed', 'Exercise just before sleeping', 'Put your phone away an hour before bed', 'Sleep with the lights on'], answer: 2, explanation: '"Experts recommend putting your phone away at least an hour before bedtime."' },
    ],
  },
  {
    id: 15, level: 'PET', title: 'Robot Chefs', topic: 'Technology & Food',
    wordCount: 138,
    text: `Restaurants around the world are beginning to use robots to help prepare and serve food. In some Japanese restaurants, robotic arms can make sushi with perfect precision. In the United States, burger restaurants have introduced machines that can cook hundreds of burgers per hour without making mistakes. Supporters say robot chefs have several advantages. They work faster than humans, never take breaks, and always produce consistent results. They also reduce the risk of kitchen accidents and food contamination. However, critics are concerned about job losses. Cooking has always been a deeply human skill, involving creativity, taste, and cultural traditions that a machine cannot replicate. Some chefs argue that food made by a robot lacks the soul of food made by a human cook. As technology advances, the debate about the role of robots in our kitchens — and our lives — continues to grow.`,
    questions: [
      { q: 'What can robotic arms do in some Japanese restaurants?', options: ['Wash dishes automatically', 'Take orders from customers', 'Make sushi with perfect precision', 'Deliver food to tables'], answer: 2, explanation: '"In some Japanese restaurants, robotic arms can make sushi with perfect precision."' },
      { q: 'Which of the following is NOT mentioned as an advantage of robot chefs?', options: ['They work faster', 'They never take breaks', 'They are cheaper to build', 'They reduce food contamination risk'], answer: 2, explanation: 'The text mentions speed, no breaks, consistency, and food safety — not being cheaper to build.' },
      { q: 'What do some chefs argue about robot-made food?', options: ['It tastes better', 'It costs less to produce', 'It lacks the soul of human-made food', 'It is safer to eat'], answer: 2, explanation: '"Some chefs argue that food made by a robot lacks the soul of food made by a human cook."' },
      { q: 'What is the main purpose of this text?', options: ['To argue that robots should replace all chefs', 'To describe the advantages and disadvantages of robot chefs', 'To explain how sushi is made in Japan', 'To warn people about the dangers of robots'], answer: 1, explanation: 'The text presents both positive arguments and concerns about robot chefs — it gives a balanced view.' },
    ],
  },

  // ══════════════════ FCE (B2) ══════════════════
  {
    id: 16, level: 'FCE', title: 'The Psychology of Colour', topic: 'Science & Psychology',
    wordCount: 175,
    text: `Colour psychology is the study of how colours affect human behaviour and emotions. Researchers have found that different colours can have significant impacts on our mood, productivity, and even physical health. Red, for instance, is associated with energy and excitement, but it can also increase anxiety and aggression. This is why red is often used in restaurants — it stimulates appetite and encourages people to eat quickly. Blue, on the other hand, is calming and promotes concentration. Many offices and schools use blue because it is believed to enhance productivity. Green is linked to nature and balance, reducing stress and creating a sense of harmony. Yellow represents optimism and creativity, though too much of it can cause irritability. Marketers carefully choose colours to influence consumer behaviour, and interior designers select colours to create specific atmospheres. Understanding colour psychology can help us make better choices about our environments.`,
    questions: [
      { q: 'Why is red commonly used in restaurants, according to the text?', options: ['It is the most attractive colour', 'It stimulates appetite and encourages fast eating', 'It reduces customer anxiety', 'It is associated with luxury'], answer: 1, explanation: '"This is why red is often used in restaurants — it stimulates appetite and encourages people to eat quickly."' },
      { q: 'What effect does blue have, according to researchers?', options: ['It increases energy', 'It promotes aggression', 'It enhances productivity', 'It stimulates creativity'], answer: 2, explanation: '"Blue... is calming and promotes concentration... it is believed to enhance productivity."' },
      { q: "The word 'irritability' in the passage is closest in meaning to:", options: ['Excitement', 'Sadness', 'Annoyance', 'Confusion'], answer: 2, explanation: 'Irritability means a tendency to become annoyed or impatient easily — closest to "annoyance".' },
      { q: 'What is the main purpose of this text?', options: ['To argue that colour psychology is unreliable', 'To explain how colours affect us and why this knowledge is useful', 'To recommend specific colours for offices', 'To describe how marketers manipulate consumers'], answer: 1, explanation: 'The passage explains the effects of various colours on behaviour and mood, then concludes that this knowledge helps us make better choices.' },
    ],
  },
  {
    id: 17, level: 'FCE', title: 'The Gig Economy', topic: 'Work & Society',
    wordCount: 210,
    text: `The so-called "gig economy" — in which workers are hired for short-term contracts or freelance work rather than permanent employment — has expanded dramatically over the past decade. Platforms such as Uber, Deliveroo, and Fiverr have made it possible for millions of people to earn money on a flexible basis, choosing when and where they work. Proponents argue that gig work offers unparalleled freedom and suits people who value independence over job security. For students, parents, and those with multiple commitments, the ability to work flexibly is genuinely valuable.\n\nHowever, critics highlight serious drawbacks. Gig workers typically lack basic employment rights such as sick pay, holiday pay, and pension contributions. Because they are classified as self-employed rather than employees, companies are not legally required to provide these protections. This creates a two-tier labour market, where gig workers carry the financial risks that would otherwise be borne by employers. There have been high-profile legal battles in several countries, with courts ruling that some gig workers should be reclassified as employees.\n\nThe debate ultimately centres on a fundamental question: in a modern economy, how do we balance flexibility and freedom with fairness and security? Policymakers, businesses, and workers themselves are still searching for a satisfactory answer.`,
    questions: [
      { q: 'What does the gig economy involve?', options: ['Permanent full-time employment', 'Short-term contracts or freelance work', 'Government-funded job schemes', 'Work only in the technology sector'], answer: 1, explanation: '"Workers are hired for short-term contracts or freelance work rather than permanent employment."' },
      { q: 'According to the text, why do some people value gig work?', options: ['It offers higher salaries', 'It provides job security', 'It offers flexibility and independence', 'It comes with full employment rights'], answer: 2, explanation: '"Gig work offers unparalleled freedom and suits people who value independence over job security."' },
      { q: 'Why do gig workers NOT receive sick pay or holiday pay?', options: ['They earn too much money', 'They choose not to receive it', 'They are classified as self-employed', 'The platforms cannot afford it'], answer: 2, explanation: '"Because they are classified as self-employed rather than employees, companies are not legally required to provide these protections."' },
      { q: 'What does the phrase "two-tier labour market" suggest?', options: ['Two different types of work schedules', 'A system where some workers have fewer rights than others', 'A market divided between skilled and unskilled workers', 'Two separate companies operating in the same industry'], answer: 1, explanation: 'A "two-tier" system implies inequality — here, gig workers have fewer protections than regular employees.' },
      { q: 'What is the central question posed at the end of the text?', options: ['How can businesses make more profit?', 'How can workers avoid paying taxes?', 'How can flexibility and fairness both be achieved?', 'How can technology create more jobs?'], answer: 2, explanation: '"How do we balance flexibility and freedom with fairness and security?"' },
    ],
  },
  {
    id: 18, level: 'FCE', title: 'Rewilding Britain', topic: 'Environment & Science',
    wordCount: 205,
    text: `Rewilding is one of the most ambitious and controversial conservation strategies of our time. The idea is straightforward: rather than managing the countryside by human intervention, we allow nature to recover and manage itself. This can involve reintroducing species that were once native to an area — such as beavers, lynxes, or wolves — and letting natural processes like flooding, forest growth, and predation restore ecological balance.\n\nIn Britain, rewilding projects have produced some remarkable results. The reintroduction of beavers in Scotland and parts of England has transformed rivers and wetlands. Beavers build dams that slow the flow of water, reducing flooding downstream and creating rich habitats for fish, birds, and insects. On rewilded estates, such as the famous Knepp Estate in West Sussex, populations of rare species including turtle doves, nightingales, and purple emperor butterflies have recovered substantially.\n\nYet rewilding is not without its opponents. Farmers worry that predators like wolves or lynxes would threaten their livestock. Local communities fear losing agricultural land and traditional countryside management. Some conservationists argue that actively managed habitats can be just as rich in biodiversity as wild ones. The debate reflects a deeper tension: what is the countryside for — human use, or nature? Finding a workable compromise will require careful planning, scientific expertise, and genuine dialogue between all stakeholders.`,
    questions: [
      { q: 'What is the core principle of rewilding?', options: ['Planting trees in urban areas', 'Allowing nature to recover and manage itself', 'Building new national parks', 'Removing all human settlements from rural areas'], answer: 1, explanation: '"Rather than managing the countryside by human intervention, we allow nature to recover and manage itself."' },
      { q: 'How do beaver dams help reduce flooding?', options: ['They block rivers completely', 'They redirect water into the sea', 'They slow the flow of water downstream', 'They absorb rainwater into the soil'], answer: 2, explanation: '"Beavers build dams that slow the flow of water, reducing flooding downstream."' },
      { q: 'Which of the following species has recovered at the Knepp Estate?', options: ['Red squirrels', 'Golden eagles', 'Turtle doves', 'Badgers'], answer: 2, explanation: '"Populations of rare species including turtle doves, nightingales, and purple emperor butterflies have recovered substantially."' },
      { q: 'What is one concern raised by farmers about rewilding?', options: ['It would attract too many tourists', 'Predators could threaten their livestock', 'It would reduce property values', 'Wild animals would spread disease'], answer: 1, explanation: '"Farmers worry that predators like wolves or lynxes would threaten their livestock."' },
      { q: "The phrase 'all stakeholders' refers to:", options: ['Only scientists and conservationists', 'Only farmers and landowners', 'Everyone with an interest in how the countryside is managed', 'Only government officials'], answer: 2, explanation: 'Stakeholders are all parties with an interest in the outcome — farmers, communities, scientists, conservationists, and policymakers.' },
    ],
  },
  {
    id: 19, level: 'FCE', title: 'The Placebo Effect', topic: 'Medicine & Psychology',
    wordCount: 198,
    text: `The placebo effect is one of the most fascinating and puzzling phenomena in medicine. A placebo is a treatment that contains no active medical ingredient — a sugar pill, a saline injection, or even a fake surgical procedure. Yet in study after study, patients who receive placebos often report genuine improvements in their symptoms, sometimes to a degree that rivals real treatments.\n\nFor decades, scientists dismissed the placebo effect as nothing more than wishful thinking or patients simply reporting improvements they did not actually feel. However, modern neuroscience has shown that something far more interesting is happening. When a patient believes they are receiving treatment, the brain releases its own natural painkillers — endorphins and other neurotransmitters — that genuinely alter the patient's experience of pain and illness. Brain imaging studies have confirmed these changes are neurologically real.\n\nWhat determines the strength of the placebo effect? Research suggests that the doctor-patient relationship plays a crucial role. Patients who feel cared for and listened to tend to respond better, even to genuine treatments. The colour and size of pills also matter — large blue pills work better as sleeping tablets, while small red pills are more effective as stimulants. These findings raise profound questions about the nature of healing and the relationship between mind, body, and medicine.`,
    questions: [
      { q: 'What is a placebo?', options: ['A very powerful painkiller', 'A treatment with no active medical ingredient', 'A new type of surgical procedure', 'A herbal medicine'], answer: 1, explanation: '"A placebo is a treatment that contains no active medical ingredient."' },
      { q: 'How did scientists initially explain the placebo effect?', options: ['As a genuine neurological process', 'As wishful thinking or false reporting', 'As a side effect of real medicine', 'As a result of positive lifestyle changes'], answer: 1, explanation: '"Scientists dismissed the placebo effect as nothing more than wishful thinking or patients simply reporting improvements they did not actually feel."' },
      { q: 'What does modern neuroscience show actually happens during a placebo response?', options: ['Nothing physically changes', 'The body heals itself naturally over time', 'The brain releases natural painkillers', 'The immune system becomes stronger'], answer: 2, explanation: '"The brain releases its own natural painkillers — endorphins and other neurotransmitters — that genuinely alter the patient\'s experience."' },
      { q: 'According to research, what colour pill works best as a sleeping tablet?', options: ['Red', 'White', 'Yellow', 'Blue'], answer: 3, explanation: '"Large blue pills work better as sleeping tablets."' },
      { q: 'What do the findings about the placebo effect ultimately suggest?', options: ['Patients should be given fewer drugs', 'Doctors should deceive their patients more often', 'The relationship between mind, body, and medicine is complex', 'Real treatments are not always necessary'], answer: 2, explanation: '"These findings raise profound questions about the nature of healing and the relationship between mind, body, and medicine."' },
    ],
  },
  {
    id: 20, level: 'FCE', title: 'Artificial Intelligence in Everyday Life', topic: 'Technology & Society',
    wordCount: 215,
    text: `Artificial intelligence (AI) has moved from science fiction into everyday life with remarkable speed. Algorithms now recommend the music we listen to, the films we watch, and the products we buy. Voice assistants like Siri and Alexa respond to our spoken commands. In hospitals, AI systems analyse medical images with a level of accuracy that rivals experienced radiologists. On the roads, self-driving technology is being tested in multiple countries. The pace of progress has been extraordinary.\n\nYet as AI becomes more integrated into society, significant concerns have emerged. One of the most pressing is bias. AI systems learn from historical data, and if that data reflects existing social inequalities — in criminal justice, hiring, or lending — the AI will reproduce and potentially amplify those inequalities. A facial recognition system trained predominantly on white faces, for example, is known to perform significantly worse on faces of people with darker skin.\n\nThere are also concerns about privacy. AI systems collect and analyse enormous amounts of personal data, raising questions about who owns that data and how it is used. Employment is another anxiety: economists disagree about whether AI will ultimately create more jobs than it destroys, or lead to widespread technological unemployment.\n\nNavigating these challenges requires thoughtful regulation, international cooperation, and an informed public capable of engaging critically with the technology that increasingly shapes their lives.`,
    questions: [
      { q: 'Which of the following is NOT mentioned as a current use of AI?', options: ['Recommending music', 'Analysing medical images', 'Designing new buildings', 'Powering voice assistants'], answer: 2, explanation: 'The text mentions music recommendations, medical imaging, voice assistants, and self-driving vehicles — not building design.' },
      { q: 'What is meant by "bias" in AI systems?', options: ['AI systems making calculation errors', 'AI reproducing social inequalities from historical data', 'AI systems working too slowly', 'AI making decisions without human approval'], answer: 1, explanation: '"If that data reflects existing social inequalities, the AI will reproduce and potentially amplify those inequalities."' },
      { q: 'What is the problem with a facial recognition system trained mainly on white faces?', options: ['It is too expensive to develop', 'It cannot recognise any faces accurately', 'It performs worse on people with darker skin', 'It violates copyright laws'], answer: 2, explanation: '"A facial recognition system trained predominantly on white faces is known to perform significantly worse on faces of people with darker skin."' },
      { q: 'What do economists disagree about regarding AI and employment?', options: ['Whether AI can be properly regulated', 'Whether AI will create more jobs or cause unemployment', 'Whether AI systems are reliable enough to use', 'Whether AI should be allowed in hospitals'], answer: 1, explanation: '"Economists disagree about whether AI will ultimately create more jobs than it destroys, or lead to widespread technological unemployment."' },
      { q: 'What does the final paragraph suggest is needed to manage AI challenges?', options: ['Banning AI in sensitive areas', 'Letting technology companies self-regulate', 'Regulation, cooperation, and an informed public', 'Stopping AI development immediately'], answer: 2, explanation: '"Navigating these challenges requires thoughtful regulation, international cooperation, and an informed public."' },
    ],
  },
]

const LEVELS = ['KET', 'PET', 'FCE']
const LEVEL_COLOR = { KET: '#10b981', PET: '#f59e0b', FCE: '#7c3aed' }
const LETTERS = ['A', 'B', 'C', 'D']

// ─── Component ────────────────────────────────────────────────────────────────

export default function Reading({ user, onBack }) {
  const [activeLevel, setActiveLevel] = useState('KET')
  const [selectedPassage, setSelectedPassage] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [aiExplain, setAiExplain] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const q = searchQuery.trim().toLowerCase()
  const filtered = PASSAGES.filter(p =>
    p.level === activeLevel &&
    (!q || p.title.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q) || p.text.toLowerCase().includes(q))
  )

  function openPassage(passage) {
    setSelectedPassage(passage)
    setUserAnswers({})
    setShowResults(false)
    setAiExplain('')
  }

  function closePassage() {
    setSelectedPassage(null)
    setUserAnswers({})
    setShowResults(false)
    setAiExplain('')
  }

  function selectAnswer(qIdx, optIdx) {
    if (showResults) return
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }))
  }

  function checkAnswers() { setShowResults(true) }

  async function askAI() {
    if (!selectedPassage) return
    setAiLoading(true)
    setAiExplain('')
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'reading_explain',
          payload: {
            title: selectedPassage.title,
            level: selectedPassage.level,
            topic: selectedPassage.topic,
            text: selectedPassage.text,
          },
        }),
      })
      const data = await res.json()
      setAiExplain(data.text || '暂无解析，请稍后重试。')
    } catch {
      setAiExplain('请求失败，请检查网络连接。')
    }
    setAiLoading(false)
  }

  const score = selectedPassage
    ? selectedPassage.questions.filter((q, i) => userAnswers[i] === q.answer).length
    : 0

  // ── Passage Reading View ──────────────────────────────────────
  if (selectedPassage) {
    const total = selectedPassage.questions.length
    const answered = Object.keys(userAnswers).length
    const allAnswered = answered === total

    return (
      <div className="reading-page">
        <div className="reading-header">
          <button className="reading-back-btn" onClick={closePassage}>← 返回列表</button>
          <div className="reading-header-info">
            <span className="reading-level-tag" style={{ background: LEVEL_COLOR[selectedPassage.level] }}>
              {selectedPassage.level}
            </span>
            <span className="reading-header-title">{selectedPassage.title}</span>
            <span className="reading-header-topic">{selectedPassage.topic}</span>
          </div>
        </div>

        <div className="reading-body">
          <section className="reading-article">
            <h3 className="article-title">{selectedPassage.title}</h3>
            {selectedPassage.wordCount && (
              <div className="article-meta">📝 {selectedPassage.wordCount} words · {selectedPassage.level}</div>
            )}
            <p className="article-text">{selectedPassage.text}</p>

            <div className="ai-explain-section">
              <button className="ai-explain-btn" onClick={askAI} disabled={aiLoading}>
                {aiLoading ? '⏳ AI 分析中…' : '🤖 AI Explain'}
              </button>
              {aiExplain && (
                <div className="ai-explain-box">
                  <div className="ai-explain-label">AI 解析</div>
                  <p className="ai-explain-text">{aiExplain}</p>
                </div>
              )}
            </div>
          </section>

          <section className="reading-quiz">
            <h4 className="quiz-heading">Comprehension Questions</h4>
            <div className="quiz-list">
              {selectedPassage.questions.map((q, qIdx) => {
                const chosen = userAnswers[qIdx]
                const isCorrect = chosen === q.answer
                return (
                  <div key={qIdx} className={`quiz-item${showResults ? (isCorrect ? ' correct' : ' wrong') : ''}`}>
                    <p className="quiz-question">
                      <span className="quiz-num">Q{qIdx + 1}.</span> {q.q}
                    </p>
                    <div className="quiz-options">
                      {q.options.map((opt, oIdx) => {
                        let cls = 'quiz-option'
                        if (chosen === oIdx) cls += ' chosen'
                        if (showResults) {
                          if (oIdx === q.answer) cls += ' answer'
                          else if (chosen === oIdx) cls += ' wrong-choice'
                        }
                        return (
                          <button key={oIdx} className={cls} onClick={() => selectAnswer(qIdx, oIdx)} disabled={showResults}>
                            <span className="option-letter">{LETTERS[oIdx]}</span>
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                    {showResults && !isCorrect && (
                      <p className="quiz-explanation"><strong>解析：</strong>{q.explanation}</p>
                    )}
                    {showResults && isCorrect && (
                      <p className="quiz-explanation correct-note">Correct! {q.explanation}</p>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="quiz-footer">
              {!showResults ? (
                <button className="check-btn" onClick={checkAnswers} disabled={!allAnswered}>
                  {allAnswered ? 'Check Answers' : `请先回答全部 ${total} 题 (${answered}/${total})`}
                </button>
              ) : (
                <div className="score-display">
                  <span className="score-icon">{score === total ? '🎉' : score >= total / 2 ? '👍' : '💪'}</span>
                  <span className="score-text">
                    得分：{score} / {total}{score === total && '  满分！'}
                  </span>
                  <button className="retry-btn" onClick={() => { setUserAnswers({}); setShowResults(false) }}>
                    重新作答
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    )
  }

  // ── Passage List View ─────────────────────────────────────────
  return (
    <div className="reading-page">
      <div className="reading-header">
        {onBack && (
          <button className="reading-back-btn" onClick={onBack}>← 返回</button>
        )}
        <div className="reading-title-group">
          <span className="reading-icon">📄</span>
          <h2 className="reading-title">Reading Comprehension</h2>
          <span className="reading-subtitle">英语阅读理解</span>
        </div>
      </div>

      <div className="reading-level-tabs">
        {LEVELS.map(lv => (
          <button
            key={lv}
            className={`reading-level-tab${activeLevel === lv ? ' active' : ''}`}
            style={activeLevel === lv ? { borderBottomColor: LEVEL_COLOR[lv], color: LEVEL_COLOR[lv] } : {}}
            onClick={() => setActiveLevel(lv)}
          >
            {lv}
            <span className="reading-tab-count">
              {PASSAGES.filter(p => p.level === lv).length}篇
            </span>
          </button>
        ))}
      </div>

      <div className="reading-content">
        <div className="reading-search-row">
          <input
            className="reading-search-input"
            type="text"
            placeholder="🔍 搜索文章标题或话题"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="reading-search-clear" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        <p className="reading-tip">
          {activeLevel === 'KET' && 'KET (A2) — 基础词汇阅读，适合小学中高年级'}
          {activeLevel === 'PET' && 'PET (B1) — 中级阅读，适合初中阶段'}
          {activeLevel === 'FCE' && 'FCE (B2) — 较难阅读，适合高中及备考阶段'}
        </p>

        <div className="passage-list">
          {filtered.length === 0 && (
            <p className="no-passages">{searchQuery ? '没有找到匹配的文章' : '该级别暂无文章，敬请期待。'}</p>
          )}
          {filtered.map(p => (
            <button key={p.id} className="passage-card" onClick={() => openPassage(p)}>
              <div className="passage-card-left">
                <span className="passage-level-badge" style={{ background: LEVEL_COLOR[p.level] }}>
                  {p.level}
                </span>
                <div className="passage-info">
                  <div className="passage-card-title">{p.title}</div>
                  <div className="passage-card-meta">
                    <span className="passage-topic">{p.topic}</span>
                    <span className="passage-qcount">{p.questions.length} questions</span>
                    {p.wordCount && <span className="passage-words">{p.wordCount}w</span>}
                  </div>
                </div>
              </div>
              <span className="passage-card-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
