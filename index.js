document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});

function output(input) {
  let product;

  // Normalize the input text
  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ") // 'tell me a story' -> 'tell me story'
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  // Compare input text to prompts and get the response
  product = compare(prompts, responses, text);
  
  if (!product) {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Update DOM
  addChat(input, product);
}

function compare(promptsArray, responsesArray, inputString) {
  // Convert input to lowercase for case-insensitive comparison
  const normalizedInput = inputString.toLowerCase();
  
  // Iterate through each set of prompts
  for (let i = 0; i < promptsArray.length; i++) {
    // Check if the input matches any prompt
    if (promptsArray[i].includes(normalizedInput)) {
      // Return the corresponding response
      return responsesArray[i];
    }
  }
  // If no match is found, return null
  return null;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product);
  }, 2000);
}

// Define prompts and responses arrays
const prompts = [
  "hello",
  "hey",
  "hi",
  "i feel worried",
  "i am unable to get pregnant.",
  "1 year or less",
  "sure, tell me",
  "how do i keep track of my fertile days?",
  "i am having sex on those days but still unable to get pregnant",
  "i want to know more about maintaining a normal weight",
  "i am not able to get pregnant.",
  "more than 2 years",
  "what kind of infertility issues do men have?",
  "what kind of infertility issues do women have?",
  "how do i know if i have this issue?",
  "what is pcod?",
  "what is endometriosis?",
  "what are infections?",
  "what are tubal blockages?",
  "what are fibroids?",
  "what are autoimmune disorders?",
  "what should i do if i have any of these issues?",
  "do i need to visit a doctor if i have any of these issues?",
  "how do i know if i am having fertility issues?",
  "i want to know about my fertility treatment options",
  "what is assisted reproductive technology?",
  "what is adoption?",
  "what are my alternate treatment options?",
  "what is homeopathy?",
  "what is yoga?",
  "what is ayurveda?",
  "what disturbs female fertility?",
  "how can i know if i have infertility issues?",
  "im good",
  "what is Infraradian Rhythm?",
  "what happens to my body when I am in the menstrual phase?",
  "do any changes occur in my brain during menstrual phase?",
  "what is vaginal discharge?",
  "how do i know if i this kind of discharge?",
  "are there other kinds of vaginal discharge?",
  "what are the types of discharge when it comes to vaginal health?",
  "what are nonsexually transmitted infections?",
  "what is bacterial vaginosis?",
  "what is thrush?",
  "what is the ideal female vagina ph balance?",
  "what are the types of odors/smells can come from vagina?",
  "i have rashes on my private parts. what should i do?",
  "what are sexually transmitted infections?",
  "what are the types of sexually transmitted infections?",
  "what is chlamydia?",
  "what is syphilis?",
  "what is gonorrhea?",
  "what is hepatitis b?",
  "what is hepatitis c?",
  "what is trichomonas?",
  "what is human papillomavirus hpv?",
  "what is herpes?",
  "what are hiv and aids?",
  "what are the symptoms of hiv?",
  "how can you prevent hiv?",
  "I have an STI",
  "yes i think i have or may have these symptoms.",
  "how can i treat sexually transmitted infections?",
  "what can i do to prevent the spreading of sexually transmitted infections?",
  "yes i think i don’t have or may have these symptoms.",
  "what is the difference between sexually transmitted infection sti and sexually transmitted disease std?",
  "what are some symptoms of sexually transmitted infection sti?",
  "i have some of these symptoms my partner has some of these symptoms.",
  "how can i get treatment for sexually transmitted infection sti?",
  "i'm worried if i have an sti.",
  "should i inform my partner? is it necessary to inform my partner?",
  "i feel sad and depressed and can't share it with anyone.",
  "what are some facts about sexually transmitted infections?",
  "does contraception prevent against sexually transmitted infections?",
  "what are some myths about sexually transmitted infections?",
  "does hepatitis b or hepatitis c spread through contact?",
  "what are some precautions that i should take if i have a sexually transmitted infection sti?",
  "what is safe sex?",
  "how can i prevent sexually transmitted infections sti?",
  "what is cervical screening?",
  "how can vaccines prevent against sexually transmitted infections sti?",
  "what are some precautions that i should take if i have a sexually transmitted infection sti?",
  "how does sexually transmitted infection sti affect fertility?",
  "what are some other complications with sexually transmitted infection sti?",
  "what is pelvic inflammatory disease?",
  "what is cervical cancer?",
  "what is sti in pregnancy?",
  "what kind of diet should i follow during my periods?",
  "is it okay to shower when you're menstruating?",
  "is it true that girls are getting periods earlier than they used some decades ago?",
  "i feel unwell and am anxious",
  "i have horrible cramps",
  "what can i do to stop the pain?",
  "can i take a bath during menstruation?",
  "what should we do to change our mood during periods?",
  "how should we control period pain?",
  "is there any trouble if you have excessive periods?",
  "can we take medicine for period pain?",
  "is it dangerous to take painkillers for menstrual cramps?",
  "how many days should a period cycle last normally?",
  "should you take a shower during periods?",
  "does the menstruating cycle end in 7 days or more?",
  "why does period pain increase on the first day?",
  "at what age does menstruation stop?",
  "why does period pain occur before periods?",
  "are menstrual cups effective?",
  "how do i educate myself about periods?",
  "what should i do when i get my period?",
  "can i use a cloth instead of a pad?",
  "what are the disadvantages of using cloth during periods?",
  "what kind of infections can we get during periods?",
  "how long should a normal menstrual cycle last?",
  "why is a period considered impure?",
  "does physical activity affect periods?",
  "does everyone experience bad cramps?",
  "what is a period?",
  "why do women menstruate?",
  "do any other living creatures have a menstrual cycle?",
  "why does the stigma around menstruation exist?",
  "how much blood do we approximately lose during our periods?",
  "how long does a period cycle last?",
  "how do i know when it's ended?",
  "i noticed different colors of blood throughout my period; do they have any significance?",
  "what hormones are involved in menstruation?",
  "what to do if my menstrual cycle is irregular?",
  "how does birth control pills affect menstruation?",
  "is premenstrual syndrome real?",
  "if the period lasts 3 days, does that mean a low chance of fertility?",
  "does different blood colors mean different things during periods?",
  "why does the blood clot during periods?",
  "what if the period lasts only 3 days?",
  "why do my periods have clumps in it?",
  "can you explain more about clumps in period blood?",
  "is it normal if my periods last for 3 days?",
  "why are periods so painful?",
  "why do we experience cramps during the early days of the period?",
  "tell me about irregular period cycles.",
  "tell me about pcos and how should we manage it?",
  "does using medication for pain relief help during menstruation, and does it affect the flow?",
  "is it normal to see a change in flow of periods before and after marriage?",
  "my period is late. what should i do?",
  "can we use pads for 2 days?",
  "my cycle is not regular"
];

