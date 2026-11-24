// letters.ts — replace placeholder content with your real letters

export interface Letter {
  id: string;
  from: string;
  greeting: string;
  body: string[];
  closing: string;
  signature: string;
  inkColor: string;
}

export const letters: Letter[] = [
  {
    id: "letter-01",
    from: "Yuvanshankar",
    greeting: "Happiee poranthanaal vaazhthukal captain 🤍🖤",
    body: [
      "turned 22 laa moss kaatringa Aunty 😋 this year namba naraiya vishayam nala therinchi kathukutom, thanks for all you have done to mee till now ☺️, verum thanks mattum sonaa la pathathu thaa but still i would do whatever i can now and in future too 😁.",

      "lets be like this the same till the end i know you would may all your dreams will become true naa vendikuran 🤗 i know it will.",

      "sometimes naa enna ariyaama una kasta paduthirupa 🫩 i know u wont get angry but lita kasta paduthirupan future la yum pannuvan 😈 atha la kandukaaaama jolly ya eppavum pola life la happy yaa iruu.",

      "nxt year la irunthu new life new routine la maarum ella thayum nala explore panni nala frnds la pudii vera ethuvum illa porumai ah ellathayum padichi Majaa pannunga guyss 👻👍",
    ],
    closing: "With all the love I have,",
    signature: "Yuvanshankar",
    inkColor: "#49372B",
  },
  {
    id: "letter-02",
    from: "Kaushalya",
    greeting: "Happiest Birthday to my oru deivam thandha poove 🌻🥺",
    body: [
      "The one always manages to make me smile no matter what's going on. You have this amazing way of turning even smallest moments into something special just by being around.",

      "Honestly I don't say it enough but I really appreciate how you bring so much happiness and magic in to my life. On your birthday I just want you to know how much you mean to me and how grateful I am to have it.",

      "I hope today is filled with all the things you love — good food, great company and lots of laughter. You deserve to be celebrated every single day, but especially today.",

      "Here's to another year of making memories chasing dreams and just being your weird chaotic self.",
    ],
    closing: "I'm rooting for you always babes 😚❤️",
    signature: "Kaushalya",
    inkColor: "#49372B",
  },
];
