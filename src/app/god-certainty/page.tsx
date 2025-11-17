import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ShieldCheck, Heart, Sparkles, Star } from 'lucide-react';

const certaintyTopics = [
  {
    icon: <Heart className="h-10 w-10 text-primary" />,
    title: 'Certainty in God\'s Existence and Oneness',
    description:
      'A firm faith in the existence of one Creator for this universe, who governs it with all wisdom and justice. This certainty is the foundation of all good and the source of true tranquility.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Certainty in His Names and Attributes',
    description:
      'Knowing God\'s beautiful names and sublime attributes increases His love and glorification in the heart. Certainty that He is the Most Merciful, the Almighty, grants the believer security and trust.',
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: 'Certainty in His Words (The Holy Quran)',
    description:
      'Complete belief that the Holy Quran is the revealed word of God, containing guidance, light, and healing. Contemplating its verses and acting upon them is the path to certainty and salvation.',
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: 'The Fruits of Certainty in God',
    description:
      'Certainty yields contentment with God\'s decree, courage in facing life, serenity in the heart, and righteous deeds that please God and benefit people.',
  },
];

export default function GodCertaintyPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          Certainty in God and His Words
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          The foundation of the spiritual journey and the source of inner peace and strength.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certaintyTopics.map((topic, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">{topic.icon}</div>
              <CardTitle className="font-headline text-2xl">{topic.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base">
                {topic.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="my-16 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold flex items-center gap-3">
             <Star className="h-8 w-8 text-primary" />
            Knowing God: The Essence of Tawhid and its Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-lg">
            <div className="space-y-2">
                <h3 className="font-bold text-xl font-headline">"La ilaha illa Allah": The Key to Certainty</h3>
                <p className="text-muted-foreground leading-relaxed">
                   The essence of the Islamic message and its core is the statement of Tawhid, "La ilaha illa Allah" (There is no god but Allah). This phrase is not merely a verbal utterance but a comprehensive way of life based on knowledge and action. Certainty in it is the source of true honor. The strength of certainty in the heart determines one's steadfastness and elevation. The Tawhid indicated by this great statement is divided into three interconnected parts:
                </p>
            </div>
            <div className="space-y-2 border-t pt-6">
                <h3 className="font-bold text-xl font-headline">1. Tawhid al-Rububiyyah (Oneness of Lordship): Certainty in the Creator and Sustainer</h3>
                <p className="text-muted-foreground leading-relaxed">
                    It is the firm acknowledgment that Allah Almighty is the one Lord with no partner; He is the Creator, the Provider, the Owner, the Giver of life and death, and the Manager of all affairs. This type of Tawhid was acknowledged by the disbelievers at the time of the Prophet ﷺ, but they did not enter Islam because they did not fulfill its requirements. Allah says: "And if you asked them, 'Who created the heavens and the earth?' they would surely say, 'Allah.'" (Luqman: 25). Certainty in His Lordship is the basis for absolute submission to God's command and contentment with His decree, which brings tranquility to the heart during calamities.
                </p>
            </div>
             <div className="space-y-2 border-t pt-6">
                <h3 className="font-bold text-xl font-headline">2. Tawhid al-Uluhiyyah (Oneness of Worship): The Purpose of Creation</h3>
                <p className="text-muted-foreground leading-relaxed">
                    It is to single out Allah Almighty for all acts of worship, both outward and inward, verbal and practical. This is the Tawhid with which the Messengers were sent and the Books were revealed, and it is the true meaning of "La ilaha illa Allah." Thus, no one is supplicated to but Allah, no help is sought except from Him, no trust is placed except in Him, and prayer, vows, or sacrifices are not offered to anyone but Him. Allah says: "And I did not create the jinn and mankind except to worship Me." (Adh-Dhariyat: 56). Certainty in Lordship necessitates certainty in worship; whoever acknowledges Him as the Lord and Creator must single Him out for worship.
                </p>
            </div>
             <div className="space-y-2 border-t pt-6">
                <h3 className="font-bold text-xl font-headline">3. Tawhid al-Asma' wa al-Sifat (Oneness of Names and Attributes): Certainty in God's Absolute Perfection</h3>
                <p className="text-muted-foreground leading-relaxed">
                    It is to believe in what Allah has described Himself with in His Book, and what His Messenger ﷺ has described Him with, of the most beautiful names and sublime attributes. It involves affirming them for Allah in a manner that befits His majesty and greatness, without distortion, denial, qualification, or comparison. Certainty in this aspect fosters love and reverence for God in the heart. When you know He is the All-Hearing, the All-Seeing, you become shy of Him seeing you do what He dislikes or hearing you say what angers Him. Allah says: "There is nothing like unto Him, and He is the Hearing, the Seeing." (Ash-Shura: 11).
                </p>
            </div>
        </CardContent>
      </Card>

       <div className="text-center mt-16 bg-card p-8 rounded-lg shadow-inner">
          <h2 className="font-headline text-3xl font-bold mb-4">
            How Do You Attain Certainty?
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed">
            The path to certainty is a journey that begins with sincere prayer, continues with contemplation of the creation of the heavens and the earth, deepens with reading and pondering the Quran, and is completed with righteous deeds and the companionship of good people. It is a journey of the heart and soul seeking closeness to God.
          </p>
        </div>
    </div>
  );
}
