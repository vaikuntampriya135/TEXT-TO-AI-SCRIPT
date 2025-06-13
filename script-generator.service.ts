import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface ScriptRequest {
  topic: string;
  type: 'presentation' | 'video' | 'podcast' | 'speech' | 'tutorial';
  duration: number;
  tone: 'professional' | 'casual' | 'educational' | 'entertaining';
  audience: string;
}

export interface GeneratedScript {
  title: string;
  content: string;
  estimatedDuration: number;
  wordCount: number;
  generatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ScriptGeneratorService {
  
  generateScript(request: ScriptRequest): Observable<GeneratedScript> {
    // Simulate AI script generation with realistic delay
    const script = this.createTopicSpecificScript(request);
    return of(script).pipe(delay(2000 + Math.random() * 2000));
  }

  private createTopicSpecificScript(request: ScriptRequest): GeneratedScript {
    const content = this.generateContentBasedOnTopic(request);
    
    return {
      title: `${request.type.charAt(0).toUpperCase() + request.type.slice(1)} Script: ${request.topic}`,
      content: content,
      estimatedDuration: request.duration,
      wordCount: content.split(' ').length,
      generatedAt: new Date()
    };
  }

  private generateContentBasedOnTopic(request: ScriptRequest): string {
    const topicLower = request.topic.toLowerCase();
    
    // Check for specific topics and generate relevant content
    if (this.isAboutNarendraModi(topicLower)) {
      return this.generateModiScript(request);
    } else if (this.isAboutIndia(topicLower)) {
      return this.generateIndiaScript(request);
    } else if (this.isAboutTechnology(topicLower)) {
      return this.generateTechnologyScript(request);
    } else if (this.isAboutBusiness(topicLower)) {
      return this.generateBusinessScript(request);
    } else if (this.isAboutHealth(topicLower)) {
      return this.generateHealthScript(request);
    } else if (this.isAboutEducation(topicLower)) {
      return this.generateEducationScript(request);
    } else {
      return this.generateGenericScript(request);
    }
  }

  private isAboutNarendraModi(topic: string): boolean {
    const modiKeywords = ['narendra modi', 'modi', 'prime minister modi', 'pm modi', 'indian prime minister'];
    return modiKeywords.some(keyword => topic.includes(keyword));
  }

  private isAboutIndia(topic: string): boolean {
    const indiaKeywords = ['india', 'indian', 'bharat', 'hindustan', 'delhi', 'mumbai', 'bangalore'];
    return indiaKeywords.some(keyword => topic.includes(keyword));
  }

  private isAboutTechnology(topic: string): boolean {
    const techKeywords = ['technology', 'ai', 'artificial intelligence', 'machine learning', 'blockchain', 'software', 'digital', 'tech'];
    return techKeywords.some(keyword => topic.includes(keyword));
  }

  private isAboutBusiness(topic: string): boolean {
    const businessKeywords = ['business', 'entrepreneurship', 'startup', 'marketing', 'finance', 'economy', 'investment'];
    return businessKeywords.some(keyword => topic.includes(keyword));
  }

  private isAboutHealth(topic: string): boolean {
    const healthKeywords = ['health', 'medical', 'healthcare', 'fitness', 'wellness', 'medicine', 'doctor'];
    return healthKeywords.some(keyword => topic.includes(keyword));
  }

  private isAboutEducation(topic: string): boolean {
    const educationKeywords = ['education', 'learning', 'school', 'university', 'student', 'teaching', 'academic'];
    return educationKeywords.some(keyword => topic.includes(keyword));
  }

  private generateModiScript(request: ScriptRequest): string {
    const scripts = {
      presentation: `Welcome everyone to today's presentation about Narendra Modi, India's Prime Minister.

Narendra Damodardas Modi, born on September 17, 1950, has been serving as India's Prime Minister since May 2014. His journey from a tea seller's son in Vadnagar, Gujarat, to becoming one of the world's most influential leaders is truly remarkable.

Key aspects of PM Modi's leadership:

Early Life and Political Journey:
Modi was born into a modest family in Vadnagar, Gujarat. His early experiences shaped his understanding of common people's struggles. He joined the Rashtriya Swayamsevak Sangh (RSS) at a young age and later became involved with the Bharatiya Janata Party (BJP).

Chief Minister of Gujarat (2001-2014):
Before becoming Prime Minister, Modi served as Chief Minister of Gujarat for nearly 13 years. During this period, Gujarat experienced significant economic growth and development. The state became known for its business-friendly policies and infrastructure development.

Prime Minister's Achievements:

1. Digital India Initiative:
Modi launched the Digital India campaign to transform India into a digitally empowered society. This includes initiatives like Aadhaar, digital payments, and e-governance.

2. Swachh Bharat Mission:
The Clean India Mission, launched in 2014, aimed to eliminate open defecation and improve solid waste management. Over 100 million toilets were constructed under this program.

3. Make in India:
This initiative aims to encourage companies to manufacture their products in India and incentivize dedicated investments in manufacturing.

4. Ayushman Bharat:
The world's largest healthcare scheme providing health coverage to over 500 million people.

5. International Relations:
Modi has strengthened India's position on the global stage through strategic partnerships and diplomatic initiatives.

Economic Policies:
- Goods and Services Tax (GST) implementation
- Demonetization in 2016
- Focus on renewable energy and climate change
- Infrastructure development projects

Challenges and Criticisms:
Like any leader, Modi has faced various challenges and criticisms regarding economic policies, social issues, and governance decisions.

Global Recognition:
Modi has received numerous international awards and recognition for his leadership and initiatives in areas like renewable energy, digital governance, and social welfare.

Conclusion:
Narendra Modi's tenure as Prime Minister has been marked by ambitious reforms, digital transformation, and efforts to position India as a global power. His leadership style and policies continue to shape India's future trajectory.

Thank you for your attention. Are there any questions about PM Modi's leadership and policies?`,

      video: `Hey everyone! Welcome back to my channel. Today we're talking about one of the most influential leaders of our time - Narendra Modi, India's Prime Minister.

If you're new here, make sure to subscribe and hit that notification bell because we dive deep into political leadership and global affairs.

So, who is Narendra Modi? Let me break it down for you.

Born in 1950 in a small town called Vadnagar in Gujarat, Modi's story is incredible. He came from a very humble background - his father sold tea at a railway station. Can you imagine going from that to becoming the leader of the world's largest democracy?

Here's what makes Modi's leadership fascinating:

First, his rise through politics. Modi didn't come from a political family. He worked his way up through the RSS and BJP, showing incredible dedication and organizational skills.

As Chief Minister of Gujarat from 2001 to 2014, he transformed the state's economy. Gujarat became known as India's most business-friendly state during his tenure.

Now, as Prime Minister since 2014, Modi has launched some game-changing initiatives:

Digital India - This is huge! Modi pushed India into the digital age. Today, India has one of the world's largest digital payment systems. UPI transactions are through the roof!

Swachh Bharat - The Clean India mission. They built over 100 million toilets in just a few years. That's massive scale execution!

Make in India - Encouraging manufacturing in India. This is crucial for job creation and economic growth.

Ayushman Bharat - Healthcare for 500 million people. That's larger than the entire population of the United States!

What's really interesting is Modi's communication style. He's probably the first Indian PM to effectively use social media. His Twitter following is massive, and he regularly addresses the nation through radio programs called 'Mann Ki Baat.'

Internationally, Modi has elevated India's global standing. His relationships with world leaders and India's growing influence in international forums is noteworthy.

Of course, like any leader, Modi has faced criticism and challenges. Economic policies like demonetization were controversial. There have been debates about various social and economic issues.

But here's what's undeniable - Modi has changed how India sees itself and how the world sees India. The scale of programs he's implemented is unprecedented.

What do you think about Modi's leadership? Let me know in the comments below. And don't forget to like this video if you found it informative!

Thanks for watching, and I'll see you in the next video!`,

      podcast: `Welcome to today's episode where we're discussing Narendra Modi, India's Prime Minister, and his impact on Indian politics and society.

I'm your host, and today we're going to explore the fascinating journey of a man who went from selling tea to leading the world's largest democracy.

You know, when you think about political leadership in the 21st century, Modi's story is quite unique. Born in 1950 in Vadnagar, Gujarat, his early life was marked by simplicity and hard work.

What's interesting about Modi is how he represents a new kind of Indian politician. Unlike many leaders who come from political dynasties, Modi built his career from the ground up through organizational work and grassroots politics.

Let me share some key aspects of his leadership:

His time as Gujarat's Chief Minister was transformative. From 2001 to 2014, he focused heavily on economic development, infrastructure, and governance reforms. Gujarat's growth rate during this period was impressive.

When he became Prime Minister in 2014, Modi brought this same focus on development and governance to the national level.

The Digital India initiative is fascinating. Modi understood early that technology could leapfrog traditional development challenges. Today, India's digital payment system is one of the most advanced in the world.

The Swachh Bharat Mission - building over 100 million toilets - shows the scale at which Modi thinks. This wasn't just about sanitation; it was about dignity and public health.

His communication style is worth noting. Modi was among the first world leaders to effectively use social media for governance communication. His monthly radio program 'Mann Ki Baat' reaches millions of Indians.

Internationally, Modi has repositioned India on the global stage. His diplomatic initiatives and India's growing influence in international forums reflect his strategic thinking.

The economic policies have been bold - GST implementation, demonetization, focus on manufacturing through Make in India. These have had mixed results and generated significant debate.

What's remarkable is the scale of welfare programs under his leadership. Ayushman Bharat covers 500 million people - that's unprecedented anywhere in the world.

Of course, Modi's tenure hasn't been without controversy. Various policies and decisions have faced criticism from different quarters.

But here's what's undeniable - Modi has changed the narrative around Indian politics and governance. The focus on delivery, technology adoption, and global positioning has been significant.

As we wrap up, it's clear that Modi represents a particular style of leadership that emphasizes development, technology, and strong governance. His impact on India and its global standing will likely be studied for years to come.

Thanks for listening to today's episode. What are your thoughts on Modi's leadership style? I'd love to hear from you.`,

      speech: `Distinguished guests, ladies and gentlemen,

Today, I speak to you about a leader who has redefined governance in the world's largest democracy - Narendra Modi, India's Prime Minister.

When we examine leadership in the 21st century, few stories are as compelling as that of Narendra Modi. Born into humble circumstances in Vadnagar, Gujarat, his journey to India's highest office exemplifies the democratic ideals that India represents.

Modi's leadership philosophy centers on three key principles: development, good governance, and India's global positioning.

As Chief Minister of Gujarat for over a decade, Modi demonstrated that effective governance could drive economic transformation. Gujarat's growth story under his leadership became a model for other Indian states.

Since becoming Prime Minister in 2014, Modi has launched initiatives that touch every aspect of Indian life:

The Digital India mission has transformed how Indians interact with government services. From digital payments to online governance, India has leaped into the digital age.

The Swachh Bharat Mission addressed one of India's most pressing challenges - sanitation. Building over 100 million toilets in a few years required unprecedented coordination and execution.

Ayushman Bharat, providing healthcare coverage to 500 million people, represents the world's largest healthcare program. This demonstrates India's commitment to inclusive development.

On the global stage, Modi has elevated India's voice. His diplomatic initiatives have strengthened India's relationships with major powers while maintaining strategic autonomy.

The Make in India initiative aims to position India as a global manufacturing hub, creating jobs and driving economic growth.

However, true leadership is not just about achievements - it's about navigating challenges. Modi has faced economic headwinds, social tensions, and global uncertainties. His responses to these challenges define his leadership character.

What makes Modi's leadership significant is the scale of transformation he has attempted. In a country of 1.4 billion people, implementing change requires vision, determination, and exceptional organizational capability.

Critics and supporters may debate specific policies, but few can deny the ambition and scope of the transformation Modi has initiated.

As we look to the future, Modi's leadership offers lessons about governance in large democracies, the role of technology in development, and the importance of strong institutions.

India under Modi's leadership represents a nation confident in its capabilities and ambitious about its future. This confidence has implications not just for India, but for the entire world.

In conclusion, Narendra Modi's leadership represents a particular moment in India's democratic journey - one marked by ambition, scale, and transformation.

Thank you.`,

      tutorial: `Welcome to this comprehensive overview of Narendra Modi's political career and leadership style.

In this tutorial, we'll explore how Modi became one of the world's most influential leaders and examine his key policies and initiatives.

Learning Objectives:
By the end of this session, you'll understand:
• Modi's political journey from grassroots to Prime Minister
• Key policies and initiatives during his tenure
• His leadership style and communication methods
• Impact on India's domestic and international standing

Section 1: Early Life and Political Beginnings

Narendra Damodardas Modi was born on September 17, 1950, in Vadnagar, Gujarat. His father, Damodardas Modi, sold tea at the local railway station.

Key early influences:
- Joined RSS (Rashtriya Swayamsevak Sangh) at age 8
- Developed organizational and leadership skills through RSS activities
- Later joined BJP (Bharatiya Janata Party) in 1987

Section 2: Chief Minister of Gujarat (2001-2014)

Modi's tenure as Gujarat CM was marked by:
- Economic development focus
- Infrastructure improvements
- Business-friendly policies
- Governance reforms

Key achievements:
- Gujarat's GDP growth rate exceeded national average
- Improved power supply and infrastructure
- Attracted significant industrial investment

Section 3: Prime Minister (2014-present)

Major Initiatives:

Digital India:
- Objective: Transform India into digitally empowered society
- Key components: Digital infrastructure, digital literacy, digital services
- Results: Massive growth in digital payments, e-governance

Swachh Bharat Mission:
- Launched: October 2, 2014
- Goal: Clean India by 2019
- Achievement: Over 100 million toilets built

Make in India:
- Launched: September 25, 2014
- Objective: Encourage manufacturing in India
- Focus sectors: Automobiles, chemicals, IT, pharmaceuticals, textiles

Ayushman Bharat:
- World's largest healthcare scheme
- Coverage: Over 500 million people
- Benefits: Hospitalization coverage up to ₹5 lakh per family

Section 4: Leadership Style Analysis

Communication:
- Effective use of social media
- Direct communication with citizens through 'Mann Ki Baat'
- Strong oratory skills

Governance Approach:
- Technology-driven solutions
- Large-scale program implementation
- Focus on measurable outcomes

Section 5: International Relations

Key diplomatic initiatives:
- Strengthened ties with USA, Japan, Australia (Quad partnership)
- Enhanced relationships with Middle Eastern countries
- Active participation in G20, BRICS, SCO

Section 6: Challenges and Criticisms

Economic challenges:
- Demonetization impact (2016)
- GST implementation issues
- COVID-19 economic impact

Social and political challenges:
- Managing diverse coalition politics
- Addressing social tensions
- Balancing development with environmental concerns

Section 7: Global Recognition

Awards and recognition:
- UN Champions of the Earth Award (2018)
- Seoul Peace Prize (2018)
- Various international honors for leadership

Section 8: Assessment and Future Outlook

Modi's impact on India:
- Transformed governance delivery
- Enhanced India's global standing
- Accelerated digital transformation
- Implemented large-scale welfare programs

Future challenges:
- Economic growth sustainability
- Job creation
- Environmental balance
- Social harmony

Conclusion:
Narendra Modi's leadership represents a significant phase in India's democratic evolution. His focus on development, technology adoption, and global engagement has reshaped India's trajectory.

Key takeaways:
1. Effective leadership requires clear vision and strong execution
2. Technology can be a powerful tool for governance
3. Scale of implementation matters in large democracies
4. Communication is crucial for political leadership
5. Global engagement enhances national standing

This concludes our comprehensive overview of Narendra Modi's leadership and policies. For further study, I recommend exploring specific policy documents and academic analyses of his governance model.`
    };

    return scripts[request.type] || scripts.presentation;
  }

  private generateIndiaScript(request: ScriptRequest): string {
    // Generate India-specific content based on the topic
    return `Welcome to this exploration of ${request.topic}.

India, officially known as the Republic of India, is a country that captivates the world with its diversity, culture, and rapid development.

Key aspects of ${request.topic}:

Historical Context:
India's rich history spans thousands of years, from ancient civilizations to colonial rule and independence in 1947. This historical backdrop shapes modern India's identity and aspirations.

Cultural Diversity:
With over 1.4 billion people, 22 official languages, and countless traditions, India represents unity in diversity. This cultural richness is both a strength and a complex governance challenge.

Economic Transformation:
India has emerged as one of the world's fastest-growing major economies. From agriculture-based economy to services and now manufacturing, India's economic journey is remarkable.

Technological Advancement:
India's IT sector has put the country on the global map. From Bangalore being called the Silicon Valley of India to the digital revolution, technology drives modern India.

Democratic Values:
As the world's largest democracy, India's political system, despite its challenges, represents the aspirations of over a billion people.

Global Influence:
India's growing influence in international affairs, from G20 leadership to climate change initiatives, positions it as a key global player.

Challenges and Opportunities:
Like any developing nation, India faces challenges in areas like poverty, infrastructure, and environmental sustainability, while also presenting immense opportunities for growth and development.

This topic of ${request.topic} is particularly relevant in understanding India's current trajectory and future potential.

Thank you for exploring this fascinating subject with me.`;
  }

  private generateTechnologyScript(request: ScriptRequest): string {
    return `Welcome to our deep dive into ${request.topic}.

Technology is reshaping our world at an unprecedented pace, and understanding ${request.topic} is crucial for anyone looking to stay relevant in today's digital landscape.

Let's explore the key aspects:

Current State:
${request.topic} represents one of the most significant technological developments of our time. Its applications span across industries, from healthcare to finance, education to entertainment.

Core Concepts:
Understanding the fundamental principles behind ${request.topic} helps us appreciate its potential and limitations. The technology builds on decades of research and development.

Real-world Applications:
Today, ${request.topic} is being used to solve complex problems, automate processes, and create new possibilities that were unimaginable just a few years ago.

Impact on Society:
The societal implications of ${request.topic} are profound. It's changing how we work, learn, communicate, and live our daily lives.

Future Prospects:
Looking ahead, ${request.topic} promises even more revolutionary changes. The next decade will likely see exponential growth in its capabilities and applications.

Challenges and Considerations:
With great power comes great responsibility. ${request.topic} also raises important questions about privacy, ethics, job displacement, and the digital divide.

Getting Started:
For those interested in ${request.topic}, there are numerous resources available to begin learning and exploring this fascinating field.

The future belongs to those who understand and can effectively leverage ${request.topic}. I encourage you to continue exploring this exciting domain.`;
  }

  private generateBusinessScript(request: ScriptRequest): string {
    return `Welcome to our discussion on ${request.topic}.

In today's rapidly evolving business landscape, understanding ${request.topic} is essential for success and growth.

Key Business Insights:

Market Dynamics:
The current market environment for ${request.topic} is characterized by rapid change, increasing competition, and evolving customer expectations.

Strategic Importance:
${request.topic} has become a critical factor in business strategy. Companies that master this area often gain significant competitive advantages.

Implementation Challenges:
Successfully implementing ${request.topic} requires careful planning, adequate resources, and strong leadership commitment.

Best Practices:
Leading organizations have developed proven approaches to ${request.topic}. These best practices can guide others in their journey.

ROI and Metrics:
Measuring the success of ${request.topic} initiatives requires clear metrics and understanding of return on investment.

Future Trends:
The business landscape around ${request.topic} continues to evolve. Staying ahead of trends is crucial for long-term success.

Case Studies:
Real-world examples demonstrate how different organizations have successfully leveraged ${request.topic} to achieve their goals.

Action Steps:
For businesses looking to excel in ${request.topic}, there are specific steps and strategies that can be implemented immediately.

The businesses that thrive in the future will be those that effectively integrate ${request.topic} into their core operations and strategy.`;
  }

  private generateHealthScript(request: ScriptRequest): string {
    return `Welcome to our comprehensive discussion on ${request.topic}.

Health and wellness are fundamental to human flourishing, and ${request.topic} plays a crucial role in our overall well-being.

Understanding the Basics:
${request.topic} encompasses various aspects of physical, mental, and social well-being. It's important to approach this holistically.

Current Research:
Recent studies and medical research have provided new insights into ${request.topic}, helping us better understand its impact on health outcomes.

Prevention and Care:
Preventive measures and proper care strategies for ${request.topic} can significantly improve quality of life and health outcomes.

Lifestyle Factors:
Diet, exercise, sleep, and stress management all play important roles in ${request.topic}. Understanding these connections is vital.

Medical Advances:
Modern medicine has made significant strides in addressing ${request.topic}, with new treatments and technologies improving patient outcomes.

Public Health Perspective:
From a public health standpoint, ${request.topic} affects communities and populations, requiring coordinated efforts and policies.

Personal Responsibility:
Individual choices and behaviors significantly impact ${request.topic}. Empowering people with knowledge leads to better health decisions.

Future Directions:
Emerging research and technologies promise new approaches to ${request.topic}, offering hope for improved treatments and outcomes.

Remember, when it comes to ${request.topic}, knowledge is power, and taking proactive steps toward better health is always worthwhile.`;
  }

  private generateEducationScript(request: ScriptRequest): string {
    return `Welcome to our exploration of ${request.topic}.

Education is the foundation of personal growth and societal progress, and ${request.topic} represents an important aspect of the learning journey.

Educational Framework:
${request.topic} fits within the broader educational ecosystem, connecting to various learning objectives and outcomes.

Learning Methodologies:
Different approaches to teaching and learning ${request.topic} have evolved, each with its own strengths and applications.

Student Engagement:
Keeping learners engaged with ${request.topic} requires innovative approaches, interactive methods, and relevant real-world connections.

Assessment and Evaluation:
Measuring understanding and progress in ${request.topic} involves various assessment strategies and evaluation criteria.

Technology Integration:
Modern educational technology has transformed how we approach ${request.topic}, offering new tools and possibilities for learning.

Practical Applications:
Understanding how ${request.topic} applies to real-world situations helps students see the relevance and importance of their learning.

Challenges in Education:
Common challenges in teaching and learning ${request.topic} include resource constraints, varying learning styles, and keeping content current.

Future of Learning:
The educational landscape continues to evolve, and ${request.topic} will likely be taught and learned in new ways in the coming years.

Lifelong Learning:
${request.topic} is not just for formal education settings - it represents an area for continuous learning and development throughout life.

Education in ${request.topic} empowers individuals and contributes to societal advancement and progress.`;
  }

  private generateGenericScript(request: ScriptRequest): string {
    return `Welcome to our comprehensive exploration of ${request.topic}.

Today, we're diving deep into a subject that has significant relevance in our modern world. ${request.topic} represents an area of growing importance and interest.

Understanding the Context:
To fully appreciate ${request.topic}, we need to understand the context in which it exists and the factors that have contributed to its current significance.

Key Components:
${request.topic} consists of several important elements that work together to create the complete picture. Each component plays a vital role in the overall understanding.

Current Landscape:
The present state of ${request.topic} is shaped by various trends, developments, and influences that continue to evolve and change.

Practical Implications:
Understanding ${request.topic} has real-world applications and implications that affect individuals, organizations, and society as a whole.

Challenges and Opportunities:
Like many important subjects, ${request.topic} presents both challenges that need to be addressed and opportunities that can be leveraged.

Different Perspectives:
Various stakeholders and experts view ${request.topic} from different angles, each bringing valuable insights and considerations.

Future Outlook:
Looking ahead, ${request.topic} is likely to continue evolving, presenting new developments and possibilities that we should be prepared for.

Taking Action:
For those interested in ${request.topic}, there are specific steps and approaches that can be taken to engage more deeply with the subject.

Best Practices:
Based on experience and research, certain best practices have emerged for dealing with ${request.topic} effectively.

In conclusion, ${request.topic} represents an important area of focus that deserves our attention and understanding. By exploring it thoroughly, we can better prepare ourselves for the future and make more informed decisions.

Thank you for joining me in this exploration of ${request.topic}. I encourage you to continue learning and staying engaged with this important subject.`;
  }
}