const responses = [
  "Hello! How are you feeling today?",
  "Hey! How are you feeling today?",
  "Hi there! How are you feeling today?",
  "Why do you feel that way?",
  "How long has it been since you started trying to get pregnant?",
  "If you have just started trying to get pregnant, then there are a few things that could help with your pregnancy and a very important thing is to have sex on your most fertile days. Do you want to know the days on which your chances of pregnancy are higher?",
  "It is important to map your menstrual cycle every time to find the right time to get pregnant. Ovulation period usually occurs between 12 to 16 days after the previous menstrual cycle and the 4 to 5 days before ovulation is your most fertile window. The ovulation period differs for each woman and monitoring and noting down your ovulation cycle for 3 to 4 consecutive periods will give you a good idea. Having sex on these days could increase the chances of pregnancy by a great margin. Are you having sex on your fertile window but still haven't got pregnant?",
  "You can check your fertile days with an app called Clue. It is available on the Playstore. Here is a quick link to the app: https://helloclue.com",
  "If you are already having sex on your fertile days, then there are a few points that may hinder your pregnancy. These include getting rid of alcohol and smoking, maintaining a normal body weight, apart from this, you can also try eating healthy food and taking prenatal vitamins.",
  "Maintaining a normal body weight will help with pregnancy even if you have PCOD.",
  "How long has it been since you started trying to get pregnant?",
  "If you are trying for a long time and still haven't got pregnant, then you or your partner may have fertility issues. Both of you need to go for some tests to find out what the issue is. For men, a physical examination and a sperm test will be conducted. For women, physical examination, ultrasound test, x-ray, blood test, urine test and laparoscopy will be conducted to know the fertility problems. After diagnosis, you may go for the relevant fertility treatments.",
  "Male infertility issues may be due to low sperm count or mobility, infections in reproductive organs or hormonal imbalance. Most of the issues with male infertility are linked to stress, weight, alcohol, and smoking.",
  "There are many infertility issues including endometriosis, fibroids, PCOD, and tubal blockages.",
  "If you are trying for a long time and still haven't got pregnant, then you or your partner may have fertility issues. Consult a fertility specialist.",
  "PCOD/PCOS is a condition where high levels of hormones interfere with the ovarian follicles and the release of eggs during ovulation. Regular exercises and healthy diet can bring the hormones in control.",
  "Endometriosis is a condition where the lining of the abdomen goes through changes leading to pain and discomfort.",
  "A previous infection in the urinary system like the kidney, bladder, urethra or conditions like gonorrhea and chlamydia may lead to fertility issues. It is important to check with a doctor and take proper medications for it.",
  "Blockage of the fallopian tubes may stop the sperm from fertilizing the egg making it difficult to get pregnant. This blockage can be detected by HSG test where a dye is passed through the uterus to find any blocks. The blockages can be removed by surgery.",
  "Fibroids are noncancerous growths inside the uterus that hinder the sperm from reaching the egg. Fibroids can be diagnosed by CT scan, laparoscopy, or ultrasound and can be removed surgically.",
  "The body's immune system may attack the normal tissues leading to issues in the reproductive organs. This can be treated by proper medication.",
  "Your next step should be to visit a doctor and get a consultation for your condition so that you can be correctly guided onto the right path.",
  "Yes. It is important that you visit a doctor so that you can be correctly diagnosed.",
  "How long has it been since you started trying to get pregnant?",
  "There are many fertility treatment options that you can explore, including Assisted Reproductive Technology (ART), Adoption, and some other treatment options. What Do You Want To Know About?",
  "Assisted Reproductive Technology (ART) involves handling the sperm and egg for better fertilization. Usually, IUI will be the preferred fertility treatment and if IUI doesn't bring results, the doctor will recommend IVF. What do you want to know about?",
  "If you or your partner have fertility issues that weren't resolved after going through all the treatment options, then adopting a child will be the most fulfilling. Visit the government website for adoption CARA or visit your nearest adoption agency for more details.",
  "Apart from the ART treatments, there are several non-invasive treatment options for both male and female infertility issues including Homeopathy, Yoga, and Ayurveda. The solution for fertility issues is not a single treatment. A combination of treatments will help to get pregnant.",
  "Some fertility issues can be treated by homeopathy treatment taken religiously for a few months.",
  "There are certain yoga techniques that have been found to boost fertility and resolve any reproductive issues. It also relieves stress which is a major basis for infertility problems. Speak with a specialist to know more about how yoga can help you.",
  "Ayurvedic medicines and treatments along with yoga can greatly help with restoring both male and female fertility.",
  "There are many conditions that could disturb a woman's fertility. If you have been diagnosed with any fertility issues then you should visit a doctor.",
  "Is your menstrual cycle irregular? Do you consume alcohol or smoke tobacco? Are you overweight or underweight? If your answer is yes to any of the questions above, then you may probably have some fertility issues. It is high time to contact a fertility specialist to check out.",
  "Great! So, how can I help you?",
  "The infradian rhythm is one of the two internal timekeepers experienced by women. People with male physiology only experience the circadian rhythm. People with female physiology experience both. The infradian rhythm and its four phases track with your menstrual cycle, and alongside affecting the reproductive hormones, it also has an influence the other parts of your body. The infradian rhythm affects our physiology cyclically which is why it supports your body in a cyclical way too. As a woman yourself, in order to have optimal hormonal and overall health, it is ideal that you eat, move, supplement and live in line with this infradian rhythm, which is expressed in your mesntrual cycle in four distinct phases, namely the follicular, ovulatory, luteal and menstrual phase.",
  "A few changes do happen. The corpus luteum  it is a vital yet temporary organ that plays a crucial role in fertility in your body gets reabsorbed. Simultaneously, progesterone levels decline, your uterus sheds the thick endometrial lining that it has built up in the luteal phase and estrogen hits its lowest point just before your bleed",
  "Yes, it does! The left analytical and right feeling hemispheres of your brain communicate the most during this time, which means its a great time to integrate how you feel about situations in your life and make decisions about how to proceed. This is an ideal time to reflect and journal. ",
  "Vaginal discharge is fluid that comes from the vagina and is not a period. It can be clear, white, or offwhite in color and have a elastic-like consistency.", 
  "Normal vaginal discharge occurs in clear or white color. The color can vary throughout your cycle. It is common to have it at the beginning and the end of your cycle. As you approach ovulation (the release of the egg), you may notice mucous down there; it kind of looks like egg white. Your body tends to produce the greatest amount of this type of vaginal discharge on the day of ovulation, so you may want to wear a liner at this time.", 
  "Yes. Physiological discharge and abnormal discharge. Physiological discharge usually occurs in the middle of the menstrual cycle, also during pregnancy due to hormonal changes. This discharge does not smell and is clear. Abnormal discharge can be caused by a yeast infection, menopause, or a sexually transmitted infection.", 
  "Physiological discharge and abnormal discharge. Physiological discharge usually occurs in the middle of the menstrual cycle, also during pregnancy due to hormonal changes. This discharge does not smell and is clear. Abnormal discharge can be caused by a yeast infection, menopause, or a sexually transmitted infection.", 
  "These are infections that are not transmitted sexually and include bacterial vaginosis and thrush.", 
  "This infection is caused due to overgrowth of normal vaginal bacteria. It causes discharge that has a fishy odor and is gray in color. The infection can be treated with antibiotics.", 
  "This infection is caused by Candida, a fungus. It causes thick whitish creamy vaginal discharge, itching, and redness around the vagina. The discharge is odorless. Fungi usually tend to grow in a warm, moist environment; hence, it is advised to keep the vaginal area clean and dry.", 
  "pH is the measure of acidity and is measured on a scale of 0-14. Lower pH value, less than 7, is considered acidic. The normal vaginal pH is acidic, 3.8-4.5. This normal pH is maintained by the right balance of normal vaginal bacteria; when this balance gets disturbed, the pH gets affected, resulting in different infections. For instance, in the case of bacterial vaginosis, the vaginal pH becomes alkaline, and in the case of thrush, it becomes more acidic.", 
  "There is a peculiar vaginal odor; apart from that, there are other types of odors that signify any abnormality. Among the abnormal smells include a fishy odor that occurs in the case of bacterial vaginosis and one of the sexually transmitted infections called trichomoniasis. If you are watching out for vaginal infection, usually there is some sort of discharge, redness, and soreness of the private part along with a bad odor.", 
  "There are different causes of rashes in the private part; some are due to infections and others are due to irritants or some other disease. Talking about irritants, you might be allergic to any sort of cloth material that you have never used before, and it is new to you. This is true for detergents as well, as you might not know about the allergy to some chemicals until you use them. Keep the private part dry and clean because moist and unhygienic practices make these rashes worse. The other causes could be infections like sexually transmitted or nonsexually transmitted infections, but they occur with some other problems like discharge and lumps and bumps in the private part. If you think your rashes are due to some irritant and they don’t go away even after changing the material that was the irritant according to you, you must see your doctor to rule out other possible causes of the rash.", 
  "Sexually Transmitted Infection (STI) is a type of infection that can be transmitted from one person to another while having sex. There are several different types of STI caused by different sorts of pathogens. STIs often have no symptoms.", 
  "Well, several pathogens such as bacteria, viruses, and parasites can cause STI of varying severity. Most common among those are chlamydia and gonorrhea, but there are many others including syphilis, hepatitis B and C, trichomonas, Human papillomavirus (HPV), herpes, and HIV/AIDS.", 
  "It is a type of bacteria that can be passed from one person to another while having sexual contact; it may cause discharge from the vagina or penis in males.", 
  "Syphilis is caused by a bacterium called Treponema pallidum. It causes ulcers over the genital region, and if left untreated, the condition may progress to further stages. The condition can be cured with antibiotics. If left untreated, syphilis can be passed from mother to baby.", 
  "Gonorrhea causes abnormal discharge from the front passage. It can be successfully treated by taking a short course of antibiotics.", 
  "Hepatitis B is transmitted via sexual contact. It is basically a virus that can spread not just via sexual contact but also by transfusion of blood from a person who already has hepatitis B. This virus causes liver problems in the long run. Thankfully, hepatitis B vaccines are available easily.", 
  "Hepatitis C is a viral infection that causes infection of the liver. The virus can spread by various means, including sexual contact, sharing infected needles, and getting blood transfused from a person who is infected with hepatitis C. A baby can get the virus from the mother, usually at the time of delivery. Unfortunately, the virus doesn’t produce any symptoms until the liver starts getting damaged and its functions affected. Vaccination isn’t available against the virus up till now and cure is also not possible. But drugs are available to slow down the progression of the disease.", 
  "It is a parasite that is spread via sexual contact. It causes vaginal discharge and itching in the private part. The infection may be treated by a short course of antibiotics.", 
  "It is a virus that causes warts and cervical cancer. The virus is spread via close contact and sexual contact.", 
  "It is a virus that is spread via sexual contact. It causes painful blisters around the private area. Unfortunately, the virus cannot be completely cleared, but treatment can be provided to alleviate the symptoms and problems it causes.", 
  "Having HIV infection doesn’t mean that a person has AIDS. HIV stands for Human Immunodeficiency Virus that causes AIDS (Acquired Immunodeficiency Syndrome). HIV infections spread by sexual contact, from mother to baby during pregnancy or while giving birth, sharing contaminated needles, and getting blood transfused from an HIV-positive person. Every person who is infected with HIV doesn’t develop AIDS.", 
  "Initially, as soon as a person is infected with HIV, it causes flu-like symptoms. Basically, this virus attacks our immune system, and it takes several years for the immune cells to get affected enough to produce symptoms. So, after several years, the person starts getting infections of various types from head to toe as the body’s immune system is too weak to combat the pathogens.", 
  "If you think you have been exposed to HIV and it hasn’t been 72 hours yet, then you can get Postexposure Prophylaxis (PEP). If you use injections for any purpose, make sure that they haven’t been used previously. If one needs a blood transfusion, make sure that it’s from an authentic blood bank that offers genuine screening of the donor’s blood. If you are a healthcare professional, then you must take precautions to avoid needle-stick injuries. If you are pregnant and HIV-positive, you must visit your gynecologist as soon as possible and discuss the treatment plan and mode of delivery to prevent the baby from getting exposed to HIV.", 
  "Do you have: 1. Discharge from the vagina? 2. Abnormal vaginal bleeding? 3. Any abnormality like soreness, ulcer, rash, or swelling around the private part? 4. Pain while having sex? 5. Rarely, pain when you pass urine? 6. Are you worried if you have some vaginal infection but they don’t show any of these symptoms?", 
  "It is possible that you have a vaginal infection called Sexually Transmitted Infection (STI).", 
  "Treatment of STI depends upon the type of pathogen that has caused it. Some can be cured completely, like in the case of chlamydia, gonorrhea, trichomonas, and syphilis. Whereas at times, the infection cannot be cured completely, for instance, in the case of herpes, but treatment can be provided to reduce the flare-ups of the disease. Treatment of hepatitis B and C, as well as of HIV, is done with combination therapy and continuous monitoring, and despite that, a complete cure cannot be guaranteed. Treatment is aimed at alleviating symptoms, preventing complications, and spreading the disease. It is also important to note that some STIs can spread; therefore, it is important to take necessary precautions to prevent the further spread of the disease.", 
  "Using condoms during sex not only provides protection against the transmission of STI but also serves as contraception. If you’re diagnosed with STI, it is highly advised to avoid any kind of intimate sexual contact entirely until you have been fully treated. Do not donate blood. Do not share needles, razors, or any sharp objects meant for personal use. If you have any cuts or wounds, you should keep them covered.", 
  "Then it is possible that you do not have these symptoms. However, you can still ask a doctor for help.", 
  "Don’t worry; both terms refer to similar conditions. Previously, the condition was called sexually transmitted diseases (STDs), but having a disease means the condition always presents with symptoms, whereas it’s not necessary to have symptoms with infections. Because the condition can sometimes be asymptomatic, the name was changed to sexually transmitted infections (STIs).", 
  "Some symptoms of Sexually Transmitted Infections include: 1. Discharge from the vagina? 2. Abnormal vaginal bleeding? 3. Any abnormality like soreness, ulcer, rash, or swelling around the private part? 4. Pain while having sex? 5. Rarely, pain when you pass urine?", 
  "You and your partner need to get treatment. You should get yourself and your partner checked by a doctor or expert for the type of infection that you may have.", 
  "Treatment of STI depends upon the type of pathogen that has caused it. Some can be cured completely, like in the case of chlamydia, gonorrhea, trichomonas, and syphilis. Whereas at times, the infection cannot be cured completely, for instance, in the case of herpes, but treatment can be provided to reduce the flare-ups of the disease. Treatment of hepatitis B and C, as well as HIV, is done with combination therapy and continuous monitoring.", 
  "There are certain screening tests that can help you find out if you have any sort of STI or not. There are certain STIs that cause lesions that can be identified on physical examination, for instance, warts caused by human papillomavirus (HPV). Other causes of STIs like chlamydia, gonorrhea, and trichomonas can be found by swab tests. A swab is like a cotton bud that is rotated around areas like the vagina, penis, back passage, and sometimes even the throat; the swab is examined under a microscope and/or sent to a laboratory for closer examination. Infections due to chlamydia can also be detected by urine tests. For certain causes, like hepatitis B, hepatitis C, and HIV, blood tests are required. However, if you are worried, you should ask a doctor or expert for help.", 
  "STI treatment is incomplete without the partner being investigated for STIs and treated as needed. Treatment of the partner is essential because if the partner carries the pathogen, it will be transmitted to you again during sex, and you might end up with complications of STI. Therefore, to end this vicious cycle of reinfections, it is important to involve the partner in the treatment plan.", 
  "I can understand how you feel. But you need to understand that it’s not your fault if you have STI. You should share it with your partner and doctor at least as it would help you in the treatment. Seeking help for the sake of your health is your right and responsibility. You can also seek expert psychological support and talk your worries out if you have problems facing it.", 
  "There are certain factors that contribute to the spread of STIs. These include unsafe sexual practices, homosexuality, unsafe blood transfusion, intravenous drug abuse, and reusing syringes. Not every type of vaginal discharge means that a person has STI. At times, vaginal discharge is normal. There are certain infections like thrush and bacterial vaginosis that may also cause vaginal discharge and itching, but they are not STIs. If you are diagnosed with any STI, it is extremely important to tell your partner about it and convince them to see a health professional for investigations and treatment.", 
  "Methods of contraception like pills do not protect against STI. Using condoms provides protection against spreading STIs, but it’s not 100% effective.", 
  "Viruses like hepatitis B and C and HIV are not passed on during normal social contact, such as holding hands, hugging, or sharing cups or crockery.", 
  "It is advised to practice safe sex in order to avoid catching STIs. Using condoms (male and female) during sex is a highly recommended barrier method. Although it doesn’t provide 100% protection, it does prevent the spread of STIs to a greater extent. Even if you are in a committed relationship, it is highly recommended to use condoms, as STI pathogens often do not cause symptoms but can be spread to the other individual, potentially causing symptoms and problems. You need to be extremely cautious if you are a sex worker, as sex with multiple partners is a huge risk factor for STIs. Use barrier methods and get screening tests done frequently so that even if there is an STI pathogen, even if it’s not causing any obvious problems, it can be treated to prevent any potential complications and avoid spreading the pathogen.", 
  "You can prevent Sexually Transmitted Infections using Cervical Screening, Vaccines, or by taking precautions. Cervical screening is a method to detect any abnormal changes in the cervix. One can be prevented from having cervical cancer and its consequences by a simple test. Cervical cancer is caused by HPV (Human Papillomavirus). Vaccine against HPV is available. Two doses are recommended, and it is advised to get the vaccine before you are sexually active. Hepatitis B vaccination is also available and is highly effective.", 
  "Condoms may be used to prevent the spread of STIs; there are male and female condoms available.", 
  "STIs can cause impotency in males and infertility in females because usually patients do not seek expert advice and rely on self-medication due to social taboos, as STIs are sex-borne diseases. Hence, patients avoid seeing a doctor. STIs, if left untreated, damage the reproductive tract, causing difficulty in conceiving and infertility.", 
  "Some other complications that STIs can cause include Pelvic Inflammatory Disease (PID), Cervical Cancer, and STI in Pregnancy. PID is one among the causes of pelvic inflammatory disease. It causes back pain, abnormal vaginal discharge and bleeding, tummy pain, and fever. It is an infection of the womb and its surrounding structures; hence, one may end up with pregnancy outside the womb (ectopic pregnancy) or infertility. The condition can be treated with antibiotics.", 
  "Cervical cancer is caused by HPV. It can be prevented by vaccination against HPV and can be early detected and treated by routine screening tests.", 
  "If you are pregnant and have any STIs, it is highly possible that the infection might spread to the baby inside the womb or while giving birth. You must consult a gynecologist and discuss this issue in detail.",
  "Try to include foods rich in iron, calcium, and vitamins. Avoid heavy or sugary foods.",
  "Yes, it's perfectly okay to shower. Just ensure you stay clean and dry.",
  "Yes, research indicates that the average age of menstruation has been decreasing.",
  "I'm sorry to hear that. Try to relax and consider speaking with a healthcare provider.",
  "Cramps are common. Over-the-counter pain relief or warm compresses can help.",
  "You can use a heating pad or take over-the-counter pain medication.",
  "Yes, you can take a bath. Just make sure to stay comfortable and use proper hygiene.",
  "Engage in relaxing activities or try meditation to improve your mood.",
  "Over-the-counter pain medication, heat pads, or exercise might help alleviate pain.",
  "Excessive bleeding could be a sign of an underlying issue; consult a healthcare provider.",
  "Yes, you can take medicine for pain relief, but follow your doctor's advice.",
  "Painkillers can be effective, but long-term use should be monitored by a healthcare provider.",
  "Typically, periods last between 3 to 7 days.",
  "Yes, it's fine to shower. Good hygiene is important.",
  "Menstrual cycles typically last between 3 to 7 days.",
  "Period pain is often most intense at the start due to uterine contractions.",
  "Menstruation usually ends in the late 40s to early 50s, depending on individual health.",
  "Hormonal changes before your period can cause increased cramps.",
  "Menstrual cups are a sustainable and effective option for managing periods.",
  "Consider reading educational materials or talking to a healthcare provider.",
  "Use sanitary products like pads or tampons and maintain hygiene.",
  "Yes, cloth can be used, but make sure to change it frequently.",
  "Cloths may not be as hygienic as pads and can lead to infections if not changed regularly.",
  "You might be at risk for infections if sanitary products are not changed regularly.",
  "Typically, a menstrual cycle lasts between 21 to 35 days.",
  "In some cultures, menstruation is seen as impure, but it's a natural biological process.",
  "Physical activity can help alleviate cramps and improve overall well-being.",
  "Not everyone experiences severe cramps; it varies from person to person.",
  "A period is the shedding of the uterine lining, part of the menstrual cycle.",
  "Menstruation is a natural biological process necessary for reproduction.",
  "Other animals have similar reproductive cycles, but human menstruation is unique.",
  "The stigma exists due to cultural beliefs and misconceptions about menstruation.",
  "On average, women lose about 30 to 80 milliliters of blood during their period.",
  "A period cycle typically lasts from 3 to 7 days.",
  "You can track your cycle using a calendar or period-tracking app.",
  "Different blood colors can indicate varying stages of your cycle or flow.",
  "Hormones like estrogen and progesterone regulate menstruation.",
  "Irregular cycles can be due to stress, hormonal imbalances, or other factors.",
  "Birth control pills can regulate menstrual cycles and reduce symptoms.",
  "Yes, premenstrual syndrome (PMS) is a real condition affecting many women.",
  "A shorter period does not necessarily mean lower fertility, but it varies.",
  "Different blood colors can indicate different stages or flow rates.",
  "Blood clots during periods are usually normal and can occur due to heavier flow.",
  "It's normal to have periods lasting 3 to 7 days, but consult a doctor if it's unusual.",
  "Clumps in period blood are often normal and can occur with heavier flow.",
  "Clumps can occur due to the shedding of the uterine lining or heavier flow.",
  "Periods typically last between 3 to 7 days. Consult a doctor if it's consistently shorter.",
  "Periods can be painful due to uterine contractions. Pain relief methods can help.",
  "Cramps can be intense initially due to uterine contractions, but they usually ease over time.",
  "Irregular cycles can be due to various factors, including stress and health conditions.",
  "PCOS (Polycystic Ovary Syndrome) can be managed with medication and lifestyle changes.",
  "Pain relief medication can help, but be cautious of potential effects on flow.",
  "Periods can vary before and after marriage, but significant changes should be checked.",
  "Consult a healthcare provider if your period is late or if you have concerns.",
  "Pads can be used for several days, but they should be changed regularly.",
  "Irregular cycles can affect fertility and overall health. Seek medical advice if needed."
];

const alternative = [
  "I don't know how to respond to that.",
  "I'm not too sure about that but I'm here to help.",
  "Let me think about that for a moment.",
  "That's definitely interesting. Let me get back to you on that."
];