"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Marquee } from "../ui/marquee";
const Image = 'img';

export function Highlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-[#f0abfc] p-1 py-0.5 font-bold text-[#d946ef] dark:bg-[#f0abfc] dark:text-[#d946ef]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function TestimonialCard({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
        // light styles
        " border border-neutral-200 bg-white",
        // dark styles
        "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className,
      )}
      {...props}
    >
      <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
        {description}
        <div className="flex flex-row py-1">
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
        </div>
      </div>

      <div className="flex w-full select-none items-center justify-start gap-5">
        <Image
          width={40}
          height={40}
          src={img || ""}
          alt={name}
          className="size-10 rounded-full ring-1 ring-border ring-offset-4"
        />

        <div>
          <p className="font-medium text-neutral-500">{name}</p>
          <p className="text-xs font-normal text-neutral-400">{role}</p>
        </div>
      </div>
    </div>
  );
}
const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Software Engineer at QuickPost AI",
      img: "https://randomuser.me/api/portraits/men/91.jpg",
      description: (
        <p>
          Using QuickPost AI has streamlined our content creation process.
          <Highlight>
            Its AI-driven insights and efficiency have drastically improved our marketing strategies.
          </Highlight>{" "}
          A must-have for modern digital teams.
        </p>
      ),
    },
    {
      name: "Priya Desai",
      role: "Content Strategist at QuickPost AI",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
      description: (
        <p>
          QuickPost AI's automated content suggestions have increased our engagement rates.
          <Highlight>
            We've reduced content planning time by 60%, creating impactful posts effortlessly.
          </Highlight>{" "}
          Highly recommend it to content creators.
        </p>
      ),
    },
    {
      name: "Raj Patel",
      role: "Founder at CreativePulse",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      description: (
        <p>
          As a founder, I rely on tools that enhance productivity. QuickPost AI's intuitive design and smart recommendations are invaluable.
          <Highlight>Our audience loves the tailored content.</Highlight>
        </p>
      ),
    },
    {
      name: "Meera Reddy",
      role: "Digital Marketing Manager at MarketGuru",
      img: "https://randomuser.me/api/portraits/women/83.jpg",
      description: (
        <p>
          QuickPost AI's analytics dashboard gives us clear insights into audience preferences.
          <Highlight>
            It helps us optimize content strategies effectively.
          </Highlight>{" "}
          A fantastic tool for data-driven marketers.
        </p>
      ),
    },
    {
      name: "Vikram Iyer",
      role: "Creative Director at AdWave Studios",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      description: (
        <p>
          QuickPost AI's AI-powered creativity is a game changer for our advertising campaigns.
          <Highlight>
            The dynamic ideas generated have captivated our target audience.
          </Highlight>{" "}
          It’s a must-have for creative professionals.
        </p>
      ),
    },
    {
      name: "Anjali Nair",
      role: "Freelance Content Creator",
      img: "https://randomuser.me/api/portraits/women/5.jpg",
      description: (
        <p>
          QuickPost AI has simplified my content workflow, helping me generate ideas quickly.
          <Highlight>
            It’s like having a creative partner available 24/7.
          </Highlight>{" "}
        </p>
      ),
    },
    {
      name: "Rohit Verma",
      role: "Social Media Manager at Trendify",
      img: "https://randomuser.me/api/portraits/men/14.jpg",
      description: (
        <p>
          QuickPost AI's content scheduling and post optimization features are fantastic.
          <Highlight>
            We've seen a noticeable boost in our engagement metrics.
          </Highlight>{" "}
          I highly recommend it for social media managers.
        </p>
      ),
    },
    {
      name: "Aisha Khan",
      role: "E-commerce Specialist at FashionForward",
      img: "https://randomuser.me/api/portraits/women/56.jpg",
      description: (
        <p>
          QuickPost AI's targeted content suggestions have transformed our product marketing.
          <Highlight>
            It’s helping us connect with our audience more effectively.
          </Highlight>{" "}
        </p>
      ),
    },
    {
      name: "Arjun Malhotra",
      role: "SEO Expert at WebInsights",
      img: "https://randomuser.me/api/portraits/men/18.jpg",
      description: (
        <p>
          QuickPost AI has made SEO-driven content creation easier than ever.
          <Highlight>
            It ensures our content ranks well while maintaining creativity.
          </Highlight>{" "}
        </p>
      ),
    },
    {
      name: "Sofia Patel",
      role: "EdTech Content Creator at Learnify",
      img: "https://randomuser.me/api/portraits/women/73.jpg",
      description: (
        <p>
          QuickPost AI's educational content templates have enhanced our online learning platform.
          <Highlight>
            It helps us cater to diverse student needs effectively.
          </Highlight>{" "}
        </p>
      ),
    },
  ];
  
  

export function Testimonials() {
  return (
    <section id="testimonials" className="container py-10">
     <h2 className="mb-4 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
  What People Are Saying
</h2>
<h3 className="mx-auto mb-8 max-w-lg text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
  Don&apos;t just take our word for it. Here&apos;s what{" "}
  <span className="bg-gradient bg-clip-text text-transparent">
    real people
  </span>{" "}
  are saying about{" "}
  <span className="from-fg-onAccent text-purple-600">QuickPost AI</span>
</h3>

      <div className="relative mt-6 max-h-screen overflow-hidden">
        <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={cn({
                  "[--duration:60s]": i === 1,
                  "[--duration:30s]": i === 2,
                  "[--duration:70s]": i === 3,
                })}
              >
                {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.8,
                      duration: 1.2,
                    }}
                  >
                    <TestimonialCard {...card} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%"></div>
      </div>
    </section>
  );
}
